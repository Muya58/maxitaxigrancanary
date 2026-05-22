import axios from "axios";

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).end();
  const payload = req.body;

  try {
    // 1. Lógica interna para calcular el precio, la distancia y la comisión del 10%
    const dest = (payload.destinationAddress || "").toLowerCase();
    const origin = (payload.pickupAddress || "").toLowerCase();
    const loc = dest.includes("aeropuerto") || dest.includes("lpa") ? origin : dest;

    let distance = 30;
    let duration = 25;

    if (loc.includes("maspalomas") || loc.includes("meloneras") || loc.includes("playa del ingles")) {
       distance = 32; duration = 28;
    } else if (loc.includes("mogan") || loc.includes("amadores") || loc.includes("taurito")) {
       distance = 47; duration = 40;
    } else if (loc.includes("puerto rico") || loc.includes("arguineguin")) {
       distance = 42; duration = 35;
    } else if (loc.includes("las palmas") || loc.includes("capital")) {
       distance = 25; duration = 20;
    } else if (loc.includes("agaete") || loc.includes("puerto de las nieves")) {
       distance = 55; duration = 50;
    } else if (loc.includes("arucas")) {
       distance = 35; duration = 30;
    } else if (loc.includes("telde")) {
       distance = 15; duration = 15;
    } else if (loc.includes("galdar") || loc.includes("guia")) {
       distance = 50; duration = 45;
    }

    let isNight = false;
    if (payload.dateTime) {
      const dateObj = new Date(payload.dateTime);
      const hour = dateObj.getHours();
      if (hour >= 22 || hour < 6) {
        isNight = true;
      }
    }

    const ratePerKm = isNight ? 1.55 : 1.35;
    const airportSupplement = 2.10;

    let officialPrice = (distance * ratePerKm);
    if (origin.includes("aeropuerto") || dest.includes("aeropuerto") || origin.includes("lpa") || dest.includes("lpa")) {
      officialPrice += airportSupplement;
    }

    const basePrice = Math.round(officialPrice);
    const precioTotal = Math.round(basePrice * 1.10);
    const comision = (precioTotal * 0.10).toFixed(2);

    // 2. Generación automática de rutas para Google Maps
    const mapOrigen = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(payload.pickupAddress)}`;
    const mapDestino = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(payload.destinationAddress)}`;
    const mapRuta = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(payload.pickupAddress)}&destination=${encodeURIComponent(payload.destinationAddress)}`;
    
    // Generar un ID de reserva aleatorio (#RES-XXX)
    const resID = Math.floor(Math.random() * 1000).toString().padStart(3, '0');

    // Link a WhatsApp del cliente
    const rawPhone = payload.clientPhone || "";
    const cleanPhone = rawPhone.replace(/[^\d+]/g, '');
    const waLink = `https://wa.me/${cleanPhone.replace('+', '')}`;

    // 3. Notificación a Telegram (Formato Premium Idéntico a tu captura)
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    
    if (botToken && chatId) {
      const message = `*NUEVA RESERVA | #RES-${resID}* 🚕\n\n` +
        `👤 *Cliente:* ${payload.clientName}\n` +
        `📱 *Teléfono:* [${payload.clientPhone}](${waLink})\n` +
        `💬 *Abrir Chat WhatsApp:* [Contactar Cliente](${waLink})\n` +
        `📧 *Email:* ${payload.clientEmail || 'No proporcionado'}\n` +
        `📍 *Municipio:* ${payload.clientMunicipality || 'No proporcionado'}\n` +
        `🌍 *Idioma:* ${payload.clientLanguage || 'es'}\n` +
        `📅 *Fecha y Hora:* ${payload.dateTime}\n\n` +
        `📍 *Recogida:* ${payload.pickupAddress}\n` +
        `🏁 *Destino:* ${payload.destinationAddress}\n\n` +
        `🗺️ [Ver Origen](${mapOrigen}) | [Ver Destino](${mapDestino}) | [Ruta Completa](${mapRuta})\n\n` +
        `🛣️ *Distancia:* ${distance} km (aprox)\n` +
        `💶 *Precio:* ${precioTotal}€\n` +
        `📉 *Comisión (10%):* ${comision}€\n\n` +
        `Por favor, confirma la recepción.`;

      await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        chat_id: chatId, 
        text: message, 
        parse_mode: "Markdown",
        disable_web_page_preview: true
      }).catch(err => console.error("Error Telegram"));
    }

    // 4. Conexión a Google Sheets
    const scriptUrl = process.env.GOOGLE_SHEETS_SCRIPT_URL;
    if (scriptUrl) {
      await axios.post(scriptUrl, {
        id: `RES-${resID}`,
        date_created: new Date().toISOString(),
        name: payload.clientName,
        email: payload.clientEmail,
        phone: payload.clientPhone,
        pickup: payload.pickupAddress,
        destination: payload.destinationAddress,
        date: payload.dateTime,
        time: payload.dateTime, // Combined in form
        passengers: "N/A", // Not in form
        specialRequests: payload.clientMunicipality || "",
        estimatedPrice: precioTotal,
        estimatedTime: duration,
        commission: comision,
        net: (precioTotal - parseFloat(comision)).toFixed(2)
      }, {
        headers: { 'Content-Type': 'application/json' }
      }).catch(err => console.error("Error Sheets"));
    }

    res.status(200).json({ success: true, message: "Reserva procesada correctamente" });
  } catch (error) {
    console.error("Error en el servidor:", error);
    res.status(500).json({ success: false, error: "Error interno al procesar la reserva" });
  }
}

import axios from "axios";

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).end();
  const payload = req.body;

  try {
    // 1. Lógica interna para calcular el precio, la distancia y la comisión del 10%
    const dest = (payload.destinationAddress || "").toLowerCase();
    let basePrice = 40; let distance = "30";
    if (dest.includes("maspalomas") || dest.includes("meloneras")) { basePrice = 45; distance = "32"; }
    else if (dest.includes("mogan") || dest.includes("puerto rico") || dest.includes("amadores")) { basePrice = 65; distance = "48"; }
    else if (dest.includes("las palmas") || dest.includes("capital")) { basePrice = 35; distance = "25"; }
    else if (dest.includes("agaete")) { basePrice = 75; distance = "55"; }

    const precioTotal = Math.round(basePrice * 1.10);
    const comision = (precioTotal * 0.10).toFixed(2);

    // 2. Generación automática de rutas para Google Maps
    const mapOrigen = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(payload.pickupAddress)}`;
    const mapDestino = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(payload.destinationAddress)}`;
    const mapRuta = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(payload.pickupAddress)}&destination=${encodeURIComponent(payload.destinationAddress)}`;
    
    // Generar un ID de reserva aleatorio (#RES-XXX)
    const resID = Math.floor(Math.random() * 1000).toString().padStart(3, '0');

    // 3. Notificación a Telegram (Formato Premium Idéntico a tu captura)
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    
    if (botToken && chatId) {
      const message = `*NUEVA RESERVA | #RES-${resID}* 🚕\n\n` +
        `👤 *Cliente:* ${payload.clientName}\n` +
        `📱 *Teléfono:* ${payload.clientPhone}\n` +
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
        disable_web_page_preview: true // Evita que salgan fotos gigantes de los mapas
      }).catch(err => console.error("Error Telegram"));
    }

    // 4. Conexión a Google Sheets (Mantenemos tu enlace intacto)
    const scriptUrl = process.env.GOOGLE_PRIVATE_KEY;
    if (scriptUrl) {
      await axios.post(scriptUrl, payload).catch(err => console.error("Error Sheets"));
    }

    res.status(200).json({ success: true, message: "Reserva procesada correctamente" });
  } catch (error) {
    console.error("Error en el servidor:", error);
    res.status(500).json({ success: false, error: "Error interno al procesar la reserva" });
  }
}

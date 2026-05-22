import axios from "axios";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
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
    
    // Generar un ID de reserva pseudo-correlativo (DíaHora+Random)
    const now = new Date();
    const dayStr = now.getDate().toString().padStart(2, '0');
    const hourStr = now.getHours().toString().padStart(2, '0');
    const randDigits = Math.floor(Math.random() * 100).toString().padStart(2, '0');
    const resID = `${dayStr}${hourStr}${randDigits}`;

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
    const scriptUrl = process.env.GOOGLE_SHEETS_SCRIPT_URL || "https://script.google.com/macros/s/AKfycbzc-h5KsGYVp4dGys5-MhzmTYfotdlmEH3y-xjobDfKfqcQKK_3EGdHzxonwqBAMJY9vQ/exec";
    if (scriptUrl && scriptUrl.includes("script.google.com")) {
      try {
        await fetch(scriptUrl, {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: `RES-${resID}`,
            date_created: new Date().toISOString(),
            name: payload.clientName,
            email: payload.clientEmail,
            phone: payload.clientPhone,
            pickup: payload.pickupAddress,
            destination: payload.destinationAddress,
            date: payload.dateTime,
            time: payload.dateTime,
            passengers: "N/A",
            specialRequests: payload.clientMunicipality || "",
            estimatedPrice: precioTotal,
            estimatedTime: duration,
            commission: comision,
            net: (precioTotal - parseFloat(comision)).toFixed(2)
          }),
          redirect: 'follow'
        });
      } catch (err) {
        console.error("Error Sheets", err);
      }
    }

    // 5. Enviar Email de confirmación al cliente
    const fromAddress = process.env.RESEND_SENDER || 'bookings@maxitaxigrancanary.com';
    let emailSent = false;
    if (payload.clientEmail) {
      try {
        await resend.emails.send({
          from: fromAddress,
          to: payload.clientEmail,
          subject: `Confirmación de Reserva #${resID} - MaxiTaxi Gran Canaria`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #eab308;">¡Reserva Confirmada!</h2>
              <p>Hola ${payload.clientName}, hemos recibido tu solicitud de reserva de traslado.</p>
              
              <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p><strong>ID Reserva:</strong> #RES-${resID}</p>
                <p><strong>Fecha y Hora:</strong> ${payload.dateTime}</p>
                <p><strong>Recogida:</strong> ${payload.pickupAddress}</p>
                <p><strong>Destino:</strong> ${payload.destinationAddress}</p>
                <p><strong>Precio Estimado:</strong> ${precioTotal}€</p>
              </div>

              <p>Un conductor se pondrá en contacto contigo a través de WhatsApp para confirmar los detalles finales y el punto de encuentro exacto.</p>
              <br>
              <p>Gracias por confiar en <strong>MaxiTaxi Gran Canaria</strong>.</p>
            </div>
          `
        });
        emailSent = true;
      } catch (err) {
        console.error("Error enviando email al cliente:", err);
      }
    }

    res.status(200).json({ success: true, message: "Reserva procesada correctamente", emailSent });
  } catch (error) {
    console.error("Error en el servidor:", error);
    res.status(500).json({ success: false, error: "Error interno al procesar la reserva" });
  }
}

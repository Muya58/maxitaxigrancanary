import axios from "axios";

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).end();
  const payload = req.body;

  try {
    // 1. Notificación instantánea a Telegram para los conductores
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (botToken && chatId) {
      const message = `🚖 *Nueva Reserva MaxiTaxi*\n👤 Cliente: ${payload.clientName}\n📞 WhatsApp: ${payload.clientPhone}\n📅 Fecha: ${payload.dateTime}\n📍 Origen: ${payload.pickupAddress}\n🏁 Destino: ${payload.destinationAddress}`;
      await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        chat_id: chatId, text: message, parse_mode: "Markdown",
      }).catch(err => console.error("Error Telegram"));
    }

    // 2. Conexión Directa a Google Sheets (usando tu variable GOOGLE_PRIVATE_KEY)
    const scriptUrl = process.env.GOOGLE_PRIVATE_KEY;
    if (scriptUrl) {
      // Enviamos los datos al "enchufe" de tu Excel
      await axios.post(scriptUrl, payload).catch(err => console.error("Error Sheets"));
    }

    // Respuesta de éxito para que la web muestre la confirmación al cliente
    res.status(200).json({ success: true, message: "Reserva procesada correctamente" });
  } catch (error) {
    console.error("Error en el servidor:", error);
    res.status(500).json({ success: false, error: "Error interno al procesar la reserva" });
  }
}

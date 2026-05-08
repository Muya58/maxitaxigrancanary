import axios from "axios";
import { google } from "googleapis";

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).end();
  const payload = req.body;

  try {
    // 1. Notificación instantánea a Telegram de los Conductores
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (botToken && chatId) {
      const message = `🚖 *Nueva Reserva MaxiTaxi*\n👤 Cliente: ${payload.clientName}\n📞 WhatsApp: ${payload.clientPhone}\n📅 Fecha: ${payload.dateTime}\n📍 Origen: ${payload.pickupAddress}\n🏁 Destino: ${payload.destinationAddress}`;
      await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        chat_id: chatId, text: message, parse_mode: "Markdown",
      }).catch(err => console.error("Error Telegram"));
    }

    // 2. Base de Datos en Google Sheets
    const sheetId = process.env.GOOGLE_SHEETS_ID;
    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;

    if (sheetId && clientEmail && privateKey) {
      const auth = new google.auth.JWT({
        email: clientEmail,
        key: privateKey.replace(/\\n/g, "\n"),
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      });
      const sheets = google.sheets({ version: "v4", auth });
      await sheets.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: "Sheet1!A:I", // IMPORTANTE: Cambia 'Sheet1' si tu pestaña de Excel se llama 'Hoja 1'
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [[
            new Date().toISOString(), payload.clientName, payload.clientPhone, payload.dateTime,
            payload.pickupAddress, payload.destinationAddress, payload.clientEmail || "",
            payload.clientMunicipality || "", payload.clientLanguage || ""
          ]],
        },
      }).catch(err => console.error("Error Sheets"));
    }

    // Da luz verde a la web para mostrar el Ticket de Confirmación
    res.status(200).json({ success: true, message: "Reserva procesada" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Error interno" });
  }
}

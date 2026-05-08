import express from "express";
import cors from "cors";
import path from "path";
import axios from "axios";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { google } from "googleapis";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Proxy for Price Calculation
  app.post("/api/calculate", async (req, res) => {
    try {
      const response = await axios.post("https://api.maxitaxigrancanary.com/api/calculate", req.body);
      res.json(response.data);
    } catch (error: any) {
      console.error("Calculation Error:", error.message);
      res.status(500).json({ error: "Failed to calculate price" });
    }
  });

  // Reservation Endpoint with Integrations
  app.post("/api/reservations", async (req, res) => {
    const payload = req.body;

    try {
      // 1. Proxy to original API
      let originalApiResponse;
      try {
        originalApiResponse = await axios.post("https://api.maxitaxigrancanary.com/api/reservations", payload);
      } catch (e) {
        console.warn("Original API failed, but we continue with local integrations.");
      }

      // 2. Telegram Notification
      const botToken = process.env.TELEGRAM_BOT_TOKEN;
      const chatId = process.env.TELEGRAM_CHAT_ID;
      if (botToken && chatId) {
        const message = `
🚖 *Nueva Reserva MaxiTaxiGranCanary*
👤 Cliente: ${payload.clientName}
📞 WhatsApp: ${payload.clientPhone}
📅 Fecha: ${payload.dateTime}
📍 Origen: ${payload.pickupAddress}
🏁 Destino: ${payload.destinationAddress}
📧 Email: ${payload.clientEmail || 'N/A'}
🏘️ Municipio: ${payload.clientMunicipality || 'N/A'}
🌐 Idioma: ${payload.clientLanguage}
        `.trim();

        await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          chat_id: chatId,
          text: message,
          parse_mode: "Markdown",
        }).catch(err => console.error("Telegram Error:", err.message));
      }

      // 3. Google Sheets Integration
      const sheetId = process.env.GOOGLE_SHEETS_ID;
      const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
      const privateKey = process.env.GOOGLE_PRIVATE_KEY;

      if (sheetId && clientEmail && privateKey) {
        try {
          const auth = new google.auth.JWT({
            email: clientEmail,
            key: privateKey.replace(/\\n/g, "\n"),
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
          });

          const sheets = google.sheets({ version: "v4", auth });
          await sheets.spreadsheets.values.append({
            spreadsheetId: sheetId,
            range: "Sheet1!A:I", // Adjust sheet name as needed
            valueInputOption: "USER_ENTERED",
            requestBody: {
              values: [[
                new Date().toISOString(),
                payload.clientName,
                payload.clientPhone,
                payload.dateTime,
                payload.pickupAddress,
                payload.destinationAddress,
                payload.clientEmail,
                payload.clientMunicipality,
                payload.clientLanguage
              ]],
            },
          });
        } catch (err: any) {
          console.error("Google Sheets Error:", err.message);
        }
      }

      res.status(200).json({ success: true, message: "Reservation processed successfully" });
    } catch (error: any) {
      console.error("Reservation handler error:", error.message);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  });

  // --- Vite / Static Files ---

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

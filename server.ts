import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { Resend } from "resend";
import dotenv from "dotenv";
import calculateHandler from "./api/calculate.js";
import reservationsHandler from "./api/reservations.js";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY || "re_placeholder");

function escapeHtml(text: string) {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function sendTelegramMessage(text: string, photoUrl?: string) {
  const rawToken = process.env.TELEGRAM_BOT_TOKEN?.trim();
  // Soporta varios destinatarios: separa los IDs por coma. Ej: "7163120443,123456789"
  const chatIds = (process.env.TELEGRAM_CHAT_ID || "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);

  if (!rawToken || chatIds.length === 0) {
    console.warn("Telegram configuration missing (Token or Chat ID). Skipping Telegram notification.");
    return;
  }

  // Ensure token is clean of whitespace and non-printable characters
  const sanitizedToken = rawToken.replace(/[\s\u200B-\u200D\uFEFF]/g, "").replace(/^bot/i, "");
  const baseUrl = `https://api.telegram.org/bot${sanitizedToken}`;

  const send = async (method: string, payload: any) => {
    const url = `${baseUrl}/${method}`;
    
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    
    let result;
    try {
      result = await response.json();
    } catch (e) {
      result = { error: "Failed to parse JSON" };
    }
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("TOKEN INVÁLIDO: Telegram no reconoce el Bot Token. Revisa que esté bien pegado en la configuración (Settings > Environment Variables) de AI Studio.");
      }
      throw new Error(`Telegram API Error: ${response.status} - ${JSON.stringify(result)}`);
    }
    return result;
  };

  try {
    for (const chatId of chatIds) {
      if (photoUrl) {
        try {
          await send("sendPhoto", {
            chat_id: chatId,
            photo: photoUrl,
            caption: text,
            parse_mode: "HTML"
          });
          console.log(`Telegram notification (photo) sent successfully to ${chatId}`);
          continue;
        } catch (photoErr) {
          console.warn("Telegram sendPhoto failed, falling back to sendMessage:", photoErr instanceof Error ? photoErr.message : photoErr);
        }
      }

      await send("sendMessage", {
        chat_id: chatId,
        text: text,
        parse_mode: "HTML"
      });
      console.log(`Telegram notification (text) sent successfully to ${chatId}`);
    }
  } catch (err) {
    console.error("Telegram Error:", err instanceof Error ? err.message : err);
  }
}

async function sendToGoogleSheets(data: any) {
  const scriptUrl = process.env.GOOGLE_SHEETS_SCRIPT_URL;
  if (!scriptUrl || !scriptUrl.startsWith("https://script.google.com")) {
    console.warn("Google Sheets URL is missing or invalid. Please check GOOGLE_SHEETS_SCRIPT_URL in Settings.");
    return;
  }

  try {
    console.log("Sending data to Google Sheets URL:", scriptUrl);
    // Gas handles POST requests by reading the raw payload. 
    // We send it as text/plain to avoid CORS preflight issues and simple handling.
    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify(data),
      redirect: 'follow' // Important for GAS as it usually redirects after POST
    });
    
    const result = await response.text();
    if (!response.ok) {
      console.error("Google Sheets API Error Status:", response.status, "Response:", result);
    } else {
      console.log("Google Sheets response successful:", result.substring(0, 50));
    }
  } catch (err) {
    console.error("Google Sheets connection error:", err);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/calculate", async (req, res) => {
    await calculateHandler(req, res);
  });

  app.post("/api/reservations", async (req, res) => {
    await reservationsHandler(req, res);
  });

  // Vite middleware for development
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

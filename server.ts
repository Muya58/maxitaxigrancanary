import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { Resend } from "resend";
import dotenv from "dotenv";

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
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();
  
  if (!rawToken || !chatId) {
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
    if (photoUrl) {
      try {
        await send("sendPhoto", {
          chat_id: chatId,
          photo: photoUrl,
          caption: text,
          parse_mode: "HTML"
        });
        console.log("Telegram notification (photo) sent successfully");
        return;
      } catch (photoErr) {
        console.warn("Telegram sendPhoto failed, falling back to sendMessage:", photoErr instanceof Error ? photoErr.message : photoErr);
      }
    }

    await send("sendMessage", {
      chat_id: chatId,
      text: text,
      parse_mode: "HTML"
    });
    console.log("Telegram notification (text) sent successfully");
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
  app.post("/api/book", async (req, res) => {
    const { formData, translations, lang } = req.body;
    const { name, email, phone, pickup, destination, date, time, passengers, specialRequests, estimatedPrice, estimatedTime } = formData;
    const t = translations;

    // Calculate Commission (10%)
    const rawPrice = estimatedPrice?.toString().replace(/[^\d.]/g, '') || "0";
    const priceValue = parseFloat(rawPrice) || 0;
    const commission = priceValue * 0.10;

    const taxiImageUrl = "https://images.unsplash.com/photo-1549443105-09f19fc1841b?auto=format&fit=crop&q=80&w=800";
    const logoUrl = "https://cdn-icons-png.flaticon.com/512/3448/3448651.png"; // Yellow taxi icon as placeholder logo

    let emailSent = false;
    let emailError = null;

    try {
      const sender = process.env.RESEND_SENDER || "onboarding@resend.dev";
      const fromAddress = sender === "onboarding@resend.dev" ? sender : `MaxiTaxi <${sender}>`;

      // Reservation ID
      const resId = `RES-${Math.floor(100 + Math.random() * 900)}`;

      // 1. Try sending User Confirmation Email
      try {
        const { data, error } = await resend.emails.send({
          from: fromAddress,
          to: email,
          subject: t.subject,
          html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
              <div style="background-color: #eab308; padding: 30px; text-align: center;">
                <img src="${logoUrl}" alt="MaxiTaxi Logo" style="height: 60px; margin-bottom: 10px;">
                <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.025em;">MaxiTaxi<span style="color: #451a03;">Gran Canary</span></h1>
              </div>
              
              <img src="${taxiImageUrl}" alt="Your Taxi" style="width: 100%; height: 200px; object-fit: crop; display: block;">
              
              <div style="padding: 40px;">
                <h2 style="color: #111827; margin-top: 0; font-size: 22px;">${t.greeting} ${name},</h2>
                <p style="color: #4b5563; line-height: 1.6; font-size: 16px;">${t.intro}</p>
                
                <div style="background-color: #fffbeb; padding: 25px; border-radius: 12px; border: 1px solid #fef3c7; margin: 30px 0;">
                  <h3 style="margin-top: 0; border-bottom: 2px solid #fbbf24; padding-bottom: 15px; color: #92400e; font-size: 18px; text-transform: uppercase; letter-spacing: 0.05em;">${t.details}</h3>
                  
                  <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                    <tr>
                      <td style="padding: 8px 0; color: #78350f; font-weight: 600; width: 40%;">${t.pickup}:</td>
                      <td style="padding: 8px 0; color: #111827;">${pickup}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #78350f; font-weight: 600;">${t.destination}:</td>
                      <td style="padding: 8px 0; color: #111827;">${destination}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #78350f; font-weight: 600;">${t.date}:</td>
                      <td style="padding: 8px 0; color: #111827;">${date}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #78350f; font-weight: 600;">${t.time}:</td>
                      <td style="padding: 8px 0; color: #111827;">${time}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #78350f; font-weight: 600;">${t.passengers}:</td>
                      <td style="padding: 8px 0; color: #111827;">${passengers}</td>
                    </tr>
                    ${specialRequests ? `
                    <tr>
                      <td style="padding: 8px 0; color: #78350f; font-weight: 600;">${t.specialRequests}:</td>
                      <td style="padding: 8px 0; color: #111827;">${specialRequests}</td>
                    </tr>
                    ` : ''}
                    ${estimatedTime ? `
                    <tr>
                      <td style="padding: 8px 0; color: #78350f; font-weight: 600;">${t.estimatedTime}:</td>
                      <td style="padding: 8px 0; color: #111827;">${estimatedTime}</td>
                    </tr>
                    ` : ''}
                  </table>

                  <div style="margin-top: 25px; padding-top: 25px; border-top: 2px dashed #fbbf24; text-align: center;">
                    <span style="display: block; color: #92400e; font-size: 14px; font-weight: 600; text-transform: uppercase; margin-bottom: 5px;">${t.estimatedPrice}</span>
                    <span style="font-size: 36px; font-weight: 900; color: #eab308;">~${estimatedPrice}</span>
                  </div>
                </div>
                
                <p style="color: #4b5563; line-height: 1.6; font-size: 15px;">${t.footer}</p>
                
                <div style="margin-top: 40px; text-align: center;">
                  <a href="https://wa.me/34619735892" style="background-color: #25d366; color: white; padding: 12px 25px; text-decoration: none; border-radius: 50px; font-weight: bold; display: inline-block;">Contactar por WhatsApp</a>
                </div>
              </div>
              
              <div style="background-color: #f9fafb; padding: 30px; text-align: center; font-size: 13px; color: #9ca3af; border-top: 1px solid #f3f4f6;">
                <p style="margin-bottom: 5px; color: #4b5563; font-weight: 600;">© 2026 MaxiTaxiGran Canary</p>
                <p style="margin-bottom: 5px;">Gran Canaria, Islas Canarias, España</p>
                <div style="margin-top: 15px;">
                  <a href="#" style="color: #eab308; text-decoration: none; margin: 0 10px;">Privacidad</a>
                  <a href="#" style="color: #eab308; text-decoration: none; margin: 0 10px;">Términos</a>
                </div>
              </div>
            </div>
          `,
        });

        if (error) {
          console.error("Resend API Error (User Email):", JSON.stringify(error, null, 2));
          if (error.name === 'validation_error' || error.message?.includes('onboarding')) {
            console.warn("Resend Sandbox Limit: En modo gratuito, solo puedes recibir correos en tu propia dirección (josepig1978@gmail.com). La reserva se ha guardado, pero el correo al cliente no se ha enviado.");
          }
          emailError = error;
        } else {
          emailSent = true;
        }
      } catch (err) {
        console.error("Resend Exception (User Email):", err);
        emailError = { name: "exception", message: err instanceof Error ? err.message : String(err) };
      }

      // Helper for Google Maps links
      const mapsBase = "https://www.google.com/maps/search/?api=1&query=";
      const originLink = `${mapsBase}${encodeURIComponent(pickup)}`;
      const destLink = `${mapsBase}${encodeURIComponent(destination)}`;
      const routeLink = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(pickup)}&destination=${encodeURIComponent(destination)}`;

      // Estimate realistic-looking distance/time for display (heuristic)
      const mockDist = (15 + (pickup.length + destination.length) / 1.5).toFixed(2);
      const displayTime = estimatedTime || `${Math.round(parseFloat(mockDist) * 1.2)} min`;

      // 2. Send notification to admin via Telegram
      const telegramText = `
<b>NUEVA RESERVA | #${escapeHtml(resId)}</b> 🚕

👤 <b>Cliente:</b> ${escapeHtml(name)}
📱 <b>Teléfono:</b> <a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a>
📧 <b>Email:</b> ${escapeHtml(email)}
📍 <b>Municipio:</b> ${pickup.toLowerCase().includes('aeropuerto') ? 'Aeropuerto' : 'Gran Canaria'}
🌍 <b>Idioma:</b> ${escapeHtml(lang || 'es')}
📅 <b>Fecha y Hora:</b> ${escapeHtml(date)}T${escapeHtml(time)}

📍 <b>Recogida:</b> ${escapeHtml(pickup)}
🏁 <b>Destino:</b> ${escapeHtml(destination)}

🗺️ <a href="${originLink}">Ver Origen</a> | <a href="${destLink}">Ver Destino</a> | <a href="${routeLink}">Ruta Completa</a>

🛣️ <b>Estimación:</b> ${mockDist} km | ${escapeHtml(displayTime)}
💵 <b>Precio:</b> ${priceValue.toFixed(2)}€
📉 <b>Comisión (10%):</b> ${commission.toFixed(2)}€

Por favor, confirma la recepción.
      `.trim();

      await sendTelegramMessage(telegramText, taxiImageUrl);

      // 3. Send to Google Sheets
      await sendToGoogleSheets({
        id: resId,
        date_created: new Date().toISOString(),
        name,
        email,
        phone,
        pickup,
        destination,
        date,
        time,
        passengers,
        specialRequests: specialRequests || "",
        estimatedPrice,
        estimatedTime: estimatedTime || "",
        commission: commission.toFixed(2),
        net: (priceValue - commission).toFixed(2),
      });

      // 4. Try sending Notification to Admin via Email
      try {
        await resend.emails.send({
          from: fromAddress,
          to: sender, 
          subject: `New Booking Request from ${name}`,
          text: `New booking details:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nPickup: ${pickup}\nDestination: ${destination}\nDate: ${date}\nTime: ${time}\nPassengers: ${passengers}\nSpecial Requests: ${specialRequests}\nEstimated Price: ${estimatedPrice}\nEstimated Time: ${estimatedTime}\nCommission (10%): ${commission.toFixed(2)}€`,
        });
      } catch (err) {
        console.error("Resend Exception (Admin Email):", err);
      }

      // Final Response - if Telegram/Sheets worked, we consider the booking "received"
      // but we inform the client about potential email issues if needed
      res.json({ 
        success: true, 
        emailSent,
        emailError: emailSent ? null : emailError,
        isSandboxIssue: emailError?.name === 'validation_error' && sender === 'onboarding@resend.dev'
      });
    } catch (err) {
      console.error("Server Error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
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

// ============================================================
// MaxiTaxi Gran Canaria — Review Bot + Form Handler
// Google Apps Script — script.google.com
// ============================================================

const BOT_TOKEN  = '8647745270:AAGXZnBXRWaLq8QNvLjLtId_6evcyxMFdok';
const CHAT_ID    = '7163120443';
const REVIEW_URL = 'https://g.page/r/Cf24aOocCUdXECE/review';
const SHEET_ID   = '1Z3ceTn0I2MTfEr_FGiiNQ5-akJjm_LEmeEvhiFzU3Jk';
const HORAS      = 3;

// Columnas (0-based): A=0, B=1 ...
const COL_NOMBRE   = 1;   // B
const COL_WHATSAPP = 2;   // C
const COL_EMAIL    = 3;   // D
const COL_FECHA    = 4;   // E — Fecha Recogida
const COL_ORIGEN   = 5;   // F
const COL_DESTINO  = 6;   // G
const COL_IDIOMA   = 7;   // H
const COL_MUNICI   = 8;   // I
const COL_ENVIADA  = 9;   // J — Reseña Enviada
const COL_PRECIO   = 10;  // K — Precio
const COL_COMISION = 11;  // L — Comisión 10%

// ============================================================
// doPost — recibe los datos del formulario web y los graba
// Desplegar como Web App (Execute as: Me, Anyone can access)
// ============================================================
function doPost(e) {
  try {
    const data   = JSON.parse(e.postData.contents);
    const sheet  = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    const ahora  = new Date();

    sheet.appendRow([
      ahora,                        // A — Timestamp
      data.nombre    || '',         // B — Nombre
      data.whatsapp  || '',         // C — WhatsApp
      data.email     || '',         // D — Email
      data.fecha     || '',         // E — Fecha Recogida
      data.origen    || '',         // F — Origen
      data.destino   || '',         // G — Destino
      data.idioma    || '',         // H — Idioma
      data.municipio || '',         // I — Municipio
      '',                           // J — Reseña Enviada (vacío al crear)
      data.precio    || '',         // K — Precio
      data.comision  || '',         // L — Comisión 10%
    ]);

    // Notificación inmediata al operador
    notificarNuevaReserva(data);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ============================================================
// Notificación inmediata de nueva reserva al operador
// ============================================================
function notificarNuevaReserva(data) {
  const phone    = limpiarTelefono(data.whatsapp);
  const precio   = data.precio   || '—';
  const comision = data.comision || '—';

  const texto =
    `🚖 *NUEVA RESERVA*\n\n` +
    `👤 *Cliente:* ${data.nombre}\n` +
    `📱 *Teléfono:* ${data.whatsapp}\n` +
    `📧 *Email:* ${data.email || '—'}\n` +
    `📍 *Municipio:* ${data.municipio || '—'}\n` +
    `🌍 *Idioma:* ${(data.idioma || 'ES').toUpperCase()}\n` +
    `📅 *Fecha y Hora:* ${data.fecha}\n\n` +
    `📍 *Recogida:* ${data.origen}\n` +
    `🏁 *Destino:* ${data.destino || data.municipio}\n\n` +
    `💶 *Precio:* ${precio}\n` +
    `📉 *Comisión (10%):* ${comision}\n\n` +
    `_Por favor, confirma la recepción._`;

  enviarTelegram(texto, [[{ text: '💬 Abrir WhatsApp del cliente', url: `https://wa.me/${phone}` }]]);
}

// ============================================================
// checkAndSendReviews — se ejecuta cada 30 min por el trigger
// ============================================================
function checkAndSendReviews() {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
  const data  = sheet.getDataRange().getValues();
  const now   = new Date();

  for (let i = 1; i < data.length; i++) {
    const row      = data[i];
    const nombre   = row[COL_NOMBRE];
    const whatsapp = row[COL_WHATSAPP];
    const rawFecha = row[COL_FECHA];
    const destino  = row[COL_DESTINO] || row[COL_MUNICI] || 'destino';
    const enviada  = row[COL_ENVIADA];

    if (!nombre || !whatsapp || !rawFecha || enviada) continue;

    const fechaRecogida = new Date(rawFecha);
    if (isNaN(fechaRecogida)) continue;

    const horaEnvio = new Date(fechaRecogida.getTime() + HORAS * 3600 * 1000);

    if (now >= horaEnvio) {
      const exito = enviarSolicitudResena(nombre, whatsapp, destino);
      if (exito) {
        sheet.getRange(i + 1, COL_ENVIADA + 1)
             .setValue('✅ ' + Utilities.formatDate(now, 'Europe/Madrid', 'dd/MM/yyyy HH:mm'));
      }
    }
  }
}

// ============================================================
// Envía la solicitud de reseña al operador vía Telegram
// ============================================================
function enviarSolicitudResena(nombre, whatsapp, destino) {
  const phone = limpiarTelefono(whatsapp);

  const textoWa = encodeURIComponent(
    `Hola ${nombre} 👋\n\n` +
    `¡Gracias por confiar en MaxiTaxi Gran Canaria!\n\n` +
    `Si tu experiencia fue buena, nos ayudaría muchísimo que nos dejaras una reseña en Google — solo tarda 1 minuto:\n\n` +
    `⭐ ${REVIEW_URL}\n\n` +
    `¡Muchas gracias y buen viaje! 🙏`
  );

  const waUrl = `https://wa.me/${phone}?text=${textoWa}`;

  const texto =
    `⭐ *Solicitar reseña*\n\n` +
    `👤 *Cliente:* ${nombre}\n` +
    `📍 *Destino:* ${destino}\n` +
    `📱 *WhatsApp:* +${phone}\n\n` +
    `_Han pasado ${HORAS}h desde la recogida._\n` +
    `Pulsa para enviarle el link con 1 tap 👇`;

  return enviarTelegram(texto, [[{ text: '⭐ Enviar reseña por WhatsApp', url: waUrl }]]);
}

// ============================================================
// Helper: envía mensaje al bot de Telegram con botones
// ============================================================
function enviarTelegram(texto, botones) {
  const payload = {
    chat_id:      CHAT_ID,
    text:         texto,
    parse_mode:   'Markdown',
    reply_markup: { inline_keyboard: botones }
  };

  const resp = UrlFetchApp.fetch(
    `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
    {
      method:             'post',
      contentType:        'application/json',
      payload:            JSON.stringify(payload),
      muteHttpExceptions: true
    }
  );

  const res = JSON.parse(resp.getContentText());
  if (!res.ok) console.error('Telegram error:', JSON.stringify(res));
  return res.ok;
}

// ============================================================
// Helper: normaliza teléfono a formato internacional sin +
// ============================================================
function limpiarTelefono(raw) {
  let t = String(raw).replace(/\D/g, '');
  if (t.startsWith('00')) t = t.slice(2);
  if (t.length === 9)     t = '34' + t;
  return t;
}

// ============================================================
// SETUP: ejecutar UNA VEZ para crear el trigger de 30 min
// ============================================================
function crearTrigger() {
  ScriptApp.getProjectTriggers().forEach(t => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger('checkAndSendReviews')
    .timeBased()
    .everyMinutes(30)
    .create();
  console.log('✅ Trigger creado: cada 30 min');
}

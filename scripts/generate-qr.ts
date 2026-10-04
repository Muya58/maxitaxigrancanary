import QRCode from 'qrcode';
import { createCanvas, loadImage } from 'canvas';
import fs from 'fs';
import path from 'path';

// ─── Config ────────────────────────────────────────────────────────────────
const URL        = 'https://www.maxitaxigrancanary.com/#reserva';
const BRAND_YELLOW = '#F5A623';
const BRAND_DARK   = '#0A0A0F';
const OUT_DIR    = path.join(process.cwd(), 'public');

// ─── Helpers ───────────────────────────────────────────────────────────────
async function getQRMatrix(url: string, size: number): Promise<boolean[][]> {
  // Get QR as data URL then parse pixel matrix
  const dataUrl = await QRCode.toDataURL(url, {
    errorCorrectionLevel: 'H',
    margin: 1,
    width: size,
    color: { dark: '#000000', light: '#FFFFFF' },
  });
  return dataUrl as any; // we use canvas renderer below
}

async function getQRBuffer(url: string, size: number): Promise<Buffer> {
  return await QRCode.toBuffer(url, {
    errorCorrectionLevel: 'H',
    margin: 2,
    width: size,
    color: { dark: '#000000', light: '#FFFFFF' },
  }) as Buffer;
}

function drawTaxiIcon(ctx: any, cx: number, cy: number, r: number) {
  // Yellow circle background
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = BRAND_YELLOW;
  ctx.fill();

  // White border ring
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = r * 0.08;
  ctx.stroke();

  // Taxi car body (simplified)
  const s = r * 0.55; // scale factor
  ctx.fillStyle = '#FFFFFF';

  // Car body (rounded rect)
  const bx = cx - s * 0.9;
  const by = cy - s * 0.1;
  const bw = s * 1.8;
  const bh = s * 0.7;
  ctx.beginPath();
  ctx.roundRect(bx, by, bw, bh, bh * 0.25);
  ctx.fill();

  // Car roof
  const rx = cx - s * 0.5;
  const ry = cy - s * 0.65;
  const rw = s * 1.0;
  const rh = s * 0.55;
  ctx.beginPath();
  ctx.roundRect(rx, ry, rw, rh, rh * 0.3);
  ctx.fill();

  // Wheels
  ctx.fillStyle = BRAND_DARK;
  ctx.beginPath();
  ctx.arc(cx - s * 0.5, cy + s * 0.52, s * 0.22, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(cx + s * 0.5, cy + s * 0.52, s * 0.22, 0, Math.PI * 2);
  ctx.fill();

  // Wheel shine
  ctx.fillStyle = '#AAAAAA';
  ctx.beginPath();
  ctx.arc(cx - s * 0.5, cy + s * 0.52, s * 0.10, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(cx + s * 0.5, cy + s * 0.52, s * 0.10, 0, Math.PI * 2);
  ctx.fill();
}

// ─── File 1: QR Print (2000×2000) ─────────────────────────────────────────
async function generatePrintQR() {
  const SIZE  = 2000;
  const QR_SZ = 1700; // QR occupies most of the canvas
  const canvas = createCanvas(SIZE, SIZE);
  const ctx    = canvas.getContext('2d');

  // White background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, SIZE, SIZE);

  // Generate QR as image
  const qrBuffer = await getQRBuffer(URL, QR_SZ);
  const qrImg    = await loadImage(qrBuffer);
  const offset   = (SIZE - QR_SZ) / 2;
  ctx.drawImage(qrImg, offset, offset, QR_SZ, QR_SZ);

  // White square in center to mask QR for logo
  const logoR   = QR_SZ * 0.11;
  const centerX = SIZE / 2;
  const centerY = SIZE / 2;

  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(centerX - logoR * 1.1, centerY - logoR * 1.1, logoR * 2.2, logoR * 2.2);

  // Draw taxi icon in center
  drawTaxiIcon(ctx, centerX, centerY, logoR);

  // Yellow accent bar at bottom
  const barH = SIZE * 0.055;
  ctx.fillStyle = BRAND_YELLOW;
  ctx.fillRect(0, SIZE - barH, SIZE, barH);

  // Text on bar
  ctx.fillStyle = BRAND_DARK;
  ctx.font = `bold ${barH * 0.5}px Arial, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('maxitaxigrancanary.com', SIZE / 2, SIZE - barH / 2);

  // Save
  const outPath = path.join(OUT_DIR, 'qr-print.png');
  fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
  console.log(`✅  qr-print.png  → ${outPath}`);
}

// ─── File 2: Social Card (1200×628) ────────────────────────────────────────
async function generateSocialCard() {
  const W = 1200;
  const H = 628;
  const canvas = createCanvas(W, H);
  const ctx    = canvas.getContext('2d');

  // Dark background
  ctx.fillStyle = BRAND_DARK;
  ctx.fillRect(0, 0, W, H);

  // Left yellow accent bar
  ctx.fillStyle = BRAND_YELLOW;
  ctx.fillRect(0, 0, 8, H);

  // ── Left side branding ──────────────────────────────────────────────────
  const LEFT_X = 70;

  // Brand badge
  const badgeW = 220;
  const badgeH = 38;
  ctx.fillStyle = `${BRAND_YELLOW}22`;
  ctx.strokeStyle = `${BRAND_YELLOW}55`;
  ctx.lineWidth = 1;
  ctx.beginPath();
  (ctx as any).roundRect(LEFT_X, 52, badgeW, badgeH, 6);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = BRAND_YELLOW;
  ctx.font = 'bold 14px Arial, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('GRAN CANARIA PREMIUM TRANSFERS', LEFT_X + 14, 52 + badgeH / 2);

  // Logo taxi icon (small)
  drawTaxiIcon(ctx, LEFT_X + 30, 145, 28);

  // Company name
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 52px Arial, sans-serif';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText('MaxiTaxi', LEFT_X + 75, 158);

  ctx.fillStyle = BRAND_YELLOW;
  ctx.font = 'bold 52px Arial, sans-serif';
  ctx.fillText('GranCanary', LEFT_X, 218);

  // Divider
  ctx.strokeStyle = `${BRAND_YELLOW}40`;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(LEFT_X, 242);
  ctx.lineTo(LEFT_X + 380, 242);
  ctx.stroke();

  // Tagline
  ctx.fillStyle = '#E2E8F0';
  ctx.font = '22px Arial, sans-serif';
  ctx.fillText('Escanea y reserva tu taxi ahora', LEFT_X, 284);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '18px Arial, sans-serif';
  ctx.fillText('Traslados 24h · Aeropuerto · Grupos · PMR', LEFT_X, 320);

  // Phone
  ctx.fillStyle = BRAND_YELLOW;
  ctx.font = 'bold 26px Arial, sans-serif';
  ctx.fillText('📞  +34 619 735 892', LEFT_X, 390);

  // URL
  ctx.fillStyle = '#64748B';
  ctx.font = '16px Arial, sans-serif';
  ctx.fillText('maxitaxigrancanary.com/#reserva', LEFT_X, 425);

  // Bullet features
  const features = ['Sin esperas en aeropuerto', 'Hasta 8 pasajeros', 'Precio cerrado'];
  ctx.font = '15px Arial, sans-serif';
  features.forEach((f, i) => {
    const fy = 470 + i * 30;
    ctx.fillStyle = BRAND_YELLOW;
    ctx.fillText('▸', LEFT_X, fy);
    ctx.fillStyle = '#94A3B8';
    ctx.fillText(f, LEFT_X + 20, fy);
  });

  // ── Right side QR ────────────────────────────────────────────────────────
  const QR_SZ  = 440;
  const QR_X   = W - QR_SZ - 70;
  const QR_Y   = (H - QR_SZ) / 2;

  // QR container card
  const pad = 24;
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  (ctx as any).roundRect(QR_X - pad, QR_Y - pad, QR_SZ + pad * 2, QR_SZ + pad * 2 + 48, 20);
  ctx.fill();

  // Yellow border
  ctx.strokeStyle = BRAND_YELLOW;
  ctx.lineWidth = 4;
  ctx.beginPath();
  (ctx as any).roundRect(QR_X - pad, QR_Y - pad, QR_SZ + pad * 2, QR_SZ + pad * 2 + 48, 20);
  ctx.stroke();

  // QR image
  const qrBuffer = await getQRBuffer(URL, QR_SZ);
  const qrImg    = await loadImage(qrBuffer);
  ctx.drawImage(qrImg, QR_X, QR_Y, QR_SZ, QR_SZ);

  // Logo on top of QR center
  drawTaxiIcon(ctx, QR_X + QR_SZ / 2, QR_Y + QR_SZ / 2, QR_SZ * 0.10);

  // Label below QR
  ctx.fillStyle = BRAND_DARK;
  ctx.font = 'bold 15px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('RESERVA ONLINE', QR_X + QR_SZ / 2, QR_Y + QR_SZ + pad + 14);

  // Save
  const outPath = path.join(OUT_DIR, 'qr-social.png');
  fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
  console.log(`✅  qr-social.png → ${outPath}`);
}

// ─── Run ───────────────────────────────────────────────────────────────────
(async () => {
  console.log('\n🚕  MaxiTaxi QR Generator\n');
  await generatePrintQR();
  await generateSocialCard();
  console.log('\n🎉  ¡Listo! Archivos guardados en /public\n');
})();

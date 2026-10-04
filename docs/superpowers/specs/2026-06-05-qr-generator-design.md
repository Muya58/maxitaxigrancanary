# QR Generator — MaxiTaxi Gran Canary

**Fecha:** 2026-06-05

## Objetivo
Script único que genera dos imágenes PNG con el QR de reserva directo a `https://www.maxitaxigrancanary.com/#reserva`.

## Outputs
| Archivo | Tamaño | Uso |
|---|---|---|
| `public/qr-print.png` | 2000×2000 px | Impresión (tarjetas, flyers) |
| `public/qr-social.png` | 1200×628 px | Redes sociales / WhatsApp |

## Diseño visual
- **qr-print**: fondo blanco, módulos negros, cuadrado amarillo con icono taxi en centro
- **qr-social**: fondo #0A0A0F, branding izquierda (logo + nombre + teléfono), QR derecha con borde amarillo

## Dependencias
- `qrcode` + `@types/qrcode` — generación del QR
- `canvas` (node-canvas) + `@types/canvas` — composición de imágenes

## Ejecución
```bash
npm run generate-qr
```
Añadido a `package.json` scripts como `"generate-qr": "tsx scripts/generate-qr.ts"`.

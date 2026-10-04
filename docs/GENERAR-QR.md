# Generación de QR — MaxiTaxi Gran Canary

El QR lleva directamente a la sección de reserva:
**https://www.maxitaxigrancanary.com/#reserva**

## Cómo generar los QR

Desde la carpeta del proyecto ejecutar:

```bash
npm run generate-qr
```

Esto genera **dos archivos** en la carpeta `/public`:

| Archivo | Tamaño | Uso |
|---|---|---|
| `qr-print.png` | 2000×2000 px | Impresión (tarjetas, flyers, pegatinas) |
| `qr-social.png` | 1200×628 px | Redes sociales y WhatsApp |

## Cambiar la URL destino

Si necesitas apuntar el QR a otra URL, editar la **línea 8** de `scripts/generate-qr.ts`:

```ts
const URL = 'https://www.maxitaxigrancanary.com/#reserva';
```

Luego volver a ejecutar `npm run generate-qr`.

## Archivos generados

```
public/
├── qr-print.png    ← para imprimir
└── qr-social.png   ← para redes / WhatsApp
```

## Script

`scripts/generate-qr.ts` — usa las librerías `qrcode` + `canvas`.

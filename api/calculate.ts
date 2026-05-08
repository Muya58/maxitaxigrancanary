export default function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const { pickupAddress, destinationAddress } = req.body;
  const dest = (destinationAddress || "").toLowerCase();

  // 1. Establecemos un precio y distancia base por defecto
  let basePrice = 40; 
  let distance = 30;
  let duration = 25;

  // 2. Lógica sencilla de zonas (puedes ajustar los precios y nombres)
  if (dest.includes("maspalomas") || dest.includes("meloneras")) {
     basePrice = 45; 
     distance = 32; 
     duration = 28;
  } else if (dest.includes("mogan") || dest.includes("puerto rico") || dest.includes("amadores")) {
     basePrice = 65; 
     distance = 48; 
     duration = 40;
  } else if (dest.includes("las palmas") || dest.includes("capital")) {
     basePrice = 35; 
     distance = 25; 
     duration = 20;
  } else if (dest.includes("agaete")) {
     basePrice = 75;
     distance = 55;
     duration = 50;
  }

  // 3. Aplicamos la comisión exacta del 10%
  // Math.round asegura que no salgan decimales raros (ej: 49.50 -> 50€)
  const finalPrice = Math.round(basePrice * 1.10);

  // 4. Devolvemos los datos a la web
  res.status(200).json({
    totalPrice: finalPrice.toString(),
    distanceKm: distance.toString(),
    durationMins: duration.toString()
  });
}

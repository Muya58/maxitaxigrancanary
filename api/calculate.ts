export default function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const { pickupAddress, destinationAddress, dateTime } = req.body;
  const dest = (destinationAddress || "").toLowerCase();
  const origin = (pickupAddress || "").toLowerCase();

  // 1. Determinar Distancia base (km) y tiempo estimado (mins)
  let distance = 30;
  let duration = 25;

  const loc = dest.includes("aeropuerto") || dest.includes("lpa") ? origin : dest;

  if (loc.includes("maspalomas") || loc.includes("meloneras") || loc.includes("playa del ingles")) {
     distance = 32; duration = 28;
  } else if (loc.includes("mogan") || loc.includes("amadores") || loc.includes("taurito")) {
     distance = 47; duration = 40;
  } else if (loc.includes("puerto rico") || loc.includes("arguineguin")) {
     distance = 42; duration = 35;
  } else if (loc.includes("las palmas") || loc.includes("capital")) {
     distance = 25; duration = 20;
  } else if (loc.includes("agaete") || loc.includes("puerto de las nieves")) {
     distance = 55; duration = 50;
  } else if (loc.includes("arucas")) {
     distance = 35; duration = 30;
  } else if (loc.includes("telde")) {
     distance = 15; duration = 15;
  } else if (loc.includes("galdar") || loc.includes("guia")) {
     distance = 50; duration = 45;
  }

  // 2. Determinar Tarifa (Diurna o Nocturna/Festiva)
  // Horario nocturno oficial: 22:00 a 06:00
  let isNight = false;
  if (dateTime) {
    const dateObj = new Date(dateTime);
    const hour = dateObj.getHours();
    if (hour >= 22 || hour < 6) {
      isNight = true;
    }
  }

  const ratePerKm = isNight ? 1.55 : 1.35;
  const airportSupplement = 2.10;

  // Calculamos el precio base oficial del Cabildo
  let officialPrice = (distance * ratePerKm);
  
  // Añadimos suplemento de aeropuerto si aplica
  if (origin.includes("aeropuerto") || dest.includes("aeropuerto") || origin.includes("lpa") || dest.includes("lpa")) {
    officialPrice += airportSupplement;
  }

  // Redondeamos el precio oficial (ej. 45.30 -> 45)
  let basePrice = Math.round(officialPrice);

  // 3. Aplicamos la comisión del 10% para la plataforma web
  const finalPrice = Math.round(basePrice * 1.10);

  // 4. Devolvemos los datos a la web
  res.status(200).json({
    totalPrice: finalPrice.toString(),
    distanceKm: distance.toString(),
    durationMins: duration.toString()
  });
}

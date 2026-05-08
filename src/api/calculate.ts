export default function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).end();

  // El código de la IA intentaba buscar un servidor de precios que no existe.
  // Aquí devolvemos un precio estándar para que el tarificador de tu web funcione visualmente.
  // Más adelante podemos programar reglas de km reales.
  res.status(200).json({
    totalPrice: "45",
    distanceKm: "32",
    durationMins: "28"
  });
}

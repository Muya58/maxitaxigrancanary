const LOCATIONS = [
  { name: "Aeropuerto Gran Canaria (LPA)", keywords: ["aeropuerto", "lpa", "airport", "aeropuerto gran canaria"], lat: 27.9319, lng: -15.3866 },
  { name: "Las Palmas - Centro", keywords: ["las palmas", "capital", "triana", "vegueta", "ciudad jardin", "parque santa catalina", "santa catalina"], lat: 28.1100, lng: -15.4150 },
  { name: "Las Palmas - Las Canteras", keywords: ["canteras", "alcaravaneras"], lat: 28.1375, lng: -15.4497 },
  { name: "Maspalomas", keywords: ["maspalomas", "faro de maspalomas"], lat: 27.7611, lng: -15.5861 },
  { name: "Playa del Ingles", keywords: ["playa del ingles", "inglés", "ingles"], lat: 27.7572, lng: -15.5697 },
  { name: "Meloneras", keywords: ["meloneras"], lat: 27.7422, lng: -15.5936 },
  { name: "San Agustin", keywords: ["san agustin", "san agustín"], lat: 27.7736, lng: -15.5414 },
  { name: "Puerto Rico", keywords: ["puerto rico"], lat: 27.7869, lng: -15.7094 },
  { name: "Arguineguin", keywords: ["arguineguin", "arguineguín"], lat: 27.7608, lng: -15.6831 },
  { name: "Puerto de Mogan", keywords: ["puerto de mogan", "puerto mogan", "puerto de mogán"], lat: 27.8083, lng: -15.7428 },
  { name: "Mogan", keywords: ["mogan", "mogán"], lat: 27.9000, lng: -15.7253 },
  { name: "Taurito", keywords: ["taurito"], lat: 27.8194, lng: -15.7261 },
  { name: "Amadores", keywords: ["amadores"], lat: 27.7906, lng: -15.7228 },
  { name: "Telde", keywords: ["telde"], lat: 27.9933, lng: -15.4167 },
  { name: "Aguimes", keywords: ["aguimes", "agüimes"], lat: 27.9058, lng: -15.4469 },
  { name: "Vecindario", keywords: ["vecindario", "el doctoral"], lat: 27.8667, lng: -15.4167 },
  { name: "Ingenio", keywords: ["ingenio"], lat: 27.9228, lng: -15.4397 },
  { name: "Santa Lucia de Tirajana", keywords: ["santa lucia", "santa lucía"], lat: 27.9200, lng: -15.5300 },
  { name: "San Bartolome de Tirajana", keywords: ["san bartolome", "san bartolomé"], lat: 27.8667, lng: -15.5694 },
  { name: "Agaete", keywords: ["agaete"], lat: 28.0997, lng: -15.7014 },
  { name: "Puerto de las Nieves", keywords: ["puerto de las nieves", "nieves"], lat: 28.0914, lng: -15.7075 },
  { name: "Arucas", keywords: ["arucas"], lat: 28.1281, lng: -15.5222 },
  { name: "Galdar", keywords: ["galdar", "gáldar"], lat: 28.1456, lng: -15.6528 },
  { name: "Guia", keywords: ["guia", "guía", "santa maria de guia"], lat: 28.1306, lng: -15.6369 },
  { name: "Teror", keywords: ["teror"], lat: 28.0577, lng: -15.5494 },
  { name: "Cruz de Tejeda", keywords: ["tejeda", "cruz de tejeda"], lat: 27.9781, lng: -15.5978 },
  { name: "Moya", keywords: ["moya"], lat: 28.1083, lng: -15.5889 },
];

// Real road distances (km) between key location pairs.
// Keys are alphabetically sorted names joined by "|" — direction doesn't matter.
// Based on actual GC-1 / GC-2 route distances.
const ROAD_KM: Record<string, { km: number; mins: number }> = {
  "aeropuerto gran canaria (lpa)|aguimes": { km: 20, mins: 18 },
  "aeropuerto gran canaria (lpa)|agaete": { km: 63, mins: 68 },
  "aeropuerto gran canaria (lpa)|amadores": { km: 72, mins: 60 },
  "aeropuerto gran canaria (lpa)|arguineguin": { km: 63, mins: 52 },
  "aeropuerto gran canaria (lpa)|arucas": { km: 35, mins: 30 },
  "aeropuerto gran canaria (lpa)|cruz de tejeda": { km: 58, mins: 65 },
  "aeropuerto gran canaria (lpa)|galdar": { km: 52, mins: 48 },
  "aeropuerto gran canaria (lpa)|guia": { km: 48, mins: 44 },
  "aeropuerto gran canaria (lpa)|ingenio": { km: 17, mins: 16 },
  "aeropuerto gran canaria (lpa)|las palmas - centro": { km: 46, mins: 38 },
  "aeropuerto gran canaria (lpa)|las palmas - las canteras": { km: 48, mins: 42 },
  "aeropuerto gran canaria (lpa)|maspalomas": { km: 55, mins: 42 },
  "aeropuerto gran canaria (lpa)|meloneras": { km: 57, mins: 44 },
  "aeropuerto gran canaria (lpa)|mogan": { km: 90, mins: 75 },
  "aeropuerto gran canaria (lpa)|moya": { km: 42, mins: 40 },
  "aeropuerto gran canaria (lpa)|playa del ingles": { km: 50, mins: 40 },
  "aeropuerto gran canaria (lpa)|puerto de las nieves": { km: 65, mins: 70 },
  "aeropuerto gran canaria (lpa)|puerto de mogan": { km: 82, mins: 68 },
  "aeropuerto gran canaria (lpa)|puerto rico": { km: 68, mins: 56 },
  "aeropuerto gran canaria (lpa)|san agustin": { km: 47, mins: 38 },
  "aeropuerto gran canaria (lpa)|san bartolome de tirajana": { km: 58, mins: 50 },
  "aeropuerto gran canaria (lpa)|santa lucia de tirajana": { km: 38, mins: 34 },
  "aeropuerto gran canaria (lpa)|taurito": { km: 75, mins: 62 },
  "aeropuerto gran canaria (lpa)|telde": { km: 15, mins: 14 },
  "aeropuerto gran canaria (lpa)|teror": { km: 45, mins: 44 },
  "aeropuerto gran canaria (lpa)|vecindario": { km: 28, mins: 24 },
  // Between south resorts
  "arguineguin|maspalomas": { km: 18, mins: 18 },
  "arguineguin|playa del ingles": { km: 22, mins: 20 },
  "arguineguin|puerto de mogan": { km: 20, mins: 20 },
  "arguineguin|puerto rico": { km: 8, mins: 10 },
  "amadores|puerto rico": { km: 5, mins: 8 },
  "maspalomas|meloneras": { km: 5, mins: 8 },
  "maspalomas|playa del ingles": { km: 5, mins: 8 },
  "maspalomas|puerto de mogan": { km: 30, mins: 28 },
  "maspalomas|puerto rico": { km: 22, mins: 20 },
  "maspalomas|san agustin": { km: 10, mins: 12 },
  "meloneras|playa del ingles": { km: 8, mins: 10 },
  "meloneras|puerto rico": { km: 28, mins: 24 },
  "playa del ingles|puerto rico": { km: 24, mins: 22 },
  "playa del ingles|san agustin": { km: 8, mins: 10 },
  "puerto de mogan|puerto rico": { km: 15, mins: 16 },
  "puerto de mogan|taurito": { km: 8, mins: 10 },
  // Las Palmas connections
  "arucas|las palmas - centro": { km: 12, mins: 18 },
  "las palmas - centro|las palmas - las canteras": { km: 4, mins: 10 },
  "las palmas - centro|maspalomas": { km: 70, mins: 55 },
  "las palmas - centro|playa del ingles": { km: 68, mins: 53 },
  "las palmas - centro|puerto rico": { km: 85, mins: 65 },
  "las palmas - centro|telde": { km: 18, mins: 20 },
};

function routeKey(a: string, b: string): string {
  return [a.toLowerCase(), b.toLowerCase()].sort().join("|");
}

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function normalize(text: string): string {
  return (text || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

function findLocation(text: string) {
  const lower = normalize(text);
  return LOCATIONS.find((loc) =>
    loc.keywords.some((kw) => lower.includes(normalize(kw)))
  ) || null;
}

export default function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).end();

  const { pickupAddress, destinationAddress, dateTime } = req.body;

  const fromLoc = findLocation(pickupAddress);
  const toLoc = findLocation(destinationAddress);

  let distance: number;
  let duration: number;

  if (fromLoc && toLoc) {
    if (fromLoc.name === toLoc.name) {
      distance = 5;
      duration = 10;
    } else {
      const key = routeKey(fromLoc.name, toLoc.name);
      const known = ROAD_KM[key];
      if (known) {
        distance = known.km;
        duration = known.mins;
      } else {
        // Fallback: Haversine × 1.7 (Gran Canaria roads are very winding)
        const straightKm = haversineKm(fromLoc.lat, fromLoc.lng, toLoc.lat, toLoc.lng);
        distance = Math.max(5, Math.round(straightKm * 1.7));
        duration = Math.round((distance / 50) * 60 + 8);
      }
    }
  } else {
    distance = 30;
    duration = 28;
  }

  // Night tariff: 22:00 to 06:00
  let isNight = false;
  if (dateTime) {
    const hour = new Date(dateTime).getHours();
    if (hour >= 22 || hour < 6) isNight = true;
  }

  // MaxiTaxi Gran Canaria rates (calibrated to real market prices)
  const BASE_FARE = 5.0;
  const ratePerKm = isNight ? 1.15 : 0.93;

  let price = BASE_FARE + distance * ratePerKm;

  // Airport supplement
  const isAirportRoute =
    fromLoc?.name.includes("Aeropuerto") ||
    toLoc?.name.includes("Aeropuerto") ||
    normalize(pickupAddress || "").includes("aeropuerto") ||
    normalize(destinationAddress || "").includes("aeropuerto") ||
    (pickupAddress || "").toUpperCase().includes("LPA") ||
    (destinationAddress || "").toUpperCase().includes("LPA");
  if (isAirportRoute) price += 2.10;

  const finalPrice = Math.round(price);

  res.status(200).json({
    totalPrice: finalPrice.toString(),
    distanceKm: distance.toString(),
    durationMins: duration.toString(),
    isEstimate: !fromLoc || !toLoc,
  });
}

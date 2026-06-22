export interface Destination {
  slug: string;
  name: string;
  urlPath: string;
  title: string;
  metaDescription: string;
  h1: string;
  subheading: string;
  img: string;
  distanceKm: number;
  durationMins: number;
  priceFrom: number;
  content: string;
  highlights: string[];
}

export const destinations: Destination[] = [
  {
    slug: 'maspalomas',
    name: 'Maspalomas',
    urlPath: '/transfer-maspalomas',
    title: 'Taxi Transfer Maspalomas ↔ Aeropuerto Gran Canaria | MaxiTaxi',
    metaDescription: 'Transfer taxi Maspalomas al aeropuerto Gran Canaria (LPA). Taxi 8 plazas, precio fijo desde 55€, 24h. Monitorización de vuelos. Reserva por WhatsApp o web.',
    h1: 'Transfer Taxi Maspalomas — Aeropuerto Gran Canaria',
    subheading: 'Traslado directo desde Maspalomas y Playa del Inglés al Aeropuerto LPA. Taxi de 8 plazas con precio cerrado, sin sorpresas.',
    img: '/maspalomas.jpg',
    distanceKm: 47,
    durationMins: 40,
    priceFrom: 55,
    content: 'Maspalomas y Playa del Inglés son los destinos turísticos más demandados del sur de Gran Canaria. MaxiTaxi ofrece transfer directo desde el Aeropuerto de Gran Canaria (LPA) hasta cualquier hotel, apartamento o urbanización de la zona. Nuestros vehículos de 8 plazas son perfectos para familias y grupos con mucho equipaje, tablas de surf o sillas de ruedas.',
    highlights: ['Dunas de Maspalomas', 'Playa del Inglés', 'Centro Comercial Faro 2', 'Puerto Deportivo'],
  },
  {
    slug: 'las-palmas',
    name: 'Las Palmas',
    urlPath: '/transfer-las-palmas',
    title: 'Taxi Transfer Las Palmas ↔ Aeropuerto Gran Canaria | MaxiTaxi',
    metaDescription: 'Transfer taxi Las Palmas de Gran Canaria al aeropuerto LPA. Taxi 8 plazas, precio fijo desde 35€, 24h. Triana, Las Canteras, Santa Catalina. Reserva online.',
    h1: 'Transfer Taxi Las Palmas — Aeropuerto Gran Canaria',
    subheading: 'Traslado rápido desde Las Palmas de Gran Canaria al Aeropuerto LPA en 25 minutos. Sin esperas, precio cerrado.',
    img: '/laspalmas.jpg',
    distanceKm: 28,
    durationMins: 25,
    priceFrom: 35,
    content: 'Las Palmas de Gran Canaria es la capital de la isla y uno de los destinos más conectados con el aeropuerto. MaxiTaxi cubre todos los barrios de la ciudad: Triana, Las Canteras, Santa Catalina, Vegueta, El Confital y más. Trayecto rápido de apenas 25 minutos con precio cerrado, sin taxímetro.',
    highlights: ['Playa de Las Canteras', 'Triana', 'Santa Catalina', 'Vegueta', 'Puerto de La Luz'],
  },
  {
    slug: 'puerto-rico',
    name: 'Puerto Rico',
    urlPath: '/transfer-puerto-rico',
    title: 'Taxi Transfer Puerto Rico ↔ Aeropuerto Gran Canaria | MaxiTaxi',
    metaDescription: 'Transfer taxi Puerto Rico Gran Canaria al aeropuerto LPA. Taxi 8 plazas, precio fijo desde 60€, 24h. Servicio de deportes náuticos y familia. Reserva online.',
    h1: 'Transfer Taxi Puerto Rico — Aeropuerto Gran Canaria',
    subheading: 'Traslado directo desde Puerto Rico al Aeropuerto LPA. Ideal para grupos con material náutico o familias con niños.',
    img: '/puertorico.jpg',
    distanceKm: 55,
    durationMins: 50,
    priceFrom: 60,
    content: 'Puerto Rico es uno de los enclaves turísticos más activos del suroeste de Gran Canaria, conocido por sus deportes náuticos y su marina. MaxiTaxi realiza el transfer entre Puerto Rico y el Aeropuerto de Gran Canaria con capacidad para 8 pasajeros y todo su equipaje, incluyendo material de buceo, windsurf o bicicletas.',
    highlights: ['Marina de Puerto Rico', 'Playa de Puerto Rico', 'Amadores', 'Arguineguín'],
  },
  {
    slug: 'meloneras',
    name: 'Meloneras',
    urlPath: '/transfer-meloneras',
    title: 'Taxi Transfer Meloneras ↔ Aeropuerto Gran Canaria | MaxiTaxi',
    metaDescription: 'Transfer taxi Meloneras al aeropuerto Gran Canaria (LPA). Taxi 8 plazas, precio fijo desde 58€, 24h. Hotels de lujo y golf. Reserva online o WhatsApp.',
    h1: 'Transfer Taxi Meloneras — Aeropuerto Gran Canaria',
    subheading: 'Traslado exclusivo desde Meloneras y sus hoteles de lujo al Aeropuerto LPA. Servicio premium para grupos y familias.',
    img: '/meloneras.jpg',
    distanceKm: 50,
    durationMins: 45,
    priceFrom: 58,
    content: 'Meloneras es la zona hotelera premium del sur de Gran Canaria, hogar de los grandes resorts y el paseo marítimo más exclusivo de la isla. MaxiTaxi ofrece transfer privado desde todos los hoteles de Meloneras hasta el Aeropuerto LPA, con vehículos de 8 plazas perfectos para grupos familiares o de negocios.',
    highlights: ['Lopesan Costa Meloneras', 'Seaside Grand Hotel', 'Campo de Golf Meloneras', 'Paseo Marítimo'],
  },
  {
    slug: 'agaete',
    name: 'Agaete',
    urlPath: '/transfer-agaete',
    title: 'Taxi Transfer Agaete ↔ Aeropuerto Gran Canaria | MaxiTaxi',
    metaDescription: 'Transfer taxi Agaete y Puerto de las Nieves al aeropuerto Gran Canaria. Taxi 8 plazas, precio fijo desde 50€, 24h. Ferry a Tenerife. Reserva online.',
    h1: 'Transfer Taxi Agaete — Aeropuerto Gran Canaria',
    subheading: 'Traslado desde Agaete y Puerto de las Nieves al Aeropuerto LPA. También conexión con el ferry a Tenerife.',
    img: '/agaete.jpg',
    distanceKm: 42,
    durationMins: 40,
    priceFrom: 50,
    content: 'Agaete y Puerto de las Nieves son destinos de turismo rural y natural en el noroeste de Gran Canaria. MaxiTaxi cubre la ruta entre Agaete y el Aeropuerto LPA, así como conexiones con el puerto de Las Nieves para el ferry a Tenerife. Servicio disponible 24 horas con vehículos adaptados para grupos.',
    highlights: ['Puerto de las Nieves', 'Valle de Agaete', 'Ferry a Tenerife', 'Playa de las Nieves'],
  },
  {
    slug: 'arucas',
    name: 'Arucas',
    urlPath: '/transfer-arucas',
    title: 'Taxi Transfer Arucas ↔ Aeropuerto Gran Canaria | MaxiTaxi',
    metaDescription: 'Transfer taxi Arucas al aeropuerto Gran Canaria (LPA). Taxi 8 plazas, precio fijo desde 30€, 24h. Trayecto corto de solo 20 min. Reserva online o WhatsApp.',
    h1: 'Transfer Taxi Arucas — Aeropuerto Gran Canaria',
    subheading: 'El trayecto más rápido al aeropuerto desde el norte de la isla. Solo 20 minutos desde Arucas al Aeropuerto LPA.',
    img: '/arucas.jpg',
    distanceKm: 22,
    durationMins: 20,
    priceFrom: 30,
    content: 'Arucas, conocida por su catedral y el ron Arehucas, es uno de los municipios más cercanos al Aeropuerto de Gran Canaria. MaxiTaxi cubre esta ruta en apenas 20 minutos, siendo una de las opciones más económicas de transfer al aeropuerto en la isla. Perfecto para grupos y familias residentes en el norte.',
    highlights: ['Catedral de Arucas', 'Destilería Arehucas', 'Jardín de la Marquesa', 'Montaña de Arucas'],
  },
  {
    slug: 'mogan',
    name: 'Mogán',
    urlPath: '/transfer-mogan',
    title: 'Taxi Transfer Mogán ↔ Aeropuerto Gran Canaria | MaxiTaxi',
    metaDescription: 'Transfer taxi Mogán y Puerto de Mogán al aeropuerto Gran Canaria. Taxi 8 plazas, precio fijo desde 70€, 24h. La Venecia de Canarias. Reserva online.',
    h1: 'Transfer Taxi Mogán — Aeropuerto Gran Canaria',
    subheading: 'Traslado desde Puerto de Mogán, "la Venecia de Canarias", hasta el Aeropuerto LPA. Precio cerrado para grupos.',
    img: '/mogan.jpg',
    distanceKm: 65,
    durationMins: 60,
    priceFrom: 70,
    content: 'Puerto de Mogán es uno de los destinos más pintorescos de Gran Canaria, con sus canales y flores que le han valido el apodo de "la Venecia de Canarias". MaxiTaxi realiza el transfer desde Mogán y Puerto de Mogán hasta el Aeropuerto LPA, el trayecto más largo de nuestra flota, perfectamente cubierto con vehículos de 8 plazas.',
    highlights: ['Puerto de Mogán', 'Playa de Mogán', 'Mercado del Puerto', 'Valle de Mogán'],
  },
];

export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find(d => d.slug === slug);
}

export function getDestinationByPath(path: string): Destination | undefined {
  const cleanPath = path.replace(/\/$/, '');
  return destinations.find(d => d.urlPath === cleanPath);
}

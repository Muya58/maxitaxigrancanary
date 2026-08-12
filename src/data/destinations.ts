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
  en: {
    title: string;
    metaDescription: string;
    h1: string;
    subheading: string;
    content: string;
    highlights: string[];
  };
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
    en: {
      title: 'Airport Transfer Maspalomas ↔ Gran Canaria Airport | MaxiTaxi',
      metaDescription: 'Private taxi transfer from Maspalomas to Gran Canaria Airport (LPA). Fixed price from €55, 8-seater, 24/7. Flight monitoring included. Book via WhatsApp.',
      h1: 'Airport Transfer Maspalomas — Gran Canaria',
      subheading: 'Direct private transfer from Maspalomas and Playa del Inglés to LPA Airport. 8-seater taxi with fixed price, no hidden costs.',
      content: 'Maspalomas and Playa del Inglés are the most popular resort areas in southern Gran Canaria. MaxiTaxi offers direct airport transfers from Gran Canaria Airport (LPA) to any hotel, apartment or resort in the area. Our 8-seater vehicles are ideal for families and groups travelling with heavy luggage, surf boards or wheelchairs.',
      highlights: ['Maspalomas Dunes', 'Playa del Inglés', 'Faro 2 Shopping Centre', 'Sports Harbour'],
    },
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
    en: {
      title: 'Airport Transfer Las Palmas ↔ Gran Canaria Airport | MaxiTaxi',
      metaDescription: 'Private taxi from Las Palmas de Gran Canaria to LPA Airport. Fixed price from €35, 8-seater, 24/7. Triana, Las Canteras, Santa Catalina. Book online.',
      h1: 'Airport Transfer Las Palmas — Gran Canaria',
      subheading: 'Fast private transfer from Las Palmas de Gran Canaria to LPA Airport in just 25 minutes. No waiting, fixed price.',
      content: 'Las Palmas de Gran Canaria is the island\'s capital and one of the best-connected areas to the airport. MaxiTaxi covers all city neighbourhoods: Triana, Las Canteras, Santa Catalina, Vegueta, El Confital and more. A quick 25-minute journey with a fixed price — no meter, no surprises.',
      highlights: ['Las Canteras Beach', 'Triana Quarter', 'Santa Catalina', 'Vegueta Old Town', 'Port of La Luz'],
    },
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
    en: {
      title: 'Airport Transfer Puerto Rico ↔ Gran Canaria Airport | MaxiTaxi',
      metaDescription: 'Private taxi from Puerto Rico Gran Canaria to LPA Airport. Fixed price from €60, 8-seater, 24/7. Great for watersports groups and families. Book online.',
      h1: 'Airport Transfer Puerto Rico — Gran Canaria',
      subheading: 'Direct private transfer from Puerto Rico to LPA Airport. Perfect for groups with water sports equipment or families with children.',
      content: 'Puerto Rico is one of the most active resort areas on the southwest coast of Gran Canaria, renowned for its water sports and marina. MaxiTaxi provides transfers between Puerto Rico and Gran Canaria Airport accommodating up to 8 passengers plus all their luggage, including diving gear, windsurfing equipment or bicycles.',
      highlights: ['Puerto Rico Marina', 'Puerto Rico Beach', 'Amadores Beach', 'Arguineguín'],
    },
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
    en: {
      title: 'Airport Transfer Meloneras ↔ Gran Canaria Airport | MaxiTaxi',
      metaDescription: 'Private taxi from Meloneras hotels to Gran Canaria Airport (LPA). Fixed price from €58, 8-seater, 24/7. Luxury resorts and golf. Book online or WhatsApp.',
      h1: 'Airport Transfer Meloneras — Gran Canaria',
      subheading: 'Premium private transfer from Meloneras and its luxury hotels to LPA Airport. Private service for groups and families.',
      content: 'Meloneras is the premium hotel district of southern Gran Canaria, home to grand resorts and the island\'s most exclusive seafront promenade. MaxiTaxi provides private airport transfers from all Meloneras hotels to LPA Airport, with 8-seater vehicles ideal for families or business groups.',
      highlights: ['Lopesan Costa Meloneras', 'Seaside Grand Hotel', 'Meloneras Golf Course', 'Seafront Promenade'],
    },
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
    en: {
      title: 'Airport Transfer Agaete ↔ Gran Canaria Airport | MaxiTaxi',
      metaDescription: 'Private taxi from Agaete and Puerto de las Nieves to Gran Canaria Airport. Fixed price from €50, 8-seater, 24/7. Tenerife ferry connection. Book online.',
      h1: 'Airport Transfer Agaete — Gran Canaria',
      subheading: 'Private transfer from Agaete and Puerto de las Nieves to LPA Airport. Also serving the Tenerife ferry terminal.',
      content: 'Agaete and Puerto de las Nieves are rural and nature tourism destinations in northwest Gran Canaria. MaxiTaxi covers the route between Agaete and LPA Airport, as well as connections to the port of Las Nieves for the Tenerife ferry. 24-hour service with group-friendly vehicles.',
      highlights: ['Puerto de las Nieves', 'Agaete Valley', 'Tenerife Ferry Terminal', 'Las Nieves Beach'],
    },
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
    en: {
      title: 'Airport Transfer Arucas ↔ Gran Canaria Airport | MaxiTaxi',
      metaDescription: 'Private taxi from Arucas to Gran Canaria Airport (LPA). Fixed price from €30, 8-seater, 24/7. Only 20-minute journey. Book online or WhatsApp.',
      h1: 'Airport Transfer Arucas — Gran Canaria',
      subheading: 'The quickest airport transfer from northern Gran Canaria. Just 20 minutes from Arucas to LPA Airport.',
      content: 'Arucas, home to its iconic cathedral and Arehucas rum distillery, is one of the closest towns to Gran Canaria Airport. MaxiTaxi covers this route in just 20 minutes, making it one of the most affordable airport transfer options on the island. Perfect for groups and families based in the north of the island.',
      highlights: ['Arucas Cathedral', 'Arehucas Rum Distillery', 'Marquesa Garden', 'Montaña de Arucas'],
    },
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
    en: {
      title: 'Airport Transfer Puerto de Mogán ↔ Gran Canaria Airport | MaxiTaxi',
      metaDescription: 'Private taxi from Mogán and Puerto de Mogán to Gran Canaria Airport. Fixed price from €70, 8-seater, 24/7. The Venice of the Canaries. Book online.',
      h1: 'Airport Transfer Mogán — Gran Canaria',
      subheading: 'Private transfer from Puerto de Mogán, the "Venice of the Canaries", to LPA Airport. Fixed group price.',
      content: 'Puerto de Mogán is one of Gran Canaria\'s most picturesque destinations, with its flower-draped bridges and canals that have earned it the nickname "the Venice of the Canaries". MaxiTaxi operates the full route from Mogán to LPA Airport — the longest journey in our fleet — with comfortable 8-seater vehicles.',
      highlights: ['Puerto de Mogán', 'Mogán Beach', 'Harbour Market', 'Mogán Valley'],
    },
  },
];

export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find(d => d.slug === slug);
}

export function getDestinationByPath(path: string): Destination | undefined {
  const cleanPath = path.replace(/\/$/, '');
  return destinations.find(d => d.urlPath === cleanPath);
}

export function buildFAQs(dest: Destination): Array<{ question: string; answer: string }> {
  return [
    {
      question: `¿Cuánto cuesta el transfer de ${dest.name} al aeropuerto de Gran Canaria?`,
      answer: `El transfer desde ${dest.name} al Aeropuerto de Gran Canaria (LPA) tiene precio fijo desde ${dest.priceFrom}€, sin taxímetro ni sorpresas. El precio cubre a todos los pasajeros del vehículo (hasta 8 plazas) y todo el equipaje.`,
    },
    {
      question: `¿Cuánto tarda el trayecto de ${dest.name} al aeropuerto?`,
      answer: `El trayecto desde ${dest.name} al Aeropuerto LPA dura aproximadamente ${dest.durationMins} minutos y cubre ${dest.distanceKm} km. MaxiTaxi monitoriza los vuelos en tiempo real para recogerte a la hora exacta, incluso si tu vuelo llega con retraso.`,
    },
    {
      question: `¿Hay servicio de transfer nocturno desde ${dest.name}?`,
      answer: `Sí, MaxiTaxi opera las 24 horas, los 7 días de la semana, incluidos festivos. Puedes reservar tu transfer desde ${dest.name} a cualquier hora del día o de la noche, sin recargo nocturno.`,
    },
    {
      question: `¿Cuántas personas pueden viajar en el transfer desde ${dest.name}?`,
      answer: `Nuestros vehículos tienen capacidad para hasta 8 pasajeros con todo su equipaje. Son perfectos para familias numerosas, grupos de amigos o equipos que viajan juntos desde ${dest.name} al aeropuerto de Gran Canaria.`,
    },
  ];
}

export function buildFAQsEn(dest: Destination): Array<{ question: string; answer: string }> {
  return [
    {
      question: `How much does a transfer from ${dest.name} to Gran Canaria Airport cost?`,
      answer: `The transfer from ${dest.name} to Gran Canaria Airport (LPA) has a fixed price from €${dest.priceFrom} — no meter, no hidden costs. The price covers all passengers (up to 8 seats) and all luggage.`,
    },
    {
      question: `How long does the journey from ${dest.name} to the airport take?`,
      answer: `The journey from ${dest.name} to LPA Airport takes approximately ${dest.durationMins} minutes and covers ${dest.distanceKm} km. MaxiTaxi monitors flights in real time to pick you up at the exact time, even if your flight arrives late.`,
    },
    {
      question: `Is there a night transfer service from ${dest.name}?`,
      answer: `Yes, MaxiTaxi operates 24 hours a day, 7 days a week, including bank holidays. You can book your transfer from ${dest.name} at any time of day or night, with no night surcharge.`,
    },
    {
      question: `How many people can travel in the transfer from ${dest.name}?`,
      answer: `Our vehicles can carry up to 8 passengers with all their luggage. They are perfect for large families, groups of friends or teams travelling together from ${dest.name} to Gran Canaria Airport.`,
    },
  ];
}

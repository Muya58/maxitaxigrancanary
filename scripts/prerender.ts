import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { type Destination, destinations, buildFAQs, buildFAQsEn } from '../src/data/destinations';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p: string) => path.resolve(__dirname, '..', p);

const BUSINESS_ADDRESS = {
  '@type': 'PostalAddress',
  addressLocality: 'Las Palmas de Gran Canaria',
  addressRegion: 'Las Palmas',
  addressCountry: 'ES',
};

const OPENING_HOURS = {
  '@type': 'OpeningHoursSpecification',
  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  opens: '00:00',
  closes: '23:59',
};

function buildDestinationHead(dest: Destination): string {
  const canonical = `https://www.maxitaxigrancanary.com${dest.urlPath}/`;
  const canonicalEn = `https://www.maxitaxigrancanary.com/en${dest.urlPath}/`;
  const image = `https://www.maxitaxigrancanary.com${dest.img}`;
  const faqs = buildFAQs(dest);
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['LocalBusiness', 'TaxiService'],
        name: 'MaxiTaxi Gran Canaria',
        url: 'https://www.maxitaxigrancanary.com',
        telephone: '+34619735892',
        image,
        priceRange: '$$',
        address: BUSINESS_ADDRESS,
        openingHoursSpecification: OPENING_HOURS,
        aggregateRating: { '@type': 'AggregateRating', ratingValue: 4.9, reviewCount: 500, bestRating: 5, worstRating: 1 },
        areaServed: { '@type': 'City', name: dest.name, containedInPlace: { '@type': 'State', name: 'Las Palmas' } },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: `Transfer ${dest.name} - Aeropuerto Gran Canaria`,
          itemListElement: [{ '@type': 'Offer', name: `Transfer ${dest.name} al Aeropuerto LPA`, description: dest.metaDescription, price: dest.priceFrom, priceCurrency: 'EUR' }],
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.maxitaxigrancanary.com/' },
          { '@type': 'ListItem', position: 2, name: `Transfer ${dest.name}`, item: canonical },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ],
  };

  return `
    <title>${dest.title}</title>
    <meta name="description" content="${dest.metaDescription}" />
    <link rel="canonical" href="${canonical}" />
    <link rel="alternate" hreflang="es" href="${canonical}" />
    <link rel="alternate" hreflang="en" href="${canonicalEn}" />
    <link rel="alternate" hreflang="x-default" href="${canonical}" />
    <meta property="og:title" content="${dest.title}" />
    <meta property="og:description" content="${dest.metaDescription}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

function buildDestinationHeadEn(dest: Destination): string {
  const canonicalEs = `https://www.maxitaxigrancanary.com${dest.urlPath}/`;
  const canonicalEn = `https://www.maxitaxigrancanary.com/en${dest.urlPath}/`;
  const image = `https://www.maxitaxigrancanary.com${dest.img}`;
  const faqs = buildFAQsEn(dest);
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['LocalBusiness', 'TaxiService'],
        name: 'MaxiTaxi Gran Canaria',
        url: 'https://www.maxitaxigrancanary.com',
        telephone: '+34619735892',
        image,
        priceRange: '$$',
        address: BUSINESS_ADDRESS,
        openingHoursSpecification: OPENING_HOURS,
        aggregateRating: { '@type': 'AggregateRating', ratingValue: 4.9, reviewCount: 500, bestRating: 5, worstRating: 1 },
        areaServed: { '@type': 'City', name: dest.name, containedInPlace: { '@type': 'State', name: 'Las Palmas' } },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: `Transfer ${dest.name} - Gran Canaria Airport`,
          itemListElement: [{ '@type': 'Offer', name: `Transfer ${dest.name} to LPA Airport`, description: dest.en.metaDescription, price: dest.priceFrom, priceCurrency: 'EUR' }],
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.maxitaxigrancanary.com/' },
          { '@type': 'ListItem', position: 2, name: `Transfer ${dest.name}`, item: canonicalEn },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ],
  };

  return `
    <title>${dest.en.title}</title>
    <meta name="description" content="${dest.en.metaDescription}" />
    <link rel="canonical" href="${canonicalEn}" />
    <link rel="alternate" hreflang="es" href="${canonicalEs}" />
    <link rel="alternate" hreflang="en" href="${canonicalEn}" />
    <link rel="alternate" hreflang="x-default" href="${canonicalEs}" />
    <meta property="og:title" content="${dest.en.title}" />
    <meta property="og:description" content="${dest.en.metaDescription}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:url" content="${canonicalEn}" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

function buildHomepageHead(): string {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['LocalBusiness', 'TaxiService'],
        name: 'MaxiTaxi Gran Canaria',
        url: 'https://www.maxitaxigrancanary.com',
        telephone: '+34619735892',
        image: 'https://www.maxitaxigrancanary.com/maspalomas.jpg',
        priceRange: '$$',
        address: BUSINESS_ADDRESS,
        openingHoursSpecification: OPENING_HOURS,
        aggregateRating: { '@type': 'AggregateRating', ratingValue: 4.9, reviewCount: 500, bestRating: 5, worstRating: 1 },
        areaServed: { '@type': 'State', name: 'Las Palmas', containedInPlace: { '@type': 'Country', name: 'Spain' } },
        description: 'Taxi 8 plazas al aeropuerto de Gran Canaria. Precio fijo, 24h, monitorización de vuelos.',
      },
    ],
  };

  return `
    <title>MaxiTaxi Gran Canaria | Traslados 24h al Aeropuerto LPA</title>
    <meta name="description" content="MaxiTaxi Gran Canaria. Reserva de traslados oficiales 24h al aeropuerto (LPA), Maspalomas y Las Palmas. Taxis de 8 plazas con precio cerrado." />
    <link rel="canonical" href="https://www.maxitaxigrancanary.com/" />
    <link rel="alternate" hreflang="es" href="https://www.maxitaxigrancanary.com/" />
    <link rel="alternate" hreflang="x-default" href="https://www.maxitaxigrancanary.com/" />
    <meta property="og:title" content="MaxiTaxi Gran Canaria | Traslados 24h al Aeropuerto" />
    <meta property="og:description" content="Taxi 8 plazas al aeropuerto de Gran Canaria. Precio fijo, disponible 24h, monitorización de vuelos en tiempo real." />
    <meta property="og:image" content="https://www.maxitaxigrancanary.com/maspalomas.jpg" />
    <meta property="og:url" content="https://www.maxitaxigrancanary.com/" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

function buildTransferGuideHead(): string {
  const canonical = 'https://www.maxitaxigrancanary.com/en/airport-transfer-guide/';
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: 'Gran Canaria Airport Transfer Guide 2026',
        description: 'Complete guide to Gran Canaria Airport (LPA) transfers — prices, distances, journey times and tips for arriving travellers.',
        url: canonical,
        datePublished: '2026-09-01',
        dateModified: '2026-09-28',
        author: { '@type': 'Organization', name: 'MaxiTaxi Gran Canaria' },
        publisher: { '@type': 'Organization', name: 'MaxiTaxi Gran Canaria', url: 'https://www.maxitaxigrancanary.com' },
        image: 'https://www.maxitaxigrancanary.com/maspalomas.jpg',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.maxitaxigrancanary.com/' },
          { '@type': 'ListItem', position: 2, name: 'Airport Transfer Guide', item: canonical },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'How much does a taxi from Gran Canaria Airport cost?', acceptedAnswer: { '@type': 'Answer', text: 'Fixed prices with MaxiTaxi start from €35 to Las Palmas and up to €65 for Mogán. All prices are fixed — no meters, no surprises. The 8-seater vehicle fits up to 8 passengers and their luggage at the same price.' } },
          { '@type': 'Question', name: 'Is it better to pre-book a transfer or take a taxi at the airport?', acceptedAnswer: { '@type': 'Answer', text: 'Pre-booking is strongly recommended. Airport taxi queues can be long, especially after busy flights from the UK and Ireland. With a pre-booked transfer, your driver waits at arrivals with a name board — no queue, no waiting.' } },
          { '@type': 'Question', name: 'How long does it take to get from Gran Canaria Airport to the south resorts?', acceptedAnswer: { '@type': 'Answer', text: 'Maspalomas: approx. 40 minutes (47 km). Puerto Rico: approx. 35 minutes (38 km). Meloneras: approx. 38 minutes (44 km). Mogán: approx. 50 minutes (55 km).' } },
          { '@type': 'Question', name: 'Do you operate 24 hours including night arrivals?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — MaxiTaxi operates 24 hours a day, 365 days a year. There is no surcharge for night transfers.' } },
          { '@type': 'Question', name: 'Can we fit 8 passengers with luggage in one vehicle?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Our 8-seater minivans have ample luggage space including room for pushchairs, golf bags and large suitcases.' } },
          { '@type': 'Question', name: 'How do I book a transfer from Gran Canaria Airport?', acceptedAnswer: { '@type': 'Answer', text: 'The quickest way is via WhatsApp (+34 619 735 892). Send your flight number, arrival date, number of passengers and destination. We reply within minutes to confirm.' } },
        ],
      },
    ],
  };

  return `
    <title>Gran Canaria Airport Transfer Guide 2026 | MaxiTaxi</title>
    <meta name="description" content="Complete guide to Gran Canaria Airport (LPA) transfers. Fixed prices from €35, 8-seater taxis, all resorts covered. Maspalomas, Puerto Rico, Las Palmas & more. Book via WhatsApp." />
    <link rel="canonical" href="${canonical}" />
    <link rel="alternate" hreflang="en" href="${canonical}" />
    <link rel="alternate" hreflang="x-default" href="${canonical}" />
    <meta property="og:title" content="Gran Canaria Airport Transfer Guide 2026 | MaxiTaxi" />
    <meta property="og:description" content="Fixed prices, 8-seater taxis, flight monitoring. The complete guide to getting from Gran Canaria Airport to any resort." />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:type" content="article" />
    <meta property="og:image" content="https://www.maxitaxigrancanary.com/maspalomas.jpg" />
    <meta name="twitter:card" content="summary_large_image" />
    <script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

function buildGroupPageHead(): string {
  const canonical = 'https://www.maxitaxigrancanary.com/taxi-8-plazas/';
  const canonicalEn = 'https://www.maxitaxigrancanary.com/en/8-seater-taxi/';
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['LocalBusiness', 'TaxiService'],
        name: 'MaxiTaxi Gran Canaria',
        url: 'https://www.maxitaxigrancanary.com',
        telephone: '+34619735892',
        image: 'https://www.maxitaxigrancanary.com/maspalomas.jpg',
        priceRange: '$$',
        address: BUSINESS_ADDRESS,
        openingHoursSpecification: OPENING_HOURS,
        aggregateRating: { '@type': 'AggregateRating', ratingValue: 4.9, reviewCount: 500, bestRating: 5, worstRating: 1 },
        description: 'Taxi 8 plazas en Gran Canaria para grupos y familias numerosas. Precio fijo al aeropuerto, sin coste extra por equipaje.',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.maxitaxigrancanary.com/' },
          { '@type': 'ListItem', position: 2, name: 'Taxi 8 Plazas Gran Canaria', item: canonical },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: '¿Cuántas personas caben en un MaxiTaxi?', acceptedAnswer: { '@type': 'Answer', text: 'Nuestros vehículos tienen 8 plazas de pasajero más espacio para el equipaje de todo el grupo. Caben maletas grandes, sillitas de bebé, tablas de surf y similares sin problema.' } },
          { '@type': 'Question', name: '¿Es más barato que coger dos taxis normales?', acceptedAnswer: { '@type': 'Answer', text: 'Mucho más barato. Dos taxis estándar a Maspalomas cuestan alrededor de 110-120€ en total. Un MaxiTaxi para todo el grupo sale por 55€ — precio fijo.' } },
          { '@type': 'Question', name: '¿Tengo que pagar extra por el equipaje grande?', acceptedAnswer: { '@type': 'Answer', text: 'No. El precio es por vehículo, no por maleta. Tablas de surf, bicicletas plegadas, sillitas de bebé y maletas de gran tamaño van incluidas en el precio.' } },
          { '@type': 'Question', name: '¿El conductor espera si el vuelo se retrasa?', acceptedAnswer: { '@type': 'Answer', text: 'Sí. Monitorizamos tu número de vuelo en tiempo real y ajustamos la hora de recogida automáticamente. No cobramos esperas por retrasos de vuelo.' } },
        ],
      },
    ],
  };

  return `
    <title>Taxi 8 Plazas Gran Canaria — Transfer Aeropuerto para Grupos y Familias | MaxiTaxi</title>
    <meta name="description" content="Taxi de 8 plazas en Gran Canaria. Transfer al aeropuerto para grupos y familias numerosas. Precio fijo desde 35€, 24h, sin coste extra por equipaje. Reserva por WhatsApp." />
    <link rel="canonical" href="${canonical}" />
    <link rel="alternate" hreflang="es" href="${canonical}" />
    <link rel="alternate" hreflang="en" href="${canonicalEn}" />
    <link rel="alternate" hreflang="x-default" href="${canonical}" />
    <meta property="og:title" content="Taxi 8 Plazas Gran Canaria — Transfer Aeropuerto para Grupos | MaxiTaxi" />
    <meta property="og:description" content="MaxiTaxi 8 plazas. Un solo vehículo para toda la familia o grupo. Precio fijo desde 35€, 24h." />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="https://www.maxitaxigrancanary.com/maspalomas.jpg" />
    <meta name="twitter:card" content="summary_large_image" />
    <script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

function buildPricesPageHead(): string {
  const canonical = 'https://www.maxitaxigrancanary.com/en/prices/';
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['LocalBusiness', 'TaxiService'],
        name: 'MaxiTaxi Gran Canaria',
        url: 'https://www.maxitaxigrancanary.com',
        telephone: '+34619735892',
        image: 'https://www.maxitaxigrancanary.com/maspalomas.jpg',
        priceRange: '$$',
        address: BUSINESS_ADDRESS,
        openingHoursSpecification: OPENING_HOURS,
        aggregateRating: { '@type': 'AggregateRating', ratingValue: 4.9, reviewCount: 500, bestRating: 5, worstRating: 1 },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Gran Canaria Airport Transfer Prices',
          itemListElement: [
            { '@type': 'Offer', name: 'Airport Transfer to Las Palmas', priceSpecification: { '@type': 'PriceSpecification', minPrice: 50, maxPrice: 55, priceCurrency: 'EUR', eligibleQuantity: { '@type': 'QuantitativeValue', maxValue: 8, unitCode: 'C62' } } },
            { '@type': 'Offer', name: 'Airport Transfer to Arucas', priceSpecification: { '@type': 'PriceSpecification', minPrice: 42, maxPrice: 47, priceCurrency: 'EUR', eligibleQuantity: { '@type': 'QuantitativeValue', maxValue: 8, unitCode: 'C62' } } },
            { '@type': 'Offer', name: 'Airport Transfer to Maspalomas', priceSpecification: { '@type': 'PriceSpecification', minPrice: 56, maxPrice: 61, priceCurrency: 'EUR', eligibleQuantity: { '@type': 'QuantitativeValue', maxValue: 8, unitCode: 'C62' } } },
            { '@type': 'Offer', name: 'Airport Transfer to Puerto Rico', priceSpecification: { '@type': 'PriceSpecification', minPrice: 70, maxPrice: 75, priceCurrency: 'EUR', eligibleQuantity: { '@type': 'QuantitativeValue', maxValue: 8, unitCode: 'C62' } } },
            { '@type': 'Offer', name: 'Airport Transfer to Mogán', priceSpecification: { '@type': 'PriceSpecification', minPrice: 83, maxPrice: 88, priceCurrency: 'EUR', eligibleQuantity: { '@type': 'QuantitativeValue', maxValue: 8, unitCode: 'C62' } } },
          ],
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.maxitaxigrancanary.com/' },
          { '@type': 'ListItem', position: 2, name: 'Taxi Prices Gran Canaria', item: canonical },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'Are Gran Canaria taxi prices fixed or metered?', acceptedAnswer: { '@type': 'Answer', text: 'With MaxiTaxi, all prices are fixed in advance. You agree the price before you travel — no meter, no surprises.' } },
          { '@type': 'Question', name: 'Does the price include all passengers and luggage?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. The price shown is per vehicle, not per person. Up to 8 passengers and all luggage is included at no extra cost.' } },
          { '@type': 'Question', name: 'Is there a surcharge for night arrivals?', acceptedAnswer: { '@type': 'Answer', text: 'No. MaxiTaxi operates 24/7 at the same prices — no night surcharge, no weekend surcharge, no holiday surcharge.' } },
          { '@type': 'Question', name: 'How much does a taxi from Gran Canaria Airport to Maspalomas cost?', acceptedAnswer: { '@type': 'Answer', text: 'A fixed-price transfer from Gran Canaria Airport (LPA) to Maspalomas with MaxiTaxi costs €56–61 for the whole vehicle (up to 8 passengers).' } },
        ],
      },
    ],
  };

  return `
    <title>Gran Canaria Airport Taxi Prices 2026 | Fixed Transfer Rates | MaxiTaxi</title>
    <meta name="description" content="Gran Canaria airport taxi prices 2026. Fixed rates from €42 (Arucas) to €83 (Mogán). 8-seater, all luggage included, 24/7. No meters, no surprises." />
    <link rel="canonical" href="${canonical}" />
    <link rel="alternate" hreflang="en" href="${canonical}" />
    <link rel="alternate" hreflang="x-default" href="${canonical}" />
    <meta property="og:title" content="Gran Canaria Airport Taxi Prices 2026 | MaxiTaxi" />
    <meta property="og:description" content="Fixed airport taxi prices. Las Palmas €50–55, Maspalomas €56–61, Puerto Rico €70–75, Mogán €83–88. Up to 8 passengers, same price." />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="https://www.maxitaxigrancanary.com/maspalomas.jpg" />
    <meta name="twitter:card" content="summary_large_image" />
    <script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

function buildEnGroupPageHead(): string {
  const canonical = 'https://www.maxitaxigrancanary.com/en/8-seater-taxi/';
  const canonicalEs = 'https://www.maxitaxigrancanary.com/taxi-8-plazas/';
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['LocalBusiness', 'TaxiService'],
        name: 'MaxiTaxi Gran Canaria',
        url: 'https://www.maxitaxigrancanary.com',
        telephone: '+34619735892',
        image: 'https://www.maxitaxigrancanary.com/maspalomas.jpg',
        priceRange: '$$',
        address: BUSINESS_ADDRESS,
        openingHoursSpecification: OPENING_HOURS,
        aggregateRating: { '@type': 'AggregateRating', ratingValue: 4.9, reviewCount: 500, bestRating: 5, worstRating: 1 },
        description: '8-seater minivan taxi in Gran Canaria for groups and families. Fixed airport transfer price, no luggage surcharge.',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.maxitaxigrancanary.com/' },
          { '@type': 'ListItem', position: 2, name: '8-Seater Taxi Gran Canaria', item: canonical },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'How many people fit in a MaxiTaxi?', acceptedAnswer: { '@type': 'Answer', text: 'Our 8-seater minivans have room for up to 8 passengers plus their luggage. Large suitcases, pushchairs, surfboards and sports equipment all fit without additional charges.' } },
          { '@type': 'Question', name: 'Is it cheaper than booking two standard taxis?', acceptedAnswer: { '@type': 'Answer', text: 'Significantly cheaper. Two standard taxis to Maspalomas typically cost around €110-120 combined. One MaxiTaxi for the whole group is €55 — fixed price, no haggling.' } },
          { '@type': 'Question', name: 'Is there an extra charge for large luggage?', acceptedAnswer: { '@type': 'Answer', text: 'No. The price is per vehicle, not per bag. Surfboards, folded bikes, pushchairs and oversized cases are all included.' } },
          { '@type': 'Question', name: 'Will the driver wait if our flight is delayed?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. We monitor your flight number in real time and adjust pick-up time automatically. No waiting charges for flight delays.' } },
        ],
      },
    ],
  };

  return `
    <title>8-Seater Taxi Gran Canaria — Group & Family Airport Transfer | MaxiTaxi</title>
    <meta name="description" content="8-seater minivan taxi in Gran Canaria. Fixed price group airport transfers for families, friends and sports groups. From €42, 24/7, no luggage surcharge. Book via WhatsApp." />
    <link rel="canonical" href="${canonical}" />
    <link rel="alternate" hreflang="es" href="${canonicalEs}" />
    <link rel="alternate" hreflang="en" href="${canonical}" />
    <link rel="alternate" hreflang="x-default" href="${canonicalEs}" />
    <meta property="og:title" content="8-Seater Taxi Gran Canaria — Group & Family Airport Transfer | MaxiTaxi" />
    <meta property="og:description" content="One MaxiTaxi for your whole group. Fixed price from €35, 8 seats, 24/7, no luggage surcharge." />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="https://www.maxitaxigrancanary.com/maspalomas.jpg" />
    <meta name="twitter:card" content="summary_large_image" />
    <script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

async function prerender() {
  const templatePath = toAbsolute('dist/index.html');

  if (!fs.existsSync(templatePath)) {
    console.error('Template not found at:', templatePath);
    console.log('Did you run the client build first?');
    process.exit(1);
  }

  // Strip hardcoded title/meta from template so our injected ones don't duplicate
  let rawTemplate = fs.readFileSync(templatePath, 'utf-8');
  rawTemplate = rawTemplate
    .replace(/<meta name="description"[^>]*>/g, '')
    .replace(/<title>[^<]*<\/title>/g, '');

  try {
    const serverEntryPath = pathToFileURL(toAbsolute('dist/server/entry-server.js')).href;
    const renderModule = await import(serverEntryPath);

    const routes: Array<{ url: string; outPath: string; head: string; lang: string }> = [
      { url: '/', outPath: 'dist/index.html', head: buildHomepageHead(), lang: 'es' },
      ...destinations.map(d => ({
        url: d.urlPath,
        outPath: `dist${d.urlPath}/index.html`,
        head: buildDestinationHead(d),
        lang: 'es',
      })),
      ...destinations.map(d => ({
        url: `/en${d.urlPath}`,
        outPath: `dist/en${d.urlPath}/index.html`,
        head: buildDestinationHeadEn(d),
        lang: 'en',
      })),
      {
        url: '/en/airport-transfer-guide',
        outPath: 'dist/en/airport-transfer-guide/index.html',
        head: buildTransferGuideHead(),
        lang: 'en',
      },
      {
        url: '/taxi-8-plazas',
        outPath: 'dist/taxi-8-plazas/index.html',
        head: buildGroupPageHead(),
        lang: 'es',
      },
      {
        url: '/en/8-seater-taxi',
        outPath: 'dist/en/8-seater-taxi/index.html',
        head: buildEnGroupPageHead(),
        lang: 'en',
      },
      {
        url: '/en/prices',
        outPath: 'dist/en/prices/index.html',
        head: buildPricesPageHead(),
        lang: 'en',
      },
    ];

    for (const { url, outPath, head, lang } of routes) {
      const { html } = renderModule.render(url);

      let finalHtml = rawTemplate
        .replace(`<!--ssr-outlet-->`, html)
        .replace(`<!--ssr-head-->`, head);

      if (lang === 'en') {
        finalHtml = finalHtml.replace(' lang="es"', ' lang="en"');
      }

      const fullPath = toAbsolute(outPath);
      fs.mkdirSync(path.dirname(fullPath), { recursive: true });
      fs.writeFileSync(fullPath, finalHtml);
      console.log(`✓  ${outPath}`);
    }

    console.log(`\nPrerendering completed: ${routes.length} pages generated.`);
  } catch (err) {
    console.error('Error during prerendering:', err);
    process.exit(1);
  }
}

prerender();

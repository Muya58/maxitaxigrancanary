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

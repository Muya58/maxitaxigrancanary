import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { type Destination, destinations } from '../src/data/destinations';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p: string) => path.resolve(__dirname, '..', p);

function buildDestinationHead(dest: Destination): string {
  const canonical = `https://www.maxitaxigrancanary.com${dest.urlPath}/`;
  const image = `https://www.maxitaxigrancanary.com${dest.img}`;
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
    ],
  };

  return `
    <title>${dest.title}</title>
    <meta name="description" content="${dest.metaDescription}" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:title" content="${dest.title}" />
    <meta property="og:description" content="${dest.metaDescription}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

function buildHomepageHead(): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'TaxiService'],
    name: 'MaxiTaxi Gran Canaria',
    url: 'https://www.maxitaxigrancanary.com',
    telephone: '+34619735892',
    priceRange: '$$',
    aggregateRating: { '@type': 'AggregateRating', ratingValue: 4.9, reviewCount: 500, bestRating: 5, worstRating: 1 },
    areaServed: { '@type': 'State', name: 'Las Palmas', containedInPlace: { '@type': 'Country', name: 'Spain' } },
    description: 'Taxi 8 plazas al aeropuerto de Gran Canaria. Precio fijo, 24h, monitorización de vuelos.',
  };

  return `
    <title>MaxiTaxi Gran Canaria | Traslados 24h al Aeropuerto LPA</title>
    <meta name="description" content="MaxiTaxi Gran Canaria. Reserva de traslados oficiales 24h al aeropuerto (LPA), Maspalomas y Las Palmas. Taxis de 8 plazas con precio cerrado." />
    <link rel="canonical" href="https://www.maxitaxigrancanary.com/" />
    <meta property="og:title" content="MaxiTaxi Gran Canaria | Traslados 24h al Aeropuerto" />
    <meta property="og:description" content="Taxi 8 plazas al aeropuerto de Gran Canaria. Precio fijo, disponible 24h, monitorización de vuelos en tiempo real." />
    <meta property="og:image" content="https://www.maxitaxigrancanary.com/maspalomas.jpg" />
    <meta property="og:url" content="https://www.maxitaxigrancanary.com/" />
    <meta property="og:type" content="website" />
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

    const routes: Array<{ url: string; outPath: string; head: string }> = [
      { url: '/', outPath: 'dist/index.html', head: buildHomepageHead() },
      ...destinations.map(d => ({
        url: d.urlPath,
        outPath: `dist${d.urlPath}/index.html`,
        head: buildDestinationHead(d),
      })),
    ];

    for (const { url, outPath, head } of routes) {
      const { html } = renderModule.render(url);

      const finalHtml = rawTemplate
        .replace(`<!--ssr-outlet-->`, html)
        .replace(`<!--ssr-head-->`, head);

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

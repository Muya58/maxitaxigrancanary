import { Helmet } from 'react-helmet-async';
import { Language } from '../types';

interface SEOProps {
  lang: Language;
  title?: string;
  description?: string;
}

export default function SEO({ lang, title, description }: SEOProps) {
  const defaultTitle = lang === 'es' 
    ? 'Taxi Gran Canaria | Traslados al Aeropuerto (24h) | MaxiTaxiGran Canary'
    : 'Taxi Gran Canaria | Airport Transfers (24h) | MaxiTaxiGran Canary';
  
  const defaultDescription = lang === 'es'
    ? 'Reserva tu Taxi en Gran Canaria al instante. Especialistas en traslados al Aeropuerto, vehículos de 8 plazas, PMR y transporte de bicicletas. ¡Calcula tu tarifa 24/7!'
    : 'Book your Taxi in Gran Canaria instantly. Specialists in Airport transfers, 8-seater vehicles, PMR and bicycle transport. Calculate your fare 24/7!';

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title || defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.maxitaxigrancanary.com" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || defaultTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />

      {/* Local Business Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TaxiService",
          "name": "MaxiTaxiGran Canary",
          "description": defaultDescription,
          "url": "https://www.maxitaxigrancanary.com",
          "telephone": "+34000000000",
          "areaServed": "Gran Canaria",
          "availableLanguage": ["Spanish", "English"],
          "provider": {
            "@type": "LocalBusiness",
            "name": "MaxiTaxiGran Canary",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Las Palmas de Gran Canaria",
              "addressRegion": "Las Palmas",
              "addressCountry": "ES"
            }
          }
        })}
      </script>
    </Helmet>
  );
}

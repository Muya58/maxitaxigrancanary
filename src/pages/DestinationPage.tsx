import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Car, Clock, MapPin, MessageCircle, Phone, ShieldCheck, Star, CheckCircle2, ArrowRight, ChevronRight, Menu, X } from 'lucide-react';
import { type Destination, destinations } from '../data/destinations';

interface Props {
  destination: Destination;
}

export default function DestinationPage({ destination }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const waMessage = encodeURIComponent(
    `Hola, quiero un transfer desde ${destination.name} al aeropuerto de Gran Canaria. ¿Pueden ayudarme?`
  );
  const waUrl = `https://wa.me/34619735892?text=${waMessage}`;
  const canonicalUrl = `https://www.maxitaxigrancanary.com${destination.urlPath}/`;

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['LocalBusiness', 'TaxiService'],
        name: 'MaxiTaxi Gran Canaria',
        url: 'https://www.maxitaxigrancanary.com',
        telephone: '+34619735892',
        image: `https://www.maxitaxigrancanary.com${destination.img}`,
        priceRange: '$$',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: 4.9, reviewCount: 500, bestRating: 5, worstRating: 1 },
        areaServed: {
          '@type': 'City',
          name: destination.name,
          containedInPlace: { '@type': 'State', name: 'Las Palmas' },
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: `Transfer ${destination.name} - Aeropuerto Gran Canaria`,
          itemListElement: [
            {
              '@type': 'Offer',
              name: `Transfer ${destination.name} al Aeropuerto LPA`,
              description: destination.metaDescription,
              price: destination.priceFrom,
              priceCurrency: 'EUR',
            },
          ],
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.maxitaxigrancanary.com/' },
          { '@type': 'ListItem', position: 2, name: `Transfer ${destination.name}`, item: canonicalUrl },
        ],
      },
    ],
  };

  const otherDestinations = destinations.filter(d => d.slug !== destination.slug).slice(0, 4);

  return (
    <div className="min-h-screen bg-bg-deep selection:bg-brand/30">
      <Helmet>
        <title>{destination.title}</title>
        <meta name="description" content={destination.metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={destination.title} />
        <meta property="og:description" content={destination.metaDescription} />
        <meta property="og:image" content={`https://www.maxitaxigrancanary.com${destination.img}`} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      {/* Nav */}
      <nav className={`fixed top-0 w-full z-100 transition-all duration-500 ${
        scrolled ? 'bg-bg-deep/90 backdrop-blur-xl py-3 border-b border-white/10 shadow-2xl shadow-brand/5' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <a href="/" className="flex items-center gap-2 group">
              <div className="bg-brand p-2 rounded-lg group-hover:scale-110 transition-transform">
                <Car className="text-white w-6 h-6" />
              </div>
              <span className="font-display font-black text-xl tracking-tighter text-white uppercase italic">
                MaxiTaxi<span className="text-brand">GranCanary</span>
              </span>
            </a>
            <div className="hidden md:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              <a href="/#servicios" className="hover:text-brand transition-colors">Servicios</a>
              <a href="/#destinos" className="hover:text-brand transition-colors">Destinos</a>
              <a href="/#opiniones" className="hover:text-brand transition-colors">Opiniones</a>
              <a href={waUrl} className="bg-brand text-white px-8 py-3 rounded-xl hover:brightness-110 transition-all font-black shadow-lg shadow-brand/20 flex items-center gap-2">
                <MessageCircle size={14} strokeWidth={3} />
                WHATSAPP 24H
              </a>
            </div>
            <button className="md:hidden w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white" onClick={() => setIsMenuOpen(true)}>
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <>
          <div className="fixed inset-0 bg-ink/80 backdrop-blur-md z-[150]" onClick={() => setIsMenuOpen(false)} />
          <div className="fixed top-0 right-0 h-full w-4/5 max-w-xs bg-bg-deep border-l border-white/10 z-[160] p-8 flex flex-col">
            <div className="flex justify-between items-center mb-12">
              <div className="bg-brand p-2 rounded-lg"><Car className="text-white w-5 h-5" /></div>
              <button onClick={() => setIsMenuOpen(false)} className="text-slate-500"><X size={32} /></button>
            </div>
            <div className="flex flex-col gap-8">
              {[
                { label: 'Servicios', href: '/#servicios' },
                { label: 'Destinos', href: '/#destinos' },
                { label: 'Opiniones', href: '/#opiniones' },
                { label: 'Reservar Ahora', href: '/#reserva' },
              ].map(item => (
                <a key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)} className="text-2xl font-black text-white uppercase italic tracking-tighter hover:text-brand transition-colors">
                  {item.label}
                </a>
              ))}
            </div>
            <div className="mt-auto pt-10 border-t border-white/5">
              <a href={waUrl} className="w-full bg-brand text-white py-5 rounded-2xl flex items-center justify-center gap-3 font-black uppercase tracking-widest text-xs">
                <MessageCircle size={20} strokeWidth={3} />
                WHATSAPP 24 HORAS
              </a>
            </div>
          </div>
        </>
      )}

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={destination.img} alt={destination.name} className="w-full h-full object-cover opacity-25 scale-105" />
          <div className="absolute inset-0 bg-gradient-to-b from-bg-deep/80 via-bg-deep/60 to-bg-deep" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
              <li><a href="/" className="hover:text-brand transition-colors">Inicio</a></li>
              <li><ChevronRight size={12} /></li>
              <li className="text-brand">Transfer {destination.name}</li>
            </ol>
          </nav>

          <div className="inline-block px-3 py-1 bg-brand/10 text-brand text-[10px] font-black uppercase tracking-[0.2em] mb-6 rounded-sm border border-brand/20">
            Transfer Directo Gran Canaria
          </div>
          <h1 className="font-display text-4xl lg:text-6xl font-extrabold text-white leading-none mb-6 tracking-tighter max-w-3xl">
            {destination.h1}
          </h1>
          <p className="text-lg text-slate-400 mb-10 leading-relaxed max-w-2xl font-medium">
            {destination.subheading}
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-4 mb-10">
            {[
              { icon: MapPin, label: 'Distancia', value: `${destination.distanceKm} km` },
              { icon: Clock, label: 'Duración', value: `${destination.durationMins} min` },
              { icon: Car, label: 'Precio desde', value: `${destination.priceFrom}€` },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-5 py-3">
                <Icon size={16} className="text-brand" />
                <div>
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{label}</p>
                  <p className="text-white font-black text-sm">{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <a href={waUrl} target="_blank" rel="noopener noreferrer"
              className="bg-brand text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest hover:brightness-110 transition-all flex items-center gap-3 shadow-lg shadow-brand/20">
              <MessageCircle size={20} strokeWidth={3} />
              Reservar por WhatsApp
            </a>
            <a href="/#reserva"
              className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-3">
              <ArrowRight size={20} />
              Reserva Online
            </a>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-display text-3xl font-black text-white mb-6 tracking-tighter">
                Transfer {destination.name} con MaxiTaxi
              </h2>
              <p className="text-slate-400 text-base leading-relaxed mb-8 font-medium">
                {destination.content}
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Vehículos de 8 plazas con amplio maletero',
                  'Precio cerrado sin sorpresas al llegar',
                  'Monitorización de vuelos en tiempo real',
                  'Conductor profesional con licencia oficial',
                  'Disponible 24 horas, 365 días al año',
                  'Confirmación inmediata por WhatsApp',
                ].map(item => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-brand/10 rounded-full flex items-center justify-center shrink-0">
                      <CheckCircle2 size={12} className="text-brand" strokeWidth={3} />
                    </div>
                    <span className="text-slate-300 text-sm font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Info Card */}
            <div className="bg-white/3 border border-white/10 rounded-[2rem] p-8 lg:p-10">
              <h3 className="font-display text-xl font-black text-white mb-8 uppercase tracking-tight">
                Información del trayecto
              </h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center py-4 border-b border-white/5">
                  <span className="text-slate-400 text-sm font-medium">Origen</span>
                  <span className="text-white font-black text-sm">Aeropuerto Gran Canaria (LPA)</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-white/5">
                  <span className="text-slate-400 text-sm font-medium">Destino</span>
                  <span className="text-white font-black text-sm">{destination.name}</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-white/5">
                  <span className="text-slate-400 text-sm font-medium">Distancia aproximada</span>
                  <span className="text-white font-black text-sm">{destination.distanceKm} km</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-white/5">
                  <span className="text-slate-400 text-sm font-medium">Duración estimada</span>
                  <span className="text-white font-black text-sm">{destination.durationMins} minutos</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-white/5">
                  <span className="text-slate-400 text-sm font-medium">Capacidad</span>
                  <span className="text-white font-black text-sm">Hasta 8 pasajeros</span>
                </div>
                <div className="flex justify-between items-center py-4">
                  <span className="text-slate-400 text-sm font-medium">Precio desde</span>
                  <span className="text-brand font-black text-2xl">{destination.priceFrom}€</span>
                </div>
              </div>
              <a href={waUrl} target="_blank" rel="noopener noreferrer"
                className="w-full mt-8 bg-brand text-white py-4 rounded-xl font-black uppercase tracking-widest hover:brightness-110 transition-all flex items-center justify-center gap-3">
                <MessageCircle size={18} strokeWidth={3} />
                Solicitar Precio Exacto
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Points of interest */}
      <section className="py-16 border-t border-white/5 bg-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-black text-white mb-8 tracking-tighter">
            Puntos de recogida en {destination.name}
          </h2>
          <div className="flex flex-wrap gap-3">
            {destination.highlights.map(point => (
              <div key={point} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2">
                <MapPin size={12} className="text-brand" />
                <span className="text-slate-300 text-sm font-medium">{point}</span>
              </div>
            ))}
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2">
              <MapPin size={12} className="text-brand" />
              <span className="text-slate-300 text-sm font-medium">Hoteles y apartamentos</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2">
              <MapPin size={12} className="text-brand" />
              <span className="text-slate-300 text-sm font-medium">Cualquier dirección</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why MaxiTaxi */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-black text-white mb-12 tracking-tighter text-center">
            ¿Por qué MaxiTaxi para tu transfer desde {destination.name}?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Car, title: 'Taxi 8 Plazas', desc: 'Vehículos maxi con amplio espacio para pasajeros y equipaje. Perfecto para familias y grupos.' },
              { icon: Clock, title: 'Disponibilidad 24h', desc: 'Servicio ininterrumpido. Monitorizamos tu vuelo para recogidas puntuales sin esperas.' },
              { icon: ShieldCheck, title: 'Servicio Oficial', desc: 'Conductores con licencia oficial y vehículos homologados. Máxima seguridad garantizada.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white/3 border border-white/10 rounded-[1.5rem] p-8 hover:border-brand/30 transition-colors">
                <div className="w-12 h-12 bg-brand/10 text-brand rounded-xl flex items-center justify-center mb-6">
                  <Icon size={24} />
                </div>
                <h3 className="font-display text-lg font-black text-white mb-3 uppercase tracking-tight">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-medium">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 border-t border-white/5 bg-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-10">
            <div className="flex gap-1 text-brand">
              {[1,2,3,4,5].map(i => <Star key={i} size={18} fill="currentColor" />)}
            </div>
            <span className="text-white font-black text-xl">4.9 / 5.0</span>
            <span className="text-slate-500 text-sm font-bold uppercase tracking-widest">+500 reseñas en Google</span>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: 'Mark T.', location: 'United Kingdom', text: `Perfect service from ${destination.name}! 8-seater van was spotless, driver was on time. Highly recommended for families.` },
              { name: 'Carmen S.', location: 'Madrid, España', text: `Transfer desde ${destination.name} impecable. Puntualidad de 10, el conductor nos esperaba en el aeropuerto. Repetiré sin duda.` },
            ].map(review => (
              <div key={review.name} className="bg-white/3 border border-white/10 rounded-[1.5rem] p-6">
                <div className="flex gap-1 text-brand mb-4">
                  {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="currentColor" />)}
                </div>
                <p className="text-slate-300 text-sm leading-loose mb-4 italic">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-brand/10 border border-brand/20">
                    <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${review.name}`} alt={review.name} />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">{review.name}</p>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{review.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other destinations */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-black text-white mb-8 tracking-tighter">
            Otros destinos en Gran Canaria
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherDestinations.map(dest => (
              <a key={dest.slug} href={`${dest.urlPath}/`}
                className="group relative h-48 rounded-2xl overflow-hidden bg-slate-900 block">
                <img src={dest.img} alt={`Transfer taxi ${dest.name}`} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-brand text-[9px] font-black uppercase tracking-widest mb-1">Transfer desde {dest.priceFrom}€</p>
                  <h3 className="text-white font-display font-black text-lg">{dest.name}</h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="bg-bg-deep border-t border-white/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl lg:text-5xl font-black text-white mb-6 tracking-tighter">
            ¿Listo para reservar tu transfer desde {destination.name}?
          </h2>
          <p className="text-slate-400 mb-10 max-w-xl mx-auto font-medium">
            Contacta ahora y confirma tu taxi en minutos. Disponibles 24h vía WhatsApp.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href={waUrl} target="_blank" rel="noopener noreferrer"
              className="bg-brand text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:brightness-110 transition-all flex items-center gap-3">
              <MessageCircle size={24} strokeWidth={3} />
              CONTACTAR WHATSAPP
            </a>
            <a href="tel:+34619735892"
              className="bg-white/5 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-3 border border-white/5">
              <Phone size={24} />
              LLAMAR AHORA
            </a>
          </div>
          <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-600">
            <a href="/" className="flex items-center gap-2">
              <div className="bg-brand p-1.5 rounded-lg"><Car className="text-white w-4 h-4" /></div>
              <span className="font-display font-black text-lg tracking-tighter text-white uppercase italic">MaxiTaxi<span className="text-brand">GranCanary</span></span>
            </a>
            <p>© {new Date().getFullYear()} MaxiTaxi Gran Canaria. Official Licensed Service.</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a href={waUrl} target="_blank" rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl shadow-green-500/40 hover:bg-green-600 transition-all animate-bounce">
        <MessageCircle className="h-8 w-8" />
      </a>
    </div>
  );
}

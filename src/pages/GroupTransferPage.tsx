import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Car, Clock, MapPin, MessageCircle, Users, ShieldCheck, CheckCircle2, ChevronRight, Menu, X, Star } from 'lucide-react';

const CANONICAL = 'https://www.maxitaxigrancanary.com/taxi-8-plazas/';
const WA_NUMBER = '34619735892';

const destinations = [
  { name: 'Las Palmas de Gran Canaria', km: 28, mins: 25, price: 35, slug: 'las-palmas' },
  { name: 'Arucas', km: 32, mins: 30, price: 45, slug: 'arucas' },
  { name: 'Puerto Rico de Gran Canaria', km: 38, mins: 35, price: 50, slug: 'puerto-rico' },
  { name: 'Agaete', km: 42, mins: 38, price: 55, slug: 'agaete' },
  { name: 'Meloneras', km: 44, mins: 38, price: 55, slug: 'meloneras' },
  { name: 'Maspalomas / Playa del Inglés', km: 47, mins: 40, price: 55, slug: 'maspalomas' },
  { name: 'Mogán', km: 55, mins: 50, price: 65, slug: 'mogan' },
];

const useCases = [
  { icon: Users, title: 'Familias Numerosas', desc: 'Hasta 8 personas + maletas grandes. Un solo vehículo para toda la familia, sin separarse ni hacer dos viajes.' },
  { icon: Car, title: 'Grupos de Amigos', desc: 'Viaje en grupo desde el aeropuerto hasta el resort. Precio fijo compartido: sale más barato que dos taxis normales.' },
  { icon: ShieldCheck, title: 'Deportistas y Surfistas', desc: 'Tablas de surf, bicis, material de buceo y equipaje voluminoso. Maletero amplio sin coste adicional.' },
  { icon: Star, title: 'Eventos y Celebraciones', desc: 'Transferencia VIP para bodas, cumpleaños o despedidas. Conductor puntual con cartel de bienvenida.' },
];

const faqs = [
  {
    q: '¿Cuántas personas caben en un MaxiTaxi?',
    a: 'Nuestros vehículos tienen 8 plazas de pasajero más espacio para el equipaje de todo el grupo. Caben maletas grandes, sillitas de bebé, tablas de surf y similares sin problema.',
  },
  {
    q: '¿Es más barato que coger dos taxis normales?',
    a: 'Mucho más barato. Dos taxis estándar a Maspalomas cuestan alrededor de 110-120€ en total. Un MaxiTaxi para todo el grupo sale por 55€ — precio fijo, sin negociación ni sorpresas.',
  },
  {
    q: '¿Tengo que pagar extra por el equipaje grande?',
    a: 'No. El precio es por vehículo, no por maleta. Tablas de surf, bicicletas plegadas, sillitas de bebé y maletas de gran tamaño van incluidas en el precio.',
  },
  {
    q: '¿El conductor espera si el vuelo se retrasa?',
    a: 'Sí. Monitorizamos tu número de vuelo en tiempo real y ajustamos la hora de recogida automáticamente. No te cobramos esperas por retrasos de vuelo.',
  },
  {
    q: '¿Cómo reservo un MaxiTaxi para mi grupo?',
    a: 'Por WhatsApp al +34 619 735 892. Envíanos número de vuelo, fecha, número de personas y destino. Confirmamos en minutos. También puedes usar el formulario en la página de inicio.',
  },
];

function trackWa(label: string) {
  if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', 'whatsapp_click', { event_category: 'conversion', event_label: label });
  }
}

export default function GroupTransferPage() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-bg-deep selection:bg-brand/30">
      <Helmet>
        <title>Taxi 8 Plazas Gran Canaria — Transfer Aeropuerto para Grupos | MaxiTaxi</title>
        <meta name="description" content="Taxi de 8 plazas en Gran Canaria. Transfer al aeropuerto para grupos y familias numerosas. Precio fijo desde 35€, 24h, sin coste extra por equipaje. Reserva por WhatsApp." />
      </Helmet>

      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-100 transition-all duration-500 ${scrolled ? 'bg-bg-deep/90 backdrop-blur-xl py-3 border-b border-white/10 shadow-2xl shadow-brand/5' : 'bg-transparent py-6'}`}>
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
            <div className="hidden md:flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              <a href="/#servicios" className="hover:text-brand transition-colors">Servicios</a>
              <a href="/#destinos" className="hover:text-brand transition-colors">Destinos</a>
              <a href="/#reserva" className="hover:text-brand transition-colors">Reservar</a>
              <a href={`https://wa.me/${WA_NUMBER}`} onClick={() => trackWa('nav-group')} className="bg-brand text-white px-8 py-3 rounded-xl hover:brightness-110 transition-all font-black shadow-lg shadow-brand/20 flex items-center gap-2">
                <MessageCircle size={14} strokeWidth={3} />WHATSAPP 24H
              </a>
            </div>
            <button className="md:hidden w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white" onClick={() => setIsMenuOpen(true)}>
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[160] bg-bg-deep p-8 flex flex-col">
          <div className="flex justify-between items-center mb-12">
            <div className="bg-brand p-2 rounded-lg"><Car className="text-white w-5 h-5" /></div>
            <button onClick={() => setIsMenuOpen(false)} className="text-slate-500"><X size={32} /></button>
          </div>
          <div className="flex flex-col gap-8">
            {[{ label: 'Inicio', href: '/' }, { label: 'Destinos', href: '/#destinos' }, { label: 'Reservar', href: '/#reserva' }].map(item => (
              <a key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)} className="text-2xl font-black text-white uppercase italic tracking-tighter hover:text-brand transition-colors">{item.label}</a>
            ))}
          </div>
          <div className="mt-auto pt-10 border-t border-white/5">
            <a href={`https://wa.me/${WA_NUMBER}`} onClick={() => trackWa('mobile-menu-group')} className="w-full bg-brand text-white py-5 rounded-2xl flex items-center justify-center gap-3 font-black uppercase tracking-widest text-xs">
              <MessageCircle size={20} strokeWidth={3} />WHATSAPP 24 HORAS
            </a>
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="pt-40 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <nav className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-8 flex items-center gap-2">
          <a href="/" className="hover:text-brand transition-colors">Inicio</a>
          <ChevronRight size={12} />
          <span className="text-brand">Taxi 8 Plazas Gran Canaria</span>
        </nav>
        <div className="inline-block px-3 py-1 bg-brand/10 text-brand text-[10px] font-black uppercase tracking-[0.2em] mb-6 rounded-sm border border-brand/20">
          Un vehículo · Todo el grupo · Precio fijo
        </div>
        <h1 className="font-display text-5xl lg:text-7xl font-extrabold text-white leading-none mb-6 tracking-tighter">
          Taxi 8 Plazas <span className="text-brand">Gran Canaria</span><br />Transfer Aeropuerto para Grupos
        </h1>
        <p className="text-lg text-slate-400 mb-10 leading-relaxed max-w-2xl">
          Un solo MaxiTaxi para toda tu familia o grupo. Hasta 8 personas con todo el equipaje, precio cerrado desde 35€ — sale más barato que dos taxis normales. Servicio oficial 24 horas, monitorización de vuelos incluida.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <a href={`https://wa.me/${WA_NUMBER}?text=Hola%2C%20necesito%20un%20MaxiTaxi%208%20plazas`} onClick={() => trackWa('hero-group')} className="bg-brand text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:brightness-110 transition-all flex items-center gap-3 justify-center text-sm shadow-2xl shadow-brand/30">
            <MessageCircle size={20} strokeWidth={3} />Reservar por WhatsApp
          </a>
          <a href="/#reserva" className="bg-white/5 border border-white/10 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-3 justify-center text-sm">
            Formulario Online
          </a>
        </div>
        <div className="flex flex-wrap gap-6">
          {['Hasta 8 pasajeros', 'Precio fijo por vehículo', 'Equipaje sin límite', 'Disponible 24h'].map((f, i) => (
            <div key={i} className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-brand shrink-0" strokeWidth={3} />
              <span className="text-sm font-semibold text-slate-300">{f}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Use cases */}
      <section className="py-20 border-t border-white/5 bg-ink">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-block px-3 py-1 bg-brand/5 text-brand text-[10px] font-black uppercase tracking-[0.2em] mb-4 rounded-sm">¿Para quién?</div>
            <h2 className="font-display text-4xl font-extrabold text-white tracking-tighter">El MaxiTaxi es perfecto para…</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((item, i) => (
              <div key={i} className="card-geometric p-8 rounded-[2rem] border border-white/5 hover:border-brand/30 transition-all duration-300 flex flex-col gap-4">
                <div className="w-12 h-12 bg-brand/10 text-brand rounded-xl flex items-center justify-center">
                  <item.icon size={24} />
                </div>
                <h3 className="font-display text-lg font-black text-white">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Price comparison */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-block px-3 py-1 bg-brand/5 text-brand text-[10px] font-black uppercase tracking-[0.2em] mb-4 rounded-sm">Ahorra en Grupo</div>
            <h2 className="font-display text-4xl font-extrabold text-white tracking-tighter mb-4">Un vehículo sale más barato</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Para grupos de 5 o más personas, el MaxiTaxi 8 plazas suele costar lo mismo o menos que dividir el grupo en varios taxis estándar.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="card-geometric p-8 rounded-[2rem] border border-red-500/20 bg-red-500/5">
              <p className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-4">❌ Opción habitual: 2 taxis</p>
              <div className="space-y-3">
                <div className="flex justify-between text-sm font-semibold text-slate-300">
                  <span>Taxi 1 (4 personas) → Maspalomas</span><span className="text-white">~60€</span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-slate-300">
                  <span>Taxi 2 (4 personas) → Maspalomas</span><span className="text-white">~60€</span>
                </div>
                <div className="border-t border-white/10 pt-3 flex justify-between font-black text-white">
                  <span>TOTAL 8 personas</span><span className="text-red-400 text-xl">~120€</span>
                </div>
              </div>
            </div>
            <div className="card-geometric p-8 rounded-[2rem] border border-brand/30 bg-brand/5">
              <p className="text-[10px] font-black text-brand uppercase tracking-widest mb-4">✓ MaxiTaxi: 1 solo vehículo</p>
              <div className="space-y-3">
                <div className="flex justify-between text-sm font-semibold text-slate-300">
                  <span>1 MaxiTaxi (8 personas) → Maspalomas</span><span className="text-white">55€</span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-slate-300">
                  <span>Todo el grupo junto</span><span className="text-brand">✓</span>
                </div>
                <div className="border-t border-white/10 pt-3 flex justify-between font-black text-white">
                  <span>TOTAL 8 personas</span><span className="text-brand text-xl">55€</span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-center text-slate-500 text-xs font-bold uppercase tracking-widest">Ahorro de hasta 65€ en un solo trayecto</p>
        </div>
      </section>

      {/* Price table */}
      <section className="py-20 border-t border-white/5 bg-ink">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block px-3 py-1 bg-brand/5 text-brand text-[10px] font-black uppercase tracking-[0.2em] mb-4 rounded-sm">Tarifas Fijas</div>
            <h2 className="font-display text-4xl font-extrabold text-white tracking-tighter">Precios desde el Aeropuerto LPA</h2>
            <p className="text-slate-400 mt-3 text-sm">Precio por vehículo completo (hasta 8 personas). Sin coste extra por equipaje.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Destino</th>
                  <th className="text-center py-4 px-4 text-[10px] font-black text-slate-500 uppercase tracking-widest"><MapPin size={12} className="inline mr-1" />Distancia</th>
                  <th className="text-center py-4 px-4 text-[10px] font-black text-slate-500 uppercase tracking-widest"><Clock size={12} className="inline mr-1" />Tiempo</th>
                  <th className="text-right py-4 px-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Precio fijo</th>
                </tr>
              </thead>
              <tbody>
                {destinations.map((d, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                    <td className="py-4 px-4 font-semibold text-white">{d.name}</td>
                    <td className="py-4 px-4 text-center text-slate-400">{d.km} km</td>
                    <td className="py-4 px-4 text-center text-slate-400">{d.mins} min</td>
                    <td className="py-4 px-4 text-right font-black text-brand text-lg">{d.price}€</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-center text-slate-600 text-[10px] font-bold uppercase tracking-widest">* Precios orientativos. Pueden variar ligeramente según tráfico.</p>
          <div className="mt-10 text-center">
            <a href={`https://wa.me/${WA_NUMBER}?text=Hola%2C%20quiero%20precio%20para%20un%20grupo`} onClick={() => trackWa('prices-group')} className="inline-flex items-center gap-3 bg-brand text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:brightness-110 transition-all text-sm shadow-2xl shadow-brand/30">
              <MessageCircle size={20} strokeWidth={3} />Pedir Precio para Mi Grupo
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block px-3 py-1 bg-brand/5 text-brand text-[10px] font-black uppercase tracking-[0.2em] mb-4 rounded-sm">Preguntas Frecuentes</div>
            <h2 className="font-display text-4xl font-extrabold text-white tracking-tighter">Taxi 8 Plazas — Dudas Habituales</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="card-geometric rounded-2xl border border-white/5 overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-left px-6 py-5 flex justify-between items-center gap-4 hover:bg-white/2 transition-colors">
                  <span className="font-bold text-white text-sm">{faq.q}</span>
                  <ChevronRight size={18} className={`text-brand shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-90' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 text-slate-400 text-sm leading-relaxed border-t border-white/5 pt-4">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 border-t border-white/5 bg-ink">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center gap-1 text-brand mb-6">
            {[1,2,3,4,5].map(i => <Star key={i} size={20} fill="currentColor" />)}
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-black text-white mb-6 tracking-tighter">¿Listo para reservar tu MaxiTaxi?</h2>
          <p className="text-slate-400 mb-10 text-lg">Confirmación inmediata por WhatsApp. Conductor con cartel en llegadas. Sin pagos anticipados.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`https://wa.me/${WA_NUMBER}?text=Hola%2C%20necesito%20un%20MaxiTaxi%208%20plazas`} onClick={() => trackWa('cta-group')} className="bg-brand text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:brightness-110 transition-all flex items-center gap-3 justify-center text-sm shadow-2xl shadow-brand/30">
              <MessageCircle size={20} strokeWidth={3} />Reservar por WhatsApp
            </a>
            <a href="/#reserva" className="bg-white/5 border border-white/10 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-3 justify-center text-sm">
              Formulario Online
            </a>
          </div>
        </div>
      </section>

      {/* Footer strip */}
      <footer className="border-t border-white/5 py-10 bg-bg-deep">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-600">
          <a href="/" className="flex items-center gap-2">
            <div className="bg-brand p-1.5 rounded-lg"><Car className="text-white w-4 h-4" /></div>
            <span className="text-white font-display text-base">MaxiTaxi<span className="text-brand">GranCanary</span></span>
          </a>
          <div className="flex gap-8">
            <a href="/#servicios" className="hover:text-brand transition-colors">Servicios</a>
            <a href="/#destinos" className="hover:text-brand transition-colors">Destinos</a>
            <a href="/en/8-seater-taxi/" className="hover:text-brand transition-colors">English</a>
          </div>
          <p>© {new Date().getFullYear()} MaxiTaxi Gran Canaria. Servicio Oficial.</p>
        </div>
      </footer>
    </div>
  );
}

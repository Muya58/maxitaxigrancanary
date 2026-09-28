import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Car, Clock, MapPin, MessageCircle, CheckCircle2, ChevronRight, Menu, X, Star, Users } from 'lucide-react';

const CANONICAL = 'https://www.maxitaxigrancanary.com/en/prices/';
const WA_NUMBER = '34619735892';

const destinations = [
  { name: 'Las Palmas de Gran Canaria', area: 'Las Palmas Norte', km: 28, mins: 25, price: 35, note: 'Centro, Triana, Las Canteras, Sta. Catalina' },
  { name: 'Arucas', area: 'Las Palmas Norte', km: 32, mins: 30, price: 45, note: 'Arucas town, rum museum area' },
  { name: 'Puerto Rico de Gran Canaria', area: 'South', km: 38, mins: 35, price: 50, note: 'Puerto Rico beach, Amadores, marina' },
  { name: 'Agaete / Puerto de las Nieves', area: 'Northwest', km: 42, mins: 38, price: 55, note: 'Ferry terminal, Agaete valley' },
  { name: 'Meloneras', area: 'South', km: 44, mins: 38, price: 55, note: 'Lopesan Costa Meloneras, promenade' },
  { name: 'Maspalomas / Playa del Inglés', area: 'South', km: 47, mins: 40, price: 55, note: 'Maspalomas dunes, Yumbo, Kasbah' },
  { name: 'Mogán / Puerto de Mogán', area: 'South', km: 55, mins: 50, price: 65, note: '"Little Venice", Arguineguín' },
];

const included = [
  'Up to 8 passengers in one vehicle',
  'All luggage — suitcases, pushchairs, surfboards',
  'Real-time flight monitoring (no surcharge for delays)',
  'Driver with name board at arrivals',
  'Night service at same price (no night surcharge)',
  'Air-conditioned, modern 8-seater minivan',
];

const faqs = [
  {
    q: 'Are Gran Canaria taxi prices fixed or metered?',
    a: 'With MaxiTaxi, all prices are fixed in advance. You agree the price before you travel — no meter, no surprises. Standard airport taxis in Gran Canaria run on meters, which can vary with traffic.',
  },
  {
    q: 'Does the price include all passengers and luggage?',
    a: 'Yes. The price shown is per vehicle, not per person. Whether you travel alone or with 8 people, it's the same flat rate. All luggage including oversized items (surfboards, pushchairs, golf bags) is included.',
  },
  {
    q: 'Is there a surcharge for night arrivals or early departures?',
    a: 'No. MaxiTaxi operates 24/7 at the same prices — no night surcharge, no weekend surcharge, no holiday surcharge. The price shown is what you pay.',
  },
  {
    q: 'How do I get an exact price for my destination?',
    a: 'Send us your pick-up and drop-off address on WhatsApp (+34 619 735 892). We'll quote you a fixed price within minutes. You can also use the price calculator on the homepage.',
  },
  {
    q: 'What if my destination is not on the list?',
    a: 'We cover all of Gran Canaria. If your destination isn't listed, message us on WhatsApp with your address and we will quote you a fixed price for your specific route.',
  },
];

function trackWa(label: string) {
  if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', 'whatsapp_click', { event_category: 'conversion', event_label: label });
  }
}

export default function PricesPage() {
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
        <title>Gran Canaria Taxi Prices 2026 | Fixed Airport Transfer Rates | MaxiTaxi</title>
        <meta name="description" content="Gran Canaria airport taxi prices 2026. Fixed rates from €35 (Las Palmas) to €65 (Mogán). 8-seater, all luggage included, 24/7. No meters, no surprises." />
      </Helmet>

      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-100 transition-all duration-500 ${scrolled ? 'bg-bg-deep/90 backdrop-blur-xl py-3 border-b border-white/10 shadow-2xl shadow-brand/5' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <a href="/" className="flex items-center gap-2 group">
            <div className="bg-brand p-2 rounded-lg group-hover:scale-110 transition-transform"><Car className="text-white w-6 h-6" /></div>
            <span className="font-display font-black text-xl tracking-tighter text-white uppercase italic">MaxiTaxi<span className="text-brand">GranCanary</span></span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            <a href="/#servicios" className="hover:text-brand transition-colors">Services</a>
            <a href="/#destinos" className="hover:text-brand transition-colors">Destinations</a>
            <a href="/en/8-seater-taxi/" className="hover:text-brand transition-colors">Groups</a>
            <a href={`https://wa.me/${WA_NUMBER}`} onClick={() => trackWa('nav-prices')} className="bg-brand text-white px-8 py-3 rounded-xl hover:brightness-110 transition-all font-black shadow-lg shadow-brand/20 flex items-center gap-2">
              <MessageCircle size={14} strokeWidth={3} />BOOK NOW
            </a>
          </div>
          <button className="md:hidden w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white" onClick={() => setIsMenuOpen(true)}><Menu size={24} /></button>
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
            {[{ label: 'Home', href: '/' }, { label: 'Destinations', href: '/#destinos' }, { label: 'Groups', href: '/en/8-seater-taxi/' }, { label: 'Book', href: '/#reserva' }].map(item => (
              <a key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)} className="text-2xl font-black text-white uppercase italic tracking-tighter hover:text-brand transition-colors">{item.label}</a>
            ))}
          </div>
          <div className="mt-auto pt-10 border-t border-white/5">
            <a href={`https://wa.me/${WA_NUMBER}`} onClick={() => trackWa('mobile-prices')} className="w-full bg-brand text-white py-5 rounded-2xl flex items-center justify-center gap-3 font-black uppercase tracking-widest text-xs">
              <MessageCircle size={20} strokeWidth={3} />BOOK VIA WHATSAPP
            </a>
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="pt-40 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <nav className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-8 flex items-center gap-2">
          <a href="/" className="hover:text-brand transition-colors">Home</a>
          <ChevronRight size={12} />
          <span className="text-brand">Taxi Prices Gran Canaria</span>
        </nav>
        <div className="inline-block px-3 py-1 bg-brand/10 text-brand text-[10px] font-black uppercase tracking-[0.2em] mb-6 rounded-sm border border-brand/20">
          Fixed prices · No meters · All luggage included
        </div>
        <h1 className="font-display text-5xl lg:text-7xl font-extrabold text-white leading-none mb-6 tracking-tighter">
          Gran Canaria <span className="text-brand">Airport Taxi</span><br />Prices 2026
        </h1>
        <p className="text-lg text-slate-400 mb-10 leading-relaxed max-w-2xl">
          Fixed prices from Gran Canaria Airport (LPA) to every major resort. The price you see is the price you pay — per vehicle, not per person. Up to 8 passengers at no extra cost.
        </p>
        <div className="flex flex-wrap gap-6 mb-4">
          {['Price per vehicle (1–8 pax)', 'All luggage free', 'No night surcharge', 'Fixed before you travel'].map((f, i) => (
            <div key={i} className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-brand shrink-0" strokeWidth={3} />
              <span className="text-sm font-semibold text-slate-300">{f}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Main price table */}
      <section className="py-16 border-t border-white/5 bg-ink">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block px-3 py-1 bg-brand/5 text-brand text-[10px] font-black uppercase tracking-[0.2em] mb-4 rounded-sm">From Gran Canaria Airport (LPA)</div>
            <h2 className="font-display text-4xl font-extrabold text-white tracking-tighter">Fixed Transfer Prices</h2>
            <p className="text-slate-400 mt-3 text-sm max-w-xl mx-auto">All prices are per vehicle. Up to 8 passengers travel at the same fixed price. Return trips available at the same rate.</p>
          </div>

          <div className="overflow-x-auto rounded-[1.5rem] border border-white/5">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/2">
                  <th className="text-left py-4 px-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Destination</th>
                  <th className="text-left py-4 px-4 text-[10px] font-black text-slate-500 uppercase tracking-widest hidden sm:table-cell">Area</th>
                  <th className="text-center py-4 px-4 text-[10px] font-black text-slate-500 uppercase tracking-widest"><MapPin size={11} className="inline mr-1" />Km</th>
                  <th className="text-center py-4 px-4 text-[10px] font-black text-slate-500 uppercase tracking-widest"><Clock size={11} className="inline mr-1" />Time</th>
                  <th className="text-right py-4 px-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Fixed price</th>
                </tr>
              </thead>
              <tbody>
                {destinations.map((d, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                    <td className="py-5 px-6">
                      <p className="font-bold text-white">{d.name}</p>
                      <p className="text-slate-600 text-[11px] font-medium mt-0.5">{d.note}</p>
                    </td>
                    <td className="py-5 px-4 text-slate-500 text-xs font-bold uppercase tracking-wider hidden sm:table-cell">{d.area}</td>
                    <td className="py-5 px-4 text-center text-slate-400 font-semibold">{d.km} km</td>
                    <td className="py-5 px-4 text-center text-slate-400 font-semibold">{d.mins} min</td>
                    <td className="py-5 px-6 text-right">
                      <span className="font-black text-brand text-2xl">€{d.price}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-slate-600 text-[10px] font-bold uppercase tracking-widest text-center">* Indicative prices. May vary slightly with traffic. Confirm via WhatsApp for exact quote.</p>
        </div>
      </section>

      {/* Per-person breakdown */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block px-3 py-1 bg-brand/5 text-brand text-[10px] font-black uppercase tracking-[0.2em] mb-4 rounded-sm">Value per person</div>
            <h2 className="font-display text-4xl font-extrabold text-white tracking-tighter">The more people, the cheaper per person</h2>
          </div>
          <div className="overflow-x-auto rounded-[1.5rem] border border-white/5">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/2">
                  <th className="text-left py-4 px-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Route</th>
                  <th className="text-center py-4 px-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">1–2 pax</th>
                  <th className="text-center py-4 px-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">4 pax</th>
                  <th className="text-center py-4 px-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">6 pax</th>
                  <th className="text-center py-4 px-4 text-[10px] font-black text-brand uppercase tracking-widest">8 pax</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { dest: 'Las Palmas', price: 35 },
                  { dest: 'Maspalomas', price: 55 },
                  { dest: 'Puerto Rico', price: 50 },
                  { dest: 'Mogán', price: 65 },
                ].map((r, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                    <td className="py-4 px-6 font-bold text-white">{r.dest}</td>
                    <td className="py-4 px-4 text-center text-slate-400">€{r.price}–€{(r.price / 2).toFixed(0)}</td>
                    <td className="py-4 px-4 text-center text-slate-400">€{(r.price / 4).toFixed(0)}/pp</td>
                    <td className="py-4 px-4 text-center text-slate-400">€{(r.price / 6).toFixed(0)}/pp</td>
                    <td className="py-4 px-4 text-center font-black text-brand">€{(r.price / 8).toFixed(0)}/pp</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-slate-600 text-[10px] font-bold uppercase tracking-widest text-center">pp = per person. Fixed vehicle price split equally.</p>

          <div className="mt-10 p-6 bg-brand/5 border border-brand/20 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brand/10 text-brand rounded-xl flex items-center justify-center shrink-0"><Users size={24} /></div>
              <div>
                <p className="text-white font-black text-sm">Travelling in a group?</p>
                <p className="text-slate-400 text-xs mt-0.5">The 8-seater MaxiTaxi is almost always cheaper than splitting into 2 standard taxis.</p>
              </div>
            </div>
            <a href="/en/8-seater-taxi/" className="whitespace-nowrap text-[10px] font-black text-brand uppercase tracking-widest border border-brand/30 px-5 py-3 rounded-xl hover:bg-brand/10 transition-all flex items-center gap-2">
              Group Prices<ChevronRight size={12} />
            </a>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-16 border-t border-white/5 bg-ink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block px-3 py-1 bg-brand/5 text-brand text-[10px] font-black uppercase tracking-[0.2em] mb-4 rounded-sm">Included in every transfer</div>
            <h2 className="font-display text-4xl font-extrabold text-white tracking-tighter">What's included in the price</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {included.map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-5 bg-white/3 border border-white/5 rounded-2xl">
                <CheckCircle2 size={18} className="text-brand shrink-0 mt-0.5" strokeWidth={3} />
                <span className="text-slate-300 text-sm font-semibold">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block px-3 py-1 bg-brand/5 text-brand text-[10px] font-black uppercase tracking-[0.2em] mb-4 rounded-sm">FAQ</div>
            <h2 className="font-display text-4xl font-extrabold text-white tracking-tighter">Price Questions Answered</h2>
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

      {/* CTA */}
      <section className="py-24 border-t border-white/5 bg-ink">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center gap-1 text-brand mb-6">
            {[1,2,3,4,5].map(i => <Star key={i} size={20} fill="currentColor" />)}
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-black text-white mb-6 tracking-tighter">Book your fixed-price transfer</h2>
          <p className="text-slate-400 mb-10 text-lg">Confirm your price via WhatsApp in minutes. No payment upfront — pay the driver on arrival.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`https://wa.me/${WA_NUMBER}?text=Hello%2C%20I%20would%20like%20to%20book%20a%20transfer%20from%20Gran%20Canaria%20Airport`} onClick={() => trackWa('cta-prices')} className="bg-brand text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:brightness-110 transition-all flex items-center gap-3 justify-center text-sm shadow-2xl shadow-brand/30">
              <MessageCircle size={20} strokeWidth={3} />Book via WhatsApp
            </a>
            <a href="/#reserva" className="bg-white/5 border border-white/10 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-3 justify-center text-sm">
              Online Form
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
          <div className="flex flex-wrap gap-6 justify-center">
            <a href="/en/8-seater-taxi/" className="hover:text-brand transition-colors">Group Transfers</a>
            <a href="/en/airport-transfer-guide/" className="hover:text-brand transition-colors">Transfer Guide</a>
            <a href="/#destinos" className="hover:text-brand transition-colors">Destinations</a>
          </div>
          <p>© {new Date().getFullYear()} MaxiTaxi Gran Canaria.</p>
        </div>
      </footer>
    </div>
  );
}

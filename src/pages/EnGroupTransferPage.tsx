import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Car, Clock, MapPin, MessageCircle, Users, ShieldCheck, CheckCircle2, ChevronRight, Menu, X, Star } from 'lucide-react';

const CANONICAL = 'https://www.maxitaxigrancanary.com/en/8-seater-taxi/';
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
  { icon: Users, title: 'Large Families', desc: 'Up to 8 people with full luggage. One vehicle for the whole family — no splitting up, no second car.' },
  { icon: Car, title: 'Groups of Friends', desc: 'Travel from the airport together. Fixed group price: usually cheaper than splitting across two standard taxis.' },
  { icon: ShieldCheck, title: 'Surfers & Sports Groups', desc: 'Surfboards, bikes, dive equipment and oversized bags. Ample boot space at no extra charge.' },
  { icon: Star, title: 'Events & Celebrations', desc: 'VIP transfer for weddings, hen/stag parties or birthdays. Punctual driver with a welcome board.' },
];

const faqs = [
  {
    q: 'How many people fit in a MaxiTaxi?',
    a: 'Our 8-seater minivans have room for up to 8 passengers plus their luggage. Large suitcases, pushchairs, surfboards and sports equipment all fit without additional charges.',
  },
  {
    q: 'Is it cheaper than booking two standard taxis?',
    a: 'Significantly cheaper. Two standard taxis to Maspalomas typically cost around €110-120 combined. One MaxiTaxi for the whole group is €55 — fixed price, no haggling, no surprises.',
  },
  {
    q: 'Is there an extra charge for large luggage?',
    a: 'No. The price is per vehicle, not per bag. Surfboards, folded bikes, pushchairs and oversized cases are all included in the price.',
  },
  {
    q: 'Will the driver wait if our flight is delayed?',
    a: 'Yes. We monitor your flight number in real time and adjust pick-up time automatically. There are no waiting charges for flight delays.',
  },
  {
    q: 'How do I book an 8-seater taxi for my group?',
    a: 'Via WhatsApp at +34 619 735 892. Send us your flight number, date, number of passengers and destination. We confirm within minutes. You can also use the booking form on the homepage.',
  },
];

function trackWa(label: string) {
  if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', 'whatsapp_click', { event_category: 'conversion', event_label: label });
  }
}

export default function EnGroupTransferPage() {
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
        <title>8-Seater Taxi Gran Canaria — Group & Family Airport Transfer | MaxiTaxi</title>
        <meta name="description" content="8-seater minivan taxi in Gran Canaria. Fixed price group airport transfers for families, friends and sports groups. From €35, 24/7, no luggage surcharge. Book via WhatsApp." />
      </Helmet>

      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-100 transition-all duration-500 ${scrolled ? 'bg-bg-deep/90 backdrop-blur-xl py-3 border-b border-white/10 shadow-2xl shadow-brand/5' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <a href="/" className="flex items-center gap-2 group">
              <div className="bg-brand p-2 rounded-lg group-hover:scale-110 transition-transform"><Car className="text-white w-6 h-6" /></div>
              <span className="font-display font-black text-xl tracking-tighter text-white uppercase italic">MaxiTaxi<span className="text-brand">GranCanary</span></span>
            </a>
            <div className="hidden md:flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              <a href="/#servicios" className="hover:text-brand transition-colors">Services</a>
              <a href="/#destinos" className="hover:text-brand transition-colors">Destinations</a>
              <a href="/#reserva" className="hover:text-brand transition-colors">Book</a>
              <a href={`https://wa.me/${WA_NUMBER}`} onClick={() => trackWa('nav-en-group')} className="bg-brand text-white px-8 py-3 rounded-xl hover:brightness-110 transition-all font-black shadow-lg shadow-brand/20 flex items-center gap-2">
                <MessageCircle size={14} strokeWidth={3} />WHATSAPP 24H
              </a>
            </div>
            <button className="md:hidden w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white" onClick={() => setIsMenuOpen(true)}><Menu size={24} /></button>
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
            {[{ label: 'Home', href: '/' }, { label: 'Destinations', href: '/#destinos' }, { label: 'Book', href: '/#reserva' }].map(item => (
              <a key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)} className="text-2xl font-black text-white uppercase italic tracking-tighter hover:text-brand transition-colors">{item.label}</a>
            ))}
          </div>
          <div className="mt-auto pt-10 border-t border-white/5">
            <a href={`https://wa.me/${WA_NUMBER}`} onClick={() => trackWa('mobile-en-group')} className="w-full bg-brand text-white py-5 rounded-2xl flex items-center justify-center gap-3 font-black uppercase tracking-widest text-xs">
              <MessageCircle size={20} strokeWidth={3} />WHATSAPP 24 HOURS
            </a>
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="pt-40 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <nav className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-8 flex items-center gap-2">
          <a href="/" className="hover:text-brand transition-colors">Home</a>
          <ChevronRight size={12} />
          <span className="text-brand">8-Seater Taxi Gran Canaria</span>
        </nav>
        <div className="inline-block px-3 py-1 bg-brand/10 text-brand text-[10px] font-black uppercase tracking-[0.2em] mb-6 rounded-sm border border-brand/20">
          One vehicle · Whole group · Fixed price
        </div>
        <h1 className="font-display text-5xl lg:text-7xl font-extrabold text-white leading-none mb-6 tracking-tighter">
          8-Seater Taxi <span className="text-brand">Gran Canaria</span><br />Group & Family Airport Transfer
        </h1>
        <p className="text-lg text-slate-400 mb-10 leading-relaxed max-w-2xl">
          One MaxiTaxi for your whole family or group. Up to 8 passengers with all luggage, fixed price from €35 — cheaper than two standard taxis. Official licensed service, 24 hours a day, flight monitoring included.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <a href={`https://wa.me/${WA_NUMBER}?text=Hello%2C%20I%20need%20an%208-seater%20taxi%20in%20Gran%20Canaria`} onClick={() => trackWa('hero-en-group')} className="bg-brand text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:brightness-110 transition-all flex items-center gap-3 justify-center text-sm shadow-2xl shadow-brand/30">
            <MessageCircle size={20} strokeWidth={3} />Book via WhatsApp
          </a>
          <a href="/#reserva" className="bg-white/5 border border-white/10 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-3 justify-center text-sm">
            Online Booking Form
          </a>
        </div>
        <div className="flex flex-wrap gap-6">
          {['Up to 8 passengers', 'Fixed price per vehicle', 'Unlimited luggage', '24/7 service'].map((f, i) => (
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
            <div className="inline-block px-3 py-1 bg-brand/5 text-brand text-[10px] font-black uppercase tracking-[0.2em] mb-4 rounded-sm">Perfect for</div>
            <h2 className="font-display text-4xl font-extrabold text-white tracking-tighter">Who uses the MaxiTaxi?</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((item, i) => (
              <div key={i} className="card-geometric p-8 rounded-[2rem] border border-white/5 hover:border-brand/30 transition-all duration-300 flex flex-col gap-4">
                <div className="w-12 h-12 bg-brand/10 text-brand rounded-xl flex items-center justify-center"><item.icon size={24} /></div>
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
            <div className="inline-block px-3 py-1 bg-brand/5 text-brand text-[10px] font-black uppercase tracking-[0.2em] mb-4 rounded-sm">Save as a Group</div>
            <h2 className="font-display text-4xl font-extrabold text-white tracking-tighter mb-4">One vehicle is cheaper</h2>
            <p className="text-slate-400 max-w-xl mx-auto">For groups of 5 or more, the 8-seater MaxiTaxi is almost always cheaper than splitting into separate standard taxis.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="card-geometric p-8 rounded-[2rem] border border-red-500/20 bg-red-500/5">
              <p className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-4">❌ Standard option: 2 taxis</p>
              <div className="space-y-3">
                <div className="flex justify-between text-sm font-semibold text-slate-300"><span>Taxi 1 (4 people) → Maspalomas</span><span className="text-white">~€60</span></div>
                <div className="flex justify-between text-sm font-semibold text-slate-300"><span>Taxi 2 (4 people) → Maspalomas</span><span className="text-white">~€60</span></div>
                <div className="border-t border-white/10 pt-3 flex justify-between font-black text-white"><span>TOTAL 8 people</span><span className="text-red-400 text-xl">~€120</span></div>
              </div>
            </div>
            <div className="card-geometric p-8 rounded-[2rem] border border-brand/30 bg-brand/5">
              <p className="text-[10px] font-black text-brand uppercase tracking-widest mb-4">✓ MaxiTaxi: 1 vehicle</p>
              <div className="space-y-3">
                <div className="flex justify-between text-sm font-semibold text-slate-300"><span>1 MaxiTaxi (8 people) → Maspalomas</span><span className="text-white">€55</span></div>
                <div className="flex justify-between text-sm font-semibold text-slate-300"><span>Whole group travels together</span><span className="text-brand">✓</span></div>
                <div className="border-t border-white/10 pt-3 flex justify-between font-black text-white"><span>TOTAL 8 people</span><span className="text-brand text-xl">€55</span></div>
              </div>
            </div>
          </div>
          <p className="text-center text-slate-500 text-xs font-bold uppercase tracking-widest">Save up to €65 on a single journey</p>
        </div>
      </section>

      {/* Price table */}
      <section className="py-20 border-t border-white/5 bg-ink">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block px-3 py-1 bg-brand/5 text-brand text-[10px] font-black uppercase tracking-[0.2em] mb-4 rounded-sm">Fixed Prices</div>
            <h2 className="font-display text-4xl font-extrabold text-white tracking-tighter">Prices from Gran Canaria Airport (LPA)</h2>
            <p className="text-slate-400 mt-3 text-sm">Price per full vehicle (up to 8 people). No luggage surcharge.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Destination</th>
                  <th className="text-center py-4 px-4 text-[10px] font-black text-slate-500 uppercase tracking-widest"><MapPin size={12} className="inline mr-1" />Distance</th>
                  <th className="text-center py-4 px-4 text-[10px] font-black text-slate-500 uppercase tracking-widest"><Clock size={12} className="inline mr-1" />Time</th>
                  <th className="text-right py-4 px-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Fixed price</th>
                </tr>
              </thead>
              <tbody>
                {destinations.map((d, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                    <td className="py-4 px-4 font-semibold text-white">{d.name}</td>
                    <td className="py-4 px-4 text-center text-slate-400">{d.km} km</td>
                    <td className="py-4 px-4 text-center text-slate-400">{d.mins} min</td>
                    <td className="py-4 px-4 text-right font-black text-brand text-lg">€{d.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-center text-slate-600 text-[10px] font-bold uppercase tracking-widest">* Indicative prices. May vary slightly with traffic conditions.</p>
          <div className="mt-10 text-center">
            <a href={`https://wa.me/${WA_NUMBER}?text=Hello%2C%20I%20would%20like%20a%20quote%20for%20a%20group`} onClick={() => trackWa('prices-en-group')} className="inline-flex items-center gap-3 bg-brand text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:brightness-110 transition-all text-sm shadow-2xl shadow-brand/30">
              <MessageCircle size={20} strokeWidth={3} />Get a Group Quote
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block px-3 py-1 bg-brand/5 text-brand text-[10px] font-black uppercase tracking-[0.2em] mb-4 rounded-sm">FAQ</div>
            <h2 className="font-display text-4xl font-extrabold text-white tracking-tighter">8-Seater Taxi — Common Questions</h2>
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
          <h2 className="font-display text-4xl lg:text-5xl font-black text-white mb-6 tracking-tighter">Ready to book your MaxiTaxi?</h2>
          <p className="text-slate-400 mb-10 text-lg">Instant WhatsApp confirmation. Driver with name board in arrivals. No upfront payment.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`https://wa.me/${WA_NUMBER}?text=Hello%2C%20I%20need%20an%208-seater%20taxi%20in%20Gran%20Canaria`} onClick={() => trackWa('cta-en-group')} className="bg-brand text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:brightness-110 transition-all flex items-center gap-3 justify-center text-sm shadow-2xl shadow-brand/30">
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
          <div className="flex gap-8">
            <a href="/#servicios" className="hover:text-brand transition-colors">Services</a>
            <a href="/#destinos" className="hover:text-brand transition-colors">Destinations</a>
            <a href="/taxi-8-plazas/" className="hover:text-brand transition-colors">Español</a>
          </div>
          <p>© {new Date().getFullYear()} MaxiTaxi Gran Canaria. Official Licensed Service.</p>
        </div>
      </footer>
    </div>
  );
}

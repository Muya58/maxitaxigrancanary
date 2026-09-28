import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Car, Clock, MapPin, MessageCircle, Phone, ShieldCheck, Star, CheckCircle2, ChevronRight, Menu, X, ArrowRight } from 'lucide-react';

const CANONICAL = 'https://www.maxitaxigrancanary.com/en/airport-transfer-guide/';
const WA_NUMBER = '34619735892';

const destinations = [
  { name: 'Maspalomas & Playa del Inglés', km: 47, mins: 40, price: 55, slug: 'maspalomas', highlights: 'Maspalomas Dunes, beach resorts, Yumbo Centre' },
  { name: 'Las Palmas de Gran Canaria', km: 28, mins: 25, price: 35, slug: 'las-palmas', highlights: 'Las Canteras Beach, Triana, Santa Catalina' },
  { name: 'Puerto Rico de Gran Canaria', km: 38, mins: 35, price: 50, slug: 'puerto-rico', highlights: 'Puerto Rico Beach, Amadores, marina' },
  { name: 'Meloneras', km: 44, mins: 38, price: 55, slug: 'meloneras', highlights: 'Lopesan Costa Meloneras, promenade, lighthouse' },
  { name: 'Mogán', km: 55, mins: 50, price: 65, slug: 'mogan', highlights: 'Puerto de Mogán, Arguineguín, Playa de Mogán' },
  { name: 'Agaete', km: 42, mins: 38, price: 55, slug: 'agaete', highlights: 'Puerto de las Nieves, Valle de Agaete, ferry terminal' },
  { name: 'Arucas', km: 32, mins: 30, price: 45, slug: 'arucas', highlights: 'Arucas Cathedral, Rum Museum, Parque Municipal' },
];

const faqs = [
  {
    q: 'How much does a taxi from Gran Canaria Airport cost?',
    a: 'Fixed prices with MaxiTaxi start from €35 to Las Palmas (28 km, 25 min) and go up to €65 for the furthest destinations like Mogán (55 km, 50 min). All prices are fixed — no meters, no surprises. The 8-seater vehicle fits up to 8 passengers and their luggage at the same price.',
  },
  {
    q: 'Is it better to pre-book a transfer or take a taxi at the airport?',
    a: 'Pre-booking is strongly recommended. Airport taxi queues can be long, especially after busy flights from the UK, Ireland and mainland Spain. With a pre-booked transfer, your driver waits at arrivals with a name board — no queue, no waiting. If your flight is delayed, we monitor it in real time and adjust pick-up time automatically.',
  },
  {
    q: 'How long does it take to get from Gran Canaria Airport to the south resorts?',
    a: 'Maspalomas and Playa del Inglés: approx. 40 minutes (47 km via GC-1). Puerto Rico: approx. 35 minutes (38 km). Meloneras: approx. 38 minutes (44 km). Mogán: approx. 50 minutes (55 km). Times may vary depending on traffic.',
  },
  {
    q: 'Do you operate 24 hours including night arrivals and early departures?',
    a: 'Yes — MaxiTaxi operates 24 hours a day, 365 days a year. There is no surcharge for night transfers. Whether your flight lands at 2am or you need to be at the airport for a 5am departure, we will be there.',
  },
  {
    q: 'Can we fit 7 or 8 passengers with luggage in one vehicle?',
    a: 'Absolutely. Our vehicles are 8-seater minivans with ample luggage space, including room for oversized items like pushchairs, golf bags, and large suitcases. Most families and groups find one vehicle is enough — which makes MaxiTaxi significantly cheaper per person than booking several standard taxis.',
  },
  {
    q: 'How do I book a transfer from Gran Canaria Airport?',
    a: 'The quickest way is via WhatsApp (+34 619 735 892). Send us your flight number, arrival date, number of passengers and destination. We reply within minutes to confirm. You can also use the booking form on our website.',
  },
];

function trackWa(label: string) {
  if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', 'whatsapp_click', { event_category: 'conversion', event_label: label });
  }
}

export default function TransferGuidePage() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const waUrl = (msg: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  const waBooking = waUrl('Hi, I need to book an airport transfer in Gran Canaria. Can you help?');

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: 'Gran Canaria Airport Transfer Guide 2026',
        description: 'Complete guide to Gran Canaria Airport (LPA) transfers — prices, distances, journey times and tips for arriving travellers.',
        url: CANONICAL,
        datePublished: '2026-09-01',
        dateModified: '2026-09-28',
        author: { '@type': 'Organization', name: 'MaxiTaxi Gran Canaria' },
        publisher: {
          '@type': 'Organization',
          name: 'MaxiTaxi Gran Canaria',
          url: 'https://www.maxitaxigrancanary.com',
        },
        image: 'https://www.maxitaxigrancanary.com/maspalomas.jpg',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.maxitaxigrancanary.com/' },
          { '@type': 'ListItem', position: 2, name: 'Airport Transfer Guide', item: CANONICAL },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>Gran Canaria Airport Transfer Guide 2026 | MaxiTaxi</title>
        <meta name="description" content="Complete guide to Gran Canaria Airport (LPA) transfers. Fixed prices from €35, 8-seater taxis, all resorts covered. Maspalomas, Puerto Rico, Las Palmas & more. Book via WhatsApp." />
        <link rel="canonical" href={CANONICAL} />
        <link rel="alternate" hrefLang="en" href={CANONICAL} />
        <link rel="alternate" hrefLang="x-default" href={CANONICAL} />
        <meta property="og:title" content="Gran Canaria Airport Transfer Guide 2026 | MaxiTaxi" />
        <meta property="og:description" content="Fixed prices, 8-seater taxis, flight monitoring. The complete guide to getting from Gran Canaria Airport to any resort." />
        <meta property="og:url" content={CANONICAL} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://www.maxitaxigrancanary.com/maspalomas.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <div className="min-h-screen bg-white font-sans">
        {/* Nav */}
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <a href="/" className={`text-xl font-bold ${scrolled ? 'text-gray-900' : 'text-white'}`}>
              MaxiTaxi<span className="text-yellow-400">GC</span>
            </a>
            <div className="hidden md:flex items-center gap-6">
              {[['Home', '/'], ['Destinations', '/en/transfer-maspalomas/'], ['Guide', '/en/airport-transfer-guide/']].map(([label, href]) => (
                <a key={label} href={href} className={`text-sm font-medium hover:text-yellow-400 transition-colors ${scrolled ? 'text-gray-700' : 'text-white'}`}>{label}</a>
              ))}
              <a
                href={waBooking}
                onClick={() => trackWa('guide-nav')}
                target="_blank" rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-full flex items-center gap-2 transition-colors"
              >
                <MessageCircle size={16} /> Book Now
              </a>
            </div>
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className={scrolled ? 'text-gray-900' : 'text-white'} /> : <Menu className={scrolled ? 'text-gray-900' : 'text-white'} />}
            </button>
          </div>
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t px-4 py-4 flex flex-col gap-4">
              <a href="/" className="text-gray-700 font-medium">Home</a>
              <a href="/en/transfer-maspalomas/" className="text-gray-700 font-medium">Destinations</a>
              <a href={waBooking} onClick={() => trackWa('guide-nav-mobile')} target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white text-center font-semibold py-3 rounded-full">Book via WhatsApp</a>
            </div>
          )}
        </nav>

        {/* Hero */}
        <header className="relative bg-gradient-to-br from-gray-900 to-gray-700 text-white pt-32 pb-20 px-4">
          <div className="max-w-4xl mx-auto">
            <nav className="text-sm text-gray-400 mb-4 flex items-center gap-2">
              <a href="/" className="hover:text-white transition-colors">Home</a>
              <ChevronRight size={14} />
              <span className="text-white">Airport Transfer Guide</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
              Gran Canaria Airport<br />Transfer Guide 2026
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl">
              Everything you need to know about getting from Gran Canaria Airport (LPA) to your resort — prices, distances, journey times and insider tips.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={waBooking}
                onClick={() => trackWa('guide-hero')}
                target="_blank" rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-full flex items-center gap-2 transition-colors text-lg"
              >
                <MessageCircle size={20} /> Book Your Transfer
              </a>
              <a href="#prices" className="border border-white text-white font-semibold px-8 py-4 rounded-full hover:bg-white hover:text-gray-900 transition-colors text-lg">
                See Prices
              </a>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-12">

          {/* Intro */}
          <section className="mb-14">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Getting from Gran Canaria Airport (LPA)</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              Gran Canaria Airport — officially Aeropuerto de Gran Canaria (IATA: LPA) — is located on the east coast of the island, roughly midway between Las Palmas in the north and the southern resort areas. Most flights from the UK and Ireland land here, served by British Airways, easyJet, Jet2, Ryanair and TUI, with journey times of around 4 hours from London or Dublin.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              Once you land, you have three main options to reach your accommodation: a standard metered taxi from the rank, a shared shuttle bus, or a private pre-booked transfer. Each suits different travellers — here's an honest comparison.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mt-8">
              {[
                { title: 'Metered Airport Taxi', pros: ['Available on arrival', 'No booking needed'], cons: ['Queue can be long', 'Meter price, no fixed rate', 'Limited to 4 passengers'] },
                { title: 'Shared Shuttle', pros: ['Cheapest option', 'Good for solo travellers'], cons: ['Multiple stops', 'Long wait for full vehicle', 'Not door-to-door'] },
                { title: 'Private Transfer (MaxiTaxi)', pros: ['Fixed price — no surprises', '8 seats + luggage', 'Flight monitoring, no waiting', '24h including nights'], cons: ['Pre-booking required'] },
              ].map(opt => (
                <div key={opt.title} className={`rounded-xl p-6 border ${opt.title.includes('MaxiTaxi') ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200 bg-gray-50'}`}>
                  <h3 className={`font-bold text-lg mb-3 ${opt.title.includes('MaxiTaxi') ? 'text-yellow-700' : 'text-gray-800'}`}>{opt.title}</h3>
                  <ul className="space-y-2 text-sm">
                    {opt.pros.map(p => <li key={p} className="flex items-start gap-2 text-green-700"><CheckCircle2 size={15} className="mt-0.5 flex-shrink-0" />{p}</li>)}
                    {opt.cons.map(c => <li key={c} className="flex items-start gap-2 text-gray-500"><span className="mt-0.5 flex-shrink-0 text-red-400">✗</span>{c}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Prices */}
          <section id="prices" className="mb-14">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Transfer Prices from Gran Canaria Airport</h2>
            <p className="text-gray-600 mb-6">All prices below are fixed — one price covers the whole 8-seater vehicle, regardless of passenger count. Prices are the same 24/7 including nights and public holidays.</p>

            <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
              <table className="w-full text-sm">
                <thead className="bg-gray-900 text-white">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold">Destination</th>
                    <th className="text-center px-4 py-3 font-semibold">Distance</th>
                    <th className="text-center px-4 py-3 font-semibold">Journey Time</th>
                    <th className="text-center px-4 py-3 font-semibold">Fixed Price</th>
                    <th className="text-center px-4 py-3 font-semibold">Book</th>
                  </tr>
                </thead>
                <tbody>
                  {destinations.map((d, i) => (
                    <tr key={d.slug} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-4">
                        <div className="font-semibold text-gray-900">{d.name}</div>
                        <div className="text-gray-500 text-xs mt-0.5">{d.highlights}</div>
                      </td>
                      <td className="px-4 py-4 text-center text-gray-700">{d.km} km</td>
                      <td className="px-4 py-4 text-center text-gray-700">~{d.mins} min</td>
                      <td className="px-4 py-4 text-center">
                        <span className="bg-yellow-100 text-yellow-800 font-bold px-3 py-1 rounded-full">from €{d.price}</span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <a
                          href={`/en/transfer-${d.slug}/`}
                          className="text-blue-600 hover:text-blue-800 font-medium text-xs flex items-center justify-center gap-1"
                        >
                          Details <ArrowRight size={12} />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-3">* Prices are for the vehicle, not per person. Up to 8 passengers + luggage. Return transfers available at the same rate.</p>
          </section>

          {/* Why private */}
          <section className="mb-14">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Why a Private Transfer Makes Sense for Families and Groups</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Gran Canaria is a family destination. Most visitors arrive with children, buggies, beach gear and oversized suitcases. Standard metered taxis only fit 4 passengers — meaning a family of 6 would need two taxis and pay double. With MaxiTaxi's 8-seater vehicle, a group of up to 8 travels together for one fixed price.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The cost difference is striking. Two standard taxis to Maspalomas at €55 each = €110. One MaxiTaxi for the same journey = €55. That's a saving of €55 each way, or €110 for a return trip — enough to cover two nights of dinner for the family.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: <ShieldCheck className="text-yellow-500" size={28} />, title: 'Flight monitoring', desc: 'We track your flight in real time. Delayed? We adjust automatically — no frantic WhatsApp messages from the queue.' },
                { icon: <Clock className="text-yellow-500" size={28} />, title: '24h, 365 days', desc: 'Night arrival at 3am? 6am departure? No problem and no surcharge. Same fixed price around the clock.' },
                { icon: <Car className="text-yellow-500" size={28} />, title: '8 seats + luggage', desc: 'Families, stag dos, wedding groups, golf trips — our minivans handle large groups and oversized luggage easily.' },
                { icon: <Star className="text-yellow-500" size={28} />, title: 'Local driver', desc: 'Our drivers know the island. They will recommend the best routes and can advise on local tips for your stay.' },
              ].map(f => (
                <div key={f.title} className="flex gap-4 p-5 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="flex-shrink-0 mt-1">{f.icon}</div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{f.title}</h3>
                    <p className="text-gray-600 text-sm">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Arrival tips */}
          <section className="mb-14">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Tips for Arriving at Gran Canaria Airport</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Gran Canaria Airport is a medium-sized international airport with two terminals. Most charter flights from the UK and Ireland use Terminal 1. Baggage claim can take 20-40 minutes on busy summer flights, so don't panic if your driver is waiting — they will track your flight and be ready.
            </p>
            <ol className="space-y-4">
              {[
                { n: 1, title: 'Share your flight number when booking', text: 'This is the most important step. Your driver monitors the flight live and adjusts arrival time automatically if you are delayed.' },
                { n: 2, title: 'Exit through the Arrivals hall', text: 'Once through customs, head to the Arrivals hall. Your MaxiTaxi driver will be waiting with a sign showing your name.' },
                { n: 3, title: 'No need to queue at the taxi rank', text: 'Skip the taxi rank entirely. Your pre-booked vehicle is ready immediately — especially valuable during peak season (July–August) when queues can be 30+ minutes.' },
                { n: 4, title: 'Currency — euros only', text: 'Gran Canaria uses euros. Most transfers can be paid in cash or via card. MaxiTaxi accepts both — confirm when booking.' },
                { n: 5, title: 'Weather in transit', text: 'The airport area can be windy and overcast even when the south coast is sunny. Do not judge the island by the airport — Maspalomas typically has 320+ sunny days per year.' },
              ].map(tip => (
                <li key={tip.n} className="flex gap-4 items-start">
                  <span className="bg-yellow-400 text-gray-900 font-bold rounded-full w-8 h-8 flex items-center justify-center text-sm flex-shrink-0">{tip.n}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{tip.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{tip.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Destinations grid */}
          <section className="mb-14">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">All Destinations — Detailed Transfer Pages</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {destinations.map(d => (
                <a
                  key={d.slug}
                  href={`/en/transfer-${d.slug}/`}
                  className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-yellow-400 hover:bg-yellow-50 transition-all group"
                >
                  <div>
                    <div className="font-semibold text-gray-900 group-hover:text-yellow-700">{d.name}</div>
                    <div className="text-sm text-gray-500">{d.km} km · ~{d.mins} min · from €{d.price}</div>
                  </div>
                  <ArrowRight size={18} className="text-gray-400 group-hover:text-yellow-500" />
                </a>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-14">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    className="w-full text-left px-6 py-4 font-semibold text-gray-900 flex items-center justify-between hover:bg-gray-50 transition-colors"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span>{faq.q}</span>
                    <span className="text-yellow-500 ml-4">{openFaq === i ? '−' : '+'}</span>
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-5 text-gray-700 text-sm leading-relaxed border-t border-gray-100 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gray-900 text-white rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-extrabold mb-3">Ready to Book Your Transfer?</h2>
            <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
              Send us a WhatsApp with your flight number, arrival date and destination. We confirm in minutes — fixed price, no surprises.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={waBooking}
                onClick={() => trackWa('guide-cta')}
                target="_blank" rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-full flex items-center justify-center gap-2 transition-colors text-lg"
              >
                <MessageCircle size={22} /> Book via WhatsApp
              </a>
              <a
                href="tel:+34619735892"
                className="border border-white text-white font-semibold px-8 py-4 rounded-full hover:bg-white hover:text-gray-900 transition-colors flex items-center justify-center gap-2 text-lg"
              >
                <Phone size={20} /> +34 619 735 892
              </a>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-400 text-sm py-10 px-4 mt-12">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between gap-6">
            <div>
              <div className="text-white font-bold text-lg mb-2">MaxiTaxi Gran Canaria</div>
              <p className="max-w-xs">Official airport transfer service in Gran Canaria. 8-seater taxis, fixed prices, 24h.</p>
            </div>
            <div>
              <div className="text-white font-semibold mb-2">Destinations</div>
              <ul className="space-y-1">
                {destinations.map(d => (
                  <li key={d.slug}><a href={`/en/transfer-${d.slug}/`} className="hover:text-white transition-colors">{d.name}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-white font-semibold mb-2">Contact</div>
              <p>WhatsApp: <a href={waBooking} className="hover:text-white" target="_blank" rel="noopener noreferrer">+34 619 735 892</a></p>
              <p className="mt-2"><a href="/" className="hover:text-white">Español</a></p>
            </div>
          </div>
          <div className="max-w-4xl mx-auto mt-8 border-t border-gray-800 pt-6 text-center text-xs">
            © {new Date().getFullYear()} MaxiTaxi Gran Canaria · <a href="/aviso-legal/" className="hover:text-white">Legal Notice</a> · <a href="/politica-privacidad/" className="hover:text-white">Privacy Policy</a>
          </div>
        </footer>
      </div>
    </>
  );
}

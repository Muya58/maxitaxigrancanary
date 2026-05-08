import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Car, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  ChevronRight, 
  Calendar, 
  Phone, 
  Globe, 
  CheckCircle2, 
  Star,
  Users,
  Menu,
  X,
  MessageCircle,
  ArrowRight,
  AlertCircle,
  Map,
  Mail
} from 'lucide-react';

// --- Types ---
interface PriceData {
  totalPrice: string;
  distanceKm: string;
  durationMins: string;
}

interface FormData {
  clientName: string;
  clientPhone: string;
  dateTime: string;
  pickupAddress: string;
  destinationAddress: string;
  clientLanguage: string;
  clientEmail: string;
  clientMunicipality: string;
}

const LANGUAGES = [
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'nl', label: 'Nederlands', flag: '🇳🇱' },
];

export default function App() {
  const [price, setPrice] = useState<PriceData | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<any>(null);

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      clientName: '',
      clientPhone: '',
      dateTime: '',
      pickupAddress: '',
      destinationAddress: '',
      clientLanguage: '',
      clientEmail: '',
      clientMunicipality: '',
    }
  });

  const watchPickup = watch('pickupAddress');
  const watchDestination = watch('destinationAddress');
  const watchDateTime = watch('dateTime');
  const watchMunicipality = watch('clientMunicipality');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Handlers ---
  const calculatePrice = useCallback(async () => {
    if (!watchPickup || !watchDestination || watchPickup.length < 5 || watchDestination.length < 5) {
      setPrice(null);
      return;
    }

    try {
      const response = await fetch('/api/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pickupAddress: watchPickup,
          destinationAddress: watchDestination,
          dateTime: watchDateTime,
          clientMunicipality: watchMunicipality
        })
      });
      const data = await response.json();
      if (data.totalPrice) {
        setPrice({
          totalPrice: data.totalPrice,
          distanceKm: data.distanceKm,
          durationMins: data.durationMins
        });
      }
    } catch (e) {
      console.error("Calculation error", e);
    }
  }, [watchPickup, watchDestination, watchDateTime, watchMunicipality]);

  useEffect(() => {
    calculatePrice();
  }, [watchPickup, watchDestination, watchDateTime, watchMunicipality, calculatePrice]);

  const onFormSubmit = async (data: FormData) => {
    setSubmitting(true);
    setStatus(null);

    const payload = {
      ...data,
      driverPhone: '34619735892',
    };

    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setConfirmedBooking({
          ...data,
          price: price,
          estimatedArrival: new Date(Date.now() + 15 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          trackingId: Math.random().toString(36).substring(7).toUpperCase()
        });
        setStatus({ type: 'success', message: '¡Reserva confirmada! En breve nos pondremos en contacto contigo.' });
        reset();
        setPrice(null);
      } else {
        setStatus({ type: 'error', message: 'No se pudo enviar. Inténtalo de nuevo o contacta por WhatsApp.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Error de conexión. Contacta por WhatsApp directo.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-deep selection:bg-brand/30">
      {/* Search Engine Optimization: JsonLD */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TaxiService",
          "name": "MaxiTaxi Gran Canaria",
          "description": "Líderes en traslados oficiales al aeropuerto de Gran Canaria y transporte VIP para grupos de hasta 8 personas. Servicio 24 horas con seguimiento en tiempo real.",
          "url": "https://www.maxitaxigrancanary.com",
          "logo": "https://www.maxitaxigrancanary.com/logo.png",
          "telephone": "+34619735892",
          "priceRange": "€€",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Aeropuerto de Gran Canaria, Autopista GC-1",
            "addressLocality": "Telde",
            "addressRegion": "Gran Canaria",
            "postalCode": "35230",
            "addressCountry": "ES"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 27.9333,
            "longitude": -15.3833
          },
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday"
            ],
            "opens": "00:00",
            "closes": "23:59"
          },
          "areaServed": [
            {
              "@type": "City",
              "name": "Las Palmas de Gran Canaria"
            },
            {
              "@type": "City",
              "name": "Maspalomas"
            },
            {
              "@type": "City",
              "name": "Mogán"
            },
            {
              "@type": "City",
              "name": "Puerto Rico"
            },
            {
              "@type": "City",
              "name": "Arguineguín"
            }
          ],
          "provider": {
            "@type": "Organization",
            "name": "MaxiTaxi Gran Canaria",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+34619735892",
              "contactType": "customer service",
              "areaServed": "Gran Canaria",
              "availableLanguage": ["Spanish", "English", "German", "Dutch"]
            }
          }
        })}
      </script>

      {/* Navigation */}
      <nav 
        className={`fixed top-0 w-full z-100 transition-all duration-500 ${
          scrolled 
            ? 'bg-bg-deep/90 backdrop-blur-xl py-3 border-b border-white/10 shadow-2xl shadow-brand/5' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <a href="#" className="flex items-center gap-2 group">
              <div className="bg-brand p-2 rounded-lg group-hover:scale-110 transition-transform">
                <Car className="text-white w-6 h-6" />
              </div>
              <span className="font-display font-black text-xl tracking-tighter text-white uppercase italic">
                MaxiTaxi<span className="text-brand">GranCanary</span>
              </span>
            </a>
            
            <div className="hidden md:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              <a href="#servicios" className="hover:text-brand transition-colors">Servicios</a>
              <a href="#destinos" className="hover:text-brand transition-colors">Destinos</a>
              <a href="#opiniones" className="hover:text-brand transition-colors">Opiniones</a>
              <a href="#reserva" className="text-white hover:text-brand transition-colors">Reservar</a>
              <a 
                href="https://wa.me/34619735892" 
                className="bg-brand text-white px-8 py-3 rounded-xl hover:brightness-110 transition-all font-black shadow-lg shadow-brand/20 flex items-center gap-2"
              >
                <MessageCircle size={14} strokeWidth={3} />
                WHATSAPP 24H
              </a>
            </div>

            <button 
              className="md:hidden w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white" 
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-ink/80 backdrop-blur-md z-[150]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed top-0 right-0 h-full w-4/5 max-w-xs bg-bg-deep border-l border-white/10 z-[160] p-8 flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                <div className="bg-brand p-2 rounded-lg">
                  <Car className="text-white w-5 h-5" />
                </div>
                <button onClick={() => setIsMenuOpen(false)} className="text-slate-500">
                  <X size={32} />
                </button>
              </div>

              <div className="flex flex-col gap-8">
                {[
                  { label: 'Servicios', href: '#servicios' },
                  { label: 'Destinos', href: '#destinos' },
                  { label: 'Opiniones', href: '#opiniones' },
                  { label: 'Reservar Ahora', href: '#reserva' },
                ].map((item) => (
                  <a 
                    key={item.href}
                    href={item.href} 
                    onClick={() => setIsMenuOpen(false)}
                    className="text-2xl font-black text-white uppercase italic tracking-tighter hover:text-brand transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </div>

              <div className="mt-auto pt-10 border-t border-white/5">
                <a 
                  href="https://wa.me/34619735892"
                  className="w-full bg-brand text-white py-5 rounded-2xl flex items-center justify-center gap-3 font-black uppercase tracking-widest text-xs"
                >
                  <MessageCircle size={20} strokeWidth={3} />
                  WHATSAPP 24 HORAS
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Split Interface */}
      <main className="lg:flex lg:h-screen lg:pt-20 overflow-hidden">
        {/* Left Side: Hero content */}
        <section className="flex-1 gradient-dark p-8 lg:p-24 flex flex-col justify-center relative border-r border-white/5 pt-32 lg:pt-0 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-3 py-1 bg-brand/10 text-brand text-[10px] font-black uppercase tracking-[0.2em] mb-6 rounded-sm border border-brand/20">
              Gran Canaria Premium Transfers
            </div>
            <h1 className="font-display text-5xl lg:text-7xl font-extrabold text-white leading-none mb-8 tracking-tighter">
              Tu Taxi de confianza <span className="text-brand">24 Horas</span> en la isla.
            </h1>
            <p className="text-lg text-slate-400 mb-12 leading-relaxed max-w-xl font-medium">
              Servicio oficial de traslados al Aeropuerto de Gran Canaria, Maspalomas, Las Palmas y mucho más.
            </p>

            <div className="grid grid-cols-2 gap-y-6 gap-x-8 mb-12">
              {[
                "Sin esperas en Aeropuerto",
                "Vehículos para 8 plazas",
                "Conexión Instantánea 24/7",
                "Conductores Profesionales"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 group">
                  <div className="w-6 h-6 bg-brand rounded-full flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                    <CheckCircle2 size={14} strokeWidth={3} />
                  </div>
                  <span className="text-sm font-semibold text-slate-300">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-8 pt-8 border-t border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10B981]" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Telegram Sync</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10B981]" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Backup Sheets</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Right Side: Form content or Success Summary */}
        <section id="reserva" className="bg-ink w-full lg:w-[500px] xl:w-[600px] overflow-y-auto p-8 lg:p-12 border-l border-white/5">
          <div className="max-w-md mx-auto h-full flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {!confirmedBooking ? (
                <motion.div
                  key="reservation-form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="card-geometric rounded-[2rem] p-8 lg:p-10"
                >
                  <div className="text-center mb-10">
                    <h3 className="font-display text-3xl font-bold text-white mb-2">Reserva Online</h3>
                    <p className="text-slate-500 text-sm font-medium">Calcula y confirma tu trayecto ahora</p>
                  </div>

                  <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex justify-between">
                          Nombre Completo
                          {errors.clientName && <span className="text-brand lowercase italic font-bold">Requerido</span>}
                        </label>
                        <div className="relative group">
                          <input 
                            {...register('clientName', { required: true, minLength: 3 })}
                            type="text"
                            placeholder="Juan Pérez"
                            className={`w-full px-4 py-3 bg-white/5 border ${errors.clientName ? 'border-brand' : 'border-white/10'} rounded-xl focus:ring-1 focus:ring-brand focus:border-brand transition-all outline-none text-white text-sm`}
                          />
                          {errors.clientName && (
                            <AlertCircle className="absolute right-4 top-3 text-brand" size={16} />
                          )}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex justify-between">
                          WhatsApp
                          {errors.clientPhone && <span className="text-brand lowercase italic font-bold">Teléfono no válido</span>}
                        </label>
                        <div className="relative group">
                          <input 
                            {...register('clientPhone', { 
                              required: true, 
                              pattern: /^\+?[0-9\s-]{9,20}$/
                            })}
                            type="tel"
                            placeholder="+34 600 000 000"
                            className={`w-full px-4 py-3 bg-white/5 border ${errors.clientPhone ? 'border-brand' : 'border-white/10'} rounded-xl focus:ring-1 focus:ring-brand focus:border-brand transition-all outline-none text-white text-sm`}
                          />
                          {errors.clientPhone && (
                            <AlertCircle className="absolute right-4 top-3 text-brand" size={16} />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Email field for additional confirmation */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex justify-between">
                        Email de Confirmación
                        {errors.clientEmail && <span className="text-brand lowercase italic font-bold">Email no válido</span>}
                      </label>
                      <div className="relative group">
                        <input 
                          {...register('clientEmail', { 
                            required: true, 
                            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i 
                          })}
                          type="email"

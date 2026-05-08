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
                          placeholder="tu@email.com"
                          className={`w-full px-4 py-3 bg-white/5 border ${errors.clientEmail ? 'border-brand' : 'border-white/10'} rounded-xl focus:ring-1 focus:ring-brand focus:border-brand transition-all outline-none text-white text-sm`}
                        />
                        {errors.clientEmail && (
                          <AlertCircle className="absolute right-4 top-3 text-brand" size={16} />
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex justify-between">
                        Fecha y Hora de Recogida
                        {errors.dateTime && <span className="text-brand lowercase italic font-bold">Selecciona fecha</span>}
                      </label>
                      <div className="relative">
                        <Calendar className={`absolute left-4 top-3 ${errors.dateTime ? 'text-brand' : 'text-brand/50'}`} size={16} />
                        <input 
                          {...register('dateTime', { required: true })}
                          type="datetime-local"
                          className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${errors.dateTime ? 'border-brand' : 'border-white/10'} rounded-xl focus:ring-1 focus:ring-brand focus:border-brand transition-all outline-none text-white text-sm [color-scheme:dark]`}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex justify-between">
                          Origen
                          {errors.pickupAddress && <span className="text-brand lowercase italic font-bold">Dirección corta</span>}
                        </label>
                        <div className="relative">
                          <MapPin className={`absolute left-4 top-3 ${errors.pickupAddress ? 'text-brand' : 'text-brand/50'}`} size={16} />
                          <input 
                            {...register('pickupAddress', { required: true, minLength: 5 })}
                            type="text"
                            placeholder="Aeropuerto / Hotel / Dirección"
                            className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${errors.pickupAddress ? 'border-brand' : 'border-white/10'} rounded-xl focus:ring-1 focus:ring-brand focus:border-brand transition-all outline-none text-white text-sm`}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex justify-between">
                          Destino
                          {errors.destinationAddress && <span className="text-brand lowercase italic font-bold">Destino corto</span>}
                        </label>
                        <div className="relative">
                          <MapPin className={`absolute left-4 top-3 ${errors.destinationAddress ? 'text-brand' : 'text-brand/50'}`} size={16} />
                          <input 
                            {...register('destinationAddress', { 
                              required: true, 
                              minLength: 5
                            })}
                            type="text"
                            placeholder="Hotel / Ciudad"
                            className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${errors.destinationAddress ? 'border-brand' : 'border-white/10'} rounded-xl focus:ring-1 focus:ring-brand focus:border-brand transition-all outline-none text-white text-sm`}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex justify-between">
                          Idioma
                          {errors.clientLanguage && <span className="text-brand lowercase italic font-bold">Requerido</span>}
                        </label>
                        <div className="relative">
                          <Globe className={`absolute left-4 top-3 ${errors.clientLanguage ? 'text-brand' : 'text-brand/50'}`} size={16} />
                          <select 
                            {...register('clientLanguage', { required: true })}
                            className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${errors.clientLanguage ? 'border-brand' : 'border-white/10'} rounded-xl focus:ring-1 focus:ring-brand focus:border-brand transition-all outline-none text-white text-sm appearance-none`}
                          >
                            <option value="">Selecciona</option>
                            {LANGUAGES.map(l => (
                              <option key={l.code} value={l.code} className="bg-ink">{l.flag} {l.label}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Municipio (Opcional)</label>
                        <input 
                          {...register('clientMunicipality')}
                          type="text"
                          placeholder="P. ej. Maspalomas"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-1 focus:ring-brand focus:border-brand transition-all outline-none text-white text-sm"
                        />
                      </div>
                    </div>

                    <AnimatePresence>
                      {price && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="p-6 bg-brand/5 border-2 border-brand/20 border-dashed rounded-[1.5rem] relative overflow-hidden group"
                        >
                          <div className="absolute top-0 right-0 p-3 opacity-20">
                            <Car className="text-brand" size={40} />
                          </div>
                          <div className="flex justify-between items-center relative z-10">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="w-2 h-2 bg-brand rounded-full animate-pulse" />
                                <p className="text-[10px] font-black text-brand uppercase tracking-[0.2em]">Tarificador en Tiempo Real</p>
                              </div>
                              <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-black text-white">{price.totalPrice}</span>
                                <span className="text-xl font-black text-brand">€</span>
                              </div>
                              <p className="text-[9px] text-slate-500 mt-2 uppercase font-bold italic tracking-wide max-w-[180px]">
                                * Precio estimado. Puede variar ligeramente según el tráfico actual.
                              </p>
                            </div>
                            <div className="text-right text-[10px] font-black text-slate-500 uppercase tracking-widest space-y-2">
                              <div className="flex items-center justify-end gap-2 bg-white/5 px-2 py-1 rounded-md"><MapPin size={12} className="text-brand" /> {price.distanceKm} km</div>
                              <div className="flex items-center justify-end gap-2 bg-white/5 px-2 py-1 rounded-md"><Clock size={12} className="text-brand" /> {price.durationMins} min</div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <button 
                      type="submit"
                      disabled={submitting}
                      className="w-full py-4 bg-brand text-white font-black uppercase tracking-widest rounded-xl hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 disabled:transform-none flex items-center justify-center gap-3 group"
                    >
                      {submitting ? 'Enviando...' : 'Confirmar Reserva Ahora'}
                      {!submitting && <ChevronRight size={18} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />}
                    </button>

                    <AnimatePresence>
                      {status && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`p-4 rounded-xl text-xs font-bold text-center uppercase tracking-wider ${
                            status.type === 'success' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'
                          }`}
                        >
                          {status.message}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="booking-success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="card-geometric bg-emerald-500/5 border-emerald-500/20 rounded-[2.5rem] p-8 lg:p-12 text-center"
                >
                  <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-emerald-500/40 -rotate-3">
                    <CheckCircle2 size={32} className="text-white" strokeWidth={3} />
                  </div>
                  
                  <h3 className="font-display text-4xl font-black text-white mb-2 uppercase italic tracking-tighter">
                    ¡Confirmado!
                  </h3>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-10">
                    Tu MaxiTaxi está reservado
                  </p>

                  <div className="space-y-4 mb-10">
                    <div className="bg-white/5 border border-white/5 rounded-2xl p-6 text-left relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-brand/5 rounded-full -mr-10 -mt-10 blur-2xl group-hover:bg-brand/10 transition-all" />
                      
                      <div className="flex justify-between items-start mb-6">
                        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Ticket de Reserva</h4>
                        <span className="text-[8px] font-black text-brand uppercase tracking-widest bg-brand/10 px-2 py-1 rounded">
                          ID: {confirmedBooking.trackingId}
                        </span>
                      </div>
                      
                      <div className="space-y-5 relative z-10">
                        <div className="flex items-start gap-4">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand mt-1.5 shadow-[0_0_8px_rgba(var(--brand),0.5)]" />
                          <div>
                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-0.5">Recogida</p>
                            <p className="text-white text-sm font-bold uppercase tracking-tight">{confirmedBooking.pickupAddress}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-500 mt-1.5" />
                          <div>
                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-0.5">Destino</p>
                            <p className="text-white text-sm font-bold uppercase tracking-tight">{confirmedBooking.destinationAddress}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand/40 mt-1.5" />
                          <div>
                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-0.5">Confirmación enviada a</p>
                            <p className="text-white text-sm font-bold tracking-tight">{confirmedBooking.clientEmail}</p>
                          </div>
                        </div>
                        <div className="pt-5 border-t border-white/5 flex justify-between items-end">
                          <div>
                            <p className="text-[9px] font-black text-slate-500 uppercase mb-1">Precio Total</p>
                            <div className="flex items-baseline gap-0.5 text-white">
                              <span className="text-3xl font-black">{confirmedBooking.price?.totalPrice}</span>
                              <span className="text-lg font-black text-brand">€</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-[9px] font-black text-brand uppercase italic mb-1">Hora Estimada</p>
                            <p className="text-2xl font-black text-white italic tracking-tighter">{confirmedBooking.estimatedArrival}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <a 
                      href={`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(confirmedBooking.pickupAddress)}&destination=${encodeURIComponent(confirmedBooking.destinationAddress)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-5 bg-white/5 border border-white/10 rounded-2xl text-white font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:bg-white/10 active:scale-95 transition-all shadow-xl"
                    >
                      <Map size={18} className="text-brand" strokeWidth={2.5} />
                      Rastrear Trayecto en Google Maps
                    </a>
                    <button 
                      onClick={() => setConfirmedBooking(null)}
                      className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] hover:text-white transition-colors py-2"
                    >
                      [ Nueva Reserva ]
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>

      {/* Services Grid with Geometric Dark style */}
      <section id="servicios" className="py-32 bg-bg-deep border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-block px-3 py-1 bg-brand/5 text-brand text-[10px] font-black uppercase tracking-[0.2em] mb-4 rounded-sm">
            Nuestra Excelencia
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-white mb-20 tracking-tighter">¿Por qué elegir MaxiTaxi?</h2>

          <div className="grid md:grid-cols-3 gap-12 text-left">
            {[
              { icon: Users, title: "Taxi 8 Plazas Gran Canaria", desc: "Vehículos Maxi de gran capacidad. Perfecto para traslados de familias, grupos de amigos y equipaje voluminoso como tablas de surf." },
              { icon: Clock, title: "Transfer Aeropuerto 24h", desc: "Servicio ininterrumpido en el Aeropuerto de Gran Canaria (LPA). Monitorizamos tu vuelo para recogidas puntuales sin esperas." },
              { icon: ShieldCheck, title: "Transporte Oficial Seguro", desc: "Conductores profesionales con licencia oficial y vehículos modernos. Tu seguridad en los traslados es nuestra prioridad." }
            ].map((feature, i) => (
              <div key={i} className="group card-geometric p-10 rounded-[2.5rem] hover:border-brand/40 transition-all duration-500">
                <div className="w-16 h-16 bg-brand/10 text-brand rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-brand group-hover:text-white transition-all rotate-3 group-hover:rotate-0">
                  <feature.icon size={32} />
                </div>
                <h3 className="font-display text-xl font-black text-white mb-4 uppercase tracking-tight">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-loose font-medium">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="opiniones" className="py-32 bg-ink border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-block px-3 py-1 bg-brand/5 text-brand text-[10px] font-black uppercase tracking-[0.2em] mb-4 rounded-sm">
              Opiniones de Clientes
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-white mb-6 tracking-tighter">
              Confianza de 5 Estrellas
            </h2>
            <div className="flex justify-center gap-1 text-brand mb-4">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} size={20} fill="currentColor" />)}
            </div>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] italic">
              Basado en +500 reseñas reales de Google
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Mark Thompson",
                location: "United Kingdom",
                text: "Excellent service! We were a group of 7 with lots of luggage. The 8-seater van was perfect, very clean and the driver was professional. Highly recommended for families.",
                rating: 5
              },
              {
                name: "Carmen Suárez",
                location: "Madrid, España",
                text: "Puntualidad de 10. Reservamos por WhatsApp y nos contestaron al instante. El coche nos esperaba en el aeropuerto con un cartel. Un servicio de taxi impecable en Gran Canaria.",
                rating: 5
              },
              {
                name: "Hans Gerhardt",
                location: "Germany",
                text: "Sehr zuverlässiger Service. Der Fahrer war pünktlich und freundlich. Die Fahrt nach Maspalomas war sehr angenehm. Wir werden diesen Service beim nächsten Mal wieder nutzen.",
                rating: 5
              }
            ].map((review, i) => (
              <div key={i} className="card-geometric p-8 rounded-[2rem] border border-white/5 bg-white/2 hover:border-brand/30 transition-all duration-300">
                <div className="flex gap-1 text-brand mb-6">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-loose mb-8 italic font-medium">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-brand/10 border border-brand/20">
                    <img 
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${review.name}`} 
                      alt={review.name} 
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm tracking-tight">{review.name}</h4>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{review.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Social Proof Badge */}
          <div className="mt-20 flex flex-col items-center">
            <div className="bg-white/5 border border-white/10 rounded-2xl px-8 py-6 flex flex-col md:flex-row items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="bg-brand p-2 rounded-lg">
                  <Star className="text-white" size={24} fill="currentColor" />
                </div>
                <div>
                  <p className="text-white font-black text-xl italic tracking-tighter">4.9 / 5.0</p>
                  <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest">Valoración en Google</p>
                </div>
              </div>
              <div className="h-px w-full md:w-px md:h-12 bg-white/10" />
              <p className="text-slate-400 text-xs font-medium text-center md:text-left max-w-sm">
                Únete a los cientos de viajeros que ya confían en MaxiTaxi para sus traslados en la isla.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Destinos Populares */}
      <section id="destinos" className="py-32 bg-ink border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div className="max-w-xl">
              <div className="inline-block px-3 py-1 bg-brand/5 text-brand text-[10px] font-black uppercase tracking-[0.2em] mb-4 rounded-sm">
                Rutas Frecuentes
              </div>
              <h2 className="font-display text-4xl font-bold text-white mb-4 tracking-tighter">Destinos Principales</h2>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">Transfer directo desde el aeropuerto a las zonas más solicitadas de Gran Canaria con precios cerrados.</p>
            </div>
            <div className="hidden md:flex gap-2">
              <div className="p-3 border border-white/10 rounded-xl cursor-pointer hover:bg-white/5 text-slate-400 transition-all"><ChevronRight className="rotate-180" size={20} /></div>
              <div className="p-3 border border-brand/50 rounded-xl cursor-pointer bg-brand text-ink transition-all hover:brightness-110"><ChevronRight size={20} strokeWidth={3} /></div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { name: "Maspalomas", img: https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&q=80&w=800, alt: "Traslado en taxi a Maspalomas, Gran Canaria - Dunas y Hoteles" },
              { name: "Las Palmas", img: https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&q=80&w=800, alt: "Transfer a Las Palmas de Gran Canaria - Capital y Puerto" },
              { name: "Puerto Rico", img: https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=800, alt: "Taxi a Puerto Rico Gran Canaria - Playa y Ocio" },
              { name: "Meloneras", img: https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800, alt: "Servicio Premium a Meloneras - Hoteles de Lujo" },
              { name: "Arucas", img: https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800, alt: "Transfer a Arucas Gran Canaria - Iglesia y Casco Histórico" },
              { name: "Agaete", img: https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800, alt: "Traslado a Agaete - Puerto de las Nieves" },
              { name: "Mogán", img: https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?auto=format&fit=crop&q=80&w=800, alt: "Taxi a Puerto de Mogán - La Venecia de Canarias" },
            ].map((loc, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative h-[450px] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl transition-all duration-700 bg-slate-900"
              >
                <img 
                  src={loc.img} 
                  alt={loc.alt} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-8 left-8 right-8 translate-y-2 group-hover:translate-y-0 transition-transform">
                  <p className="text-brand text-[10px] font-black uppercase tracking-widest mb-1">Traslado Directo</p>
                  <h4 className="text-white font-display text-2xl font-black mb-3">{loc.name}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300 font-bold">Reserva Online</span>
                    <div className="w-10 h-10 bg-brand/20 rounded-full flex items-center justify-center text-brand border border-brand/20 group-hover:bg-brand group-hover:text-white transition-all">
                      <ArrowRight size={16} strokeWidth={3} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <footer className="bg-bg-deep border-t border-white/5 py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative isolate overflow-hidden card-geometric rounded-[3rem] p-12 lg:p-24 text-center lg:text-left">
            <div className="lg:flex items-center justify-between gap-12">
              <div className="max-w-2xl">
                <h2 className="font-display text-4xl lg:text-6xl font-black text-white mb-8 leading-tight tracking-tighter">¿Necesitas ayuda con tu reserva?</h2>
                <p className="text-slate-400 text-lg font-medium leading-relaxed mb-12">
                  Nuestro equipo de flota está disponible 24h vía WhatsApp para solucionar cualquier duda sobre grupos, equipaje especial o traslados personalizados.
                </p>
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <a href="https://wa.me/34619735892" className="bg-brand text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:brightness-110 transition-all flex items-center gap-3">
                    <MessageCircle size={24} strokeWidth={3} />
                    CONTACTAR WHATSAPP
                  </a>
                  <a href="tel:+34619735892" className="bg-white/5 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-3 border border-white/5">
                    <Phone size={24} />
                    LLAMAR AHORA
                  </a>
                  <a href="mailto:soporte@maxitaxigrancanary.com" className="bg-white/5 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-3 border border-white/5 w-full md:w-auto justify-center">
                    <Mail size={24} />
                    EMAIL SOPORTE
                  </a>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="w-80 h-80 rounded-[4rem] bg-brand/5 border border-brand/10 p-12 flex items-center justify-center rotate-12">
                  <Car className="text-brand w-32 h-32 opacity-20" strokeWidth={1} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-32 pt-16 border-t border-white/5 grid md:grid-cols-4 gap-12 text-[10px] font-black uppercase tracking-widest text-slate-500 italic">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-8 not-italic">
                <div className="bg-brand p-1.5 rounded-lg">
                  <Car className="text-white w-5 h-5" />
                </div>
                <span className="font-display font-black text-xl tracking-tighter text-white uppercase italic">
                  MaxiTaxi<span className="text-brand">GranCanary</span>
                </span>
              </div>
              <p className="text-slate-600 not-italic normal-case font-medium mb-10 max-w-sm">
                Servicio Premium de traslados en Gran Canaria. Flota oficial con licencia y vehículos de gran capacidad.
              </p>
              <div className="flex gap-8">
                 <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-brand rounded-full" />
                  <span className="text-white">AIRPORT EXPERTS</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-brand rounded-full" />
                  <span className="text-white">SURF & SPORT READY</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h5 className="text-white border-l-2 border-brand pl-4">NAVEGACIÓN</h5>
              <ul className="space-y-4">
                <li><a href="#" className="hover:text-brand transition-colors">INICIO</a></li>
                <li><a href="#servicios" className="hover:text-brand transition-colors">SERVICIOS</a></li>
                <li><a href="#destinos" className="hover:text-brand transition-colors">DESTINOS</a></li>
                <li><a href="#reserva" className="hover:text-brand transition-colors">RESERVAR</a></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h5 className="text-white border-l-2 border-brand pl-4">LEGAL</h5>
              <ul className="space-y-4">
                <li><a href="#" className="hover:text-brand transition-colors">AVISO LEGAL</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">PRIVACIDAD</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">TÉRMINOS</a></li>
                <li><a href="#" className="hover:text-brand transition-colors">COOKIES</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-slate-700 text-[9px] font-bold tracking-widest">
              © {new Date().getFullYear()} MAXITAXI GRAN CANARIA. OFFICIAL LICENSED SERVICE.
            </p>
            <div className="flex items-center gap-6 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all">
              <ShieldCheck size={28} className="text-white" />
              <CheckCircle2 size={28} className="text-white" />
              <Globe size={28} className="text-white" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

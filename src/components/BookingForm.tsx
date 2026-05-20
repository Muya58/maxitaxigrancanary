import React, { useState, useEffect, useMemo } from 'react';
import { Translation, Language } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, User, Mail, Phone, MapPin, Calendar, Clock, Users, MessageSquare, Euro } from 'lucide-react';

interface BookingFormProps {
  t: Translation['booking'];
  emailT: Translation['email'];
  lang: Language;
}

export default function BookingForm({ t, emailT, lang }: BookingFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [passengers, setPassengers] = useState('1');
  const [specialRequests, setSpecialRequests] = useState('');

  // Load from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('booking_draft');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        if (data.name) setName(data.name);
        if (data.phone) setPhone(data.phone);
        if (data.email) setEmail(data.email);
        if (data.pickup) setPickup(data.pickup);
        if (data.destination) setDestination(data.destination);
        if (data.date) setDate(data.date);
        if (data.time) setTime(data.time);
        if (data.passengers) setPassengers(data.passengers);
        if (data.specialRequests) setSpecialRequests(data.specialRequests);
      } catch (e) {
        console.error('Error loading saved draft', e);
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    const draft = { name, phone, email, pickup, destination, date, time, passengers, specialRequests };
    localStorage.setItem('booking_draft', JSON.stringify(draft));
  }, [name, phone, email, pickup, destination, date, time, passengers, specialRequests]);

  const estimation = useMemo(() => {
    if (!pickup || !destination) return null;

    // Heuristic distance (km) - using string length as proxy
    const distanceKm = 10 + (pickup.length + destination.length) * 0.5;
    
    // Price Calc
    let basePrice = 25;
    let totalPrice = basePrice + (distanceKm * 1.5);

    // Night multiplier (22:00 - 06:00)
    if (time) {
      const hour = parseInt(time.split(':')[0]);
      if (hour >= 22 || hour < 6) {
        totalPrice *= 1.25;
      }
    }

    // Weekend multiplier
    if (date) {
      const day = new Date(date).getDay();
      if (day === 0 || day === 6) { // Sunday or Saturday
        totalPrice *= 1.15;
      }
    }

    // Large group multiplier (more than 4 passengers)
    const pCount = parseInt(passengers);
    if (pCount > 4) {
      totalPrice *= 1.3; // 8-seater premium
    }

    // Time Calc (approx 60 km/h average on island roads)
    const travelTimeMinutes = Math.round((distanceKm / 60) * 60 + 5); // +5 min buffer

    return {
      price: Math.round(totalPrice),
      time: travelTimeMinutes
    };
  }, [pickup, destination, date, time, passengers]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    // Add estimation to data
    const finalData = {
      ...data,
      estimatedPrice: estimation ? `${estimation.price}€` : 'N/A',
      estimatedTime: estimation ? `${estimation.time} min` : 'N/A'
    };

    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData: finalData,
          translations: emailT,
          lang
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to send booking');
      }

      const result = await response.json();
      
      if (!result.emailSent && result.isSandboxIssue) {
        setError('Reserva recibida, pero no pudimos enviarte el correo de confirmación (Email en modo prueba). Descuida, nos pondremos en contacto contigo por teléfono/WhatsApp.');
      } else if (!result.emailSent && result.emailError) {
        setError('Reserva recibida, pero hubo un problema enviando el correo de confirmación. Nos pondremos en contacto contigo pronto.');
      }

      setIsSubmitted(true);
      localStorage.removeItem('booking_draft');
      setName('');
      setPhone('');
      setEmail('');
      setPickup('');
      setDestination('');
      setDate('');
      setTime('');
      setPassengers('1');
      setSpecialRequests('');
    } catch (err) {
      console.error('Booking Error:', err);
      setError('Hubo un error al enviar la reserva. Por favor, inténtalo de nuevo o contáctanos por WhatsApp.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="booking" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {t.title}
            </h2>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-lg">
              Reserva tu taxi de forma rápida y segura. Una vez enviado el formulario, recibirás un correo de confirmación y nos pondremos en contacto contigo para confirmar los detalles.
            </p>
            
            <div className="space-y-6">
              {estimation && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 bg-yellow-500 text-white rounded-[2rem] shadow-xl shadow-yellow-500/20 border-4 border-yellow-400"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-yellow-100 font-medium mb-1 uppercase text-xs tracking-wider">{t.estimatedPrice}</p>
                      <h3 className="text-5xl font-black">~{estimation.price}€</h3>
                    </div>
                    <div className="text-right flex-1 border-l border-yellow-400/50 pl-4">
                      <p className="text-yellow-100 font-medium mb-1 uppercase text-xs tracking-wider">{t.estimatedTime}</p>
                      <h3 className="text-3xl font-bold">~{estimation.time} min</h3>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-yellow-100 italic">
                    * El precio final puede variar según el tráfico y extras.
                  </p>
                </motion.div>
              )}

              <div className="flex items-start gap-4 p-6 bg-yellow-50 rounded-3xl border border-yellow-100">
                <div className="p-3 bg-yellow-500 text-white rounded-2xl">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Atención 24/7</h4>
                  <p className="text-gray-600">Llámanos o escríbenos por WhatsApp en cualquier momento.</p>
                  <a href="tel:+34619735892" className="text-yellow-600 font-bold mt-2 block hover:underline">+34 619 735 892</a>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-6 bg-blue-50 rounded-3xl border border-blue-100">
                <div className="p-3 bg-blue-500 text-white rounded-2xl">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Confirmación Inmediata</h4>
                  <p className="text-gray-600">Recibe una respuesta rápida a tu solicitud de reserva.</p>
                  <a href="mailto:soporte@maxitaxigrancanary.com" className="text-blue-600 font-bold mt-2 block hover:underline">soporte@maxitaxigrancanary.com</a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gray-50 p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-gray-200 border border-gray-100 relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        <User className="h-4 w-4 text-yellow-500" />
                        {t.name}
                      </label>
                      <input 
                        required 
                        name="name"
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-5 py-4 rounded-2xl bg-white border border-gray-200 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/10 transition-all outline-none"
                        placeholder="Juan Pérez"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        <Phone className="h-4 w-4 text-yellow-500" />
                        {t.phone}
                      </label>
                      <input 
                        required 
                        name="phone"
                        type="tel" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-5 py-4 rounded-2xl bg-white border border-gray-200 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/10 transition-all outline-none"
                        placeholder="+34 600 000 000"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <Mail className="h-4 w-4 text-yellow-500" />
                      {t.email}
                    </label>
                    <input 
                      required 
                      name="email"
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-5 py-4 rounded-2xl bg-white border border-gray-200 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/10 transition-all outline-none"
                      placeholder="juan@ejemplo.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-yellow-500" />
                      {t.pickup}
                    </label>
                    <input 
                      required 
                      name="pickup"
                      type="text" 
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      className="w-full px-5 py-4 rounded-2xl bg-white border border-gray-200 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/10 transition-all outline-none"
                      placeholder="Aeropuerto de Gran Canaria, Hotel, etc."
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-yellow-500" />
                      {t.destination}
                    </label>
                    <input 
                      required 
                      name="destination"
                      type="text" 
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full px-5 py-4 rounded-2xl bg-white border border-gray-200 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/10 transition-all outline-none"
                      placeholder="Maspalomas, Las Palmas, etc."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-yellow-500" />
                        {t.date}
                      </label>
                      <input 
                        required 
                        name="date"
                        type="date" 
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-5 py-4 rounded-2xl bg-white border border-gray-200 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/10 transition-all outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        <Clock className="h-4 w-4 text-yellow-500" />
                        {t.time}
                      </label>
                      <input 
                        required 
                        name="time"
                        type="time" 
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full px-5 py-4 rounded-2xl bg-white border border-gray-200 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/10 transition-all outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        <Users className="h-4 w-4 text-yellow-500" />
                        {t.passengers}
                      </label>
                      <select 
                        name="passengers" 
                        value={passengers}
                        onChange={(e) => setPassengers(e.target.value)}
                        className="w-full px-5 py-4 rounded-2xl bg-white border border-gray-200 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/10 transition-all outline-none appearance-none"
                      >
                        {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-yellow-500" />
                      {t.specialRequests}
                    </label>
                    <textarea 
                      name="specialRequests"
                      rows={3}
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      className="w-full px-5 py-4 rounded-2xl bg-white border border-gray-200 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/10 transition-all outline-none resize-none"
                      placeholder={t.specialRequests}
                    />
                  </div>

                  {error && (
                    <p className="text-red-500 text-sm font-medium">{error}</p>
                  )}

                  {estimation && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-5 bg-yellow-50 border-2 border-yellow-400 rounded-2xl flex flex-col gap-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Euro className="h-6 w-6 text-yellow-600" />
                          <span className="font-bold text-gray-900">{t.estimatedPrice}:</span>
                        </div>
                        <span className="text-3xl font-black text-yellow-600">~{estimation.price}€</span>
                      </div>
                      <div className="flex items-center justify-between border-t border-yellow-100 pt-3">
                        <div className="flex items-center gap-3">
                          <Clock className="h-6 w-6 text-yellow-600" />
                          <span className="font-bold text-gray-900">{t.estimatedTime}:</span>
                        </div>
                        <span className="text-xl font-bold text-gray-700">~{estimation.time} min</span>
                      </div>
                    </motion.div>
                  )}

                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isLoading}
                    type="submit" 
                    className="w-full bg-yellow-500 text-white py-5 rounded-2xl text-lg font-bold shadow-xl shadow-yellow-500/20 hover:bg-yellow-600 transition-all flex items-center justify-center gap-3 disabled:opacity-70"
                  >
                    {isLoading ? (
                      <div className="h-6 w-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        {t.submit}
                        <Send className="h-5 w-5" />
                      </>
                    )}
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="mb-6 inline-flex p-6 bg-green-100 text-green-600 rounded-full">
                    <CheckCircle2 className="h-16 w-16" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">¡Gracias!</h3>
                  <p className="text-lg text-gray-600 leading-relaxed mb-4">
                    {t.success}
                  </p>
                  {error && (
                    <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-xl text-sm mb-6 max-w-sm mx-auto">
                      <strong>Nota:</strong> {error}
                    </div>
                  )}
                  <button 
                    onClick={() => {
                      setIsSubmitted(false);
                      setError(null);
                    }}
                    className="mt-8 text-yellow-600 font-bold hover:underline"
                  >
                    Enviar otra reserva
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Language } from './types';
import { translations } from './i18n';
import SEO from './components/SEO';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Locations from './components/Locations';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';
import { MessageCircle, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [lang, setLang] = useState<Language>('es');
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    const timer = setTimeout(() => setShowWhatsApp(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-yellow-100 selection:text-yellow-900">
      <SEO lang={lang} />
      
      <Header lang={lang} setLang={setLang} t={t.nav} />
      
      <main>
        <Hero t={t.hero} />
        <Services t={t.services} />
        <Locations t={t.locations} />
        <BookingForm t={t.booking} emailT={t.email} lang={lang} />
      </main>

      <Footer lang={lang} />

      {/* Floating Buttons */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
        <AnimatePresence>
          {showWhatsApp && (
            <motion.a
              initial={{ opacity: 0, scale: 0.5, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.5, x: 20 }}
              href="https://t.me/Maxitaxigrancanaria"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0088cc] text-white p-4 rounded-full shadow-2xl shadow-[#0088cc]/40 hover:bg-[#0077b3] transition-all group relative flex items-center justify-center"
            >
              <Send className="h-8 w-8 ml-1" />
              <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-gray-900 px-4 py-2 rounded-xl text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-gray-100">
                {lang === 'es' ? 'Telegram' : 'Telegram'}
              </span>
            </motion.a>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showWhatsApp && (
            <motion.a
              initial={{ opacity: 0, scale: 0.5, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.5, x: 20 }}
              href="https://wa.me/34619735892"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white p-4 rounded-full shadow-2xl shadow-green-500/40 hover:bg-green-600 transition-all group relative flex items-center justify-center"
            >
              <MessageCircle className="h-8 w-8" />
              <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-gray-900 px-4 py-2 rounded-xl text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-gray-100">
                {lang === 'es' ? '¿Necesitas ayuda?' : 'Need help?'}
              </span>
            </motion.a>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}


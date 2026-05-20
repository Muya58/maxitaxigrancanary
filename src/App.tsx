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
import { MessageCircle } from 'lucide-react';
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

      {/* WhatsApp Floating Button */}
      <AnimatePresence>
        {showWhatsApp && (
          <motion.a
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            href="https://wa.me/34619735892"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-8 right-8 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl shadow-green-500/40 hover:bg-green-600 transition-all group"
          >
            <MessageCircle className="h-8 w-8" />
            <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-gray-900 px-4 py-2 rounded-xl text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-gray-100">
              {lang === 'es' ? '¿Necesitas ayuda?' : 'Need help?'}
            </span>
          </motion.a>
        )}
      </AnimatePresence>
    </div>
  );
}


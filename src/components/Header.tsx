import { Language, Translation } from '../types';
import { Car, Globe } from 'lucide-react';
import { motion } from 'motion/react';

interface HeaderProps {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translation['nav'];
}

export default function Header({ lang, setLang, t }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <Car className="h-8 w-8 text-yellow-500" />
            <span className="font-bold text-xl tracking-tight text-gray-900">MaxiTaxiGran<span className="text-yellow-500">Canary</span></span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-sm font-medium text-gray-600 hover:text-yellow-500 transition-colors">{t.home}</a>
            <a href="#services" className="text-sm font-medium text-gray-600 hover:text-yellow-500 transition-colors">{t.services}</a>
            <a href="#booking" className="text-sm font-medium text-gray-600 hover:text-yellow-500 transition-colors">{t.booking}</a>
            <a href="#contact" className="text-sm font-medium text-gray-600 hover:text-yellow-500 transition-colors">{t.contact}</a>
          </nav>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <button className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-yellow-500 transition-colors py-2">
                <Globe className="h-4 w-4" />
                {lang.toUpperCase()}
              </button>
              <div className="absolute right-0 top-full mt-1 bg-white border border-gray-100 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all min-w-[120px] overflow-hidden">
                {(['es', 'en', 'de', 'nl'] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-yellow-50 transition-colors ${lang === l ? 'text-yellow-600 font-bold' : 'text-gray-600'}`}
                  >
                    {l === 'es' ? 'Español' : l === 'en' ? 'English' : l === 'de' ? 'Deutsch' : 'Nederlands'}
                  </button>
                ))}
              </div>
            </div>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#booking" 
              className="bg-yellow-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg shadow-yellow-500/20 hover:bg-yellow-600 transition-colors"
            >
              {t.booking}
            </motion.a>
          </div>
        </div>
      </div>
    </header>
  );
}

import { Translation } from '../types';
import { motion } from 'motion/react';
import { ArrowRight, Plane, Users, Accessibility, Bike } from 'lucide-react';

interface HeroProps {
  t: Translation['hero'];
}

export default function Hero({ t }: HeroProps) {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/api/attachments/1" 
          alt="MaxiTaxiGran Canary at Airport" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-white/10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
            {t.title}
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto mb-10 leading-relaxed">
            {t.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#booking" 
              className="bg-yellow-500 text-white px-8 py-4 rounded-full text-lg font-bold shadow-xl shadow-yellow-500/30 hover:bg-yellow-600 transition-all flex items-center gap-2"
            >
              {t.cta}
              <ArrowRight className="h-5 w-5" />
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#services" 
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-white/20 transition-all"
            >
              Ver Servicios
            </motion.a>
          </div>

          {/* Quick Stats/Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 bg-white/10 rounded-full backdrop-blur-md">
                <Plane className="h-6 w-6 text-yellow-500" />
              </div>
              <span className="text-sm font-medium">LPA Airport</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 bg-white/10 rounded-full backdrop-blur-md">
                <Users className="h-6 w-6 text-yellow-500" />
              </div>
              <span className="text-sm font-medium">8 Seaters</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 bg-white/10 rounded-full backdrop-blur-md">
                <Accessibility className="h-6 w-6 text-yellow-500" />
              </div>
              <span className="text-sm font-medium">PMR Adapted</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 bg-white/10 rounded-full backdrop-blur-md">
                <Bike className="h-6 w-6 text-yellow-500" />
              </div>
              <span className="text-sm font-medium">Bike Transport</span>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white/50"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}

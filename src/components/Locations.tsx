import { Translation } from '../types';
import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';

interface LocationsProps {
  t: Translation['locations'];
}

export default function Locations({ t }: LocationsProps) {
  return (
    <section className="py-24 bg-yellow-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            {t.title}
          </motion.h2>
          <p className="text-lg text-yellow-100 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {t.list.map((location, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 hover:bg-white/20 transition-colors"
            >
              <MapPin className="h-5 w-5 text-yellow-200 shrink-0" />
              <span className="font-bold text-sm md:text-base">{location}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

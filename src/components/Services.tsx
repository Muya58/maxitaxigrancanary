import { Translation } from '../types';
import { motion } from 'motion/react';
import { Plane, Users, Accessibility, Bike } from 'lucide-react';

interface ServicesProps {
  t: Translation['services'];
}

export default function Services({ t }: ServicesProps) {
  const services = [
    {
      icon: <Plane className="h-10 w-10 text-yellow-500" />,
      title: t.airport.title,
      desc: t.airport.desc,
      image: "/api/attachments/1"
    },
    {
      icon: <Users className="h-10 w-10 text-yellow-500" />,
      title: t.maxi.title,
      desc: t.maxi.desc,
      image: "/api/attachments/4"
    },
    {
      icon: <Accessibility className="h-10 w-10 text-yellow-500" />,
      title: t.pmr.title,
      desc: t.pmr.desc,
      image: "/api/attachments/4"
    },
    {
      icon: <Bike className="h-10 w-10 text-yellow-500" />,
      title: t.bikes.title,
      desc: t.bikes.desc,
      image: "/api/attachments/3"
    }
  ];

  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            {t.title}
          </motion.h2>
          <div className="w-20 h-1.5 bg-yellow-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-yellow-500/10 transition-all group"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8">
                <div className="mb-4 p-3 bg-yellow-50 rounded-2xl w-fit">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

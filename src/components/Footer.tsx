import { Language } from '../types';
import { Car, Instagram, Facebook, Phone, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  lang: Language;
}

export default function Footer({ lang }: FooterProps) {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Car className="h-8 w-8 text-yellow-500" />
              <span className="font-bold text-2xl tracking-tight">MaxiTaxiGran<span className="text-yellow-500">Canary</span></span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              {lang === 'es' 
                ? 'Tu socio de confianza para traslados privados en Gran Canaria. Calidad, puntualidad y el mejor servicio garantizado.'
                : 'Your trusted partner for private transfers in Gran Canaria. Quality, punctuality and the best service guaranteed.'}
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-3 bg-white/5 rounded-2xl hover:bg-yellow-500 transition-colors group">
                <Instagram className="h-5 w-5 text-gray-400 group-hover:text-white" />
              </a>
              <a href="#" className="p-3 bg-white/5 rounded-2xl hover:bg-yellow-500 transition-colors group">
                <Facebook className="h-5 w-5 text-gray-400 group-hover:text-white" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8">{lang === 'es' ? 'Enlaces Rápidos' : 'Quick Links'}</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#home" className="hover:text-yellow-500 transition-colors">{lang === 'es' ? 'Inicio' : 'Home'}</a></li>
              <li><a href="#services" className="hover:text-yellow-500 transition-colors">{lang === 'es' ? 'Servicios' : 'Services'}</a></li>
              <li><a href="#booking" className="hover:text-yellow-500 transition-colors">{lang === 'es' ? 'Reservar' : 'Book Now'}</a></li>
              <li><a href="#" className="hover:text-yellow-500 transition-colors">{lang === 'es' ? 'Aviso Legal' : 'Legal Notice'}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8">{lang === 'es' ? 'Contacto' : 'Contact'}</h4>
            <ul className="space-y-6 text-gray-400">
              <li className="flex items-start gap-4">
                <Phone className="h-5 w-5 text-yellow-500 shrink-0" />
                <a href="tel:+34619735892" className="hover:text-yellow-500 transition-colors">+34 619 735 892</a>
              </li>
              <li className="flex items-start gap-4">
                <Mail className="h-5 w-5 text-yellow-500 shrink-0" />
                <a href="mailto:soporte@maxitaxigrancanary.com" className="hover:text-yellow-500 transition-colors">soporte@maxitaxigrancanary.com</a>
              </li>
              <li className="flex items-start gap-4">
                <MapPin className="h-5 w-5 text-yellow-500 shrink-0" />
                <span>Gran Canaria, España</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8">{lang === 'es' ? 'Newsletter' : 'Newsletter'}</h4>
            <p className="text-gray-400 mb-6">
              {lang === 'es' ? 'Suscríbete para recibir ofertas y noticias.' : 'Subscribe to receive offers and news.'}
            </p>
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email" 
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 w-full focus:outline-none focus:border-yellow-500 transition-colors"
              />
              <button className="bg-yellow-500 text-white px-4 py-3 rounded-xl font-bold hover:bg-yellow-600 transition-colors">
                OK
              </button>
            </form>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 text-center text-gray-500 text-sm">
          <p>© {currentYear} MaxiTaxiGran Canary. {lang === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}</p>
        </div>
      </div>
    </footer>
  );
}

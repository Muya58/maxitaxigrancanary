export type Language = 'es' | 'en' | 'de' | 'nl';

export interface Translation {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  services: {
    title: string;
    airport: {
      title: string;
      desc: string;
    };
    maxi: {
      title: string;
      desc: string;
    };
    pmr: {
      title: string;
      desc: string;
    };
    bikes: {
      title: string;
      desc: string;
    };
  };
  booking: {
    title: string;
    name: string;
    email: string;
    phone: string;
    pickup: string;
    destination: string;
    date: string;
    time: string;
    passengers: string;
    specialRequests: string;
    estimatedPrice: string;
    estimatedTime: string;
    message: string;
    submit: string;
    success: string;
  };
  nav: {
    home: string;
    services: string;
    booking: string;
    contact: string;
  };
  locations: {
    title: string;
    subtitle: string;
    list: string[];
  };
  email: {
    subject: string;
    greeting: string;
    intro: string;
    details: string;
    specialRequests: string;
    estimatedPrice: string;
    estimatedTime: string;
    footer: string;
  };
}

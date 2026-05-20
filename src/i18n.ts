import { Translation } from './types';

export const translations: Record<'es' | 'en' | 'de' | 'nl', Translation> = {
  es: {
    hero: {
      title: "Taxi y Traslados Privados en Gran Canaria",
      subtitle: "Reserva tu traslado al aeropuerto, vehículos de 8 plazas, PMR y transporte de bicicletas. ¡Calcula tu tarifa 24/7!",
      cta: "Reserva tu Traslado"
    },
    services: {
      title: "Nuestros Servicios",
      airport: {
        title: "Traslados al Aeropuerto",
        desc: "Servicio puntual 24/7 desde y hacia el Aeropuerto de Gran Canaria (LPA)."
      },
      maxi: {
        title: "Vehículos de 8 Plazas",
        desc: "Ideal para grupos grandes y familias. Viaja cómodo con todo tu equipaje."
      },
      pmr: {
        title: "Accesibilidad PMR",
        desc: "Vehículos adaptados para personas con movilidad reducida."
      },
      bikes: {
        title: "Transporte de Bicicletas",
        desc: "Equipamiento especial para ciclistas. Llevamos tus bicis de forma segura."
      }
    },
    booking: {
      title: "Reserva tu Taxi",
      name: "Nombre Completo",
      email: "Correo Electrónico",
      phone: "Teléfono",
      pickup: "Punto de Recogida",
      destination: "Destino",
      date: "Fecha",
      time: "Hora",
      passengers: "Pasajeros",
      specialRequests: "Peticiones Especiales (ej. sillita de bebé)",
      estimatedPrice: "Precio Estimado",
      estimatedTime: "Tiempo Estimado",
      message: "Mensaje Adicional",
      submit: "Enviar Reserva",
      success: "¡Reserva enviada con éxito! Nos pondremos en contacto contigo pronto."
    },
    nav: {
      home: "Inicio",
      services: "Servicios",
      booking: "Reservar",
      contact: "Contacto"
    },
    locations: {
      title: "Zonas de Servicio",
      subtitle: "Operamos en toda la isla, incluyendo:",
      list: ["Santa Lucía", "Agüimes", "Arguineguín", "Puerto Rico", "Taurito", "Mogán", "Las Palmas de Gran Canaria", "Agaete", "Galdar"]
    },
    email: {
      subject: "Confirmación de Reserva - MaxiTaxiGran Canary",
      greeting: "Hola",
      intro: "Hemos recibido tu solicitud de reserva. Aquí tienes los detalles:",
      details: "Detalles de la Reserva",
      specialRequests: "Peticiones Especiales",
      estimatedPrice: "Precio Estimado",
      estimatedTime: "Tiempo Estimado",
      footer: "Nos pondremos en contacto contigo pronto para confirmar la disponibilidad. ¡Gracias por elegir MaxiTaxiGran Canary!"
    }
  },
  en: {
    hero: {
      title: "Taxi and Private Transfers in Gran Canaria",
      subtitle: "Book your airport transfer, 8-seater vehicles, PMR and bicycle transport. Calculate your fare 24/7!",
      cta: "Book your Transfer"
    },
    services: {
      title: "Our Services",
      airport: {
        title: "Airport Transfers",
        desc: "Punctual 24/7 service to and from Gran Canaria Airport (LPA)."
      },
      maxi: {
        title: "8-Seater Vehicles",
        desc: "Ideal for large groups and families. Travel comfortably with all your luggage."
      },
      pmr: {
        title: "PMR Accessibility",
        desc: "Adapted vehicles for people with reduced mobility."
      },
      bikes: {
        title: "Bicycle Transport",
        desc: "Special equipment for cyclists. We carry your bikes safely."
      }
    },
    booking: {
      title: "Book your Taxi",
      name: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      pickup: "Pickup Point",
      destination: "Destination",
      date: "Date",
      time: "Time",
      passengers: "Passengers",
      specialRequests: "Special Requests (e.g. baby seats)",
      estimatedPrice: "Estimated Price",
      estimatedTime: "Estimated Time",
      message: "Additional Message",
      submit: "Send Booking",
      success: "Booking sent successfully! We will contact you soon."
    },
    nav: {
      home: "Home",
      services: "Services",
      booking: "Book",
      contact: "Contact"
    },
    locations: {
      title: "Service Areas",
      subtitle: "We operate across the entire island, including:",
      list: ["Santa Lucía", "Agüimes", "Arguineguín", "Puerto Rico", "Taurito", "Mogán", "Las Palmas de Gran Canaria", "Agaete", "Galdar"]
    },
    email: {
      subject: "Booking Confirmation - MaxiTaxiGran Canary",
      greeting: "Hello",
      intro: "We have received your booking request. Here are the details:",
      details: "Booking Details",
      specialRequests: "Special Requests",
      estimatedPrice: "Estimated Price",
      estimatedTime: "Estimated Time",
      footer: "We will contact you soon to confirm availability. Thank you for choosing MaxiTaxiGran Canary!"
    }
  },
  de: {
    hero: {
      title: "Taxi und private Transfers auf Gran Canaria",
      subtitle: "Buchen Sie Ihren Flughafentransfer, 8-Sitzer-Fahrzeuge, PMR und Fahrradtransport. Berechnen Sie Ihren Tarif 24/7!",
      cta: "Transfer buchen"
    },
    services: {
      title: "Unsere Dienstleistungen",
      airport: {
        title: "Flughafentransfers",
        desc: "Pünktlicher 24/7-Service zum und vom Flughafen Gran Canaria (LPA)."
      },
      maxi: {
        title: "8-Sitzer-Fahrzeuge",
        desc: "Ideal für große Gruppen und Familien. Reisen Sie bequem mit all Ihrem Gepäck."
      },
      pmr: {
        title: "PMR-Barrierefreiheit",
        desc: "Angepasste Fahrzeuge für Personen mit eingeschränkter Mobilität."
      },
      bikes: {
        title: "Fahrradtransport",
        desc: "Spezielle Ausrüstung für Radfahrer. Wir transportieren Ihre Fahrräder sicher."
      }
    },
    booking: {
      title: "Taxi buchen",
      name: "Vollständiger Name",
      email: "E-Mail-Adresse",
      phone: "Telefonnummer",
      pickup: "Abholort",
      destination: "Zielort",
      date: "Datum",
      time: "Uhrzeit",
      passengers: "Passagiere",
      specialRequests: "Besondere Wünsche (z.B. Kindersitze)",
      estimatedPrice: "Geschätzter Preis",
      estimatedTime: "Geschätzte Zeit",
      message: "Zusätzliche Nachricht",
      submit: "Buchung senden",
      success: "Buchung erfolgreich gesendet! Wir werden Sie bald kontaktieren."
    },
    nav: {
      home: "Startseite",
      services: "Dienstleistungen",
      booking: "Buchen",
      contact: "Kontakt"
    },
    locations: {
      title: "Servicegebiete",
      subtitle: "Wir sind auf der ganzen Insel tätig, einschließlich:",
      list: ["Santa Lucía", "Agüimes", "Arguineguín", "Puerto Rico", "Taurito", "Mogán", "Las Palmas de Gran Canaria", "Agaete", "Galdar"]
    },
    email: {
      subject: "Buchungsbestätigung - MaxiTaxiGran Canary",
      greeting: "Hallo",
      intro: "Wir haben Ihre Buchungsanfrage erhalten. Hier sind die Details:",
      details: "Buchungsdetails",
      specialRequests: "Besondere Wünsche",
      estimatedPrice: "Geschätzter Preis",
      estimatedTime: "Geschätzte Zeit",
      footer: "Wir werden Sie bald kontaktieren, um die Verfügbarkeit zu bestätigen. Vielen Dank, dass Sie sich für MaxiTaxiGran Canary entschieden haben!"
    }
  },
  nl: {
    hero: {
      title: "Taxi en privotransfers op Gran Canaria",
      subtitle: "Boek uw luchthaventransfer, 8-persoons voertuigen, PMR en fietstransport. Bereken uw tarief 24/7!",
      cta: "Boek uw transfer"
    },
    services: {
      title: "Onze diensten",
      airport: {
        title: "Luchthaventransfers",
        desc: "Stipt 24/7 service van en naar de luchthaven van Gran Canaria (LPA)."
      },
      maxi: {
        title: "8-persoons voertuigen",
        desc: "Ideaal voor grote groepen en gezinnen. Reis comfortabel met al uw bagage."
      },
      pmr: {
        title: "PMR-toegankelijkheid",
        desc: "Aangepaste voertuigen voor personen met beperkte mobiliteit."
      },
      bikes: {
        title: "Fietstransport",
        desc: "Speciale uitrusting voor fietsers. Wij vervoeren uw fietsen veilig."
      }
    },
    booking: {
      title: "Taxi boeken",
      name: "Volledige naam",
      email: "E-mailadres",
      phone: "Telefoonnummer",
      pickup: "Ophaalpunt",
      destination: "Bestemming",
      date: "Datum",
      time: "Tijd",
      passengers: "Passagiers",
      specialRequests: "Speciale verzoeken (bijv. kinderzitjes)",
      estimatedPrice: "Geschatte prijs",
      estimatedTime: "Geschatte tijd",
      message: "Extra bericht",
      submit: "Boeking verzenden",
      success: "Boeking succesvol verzonden! We nemen snel contact met u op."
    },
    nav: {
      home: "Home",
      services: "Diensten",
      booking: "Boeken",
      contact: "Contact"
    },
    locations: {
      title: "Servicegebieden",
      subtitle: "Wij zijn actief over het hele eiland, inclusief:",
      list: ["Santa Lucía", "Agüimes", "Arguineguín", "Puerto Rico", "Taurito", "Mogán", "Las Palmas de Gran Canaria", "Agaete", "Galdar"]
    },
    email: {
      subject: "Boekingsbevestiging - MaxiTaxiGran Canary",
      greeting: "Hallo",
      intro: "We hebben uw boekingsaanvraag ontvangen. Hier zijn de details:",
      details: "Boekingsgegevens",
      specialRequests: "Speciale verzoeken",
      estimatedPrice: "Geschatte prijs",
      estimatedTime: "Geschatte tijd",
      footer: "We nemen snel contact met u op om de beschikbaarheid te bevestigen. Bedankt voor het kiezen van MaxiTaxiGran Canary!"
    }
  }
};

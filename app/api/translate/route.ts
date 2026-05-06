// Simple translation dictionary for common phrases (fallback when backend is unavailable)
const translations: Record<string, Record<string, string>> = {
  en: {
    'Eventos y Actividades': 'Events and Activities',
    'Descubre los próximos eventos y actividades organizadas por BAUSEN. Conecta con nuestra comunidad y participa en experiencias únicas diseñadas para inspirar y conectar.': 'Discover upcoming events and activities organized by BAUSEN. Connect with our community and participate in unique experiences designed to inspire and connect.',
    'Fecha y Hora': 'Date and Time',
    'Horario por confirmar': 'Schedule to be confirmed',
    'Ubicación': 'Location',
    'Ver en mapa': 'View on map',
    'Información Importante': 'Important Information',
    'Registro requerido con anticipación': 'Pre-registration required',
    'Llegar 15 minutos antes del inicio': 'Arrive 15 minutes before start',
    'Aforo limitado - Reserva tu lugar': 'Limited capacity - Reserve your spot',
    'Registrarme': 'Register',
    'Compartir Evento': 'Share Event',
    'Lo que hacemos': 'What we do',
    'Nuestros Servicios': 'Our Services',
    'Soluciones integrales diseñadas para optimizar cada aspecto de tu organización': 'Comprehensive solutions designed to optimize every aspect of your organization',
    'Conocer más': 'Learn more',
    'Inicio': 'Home',
    'Servicios': 'Services',
    'Nosotros': 'About Us',
    'Contacto': 'Contact',
    'Noticias': 'News',
    'Eventos': 'Events',
  },
  pt: {
    'Eventos y Actividades': 'Eventos e Atividades',
    'Descubre los próximos eventos y actividades organizadas por BAUSEN. Conecta con nuestra comunidad y participa en experiencias únicas diseñadas para inspirar y conectar.': 'Descubra os próximos eventos e atividades organizados pela BAUSEN. Conecte-se com nossa comunidade e participe de experiências únicas projetadas para inspirar e conectar.',
    'Fecha y Hora': 'Data e Hora',
    'Horario por confirmar': 'Horário a confirmar',
    'Ubicación': 'Localização',
    'Ver en mapa': 'Ver no mapa',
    'Información Importante': 'Informação Importante',
    'Registro requerido con anticipación': 'Registro prévio necessário',
    'Llegar 15 minutos antes del inicio': 'Chegar 15 minutos antes do início',
    'Aforo limitado - Reserva tu lugar': 'Capacidade limitada - Reserve seu lugar',
    'Registrarme': 'Registrar-me',
    'Compartir Evento': 'Compartilhar Evento',
    'Lo que hacemos': 'O que fazemos',
    'Nuestros Servicios': 'Nossos Serviços',
    'Soluciones integrales diseñadas para optimizar cada aspecto de tu organización': 'Soluções integrais projetadas para otimizar cada aspecto da sua organização',
    'Conocer más': 'Saiba mais',
    'Inicio': 'Início',
    'Servicios': 'Serviços',
    'Nosotros': 'Sobre Nós',
    'Contacto': 'Contato',
    'Noticias': 'Notícias',
    'Eventos': 'Eventos',
  },
  fr: {
    'Eventos y Actividades': 'Événements et Activités',
    'Descubre los próximos eventos y actividades organizadas por BAUSEN. Conecta con nuestra comunidad y participa en experiencias únicas diseñadas para inspirar y conectar.': 'Découvrez les prochains événements et activités organisés par BAUSEN. Connectez-vous avec notre communauté et participez à des expériences uniques conçues pour inspirer et connecter.',
    'Fecha y Hora': 'Date et Heure',
    'Horario por confirmar': 'Horaire à confirmer',
    'Ubicación': 'Emplacement',
    'Ver en mapa': 'Voir sur la carte',
    'Información Importante': 'Information Importante',
    'Registro requerido con anticipación': 'Inscription préalable requise',
    'Llegar 15 minutos antes del inicio': 'Arriver 15 minutes avant le début',
    'Aforo limitado - Reserva tu lugar': 'Capacité limitée - Réservez votre place',
    'Registrarme': "M'inscrire",
    'Compartir Evento': "Partager l'événement",
    'Lo que hacemos': 'Ce que nous faisons',
    'Nuestros Servicios': 'Nos Services',
    'Soluciones integrales diseñadas para optimizar cada aspecto de tu organización': 'Solutions complètes conçues pour optimiser chaque aspect de votre organisation',
    'Conocer más': 'En savoir plus',
    'Inicio': 'Accueil',
    'Servicios': 'Services',
    'Nosotros': 'À propos',
    'Contacto': 'Contact',
    'Noticias': 'Actualités',
    'Eventos': 'Événements',
  },
  de: {
    'Eventos y Actividades': 'Veranstaltungen und Aktivitäten',
    'Fecha y Hora': 'Datum und Uhrzeit',
    'Ubicación': 'Standort',
    'Lo que hacemos': 'Was wir tun',
    'Nuestros Servicios': 'Unsere Dienstleistungen',
    'Conocer más': 'Mehr erfahren',
  },
};

// Fallback translation function when backend is unavailable
function translateLocally(text: string, dest: string): string {
  const langTranslations = translations[dest];
  if (langTranslations && langTranslations[text]) {
    return langTranslations[text];
  }
  return text; // Return original if no translation found
}

const BACKEND_URL =
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  'http://localhost:5000';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { text, dest } = body;

    // If target is Spanish, return original
    if (dest === 'es' || !dest) {
      return Response.json({ translated: text || '' });
    }

    // Try to call backend first
    try {
      const response = await fetch(`${BACKEND_URL}/api/translate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, dest }),
      });

      if (response.ok) {
        const data = await response.json();
        // Handle different response formats from backend
        const translatedText =
          data?.translated ||
          data?.translatedText ||
          data?.translation ||
          data?.data?.translated ||
          data?.data?.translatedText ||
          data?.data?.translation;
        if (translatedText) {
          return Response.json({ translated: translatedText });
        }
      }
      
      // If backend fails or returns 404, use local translation
      const localTranslation = translateLocally(text, dest);
      return Response.json({ translated: localTranslation });
    } catch (fetchError) {
      // If fetch fails completely, use local translation
      const localTranslation = translateLocally(text, dest);
      return Response.json({ translated: localTranslation });
    }
  } catch (error) {
    console.warn('Translation service error:', error);
    return Response.json({ translated: '' });
  }
}

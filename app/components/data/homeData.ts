// Datos de servicios para la página principal
export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: string;
  href: string;
}

export const services: Service[] = [
  {
    id: "capital-humano",
    title: "Capital humano",
    description: "Aumenta la eficiencia y resultados de tu negocio.",
    image: "/web/image/servicios/Capital_Humano_FInal.jpg",
    icon: "/image/icon/Capital Humano_Icon_Color@2x.png",
    href: "/servicios/capital-humano",
  },
  {
    id: "servicios-especializados",
    title: "Servicios especializados",
    description: "Aumenta la eficiencia y resultados de tu negocio.",
    image: "/web/image/servicios/servicios-especializados.jpg",
    icon: "/image/icon/ServiciosEspecializados_Icon_Color@2x.png",
    href: "/servicios/desarrollo-organizacional",
  },
  {
    id: "servicios-impuestos",
    title: "Servicios de Impuestos",
    description: "Optimiza tu carga fiscal con expertos certificados.",
    image: "/web/image/servicios/servicios-impuestos.jpg",
    icon: "/image/icon/ServiciosdeImpuestos_Icon_Color@2x.png",
    href: "/servicios/management-services",
  },
];

// Datos de redes sociales
export interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: string;
  label: string;
}

export const socialLinks: SocialLink[] = [
  {
    id: "linkedin",
    name: "LinkedIn",
    url: "https://www.linkedin.com/",
    icon: "/web/image/icon/Iconos_Redes/Linkedin_PositivioStroke@2x.png",
    label: "Business Services BAUSEN",
  },
  {
    id: "facebook",
    name: "Facebook",
    url: "https://www.facebook.com/",
    icon: "/web/image/icon/Iconos_Redes/Facebook_PositivioStroke@2x.png",
    label: "Business Services BAUSEN",
  },
  {
    id: "instagram",
    name: "Instagram",
    url: "https://www.instagram.com/bausen",
    icon: "/web/image/icon/Iconos_Redes/Instagram_PositivioStroke@2x.png",
    label: "bausen",
  },
  {
    id: "youtube",
    name: "YouTube",
    url: "https://www.youtube.com/",
    icon: "/web/image/icon/Iconos_Redes/Youtube@2x.png",
    label: "Business Services BAUSEN",
  },
];

// Datos de reconocimientos
export interface Award {
  id: string;
  title: string;
  image?: string;
}

export const awards: Award[] = [
  { id: "ccrh", title: "Concilio de Recursos Humanos" },
  { id: "beh", title: "Distintivo de Empresas Humanitarias" },
  { id: "trabajo", title: "Certificación de Trabajo Digno" },
  { id: "repse", title: "Registro de Especialistas Profesionales" },
];

// Datos del Training Center
export interface TrainingFeature {
  id: string;
  label: string;
  description: string;
  icon: "users" | "video" | "award";
  href?: string; // Added optional href property
}

export const trainingFeatures: TrainingFeature[] = [
  {
    id: "eventos",
    label: "Eventos",
    description: "Participación activa en eventos con escuelas y universidades",
    icon: "users",
    href: "/eventos",
  },
  {
    id: "webinars",
    label: "Webinars Institucionales",
    description: "Capacitaciones y webinars especializados con instituciones educativas",
    icon: "video",
  },
  {
    id: "becarios",
    label: "Sistema de Becarios",
    description: "Programa integral de formación y desarrollo de talento joven",
    icon: "award",
    href: "/becarios",
  },
];

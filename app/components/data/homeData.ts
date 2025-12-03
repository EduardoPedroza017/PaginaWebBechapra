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
    image: "/image/servicios/Capital_Humano_FInal.jpg",
    icon: "/image/icon/Capital Humano_Icon_Color@2x.png",
    href: "/servicios/capital-humano",
  },
  {
    id: "servicios-especializados",
    title: "Servicios especializados",
    description: "Aumenta la eficiencia y resultados de tu negocio.",
    image: "/image/servicios/servicios-especializados.jpg",
    icon: "/image/icon/ServiciosEspecializados_Icon_Color@2x.png",
    href: "/servicios/desarrollo-organizacional",
  },
  {
    id: "servicios-impuestos",
    title: "Servicios de Impuestos",
    description: "Optimiza tu carga fiscal con expertos certificados.",
    image: "/image/servicios/servicios-impuestos.jpg",
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
    icon: "/image/icon/Iconos_Redes/Linkedin_PositivioStroke@2x.png",
    label: "Business Services Bechapra",
  },
  {
    id: "facebook",
    name: "Facebook",
    url: "https://www.facebook.com/",
    icon: "/image/icon/Iconos_Redes/Facebook_PositivioStroke@2x.png",
    label: "Business Services Bechapra",
  },
  {
    id: "instagram",
    name: "Instagram",
    url: "https://www.instagram.com/bechapra",
    icon: "/image/icon/Iconos_Redes/Instagram_PositivioStroke@2x.png",
    label: "bechapra",
  },
  {
    id: "youtube",
    name: "YouTube",
    url: "https://www.youtube.com/",
    icon: "/image/icon/Iconos_Redes/Youtube@2x.png",
    label: "Business Services Bechapra",
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
}

export const trainingFeatures: TrainingFeature[] = [
  {
    id: "ferias",
    label: "Ferias de Empleo",
    description: "Participación activa en ferias de empleo con escuelas y universidades",
    icon: "users",
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
  },
];

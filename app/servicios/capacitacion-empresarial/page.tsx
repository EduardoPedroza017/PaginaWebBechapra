"use client";

import {
  TrainingHero,
  ProgramsGrid,
  HowWeWork,
  BenefitsSection,
  PerformanceSection,
  CoursesAccordion,
  TrainingCTA,
  ContactSection,
} from "./components";
import {
  UserPlus,
  Lightbulb,
  Rocket,
  Target,
  Users,
  TrendingUp,
} from "lucide-react";
import Footer from "@/components/Footer";

// Data
const programs = [
  {
    title: "Integración y Team Building",
    icon: UserPlus,
    desc: "Fortalece la cohesión de tu equipo a través de actividades vivenciales diseñadas por especialistas.",
    color: "#0056d4",
  },
  {
    title: "Soft Skills",
    icon: Lightbulb,
    desc: "Desarrolla habilidades interpersonales clave para el éxito profesional y el liderazgo efectivo.",
    color: "#0891b2",
  },
  {
    title: "Competencias Técnicas",
    icon: Rocket,
    desc: "Programas especializados para dominar herramientas, procesos y metodologías de vanguardia.",
    color: "#7c3aed",
  },
];

const benefits = [
  { title: "Conjunto de habilidades técnicas y soft skills mejoradas", icon: Target },
  { title: "Mayor entendimiento y aprecio por la importancia del trabajo en equipo", icon: Users },
  { title: "Mentalidad orientada hacia el crecimiento e innovación", icon: TrendingUp },
];

const courses = [
  {
    id: "competencias",
    title: "Competencias y habilidades técnicas",
    description: "Ofrecemos cursos, talleres y seminarios enfocados en desarrollar competencias especializadas en tu equipo:",
    items: [
      "Estrategia y dirección",
      "Ventas y negociación",
      "Design Thinking",
      "Gestión de proyectos",
      "Innovación y modelos de negocios",
      "Estrategias de Contabilidad y Finanzas",
      "Dirección en Recursos Humanos",
      "Análisis de riesgos",
      "Programación neurolingüística",
      "Coaching",
    ],
  },
  {
    id: "softskills",
    title: "Soft Skills",
    description: "Competencias que configuran el comportamiento individual de los profesionales:",
    items: [
      "Liderazgo",
      "Comunicación",
      "Creatividad",
      "Resolución de problemas",
      "Gestión de tiempo",
      "Manejo de estrés",
      "Productividad personal",
      "Pensamiento crítico",
      "Trabajo en equipo",
      "Inteligencia emocional",
    ],
  },
  {
    id: "teambuilding",
    title: "Integración y Team Building",
    description: "A través de ejercicios de aprendizaje vivencial desarrollados por especialistas, ayudamos a mejorar la comunicación interpersonal, la toma de decisiones y el conocimiento interior, para trabajar en equipo. Este servicio requiere de la participación activa de tu equipo y puedes elegir entre incluir actividad física fuerte, moderada o nula.",
  },
];

const howWeWorkPoints = [
  "Adaptamos cada programa a las necesidades específicas de tu organización",
  "Garantizamos una experiencia de aprendizaje personalizada y efectiva",
];

export default function CapacitacionEmpresarialPage() {
  return (
    <main className="overflow-hidden">
      <TrainingHero
        title="Capacitación"
        highlightWord="Empresarial"
        description="Programas prácticos, con instructores certificados y seguimiento que asegura la transferencia de conocimiento a tu equipo."
        imageSrc="/image/servicios/capacitacionempresarial.jpg"
        imageAlt="Capacitación Empresarial Bechapra"
      />

      <ProgramsGrid title="Nuestros Programas de Capacitación" programs={programs} />

      <HowWeWork
        title="Cómo Trabajamos"
        description="Nuestro enfoque se centra en la participación activa y el aprendizaje vivencial. A través de ejercicios prácticos y dinámicos, nuestros especialistas guían a tu equipo en un viaje de descubrimiento y desarrollo personal y profesional."
        points={howWeWorkPoints}
        imageSrc="/image/servicios/servicios-especializados.jpg"
        imageAlt="Cómo Trabajamos"
      />

      <BenefitsSection benefits={benefits} />

      <PerformanceSection
        title="Mejora el rendimiento de tu equipo"
        description="Nuestros programas están diseñados para mejorar el desempeño individual y colectivo, aumentando la productividad y eficiencia de tu empresa."
        highlight="¡Convierte a tu equipo en un motor de éxito!"
        ctaLabel="COMIENZA AHORA"
        ctaLink="#contacto"
        imageSrc="/image/servicios/Capital_Humano_FInal.jpg"
        imageAlt="Mejora el rendimiento"
      />

      <CoursesAccordion title="Explora Nuestros Cursos" courses={courses} />

      <TrainingCTA
        title="Solicita tu diagnóstico formativo"
        subtitle="Recibirás una propuesta con cronograma, metodología y ROI estimado para tu inversión en capacitación."
      />

      <ContactSection />
    </main>
  );
}

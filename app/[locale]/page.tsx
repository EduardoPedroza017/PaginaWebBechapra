
import { getDictionary } from '@/lib/dictionary';
import ContactForm from "../components/ContactForm";
import AnimatedSection from "../components/AnimatedSection";
import CtaRedes from "../components/CtaRedes";
import ServicesSection from "../components/ServicesSection";
import AwardsSection from "../components/AwardsSection";
import TrainingCenterSection from "../components/TrainingCenterSection";
import HeroSection from "../components/HeroSection";
import NewsCards from "../components/NewsCards";
import PressCards from "../components/PressCards";
import Footer from "../../components/Footer";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return (
    <main className="min-h-screen bg-white text-slate-900 overflow-x-hidden">
      {/* HERO - Azul con gradiente */}
      <HeroSection dict={dict} />

      {/* SERVICIOS - Fondo blanco */}
      <section style={{ background: '#FFFFFF', width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <ServicesSection dict={dict} />
        </div>
      </section>

      {/* PRENSA - Fondo azul Bechapra */}
      <section style={{ background: '#E3F2FD', width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <AnimatedSection delay={0.1}>
            <PressCards dict={dict} />
          </AnimatedSection>
        </div>
      </section>

      {/* BECHAPRA TRAINING CENTER - Fondo blanco */}
      <section style={{ background: '#FFFFFF', width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <TrainingCenterSection dict={dict} />
        </div>
      </section>

      {/* NOTICIAS - Fondo azul Bechapra */}
      <section style={{ background: '#E3F2FD', width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <AnimatedSection>
            <NewsCards dict={dict} />
          </AnimatedSection>
        </div>
      </section>

      {/* CTA + REDES - Fondo blanco */}
      <section style={{ background: '#FFFFFF', width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <AnimatedSection delay={0.2}>
            <CtaRedes dict={dict} />
          </AnimatedSection>
        </div>
      </section>

      {/* PREMIOS - Fondo azul Bechapra */}
      <section style={{ background: '#E3F2FD', width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <AwardsSection dict={dict} />
        </div>
      </section>

      {/* FORMULARIO DE CONTACTO - Fondo blanco */}
      <section id="contacto" style={{ background: '#FFFFFF', width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-6 px-4">
              <span className="inline-block text-blue-700 bg-blue-100 font-semibold text-xs sm:text-sm px-3 py-1 rounded-full mb-2 tracking-wide">{dict.home?.contact?.ready ?? "¿Listo para conectar?"}</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 text-slate-900">{dict.home?.contact?.title ?? "Hablemos sobre tu proyecto"}</h2>
              <div className="w-20 h-1 bg-blue-600 rounded-full mx-auto mb-4" />
              <p className="text-base sm:text-lg text-slate-600 font-medium">
                {dict.home?.contact?.description ?? "Cuéntanos tus ideas, necesidades o dudas y nuestro equipo te contactará a la brevedad. ¡Estamos aquí para ayudarte a transformar tu operación!"}
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <ContactForm dict={dict} />
          </AnimatedSection>
        </div>
      </section>

      {/* FOOTER */}
      <Footer dict={dict} />
    </main>
  );
}

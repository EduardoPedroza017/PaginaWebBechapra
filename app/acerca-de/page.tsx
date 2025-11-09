"use client";

import { motion, useReducedMotion } from "framer-motion";
import styles from "./styles.module.css";

export default function AcercaDePage() {
  const shouldReduce = useReducedMotion();
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        {/** motion container with staggered children; respects reduced motion */}
        <motion.div
          initial={shouldReduce ? undefined : { opacity: 0, y: 12 }}
          animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
          transition={shouldReduce ? undefined : { duration: 0.6, ease: [0.2,0.9,0.2,1], when: 'beforeChildren', staggerChildren: 0.12 }}
        >
          <header className={styles.hero}>
            <motion.h1 className={styles.title} initial={shouldReduce ? undefined : { opacity: 0, x: -8 }} animate={shouldReduce ? undefined : { opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: [0.2,0.9,0.2,1] }}>Acerca de Bechapra</motion.h1>
            <motion.p className={styles.lead} initial={shouldReduce ? undefined : { opacity: 0, x: -6 }} animate={shouldReduce ? undefined : { opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.06 }}>Tu aliado estratégico en soluciones empresariales integrales</motion.p>
            <div className={styles.ctaRow}>
              <motion.a className={styles.ctaBtn} href="#fin" whileHover={shouldReduce ? undefined : { scale: 1.02 }} whileTap={shouldReduce ? undefined : { scale: 0.98 }}>Contáctanos</motion.a>
            </div>
          </header>

          <section className={styles.proseWrap}>
            <div className={styles.cards}>
              <motion.article className={styles.card} initial={shouldReduce ? undefined : { opacity: 0, y: 10 }} animate={shouldReduce ? undefined : { opacity: 1, y: 0 }} transition={{ duration: 0.6 }} whileHover={shouldReduce ? undefined : { translateY: -6 }}>
                <div className={styles.accentBar} aria-hidden />
                <h2 className={styles.cardTitle}>Nuestra Misión</h2>
                <p className={styles.cardText}>
                  Impulsar el crecimiento y éxito de las organizaciones a través de soluciones integrales en Capital Humano, Desarrollo Organizacional y Management Services.
                </p>
              </motion.article>

              <motion.article className={styles.card} initial={shouldReduce ? undefined : { opacity: 0, y: 10 }} animate={shouldReduce ? undefined : { opacity: 1, y: 0 }} transition={{ duration: 0.68, delay: 0.06 }} whileHover={shouldReduce ? undefined : { translateY: -6 }}>
                <div className={styles.accentBar} aria-hidden />
                <h2 className={styles.cardTitle}>Nuestra Visión</h2>
                <p className={styles.cardText}>
                  Ser la empresa líder en soluciones empresariales, reconocida por nuestra excelencia, innovación y compromiso con el éxito de nuestros clientes.
                </p>
              </motion.article>
            </div>
          </section>
        </motion.div>
      </div>
    </main>
  );
}
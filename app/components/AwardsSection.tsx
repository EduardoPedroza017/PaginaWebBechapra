"use client";

import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import Image from "next/image";
import styles from "@/app/css/components/AwardsSection.module.css";

export default function AwardsSection() {
  const reconocimientos = [
    {
      id: "ccrh",
      img: "/imagen/reconocimiento-ccrh.jpg",
      title: "Concilio de Recursos Humanos",
    },
    {
      id: "beh",
      img: "/imagen/reconocimiento-beh.jpg",
      title: "Distintivo de Empresas Humanitarias",
    },
    {
      id: "trabajo",
      img: "/imagen/reconocimiento-trabajo.jpg",
      title: "Certificación de Trabajo Digno",
    },
    {
      id: "repse",
      img: "/imagen/reconocimiento-repse.jpg",
      title: "Registro de Especialistas Profesionales",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className={styles.section}>
      <AnimatedSection>
        {/* Header */}
        <motion.div 
          className={styles.headerContainer}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <motion.h2 
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            Reconocimientos
          </motion.h2>

          <motion.div 
            className={styles.underline}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            style={{ originX: 0.5 }}
          />
        </motion.div>

        {/* Grid de reconocimientos - Layout horizontal */}
        <motion.div 
          className={styles.awardsGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {reconocimientos.map((rec) => (
            <motion.div
              key={rec.id}
              variants={itemVariants}
              className={styles.awardCard}
              whileHover={{ 
                y: -12,
                transition: { type: "spring", stiffness: 300, damping: 10 }
              }}
            >
              {/* Contenedor de imagen con overlay */}
              <div className={styles.imageWrapper}>
                <Image
                  src={rec.img}
                  alt={rec.title}
                  width={280}
                  height={280}
                  className={styles.awardImage}
                  priority
                />
                <div className={styles.imageOverlay} />
              </div>

              {/* Título debajo con animación */}
              <motion.p 
                className={styles.awardTitle}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                {rec.title}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </AnimatedSection>
    </section>
  );
}

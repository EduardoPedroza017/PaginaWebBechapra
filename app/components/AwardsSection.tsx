"use client";

import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import Image from "next/image";
import styles from "@/app/css/components/AwardsSection.module.css";

export default function AwardsSection() {
  const reconocimientos = [
    {
      id: "ccrh",
      img: "/imagen/reconocimiento-ccrh.svg",
      title: "Concilio de Recursos Humanos",
    },
    {
      id: "beh",
      img: "/imagen/reconocimiento-beh.svg",
      title: "Distintivo de Empresas Humanitarias",
    },
    {
      id: "trabajo",
      img: "/imagen/reconocimiento-trabajo.svg",
      title: "Certificación de Trabajo Digno",
    },
    {
      id: "repse",
      img: "/imagen/reconocimiento-repse.svg",
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

        {/* Compact centered logo strip (desktop & mobile-friendly).
            Shows logos in a centered row with subtle side fades like the provided reference image. */}
        <div className={styles.stripContainer}>
          <div className={styles.sideFade} aria-hidden />
          <motion.div
            className={styles.stripWrapper}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className={styles.strip}>
              {reconocimientos.map((rec) => (
                <motion.figure
                  key={rec.id}
                  className={styles.logoItem}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                >
                  <Image
                    src={rec.img}
                    alt={rec.title}
                    width={140}
                    height={80}
                    className={styles.logoImage}
                    priority
                  />
                  <figcaption className={styles.srOnly}>{rec.title}</figcaption>
                </motion.figure>
              ))}
            </div>
          </motion.div>
          <div className={styles.sideFade} aria-hidden />
        </div>
      </AnimatedSection>
    </section>
  );
}

import styles from "./styles.module.css";
import ContactForm from "@/app/components/ContactForm";
import Image from "next/image";

const services = [
	{
		title: "Payroll & Compensación",
		desc: "Gestión integral de nómina, cumplimiento fiscal y reporting para el sector financiero.",
		icon: "/imagen/icons/icon-payroll.svg"
	},
	{
		title: "Atracción y Retención",
		desc: "Estrategias de selección, employer branding y planes de retención de talento crítico.",
		icon: "/imagen/icons/icon-attraction.svg"
	},
	{
		title: "Cumplimiento y NOM",
		desc: "Políticas internas, compliance laboral y alineamiento a normativas sectoriales.",
		icon: "/imagen/icons/icon-compliance.svg"
	},
	{
		title: "Evaluación de desempeño",
		desc: "Diseño de KPIs, medición por competencias y programas de desarrollo para mandos.",
		icon: "/imagen/icons/icon-performance.svg"
	},
	{
		title: "Capacitación financiera",
		desc: "Programas especializados para equipos financieros y de control interno.",
		icon: "/imagen/icons/icon-training.svg"
	},
	{
		title: "Outsourcing parcial",
		desc: "Soporte experto en picos de trabajo y proyectos temporales con gobernanza clara.",
		icon: "/imagen/icons/icon-outsourcing.svg"
	}
];

export default function Page() {
	return (
		<>
			<section className={styles.section}>
				<div className={styles.header}>
					<div className={styles.kicker}>Servicios</div>
					<h1 className={styles.title}>Capital Humano</h1>
					<p className={styles.lead}>
						Soluciones modernas y seguras para el sector financiero: optimizamos procesos de talento,
						nómina y cumplimiento para que tu organización mantenga foco en el crecimiento.
					</p>
				</div>

				<div className={styles.contentWrap}>
					<div className={styles.servicesGrid}>
						{services.map((s) => (
							<article key={s.title} className={styles.serviceCard} aria-labelledby={s.title.replace(/\s+/g, "-") }>
												<div className="flex items-start gap-4">
													<div className={styles.serviceIcon} aria-hidden>
														<Image src={s.icon} alt={`${s.title} icon`} width={28} height={28} className={styles.serviceIconImage} />
													</div>
									<div>
										<h3 id={s.title.replace(/\s+/g, "-")} className={styles.serviceTitle}>{s.title}</h3>
										<p className={styles.serviceDesc}>{s.desc}</p>
									</div>
								</div>
							</article>
						))}
					</div>

					<div className={styles.featuresRow}>
						<div className={styles.featureItem}>
							<h4 className={styles.featureTitle}>Seguridad y confidencialidad</h4>
							<p className={styles.featureText}>Procesos alineados a mejores prácticas de seguridad para manejo de información salarial y personal.</p>
						</div>
						<div className={styles.featureItem}>
							<h4 className={styles.featureTitle}>Integración con sistemas</h4>
							<p className={styles.featureText}>Conectamos con ERPs y payroll providers para reducir trabajo manual y errores.</p>
						</div>
						<div className={styles.featureItem}>
							<h4 className={styles.featureTitle}>Soporte 24/7*</h4>
							<p className={styles.featureText}>Planes de soporte para ventanas críticas y cierres contables (SLAs adaptables).</p>
						</div>
					</div>

					<div className={styles.ctaWrap}>
						<a href="#contacto" className={styles.primaryBtn}>Contactar a Bechapra</a>
						<a href="#" className={styles.ghostBtn}>Ver casos de éxito</a>
					</div>

					<div id="contacto" className={styles.contactSection}>
						<ContactForm />
					</div>
				</div>
			</section>
		</>
	);
}
"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Users, Building2, Briefcase } from "lucide-react";
import { TranslateText } from '@/components/TranslateText';
import Footer from '@/components/Footer';


import { useEffect, useState } from "react";

const iconMap: Record<string, any> = {
	"Capital Humano": Users,
	"Desarrollo Organizacional": Building2,
	"Management Services": Briefcase,
};

const colorMap: Record<string, string> = {
	"Capital Humano": "blue",
	"Desarrollo Organizacional": "cyan",
	"Management Services": "indigo",
};

type Service = {
	id: string;
	name: string;
	slug: string;
	description?: string;
	icon?: string;
	image?: string;
	features: { name: string; slug: string }[];
};



const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.15, delayChildren: 0.2 },
	},
};

const cardVariants = {
	hidden: { opacity: 0, y: 30 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// Example static data. Replace with API fetch if needed.
const defaultServices: Service[] = [
	{
		id: "1",
		name: "Capital Humano",
		slug: "capital-humano",
		description: "Soluciones para la gestión y desarrollo del talento humano.",
		icon: undefined,
		image: undefined,
		features: [
			{ name: "Reclutamiento", slug: "reclutamiento" },
			{ name: "Capacitación", slug: "capacitacion" },
		],
	},
	{
		id: "2",
		name: "Desarrollo Organizacional",
		slug: "desarrollo-organizacional",
		description: "Impulsa la cultura y estructura de tu empresa.",
		icon: undefined,
		image: undefined,
		features: [
			{ name: "Diagnóstico Organizacional", slug: "diagnostico" },
			{ name: "Gestión del Cambio", slug: "gestion-cambio" },
		],
	},
	{
		id: "3",
		name: "Management Services",
		slug: "management-services",
		description: "Servicios de consultoría y gestión empresarial.",
		icon: undefined,
		image: undefined,
		features: [
			{ name: "Consultoría", slug: "consultoria" },
			{ name: "Estrategia", slug: "estrategia" },
		],
	},
];

const darkBlueGradient = "bg-gradient-to-r from-blue-700 to-blue-900 dark:from-blue-500 dark:to-blue-700";
const lightBlueGradient = "bg-gradient-to-r from-sky-300 to-sky-200";

export default function ServiciosIndex() {
	const [services, setServices] = useState<Service[]>(defaultServices);
	// Si necesitas cargar desde una API, usa useEffect aquí
	// useEffect(() => { ... }, []);
	return (
		<div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/30 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
			{/* Hero Section */}
			<section className="relative overflow-hidden bg-linear-to-br from-blue-800 via-blue-900 to-blue-800 dark:from-slate-900 dark:via-blue-950 dark:to-slate-900">
				{/* Background decorations */}
				<div className="absolute inset-0">
					<div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 dark:bg-white/3 rounded-full blur-3xl" />
					<div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-400/10 dark:bg-cyan-400/5 rounded-full blur-3xl" />
					<div className="absolute top-1/2 right-0 w-64 h-64 bg-blue-400/10 dark:bg-blue-400/5 rounded-full blur-2xl" />
				</div>

				<div className="relative max-w-7xl 2xl:max-w-400 mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-16 sm:py-20 lg:py-28 2xl:py-32">
					<div className="grid lg:grid-cols-2 gap-12 items-center">
						{/* Content */}
						<motion.div
							initial={{ opacity: 0, x: -30 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6 }}
							className="space-y-6"
						>
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.2 }}
									className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-blue-100 dark:text-blue-200 text-sm font-semibold"
								>
									<Briefcase className="w-4 h-4" />
									<TranslateText text="Soluciones Empresariales" />
								</motion.div>

								<h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
									<TranslateText text="Nuestros" />{" "}
									<span className={`bg-clip-text text-transparent ${lightBlueGradient} dark:${darkBlueGradient}`}>
										<TranslateText text="Servicios" />
									</span>
								</h1>

								<p className="text-lg sm:text-xl text-blue-100/90 dark:text-blue-200/80 max-w-xl leading-relaxed">
									<TranslateText text="Descubre soluciones integrales en Capital Humano, Desarrollo Organizacional y Management Services diseñadas para impulsar el crecimiento de tu empresa." />
								</p>							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.4 }}
							>
								<Link
									href="#servicios-grid"
									className="group inline-flex items-center gap-3 px-8 py-4 bg-blue-700 dark:bg-blue-500 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
								>
									<TranslateText text="Explorar Servicios" />
									<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
								</Link>
							</motion.div>

							{/* Stats */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.5 }}
								className="flex flex-wrap gap-8 pt-6"
							>
								{[
									{ value: "9+", label: "Servicios" },
									{ value: "500+", label: "Clientes" },
									{ value: "15+", label: "Años" },
								].map((stat) => (
									<div key={stat.label} className="text-center">
										<p className="text-3xl font-black text-white">{stat.value}</p>
										<p className="text-sm text-blue-200">{stat.label}</p>
									</div>
								))}
							</motion.div>
						</motion.div>

						{/* Visual */}
						<motion.div
							initial={{ opacity: 0, x: 30 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							className="relative hidden lg:block"
						>
							<div className="relative">
								{/* Decorative background */}
								<div className="absolute -inset-4 bg-linear-to-br from-white/10 to-white/5 rounded-3xl blur-xl" />
								
								{/* Image container */}
								<div className="relative h-100 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
									<Image
										src="/image/servicios/service.png"
										alt="Persona trabajando con laptop y documentos"
										fill
										className="object-cover"
										priority
									/>
									<div className="absolute inset-0 bg-linear-to-t from-blue-900/40 to-transparent" />
								</div>

								{/* Floating card */}
								<motion.div
                                    initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.8 }}
									className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-4 flex items-center gap-3"
								>
									<div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
										<CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
									</div>
									<div>
										<p className="font-bold text-slate-900 dark:text-white">Soluciones Integrales</p>
										<p className="text-sm text-slate-500 dark:text-slate-400">Para tu empresa</p>
									</div>
								</motion.div>
							</div>
						</motion.div>
					</div>
				</div>

				{/* Wave decoration */}
				<div className="absolute bottom-0 left-0 right-0">
					<svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
						<path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" className="fill-slate-50 dark:fill-slate-900" />
					</svg>
				</div>
			</section>

			{/* Services Grid Section */}
			<section id="servicios-grid" className="py-20 lg:py-28 bg-slate-50 dark:bg-slate-900 relative">
				{/* Subtle background pattern */}
				<div className="absolute inset-0 opacity-30">
					<div className="absolute top-20 left-10 w-72 h-72 bg-blue-100 dark:bg-blue-900/30 rounded-full blur-3xl" />
					<div className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-100 dark:bg-cyan-900/30 rounded-full blur-3xl" />
				</div>

				<div className="relative max-w-7xl 2xl:max-w-400 mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
					{/* Header */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="text-center mb-16"
					>
						<h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-4">
							<TranslateText text="Nuestras" />{" "}
							<span className={`bg-clip-text text-transparent ${lightBlueGradient} dark:${darkBlueGradient}`}>
								<TranslateText text="Líneas de Servicio" />
							</span>
						</h2>

						<p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
							<TranslateText text="Soluciones especializadas diseñadas para cada necesidad de tu negocio" />
						</p>

						<div className="w-24 h-1.5 bg-linear-to-r from-blue-600 to-cyan-500 rounded-full mx-auto mt-6" />
					</motion.div>

					{/* Cards Grid */}
					<motion.div
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
					>
						{/* Render dinámico desde la API */}
						{services.map((service) => (
							<GroupCard key={service.id} group={service} />
						))}
					</motion.div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 bg-linear-to-br from-slate-50 via-blue-50/30 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                            ¿Listo para impulsar tu empresa?
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            Nuestro equipo de expertos está listo para ayudarte a encontrar la solución perfecta para tus necesidades.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                            <Link
                                href="/#contacto"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
                            >
                                Contáctanos
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link
                                href="/acerca-de"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-100 text-blue-700 font-bold rounded-2xl border border-blue-200 hover:bg-blue-200 transition-all dark:bg-white/10 dark:backdrop-blur-sm dark:text-white dark:border-white/20 dark:hover:bg-white/20"
                            >
                                Conocer más
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

			<Footer />
		</div>
	);
}


function GroupCard({ group }: { group: Service }) {
	const router = useRouter();
	const Icon = iconMap[group.name] || Briefcase;
	const color = colorMap[group.name] || "blue";
	const colorStyles = {
		blue: {
			gradient: "from-blue-600 to-blue-700",
			iconBg: "bg-blue-600",
			lightBg: "bg-blue-50 dark:bg-blue-950/50",
			text: "text-blue-600 dark:text-blue-400",
			border: "border-blue-200 hover:border-blue-400 dark:border-slate-700 dark:hover:border-blue-500",
			shadow: "hover:shadow-blue-200/50 dark:hover:shadow-blue-900/30",
		},
		cyan: {
			gradient: "from-cyan-600 to-cyan-700",
			iconBg: "bg-cyan-600",
			lightBg: "bg-cyan-50 dark:bg-cyan-950/50",
			text: "text-cyan-600 dark:text-cyan-400",
			border: "border-cyan-200 hover:border-cyan-400 dark:border-slate-700 dark:hover:border-cyan-500",
			shadow: "hover:shadow-cyan-200/50 dark:hover:shadow-cyan-900/30",
		},
		indigo: {
			gradient: "from-indigo-600 to-indigo-700",
			iconBg: "bg-indigo-600",
			lightBg: "bg-indigo-50 dark:bg-indigo-950/50",
			text: "text-indigo-600 dark:text-indigo-400",
			border: "border-indigo-200 hover:border-indigo-400 dark:border-slate-700 dark:hover:border-indigo-500",
			shadow: "hover:shadow-indigo-200/50 dark:hover:shadow-indigo-900/30",
		},
	};
	const colors = colorStyles[color as keyof typeof colorStyles];

	return (
		<motion.div
			variants={cardVariants}
			role="link"
			tabIndex={0}
			onClick={() => router.push(`/servicios/${group.slug}`)}
			onKeyDown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					router.push(`/servicios/${group.slug}`);
				}
			}}
			aria-label={`${group.name} — ver subservicios`}
			className={`group relative bg-white dark:bg-slate-800/90 rounded-2xl cursor-pointer border ${colors.border} shadow-lg hover:shadow-2xl ${colors.shadow} transition-all duration-300 hover:-translate-y-2 flex flex-col h-full overflow-hidden`}
		>
			{/* Top gradient bar */}
			<div className={`h-2 bg-linear-to-r ${colors.gradient}`} />

			<div className="p-8 flex flex-col h-full">
				{/* Header */}
				<div className="mb-6">
					<div className={`w-14 h-14 ${colors.iconBg} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg`}>
						{group.icon ? (
							<Image src={group.icon.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_API_URL}${group.icon}` : group.icon} alt={group.name} width={32} height={32} className="object-contain" unoptimized={group.icon.startsWith('/uploads/')} />
						) : (
							<Icon className="w-7 h-7 text-white" />
						)}
					</div>
					<h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
						{group.name}
					</h2>
					<p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
						{group.description}
					</p>
				</div>

				{/* Sub-servicios List */}
				<div className="flex-1">
					<div className={`${colors.lightBg} rounded-xl p-5`}>
						<h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
							Servicios incluidos
						</h3>
						<ul className="space-y-3">
							{group.features.map((item) => (
								<li key={item.name}>
									<Link
										href={`/servicios/${item.slug}`}
										onClick={(e) => e.stopPropagation()}
										className={`flex items-center gap-3 text-slate-700 dark:text-slate-300 hover:${colors.text} transition-colors group/link`}
									>
										<div className={`w-5 h-5 rounded-full ${colors.iconBg} flex items-center justify-center shrink-0`}>
											<CheckCircle className="w-3 h-3 text-white" />
										</div>
										<span className="text-sm font-medium group-hover/link:translate-x-1 transition-transform">
											{item.name}
										</span>
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>

				{/* Footer */}
				<div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-700">
					<span className={`inline-flex items-center gap-2 text-sm font-bold ${colors.text} group-hover:gap-3 transition-all`}>
						Ver más detalles
						<ArrowRight className="w-4 h-4" />
					</span>
				</div>
			</div>
		</motion.div>
	);
}
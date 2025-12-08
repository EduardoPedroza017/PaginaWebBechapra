"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Users, Building2, Briefcase } from "lucide-react";
import { TranslateText } from '@/components/TranslateText';
import Footer from '@/components/Footer';

const groups = [
	{
		title: "Capital Humano",
		href: "/servicios/capital-humano",
		icon: "/image/icon/Capital Humano_Icon_Color@2x.png",
		iconComponent: Users,
		description: "Gestionamos talento, nómina y soluciones humanas que permiten a tu empresa crecer.",
		color: "blue",
		items: [
			{ title: "Servicios especializados", href: "/servicios/servicios-especializados" },
			{ title: "Payrolling", href: "/servicios/payroll" },
			{ title: "Atracción de Talento", href: "/servicios/atraccion-de-talento" },
		],
	},
	{
		title: "Desarrollo Organizacional",
		href: "/servicios/desarrollo-organizacional",
		icon: "/image/icon/Iconos_Redes/Chat_NegativoStroke@2x.png",
		iconComponent: Building2,
		description: "Mejoramos procesos, cultura y capacidades para que la organización sea más ágil y productiva.",
		color: "cyan",
		items: [
			{ title: "Capacitación Empresarial", href: "/servicios/capacitacion-empresarial" },
			{ title: "Consultoría Organizacional", href: "/servicios/consultoria-organizacional" },
			{ title: "NOM 035", href: "/servicios/nom-035" },
		],
	},
	{
		title: "Management Services",
		href: "/servicios/management-services",
		icon: "/image/icon/Servicios Administrativos_Icon_Color@2x.png",
		iconComponent: Briefcase,
		description: "Servicios contables, legales y administrativos bajo un solo proveedor confiable.",
		color: "indigo",
		items: [
			{ title: "Servicios Contables", href: "/servicios/servicios-contables" },
			{ title: "Servicios Legales", href: "/servicios/servicios-legales" },
			{ title: "Servicios PYME", href: "/servicios/servicios-pyme" },
		],
	},
] as const;

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

export default function ServiciosIndex() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
			{/* Hero Section */}
			<section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 dark:from-slate-900 dark:via-blue-950 dark:to-slate-900">
				{/* Background decorations */}
				<div className="absolute inset-0">
					<div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 dark:bg-white/3 rounded-full blur-3xl" />
					<div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-400/10 dark:bg-cyan-400/5 rounded-full blur-3xl" />
					<div className="absolute top-1/2 right-0 w-64 h-64 bg-blue-400/10 dark:bg-blue-400/5 rounded-full blur-2xl" />
				</div>

				<div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28">
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
									<span className="bg-gradient-to-r from-cyan-300 to-blue-200 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
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
									className="group inline-flex items-center gap-3 px-8 py-4 bg-white dark:bg-slate-800 text-blue-700 dark:text-blue-400 font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
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
								<div className="absolute -inset-4 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl blur-xl" />
								
								{/* Image container */}
								<div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
									<Image
										src="/image/servicios/service.png"
										alt="Persona trabajando con laptop y documentos"
										fill
										className="object-cover"
										priority
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent" />
								</div>

								{/* Floating card */}
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.8 }}
									className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3"
								>
									<div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
										<CheckCircle className="w-6 h-6 text-blue-600" />
									</div>
									<div>
										<p className="font-bold text-slate-900">Soluciones Integrales</p>
										<p className="text-sm text-slate-500">Para tu empresa</p>
									</div>
								</motion.div>
							</div>
						</motion.div>
					</div>
				</div>

				{/* Wave decoration */}
				<div className="absolute bottom-0 left-0 right-0">
					<svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
						<path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="rgb(248 250 252)" />
					</svg>
				</div>
			</section>

			{/* Services Grid Section */}
			<section id="servicios-grid" className="py-20 lg:py-28 bg-white dark:bg-slate-900 relative">
				{/* Subtle background pattern */}
				<div className="absolute inset-0 opacity-30">
					<div className="absolute top-20 left-10 w-72 h-72 bg-blue-100 dark:bg-blue-900/30 rounded-full blur-3xl" />
					<div className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-100 dark:bg-cyan-900/30 rounded-full blur-3xl" />
				</div>

				<div className="relative max-w-7xl mx-auto px-6">
					{/* Header */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="text-center mb-16"
					>
						<h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-4">
							<TranslateText text="Nuestras" />{" "}
							<span className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
								<TranslateText text="Líneas de Servicio" />
							</span>
						</h2>

						<p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
							<TranslateText text="Soluciones especializadas diseñadas para cada necesidad de tu negocio" />
						</p>

						<div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full mx-auto mt-6" />
					</motion.div>

					{/* Cards Grid */}
					<motion.div
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
					>
						{groups.map((group) => (
							<GroupCard key={group.title} group={group} />
						))}
					</motion.div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
				<div className="max-w-4xl mx-auto px-6 text-center">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="space-y-6"
					>
						<h2 className="text-3xl sm:text-4xl font-black text-white">
							¿Listo para impulsar tu empresa?
						</h2>
						<p className="text-lg text-blue-100 max-w-2xl mx-auto">
							Nuestro equipo de expertos está listo para ayudarte a encontrar la solución perfecta para tus necesidades.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
							<Link
								href="/#contacto"
								className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-700 font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
							>
								Contáctanos
								<ArrowRight className="w-5 h-5" />
							</Link>
							<Link
								href="/acerca-de"
								className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-2xl border border-white/20 hover:bg-white/20 transition-all"
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

function GroupCard({ group }: { group: (typeof groups)[number] }) {
	const router = useRouter();
	const Icon = group.iconComponent;

	const colorStyles = {
		blue: {
			gradient: "from-blue-600 to-blue-700",
			iconBg: "bg-blue-600",
			lightBg: "bg-blue-50",
			text: "text-blue-600",
			border: "border-blue-200 hover:border-blue-400",
			shadow: "hover:shadow-blue-200/50",
		},
		cyan: {
			gradient: "from-cyan-600 to-cyan-700",
			iconBg: "bg-cyan-600",
			lightBg: "bg-cyan-50",
			text: "text-cyan-600",
			border: "border-cyan-200 hover:border-cyan-400",
			shadow: "hover:shadow-cyan-200/50",
		},
		indigo: {
			gradient: "from-indigo-600 to-indigo-700",
			iconBg: "bg-indigo-600",
			lightBg: "bg-indigo-50",
			text: "text-indigo-600",
			border: "border-indigo-200 hover:border-indigo-400",
			shadow: "hover:shadow-indigo-200/50",
		},
	};

	const colors = colorStyles[group.color as keyof typeof colorStyles];

	return (
		<motion.div
			variants={cardVariants}
			role="link"
			tabIndex={0}
			onClick={() => router.push(group.href)}
			onKeyDown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					router.push(group.href);
				}
			}}
			aria-label={`${group.title} — ver subservicios`}
			className={`group relative bg-white rounded-2xl cursor-pointer border ${colors.border} shadow-lg hover:shadow-2xl ${colors.shadow} transition-all duration-300 hover:-translate-y-2 flex flex-col h-full overflow-hidden`}
		>
			{/* Top gradient bar */}
			<div className={`h-2 bg-gradient-to-r ${colors.gradient}`} />

			<div className="p-8 flex flex-col h-full">
				{/* Header */}
				<div className="mb-6">
					<div className={`w-14 h-14 ${colors.iconBg} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg`}>
						{group.icon ? (
							<Image src={group.icon} alt="" width={32} height={32} className="object-contain brightness-0 invert" />
						) : (
							<Icon className="w-7 h-7 text-white" />
						)}
					</div>
					<h2 className="text-xl font-bold text-slate-900 mb-3">
						{group.title}
					</h2>
					<p className="text-slate-600 text-sm leading-relaxed">
						{group.description}
					</p>
				</div>

				{/* Services List */}
				<div className="flex-1">
					<div className={`${colors.lightBg} rounded-xl p-5`}>
						<h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
							Servicios incluidos
						</h3>
						<ul className="space-y-3">
							{group.items.map((item) => (
								<li key={item.title}>
									<Link
										href={item.href}
										onClick={(e) => e.stopPropagation()}
										className={`flex items-center gap-3 text-slate-700 hover:${colors.text} transition-colors group/link`}
									>
										<div className={`w-5 h-5 rounded-full ${colors.iconBg} flex items-center justify-center shrink-0`}>
											<CheckCircle className="w-3 h-3 text-white" />
										</div>
										<span className="text-sm font-medium group-hover/link:translate-x-1 transition-transform">
											{item.title}
										</span>
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>

				{/* Footer */}
				<div className="mt-6 pt-5 border-t border-slate-100">
					<span className={`inline-flex items-center gap-2 text-sm font-bold ${colors.text} group-hover:gap-3 transition-all`}>
						Ver más detalles
						<ArrowRight className="w-4 h-4" />
					</span>
				</div>
			</div>
		</motion.div>
	);
}
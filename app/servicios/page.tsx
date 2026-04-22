"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, CheckCircle, Users, Building2, Briefcase, Sparkles } from "lucide-react";
import { TranslateText } from '@/components/TranslateText';
import Footer from '@/components/Footer';
import Section from "@/app/components/Section";
import React, { useState, useRef, MouseEvent } from "react";

const iconMap: Record<string, any> = {
	"Capital Humano": Users,
	"Desarrollo Organizacional": Building2,
	"Management Services": Briefcase,
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

const defaultServices: Service[] = [
	{
		id: "1",
		name: "Capital Humano",
		slug: "capital-humano",
		description: "Soluciones estratégicas para la gestión, atracción y optimización del talento humano en su organización.",
		features: [
			{ name: "Reclutamiento y Selección", slug: "atraccion-de-talento" },
			{ name: "Administración de Nómina", slug: "payroll" },
			{ name: "Servicios Especializados", slug: "servicios-especializados" },
		],
	},
	{
		id: "2",
		name: "Desarrollo Organizacional",
		slug: "desarrollo-organizacional",
		description: "Impulsamos la cultura, estructura y eficiencia de su empresa a través de diagnósticos y planes de mejora.",
		features: [
			{ name: "Capacitación Empresarial", slug: "capacitacion-empresarial" },
			{ name: "NOM-035", slug: "nom-035" },
			{ name: "Consultoría Organizacional", slug: "consultoria-organizacional" },
		],
	},
	{
		id: "3",
		name: "Management Services",
		slug: "management-services",
		description: "Servicios integrales de consultoría y gestión empresarial para la toma de decisiones estratégicas.",
		features: [
			{ name: "Servicios Legales", slug: "servicios-legales" },
			{ name: "Servicios Contables", slug: "servicios-contables" },
			{ name: "Servicios PYME", slug: "servicios-pyme" },
		],
	},
];

export default function ServiciosIndex() {
	const servicesBlueGradient = "linear-gradient(90deg, var(--hero-services-from), var(--hero-services-via), var(--hero-services-to))";
	const servicesBlueGlow =
		"radial-gradient(circle at 30% 40%, var(--hero-services-glow-primary) 0%, transparent 40%), radial-gradient(circle at 70% 60%, var(--hero-services-glow-secondary) 0%, transparent 40%)";
	const servicesBlueStyle = {
		backgroundColor: "var(--hero-services-from)",
		background: servicesBlueGradient,
	};

	return (
		<div className="min-h-screen bg-white dark:bg-slate-950">
			{/* Subpage Hero */}
			<section
				className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden"
				style={servicesBlueStyle}
			>
				{/* Background Parallax Decorations */}
				<div className="absolute inset-0 pointer-events-none">
					<div
						className="absolute inset-0"
						style={{
							backgroundColor: "transparent",
							backgroundImage: servicesBlueGlow,
						}}
					/>
					<div className="absolute inset-0 bg-grid-pattern opacity-5" />
				</div>

				<div className="absolute inset-0 bg-black/10 dark:hidden pointer-events-none z-10" />

				<div className="relative z-30 max-w-7xl 2xl:max-w-[1440px] mx-auto px-6 lg:px-8 gradient-dark">
					<div className="max-w-3xl">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-xs font-black uppercase tracking-widest mb-8"
						>
							<Sparkles className="w-4 h-4" />
							<TranslateText text="Excelencia Corporativa" />
						</motion.div>

						<motion.h1 
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.1 }}
							className="text-5xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8"
						>
							<TranslateText text="Nuestros" />
							<br />
							<span className="bg-linear-to-r bg-clip-text text-transparent from-blue-400 via-blue-500 to-blue-600">
								<TranslateText text="Servicios" />
							</span>
						</motion.h1>

						<motion.p 
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							className="text-xl text-white/85 leading-relaxed font-medium mb-10"
						>
							<TranslateText text="Soluciones estratégicas diseñadas para cada etapa del ciclo de vida de su organización." />
						</motion.p>
					</div>
				</div>
			</section>

			{/* Services Grid Section */}
			<Section variant="blue" className="relative -mt-16 z-20">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
					{defaultServices.map((service, index) => (
						<GroupCard key={service.id} group={service} index={index} />
					))}
				</div>
			</Section>

			{/* Specialized Solutions Info */}
			<Section variant="white" size="lg">
				<div className="grid lg:grid-cols-2 gap-16 items-center">
					<div className="space-y-8">
						<h2 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
							<TranslateText text="Enfoque en Resultados y Calidad Certificada" />
						</h2>
						<p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
							<TranslateText text="Nuestro modelo de servicio se basa en la integración de tecnología avanzada con un profundo conocimiento del mercado local e internacional. Garantizamos cumplimiento normativo y eficiencia operativa en cada proceso." />
						</p>
						<div className="grid sm:grid-cols-2 gap-6">
							{[
								"Atención personalizada 24/7",
								"Cumplimiento legal total",
								"Tecnología de vanguardia",
								"Expertos certificados"
							].map((item, i) => (
								<div key={i} className="flex items-center gap-3">
									<div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
										<CheckCircle className="w-4 h-4 text-white" />
									</div>
									<span className="font-bold text-slate-700 dark:text-slate-300"><TranslateText text={item} /></span>
								</div>
							))}
						</div>
					</div>
					<div className="relative">
						<div className="absolute -inset-4 bg-blue-600/10 rounded-[3rem] blur-2xl" />
						<div className="relative aspect-video lg:aspect-square rounded-[3rem] overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
							<Image
								src="/web/image/servicios/service.png"
								alt="Estrategia Corporativa"
								fill
								className="object-cover"
							/>
						</div>
					</div>
				</div>
			</Section>

			{/* Final CTA */}
			<Section variant="blue" size="md">
				<div className="bg-slate-950 rounded-[3rem] p-8 lg:p-20 text-center relative overflow-hidden shadow-2xl shadow-blue-900/20">
					<div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[80px]" />
					<div className="relative z-10 space-y-8">
						<h2 className="text-4xl lg:text-6xl font-black text-white tracking-tight">
							<TranslateText text="¿Impulsamos su empresa hoy?" />
						</h2>
						<div className="flex flex-col sm:flex-row gap-6 justify-center">
							<Link
								href="/#contacto"
								className="px-10 py-5 bg-blue-700 text-white font-black uppercase tracking-widest text-sm rounded-2xl shadow-xl hover:bg-blue-600 hover:-translate-y-1 transition-all"
							>
								<TranslateText text="Solicitar Consultoría" />
							</Link>
							<Link
								href="/acerca-de"
								className="px-10 py-5 bg-white/5 backdrop-blur-md border border-white/10 text-white font-black uppercase tracking-widest text-sm rounded-2xl hover:bg-white/10 transition-all"
							>
								<TranslateText text="Nuestra Trayectoria" />
							</Link>
						</div>
					</div>
				</div>
			</Section>

			<Footer />
		</div>
	);
}

function GroupCard({ group, index }: { group: Service; index: number }) {
	const router = useRouter();
	const Icon = iconMap[group.name] || Briefcase;
	const cardRef = useRef<HTMLDivElement>(null);
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	const glowX = useSpring(mouseX, { damping: 20, stiffness: 150 });
	const glowY = useSpring(mouseY, { damping: 20, stiffness: 150 });

	function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
		const { left, top } = currentTarget.getBoundingClientRect();
		mouseX.set(clientX - left);
		mouseY.set(clientY - top);
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.6, delay: index * 0.1 }}
			onMouseMove={handleMouseMove}
			className="group relative"
		>
			<div 
				onClick={() => router.push(`/servicios/${group.slug}`)}
				className="relative h-full bg-white dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] p-10 border border-slate-200/60 dark:border-slate-800/50 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col overflow-hidden"
			>
				{/* Interactive Glow */}
				<motion.div
					className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
					style={{
						background: useTransform(
							[glowX, glowY],
							([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(37, 99, 235, 0.08), transparent 40%)`
						),
					}}
				/>

				<div className="relative z-20 flex flex-col h-full">
					<div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-8 shadow-xl shadow-blue-600/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
						<Icon className="w-8 h-8" />
					</div>

					<h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4 tracking-tight leading-tight">
						<TranslateText text={group.name} />
					</h2>

					<p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed mb-8 flex-1">
						<TranslateText text={group.description || ""} />
					</p>

					<div className="space-y-4">
						{group.features.map((feature) => (
							<Link
								key={feature.name}
								href={`/servicios/${feature.slug}`}
								onClick={(e) => e.stopPropagation()}
								className="flex items-center justify-between group/link p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-200 dark:hover:border-blue-800/50 transition-all"
							>
								<span className="text-sm font-black text-slate-700 dark:text-slate-300 group-hover/link:text-blue-700 dark:group-hover/link:text-blue-400 uppercase tracking-wider">
									<TranslateText text={feature.name} />
								</span>
								<ArrowRight className="w-4 h-4 text-slate-400 group-hover/link:translate-x-1 group-hover/link:text-blue-600 transition-all" />
							</Link>
						))}
					</div>
				</div>
			</div>
			{/* Outer shadow glow */}
			<div className="absolute inset-0 rounded-[2.5rem] opacity-0 group-hover:opacity-100 blur-2xl bg-blue-600/5 -z-10 transition-opacity duration-500" />
		</motion.div>
	);
}

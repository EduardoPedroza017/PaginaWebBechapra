"use client";

import React, { useEffect, useState, useRef, MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { TranslateText } from "@/components/TranslateText";
import Footer from "@/components/Footer";
import Section from "@/app/components/Section";
import SubpageHero from "@/components/SubpageHero";
import { Phone, Mail, ArrowRight, Calendar, Users, Award, Linkedin } from "lucide-react";
import axios from "axios";

interface BoardMember {
	id: string;
	nombre: string;
	apellido_paterno: string;
	apellido_materno?: string;
	puesto: string;
	descripcion?: string;
	biografia?: string;
	foto?: string;
	foto_url?: string;
	email?: string;
	telefono?: string;
	edad?: number;
	linkedin?: string;
	activo: boolean;
}

export default function BoardPage() {
	const [boardMembers, setBoardMembers] = useState<BoardMember[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchBoardMembers = async () => {
			try {
				const response = await axios.get(
					`${process.env.NEXT_PUBLIC_API_URL}/api/board-members`
				);
				setBoardMembers(response.data);
			} catch (err) {
				console.error("Error fetching board members:", err);
				setError("Failed to load board members.");
			} finally {
				setLoading(false);
			}
		};
		fetchBoardMembers();
	}, []);

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-white dark:bg-slate-950">
			<SubpageHero 
				badge="Liderazgo Estratégico"
				title="Consejo Directivo"
				subtitle="Líderes visionarios comprometidos con la excelencia, la innovación y el éxito sostenible de nuestros clientes."
			/>

			{/* Stats Overview */}
			<Section variant="blue" className="-mt-20 relative z-20">
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] p-10 border border-slate-200/60 dark:border-slate-800/50 shadow-2xl">
					{[
						{ value: boardMembers.length, label: "Líderes Activos", icon: Users },
						{ value: "15+", label: "Años de Trayectoria", icon: Award },
						{ value: "100%", label: "Compromiso Ético", icon: CheckCircle }
					].map((stat, i) => (
						<div key={i} className="text-center space-y-2">
							<div className="text-4xl font-black text-blue-700 dark:text-blue-500">{stat.value}</div>
							<div className="text-xs font-black uppercase tracking-widest text-slate-500">{stat.label}</div>
						</div>
					))}
				</div>
			</Section>

			<Section variant="white" size="lg">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
					{boardMembers.map((member, index) => (
						<MemberCard key={member.id || index} member={member} index={index} />
					))}
				</div>
			</Section>

			{/* History Link CTA */}
			<Section variant="blue" size="md">
				<div className="bg-slate-900 rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden shadow-2xl shadow-blue-900/20">
					<div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />
					<div className="relative z-10">
						<h2 className="text-4xl lg:text-5xl font-black text-white mb-8 tracking-tighter">
							<TranslateText text="Conozca nuestra trayectoria completa" />
						</h2>
						<a
							href="/acerca-de"
							className="inline-flex items-center gap-3 px-10 py-5 bg-blue-600 text-white font-black uppercase tracking-widest text-sm rounded-2xl shadow-xl hover:bg-blue-500 transition-all hover:-translate-y-1"
						>
							<TranslateText text="Nuestra Historia" />
							<ArrowRight className="w-5 h-5" />
						</a>
					</div>
				</div>
			</Section>

			<Footer />
		</div>
	);
}

function MemberCard({ member, index }: { member: BoardMember; index: number }) {
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

	const getImageUrl = (member: BoardMember): string | null => {
		if (member.foto_url) return `${process.env.NEXT_PUBLIC_API_URL}${member.foto_url}`;
		if (member.foto) return `${process.env.NEXT_PUBLIC_API_URL}/uploads/${member.foto}`;
		return null;
	};

	const fullName = `${member.nombre} ${member.apellido_paterno} ${member.apellido_materno || ''}`.trim();
	const imageUrl = getImageUrl(member);

	return (
		<motion.div
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.6, delay: index * 0.1 }}
			onMouseMove={handleMouseMove}
			className="group relative"
		>
			<div className="relative h-full bg-white dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] p-8 border border-slate-200/60 dark:border-slate-800/50 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col overflow-hidden">
				
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

				<div className="relative z-20 flex flex-col items-center text-center h-full">
					{/* Profile Image */}
					<div className="relative mb-8">
						<div className="w-40 h-40 rounded-3xl overflow-hidden ring-8 ring-slate-50 dark:ring-slate-800/50 group-hover:ring-blue-600/10 transition-all duration-500 shadow-2xl">
							{imageUrl ? (
								<Image
									src={imageUrl}
									alt={fullName}
									fill
									className="object-cover group-hover:scale-110 transition-transform duration-700"
								/>
							) : (
								<div className="w-full h-full bg-linear-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white text-4xl font-black">
									{member.nombre?.charAt(0)}{member.apellido_paterno?.charAt(0)}
								</div>
							)}
						</div>
					</div>

					<h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
						{fullName}
					</h3>
					<p className="text-blue-600 dark:text-blue-400 font-black uppercase tracking-[0.2em] text-[10px] mb-8 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
						{member.puesto}
					</p>

					{/* Contact Info */}
					<div className="w-full space-y-4 text-left border-t border-slate-100 dark:border-slate-800 pt-6 mb-8 flex-1">
						{member.email && (
							<div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 group/link">
								<div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 group-hover/link:bg-blue-600 group-hover/link:text-white transition-colors">
									<Mail className="w-4 h-4" />
								</div>
								<span className="text-sm font-bold truncate">{member.email}</span>
							</div>
						)}
						{member.telefono && (
							<div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 group/link">
								<div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 group-hover/link:bg-blue-600 group-hover/link:text-white transition-colors">
									<Phone className="w-4 h-4" />
								</div>
								<span className="text-sm font-bold">{member.telefono}</span>
							</div>
						)}
					</div>

					{/* View Profile Button */}
					<button className="w-full py-4 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-blue-600 hover:text-white transition-all duration-300">
						Ver Perfil Completo
					</button>
				</div>
			</div>
			{/* Outer Glow */}
			<div className="absolute inset-0 rounded-[2.5rem] opacity-0 group-hover:opacity-100 blur-2xl bg-blue-600/5 -z-10 transition-opacity duration-500" />
		</motion.div>
	);
}

function CheckCircle(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}

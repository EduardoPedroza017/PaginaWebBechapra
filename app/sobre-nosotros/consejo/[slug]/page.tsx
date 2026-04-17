"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { TranslateText } from "@/components/TranslateText";
import Footer from "@/components/Footer";
import { Phone, Mail, ArrowLeft, Calendar, Briefcase, GraduationCap, User, Globe, Award, Building } from "lucide-react";
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
	carrera_estudiada?: string;
	linkedin?: string;
	activo: boolean;
}

export default function ProfilePage() {
	const params = useParams();
	const slug = params.slug as string;
	
	const [member, setMember] = useState<BoardMember | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Helper para generar el slug del nombre
	const generateSlug = (m: BoardMember): string => {
		const fullName = `${m.nombre} ${m.apellido_paterno} ${m.apellido_materno || ''}`.trim();
		return fullName
			.toLowerCase()
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.replace(/[^a-z0-9\s-]/g, '')
			.replace(/\s+/g, '-')
			.replace(/-+/g, '-')
			.trim();
	};

	useEffect(() => {
		const fetchMember = async () => {
			try {
				const response = await axios.get(
					`${process.env.NEXT_PUBLIC_API_URL}/api/board-members`
				);
				
				// Buscar el miembro que coincida con el slug
				const foundMember = response.data.find((m: BoardMember) => 
					generateSlug(m) === slug
				);
				
				if (foundMember) {
					setMember(foundMember);
				} else {
					setError("Perfil no encontrado");
				}
			} catch (err) {
				console.error("Error fetching member:", err);
				setError("Error al cargar el perfil");
			} finally {
				setLoading(false);
			}
		};

		if (slug) {
			fetchMember();
		}
	}, [slug]);

	// Helper para construir la URL de la imagen
	const getImageUrl = (): string | null => {
		if (!member) return null;
		if (member.foto_url) {
			return `${process.env.NEXT_PUBLIC_API_URL}${member.foto_url}`;
		}
		if (member.foto) {
			return `${process.env.NEXT_PUBLIC_API_URL}/uploads/${member.foto}`;
		}
		return null;
	};

	// Helper para obtener el nombre completo
	const getFullName = (): string => {
		if (!member) return '';
		return `${member.nombre} ${member.apellido_paterno} ${member.apellido_materno || ''}`.trim();
	};

	if (loading) {
		return (
			<div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-white to-blue-50 dark:from-gray-900 dark:to-blue-900/10">
				<div className="relative">
					<div className="w-20 h-20 rounded-full border-4 border-blue-100 dark:border-blue-800/50 border-t-blue-600 dark:border-t-blue-500 animate-spin mb-6"></div>
					<div className="absolute inset-0 flex items-center justify-center">
						<Building className="w-8 h-8 text-blue-600 dark:text-blue-400" />
					</div>
				</div>
				<p className="text-lg text-blue-700 dark:text-blue-300 mt-4 font-medium">Cargando perfil...</p>
			</div>
		);
	}

	if (error || !member) {
		return (
			<div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-white to-blue-50 dark:from-gray-900 dark:to-blue-900/10 px-4">
				<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md w-full border border-blue-100 dark:border-blue-800/30">
					<div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
						<User className="w-8 h-8 text-blue-600 dark:text-blue-400" />
					</div>
					<h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-3">
						{error || "Perfil no encontrado"}
					</h3>
					<p className="text-gray-600 dark:text-gray-400 text-center mb-6 text-sm">
						El perfil solicitado no está disponible en este momento.
					</p>
					<Link 
						href="/sobre-nosotros/consejo"
						className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
					>
						<ArrowLeft className="w-5 h-5" />
						<span>Volver al Consejo</span>
					</Link>
				</div>
			</div>
		);
	}

	const imageUrl = getImageUrl();
	const fullName = getFullName();

	return (
		<div className="min-h-screen bg-linear-to-b from-white to-blue-50 dark:from-gray-900 dark:to-blue-900/10">
			{/* Hero Section */}
			<section className="relative overflow-hidden">
				{/* Fondo corporativo */}
				<div className="absolute inset-0 bg-linear-to-br from-blue-50 via-white to-blue-100 dark:from-blue-900/20 dark:via-gray-900 dark:to-blue-900/10" />
				
				{/* Elementos decorativos abstractos */}
				<div className="absolute inset-0 overflow-hidden">
					<div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-200/20 dark:bg-blue-700/10 rounded-full blur-3xl" />
					<div className="absolute top-1/2 -left-24 w-96 h-96 bg-blue-300/10 dark:bg-blue-600/10 rounded-full blur-3xl" />
					<div className="absolute -bottom-24 right-1/3 w-96 h-96 bg-blue-100/30 dark:bg-blue-800/10 rounded-full blur-3xl" />
				</div>

				<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="flex flex-col lg:flex-row items-center gap-12"
					>
						{/* Imagen del perfil */}
						<div className="relative">
							{/* Anillo decorativo */}
							<motion.div
								initial={{ scale: 0.8, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								transition={{ duration: 0.8, delay: 0.2 }}
								className="absolute -inset-6 rounded-full border-4 border-blue-200/50 dark:border-blue-700/30"
							/>
							
							{/* Contenedor de imagen */}
							<div className="relative w-64 h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-8 border-white dark:border-gray-800 shadow-2xl">
								{imageUrl ? (
									<Image
										src={imageUrl}
										alt={fullName}
										width={320}
										height={320}
										className="w-full h-full object-cover"
										priority
									/>
								) : (
									<div className="w-full h-full bg-linear-to-br from-blue-600 to-blue-800 flex flex-col items-center justify-center text-white">
										<User className="w-20 h-20 mb-2" />
										<p className="text-2xl font-bold">
											{member.nombre?.charAt(0)}{member.apellido_paterno?.charAt(0)}
										</p>
									</div>
								)}
							</div>

							{/* Status indicator con diseño corporativo */}
							{member.activo && (
								<div className="absolute bottom-6 right-6">
									<div className="relative">
										<div className="w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-gray-800 shadow-lg" />
										<div className="absolute inset-0 animate-ping bg-green-400 rounded-full opacity-75"></div>
									</div>
								</div>
							)}

							{/* Badge de posición */}
							<div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
								<div className="px-6 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold shadow-lg whitespace-nowrap">
									{member.puesto.split(',')[0]}
								</div>
							</div>
						</div>

						{/* Información básica */}
						<div className="flex-1 text-center lg:text-left">
							{/* Breadcrumb */}
							<div className="flex items-center justify-center lg:justify-start gap-2 text-sm text-blue-600 dark:text-blue-400 mb-4">
								<Link href="/" className="hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
									Inicio
								</Link>
								<span>›</span>
								<Link href="/sobre-nosotros/consejo" className="hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
									Consejo
								</Link>
								<span>›</span>
								<span className="text-blue-800 dark:text-blue-300 font-medium">{fullName}</span>
							</div>

							<h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
								{fullName}
							</h1>
							
							<p className="text-xl lg:text-2xl text-blue-700 dark:text-blue-300 font-semibold mb-8">
								{member.puesto}
							</p>
							
							{/* Información rápida */}
							<div className="flex flex-wrap justify-center lg:justify-start gap-3">
								{member.edad && (
									<div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 px-4 py-2.5 rounded-xl border border-blue-100 dark:border-blue-800/50">
										<Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
										<span className="font-medium text-blue-800 dark:text-blue-300">{member.edad} años</span>
									</div>
								)}
								
								{member.carrera_estudiada && (
									<div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 px-4 py-2.5 rounded-xl border border-blue-100 dark:border-blue-800/50">
										<GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
										<span className="font-medium text-blue-800 dark:text-blue-300">{member.carrera_estudiada}</span>
									</div>
								)}
								
								{member.linkedin && (
									<a
										href={member.linkedin}
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2.5 rounded-xl text-white transition-colors"
									>
										<Globe className="w-5 h-5" />
										<span className="font-medium">LinkedIn</span>
									</a>
								)}
							</div>

							{/* Descripción breve */}
							{member.descripcion && (
								<div className="mt-8 max-w-2xl">
									<p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
										{member.descripcion}
									</p>
								</div>
							)}
						</div>
					</motion.div>
				</div>
			</section>

			{/* Sección de detalles */}
			<section className="py-16 relative">
				<div className="absolute inset-0 bg-linear-to-b from-transparent via-blue-50/50 to-blue-100/30 dark:from-transparent dark:via-blue-900/5 dark:to-blue-900/10" />
				
				<div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						{/* Columna de información de contacto */}
						<motion.div
							initial={{ opacity: 0, x: -30 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true, margin: "-100px" }}
							transition={{ duration: 0.5 }}
							className="lg:col-span-1"
						>
							<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-blue-100 dark:border-blue-800/30">
								<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 pb-4 border-b border-blue-100 dark:border-blue-800/30 flex items-center gap-3">
									<div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
										<User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
									</div>
									<span>Información de Contacto</span>
								</h3>
								
								<div className="space-y-6">
									{member.email && (
										<div className="group">
											<div className="flex items-center gap-3">
												<div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
													<Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
												</div>
												<div>
													<p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</p>
													<a 
														href={`mailto:${member.email}`}
														className="text-base font-medium text-blue-700 dark:text-blue-300 group-hover:text-blue-800 dark:group-hover:text-blue-200 transition-colors truncate block"
														title={member.email}
													>
														{member.email}
													</a>
												</div>
											</div>
										</div>
									)}
									
									{member.telefono && (
										<div className="group">
											<div className="flex items-center gap-3">
												<div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
													<Phone className="w-6 h-6 text-blue-600 dark:text-blue-400" />
												</div>
												<div>
													<p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Teléfono</p>
													<a 
														href={`tel:${member.telefono}`}
														className="text-base font-medium text-blue-700 dark:text-blue-300 group-hover:text-blue-800 dark:group-hover:text-blue-200 transition-colors"
													>
														{member.telefono}
													</a>
												</div>
											</div>
										</div>
									)}
									
									{member.puesto && (
										<div>
											<div className="flex items-center gap-3">
												<div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
													<Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
												</div>
												<div>
													<p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Cargo Actual</p>
													<p className="text-base font-medium text-gray-900 dark:text-white">
														{member.puesto}
													</p>
												</div>
											</div>
										</div>
									)}

									{member.carrera_estudiada && (
										<div>
											<div className="flex items-center gap-3">
												<div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
													<Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />
												</div>
												<div>
													<p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Formación</p>
													<p className="text-base font-medium text-gray-900 dark:text-white">
														{member.carrera_estudiada}
													</p>
												</div>
											</div>
										</div>
									)}
								</div>

								{/* Botón de contacto rápido */}
								{(member.email || member.telefono) && (
									<div className="mt-8 pt-6 border-t border-blue-100 dark:border-blue-800/30">
										<a
											href={`mailto:${member.email || ''}?subject=Consulta%20Profesional`}
											className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
										>
											<Mail className="w-5 h-5" />
											Contactar
										</a>
									</div>
								)}
							</div>
						</motion.div>

						{/* Columna de biografía */}
						<motion.div
							initial={{ opacity: 0, x: 30 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true, margin: "-100px" }}
							transition={{ duration: 0.5, delay: 0.1 }}
							className="lg:col-span-2"
						>
							<div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-blue-100 dark:border-blue-800/30 h-full">
								<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-8 pb-4 border-b border-blue-100 dark:border-blue-800/30 flex items-center gap-3">
									<div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
										<Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
									</div>
									<span>Perfil Profesional</span>
								</h3>
								
								{member.biografia || member.descripcion ? (
									<div className="prose prose-lg dark:prose-invert max-w-none">
										<p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap text-justify">
											{member.biografia || member.descripcion}
										</p>
									</div>
								) : (
									<div className="text-center py-12">
										<div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
											<User className="w-10 h-10 text-blue-600 dark:text-blue-400" />
										</div>
										<p className="text-gray-500 dark:text-gray-400 italic">
											No hay información biográfica disponible en este momento.
										</p>
									</div>
								)}

								{/* Experiencia destacada o logros */}
								{member.descripcion && member.descripcion.length > 200 && (
									<div className="mt-10 pt-8 border-t border-blue-100 dark:border-blue-800/30">
										<h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Resumen de Experiencia</h4>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-800/30">
												<p className="text-sm text-blue-700 dark:text-blue-300 font-semibold">Años de Experiencia</p>
												<p className="text-2xl font-bold text-blue-800 dark:text-blue-200 mt-2">
													{member.edad ? Math.max(member.edad - 25, 10) : '15'}+
												</p>
											</div>
											<div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-800/30">
												<p className="text-sm text-blue-700 dark:text-blue-300 font-semibold">Especialidad</p>
												<p className="text-lg font-semibold text-gray-900 dark:text-white mt-2">
													{member.puesto.split(',')[0]}
												</p>
											</div>
										</div>
									</div>
								)}
							</div>
						</motion.div>
					</div>

					{/* Botón de regreso principal */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="mt-12 text-center"
					>
						<Link 
							href="/web/sobre-nosotros/consejo/"
							className="inline-flex items-center gap-3 px-8 py-4 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-blue-200 dark:border-blue-700/30 hover:border-blue-300 dark:hover:border-blue-600/50"
						>
							<ArrowLeft className="w-5 h-5" />
							<span>Volver al Consejo Directivo</span>
						</Link>
					</motion.div>
				</div>
			</section>

			<Footer />
		</div>
	);
};

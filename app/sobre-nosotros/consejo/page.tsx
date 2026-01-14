"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { TranslateText } from "@/components/TranslateText";
import Footer from "@/components/Footer";
import { Linkedin, Mail, ArrowRight } from "lucide-react";

const boardMembers = [
	{
		name: "Juan Pérez",
		role: "Executive President",
		image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
		description:
			"Juan Pérez has over 20 years of experience in business leadership and has been key to the organization's growth.",
		profileLink: "/about-us/board/juan-perez",
		linkedin: "#",
		email: "juan.perez@company.com",
	},
	{
		name: "María López",
		role: "Chief Financial Officer",
		image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
		description:
			"María López is an expert in corporate finance and has led major financial transformation projects.",
		profileLink: "/about-us/board/maria-lopez",
		linkedin: "#",
		email: "maria.lopez@company.com",
	},
	{
		name: "Carlos García",
		role: "Chief Operations Officer",
		image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
		description:
			"Carlos García has extensive experience in operations management and business process optimization.",
		profileLink: "/about-us/board/carlos-garcia",
		linkedin: "#",
		email: "carlos.garcia@company.com",
	},
	{
		name: "Ana Torres",
		role: "Human Resources Manager",
		image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
		description:
			"Ana Torres specializes in human talent management and organizational development.",
		profileLink: "/about-us/board/ana-torres",
		linkedin: "#",
		email: "ana.torres@company.com",
	},
	{
		name: "Luis Martínez",
		role: "Chief Technology Officer",
		image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
		description:
			"Luis Martínez leads technological innovation and the company's digital transformation.",
		profileLink: "/about-us/board/luis-martinez",
		linkedin: "#",
		email: "luis.martinez@company.com",
	},
	{
		name: "Patricia Ruiz",
		role: "Chief Marketing Officer",
		image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop",
		description:
			"Patricia Ruiz drives digital marketing strategies and brand positioning.",
		profileLink: "/about-us/board/patricia-ruiz",
		linkedin: "#",
		email: "patricia.ruiz@company.com",
	},
];

export default function BoardPage() {
	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900">
			{/* Hero Section */}
			<section
				className="relative bg-cover bg-center text-white py-32 overflow-hidden"
				style={{ backgroundImage: "url('/image/hero/Flayers_Home_01100.jpg')" }}
			>
				{/* Dark overlay for better readability */}
				<div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/30 to-black/50" />
				
				{/* Decorative elements */}
				<div className="absolute inset-0 opacity-20">
					<div className="absolute top-10 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
					<div className="absolute bottom-10 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
				</div>

				<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						<span className="inline-block px-6 py-2 bg-blue-600/80 backdrop-blur-sm rounded-full text-sm font-semibold mb-6 shadow-lg">
							Leadership
						</span>
						<h1 className="text-5xl sm:text-6xl font-bold mb-6 drop-shadow-2xl">
							<TranslateText text="Our Board" />
						</h1>
						<p className="text-xl text-white max-w-3xl mx-auto drop-shadow-lg">
							<TranslateText text="Meet the leaders guiding our organization towards success." />
						</p>
					</motion.div>
				</div>
			</section>

			{/* Board Members Section */}
			<section className="py-20 bg-white dark:bg-gray-800">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					{/* Section Header */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="text-center mb-16"
					>
						<h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
							Executive Team
						</h2>
						<p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
							Professionals with extensive experience committed to excellence and innovation
						</p>
					</motion.div>

					{/* Members Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{boardMembers.map((member, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								className="group relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-800"
							>
								{/* Gradient border on hover */}
								<div className="absolute inset-0 bg-linear-to-br from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" 
									style={{ padding: '2px' }}
								/>
								
								<div className="relative bg-white dark:bg-gray-900 rounded-2xl p-8 m-0.5">
									{/* Image Container */}
									<div className="relative mb-6">
										<div className="w-32 h-32 mx-auto rounded-full overflow-hidden ring-4 ring-blue-100 dark:ring-blue-900/50 group-hover:ring-blue-500 transition-all duration-300 shadow-xl">
											<Image
												src={member.image}
												alt={member.name}
												width={128}
												height={128}
												className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
											/>
										</div>
										{/* Status indicator */}
										<div className="absolute bottom-2 right-1/2 translate-x-16 w-4 h-4 bg-green-500 rounded-full ring-4 ring-white dark:ring-gray-900 shadow-lg" />
									</div>

									{/* Info */}
									<div className="text-center mb-6">
										<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
											{member.name}
										</h3>
										<p className="text-blue-600 dark:text-blue-400 font-semibold text-sm mb-4">
											{member.role}
										</p>
										<p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
											{member.description}
										</p>
									</div>

									{/* Social Links */}
									<div className="flex items-center justify-center gap-3 mb-6">
										<a
											href={member.linkedin}
											className="p-2.5 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-all duration-200 transform hover:scale-110"
											aria-label="LinkedIn"
										>
											<Linkedin className="w-4 h-4" />
										</a>
										<a
											href={`mailto:${member.email}`}
											className="p-2.5 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-all duration-200 transform hover:scale-110"
											aria-label="Email"
										>
											<Mail className="w-4 h-4" />
										</a>
									</div>

									{/* Profile Link */}
									<a
										href={member.profileLink}
										className="flex items-center justify-center gap-2 w-full py-3 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 group/btn"
									>
										View Full Profile
										<ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
									</a>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 bg-linear-to-r from-blue-800 via-blue-800 to-blue-900 dark:from-blue-900 dark:via-blue-950 dark:to-slate-950 relative overflow-hidden">
				{/* Decorative elements */}
				<div className="absolute inset-0 opacity-10">
					<div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
					<div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-300 rounded-full blur-3xl" />
				</div>

				<div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
					>
						<h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
							Do you want to know more about us?
						</h2>
						<p className="text-blue-50 mb-8 text-lg">
							Discover our history, values, and vision for the future
						</p>
						<a
							href="/about-us"
							className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
						>
							Learn More
							<ArrowRight className="w-5 h-5" />
						</a>
					</motion.div>
				</div>
			</section>

			{/* Footer */}
			<Footer />
		</div>
	);
}
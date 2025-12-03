"use client";

import { useEffect, useState, useCallback } from "react";
import { Sidebar } from "../dashboard/Sidebar";
import { Header } from "../dashboard/Header";
import { TranslateText } from "@/components/TranslateText";
import { Newspaper, RefreshCw } from "lucide-react";
import NewsFilter, { NewsItem } from "./NewsFilter";
import NewsChart from "./NewsChart";
import NewsForm from "./NewsForm";
import NewsTable from "./NewsTable";
import NewsEditModal from "./NewsEditModal";
import { NewsStats } from "./NewsStats";
import { DeleteNewsModal } from "./DeleteNewsModal";

export default function AdminNewsPage() {
	const [news, setNews] = useState<NewsItem[]>([]);
	const [filtered, setFiltered] = useState<NewsItem[]>([]);
	const [theme, setTheme] = useState<'light' | 'dark'>('light');
	const [mounted, setMounted] = useState(false);
	const [editing, setEditing] = useState<NewsItem | null>(null);
	const [deleting, setDeleting] = useState<NewsItem | null>(null);
	const [deleteLoading, setDeleteLoading] = useState(false);
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);

	useEffect(() => {
		setMounted(true);
		if (typeof window !== 'undefined') {
			const savedTheme = localStorage.getItem('theme');
			if (savedTheme === 'dark' || savedTheme === 'light') {
				setTheme(savedTheme);
			}
		}
	}, []);

	const fetchNews = useCallback(async (showRefresh = false) => {
		if (showRefresh) setRefreshing(true);
		try {
			const res = await fetch("http://localhost:5000/api/news");
			const data = await res.json();
			setNews(data);
			setFiltered(data);
		} catch (error) {
			console.error("Error fetching news:", error);
		} finally {
			setLoading(false);
			setRefreshing(false);
		}
	}, []);

	useEffect(() => {
		fetchNews();
	}, [fetchNews]);

	function handleFilter(filtered: NewsItem[]) {
		setFiltered(filtered);
	}

	function handleCreated(newItem: NewsItem) {
		setNews(prev => [newItem, ...prev]);
		setFiltered(prev => [newItem, ...prev]);
	}

	function handleEdit(item: NewsItem) {
		setEditing(item);
	}

	function handleUpdated(updated: NewsItem) {
		setNews(prev => prev.map(n => n.title === updated.title ? updated : n));
		setFiltered(prev => prev.map(n => n.title === updated.title ? updated : n));
	}

	function handleDeleteClick(item: NewsItem) {
		setDeleting(item);
	}

	async function confirmDelete() {
		if (!deleting) return;
		setDeleteLoading(true);
		
		const userEmail = typeof window !== "undefined" ? sessionStorage.getItem("user_email") : null;
		try {
			const res = await fetch(`http://localhost:5000/api/news/${encodeURIComponent(deleting.title)}`, {
				method: "DELETE",
				headers: {
					...(userEmail ? { "X-User": userEmail } : {})
				},
				credentials: 'include',
			});
			if (res.ok) {
				setNews(prev => prev.filter(n => n.title !== deleting.title));
				setFiltered(prev => prev.filter(n => n.title !== deleting.title));
			}
		} catch (error) {
			console.error("Error deleting:", error);
		} finally {
			setDeleteLoading(false);
			setDeleting(null);
		}
	}

	const handleLogout = () => {
		sessionStorage.removeItem("admin");
		sessionStorage.removeItem("role");
		window.location.href = "/admin";
	};

	const handleToggleTheme = () => {
		const newTheme = theme === 'dark' ? 'light' : 'dark';
		localStorage.setItem('theme', newTheme);
		setTheme(newTheme);
	};

	if (!mounted) return null;

	return (
		<div className={`flex min-h-screen ${
			theme === 'dark' ? 'bg-gray-950' : 'bg-gradient-to-br from-blue-50 to-indigo-100'
		}`}>
			<Sidebar selected="/admin/news" theme={theme} />
			<div className="flex-1 flex flex-col">
				<Header theme={theme} onLogout={handleLogout} onToggleTheme={handleToggleTheme} />
				<main className="flex-1 p-4 md:p-6 lg:p-8">
					{/* Header */}
					<div className="mb-6 md:mb-8">
						<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
							<div className="flex items-center gap-3">
								<div className={`p-3 rounded-2xl ${
									theme === "dark" ? "bg-purple-600 shadow-lg shadow-purple-500/30" : "bg-purple-600 shadow-lg shadow-purple-500/20"
								}`}>
									<Newspaper className="text-white" size={28} />
								</div>
								<div>
									<h1 className={`text-2xl md:text-3xl font-bold ${
										theme === "dark" ? "text-white" : "text-gray-900"
									}`}>
										<TranslateText text="Gestión de Noticias" />
									</h1>
									<p className={`text-sm ${
										theme === "dark" ? "text-gray-400" : "text-gray-600"
									}`}>
										<TranslateText text="Crea, edita y elimina noticias" />
									</p>
								</div>
							</div>
							
							<button
								onClick={() => fetchNews(true)}
								disabled={refreshing}
								className={`p-2.5 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 ${
									theme === "dark"
										? "bg-gray-800 hover:bg-gray-700 text-gray-300"
										: "bg-white hover:bg-gray-50 text-gray-700 shadow-sm"
								}`}
								title="Refrescar"
							>
								<RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
							</button>
						</div>
					</div>

					{/* Stats */}
					<div className="mb-6">
						<NewsStats news={news} filtered={filtered} theme={theme} />
					</div>

					{/* Form */}
					<div className="mb-6">
						<NewsForm onCreated={handleCreated} theme={theme} />
					</div>

					{/* Filtros y Gráfico */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
						<NewsFilter news={news} onFilter={handleFilter} theme={theme} />
						<NewsChart data={filtered} theme={theme} />
					</div>

					{/* Tabla */}
					<NewsTable 
						news={filtered} 
						onEdit={handleEdit} 
						onDelete={handleDeleteClick} 
						theme={theme} 
					/>

					{/* Modals */}
					<NewsEditModal 
						open={!!editing} 
						item={editing} 
						onClose={() => setEditing(null)} 
						onUpdated={handleUpdated} 
						theme={theme} 
					/>
					
					<DeleteNewsModal
						isOpen={!!deleting}
						newsTitle={deleting?.title || null}
						theme={theme}
						loading={deleteLoading}
						onClose={() => setDeleting(null)}
						onConfirm={confirmDelete}
					/>
				</main>
			</div>
		</div>
	);
}

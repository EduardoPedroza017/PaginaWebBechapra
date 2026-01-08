"use client";

import { useEffect, useState, useCallback } from "react";
import { Sidebar } from "../dashboard/Sidebar";
import { Header } from "../dashboard/Header";
import { TranslateText } from "@/components/TranslateText";
import { Newspaper, RefreshCw } from "lucide-react";
import NewsFilter, { NewsItem } from "./NewsFilter";
import NewsChart from "./NewsChart";
import NewsForm from "./NewsForm";
import { NewsCardList } from "./NewsCardList";
import NewsPreviewModal from "./NewsPreviewModal";
import NewsEditModal from "./NewsEditModal";
import { NewsStats } from "./NewsStats";
import { DeleteNewsModal } from "./DeleteNewsModal";


	export default function AdminNewsPage() {
		const [news, setNews] = useState<NewsItem[]>([]);
		const [theme, setTheme] = useState<'light' | 'dark'>('light');
		const [mounted, setMounted] = useState(false);
		const [editing, setEditing] = useState<NewsItem | null>(null);
		const [deleting, setDeleting] = useState<NewsItem | null>(null);
		const [previewing, setPreviewing] = useState<NewsItem | null>(null);
		const [deleteLoading, setDeleteLoading] = useState(false);
		const [loading, setLoading] = useState(true);
		const [refreshing, setRefreshing] = useState(false);
		const [page, setPage] = useState(1);
		const [totalPages, setTotalPages] = useState(1);
		const [total, setTotal] = useState(0);
		const [search, setSearch] = useState("");
		const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
		const pageSize = 12;
		const [activeTab, setActiveTab] = useState<'list' | 'create' | 'stats'>('list');

		useEffect(() => {
			setMounted(true);
			if (typeof window !== 'undefined') {
				const savedTheme = localStorage.getItem('theme');
				if (savedTheme === 'dark' || savedTheme === 'light') {
					setTheme(savedTheme);
				}
			}
		}, []);

		const fetchNews = useCallback(async (params: { page?: number; search?: string; showRefresh?: boolean } = {}) => {
			const { page: pageParam = page, search: searchParam = search, showRefresh = false } = params;
			if (showRefresh) setRefreshing(true);
			setLoading(true);
			try {
				const url = new URL("http://localhost:5000/api/news");
				url.searchParams.append("page", String(pageParam));
				url.searchParams.append("limit", String(pageSize));
				if (searchParam) url.searchParams.append("search", searchParam);
				const res = await fetch(url.toString());
				const data = await res.json();
				// Support two backend shapes:
				// - legacy admin route: { ok: true, news: [...] }
				// - paginated API: { items: [...], total, total_pages, page, per_page }
				const normalize = (arr: any[]) => arr.map(it => ({
					// Map backend fields to frontend `NewsItem` shape expectations
					...it,
					date: it.date || it.published_date || it.publishedDate || it.createdAt || it.date || undefined,
					title: it.title || it.name || '',
					subtitle: it.subtitle || '',
					description: it.description || it.content || it.excerpt || ''
				}));

				if (Array.isArray(data.news)) {
					setNews(normalize(data.news || []));
					setTotal((data.news && data.news.length) || 0);
					setTotalPages(1);
					setPage(1);
				} else if (Array.isArray(data.items)) {
					setNews(normalize(data.items || []));
					setTotal(data.total || 0);
					setTotalPages(data.total_pages || data.totalPages || 1);
					setPage(data.page || 1);
				} else {
					// Fallback: try common keys
					setNews(normalize(data.news || data.items || []));
					setTotal(data.total || (data.news && data.news.length) || 0);
					setTotalPages(data.total_pages || data.totalPages || 1);
					setPage(data.page || 1);
				}
			} catch (error) {
				console.error("Error fetching news:", error);
			} finally {
				setLoading(false);
				setRefreshing(false);
			}
		}, [page, search]);

		useEffect(() => {
			fetchNews();
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [page, search]);

		// Nuevo: manejar búsqueda desde filtro

		const handleFilter = (filtered: NewsItem[], searchValue?: string) => {
			if (typeof searchValue === "string") {
				setSearch(searchValue);
				setPage(1);
				fetchNews({ page: 1, search: searchValue });
			}
		};

		const handleCreated = (newItem: NewsItem) => {
			fetchNews({ page: 1 });
		};

		const handleEdit = (item: NewsItem) => {
			setEditing(item);
		};

		const handleUpdated = (updated: NewsItem) => {
			fetchNews();
		};

		const handleDeleteClick = (item: NewsItem) => {
			setDeleting(item);
		};

		const confirmDelete = async () => {
			if (!deleting) return;
			setDeleteLoading(true);
			const userEmail = typeof window !== "undefined" ? sessionStorage.getItem("user_email") : null;
			const admin = typeof window !== "undefined" ? sessionStorage.getItem("admin") : null;
			const role = typeof window !== "undefined" ? sessionStorage.getItem("role") : null;
			try {
				const identifier = deleting.slug || deleting._id || deleting.title;
				const res = await fetch(`http://localhost:5000/api/news/${encodeURIComponent(identifier)}`, {
					method: "DELETE",
					headers: {
						...(userEmail ? { "X-User": userEmail } : {}),
						...(admin ? { "X-Admin": admin } : {}),
						...(role ? { "X-Role": role } : {})
					},
					credentials: 'include',
				});
				if (res.ok) {
					fetchNews();
				}
			} catch (error) {
				console.error("Error deleting:", error);
			} finally {
				setDeleteLoading(false);
				setDeleting(null);
			}
		};

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

		const handleToggleStatus = async (item: NewsItem) => {
			try {
				const updatedStatus = item.status === 'active' ? 'inactive' : 'active';
				const storedUser = typeof window !== 'undefined' ? sessionStorage.getItem('user_email') : null;
				const storedRole = typeof window !== 'undefined' ? sessionStorage.getItem('role') : null;
				const storedAdmin = typeof window !== 'undefined' ? sessionStorage.getItem('admin') : null;
				const headers: Record<string, string> = { 'Content-Type': 'application/json' };
				if (storedUser) headers['X-User'] = storedUser;
				if (storedRole) headers['X-Role'] = storedRole;
				if (storedAdmin) headers['X-Admin'] = storedAdmin;

				// Prefer using `slug` or `_id` if available to avoid encoding/spacing issues. Fallback to trimmed title.
				const identifier = item.slug || item._id || item.title;
				const encodedId = encodeURIComponent(identifier);
				const res = await fetch(`http://localhost:5000/api/news/${encodedId}`, {
					method: 'PUT',
					headers,
					credentials: 'include',
					body: JSON.stringify({ status: updatedStatus }),
				});

				if (res.ok) {
					fetchNews();
				} else {
					console.error('Failed to update status');
				}
			} catch (error) {
				console.error('Error toggling status:', error);
			}
		};

		if (!mounted) return null;

		const filteredNews = news.filter(n => {
			if (statusFilter === 'all') return true;
			if (statusFilter === 'active') return n.status === 'active';
			return n.status !== 'active';
		});

		return (
			<div className={`flex min-h-screen ${
				theme === 'dark' ? 'bg-gray-950' : 'bg-linear-to-br from-blue-50 to-indigo-100'
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
									onClick={() => fetchNews({ showRefresh: true })}
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

			{/* Tabs: Listado | Crear | Estadísticas | Filtros */}
			<div className="mb-6">
				<div className="rounded-xl border p-2 flex gap-2 bg-transparent">
					{[
						{ id: 'list', label: 'Listado' },
						{ id: 'create', label: 'Crear' },
						{ id: 'stats', label: 'Estadísticas' }
					].map(tab => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id as any)}
							className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${activeTab === tab.id ? 'bg-blue-600 text-white' : theme === 'dark' ? 'text-gray-300 bg-gray-800/30' : 'text-gray-600 bg-white'}`}
						>
							{tab.label}
						</button>
					))}
				</div>
			</div>

			{/* Tab content */}
			{activeTab === 'stats' && (
				<div className="mb-6">
					<NewsStats news={news} filtered={news} theme={theme} />
					<div className="mt-6">
						<NewsChart data={news} theme={theme} />
					</div>
				</div>
			)}

			{activeTab === 'create' && (
				<div className="mb-6">
					<NewsForm onCreated={handleCreated} theme={theme} />
				</div>
			)}

			{activeTab === 'list' && (
				<>
					{/* Filtros (dentro del listado) */}
					<div className="mb-4">
						<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
							<NewsFilter news={news} onFilter={handleFilter} theme={theme} />
							{/* Status tabs: All / Active / Inactive */}
							<div className="mt-3 sm:mt-0">
								<div className="rounded-xl border p-1 flex gap-1 bg-transparent">
									{[
										{ id: 'all', label: 'Todas' },
										{ id: 'active', label: 'Activas' },
										{ id: 'inactive', label: 'Desactivadas' }
									].map(tab => (
										<button
											key={tab.id}
											onClick={() => setStatusFilter(tab.id as any)}
											className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${statusFilter === tab.id ? 'bg-blue-600 text-white' : theme === 'dark' ? 'text-gray-300 bg-gray-800/20' : 'text-gray-600 bg-white'}`}
										>
											{tab.label}
										</button>
									))}
								</div>
							</div>
						</div>
					</div>
					{/* Cards de noticias (filtradas por status) */}
						<NewsCardList
							news={filteredNews}
						theme={theme}
						onEdit={handleEdit}
						onDelete={handleDeleteClick}
						onPreview={setPreviewing}
						onToggleStatus={handleToggleStatus}
					/>
					{/* Paginador */}
					{totalPages > 1 && (
						<div className="flex justify-center mt-8 gap-2">
							<button
								onClick={() => { if (page > 1) setPage(page - 1); }}
								disabled={page === 1}
								className={`px-3 py-1 rounded-lg text-sm font-medium ${page === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>
								Anterior</button>
							<span className="px-3 py-1 text-sm font-medium text-gray-500">Página {page} de {totalPages} ({total} noticias)</span>
							<button
								onClick={() => { if (page < totalPages) setPage(page + 1); }}
								disabled={page === totalPages}
								className={`px-3 py-1 rounded-lg text-sm font-medium ${page === totalPages ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>
								Siguiente</button>
							</div>
						)}
				</>
			)}
						{/* Paginador */}
						{totalPages > 1 && (
							<div className="flex justify-center mt-8 gap-2">
								<button
									onClick={() => { if (page > 1) setPage(page - 1); }}
									disabled={page === 1}
									className={`px-3 py-1 rounded-lg text-sm font-medium ${page === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
								>Anterior</button>
								<span className="px-3 py-1 text-sm font-medium text-gray-500">Página {page} de {totalPages} ({total} noticias)</span>
								<button
									onClick={() => { if (page < totalPages) setPage(page + 1); }}
									disabled={page === totalPages}
									className={`px-3 py-1 rounded-lg text-sm font-medium ${page === totalPages ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
								>Siguiente</button>
							</div>
						)}

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
						<NewsPreviewModal
							open={!!previewing}
							onClose={() => setPreviewing(null)}
							news={previewing}
							theme={theme}
						/>
					</main>
				</div>
			</div>
		);
	}

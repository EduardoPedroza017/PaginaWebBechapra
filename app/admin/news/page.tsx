"use client";

import { useEffect, useState, useCallback } from "react";

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
import AdminPageShell from "@/app/admin/components/layout/AdminPageShell";


	export default function AdminNewsPage() {
		const [news, setNews] = useState<NewsItem[]>([]);
		const [theme, setTheme] = useState<'light' | 'dark'>('light');
		const [mounted, setMounted] = useState(false);
		const [editing, setEditing] = useState<NewsItem | null>(null);
		const [deleting, setDeleting] = useState<NewsItem | null>(null);
		const [previewing, setPreviewing] = useState<NewsItem | null>(null);
		const [deleteLoading, setDeleteLoading] = useState(false);
		const [refreshing, setRefreshing] = useState(false);
		const [page, setPage] = useState(1);
		const [totalPages, setTotalPages] = useState(1);
		const [total, setTotal] = useState(0);
		const [search, setSearch] = useState("");
		const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
		const [activeTab, setActiveTab] = useState<'list' | 'create' | 'stats'>('list');
		const [loading, setLoading] = useState(false);

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
				const API = process.env.NEXT_PUBLIC_API_URL;
				const res = await fetch(`${API}/api/news?page=${pageParam}&search=${searchParam}`, { credentials: 'include' });
				const data = await res.json();
				// Support two backend shapes:
				// - legacy admin route: { ok: true, news: [...] }
				// - paginated API: { items: [...], total, total_pages, page, per_page }
				const normalize = (arr: unknown[]) => arr.map((itRaw) => {
					const it = (itRaw || {}) as Record<string, unknown>;
					const date = typeof it.date === 'string'
						? it.date as string
						: typeof it.published_date === 'string'
						? it.published_date as string
						: typeof it.publishedDate === 'string'
						? it.publishedDate as string
						: typeof it.createdAt === 'string'
						? it.createdAt as string
						: undefined;
					const title = (it.title ?? it.name ?? '') as string;
					const subtitle = (it.subtitle ?? '') as string;
					const description = (it.description ?? it.content ?? it.excerpt ?? '') as string;
					return {
						...it,
						date,
						title,
						subtitle,
						description,
					} as NewsItem;
				});

				const payload = data as Record<string, unknown>;
				if (Array.isArray(payload.news)) {
					setNews(normalize((payload.news as unknown[]) || []));
					setTotal(((payload.news as unknown[])?.length) || 0);
					setTotalPages(1);
					setPage(1);
				} else if (Array.isArray(payload.items)) {
					setNews(normalize((payload.items as unknown[]) || []));
					setTotal((payload.total as number) || 0);
					setTotalPages((payload.total_pages as number) || (payload.totalPages as number) || 1);
					setPage((payload.page as number) || 1);
				} else {
					// Fallback: try common keys
					setNews(normalize((payload.news as unknown[]) || (payload.items as unknown[]) || []));
					setTotal((payload.total as number) || (((payload.news as unknown[])?.length) || 0));
					setTotalPages((payload.total_pages as number) || (payload.totalPages as number) || 1);
					setPage((payload.page as number) || 1);
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

		const handleCreated = () => {
			fetchNews({ page: 1 });
		};

		const handleEdit = (item: NewsItem) => {
			setEditing(item);
		};

		const handleUpdated = () => {
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
				// Define the API URL from the environment variable
				const apiUrl = process.env.NEXT_PUBLIC_API_URL;
				if (!apiUrl) {
					throw new Error("NEXT_PUBLIC_API_URL is not defined");
				}

				const identifier = deleting.slug || deleting._id || deleting.title;
				const res = await fetch(`${apiUrl}/api/news/${encodeURIComponent(identifier)}`, {
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

				// Define the API URL from the environment variable
				const apiUrl = process.env.NEXT_PUBLIC_API_URL;
				if (!apiUrl) {
					throw new Error("NEXT_PUBLIC_API_URL is not defined");
				}

				// Prefer using `slug` or `_id` if available to avoid encoding/spacing issues. Fallback to trimmed title.
				const identifier = item.slug || item._id || item.title;
				const encodedId = encodeURIComponent(identifier);
				const res = await fetch(`${apiUrl}/api/news/${encodedId}`, {
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

		const tabOptions: { id: 'list' | 'create' | 'stats'; label: string }[] = [
			{ id: 'list', label: 'Listado' },
			{ id: 'create', label: 'Crear' },
			{ id: 'stats', label: 'Estadísticas' }
		];

		const statusOptions: { id: 'all' | 'active' | 'inactive'; label: string }[] = [
			{ id: 'all', label: 'Todas' },
			{ id: 'active', label: 'Activas' },
			{ id: 'inactive', label: 'Desactivadas' }
		];

		return (
			<AdminPageShell containerClassName={`flex min-h-screen ${
				theme === 'dark' ? 'bg-gray-950' : 'bg-linear-to-br from-blue-50 to-indigo-100'
			}`}>
				<main className="flex-1 p-4 md:p-6 lg:p-8">
					{/* Header */}
					<div className="mb-6 md:mb-8">
						<div className="flex flex-wrap sm:flex-nowrap sm:items-center sm:justify-between gap-4">
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
								disabled={refreshing || loading}
								className={`p-2.5 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 ${
									theme === "dark"
										? "bg-gray-800 hover:bg-gray-700 text-gray-300"
										: "bg-white hover:bg-gray-50 text-gray-700 shadow-sm"
								}`}
								title="Refrescar"
							>
								<RefreshCw className={`w-5 h-5 ${refreshing || loading ? 'animate-spin' : ''}`} />
							</button>
						</div>
					</div>

					{/* Stats */}

			{/* Tabs: Listado | Crear | Estadísticas | Filtros */}
			<div className="mb-6">
				<div className="rounded-xl border p-2 flex gap-2 bg-transparent">
					{tabOptions.map(tab => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
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
									{statusOptions.map(tab => (
										<button
											key={tab.id}
											onClick={() => setStatusFilter(tab.id)}
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
			</AdminPageShell>
		);
	}


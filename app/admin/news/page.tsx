"use client";
import { useEffect, useState } from "react";
import { Sidebar } from "../dashboard/Sidebar";
import { Header } from "../dashboard/Header";
import { TranslateText } from "@/components/TranslateText";
import NewsFilter, { NewsItem } from "./NewsFilter";
import NewsChart from "./NewsChart";
import NewsForm from "./NewsForm";
import NewsTable from "./NewsTable";
import NewsEditModal from "./NewsEditModal";

export default function AdminNewsPage() {
	const [news, setNews] = useState<NewsItem[]>([]);
	const [filtered, setFiltered] = useState<NewsItem[]>([]);
	const [theme, setTheme] = useState<'light'|'dark'>('light');
	const [mounted, setMounted] = useState(false);
	const [editing, setEditing] = useState<NewsItem|null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		requestAnimationFrame(() => setMounted(true));
		if (typeof window !== 'undefined') {
			const savedTheme = localStorage.getItem('theme');
			if (savedTheme === 'dark' || savedTheme === 'light') {
				requestAnimationFrame(() => setTheme(savedTheme));
			}
		}
	}, []);

	useEffect(() => {
		fetch("http://localhost:5000/api/news")
			.then(res => res.json())
			.then(data => {
				setNews(data);
				setFiltered(data);
			})
			.finally(() => setLoading(false));
	}, []);

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

	function handleDelete(item: NewsItem) {
		if (!confirm("¿Eliminar esta noticia?")) return;
		fetch(`http://localhost:5000/api/news/${encodeURIComponent(item.title)}`, { method: "DELETE" })
			.then(res => {
				if (res.ok) {
					setNews(prev => prev.filter(n => n.title !== item.title));
					setFiltered(prev => prev.filter(n => n.title !== item.title));
				}
			});
	}

	// Dummy handlers para Header
	const handleLogout = () => {};
	const handleToggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

	if (!mounted) return null;

	return (
		<div className={`flex min-h-screen ${theme === 'dark' ? 'bg-[#0a1627]' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
			<Sidebar selected="/admin/news" theme={theme} />
			<div className="flex-1 flex flex-col">
				<Header theme={theme} onLogout={handleLogout} onToggleTheme={handleToggleTheme} />
				<main className="flex-1 p-8">
					<h1 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-black'}`}><TranslateText text="Noticias" /></h1>
					<NewsForm onCreated={handleCreated} theme={theme} />
					<NewsFilter news={news} onFilter={handleFilter} theme={theme} />
					<NewsChart data={filtered} theme={theme} />
					<NewsTable news={filtered} onEdit={handleEdit} onDelete={handleDelete} theme={theme} />
					<NewsEditModal open={!!editing} item={editing} onClose={() => setEditing(null)} onUpdated={handleUpdated} theme={theme} />
				</main>
			</div>
		</div>
	);
}

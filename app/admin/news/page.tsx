"use client";

import { useEffect, useState, useCallback } from "react";

import { TranslateText } from "@/components/TranslateText";
import { Newspaper, RefreshCw, Plus, BarChart3 } from "lucide-react";
import NewsFilter, { NewsItem } from "./NewsFilter";
import NewsChart from "./NewsChart";
import NewsForm from "./NewsForm";
import NewsWizardForm from "./NewsWizardForm";
import { NewsCardList } from "./NewsCardList";
import NewsPreviewModal from "./NewsPreviewModal";
import NewsEditModal from "./NewsEditModal";
import { NewsStats } from "./NewsStats";
import { DeleteNewsModal } from "./DeleteNewsModal";

import AdminPageHeader from "../components/ui/AdminPageHeader";
import AdminTabs, { TabItem } from "../components/ui/AdminTabs";
import AdminSection from "../components/ui/AdminSection";
import { GRID_COLS } from "../design-system";
import { useTheme } from "../hooks";

type TabId = 'list' | 'create' | 'stats';

export default function AdminNewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const { theme: maybeTheme, resolvedTheme, themeReady } = useTheme();
  
  const themeStrict: 'light' | 'dark' = resolvedTheme === 'dark' ? 'dark' : 'light';
  
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
  const [activeTab, setActiveTab] = useState<TabId>("list");
  const [loading, setLoading] = useState(false);
  const [useWizardForm, setUseWizardForm] = useState(true); // Usar wizard por defecto
  
  const [loadingTabs, setLoadingTabs] = useState<Record<TabId, boolean>>({
    list: false,
    create: false,
    stats: false,
  });

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchNews({ showRefresh: true });
  }, []);

  const handleTabChange = async (tabId: TabId) => {
    setLoadingTabs((prev) => ({ ...prev, [tabId]: true }));
    await new Promise((r) => setTimeout(r, 300));
    setActiveTab(tabId);
    setLoadingTabs((prev) => ({ ...prev, [tabId]: false }));
  };

  const fetchNews = useCallback(async (params: { page?: number; search?: string; showRefresh?: boolean } = {}) => {
    const { page: pageParam = page, search: searchParam = search, showRefresh = false } = params;
    if (showRefresh) setRefreshing(true);
    setLoading(true);
    try {
      const API = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${API}/api/news?page=${pageParam}&search=${searchParam}`, { credentials: 'include' });
      const data = await res.json();
      
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
  }, [fetchNews]);

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

      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) {
        throw new Error("NEXT_PUBLIC_API_URL is not defined");
      }

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

  if (!themeReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  const filteredNews = news.filter(n => {
    if (statusFilter === 'all') return true;
    if (statusFilter === 'active') return n.status === 'active';
    return n.status !== 'active';
  });

  const tabs: TabItem[] = [
    { id: 'list', label: 'Listado', icon: <Newspaper size={18} /> },
    { id: 'create', label: 'Crear', icon: <Plus size={18} /> },
    { id: 'stats', label: 'Estadísticas', icon: <BarChart3 size={18} /> },
  ];

  return (
    <div className="min-h-screen">
      <AdminPageHeader
        title="Gestión de Noticias"
        subtitle="Crea, edita y elimina noticias"
        icon={<Newspaper className="w-6 h-6 text-white" />}
        iconColor="purple"
        theme={themeStrict}
        actions={{
          refresh: { onClick: handleRefresh, loading: refreshing }
        }}
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Noticias" }]}
      />

      <AdminTabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={(tabId) => handleTabChange(tabId as TabId)}
        loadingTabs={loadingTabs}
        theme={themeStrict}
        variant="pills"
      />

      <AdminSection theme={themeStrict}>
        {activeTab === 'stats' && (
          <div className="space-y-6">
            <NewsStats news={news} filtered={news} theme={themeStrict} />
            <NewsChart data={news} theme={themeStrict} />
          </div>
        )}

        {activeTab === 'create' && (
          <div>
            {/* Toggle entre formularios */}
            <div className="mb-4 flex items-center gap-4">
              <span className={`text-sm font-medium ${themeStrict === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Formulario:
              </span>
              <button
                onClick={() => setUseWizardForm(true)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  useWizardForm
                    ? 'bg-blue-600 text-white'
                    : themeStrict === 'dark'
                      ? 'bg-gray-800 text-gray-300'
                      : 'bg-gray-200 text-gray-600'
                }`}
              >
                Wizard (Nuevo)
              </button>
              <button
                onClick={() => setUseWizardForm(false)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  !useWizardForm
                    ? 'bg-blue-600 text-white'
                    : themeStrict === 'dark'
                      ? 'bg-gray-800 text-gray-300'
                      : 'bg-gray-200 text-gray-600'
                }`}
              >
                Tradicional
              </button>
            </div>
            
            {useWizardForm ? (
              <NewsWizardForm
                isOpen={true}
                onClose={() => setActiveTab("list")}
                onCreated={handleCreated}
                theme={themeStrict}
              />
            ) : (
              <NewsForm onCreated={handleCreated} theme={themeStrict} />
            )}
          </div>
        )}

        {activeTab === 'list' && (
          <>
            {/* Filtros */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <NewsFilter news={news} onFilter={handleFilter} theme={themeStrict} />
                {/* Status tabs */}
                <div className="mt-3 sm:mt-0">
                  <div className="rounded-xl border p-1 flex gap-1 bg-transparent">
                    {[
                      { id: 'all', label: 'Todas' },
                      { id: 'active', label: 'Activas' },
                      { id: 'inactive', label: 'Desactivadas' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setStatusFilter(tab.id as typeof statusFilter)}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                          statusFilter === tab.id 
                            ? 'bg-blue-600 text-white' 
                            : themeStrict === 'dark' 
                              ? 'text-gray-300 bg-gray-800/20' 
                              : 'text-gray-600 bg-white'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Loading state */}
            {loading ? (
              <div className="rounded-lg border p-12 flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-3 border-b-3 border-blue-600 mb-4"></div>
                <p className={themeStrict === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  <TranslateText text="Cargando noticias..." />
                </p>
              </div>
            ) : (
              <>
                {/* Cards de noticias */}
                <NewsCardList
                  news={filteredNews}
                  theme={themeStrict}
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
                      className={`px-3 py-1 rounded-lg text-sm font-medium ${
                        page === 1 
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                          : 'bg-blue-500 text-white hover:bg-blue-600'
                      }`}
                    >
                      Anterior
                    </button>
                    <span className="px-3 py-1 text-sm font-medium text-gray-500">
                      Página {page} de {totalPages} ({total} noticias)
                    </span>
                    <button
                      onClick={() => { if (page < totalPages) setPage(page + 1); }}
                      disabled={page === totalPages}
                      className={`px-3 py-1 rounded-lg text-sm font-medium ${
                        page === totalPages 
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                          : 'bg-blue-500 text-white hover:bg-blue-600'
                      }`}
                    >
                      Siguiente
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </AdminSection>

      {/* Modals */}
      <NewsEditModal 
        open={!!editing} 
        item={editing} 
        onClose={() => setEditing(null)} 
        onUpdated={handleUpdated} 
        theme={themeStrict} 
      />
      
      <DeleteNewsModal
        isOpen={!!deleting}
        newsTitle={deleting?.title || null}
        theme={themeStrict}
        loading={deleteLoading}
        onClose={() => setDeleting(null)}
        onConfirm={confirmDelete}
      />
      
      <NewsPreviewModal
        open={!!previewing}
        onClose={() => setPreviewing(null)}
        news={previewing}
        theme={themeStrict}
      />
    </div>
  );
}


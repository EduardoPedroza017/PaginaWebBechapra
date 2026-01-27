"use client";

import { useEffect, useState, useCallback } from "react";

import { TranslateText } from "@/components/TranslateText";
import { Newspaper, Plus, BarChart3 } from "lucide-react";
import { NewsFilters } from "./components/NewsFilters/NewsFilters";
import { NewsCardList } from "./NewsCardList";
import NewsChart from "./NewsChart";
import NewsCreateModal from "./NewsCreateModal";
import NewsPreviewModal from "./NewsPreviewModal";
import NewsEditModal from "./NewsEditModal";
import { NewsStats } from "./NewsStats";
import { DeleteNewsModal } from "./DeleteNewsModal";
import { NewsItem } from "./types";
import apiClient from '@/lib/api/api-client';
import { useDebounce } from "@/hooks/useDebounce";

import AdminPageHeader from "../components/ui/AdminPageHeader";
import AdminTabs, { TabItem } from "../components/ui/AdminTabs";
import AdminSection from "../components/ui/AdminSection";
// GRID_COLS removed (unused)
import { useTheme } from "../hooks";

type TabId = 'list' | 'create' | 'stats';

export default function AdminNewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const { resolvedTheme, themeReady } = useTheme();

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
  const debouncedSearch = useDebounce(search, 500);
  const [activeTab, setActiveTab] = useState<TabId>("list");
  const [loading, setLoading] = useState(false);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  // wizard form flag removed (unused)

  const [loadingTabs, setLoadingTabs] = useState<Record<TabId, boolean>>({
    list: false,
    create: false,
    stats: false,
  });



  const handleTabChange = async (tabId: TabId) => {
    setLoadingTabs((prev) => ({ ...prev, [tabId]: true }));
    await new Promise((r) => setTimeout(r, 300));
    setActiveTab(tabId);
    setLoadingTabs((prev) => ({ ...prev, [tabId]: false }));
  };

  const fetchNews = useCallback(async (params: { page?: number; search?: string; showRefresh?: boolean } = {}) => {
    const { page: pageParam = page, search: searchParam = debouncedSearch, showRefresh = false } = params;
    if (showRefresh) setRefreshing(true);
    setLoading(true);
    try {
      const data = await apiClient.get(`/api/admin/news?page=${pageParam}&search=${encodeURIComponent(searchParam || '')}`);
      console.log('Fetched news data:', data); // Debug log

      const normalize = (arr: unknown[]) => arr.map((itRaw) => {
        const it = (itRaw || {}) as Record<string, unknown>;
        // Ensure _id is captured from _id or id
        const _id = (it._id ?? it.id ?? '') as string;

        const date = typeof it.date === 'string'
          ? it.date as string
          : typeof it.published_date === 'string'
            ? it.published_date as string
            : typeof it.publishedDate === 'string'
              ? it.publishedDate as string
              : typeof it.createdAt === 'string'
                ? it.createdAt as string
                : '';
        const title = (it.title ?? it.name ?? '') as string;
        const subtitle = (it.subtitle ?? '') as string;
        const description = (it.description ?? it.content ?? it.excerpt ?? '') as string;
        const category = (it.category ?? '') as string;
        const tags = Array.isArray(it.tags) ? (it.tags as string[]) : [];
        const featured = Boolean(it.featured);
        const status = (it.status as 'active' | 'inactive') || 'active';

        return {
          ...it,
          date,
          title,
          subtitle,
          description,
          category,
          tags,
          featured,
          status,
        } as NewsItem;
      });

      const payload = data as Record<string, unknown>;
      if (Array.isArray(payload.news)) {
        setNews(normalize((payload.news as unknown[]) || []) as unknown as NewsItem[]);
        setTotal(((payload.news as unknown[])?.length) || 0);
        setTotalPages(1);
        setPage(1);
      } else if (Array.isArray(payload.items)) {
        setNews(normalize((payload.items as unknown[]) || []) as unknown as NewsItem[]);
        setTotal((payload.total as number) || 0);
        setTotalPages((payload.total_pages as number) || (payload.totalPages as number) || 1);
        setPage((payload.page as number) || 1);
      } else {
        setNews(normalize((payload.news as unknown[]) || (payload.items as unknown[]) || []) as unknown as NewsItem[]);
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
  }, [page, debouncedSearch]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchNews({ showRefresh: true });
  }, [fetchNews]);

  const handleFilter = (filtered: NewsItem[], searchValue?: string) => {
    if (typeof searchValue === "string") {
      setSearch(searchValue);
      setPage(1);
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
      const identifier = deleting.slug || deleting._id || deleting.title;
      await apiClient.delete(`/api/admin/news/${encodeURIComponent(identifier)}`, {
        headers: {
          ...(userEmail ? { "X-User": userEmail } : {}),
          ...(admin ? { "X-Admin": admin } : {}),
          ...(role ? { "X-Role": role } : {})
        }
      });
      await fetchNews();
    } catch (error) {
      console.error("Error deleting:", error);
    } finally {
      setDeleteLoading(false);
      setDeleting(null);
    }
  };

  const handleToggleStatus = async (item: NewsItem) => {
    const itemId = item._id || item.slug || item.title;
    const updatedStatus = item.status === 'active' ? 'inactive' : 'active';

    // Prevenir múltiples clicks
    if (togglingId) return;

    setTogglingId(itemId);

    // 1. Actualización optimista - actualizar estado local INMEDIATAMENTE
    setNews(prevNews =>
      prevNews.map(n => {
        // Strict matching to avoid undefined === undefined
        const matchId = (n._id && item._id && n._id === item._id);
        const matchSlug = (n.slug && item.slug && n.slug === item.slug);
        const matchTitle = (n.title && item.title && n.title === item.title);

        if (matchId || matchSlug || matchTitle) {
          return { ...n, status: updatedStatus };
        }
        return n;
      })
    );

    try {
      // 2. Actualizar backend
      const identifier = item.slug || item._id || item.title;
      const encodedId = encodeURIComponent(identifier);

      console.log('📡 Sending status toggle request:', {
        id: item._id,
        slug: item.slug,
        title: item.title,
        newStatus: updatedStatus,
        method: 'PATCH',
        url: `/api/admin/news/${encodedId}/toggle-status`
      });

      const storedUser = typeof window !== 'undefined' ? sessionStorage.getItem('user_email') : null;
      const storedRole = typeof window !== 'undefined' ? sessionStorage.getItem('role') : null;
      const storedAdmin = typeof window !== 'undefined' ? sessionStorage.getItem('admin') : null;
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (storedUser) headers['X-User'] = storedUser;
      if (storedRole) headers['X-Role'] = storedRole;
      if (storedAdmin) headers['X-Admin'] = storedAdmin;

      // Usar PATCH y el endpoint específico /toggle-status
      const response = await apiClient.patch(`/api/admin/news/${encodedId}/toggle-status`, { status: updatedStatus }, { headers });
      console.log('✅ Server response for status toggle:', response);

    } catch (error) {
      console.error('❌ Error toggling status:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorResponse = (error as { response?: { data?: unknown; status?: number } })?.response;
      console.error('Error details:', {
        message: errorMessage,
        response: errorResponse?.data,
        status: errorResponse?.status
      });

      // 3. Revertir cambio si falla
      setNews(prevNews =>
        prevNews.map(n => {
          const matchId = (n._id && item._id && n._id === item._id);
          const matchSlug = (n.slug && item.slug && n.slug === item.slug);
          const matchTitle = (n.title && item.title && n.title === item.title);

          if (matchId || matchSlug || matchTitle) {
            return { ...n, status: item.status }; // Revert to original
          }
          return n;
        })
      );

      // 4. Mostrar error al usuario
      alert('Error al cambiar el estado. Por favor intenta de nuevo.');
    } finally {
      setTogglingId(null);
    }
  };

  if (!themeReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  // Filtering is now handled by NewsFilters component
  const filteredNews = news;

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
          <>
            <NewsCreateModal
              open={true}
              onClose={() => setActiveTab('list')}
              onCreated={handleCreated}
              theme={themeStrict}
            />
          </>
        )}

        {activeTab === 'list' && (
          <>
            {/* Filtros */}
            <div className="mb-6">
              <NewsFilters news={news} onFilter={handleFilter} theme={themeStrict} />
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
                {/* Tarjetas de noticias */}
                <NewsCardList
                  news={filteredNews}
                  theme={themeStrict}
                  onEdit={handleEdit}
                  onDelete={handleDeleteClick}
                  onPreview={setPreviewing}
                  onToggleStatus={handleToggleStatus}
                  togglingId={togglingId}
                />

                {/* Paginador */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-8 gap-2">
                    <button
                      onClick={() => { if (page > 1) setPage(page - 1); }}
                      disabled={page === 1}
                      className={`px-3 py-1 rounded-lg text-sm font-medium ${page === 1
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
                      className={`px-3 py-1 rounded-lg text-sm font-medium ${page === totalPages
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


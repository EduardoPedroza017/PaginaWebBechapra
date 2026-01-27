// Custom hook for news data management
import { useState, useEffect, useCallback } from 'react';
import { News, NewsFormData } from '../types';
import { fetchNews, createNews, updateNews, deleteNews, toggleNewsStatus } from '../utils/api-helpers';

interface UseNewsOptions {
  initialPage?: number;
  initialLimit?: number;
  autoFetch?: boolean;
}

interface UseNewsReturn {
  // Data
  news: News[];
  loading: boolean;
  error: string | null;

  // Pagination
  page: number;
  totalPages: number;
  total: number;
  hasNext: boolean;
  hasPrev: boolean;

  // Actions
  refetch: () => Promise<void>;
  create: (newsData: Partial<News> | Partial<NewsFormData>) => Promise<News>;
  update: (id: string, newsData: Partial<News> | Partial<NewsFormData>) => Promise<News>;
  remove: (id: string) => Promise<void>;
  toggleStatus: (id: string) => Promise<News>;

  // Pagination actions
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;

  // Filters
  search: string;
  setSearch: (search: string) => void;
  category: string;
  setCategory: (category: string) => void;
  status: string;
  setStatus: (status: string) => void;
}

export const useNews = (options: UseNewsOptions = {}): UseNewsReturn => {
  const {
    initialPage = 1,
    initialLimit = 20,
    autoFetch = true
  } = options;

  // State
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Pagination
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  // Filters
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');

  // Computed pagination
  const hasNext = page < totalPages;
  const hasPrev = page > 1;

  // Fetch news function
  const fetchNewsData = useCallback(async (currentPage = page) => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchNews({
        page: currentPage,
        limit: initialLimit,
        search: search || undefined,
        category: category || undefined,
        status: status || undefined,
        sortBy: 'createdAt',
        sortOrder: 'desc'
      });

      setNews(result.items);
      setTotal(result.total);
      setTotalPages(result.totalPages);
      setPage(result.page);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar noticias';
      setError(errorMessage);
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  }, [page, initialLimit, search, category, status]);

  // Auto-fetch on mount and when filters change
  useEffect(() => {
    if (autoFetch) {
      fetchNewsData();
    }
  }, [fetchNewsData, autoFetch]);

  // Actions
  const refetch = useCallback(async () => {
    await fetchNewsData(page);
  }, [fetchNewsData, page]);

  const buildNewsFormObject = (data: Partial<News>): NewsFormData => {
    return {
      title: data.title || '',
      subtitle: data.subtitle || '',
      description: data.description || '',
      category: data.category || '',
      tags: Array.isArray(data.tags) ? data.tags : (data.tags ? [String(data.tags)] : []),
      featured: typeof data.featured === 'boolean' ? data.featured : false,
      image: null,
      altText: ((data as unknown) as { altText?: string; alt?: string }).altText || ((data as unknown) as { altText?: string; alt?: string }).alt || '',
      seoDescription: ((data as unknown) as { seoDescription?: string }).seoDescription || '',
      seoKeywords: ((data as unknown) as { seoKeywords?: string }).seoKeywords || '',
      publishDate: ((data as unknown) as { publishDate?: string }).publishDate || '',
      publishTime: ((data as unknown) as { publishTime?: string }).publishTime || ''
    };
  };

  const create = useCallback(async (newsData: Partial<News> | Partial<NewsFormData>): Promise<News> => {
    const payload: NewsFormData = {
      ...buildNewsFormObject(newsData as Partial<News>),
      ...(newsData as Partial<NewsFormData>)
    };

    const newNews = await createNews(payload);
    await refetch(); // Refresh the list
    return newNews;
  }, [refetch]);

  const update = useCallback(async (id: string, newsData: Partial<News> | Partial<NewsFormData>): Promise<News> => {
    const payload: Partial<NewsFormData> = {
      ...buildNewsFormObject(newsData as Partial<News>),
      ...(newsData as Partial<NewsFormData>)
    };

    const updatedNews = await updateNews(id, payload);
    // Update the item in the local state
    setNews(prev => prev.map(item =>
      item._id === id || item.slug === id ? updatedNews : item
    ));
    return updatedNews;
  }, [updateNews]);

  const remove = useCallback(async (id: string): Promise<void> => {
    await deleteNews(id);
    // Remove from local state
    setNews(prev => prev.filter(item => item._id !== id && item.slug !== id));
    setTotal(prev => prev - 1);
  }, []);

  const toggleStatusAction = useCallback(async (id: string): Promise<News> => {
    const updatedNews = await toggleNewsStatus(id);
    // Update the item in the local state
    setNews(prev => prev.map(item =>
      item._id === id || item.slug === id ? updatedNews : item
    ));
    return updatedNews;
  }, []);

  // Pagination actions
  const goToPage = useCallback((newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  }, [totalPages]);

  const nextPage = useCallback(() => {
    if (hasNext) {
      setPage(prev => prev + 1);
    }
  }, [hasNext]);

  const prevPage = useCallback(() => {
    if (hasPrev) {
      setPage(prev => prev - 1);
    }
  }, [hasPrev]);

  return {
    // Data
    news,
    loading,
    error,

    // Pagination
    page,
    totalPages,
    total,
    hasNext,
    hasPrev,

    // Actions
    refetch,
    create,
    update,
    remove,
    toggleStatus: toggleStatusAction,

    // Pagination actions
    goToPage,
    nextPage,
    prevPage,

    // Filters
    search,
    setSearch,
    category,
    setCategory,
    status,
    setStatus
  };
};

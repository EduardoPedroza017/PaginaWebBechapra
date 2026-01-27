// News types for the admin section
export interface News {
  _id?: string;
  slug?: string;
  title: string;
  subtitle: string;
  description: string;
  content?: string; // alias for description
  date: string;
  category: string;
  tags: string[];
  featured: boolean;
  image_url?: string;
  altText?: string;
  seoDescription?: string;
  seoKeywords?: string;
  publishDate?: string;
  publishTime?: string;
  status: 'active' | 'inactive';
  createdAt?: string;
  updatedAt?: string;
}

export interface NewsFormData {
  title: string;
  subtitle: string;
  description: string;
  category: string;
  tags: string[];
  featured: boolean;
  image: File | null;
  altText: string;
  seoDescription: string;
  seoKeywords: string;
  publishDate: string;
  publishTime: string;
}

export interface NewsFilters {
  search?: string;
  category?: string;
  status?: 'all' | 'active' | 'inactive';
  featured?: boolean;
  dateFrom?: string;
  dateTo?: string;
}

// Backwards-compatible alias used across the admin codebase
export type NewsItem = News;

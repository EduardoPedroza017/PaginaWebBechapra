// Formatting utilities for news data
export const formatDate = (date: string | Date | undefined): string => {
  if (!date) return '—';

  try {
    const d = new Date(date);
    return d.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return 'Fecha inválida';
  }
};

export const formatDateTime = (date: string | Date | undefined): string => {
  if (!date) return '—';

  try {
    const d = new Date(date);
    return d.toLocaleString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return 'Fecha inválida';
  }
};

export const formatRelativeTime = (date: string | Date | undefined): string => {
  if (!date) return '—';

  try {
    const now = new Date();
    const d = new Date(date);
    const diffInMs = now.getTime() - d.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 1) return 'Ahora mismo';
    if (diffInMinutes < 60) return `Hace ${diffInMinutes} min`;
    if (diffInHours < 24) return `Hace ${diffInHours} h`;
    if (diffInDays < 7) return `Hace ${diffInDays} días`;
    if (diffInDays < 30) return `Hace ${Math.floor(diffInDays / 7)} semanas`;

    return formatDate(d);
  } catch {
    return 'Fecha inválida';
  }
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';

  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

export const formatReadingTime = (minutes: number): string => {
  if (minutes < 1) return '< 1 min';
  if (minutes === 1) return '1 min';
  return `${minutes} min`;
};

export const formatCategory = (category: string): string => {
  return category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const formatTags = (tags: string[]): string => {
  return tags.map(tag => `#${tag}`).join(' ');
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};

export const stripHtml = (html: string): string => {
  return html.replace(/<[^>]*>/g, '');
};

export const highlightSearchTerm = (text: string, searchTerm: string): string => {
  if (!searchTerm.trim()) return text;

  const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
};

export const formatStatus = (status: string): { label: string; color: string } => {
  switch (status) {
    case 'active':
      return { label: 'Activo', color: 'green' };
    case 'inactive':
      return { label: 'Inactivo', color: 'gray' };
    case 'draft':
      return { label: 'Borrador', color: 'yellow' };
    case 'archived':
      return { label: 'Archivado', color: 'red' };
    default:
      return { label: 'Desconocido', color: 'gray' };
  }
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('es-ES').format(num);
};

export const formatCurrency = (amount: number, currency = 'EUR'): string => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency
  }).format(amount);
};

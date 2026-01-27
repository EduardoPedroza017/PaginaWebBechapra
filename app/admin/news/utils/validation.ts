// Validation utilities for news forms
export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
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

const MAX_TITLE_LENGTH = 100;
const MAX_SUBTITLE_LENGTH = 150;
const MAX_DESCRIPTION_LENGTH = 2000;
const MAX_SEO_DESCRIPTION = 160;
const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB
const MAX_TAGS = 8;

export const validateNewsForm = (data: Partial<NewsFormData>): ValidationResult => {
  const errors: Record<string, string> = {};

  // Title validation
  if (!data.title?.trim()) {
    errors.title = 'El título es requerido';
  } else if (data.title.length > MAX_TITLE_LENGTH) {
    errors.title = `El título no puede exceder ${MAX_TITLE_LENGTH} caracteres`;
  }

  // Subtitle validation
  if (!data.subtitle?.trim()) {
    errors.subtitle = 'El subtítulo es requerido';
  } else if (data.subtitle.length > MAX_SUBTITLE_LENGTH) {
    errors.subtitle = `El subtítulo no puede exceder ${MAX_SUBTITLE_LENGTH} caracteres`;
  }

  // Description validation
  const plainText = data.description?.replace(/<[^>]*>/g, '') || '';
  if (plainText.length < 50) {
    errors.description = 'La descripción debe tener al menos 50 caracteres';
  } else if (plainText.length > MAX_DESCRIPTION_LENGTH) {
    errors.description = `La descripción no puede exceder ${MAX_DESCRIPTION_LENGTH} caracteres`;
  }

  // Category validation
  if (!data.category) {
    errors.category = 'La categoría es requerida';
  }

  // Tags validation
  if (data.tags && data.tags.length > MAX_TAGS) {
    errors.tags = `No puedes tener más de ${MAX_TAGS} etiquetas`;
  }

  // Image validation
  if (!data.image) {
    errors.image = 'La imagen principal es requerida';
  } else if (data.image.size > MAX_IMAGE_SIZE) {
    errors.image = `La imagen no puede ser mayor a ${MAX_IMAGE_SIZE / 1024 / 1024}MB`;
  } else if (!data.image.type.startsWith('image/')) {
    errors.image = 'El archivo debe ser una imagen';
  }

  // Alt text validation
  if (!data.altText?.trim()) {
    errors.altText = 'El texto alternativo es requerido para accesibilidad';
  }

  // SEO description validation
  if (data.seoDescription && data.seoDescription.length > MAX_SEO_DESCRIPTION) {
    errors.seoDescription = `La meta descripción no puede exceder ${MAX_SEO_DESCRIPTION} caracteres`;
  }

  // Publish date validation
  if (!data.publishDate) {
    errors.publishDate = 'La fecha de publicación es requerida';
  } else {
    const publishDateTime = new Date(`${data.publishDate}T${data.publishTime || '00:00'}`);
    if (publishDateTime < new Date()) {
      errors.publishDate = 'La fecha de publicación no puede ser en el pasado';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateSlug = (slug: string): boolean => {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug);
};

export const sanitizeHtml = (html: string): string => {
  // Basic HTML sanitization - remove dangerous tags
  const dangerousTags = ['script', 'style', 'iframe', 'object', 'embed'];
  let sanitized = html;

  dangerousTags.forEach(tag => {
    const regex = new RegExp(`<${tag}[^>]*>.*?</${tag}>`, 'gi');
    sanitized = sanitized.replace(regex, '');
  });

  return sanitized;
};

export const calculateReadingTime = (text: string): number => {
  const wordsPerMinute = 200;
  const plainText = text.replace(/<[^>]*>/g, '');
  const wordCount = plainText.split(/\s+/).filter(word => word.length > 0).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
};

export const generateSlugFromTitle = (title: string): string => {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
};

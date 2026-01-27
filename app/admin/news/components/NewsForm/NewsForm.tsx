// NewsForm.tsx - Single reusable form for creating/editing news
import { WidersarForm } from '../../../../../components/ui/WidersarForm';
import { useForm, FormField, FormData as UseFormData } from '../../../../../hooks/useForm';

interface NewsFormProps {
  initialData?: UseFormData | null;
  onSubmit: (data: NewsFormData) => Promise<void>;
  theme: 'light' | 'dark';
}

interface NewsFormData {
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

const CATEGORIES = [
  { value: "Empresarial", label: "Empresarial" },
  { value: "Recursos Humanos", label: "Recursos Humanos" },
  { value: "Capacitación", label: "Capacitación" },
  { value: "Legal", label: "Legal" },
  { value: "Tecnología", label: "Tecnología" },
  { value: "Noticias Generales", label: "Noticias Generales" },
];

export const NewsForm = ({ initialData, onSubmit, theme }: NewsFormProps) => {
  const src = initialData ? (initialData as unknown as Record<string, unknown>) : undefined;
  const initialFormData: UseFormData = src ? {
    title: (src.title as string) || '',
    subtitle: (src.subtitle as string) || '',
    description: (src.description as string) || '',
    category: (src.category as string) || '',
    tags: Array.isArray(src.tags) ? (src.tags as string[]) : [],
    featured: Boolean(src.featured),
    image: null,
    altText: (src.altText as string) || '',
    seoDescription: (src.seoDescription as string) || '',
    seoKeywords: (src.seoKeywords as string) || '',
    publishDate: src.publishDate ? new Date(String(src.publishDate)).toISOString().split('T')[0] : '',
    publishTime: src.publishDate ? new Date(String(src.publishDate)).toTimeString().slice(0,5) : '',
  } : {
    title: '',
    subtitle: '',
    description: '',
    category: '',
    tags: [],
    featured: false,
    image: null,
    altText: '',
    seoDescription: '',
    seoKeywords: '',
    publishDate: '',
    publishTime: '',
  };

  const form = useForm(initialFormData);

  const handleSubmit = async (formData: UseFormData) => {
    const d = formData as Record<string, unknown>;
    const payload: NewsFormData = {
      title: String(d.title ?? ''),
      subtitle: String(d.subtitle ?? ''),
      description: String(d.description ?? ''),
      category: String(d.category ?? ''),
      tags: Array.isArray(d.tags) ? (d.tags as string[]) : [],
      featured: Boolean(d.featured),
      image: (d.image as File) || null,
      altText: String(d.altText ?? ''),
      seoDescription: String(d.seoDescription ?? ''),
      seoKeywords: String(d.seoKeywords ?? ''),
      publishDate: String(d.publishDate ?? ''),
      publishTime: String(d.publishTime ?? ''),
    };

    return onSubmit(payload);
  };

  const fields: FormField[] = [
    { name: 'title', label: 'Título', type: 'text', required: true, maxLength: 100 },
    { name: 'subtitle', label: 'Subtítulo', type: 'text', required: true, maxLength: 150 },
    { name: 'description', label: 'Contenido', type: 'richtext', required: true, minLength: 50 },
    { name: 'category', label: 'Categoría', type: 'select', options: CATEGORIES, required: true },
    { name: 'tags', label: 'Etiquetas', type: 'tags', maxTags: 8 },
    { name: 'featured', label: 'Destacada', type: 'checkbox' },
    { name: 'image', label: 'Imagen', type: 'file', accept: 'image/*', maxSize: 2 * 1024 * 1024, required: true },
    { name: 'altText', label: 'Texto alternativo', type: 'text' },
    { name: 'seoDescription', label: 'Meta descripción', type: 'textarea', maxLength: 160 },
    { name: 'seoKeywords', label: 'Palabras clave', type: 'text' },
    { name: 'publishDate', label: 'Fecha publicación', type: 'date', required: true },
    { name: 'publishTime', label: 'Hora publicación', type: 'time', required: true },
  ];

  return (
    <WidersarForm
      form={form}
      onSubmit={handleSubmit}
      fields={fields}
      theme={theme}
      submitLabel={initialData ? "Actualizar Noticia" : "Crear Noticia"}
    />
  );
};

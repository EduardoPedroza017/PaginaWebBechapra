import React from 'react';
import { Button } from '../../components/shared/Button';
import { RefreshCw, ToggleLeft, ToggleRight, MoreHorizontal } from 'lucide-react';
import { Service } from './ServiceForm';

interface Props {
  service: Service;
  onEdit: (s: Service) => void;
  onDelete: (s: Service) => void;
  onToggleActive: (s: Service) => void;
  toggleLoading?: string | null;
}

export const ServiceCard: React.FC<Props> = ({ service: s, onEdit, onDelete, onToggleActive, toggleLoading }) => {
  const slug = (s as any).slug || (s as any).handle || s.name || '';
  const cleanSlug = String(slug).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

  return (
    <article className={`rounded-xl overflow-hidden transition-shadow duration-200 bg-white dark:bg-gray-800 border ${!s.active ? 'opacity-60' : ''} h-full flex flex-col shadow-sm hover:shadow-md`}>
      <div className="h-44 sm:h-48 relative overflow-hidden bg-gray-100">
        {s.image ? (
          <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
        )}
        {!s.active && (
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-700 text-white">Inactiva</span>
          </div>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-3">
              {s.icon && <img src={s.icon} alt="icon" className="w-10 h-10 object-contain rounded-md" />}
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{s.name}</h3>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => onToggleActive(s)} title={s.active ? 'Desactivar' : 'Activar'} className="p-1 rounded">
                {toggleLoading === s.id ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : s.active ? (
                  <ToggleRight className="w-6 h-6 text-emerald-500" />
                ) : (
                  <ToggleLeft className="w-6 h-6 text-gray-400" />
                )}
              </button>
              <button className="p-1 rounded" title="Más"><MoreHorizontal /></button>
            </div>
          </div>

          {s.description && (
            <p className="text-sm mb-3 text-gray-600 dark:text-gray-300 line-clamp-3">{s.description}</p>
          )}
        </div>

        <div className="flex items-center gap-2 pt-3 border-t border-gray-200 dark:border-gray-700 mt-4">
          <Button size="sm" onClick={() => onEdit(s)}>Editar</Button>
          <a href={`/servicios/${encodeURIComponent(cleanSlug)}`} target="_blank" rel="noreferrer" className="inline-block">
            <Button size="sm" variant="secondary">Ver página</Button>
          </a>
          <Button size="sm" variant="danger" onClick={() => onDelete(s)}>Eliminar</Button>
        </div>
      </div>
    </article>
  );
};

export default ServiceCard;

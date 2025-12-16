import React from "react";
import { Button } from "../../components/shared/Button";
import { Service } from "./ServiceForm";
import { RefreshCw, ToggleLeft, ToggleRight } from "lucide-react";

interface ServiceTableProps {
  services: Service[];
  onEdit: (service: Service) => void;
  onDelete: (service: Service) => void;
  onToggleActive: (service: Service) => void;
  toggleLoading?: string | null;
}

export const ServiceTable: React.FC<ServiceTableProps> = ({ services, onEdit, onDelete, onToggleActive, toggleLoading }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-4 items-stretch auto-rows-fr">
    {services.map((s) => (
      <div key={s.id} className={`rounded-xl overflow-hidden transition-all duration-300 bg-white dark:bg-gray-800 border ${!s.active ? 'opacity-60' : ''} h-full flex flex-col`}>
        {/* Image */}
        <div className="h-40 sm:h-44 relative overflow-hidden">
          {s.image ? (
            <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gray-200 dark:bg-gray-700" />
          )}
          {!s.active && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className={`px-3 py-1 rounded-full text-sm font-medium bg-gray-700 text-gray-200`}>Inactiva</span>
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
              <button
                onClick={() => onToggleActive(s)}
                className="p-1 rounded"
                title={s.active ? 'Desactivar' : 'Activar'}
              >
                {toggleLoading === s.id ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : s.active ? (
                  <ToggleRight className="w-6 h-6 text-emerald-500" />
                ) : (
                  <ToggleLeft className="w-6 h-6 text-gray-400" />
                )}
              </button>
            </div>

            {s.description && (
              <p className="text-sm mb-3 text-gray-600 dark:text-gray-300">{s.description}</p>
            )}
          </div>

          <div className="flex items-center gap-2 pt-3 border-t border-gray-200 dark:border-gray-700 mt-4">
            <Button size="sm" onClick={() => onEdit(s)}>Editar</Button>
            {(() => {
              const raw = (s as any).slug || (s as any).handle || s.name || '';
              const slug = String(raw)
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '');
              return (
                <a href={`/servicios/${encodeURIComponent(slug)}`} target="_blank" rel="noreferrer" className="inline-block">
                  <Button size="sm" variant="secondary">Conocer más</Button>
                </a>
              )
            })()}
            
            <Button size="sm" variant="danger" onClick={() => onDelete(s)}>Eliminar</Button>
          </div>
        </div>
      </div>
    ))}
  </div>
);

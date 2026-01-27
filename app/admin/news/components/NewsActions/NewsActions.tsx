// NewsActions.tsx - Action buttons and controls for news items
import { useState } from 'react';
import { MoreHorizontal, Edit, Trash2, Eye, Star, StarOff, Download, Share2 } from 'lucide-react';
import { News } from '../../types';

interface NewsActionsProps {
  news: News;
  onEdit: (news: News) => void;
  onDelete: (news: News) => void;
  onPreview: (news: News) => void;
  onToggleStatus: (news: News) => void;
  onExport?: (news: News) => void;
  onShare?: (news: News) => void;
  theme: 'light' | 'dark';
  compact?: boolean;
}

export const NewsActions = ({
  news,
  onEdit,
  onDelete,
  onPreview,
  onToggleStatus,
  onExport,
  onShare,
  theme,
  compact = false
}: NewsActionsProps) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const actions = [
    {
      label: 'Vista previa',
      icon: Eye,
      onClick: () => onPreview(news),
      variant: 'default' as const
    },
    {
      label: news.status === 'active' ? 'Desactivar' : 'Activar',
      icon: news.status === 'active' ? StarOff : Star,
      onClick: () => onToggleStatus(news),
      variant: news.status === 'active' ? 'warning' as const : 'success' as const
    },
    {
      label: 'Editar',
      icon: Edit,
      onClick: () => onEdit(news),
      variant: 'primary' as const
    },
    {
      label: 'Eliminar',
      icon: Trash2,
      onClick: () => onDelete(news),
      variant: 'danger' as const,
      confirm: true
    }
  ];

  if (onExport) {
    actions.push({
      label: 'Exportar',
      icon: Download,
      onClick: () => onExport(news),
      variant: 'default' as const
    });
  }

  if (onShare) {
    actions.push({
      label: 'Compartir',
      icon: Share2,
      onClick: () => onShare(news),
      variant: 'default' as const
    });
  }

  const getVariantClasses = (variant: string) => {
    const base = 'flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors';

    switch (variant) {
      case 'primary':
        return `${base} ${
          theme === 'dark'
            ? 'text-blue-400 hover:bg-blue-900/30'
            : 'text-blue-600 hover:bg-blue-50'
        }`;
      case 'danger':
        return `${base} ${
          theme === 'dark'
            ? 'text-red-400 hover:bg-red-900/30'
            : 'text-red-600 hover:bg-red-50'
        }`;
      case 'success':
        return `${base} ${
          theme === 'dark'
            ? 'text-green-400 hover:bg-green-900/30'
            : 'text-green-600 hover:bg-green-50'
        }`;
      case 'warning':
        return `${base} ${
          theme === 'dark'
            ? 'text-yellow-400 hover:bg-yellow-900/30'
            : 'text-yellow-600 hover:bg-yellow-50'
        }`;
      default:
        return `${base} ${
          theme === 'dark'
            ? 'text-gray-300 hover:bg-gray-800'
            : 'text-gray-700 hover:bg-gray-100'
        }`;
    }
  };

  if (compact) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className={`p-2 rounded-lg transition-colors ${
            theme === 'dark' ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
          }`}
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>

        {showDropdown && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setShowDropdown(false)}
            />
            <div className={`absolute right-0 mt-2 w-48 rounded-lg border shadow-lg z-20 ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <div className="py-1">
                {actions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        if (action.confirm) {
                          if (window.confirm(`¿Estás seguro de que quieres ${action.label.toLowerCase()} esta noticia?`)) {
                            action.onClick();
                          }
                        } else {
                          action.onClick();
                        }
                        setShowDropdown(false);
                      }}
                      className={`w-full text-left ${getVariantClasses(action.variant)}`}
                    >
                      <Icon className="w-4 h-4" />
                      {action.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1">
      {actions.slice(0, 4).map((action, index) => {
        const Icon = action.icon;
        return (
          <button
            key={index}
            onClick={() => {
              if (action.confirm) {
                if (window.confirm(`¿Estás seguro de que quieres ${action.label.toLowerCase()} esta noticia?`)) {
                  action.onClick();
                }
              } else {
                action.onClick();
              }
            }}
            className={`p-2 rounded-lg transition-colors ${
              action.variant === 'primary'
                ? theme === 'dark' ? 'text-blue-400 hover:bg-blue-900/30' : 'text-blue-600 hover:bg-blue-50'
                : action.variant === 'danger'
                ? theme === 'dark' ? 'text-red-400 hover:bg-red-900/30' : 'text-red-600 hover:bg-red-50'
                : action.variant === 'success'
                ? theme === 'dark' ? 'text-green-400 hover:bg-green-900/30' : 'text-green-600 hover:bg-green-50'
                : action.variant === 'warning'
                ? theme === 'dark' ? 'text-yellow-400 hover:bg-yellow-900/30' : 'text-yellow-600 hover:bg-yellow-50'
                : theme === 'dark' ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
            title={action.label}
          >
            <Icon className="w-4 h-4" />
          </button>
        );
      })}
    </div>
  );
};

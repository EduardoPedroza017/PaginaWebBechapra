import React from 'react';

interface EventosCardProps {
  titulo: string;
  fecha_hora: string;
  ubicacion: string;
  descripcion: string;
  categoria?: string;
  estado?: boolean;
  imagen?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

const EventosCard: React.FC<EventosCardProps> = ({ 
  titulo, 
  fecha_hora, 
  ubicacion, 
  descripcion, 
  categoria, 
  estado, 
  imagen,
  onEdit,
  onDelete
}) => {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 shadow rounded-lg">
      {imagen && (
        <img src={imagen} alt={titulo} className="w-full h-40 object-cover rounded-lg mb-3" />
      )}
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">{titulo}</h2>
        <span className={`px-2 py-1 text-xs rounded ${estado ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {estado ? 'Publicado' : 'No Publicado'}
        </span>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300">{fecha_hora}</p>
      <p className="text-sm text-gray-600 dark:text-gray-300">{ubicacion}</p>
      {categoria && <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">{categoria}</p>}
      <p className="text-sm text-gray-700 dark:text-gray-400 mt-2">{descripcion}</p>
      <div className="flex gap-2 mt-3">
        {onEdit && (
          <button onClick={onEdit} className="text-blue-500 hover:text-blue-700 text-sm">
            Editar
          </button>
        )}
        {onDelete && (
          <button onClick={onDelete} className="text-red-500 hover:text-red-700 text-sm">
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
};

export default EventosCard;
import React from 'react';
import EventosCard from './EventosCard';

interface Evento {
  id: string;
  titulo: string;
  fecha_hora: string;
  ubicacion: string;
  descripcion: string;
  categoria?: string;
  estado?: boolean;
  imagen?: string;
}

interface EventosListProps {
  eventos: Evento[];
  onEdit?: (evento: Evento) => void;
  onDelete?: (id: string) => void;
}

const EventosList: React.FC<EventosListProps> = ({ eventos, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {eventos.map((evento) => (
        <EventosCard
          key={evento.id}
          titulo={evento.titulo}
          fecha_hora={evento.fecha_hora}
          ubicacion={evento.ubicacion}
          descripcion={evento.descripcion}
          categoria={evento.categoria}
          estado={evento.estado}
          imagen={evento.imagen}
          onEdit={onEdit ? () => onEdit(evento) : undefined}
          onDelete={onDelete ? () => onDelete(evento.id) : undefined}
        />
      ))}
    </div>
  );
};

export default EventosList;
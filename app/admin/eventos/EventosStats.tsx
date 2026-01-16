import React from 'react';

interface EventosStatsProps {
  totalEventos: number;
  upcomingEventos: number;
  pastEventos: number;
}

const EventosStats: React.FC<EventosStatsProps> = ({ totalEventos, upcomingEventos, pastEventos }) => {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 shadow rounded-lg">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white">Estadísticas de Eventos</h2>
      <ul className="mt-4 space-y-2">
        <li className="text-sm text-gray-600 dark:text-gray-300">
          Total de eventos: <span className="font-bold text-gray-900 dark:text-white">{totalEventos}</span>
        </li>
        <li className="text-sm text-gray-600 dark:text-gray-300">
          Próximos eventos: <span className="font-bold text-gray-900 dark:text-white">{upcomingEventos}</span>
        </li>
        <li className="text-sm text-gray-600 dark:text-gray-300">
          Eventos pasados: <span className="font-bold text-gray-900 dark:text-white">{pastEventos}</span>
        </li>
      </ul>
    </div>
  );
};

export default EventosStats;
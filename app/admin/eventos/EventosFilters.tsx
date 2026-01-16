import React from 'react';

interface EventosFiltersProps {
  onFilterChange: (filters: { search: string; dateRange: [Date | null, Date | null] }) => void;
}

const EventosFilters: React.FC<EventosFiltersProps> = ({ onFilterChange }) => {
  const [search, setSearch] = React.useState('');
  const [dateRange, setDateRange] = React.useState<[Date | null, Date | null]>([null, null]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onFilterChange({ search: e.target.value, dateRange });
  };

  const handleDateChange = (start: Date | null, end: Date | null) => {
    setDateRange([start, end]);
    onFilterChange({ search, dateRange: [start, end] });
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 shadow rounded-lg">
      <input
        type="text"
        placeholder="Buscar eventos..."
        value={search}
        onChange={handleSearchChange}
        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
      />
      <div className="mt-4">
        {/* Replace with a date range picker component */}
        <p className="text-sm text-gray-600 dark:text-gray-300">Selector de rango de fechas</p>
      </div>
    </div>
  );
};

export default EventosFilters;
import React, { useState, useEffect } from 'react';

interface SearchBarProps {
  value?: string;
  onChange: (q: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value = '', onChange, placeholder = 'Buscar servicios...' }) => {
  const [q, setQ] = useState(value);

  useEffect(() => {
    setQ(value);
  }, [value]);

  // Only call onChange when the user types (immediate). Debouncing is handled by the parent to avoid loops.
  return (
    <div className="flex items-center gap-2">
      <input value={q} onChange={(e) => { setQ(e.target.value); onChange(e.target.value); }} className="border rounded px-3 py-2 w-full" placeholder={placeholder} />
    </div>
  );
};

export default SearchBar;

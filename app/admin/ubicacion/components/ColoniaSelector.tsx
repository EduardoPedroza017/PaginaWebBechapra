"use client";

interface ColoniaSelectorProps {
  colonias: Array<{ name: string; type: string }>;
  selectedColonia: string;
  onSelect: (colonia: string) => void;
}

export function ColoniaSelector({
  colonias,
  selectedColonia,
  onSelect,
}: ColoniaSelectorProps) {
  if (colonias.length === 0) {
    return null;
  }

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Colonia / Asentamiento
      </label>
      <select
        value={selectedColonia}
        onChange={(e) => onSelect(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
      >
        <option value="">Selecciona una colonia</option>
        {colonias.map((colonia, index) => (
          <option key={index} value={colonia.name}>
            {colonia.name} ({colonia.type})
          </option>
        ))}
      </select>
    </div>
  );
}

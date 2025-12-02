import React from "react";
import { colorPalettes, PaletteName, ThemeConfig } from "../theme/palettes";
import { Palette, Check } from "lucide-react";

interface PaletteSelectorProps {
  palette: PaletteName;
  setPalette: (p: PaletteName) => void;
  theme?: 'light' | 'dark';
}

export const PaletteSelector: React.FC<PaletteSelectorProps> = ({ 
  palette, 
  setPalette, 
  theme = 'light' 
}) => {
  const paletteNames: Record<PaletteName, string> = {
    azul: 'Azul',
    verde: 'Verde',
    morado: 'Morado',
    naranja: 'Naranja',
    rosa: 'Rosa',
    cyan: 'Cyan',
  };

  const isDark = theme === 'dark';

  return (
    <div className={`rounded-xl shadow-lg p-6 border ${
      isDark 
        ? 'bg-gray-900 border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg ${
          isDark ? 'bg-blue-600/20' : 'bg-blue-100'
        }`}>
          <Palette className={`w-5 h-5 ${
            isDark ? 'text-blue-400' : 'text-blue-600'
          }`} />
        </div>
        <div>
          <h3 className={`text-lg font-semibold ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Paleta de Colores
          </h3>
          <p className={`text-sm ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Personaliza la apariencia del sistema
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {(Object.entries(colorPalettes) as [PaletteName, ThemeConfig][]).map(([name, pal]) => {
          const isSelected = palette === name;
          const paletteColor = pal[theme].primary;
          // Usar ring util de Tailwind para el anillo de selección
          return (
            <button
              key={name}
              onClick={() => setPalette(name)}
              className={`group relative rounded-xl p-4 transition-all duration-300 transform hover:scale-105 active:scale-95
                ${isSelected
                  ? isDark
                    ? 'bg-gray-800 shadow-lg ring-2 ring-offset-2 ring-offset-gray-900'
                    : 'bg-gray-50 shadow-lg ring-2 ring-offset-2'
                  : isDark
                    ? 'bg-gray-800/50 hover:bg-gray-800'
                    : 'bg-gray-50 hover:bg-gray-100'
                }
                ${isSelected ? pal[theme].ring : ''}
              `}
              aria-label={`Seleccionar paleta ${paletteNames[name]}`}
            >
              {/* Color principal */}
              <div className="flex flex-col items-center gap-2">
                <div 
                  className={`w-12 h-12 rounded-full shadow-md flex items-center justify-center transition-all duration-300 ${
                    isSelected ? 'scale-110' : 'group-hover:scale-105'
                  }`}
                  style={{ 
                    backgroundColor: paletteColor,
                    boxShadow: `0 4px 14px ${paletteColor}40`,
                  }}
                >
                  {isSelected && (
                    <Check className="w-6 h-6 text-white animate-in zoom-in-50" strokeWidth={3} />
                  )}
                </div>
                
                {/* Nombre de la paleta */}
                <span className={`text-sm font-medium transition-colors ${
                  isSelected
                    ? isDark ? 'text-white' : 'text-gray-900'
                    : isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {paletteNames[name]}
                </span>
              </div>

              {/* Indicador de colores secundarios */}
              <div className="flex gap-1 mt-3 justify-center">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: pal[theme].primary }}
                />
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: pal[theme].secondary }}
                />
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: pal[theme].primaryLight }}
                />
              </div>

              {/* Badge de seleccionado */}
              {isSelected && (
                <div 
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center shadow-lg animate-in zoom-in-50"
                  style={{ backgroundColor: paletteColor }}
                >
                  <Check className="w-4 h-4 text-white" strokeWidth={3} />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Información de la paleta seleccionada */}
      <div className={`mt-6 p-4 rounded-lg border ${
        isDark 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-gray-50 border-gray-200'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm font-medium ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Paleta Actual
            </p>
            <p className={`text-lg font-bold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {paletteNames[palette]}
            </p>
          </div>
          
          {/* Preview de colores */}
          <div className="flex gap-2">
            {[
              colorPalettes[palette][theme].primary,
              colorPalettes[palette][theme].secondary,
              colorPalettes[palette][theme].primaryLight,
              colorPalettes[palette][theme].secondaryLight,
            ].map((color, idx) => (
              <div
                key={idx}
                className="w-8 h-8 rounded-lg shadow-sm"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
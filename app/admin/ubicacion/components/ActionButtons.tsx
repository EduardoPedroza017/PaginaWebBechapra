"use client";

import { Save, RotateCcw } from "lucide-react";

interface ActionButtonsProps {
  onSave: () => void;
  onReset: () => void;
  saving: boolean;
}

export function ActionButtons({ onSave, onReset, saving }: ActionButtonsProps) {
  return (
    <div className="flex gap-4 pt-4">
      <button
        onClick={onSave}
        disabled={saving}
        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <Save size={20} />
        {saving ? "Guardando..." : "Guardar Cambios"}
      </button>

      <button
        onClick={onReset}
        className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
      >
        <RotateCcw size={20} />
        Resetear
      </button>
    </div>
  );
}

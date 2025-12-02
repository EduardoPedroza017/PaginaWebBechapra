import React from "react";
import { PressItem } from "./page";

interface PressTableProps {
  data: PressItem[];
  loading: boolean;
  onEdit: (item: PressItem) => void;
  onDelete: (id: string) => void;
}

export default function PressTable({ data, loading, onEdit, onDelete }: PressTableProps) {
  return (
    <div className="overflow-x-auto bg-white dark:bg-[#232733] rounded-xl shadow p-4">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-[#E8F4FF] dark:bg-[#181c24] text-black dark:text-white">
            <th className="py-2 px-3 text-left border-b border-blue-100 dark:border-[#232733]">Título</th>
            <th className="py-2 px-3 text-left border-b border-blue-100 dark:border-[#232733]">Fecha</th>
            <th className="py-2 px-3 text-left border-b border-blue-100 dark:border-[#232733]">Resumen</th>
            <th className="py-2 px-3 text-left border-b border-blue-100 dark:border-[#232733]">Archivo</th>
            <th className="py-2 px-3 text-left border-b border-blue-100 dark:border-[#232733]">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={5} className="text-center py-8 text-black dark:text-white">Cargando...</td></tr>
          ) : data.length === 0 ? (
            <tr><td colSpan={5} className="text-center py-8 text-black dark:text-white">Sin comunicados</td></tr>
          ) : data.map((item, idx) => (
            <tr
              key={item.id}
              className={`border-b last:border-b-0 dark:border-[#232733] ${idx % 2 === 0 ? 'bg-white dark:bg-[#232733]' : 'bg-[#f6faff] dark:bg-[#181c24]'}`}
            >
              <td className="py-2 px-3 font-bold text-black dark:text-white">{item.title}</td>
              <td className="py-2 px-3 text-black dark:text-white">{new Date(item.date).toLocaleDateString('es-MX', {day: 'numeric', month: 'long', year: 'numeric'})}</td>
              <td className="py-2 px-3 text-black dark:text-white">{item.excerpt}</td>
              <td className="py-2 px-3 text-black dark:text-white">
                {item.file_url ? (
                  <a href={`http://localhost:5000${item.file_url}`} target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 underline">Ver archivo</a>
                ) : '—'}
              </td>
              <td className="py-2 px-3 flex gap-2">
                <button onClick={() => onEdit(item)} className="px-3 py-1 bg-yellow-200 dark:bg-yellow-700 text-yellow-900 dark:text-yellow-100 rounded">Editar</button>
                <button onClick={() => onDelete(item.id)} className="px-3 py-1 bg-red-200 dark:bg-red-700 text-red-900 dark:text-red-100 rounded">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

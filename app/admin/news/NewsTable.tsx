
import { useState } from "react";
import { NewsItem } from "./NewsFilter";

interface Props {
  news: NewsItem[];
  onEdit: (item: NewsItem) => void;
  onDelete: (item: NewsItem) => void;
  theme: 'light' | 'dark';
}

export default function NewsTable({ news, onEdit, onDelete, theme }: Props) {
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const totalPages = Math.ceil(news.length / pageSize);
  const paginated = news.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div>
      <div className={`overflow-x-auto mt-4 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-[#10192b]' : 'bg-white'}`}>
        <table className="min-w-full">
          <thead>
            <tr className={theme === 'dark' ? 'bg-[#1e293b] text-blue-200' : 'bg-blue-100 text-black'}>
              <th className="px-4 py-2">Fecha</th>
              <th className="px-4 py-2">Título</th>
              <th className="px-4 py-2">Subtítulo</th>
              <th className="px-4 py-2">Descripción</th>
              <th className="px-4 py-2">Imagen</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-8 text-blue-400">Sin registros</td></tr>
            ) : paginated.map((item, i) => (
              <tr key={i} className={theme === 'dark' ? 'border-b border-[#22304a] last:border-none hover:bg-blue-900/20' : 'border-b last:border-none hover:bg-blue-50/60'}>
                <td className={theme === 'dark' ? 'px-4 py-2 whitespace-nowrap text-blue-100' : 'px-4 py-2 whitespace-nowrap text-black'}>{new Date(item.date).toLocaleString()}</td>
                <td className={theme === 'dark' ? 'px-4 py-2 font-semibold text-white' : 'px-4 py-2 font-semibold text-black'}>{item.title}</td>
                <td className={theme === 'dark' ? 'px-4 py-2 text-blue-200' : 'px-4 py-2 text-black'}>{item.subtitle}</td>
                <td className={theme === 'dark' ? 'px-4 py-2 max-w-xs break-words text-blue-100' : 'px-4 py-2 max-w-xs break-words text-black'}>{item.description}</td>
                <td className="px-4 py-2">
                  {item.image_url ? (
                    <img
                      src={`http://localhost:5000${item.image_url}`}
                      alt="img"
                      width={64}
                      height={48}
                      className="object-cover rounded"
                      style={{ width: '64px', height: '48px' }}
                    />
                  ) : <span className="text-gray-400">Sin imagen</span>}
                </td>
                <td className="px-4 py-2">
                  <button onClick={() => onEdit(item)} className="mr-2 px-3 py-1 rounded bg-yellow-400 text-black font-semibold hover:bg-yellow-500">Editar</button>
                  <button onClick={() => onDelete(item)} className="px-3 py-1 rounded bg-red-500 text-white font-semibold hover:bg-red-600">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1 rounded bg-blue-200 text-blue-900 font-semibold disabled:opacity-50">Anterior</button>
          <span className={theme === 'dark' ? 'text-white' : 'text-black'}>Página {page} de {totalPages}</span>
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-1 rounded bg-blue-200 text-blue-900 font-semibold disabled:opacity-50">Siguiente</button>
        </div>
      )}
    </div>
  );
}

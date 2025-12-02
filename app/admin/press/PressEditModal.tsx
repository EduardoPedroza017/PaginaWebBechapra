import React, { useRef } from "react";
import { PressItem } from "./page";

interface PressEditModalProps {
  item: PressItem;
  onClose: () => void;
  onUpdate: (id: string, formData: FormData) => void;
}

export default function PressEditModal({ item, onClose, onUpdate }: PressEditModalProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;
    const formData = new FormData(form);
    onUpdate(item.id, formData);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-[#232733] rounded-xl shadow-lg p-8 min-w-[340px] max-w-[95vw] relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-lg font-bold">×</button>
        <h2 className="text-xl font-bold mb-4 text-[#003d8f] dark:text-white">Editar Comunicado</h2>
        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="font-bold mb-1 dark:text-white">Título</label>
            <input name="title" defaultValue={item.title} required className="border rounded px-3 py-2 w-full bg-white dark:bg-[#181c24] dark:text-white" />
          </div>
          <div>
            <label className="font-bold mb-1 dark:text-white">Fecha</label>
            <input name="date" type="date" defaultValue={item.date?.slice(0,10)} required className="border rounded px-3 py-2 w-full bg-white dark:bg-[#181c24] dark:text-white" />
          </div>
          <div>
            <label className="font-bold mb-1 dark:text-white">Resumen</label>
            <input name="excerpt" defaultValue={item.excerpt} required className="border rounded px-3 py-2 w-full bg-white dark:bg-[#181c24] dark:text-white" />
          </div>
          <div>
            <label className="font-bold mb-1 dark:text-white">Enlace (opcional)</label>
            <input name="link" defaultValue={item.link} className="border rounded px-3 py-2 w-full bg-white dark:bg-[#181c24] dark:text-white" />
          </div>
          <div>
            <label className="font-bold mb-1 dark:text-white">Archivo (opcional)</label>
            <input name="file" type="file" className="border rounded px-3 py-2 w-full bg-white dark:bg-[#181c24] dark:text-white" />
            {item.file_url && (
              <a href={`http://localhost:5000${item.file_url}`} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline text-sm mt-1 block">Ver archivo actual</a>
            )}
          </div>
          <button type="submit" className="bg-[#003d8f] text-white font-bold px-6 py-2 rounded-xl mt-2">Guardar cambios</button>
        </form>
      </div>
    </div>
  );
}

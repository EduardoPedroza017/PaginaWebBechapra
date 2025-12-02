import React, { useRef } from "react";

interface PressFormProps {
  onCreate: (formData: FormData) => void;
}

export default function PressForm({ onCreate }: PressFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;
    const formData = new FormData(form);
    onCreate(formData);
    form.reset();
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-wrap gap-4 items-end bg-white dark:bg-[#232733] p-4 rounded-xl shadow">
      <div className="flex flex-col">
        <label className="font-bold mb-1 dark:text-white">Título</label>
        <input name="title" required className="border rounded px-3 py-2 bg-white dark:bg-[#181c24] dark:text-white" />
      </div>
      <div className="flex flex-col">
        <label className="font-bold mb-1 dark:text-white">Fecha</label>
        <input name="date" type="date" required className="border rounded px-3 py-2 bg-white dark:bg-[#181c24] dark:text-white" />
      </div>
      <div className="flex flex-col flex-1 min-w-[200px]">
        <label className="font-bold mb-1 dark:text-white">Resumen</label>
        <input name="excerpt" required className="border rounded px-3 py-2 bg-white dark:bg-[#181c24] dark:text-white" />
      </div>
      <div className="flex flex-col flex-1 min-w-[200px]">
        <label className="font-bold mb-1 dark:text-white">Enlace (opcional)</label>
        <input name="link" className="border rounded px-3 py-2 bg-white dark:bg-[#181c24] dark:text-white" />
      </div>
      <div className="flex flex-col">
        <label className="font-bold mb-1 dark:text-white">Archivo (opcional)</label>
        <input name="file" type="file" className="border rounded px-3 py-2 bg-white dark:bg-[#181c24] dark:text-white" />
      </div>
      <button type="submit" className="bg-[#003d8f] text-white font-bold px-6 py-2 rounded-xl ml-2">Crear</button>
    </form>
  );
}

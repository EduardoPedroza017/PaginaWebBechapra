import { Button } from "../components/shared/Button";
import { FormInput } from "../components/shared/FormInput";
import { TermSection } from "./types";

interface Props {
  form: { title: string; content: string };
  editing: boolean;
  error: string;
  success: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export function TerminosForm({ form, editing, error, success, onChange, onSubmit, onCancel }: Props) {
  return (
    <form onSubmit={onSubmit} className="space-y-4 text-slate-900 dark:text-slate-100">
      <FormInput label="Título" name="title" value={form.title} onChange={onChange} required />
      <div>
        <label className="block font-medium mb-1 text-slate-700 dark:text-slate-200">Contenido</label>
        <textarea
          name="content"
          value={form.content}
          onChange={onChange}
          className="border rounded px-2 py-1 w-full min-h-[100px] bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-slate-300 dark:border-slate-700 placeholder:text-slate-400 dark:placeholder:text-slate-500"
          required
        />
      </div>
      <div className="flex gap-2 justify-end">
        {editing && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancelar
          </Button>
        )}
        <Button type="submit">{editing ? "Actualizar" : "Agregar"}</Button>
      </div>
      {error && <div className="text-red-400 dark:text-red-300 text-sm">{error}</div>}
      {success && <div className="text-green-600 dark:text-green-400 text-sm">{success}</div>}
    </form>
  );
}

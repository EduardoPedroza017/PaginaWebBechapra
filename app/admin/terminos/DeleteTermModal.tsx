import { Button } from "../components/shared/Button";

interface DeleteTermModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
}

export function DeleteTermModal({ open, onClose, onConfirm, title }: DeleteTermModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-8 w-full max-w-md border border-slate-200 dark:border-slate-700">
        <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">¿Eliminar sección?</h2>
        <p className="mb-6 text-slate-700 dark:text-slate-300">
          ¿Estás seguro de que deseas eliminar <span className="font-semibold">{title || 'esta sección'}</span>? Esta acción no se puede deshacer.
        </p>
        <div className="flex gap-3 justify-end">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="button" variant="danger" onClick={onConfirm}>
            Eliminar
          </Button>
        </div>
      </div>
    </div>
  );
}

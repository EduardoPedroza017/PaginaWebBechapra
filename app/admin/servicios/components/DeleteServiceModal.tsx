import React from "react";
import { Service } from "./ServiceForm";
import { Button } from "../../components/shared/Button";
import { AlertTriangle } from 'lucide-react';

interface DeleteServiceModalProps {
  open: boolean;
  service?: Service;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteServiceModal: React.FC<DeleteServiceModalProps> = ({ open, service, onClose, onConfirm }) => {
  if (!open || !service) return null;
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 px-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-700 rounded-2xl shadow-2xl p-6 transform transition-shadow duration-200">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center shadow-lg">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-1 text-rose-600 dark:text-rose-400">Eliminar servicio</h2>
            <p className="text-sm text-gray-700 dark:text-slate-300">¿Seguro que deseas eliminar <b className="font-semibold">{service.name}</b>?</p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <Button variant="secondary" onClick={onClose} className="px-4 py-2">Cancelar</Button>
          <Button variant="danger" onClick={onConfirm} className="px-4 py-2 shadow-md">Eliminar</Button>
        </div>
      </div>
    </div>
  );
};

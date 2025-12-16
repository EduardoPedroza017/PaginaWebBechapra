import React from "react";
import { Service, ServiceForm } from "./ServiceForm";
import { TranslateText } from "@/components/TranslateText";

interface ServiceEditModalProps {
  open: boolean;
  initialData?: Service;
  onClose: () => void;
  onSave: (data: Service) => void;
  onContinue?: (handle?: string) => void;
}

export const ServiceEditModal: React.FC<ServiceEditModalProps> = ({ open, initialData, onClose, onSave, onContinue }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
        <div className="rounded-lg shadow-lg w-full max-w-5xl p-0 flex flex-col bg-white dark:bg-slate-900">
        <div className="flex justify-between items-center px-6 pt-6 pb-2 border-b">
          <h2 className="text-2xl font-bold">
            <TranslateText text={initialData ? "Editar Servicio" : "Nuevo Servicio"} />
          </h2>
          <button
            onClick={onClose}
            aria-label="Cerrar"
              className="text-gray-500 hover:text-red-500 dark:text-slate-400 text-2xl font-bold px-2"
            type="button"
          >
            ×
          </button>
        </div>
        <div className="overflow-y-auto max-h-[85vh] px-6 py-6">
          <ServiceForm
            initialData={initialData}
            onSubmit={onSave}
            onCancel={onClose}
            onContinue={onContinue}
          />
        </div>
      </div>
    </div>
  );
};

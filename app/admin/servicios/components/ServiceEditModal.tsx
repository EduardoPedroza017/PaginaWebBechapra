import React from "react";
import { Service, ServiceForm } from "./ServiceForm";
import { TranslateText } from "@/components/TranslateText";

interface ServiceEditModalProps {
  open: boolean;
  initialData?: Service;
  onClose: () => void;
  onSave: (data: Service) => void;
}

export const ServiceEditModal: React.FC<ServiceEditModalProps> = ({ open, initialData, onClose, onSave }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-0 flex flex-col">
        <div className="flex justify-between items-center px-6 pt-6 pb-2 border-b">
          <h2 className="text-2xl font-bold">
            <TranslateText text={initialData ? "Editar Servicio" : "Nuevo Servicio"} />
          </h2>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="text-gray-500 hover:text-red-500 text-2xl font-bold px-2"
            type="button"
          >
            ×
          </button>
        </div>
        <div className="overflow-y-auto max-h-[80vh] px-6 py-4">
          <ServiceForm
            initialData={initialData}
            onSubmit={onSave}
            onCancel={onClose}
          />
        </div>
      </div>
    </div>
  );
};

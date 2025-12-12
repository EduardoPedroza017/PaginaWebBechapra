import React from "react";
import { Service } from "./ServiceForm";
import { Button } from "../../components/shared/Button";

interface DeleteServiceModalProps {
  open: boolean;
  service?: Service;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteServiceModal: React.FC<DeleteServiceModalProps> = ({ open, service, onClose, onConfirm }) => {
  if (!open || !service) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-red-600">¿Eliminar servicio?</h2>
        <p className="mb-4">¿Seguro que deseas eliminar <b>{service.name}</b>?</p>
        <div className="flex gap-2 justify-end">
          <Button variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button variant="danger" onClick={onConfirm}>Eliminar</Button>
        </div>
      </div>
    </div>
  );
};

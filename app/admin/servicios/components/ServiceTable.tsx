import React from "react";
import { Button } from "../../components/shared/Button";
import { Service } from "./ServiceForm";

interface ServiceTableProps {
  services: Service[];
  onEdit: (service: Service) => void;
  onDelete: (service: Service) => void;
  onToggleActive: (service: Service) => void;
}

export const ServiceTable: React.FC<ServiceTableProps> = ({ services, onEdit, onDelete, onToggleActive }) => (
  <table className="w-full border mt-4">
    <thead>
      <tr className="bg-slate-100">
        <th className="p-2">Nombre</th>
        <th className="p-2">Slug</th>
        <th className="p-2">Categoría</th>
        <th className="p-2">Activo</th>
        <th className="p-2">Orden</th>
        <th className="p-2">Acciones</th>
      </tr>
    </thead>
    <tbody>
      {services.map((s) => (
        <tr key={s.id} className="border-b">
          <td className="p-2">{s.name}</td>
          <td className="p-2">{s.slug}</td>
          <td className="p-2">{s.category}</td>
          <td className="p-2">
            <button
              className={`px-2 py-1 rounded ${s.active ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}
              onClick={() => onToggleActive(s)}
            >
              {s.active ? "Activo" : "Inactivo"}
            </button>
          </td>
          <td className="p-2">{s.order}</td>
          <td className="p-2 flex gap-2">
            <Button size="sm" onClick={() => onEdit(s)}>Editar</Button>
            <Button size="sm" variant="danger" onClick={() => onDelete(s)}>Eliminar</Button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

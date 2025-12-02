import React from "react";
import { TranslateText } from "@/components/TranslateText";

export function UserTableActions({ onEdit, onDelete, onBlock, bloqueado }: {
  onEdit: () => void;
  onDelete: () => void;
  onBlock?: () => void;
  bloqueado?: boolean;
}) {
  return (
    <div className="flex gap-2 justify-end">
      <button
        onClick={onEdit}
        className="p-1 rounded hover:bg-blue-500 hover:text-white transition-colors"
        title={undefined}
        aria-label="Editar usuario"
      >
        <span className="sr-only"><TranslateText text="Editar usuario" /></span>
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-1.414.828l-4.243 1.414 1.414-4.243a4 4 0 01.828-1.414z"></path></svg>
      </button>
      <button
        onClick={onDelete}
        className="p-1 rounded hover:bg-red-500 hover:text-white transition-colors"
        title={undefined}
        aria-label="Eliminar usuario"
      >
        <span className="sr-only"><TranslateText text="Eliminar usuario" /></span>
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"></path></svg>
      </button>
      {onBlock && (
        <button
          onClick={onBlock}
          className={`p-1 rounded ${bloqueado ? "bg-yellow-500 hover:bg-yellow-600 text-white" : "bg-gray-300 hover:bg-yellow-400 text-gray-800"} transition-colors`}
          title={undefined}
          aria-label={bloqueado ? "Desbloquear usuario" : "Bloquear usuario"}
        >
          <span className="sr-only">
            <TranslateText text={bloqueado ? "Desbloquear usuario" : "Bloquear usuario"} />
          </span>
          {bloqueado ? (
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4M7 17a4 4 0 0010 0V9a4 4 0 00-8 0v8z" /></svg>
          ) : (
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><line x1="8" y1="12" x2="16" y2="12" /></svg>
          )}
        </button>
      )}
    </div>
  );
}

import React from "react";
import type { OrganigramaNode } from "./OrganigramaAPI";

interface Props {
  nodes: OrganigramaNode[];
  theme?: 'light' | 'dark';
}

export function OrganigramaTree({ nodes, theme = 'light' }: Props) {
  if (!nodes || nodes.length === 0) return <div className="text-gray-400 text-center">Sin estructura definida.</div>;
  return (
    <div className="flex flex-col items-center">
      {nodes.map((node) => (
        <OrganigramaNodeView key={node.id} node={node} theme={theme} />
      ))}
    </div>
  );
}

function OrganigramaNodeView({ node, theme = 'light' }: { node: OrganigramaNode; theme?: 'light' | 'dark' }) {
  return (
    <div className="flex flex-col items-center mb-8">
      <div className={`flex flex-col items-center shadow rounded-xl border px-6 py-4 min-w-[220px] ${theme === 'dark' ? 'bg-gray-900 border-blue-900' : 'bg-white border-blue-100'}`}>
        {node.imagen && (
          <img
            src={node.imagen.startsWith('/uploads/') ? `http://localhost:5000${node.imagen}` : node.imagen}
            alt={node.nombre}
            className={`w-16 h-16 rounded-full object-cover mb-2 border ${theme === 'dark' ? 'border-blue-900' : 'border-blue-200'}`}
          />
        )}
        <div className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-blue-900'}`}>{node.nombre}</div>
        <div className={`font-semibold text-sm mb-1 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>{node.puesto}</div>
        {node.descripcion && <div className={`text-xs text-center mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{node.descripcion}</div>}
      </div>
      {node.hijos && node.hijos.length > 0 && (
        <div className="flex flex-row justify-center mt-4 gap-8">
          {node.hijos.map((hijo) => (
            <OrganigramaNodeView key={hijo.id} node={hijo} theme={theme} />
          ))}
        </div>
      )}
    </div>
  );
}

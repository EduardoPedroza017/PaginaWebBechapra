"use client";

import React from "react";
import { User, Briefcase, ChevronDown, Network } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";
import type { OrganigramaNode } from "./OrganigramaAPI";

interface Props {
  nodes: OrganigramaNode[];
  theme?: 'light' | 'dark';
}

export function OrganigramaTree({ nodes, theme = 'light' }: Props) {
  if (!nodes || nodes.length === 0) {
    return (
      <div className={`rounded-2xl border p-8 ${
        theme === 'dark' ? 'bg-gray-900/80 border-gray-800' : 'bg-white border-gray-100 shadow-sm'
      }`}>
        <div className="text-center py-8">
          <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
            theme === "dark" ? "bg-gray-800" : "bg-gray-100"
          }`}>
            <Network className={`w-8 h-8 ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`} />
          </div>
          <p className={`text-base font-medium mb-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            <TranslateText text="Sin estructura definida" />
          </p>
          <p className={`text-sm ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
            <TranslateText text="Agrega directivos para crear el organigrama" />
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl border overflow-hidden ${
      theme === 'dark' ? 'bg-gray-900/80 border-gray-800' : 'bg-white border-gray-100 shadow-sm'
    }`}>
      {/* Header */}
      <div className={`px-5 py-4 border-b ${theme === 'dark' ? 'border-gray-800' : 'border-gray-100'}`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            theme === 'dark' ? 'bg-blue-600/20' : 'bg-blue-100'
          }`}>
            <Network className={`w-5 h-5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
          </div>
          <div>
            <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              <TranslateText text="Vista del Organigrama" />
            </h3>
            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              <TranslateText text="Estructura jerárquica de la organización" />
            </p>
          </div>
        </div>
      </div>

      {/* Tree View */}
      <div className="p-6 overflow-x-auto">
        <div className="flex flex-col items-center min-w-fit">
          {nodes.map((node, idx) => (
            <OrganigramaNodeView key={node.id} node={node} theme={theme} isLast={idx === nodes.length - 1} />
          ))}
        </div>
      </div>
    </div>
  );
}

function OrganigramaNodeView({ node, theme = 'light', isLast = false }: { node: OrganigramaNode; theme?: 'light' | 'dark'; isLast?: boolean }) {
  const hasChildren = node.hijos && node.hijos.length > 0;

  return (
    <div className="flex flex-col items-center">
      {/* Node Card */}
      <div className={`relative rounded-2xl border p-4 min-w-[200px] max-w-[280px] transition-all hover:scale-[1.02] ${
        theme === 'dark' 
          ? 'bg-gray-800 border-gray-700 hover:border-blue-600/50' 
          : 'bg-white border-gray-200 shadow-sm hover:shadow-md hover:border-blue-300'
      }`}>
        {/* Image */}
        <div className="flex justify-center mb-3">
          {node.imagen ? (
            <img
              src={node.imagen.startsWith('/uploads/') ? `http://localhost:5000${node.imagen}` : node.imagen}
              alt={node.nombre}
              className={`w-16 h-16 rounded-full object-cover border-2 ${
                theme === 'dark' ? 'border-blue-600/50' : 'border-blue-200'
              }`}
            />
          ) : (
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              <User className={`w-8 h-8 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="text-center">
          <h4 className={`font-bold text-sm mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {node.nombre || <TranslateText text="Sin nombre" />}
          </h4>
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${
            theme === 'dark' 
              ? 'bg-blue-600/20 text-blue-400' 
              : 'bg-blue-100 text-blue-700'
          }`}>
            <Briefcase className="w-3 h-3" />
            {node.puesto || <TranslateText text="Sin puesto" />}
          </div>
          {node.descripcion && (
            <p className={`mt-2 text-xs line-clamp-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              {node.descripcion}
            </p>
          )}
        </div>
      </div>

      {/* Connector Line */}
      {hasChildren && (
        <div className="flex flex-col items-center">
          <div className={`w-0.5 h-6 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`} />
          <ChevronDown className={`w-4 h-4 -my-1 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`} />
          <div className={`w-0.5 h-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`} />
        </div>
      )}

      {/* Children */}
      {hasChildren && (
        <div className="relative">
          {/* Horizontal line */}
          {node.hijos!.length > 1 && (
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 h-0.5 ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'
            }`} style={{ width: `${(node.hijos!.length - 1) * 220}px` }} />
          )}
          
          <div className="flex flex-row justify-center gap-6 pt-0">
            {node.hijos!.map((hijo, idx) => (
              <div key={hijo.id} className="flex flex-col items-center">
                {/* Vertical connector from horizontal line */}
                <div className={`w-0.5 h-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`} />
                <OrganigramaNodeView node={hijo} theme={theme} isLast={idx === node.hijos!.length - 1} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom spacing */}
      {!hasChildren && !isLast && <div className="h-6" />}
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { User, Briefcase, ChevronDown, Network, Award } from "lucide-react";
import Image from "next/image";
import { TranslateText } from "@/components/TranslateText";
import type { OrganigramaNode } from "./OrganigramaAPI";
import { NIVEL_OPTIONS, NIVEL_OPTIONS_DARK } from "./OrganigramaAPI";

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
    <div className={`rounded-2xl border backdrop-blur-xl overflow-hidden transition-all ${
      theme === 'dark' 
        ? 'bg-gray-900/80 border-gray-700/50 shadow-2xl shadow-purple-900/20' 
        : 'bg-white/95 border-white/20 shadow-xl shadow-blue-200/30'
    }`}>
      {/* Header */}
      <div className={`px-5 py-4 border-b backdrop-blur-md ${
        theme === 'dark' 
          ? 'border-gray-700/50 bg-gradient-to-r from-blue-600/10 to-purple-600/10' 
          : 'border-blue-100/50 bg-gradient-to-r from-blue-50/50 to-purple-50/50'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
            theme === 'dark' 
              ? 'bg-gradient-to-br from-blue-600/40 to-purple-600/40 shadow-lg shadow-blue-500/20' 
              : 'bg-gradient-to-br from-blue-100 to-purple-100 shadow-md shadow-blue-200/50'
          }`}>
            <Network className={`w-5 h-5 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}`} />
          </div>
          <div>
            <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              <TranslateText text="Vista del Organigrama" />
            </h3>
            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
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
      <div className={`relative rounded-2xl border p-4 min-w-[200px] max-w-[280px] backdrop-blur-md transition-all hover:scale-105 cursor-pointer group ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-gray-800/95 to-gray-900/95 border-gray-700/50 hover:border-blue-500/60 shadow-xl shadow-gray-900/50 hover:shadow-2xl hover:shadow-blue-500/30' 
          : 'bg-gradient-to-br from-white/98 to-blue-50/95 border-blue-200/40 shadow-lg shadow-blue-200/20 hover:shadow-xl hover:shadow-blue-300/40 hover:border-blue-400/60'
      }`}>
        {/* Image */}
        <div className="flex justify-center mb-3">
          {node.imagen ? (
            <div className={`relative w-16 h-16 rounded-full overflow-hidden border-2 ring-2 transition-all group-hover:ring-4 ${
              theme === 'dark' 
                ? 'border-blue-500/60 ring-blue-500/30 group-hover:ring-blue-400/40' 
                : 'border-blue-300 ring-blue-200/50 group-hover:ring-blue-300/60'
            }`}>
              <Image
                src={node.imagen.startsWith('/uploads/') ? `http://localhost:5000${node.imagen}` : node.imagen}
                alt={node.nombre}
                fill
                className="object-cover"
                sizes="64px"
                unoptimized={node.imagen.startsWith('/uploads/')}
              />
            </div>
          ) : (
            <div className={`w-16 h-16 rounded-full flex items-center justify-center border-2 ring-2 transition-all group-hover:ring-4 ${
              theme === 'dark' 
                ? 'bg-gradient-to-br from-gray-700/80 to-gray-800/80 border-gray-600/50 ring-gray-600/30 group-hover:ring-blue-500/40' 
                : 'bg-gradient-to-br from-gray-100 to-gray-200 border-gray-300/50 ring-gray-200/50 group-hover:ring-blue-300/60'
            }`}>
              <User className={`w-8 h-8 ${theme === 'dark' ? 'text-gray-500 group-hover:text-blue-400' : 'text-gray-400 group-hover:text-blue-500'} transition-colors`} />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="text-center">
          <h4 className={`font-bold text-sm mb-2 transition-colors ${theme === 'dark' ? 'text-white group-hover:text-blue-300' : 'text-gray-900 group-hover:text-blue-600'}`}>
            {node.nombre || <TranslateText text="Sin nombre" />}
          </h4>
          {node.nivel && (
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold mb-2 transition-all backdrop-blur-sm border ${
              theme === 'dark'
                ? `${NIVEL_OPTIONS_DARK[node.nivel as keyof typeof NIVEL_OPTIONS_DARK].bgColor} ${NIVEL_OPTIONS_DARK[node.nivel as keyof typeof NIVEL_OPTIONS_DARK].color} border-current/20`
                : `${NIVEL_OPTIONS.find(o => o.value === node.nivel)?.bgColor} ${NIVEL_OPTIONS.find(o => o.value === node.nivel)?.color} border-current/20`
            }`}>
              <Award className="w-3 h-3" />
              {node.nivel}
            </div>
          )}
          <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all backdrop-blur-sm ${
            theme === 'dark' 
              ? 'bg-blue-600/30 text-blue-300 border border-blue-500/30 group-hover:bg-blue-600/40' 
              : 'bg-blue-100/60 text-blue-700 border border-blue-200/60 group-hover:bg-blue-200/80'
          }`}>
            <Briefcase className="w-3.5 h-3.5" />
            {node.puesto || <TranslateText text="Sin puesto" />}
          </div>
          {node.descripcion && (
            <p className={`mt-2.5 text-xs line-clamp-2 transition-colors ${theme === 'dark' ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-600 group-hover:text-gray-700'}`}>
              {node.descripcion}
            </p>
          )}
        </div>
      </div>

      {/* Connector Line */}
      {hasChildren && (
        <div className="flex flex-col items-center animate-pulse">
          <div className={`w-1 h-6 rounded-full transition-all ${theme === 'dark' ? 'bg-gradient-to-b from-blue-500/60 to-purple-600/40' : 'bg-gradient-to-b from-blue-400/60 to-purple-500/40'}`} />
          <ChevronDown className={`w-5 h-5 -my-1 transition-all ${theme === 'dark' ? 'text-blue-400/70' : 'text-blue-500/70'}`} />
          <div className={`w-1 h-4 rounded-full transition-all ${theme === 'dark' ? 'bg-gradient-to-b from-purple-600/40 to-transparent' : 'bg-gradient-to-b from-purple-500/40 to-transparent'}`} />
        </div>
      )}

      {/* Children */}
      {hasChildren && (
        <div className="relative">
          {/* Horizontal line */}
          {node.hijos!.length > 1 && (
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 h-1 rounded-full ${
              theme === 'dark' 
                ? 'bg-gradient-to-r from-transparent via-blue-500/50 to-transparent' 
                : 'bg-gradient-to-r from-transparent via-blue-400/50 to-transparent'
            }`} style={{ width: `${(node.hijos!.length - 1) * 220}px` }} />
          )}
          
          <div className="flex flex-row justify-center gap-6 pt-0">
            {node.hijos!.map((hijo, idx) => (
              <div key={hijo.id} className="flex flex-col items-center">
                {/* Vertical connector from horizontal line */}
                <div className={`w-1 h-4 rounded-full transition-all ${
                  theme === 'dark' 
                    ? 'bg-gradient-to-b from-blue-500/50 to-transparent' 
                    : 'bg-gradient-to-b from-blue-400/50 to-transparent'
                }`} />
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

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { DragDropContext, Droppable, Draggable, DropResult, DroppableProvided, DraggableProvided, DraggableStateSnapshot } from "@hello-pangea/dnd";
import { GripVertical, User, Briefcase, FileText, Upload, Trash2, Plus, X, Award } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";
import type { OrganigramaNode } from "./OrganigramaAPI";
import { NIVEL_OPTIONS, NIVEL_OPTIONS_DARK } from "./OrganigramaAPI";
import DeleteNodeModal from "./DeleteNodeModal";
import { ValidationDisplay } from "./ValidationDisplay";

interface Props {
  nodes: OrganigramaNode[];
  onChange: (nodes: OrganigramaNode[]) => void;
  theme?: 'light' | 'dark';
}

export function OrganigramaEditor({ nodes, onChange, theme = 'light' }: Props) {
  const [deleteNode, setDeleteNode] = useState<OrganigramaNode | null>(null);
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reordered = Array.from(nodes);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    onChange(reordered);
  };

  const handleAdd = () => {
    const nuevo: OrganigramaNode = {
      id: Date.now().toString(),
      nombre: "",
      puesto: "",
      descripcion: "",
      imagen: "",
      nivel: undefined,
      padreid: undefined,
      hijos: [],
    };
    onChange([...nodes, nuevo]);
  };

  const handleRemove = (id: string) => {
    onChange(nodes.filter((n) => n.id !== id));
    setDeleteNode(null);
  };

  const handleField = (id: string, field: keyof OrganigramaNode, value: string) => {
    onChange(nodes.map((n) => n.id === id ? { ...n, [field]: value } : n));
  };

  const handleImage = async (id: string, file: File) => {
    setUploadingId(id);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('http://localhost:5000/api/organigrama/upload', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        if (data.url) {
          handleField(id, 'imagen', data.url);
        }
      }
    } finally {
      setUploadingId(null);
    }
  };

  const removeImage = (id: string) => {
    handleField(id, 'imagen', '');
  };

  return (
    <>
      <div className={`rounded-2xl border backdrop-blur-xl overflow-hidden transition-all ${
        theme === 'dark' 
          ? 'bg-gray-900/80 border-gray-700/50 shadow-2xl shadow-purple-900/20' 
          : 'bg-white/95 border-white/20 shadow-xl shadow-blue-200/30'
      }`}>
        {/* Header */}
        <div className={`px-5 py-4 border-b backdrop-blur-md ${
          theme === 'dark' 
            ? 'border-gray-700/50 bg-gradient-to-r from-green-600/10 to-emerald-600/10' 
            : 'border-green-100/50 bg-gradient-to-r from-green-50/50 to-emerald-50/50'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                theme === 'dark' 
                  ? 'bg-gradient-to-br from-green-600/40 to-emerald-600/40 shadow-lg shadow-green-500/20' 
                  : 'bg-gradient-to-br from-green-100 to-emerald-100 shadow-md shadow-green-200/50'
              }`}>
                <FileText className={`w-5 h-5 ${theme === 'dark' ? 'text-green-300' : 'text-green-600'}`} />
              </div>
              <div>
                <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  <TranslateText text="Editor de Estructura" />
                </h3>
                <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  <TranslateText text="Organiza y edita los directivos" />
                </p>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              theme === 'dark' ? 'bg-amber-600/20 text-amber-400' : 'bg-amber-100 text-amber-700'
            }`}>
              {nodes.length} <TranslateText text="directivos" />
            </span>
          </div>
        </div>

        {/* Editor List */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="organigrama-list">
            {(provided: DroppableProvided) => (
              <div 
                className={`p-4 space-y-3 ${theme === 'dark' ? 'divide-gray-800' : 'divide-gray-100'}`}
                ref={provided.innerRef} 
                {...provided.droppableProps}
              >
                {nodes.length === 0 && (
                  <div className={`text-center py-8 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                    <TranslateText text="No hay directivos. Agrega uno para comenzar." />
                  </div>
                )}

                {nodes.map((n, idx) => (
                  <Draggable key={n.id} draggableId={n.id} index={idx}>
                    {(dragProvided: DraggableProvided, dragSnapshot: DraggableStateSnapshot) => (
                      <div
                        ref={dragProvided.innerRef}
                        {...dragProvided.draggableProps}
                        className={`rounded-xl border p-4 backdrop-blur-sm transition-all ${
                          theme === 'dark' 
                            ? 'bg-gray-800/90 border-gray-700/50 hover:border-gray-600' 
                            : 'bg-white/95 border-gray-200/50 hover:border-gray-300'
                        } ${dragSnapshot.isDragging ? 'shadow-2xl ring-2 ring-emerald-500 scale-[1.02]' : 'shadow-md'}`}
                        style={dragProvided.draggableProps.style}
                      >
                        <div className="flex items-start gap-4">
                          {/* Drag Handle */}
                          <div 
                            {...dragProvided.dragHandleProps}
                            className={`p-2 rounded-lg cursor-grab active:cursor-grabbing transition-all ${
                              theme === 'dark' ? 'hover:bg-gray-700/70' : 'hover:bg-gray-100/70'
                            }`}
                          >
                            <GripVertical className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                          </div>

                          {/* Image Section */}
                          <div className="flex flex-col items-center gap-2">
                            {n.imagen ? (
                              <div className={`relative group w-16 h-16 rounded-full overflow-hidden border-2 ring-2 transition-all ${
                                theme === 'dark' 
                                  ? 'border-blue-500/60 ring-blue-500/30' 
                                  : 'border-blue-300 ring-blue-200/50'
                              }`}>
                                <Image
                                  src={n.imagen.startsWith('/uploads/') ? `http://localhost:5000${n.imagen}` : n.imagen}
                                  alt="Directivo"
                                  fill
                                  className="object-cover"
                                  sizes="64px"
                                  unoptimized={n.imagen.startsWith('/uploads/')}
                                />
                                <button
                                  onClick={() => removeImage(n.id)}
                                  className="absolute -top-1 -right-1 p-1 rounded-full bg-red-500/90 text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            ) : (
                              <div className={`w-16 h-16 rounded-full flex items-center justify-center border-2 ring-2 transition-all ${
                                theme === 'dark' 
                                  ? 'bg-gradient-to-br from-gray-700/80 to-gray-800/80 border-gray-600/50 ring-gray-600/30' 
                                  : 'bg-gradient-to-br from-gray-100 to-gray-200 border-gray-300/50 ring-gray-200/50'
                              }`}>
                                {uploadingId === n.id ? (
                                  <div className="w-5 h-5 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
                                ) : (
                                  <User className={`w-8 h-8 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                                )}
                              </div>
                            )}
                            <label className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all backdrop-blur-sm ${
                              theme === 'dark'
                                ? 'bg-gradient-to-r from-emerald-600/30 to-green-600/30 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600/40'
                                : 'bg-gradient-to-r from-emerald-100/60 to-green-100/60 text-emerald-700 border border-emerald-200/60 hover:bg-emerald-200/80'
                            }`}>
                              <Upload className="w-3.5 h-3.5" />
                              <TranslateText text="Foto" />
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={e => {
                                  if (e.target.files && e.target.files[0]) {
                                    handleImage(n.id, e.target.files[0]);
                                  }
                                }}
                              />
                            </label>
                          </div>

                          {/* Fields */}
                          <div className="flex-1 space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div>
                                <label className={`flex items-center gap-1.5 text-xs font-semibold mb-1.5 ${
                                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                                }`}>
                                  <User className="w-3.5 h-3.5" />
                                  <TranslateText text="Nombre" />
                                </label>
                                <input
                                  className={`w-full px-3 py-2 rounded-lg border text-sm transition-all ${
                                    theme === 'dark' 
                                      ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-emerald-500' 
                                      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500'
                                  }`}
                                  placeholder="Nombre completo"
                                  value={n.nombre}
                                  onChange={e => handleField(n.id, "nombre", e.target.value)}
                                />
                              </div>
                              <div>
                                <label className={`flex items-center gap-1.5 text-xs font-semibold mb-1.5 ${
                                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                                }`}>
                                  <Briefcase className="w-3.5 h-3.5" />
                                  <TranslateText text="Puesto" />
                                </label>
                                <input
                                  className={`w-full px-3 py-2 rounded-lg border text-sm transition-all ${
                                    theme === 'dark' 
                                      ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-emerald-500' 
                                      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500'
                                  }`}
                                  placeholder="Cargo o puesto"
                                  value={n.puesto}
                                  onChange={e => handleField(n.id, "puesto", e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div>
                                <label className={`flex items-center gap-1.5 text-xs font-semibold mb-1.5 ${
                                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                                }`}>
                                  <Award className="w-3.5 h-3.5" />
                                  <TranslateText text="Nivel Jerárquico" />
                                </label>
                                <select
                                  className={`w-full px-3 py-2 rounded-lg border text-sm transition-all appearance-none cursor-pointer ${
                                    theme === 'dark' 
                                      ? 'bg-gray-900 border-gray-700 text-white focus:border-emerald-500' 
                                      : 'bg-white border-gray-200 text-gray-900 focus:border-emerald-500'
                                  }`}
                                  value={n.nivel || ''}
                                  onChange={e => handleField(n.id, "nivel", e.target.value)}
                                >
                                  <option value="">-- Selecciona nivel --</option>
                                  {NIVEL_OPTIONS.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                      {opt.label}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                {n.nivel && (
                                  <div className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-medium ${
                                    theme === 'dark'
                                      ? `${NIVEL_OPTIONS_DARK[n.nivel as keyof typeof NIVEL_OPTIONS_DARK].bgColor} ${NIVEL_OPTIONS_DARK[n.nivel as keyof typeof NIVEL_OPTIONS_DARK].color}`
                                      : `${NIVEL_OPTIONS.find(o => o.value === n.nivel)?.bgColor} ${NIVEL_OPTIONS.find(o => o.value === n.nivel)?.color}`
                                  }`}>
                                    <Award className="w-3.5 h-3.5" />
                                    {n.nivel}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div>
                              <label className={`flex items-center gap-1.5 text-xs font-semibold mb-1.5 ${
                                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                              }`}>
                                <FileText className="w-3.5 h-3.5" />
                                <TranslateText text="Descripción" />
                              </label>
                              <input
                                className={`w-full px-3 py-2 rounded-lg border text-sm transition-all ${
                                  theme === 'dark' 
                                    ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-emerald-500' 
                                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500'
                                }`}
                                placeholder="Descripción breve (opcional)"
                                value={n.descripcion || ""}
                                onChange={e => handleField(n.id, "descripcion", e.target.value)}
                              />
                            </div>
                          </div>

                          {/* Delete Button */}
                          <button 
                            onClick={() => setDeleteNode(n)}
                            className={`p-2 rounded-lg transition-all ${
                              theme === 'dark' 
                                ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30' 
                                : 'bg-red-100 text-red-600 hover:bg-red-200'
                            }`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {/* Add Button */}
        <div className={`px-4 pb-4`}>
          <button
            className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all hover:opacity-90 active:scale-[0.98] bg-emerald-600 text-white`}
            onClick={handleAdd}
          >
            <Plus className="w-5 h-5" />
            <TranslateText text="Agregar Directivo" />
          </button>
        </div>
      </div>

      {/* Validation Section */}
      {nodes.length > 0 && (
        <div className="mt-6">
          <ValidationDisplay nodes={nodes} theme={theme} />
        </div>
      )}

      {/* Delete Modal */}
      {deleteNode && (
        <DeleteNodeModal
          nodeName={deleteNode.nombre}
          onCancel={() => setDeleteNode(null)}
          onConfirm={() => handleRemove(deleteNode.id)}
          theme={theme}
        />
      )}
    </>
  );
}

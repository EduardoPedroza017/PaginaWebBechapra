"use client";

import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult, DroppableProvided, DraggableProvided, DraggableStateSnapshot } from "@hello-pangea/dnd";
import { GripVertical, User, Briefcase, FileText, Upload, Trash2, Plus, Image as ImageIcon, X } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";
import type { OrganigramaNode } from "./OrganigramaAPI";
import DeleteNodeModal from "./DeleteNodeModal";

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
      <div className={`rounded-2xl border overflow-hidden ${
        theme === 'dark' ? 'bg-gray-900/80 border-gray-800' : 'bg-white border-gray-100 shadow-sm'
      }`}>
        {/* Header */}
        <div className={`px-5 py-4 border-b ${theme === 'dark' ? 'border-gray-800' : 'border-gray-100'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                theme === 'dark' ? 'bg-amber-600/20' : 'bg-amber-100'
              }`}>
                <User className={`w-5 h-5 ${theme === 'dark' ? 'text-amber-400' : 'text-amber-600'}`} />
              </div>
              <div>
                <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  <TranslateText text="Editor de Directivos" />
                </h3>
                <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  <TranslateText text="Arrastra para reordenar" />
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
                        className={`rounded-xl border p-4 transition-all ${
                          theme === 'dark' 
                            ? 'bg-gray-800 border-gray-700' 
                            : 'bg-gray-50 border-gray-200'
                        } ${dragSnapshot.isDragging ? 'shadow-2xl ring-2 ring-emerald-500 scale-[1.02]' : ''}`}
                        style={dragProvided.draggableProps.style}
                      >
                        <div className="flex items-start gap-4">
                          {/* Drag Handle */}
                          <div 
                            {...dragProvided.dragHandleProps}
                            className={`p-2 rounded-lg cursor-grab active:cursor-grabbing ${
                              theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                            }`}
                          >
                            <GripVertical className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                          </div>

                          {/* Image Section */}
                          <div className="flex flex-col items-center gap-2">
                            {n.imagen ? (
                              <div className="relative group">
                                <img
                                  src={n.imagen.startsWith('/uploads/') ? `http://localhost:5000${n.imagen}` : n.imagen}
                                  alt="Directivo"
                                  className={`w-16 h-16 rounded-full object-cover border-2 ${
                                    theme === 'dark' ? 'border-blue-600/50' : 'border-blue-200'
                                  }`}
                                />
                                <button
                                  onClick={() => removeImage(n.id)}
                                  className="absolute -top-1 -right-1 p-1 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            ) : (
                              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                                theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                              }`}>
                                {uploadingId === n.id ? (
                                  <div className="w-5 h-5 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
                                ) : (
                                  <User className={`w-8 h-8 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                                )}
                              </div>
                            )}
                            <label className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                              theme === 'dark'
                                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                            }`}>
                              <ImageIcon className="w-3.5 h-3.5" />
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

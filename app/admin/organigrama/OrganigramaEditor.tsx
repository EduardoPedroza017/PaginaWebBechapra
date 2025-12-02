import React from "react";
import { DragDropContext, Droppable, Draggable, DropResult, DroppableProvided, DraggableProvided, DraggableStateSnapshot } from "@hello-pangea/dnd";
import type { OrganigramaNode } from "./OrganigramaAPI";

interface Props {
  nodes: OrganigramaNode[];
  onChange: (nodes: OrganigramaNode[]) => void;
  theme?: 'light' | 'dark';
}

// Editor simple: permite agregar, editar y eliminar nodos de primer nivel (puedes expandirlo a hijos si lo deseas)
export function OrganigramaEditor({ nodes, onChange, theme = 'light' }: Props) {
  // Drag & drop handler
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
  };
  const handleField = (id: string, field: keyof OrganigramaNode, value: string) => {
    onChange(nodes.map((n) => n.id === id ? { ...n, [field]: value } : n));
  };

  // Manejar subida de imagen
  const handleImage = async (id: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    // Usar la ruta del backend Flask para organigrama
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
  };
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="organigrama-list">
        {(provided: DroppableProvided) => (
          <div className="space-y-6" ref={provided.innerRef} {...provided.droppableProps}>
            {nodes.map((n, idx) => (
              <Draggable key={n.id} draggableId={n.id} index={idx}>
                {(dragProvided: DraggableProvided, dragSnapshot: DraggableStateSnapshot) => (
                  <div
                    ref={dragProvided.innerRef}
                    {...dragProvided.draggableProps}
                    {...dragProvided.dragHandleProps}
                    className={`flex flex-col md:flex-row items-center gap-4 rounded-xl p-4 border transition-shadow ${theme === 'dark' ? 'bg-gray-900 border-blue-900' : 'bg-white border-blue-100'} ${dragSnapshot.isDragging ? 'shadow-2xl ring-2 ring-blue-400' : ''}`}
                    style={{ ...dragProvided.draggableProps.style, cursor: 'grab' }}
                  >
                    <input
                      className={`border px-2 py-1 rounded w-40 ${theme === 'dark' ? 'bg-gray-800 text-white border-blue-900 placeholder-gray-400' : ''}`}
                      placeholder="Nombre"
                      value={n.nombre}
                      onChange={e => handleField(n.id, "nombre", e.target.value)}
                    />
                    <input
                      className={`border px-2 py-1 rounded w-40 ${theme === 'dark' ? 'bg-gray-800 text-white border-blue-900 placeholder-gray-400' : ''}`}
                      placeholder="Puesto"
                      value={n.puesto}
                      onChange={e => handleField(n.id, "puesto", e.target.value)}
                    />
                    <input
                      className={`border px-2 py-1 rounded w-56 ${theme === 'dark' ? 'bg-gray-800 text-white border-blue-900 placeholder-gray-400' : ''}`}
                      placeholder="Descripción"
                      value={n.descripcion || ""}
                      onChange={e => handleField(n.id, "descripcion", e.target.value)}
                    />
                    <div className="flex flex-col items-center">
                      {n.imagen && (
                        <img
                          src={n.imagen && n.imagen.startsWith('/uploads/') ? `http://localhost:5000${n.imagen}` : n.imagen}
                          alt="Imagen directivo"
                          className="w-12 h-12 rounded-full object-cover mb-1 border border-blue-300"
                          onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        className="block text-sm text-gray-500 file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        onChange={e => {
                          if (e.target.files && e.target.files[0]) {
                            handleImage(n.id, e.target.files[0]);
                          }
                        }}
                      />
                    </div>
                    <button className="text-red-600 font-bold px-3 py-1" onClick={() => handleRemove(n.id)}>Eliminar</button>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            <button
              className={`px-5 py-2 rounded-lg font-bold mt-2 ${theme === 'dark' ? 'bg-blue-800 text-white hover:bg-blue-600' : 'bg-blue-700 text-white'}`}
              onClick={handleAdd}
            >
              Agregar directivo
            </button>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

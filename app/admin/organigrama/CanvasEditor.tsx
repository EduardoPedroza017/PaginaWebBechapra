import React, { useRef, useState } from "react";
import { Stage, Layer, Rect, Circle, Line, Text } from "react-konva";

// Tipos de figura
const SHAPES = ["rect", "circle", "line", "text"] as const;
type ShapeType = typeof SHAPES[number];

type Shape =
  | { id: string; type: "rect"; x: number; y: number; width: number; height: number; fill: string }
  | { id: string; type: "circle"; x: number; y: number; radius: number; fill: string }
  | { id: string; type: "line"; points: number[]; stroke: string; strokeWidth: number }
  | { id: string; type: "text"; x: number; y: number; text: string; fontSize: number; fill: string };

interface CanvasEditorProps {
  initialShapes?: Shape[];
  onShapesChange?: (shapes: Shape[]) => void;
}

export default function CanvasEditor({ initialShapes = [], onShapesChange }: CanvasEditorProps) {
  const [shapes, setShapes] = useState<Shape[]>(initialShapes);
  const [selected, setSelected] = useState<string | null>(null);
  const [mode, setMode] = useState<ShapeType>("rect");
  const stageRef = useRef<any>(null);

  // Sincronizar shapes externos si cambian (por ejemplo, al regresar de plantilla)
  React.useEffect(() => {
    setShapes(initialShapes);
  }, [initialShapes]);

  // Añadir figura
  function handleStageClick(e: any) {
    // Solo agregar si se hace click en el fondo
    if (e.target === e.target.getStage()) {
      const pos = e.target.getPointerPosition();
      if (!pos) return;
      let newShape: Shape;
      if (mode === "rect") {
        newShape = {
          id: crypto.randomUUID(),
          type: "rect",
          x: pos.x,
          y: pos.y,
          width: 120,
          height: 60,
          fill: "#4f8cff",
        };
      } else if (mode === "circle") {
        newShape = {
          id: crypto.randomUUID(),
          type: "circle",
          x: pos.x,
          y: pos.y,
          radius: 40,
          fill: "#22c55e",
        };
      } else if (mode === "line") {
        newShape = {
          id: crypto.randomUUID(),
          type: "line",
          points: [pos.x, pos.y, pos.x + 100, pos.y],
          stroke: "#f59e42",
          strokeWidth: 4,
        };
      } else {
        newShape = {
          id: crypto.randomUUID(),
          type: "text",
          x: pos.x,
          y: pos.y,
          text: "Nuevo nodo",
          fontSize: 20,
          fill: "#222",
        };
      }
      const updated = [...shapes, newShape];
      setShapes(updated);
      setSelected(newShape.id);
      if (onShapesChange) onShapesChange(updated);
    }
  }

  // Drag & select
  function handleDrag(id: string, x: number, y: number) {
    setShapes((prev) => {
      const updated = prev.map((s) =>
        s.id === id
          ? s.type === "rect"
            ? { ...s, x, y }
            : s.type === "circle"
            ? { ...s, x, y }
            : s.type === "text"
            ? { ...s, x, y }
            : s
          : s
      );
      if (onShapesChange) onShapesChange(updated);
      return updated;
    });
  }

  // Exportar como imagen PNG
  function handleExportImage() {
    if (stageRef.current) {
      const uri = stageRef.current.toDataURL();
      const link = document.createElement("a");
      link.download = "organigrama.png";
      link.href = uri;
      link.click();
    }
  }

  // Exportar como JSON
  function handleExportJSON() {
    const data = JSON.stringify(shapes, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "organigrama.json";
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <label>Herramienta:</label>
        {SHAPES.map((t) => (
          <button
            key={t}
            className={`px-3 py-1 rounded ${mode === t ? "bg-blue-600 text-white" : "bg-slate-200"}`}
            onClick={() => setMode(t)}
          >
            {t}
          </button>
        ))}
        <button
          className="ml-4 px-3 py-1 rounded bg-green-600 text-white"
          onClick={handleExportImage}
        >
          Exportar PNG
        </button>
        <button
          className="px-3 py-1 rounded bg-amber-600 text-white"
          onClick={handleExportJSON}
        >
          Exportar JSON
        </button>
      </div>
      <Stage
        ref={stageRef}
        width={900}
        height={600}
        style={{ border: "2px solid #e5e7eb", background: "#f8fafc", borderRadius: 12 }}
        onMouseDown={handleStageClick}
      >
        <Layer>
          {shapes.map((shape) => {
            if (shape.type === "rect")
              return (
                <Rect
                  key={shape.id}
                  {...shape}
                  draggable
                  stroke={selected === shape.id ? "#2563eb" : undefined}
                  strokeWidth={selected === shape.id ? 4 : 0}
                  onClick={() => setSelected(shape.id)}
                  onTap={() => setSelected(shape.id)}
                  onDragEnd={(e) => handleDrag(shape.id, e.target.x(), e.target.y())}
                />
              );
            if (shape.type === "circle")
              return (
                <Circle
                  key={shape.id}
                  {...shape}
                  draggable
                  stroke={selected === shape.id ? "#2563eb" : undefined}
                  strokeWidth={selected === shape.id ? 4 : 0}
                  onClick={() => setSelected(shape.id)}
                  onTap={() => setSelected(shape.id)}
                  onDragEnd={(e) => handleDrag(shape.id, e.target.x(), e.target.y())}
                />
              );
            if (shape.type === "line")
              return (
                <Line
                  key={shape.id}
                  {...shape}
                  onClick={() => setSelected(shape.id)}
                  onTap={() => setSelected(shape.id)}
                />
              );
            if (shape.type === "text")
              return (
                <Text
                  key={shape.id}
                  {...shape}
                  draggable
                  stroke={selected === shape.id ? "#2563eb" : undefined}
                  strokeWidth={selected === shape.id ? 1.5 : 0}
                  onClick={() => setSelected(shape.id)}
                  onTap={() => setSelected(shape.id)}
                  onDragEnd={(e) => handleDrag(shape.id, e.target.x(), e.target.y())}
                />
              );
            return null;
          })}
        </Layer>
      </Stage>
    </div>
  );
}

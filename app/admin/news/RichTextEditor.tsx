"use client";

import React, { useCallback, useState } from "react";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Undo,
  Redo,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  theme: "light" | "dark";
  placeholder?: string;
  maxLength?: number;
  charCount?: number;
}

/**
 * Componente de editor de texto rico simplificado
 * Utiliza contentEditable + document.execCommand para evitar conflictos de dependencias con Tiptap
 */
export default function RichTextEditor({
  value,
  onChange,
  theme,
  placeholder = "Escribe tu contenido aquí...",
  maxLength = 2000,
}: Props) {
  const [isOverLimit, setIsOverLimit] = useState(false);

  const handleInput = useCallback(
    (e: React.FormEvent<HTMLDivElement>) => {
      const html = e.currentTarget.innerHTML;
      const text = e.currentTarget.textContent || "";

      if (text.length > maxLength) {
        setIsOverLimit(true);
        return;
      }

      setIsOverLimit(false);
      onChange(html);
    },
    [maxLength, onChange]
  );

  const handleCommand = useCallback((command: string) => {
    document.execCommand(command, false);
  }, []);

  const handleAlignment = useCallback((align: string) => {
    document.execCommand("justifyLeft", false);
    if (align === "center") {
      document.execCommand("justifyCenter", false);
    } else if (align === "right") {
      document.execCommand("justifyRight", false);
    }
  }, []);

  const buttonClass = (isActive: boolean) =>
    `p-2 rounded-lg transition-all ${
      isActive
        ? theme === "dark"
          ? "bg-blue-600 text-white"
          : "bg-blue-500 text-white"
        : theme === "dark"
        ? "text-gray-400 hover:bg-gray-700/50 hover:text-white"
        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
    }`;

  const separatorClass = `w-px h-6 ${
    theme === "dark" ? "bg-gray-700" : "bg-gray-200"
  }`;

  const textLength = value.replace(/<[^>]*>/g, "").length;

  return (
    <div
      className={`rounded-xl border overflow-hidden ${
        theme === "dark"
          ? "bg-gray-800 border-gray-700"
          : "bg-white border-gray-200"
      }`}
    >
      {/* Toolbar */}
      <div
        className={`flex flex-wrap gap-1 p-3 border-b ${
          theme === "dark" ? "bg-gray-900 border-gray-700" : "bg-gray-50 border-gray-200"
        }`}
      >
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            handleCommand("bold");
          }}
          className={buttonClass(false)}
          title="Negrita (Ctrl+B)"
        >
          <Bold className="w-4 h-4" />
        </button>

        <button
          onMouseDown={(e) => {
            e.preventDefault();
            handleCommand("italic");
          }}
          className={buttonClass(false)}
          title="Cursiva (Ctrl+I)"
        >
          <Italic className="w-4 h-4" />
        </button>

        <button
          onMouseDown={(e) => {
            e.preventDefault();
            handleCommand("strikeThrough");
          }}
          className={buttonClass(false)}
          title="Tachado"
        >
          <Strikethrough className="w-4 h-4" />
        </button>

        <div className={separatorClass} />

        <button
          onMouseDown={(e) => {
            e.preventDefault();
            document.execCommand("formatBlock", false, "<h1>");
          }}
          className={buttonClass(false)}
          title="Encabezado 1"
        >
          <Heading1 className="w-4 h-4" />
        </button>

        <button
          onMouseDown={(e) => {
            e.preventDefault();
            document.execCommand("formatBlock", false, "<h2>");
          }}
          className={buttonClass(false)}
          title="Encabezado 2"
        >
          <Heading2 className="w-4 h-4" />
        </button>

        <button
          onMouseDown={(e) => {
            e.preventDefault();
            document.execCommand("formatBlock", false, "<h3>");
          }}
          className={buttonClass(false)}
          title="Encabezado 3"
        >
          <Heading3 className="w-4 h-4" />
        </button>

        <div className={separatorClass} />

        <button
          onMouseDown={(e) => {
            e.preventDefault();
            handleAlignment("left");
          }}
          className={buttonClass(false)}
          title="Alinear a la izquierda"
        >
          <AlignLeft className="w-4 h-4" />
        </button>

        <button
          onMouseDown={(e) => {
            e.preventDefault();
            handleAlignment("center");
          }}
          className={buttonClass(false)}
          title="Alinear al centro"
        >
          <AlignCenter className="w-4 h-4" />
        </button>

        <button
          onMouseDown={(e) => {
            e.preventDefault();
            handleAlignment("right");
          }}
          className={buttonClass(false)}
          title="Alinear a la derecha"
        >
          <AlignRight className="w-4 h-4" />
        </button>

        <div className={separatorClass} />

        <button
          onMouseDown={(e) => {
            e.preventDefault();
            handleCommand("insertUnorderedList");
          }}
          className={buttonClass(false)}
          title="Lista de puntos"
        >
          <List className="w-4 h-4" />
        </button>

        <button
          onMouseDown={(e) => {
            e.preventDefault();
            handleCommand("insertOrderedList");
          }}
          className={buttonClass(false)}
          title="Lista numerada"
        >
          <ListOrdered className="w-4 h-4" />
        </button>

        <button
          onMouseDown={(e) => {
            e.preventDefault();
            document.execCommand("formatBlock", false, "<blockquote>");
          }}
          className={buttonClass(false)}
          title="Cita"
        >
          <Quote className="w-4 h-4" />
        </button>

        <button
          onMouseDown={(e) => {
            e.preventDefault();
            handleCommand("createLink");
          }}
          className={buttonClass(false)}
          title="Insertar enlace"
        >
          <Code className="w-4 h-4" />
        </button>

        <div className={separatorClass} />

        <button
          onMouseDown={(e) => {
            e.preventDefault();
            handleCommand("undo");
          }}
          className={buttonClass(false)}
          title="Deshacer (Ctrl+Z)"
        >
          <Undo className="w-4 h-4" />
        </button>

        <button
          onMouseDown={(e) => {
            e.preventDefault();
            handleCommand("redo");
          }}
          className={buttonClass(false)}
          title="Rehacer (Ctrl+Y)"
        >
          <Redo className="w-4 h-4" />
        </button>
      </div>

      {/* Editor */}
      <div
        className={`p-4 min-h-64 ${
          theme === "dark"
            ? "bg-gray-800 text-white"
            : "bg-white text-gray-900"
        }`}
      >
        <div
          contentEditable
          onInput={handleInput}
          dangerouslySetInnerHTML={{ __html: value }}
          className={`prose prose-sm max-w-none focus:outline-none ${
            theme === "dark" ? "prose-invert" : ""
          } ${isOverLimit ? "text-red-500" : ""}`}
          style={{ outline: "none", minHeight: "250px" }}
          suppressContentEditableWarning
        />
      </div>

      {/* Footer with character count */}
      <div
        className={`px-4 py-3 border-t text-xs flex justify-between items-center ${
          theme === "dark"
            ? "bg-gray-900 border-gray-700 text-gray-400"
            : "bg-gray-50 border-gray-200 text-gray-500"
        }`}
      >
        <div className="flex items-center gap-2">
          <span>
            Palabras:{" "}
            <strong>
              {value
                .replace(/<[^>]*>/g, "")
                .split(/\s+/)
                .filter((w) => w).length}
            </strong>
          </span>
        </div>
        <span className={isOverLimit ? "text-red-500 font-medium" : ""}>
          Caracteres: <strong>{textLength}</strong>/{maxLength}
          {isOverLimit && " ⚠️ Límite excedido"}
        </span>
      </div>
    </div>
  );
}


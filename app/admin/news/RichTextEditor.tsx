"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Typography from "@tiptap/extension-typography";
import TextAlign from "@tiptap/extension-text-align";
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

export default function RichTextEditor({
  value,
  onChange,
  theme,
  placeholder = "Escribe tu contenido aquí...",
  maxLength = 2000,
  charCount = 0,
}: Props) {

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Typography,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      const text = editor.getText();
      // Mantener el contenido en HTML para almacenamiento, pero validar longitud de texto
      if (text.length <= maxLength) {
        onChange(html);
      }
    },
    editorProps: {
      attributes: {
        class: `prose prose-sm max-w-none focus:outline-none ${
          theme === "dark" ? "prose-invert" : ""
        }`,
      },
    },
  });

  // Sin auto-guardado: no se lee ni escribe en localStorage
  if (!editor) {
    return null;
  }

  const textLength = editor.getText().length;
  const isOverLimit = textLength > maxLength;

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
        {/* Text formatting */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={buttonClass(editor.isActive("bold"))}
          title="Negrita (Ctrl+B)"
        >
          <Bold className="w-4 h-4" />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={buttonClass(editor.isActive("italic"))}
          title="Cursiva (Ctrl+I)"
        >
          <Italic className="w-4 h-4" />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={buttonClass(editor.isActive("strike"))}
          title="Tachado"
        >
          <Strikethrough className="w-4 h-4" />
        </button>

        <div className={separatorClass} />

        {/* Headings */}
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={buttonClass(editor.isActive("heading", { level: 1 }))}
          title="Encabezado 1"
        >
          <Heading1 className="w-4 h-4" />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={buttonClass(editor.isActive("heading", { level: 2 }))}
          title="Encabezado 2"
        >
          <Heading2 className="w-4 h-4" />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={buttonClass(editor.isActive("heading", { level: 3 }))}
          title="Encabezado 3"
        >
          <Heading3 className="w-4 h-4" />
        </button>

        <div className={separatorClass} />

        {/* Alignment */}
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={buttonClass(editor.isActive({ textAlign: "left" }))}
          title="Alinear a la izquierda"
        >
          <AlignLeft className="w-4 h-4" />
        </button>

        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={buttonClass(editor.isActive({ textAlign: "center" }))}
          title="Alinear al centro"
        >
          <AlignCenter className="w-4 h-4" />
        </button>

        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={buttonClass(editor.isActive({ textAlign: "right" }))}
          title="Alinear a la derecha"
        >
          <AlignRight className="w-4 h-4" />
        </button>

        <div className={separatorClass} />

        {/* Lists */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={buttonClass(editor.isActive("bulletList"))}
          title="Lista de puntos"
        >
          <List className="w-4 h-4" />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={buttonClass(editor.isActive("orderedList"))}
          title="Lista numerada"
        >
          <ListOrdered className="w-4 h-4" />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={buttonClass(editor.isActive("blockquote"))}
          title="Cita"
        >
          <Quote className="w-4 h-4" />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={buttonClass(editor.isActive("codeBlock"))}
          title="Bloque de código"
        >
          <Code className="w-4 h-4" />
        </button>

        <div className={separatorClass} />

        {/* History */}
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className={`p-2 rounded-lg transition-all disabled:opacity-50 ${
            theme === "dark"
              ? "text-gray-400 hover:bg-gray-700/50 hover:text-white disabled:hover:bg-transparent"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 disabled:hover:bg-transparent"
          }`}
          title="Deshacer (Ctrl+Z)"
        >
          <Undo className="w-4 h-4" />
        </button>

        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className={`p-2 rounded-lg transition-all disabled:opacity-50 ${
            theme === "dark"
              ? "text-gray-400 hover:bg-gray-700/50 hover:text-white disabled:hover:bg-transparent"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 disabled:hover:bg-transparent"
          }`}
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
        <EditorContent
          editor={editor}
          className={`prose prose-sm max-w-none ${
            theme === "dark" ? "prose-invert" : ""
          } ${isOverLimit ? "text-red-500" : ""}`}
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
            Palabras: <strong>{editor.getText().split(/\s+/).filter(w => w).length}</strong>
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

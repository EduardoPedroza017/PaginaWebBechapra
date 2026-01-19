"use client";

import React from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import { PressItem } from "./page";

interface PressPreviewModalProps {
  open: boolean;
  onClose: () => void;
  press: PressItem | null;
  theme: "light" | "dark";
}

export default function PressPreviewModal({ open, onClose, press, theme }: PressPreviewModalProps) {
  if (!press) return null;
  return (
    <Dialog open={open} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className={`relative bg-white dark:bg-gray-900 rounded-2xl shadow-xl max-w-2xl w-full mx-auto p-6 sm:p-10 z-10`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
            title="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
          {press.file_url && (
            <div className="w-full aspect-video rounded-xl overflow-hidden mb-4">
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL}${press.file_url}`}
                alt={press.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <h2 className={`text-2xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{press.title}</h2>
          <p className={`text-xs mb-4 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>{press.date ? new Date(press.date).toLocaleString() : ""}</p>
          <div className={`prose max-w-none ${theme === "dark" ? "prose-invert" : ""}`}>
            {press.excerpt}
          </div>
          {press.link && (
            <a
              href={press.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-block mt-4 px-4 py-2 rounded-lg font-medium transition-all ${theme === "dark" ? "bg-blue-600/20 text-blue-400 hover:bg-blue-600/30" : "bg-blue-100 text-blue-700 hover:bg-blue-200"}`}
            >
              Ver enlace
            </a>
          )}
        </div>
      </div>
    </Dialog>
  );
}

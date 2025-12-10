"use client";

import React, { useMemo } from "react";
import { AlertTriangle, CheckCircle, AlertCircle, X } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";
import { getValidationSummary, ValidationError } from "./validation";
import type { OrganigramaNode } from "./OrganigramaAPI";

interface Props {
  nodes: OrganigramaNode[];
  theme?: 'light' | 'dark';
}

export function ValidationDisplay({ nodes, theme = 'light' }: Props) {
  const validation = useMemo(() => getValidationSummary(nodes), [nodes]);

  if (validation.isValid && validation.warnings.length === 0) {
    return (
      <div
        className={`rounded-xl border p-4 flex items-center gap-3 ${
          theme === 'dark'
            ? 'bg-green-900/20 border-green-800 text-green-400'
            : 'bg-green-50 border-green-200 text-green-700'
        }`}
      >
        <CheckCircle className="w-5 h-5 flex-shrink-0" />
        <span className="text-sm font-medium"><TranslateText text="Estructura válida" /></span>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Errors */}
      {validation.errors.map((error, idx) => (
        <div
          key={`error-${idx}`}
          className={`rounded-xl border p-4 flex items-start gap-3 ${
            theme === 'dark'
              ? 'bg-red-900/20 border-red-800'
              : 'bg-red-50 border-red-200'
          }`}
        >
          <AlertTriangle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
            theme === 'dark' ? 'text-red-400' : 'text-red-600'
          }`} />
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-semibold ${
              theme === 'dark' ? 'text-red-400' : 'text-red-700'
            }`}>
              {error.nodeName}
            </p>
            <p className={`text-xs mt-1 ${
              theme === 'dark' ? 'text-red-300/80' : 'text-red-600/80'
            }`}>
              {error.error}
            </p>
          </div>
        </div>
      ))}

      {/* Warnings */}
      {validation.warnings.map((warning, idx) => (
        <div
          key={`warning-${idx}`}
          className={`rounded-xl border p-4 flex items-start gap-3 ${
            theme === 'dark'
              ? 'bg-amber-900/20 border-amber-800'
              : 'bg-amber-50 border-amber-200'
          }`}
        >
          <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
            theme === 'dark' ? 'text-amber-400' : 'text-amber-600'
          }`} />
          <div className="flex-1 min-w-0">
            <p className={`text-xs ${
              theme === 'dark' ? 'text-amber-300/80' : 'text-amber-600/80'
            }`}>
              {warning}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

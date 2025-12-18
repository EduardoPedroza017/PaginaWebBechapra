"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { PressItem } from "./page";

interface PressSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  theme: "light" | "dark";
}

export function PressSearchBar({ value, onChange, theme }: PressSearchBarProps) {
  return (
    <div className="mb-6 flex items-center gap-2">
      <div className={`flex items-center rounded-xl px-3 py-2 w-full max-w-md transition-all border focus-within:ring-2 ${
        theme === "dark"
          ? "bg-gray-900 border-gray-700 text-white focus-within:ring-blue-800"
          : "bg-white border-gray-200 text-gray-900 focus-within:ring-blue-200"
      }`}>
        <Search className="w-5 h-5 mr-2 opacity-60" />
        <input
          type="text"
          className={`bg-transparent outline-none w-full text-base ${theme === "dark" ? "placeholder-gray-500" : "placeholder-gray-400"}`}
          placeholder="Buscar por título, resumen o fecha..."
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}

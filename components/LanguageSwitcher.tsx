
import React, { useState, useRef, useEffect } from "react";
import { FiGlobe } from "react-icons/fi";
import { FaFlagUsa, FaFlag } from "react-icons/fa6";

const LANGUAGES = [
  { code: "es", name: "Español", icon: <FaFlag /> },
  { code: "en", name: "English", icon: <FaFlagUsa /> },
  { code: "fr", name: "Français", icon: <FaFlag /> },
  { code: "de", name: "Deutsch", icon: <FaFlag /> },
  { code: "it", name: "Italiano", icon: <FaFlag /> },
  { code: "pt", name: "Português", icon: <FaFlag /> },
];

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(LANGUAGES[0]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "none",
          border: "1px solid #e5e7eb",
          borderRadius: 6,
          padding: "4px 12px",
          cursor: "pointer",
          fontWeight: 500,
          fontSize: 15,
          color: "#222",
          minWidth: 60,
        }}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <FiGlobe style={{ fontSize: 18, marginRight: 4 }} />
        {selected.icon}
        <span style={{ marginLeft: 4 }}>{selected.code.toUpperCase()}</span>
      </button>
      {open && (
        <ul
          style={{
            position: "absolute",
            top: "110%",
            left: 0,
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: 6,
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
            minWidth: 120,
            zIndex: 100,
            padding: 0,
            margin: 0,
          }}
          role="listbox"
        >
          {LANGUAGES.map((lang) => (
            <li
              key={lang.code}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 16px",
                cursor: "pointer",
                background: selected.code === lang.code ? "#f3f4f6" : "#fff",
                fontWeight: selected.code === lang.code ? 600 : 400,
                color: selected.code === lang.code ? "#2563eb" : "#222",
              }}
              onClick={() => {
                setSelected(lang);
                setOpen(false);
              }}
              role="option"
              aria-selected={selected.code === lang.code}
            >
              <span style={{
                fontSize: 22,
                color: selected.code === lang.code ? "#2563eb" : "#222",
                filter: selected.code === lang.code ? "none" : "grayscale(0%) brightness(0.7)",
                transition: "color 0.2s, filter 0.2s"
              }}>{lang.icon}</span>
              <span style={{ fontSize: 15 }}>{lang.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

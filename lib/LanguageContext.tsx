"use client";
import { createContext, useContext, useState, useEffect } from "react";

type LanguageContextType = {
  lang: string;
  setLang: (lang: string) => void;
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "es",
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState("es");
  const [mounted, setMounted] = useState(false);

  // Cargar idioma guardado al montar
  useEffect(() => {
    const savedLang = localStorage.getItem("language");
    if (savedLang) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLang(savedLang);
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Guardar idioma cuando cambie
  const handleSetLang = (newLang: string) => {
    setLang(newLang);
    localStorage.setItem("language", newLang);
  };

  // Prevenir flash de contenido sin traducir
  if (!mounted) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

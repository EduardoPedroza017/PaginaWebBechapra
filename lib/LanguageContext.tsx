"use client";
import { createContext, useContext, useState } from "react";
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
  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}
export function useLanguage() {
  return useContext(LanguageContext);
}

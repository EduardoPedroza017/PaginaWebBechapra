
import React from "react";
import { TranslateText } from "@/components/TranslateText";

export function WelcomeCard({ role, theme }: { role: string; theme?: string }) {
  const isDark = theme === "dark";
  return (
    <section
      className={`${isDark ? "bg-gray-950 text-white" : "bg-white text-gray-900"} rounded-xl shadow p-6 mb-6`}
    >
      <h2
        className={`text-2xl font-bold mb-2 ${isDark ? "text-blue-300" : "text-blue-800"}`}
      >
        <TranslateText text="¡Bienvenido de vuelta!" />
      </h2>
      <p
        className={`${isDark ? "text-blue-200" : "text-gray-700"}`}
      >
        <TranslateText text="Acceso:" />{' '}
        <span className={`${isDark ? "text-blue-400" : "text-blue-600"}`}>{role}</span>
      </p>
      <p
        className={`${isDark ? "text-gray-400" : "text-gray-500"}`}
      >
        <TranslateText text="Gestiona noticias, traducciones y configuración desde este panel." />
      </p>
    </section>
  );
}

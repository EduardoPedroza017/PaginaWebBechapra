import { useEffect, useState } from "react";
import { TermSection } from "./types";

export function useTerminosApi() {
  const [sections, setSections] = useState<TermSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchSections();
    // eslint-disable-next-line
  }, []);

  async function fetchSections() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/terminos/");
      const data = await res.json();
      setSections(data.sections || []);
    } catch (e) {
      setError("Error al cargar secciones");
    }
    setLoading(false);
  }

  async function addSection(form: { title: string; content: string }) {
    setError("");
    setSuccess("");
    try {
      const res = await fetch("http://localhost:5000/api/terminos/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setSuccess("Sección agregada");
      fetchSections();
    } catch (e) {
      setError("Error al agregar sección");
    }
  }

  async function updateSection(id: string, form: { title: string; content: string }) {
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`http://localhost:5000/api/terminos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setSuccess("Sección actualizada");
      fetchSections();
    } catch (e) {
      setError("Error al actualizar sección");
    }
  }

  async function deleteSection(id: string) {
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`http://localhost:5000/api/terminos/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setSuccess("Sección eliminada");
      fetchSections();
    } catch (e) {
      setError("Error al eliminar sección");
    }
  }

  return {
    sections,
    loading,
    error,
    success,
    fetchSections,
    addSection,
    updateSection,
    deleteSection,
    setError,
    setSuccess,
  };
}

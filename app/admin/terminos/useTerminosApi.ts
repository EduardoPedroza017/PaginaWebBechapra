import { useState, useEffect } from "react";

export interface TermSection {
  id: string;
  title: string;
  content: string;
}

export function useTerminosApi() {
  const [sections, setSections] = useState<TermSection[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("/api/terminos")
      .then((res) => res.json())
      .then((data) => setSections(data))
      .catch(() => setError("Failed to load sections"))
      .finally(() => setLoading(false));
  }, []);

  function addSection(section: { title: string; content: string }) {
    setLoading(true);
    fetch("/api/terminos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(section),
    })
      .then((res) => res.json())
      .then((newSection) => {
        setSections((prev) => [...prev, newSection]);
        setSuccess("Section added successfully");
      })
      .catch(() => setError("Failed to add section"))
      .finally(() => setLoading(false));
  }

  function updateSection(id: string, section: { title: string; content: string }) {
    setLoading(true);
    fetch(`/api/terminos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(section),
    })
      .then(() => {
        setSections((prev) =>
          prev.map((s) => (s.id === id ? { ...s, ...section } : s))
        );
        setSuccess("Section updated successfully");
      })
      .catch(() => setError("Failed to update section"))
      .finally(() => setLoading(false));
  }

  function deleteSection(id: string) {
    setLoading(true);
    fetch(`/api/terminos/${id}`, { method: "DELETE" })
      .then(() => {
        setSections((prev) => prev.filter((s) => s.id !== id));
        setSuccess("Section deleted successfully");
      })
      .catch(() => setError("Failed to delete section"))
      .finally(() => setLoading(false));
  }

  return {
    sections,
    loading,
    error,
    success,
    addSection,
    updateSection,
    deleteSection,
    setError,
    setSuccess,
  };
}
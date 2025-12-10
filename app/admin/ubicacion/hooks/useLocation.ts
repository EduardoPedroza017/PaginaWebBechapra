"use client";

import { useState, useEffect } from "react";
import { LocationData, Message } from "../../ubicacion/types";

export function useLocation() {
  const [location, setLocation] = useState<LocationData>({
    address: "",
    colonia: "",
    municipality: "",
    city: "",
    state: "",
    country: "México",
    zipCode: "",
    phone: "",
    email: "",
    googleMapsUrl: "",
    coordinates: { lat: 0, lng: 0 },
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);

  useEffect(() => {
    fetchLocation();
  }, []);

  const fetchLocation = async () => {
    try {
      const res = await fetch("/api/location");
      if (res.ok) {
        const data = await res.json();
        setLocation(data);
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/location/admin", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(location),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: "success", text: "Ubicación actualizada correctamente" });
      } else {
        setMessage({ type: "error", text: data.error || "Error al actualizar" });
      }
    } catch (err) {
      console.error("Error saving location:", err);
      setMessage({ type: "error", text: "Error de conexión" });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (!confirm("¿Estás seguro de resetear la ubicación a valores por defecto?")) return;

    try {
      const res = await fetch("http://localhost:5000/api/admin/location", {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        setMessage({ type: "success", text: "Ubicación reseteada" });
        fetchLocation();
      }
    } catch (err) {
      console.error("Error resetting location:", err);
      setMessage({ type: "error", text: "Error al resetear" });
    }
  };

  return {
    location,
    setLocation,
    loading,
    saving,
    message,
    handleSave,
    handleReset,
  };
}

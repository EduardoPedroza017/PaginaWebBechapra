"use client";

import { useState } from "react";
import { Search, Loader2, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { getAddressInfo } from "../services/copomex";

interface ZipCodeSearchProps {
  onAddressFound: (address: {
    zipCode: string;
    city: string;
    state: string;
    country: string;
    municipality: string;
    colonias: Array<{ name: string; type: string }>;
    location?: { lat: number; lng: number };
  }) => void;
}

export function ZipCodeSearch({ onAddressFound }: ZipCodeSearchProps) {
  const [zipCode, setZipCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error" | "warning">("idle");
  const [message, setMessage] = useState("");
  const [showManualEntry, setShowManualEntry] = useState(false);

  const handleSearch = async () => {
    if (!zipCode || zipCode.length !== 5) {
      setStatus("error");
      setMessage("Ingresa un código postal válido de 5 dígitos");
      return;
    }

    setLoading(true);
    setStatus("idle");
    setMessage("");
    setShowManualEntry(false);

    try {
      const result = await getAddressInfo(zipCode);

      if (!result) {
        setStatus("warning");
        setMessage(
          "No se encontró en COPOMEX. Completa los datos manualmente o intenta otro código postal."
        );
        setShowManualEntry(true);
        return;
      }

      setStatus("success");
      setMessage(`Encontrado: ${result.city}, ${result.state}`);
      setShowManualEntry(false);
      onAddressFound(result);
    } catch (error) {
      setStatus("error");
      setMessage("Error al consultar COPOMEX. Intenta de nuevo.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case "success":
        return <CheckCircle size={16} />;
      case "error":
        return <XCircle size={16} />;
      case "warning":
        return <AlertCircle size={16} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-center gap-3 mb-3">
        <Search size={20} className="text-blue-600" />
        <h3 className="font-semibold text-gray-900">Buscar por Código Postal</h3>
      </div>

      <div className="flex gap-3">
        <input
          type="text"
          value={zipCode}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "").slice(0, 5);
            setZipCode(value);
            setStatus("idle");
          }}
          onKeyPress={handleKeyPress}
          placeholder="Ej: 06500"
          maxLength={5}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={handleSearch}
          disabled={loading || zipCode.length !== 5}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Buscando...
            </>
          ) : (
            <>
              <Search size={18} />
              Buscar
            </>
          )}
        </button>
      </div>

      {status !== "idle" && (
        <div
          className={`mt-3 flex items-center gap-2 text-sm ${
            status === "success"
              ? "text-green-700"
              : status === "error"
              ? "text-red-700"
              : "text-yellow-700"
          }`}
        >
          {getStatusIcon()}
          {message}
        </div>
      )}

      {showManualEntry && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800 mb-2">
            💡 Completa los datos manualmente en el formulario:
          </p>
          <ul className="text-xs text-yellow-700 list-disc list-inside space-y-1">
            <li>Ingresa la calle y número</li>
            <li>Completa ciudad, estado y país</li>
            <li>Agrega el código postal</li>
            <li>Las coordenadas las ajustas después si necesitas</li>
          </ul>
        </div>
      )}

      <p className="text-xs text-gray-600 mt-3">
        💡 Ingresa el código postal para autocompletar ciudad, estado y coordenadas
      </p>
    </div>
  );
}

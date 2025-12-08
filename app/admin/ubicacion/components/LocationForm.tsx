"use client";

import { useState } from "react";
import { Mail, Phone, Map } from "lucide-react";
import { LocationData } from "../../ubicacion/types";
import { ZipCodeSearch } from "./ZipCodeSearch";
import { ColoniaSelector } from "./ColoniaSelector";

interface LocationFormProps {
  location: LocationData;
  onChange: (location: LocationData) => void;
}

export function LocationForm({ location, onChange }: LocationFormProps) {
  const [colonias, setColonias] = useState<Array<{ name: string; type: string }>>([]);

  const updateField = (field: keyof LocationData, value: string) => {
    onChange({ ...location, [field]: value });
  };

  const updateCoordinate = (coord: "lat" | "lng", value: number) => {
    onChange({
      ...location,
      coordinates: { ...location.coordinates, [coord]: value },
    });
  };

  const handleAddressFound = (address: {
    zipCode: string;
    city: string;
    state: string;
    country: string;
    municipality: string;
    colonias: Array<{ name: string; type: string }>;
    location?: { lat: number; lng: number };
  }) => {
    setColonias(address.colonias);
    onChange({
      ...location,
      zipCode: address.zipCode,
      city: address.city,
      state: address.state,
      country: address.country,
      municipality: address.municipality,
      coordinates: address.location || location.coordinates,
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      {/* Buscador por Código Postal */}
      <ZipCodeSearch onAddressFound={handleAddressFound} />

      {/* Selector de Colonia */}
      {colonias.length > 0 && (
        <ColoniaSelector
          colonias={colonias}
          selectedColonia={location.colonia || ""}
          onSelect={(colonia) => updateField("colonia", colonia)}
        />
      )}

      {/* Dirección */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Calle y Número *
          </label>
          <input
            type="text"
            value={location.address}
            onChange={(e) => updateField("address", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Av. Paseo de la Reforma 505"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Ciudad *
          </label>
          <input
            type="text"
            value={location.city}
            onChange={(e) => updateField("city", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ciudad de México"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Estado *
          </label>
          <input
            type="text"
            value={location.state}
            onChange={(e) => updateField("state", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="CDMX"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            País *
          </label>
          <input
            type="text"
            value={location.country}
            onChange={(e) => updateField("country", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="México"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Código Postal
          </label>
          <input
            type="text"
            value={location.zipCode}
            onChange={(e) => updateField("zipCode", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="06500"
          />
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Contacto */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Phone size={16} />
            Teléfono
          </label>
          <input
            type="text"
            value={location.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="+52 55 1234 5678"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Mail size={16} />
            Email
          </label>
          <input
            type="email"
            value={location.email}
            onChange={(e) => updateField("email", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="contacto@bechapra.com"
          />
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Google Maps */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <Map size={16} />
          URL de Google Maps
        </label>
        <input
          type="url"
          value={location.googleMapsUrl}
          onChange={(e) => updateField("googleMapsUrl", e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="https://maps.google.com/..."
        />
        <p className="text-sm text-gray-500 mt-2">
          Copia el enlace de Google Maps para mostrar la ubicación en el mapa
        </p>
      </div>

      {/* Coordenadas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Latitud
          </label>
          <input
            type="number"
            step="0.000001"
            value={location.coordinates.lat}
            onChange={(e) => updateCoordinate("lat", parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="19.4326"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Longitud
          </label>
          <input
            type="number"
            step="0.000001"
            value={location.coordinates.lng}
            onChange={(e) => updateCoordinate("lng", parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="-99.1332"
          />
        </div>
      </div>
    </div>
  );
}

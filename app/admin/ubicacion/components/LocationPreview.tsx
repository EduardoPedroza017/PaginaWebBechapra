"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import { LocationData } from "@/lib/locationData";

interface LocationPreviewProps {
  location: LocationData;
}

export function LocationPreview({ location }: LocationPreviewProps) {
  // Construir URL de Google Maps con la dirección
  const fullAddress = `${location.address || ""} ${location.colonia || ""} ${location.city || ""} ${location.state || ""} ${location.zipCode || ""}`.trim();
  const encodedAddress = encodeURIComponent(fullAddress);
  // Usar Google Maps Embed API con la key correcta (sin key por ahora, usar URL estándar)
  const googleMapsUrl = `https://maps.google.com/maps?q=${encodedAddress}&output=embed`;

  return (
    <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Vista Previa</h2>
      
      {/* Información de contacto y dirección */}
      <div className="bg-white rounded-lg p-4 space-y-2 mb-6">
        <p className="text-gray-900 font-semibold flex items-center gap-2">
          <MapPin size={16} className="text-red-500" />
          {location.address || "Sin dirección"}
        </p>
        {location.colonia && (
          <p className="text-gray-600">{location.colonia}</p>
        )}
        <p className="text-gray-600">
          {location.city && location.state
            ? `${location.city}, ${location.state} ${location.zipCode}`
            : "Sin ciudad/estado"}
        </p>
        {location.municipality && location.municipality !== location.city && (
          <p className="text-gray-500 text-sm">Municipio: {location.municipality}</p>
        )}
        <p className="text-gray-600">{location.country || "Sin país"}</p>
        {location.phone && (
          <p className="text-gray-600 flex items-center gap-2">
            <Phone size={16} /> {location.phone}
          </p>
        )}
        {location.email && (
          <p className="text-gray-600 flex items-center gap-2">
            <Mail size={16} /> {location.email}
          </p>
        )}
      </div>

      {/* Mapa de Google Maps */}
      {fullAddress && (
        <div className="rounded-lg overflow-hidden border border-gray-200 shadow-md">
          <iframe
            width="100%"
            height="400"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src={googleMapsUrl}
          ></iframe>
        </div>
      )}
    </div>
  );
}

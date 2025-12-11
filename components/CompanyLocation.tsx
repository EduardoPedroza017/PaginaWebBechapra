"use client";

import { useState, useEffect } from "react";
import { MapPin, Phone, Mail, ExternalLink, Building2 } from "lucide-react";
import { TranslateText } from "./TranslateText";

interface Branch {
  id: string;
  name: string;
  description: string;
  address: string;
  locationUrl: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  contact?: {
    phone?: string;
    email?: string;
  };
  isActive: boolean;
}

// Ubicación por defecto si no hay sucursales activas
const defaultLocation = {
  address: "Av. Paseo de la Reforma 505",
  city: "Ciudad de México",
  state: "CDMX",
  country: "México",
  zipCode: "06500",
  phone: "+52 55 1234 5678",
  email: "contacto@bechapra.com",
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=19.4326,-99.1332"
};

export function CompanyLocation() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBranches() {
      try {
        const res = await fetch('/api/branches?active=true');
        const data = await res.json();
        if (data.ok && data.data) {
          setBranches(data.data);
        }
      } catch (error) {
        console.error("Error fetching branches:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBranches();
  }, []);

  if (loading) {
    return (
      <div className="space-y-3 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
    );
  }

  // Si no hay sucursales activas, mostrar ubicación por defecto
  if (branches.length === 0) {
    return (
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <MapPin size={20} className="text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <p className="font-semibold text-gray-900">{defaultLocation.address}</p>
            <p className="text-gray-600">
              {defaultLocation.city}, {defaultLocation.state} {defaultLocation.zipCode}
            </p>
            <p className="text-gray-600">{defaultLocation.country}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Phone size={20} className="text-blue-600 flex-shrink-0" />
          <a href={`tel:${defaultLocation.phone}`} className="text-gray-700 hover:text-blue-600 transition-colors">
            {defaultLocation.phone}
          </a>
        </div>
        <div className="flex items-center gap-3">
          <Mail size={20} className="text-blue-600 flex-shrink-0" />
          <a href={`mailto:${defaultLocation.email}`} className="text-gray-700 hover:text-blue-600 transition-colors">
            {defaultLocation.email}
          </a>
        </div>
        <div className="pt-2">
          <a
            href={defaultLocation.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
          >
            <ExternalLink size={18} />
            <TranslateText text="Ver en Google Maps" />
          </a>
        </div>
      </div>
    );
  }

  // Si hay solo una sucursal, mostrarla directamente
  if (branches.length === 1) {
    const branch = branches[0];
    return (
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <MapPin size={20} className="text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <p className="font-semibold text-gray-900">{branch.name}</p>
            <p className="text-gray-600">{branch.address}</p>
            {branch.description && (
              <p className="text-gray-500 text-sm">{branch.description}</p>
            )}
          </div>
        </div>

        {branch.contact?.phone && (
          <div className="flex items-center gap-3">
            <Phone size={20} className="text-blue-600 flex-shrink-0" />
            <a
              href={`tel:${branch.contact.phone}`}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {branch.contact.phone}
            </a>
          </div>
        )}

        {branch.contact?.email && (
          <div className="flex items-center gap-3">
            <Mail size={20} className="text-blue-600 flex-shrink-0" />
            <a
              href={`mailto:${branch.contact.email}`}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {branch.contact.email}
            </a>
          </div>
        )}

        {branch.locationUrl && (
          <div className="pt-2">
            <a
              href={branch.locationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
            >
              <ExternalLink size={18} />
              <TranslateText text="Ver en Google Maps" />
            </a>
          </div>
        )}
      </div>
    );
  }

  // Si hay múltiples sucursales, mostrar lista
  return (
    <div className="space-y-4">
      {branches.map((branch) => (
        <div key={branch.id} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
          <div className="flex items-start gap-3">
            <Building2 size={20} className="text-blue-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <p className="font-semibold text-gray-900">{branch.name}</p>
              <p className="text-gray-600 text-sm">{branch.address}</p>
              
              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm">
                {branch.contact?.phone && (
                  <a
                    href={`tel:${branch.contact.phone}`}
                    className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <Phone size={14} />
                    {branch.contact.phone}
                  </a>
                )}
                {branch.locationUrl && (
                  <a
                    href={branch.locationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <ExternalLink size={14} />
                    <TranslateText text="Mapa" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

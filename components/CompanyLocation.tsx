"use client";

import { useEffect, useState } from "react";
import { MapPin, Phone, Mail, ExternalLink } from "lucide-react";
import { TranslateText } from "./TranslateText";

interface LocationData {
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  phone: string;
  email: string;
  googleMapsUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export function CompanyLocation() {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/location")
      .then((res) => res.json())
      .then((data) => setLocation(data))
      .catch((err) => console.error("Error fetching location:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  if (!location) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-start gap-3">
        <MapPin size={20} className="text-blue-600 flex-shrink-0 mt-1" />
        <div>
          <p className="font-semibold text-gray-900">{location.address}</p>
          <p className="text-gray-600">
            {location.city}, {location.state} {location.zipCode}
          </p>
          <p className="text-gray-600">{location.country}</p>
        </div>
      </div>

      {location.phone && (
        <div className="flex items-center gap-3">
          <Phone size={20} className="text-blue-600 flex-shrink-0" />
          <a
            href={`tel:${location.phone}`}
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            {location.phone}
          </a>
        </div>
      )}

      {location.email && (
        <div className="flex items-center gap-3">
          <Mail size={20} className="text-blue-600 flex-shrink-0" />
          <a
            href={`mailto:${location.email}`}
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            {location.email}
          </a>
        </div>
      )}

      {location.googleMapsUrl && (
        <div className="pt-2">
          <a
            href={location.googleMapsUrl}
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

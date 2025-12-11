"use client";

import { useState, useEffect } from "react";
import { TranslateText } from "@/components/TranslateText";
import { X, Save, MapPin, Phone, Mail, Building2 } from "lucide-react";
import type { Branch } from "../types";
import { mexicoStates, getCitiesByState } from "../data/mexicoLocations";

interface BranchEditModalProps {
  open: boolean;
  branch: Branch | null;
  onClose: () => void;
  onUpdated: (branch: Branch) => void;
  theme: 'light' | 'dark';
}

export default function BranchEditModal({ open, branch, onClose, onUpdated, theme }: BranchEditModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    city: '',
    state: '',
    locationUrl: '',
    lat: '',
    lng: '',
    phone: '',
    email: '',
    isActive: true
  });

  useEffect(() => {
    if (branch) {
      setFormData({
        name: branch.name || '',
        description: branch.description || '',
        address: branch.address || '',
        city: branch.city || '',
        state: branch.state || '',
        locationUrl: branch.locationUrl || '',
        lat: branch.coordinates?.lat?.toString() || '',
        lng: branch.coordinates?.lng?.toString() || '',
        phone: branch.contact?.phone || '',
        email: branch.contact?.email || '',
        isActive: branch.isActive
      });
    }
  }, [branch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!branch || !formData.name.trim() || !formData.address.trim()) return;
    
    setLoading(true);
    try {
      const payload = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        locationUrl: formData.locationUrl.trim(),
        coordinates: formData.lat && formData.lng ? {
          lat: parseFloat(formData.lat),
          lng: parseFloat(formData.lng)
        } : undefined,
        contact: {
          phone: formData.phone.trim() || undefined,
          email: formData.email.trim() || undefined
        },
        isActive: formData.isActive
      };

      const res = await fetch(`http://localhost:5000/api/admin/branches/${branch.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const data = await res.json();
        // El backend devuelve el branch directamente, no {ok, data}
        onUpdated(data.data || data);
        onClose();
      }
    } catch (error) {
      console.error("Error updating branch:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!open || !branch) return null;

  const inputClass = `w-full px-4 py-2.5 rounded-xl border transition-all duration-200 ${
    theme === "dark"
      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
  }`;

  const labelClass = `block text-sm font-medium mb-1.5 ${
    theme === "dark" ? "text-gray-300" : "text-gray-700"
  }`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl ${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      }`}>
        <div className={`sticky top-0 flex items-center justify-between p-6 border-b ${
          theme === "dark" ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"
        }`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${
              theme === "dark" ? "bg-emerald-600/20" : "bg-emerald-100"
            }`}>
              <Building2 className={theme === "dark" ? "text-emerald-400" : "text-emerald-600"} size={20} />
            </div>
            <h2 className={`text-lg font-semibold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}>
              <TranslateText text="Editar Sucursal" />
            </h2>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              theme === "dark" ? "hover:bg-gray-700 text-gray-400" : "hover:bg-gray-100 text-gray-500"
            }`}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className={labelClass}>
                <TranslateText text="Nombre" /> *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Sucursal Principal"
                className={inputClass}
                required
              />
            </div>

            {/* Address */}
            <div>
              <label className={labelClass}>
                <TranslateText text="Dirección" /> *
              </label>
              <div className="relative">
                <MapPin className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                  theme === "dark" ? "text-gray-500" : "text-gray-400"
                }`} size={16} />
                <input
                  type="text"
                  value={formData.address}
                  onChange={e => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Av. Principal #123, Col. Centro"
                  className={`${inputClass} pl-10`}
                  required
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className={labelClass}>
              <TranslateText text="Descripción" />
            </label>
            <textarea
              value={formData.description}
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Descripción de la sucursal..."
              rows={2}
              className={inputClass}
            />
          </div>

          {/* City and State */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>
                <TranslateText text="Estado" />
              </label>
              <select
                value={formData.state}
                onChange={e => setFormData(prev => ({ ...prev, state: e.target.value, city: '' }))}
                className={inputClass}
              >
                <option value="">Seleccionar estado...</option>
                {mexicoStates.map(state => (
                  <option key={state.code} value={state.code}>{state.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>
                <TranslateText text="Ciudad" />
              </label>
              <select
                value={formData.city}
                onChange={e => setFormData(prev => ({ ...prev, city: e.target.value }))}
                className={inputClass}
                disabled={!formData.state}
              >
                <option value="">{formData.state ? 'Seleccionar ciudad...' : 'Primero selecciona un estado'}</option>
                {formData.state && getCitiesByState(formData.state).map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Location URL */}
          <div>
            <label className={labelClass}>
              <TranslateText text="URL de Google Maps" />
            </label>
            <input
              type="url"
              value={formData.locationUrl}
              onChange={e => setFormData(prev => ({ ...prev, locationUrl: e.target.value }))}
              placeholder="https://maps.google.com/maps?q=..."
              className={inputClass}
            />
            <p className={`text-xs mt-1 ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}>
              <TranslateText text="Pega el enlace de Google Maps para mostrar el mapa" />
            </p>
          </div>

          {/* Coordinates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>
                <TranslateText text="Latitud" />
              </label>
              <input
                type="number"
                step="any"
                value={formData.lat}
                onChange={e => setFormData(prev => ({ ...prev, lat: e.target.value }))}
                placeholder="19.4326"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>
                <TranslateText text="Longitud" />
              </label>
              <input
                type="number"
                step="any"
                value={formData.lng}
                onChange={e => setFormData(prev => ({ ...prev, lng: e.target.value }))}
                placeholder="-99.1332"
                className={inputClass}
              />
            </div>
          </div>

          {/* Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>
                <TranslateText text="Teléfono" />
              </label>
              <div className="relative">
                <Phone className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                  theme === "dark" ? "text-gray-500" : "text-gray-400"
                }`} size={16} />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+52 55 1234 5678"
                  className={`${inputClass} pl-10`}
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>
                <TranslateText text="Email" />
              </label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                  theme === "dark" ? "text-gray-500" : "text-gray-400"
                }`} size={16} />
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="sucursal@empresa.com"
                  className={`${inputClass} pl-10`}
                />
              </div>
            </div>
          </div>

          {/* Active Toggle */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="editIsActive"
              checked={formData.isActive}
              onChange={e => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
              className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
            />
            <label htmlFor="editIsActive" className={`text-sm ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}>
              <TranslateText text="Sucursal activa (visible en el sitio)" />
            </label>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                theme === "dark"
                  ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              <TranslateText text="Cancelar" />
            </button>
            <button
              type="submit"
              disabled={loading || !formData.name.trim() || !formData.address.trim()}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                loading || !formData.name.trim() || !formData.address.trim()
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-emerald-600 hover:bg-emerald-700 text-white"
              }`}
            >
              <Save size={18} />
              {loading ? <TranslateText text="Guardando..." /> : <TranslateText text="Guardar Cambios" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

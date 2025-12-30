import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaSave, FaTimes, FaCalendarAlt, FaMapMarkerAlt, FaClock, FaGraduationCap, FaUserCheck, FaTasks, FaLightbulb, FaSearch } from "react-icons/fa";

interface EditInternshipProps {
  internship: {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    isActive: boolean;
    area: string;
    requisitos: string;
    modalidad: string;
    ubicacion: string;
    duracion: string;
    horario: string;
    beneficios: string;
    whatYouWillDo: string;
    whatYouWillLearn: string;
    whatWeAreLookingFor: string;
  };
  theme: "light" | "dark";
  isSubmitting?: boolean;
  onSave: (updatedInternship: any) => void;
  onCancel: () => void;
}

const EditInternship: React.FC<EditInternshipProps> = ({ 
  internship, 
  theme, 
  isSubmitting = false, 
  onSave, 
  onCancel 
}) => {
  const [formData, setFormData] = useState(internship);
  const [activeTab, setActiveTab] = useState<"general" | "detalles" | "contenido">("general");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: target.checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  // Theme-based classes
  const modalClasses = theme === "dark"
    ? "bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 border-slate-700"
    : "bg-gradient-to-br from-white via-slate-50 to-white border-slate-200";

  const inputClasses = theme === "dark"
    ? "bg-slate-800/50 border-slate-700 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
    : "bg-white border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20";

  const tabButtonClasses = (tab: string) => {
    const baseClasses = "px-4 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2";
    
    if (activeTab === tab) {
      return theme === "dark"
        ? `${baseClasses} bg-gradient-to-r from-blue-600 to-indigo-600 text-white`
        : `${baseClasses} bg-gradient-to-r from-blue-500 to-blue-600 text-white`;
    }
    
    return theme === "dark"
      ? `${baseClasses} bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-300`
      : `${baseClasses} bg-slate-200 text-slate-600 hover:bg-slate-300 hover:text-slate-800`;
  };

  const saveButtonClasses = theme === "dark"
    ? "bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg shadow-emerald-600/20"
    : "bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white shadow-lg shadow-emerald-500/30";

  const cancelButtonClasses = theme === "dark"
    ? "bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white shadow-lg shadow-slate-700/20"
    : "bg-gradient-to-r from-slate-200 to-slate-300 hover:from-slate-300 hover:to-slate-400 text-slate-800 shadow-lg shadow-slate-400/20";

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Fondo oscuro transparente con blur */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onCancel}
        aria-hidden="true"
      />

      {/* Contenedor principal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <motion.form
          onSubmit={handleSubmit}
          className={`relative w-full max-w-4xl rounded-2xl border shadow-2xl ${modalClasses}`}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* HEADER */}
          <div className="p-8 border-b border-slate-700/50">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold">
                  Editar Programa de Becarios
                </h2>
                <p className={`text-sm mt-1 ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                  Actualiza la información del programa "{internship.title}"
                </p>
              </div>
              
              <button
                type="button"
                onClick={onCancel}
                className={`p-2 rounded-full transition-all hover:scale-110 ${
                  theme === "dark" 
                    ? "bg-slate-700 hover:bg-slate-600 text-slate-300" 
                    : "bg-slate-200 hover:bg-slate-300 text-slate-600"
                }`}
                aria-label="Cerrar"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mt-6">
              <button
                type="button"
                onClick={() => setActiveTab("general")}
                className={tabButtonClasses("general")}
              >
                <FaGraduationCap className="w-4 h-4" />
                Información General
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("detalles")}
                className={tabButtonClasses("detalles")}
              >
                <FaMapMarkerAlt className="w-4 h-4" />
                Detalles del Programa
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("contenido")}
                className={tabButtonClasses("contenido")}
              >
                <FaTasks className="w-4 h-4" />
                Contenido y Beneficios
              </button>
            </div>
          </div>

          {/* BODY */}
          <div className="p-8 max-h-[60vh] overflow-y-auto">
            {/* Tab General */}
            {activeTab === "general" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                      Título del Programa
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className={`w-full rounded-lg px-4 py-3 border transition-all ${inputClasses}`}
                      placeholder="Título del programa"
                      required
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                      Área / Departamento
                    </label>
                    <input
                      type="text"
                      name="area"
                      value={formData.area}
                      onChange={handleChange}
                      className={`w-full rounded-lg px-4 py-3 border transition-all ${inputClasses}`}
                      placeholder="Área de trabajo"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                      Descripción del Programa
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className={`w-full rounded-lg px-4 py-3 border transition-all min-h-[120px] resize-none ${inputClasses}`}
                      placeholder="Describe el propósito y objetivos del programa..."
                      required
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                      Fecha de Inicio
                    </label>
                    <div className="relative">
                      <FaCalendarAlt className={`absolute left-3 top-3.5 w-4 h-4 ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`} />
                      <input
                        type="date"
                        name="startDate"
                        value={formData.startDate.split("T")[0]}
                        onChange={handleChange}
                        className={`w-full rounded-lg pl-10 pr-4 py-3 border transition-all ${inputClasses}`}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                      Fecha de Cierre
                    </label>
                    <div className="relative">
                      <FaCalendarAlt className={`absolute left-3 top-3.5 w-4 h-4 ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`} />
                      <input
                        type="date"
                        name="endDate"
                        min={today}
                        value={formData.endDate.split("T")[0]}
                        onChange={handleChange}
                        className={`w-full rounded-lg pl-10 pr-4 py-3 border transition-all ${inputClasses}`}
                        required
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tab Detalles */}
            {activeTab === "detalles" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                      Modalidad
                    </label>
                    <select
                      name="modalidad"
                      value={formData.modalidad}
                      onChange={handleChange}
                      className={`w-full rounded-lg px-4 py-3 border transition-all ${inputClasses} appearance-none`}
                      required
                    >
                      <option value="">Seleccionar modalidad</option>
                      <option value="Presencial">Presencial</option>
                      <option value="Remoto">Remoto</option>
                      <option value="Híbrido">Híbrido</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                      Ubicación
                    </label>
                    <div className="relative">
                      <FaMapMarkerAlt className={`absolute left-3 top-3.5 w-4 h-4 ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`} />
                      <input
                        type="text"
                        name="ubicacion"
                        value={formData.ubicacion}
                        onChange={handleChange}
                        className={`w-full rounded-lg pl-10 pr-4 py-3 border transition-all ${inputClasses}`}
                        placeholder="Ciudad o dirección"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                      Duración
                    </label>
                    <input
                      type="text"
                      name="duracion"
                      value={formData.duracion}
                      onChange={handleChange}
                      className={`w-full rounded-lg px-4 py-3 border transition-all ${inputClasses}`}
                      placeholder="Ej: 6 meses, 1 año"
                      required
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                      Horario
                    </label>
                    <div className="relative">
                      <FaClock className={`absolute left-3 top-3.5 w-4 h-4 ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`} />
                      <input
                        type="text"
                        name="horario"
                        value={formData.horario}
                        onChange={handleChange}
                        className={`w-full rounded-lg pl-10 pr-4 py-3 border transition-all ${inputClasses}`}
                        placeholder="Ej: Lunes a Viernes, 9:00 - 18:00"
                        required
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                      Requisitos
                    </label>
                    <textarea
                      name="requisitos"
                      value={formData.requisitos}
                      onChange={handleChange}
                      className={`w-full rounded-lg px-4 py-3 border transition-all min-h-[120px] resize-none ${inputClasses}`}
                      placeholder="Lista los requisitos para los candidatos..."
                      required
                    />
                    <p className={`text-xs mt-1 ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                      Separa cada requisito con un punto
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tab Contenido */}
            {activeTab === "contenido" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 flex items-center gap-2 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                      <FaUserCheck className="w-4 h-4" />
                      Beneficios
                    </label>
                    <textarea
                      name="beneficios"
                      value={formData.beneficios}
                      onChange={handleChange}
                      className={`w-full rounded-lg px-4 py-3 border transition-all min-h-[120px] resize-none ${inputClasses}`}
                      placeholder="Describa los beneficios que ofrece el programa..."
                      required
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 flex items-center gap-2 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                      <FaTasks className="w-4 h-4" />
                      ¿Qué hará el becario?
                    </label>
                    <textarea
                      name="whatYouWillDo"
                      value={formData.whatYouWillDo}
                      onChange={handleChange}
                      className={`w-full rounded-lg px-4 py-3 border transition-all min-h-[100px] resize-none ${inputClasses}`}
                      placeholder="Describa las responsabilidades y actividades..."
                      required
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 flex items-center gap-2 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                      <FaLightbulb className="w-4 h-4" />
                      ¿Qué aprenderá?
                    </label>
                    <textarea
                      name="whatYouWillLearn"
                      value={formData.whatYouWillLearn}
                      onChange={handleChange}
                      className={`w-full rounded-lg px-4 py-3 border transition-all min-h-[100px] resize-none ${inputClasses}`}
                      placeholder="Habilidades y conocimientos que adquirirá..."
                      required
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 flex items-center gap-2 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                      <FaSearch className="w-4 h-4" />
                      ¿Qué buscamos?
                    </label>
                    <textarea
                      name="whatWeAreLookingFor"
                      value={formData.whatWeAreLookingFor}
                      onChange={handleChange}
                      className={`w-full rounded-lg px-4 py-3 border transition-all min-h-[100px] resize-none ${inputClasses}`}
                      placeholder="Perfil ideal del candidato..."
                      required
                    />
                  </div>

                  <div className="pt-4 border-t border-slate-700/50">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <div className="relative">
                        <input
                          type="checkbox"
                          name="isActive"
                          checked={formData.isActive}
                          onChange={handleChange}
                          className="sr-only peer"
                        />
                        <div className={`w-12 h-6 rounded-full peer peer-checked:bg-gradient-to-r ${theme === "dark" ? "from-emerald-600 to-green-600" : "from-emerald-500 to-green-500"} transition-all duration-300 ${formData.isActive ? "bg-gradient-to-r from-emerald-500 to-green-500" : theme === "dark" ? "bg-slate-700" : "bg-slate-300"}`}></div>
                        <div className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${formData.isActive ? "transform translate-x-6" : ""}`}></div>
                      </div>
                      <span className={`font-medium ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                        Programa {formData.isActive ? "Activo" : "Inactivo"}
                      </span>
                      <span className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                        {formData.isActive ? "(Visible para postulantes)" : "(No visible para postulantes)"}
                      </span>
                    </label>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* FOOTER */}
          <div className={`p-8 border-t ${theme === "dark" ? "border-slate-700" : "border-slate-200"}`}>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={onCancel}
                disabled={isSubmitting}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${cancelButtonClasses} disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <FaTimes className="w-4 h-4" />
                Cancelar
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 relative ${saveButtonClasses} disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isSubmitting ? (
                  <>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <span className="opacity-0">Guardando...</span>
                  </>
                ) : (
                  <>
                    <FaSave className="w-4 h-4" />
                    Guardar Cambios
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default EditInternship;
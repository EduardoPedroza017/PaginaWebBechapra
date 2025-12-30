"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSave, FaTimes, FaArrowRight, FaArrowLeft, FaCheckCircle } from "react-icons/fa";

interface InternshipsFormProps {
  theme: "light" | "dark";
  isSubmitting?: boolean;
  onCreate: (data: any) => void;
  onCancel?: () => void;
}

const InternshipsForm: React.FC<InternshipsFormProps> = ({ 
  theme, 
  isSubmitting = false, 
  onCreate, 
  onCancel 
}) => {
  const [step, setStep] = useState(1);

  // FORM STATE
  const [titulo, setTitulo] = useState("");
  const [area, setArea] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [modalidad, setModalidad] = useState("");
  const [duracion, setDuracion] = useState("");
  const [horario, setHorario] = useState("");
  const [beneficios, setBeneficios] = useState("");
  const [fechaCierre, setFechaCierre] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [requisitos, setRequisitos] = useState("");
  const [hacer, setHacer] = useState("");
  const [aprender, setAprender] = useState("");
  const [buscar, setBuscar] = useState("");

  const today = new Date().toISOString().split("T")[0];

  // Theme-based classes
  const modalClasses = theme === "dark"
    ? "bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 border-slate-700"
    : "bg-gradient-to-br from-white via-slate-50 to-white border-slate-200";

  const inputClasses = theme === "dark"
    ? "bg-slate-800/50 border-slate-700 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
    : "bg-white border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20";

  const stepIndicatorClasses = (stepNumber: number) => {
    const baseClasses = "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300";
    
    if (stepNumber < step) {
      return theme === "dark"
        ? `${baseClasses} bg-gradient-to-r from-emerald-500 to-green-500 text-white`
        : `${baseClasses} bg-gradient-to-r from-emerald-400 to-green-500 text-white`;
    }
    
    if (stepNumber === step) {
      return theme === "dark"
        ? `${baseClasses} bg-gradient-to-r from-blue-500 to-indigo-500 text-white ring-4 ring-blue-500/30`
        : `${baseClasses} bg-gradient-to-r from-blue-400 to-blue-500 text-white ring-4 ring-blue-400/30`;
    }
    
    return theme === "dark"
      ? `${baseClasses} bg-slate-700 text-slate-400`
      : `${baseClasses} bg-slate-200 text-slate-500`;
  };

  const stepLabelClasses = (stepNumber: number) => {
    if (stepNumber <= step) {
      return theme === "dark" ? "text-white" : "text-slate-900";
    }
    return theme === "dark" ? "text-slate-500" : "text-slate-400";
  };

  // 🎯 VALIDACIONES POR PASO
  const stepValid = () => {
    if (step === 1) return titulo && area && descripcion;
    if (step === 2) return modalidad && duracion && horario && ubicacion && requisitos;
    if (step === 3) return beneficios && fechaCierre && hacer && aprender && buscar;
    return false;
  };

  const next = () => stepValid() && setStep(step + 1);
  const prev = () => setStep(step - 1);

  const submit = () => {
    onCreate({
      title: titulo,
      area,
      description: descripcion,
      modalidad,
      duracion,
      horario,
      ubicacion,
      requisitos,
      beneficios,
      startDate: today,
      endDate: fechaCierre,
      whatYouWillDo: hacer,
      whatYouWillLearn: aprender,
      whatWeAreLookingFor: buscar,
      isActive: true,
    });
    setStep(1);
    resetForm();
  };

  const resetForm = () => {
    setTitulo(""); setArea(""); setDescripcion("");
    setModalidad(""); setDuracion(""); setHorario("");
    setUbicacion(""); setRequisitos(""); setBeneficios("");
    setFechaCierre(""); setHacer(""); setAprender("");
    setBuscar("");
  };

  const handleCancel = () => {
    setStep(1);
    resetForm();
    onCancel?.();
  };

  const steps = [
    { number: 1, label: "Información Básica" },
    { number: 2, label: "Detalles del Programa" },
    { number: 3, label: "Contenido y Beneficios" }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Fondo oscuro transparente con blur */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={handleCancel}
        aria-hidden="true"
      />

      {/* Contenedor principal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <motion.div
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
                  Crear Programa de Becarios
                </h2>
                <p className={`text-sm mt-1 ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                  Completa todos los campos requeridos para crear un nuevo programa
                </p>
              </div>
              
              <button
                onClick={handleCancel}
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

            {/* Step Indicator */}
            <div className="flex justify-between mt-8 relative">
              <div className="absolute top-5 left-0 right-0 h-0.5 -z-10">
                <div className={`absolute inset-0 ${theme === "dark" ? "bg-slate-700" : "bg-slate-300"}`}></div>
                <div 
                  className={`absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500 ${
                    theme === "light" ? "from-blue-400 to-blue-500" : ""
                  }`}
                  style={{ width: `${((step - 1) / 2) * 100}%` }}
                ></div>
              </div>
              
              {steps.map((s) => (
                <div key={s.number} className="flex flex-col items-center">
                  <div className={stepIndicatorClasses(s.number)}>
                    {s.number < step ? <FaCheckCircle className="w-5 h-5" /> : s.number}
                  </div>
                  <span className={`text-xs font-medium mt-2 ${stepLabelClasses(s.number)}`}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* BODY */}
          <div className="p-8">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                        Título del Programa *
                      </label>
                      <input
                        type="text"
                        className={`w-full rounded-lg px-4 py-3 border transition-all ${inputClasses}`}
                        placeholder="Ej: Becario en Desarrollo Frontend"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                        Área / Departamento *
                      </label>
                      <div className="relative">
                        <input
                          list="areas"
                          className={`w-full rounded-lg px-4 py-3 border transition-all ${inputClasses}`}
                          placeholder="Selecciona o escribe un área"
                          value={area}
                          onChange={(e) => setArea(e.target.value)}
                        />
                        <datalist id="areas">
                          <option value="Desarrollo" />
                          <option value="Diseño" />
                          <option value="Marketing" />
                          <option value="Finanzas" />
                          <option value="Recursos Humanos" />
                          <option value="Operaciones" />
                          <option value="Ventas" />
                          <option value="Soporte Técnico" />
                        </datalist>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                        Descripción del Programa *
                      </label>
                      <textarea
                        className={`w-full rounded-lg px-4 py-3 border transition-all min-h-[120px] resize-none ${inputClasses}`}
                        placeholder="Describe el propósito y objetivos del programa..."
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                      />
                      <p className={`text-xs mt-1 ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                        Mínimo 100 caracteres
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                        Modalidad *
                      </label>
                      <select
                        className={`w-full rounded-lg px-4 py-3 border transition-all ${inputClasses} appearance-none`}
                        value={modalidad}
                        onChange={(e) => setModalidad(e.target.value)}
                      >
                        <option value="">Seleccionar modalidad</option>
                        <option value="Presencial">Presencial</option>
                        <option value="Remoto">Remoto</option>
                        <option value="Híbrido">Híbrido</option>
                      </select>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                        Duración *
                      </label>
                      <input
                        type="text"
                        className={`w-full rounded-lg px-4 py-3 border transition-all ${inputClasses}`}
                        placeholder="Ej: 6 meses, 1 año"
                        value={duracion}
                        onChange={(e) => setDuracion(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                        Horario *
                      </label>
                      <input
                        type="text"
                        className={`w-full rounded-lg px-4 py-3 border transition-all ${inputClasses}`}
                        placeholder="Ej: Lunes a Viernes, 9:00 - 18:00"
                        value={horario}
                        onChange={(e) => setHorario(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                        Ubicación *
                      </label>
                      <input
                        type="text"
                        className={`w-full rounded-lg px-4 py-3 border transition-all ${inputClasses}`}
                        placeholder="Ciudad o dirección"
                        value={ubicacion}
                        onChange={(e) => setUbicacion(e.target.value)}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                        Requisitos *
                      </label>
                      <textarea
                        className={`w-full rounded-lg px-4 py-3 border transition-all min-h-[120px] resize-none ${inputClasses}`}
                        placeholder="Lista los requisitos para los candidatos..."
                        value={requisitos}
                        onChange={(e) => setRequisitos(e.target.value)}
                      />
                      <p className={`text-xs mt-1 ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                        Separa cada requisito con un punto
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                        Beneficios *
                      </label>
                      <textarea
                        className={`w-full rounded-lg px-4 py-3 border transition-all min-h-[120px] resize-none ${inputClasses}`}
                        placeholder="Describa los beneficios que ofrece el programa..."
                        value={beneficios}
                        onChange={(e) => setBeneficios(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                        Fecha de Cierre *
                      </label>
                      <input
                        type="date"
                        min={today}
                        className={`w-full rounded-lg px-4 py-3 border transition-all ${inputClasses}`}
                        value={fechaCierre}
                        onChange={(e) => setFechaCierre(e.target.value)}
                      />
                      <p className={`text-xs mt-1 ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                        Fecha límite para postulaciones
                      </p>
                    </div>

                    <div className="md:col-span-2">
                      <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                        ¿Qué hará el becario? *
                      </label>
                      <textarea
                        className={`w-full rounded-lg px-4 py-3 border transition-all min-h-[100px] resize-none ${inputClasses}`}
                        placeholder="Describa las responsabilidades y actividades..."
                        value={hacer}
                        onChange={(e) => setHacer(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                        ¿Qué aprenderá? *
                      </label>
                      <textarea
                        className={`w-full rounded-lg px-4 py-3 border transition-all min-h-[100px] resize-none ${inputClasses}`}
                        placeholder="Habilidades y conocimientos que adquirirá..."
                        value={aprender}
                        onChange={(e) => setAprender(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                        ¿Qué buscamos? *
                      </label>
                      <textarea
                        className={`w-full rounded-lg px-4 py-3 border transition-all min-h-[100px] resize-none ${inputClasses}`}
                        placeholder="Perfil ideal del candidato..."
                        value={buscar}
                        onChange={(e) => setBuscar(e.target.value)}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* FOOTER */}
          <div className={`p-8 border-t ${theme === "dark" ? "border-slate-700" : "border-slate-200"}`}>
            <div className="flex justify-between">
              <button
                onClick={() => step === 1 ? handleCancel() : prev()}
                disabled={isSubmitting}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                  theme === "dark"
                    ? "bg-slate-700 hover:bg-slate-600 text-white disabled:opacity-50"
                    : "bg-slate-200 hover:bg-slate-300 text-slate-800 disabled:opacity-50"
                }`}
              >
                <FaArrowLeft className="w-4 h-4" />
                {step === 1 ? "Cancelar" : "Anterior"}
              </button>

              {step < 3 ? (
                <button
                  onClick={next}
                  disabled={!stepValid() || isSubmitting}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                    stepValid()
                      ? theme === "dark"
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                        : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                      : theme === "dark"
                      ? "bg-slate-700 text-slate-500 cursor-not-allowed"
                      : "bg-slate-200 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  Siguiente
                  <FaArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={submit}
                  disabled={!stepValid() || isSubmitting}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 relative ${
                    stepValid()
                      ? theme === "dark"
                        ? "bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white"
                        : "bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white"
                      : theme === "dark"
                      ? "bg-slate-700 text-slate-500 cursor-not-allowed"
                      : "bg-slate-200 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      </div>
                      <span className="opacity-0">Creando...</span>
                    </>
                  ) : (
                    <>
                      <FaSave className="w-4 h-4" />
                      Crear Programa
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InternshipsForm;
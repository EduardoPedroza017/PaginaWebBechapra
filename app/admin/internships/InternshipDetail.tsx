import React from "react";

interface InternshipDetailProps {
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
  onClose: () => void;
}

const InternshipDetail: React.FC<InternshipDetailProps> = ({ internship, theme, onClose }) => {
  // Formatear fechas
  const formatDate = (dateString: string) => {
    if (!dateString) return "No especificada";
    const date = new Date(dateString);
    return isNaN(date.getTime()) 
      ? dateString 
      : date.toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
  };

  const cardClasses = theme === "dark" 
    ? "bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 text-white shadow-2xl"
    : "bg-gradient-to-br from-white via-slate-50 to-white text-slate-900 shadow-xl";

  const sectionClasses = theme === "dark"
    ? "bg-slate-800/50 border-slate-700"
    : "bg-slate-50/80 border-slate-200";

  const labelClasses = theme === "dark"
    ? "text-slate-300"
    : "text-slate-600";

  const valueClasses = theme === "dark"
    ? "text-white"
    : "text-slate-900";

  const closeButtonClasses = theme === "dark"
    ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-600/20"
    : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/30";

  const statusBadge = internship.isActive
    ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white"
    : "bg-gradient-to-r from-rose-500 to-red-500 text-white";

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Fondo oscuro transparente con blur */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Contenedor principal */}
      <div className="flex min-h-full items-center justify-center p-4">
        {/* Modal - más ancho para ocupar espacio horizontal */}
        <div className={`relative w-full max-w-4xl mx-auto rounded-2xl ${cardClasses} border ${theme === "dark" ? "border-slate-700" : "border-slate-200"}`}>
          
          {/* Header */}
          <div className="px-8 pt-8 pb-6 border-b border-slate-700/50">
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h2 className="text-2xl font-bold tracking-tight">{internship.title}</h2>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadge}`}>
                    {internship.isActive ? "Activo" : "Inactivo"}
                  </span>
                </div>
                <p className={`text-lg leading-relaxed ${labelClasses}`}>
                  {internship.description}
                </p>
              </div>
              
              <button
                onClick={onClose}
                className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 ${theme === "dark" ? "bg-slate-700 hover:bg-slate-600 text-slate-300" : "bg-slate-200 hover:bg-slate-300 text-slate-600"}`}
                aria-label="Cerrar"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Contenido con scroll */}
          <div className="max-h-[calc(100vh-300px)] overflow-y-auto px-8 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Columna izquierda - Información básica */}
              <div className="space-y-6">
                {/* Información general */}
                <div className={`p-5 rounded-xl border ${sectionClasses}`}>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Información General
                  </h3>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className={`text-sm font-medium ${labelClasses}`}>Área</p>
                        <p className={`font-medium ${valueClasses}`}>{internship.area || "No especificada"}</p>
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${labelClasses}`}>Modalidad</p>
                        <p className={`font-medium ${valueClasses}`}>{internship.modalidad || "No especificada"}</p>
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${labelClasses}`}>Duración</p>
                        <p className={`font-medium ${valueClasses}`}>{internship.duracion || "No especificada"}</p>
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${labelClasses}`}>Horario</p>
                        <p className={`font-medium ${valueClasses}`}>{internship.horario || "No especificada"}</p>
                      </div>
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${labelClasses}`}>Ubicación</p>
                      <p className={`font-medium ${valueClasses}`}>{internship.ubicacion || "No especificada"}</p>
                    </div>
                  </div>
                </div>

                {/* Fechas */}
                <div className={`p-5 rounded-xl border ${sectionClasses}`}>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Fechas
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className={`text-sm font-medium ${labelClasses}`}>Fecha de inicio</p>
                      <p className={`font-medium ${valueClasses}`}>{formatDate(internship.startDate)}</p>
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${labelClasses}`}>Fecha de cierre</p>
                      <p className={`font-medium ${valueClasses}`}>{formatDate(internship.endDate)}</p>
                    </div>
                  </div>
                </div>

                {/* Beneficios */}
                {internship.beneficios && (
                  <div className={`p-5 rounded-xl border ${sectionClasses}`}>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Beneficios
                    </h3>
                    <p className={`leading-relaxed ${valueClasses}`}>{internship.beneficios}</p>
                  </div>
                )}
              </div>

              {/* Columna derecha - Contenido detallado */}
              <div className="space-y-6">
                {/* Requisitos */}
                {internship.requisitos && (
                  <div className={`p-5 rounded-xl border ${sectionClasses}`}>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Requisitos
                    </h3>
                    <p className={`leading-relaxed ${valueClasses}`}>{internship.requisitos}</p>
                  </div>
                )}

                {/* ¿Qué harás? */}
                {internship.whatYouWillDo && (
                  <div className={`p-5 rounded-xl border ${sectionClasses}`}>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      ¿Qué harás?
                    </h3>
                    <p className={`leading-relaxed ${valueClasses}`}>{internship.whatYouWillDo}</p>
                  </div>
                )}

                {/* ¿Qué aprenderás? */}
                {internship.whatYouWillLearn && (
                  <div className={`p-5 rounded-xl border ${sectionClasses}`}>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      ¿Qué aprenderás?
                    </h3>
                    <p className={`leading-relaxed ${valueClasses}`}>{internship.whatYouWillLearn}</p>
                  </div>
                )}

                {/* ¿Qué buscamos? */}
                {internship.whatWeAreLookingFor && (
                  <div className={`p-5 rounded-xl border ${sectionClasses}`}>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      ¿Qué buscamos?
                    </h3>
                    <p className={`leading-relaxed ${valueClasses}`}>{internship.whatWeAreLookingFor}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className={`px-8 py-4 border-t ${theme === "dark" ? "border-slate-700" : "border-slate-200"}`}>
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-95 ${closeButtonClasses}`}
              >
                Cerrar Vista
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipDetail;
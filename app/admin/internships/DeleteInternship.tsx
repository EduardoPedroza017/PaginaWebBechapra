import React from "react";

interface DeleteInternshipProps {
  internshipTitle: string;
  theme: "light" | "dark";
  isSubmitting?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteInternship: React.FC<DeleteInternshipProps> = ({
  internshipTitle,
  theme,
  isSubmitting = false,
  onConfirm,
  onCancel
}) => {
  const modalClasses = theme === "dark"
    ? "bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 border-slate-700 text-white"
    : "bg-gradient-to-br from-white via-slate-50 to-white border-slate-200 text-slate-900";

  const warningIconClasses = theme === "dark"
    ? "text-amber-400"
    : "text-amber-500";

  const cancelButtonClasses = theme === "dark"
    ? "bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white shadow-lg shadow-slate-700/20"
    : "bg-gradient-to-r from-slate-200 to-slate-300 hover:from-slate-300 hover:to-slate-400 text-slate-800 shadow-lg shadow-slate-400/20";

  const deleteButtonClasses = theme === "dark"
    ? "bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white shadow-lg shadow-rose-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
    : "bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-600 hover:to-red-600 text-white shadow-lg shadow-rose-500/30 disabled:opacity-50 disabled:cursor-not-allowed";

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
        {/* Modal */}
        <div className={`relative w-full max-w-md mx-auto rounded-2xl ${modalClasses} border shadow-2xl`}>
          
          {/* Contenido */}
          <div className="px-8 pt-8 pb-6">
            {/* Icono de advertencia */}
            <div className="flex justify-center mb-6">
              <div className={`p-4 rounded-full ${theme === "dark" ? "bg-slate-800/50" : "bg-amber-50"} border ${theme === "dark" ? "border-slate-700" : "border-amber-100"}`}>
                <svg 
                  className={`w-12 h-12 ${warningIconClasses}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.346 16.5c-.77.833.192 2.5 1.732 2.5z" 
                  />
                </svg>
              </div>
            </div>

            {/* Título */}
            <h2 className="text-2xl font-bold text-center mb-3">
              Eliminar Programa
            </h2>

            {/* Mensaje de confirmación */}
            <div className={`text-center mb-2 ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
              <p className="text-lg font-medium">
                ¿Estás seguro de eliminar el programa?
              </p>
            </div>

            {/* Nombre del programa con énfasis */}
            <div className={`text-center px-4 py-3 rounded-lg mb-6 ${theme === "dark" ? "bg-slate-800/50 border border-slate-700" : "bg-red-50 border border-red-100"}`}>
              <p className={`font-semibold ${theme === "dark" ? "text-white" : "text-red-700"} text-lg`}>
                "{internshipTitle}"
              </p>
            </div>

            {/* Advertencia */}
            <div className={`text-sm px-4 py-3 rounded-lg ${theme === "dark" ? "bg-amber-900/20 text-amber-200 border border-amber-800/50" : "bg-amber-50 text-amber-700 border border-amber-100"}`}>
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>
                  Esta acción no se puede deshacer. Todos los datos asociados serán eliminados permanentemente.
                </span>
              </div>
            </div>
          </div>

          {/* Botones */}
          <div className={`px-8 py-6 border-t ${theme === "dark" ? "border-slate-700" : "border-slate-200"}`}>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={onCancel}
                disabled={isSubmitting}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex-1 ${cancelButtonClasses}`}
              >
                Cancelar
              </button>
              <button
                onClick={onConfirm}
                disabled={isSubmitting}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex-1 ${deleteButtonClasses} relative`}
              >
                {isSubmitting ? (
                  <>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <span className="opacity-0">Eliminando...</span>
                  </>
                ) : (
                  "Eliminar Programa"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteInternship;
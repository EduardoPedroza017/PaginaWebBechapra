import React from "react";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaToggleOn,
  FaToggleOff,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaBuilding,
  FaUserGraduate,
  FaSearch
} from "react-icons/fa";
import { motion } from "framer-motion";

interface Internship {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  area?: string;
  requisitos?: string;
  modalidad?: string;
  ubicacion?: string;
  duracion?: string;
  horario?: string;
  beneficios?: string;
  whatYouWillDo?: string;
  whatYouWillLearn?: string;
  whatWeAreLookingFor?: string;
}

interface InternshipsListProps {
  internships: Internship[];
  theme: "light" | "dark";
  onPreview: (internship: Internship) => void;
  onEdit: (internship: Internship) => void;
  onDelete: (internship: Internship) => void;
  onToggleActive: (internship: Internship) => void;
}

const InternshipsList: React.FC<InternshipsListProps> = ({
  internships,
  theme,
  onPreview,
  onEdit,
  onDelete,
  onToggleActive,
}) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return isNaN(date.getTime()) 
      ? dateString 
      : date.toLocaleDateString('es-ES', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        });
  };

  const getDaysRemaining = (endDate: string) => {
    if (!endDate) return null;
    const end = new Date(endDate);
    const today = new Date();
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Theme-based classes
  const cardClasses = theme === "dark"
    ? "bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 border-slate-700 hover:border-slate-600 hover:shadow-2xl hover:shadow-slate-900/50"
    : "bg-gradient-to-br from-white via-slate-50 to-white border-slate-200 hover:border-slate-300 hover:shadow-2xl hover:shadow-slate-200/50";

  const titleClasses = theme === "dark"
    ? "text-white"
    : "text-slate-900";

  const descriptionClasses = theme === "dark"
    ? "text-slate-400"
    : "text-slate-600";

  const infoLabelClasses = theme === "dark"
    ? "text-slate-300"
    : "text-slate-700";

  const infoValueClasses = theme === "dark"
    ? "text-slate-400"
    : "text-slate-600";

  const borderClasses = theme === "dark"
    ? "border-slate-700"
    : "border-slate-200";

  const emptyStateClasses = theme === "dark"
    ? "bg-slate-800/50 border-slate-700 text-slate-400"
    : "bg-slate-100 border-slate-300 text-slate-500";

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  if (internships.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full"
      >
        <div className={`rounded-2xl border-2 border-dashed p-12 text-center ${emptyStateClasses}`}>
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="p-4 rounded-full bg-gradient-to-br from-slate-700 to-slate-800">
              <FaUserGraduate className="w-12 h-12 text-slate-400" />
            </div>
            <div>
              <h3 className={`text-xl font-semibold mb-2 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                No hay programas disponibles
              </h3>
              <p className={descriptionClasses}>
                Crea tu primer programa de becarios para comenzar
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {internships.map((internship) => {
        const daysRemaining = getDaysRemaining(internship.endDate);
        const isExpired = daysRemaining !== null && daysRemaining < 0;
        const isEndingSoon = daysRemaining !== null && daysRemaining >= 0 && daysRemaining <= 7;

        return (
          <motion.div
            key={internship._id}
            variants={itemVariants}
            className={`rounded-2xl border ${cardClasses} transition-all duration-300 overflow-hidden hover:translate-y-[-4px]`}
          >
            {/* Header with status */}
            <div className={`p-6 border-b ${borderClasses}`}>
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className={`text-lg font-bold truncate ${titleClasses}`}>
                      {internship.title || "Programa sin título"}
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                      internship.isActive
                        ? theme === "dark"
                          ? "bg-gradient-to-r from-emerald-900/30 to-green-900/30 text-emerald-400 border border-emerald-800/50"
                          : "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border border-emerald-200"
                        : theme === "dark"
                        ? "bg-gradient-to-r from-rose-900/30 to-red-900/30 text-rose-400 border border-rose-800/50"
                        : "bg-gradient-to-r from-rose-100 to-red-100 text-rose-700 border border-rose-200"
                    }`}>
                      {internship.isActive ? "Activo" : "Inactivo"}
                    </span>
                  </div>
                  
                  {/* Area tag */}
                  {internship.area && (
                    <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md ${
                      theme === "dark" 
                        ? "bg-slate-700/50 text-slate-300" 
                        : "bg-slate-200 text-slate-700"
                    }`}>
                      <FaBuilding className="w-3 h-3" />
                      {internship.area}
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className={`text-sm line-clamp-2 mb-4 ${descriptionClasses}`}>
                {internship.description || "Sin descripción"}
              </p>

              {/* Days remaining indicator */}
              {daysRemaining !== null && !isExpired && internship.isActive && (
                <div className={`text-xs px-3 py-1.5 rounded-lg flex items-center justify-between ${
                  theme === "dark" 
                    ? "bg-slate-800/50 text-slate-300" 
                    : "bg-slate-100 text-slate-700"
                }`}>
                  <span className="flex items-center gap-1">
                    <FaClock className="w-3 h-3" />
                    {isEndingSoon ? "Finaliza pronto" : "Días restantes"}
                  </span>
                  <span className={`font-bold ${
                    isEndingSoon 
                      ? "text-amber-500" 
                      : "text-green-500"
                  }`}>
                    {daysRemaining} días
                  </span>
                </div>
              )}
            </div>

            {/* Quick Info */}
            <div className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <FaCalendarAlt className={`w-3 h-3 ${infoLabelClasses}`} />
                    <span className={`text-xs font-medium ${infoLabelClasses}`}>
                      Inicio
                    </span>
                  </div>
                  <span className={`text-sm ${infoValueClasses}`}>
                    {formatDate(internship.startDate)}
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <FaCalendarAlt className={`w-3 h-3 ${infoLabelClasses}`} />
                    <span className={`text-xs font-medium ${infoLabelClasses}`}>
                      Fin
                    </span>
                  </div>
                  <span className={`text-sm ${infoValueClasses}`}>
                    {formatDate(internship.endDate)}
                  </span>
                </div>
              </div>

              {/* Location and modality */}
              {(internship.ubicacion || internship.modalidad) && (
                <div className="grid grid-cols-2 gap-3">
                  {internship.ubicacion && (
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <FaMapMarkerAlt className={`w-3 h-3 ${infoLabelClasses}`} />
                        <span className={`text-xs font-medium ${infoLabelClasses}`}>
                          Ubicación
                        </span>
                      </div>
                      <span className={`text-sm truncate block ${infoValueClasses}`}>
                        {internship.ubicacion}
                      </span>
                    </div>
                  )}

                  {internship.modalidad && (
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <FaBuilding className={`w-3 h-3 ${infoLabelClasses}`} />
                        <span className={`text-xs font-medium ${infoLabelClasses}`}>
                          Modalidad
                        </span>
                      </div>
                      <span className={`text-sm truncate block ${infoValueClasses}`}>
                        {internship.modalidad}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className={`p-4 border-t ${borderClasses}`}>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onPreview(internship)}
                    className={`p-2 rounded-lg transition-all ${
                      theme === "dark"
                        ? "bg-blue-900/30 text-blue-400 hover:bg-blue-800/50 hover:text-blue-300"
                        : "bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-700"
                    }`}
                    title="Previsualizar"
                    aria-label="Previsualizar"
                  >
                    <FaEye className="w-4 h-4" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onEdit(internship)}
                    className={`p-2 rounded-lg transition-all ${
                      theme === "dark"
                        ? "bg-amber-900/30 text-amber-400 hover:bg-amber-800/50 hover:text-amber-300"
                        : "bg-amber-100 text-amber-600 hover:bg-amber-200 hover:text-amber-700"
                    }`}
                    title="Editar"
                    aria-label="Editar"
                  >
                    <FaEdit className="w-4 h-4" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onDelete(internship)}
                    className={`p-2 rounded-lg transition-all ${
                      theme === "dark"
                        ? "bg-rose-900/30 text-rose-400 hover:bg-rose-800/50 hover:text-rose-300"
                        : "bg-rose-100 text-rose-600 hover:bg-rose-200 hover:text-rose-700"
                    }`}
                    title="Eliminar"
                    aria-label="Eliminar"
                  >
                    <FaTrash className="w-4 h-4" />
                  </motion.button>
                </div>

                {/* Toggle Active */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onToggleActive(internship)}
                  className={`p-2 rounded-lg transition-all ${
                    theme === "dark"
                      ? internship.isActive
                        ? "bg-emerald-900/30 text-emerald-400 hover:bg-emerald-800/50"
                        : "bg-slate-700 text-slate-400 hover:bg-slate-600"
                      : internship.isActive
                      ? "bg-emerald-100 text-emerald-600 hover:bg-emerald-200"
                      : "bg-slate-200 text-slate-500 hover:bg-slate-300"
                  }`}
                  title={internship.isActive ? "Desactivar" : "Activar"}
                  aria-label={internship.isActive ? "Desactivar" : "Activar"}
                >
                  {internship.isActive ? (
                    <FaToggleOn className="w-5 h-5" />
                  ) : (
                    <FaToggleOff className="w-5 h-5" />
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default InternshipsList;
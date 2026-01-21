"use client";

import React, { useCallback, useEffect, useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TranslateText } from "@/components/TranslateText";

import InternshipsList from "./InternshipsList";
import InternshipsForm from "./InternshipsForm";
import InternshipDetail from "./InternshipDetail";
import EditInternship from "./EditInternship";
import DeleteInternship from "./DeleteInternship";
import { 
  FaPlus, 
  FaFilter, 
  FaSearch, 
  FaSyncAlt, 
  FaSortAmountDown, 
  FaSortAmountUp,
  FaChartBar,
  FaDownload,
  FaFileExport
} from "react-icons/fa";

// Ensure consistent `Internship` type definitions
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

// Interface for API response
interface ApiInternship {
  _id?: string;
  titulo: string;
  descripcion: string;
  fecha_publicacion: string;
  fecha_cierre: string;
  is_active: boolean;
  area: string;
  requisitos: string;
  modalidad: string;
  ubicacion: string;
  duracion: string;
  horario: string;
  beneficios: string;
  what_you_will_do: string;
  what_you_will_learn: string;
  what_we_are_looking_for: string;
}

// Interface for API response structure
interface ApiResponse {
  items?: ApiInternship[];
  internships?: ApiInternship[];
  success?: boolean;
  data?: any;
  total?: number;
  page?: number;
  totalPages?: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const InternshipsPage = () => {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [themeReady, setThemeReady] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // New state for filtering and sorting
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");
  const [filterArea, setFilterArea] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"date" | "title" | "area">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    expiringSoon: 0
  });

  // Ref for search debouncing
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  /* =========================
     THEME INIT
  ========================== */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme === "dark" || savedTheme === "light") {
      setTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }
    setThemeReady(true);
  }, []);

  // Save theme to localStorage when it changes
  useEffect(() => {
    if (themeReady && typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [theme, themeReady]);

  /* =========================
     FETCH INTERNSHIPS
  ========================== */
  const fetchInternships = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await fetch(`${API_URL}/api/internships`);
      
      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }
      
      const data: ApiResponse = await res.json();
      console.log("Datos obtenidos del backend:", data);

      const internshipsData = data.items || data.internships || [];
      if (!Array.isArray(internshipsData)) {
        throw new Error("Formato de respuesta inválido");
      }

      const mappedInternships: Internship[] = internshipsData.map((internship: ApiInternship) => ({
        _id: internship._id || "",
        title: internship.titulo || "",
        description: internship.descripcion || "",
        startDate: internship.fecha_publicacion || "",
        endDate: internship.fecha_cierre || "",
        isActive: internship.is_active || false,
        area: internship.area || "",
        requisitos: internship.requisitos || "",
        modalidad: internship.modalidad || "",
        ubicacion: internship.ubicacion || "",
        duracion: internship.duracion || "",
        horario: internship.horario || "",
        beneficios: internship.beneficios || "",
        whatYouWillDo: internship.what_you_will_do || "",
        whatYouWillLearn: internship.what_you_will_learn || "",
        whatWeAreLookingFor: internship.what_we_are_looking_for || "",
      }));

      setInternships(mappedInternships);
      
      // Calculate statistics
      calculateStats(mappedInternships);
    } catch (error) {
      console.error("Error fetching internships:", error);
      setError(error instanceof Error ? error.message : "Error al cargar las pasantías");
    } finally {
      setLoading(false);
    }
  }, []);

  const calculateStats = (data: Internship[]) => {
    const active = data.filter(i => i.isActive).length;
    const inactive = data.length - active;
    
    // Count programs expiring in the next 7 days
    const today = new Date();
    const expiringSoon = data.filter(internship => {
      if (!internship.isActive || !internship.endDate) return false;
      const endDate = new Date(internship.endDate);
      const diffTime = endDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays >= 0 && diffDays <= 7;
    }).length;

    setStats({
      total: data.length,
      active,
      inactive,
      expiringSoon
    });
  };

  useEffect(() => {
    fetchInternships();
  }, [fetchInternships]);

  /* =========================
     FILTERING & SORTING
  ========================== */
  const filteredAndSortedInternships = useMemo(() => {
    let filtered = [...internships];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(internship =>
        internship.title.toLowerCase().includes(term) ||
        internship.description.toLowerCase().includes(term) ||
        (internship.area || "").toLowerCase().includes(term)
      );
    }

    // Apply status filter
    if (filterStatus !== "all") {
      filtered = filtered.filter(internship => 
        filterStatus === "active" ? internship.isActive : !internship.isActive
      );
    }

    // Apply area filter
    if (filterArea !== "all") {
      filtered = filtered.filter(internship => 
        internship.area === filterArea
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "date":
          const dateA = new Date(a.startDate).getTime();
          const dateB = new Date(b.startDate).getTime();
          comparison = dateB - dateA;
          break;
        case "title":
          comparison = a.title.localeCompare(b.title);
          break;
        case "area":
          comparison = (a.area || "").localeCompare(b.area || "");
          break;
      }

      return sortOrder === "desc" ? comparison : -comparison;
    });

    return filtered;
  }, [internships, searchTerm, filterStatus, filterArea, sortBy, sortOrder]);

  const uniqueAreas = useMemo(() => {
    const areas = internships.map(i => i.area).filter(Boolean);
    return Array.from(new Set(areas));
  }, [internships]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === "asc" ? "desc" : "asc");
  };

  /* =========================
     HANDLERS
  ========================== */
  const handleCreateInternship = useCallback(async (internshipData: Omit<Internship, '_id'>) => {
    try {
      setIsSubmitting(true);
      console.log("Datos enviados al backend:", internshipData);

      const res = await fetch(`${API_URL}/api/internships`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo: internshipData.title,
          descripcion: internshipData.description,
          fecha_publicacion: new Date().toISOString().split('T')[0],
          fecha_cierre: internshipData.endDate,
          is_active: internshipData.isActive,
          area: internshipData.area,
          requisitos: internshipData.requisitos,
          modalidad: internshipData.modalidad,
          ubicacion: internshipData.ubicacion,
          duracion: internshipData.duracion,
          horario: internshipData.horario,
          beneficios: internshipData.beneficios,
          what_you_will_do: internshipData.whatYouWillDo,
          what_you_will_learn: internshipData.whatYouWillLearn,
          what_we_are_looking_for: internshipData.whatWeAreLookingFor,
        }),
      });

      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
      
      if (data.data) {
        const newInternship: Internship = {
          _id: data.data._id || Date.now().toString(),
          ...internshipData
        };
        setInternships(prev => [...prev, newInternship]);
        setIsCreateModalOpen(false);
        calculateStats([...internships, newInternship]);
      }
    } catch (error) {
      console.error("Error creating internship:", error);
      alert(error instanceof Error ? error.message : "Error al crear la pasantía");
    } finally {
      setIsSubmitting(false);
    }
  }, [internships]);

  const handlePreview = useCallback((internship: Internship) => {
    setSelectedInternship(internship);
    setIsDetailModalOpen(true);
  }, []);

  const handleEdit = useCallback((internship: Internship) => {
    setSelectedInternship(internship);
    setIsEditModalOpen(true);
  }, []);

  const handleDelete = useCallback((internship: Internship) => {
    setSelectedInternship(internship);
    setIsDeleteModalOpen(true);
  }, []);

  const handleSaveEdit = useCallback(
    async (updatedInternship: Internship) => {
      try {
        setIsSubmitting(true);
        const res = await fetch(`${API_URL}/api/internships/${selectedInternship?._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...updatedInternship,
            area: updatedInternship.area || "",
          }),
        });

        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }

        const data = await res.json();

        if (data.success) {
          setInternships((prev) =>
            prev.map((internship) =>
              internship._id === selectedInternship?._id ? updatedInternship : internship
            )
          );
          setIsEditModalOpen(false);
        }
      } catch (error) {
        console.error("Error saving internship edit:", error);
        alert(error instanceof Error ? error.message : "Error al guardar los cambios");
      } finally {
        setIsSubmitting(false);
      }
    },
    [selectedInternship]
  );

  const handleConfirmDelete = useCallback(async () => {
    try {
      setIsSubmitting(true);
      const res = await fetch(`${API_URL}/api/internships/${selectedInternship?._id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
      
      if (data.success) {
        const updatedInternships = internships.filter(
          internship => internship._id !== selectedInternship?._id
        );
        setInternships(updatedInternships);
        setIsDeleteModalOpen(false);
        setSelectedInternship(null);
        calculateStats(updatedInternships);
      }
    } catch (error) {
      console.error("Error deleting internship:", error);
      alert(error instanceof Error ? error.message : "Error al eliminar la pasantía");
    } finally {
      setIsSubmitting(false);
    }
  }, [selectedInternship, internships]);

  const handleToggleActive = useCallback(async (internship: Internship) => {
    try {
      console.log("Toggling active status for internship ID:", internship._id); // Debugging the ID
      const updatedInternship = { ...internship, isActive: !internship.isActive };
      
      const res = await fetch(`${API_URL}/api/internships/${internship._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          is_active: !internship.isActive,
        }),
      });

      if (res.ok) {
        const updatedInternships = internships.map(item =>
          item._id === internship._id ? updatedInternship : item
        );
        setInternships(updatedInternships);
        calculateStats(updatedInternships);
      }
    } catch (error) {
      console.error("Error toggling internship status:", error);
    }
  }, [internships]);

  const handleExportData = () => {
    const dataStr = JSON.stringify(internships, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `becarios_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  /* =========================
     LOADING & ERROR STATES
  ========================== */
  if (loading || !themeReady) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          theme === "dark"
            ? "bg-linear-to-br from-slate-950 via-slate-900 to-slate-950"
            : "bg-linear-to-br from-white via-slate-50 to-slate-100"
        }`}
      >
        <div className="text-center">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className={`inline-block rounded-full h-14 w-14 border-t-4 border-b-4 mb-4 ${
              theme === "dark" ? "border-blue-500" : "border-blue-600"
            }`}
          />
          <p
            className={`text-base font-medium ${
              theme === "dark" ? "text-slate-200" : "text-slate-800"
            }`}
          >
            <TranslateText text="Cargando sistema de becarios..." />
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          theme === "dark"
            ? "bg-linear-to-br from-slate-950 via-slate-900 to-slate-950"
            : "bg-linear-to-br from-white via-slate-50 to-slate-100"
        }`}
      >
        <motion.div 
          className="text-center max-w-md"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div className={`text-5xl mb-4 ${theme === "dark" ? "text-red-400" : "text-red-500"}`}>⚠️</div>
          <h2 className={`text-2xl font-bold mb-3 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
            Error al cargar datos
          </h2>
          <p className={`mb-6 px-4 py-3 rounded-lg ${theme === "dark" ? "bg-slate-800/50 text-slate-300" : "bg-slate-100 text-slate-600"}`}>
            {error}
          </p>
          <button
            onClick={fetchInternships}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 mx-auto ${
              theme === "dark"
                ? "bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                : "bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
            }`}
          >
            <FaSyncAlt className="w-4 h-4" />
            Reintentar
          </button>
        </motion.div>
      </div>
    );
  }

  /* =========================
     STATISTICS CARDS
  ========================== */
  const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    color 
  }: { 
    title: string; 
    value: number; 
    icon: React.ComponentType<{ className?: string }>; // Ensure `className` is supported
    color: string; 
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className={`rounded-xl p-5 border ${
        theme === "dark"
          ? "bg-linear-to-br from-slate-800/50 to-slate-900/50 border-slate-700"
          : "bg-linear-to-br from-white to-slate-50 border-slate-200"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
            {title}
          </p>
          <p className={`text-2xl font-bold mt-1 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
            {value}
          </p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.div>
  );

  return (
    <div
      className={`flex min-h-screen ${
        theme === "dark"
          ? "bg-linear-to-br from-slate-950 via-slate-900 to-slate-950"
          : "bg-linear-to-br from-white via-slate-50 to-slate-100"
      }`}
    >
      

      <div className="flex-1 flex flex-col">
        

        <main className="flex-1 w-full max-w-400 mx-auto px-4 md:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1
                className={`text-2xl font-bold ${
                  theme === "dark" ? "text-white" : "text-slate-900"
                }`}
              >
                <TranslateText text="Sistema de Becarios" />
              </h1>
              <p className="text-sm text-slate-400">
                Gestión de programas, estados y publicaciones
              </p>
            </div>

            <button
              onClick={() => setIsCreateModalOpen(true)}
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed
                         text-white font-medium shadow-lg shadow-blue-600/30 transition duration-200"
            >
              {isSubmitting ? "Creando..." : "Crear nuevo programa"}
            </button>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              title="Total Programas"
              value={stats.total}
              icon={FaChartBar}
              color="bg-gradient-to-r from-blue-500 to-cyan-500"
            />
            <StatCard
              title="Activos"
              value={stats.active}
              icon={FaChartBar}
              color="bg-gradient-to-r from-emerald-500 to-green-500"
            />
            <StatCard
              title="Inactivos"
              value={stats.inactive}
              icon={FaChartBar}
              color="bg-gradient-to-r from-slate-500 to-gray-500"
            />
            <StatCard
              title="Por Finalizar"
              value={stats.expiringSoon}
              icon={FaChartBar}
              color="bg-gradient-to-r from-amber-500 to-orange-500"
            />
          </div>

          {/* Filters & Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`rounded-2xl p-6 mb-8 ${
              theme === "dark"
                ? "bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-slate-700"
                : "bg-linear-to-br from-white to-slate-50 border border-slate-200"
            }`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <FaSearch className={`absolute left-3 top-3.5 w-4 h-4 ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`} />
                  <input
                    type="text"
                    placeholder="Buscar programas..."
                    value={searchTerm}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all ${
                      theme === "dark"
                        ? "bg-slate-800/70 border-slate-700 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                        : "bg-white border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    }`}
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div className="flex gap-2">
                <button
                  onClick={() => setFilterStatus("all")}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filterStatus === "all"
                      ? theme === "dark"
                        ? "bg-linear-to-r from-blue-600 to-indigo-600 text-white"
                        : "bg-linear-to-r from-blue-500 to-blue-600 text-white"
                      : theme === "dark"
                      ? "bg-slate-800 text-slate-400 hover:bg-slate-700"
                      : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                  }`}
                >
                  Todos
                </button>
                <button
                  onClick={() => setFilterStatus("active")}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filterStatus === "active"
                      ? theme === "dark"
                        ? "bg-linear-to-r from-emerald-600 to-green-600 text-white"
                        : "bg-linear-to-r from-emerald-500 to-green-500 text-white"
                      : theme === "dark"
                      ? "bg-slate-800 text-slate-400 hover:bg-slate-700"
                      : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                  }`}
                >
                  Activos
                </button>
                <button
                  onClick={() => setFilterStatus("inactive")}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filterStatus === "inactive"
                      ? theme === "dark"
                        ? "bg-linear-to-r from-rose-600 to-red-600 text-white"
                        : "bg-linear-to-r from-rose-500 to-red-500 text-white"
                      : theme === "dark"
                      ? "bg-slate-800 text-slate-400 hover:bg-slate-700"
                      : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                  }`}
                >
                  Inactivos
                </button>
              </div>

              {/* Sort Controls */}
              <div className="flex gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "date" | "title" | "area")}
                  className={`px-4 py-2 rounded-lg border transition-all ${
                    theme === "dark"
                      ? "bg-slate-800 border-slate-700 text-white"
                      : "bg-white border-slate-300 text-slate-900"
                  }`}
                >
                  <option value="date">Fecha</option>
                  <option value="title">Título</option>
                  <option value="area">Área</option>
                </select>
                
                <button
                  onClick={toggleSortOrder}
                  className={`p-2 rounded-lg ${
                    theme === "dark"
                      ? "bg-slate-800 hover:bg-slate-700 text-slate-400"
                      : "bg-slate-200 hover:bg-slate-300 text-slate-600"
                  }`}
                  title={sortOrder === "desc" ? "Orden descendente" : "Orden ascendente"}
                >
                  {sortOrder === "desc" ? (
                    <FaSortAmountDown className="w-4 h-4" />
                  ) : (
                    <FaSortAmountUp className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Area Filter */}
            {uniqueAreas.length > 0 && (
              <div className="mt-4">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setFilterArea("all")}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      filterArea === "all"
                        ? theme === "dark"
                          ? "bg-linear-to-r from-blue-600 to-indigo-600 text-white"
                          : "bg-linear-to-r from-blue-500 to-blue-600 text-white"
                        : theme === "dark"
                        ? "bg-slate-800 text-slate-400 hover:bg-slate-700"
                        : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                    }`}
                  >
                    Todas las áreas
                  </button>
                  {uniqueAreas.map(area => (
                    <button
                      key={area}
                      onClick={() => setFilterArea(area || "")}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        filterArea === area
                          ? theme === "dark"
                            ? "bg-linear-to-r from-purple-600 to-pink-600 text-white"
                            : "bg-linear-to-r from-purple-500 to-pink-500 text-white"
                          : theme === "dark"
                          ? "bg-slate-800 text-slate-400 hover:bg-slate-700"
                          : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                      }`}
                    >
                      {area}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Results Counter */}
          <div className="flex items-center justify-between mb-6">
            <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
              Mostrando <span className="font-bold">{filteredAndSortedInternships.length}</span> de{" "}
              <span className="font-bold">{internships.length}</span> programas
            </p>
            <button
              onClick={fetchInternships}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                theme === "dark"
                  ? "bg-slate-800 hover:bg-slate-700 text-slate-300"
                  : "bg-slate-200 hover:bg-slate-300 text-slate-600"
              }`}
              title="Actualizar datos"
            >
              <FaSyncAlt className="w-4 h-4" />
              Actualizar
            </button>
          </div>

          {/* Internships List */}
          <InternshipsList
            internships={filteredAndSortedInternships.map(internship => ({
              ...internship,
              area: internship.area || "",
            }))}
            theme={theme}
            onPreview={handlePreview}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleActive={handleToggleActive}
          />

          {/* Modals */}
          <AnimatePresence>
            {isCreateModalOpen && (
              <InternshipsForm
                theme={theme}
                isSubmitting={isSubmitting}
                onCreate={(internship) => {
                  const fixedInternship = {
                    ...internship,
                    area: internship.area || "",
                    requisitos: internship.requisitos || "",
                    modalidad: internship.modalidad || "",
                    ubicacion: internship.ubicacion || "",
                    duracion: internship.duracion || "",
                    horario: internship.horario || "",
                    beneficios: internship.beneficios || "",
                    whatYouWillDo: internship.whatYouWillDo || "",
                    whatYouWillLearn: internship.whatYouWillLearn || "",
                    whatWeAreLookingFor: internship.whatWeAreLookingFor || "",
                  };
                  handleCreateInternship(fixedInternship);
                }}
                onCancel={() => setIsCreateModalOpen(false)}
              />
            )}

            {isDetailModalOpen && selectedInternship && (
              <InternshipDetail
                internship={{
                  ...selectedInternship,
                  area: selectedInternship.area || "",
                  requisitos: selectedInternship.requisitos || "",
                  modalidad: selectedInternship.modalidad || "",
                  ubicacion: selectedInternship.ubicacion || "",
                  duracion: selectedInternship.duracion || "",
                  horario: selectedInternship.horario || "",
                  beneficios: selectedInternship.beneficios || "",
                  whatYouWillDo: selectedInternship.whatYouWillDo || "",
                  whatYouWillLearn: selectedInternship.whatYouWillLearn || "",
                  whatWeAreLookingFor: selectedInternship.whatWeAreLookingFor || "",
                }}
                theme={theme}
                onClose={() => setIsDetailModalOpen(false)}
              />
            )}

            {isEditModalOpen && selectedInternship && (
              <EditInternship
                internship={{
                  ...selectedInternship,
                  area: selectedInternship.area || "",
                  requisitos: selectedInternship.requisitos || "",
                  modalidad: selectedInternship.modalidad || "",
                  ubicacion: selectedInternship.ubicacion || "",
                  duracion: selectedInternship.duracion || "",
                  horario: selectedInternship.horario || "",
                  beneficios: selectedInternship.beneficios || "",
                  whatYouWillDo: selectedInternship.whatYouWillDo || "",
                  whatYouWillLearn: selectedInternship.whatYouWillLearn || "",
                  whatWeAreLookingFor: selectedInternship.whatWeAreLookingFor || "",
                }}
                theme={theme}
                isSubmitting={isSubmitting}
                onSave={(updatedInternship) => {
                  const fixedInternship = {
                    ...updatedInternship,
                    area: updatedInternship.area || "",
                    requisitos: updatedInternship.requisitos || "",
                    modalidad: updatedInternship.modalidad || "",
                    ubicacion: updatedInternship.ubicacion || "",
                    duracion: updatedInternship.duracion || "",
                    horario: updatedInternship.horario || "",
                    beneficios: updatedInternship.beneficios || "",
                    whatYouWillDo: updatedInternship.whatYouWillDo || "",
                    whatYouWillLearn: updatedInternship.whatYouWillLearn || "",
                    whatWeAreLookingFor: updatedInternship.whatWeAreLookingFor || "",
                  };
                  handleSaveEdit(fixedInternship);
                }}
                onCancel={() => setIsEditModalOpen(false)}
              />
            )}

            {isDeleteModalOpen && selectedInternship && (
              <DeleteInternship
                internshipTitle={selectedInternship.title || ""}
                theme={theme}
                isSubmitting={isSubmitting}
                onConfirm={handleConfirmDelete}
                onCancel={() => {
                  setIsDeleteModalOpen(false);
                  setSelectedInternship(null);
                }}
              />
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default InternshipsPage;

"use client";

import React, { useEffect, useState, useCallback, memo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TranslateText } from "@/components/TranslateText";
import { Cookie, RefreshCw, Table2, BarChart3, Box, Settings, Bell, HelpCircle } from "lucide-react";
import dynamic from "next/dynamic";
import CookieStats from "./CookieStats";
import CookieTable from "./CookieTable";
import CookieCharts from "./CookieCharts";
import { adminApi } from "../utils/admin-api";

// Cargar componentes dinámicamente
const Chart3D = dynamic(() => import("./CookieConsent3DChartNew"), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-137.5 rounded-2xl bg-gray-800/20 animate-pulse flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-gray-400">Cargando visualización 3D...</p>
      </div>
    </div>
  )
});

interface CookieConsent {
  accepted: boolean;
  timestamp: string;
  ip: string;
  user_agent: string;
}

interface CookieConsentAdminProps {
  theme?: 'light' | 'dark';
}

type ActiveTab = 'table' | 'charts' | '3d';

function CookieConsentAdminComponent({ theme = 'light' }: CookieConsentAdminProps) {
  const [data, setData] = useState<CookieConsent[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab') as ActiveTab;
  
  const [activeTab, setActiveTab] = useState<ActiveTab>(
    ['table', 'charts', '3d'].includes(tabParam) ? tabParam : 'table'
  );

  const fetchData = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
      setError(null);
    }

    try {
      const result = await adminApi.getCookieConsents({ limit: 200 });
      setData(Array.isArray(result) ? result : []);
      setLastUpdated(new Date());
      setError(null);
    } catch (error) {
      console.error("Error fetching cookie data:", error);
      setError(error instanceof Error ? error.message : "Error desconocido");
      setData([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-refresh
  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(() => {
      fetchData(true);
    }, 30000); // 30 segundos
    
    return () => clearInterval(interval);
  }, [autoRefresh, fetchData]);

  // Sincronizar tab con la URL
  useEffect(() => {
    if (!tabParam || tabParam !== activeTab) {
      const params = new URLSearchParams(Array.from(searchParams.entries()));
      params.set('tab', activeTab);
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, [activeTab, router, searchParams, tabParam]);

  const tabs = [
    { 
      id: 'table' as const, 
      icon: Table2, 
      label: 'Registros',
      description: 'Tabla detallada de todos los consentimientos'
    },
    { 
      id: 'charts' as const, 
      icon: BarChart3, 
      label: 'Métricas',
      description: 'Gráficos y estadísticas avanzadas'
    },
    { 
      id: '3d' as const, 
      icon: Box, 
      label: 'Vista 3D',
      description: 'Visualización tridimensional interactiva'
    },
  ];

  const handleTabChange = (tabId: ActiveTab) => {
    setActiveTab(tabId);
    // Scroll suave al cambiar de tab
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading && !refreshing) {
    return (
      <div className={`rounded-2xl border ${
        theme === 'dark' ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <div className="p-8">
          <div className="flex flex-col items-center justify-center py-16">
            <div className="relative mb-6">
              <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
              <Cookie className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-blue-500" />
            </div>
            <h3 className={`text-lg font-semibold mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              <TranslateText text="Cargando datos" />
            </h3>
            <p className={`text-sm text-center max-w-md ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <TranslateText text="Estamos obteniendo los últimos registros de consentimiento de cookies..." />
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl border ${
      theme === 'dark' ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-200'
    }`}>
      {/* Header mejorado */}
      <div className={`p-6 border-b ${
        theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Título y descripción */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-3">
              <div className={`p-3 rounded-xl ${
                theme === 'dark' 
                  ? 'bg-linear-to-br from-amber-600/20 to-amber-500/10 shadow-lg shadow-amber-500/10' 
                  : 'bg-linear-to-br from-amber-100 to-amber-50 shadow-md shadow-amber-200/50'
              }`}>
                <Cookie className={`w-6 h-6 ${
                  theme === 'dark' ? 'text-amber-400' : 'text-amber-600'
                }`} />
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  <TranslateText text="Consentimientos de Cookies" />
                </h1>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  <TranslateText text="Gestión y análisis completo de preferencias de usuarios" />
                </p>
              </div>
            </div>
            
            {/* Estado y última actualización */}
            <div className="flex flex-wrap items-center gap-4 mt-4">
              {error ? (
                <div className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                  theme === 'dark' ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-700'
                }`}>
                  ⚠️ <TranslateText text="Error: " /> {error}
                </div>
              ) : (
                <>
                  <div className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                    theme === 'dark' ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700'
                  }`}>
                    ✓ <TranslateText text="Conectado" />
                  </div>
                  <div className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                    theme === 'dark' ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-700'
                  }`}>
                    📊 {data.length} <TranslateText text="registros" />
                  </div>
                </>
              )}
              
              {lastUpdated && (
                <div className={`text-sm ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  <TranslateText text="Última actualización:" /> {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              )}
            </div>
          </div>

          {/* Controles y acciones */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Tabs */}
            <div className={`flex rounded-xl p-1 ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
            }`}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex flex-col items-center px-4 py-2 rounded-lg text-sm font-medium transition-all min-w-20 ${
                    activeTab === tab.id
                      ? theme === 'dark'
                        ? 'bg-linear-to-br from-blue-600 to-blue-500 text-white shadow-lg'
                        : 'bg-white text-blue-600 shadow-md'
                      : theme === 'dark'
                        ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                  }`}
                  title={tab.description}
                >
                  <tab.icon className="w-4 h-4 mb-1" />
                  <span><TranslateText text={tab.label} /></span>
                </button>
              ))}
            </div>

            {/* Botones de acción */}
            <div className="flex items-center gap-2">
              {/* Auto-refresh toggle */}
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  autoRefresh
                    ? theme === 'dark'
                      ? 'bg-green-700 text-white'
                      : 'bg-green-100 text-green-700'
                    : theme === 'dark'
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                title={autoRefresh ? "Auto-refresh activado (30s)" : "Activar auto-refresh"}
              >
                <Bell className={`w-4 h-4 ${autoRefresh ? 'animate-pulse' : ''}`} />
                <span className="hidden sm:inline">Auto</span>
              </button>

              {/* Refresh button */}
              <button
                onClick={() => fetchData(true)}
                disabled={refreshing}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  refreshing
                    ? 'opacity-70 cursor-not-allowed'
                    : theme === 'dark'
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
                title="Actualizar datos"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline"><TranslateText text="Actualizar" /></span>
              </button>

              {/* Configuración y ayuda */}
              <button
                className={`p-2 rounded-lg transition-all ${
                  theme === 'dark'
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                title="Configuración"
              >
                <Settings className="w-4 h-4" />
              </button>
              
              <button
                className={`p-2 rounded-lg transition-all ${
                  theme === 'dark'
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                title="Ayuda"
              >
                <HelpCircle className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="p-6">
        {/* Stats section - Siempre visible */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              <TranslateText text="Resumen General" />
            </h3>
            {autoRefresh && (
              <div className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
                theme === 'dark' 
                  ? 'bg-green-900/30 text-green-400' 
                  : 'bg-green-100 text-green-700'
              }`}>
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                <span><TranslateText text="Actualización automática activada" /></span>
              </div>
            )}
          </div>
          <CookieStats data={data} theme={theme} />
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {error ? (
            <div className={`p-6 rounded-xl ${
              theme === 'dark' 
                ? 'bg-red-900/20 border border-red-800' 
                : 'bg-red-50 border border-red-200'
            }`}>
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${
                  theme === 'dark' ? 'bg-red-900/30' : 'bg-red-100'
                }`}>
                  <span className="text-2xl">⚠️</span>
                </div>
                <div className="flex-1">
                  <h4 className={`text-lg font-semibold mb-2 ${
                    theme === 'dark' ? 'text-red-400' : 'text-red-700'
                  }`}>
                    <TranslateText text="Error al cargar datos" />
                  </h4>
                  <p className={`text-sm mb-4 ${
                    theme === 'dark' ? 'text-red-300/80' : 'text-red-600/80'
                  }`}>
                    {error}
                  </p>
                  <button
                    onClick={() => fetchData(true)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      theme === 'dark'
                        ? 'bg-red-700 text-white hover:bg-red-600'
                        : 'bg-red-600 text-white hover:bg-red-700'
                    }`}
                  >
                    <RefreshCw className="w-4 h-4 inline mr-2" />
                    <TranslateText text="Reintentar" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              {activeTab === 'table' && (
                <div className="space-y-6">
                  <div className={`p-4 rounded-xl ${
                    theme === 'dark' 
                      ? 'bg-gray-800/30 border border-gray-700' 
                      : 'bg-gray-50 border border-gray-200'
                  }`}>
                    <div className="flex items-center gap-3">
                      <Table2 className={`w-5 h-5 ${
                        theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                      }`} />
                      <div>
                        <h4 className={`font-medium ${
                          theme === 'dark' ? 'text-blue-300' : 'text-blue-900'
                        }`}>
                          <TranslateText text="Registros Detallados" />
                        </h4>
                        <p className={`text-sm mt-1 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          <TranslateText text="Tabla completa con filtros, búsqueda y opciones de exportación." />
                        </p>
                      </div>
                    </div>
                  </div>
                  <CookieTable data={data} theme={theme} />
                </div>
              )}

              {activeTab === 'charts' && (
                <div className="space-y-6">
                  <div className={`p-4 rounded-xl ${
                    theme === 'dark' 
                      ? 'bg-gray-800/30 border border-gray-700' 
                      : 'bg-gray-50 border border-gray-200'
                  }`}>
                    <div className="flex items-center gap-3">
                      <BarChart3 className={`w-5 h-5 ${
                        theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'
                      }`} />
                      <div>
                        <h4 className={`font-medium ${
                          theme === 'dark' ? 'text-emerald-300' : 'text-emerald-900'
                        }`}>
                          <TranslateText text="Análisis Visual" />
                        </h4>
                        <p className={`text-sm mt-1 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          <TranslateText text="Gráficos interactivos para análisis de tendencias y distribución." />
                        </p>
                      </div>
                    </div>
                  </div>
                  <CookieCharts data={data} theme={theme} />
                </div>
              )}

              {activeTab === '3d' && (
                <div className="space-y-6">
                  <div className={`p-4 rounded-xl ${
                    theme === 'dark' 
                      ? 'bg-linear-to-r from-gray-800/40 to-blue-900/20 border border-gray-700' 
                      : 'bg-linear-to-r from-blue-50 to-cyan-50 border border-blue-200'
                  }`}>
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl ${
                        theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100'
                      }`}>
                        <Box className={`w-6 h-6 ${
                          theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-medium mb-2 ${
                          theme === 'dark' ? 'text-blue-300' : 'text-blue-900'
                        }`}>
                          <TranslateText text="Visualización 3D Interactiva" />
                        </h4>
                        <p className={`text-sm mb-3 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-700'
                        }`}>
                          <TranslateText text="Explora los datos en una experiencia 3D inmersiva. Arrastra para rotar la vista, usa la rueda del mouse para hacer zoom y pasa el cursor sobre las barras para ver detalles." />
                        </p>
                        <div className={`flex flex-wrap gap-2 text-xs ${
                          theme === 'dark' ? 'text-gray-500' : 'text-gray-600'
                        }`}>
                          <span className={`px-2 py-1 rounded ${
                            theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
                          }`}>
                            🖱️ <TranslateText text="Arrastra para rotar" />
                          </span>
                          <span className={`px-2 py-1 rounded ${
                            theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
                          }`}>
                            🔍 <TranslateText text="Scroll para zoom" />
                          </span>
                          <span className={`px-2 py-1 rounded ${
                            theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
                          }`}>
                            👆 <TranslateText text="Click en barras para detalles" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <Chart3D data={data} theme={theme} />
                    
                    {/* Overlay de carga para 3D */}
                    {refreshing && (
                      <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm rounded-2xl flex items-center justify-center z-20">
                        <div className="text-center">
                          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mb-4"></div>
                          <p className="text-white font-medium">
                            <TranslateText text="Actualizando visualización 3D..." />
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer informativo */}
        <div className={`mt-8 pt-6 border-t ${
          theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
        }`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className={`text-sm ${
              theme === 'dark' ? 'text-gray-500' : 'text-gray-600'
            }`}>
              <span><TranslateText text="Sistema de gestión de consentimientos de cookies" /></span>
              <span className="mx-2">•</span>
              <span><TranslateText text="Versión 2.0" /></span>
            </div>
            <div className="flex items-center gap-4">
              <button className={`text-sm hover:underline ${
                theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}>
                <TranslateText text="Documentación" />
              </button>
              <button className={`text-sm hover:underline ${
                theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}>
                <TranslateText text="Soporte" />
              </button>
              <button className={`text-sm hover:underline ${
                theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}>
                <TranslateText text="Reportar problema" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Memoize para prevenir re-renders innecesarios
// Solo re-renderiza si theme prop cambia
const CookieConsentAdmin = memo(CookieConsentAdminComponent);
CookieConsentAdmin.displayName = 'CookieConsentAdmin';

export default CookieConsentAdmin;

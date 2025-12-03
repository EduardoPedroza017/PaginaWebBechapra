"use client";

import React, { useEffect, useState } from "react";
import { TranslateText } from "@/components/TranslateText";
import { Cookie, RefreshCw, Table2, BarChart3, Box } from "lucide-react";
import dynamic from "next/dynamic";
import CookieStats from "./CookieStats";
import CookieTable from "./CookieTable";
import CookieCharts from "./CookieCharts";

// Cargar 3D chart dinámicamente (sin SSR)
const Chart3D = dynamic(() => import("./CookieConsent3DChartNew"), { ssr: false });

interface CookieConsent {
  accepted: boolean;
  timestamp: string;
  ip: string;
  user_agent: string;
}

interface CookieConsentAdminProps {
  theme?: 'light' | 'dark';
}

export default function CookieConsentAdmin({ theme = 'light' }: CookieConsentAdminProps) {
  const [data, setData] = useState<CookieConsent[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'table' | 'charts' | '3d'>('table');

  const fetchData = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/cookies/list?limit=200");
      const result = await res.json();
      setData(result || []);
    } catch (error) {
      console.error("Error fetching cookie data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const tabs = [
    { id: 'table' as const, icon: Table2, label: 'Registros' },
    { id: 'charts' as const, icon: BarChart3, label: 'Métricas' },
    { id: '3d' as const, icon: Box, label: 'Vista 3D' },
  ];

  if (loading) {
    return (
      <div className={`rounded-2xl border p-8 ${
        theme === 'dark' ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-3 border-b-3 border-blue-600 mb-4"></div>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              <TranslateText text="Cargando consentimientos..." />
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl border mt-6 ${
      theme === 'dark' ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-200'
    }`}>
      {/* Header */}
      <div className={`p-5 border-b ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl ${
              theme === 'dark' ? 'bg-amber-600/20' : 'bg-amber-100'
            }`}>
              <Cookie className={`w-6 h-6 ${
                theme === 'dark' ? 'text-amber-400' : 'text-amber-600'
              }`} />
            </div>
            <div>
              <h2 className={`text-lg font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                <TranslateText text="Consentimientos de Cookies" />
              </h2>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <TranslateText text="Gestión y análisis de preferencias de usuarios" />
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Tabs */}
            <div className={`flex rounded-xl p-1 ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
            }`}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? theme === 'dark'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-blue-600 shadow-sm'
                      : theme === 'dark'
                        ? 'text-gray-400 hover:text-white'
                        : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="hidden sm:inline"><TranslateText text={tab.label} /></span>
                </button>
              ))}
            </div>

            {/* Refresh button */}
            <button
              onClick={() => fetchData(true)}
              disabled={refreshing}
              className={`p-2.5 rounded-xl transition-all ${
                refreshing ? 'opacity-50' : ''
              } ${
                theme === 'dark'
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Stats - Always visible */}
        <CookieStats data={data} theme={theme} />

        {/* Tab Content */}
        {activeTab === 'table' && (
          <CookieTable data={data} theme={theme} />
        )}

        {activeTab === 'charts' && (
          <CookieCharts data={data} theme={theme} />
        )}

        {activeTab === '3d' && (
          <div className="space-y-4">
            <div className={`p-4 rounded-xl ${
              theme === 'dark' ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'
            }`}>
              <div className="flex items-start gap-3">
                <Box className={`w-5 h-5 mt-0.5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                <div>
                  <h4 className={`font-medium ${theme === 'dark' ? 'text-blue-300' : 'text-blue-900'}`}>
                    <TranslateText text="Visualización 3D Interactiva" />
                  </h4>
                  <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-blue-400/70' : 'text-blue-700/70'}`}>
                    <TranslateText text="Gráfico tridimensional con barras animadas. Arrastra para rotar, usa scroll para zoom y pasa el mouse sobre las barras para ver detalles." />
                  </p>
                </div>
              </div>
            </div>
            <Chart3D data={data} theme={theme} />
          </div>
        )}
      </div>
    </div>
  );
}

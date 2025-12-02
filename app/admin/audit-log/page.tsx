"use client";

import { useEffect, useState } from "react";

import { Sidebar } from "../dashboard/Sidebar";
import { Header } from "../dashboard/Header";
import { ExportAuditLogsButton } from "./ExportAuditLogsButton";
import { TranslateText } from "@/components/TranslateText";

type AuditLogFiltersState = {
  user: string;
  ip: string;
  success: '' | 'success' | 'fail';
  date: string;
};

function AuditLogFilters({ filters, setFilters }: {
  filters: AuditLogFiltersState;
  setFilters: (f: AuditLogFiltersState) => void;
}) {
  return (
    <div className="mb-8 flex flex-col md:flex-row gap-2 md:gap-4 items-center">
      <input
        type="text"
        placeholder="Buscar usuario..."
        className="px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all 
          dark:bg-gray-800 dark:border-gray-700 dark:text-white 
          bg-gray-100 border-gray-300 text-gray-900 
          focus:bg-white focus:border-blue-400"
        value={filters.user}
        onChange={e => setFilters({ ...filters, user: e.target.value })}
      />
      <input
        type="text"
        placeholder="Buscar IP..."
        className="px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all 
          dark:bg-gray-800 dark:border-gray-700 dark:text-white 
          bg-gray-100 border-gray-300 text-gray-900 
          focus:bg-white focus:border-blue-400"
        value={filters.ip}
        onChange={e => setFilters({ ...filters, ip: e.target.value })}
      />
      <select
        className="px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all 
          dark:bg-gray-800 dark:border-gray-700 dark:text-white 
          bg-gray-100 border-gray-300 text-gray-900 
          focus:bg-white focus:border-blue-400"
        value={filters.success}
        onChange={e => setFilters({ ...filters, success: e.target.value as '' | 'success' | 'fail' })}
      >
        <option value=""><TranslateText text="Éxito/Fallo" asOption /></option>
        <option value="success"><TranslateText text="Solo éxitos" asOption /></option>
        <option value="fail"><TranslateText text="Solo fallos" asOption /></option>
      </select>
      <input
        type="date"
        className="px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all 
          dark:bg-gray-800 dark:border-gray-700 dark:text-white 
          bg-gray-100 border-gray-300 text-gray-900 
          focus:bg-white focus:border-blue-400"
        value={filters.date}
        onChange={e => setFilters({ ...filters, date: e.target.value })}
      />
    </div>
  );
}
import {
  Bar,
  Pie,
  Line,
} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  TimeScale,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  TimeScale
);

interface AuditLogEntry {
  user_id: string;
  timestamp?: string;
  ip?: string;
  user_agent?: string;
  success: boolean;
  reason?: string;
}

export default function AuditLogPage() {
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // Leer el tema guardado en localStorage al iniciar
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return (savedTheme === 'dark' || savedTheme === 'light') ? savedTheme : 'light';
    }
    return 'light';
  });
  const [filters, setFilters] = useState<AuditLogFiltersState>({ user: '', ip: '', success: '', date: '' });

  const handleToggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };
  const handleLogout = () => {
    sessionStorage.removeItem('admin');
    sessionStorage.removeItem('role');
    window.location.href = '/admin';
  };

  useEffect(() => {
    const admin = sessionStorage.getItem("admin") === "true";
    const role = sessionStorage.getItem("role") || "";
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/audit`, {
      headers: {
        "Content-Type": "application/json",
        "X-Admin": String(admin),
        "X-Role": role,
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("No autorizado");
        const data = await res.json();
        setLogs(data.logs || []);
        setLoading(false);
      })
      .catch(() => {
        setError("No autorizado o error de servidor");
        setLoading(false);
      });
  }, []);

  // --- PAGINACIÓN (hooks deben ir antes de cualquier return) ---
  const [page, setPage] = useState(1);
  // --- FILTRO AVANZADO ---
  const filteredLogs = logs.filter(log => {
    if (filters.user && !log.user_id.toLowerCase().includes(filters.user.toLowerCase())) return false;
    if (filters.ip && (!log.ip || !log.ip.includes(filters.ip))) return false;
    if (filters.success === 'success' && !log.success) return false;
    if (filters.success === 'fail' && log.success) return false;
    if (filters.date && log.timestamp) {
      const logDate = new Date(log.timestamp);
      const filterDate = new Date(filters.date);
      if (
        logDate.getFullYear() !== filterDate.getFullYear() ||
        logDate.getMonth() !== filterDate.getMonth() ||
        logDate.getDate() !== filterDate.getDate()
      ) return false;
    }
    return true;
  });
  const rowsPerPage = 5;
  const totalPages = Math.ceil(filteredLogs.length / rowsPerPage);
  const paginatedLogs = filteredLogs.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  // Reset page if filters change, pero solo si no está ya en 1
  useEffect(() => {
    if (page !== 1) setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  if (loading) return <div className="p-4"><TranslateText text="Cargando auditoría..." /></div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  // --- MÉTRICAS Y ESTADÍSTICAS ---
  // 1. Total de intentos
  const total = filteredLogs.length;
  // 2. Éxitos y fallos
  const successCount = filteredLogs.filter(l => l.success).length;
  const failCount = total - successCount;
  // 3. Top usuarios con más intentos
  const userCounts: Record<string, number> = {};
  filteredLogs.forEach(l => { userCounts[l.user_id] = (userCounts[l.user_id] || 0) + 1; });
  const topUsers = Object.entries(userCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  // 4. Intentos por día (últimos 7 días)
  const now = new Date();
  const days: string[] = [];
  const dayCounts: number[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    const label = d.toLocaleDateString();
    days.push(label);
    dayCounts.push(
      filteredLogs.filter(l => {
        if (!l.timestamp) return false;
        const logDate = new Date(l.timestamp);
        return logDate.toLocaleDateString() === label;
      }).length
    );
  }

  // --- GRÁFICAS ---
  const pieData = {
    labels: ['Éxito', 'Fallo'],
    datasets: [{
      data: [successCount, failCount],
      backgroundColor: ['#22c55e', '#ef4444'],
      borderColor: theme === 'dark' ? ['#22c55e', '#ef4444'] : ['#16a34a', '#b91c1c'],
      borderWidth: 2,
    }],
  };
  const pieOptions = {
    plugins: {
      legend: {
        labels: {
          color: theme === 'dark' ? '#fff' : '#222',
          font: { weight: 'bold' as const },
        },
      },
      tooltip: {
        bodyColor: theme === 'dark' ? '#fff' : '#222',
        backgroundColor: theme === 'dark' ? '#222' : '#fff',
      },
    },
  };
  const barData = {
    labels: topUsers.map(([u]) => u),
    datasets: [{
      label: 'Intentos',
      data: topUsers.map(([, c]) => c),
      backgroundColor: theme === 'dark' ? '#60a5fa' : '#3b82f6',
      borderColor: theme === 'dark' ? '#1e40af' : '#1d4ed8',
      borderWidth: 1,
    }],
  };
  const barOptions = {
    plugins: {
      legend: { display: false },
      tooltip: {
        bodyColor: theme === 'dark' ? '#fff' : '#222',
        backgroundColor: theme === 'dark' ? '#222' : '#fff',
      },
    },
    scales: {
      x: {
        ticks: { color: theme === 'dark' ? '#fff' : '#222' },
        grid: { color: theme === 'dark' ? '#374151' : '#e5e7eb' },
      },
      y: {
        ticks: { color: theme === 'dark' ? '#fff' : '#222' },
        grid: { color: theme === 'dark' ? '#374151' : '#e5e7eb' },
      },
    },
  };
  const lineData = {
    labels: days,
    datasets: [{
      label: 'Intentos por día',
      data: dayCounts,
      borderColor: theme === 'dark' ? '#818cf8' : '#6366f1',
      backgroundColor: theme === 'dark' ? 'rgba(99,102,241,0.2)' : '#a5b4fc',
      fill: true,
      tension: 0.3,
      pointBackgroundColor: theme === 'dark' ? '#fff' : '#222',
      pointBorderColor: theme === 'dark' ? '#fff' : '#222',
    }],
  };
  const lineOptions = {
    plugins: {
      legend: {
        labels: {
          color: theme === 'dark' ? '#fff' : '#222',
          font: { weight: 'bold' as const },
        },
      },
      tooltip: {
        bodyColor: theme === 'dark' ? '#fff' : '#222',
        backgroundColor: theme === 'dark' ? '#222' : '#fff',
      },
    },
    scales: {
      x: {
        ticks: { color: theme === 'dark' ? '#fff' : '#222' },
        grid: { color: theme === 'dark' ? '#374151' : '#e5e7eb' },
      },
      y: {
        ticks: { color: theme === 'dark' ? '#fff' : '#222' },
        grid: { color: theme === 'dark' ? '#374151' : '#e5e7eb' },
      },
    },
  };

  return (
    <div className={`flex min-h-screen ${theme === 'dark' ? 'bg-gray-950' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
      <Sidebar selected="/admin/audit-log" theme={theme} />
      <div className="flex-1 flex flex-col">
        <Header onLogout={handleLogout} onToggleTheme={handleToggleTheme} theme={theme} />
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className={`text-4xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              <TranslateText text="Logs de Auditoría" />
            </h1>
            <ExportAuditLogsButton logs={logs} />
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              <TranslateText text="Monitoreo y análisis de accesos al sistema" />
            </p>
          </div>

          <AuditLogFilters filters={filters} setFilters={setFilters} />
          {/* Métricas principales */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className={`rounded-xl shadow-lg p-6 border ${theme === 'dark' ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}><TranslateText text="Total" /></p>
                  <p className={`text-3xl font-bold mt-1 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>{total}</p>
                </div>
                <div className={`p-3 rounded-full ${theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                  <svg className={`w-8 h-8 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className={`rounded-xl shadow-lg p-6 border ${theme === 'dark' ? 'bg-gradient-to-br from-green-900/30 to-gray-900 border-green-800/30' : 'bg-white border-green-200'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}><TranslateText text="Exitosos" /></p>
                  <p className="text-3xl font-bold mt-1 text-green-500">{successCount}</p>
                </div>
                <div className="p-3 rounded-full bg-green-500/20">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className={`rounded-xl shadow-lg p-6 border ${theme === 'dark' ? 'bg-gradient-to-br from-red-900/30 to-gray-900 border-red-800/30' : 'bg-white border-red-200'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}><TranslateText text="Fallidos" /></p>
                  <p className="text-3xl font-bold mt-1 text-red-500">{failCount}</p>
                </div>
                <div className="p-3 rounded-full bg-red-500/20">
                  <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className={`rounded-xl shadow-lg p-6 border ${theme === 'dark' ? 'bg-gradient-to-br from-purple-900/30 to-gray-900 border-purple-800/30' : 'bg-white border-purple-200'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}><TranslateText text="Tasa Éxito" /></p>
                  <p className={`text-3xl font-bold mt-1 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>
                    {total > 0 ? Math.round((successCount / total) * 100) : 0}%
                  </p>
                </div>
                <div className={`p-3 rounded-full ${theme === 'dark' ? 'bg-purple-500/20' : 'bg-purple-100'}`}>
                  <svg className={`w-8 h-8 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Gráficas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className={`rounded-xl shadow-lg p-6 border ${theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
              <h2 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <TranslateText text="Distribución de Intentos" />
              </h2>
              <div className="flex justify-center">
                <div className="w-64 h-64">
                  <Pie data={pieData} options={pieOptions} />
                </div>
              </div>
            </div>

            <div className={`rounded-xl shadow-lg p-6 border ${theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
              <h2 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <TranslateText text="Top 5 Usuarios Activos" />
              </h2>
              <Bar data={barData} options={barOptions} />
            </div>
          </div>

          <div className={`rounded-xl shadow-lg p-6 mb-8 border ${theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
            <h2 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              <TranslateText text="Tendencia de Accesos (Últimos 7 días)" />
            </h2>
            <Line data={lineData} options={lineOptions} />
          </div>

          {/* Tabla de logs */}
          <div className={`rounded-xl shadow-lg overflow-hidden border ${theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <TranslateText text="Registro Detallado de Accesos" />
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className={theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}>
                  <tr>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}><TranslateText text="Usuario" /></th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}><TranslateText text="Fecha/Hora" /></th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}><TranslateText text="IP" /></th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}><TranslateText text="User Agent" /></th>
                    <th className={`px-6 py-3 text-center text-xs font-medium uppercase tracking-wider ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}><TranslateText text="Estado" /></th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}><TranslateText text="Motivo" /></th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${theme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'}`}>
                  {paginatedLogs.map((log, i) => (
                    <tr key={i} className={`transition-colors ${log.success
                      ? (theme === 'dark' ? 'hover:bg-green-900/30' : 'hover:bg-green-50')
                      : (theme === 'dark' ? 'hover:bg-red-900/30' : 'hover:bg-red-50')
                      }`}>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {log.user_id}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        {log.timestamp ? new Date(log.timestamp).toLocaleString() : "-"}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        {log.ip || "-"}
                      </td>
                      <td className={`px-6 py-4 text-sm max-w-xs truncate ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        {log.user_agent || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {log.success ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                            <TranslateText text="Exitoso" />
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                            <TranslateText text="Fallido" />
                          </span>
                        )}
                      </td>
                      <td className={`px-6 py-4 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        {log.reason || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between items-center px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <button
              className={`px-3 py-1 rounded ${page === 1 ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'} transition-all`}
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
            >Anterior</button>
            <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Página {page} de {totalPages || 1}</span>
            <button
              className={`px-3 py-1 rounded ${page === totalPages || totalPages === 0 ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'} transition-all`}
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || totalPages === 0}
            >Siguiente</button>
          </div>
          </div>
        </main>
      </div>
    </div>
  );
}

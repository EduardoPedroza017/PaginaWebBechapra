"use client";

import { useMemo } from "react";
import { TranslateText } from "@/components/TranslateText";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Filler, type ScriptableContext } from 'chart.js';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import { PieChart, BarChart3, TrendingUp } from "lucide-react";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Filler);

interface CookieConsent {
  accepted: boolean;
  timestamp: string;
  ip: string;
  user_agent: string;
}

interface CookieChartsProps {
  data: CookieConsent[];
  theme?: 'light' | 'dark';
}

export default function CookieCharts({ data, theme = 'dark' }: CookieChartsProps) {
  const accepted = data.filter(d => d.accepted).length;
  const rejected = data.filter(d => !d.accepted).length;

  // Datos para gráfico de dona con gradientes futuristas
  const doughnutData = {
    labels: ['Aceptados', 'Rechazados'],
    datasets: [{
      data: [accepted, rejected],
      backgroundColor: [
        'rgba(16, 185, 129, 0.9)',    // Verde neón
        'rgba(244, 63, 94, 0.9)',      // Rosa neón
      ],
      borderColor: [
        'rgba(16, 185, 129, 1)',
        'rgba(244, 63, 94, 1)',
      ],
      borderWidth: 4,
      hoverOffset: 20,
      hoverBorderWidth: 5,
      hoverBorderColor: [
        'rgba(16, 185, 129, 1)',
        'rgba(244, 63, 94, 1)',
      ],
    }]
  };

  // Datos por día (últimos 7 días)
  const dailyData = useMemo(() => {
    const last7Days: { [key: string]: { accepted: number, rejected: number } } = {};
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const key = date.toISOString().split('T')[0];
      last7Days[key] = { accepted: 0, rejected: 0 };
    }

    data.forEach(item => {
      const date = new Date(item.timestamp).toISOString().split('T')[0];
      if (last7Days[date]) {
        if (item.accepted) {
          last7Days[date].accepted++;
        } else {
          last7Days[date].rejected++;
        }
      }
    });

    return last7Days;
  }, [data]);

  const barChartData = {
    labels: Object.keys(dailyData).map(date => {
      const d = new Date(date);
      return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
    }),
    datasets: [
      {
        label: 'Aceptados',
        data: Object.values(dailyData).map(d => d.accepted),
        backgroundColor: 'rgba(16, 185, 129, 0.95)', // Verde neón más intenso
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 3,
        borderRadius: 12,
        borderSkipped: false,
        hoverBackgroundColor: 'rgba(16, 185, 129, 1)',
        hoverBorderColor: 'rgba(5, 150, 105, 1)',
        hoverBorderWidth: 4,
      },
      {
        label: 'Rechazados',
        data: Object.values(dailyData).map(d => d.rejected),
        backgroundColor: 'rgba(244, 63, 94, 0.95)', // Rosa neón más intenso
        borderColor: 'rgba(244, 63, 94, 1)',
        borderWidth: 3,
        borderRadius: 12,
        borderSkipped: false,
        hoverBackgroundColor: 'rgba(244, 63, 94, 1)',
        hoverBorderColor: 'rgba(225, 29, 72, 1)',
        hoverBorderWidth: 4,
      }
    ]
  };

  // Datos acumulados para línea de tendencia futurista
  const lineData = {
    labels: Object.keys(dailyData).map(date => {
      const d = new Date(date);
      return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
    }),
    datasets: [{
      label: 'Total Diario',
      data: Object.values(dailyData).map(d => d.accepted + d.rejected),
      fill: true,
      backgroundColor: (context: ScriptableContext<'line'>) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.5)'); // Azul superior
        gradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.3)'); // Morado medio
        gradient.addColorStop(1, 'rgba(236, 72, 153, 0.1)'); // Rosa inferior
        return gradient;
      },
      borderColor: 'rgba(59, 130, 246, 1)',
      borderWidth: 4,
      tension: 0.4,
      pointBackgroundColor: 'rgba(59, 130, 246, 1)',
      pointBorderColor: '#0f172a',
      pointBorderWidth: 4,
      pointRadius: 7,
      pointHoverRadius: 12,
      pointHoverBorderWidth: 5,
      pointHoverBackgroundColor: 'rgba(96, 165, 250, 1)',
      pointHoverBorderColor: 'rgba(59, 130, 246, 1)',
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowBlur: 20,
      shadowColor: 'rgba(59, 130, 246, 0.5)',
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 2000,
      easing: 'easeInOutCubic' as const,
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: theme === 'dark' ? '#e2e8f0' : '#475569',
          font: { 
            size: 13, 
            weight: 700 as const, 
            family: "'Inter', 'Segoe UI', sans-serif" 
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle' as const,
          boxWidth: 12,
          boxHeight: 12,
        }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.98)',
        titleColor: '#f1f5f9',
        bodyColor: '#e2e8f0',
        borderColor: 'rgba(59, 130, 246, 0.8)',
        borderWidth: 3,
        padding: 16,
        cornerRadius: 12,
        titleFont: { size: 15, weight: 'bold' as const },
        bodyFont: { size: 14, weight: 600 as const },
        displayColors: true,
        boxPadding: 8,
        caretSize: 8,
      }
    }
  };

  const barOptions = {
    ...chartOptions,
    scales: {
      x: {
        grid: { 
          display: false,
        },
        ticks: { 
          color: theme === 'dark' ? '#cbd5e1' : '#64748b',
          font: { size: 12, weight: 600 as const }
        }
      },
      y: {
        grid: { 
          color: theme === 'dark' ? 'rgba(71, 85, 105, 0.3)' : 'rgba(226, 232, 240, 0.8)',
          lineWidth: 2,
          drawBorder: false,
        },
        ticks: { 
          color: theme === 'dark' ? '#cbd5e1' : '#64748b',
          font: { size: 12, weight: 600 as const }
        }
      }
    },
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
  };

  const lineOptions = {
    ...chartOptions,
    scales: {
      x: {
        grid: { 
          display: false,
        },
        ticks: { 
          color: theme === 'dark' ? '#cbd5e1' : '#64748b',
          font: { size: 12, weight: 600 as const }
        }
      },
      y: {
        grid: { 
          color: theme === 'dark' ? 'rgba(71, 85, 105, 0.3)' : 'rgba(226, 232, 240, 0.8)',
          lineWidth: 2,
          drawBorder: false,
        },
        ticks: { 
          color: theme === 'dark' ? '#cbd5e1' : '#64748b',
          font: { size: 12, weight: 600 as const }
        }
      }
    },
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
  };
  const doughnutOptions = {
    ...chartOptions,
    cutout: '75%',
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 2500,
      easing: 'easeInOutCubic' as const,
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      {/* Gráfico de Dona - Futurista */}
      <div className={`group rounded-3xl border p-7 transition-all duration-700 hover:scale-[1.03] relative overflow-hidden ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-slate-900/90 via-purple-900/10 to-slate-900/90 border-purple-500/30 shadow-2xl shadow-purple-500/20 hover:shadow-purple-500/40 hover:border-purple-400/50' 
          : 'bg-gradient-to-br from-white via-purple-50/30 to-white border-purple-200 shadow-xl hover:shadow-2xl hover:shadow-purple-300/30'
      }`}>
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-3 rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${
              theme === 'dark' 
                ? 'bg-gradient-to-br from-purple-600/40 to-pink-600/30 shadow-lg shadow-purple-500/30' 
                : 'bg-gradient-to-br from-purple-100 to-pink-100 shadow-md shadow-purple-200/50'
            }`}>
              <PieChart className={`w-6 h-6 ${theme === 'dark' ? 'text-purple-300' : 'text-purple-700'}`} />
            </div>
            <div>
              <h3 className={`font-bold text-xl ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                <TranslateText text="Distribución" />
              </h3>
              <p className={`text-xs font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                <TranslateText text="Porcentaje de consentimientos" />
              </p>
            </div>
          </div>
          <div className="h-[220px] flex items-center justify-center mb-5 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`w-32 h-32 rounded-full blur-2xl opacity-50 ${
                theme === 'dark' ? 'bg-purple-500/20' : 'bg-purple-300/30'
              }`} />
            </div>
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
          <div className="flex justify-center gap-10 mt-6 pt-5 border-t border-purple-500/20">
            <div className="text-center transform transition-all duration-500 hover:scale-125">
              <span className="text-4xl font-black bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent block drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]">{accepted}</span>
              <p className={`text-xs mt-2 font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}>
                <TranslateText text="Aceptados" />
              </p>
            </div>
            <div className="text-center transform transition-all duration-500 hover:scale-125">
              <span className="text-4xl font-black bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent block drop-shadow-[0_0_15px_rgba(244,63,94,0.5)]">{rejected}</span>
              <p className={`text-xs mt-2 font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-rose-400' : 'text-rose-600'}`}>
                <TranslateText text="Rechazados" />
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Gráfico de Barras - Futurista */}
      <div className={`group rounded-3xl border p-7 transition-all duration-700 hover:scale-[1.03] relative overflow-hidden ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-slate-900/90 via-blue-900/10 to-slate-900/90 border-blue-500/30 shadow-2xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:border-blue-400/50' 
          : 'bg-gradient-to-br from-white via-blue-50/30 to-white border-blue-200 shadow-xl hover:shadow-2xl hover:shadow-blue-300/30'
      }`}>
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-3 rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${
              theme === 'dark' 
                ? 'bg-gradient-to-br from-blue-600/40 to-cyan-600/30 shadow-lg shadow-blue-500/30' 
                : 'bg-gradient-to-br from-blue-100 to-cyan-100 shadow-md shadow-blue-200/50'
            }`}>
              <BarChart3 className={`w-6 h-6 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`} />
            </div>
            <div>
              <h3 className={`font-bold text-xl ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                <TranslateText text="Por Día" />
              </h3>
              <p className={`text-xs font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                <TranslateText text="Últimos 7 días" />
              </p>
            </div>
          </div>
          <div className="h-[280px] relative">
            <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent rounded-xl opacity-50" />
            <Bar data={barChartData} options={barOptions} />
          </div>
        </div>
      </div>

      {/* Gráfico de Línea - Futurista */}
      <div className={`group rounded-3xl border p-7 transition-all duration-700 hover:scale-[1.03] relative overflow-hidden ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-slate-900/90 via-cyan-900/10 to-slate-900/90 border-cyan-500/30 shadow-2xl shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:border-cyan-400/50' 
          : 'bg-gradient-to-br from-white via-cyan-50/30 to-white border-cyan-200 shadow-xl hover:shadow-2xl hover:shadow-cyan-300/30'
      }`}>
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-3 rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${
              theme === 'dark' 
                ? 'bg-gradient-to-br from-cyan-600/40 to-blue-600/30 shadow-lg shadow-cyan-500/30' 
                : 'bg-gradient-to-br from-cyan-100 to-blue-100 shadow-md shadow-cyan-200/50'
            }`}>
              <TrendingUp className={`w-6 h-6 ${theme === 'dark' ? 'text-cyan-300' : 'text-cyan-700'}`} />
            </div>
            <div>
              <h3 className={`font-bold text-xl ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                <TranslateText text="Tendencia" />
              </h3>
              <p className={`text-xs font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                <TranslateText text="Actividad total por día" />
              </p>
            </div>
          </div>
          <div className="h-[280px] relative">
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 via-blue-500/5 to-transparent rounded-xl opacity-50" />
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}
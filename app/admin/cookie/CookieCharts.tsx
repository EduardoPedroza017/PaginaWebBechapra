"use client";

import { useMemo } from "react";
import { TranslateText } from "@/components/TranslateText";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Filler } from 'chart.js';
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

export default function CookieCharts({ data, theme = 'light' }: CookieChartsProps) {
  const accepted = data.filter(d => d.accepted).length;
  const rejected = data.filter(d => !d.accepted).length;

  // Datos para gráfico de dona
  const doughnutData = {
    labels: ['Aceptados', 'Rechazados'],
    datasets: [{
      data: [accepted, rejected],
      backgroundColor: [
        theme === 'dark' ? 'rgba(34, 197, 94, 0.8)' : 'rgba(34, 197, 94, 0.9)',
        theme === 'dark' ? 'rgba(239, 68, 68, 0.8)' : 'rgba(239, 68, 68, 0.9)',
      ],
      borderColor: [
        'rgba(34, 197, 94, 1)',
        'rgba(239, 68, 68, 1)',
      ],
      borderWidth: 2,
      hoverOffset: 8,
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
        backgroundColor: theme === 'dark' ? 'rgba(34, 197, 94, 0.7)' : 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 2,
        borderRadius: 6,
      },
      {
        label: 'Rechazados',
        data: Object.values(dailyData).map(d => d.rejected),
        backgroundColor: theme === 'dark' ? 'rgba(239, 68, 68, 0.7)' : 'rgba(239, 68, 68, 0.8)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 2,
        borderRadius: 6,
      }
    ]
  };

  // Datos acumulados para línea de tendencia
  const lineData = {
    labels: Object.keys(dailyData).map(date => {
      const d = new Date(date);
      return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
    }),
    datasets: [{
      label: 'Total Diario',
      data: Object.values(dailyData).map(d => d.accepted + d.rejected),
      fill: true,
      backgroundColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)',
      borderColor: 'rgba(59, 130, 246, 1)',
      borderWidth: 3,
      tension: 0.4,
      pointBackgroundColor: 'rgba(59, 130, 246, 1)',
      pointBorderColor: theme === 'dark' ? '#1f2937' : '#fff',
      pointBorderWidth: 2,
      pointRadius: 5,
      pointHoverRadius: 7,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: theme === 'dark' ? '#9ca3af' : '#6b7280',
          font: { size: 12, weight: 500 as const },
          padding: 16,
          usePointStyle: true,
        }
      }
    }
  };

  const barOptions = {
    ...chartOptions,
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: theme === 'dark' ? '#9ca3af' : '#6b7280' }
      },
      y: {
        grid: { color: theme === 'dark' ? '#374151' : '#e5e7eb' },
        ticks: { color: theme === 'dark' ? '#9ca3af' : '#6b7280' }
      }
    }
  };

  const lineOptions = {
    ...chartOptions,
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: theme === 'dark' ? '#9ca3af' : '#6b7280' }
      },
      y: {
        grid: { color: theme === 'dark' ? '#374151' : '#e5e7eb' },
        ticks: { color: theme === 'dark' ? '#9ca3af' : '#6b7280' }
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      {/* Gráfico de Dona */}
      <div className={`rounded-2xl border p-5 ${
        theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200 shadow-sm'
      }`}>
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded-xl ${theme === 'dark' ? 'bg-purple-600/20' : 'bg-purple-100'}`}>
            <PieChart className={`w-5 h-5 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
          </div>
          <div>
            <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              <TranslateText text="Distribución" />
            </h3>
            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              <TranslateText text="Porcentaje de consentimientos" />
            </p>
          </div>
        </div>
        <div className="h-[220px] flex items-center justify-center">
          <Doughnut data={doughnutData} options={{
            ...chartOptions,
            cutout: '65%',
          }} />
        </div>
        <div className="flex justify-center gap-6 mt-4">
          <div className="text-center">
            <span className={`text-2xl font-bold text-green-500`}>{accepted}</span>
            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              <TranslateText text="Aceptados" />
            </p>
          </div>
          <div className="text-center">
            <span className={`text-2xl font-bold text-red-500`}>{rejected}</span>
            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              <TranslateText text="Rechazados" />
            </p>
          </div>
        </div>
      </div>

      {/* Gráfico de Barras */}
      <div className={`rounded-2xl border p-5 ${
        theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200 shadow-sm'
      }`}>
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded-xl ${theme === 'dark' ? 'bg-blue-600/20' : 'bg-blue-100'}`}>
            <BarChart3 className={`w-5 h-5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
          </div>
          <div>
            <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              <TranslateText text="Por Día" />
            </h3>
            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              <TranslateText text="Últimos 7 días" />
            </p>
          </div>
        </div>
        <div className="h-[280px]">
          <Bar data={barChartData} options={barOptions} />
        </div>
      </div>

      {/* Gráfico de Línea */}
      <div className={`rounded-2xl border p-5 ${
        theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200 shadow-sm'
      }`}>
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded-xl ${theme === 'dark' ? 'bg-cyan-600/20' : 'bg-cyan-100'}`}>
            <TrendingUp className={`w-5 h-5 ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`} />
          </div>
          <div>
            <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              <TranslateText text="Tendencia" />
            </h3>
            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              <TranslateText text="Actividad total por día" />
            </p>
          </div>
        </div>
        <div className="h-[280px]">
          <Line data={lineData} options={lineOptions} />
        </div>
      </div>
    </div>
  );
}

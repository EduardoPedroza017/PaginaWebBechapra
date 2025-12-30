"use client";

import { Bar, Doughnut, Line } from "react-chartjs-2";
import { TranslateText } from "@/components/TranslateText";
import { 
  TrendingUp, 
  PieChart, 
  BarChart3, 
  Activity,
  Target,
  AlertCircle
} from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Chart, TooltipItem } from 'chart.js';

// Registrar componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface CollectionStats {
  name: string;
  count: number;
  size: number;
  storageSize: number;
  avgObjSize: number;
  totalIndexSize: number;
}

interface DBChartsProps {
  theme: "light" | "dark";
  collections: CollectionStats[];
  chartColors: string[];
  totalSize: number;
  totalDocs: number;
}

export function DBCharts({ theme, collections, chartColors, totalSize, totalDocs }: DBChartsProps) {
  // Calcular métricas para visualizaciones avanzadas
  const sortedByCount = [...collections].sort((a, b) => b.count - a.count).slice(0, 8);
  const sortedBySize = [...collections].sort((a, b) => b.size - a.size).slice(0, 8);
  
  // Datos para tendencia (simulado)
  const trendData = Array.from({ length: 12 }, (_, i) => 
    Math.floor(Math.random() * 1000) + 5000
  );

  // Configuración común de gráficos
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
        duration: 1000,
        easing: "easeInOutQuart" as const // Explicitly cast to a valid type
    },
    plugins: {
        legend: {
            position: "bottom" as const, // Explicitly cast to a valid type
            labels: {
                color: "#000",
                font: {
                    size: 12
                },
                padding: 10,
                usePointStyle: true,
                pointStyle: "circle"
            }
        },
        tooltip: {
            callbacks: {
                label: (tooltipItem: TooltipItem<"bar"> | TooltipItem<"line">) => {
                    const label = tooltipItem.label || "";
                    const value = tooltipItem.raw as number || 0;
                    return `${label}: ${value}`;
                }
            },
            backgroundColor: "#fff",
            titleColor: "#000",
            bodyColor: "#000",
            borderColor: "#ccc",
            borderWidth: 1,
            cornerRadius: 4,
            padding: 8,
            displayColors: false
        }
    },
    scales: {
        x: {
            grid: {
                display: false
            }
        },
        y: {
            grid: {
                color: "#eee"
            }
        }
    }
  };

  const barChartData = {
    labels: sortedByCount.map(c => {
      const name = c.name.length > 12 ? c.name.substring(0, 10) + '...' : c.name;
      return name;
    }),
    datasets: [
      {
        label: 'Documentos',
        data: sortedByCount.map(c => c.count),
        backgroundColor: sortedByCount.map((_, i) => {
          const color = chartColors[i % chartColors.length];
          return theme === 'dark' 
            ? color.replace('0.8', '0.7')
            : color.replace('0.8', '0.8');
        }),
        borderColor: sortedByCount.map((_, i) => 
          chartColors[i % chartColors.length].replace('0.8', '1')
        ),
        borderWidth: 1,
        borderRadius: 6,
        hoverBackgroundColor: sortedByCount.map((_, i) => 
          chartColors[i % chartColors.length].replace('0.8', '0.9')
        ),
        maxBarThickness: 40
      }
    ]
  };

  const doughnutData = {
    labels: sortedBySize.map(c => c.name),
    datasets: [
      {
        data: sortedBySize.map(c => c.size),
        backgroundColor: sortedBySize.map((_, i) => chartColors[i % chartColors.length]),
        borderColor: theme === 'dark' ? '#111827' : '#fff',
        borderWidth: 2,
        hoverOffset: 12,
        spacing: 2
      }
    ]
  };

  const lineChartData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    datasets: [
      {
        label: 'Crecimiento Documentos',
        data: trendData,
        borderColor: chartColors[0].replace('0.8', '1'),
        backgroundColor: chartColors[0].replace('0.8', '0.1'),
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: chartColors[0].replace('0.8', '1'),
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Encabezado de métricas principales */}
      <div className={`rounded-2xl p-6 ${theme === 'dark' 
        ? 'bg-linear-to-r from-gray-900/80 to-gray-800/80 border-gray-800' 
        : 'bg-linear-to-r from-blue-50/80 to-indigo-50/80 border-blue-100'
      } border`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl ${theme === 'dark' 
              ? 'bg-linear-to-br from-blue-600/20 to-purple-600/20' 
              : 'bg-linear-to-br from-blue-100 to-purple-100'
            }`}>
              <Activity className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} size={20} />
            </div>
            <div>
              <h2 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <TranslateText text="Dashboard de Performance" />
              </h2>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Métricas en tiempo real de MongoDB
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {totalDocs.toLocaleString()}
              </div>
              <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                Total Documentos
              </div>
            </div>
            <div className="h-10 w-px bg-gray-700/30 dark:bg-gray-600/30" />
            <div className="text-right">
              <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {(totalSize / 1024 / 1024).toFixed(2)} MB
              </div>
              <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                Tamaño Total
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid de gráficos principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de barras - Documentos */}
        <div className={`rounded-2xl overflow-hidden ${theme === 'dark' 
          ? 'bg-linear-to-br from-gray-900/80 to-gray-800/80 border-gray-800' 
          : 'bg-linear-to-br from-white to-blue-50/50 border-blue-100'
        } border shadow-lg`}>
          <div className="p-6 border-b border-gray-800/50 dark:border-gray-700/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${theme === 'dark' 
                  ? 'bg-blue-600/20 text-blue-400' 
                  : 'bg-blue-100 text-blue-600'
                }`}>
                  <BarChart3 size={18} />
                </div>
                <div>
                  <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    <TranslateText text="Documentos por Colección" />
                  </h3>
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    Top 8 colecciones por volumen
                  </p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${theme === 'dark' 
                ? 'bg-gray-800 text-gray-300' 
                : 'bg-blue-100 text-blue-700'
              }`}>
                {sortedByCount.length} colecciones
              </div>
            </div>
          </div>
          
          <div className="p-6">
            {sortedByCount.length > 0 ? (
              <div className="h-64">
                <Bar data={barChartData} options={chartOptions} />
              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center">
                <div className={`w-16 h-16 rounded-full mb-4 flex items-center justify-center ${theme === 'dark' 
                  ? 'bg-gray-800' 
                  : 'bg-blue-50'
                }`}>
                  <AlertCircle className={theme === 'dark' ? 'text-gray-600' : 'text-blue-400'} size={24} />
                </div>
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  <TranslateText text="No hay datos disponibles" />
                </p>
              </div>
            )}
          </div>
          
          <div className={`px-6 py-4 border-t ${theme === 'dark' 
            ? 'border-gray-800/50 bg-gray-900/30' 
            : 'border-blue-100/50 bg-blue-50/30'
          }`}>
            <div className="flex items-center justify-between text-xs">
              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                Ordenado por volumen descendente
              </span>
              <span className={`px-2 py-1 rounded ${theme === 'dark' 
                ? 'bg-gray-800 text-gray-300' 
                : 'bg-gray-100 text-gray-600'
              }`}>
                Actualizado en tiempo real
              </span>
            </div>
          </div>
        </div>

        {/* Gráfico donut - Distribución */}
        <div className={`rounded-2xl overflow-hidden ${theme === 'dark' 
          ? 'bg-linear-to-br from-gray-900/80 to-gray-800/80 border-gray-800' 
          : 'bg-linear-to-br from-white to-blue-50/50 border-blue-100'
        } border shadow-lg`}>
          <div className="p-6 border-b border-gray-800/50 dark:border-gray-700/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${theme === 'dark' 
                  ? 'bg-purple-600/20 text-purple-400' 
                  : 'bg-purple-100 text-purple-600'
                }`}>
                  <PieChart size={18} />
                </div>
                <div>
                  <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    <TranslateText text="Distribución de Almacenamiento" />
                  </h3>
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    Por tamaño de colección
                  </p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${theme === 'dark' 
                ? 'bg-gray-800 text-gray-300' 
                : 'bg-purple-100 text-purple-700'
              }`}>
                {(totalSize / 1024 / 1024).toFixed(1)} MB total
              </div>
            </div>
          </div>
          
          <div className="p-6">
            {sortedBySize.length > 0 ? (
              <div className="h-64">
                <Doughnut 
                  data={doughnutData} 
                  options={{
                    ...chartOptions,
                    cutout: '65%',
                    plugins: {
                      ...chartOptions.plugins,
                      tooltip: {
                        ...chartOptions.plugins.tooltip,
                        callbacks: {
                          label: (context: any) => {
                            const value = context.raw;
                            const total = sortedBySize.reduce((acc, c) => acc + c.size, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${context.label}: ${(value / 1024 / 1024).toFixed(2)} MB (${percentage}%)`;
                          }
                        }
                      }
                    }
                  }} 
                />
              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center">
                <div className={`w-16 h-16 rounded-full mb-4 flex items-center justify-center ${theme === 'dark' 
                  ? 'bg-gray-800' 
                  : 'bg-purple-50'
                }`}>
                  <PieChart className={theme === 'dark' ? 'text-gray-600' : 'text-purple-400'} size={24} />
                </div>
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  <TranslateText text="No hay datos de tamaño" />
                </p>
              </div>
            )}
          </div>
          
          <div className={`px-6 py-4 border-t ${theme === 'dark' 
            ? 'border-gray-800/50 bg-gray-900/30' 
            : 'border-purple-100/50 bg-purple-50/30'
          }`}>
            <div className="flex items-center justify-between text-xs">
              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                Click en leyenda para filtrar
              </span>
              <span className={`px-2 py-1 rounded ${theme === 'dark' 
                ? 'bg-gray-800 text-gray-300' 
                : 'bg-gray-100 text-gray-600'
              }`}>
                Interactivo
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Gráfico de tendencia */}
      <div className={`rounded-2xl overflow-hidden ${theme === 'dark' 
        ? 'bg-linear-to-br from-gray-900/80 to-gray-800/80 border-gray-800' 
        : 'bg-linear-to-br from-white to-blue-50/50 border-blue-100'
      } border shadow-lg`}>
        <div className="p-6 border-b border-gray-800/50 dark:border-gray-700/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${theme === 'dark' 
                ? 'bg-green-600/20 text-green-400' 
                : 'bg-green-100 text-green-600'
              }`}>
                <TrendingUp size={18} />
              </div>
              <div>
                <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  <TranslateText text="Tendencia de Crecimiento" />
                </h3>
                <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  Evolución mensual de documentos
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${theme === 'dark' 
                ? 'bg-green-600/20 text-green-400' 
                : 'bg-green-100 text-green-700'
              }`}>
                <Target size={12} />
                <span>+12.5% vs último mes</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="h-64">
            <Line 
              data={lineChartData} 
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  legend: {
                    display: false
                  }
                }
              }} 
            />
          </div>
        </div>
        
        <div className={`px-6 py-4 border-t ${theme === 'dark' 
          ? 'border-gray-800/50 bg-gray-900/30' 
          : 'border-green-100/50 bg-green-50/30'
        }`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div>
              <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                Último mes
              </div>
              <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {trendData[11]?.toLocaleString()}
              </div>
            </div>
            <div>
              <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                Cambio mensual
              </div>
              <div className="font-medium text-green-500">
                +12.5%
              </div>
            </div>
            <div>
              <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                Pico histórico
              </div>
              <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {Math.max(...trendData).toLocaleString()}
              </div>
            </div>
            <div>
              <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                Previsión próx. mes
              </div>
              <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {Math.round(trendData[11] * 1.125).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
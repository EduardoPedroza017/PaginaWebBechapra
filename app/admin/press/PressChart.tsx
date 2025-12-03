"use client";

import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { BarChart3 } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";
import { PressItem } from "./page";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface PressChartProps {
  data: PressItem[];
  theme: 'light' | 'dark';
}

const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

export default function PressChart({ data, theme }: PressChartProps) {
  const chartData = useMemo(() => {
    // Agrupar por mes (últimos 6 meses)
    const counts: Record<string, number> = {};
    const now = new Date();
    
    // Inicializar últimos 6 meses con 0
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      counts[key] = 0;
    }
    
    data.forEach((item) => {
      const d = new Date(item.date);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      if (counts.hasOwnProperty(key)) {
        counts[key]++;
      }
    });
    
    const sortedKeys = Object.keys(counts).sort();
    const labels = sortedKeys.map(key => {
      const [year, month] = key.split('-');
      return `${monthNames[parseInt(month) - 1]} ${year.slice(2)}`;
    });
    
    return {
      labels,
      datasets: [
        {
          label: "Comunicados",
          data: sortedKeys.map(k => counts[k]),
          backgroundColor: theme === 'dark' 
            ? 'rgba(16, 185, 129, 0.6)' 
            : 'rgba(5, 150, 105, 0.7)',
          borderColor: theme === 'dark' 
            ? 'rgba(16, 185, 129, 1)' 
            : 'rgba(5, 150, 105, 1)',
          borderWidth: 2,
          borderRadius: 8,
          borderSkipped: false,
        },
      ],
    };
  }, [data, theme]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        display: false 
      },
      tooltip: {
        backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
        titleColor: theme === 'dark' ? '#f3f4f6' : '#111827',
        bodyColor: theme === 'dark' ? '#d1d5db' : '#4b5563',
        borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          title: (items: { label?: string }[]) => items[0]?.label ?? '',
          label: (item: { raw?: number }) => `${item.raw ?? 0} comunicados`,
        },
      },
    },
    scales: {
      x: {
        grid: { 
          display: false 
        },
        ticks: { 
          color: theme === 'dark' ? '#9ca3af' : '#6b7280',
          font: { size: 11 }
        },
        border: { display: false }
      },
      y: {
        grid: { 
          color: theme === 'dark' ? '#374151' : '#f3f4f6',
        },
        ticks: { 
          color: theme === 'dark' ? '#9ca3af' : '#6b7280',
          stepSize: 1,
          font: { size: 11 }
        },
        border: { display: false },
        beginAtZero: true
      },
    },
  };

  return (
    <div className={`rounded-2xl border p-5 ${
      theme === 'dark' ? 'bg-gray-900/80 border-gray-800' : 'bg-white border-gray-100 shadow-sm'
    }`}>
      <div className="flex items-center gap-3 mb-5">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
          theme === 'dark' ? 'bg-emerald-600/20' : 'bg-emerald-100'
        }`}>
          <BarChart3 className={`w-5 h-5 ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`} />
        </div>
        <div>
          <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            <TranslateText text="Comunicados por Mes" />
          </h3>
          <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            <TranslateText text="Últimos 6 meses" />
          </p>
        </div>
      </div>
      <div className="h-52">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}

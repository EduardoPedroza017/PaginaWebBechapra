"use client";

import { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";
import { TranslateText } from "@/components/TranslateText";
import { BarChart3 } from "lucide-react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface ContactMessage {
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

interface Props {
  data: ContactMessage[];
  theme: 'light' | 'dark';
}

export default function ContactChart({ data, theme }: Props) {
  const grouped = useMemo(() => {
    const map: { [date: string]: number } = {};
    data.forEach(msg => {
      const d = new Date(msg.timestamp).toISOString().slice(0, 10);
      map[d] = (map[d] || 0) + 1;
    });
    return map;
  }, [data]);

  const labels = Object.keys(grouped).sort().slice(-10); // Últimos 10 días
  const values = labels.map(l => grouped[l]);

  const chartData = {
    labels: labels.map(l => l.slice(5)), // MM-DD
    datasets: [
      {
        label: "Mensajes",
        data: values,
        backgroundColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.8)' : 'rgba(59, 130, 246, 0.7)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
        borderRadius: 8,
        borderSkipped: false,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: theme === 'dark' ? '#1f2937' : '#fff',
        titleColor: theme === 'dark' ? '#fff' : '#111827',
        bodyColor: theme === 'dark' ? '#9ca3af' : '#4b5563',
        borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: theme === 'dark' ? '#9ca3af' : '#6b7280' }
      },
      y: {
        beginAtZero: true,
        grid: { color: theme === 'dark' ? '#374151' : '#f3f4f6' },
        ticks: { 
          color: theme === 'dark' ? '#9ca3af' : '#6b7280',
          stepSize: 1
        }
      }
    }
  };

  return (
    <div className={`rounded-2xl p-5 border ${
      theme === 'dark' ? 'bg-gray-900/80 border-gray-800' : 'bg-white border-gray-100 shadow-sm'
    }`}>
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className={`w-5 h-5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
        <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          <TranslateText text="Mensajes por día" />
        </h3>
      </div>
      
      {labels.length === 0 ? (
        <div className="flex items-center justify-center h-48">
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
            <TranslateText text="Sin datos para graficar" />
          </p>
        </div>
      ) : (
        <div className="h-48">
          <Bar data={chartData} options={options} />
        </div>
      )}
    </div>
  );
}

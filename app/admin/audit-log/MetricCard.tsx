"use client";

import { TranslateText } from "@/components/TranslateText";

type ColorType = 'blue' | 'green' | 'red' | 'purple' | 'amber' | 'orange' | 'gray';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode | string;
  color: ColorType;
  theme: 'light' | 'dark';
}

const colorStyles: Record<ColorType, { text: string; bg: string }> = {
  blue: { text: 'text-blue-500', bg: 'bg-blue-500/10' },
  green: { text: 'text-green-500', bg: 'bg-green-500/10' },
  red: { text: 'text-red-500', bg: 'bg-red-500/10' },
  purple: { text: 'text-purple-500', bg: 'bg-purple-500/10' },
  amber: { text: 'text-amber-500', bg: 'bg-amber-500/10' },
  orange: { text: 'text-orange-500', bg: 'bg-orange-500/10' },
  gray: { text: 'text-gray-500', bg: 'bg-gray-500/10' },
};

export function MetricCard({ title, value, icon, color, theme }: MetricCardProps) {
  const { text: textColor, bg: bgColor } = colorStyles[color] || colorStyles.blue;
  
  return (
    <div className={`rounded-2xl shadow-sm p-5 border transition-all duration-200 hover:shadow-md ${
      theme === 'dark' 
        ? 'bg-gray-900/50 border-gray-800' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-xs font-medium uppercase tracking-wider mb-1 ${
            theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
          }`}>
            <TranslateText text={title} />
          </p>
          <p className={`text-2xl font-semibold ${textColor}`}>
            {value}
          </p>
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${bgColor}`}>
          {typeof icon === 'string' ? icon : icon}
        </div>
      </div>
    </div>
  );
}

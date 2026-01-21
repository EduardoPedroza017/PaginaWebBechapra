"use client";

import React from 'react';
import clsx from 'clsx';

type Props = {
  title: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
};

export default function MetricCard({ title, value, icon, className = '' }: Props) {
  return (
    <div className={clsx('card p-4 flex items-center gap-4', className)}>
      {icon && <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-400 text-white">{icon}</div>}
      <div className="flex-1">
        <div className="text-sm text-slate-500 dark:text-slate-300">{title}</div>
        <div className="text-2xl font-bold mt-1">{value}</div>
      </div>
    </div>
  );
}

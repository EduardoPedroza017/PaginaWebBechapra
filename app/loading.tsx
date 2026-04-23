import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="absolute inset-0 bg-linear-to-br from-transparent via-blue-50/30 to-transparent dark:via-slate-950/20 pointer-events-none" />

      <div className="relative flex flex-col items-center gap-4">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600 dark:border-slate-700 dark:border-t-blue-500" />
        <p className="text-sm font-semibold tracking-wide text-slate-600 dark:text-slate-400">Cargando...</p>
      </div>
    </div>
  );
};

export default Loading;

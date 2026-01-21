"use client";

import React from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-1 p-6 overflow-y-auto">
      <div className="max-w-[1400px] mx-auto w-full">
        {children}
      </div>
    </main>
  );
}

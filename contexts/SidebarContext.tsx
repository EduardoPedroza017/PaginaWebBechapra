"use client";

import React, { createContext, useContext, useState } from 'react';

type SidebarContextType = {
  isExpanded: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(() => {
    try {
      const storedState = localStorage.getItem('sidebar-expanded');
      return storedState ? JSON.parse(storedState) : true;
    } catch {
      return true;
    }
  });

  const toggleSidebar = () => {
    setIsExpanded((prev) => {
      const newState = !prev;
      try {
        localStorage.setItem('sidebar-expanded', JSON.stringify(newState));
      } catch {}
      return newState;
    });
  };

  return (
    <SidebarContext.Provider value={{ isExpanded, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};
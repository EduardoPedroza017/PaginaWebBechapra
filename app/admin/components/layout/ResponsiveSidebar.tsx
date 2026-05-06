"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import NextImage from 'next/image';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { sidebarItems, SidebarItem } from './Sidebar';
import { TranslateText } from '@/components/TranslateText';
import { useSidebar } from '@/contexts/SidebarContext';

interface ResponsiveSidebarProps {
  expanded: boolean;
  onToggle?: () => void;
}

export default function ResponsiveSidebar({
  expanded,
  onToggle,
}: ResponsiveSidebarProps) {
  const pathname = usePathname() || '/admin/dashboard';
  const { toggleSidebar } = useSidebar();
  const sectionMap: Record<string, string> = {
    Principal: 'Principal',
    Contenido: 'Contenido',
    Multimedia: 'Contenido',
    Usuarios: 'Gestion',
    Comunicación: 'Gestion',
    Sistema: 'Sistema',
  };
  const sectionTitles: Record<string, string> = {
    Principal: 'Principal',
    Contenido: 'Contenido',
    Gestion: 'Gestion',
    Sistema: 'Sistema',
  };

  // Handle toggle - use provided onToggle or fall back to context toggle
  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      toggleSidebar();
    }
  };

  // Group sidebar items by section
  const groupedItems = sidebarItems.reduce((acc: Record<string, SidebarItem[]>, item) => {
    const rawSection = item.section || 'General';
    const section = sectionMap[rawSection] || rawSection;
    acc[section] = acc[section] || [];
    acc[section].push(item);
    return acc;
  }, {} as Record<string, SidebarItem[]>);

  const order = ['Principal', 'Contenido', 'Gestion', 'Sistema'];
  const activeSection =
    order.find((section) =>
      (groupedItems[section] || []).some(
        (item) => pathname === item.path || pathname.startsWith(item.path + '/')
      )
    ) || 'Principal';
  const [openSection, setOpenSection] = useState(activeSection);

  useEffect(() => {
    setOpenSection(activeSection);
  }, [activeSection]);

  return (
    <aside
      className={clsx(
        'admin-sidebar flex h-full min-h-screen flex-col border-r border-slate-200/80 bg-white/95 text-slate-900 shadow-xl shadow-slate-200/60 transition-[width] duration-300 dark:border-slate-800/80 dark:bg-slate-950/95 dark:text-slate-100 dark:shadow-slate-950/30',
        expanded ? 'w-64' : 'w-24'
      )}
    >
      {/* Sidebar Header */}
      <div className="sidebar-header flex min-h-[84px] items-center justify-between gap-3 border-b border-slate-200/80 px-4 py-5 dark:border-slate-800/80">
        <div className="flex items-center gap-4">
          <div className={`relative ${expanded ? 'w-36 h-10' : 'w-10 h-10'} rounded-lg overflow-hidden shrink-0 transition-all duration-300`}>
            <NextImage
              src={expanded ? '/web/image/logo/bausen-logo.png' : '/web/image/logo/Favicon_Bausen_01.png'}
              alt={expanded ? 'Logo BAUSEN' : 'Bausen mark'}
              fill
              sizes="40px"
              className="object-contain p-2"
              priority
            />
          </div>
          {expanded && (
            <div className="min-w-0">
              <div className="text-sm font-semibold text-slate-900 dark:text-white">Bausen Admin</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Control operativo</div>
            </div>
          )}
        </div>
        <button
          onClick={handleToggle}
          aria-label={expanded ? "Contraer sidebar" : "Expandir sidebar"}
          className="flex min-h-10 min-w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white/80 p-2 text-slate-600 shadow-sm transition-all duration-200 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className={clsx(
              "transition-transform duration-300",
              !expanded && "rotate-180"
            )}
          >
            <path 
              d="M9 18l6-6-6-6" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav flex-1 overflow-y-auto px-3 py-4">
        <ul className={expanded ? '' : 'px-2 py-3 space-y-3'}>
          {order.map((section) => {
            const items = groupedItems[section];
            if (!items) return null;
            const sectionIsActive = activeSection === section;
            const isOpen = !expanded || openSection === section;
            
            return (
              <li key={section}>
                {expanded && (
                  <button
                    type="button"
                    onClick={() => setOpenSection(section)}
                    className={clsx(
                      "mb-2 mt-4 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left first:mt-0",
                      sectionIsActive
                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300'
                        : 'text-slate-500 hover:bg-slate-100/80 dark:text-slate-400 dark:hover:bg-slate-900'
                    )}
                  >
                    <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
                    <div className="text-[10px] font-semibold uppercase tracking-[0.22em]">
                      {sectionTitles[section] || section}
                    </div>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={clsx('shrink-0 transition-transform duration-200', isOpen && 'rotate-180')}
                    >
                      <path
                        d="M6 9l6 6 6-6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                )}
                <div className={clsx(expanded ? 'space-y-1' : 'space-y-2', !isOpen && 'hidden')}>
                  {items.map((item) => {
                    const isActive = pathname === item.path || pathname.startsWith(item.path + '/');
                    return (
                      <div key={item.path} className="relative">
                        {/* Active indicator for collapsed state */}
                        {!expanded && (
                          <span 
                            className={clsx(
                              "absolute left-0 top-0 bottom-0 w-1 rounded-r-lg transition-colors",
                              isActive ? 'bg-blue-600' : 'bg-transparent'
                            )} 
                          />
                        )}
                        <Link
                          key={item.path}
                          href={item.path}
                          className={clsx(
                            'flex items-center justify-center rounded-2xl transition-all duration-200',
                            expanded ? 'gap-3 px-3.5 py-2.5' : 'py-3',
                            isActive 
                              ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/25' 
                              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/80 hover:text-slate-900 dark:hover:bg-slate-900 dark:hover:text-white'
                          )}
                          title={!expanded ? item.label : undefined}
                        >
                          <span 
                            className={clsx(
                              "flex-shrink-0 transition-colors",
                              isActive ? 'text-white' : ''
                            )}
                            style={!expanded ? { padding: '0.25rem' } : {}}
                          >
                            {item.icon}
                          </span>
                          {expanded && (
                            <div className="flex flex-col min-w-0 flex-1">
                              <span className="text-sm font-medium truncate">
                                <TranslateText text={item.label} />
                              </span>
                              {isActive && item.description && (
                                <span className={clsx(
                                  "mt-0.5 text-[11px] truncate transition-colors",
                                  isActive ? 'text-blue-100' : 'text-slate-500 dark:text-slate-500'
                                )}>
                                  {item.description}
                                </span>
                              )}
                            </div>
                          )}
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer / User info */}
      <div className="mt-auto border-t border-slate-200/80 px-4 py-4 dark:border-slate-800/80">
        {!expanded ? (
          <div className="flex justify-center">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-blue-600 dark:text-blue-400">A</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 px-3 py-3 dark:border-slate-800 dark:bg-slate-900/70">
            <div className="w-9 h-9 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center shrink-0">
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">A</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                Administrador
              </p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                Panel central
              </p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}


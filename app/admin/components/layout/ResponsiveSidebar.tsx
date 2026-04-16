"use client";

import React from 'react';
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
    const section = item.section || 'General';
    acc[section] = acc[section] || [];
    acc[section].push(item);
    return acc;
  }, {} as Record<string, SidebarItem[]>);

  const order = ['Principal', 'Contenido', 'Usuarios', 'Multimedia', 'Comunicación', 'Sistema'];

  return (
    <aside className={`admin-sidebar ${expanded ? 'expanded' : 'collapsed'}`}>
      {/* Sidebar Header */}
      <div className="sidebar-header">
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
        </div>
        <button
          onClick={handleToggle}
          aria-label={expanded ? "Contraer sidebar" : "Expandir sidebar"}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 min-w-10 min-h-10 flex items-center justify-center transition-all duration-200"
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
      <nav className="sidebar-nav">
        <ul className={expanded ? '' : 'px-2 py-3 space-y-3'}>
          {order.map((section) => {
            const items = groupedItems[section];
            if (!items) return null;
            
            return (
              <li key={section}>
                {expanded && (
                  <div className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-4 first:mt-0">
                    {section}
                  </div>
                )}
                <div>
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
                            'flex items-center justify-center transition-all duration-200',
                            !expanded && 'mb-2',
                            expanded ? 'gap-3 px-4 py-2.5' : 'py-2.5',
                            isActive 
                              ? 'bg-blue-600 text-white shadow-sm' 
                              : 'text-slate-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-gray-800'
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
                              {item.description && (
                                <span className={clsx(
                                  "text-xs truncate transition-colors",
                                  isActive ? 'text-blue-100' : 'text-gray-500 dark:text-gray-500'
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
      <div className="mt-auto px-4 py-4 border-t border-gray-200 dark:border-gray-700">
        {!expanded ? (
          <div className="flex justify-center">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-blue-600 dark:text-blue-400">A</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center shrink-0">
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">A</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                Administrador
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                admin@bausen.com
              </p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}


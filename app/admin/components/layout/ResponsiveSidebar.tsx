"use client";

import React from 'react';
import Link from 'next/link';
import NextImage from 'next/image';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { sidebarItems, SidebarItem } from './Sidebar';
import { TranslateText } from '@/components/TranslateText';
export default function ResponsiveSidebar({
  expanded,
  onToggle,
}: {
  expanded: boolean;
  onToggle: () => void;
}) {
  const pathname = usePathname() || '/admin/dashboard';
  return (
    <aside className={`admin-sidebar ${expanded ? 'expanded' : 'collapsed'}`}>
      <div className="sidebar-header">
        <div className="flex items-center gap-4">
          <div className={`relative ${expanded ? 'w-36 h-10' : 'w-10 h-10'} rounded-lg overflow-hidden flex-shrink-0`}>
            <NextImage
              src={expanded ? '/image/logo/bausen-logo.png' : '/image/logo/Favicon_Bausen_01.png'}
              alt={expanded ? 'Logo BAUSEN' : 'Bausen mark'}
              fill
              sizes="40px"
              className="object-contain p-2"
              priority
            />
          </div>
        </div>
        <button onClick={onToggle} aria-label="Toggle sidebar" className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"> 
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {(() => {
            const pathname = usePathname() || '/admin/dashboard';
            const grouped = sidebarItems.reduce((acc: Record<string, SidebarItem[]>, item) => {
              const section = item.section || 'General';
              acc[section] = acc[section] || [];
              acc[section].push(item);
              return acc;
            }, {} as Record<string, SidebarItem[]>);

            const order = ['Principal','Contenido','Usuarios','Multimedia','Comunicación','Sistema'];

            return order.map((section) => {
              const items = grouped[section];
              if (!items) return null;
              return (
                <li key={section}>
                  {expanded && <div className="px-3 text-xs text-gray-500 mb-2">{section}</div>}
                  <div>
                    {items.map((item) => {
                      const isActive = pathname === item.path || pathname.startsWith(item.path + '/');
                      return (
                        <div key={item.path} className="relative">
                          {!expanded && <span className={`absolute left-0 top-0 bottom-0 w-1 rounded-r-lg ${isActive ? 'bg-blue-600' : ''}`} />}
                          <Link key={item.path} href={item.path} className={clsx('flex items-center gap-4 px-4 py-3 rounded-md transition-colors', isActive ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800') } title={!expanded ? item.label : undefined}>
                            <span className="flex-shrink-0">{item.icon}</span>
                            {expanded && <div className="flex flex-col min-w-0">
                              <span className="text-sm font-medium truncate"><TranslateText text={item.label} /></span>
                              {item.description && <span className="text-xs text-gray-500 truncate">{item.description}</span>}
                            </div>}
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </li>
              );
            });
          })()}
        </ul>
      </nav>

      <div className="px-4 py-5">
        {/* Logout is provided in the header to avoid duplicate controls; keep this area for future utilities */}
      </div>
    </aside>
  );
}

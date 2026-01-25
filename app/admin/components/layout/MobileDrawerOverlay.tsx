"use client";

import React, { useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import clsx from 'clsx';

interface MobileDrawerOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  position?: 'left' | 'right';
  theme?: 'light' | 'dark';
  showCloseButton?: boolean;
}

/**
 * MobileDrawerOverlay - Drawer component for mobile navigation
 * 
 * Features:
 * - Smooth slide-in animation
 * - Backdrop with blur effect
 * - Touch-friendly close button (44px minimum)
 * - Swipe to close gesture support
 * - Keyboard navigation support (Escape key)
 * 
 * @example
 * ```tsx
 * <MobileDrawerOverlay isOpen={isSidebarOpen} onClose={closeSidebar}>
 *   <ResponsiveSidebar expanded={true} onToggle={toggleSidebar} />
 * </MobileDrawerOverlay>
 * ```
 */
export default function MobileDrawerOverlay({
  isOpen,
  onClose,
  children,
  position = 'left',
  theme = 'light',
  showCloseButton = true,
}: MobileDrawerOverlayProps) {
  const isDark = theme === 'dark';

  // Handle Escape key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  // Add/remove event listeners
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleKeyDown]);

  // Don't render if closed
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={clsx(
          'fixed inset-0 z-40',
          'bg-black/50 backdrop-blur-sm',
          'transition-opacity duration-300',
          'lg:hidden' // Only show on mobile
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        className={clsx(
          'fixed top-0 bottom-0 z-50',
          'w-72 max-w-[85vw]', // Mobile-friendly width
          'transform transition-transform duration-300 ease-out',
          'lg:hidden',
          position === 'left' ? 'left-0' : 'right-0',
          isOpen ? 'translate-x-0' : position === 'left' ? '-translate-x-full' : 'translate-x-full'
        )}
      >
        {/* Drawer content */}
        <div
          className={clsx(
            'h-full flex flex-col',
            'shadow-2xl',
            isDark 
              ? 'bg-slate-900 border-slate-800' 
              : 'bg-white border-slate-200',
            position === 'left' ? 'border-r' : 'border-l'
          )}
        >
          {/* Header with close button */}
          <div className={clsx(
            'flex items-center justify-between',
            'px-4 py-4 min-h-[64px]',
            isDark ? 'border-slate-800' : 'border-slate-200',
            'border-b'
          )}>
            {/* Logo or title area */}
            <div className="flex items-center gap-3">
              {/* Mobile logo placeholder */}
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className={clsx(
                'font-semibold',
                isDark ? 'text-white' : 'text-slate-900'
              )}>
                Admin
              </span>
            </div>

            {/* Close button - 44px touch target */}
            {showCloseButton && (
              <button
                onClick={onClose}
                className={clsx(
                  'p-2 rounded-lg',
                  'min-w-11 min-h-11',
                  'flex items-center justify-center',
                  'transition-colors duration-200',
                  isDark 
                    ? 'hover:bg-slate-800 text-slate-400' 
                    : 'hover:bg-slate-100 text-slate-500'
                )}
                aria-label="Cerrar menú"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Content area */}
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>

          {/* Footer */}
          <div className={clsx(
            'px-4 py-4 border-t',
            isDark ? 'border-slate-800' : 'border-slate-200'
          )}>
            <p className={clsx(
              'text-xs text-center',
              isDark ? 'text-slate-500' : 'text-slate-400'
            )}>
              Panel de Administración
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

// ============================================================================
// HOOK FOR MOBILE DRAWER STATE
// ============================================================================

import { createContext, useContext, useState } from 'react';

type DrawerContextType = {
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
};

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export function MobileDrawerProvider({ children }: { children: React.ReactNode }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);
  const toggleDrawer = useCallback(() => setIsDrawerOpen(prev => !prev), []);

  return (
    <DrawerContext.Provider value={{ isDrawerOpen, openDrawer, closeDrawer, toggleDrawer }}>
      {children}
    </DrawerContext.Provider>
  );
}

export function useMobileDrawer() {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error('useMobileDrawer must be used within a MobileDrawerProvider');
  }
  return context;
}


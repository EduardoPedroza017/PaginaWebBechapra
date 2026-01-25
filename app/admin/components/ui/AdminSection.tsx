"use client";

import React from 'react';
import clsx from 'clsx';
import { getSectionClasses, getSectionPadding } from '../../design-system';

interface AdminSectionProps {
  children: React.ReactNode;
  theme?: 'light' | 'dark';
  className?: string;
  noPadding?: boolean;
  transparent?: boolean;
}

export default function AdminSection({
  children,
  theme = 'light',
  className = '',
  noPadding = false,
  transparent = false,
}: AdminSectionProps) {
  if (transparent) {
    return (
      <section className={clsx(className)}>
        {children}
      </section>
    );
  }

  return (
    <section
      className={clsx(
        'rounded-2xl border',
        getSectionClasses(theme),
        noPadding ? '' : getSectionPadding(),
        className
      )}
    >
      {children}
    </section>
  );
}

// ============================================================================
// Section Header
// ============================================================================

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  theme?: 'light' | 'dark';
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  action,
  theme = 'light',
  className = '',
}: SectionHeaderProps) {
  const isDark = theme === 'dark';

  return (
    <div
      className={clsx(
        'flex items-start justify-between mb-6 pb-4 border-b',
        isDark ? 'border-slate-700' : 'border-slate-200',
        className
      )}
    >
      <div className="flex-1 min-w-0">
        <h3
          className={clsx(
            'text-lg font-bold',
            isDark ? 'text-white' : 'text-slate-900'
          )}
        >
          {title}
        </h3>
        {subtitle && (
          <p
            className={clsx(
              'text-sm mt-1',
              isDark ? 'text-slate-400' : 'text-slate-600'
            )}
          >
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="ml-4 flex-shrink-0">{action}</div>}
    </div>
  );
}

// ============================================================================
// Section Body
// ============================================================================

interface SectionBodyProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionBody({ children, className = '' }: SectionBodyProps) {
  return <div className={className}>{children}</div>;
}

// ============================================================================
// Section Footer
// ============================================================================

interface SectionFooterProps {
  children: React.ReactNode;
  theme?: 'light' | 'dark';
  className?: string;
}

export function SectionFooter({
  children,
  theme = 'light',
  className = '',
}: SectionFooterProps) {
  const isDark = theme === 'dark';

  return (
    <div
      className={clsx(
        'mt-6 pt-4 border-t',
        isDark ? 'border-slate-700' : 'border-slate-200',
        className
      )}
    >
      {children}
    </div>
  );
}


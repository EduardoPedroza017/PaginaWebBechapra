"use client";

import React from 'react';
import clsx from 'clsx';

// ============================================================================
// SKELETON LOADER TYPES
// ============================================================================

export interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
  className?: string;
  theme?: 'light' | 'dark';
}

export interface SkeletonTextProps {
  lines?: number;
  width?: string | number;
  lastLineWidth?: string | number;
  className?: string;
  theme?: 'light' | 'dark';
}

export interface SkeletonCardProps {
  image?: boolean;
  title?: boolean;
  textLines?: number;
  avatar?: boolean;
  className?: string;
  theme?: 'light' | 'dark';
}

export interface SkeletonTableProps {
  columns: number;
  rows?: number;
  showHeader?: boolean;
  className?: string;
  theme?: 'light' | 'dark';
}

// ============================================================================
// BASE SKELETON COMPONENT
// ============================================================================

export function Skeleton({
  variant = 'text',
  width,
  height,
  animation = 'pulse',
  className = '',
  theme = 'light',
}: SkeletonProps) {

  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-none',
    rounded: 'rounded-lg',
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-pulse-subtle',
    none: '',
  };

  return (
    <div
      className={clsx(
        'bg-slate-200 dark:bg-slate-700',
        variantClasses[variant],
        animationClasses[animation],
        className
      )}
      style={{
        width: width,
        height: height || (variant === 'text' ? '1em' : undefined),
      }}
    />
  );
}

// ============================================================================
// SKELETON TEXT COMPONENT
// ============================================================================

export function SkeletonText({
  lines = 3,
  width = '100%',
  lastLineWidth = '60%',
  className = '',
  theme = 'light',
}: SkeletonTextProps) {
  return (
    <div className={clsx('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          variant="text"
          width={index === lines - 1 ? lastLineWidth : width}
          theme={theme}
          animation="pulse"
        />
      ))}
    </div>
  );
}

// ============================================================================
// SKELETON CARD COMPONENT
// ============================================================================

export function SkeletonCard({
  image = true,
  title = true,
  textLines = 2,
  avatar = false,
  className = '',
  theme = 'light',
}: SkeletonCardProps) {
  const isDark = theme === 'dark';
  return (
    <div
      className={clsx(
        'rounded-xl border p-4',
        isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200',
        className
      )}
    >
      {/* Image or Avatar */}
      {image && (
        <div className="mb-4">
          <Skeleton
            variant="rounded"
            width="100%"
            height="160px"
            theme={theme}
            animation="pulse"
          />
        </div>
      )}
      
      {avatar && (
        <div className="flex items-center gap-4 mb-4">
          <Skeleton
            variant="circular"
            width="48px"
            height="48px"
            theme={theme}
            animation="pulse"
          />
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" width="60%" theme={theme} />
            <Skeleton variant="text" width="40%" theme={theme} />
          </div>
        </div>
      )}

      {/* Title */}
      {title && (
        <Skeleton
          variant="text"
          width="70%"
          height="24px"
          theme={theme}
          animation="pulse"
          className="mb-3"
        />
      )}

      {/* Text lines */}
      <SkeletonText lines={textLines} theme={theme} />
    </div>
  );
}

// ============================================================================
// SKELETON TABLE COMPONENT
// ============================================================================

export function SkeletonTable({
  columns,
  rows = 5,
  showHeader = true,
  className = '',
  theme = 'light',
}: SkeletonTableProps) {
  return (
    <div className={clsx('rounded-xl border overflow-hidden', className,
      theme === 'dark' ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-white'
    )}>
      <div className="p-4 space-y-4">
        {/* Header */}
        {showHeader && (
          <div className="flex gap-4 pb-3 border-b border-dashed" 
            style={{ gap: '1rem' }}>
            {Array.from({ length: columns }).map((_, idx) => (
              <Skeleton
                key={`header-${idx}`}
                variant="text"
                width={`${100 / columns}%`}
                height="20px"
                theme={theme}
                animation="pulse"
              />
            ))}
          </div>
        )}

        {/* Rows */}
        {Array.from({ length: rows }).map((_, rowIdx) => (
          <div
            key={`row-${rowIdx}`}
            className="flex gap-4 py-3 border-b border-dashed last:border-0"
            style={{ gap: '1rem' }}
          >
            {Array.from({ length: columns }).map((_, colIdx) => (
              <Skeleton
                key={`cell-${rowIdx}-${colIdx}`}
                variant="text"
                width={`${100 / columns}%`}
                height="24px"
                theme={theme}
                animation="pulse"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// SKELETON LIST COMPONENT
// ============================================================================

export interface SkeletonListProps {
  items?: number;
  avatar?: boolean;
  className?: string;
  theme?: 'light' | 'dark';
}

export function SkeletonList({
  items = 5,
  avatar = true,
  className = '',
  theme = 'light',
}: SkeletonListProps) {
  return (
    <div className={clsx('space-y-3', className)}>
      {Array.from({ length: items }).map((_, index) => (
        <div
          key={index}
          className={clsx(
            'flex items-center gap-4 p-3 rounded-xl',
            theme === 'dark' 
              ? 'bg-slate-800/50' 
              : 'bg-white border border-slate-200'
          )}
        >
          {avatar && (
            <Skeleton
              variant="circular"
              width="40px"
              height="40px"
              theme={theme}
              animation="pulse"
            />
          )}
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" width="40%" theme={theme} />
            <Skeleton variant="text" width="70%" theme={theme} />
          </div>
          <Skeleton
            variant="rounded"
            width="60px"
            height="24px"
            theme={theme}
            animation="pulse"
          />
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// SKELETON FORM COMPONENT
// ============================================================================

export interface SkeletonFormProps {
  fields?: number;
  showLabels?: boolean;
  className?: string;
  theme?: 'light' | 'dark';
}

export function SkeletonForm({
  fields = 4,
  showLabels = true,
  className = '',
  theme = 'light',
}: SkeletonFormProps) {
  return (
    <div className={clsx('space-y-6', className)}>
      {Array.from({ length: fields }).map((_, index) => (
        <div key={index} className="space-y-2">
          {showLabels && (
            <Skeleton
              variant="text"
              width="120px"
              height="16px"
              theme={theme}
              animation="pulse"
            />
          )}
          <Skeleton
            variant="rounded"
            width="100%"
            height="48px"
            theme={theme}
            animation="pulse"
          />
        </div>
      ))}
      
      {/* Submit button */}
      <div className="pt-4">
        <Skeleton
          variant="rounded"
          width="150px"
          height="44px"
          theme={theme}
          animation="pulse"
        />
      </div>
    </div>
  );
}

// ============================================================================
// PAGE LOADING SKELETON
// ============================================================================

export interface PageSkeletonProps {
  header?: boolean;
  tabs?: boolean;
  contentRows?: number;
  sidebar?: boolean;
  className?: string;
  theme?: 'light' | 'dark';
}

export function PageSkeleton({
  header = true,
  tabs = true,
  contentRows = 3,
  sidebar = false,
  className = '',
  theme = 'light',
}: PageSkeletonProps) {
  return (
    <div className={clsx('space-y-6 animate-pulse', className)}>
      {/* Page Header */}
      {header && (
        <div className={clsx('rounded-2xl border p-6',
          theme === 'dark' 
            ? 'bg-slate-800/50 border-slate-700' 
            : 'bg-white border-slate-200'
        )}>
          <div className="flex items-center gap-4">
            <Skeleton
              variant="rounded"
              width="56px"
              height="56px"
              theme={theme}
            />
            <div className="space-y-2 flex-1">
              <Skeleton variant="text" width="40%" height="28px" theme={theme} />
              <Skeleton variant="text" width="60%" theme={theme} />
            </div>
            <div className="flex gap-2">
              <Skeleton variant="rounded" width="44px" height="44px" theme={theme} />
              <Skeleton variant="rounded" width="100px" height="44px" theme={theme} />
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      {tabs && (
        <div className="flex gap-2">
          {Array.from({ length: 3 }).map((_, idx) => (
            <Skeleton
              key={idx}
              variant="rounded"
              width="100px"
              height="40px"
              theme={theme}
            />
          ))}
        </div>
      )}

      {/* Main content with optional sidebar */}
      <div className={clsx(
        'grid gap-6',
        sidebar ? 'grid-cols-1 lg:grid-cols-12' : 'grid-cols-1'
      )}>
        {/* Main area */}
        <div className={sidebar ? 'lg:col-span-9' : ''}>
          {Array.from({ length: contentRows }).map((_, rowIdx) => (
            <div
              key={rowIdx}
              className={clsx(
                'rounded-xl border p-6 mb-6',
                theme === 'dark' 
                  ? 'bg-slate-800/50 border-slate-700' 
                  : 'bg-white border-slate-200'
              )}
            >
              <Skeleton
                variant="text"
                width="30%"
                height="20px"
                theme={theme}
                className="mb-4"
              />
              <SkeletonText lines={4} theme={theme} />
            </div>
          ))}
        </div>

        {/* Sidebar */}
        {sidebar && (
          <div className="lg:col-span-3 space-y-6">
            {Array.from({ length: 2 }).map((_, idx) => (
              <div
                key={idx}
                className={clsx(
                  'rounded-xl border p-4',
                  theme === 'dark' 
                    ? 'bg-slate-800/50 border-slate-700' 
                    : 'bg-white border-slate-200'
                )}
              >
                <Skeleton variant="text" width="50%" theme={theme} className="mb-3" />
                <SkeletonText lines={3} theme={theme} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// SPINNER WITH LABEL
// ============================================================================

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  theme?: 'light' | 'dark';
  className?: string;
}

export function LoadingSpinner({
  size = 'md',
  label = 'Cargando...',
  theme = 'light',
  className = '',
}: LoadingSpinnerProps) {
  const isDark = theme === 'dark';

  const sizeClasses = {
    sm: 'h-6 w-6 border-2',
    md: 'h-10 w-10 border-2',
    lg: 'h-16 w-16 border-4',
  };

  return (
    <div className={clsx('flex flex-col items-center justify-center gap-4', className)}>
      <div
        className={clsx(
          'animate-spin rounded-full border-t-2 border-b-2',
          isDark ? 'border-blue-400' : 'border-blue-600',
          sizeClasses[size]
        )}
      />
      {label && (
        <p className={clsx('text-sm', isDark ? 'text-slate-400' : 'text-slate-600')}>
          {label}
        </p>
      )}
    </div>
  );
}

// ============================================================================
// FULL PAGE LOADING
// ============================================================================

export function FullPageLoading({
  message = 'Cargando...',
  theme = 'light',
}: {
  message?: string;
  theme?: 'light' | 'dark';
}) {
  return (
    <div className={clsx(
      'min-h-screen flex flex-col items-center justify-center',
      theme === 'dark' ? 'bg-slate-950' : 'bg-slate-50'
    )}>
      <LoadingSpinner size="lg" label={message} theme={theme} />
    </div>
  );
}

// ============================================================================
// DOTS LOADER
// ============================================================================

export function DotsLoader({
  size = 'md',
  theme = 'light',
  className = '',
}: {
  size?: 'sm' | 'md' | 'lg';
  theme?: 'light' | 'dark';
  className?: string;
}) {
  const isDark = theme === 'dark';
  const dotColor = isDark ? 'bg-slate-400' : 'bg-slate-500';

  const sizeClasses = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-3 h-3',
  };

  const gapClasses = {
    sm: 'gap-1',
    md: 'gap-2',
    lg: 'gap-3',
  };

  return (
    <div className={clsx('flex items-center justify-center', gapClasses[size], className)}>
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className={clsx(
            'rounded-full animate-bounce',
            dotColor,
            sizeClasses[size]
          )}
          style={{
            animationDelay: `${index * 0.15}s`,
          }}
        />
      ))}
    </div>
  );
}


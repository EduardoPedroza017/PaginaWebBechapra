"use client";

import React from 'react';
import clsx from 'clsx';
import { Search, Filter, X } from 'lucide-react';
import { FormInput } from '../shared/FormInput';
import {
  getFilterBarClasses,
  getFilterChipClasses,
  getActionButtonClasses,
} from '../../design-system';
import { TranslateText } from '@/components/TranslateText';

// ============================================================================
// Filter Chip Component
// ============================================================================

interface FilterChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
  theme?: 'light' | 'dark';
}

export function FilterChip({
  label,
  active,
  onClick,
  theme = 'light',
}: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
        getFilterChipClasses(active, theme)
      )}
    >
      <TranslateText text={label} />
    </button>
  );
}

// ============================================================================
// Filter Group Component
// ============================================================================

interface FilterOption {
  id: string;
  label: string;
}

interface FilterGroupProps {
  label?: string;
  options: FilterOption[];
  selected: string;
  onChange: (value: string) => void;
  theme?: 'light' | 'dark';
}

export function FilterGroup({
  label,
  options,
  selected,
  onChange,
  theme = 'light',
}: FilterGroupProps) {
  return (
    <div className="flex items-center gap-2">
      {label && (
        <span className={clsx(
          'text-sm font-medium',
          theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
        )}>
          <TranslateText text={label} />
        </span>
      )}
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <FilterChip
            key={option.id}
            label={option.label}
            active={selected === option.id}
            onClick={() => onChange(option.id)}
            theme={theme}
          />
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// Search Input Component
// ============================================================================

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  theme?: 'light' | 'dark';
  className?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder = 'Buscar...',
  theme = 'light',
  className = '',
}: SearchInputProps) {
  return (
    <div className={clsx('relative', className)}>
      <Search className={clsx(
        'absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4',
        theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
      )} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={clsx(
          'w-full pl-10 pr-10 py-2 rounded-lg border transition-all duration-200 outline-none',
          theme === 'dark'
            ? 'bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500'
            : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500'
        )}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className={clsx(
            'absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded',
            theme === 'dark' ? 'hover:bg-slate-700' : 'hover:bg-slate-100'
          )}
        >
          <X className={clsx(
            'w-4 h-4',
            theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
          )} />
        </button>
      )}
    </div>
  );
}

// ============================================================================
// Main Filter Bar Component
// ============================================================================

interface FilterBarProps {
  theme?: 'light' | 'dark';
  children?: React.ReactNode;
  className?: string;
}

export default function FilterBar({
  theme = 'light',
  children,
  className = '',
}: FilterBarProps) {
  return (
    <div className={clsx(getFilterBarClasses(theme), className)}>
      {children}
    </div>
  );
}

// ============================================================================
// Common Filter Bar Layouts
// ============================================================================

interface CommonFilterBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  filters?: React.ReactNode;
  actions?: React.ReactNode;
  theme?: 'light' | 'dark';
}

export function CommonFilterBar({
  searchValue,
  onSearchChange,
  searchPlaceholder,
  filters,
  actions,
  theme = 'light',
}: CommonFilterBarProps) {
  return (
    <FilterBar theme={theme}>
      <div className="flex-1 max-w-md">
        <SearchInput
          value={searchValue}
          onChange={onSearchChange}
          placeholder={searchPlaceholder}
          theme={theme}
        />
      </div>
      {filters && <div className="flex items-center gap-3">{filters}</div>}
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </FilterBar>
  );
}

// ============================================================================
// Status Filter Bar
// ============================================================================

interface StatusOption {
  id: string;
  label: string;
  count?: number;
}

interface StatusFilterBarProps {
  options: StatusOption[];
  selected: string;
  onChange: (value: string) => void;
  theme?: 'light' | 'dark';
}

export function StatusFilterBar({
  options,
  selected,
  onChange,
  theme = 'light',
}: StatusFilterBarProps) {
  return (
    <FilterBar theme={theme}>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <FilterChip
            key={option.id}
            label={option.count !== undefined ? `${option.label} (${option.count})` : option.label}
            active={selected === option.id}
            onClick={() => onChange(option.id)}
            theme={theme}
          />
        ))}
      </div>
    </FilterBar>
  );
}


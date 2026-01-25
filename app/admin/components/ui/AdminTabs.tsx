"use client";

import React from 'react';
import clsx from 'clsx';
import { Loader2 } from 'lucide-react';
import {
  getTabsContainerClasses,
  getTabClasses,
  getTabListClass,
} from '../../design-system';
import { TranslateText } from '@/components/TranslateText';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface AdminTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  loadingTabs?: Record<string, boolean>;
  theme?: 'light' | 'dark';
  className?: string;
  variant?: 'default' | 'pills' | 'underline';
}

export default function AdminTabs({
  tabs,
  activeTab,
  onChange,
  loadingTabs = {},
  theme = 'light',
  className = '',
  variant = 'default',
}: AdminTabsProps) {
  const containerClasses = getTabsContainerClasses(theme);

  // Pills variant styles
  const pillsBaseClasses = `px-4 py-2 rounded-lg flex items-center gap-2 font-medium text-sm transition-all duration-200`;
  const getPillsActiveClass = (active: boolean, theme: 'light' | 'dark') => {
    if (active) {
      return theme === 'dark'
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
        : 'bg-blue-600 text-white shadow-lg shadow-blue-200';
    }
    return theme === 'dark'
      ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
      : 'bg-slate-100 text-slate-600 hover:bg-slate-200';
  };

  // Underline variant styles
  const underlineClasses = `flex border-b border-slate-200 dark:border-slate-700`;

  const renderTab = (tab: TabItem) => {
    const isActive = activeTab === tab.id;
    const isLoading = loadingTabs[tab.id];
    const isDisabled = tab.disabled || isLoading;

    const handleClick = () => {
      if (!isDisabled) {
        onChange(tab.id);
      }
    };

    if (variant === 'pills') {
      return (
        <button
          key={tab.id}
          onClick={handleClick}
          disabled={isDisabled}
          className={clsx(
            pillsBaseClasses,
            getPillsActiveClass(isActive, theme),
            isDisabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : tab.icon ? (
            <span className="flex-shrink-0">{tab.icon}</span>
          ) : null}
          <TranslateText text={tab.label} />
        </button>
      );
    }

    if (variant === 'underline') {
      return (
        <button
          key={tab.id}
          onClick={handleClick}
          disabled={isDisabled}
          className={clsx(
            'px-6 py-3 font-medium transition-all duration-200 flex items-center gap-2',
            isActive
              ? theme === 'dark'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-blue-600 border-b-2 border-blue-600'
              : theme === 'dark'
                ? 'text-slate-400 hover:text-slate-300'
                : 'text-slate-600 hover:text-slate-800',
            isDisabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          {tab.icon && <span className="flex-shrink-0">{tab.icon}</span>}
          <TranslateText text={tab.label} />
          {isLoading && <Loader2 className="w-4 h-4 animate-spin ml-1" />}
        </button>
      );
    }

    // Default variant (tabbed)
    return (
      <button
        key={tab.id}
        onClick={handleClick}
        disabled={isDisabled}
        className={clsx(
          getTabClasses(isActive, theme),
          isDisabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <div className="flex items-center gap-2">
          {tab.icon && <span className="flex-shrink-0">{tab.icon}</span>}
          <TranslateText text={tab.label} />
          {isLoading && <Loader2 className="w-4 h-4 animate-spin ml-1" />}
        </div>
      </button>
    );
  };

  if (variant === 'underline') {
    return (
      <div className={clsx('mb-6', className)}>
        <div className={underlineClasses}>
          {tabs.map(renderTab)}
        </div>
      </div>
    );
  }

  if (variant === 'pills') {
    return (
      <div className={clsx('mb-6', className)}>
        <div className="flex flex-wrap gap-2">
          {tabs.map(renderTab)}
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={clsx('mb-6', className)}>
      <div className={containerClasses}>
        <div className={getTabListClass()}>
          {tabs.map(renderTab)}
        </div>
      </div>
    </div>
  );
}


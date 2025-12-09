"use client";

import { HTMLAttributes, forwardRef } from 'react';
import { getThemeClasses } from '../../design-system';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  theme?: 'light' | 'dark';
  hover?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ theme = 'light', hover = false, className = '', children, ...props }, ref) => {
    const { card } = getThemeClasses(theme);
    const hoverEffect = hover ? 'hover:shadow-2xl hover:-translate-y-1' : '';

    return (
      <div
        ref={ref}
        className={`${card} ${hoverEffect} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  theme?: 'light' | 'dark';
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ theme = 'light', title, subtitle, action, className = '', children, ...props }, ref) => {
    const isDark = theme === 'dark';

    return (
      <div
        ref={ref}
        className={`flex items-start justify-between mb-6 pb-4 border-b ${
          isDark ? 'border-slate-700' : 'border-slate-200'
        } ${className}`}
        {...props}
      >
        <div className="flex-1 min-w-0">
          {title && (
            <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {title}
            </h3>
          )}
          {subtitle && (
            <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {subtitle}
            </p>
          )}
          {children}
        </div>
        {action && <div className="ml-4 flex-shrink-0">{action}</div>}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

type CardBodyProps = HTMLAttributes<HTMLDivElement>;

export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div ref={ref} className={`${className}`} {...props}>
        {children}
      </div>
    );
  }
);

CardBody.displayName = 'CardBody';

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  theme?: 'light' | 'dark';
}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ theme = 'light', className = '', children, ...props }, ref) => {
    const isDark = theme === 'dark';

    return (
      <div
        ref={ref}
        className={`mt-6 pt-4 border-t ${
          isDark ? 'border-slate-700' : 'border-slate-200'
        } ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';

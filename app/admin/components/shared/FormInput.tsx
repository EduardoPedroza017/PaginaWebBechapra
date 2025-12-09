"use client";

import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from 'react';
import { AlertCircle } from 'lucide-react';
import { getInputClasses } from '../../design-system';

interface BaseInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  theme?: 'light' | 'dark';
  icon?: React.ReactNode;
}

interface FormInputProps extends BaseInputProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: 'input';
}

interface FormTextareaProps extends BaseInputProps, TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant: 'textarea';
  rows?: number;
}

type FormFieldProps = FormInputProps | FormTextareaProps;

export const FormInput = forwardRef<HTMLInputElement | HTMLTextAreaElement, FormFieldProps>(
  ({ label, error, helperText, theme = 'light', icon, variant = 'input', className = '', ...props }, ref) => {
    const isDark = theme === 'dark';
    const hasError = !!error;

    const labelClasses = isDark
      ? 'text-slate-300 font-semibold'
      : 'text-slate-700 font-semibold';

    const helperClasses = isDark
      ? 'text-slate-400'
      : 'text-slate-500';

    const errorClasses = isDark
      ? 'text-rose-400'
      : 'text-rose-600';

    const inputClasses = getInputClasses(theme, hasError);

    return (
      <div className="space-y-2">
        {label && (
          <label className={`block text-sm ${labelClasses}`}>
            {label}
            {props.required && <span className="text-rose-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <div className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                {icon}
              </div>
            </div>
          )}

          {variant === 'textarea' ? (
            <textarea
              ref={ref as React.Ref<HTMLTextAreaElement>}
              className={`${inputClasses} ${icon ? 'pl-11' : ''} ${className} resize-none`}
              rows={(props as FormTextareaProps).rows || 4}
              {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
            />
          ) : (
            <input
              ref={ref as React.Ref<HTMLInputElement>}
              className={`${inputClasses} ${icon ? 'pl-11' : ''} ${className}`}
              {...(props as InputHTMLAttributes<HTMLInputElement>)}
            />
          )}

          {hasError && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <AlertCircle className={`w-5 h-5 ${isDark ? 'text-rose-400' : 'text-rose-500'}`} />
            </div>
          )}
        </div>

        {error && (
          <p className={`text-sm flex items-center gap-1.5 ${errorClasses}`}>
            <AlertCircle className="w-4 h-4" />
            {error}
          </p>
        )}

        {helperText && !error && (
          <p className={`text-xs ${helperClasses}`}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';

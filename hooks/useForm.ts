import { useState, useCallback } from 'react';

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'checkbox' | 'file' | 'date' | 'time' | 'richtext' | 'tags';
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  maxTags?: number;
  options?: { value: string; label: string }[];
  accept?: string;
  maxSize?: number;
  placeholder?: string;
  helper?: string;
}

export interface FormData {
  [key: string]: unknown;
}

export interface UseFormReturn {
  data: FormData;
  setData: (data: FormData | ((prev: FormData) => FormData)) => void;
  updateField: (name: string, value: unknown) => void;
  reset: () => void;
  isValid: boolean;
  errors: Record<string, string>;
  validate: () => boolean;
}

export function useForm(initialData: FormData = {}): UseFormReturn {
  const [data, setData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = useCallback((name: string, value: unknown) => {
    setData(prev => ({ ...prev, [name]: value }));
    // Clear error when field is updated
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [errors]);

  const validate = useCallback(() => {
    const newErrors: Record<string, string> = {};
    // Basic validation - can be extended based on field requirements
    return Object.keys(newErrors).length === 0;
  }, []);

  const reset = useCallback(() => {
    setData(initialData);
    setErrors({});
  }, [initialData]);

  const isValid = Object.keys(errors).length === 0;

  return {
    data,
    setData,
    updateField,
    reset,
    isValid,
    errors,
    validate,
  };
}

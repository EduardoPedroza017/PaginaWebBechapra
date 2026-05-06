"use client";
import { useTranslatedString } from '@/lib/hooks/useTranslatedString';

interface TranslateTextProps {
  text: string;
  asOption?: boolean;
}

export function TranslateText({ text, asOption = false }: TranslateTextProps) {
  const translated = useTranslatedString(text);

  if (asOption) {
    return <>{translated}</>;
  }
  return <span>{translated}</span>;
}

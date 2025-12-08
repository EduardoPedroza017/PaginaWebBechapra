"use client";
import { useEffect, useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { translateText } from '@/lib/translate';

interface TranslateTextProps {
  text: string;
  asOption?: boolean;
}

export function TranslateText({ text, asOption = false }: TranslateTextProps) {
  const { lang } = useLanguage();
  const [translated, setTranslated] = useState(text);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (lang === 'es') {
      setTranslated(text);
      return;
    }

    // Añadir pequeño delay aleatorio para evitar llamadas simultáneas
    const delay = Math.random() * 300;
    const timeoutId = setTimeout(() => {
      setLoading(true);
      translateText(text, lang)
        .then(setTranslated)
        .catch(() => setTranslated(text))
        .finally(() => setLoading(false));
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [lang, text]);

  if (asOption) {
    return <>{loading ? '...' : translated}</>;
  }
  return <span>{loading ? '...' : translated}</span>;
}

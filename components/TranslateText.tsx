"use client";
import { useEffect, useState } from 'react';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import { translateText } from '@/lib/utils/translate';

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
      Promise.resolve().then(() => setTranslated(text));
      return;
    }

    // Añadir pequeño delay aleatorio para evitar llamadas simultáneas
    const delay = Math.random() * 300;
    const timeoutId = setTimeout(() => {
       
      setLoading(true);
      translateText(text, lang)
        .then((value) => {
           
          setTranslated(value);
        })
        .catch(() => {
           
          setTranslated(text);
        })
        .finally(() => {
           
          setLoading(false);
        });
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [lang, text]);

  if (asOption) {
    return <>{loading ? '...' : translated}</>;
  }
  return <span>{loading ? '...' : translated}</span>;
}

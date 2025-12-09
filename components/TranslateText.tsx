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
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTranslated(text);
      return;
    }

    // Añadir pequeño delay aleatorio para evitar llamadas simultáneas
    const delay = Math.random() * 300;
    const timeoutId = setTimeout(() => {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(true);
      translateText(text, lang)
        .then((value) => {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setTranslated(value);
        })
        .catch(() => {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setTranslated(text);
        })
        .finally(() => {
          // eslint-disable-next-line react-hooks/set-state-in-effect
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

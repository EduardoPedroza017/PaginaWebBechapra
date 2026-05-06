"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/contexts/LanguageContext";
import { translateText } from "@/lib/utils/translate";

export function useTranslatedString(text: string): string {
  const { lang } = useLanguage();
  const [translated, setTranslated] = useState(text);

  useEffect(() => {
    setTranslated(text);

    if (!text || lang === "es") {
      return;
    }

    const delay = Math.random() * 300;
    const timeoutId = setTimeout(() => {
      translateText(text, lang)
        .then((value) => setTranslated(value))
        .catch(() => setTranslated(text));
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [lang, text]);

  return translated;
}

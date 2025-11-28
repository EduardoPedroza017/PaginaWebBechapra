"use client";

import { motion } from "framer-motion";
import { Users, TrendingUp, Briefcase } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useLanguage } from '../../lib/LanguageContext';
import { translateText } from '../../lib/translate';

type ServiceCardProps = {
  title: string;
  items: string[];
  description?: string;
  href: string;
  gradient: string;
  color?: "blue" | "slate" | "indigo";
};

export default function ServiceCard({
  title,
  items,
  description,
  href,
  gradient,
  color = "blue",
}: ServiceCardProps) {
  const { lang } = useLanguage();
  const [translatedTitle, setTranslatedTitle] = useState(title);
  const [translatedDescription, setTranslatedDescription] = useState(description);
  const [translatedItems, setTranslatedItems] = useState(items);
  const [buttonText, setButtonText] = useState('Ver servicios');

  useEffect(() => {
    async function fetchTranslations() {
      if (lang === 'es') {
        setTranslatedTitle(title);
        setTranslatedDescription(description);
        setTranslatedItems(items);
        setButtonText('Ver servicios');
      } else {
        setTranslatedTitle(await translateText(title, lang));
        setButtonText(await translateText('Ver servicios', lang));
        if (description) {
          setTranslatedDescription(await translateText(description, lang));
        } else {
          setTranslatedDescription(undefined);
        }
        setTranslatedItems(await Promise.all(items.map(item => translateText(item, lang))));
      }
    }
    fetchTranslations();
  }, [lang, title, description, items]);
  const renderIcon = () => {
    const t = translatedTitle.toLowerCase();
    if (t.includes("capital") || t.includes("human")) {
      return <Users className="w-7 h-7" />;
    }
    if (t.includes("desarrollo")) {
      return <TrendingUp className="w-7 h-7" />;
    }
    return <Briefcase className="w-7 h-7" />;
  };

  const colorClasses: Record<"blue" | "slate" | "indigo", string> = {
    blue: "bg-blue-600 hover:bg-blue-700 text-blue-600",
    slate: "bg-slate-700 hover:bg-slate-800 text-slate-600",
    indigo: "bg-indigo-600 hover:bg-indigo-700 text-indigo-600",
  };

  const itemColorClasses: Record<"blue" | "slate" | "indigo", { bg: string; border: string; dot: string }> = {
    blue: {
      bg: "bg-blue-50",
      border: "border-blue-100",
      dot: "bg-blue-600",
    },
    slate: {
      bg: "bg-slate-50",
      border: "border-slate-200",
      dot: "bg-slate-600",
    },
    indigo: {
      bg: "bg-indigo-50",
      border: "border-indigo-100",
      dot: "bg-indigo-600",
    },
  };

  return (
    <a href={href} className="block">
      <motion.div
        whileHover={{ y: -6, scale: 1.01 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="w-full md:w-72 h-80 bg-white rounded-xl shadow-lg p-4 border border-slate-200 ring-1 ring-slate-50 relative overflow-hidden transition-transform duration-300 hover:shadow-2xl"
      >
        {/* Window controls */}
        <div className="flex items-center gap-2 p-2">
          <span className="w-3 h-3 rounded-full bg-red-500 inline-block" aria-hidden="true"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block" aria-hidden="true"></span>
          <span className="w-3 h-3 rounded-full bg-green-500 inline-block" aria-hidden="true"></span>
        </div>

        <div className="p-4 h-[calc(100%-3rem)] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className={`flex-shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-${color}-50 ${colorClasses[color].split(' ')[2]}`}>
                {renderIcon()}
              </div>
              <h3 className="text-xl font-bold text-slate-900">{translatedTitle}</h3>
            </div>

            {translatedDescription && (
              <p className="text-sm text-slate-600 mb-3">{translatedDescription}</p>
            )}

            {/* Items as mini-cards */}
            <div className="mt-3">
              <div className={`${itemColorClasses[color].bg} border ${itemColorClasses[color].border} rounded-lg p-2 flex flex-col gap-2`}>
                {translatedItems.map((item, index) => (
                  <div 
                    key={index} 
                    className="bg-white border border-slate-200/80 rounded-md px-3 py-2 shadow-sm flex items-center gap-3 transition-all duration-200 hover:shadow-md hover:scale-[1.03] hover:border-slate-300"
                  >
                    <span aria-hidden="true" className={`inline-block w-2 h-2 rounded-full ${itemColorClasses[color].dot}`} />
                    <span className="text-sm text-slate-800 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex justify-center">
              <span className={`${colorClasses[color].split(' ')[0]} ${colorClasses[color].split(' ')[1]} text-white px-4 py-2 rounded-lg text-sm font-semibold shadow`}>
                {buttonText}
              </span>
            </div>
          </div>
        </div>

        {/* Gradient effect */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 hover:opacity-40 transition-opacity duration-300 -z-10`}></div>
      </motion.div>
    </a>
  );
}

"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, ArrowRight } from "lucide-react";
import { TranslateText } from '@/components/TranslateText';
import Section from "@/app/components/Section";
import ContactForm from "@/app/components/ContactForm";

interface ContactSectionProps {
  title: string;
  subtitle: string;
}

export default function ContactSection({
  title,
  subtitle,
}: ContactSectionProps) {
  return (
    <Section id="contacto" variant="white" size="lg">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Info Side */}
          <div className="lg:col-span-5 space-y-12">
            <div>
               <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-blue-100 dark:border-blue-800/50">
                <TranslateText text="Contacto directo" />
               </span>
              <h2 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tighter leading-tight mb-6">
                <TranslateText text={title} />
              </h2>
              <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                <TranslateText text={subtitle} />
              </p>
            </div>

            <div className="space-y-8">
              {[
                { icon: Phone, label: "Teléfono de Atención", value: "+52 (656) 524 5678", href: "tel:+526565245678" },
                { icon: Mail, label: "Email Corporativo", value: "contacto@bausen.com.mx", href: "mailto:contacto@bausen.com.mx" },
                { icon: MapPin, label: "Oficina Central", value: "Ciudad Juárez, Chihuahua, México", href: "#" }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1"><TranslateText text={item.label} /></div>
                    <a href={item.href} className="text-lg font-bold text-slate-900 dark:text-white hover:text-blue-600 transition-colors">
                      {item.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-slate-900/50 rounded-[3rem] p-8 lg:p-12 border border-slate-100 dark:border-slate-800 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-[80px]" />
               <div className="relative z-10">
                 <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-8 tracking-tight"><TranslateText text="Envíenos un mensaje estratégico" /></h3>
                 <ContactForm />
                </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

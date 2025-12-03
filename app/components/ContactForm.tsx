"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Loader2, User, Mail, MessageSquare } from "lucide-react";

type Status = "idle" | "sending" | "success" | "error";

const fields = [
  { name: "name", type: "text", placeholder: "Tu nombre completo", icon: User },
  { name: "email", type: "email", placeholder: "tu@email.com", icon: Mail },
] as const;

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [focused, setFocused] = useState<string | null>(null);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "El nombre es requerido";
    if (!form.email.trim()) e.email = "El email es requerido";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = "Email inválido";
    if (!form.message.trim()) e.message = "El mensaje es requerido";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setStatus("sending");
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${apiUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
        setErrors({});
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
    if (status !== "idle") setStatus("idle");
  };

  return (
    <form onSubmit={handleSubmit} aria-live="polite" className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.name} className="relative">
            <div className={`relative rounded-xl transition-all duration-200 ${
              focused === field.name ? "ring-2 ring-blue-500/20" : ""
            }`}>
              <field.icon className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                focused === field.name ? "text-blue-600" : "text-slate-400"
              }`} />
              <input
                name={field.name}
                type={field.type}
                value={form[field.name as keyof typeof form]}
                onChange={handleChange}
                onFocus={() => setFocused(field.name)}
                onBlur={() => setFocused(null)}
                placeholder={field.placeholder}
                className={`w-full pl-12 pr-4 py-4 rounded-xl border bg-slate-50 text-slate-900 placeholder-slate-400 outline-none transition-all
                  ${errors[field.name] 
                    ? "border-red-400 bg-red-50/50" 
                    : focused === field.name 
                      ? "border-blue-500 bg-white" 
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                aria-invalid={!!errors[field.name]}
              />
            </div>
            <AnimatePresence>
              {errors[field.name] && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="mt-2 text-sm text-red-500 flex items-center gap-1"
                >
                  <AlertCircle className="w-4 h-4" />
                  {errors[field.name]}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        ))}

        <div className="sm:col-span-2 relative">
          <div className={`relative rounded-xl transition-all duration-200 ${
            focused === "message" ? "ring-2 ring-blue-500/20" : ""
          }`}>
            <MessageSquare className={`absolute left-4 top-4 w-5 h-5 transition-colors ${
              focused === "message" ? "text-blue-600" : "text-slate-400"
            }`} />
            <textarea
              name="message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              onFocus={() => setFocused("message")}
              onBlur={() => setFocused(null)}
              placeholder="¿En qué podemos ayudarte?"
              className={`w-full pl-12 pr-4 py-4 rounded-xl border bg-slate-50 text-slate-900 placeholder-slate-400 outline-none transition-all resize-y min-h-[140px]
                ${errors.message 
                  ? "border-red-400 bg-red-50/50" 
                  : focused === "message" 
                    ? "border-blue-500 bg-white" 
                    : "border-slate-200 hover:border-slate-300"
                }`}
              aria-invalid={!!errors.message}
            />
          </div>
          <AnimatePresence>
            {errors.message && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="mt-2 text-sm text-red-500 flex items-center gap-1"
              >
                <AlertCircle className="w-4 h-4" />
                {errors.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Submit and Status */}
      <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
        <motion.button
          type="submit"
          disabled={status === "sending"}
          whileHover={{ scale: status === "sending" ? 1 : 1.02 }}
          whileTap={{ scale: status === "sending" ? 1 : 0.98 }}
          className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 disabled:opacity-60 disabled:cursor-not-allowed transition-all overflow-hidden"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative flex items-center gap-2">
            {status === "sending" ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                Enviar mensaje
              </>
            )}
          </span>
        </motion.button>

        <AnimatePresence mode="wait">
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 font-medium rounded-xl"
            >
              <CheckCircle className="w-5 h-5" />
              ¡Mensaje enviado! Te contactaremos pronto.
            </motion.div>
          )}

          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-500 font-medium rounded-xl"
            >
              <AlertCircle className="w-5 h-5" />
              Ocurrió un error. Intenta de nuevo.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}

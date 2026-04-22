"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, Loader2, User, Mail, MessageSquare, ArrowRight } from "lucide-react";
import { TranslateText } from "@/components/TranslateText";

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
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = "Email invalido";
    if (!form.message.trim()) e.message = "El mensaje es requerido";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/backend/contact", {
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.name} className="relative">
            <div className={`relative transition-all duration-300 ${focused === field.name ? "scale-[1.02]" : ""}`}>
              <div
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-lg transition-all duration-300"
                style={
                  focused === field.name
                    ? {
                        backgroundColor: "var(--brand-primary)",
                        color: "#fff",
                        boxShadow: "0 12px 24px rgba(35,70,221,0.25)",
                      }
                    : { color: "var(--foreground)" }
                }
              >
                <field.icon className="w-4 h-4" />
              </div>

              <input
                name={field.name}
                type={field.type}
                value={form[field.name as keyof typeof form]}
                onChange={handleChange}
                onFocus={() => setFocused(field.name)}
                onBlur={() => setFocused(null)}
                placeholder={field.placeholder}
                className="w-full pl-14 pr-4 py-[18px] rounded-2xl border-2 outline-none transition-all duration-300 font-medium text-base"
                style={
                  errors[field.name]
                    ? {
                        backgroundColor: "rgba(255,255,255,0.82)",
                        color: "var(--foreground)",
                        borderColor: "#fb7185",
                      }
                    : focused === field.name
                      ? {
                          backgroundColor: "#ffffff",
                          color: "var(--foreground)",
                          borderColor: "var(--brand-primary)",
                          boxShadow: "0 0 0 8px rgba(35,70,221,0.08)",
                        }
                      : {
                          backgroundColor: "rgba(255,255,255,0.82)",
                          color: "var(--foreground)",
                          borderColor: "var(--surface-border)",
                        }
                }
              />
            </div>

            <AnimatePresence>
              {errors[field.name] && (
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="mt-2 pl-2 text-xs font-black uppercase tracking-wider text-rose-500 flex items-center gap-1.5"
                >
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors[field.name]}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        ))}

        <div className="sm:col-span-2 relative">
          <div className={`relative transition-all duration-300 ${focused === "message" ? "scale-[1.01]" : ""}`}>
            <div
              className="absolute left-4 top-4 z-10 p-2 rounded-lg transition-all duration-300"
              style={
                focused === "message"
                  ? {
                      backgroundColor: "var(--brand-primary)",
                      color: "#fff",
                      boxShadow: "0 12px 24px rgba(35,70,221,0.25)",
                    }
                  : { color: "var(--foreground)" }
              }
            >
              <MessageSquare className="w-4 h-4" />
            </div>

            <textarea
              name="message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              onFocus={() => setFocused("message")}
              onBlur={() => setFocused(null)}
              placeholder="En que podemos ayudarte?"
              className="w-full pl-14 pr-4 py-[18px] rounded-3xl border-2 outline-none transition-all duration-300 font-medium text-base resize-none min-h-40"
              style={
                errors.message
                  ? {
                      backgroundColor: "rgba(255,255,255,0.82)",
                      color: "var(--foreground)",
                      borderColor: "#fb7185",
                    }
                  : focused === "message"
                    ? {
                        backgroundColor: "#ffffff",
                        color: "var(--foreground)",
                        borderColor: "var(--brand-primary)",
                        boxShadow: "0 0 0 8px rgba(35,70,221,0.08)",
                      }
                    : {
                        backgroundColor: "rgba(255,255,255,0.82)",
                        color: "var(--foreground)",
                        borderColor: "var(--surface-border)",
                      }
              }
            />
          </div>

          <AnimatePresence>
            {errors.message && (
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="mt-2 pl-2 text-xs font-black uppercase tracking-wider text-rose-500 flex items-center gap-1.5"
              >
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
        <motion.button
          type="submit"
          disabled={status === "sending"}
          whileHover={{ scale: status === "sending" ? 1 : 1.05 }}
          whileTap={{ scale: status === "sending" ? 1 : 0.95 }}
          className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 text-white font-black text-sm uppercase tracking-[0.2em] rounded-2xl disabled:opacity-60 disabled:cursor-not-allowed transition-all overflow-hidden"
          style={{
            backgroundColor: "var(--brand-primary)",
            boxShadow: "0 18px 40px rgba(35,70,221,0.28)",
          }}
        >
          <span className="relative flex items-center gap-3">
            {status === "sending" ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <TranslateText text="Enviando..." />
              </>
            ) : (
              <>
                <TranslateText text="Enviar mensaje" />
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
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
              className="flex items-center gap-3 px-6 py-4 rounded-2xl font-bold border"
              style={{
                backgroundColor: "#ecfdf5",
                color: "#059669",
                borderColor: "#a7f3d0",
              }}
            >
              <CheckCircle className="w-5 h-5" />
              <TranslateText text="Mensaje enviado con exito" />
            </motion.div>
          )}

          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex items-center gap-3 px-6 py-4 rounded-2xl font-bold border"
              style={{
                backgroundColor: "#fff1f2",
                color: "#e11d48",
                borderColor: "#fecdd3",
              }}
            >
              <AlertCircle className="w-5 h-5" />
              <TranslateText text="Error al enviar. Intenta de nuevo." />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}

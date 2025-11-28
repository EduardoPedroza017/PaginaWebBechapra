"use client"

import { useState, useEffect } from "react";
import { useLanguage } from "../../lib/LanguageContext";
import { translateText } from "../../lib/translate";
import styles from "@/app/css/components/ContactForm.module.css";


export default function ContactForm() {
  const { lang } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{[k:string]:string}>({});
  const [status, setStatus] = useState<"idle"|"sending"|"success"|"error">("idle");
  const [texts, setTexts] = useState({
    nombre: "Nombre",
    email: "Email",
    mensaje: "Mensaje",
    enviar: "Enviar",
    enviando: "Enviando...",
    enviado: "¡Mensaje enviado! Te contactaremos pronto.",
    error: "Ocurrió un error. Intenta de nuevo más tarde.",
    reqNombre: "El nombre es requerido",
    reqEmail: "El email es requerido",
    emailInvalido: "Email inválido",
    reqMensaje: "El mensaje es requerido"
  });

  useEffect(() => {
    async function fetchTranslations() {
      if (lang === "es") {
        setTexts({
          nombre: "Nombre",
          email: "Email",
          mensaje: "Mensaje",
          enviar: "Enviar",
          enviando: "Enviando...",
          enviado: "¡Mensaje enviado! Te contactaremos pronto.",
          error: "Ocurrió un error. Intenta de nuevo más tarde.",
          reqNombre: "El nombre es requerido",
          reqEmail: "El email es requerido",
          emailInvalido: "Email inválido",
          reqMensaje: "El mensaje es requerido"
        });
      } else {
        setTexts({
          nombre: await translateText("Nombre", lang),
          email: await translateText("Email", lang),
          mensaje: await translateText("Mensaje", lang),
          enviar: await translateText("Enviar", lang),
          enviando: await translateText("Enviando...", lang),
          enviado: await translateText("¡Mensaje enviado! Te contactaremos pronto.", lang),
          error: await translateText("Ocurrió un error. Intenta de nuevo más tarde.", lang),
          reqNombre: await translateText("El nombre es requerido", lang),
          reqEmail: await translateText("El email es requerido", lang),
          emailInvalido: await translateText("Email inválido", lang),
          reqMensaje: await translateText("El mensaje es requerido", lang)
        });
      }
    }
    fetchTranslations();
  }, [lang]);

  function validate(){
    const e: {[k:string]:string} = {};
    if(!name.trim()) e.name = texts.reqNombre;
    if(!email.trim()) e.email = texts.reqEmail;
    else if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) e.email = texts.emailInvalido;
    if(!message.trim()) e.message = texts.reqMensaje;
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent){
    e.preventDefault();
    if(!validate()) return;
    setStatus("sending");
    try{
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });
      if(res.ok){
        setStatus('success');
        setName(''); setEmail(''); setMessage('');
        setErrors({});
      } else {
        setStatus('error');
      }
    }catch(err){
      setStatus('error');
      console.error(err);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`${styles.formWrapper}`} aria-live="polite">
      <div className={styles.formGrid}>
        <div className={styles.field}>
          <label htmlFor="cf-name" className={"sr-only"}>{texts.nombre}</label>
          <input
            id="cf-name"
            name="name"
            value={name}
            onChange={e=>setName(e.target.value)}
            placeholder={texts.nombre}
            className={`${styles.input} ${errors.name ? styles.inputError ?? '' : ''}`}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'err-name' : undefined}
          />
          {errors.name && <p id="err-name" className={styles.errorText}>{errors.name}</p>}
        </div>

        <div className={styles.field}>
          <label htmlFor="cf-email" className={"sr-only"}>{texts.email}</label>
          <input
            id="cf-email"
            name="email"
            type="email"
            value={email}
            onChange={e=>setEmail(e.target.value)}
            placeholder={texts.email}
            className={`${styles.input} ${errors.email ? styles.inputError ?? '' : ''}`}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'err-email' : undefined}
          />
          {errors.email && <p id="err-email" className={styles.errorText}>{errors.email}</p>}
        </div>

        <div className={`${styles.field}`} style={{gridColumn: '1 / -1'}}>
          <label htmlFor="cf-message" className={"sr-only"}>{texts.mensaje}</label>
          <textarea
            id="cf-message"
            name="message"
            rows={5}
            value={message}
            onChange={e=>setMessage(e.target.value)}
            placeholder={texts.mensaje}
            className={styles.textarea}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'err-message' : undefined}
          />
          {errors.message && <p id="err-message" className={styles.errorText}>{errors.message}</p>}
        </div>

        <div className={styles.actions} style={{gridColumn: '1 / -1'}}>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={status==='sending'}
            aria-busy={status==='sending'}
          >
            {status === 'sending' ? texts.enviando : texts.enviar}
          </button>

          <div aria-live="polite" className={styles.statusArea}>
            {status === 'success' && (
              <div className={styles.successText}>
                <svg className="inline-block mr-2" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span className={styles.successText}>{texts.enviado}</span>
              </div>
            )}

            {status === 'error' && <span className={styles.errorStatus}>{texts.error}</span>}
          </div>
        </div>
      </div>
    </form>
  );
}

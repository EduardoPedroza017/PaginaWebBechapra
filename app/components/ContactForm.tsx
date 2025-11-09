"use client"

import { useState } from "react";
import styles from "@/app/css/components/ContactForm.module.css";

export default function ContactForm(){
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{[k:string]:string}>({});
  const [status, setStatus] = useState<"idle"|"sending"|"success"|"error">("idle");
  // reduced motion preference removed (not used) to avoid unused variable warnings


  function validate(){
    const e: {[k:string]:string} = {};
    if(!name.trim()) e.name = "El nombre es requerido";
    if(!email.trim()) e.email = "El email es requerido";
    else if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) e.email = "Email inválido";
    if(!message.trim()) e.message = "El mensaje es requerido";
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
          <label htmlFor="cf-name" className={"" /* visually hidden via CSS */ + " " + "sr-only"}>Nombre</label>
          <input
            id="cf-name"
            name="name"
            value={name}
            onChange={e=>setName(e.target.value)}
            placeholder="Nombre"
            className={`${styles.input} ${errors.name ? styles.inputError ?? '' : ''}`}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'err-name' : undefined}
          />
          {errors.name && <p id="err-name" className={styles.errorText}>{errors.name}</p>}
        </div>

        <div className={styles.field}>
          <label htmlFor="cf-email" className={"sr-only"}>Email</label>
          <input
            id="cf-email"
            name="email"
            type="email"
            value={email}
            onChange={e=>setEmail(e.target.value)}
            placeholder="Email"
            className={`${styles.input} ${errors.email ? styles.inputError ?? '' : ''}`}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'err-email' : undefined}
          />
          {errors.email && <p id="err-email" className={styles.errorText}>{errors.email}</p>}
        </div>

        <div className={`${styles.field}`} style={{gridColumn: '1 / -1'}}>
          <label htmlFor="cf-message" className={"sr-only"}>Mensaje</label>
          <textarea
            id="cf-message"
            name="message"
            rows={5}
            value={message}
            onChange={e=>setMessage(e.target.value)}
            placeholder="Mensaje"
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
            {status === 'sending' ? 'Enviando...' : 'Enviar'}
          </button>

          <div aria-live="polite" className={styles.statusArea}>
            {status === 'success' && (
              <div className={styles.successText}>
                <svg className="inline-block mr-2" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span className={styles.successText}>¡Mensaje enviado! Te contactaremos pronto.</span>
              </div>
            )}

            {status === 'error' && <span className={styles.errorStatus}>{'Ocurrió un error. Intenta de nuevo más tarde.'}</span>}
          </div>
        </div>
      </div>
    </form>
  );
}

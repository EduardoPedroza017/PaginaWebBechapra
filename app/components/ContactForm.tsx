"use client"

import { useState } from "react";


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
      const apiUrl = process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/api/contact` : "http://localhost:5000/api/contact";
      const res = await fetch(apiUrl, {
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
    <form onSubmit={handleSubmit} className="w-full px-4 sm:px-6 md:px-0" aria-live="polite">
      <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
        <div className="flex flex-col">
          <label htmlFor="cf-name" className="sr-only">Nombre</label>
          <input
            id="cf-name"
            name="name"
            value={name}
            onChange={e=>setName(e.target.value)}
            placeholder="Nombre"
            className={`w-full rounded-[0.9rem] border border-[rgba(10,25,51,0.08)] bg-white shadow-[0_6px_18px_-10px_rgba(9,25,51,0.08)] text-[#0A1933] text-[clamp(0.9rem,1.2vw,1.05rem)] outline-none transition-all duration-200 px-[clamp(0.9rem,1.5vw,1.2rem)] py-[clamp(0.75rem,1.2vw,1rem)] focus:shadow-[0_12px_30px_-12px_rgba(0,87,217,0.18)] focus:border-[rgba(0,87,217,0.35)] focus:-translate-y-0.5 ${errors.name ? 'border-[#e11d48]' : ''}`}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'err-name' : undefined}
          />
          {errors.name && <p id="err-name" className="mt-2 text-[#e11d48] text-sm">{errors.name}</p>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="cf-email" className="sr-only">Email</label>
          <input
            id="cf-email"
            name="email"
            type="email"
            value={email}
            onChange={e=>setEmail(e.target.value)}
            placeholder="Email"
            className={`w-full rounded-[0.9rem] border border-[rgba(10,25,51,0.08)] bg-white shadow-[0_6px_18px_-10px_rgba(9,25,51,0.08)] text-[#0A1933] text-[clamp(0.9rem,1.2vw,1.05rem)] outline-none transition-all duration-200 px-[clamp(0.9rem,1.5vw,1.2rem)] py-[clamp(0.75rem,1.2vw,1rem)] focus:shadow-[0_12px_30px_-12px_rgba(0,87,217,0.18)] focus:border-[rgba(0,87,217,0.35)] focus:-translate-y-0.5 ${errors.email ? 'border-[#e11d48]' : ''}`}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'err-email' : undefined}
          />
          {errors.email && <p id="err-email" className="mt-2 text-[#e11d48] text-sm">{errors.email}</p>}
        </div>

        <div className="flex flex-col md:col-span-2">
          <label htmlFor="cf-message" className="sr-only">Mensaje</label>
          <textarea
            id="cf-message"
            name="message"
            rows={5}
            value={message}
            onChange={e=>setMessage(e.target.value)}
            placeholder="Mensaje"
            className={`w-full min-h-[120px] sm:min-h-[140px] rounded-[0.9rem] border border-[rgba(10,25,51,0.08)] bg-white shadow-[0_6px_18px_-10px_rgba(9,25,51,0.08)] text-[#0A1933] text-[clamp(0.9rem,1.2vw,1.05rem)] outline-none transition-all duration-200 px-[clamp(0.9rem,1.5vw,1.2rem)] py-[clamp(0.75rem,1.2vw,1rem)] focus:shadow-[0_12px_30px_-12px_rgba(0,87,217,0.18)] focus:border-[rgba(0,87,217,0.35)] focus:-translate-y-0.5 resize-vertical ${errors.message ? 'border-[#e11d48]' : ''}`}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'err-message' : undefined}
          />
          {errors.message && <p id="err-message" className="mt-2 text-[#e11d48] text-sm">{errors.message}</p>}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 md:col-span-2">
          <button
            type="submit"
            className="bg-gradient-to-br from-[#0057D9] to-[#004AB7] text-white px-[clamp(1.2rem,2vw,1.6rem)] py-[clamp(0.75rem,1.2vw,0.95rem)] rounded-[1.25rem] font-extrabold tracking-wide shadow-[0_18px_36px_-12px_rgba(0,87,217,0.35)] transition-all duration-200 w-full sm:w-auto text-[clamp(0.9rem,1.2vw,1.05rem)] hover:translate-y-[-4px] hover:shadow-[0_28px_56px_-18px_rgba(0,87,217,0.35)] disabled:opacity-70 disabled:cursor-not-allowed disabled:shadow-none"
            disabled={status==='sending'}
            aria-busy={status==='sending'}
          >
            {status === 'sending' ? 'Enviando...' : 'Enviar'}
          </button>

          <div aria-live="polite" className="flex items-center gap-2 text-[#0A1933] text-[0.95rem]">
            {status === 'success' && (
              <div className="text-[#059669] font-semibold flex items-center">
                <svg className="inline-block mr-2" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span>¡Mensaje enviado! Te contactaremos pronto.</span>
              </div>
            )}

            {status === 'error' && <span className="text-[#e11d48] font-semibold">{'Ocurrió un error. Intenta de nuevo más tarde.'}</span>}
          </div>
        </div>
      </div>
    </form>
  );
}

"use client"

import { useState, useEffect } from "react";

export default function ContactForm(){
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{[k:string]:string}>({});
  const [status, setStatus] = useState<"idle"|"sending"|"success"|"error">("idle");
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(()=>{
    try{ setPrefersReduced(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); }catch(e){ setPrefersReduced(false) }
  },[]);


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
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2" aria-live="polite">
      <div>
    <label htmlFor="cf-name" className="sr-only">Nombre</label>
    <input id="cf-name" name="name" value={name} onChange={e=>setName(e.target.value)} placeholder="Nombre" className={`w-full rounded-lg border px-4 py-3 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${errors.name? 'border-rose-400 focus-visible:ring-rose-200' : 'border-slate-200 focus-visible:ring-blue-200'}`} />
        {errors.name && <p className="mt-1 text-sm text-rose-600">{errors.name}</p>}
      </div>

      <div>
    <label htmlFor="cf-email" className="sr-only">Email</label>
    <input id="cf-email" name="email" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className={`w-full rounded-lg border px-4 py-3 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${errors.email? 'border-rose-400 focus-visible:ring-rose-200' : 'border-slate-200 focus-visible:ring-blue-200'}`} />
        {errors.email && <p className="mt-1 text-sm text-rose-600">{errors.email}</p>}
      </div>

      <div className="md:col-span-2">
    <label htmlFor="cf-message" className="sr-only">Mensaje</label>
    <textarea id="cf-message" name="message" rows={5} value={message} onChange={e=>setMessage(e.target.value)} placeholder="Mensaje" className={`w-full rounded-lg border px-4 py-3 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${errors.message? 'border-rose-400 focus-visible:ring-rose-200' : 'border-slate-200 focus-visible:ring-blue-200'}`} />
        {errors.message && <p className="mt-1 text-sm text-rose-600">{errors.message}</p>}
      </div>

      <div className="md:col-span-2 flex items-center gap-4">
    <button type="submit" className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-white transition transform ${status==='sending' ? 'bg-slate-400 cursor-wait' : `bg-blue-600 ${prefersReduced ? '' : 'hover:scale-[1.02]'} shadow`}`} disabled={status==='sending'}>
          {status === 'sending' ? 'Enviando...' : 'Enviar'}
        </button>

        <div aria-live="polite" className="flex items-center gap-3">
          {status === 'success' && (
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600 transform transition duration-300 scale-100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <p className="text-sm text-green-600">¡Mensaje enviado! Te contactaremos pronto.</p>
            </div>
          )}

          {status === 'error' && <p className={`text-sm text-rose-600 ${prefersReduced ? '' : 'animate-pulse'}`}>Ocurrió un error. Intenta de nuevo más tarde.</p>}
        </div>
      </div>
    </form>
  );
}

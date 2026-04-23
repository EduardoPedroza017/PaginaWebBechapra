"use client"
import React, { useEffect, useState } from 'react'
import { Button } from "../../components/shared/Button"
import { CheckCircle, AlertTriangle, Loader2, Zap } from 'lucide-react'

interface Props { open: boolean; initialHandle?: string; subserviceId?: string; onClose: ()=>void; onCreated?: (p:any)=>void }

const API = process.env.NEXT_PUBLIC_API_URL

const SubServicePageForm: React.FC<Props> = ({ open, initialHandle, subserviceId, onClose, onCreated }) => {
  const [handle, setHandle] = useState(initialHandle || '')
  const [heroTitle, setHeroTitle] = useState('')
  const [heroSubtitle, setHeroSubtitle] = useState('')
  const [heroImage, setHeroImage] = useState('')
  const [benefits, setBenefits] = useState<any[]>([])
  const [uploading, setUploading] = useState(false)
  const [handleAvailable, setHandleAvailable] = useState<boolean | null>(null)
  const [checkingHandle, setCheckingHandle] = useState(false)
  const [suggestion, setSuggestion] = useState<string | null>(null)
  const [handleCheckTimer, setHandleCheckTimer] = useState<number | null>(null)

  useEffect(()=>{ setHandle(initialHandle||'') }, [initialHandle])

  // When handle changes, debounce and check availability
  useEffect(()=>{
    setSuggestion(null)
    setHandleAvailable(null)
    if (handleCheckTimer) window.clearTimeout(handleCheckTimer)
    if (!handle || !handle.trim()) return undefined
    const t = window.setTimeout(async ()=>{
      setCheckingHandle(true)
      try{
        const res = await fetch(`${API}/api/sub_service_pages/${encodeURIComponent(handle.trim())}`)
        if (res.ok){
          // exists -> fetch all handles and compute a smart suggestion
          setHandleAvailable(false)
          try{
            const listRes = await fetch(`${API}/api/sub_service_pages` + (subserviceId ? `?subservice_id=${encodeURIComponent(subserviceId)}` : ''))
            if (listRes.ok){
              const pages = await listRes.json()
              const handles = pages.map((p:any)=>p.handle)
              // dynamic import of helper
              const { findSuggestion } = await import('../../../../utils/findSuggestion')
              const s = findSuggestion(handle, handles)
              setSuggestion(s)
            }
          }catch(e){
            // fallback: leave suggestion null
            setSuggestion(null)
          }
        } else {
          setHandleAvailable(true)
        }
      }catch(e){
        setHandleAvailable(null)
      }finally{
        setCheckingHandle(false)
      }
    }, 400)
    setHandleCheckTimer(t as unknown as number)
    return () => { if (t) window.clearTimeout(t) }
  }, [handle])

  async function uploadFile(file: File){
    setUploading(true)
    try{
      const fd = new FormData(); fd.append('file', file)
      const res = await fetch(`${API}/api/uploads`, { method: 'POST', body: fd })
      const data = await res.json();
      return data.url || data.filename || ''
    }catch(e){ return '' }finally{ setUploading(false) }
  }

  function addBenefit(){ setBenefits(prev => [...prev, { title:'', description:'', icon:'' }]) }
  function updateBenefit(i:number, key:string, value:any){ setBenefits(prev => prev.map((b,j)=> j===i ? {...b, [key]: value} : b)) }
  function removeBenefit(i:number){ setBenefits(prev => prev.filter((_,j)=>j!==i)) }

  if (!open) return null

  function slugify(v:string){
    return String(v||'').toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'')
  }

  async function createPage(){
    const finalHandle = handle && handle.trim() ? handle.trim() : slugify(heroTitle)
    const payload = { handle: finalHandle, heroTitle, heroSubtitle, heroImage, benefits, subservice_id: subserviceId }
    // Pre-check existing handle to provide better UX
    try{
      const check = await fetch(`${API}/api/sub_service_pages/${encodeURIComponent(finalHandle)}`)
      if (check.ok){
        const existing = await check.json()
        const open = window.confirm('El handle "' + finalHandle + '" ya existe. ¿Quieres abrir la página existente?')
        if (open){ if (onCreated) onCreated(existing); return }
        // otherwise let user edit handle
        return
      }
    }catch(e){ /* ignore, continue to creation */ }

    const res = await fetch(`${API}/api/sub_service_pages`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload) })
    if (res.ok){ const data = await res.json(); if (onCreated) onCreated(data) }
    else {
      try{
        const err = await res.json()
        if (err.error && err.error.toLowerCase().includes('handle ya existe')){
          // try to suggest an alternative handle using existing list
          try{
            const listRes = await fetch(`${API}/api/sub_service_pages` + (subserviceId ? `?subservice_id=${encodeURIComponent(subserviceId)}` : ''))
            if (listRes.ok){
              const pages = await listRes.json()
              const handles = pages.map((p:any)=>p.handle)
              const { findSuggestion } = await import('../../../../utils/findSuggestion')
              const suggested = findSuggestion(finalHandle, handles)
              if (suggested){
                const use = window.confirm('El handle ya existe. Sugerencia disponible: "' + suggested + '". ¿Quieres usarla?')
                if (use){ setHandle(suggested); // retry automatically once
                  return createPage()
                }
              }
            }
          }catch(e){ /* ignore suggestion failure */ }
        }
        alert('Error creating page: ' + (err.error || JSON.stringify(err)))
      }catch(e){ alert('Error creating page') }
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="rounded-lg shadow-lg w-full max-w-3xl p-6 bg-white dark:bg-slate-900">
        <div className="flex justify-between items-start gap-4 mb-4">
          <h2 className="text-xl font-bold">Editor de Página (Subservicio)</h2>
          <button onClick={onClose}>×</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Handle</label>
              <input value={handle} onChange={e=>setHandle(e.target.value)} className="w-full rounded border px-2 py-1" />
              <div className="mt-1 text-sm">
                {checkingHandle && <span className="text-slate-500 flex items-center gap-2" aria-live="polite"><Loader2 className="w-4 h-4 animate-spin text-slate-400" />Comprobando disponibilidad…</span>}
                {handleAvailable === true && !checkingHandle && <span className="text-green-600 flex items-center gap-2"><CheckCircle className="w-4 h-4" />Disponible</span>}
                {handleAvailable === false && !checkingHandle && (
                  <div className="text-red-600">
                    <div className="flex items-center gap-2"><AlertTriangle className="w-4 h-4" /><span>No disponible</span></div>
                    {suggestion && (
                      <div className="mt-1 flex items-center gap-3">
                        <span className="mr-2">Sugerencia: <code className="bg-slate-100 px-1 rounded">{suggestion}</code></span>
                        <button className="text-sm text-blue-600 hover:underline flex items-center gap-2" onClick={()=>{ setHandle(suggestion || ''); setSuggestion(null); }}><Zap className="w-4 h-4" />Usar sugerencia</button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Hero Title</label>
              <input value={heroTitle} onChange={e=>setHeroTitle(e.target.value)} className="w-full rounded border px-2 py-1" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Hero Subtitle</label>
              <input value={heroSubtitle} onChange={e=>setHeroSubtitle(e.target.value)} className="w-full rounded border px-2 py-1" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Hero Image</label>
              <input type="file" accept="image/*" onChange={async (e)=>{ const f = e.target.files?.[0]; if (!f) return; const url = await uploadFile(f); setHeroImage(url) }} />
              {heroImage && <img src={heroImage} alt={heroTitle || 'Hero image'} className="mt-2 w-full h-32 object-cover rounded" />}
            </div>

            <div className="border-t pt-2">
              <h4 className="font-semibold mb-2">Benefits</h4>
              {benefits.map((b,i)=> (
                <div key={i} className="mb-2 border rounded p-2">
                  <input className="w-full mb-1 rounded border px-2 py-1" placeholder="Título" value={b.title} onChange={e=>updateBenefit(i,'title',e.target.value)} />
                  <textarea className="w-full mb-1 rounded border px-2 py-1" placeholder="Descripción" value={b.description} onChange={e=>updateBenefit(i,'description',e.target.value)} />
                  <div className="flex gap-2">
                    <input type="file" accept="image/*" onChange={async (e)=>{ const f = e.target.files?.[0]; if (!f) return; const url = await uploadFile(f); updateBenefit(i,'icon',url) }} />
                    <button className="px-2 py-1 bg-red-100" onClick={()=>removeBenefit(i)}>Eliminar</button>
                  </div>
                </div>
              ))}
              <button className="px-3 py-1 mt-2" onClick={addBenefit}>Agregar benefit</button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Preview</h4>
            <div className="rounded-lg overflow-hidden border">
              <div className="h-40 bg-gray-100 relative">
                {heroImage ? <img src={heroImage} alt={heroTitle || 'Hero image'} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-slate-400">Sin imagen</div>}
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold">{heroTitle || 'Título de ejemplo'}</h3>
                  <p className="text-sm">{heroSubtitle || 'Subtítulo de ejemplo'}</p>
                </div>
              </div>
              <div className="p-4">
                <h5 className="font-bold mb-2">Beneficios</h5>
                <div className="grid grid-cols-1 gap-2">
                  {benefits.length === 0 && <div className="text-slate-400">No hay beneficios</div>}
                  {benefits.map((b,i)=> (
                    <div key={i} className="flex gap-2 items-start">
                      {b.icon && <img src={b.icon} alt={b.title} className="w-10 h-10 object-contain" />}
                      <div>
                        <div className="font-semibold">{b.title}</div>
                        <div className="text-sm text-slate-600">{b.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex gap-2 justify-end">
          <Button variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button onClick={createPage} disabled={handleAvailable === false}>Crear Página</Button>
        </div>
      </div>
    </div>
  )
}

export default SubServicePageForm

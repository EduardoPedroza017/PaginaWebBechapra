"use client"
import React, { useEffect, useState } from 'react'
import { Button } from "../../components/shared/Button"
import ServicePagePreview from './ServicePagePreview'

interface Props {
  open: boolean
  initialHandle?: string
  onClose: () => void
  onCreated?: (page: any) => void
  onContinue?: (handle?: string) => void
}

export const ServicePageForm: React.FC<Props> = ({ open, initialHandle, onClose, onCreated }) => {
  const [handle, setHandle] = useState(initialHandle || '')
  const [heroTitle, setHeroTitle] = useState('')
  const [heroSubtitle, setHeroSubtitle] = useState('')
  const [heroImage, setHeroImage] = useState('')
  const [benefits, setBenefits] = useState<Array<{title:string,description?:string,icon?:string}>>([])
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [galleryImages, setGalleryImages] = useState<string[]>([])
  const API = (process.env.NEXT_PUBLIC_API_URL as string) || 'http://localhost:5000'

  useEffect(() => setHandle(initialHandle || ''), [initialHandle])

  useEffect(() => {
    if (!galleryOpen) return
    fetch(`${API}/api/gallery`).then(r => r.json()).then(d => {
      if (Array.isArray(d.images)) setGalleryImages(d.images)
      else if (Array.isArray(d)) setGalleryImages(d.map((it:any)=>it.filename))
    }).catch(()=>{})
  }, [galleryOpen, API])

  function addBenefit() { setBenefits(prev => [...prev, { title: 'Nuevo beneficio', description: '' }]) }
  function updateBenefit(i:number, k:keyof typeof benefits[0], v:any) { setBenefits(prev=> prev.map((b,idx)=> idx===i ? {...b,[k]:v} : b)) }
  function removeBenefit(i:number){ setBenefits(prev=> prev.filter((_,idx)=> idx!==i)) }

  async function handleSubmit(e:React.FormEvent){
    e.preventDefault()
    const payload = { handle, heroTitle, heroSubtitle, heroImage, benefits }
    try{
      const res = await fetch(`${API}/api/service_pages`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload), credentials: 'include' })
      const data = await res.json()
      if (res.ok){
        onCreated?.(data)
        onClose()
      } else {
        alert(data.error || 'Error creando la página')
      }
    }catch(e){ console.error(e); alert('Error de red') }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-6">
      <div className="bg-black/40 absolute inset-0" onClick={onClose} />
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl shadow-lg overflow-auto max-h-[90vh]">
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <form className="space-y-3" onSubmit={handleSubmit}>
            <h3 className="text-xl font-bold">Crear página de servicio</h3>
            <label className="block text-sm">Handle (clave única)</label>
            <input className="w-full rounded border px-2 py-1" value={handle} onChange={e=>setHandle(e.target.value)} />

            <label className="block text-sm">Título hero</label>
            <input className="w-full rounded border px-2 py-1" value={heroTitle} onChange={e=>setHeroTitle(e.target.value)} />

            <label className="block text-sm">Subtítulo</label>
            <textarea className="w-full rounded border px-2 py-1" value={heroSubtitle} onChange={e=>setHeroSubtitle(e.target.value)} />

            <label className="block text-sm">Imagen hero</label>
            <div className="flex gap-2">
              <input type="file" accept="image/*" onChange={e=>{ const f = e.target.files?.[0]; if(f) setHeroImage(URL.createObjectURL(f)) }} className="flex-1" />
              <button type="button" className="px-3 py-1 rounded bg-slate-200" onClick={()=>setGalleryOpen(true)}>Galería</button>
            </div>

            <div>
              <h4 className="font-semibold mt-3">Beneficios</h4>
              <div className="space-y-2 mt-2">
                {benefits.map((b,i)=> (
                  <div key={i} className="p-2 border rounded">
                    <input className="w-full mb-1 rounded border px-2 py-1" value={b.title} onChange={e=>updateBenefit(i,'title', e.target.value)} />
                    <textarea className="w-full rounded border px-2 py-1" value={b.description} onChange={e=>updateBenefit(i,'description', e.target.value)} />
                    <div className="flex gap-2 mt-2">
                      <button type="button" className="px-2 py-1 bg-red-600 text-white rounded" onClick={()=>removeBenefit(i)}>Eliminar</button>
                    </div>
                  </div>
                ))}
                <button type="button" className="px-3 py-1 bg-blue-600 text-white rounded" onClick={addBenefit}>Añadir beneficio</button>
              </div>
            </div>

            <div className="flex gap-2 justify-end mt-4">
              <button type="button" className="px-4 py-2 rounded border" onClick={onClose}>Cancelar</button>
              <Button type="submit">Crear página</Button>
            </div>
          </form>

          <div>
            <h4 className="font-semibold mb-3">Previsualización</h4>
            <ServicePagePreview heroTitle={heroTitle} heroSubtitle={heroSubtitle} heroImage={heroImage} benefits={benefits} theme={'dark'} />
          </div>
        </div>

        {/* Galería modal */}
        {galleryOpen && (
          <div className="p-4 border-t">
            <h5 className="font-semibold mb-2">Seleccionar imagen de galería</h5>
            <div className="grid grid-cols-4 gap-2">
              {galleryImages.length===0 && <div>No hay imágenes</div>}
              {galleryImages.map(img=> (
                <img key={img} src={`${API}/gallery/image/${encodeURIComponent(img)}`} className="w-full h-20 object-cover rounded cursor-pointer" onClick={()=>{ setHeroImage(`${API}/gallery/image/${encodeURIComponent(img)}`); setGalleryOpen(false)}} />
              ))}
            </div>
            <div className="mt-2">
              <button className="px-3 py-1 rounded" onClick={()=>setGalleryOpen(false)}>Cerrar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ServicePageForm

"use client"
import React, { useEffect, useState } from 'react'
import { Button } from "../../components/shared/Button"
import { FormInput } from "../../components/shared/FormInput"
import { TranslateText } from '@/components/TranslateText'

interface Props {
  initialData?: any
  onSubmit: (d: any) => void
  onCancel: () => void
  onContinue?: (handle?: string) => void
}

const API = process.env.NEXT_PUBLIC_API_URL;

export const SubServiceForm: React.FC<Props> = ({ initialData, onSubmit, onCancel, onContinue }) => {
  const [form, setForm] = useState<any>(initialData || { title: '', shortDescription: '', icon: '', heroImage: '', handle: '', service_id: '' })
  const [services, setServices] = useState<any[]>([])
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetch(`${API}/api/services/cards`, { credentials: 'include' })
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          setServices(data);
        } else if (data && Array.isArray(data.items)) {
          setServices(data.items);
        } else {
          setServices([]);
        }
      })
      .catch(()=>{})
  }, [])

  useEffect(()=>{ if (initialData) setForm(initialData) }, [initialData])

  function handleChange(e: any){
    const { name, value } = e.target
    setForm((p:any)=> ({ ...p, [name]: value }))
  }

  async function handleFileUpload(file: File){
    setUploading(true)
    try{
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch(`${API}/api/uploads`, { method: 'POST', body: fd })
      const data = await res.json()
      return data.url || data.filename || ''
    }catch(err){
      console.error('upload error', err)
      return ''
    }finally{ setUploading(false) }
  }

  return (
    <div>
      <form onSubmit={(e)=>{ e.preventDefault(); onSubmit(form) }} className="space-y-4">
        <FormInput label="Título" name="title" value={form.title||''} onChange={handleChange} required />
        <FormInput label="Descripción corta" name="shortDescription" value={form.shortDescription||''} onChange={handleChange} />
        <FormInput label="Handle" name="handle" value={form.handle||''} onChange={handleChange} />

        <div>
          <label className="block text-sm font-medium mb-1">Servicio padre</label>
          <select name="service_id" value={form.service_id||''} onChange={handleChange} className="w-full rounded border px-2 py-1">
            <option value="">-- Ninguno --</option>
            {services.map(s=> <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Icono</label>
          <input type="file" accept="image/*" onChange={async (e)=>{
            const f = e.target.files?.[0]; if (!f) return
            const url = await handleFileUpload(f)
            setForm((p:any)=>({...p, icon: url}))
          }} />
          {form.icon && <div className="mt-2"><img src={form.icon} alt="Sub-service icon" className="w-10 h-10 object-contain"/></div>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Imagen</label>
          <input type="file" accept="image/*" onChange={async (e)=>{
            const f = e.target.files?.[0]; if (!f) return
            const url = await handleFileUpload(f)
            setForm((p:any)=>({...p, heroImage: url}))
          }} />
          {form.heroImage && <div className="mt-2"><img src={form.heroImage} alt={form.title ? `${form.title} hero image` : 'Sub-service hero image'} className="w-48 h-24 object-cover"/></div>}
        </div>

        <div className="flex gap-2 justify-end">
          <Button type="button" variant="secondary" onClick={onCancel}><TranslateText text="Cancelar"/></Button>
          <Button type="submit"><TranslateText text="Guardar"/></Button>
          <Button type="button" onClick={()=>{ if (typeof onContinue === 'function') onContinue(form.handle) }}>
            <TranslateText text="Editar página"/>
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SubServiceForm

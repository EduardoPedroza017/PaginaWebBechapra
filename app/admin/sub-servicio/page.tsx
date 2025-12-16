"use client";
import React, { useEffect, useState } from "react";
import { Sidebar } from "../dashboard/Sidebar";
import { Header } from "../dashboard/Header";
import { Button } from "../components/shared/Button";
import { TranslateText } from "@/components/TranslateText";
import SubServiceTable from "./components/SubServiceTable";
import SubServiceEditModal from "./components/SubServiceEditModal";
import SubServicePageForm from "./components/SubServicePageForm";

export default function SubServicioAdminPage(){
  const [subs, setSubs] = useState<any[]>([])
  const [servicesMap, setServicesMap] = useState<Record<string,string>>({})
  const [loading, setLoading] = useState(true)
  const [editOpen, setEditOpen] = useState(false)
  const [editData, setEditData] = useState<any>(undefined)
  const [pageFormOpen, setPageFormOpen] = useState(false)
  const [pageInitialHandle, setPageInitialHandle] = useState<string | undefined>(undefined)
  const [pageSubserviceId, setPageSubserviceId] = useState<string | undefined>(undefined)

  async function fetchSubs(){
    setLoading(true)
    const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
    try{
      const res = await fetch(`${API}/api/sub_services`, { credentials: 'include' })
      const data = await res.json()
      setSubs(data)
      // also fetch services to map id -> slug
      try{
        const sres = await fetch(`${API}/api/services/cards`, { credentials: 'include' })
        const sdata = await sres.json()
        const servicesById: Record<string,string> = {}
        if (Array.isArray(sdata)) {
          sdata.forEach((s:any) => { if (s.id && s.slug) servicesById[s.id] = s.slug })
        }
        setServicesMap(servicesById)
      }catch(err){ }
    }catch(e){}
    setLoading(false)
  }

  useEffect(()=>{ fetchSubs() }, [])

  function handleNew(){ setEditData(undefined); setEditOpen(true) }

  function handleEdit(s:any){ setEditData(s); setEditOpen(true) }

  async function handleSave(d:any){
    const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
    if (d.id){
      await fetch(`${API}/api/sub_services/${d.id}`, { method: 'PUT', headers: {'Content-Type':'application/json'}, credentials:'include', body: JSON.stringify(d) })
      // open page editor
      setPageInitialHandle(d.handle)
      setPageSubserviceId(d.id)
      setPageFormOpen(true)
    } else {
      const res = await fetch(`${API}/api/sub_services`, { method: 'POST', headers: {'Content-Type':'application/json'}, credentials:'include', body: JSON.stringify(d) })
      if (res.ok){ const created = await res.json(); setPageInitialHandle(created.handle || created.title); setPageSubserviceId(created.id || created._id); setPageFormOpen(true) }
    }
    setEditOpen(false)
    fetchSubs()
  }

  async function handleDelete(s:any){
    if (!confirm('Eliminar subservicio?')) return
    const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
    await fetch(`${API}/api/sub_services/${s.id}`, { method: 'DELETE', credentials: 'include' })
    fetchSubs()
  }

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900">
      <Sidebar selected="/admin/sub-servicio" theme="dark" />
      <div className="flex-1 flex flex-col">
        <Header theme="dark" onLogout={()=>{}} onToggleTheme={()=>{}} />
        <main className="max-w-5xl mx-auto py-10 px-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold"><TranslateText text="Subservicios"/></h1>
            <Button onClick={handleNew}><TranslateText text="Nuevo Subservicio"/></Button>
          </div>
          {loading ? <div>Cargando...</div> : (
            <SubServiceTable subservices={subs} onEdit={handleEdit} onDelete={handleDelete} servicesMap={servicesMap} />
          )}

          <SubServiceEditModal open={editOpen} initialData={editData} onClose={()=>setEditOpen(false)} onSave={handleSave} onContinue={(h)=>{ setPageInitialHandle(h); setPageSubserviceId(editData?.id); setPageFormOpen(true); setEditOpen(false) }} />

          <SubServicePageForm open={pageFormOpen} initialHandle={pageInitialHandle} subserviceId={pageSubserviceId} onClose={()=>setPageFormOpen(false)} onCreated={(p)=>{ console.log('page created', p); setPageFormOpen(false) }} />
        </main>
      </div>
    </div>
  )
}

"use client";
import React, { useEffect, useState } from "react";
import SearchBar from "../servicios/components/SearchBar";
import { Sidebar } from "../dashboard/Sidebar";
import { Header } from "../dashboard/Header";
import { Button } from "../components/shared/Button";
import { TranslateText } from "@/components/TranslateText";
import { Plus } from 'lucide-react'
import SubServiceTable from "./components/SubServiceTable";
import SubServiceSkeleton from "./components/SubServiceSkeleton";
import EmptyState from "./components/EmptyState";
import SubServiceEditModal from "./components/SubServiceEditModal";
import SubServicePageForm from "./components/SubServicePageForm";
import ConfirmModal from '@/components/ConfirmModal'
import SubServicePreviewModal from './components/SubServicePreviewModal'
import Toast from '@/components/Toast'

export default function SubServicioAdminPage(){
  const [subs, setSubs] = useState<any[]>([])
  const [servicesMap, setServicesMap] = useState<Record<string,string>>({})
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [serviceFilter, setServiceFilter] = useState<string | null>(null)
  const [publishFilter, setPublishFilter] = useState<'all'|'published'|'unpublished'>('all')
  const [serviceOptions, setServiceOptions] = useState<Array<{id:string; name:string}>>([])
  const [searchDebounceTimer, setSearchDebounceTimer] = useState<number | null>(null)
  const [editOpen, setEditOpen] = useState(false)
  const [editData, setEditData] = useState<any>(undefined)
  const [pageFormOpen, setPageFormOpen] = useState(false)
  const [pageInitialHandle, setPageInitialHandle] = useState<string | undefined>(undefined)
  const [pageSubserviceId, setPageSubserviceId] = useState<string | undefined>(undefined)

  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewData, setPreviewData] = useState<any>(null)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [confirmTarget, setConfirmTarget] = useState<any>(null)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [toastOpen, setToastOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastActionLabel, setToastActionLabel] = useState<string | undefined>(undefined)
  const [deletedCandidate, setDeletedCandidate] = useState<any | null>(null)
  const [undoCandidate, setUndoCandidate] = useState<any | null>(null)
  const [toastType, setToastType] = useState<'delete'|'toggle'|null>(null)

  async function fetchSubs(){
    setLoading(true)
    const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
    try{
      const params = new URLSearchParams()
      if (query) params.set('search', query)
      if (serviceFilter) params.set('service_id', serviceFilter)
      const res = await fetch(`${API}/api/sub_services?${params.toString()}`, { credentials: 'include' })
      const data = await res.json()
      // Normalize API response: accept raw array or paginated object { items, ... }
      if (Array.isArray(data)) {
        setSubs(data)
      } else if (data && Array.isArray((data as any).items)) {
        setSubs((data as any).items)
      } else {
        setSubs([])
      }
      // also fetch services to map id -> slug
      try {
        const sres = await fetch(`${API}/api/services/cards`, { credentials: 'include' });
        const sdata = await sres.json();
        const servicesById: Record<string, string> = {};
        const options: Array<{ id: string; name: string }> = [];

        if (Array.isArray(sdata)) {
          sdata.forEach((s: any) => {
            if (s.id && s.slug) servicesById[s.id] = s.slug;
            if (s.id && s.name) options.push({ id: s.id, name: s.name });
          });
        } else {
          console.warn('Expected array for services, received:', sdata);
        }

        console.log('Fetched services data:', sdata);

        setServicesMap(servicesById);
        setServiceOptions(options);
      } catch (err) {
        console.error('Error fetching services:', err);
        setServicesMap({});
        setServiceOptions([]);
      }
    }catch(e){}
    setLoading(false)
  }

  useEffect(()=>{ fetchSubs() }, [])

  function handleNew(){ setEditData(undefined); setEditOpen(true) }

  function handleEdit(s:any){ setEditData(s); setEditOpen(true) }

  function handlePreview(s:any){ setPreviewData(s); setPreviewOpen(true) }

  function handleDeletePrompt(s:any){ setConfirmTarget(s); setConfirmOpen(true) }

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

  async function handleToggleActive(s:any, next:boolean){
    // optimistic update locally
    setSubs(prev => prev.map(p => p.id === s.id ? { ...p, active: next } : p))
    const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
    try{
      const res = await fetch(`${API}/api/sub_services/${s.id}/activate`, { method: 'PATCH', headers: {'Content-Type':'application/json'}, credentials:'include', body: JSON.stringify({ active: next }) })
      if (!res.ok) throw new Error('Failed')
      // show undo toast
      setUndoCandidate({ id: s.id, prev: s.active })
      setToastMessage(next ? 'Subservicio activado' : 'Subservicio desactivado')
      setToastActionLabel('Deshacer')
      setToastOpen(true)
      setToastType('toggle')
      // Refresh list to ensure consistency
      fetchSubs()
    }catch(e){
      alert('Error toggling active')
      // revert optimistic
      setSubs(prev => prev.map(p => p.id === s.id ? { ...p, active: s.active } : p))
    }
  }

  async function handleUndoDelete(){
    if (!deletedCandidate) return
    const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
    try{
      const copy = { ...deletedCandidate }
      delete copy.id
      delete copy._id
      const res = await fetch(`${API}/api/sub_services`, { method: 'POST', headers: {'Content-Type':'application/json'}, credentials:'include', body: JSON.stringify(copy) })
      if (!res.ok) throw new Error('Undo failed')
      setToastOpen(false)
      setDeletedCandidate(null)
      setToastType(null)
      fetchSubs()
    }catch(e){ alert('Error al deshacer') }
  }

  async function handleUndoToggle(){
    if (!undoCandidate) return
    const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
    try{
      const res = await fetch(`${API}/api/sub_services/${undoCandidate.id}/activate`, { method: 'PATCH', headers: {'Content-Type':'application/json'}, credentials:'include', body: JSON.stringify({ active: undoCandidate.prev }) })
      if (!res.ok) throw new Error('Undo failed')
      setToastOpen(false)
      setUndoCandidate(null)
      setToastType(null)
      fetchSubs()
    }catch(e){ alert('Error al deshacer') }
  }

  async function handleDelete(s:any){
    if (!s || !s.id) return
    setDeleteLoading(true)
    const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
    try{
      const res = await fetch(`${API}/api/sub_services/${s.id}`, { method: 'DELETE', credentials: 'include' })
      if (!res.ok) throw new Error('Delete failed')
      // store candidate so we can undo
      setDeletedCandidate(s)
      setToastMessage('Subservicio eliminado')
      setToastActionLabel('Deshacer')
      setToastOpen(true)
      setToastType('delete')
      setDeletedCandidate(s)
      setConfirmOpen(false)
      setConfirmTarget(null)
      fetchSubs()
    }catch(e){ alert('Error eliminando subservicio') }
    setDeleteLoading(false)
  }

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900">
      <Sidebar selected="/admin/sub-servicio" theme="dark" />
      <div className="flex-1 flex flex-col">
        <Header theme="dark" onLogout={()=>{}} onToggleTheme={()=>{}} />
        <main className="max-w-5xl mx-auto py-10 px-4">
          <div className="mb-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold"><TranslateText text="Subservicios"/></h1>
                <p className="text-sm text-slate-400">Administra tus subservicios</p>
              </div>
              <div className="flex items-center gap-3">
                <Button onClick={handleNew} className="inline-flex items-center gap-2"><Plus className="w-4 h-4"/> <span><TranslateText text="Nuevo Subservicio"/></span></Button>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              <div className="rounded-md p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="text-sm text-slate-500">Total</div>
                <div className="text-2xl font-bold mt-1">{subs.length}</div>
              </div>
              <div className="rounded-md p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="text-sm text-slate-500">Publicados</div>
                <div className="text-2xl font-bold mt-1">{subs.filter(s=>s.published).length}</div>
              </div>
              <div className="rounded-md p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="text-sm text-slate-500">No Publicados</div>
                <div className="text-2xl font-bold mt-1">{subs.filter(s=>!s.published).length}</div>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="w-full sm:w-64">
                <div className="flex items-center gap-2 bg-white dark:bg-slate-800 p-2 rounded border border-slate-200 dark:border-slate-700">
                  <SearchBar value={query} onChange={(q)=>{ setQuery(q); if (searchDebounceTimer) window.clearTimeout(searchDebounceTimer); const t = window.setTimeout(()=>{ fetchSubs(); setSearchDebounceTimer(null); }, 300); setSearchDebounceTimer(t as unknown as number); }} />
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
                <div className="inline-flex rounded-md shadow-sm" role="tablist" aria-label="Filtro publicar">
                  <button onClick={()=>setPublishFilter('all')} className={`px-3 py-1 rounded-l-md border ${publishFilter==='all' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'}`}>Todos</button>
                  <button onClick={()=>setPublishFilter('published')} className={`px-3 py-1 border ${publishFilter==='published' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'}`}>Publicados</button>
                  <button onClick={()=>setPublishFilter('unpublished')} className={`px-3 py-1 rounded-r-md border ${publishFilter==='unpublished' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'}`}>No Publicados</button>
                </div>

                <select className="rounded border px-2 py-1 text-sm ml-2" value={serviceFilter||''} onChange={(e)=>{ setServiceFilter(e.target.value || null); if (searchDebounceTimer) window.clearTimeout(searchDebounceTimer); const t = window.setTimeout(()=>{ fetchSubs(); setSearchDebounceTimer(null); }, 150); setSearchDebounceTimer(t as unknown as number); }}>
                  <option value="">Todos los servicios</option>
                  {serviceOptions.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>

              <div className="ml-auto text-sm text-slate-500 mt-2 sm:mt-0">{subs.filter(s => {
                if (publishFilter === 'published') return s.published
                if (publishFilter === 'unpublished') return !s.published
                return true
              }).length} resultados</div>
            </div>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Array.from({length:6}).map((_,i)=> <SubServiceSkeleton key={i} />)}
            </div>
          ) : (
            subs.length === 0 ? (
              <EmptyState onCreate={handleNew} />
            ) : (
              <SubServiceTable subservices={subs.filter(s => {
                if (publishFilter === 'published') return s.published
                if (publishFilter === 'unpublished') return !s.published
                return true
              }).filter(s => {
                if (!serviceFilter) return true
                return s.service_id === serviceFilter
              }).filter(s => {
                if (!query) return true
                const q = query.toLowerCase()
                return (s.title||'').toLowerCase().includes(q) || (s.handle||'').toLowerCase().includes(q) || (s.shortDescription||'').toLowerCase().includes(q)
              })} onEdit={handleEdit} onDelete={handleDeletePrompt} onPreview={handlePreview} onToggleActive={handleToggleActive} servicesMap={servicesMap} />
            )
          )}

          <SubServiceEditModal open={editOpen} initialData={editData} onClose={()=>setEditOpen(false)} onSave={handleSave} onContinue={(h)=>{ setPageInitialHandle(h); setPageSubserviceId(editData?.id); setPageFormOpen(true); setEditOpen(false) }} />

          <SubServicePageForm open={pageFormOpen} initialHandle={pageInitialHandle} subserviceId={pageSubserviceId} onClose={()=>setPageFormOpen(false)} onCreated={(p)=>{ console.log('page created', p); setPageFormOpen(false) }} />

          <SubServicePreviewModal open={previewOpen} data={previewData} onClose={()=>{ setPreviewOpen(false); setPreviewData(null) }} />

          <ConfirmModal open={confirmOpen} title="Eliminar subservicio" description={confirmTarget ? `Vas a eliminar "${confirmTarget.title}". Esta acción no se puede deshacer.` : ''} confirmLabel="Eliminar" cancelLabel="Cancelar" loading={deleteLoading} onClose={()=>{ setConfirmOpen(false); setConfirmTarget(null) }} onConfirm={()=>handleDelete(confirmTarget)} />

          {/* toast */}
          {/** dynamically import to keep bundle small */}
          <React.Suspense fallback={null}>
            <Toast open={toastOpen} message={toastMessage} actionLabel={toastActionLabel} timeout={6000} onAction={toastType === 'delete' ? handleUndoDelete : handleUndoToggle} onClose={()=>{ setToastOpen(false); setDeletedCandidate(null); setUndoCandidate(null); setToastType(null) }} />
          </React.Suspense>

          

          <SubServicePreviewModal open={previewOpen} data={previewData} onClose={()=>{ setPreviewOpen(false); setPreviewData(null) }} />

          <ConfirmModal open={confirmOpen} title="Eliminar subservicio" description={confirmTarget ? `Vas a eliminar "${confirmTarget.title}". Esta acción no se puede deshacer.` : ''} confirmLabel="Eliminar" cancelLabel="Cancelar" loading={deleteLoading} onClose={()=>{ setConfirmOpen(false); setConfirmTarget(null) }} onConfirm={()=>handleDelete(confirmTarget)} />
        </main>
      </div>
    </div>
  )
}

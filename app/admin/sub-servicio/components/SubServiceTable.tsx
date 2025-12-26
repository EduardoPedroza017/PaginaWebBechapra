"use client"
import React, { useState } from 'react'
import { Button } from "../../components/shared/Button"
import { Eye, Edit, Trash2, ExternalLink, Briefcase, CheckCircle, ToggleLeft } from 'lucide-react'

export const SubServiceTable: React.FC<any> = ({ subservices, onEdit, onDelete, onPreview, onToggleActive, servicesMap }) => {
  const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({})

  async function toggle(s:any, next:boolean){
    setLoadingMap(prev => ({ ...prev, [s.id]: true }))
    try{
      if (typeof onToggleActive === 'function') await onToggleActive(s, next)
    }finally{
      setLoadingMap(prev => ({ ...prev, [s.id]: false }))
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {subservices.map((s:any)=> {
        const svcSlug = servicesMap?.[s.service_id] || s.service_handle
        const isLoading = !!loadingMap[s.id]
        return (
          <div key={s.id} className="p-0 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:shadow-lg transition-shadow duration-150 overflow-hidden">
            <div className="flex flex-col sm:flex-row">
              <div className="w-full sm:w-36 h-40 sm:h-28 bg-gray-100 dark:bg-slate-700 flex items-center justify-center">
                {s.heroImage ? <img src={s.heroImage} className="w-full h-full object-cover"/> : <div className="flex items-center gap-2 text-slate-400"><svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18M3 12h18M3 17h18"/></svg></div>}
              </div>
              <div className="flex-1 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <h4 className="font-bold text-lg">{s.title}</h4>
                      <div className="hidden sm:block">
                        <button role="switch" aria-checked={!!s.active} onClick={()=>toggle(s, !s.active)} disabled={isLoading} className={`relative inline-flex items-center ${s.active ? 'bg-emerald-600' : 'bg-slate-200 dark:bg-slate-700'} rounded-full w-14 h-7 p-1 transition-colors duration-200`} title={s.active ? 'Desactivar' : 'Activar'}>
                          {/* knob */}
                          <span className={`inline-block w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 ${s.active ? 'translate-x-7' : 'translate-x-0'} flex items-center justify-center`}>{isLoading ? <svg className="w-4 h-4 animate-spin text-slate-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg> : <ToggleLeft className={`w-4 h-4 ${s.active ? 'text-emerald-600' : 'text-slate-400'}`} />}</span>
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 line-clamp-3 mt-2">{s.shortDescription}</p>
                    <div className="mt-3 flex items-center gap-2">
                      {svcSlug && <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded inline-flex items-center gap-2"><Briefcase className="w-3 h-3"/> {svcSlug}</span>}
                      {s.published && <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded inline-flex items-center gap-2"><CheckCircle className="w-3 h-3"/> Publicado</span>}
                    </div>
                  </div>
                  <div className="text-right sm:hidden mt-3">
                    {/* mobile switch */}
                    <button role="switch" aria-checked={!!s.active} onClick={()=>toggle(s, !s.active)} disabled={isLoading} className={`relative inline-flex items-center ${s.active ? 'bg-emerald-600' : 'bg-slate-200 dark:bg-slate-700'} rounded-full w-14 h-7 p-1 transition-colors duration-200`} title={s.active ? 'Desactivar' : 'Activar'}>
                      <span className={`inline-block w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 ${s.active ? 'translate-x-7' : 'translate-x-0'} flex items-center justify-center`}>{isLoading ? <svg className="w-4 h-4 animate-spin text-slate-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg> : <ToggleLeft className={`w-4 h-4 ${s.active ? 'text-emerald-600' : 'text-slate-400'}`} />}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-3 border-t border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 grid grid-cols-1 sm:grid-cols-4 gap-2">
              <a href={svcSlug ? `/servicios/${svcSlug}/${s.handle}` : `/subservicios/${s.handle}`} target="_blank" rel="noopener noreferrer" className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-200" title="Abrir en sitio público"><ExternalLink className="w-4 h-4"/>Abrir</a>
              <button className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border" title="Vista" onClick={()=>onPreview && onPreview(s)}><Eye className="w-4 h-4"/>Vista</button>
              <button className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded bg-blue-600 text-white" onClick={()=>onEdit(s)}><Edit className="w-4 h-4"/>Editar</button>
              <button className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded bg-red-600 text-white" onClick={()=>onDelete(s)}><Trash2 className="w-4 h-4"/>Eliminar</button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default SubServiceTable

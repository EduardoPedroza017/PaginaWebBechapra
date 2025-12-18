"use client"
import React from 'react'
import { Button } from "../../components/shared/Button"

export const SubServiceTable: React.FC<any> = ({ subservices, onEdit, onDelete, servicesMap }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {subservices.map((s:any)=> {
        const svcSlug = servicesMap?.[s.service_id] || s.service_handle
        const publicUrl = svcSlug ? `/servicios/${svcSlug}/${s.handle}` : `/subservicios/${s.handle}`
        return (
          <div key={s.id} className="p-4 rounded-lg border bg-white dark:bg-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-start gap-3">
                {s.icon && <img src={s.icon} className="w-12 h-12 object-contain rounded" />}
                <div className="flex-1">
                  <h4 className="font-bold text-lg">{s.title}</h4>
                  <p className="text-sm text-slate-600 line-clamp-3">{s.shortDescription}</p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {svcSlug && <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">Servicio: {svcSlug}</span>}
                {s.published && <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded">Publicado</span>}
              </div>
            </div>
            <div className="mt-4 flex gap-2 justify-end">
              <a href={publicUrl} target="_blank" rel="noopener noreferrer" className="px-3 py-1 rounded bg-blue-50 text-blue-700">Ver más</a>
              <Button onClick={()=>onEdit(s)}>Editar</Button>
              <Button variant="danger" onClick={()=>onDelete(s)}>Eliminar</Button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default SubServiceTable

"use client"
import React from 'react'
import SubServiceForm from './SubServiceForm'

interface Props { open: boolean; initialData?: any; onClose: ()=>void; onSave: (d:any)=>void; onContinue?: (h?:string)=>void }

export const SubServiceEditModal: React.FC<Props> = ({ open, initialData, onClose, onSave, onContinue }) => {
  if (!open) return null
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="rounded-lg shadow-lg w-full max-w-3xl p-6 bg-white dark:bg-slate-900">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{initialData ? 'Editar Subservicio' : 'Nuevo Subservicio'}</h2>
          <button onClick={onClose}>×</button>
        </div>
        <SubServiceForm initialData={initialData} onSubmit={onSave} onCancel={onClose} onContinue={onContinue} />
      </div>
    </div>
  )
}

export default SubServiceEditModal

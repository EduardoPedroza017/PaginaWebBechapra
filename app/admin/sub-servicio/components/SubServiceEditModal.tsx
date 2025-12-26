"use client"
import React, { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { X, Eye } from 'lucide-react'
import SubServiceForm from './SubServiceForm'
import SubServicePreviewModal from './SubServicePreviewModal'

interface Props { open: boolean; initialData?: any; onClose: ()=>void; onSave: (d:any)=>void; onContinue?: (h?:string)=>void }

export const SubServiceEditModal: React.FC<Props> = ({ open, initialData, onClose, onSave, onContinue }) => {
  const [previewOpen, setPreviewOpen] = useState(false)
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={onClose}>
        <div className="flex items-center justify-center min-h-screen px-4">
          <Transition.Child as={Fragment} enter="transition-opacity duration-200" enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity duration-150" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
          </Transition.Child>

          <Transition.Child as={Fragment} enter="transition-transform duration-200" enterFrom="opacity-0 scale-95 translate-y-2" enterTo="opacity-100 scale-100 translate-y-0" leave="transition-transform duration-150" leaveFrom="opacity-100 scale-100 translate-y-0" leaveTo="opacity-0 scale-95 translate-y-2">
            <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6 z-10">
              <button onClick={onClose} className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                <X className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              </button>
              <div className="flex items-center justify-between gap-4 mb-4">
                <h2 className="text-xl font-bold">{initialData ? 'Editar Subservicio' : 'Nuevo Subservicio'}</h2>
                <div className="flex items-center gap-2">
                  <button title="Vista previa" onClick={()=>setPreviewOpen(true)} className="px-3 py-1 rounded bg-blue-50 text-blue-700 flex items-center gap-2"><Eye className="w-4 h-4"/>Vista previa</button>
                </div>
              </div>
              <SubServiceForm initialData={initialData} onSubmit={onSave} onCancel={onClose} onContinue={onContinue} />
            </div>
          </Transition.Child>
        </div>
        <SubServicePreviewModal open={previewOpen} data={initialData || {}} onClose={()=>setPreviewOpen(false)} />
      </Dialog>
    </Transition>
  )
}

export default SubServiceEditModal

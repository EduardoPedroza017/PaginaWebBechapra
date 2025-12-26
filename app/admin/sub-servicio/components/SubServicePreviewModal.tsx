"use client"
import React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { X, Image as ImageIcon } from 'lucide-react'
import { Fragment } from 'react'

interface Props { open:boolean; data:any; onClose: ()=>void }

const SubServicePreviewModal: React.FC<Props> = ({ open, data, onClose }) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={onClose}>
        <div className="flex items-center justify-center min-h-screen px-4">
          <Transition.Child as={Fragment} enter="transition-opacity duration-200" enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity duration-150" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
          </Transition.Child>

          <Transition.Child as={Fragment} enter="transition-transform duration-200" enterFrom="opacity-0 scale-95 translate-y-2" enterTo="opacity-100 scale-100 translate-y-0" leave="transition-transform duration-150" leaveFrom="opacity-100 scale-100 translate-y-0" leaveTo="opacity-0 scale-95 translate-y-2">
            <div className="relative w-full max-w-full sm:max-w-3xl bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-4 sm:p-6 z-10">
              <button onClick={onClose} className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                <X className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              </button>
              <div className="space-y-4">
                <div className="rounded overflow-hidden bg-gray-50 h-40 sm:h-56 flex items-center justify-center">
                  {data?.heroImage ? <img loading="lazy" src={data.heroImage} className="w-full h-full object-cover" alt={data?.meta?.alt || data?.heroTitle || 'Hero image'} /> : <div className="w-full h-full flex items-center justify-center text-slate-400"><ImageIcon className="w-8 h-8" /> <span className="ml-2">Sin imagen</span></div>}
                </div>
                <div>
                  <h3 className="text-lg sm:text-2xl font-bold">{data?.title || data?.heroTitle || 'Título'}</h3>
                  <p className="text-sm text-slate-600">{data?.shortDescription || data?.heroSubtitle}</p>
                </div>
                {data?.benefits && data.benefits.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Beneficios</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {data.benefits.map((b:any,i:number)=> (
                        <div key={i} className="flex gap-2 items-start p-2 border rounded">
                          {b.icon && <img loading="lazy" src={b.icon} className="w-12 h-12 object-contain" alt={b.title} />}
                          <div>
                            <div className="font-semibold">{b.title}</div>
                            <div className="text-sm text-slate-600">{b.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default SubServicePreviewModal

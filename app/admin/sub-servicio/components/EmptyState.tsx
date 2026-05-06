import React from 'react'
import { Button } from '../../components/shared/Button'

interface Props { onCreate: () => void }

export const EmptyState: React.FC<Props> = ({ onCreate }) => {
  return (
    <div className="py-12 text-center text-gray-600 dark:text-gray-300">
      <h3 className="text-xl font-semibold mb-2">No hay subservicios aún</h3>
      <p className="mb-4">Crea subservicios para organizar mejor tus páginas y contenido.</p>
      <div className="flex items-center justify-center gap-3">
        <Button onClick={onCreate}>Crear primer Subservicio</Button>
        <a href="/web/admin/servicios" className="text-sm text-blue-600 underline">Ir a Servicios</a>
      </div>
    </div>
  )
}

export default EmptyState

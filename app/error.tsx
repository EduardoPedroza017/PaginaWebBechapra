"use client"
import React from 'react'
import ErrorBoundary from '../components/ErrorBoundary'

export default function GlobalError({ error }: { error: Error }) {
  // No exponer detalles del error en producción
  console.error('Unhandled client error (frontend):', error)

  return (
    <ErrorBoundary>
      <div style={{ padding: 40, textAlign: 'center' }}>
        <h1>Ha ocurrido un error</h1>
        <p>Estamos trabajando para resolverlo. Por favor intenta nuevamente más tarde.</p>
      </div>
    </ErrorBoundary>
  )
}

"use client"
import React from 'react'
import * as Sentry from '@sentry/react'

type Props = { children: React.ReactNode }

type State = { hasError: boolean }

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Enviar a Sentry u otro servicio desde el cliente (pasar datos serializables)
    const extra = { componentStack: info.componentStack }
    try {
      if (typeof window !== 'undefined' && (window as any).Sentry) {
        (window as any).Sentry.captureException(error, { extra })
      } else {
        Sentry.captureException(error, { extra })
      }
    } catch (e) {
      // No fallar si el logging falla
      console.error('Error reporting failed', e)
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 40, textAlign: 'center' }}>
          <h1>Algo salió mal</h1>
          <p>Lo sentimos, ha ocurrido un error. Por favor intenta recargar la página.</p>
        </div>
      )
    }

    return this.props.children
  }
}

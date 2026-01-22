"use client"
import React, { useEffect, useState, useRef } from 'react'
import { CornerUpLeft } from 'lucide-react'

interface ToastProps { open: boolean; message: string; actionLabel?: string; onAction?: () => void; onClose?: () => void; timeout?: number }

export const Toast: React.FC<ToastProps> = ({ open, message, actionLabel, onAction, onClose, timeout = 6000 }) => {
    const [timeLeft, setTimeLeft] = useState(timeout)
    const intervalRef = useRef<number | null>(null)

    useEffect(() => {
        Promise.resolve().then(() => setTimeLeft(timeout))
    }, [timeout, open])

    useEffect(() => {
        if (!open) return
        intervalRef.current = window.setInterval(() => {
            setTimeLeft(t => {
                const next = t - 100
                if (next <= 0) {
                    if (onClose) onClose()
                    return 0
                }
                return next
            })
        }, 100)
        return () => { if (intervalRef.current) window.clearInterval(intervalRef.current); intervalRef.current = null }
    }, [open, onClose])

    useEffect(() => {
        if (!open) {
            Promise.resolve().then(() => setTimeLeft(timeout))
        }
    }, [open, timeout])

    function handleAction() {
        if (onAction) onAction()
        if (onClose) onClose()
        if (intervalRef.current) { window.clearInterval(intervalRef.current); intervalRef.current = null }
    }

    if (!open) return null
    const progress = Math.max(0, Math.min(100, Math.round((timeLeft / timeout) * 100)))
    return (
        <div className="fixed right-4 bottom-6 z-50">
            <div className="relative min-w-[240px] max-w-sm rounded-lg bg-white dark:bg-slate-800 shadow-lg p-3 flex items-center gap-3 transition transform duration-200 ease-out">
                <div className="flex-1 text-sm text-slate-800 dark:text-slate-200">{message}</div>
                {actionLabel && (
                    <div className="flex items-center gap-2">
                        <button onClick={handleAction} className="text-sm text-blue-600 dark:text-blue-400 px-2 py-1 inline-flex items-center gap-2"><CornerUpLeft className="w-4 h-4" />{actionLabel}</button>
                        <div className="text-xs text-slate-500 dark:text-slate-400">{Math.ceil(timeLeft / 1000)}s</div>
                    </div>
                )}
                <div className="absolute left-0 right-0 bottom-0 h-1 bg-slate-100 dark:bg-slate-700 rounded-b-lg overflow-hidden">
                    <div className="h-1 bg-blue-600 dark:bg-blue-400 transition-all duration-100 linear" style={{ width: `${progress}%` }} />
                </div>
            </div>
        </div>
    )
}
export default Toast

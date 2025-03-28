'use client'

import { createContext, useContext, useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Toast, ToastType } from './toast'

interface ToastContextType {
    showToast: (type: ToastType, title: string, message: string, duration?: number) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

interface ToastItem {
    id: string
    type: ToastType
    title: string
    message: string
    duration: number
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<ToastItem[]>([])

    const showToast = useCallback((type: ToastType, title: string, message: string, duration = 5000) => {
        const id = Math.random().toString(36).substr(2, 9)
        setToasts((prev) => [...prev, { id, type, title, message, duration }])
    }, [])

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, [])

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="toast-container">
                <AnimatePresence>
                    {toasts.map((toast) => (
                        <Toast
                            key={toast.id}
                            {...toast}
                            onClose={removeToast}
                        />
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    )
}

export function useToast() {
    const context = useContext(ToastContext)
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider')
    }
    return context
} 
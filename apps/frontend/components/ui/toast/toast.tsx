'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IconX, IconCheck, IconAlertCircle, IconInfoCircle } from '@tabler/icons-react'
import './toast.css'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

interface ToastProps {
    id: string
    type: ToastType
    title: string
    message: string
    duration?: number
    onClose: (id: string) => void
    onProgress?: (progress: number) => void
}

const icons = {
    success: IconCheck,
    error: IconAlertCircle,
    warning: IconAlertCircle,
    info: IconInfoCircle,
}

export function Toast({
    id,
    type,
    title,
    message,
    duration = 5000,
    onClose,
    onProgress,
}: ToastProps) {
    const progressRef = useRef<HTMLDivElement>(null)
    const startTimeRef = useRef(Date.now())

    useEffect(() => {
        const timer = setInterval(() => {
            const elapsed = Date.now() - startTimeRef.current
            const progress = Math.max(0, 100 - (elapsed / duration) * 100)

            if (progressRef.current) {
                progressRef.current.style.width = `${progress}%`
            }

            if (onProgress) {
                onProgress(progress)
            }

            if (elapsed >= duration) {
                onClose(id)
            }
        }, 10)

        return () => clearInterval(timer)
    }, [duration, id, onClose, onProgress])

    const Icon = icons[type]

    return (
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3 }}
            className={`toast toast-${type}`}
        >
            <div className="toast-icon">
                <Icon size={20} />
            </div>
            <div className="toast-content">
                <div className="toast-title">{title}</div>
                <div className="toast-message">{message}</div>
            </div>
            <button
                className="toast-close"
                onClick={() => onClose(id)}
                aria-label="إغلاق"
            >
                <IconX size={16} />
            </button>
            <div className="toast-progress" ref={progressRef} />
        </motion.div>
    )
} 
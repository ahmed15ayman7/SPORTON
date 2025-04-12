'use client'

import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider } from '@/components/auth-provider'
import { ToastProvider } from '@/components/toast-provider'

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <ThemeProvider>
                <ToastProvider>
                    {children}
                </ToastProvider>
            </ThemeProvider>
        </AuthProvider>
    )
} 
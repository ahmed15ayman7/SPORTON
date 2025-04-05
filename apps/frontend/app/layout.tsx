import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { AuthProvider } from '@/components/AuthProvider'
import { ToastProvider } from '@/components/ui/toast'

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'SPORTON',
    description: 'منصة رياضية متكاملة',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="ar" dir="rtl">
            <body>
                <AuthProvider>
                    <ThemeProvider>
                        <ToastProvider>
                            {children}
                        </ToastProvider>
                    </ThemeProvider>
                </AuthProvider>
            </body>
        </html>
    )
} 
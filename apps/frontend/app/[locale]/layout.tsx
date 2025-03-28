import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { ThemeProvider } from '@/components/ThemeProvider'
import { AuthProvider } from '@/components/AuthProvider'
import { ToastProvider } from '@/components/ui/toast'
import { locales, getMessages } from '@/i18n'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }))
}

export default async function RootLayout({
    children,
    params: { locale },
}: {
    children: React.ReactNode
    params: { locale: string }
}) {
    if (!locales.includes(locale as any)) notFound()

    const messages = await getMessages(locale as any)

    return (
        <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
            <body className={inter.className}>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <AuthProvider>
                        <ThemeProvider>
                            <ToastProvider>
                                {children}
                            </ToastProvider>
                        </ThemeProvider>
                    </AuthProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    )
} 
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { IconPhone } from '@tabler/icons-react'
import { useToast } from '@/components/ui/toast'

export default function VerifyPhone() {
    const router = useRouter()
    const { showToast } = useToast()
    const [loading, setLoading] = useState(false)
    const [resendLoading, setResendLoading] = useState(false)
    const [code, setCode] = useState('')

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const response = await fetch('/api/auth/verify-phone', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'حدث خطأ أثناء التحقق')
            }

            showToast('success', 'تم التحقق بنجاح', 'سيتم توجيهك إلى صفحة الملف الشخصي')
            router.push('/profile')
        } catch (error) {
            showToast('error', 'خطأ', error instanceof Error ? error.message : 'حدث خطأ أثناء التحقق')
        } finally {
            setLoading(false)
        }
    }

    const handleResendCode = async () => {
        setResendLoading(true)

        try {
            const response = await fetch('/api/auth/resend-verification', {
                method: 'POST',
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'حدث خطأ أثناء إعادة إرسال الرمز')
            }

            showToast('success', 'تم إعادة إرسال الرمز', 'يرجى التحقق من هاتفك')
        } catch (error) {
            showToast('error', 'خطأ', error instanceof Error ? error.message : 'حدث خطأ أثناء إعادة إرسال الرمز')
        } finally {
            setResendLoading(false)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8"
        >
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                        التحقق من رقم الهاتف
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                        تم إرسال رمز التحقق إلى هاتفك
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleVerify}>
                    <div className="rounded-md shadow-sm">
                        <div className="relative">
                            <IconPhone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                required
                                className="appearance-none rounded relative block w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm dark:bg-gray-800"
                                placeholder="رمز التحقق"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            type="button"
                            onClick={handleResendCode}
                            disabled={resendLoading}
                            className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {resendLoading ? 'جاري إعادة الإرسال...' : 'إعادة إرسال الرمز'}
                        </button>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'جاري التحقق...' : 'تحقق'}
                        </button>
                    </div>
                </form>
            </div>
        </motion.div>
    )
} 
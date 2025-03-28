'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { IconUser, IconLock, IconMail, IconPhone } from '@tabler/icons-react'
import { useToast } from '@/components/ui/toast'

export default function SignUp() {
    const router = useRouter()
    const { showToast } = useToast()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'حدث خطأ أثناء التسجيل')
            }

            showToast('success', 'تم التسجيل بنجاح', 'سيتم إرسال رمز التحقق إلى هاتفك')
            router.push('/auth/verify-phone')
        } catch (error) {
            showToast('error', 'خطأ', error instanceof Error ? error.message : 'حدث خطأ أثناء التسجيل')
        } finally {
            setLoading(false)
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
                        إنشاء حساب جديد
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="relative">
                            <IconUser className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm dark:bg-gray-800"
                                placeholder="الاسم"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="relative">
                            <IconMail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm dark:bg-gray-800"
                                placeholder="البريد الإلكتروني"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div className="relative">
                            <IconPhone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="tel"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm dark:bg-gray-800"
                                placeholder="رقم الهاتف"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>
                        <div className="relative">
                            <IconLock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm dark:bg-gray-800"
                                placeholder="كلمة المرور"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'جاري التسجيل...' : 'تسجيل'}
                        </button>
                    </div>
                </form>
            </div>
        </motion.div>
    )
} 
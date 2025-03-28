'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button, Input, message, Divider } from 'antd'
import { ApiClient } from '@/lib/api-documentation'
import { FaFacebook, FaDiscord, FaGoogle } from 'react-icons/fa'

export default function SignIn() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            setLoading(true)
            const result = await signIn('credentials', {
                redirect: false,
                email: formData.email,
                password: formData.password,
            })

            if (result?.error) {
                message.error('فشل تسجيل الدخول')
            } else {
                router.push('/auth/verify-phone')
            }
        } catch (error) {
            message.error('حدث خطأ أثناء تسجيل الدخول')
        } finally {
            setLoading(false)
        }
    }

    const handleSocialLogin = async (provider: string) => {
        try {
            setLoading(true)
            await signIn(provider, { callbackUrl: '/auth/verify-phone' })
        } catch (error) {
            message.error('فشل تسجيل الدخول باستخدام ' + provider)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
            <div className="glass-card p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-8">تسجيل الدخول</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        type="email"
                        placeholder="البريد الإلكتروني"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                    <Input.Password
                        placeholder="كلمة المرور"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                    />
                    <Button
                        type="submit"
                        loading={loading}
                        className="btn-primary w-full"
                    >
                        تسجيل الدخول
                    </Button>
                </form>

                <Divider>أو</Divider>

                <div className="space-y-4">
                    <Button
                        onClick={() => handleSocialLogin('facebook')}
                        loading={loading}
                        className="w-full flex items-center justify-center gap-2 bg-[#1877F2] text-white hover:bg-[#1877F2]/90"
                    >
                        <FaFacebook />
                        تسجيل الدخول باستخدام فيسبوك
                    </Button>

                    <Button
                        onClick={() => handleSocialLogin('discord')}
                        loading={loading}
                        className="w-full flex items-center justify-center gap-2 bg-[#5865F2] text-white hover:bg-[#5865F2]/90"
                    >
                        <FaDiscord />
                        تسجيل الدخول باستخدام Discord
                    </Button>

                    <Button
                        onClick={() => handleSocialLogin('google')}
                        loading={loading}
                        className="w-full flex items-center justify-center gap-2 bg-[#DB4437] text-white hover:bg-[#DB4437]/90"
                    >
                        <FaGoogle />
                        تسجيل الدخول باستخدام Google
                    </Button>
                </div>
            </div>
        </div>
    )
} 
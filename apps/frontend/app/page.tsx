import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <h1 className="text-4xl font-bold mb-8">مرحباً بك في سبورتون</h1>
            <p className="text-xl mb-8 text-center">
                منصة رياضية متكاملة تجمع بين اللاعبين والمدربين والوكلاء والأندية
            </p>
            <div className="flex gap-4">
                <Button asChild>
                    <Link href="/login">تسجيل الدخول</Link>
                </Button>
                <Button variant="outline" asChild>
                    <Link href="/signup">إنشاء حساب</Link>
                </Button>
            </div>
        </main>
    )
} 
'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    const router = useRouter()

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h2 className="text-2xl font-bold mb-4">حدث خطأ ما</h2>
            <p className="text-muted-foreground mb-8">{error.message}</p>
            <div className="flex gap-4">
                <Button onClick={() => reset()}>إعادة المحاولة</Button>
                <Button variant="outline" onClick={() => router.push('/')}>
                    العودة للصفحة الرئيسية
                </Button>
            </div>
        </div>
    )
} 
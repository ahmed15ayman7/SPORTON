import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h2 className="text-2xl font-bold mb-4">الصفحة غير موجودة</h2>
            <p className="text-muted-foreground mb-8">
                عذراً، لم نتمكن من العثور على الصفحة التي تبحث عنها
            </p>
            <Button asChild>
                <Link href="/">العودة للصفحة الرئيسية</Link>
            </Button>
        </div>
    )
} 
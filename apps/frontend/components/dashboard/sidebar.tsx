import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navigation = [
    { name: 'الرئيسية', href: '/dashboard' },
    { name: 'الملف الشخصي', href: '/dashboard/profile' },
    { name: 'الإحصائيات', href: '/dashboard/statistics' },
    { name: 'التدريبات', href: '/dashboard/training' },
    { name: 'العقود', href: '/dashboard/contracts' },
    { name: 'الإشعارات', href: '/shared/notifications' },
    { name: 'الرسائل', href: '/shared/messages' },
    { name: 'الإعدادات', href: '/shared/settings' },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <div className="flex flex-col w-64 h-full bg-background border-r">
            <div className="flex h-16 items-center px-6 border-b">
                <h1 className="text-xl font-bold">سبورتون</h1>
            </div>
            <nav className="flex-1 space-y-1 p-4">
                {navigation.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            'flex items-center px-4 py-2 text-sm font-medium rounded-md',
                            pathname === item.href
                                ? 'bg-primary text-primary-foreground'
                                : 'text-foreground hover:bg-accent'
                        )}
                    >
                        {item.name}
                    </Link>
                ))}
            </nav>
        </div>
    )
} 
import { Button } from '@/components/ui/button'
import { Bell, MessageSquare, User } from 'lucide-react'

export function Navbar() {
    return (
        <div className="flex h-16 items-center justify-between px-6 border-b">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon">
                    <Bell className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                    <MessageSquare className="h-5 w-5" />
                </Button>
            </div>
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                </Button>
            </div>
        </div>
    )
} 
'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import { Button } from 'antd'

export function LoginButton() {
    const { data: session } = useSession()

    if (session) {
        return (
            <Button
                onClick={() => signOut()}
                className="btn-secondary"
            >
                تسجيل الخروج
            </Button>
        )
    }

    return (
        <Button
            onClick={() => signIn('auth0')}
            className="btn-primary"
        >
            تسجيل الدخول
        </Button>
    )
} 
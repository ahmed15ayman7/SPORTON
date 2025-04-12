'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface User {
    id: string
    name: string
    email: string
    role: string
}

interface AuthContextType {
    user: User | null
    loading: boolean
    signIn: (email: string, password: string) => Promise<void>
    signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        // Check for existing session
        const checkSession = async () => {
            try {
                // TODO: Implement session check
                setLoading(false)
            } catch (error) {
                setLoading(false)
            }
        }

        checkSession()
    }, [])

    const signIn = async (email: string, password: string) => {
        try {
            // TODO: Implement sign in
            router.push('/dashboard')
        } catch (error) {
            throw error
        }
    }

    const signOut = async () => {
        try {
            // TODO: Implement sign out
            setUser(null)
            router.push('/login')
        } catch (error) {
            throw error
        }
    }

    return (
        <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
} 
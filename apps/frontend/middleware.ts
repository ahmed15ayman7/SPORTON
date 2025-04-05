import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession } from '@auth0/nextjs-auth0/edge'
import crypto from 'crypto'

// دالة لإنشاء رمز CSRF آمن
function generateCsrfToken(secret: string) {
    return crypto.createHmac('sha256', secret).digest('hex')
}

// Middleware الرئيسي
export async function middleware(req: NextRequest) {
    try {
        const session = await getSession(req, NextResponse.next())

        // 🛡️ حماية المسارات المحمية
        if (
            req.nextUrl.pathname.startsWith('/api/') ||
            req.nextUrl.pathname.startsWith('/dashboard/') ||
            req.nextUrl.pathname.startsWith('/profile/')
        ) {
            if (!session || !session.user) {
                return NextResponse.redirect(new URL('/api/auth/login', req.url))
            }
        }

        // 🛡️ حماية CSRF
        if (req.method !== 'GET') {
            const csrfToken = req.headers.get('x-csrf-token')
            const validToken = generateCsrfToken(process.env.NEXTAUTH_SECRET!)

            if (!csrfToken || csrfToken !== validToken) {
                return new NextResponse('Invalid CSRF token', { status: 403 })
            }
        }

        // 🛡️ حماية HPP (تحقق يدوي)
        const queryParams = req.nextUrl.searchParams
        const paramCounts = new Map()

        for (const key of Array.from(queryParams.keys())) {
            paramCounts.set(key, (paramCounts.get(key) || 0) + 1)
        }

        if (Array.from(paramCounts.values()).some(count => count > 1)) {
            return new NextResponse('Invalid request parameters (HPP detected)', { status: 400 })
        }

        // 🛡️ إضافة رؤوس HTTP الأمنية
        const response = NextResponse.next()
        response.headers.set('X-Frame-Options', 'DENY')
        response.headers.set('X-Content-Type-Options', 'nosniff')
        response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
        response.headers.set(
            'Content-Security-Policy',
            "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;"
        )

        return response
    } catch (error) {
        console.error('Middleware error:', error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}

// ضبط Middleware ليعمل على المسارات المطلوبة فقط
export const config = {
    matcher: [
        '/api/:path*',
        '/dashboard/:path*',
        '/profile/:path*',
    ],
}

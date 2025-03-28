import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { withAuth } from '@auth0/nextjs-auth0/edge'
import csrf from 'csrf'
import hpp from 'hpp'

const csrfProtection = new csrf()
const hppProtection = hpp()

export default withAuth(
    async function middleware(req: NextRequest, token: any) {
        // حماية CSRF
        if (req.method !== 'GET') {
            const csrfToken = req.headers.get('x-csrf-token')
            if (!csrfToken || !csrfProtection.verify(process.env.NEXTAUTH_SECRET!, csrfToken)) {
                return new NextResponse('Invalid CSRF token', { status: 403 })
            }
        }

        // حماية HPP
        const hppResult = hppProtection(req)
        if (hppResult) {
            return new NextResponse('Invalid request parameters', { status: 400 })
        }

        // إضافة رؤوس HTTP الأمنية
        const response = NextResponse.next()

        response.headers.set('X-Frame-Options', 'DENY')
        response.headers.set('X-Content-Type-Options', 'nosniff')
        response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
        response.headers.set(
            'Content-Security-Policy',
            "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;"
        )

        return response
    },
    {
        callbacks: {
            authorized: ({ req, token }) => {
                // التحقق من المسارات المحمية
                if (req.nextUrl.pathname.startsWith('/api/') ||
                    req.nextUrl.pathname.startsWith('/dashboard/') ||
                    req.nextUrl.pathname.startsWith('/profile/')) {
                    return !!token
                }
                return true
            },
        },
    }
)

export const config = {
    matcher: [
        '/api/:path*',
        '/dashboard/:path*',
        '/profile/:path*',
    ],
}
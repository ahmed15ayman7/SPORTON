import NextAuth from 'next-auth'
import FacebookProvider from 'next-auth/providers/facebook'
import DiscordProvider from 'next-auth/providers/discord'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { ApiClient } from '@/lib/api-documentation'

const handler = NextAuth({
    providers: [
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID!,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
        }),
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID!,
            clientSecret: process.env.DISCORD_CLIENT_SECRET!,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "البريد الإلكتروني", type: "email" },
                password: { label: "كلمة المرور", type: "password" }
            },
            async authorize(credentials) {
                try {
                    const response = await ApiClient.auth.login({
                        email: credentials?.email!,
                        password: credentials?.password!
                    })

                    if (response.data) {
                        return response.data
                    }
                    return null
                } catch (error) {
                    return null
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, account, user }) {
            if (account && user) {
                token.accessToken = account.access_token
                token.user = user
                token.phoneVerified = user.phoneVerified
            }
            return token
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken
            session.user = token.user
            session.user.phoneVerified = token.phoneVerified
            return session
        }
    },
    pages: {
        signIn: '/auth/signin',
        error: '/auth/error',
        verifyPhone: '/auth/verify-phone',
        onboarding: '/onboarding',
    },
    session: {
        strategy: 'jwt',
    },
})

export { handler as GET, handler as POST } 
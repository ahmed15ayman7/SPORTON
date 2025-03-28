import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { messages } from './messages'

export const locales = ['ar', 'en'] as const
export type Locale = (typeof locales)[number]

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({ locales })

export function getMessages(locale: Locale) {
    return messages[locale]
} 
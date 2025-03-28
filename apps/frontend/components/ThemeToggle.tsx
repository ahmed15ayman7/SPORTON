'use client'

import { useThemeStore } from '@/store/themeStore'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'

export function ThemeToggle() {
    const { theme, toggleTheme } = useThemeStore()

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-glass-light dark:bg-glass-dark backdrop-blur-sm hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
            aria-label="تبديل الوضع"
        >
            {theme === 'light' ? (
                <MoonIcon className="w-5 h-5 text-primary" />
            ) : (
                <SunIcon className="w-5 h-5 text-secondary" />
            )}
        </button>
    )
} 
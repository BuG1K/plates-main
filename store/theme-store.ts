'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { ThemeStore } from '@/types'

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: 'light',
      toggleTheme: () => {
        const currentTheme = get().theme
        const newTheme = currentTheme === 'light' ? 'dark' : 'light'
        set({ theme: newTheme })
        
        // Apply theme to document
        if (typeof document !== 'undefined') {
          document.documentElement.className = newTheme
        }
      },
      setTheme: (theme) => {
        set({ theme })
        
        // Apply theme to document
        if (typeof document !== 'undefined') {
          document.documentElement.className = theme
        }
      },
    }),
    {
      name: 'luxetable-theme',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
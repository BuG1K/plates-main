'use client'

import Link from 'next/link'
import { use, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NavigationItem } from '@/types'

const navigation: NavigationItem[] = [
  { name: 'Главная', href: '/', current: true },
  // { name: 'Категории', href: '/categories', current: false },
  { name: 'Каталог', href: '/catalog', current: false },
  { name: 'Уход за посудой', href: '/care', current: false },
  { name: 'О нас', href: '/about', current: false },
  { name: 'Контакты', href: '/contact', current: false },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [navigationItems, setNavigationItems] = useState(navigation)
  const pathname = usePathname()

  useEffect(() => {
    setNavigationItems(
      navigation.map((item) => ({
        ...item,
        current: item.href === pathname,
      }))
    )
  }, [pathname])

  return (
    <header className="relative border-b border-gray-200" style={{ backgroundColor: '#f5f0ea' }}>
      <div className="container-luxury">
        <div className="flex items-center justify-between py-5 lg:py-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-2 h-2 bg-neutral-800 rounded-full transition-all duration-300 group-hover:scale-125" />
            <span className="text-xl font-bold text-gray-800 tracking-tight">
              HomePhilosophy
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-10">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-all duration-300 hover:text-yellow-500',
                  item.current
                    ? 'text-gray-800 border-b border-yellow-400'
                    : 'text-gray-600 hover:text-gray-800'
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Header Actions */}
          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <button
              type="button"
              className="lg:hidden p-2 text-gray-600 hover:text-gray-800"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Toggle menu</span>
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'text-sm font-medium transition-colors duration-300',
                    item.current
                      ? 'text-gray-800 font-semibold'
                      : 'text-gray-600 hover:text-gray-800'
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
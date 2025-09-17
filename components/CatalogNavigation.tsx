'use client'

import { useState } from 'react'
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CategoryItem {
  id: string
  label: string
  subcategories?: string[]
  highlight?: boolean
}

interface CatalogNavigationProps {
  activeCategory?: string
  onCategoryChange?: (category: string) => void
  cartItemCount?: number
  wishlistItemCount?: number
}

const tableware_categories: CategoryItem[] = [
  { 
    id: 'new', 
    label: 'Новинки',
    highlight: true 
  },
  { 
    id: 'dinnerware', 
    label: 'Столовая посуда',
    subcategories: ['Тарелки', 'Миски', 'Наборы', 'Сервировочные элементы']
  },
  { 
    id: 'cutlery', 
    label: 'Столовые приборы',
    subcategories: ['Наборы приборов', 'Сервировочные приборы', 'Специальные приборы']
  },
  { 
    id: 'serveware', 
    label: 'Сервировочная посуда',
    subcategories: ['Блюда', 'Сервировочные миски', 'Подносы', 'Аксессуары']
  },
  { 
    id: 'accessories', 
    label: 'Аксессуары для стола',
    subcategories: ['Подставки', 'Кольца для салфеток', 'Настольные украшения']
  },
  { 
    id: 'sale', 
    label: 'Распродажа',
    highlight: true 
  }
]

export default function CatalogNavigation({
  activeCategory = '',
  onCategoryChange,
  cartItemCount = 0,
  wishlistItemCount = 0
}: CatalogNavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)

  const handleCategoryClick = (categoryId: string) => {
    onCategoryChange?.(categoryId)
    setMobileMenuOpen(false)
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle search logic here
    console.log('Search for:', searchQuery)
  }

  return (
    <div className="bg-white border-b border-gray-200 sticky top-16 z-40 shadow-sm">
      <div className="container-luxury">
        {/* Main Navigation Bar */}
        <div className="flex items-center justify-between py-4">
          {/* Category Navigation - Desktop */}
          <nav className="hidden lg:flex items-center space-x-8">
            {tableware_categories.map((item) => (
              <button
                key={item.id}
                onClick={() => handleCategoryClick(item.id)}
                className={cn(
                  'relative text-sm font-medium transition-all duration-300 hover:text-yellow-600',
                  item.highlight 
                    ? 'text-red-600 hover:text-red-700' 
                    : activeCategory === item.id 
                      ? 'text-gray-800 font-semibold' 
                      : 'text-gray-600 hover:text-gray-800'
                )}
              >
                {item.label}
                {item.highlight && item.id === 'new' && (
                  <span className="absolute -top-1 -right-2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                )}
                {item.highlight && item.id === 'sale' && (
                  <span className="absolute -top-1 -right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
                {activeCategory === item.id && (
                  <div className="absolute -bottom-4 left-0 right-0 h-0.5 bg-yellow-400 rounded-full"></div>
                )}
              </button>
            ))}
          </nav>

          {/* Mobile Category Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
          >
            <Menu className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Категории</span>
          </button>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              {showSearch ? (
                <form onSubmit={handleSearchSubmit} className="flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Поиск посуды..."
                    className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setShowSearch(false)
                      setSearchQuery('')
                    }}
                    className="ml-2 p-2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setShowSearch(true)}
                  className="p-2 text-gray-600 hover:text-gray-800 transition-colors duration-300"
                >
                  <Search className="w-5 h-5" />
                  <span className="sr-only">Search</span>
                </button>
              )}
            </div>

            {/* Wishlist */}
            <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors duration-300 relative">
              <Heart className="w-5 h-5" />
              <span className="sr-only">Wishlist</span>
              {wishlistItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {wishlistItemCount > 9 ? '9+' : wishlistItemCount}
                </span>
              )}
            </button>

            {/* Shopping Cart */}
            <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors duration-300 relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="sr-only">Shopping cart</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 text-gray-800 text-xs font-bold rounded-full flex items-center justify-center">
                  {cartItemCount > 9 ? '9+' : cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <span className="text-lg font-semibold text-gray-800">Категории</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Category List */}
            <nav className="py-4">
              {tableware_categories.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleCategoryClick(item.id)}
                  className={cn(
                    'w-full text-left px-4 py-3 text-sm font-medium transition-colors duration-200 hover:bg-gray-50',
                    item.highlight 
                      ? 'text-red-600' 
                      : activeCategory === item.id 
                        ? 'text-gray-800 bg-yellow-50' 
                        : 'text-gray-600'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span>{item.label}</span>
                    {item.highlight && (
                      <span className="w-2 h-2 bg-current rounded-full opacity-60"></span>
                    )}
                  </div>
                  {item.subcategories && activeCategory === item.id && (
                    <div className="mt-2 pl-4 space-y-2">
                      {item.subcategories.map((sub) => (
                        <div key={sub} className="text-xs text-gray-500 font-normal">
                          {sub}
                        </div>
                      ))}
                    </div>
                  )}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </div>
  )
}
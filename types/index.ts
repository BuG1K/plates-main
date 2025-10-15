export interface Product {
  id: string
  name: string
  description: string
  price?: number
  oldPrice?: number
  image?: string
  category: 'dinnerware' | 'cutlery' | 'serveware' | 'accessories'
  subcategory?: string
  isNewArrival?: boolean
  isPopular?: boolean
  gradient?: string
  discount?: number
  rating?: number
  reviewCount?: number
  inStock?: boolean
  material?: string
  dimensions?: string
  weight?: string
  img: {
    url: string
  }[]
}

export interface NavigationItem {
  name: string
  href: string
  current?: boolean
}

export type Theme = 'light' | 'dark'

export interface ThemeStore {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

// E-commerce specific types
export interface CartItem {
  product: Product
  quantity: number
  selectedOptions?: Record<string, string>
}

export interface CartStore {
  items: CartItem[]
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

export interface WishlistStore {
  items: Product[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  clearWishlist: () => void
}

export interface FilterOptions {
  category?: string
  subcategory?: string
  minPrice?: number
  maxPrice?: number
  material?: string
  inStock?: boolean
  rating?: number
}

export interface SortOption {
  id: string
  label: string
  field: keyof Product
  direction: 'asc' | 'desc'
}

export type ViewMode = 'grid' | 'list'

export interface CatalogState {
  filters: FilterOptions
  sortBy: string
  viewMode: ViewMode
  searchQuery: string
}
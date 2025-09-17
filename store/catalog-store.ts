import { create } from 'zustand'
import { FilterOptions, ViewMode, Product } from '@/types'

interface CatalogStore {
  filters: FilterOptions
  sortBy: string
  viewMode: ViewMode
  searchQuery: string
  
  // Actions
  updateFilters: (filters: Partial<FilterOptions>) => void
  clearFilters: () => void
  setSortBy: (sortBy: string) => void
  setViewMode: (viewMode: ViewMode) => void
  setSearchQuery: (query: string) => void
  
  // Computed values
  getFilteredProducts: (products: Product[]) => Product[]
}

export const useCatalogStore = create<CatalogStore>((set, get) => ({
  filters: {},
  sortBy: 'featured',
  viewMode: 'grid',
  searchQuery: '',
  
  updateFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters }
    }))
  },
  
  clearFilters: () => {
    set({ filters: {} })
  },
  
  setSortBy: (sortBy) => {
    set({ sortBy })
  },
  
  setViewMode: (viewMode) => {
    set({ viewMode })
  },
  
  setSearchQuery: (searchQuery) => {
    set({ searchQuery })
  },
  
  getFilteredProducts: (products: Product[]) => {
    const { filters, sortBy, searchQuery } = get()
    let filteredProducts = [...products]
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.material?.toLowerCase().includes(query) ||
        product.subcategory?.toLowerCase().includes(query)
      )
    }
    
    // Apply category filter
    if (filters.category && filters.category !== 'new' && filters.category !== 'sale') {
      filteredProducts = filteredProducts.filter(product => product.category === filters.category)
    }
    
    // Apply special category filters
    if (filters.category === 'new') {
      filteredProducts = filteredProducts.filter(product => product.isNewArrival)
    }
    
    if (filters.category === 'sale') {
      filteredProducts = filteredProducts.filter(product => product.discount && product.discount > 0)
    }
    
    // Apply subcategory filter
    if (filters.subcategory) {
      filteredProducts = filteredProducts.filter(product => product.subcategory === filters.subcategory)
    }
    
    // Apply price range filter
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(product => {
        if (!product.price) return false
        
        const price = product.price
        const minCheck = filters.minPrice === undefined || price >= filters.minPrice
        const maxCheck = filters.maxPrice === undefined || price <= filters.maxPrice
        
        return minCheck && maxCheck
      })
    }
    
    // Apply material filter
    if (filters.material) {
      filteredProducts = filteredProducts.filter(product => product.material === filters.material)
    }
    
    // Apply stock filter
    if (filters.inStock) {
      filteredProducts = filteredProducts.filter(product => product.inStock !== false)
    }
    
    // Apply rating filter
    if (filters.rating) {
      filteredProducts = filteredProducts.filter(product => 
        product.rating && product.rating >= filters.rating!
      )
    }
    
    // Apply sorting
    filteredProducts.sort((a, b) => {
      switch (sortBy) {
        case 'featured':
          // Sort by popularity, then new arrivals
          if (a.isPopular && !b.isPopular) return -1
          if (!a.isPopular && b.isPopular) return 1
          if (a.isNewArrival && !b.isNewArrival) return -1
          if (!a.isNewArrival && b.isNewArrival) return 1
          return 0
          
        case 'newest':
          if (a.isNewArrival && !b.isNewArrival) return -1
          if (!a.isNewArrival && b.isNewArrival) return 1
          return 0
          
        case 'price-low':
          const priceA = a.price || 0
          const priceB = b.price || 0
          return priceA - priceB
          
        case 'price-high':
          const priceHighA = a.price || 0
          const priceHighB = b.price || 0
          return priceHighB - priceHighA
          
        case 'name':
          return a.name.localeCompare(b.name)
          
        case 'rating':
          const ratingA = a.rating || 0
          const ratingB = b.rating || 0
          return ratingB - ratingA
          
        default:
          return 0
      }
    })
    
    return filteredProducts
  }
}))
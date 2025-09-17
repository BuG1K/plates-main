import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { WishlistStore, Product } from '@/types'

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product: Product) => {
        set((state) => {
          // Check if item is already in wishlist
          if (state.items.some(item => item.id === product.id)) {
            return state
          }
          
          return {
            items: [...state.items, product]
          }
        })
      },
      
      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== productId)
        }))
      },
      
      isInWishlist: (productId: string) => {
        return get().items.some(item => item.id === productId)
      },
      
      clearWishlist: () => {
        set({ items: [] })
      }
    }),
    {
      name: 'luxetable-wishlist',
      version: 1,
    }
  )
)
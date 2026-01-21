"use client"

import Hero from '@/components/Hero'
import ProductGrid from '@/components/ProductGrid'
import TrustedBrands from '@/components/TrustedBrands'
import CustomerReviews from '@/components/CustomerReviews'
import About from '@/components/About'
import { useEffect, useState } from 'react'
import { getNewProducts, getPopularProducts } from '@/actions/user'

export default function HomePage() {
  const [newArrivalItems, setNewArrivalItems] = useState([])
  const [popularItems, setPopularItems] = useState([])

  useEffect(() => {
    getNewProducts().then((products) => setNewArrivalItems(products || []));
    getPopularProducts().then((products) => setPopularItems(products || []));
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* New Arrivals Section */}
      <ProductGrid
        id="new-arrivals"
        products={newArrivalItems}
        title="Новинки"
        style={{ backgroundColor: '#f5f0ea' }}
      />

      {/* Popular Items Section */}
      <ProductGrid
        products={popularItems}
        title="Популярные товары"
        className="bg-white/50"
      />

      {/* Trusted Brands Section */}
      <TrustedBrands />

      {/* Customer Reviews Section */}
      <CustomerReviews />

      {/* About Section */}
      <About />
    </div>
  )
}
"use client"

import Hero from '@/components/Hero'
import ProductGrid from '@/components/ProductGrid'
import TrustedBrands from '@/components/TrustedBrands'
import CustomerReviews from '@/components/CustomerReviews'
import About from '@/components/About'
import { useEffect, useState } from 'react'

export default function HomePage() {
  const [newArrivalItems, setNewArrivalItems] = useState([])
  const [popularItems, setPopularItems] = useState([])

  useEffect(() => {
    fetch(
      "https://taxi-novoe.online/api/products?filters[isNewArrival][$eq]=true&pagination[limit]=4&populate=*"
    )
      .then((res) => res.json())
      .then((data) => setNewArrivalItems(data.data))
      .catch((err) => console.error('Error fetching data:', err))

    fetch(
      "https://taxi-novoe.online/api/products?filters[rating][$gte]=4.8&pagination[limit]=4&populate=*"
    )
      .then((res) => res.json())
      .then((data) => setPopularItems(data.data))
      .catch((err) => console.error('Error fetching data:', err))
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
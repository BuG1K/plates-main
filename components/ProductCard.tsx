'use client'

import { Product } from '@/types'
import { cn, formatPrice } from '@/lib/utils'
import placeholder from "../lib/placeholder-img.jpg"

interface ProductCardProps {
  product: Product
  className?: string
}

const getProductPlaceholder = (category: string, gradient?: string) => {
  const baseGradient = gradient || 'linear-gradient(135deg, #d4a574 0%, #e5b888 100%)'
  
  return (
    <div 
      className="w-32 h-32 lg:w-40 lg:h-40 rounded-full opacity-30 transition-all duration-500 group-hover:opacity-40 group-hover:scale-105"
      style={{ background: baseGradient }}
    />
  )
}

const getCategoryGradient = (product: Product) => {
  if (product.gradient) return product.gradient
  
  switch (product.category) {
    case 'dinnerware':
      return 'linear-gradient(135deg, #d4a574 0%, #e5b888 100%)'
    case 'cutlery':
      return 'linear-gradient(135deg, #666 0%, #999 100%)'
    case 'serveware':
      return 'linear-gradient(135deg, #888 0%, #aaa 100%)'
    default:
      return 'linear-gradient(135deg, #d4a574 0%, #e5b888 100%)'
  }
}

const getBackgroundGradient = (product: Product) => {
  if (product.id === '2' || product.id === '4') {
    return 'linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%)'
  }
  return 'linear-gradient(135deg, #2a2a2a 0%, #3d3d3d 100%)'
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const categoryGradient = getCategoryGradient(product)
  const backgroundGradient = getBackgroundGradient(product)

  return (
    <article className={cn("card-luxury group cursor-pointer", className)}>
      {/* Product Image Container */}
      <div 
        className="h-64 lg:h-72 flex items-center justify-center relative overflow-hidden rounded-t-2xl"
        style={{ background: backgroundGradient }}
      >
        {getProductPlaceholder(product.category, categoryGradient)}
        
        {/* Hover overlay */}
        <img
          src={product.img[0].url ? product.img[0].url : placeholder}
          alt='df'
          className="absolute inset-0 w-full h-full object-cover transition-transform transition-all duration-500 group-hover:scale-105"
        />
        {/* <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-all duration-300" /> */}
        
        {/* Badge for new arrivals or popular items */}
        {(product.isNewArrival || product.isPopular) && (
          <div className="absolute top-4 left-4">
            <span className="bg-yellow-400 text-gray-800 text-xs font-bold px-3 py-1 rounded-full">
              {product.isNewArrival ? 'Новинка' : 'Популярное'}
            </span>
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="p-5 lg:p-6">
        <h3 className="text-lg lg:text-xl font-normal text-gray-800 mb-2 group-hover:text-yellow-600 transition-colors duration-300">
          {product.name}
        </h3>
        
        <p className="text-sm lg:text-base text-luxury mb-3 line-clamp-2">
          {product.description}
        </p>
        
        {product.price && (
          <div className="flex items-center justify-between">
            <span className="text-lg lg:text-xl font-semibold text-gray-800">
              {formatPrice(product.price)}
            </span>
            
            <button className="text-sm font-medium text-yellow-500 hover:text-yellow-600 transition-colors duration-300">
              Подробности
            </button>
          </div>
        )}
      </div>
    </article>
  )
}
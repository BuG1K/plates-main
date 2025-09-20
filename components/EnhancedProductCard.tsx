'use client'

import { useEffect, useState } from 'react'
import { Heart, ShoppingBag, Eye, Star, Info } from 'lucide-react'
import { Product } from '@/types'
import { cn, formatPrice } from '@/lib/utils'
import Image from 'next/image'
import placeholder from "../lib/placeholder-img.jpg"

interface EnhancedProductCardProps {
  product: Product
  className?: string
  viewMode?: 'grid' | 'list'
  onAddToCart?: (product: Product) => void
  onAddToWishlist?: (product: Product) => void
  onQuickView?: (product: Product) => void
  isInWishlist?: boolean
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

const renderStars = (rating: number, reviewCount?: number) => {
  const stars = []
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0
  
  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)
  }
  
  if (hasHalfStar) {
    stars.push(<Star key="half" className="w-3 h-3 text-yellow-400" style={{ fill: 'url(#half)' }} />)
  }
  
  const remainingStars = 5 - Math.ceil(rating)
  for (let i = 0; i < remainingStars; i++) {
    stars.push(<Star key={`empty-${i}`} className="w-3 h-3 text-gray-300" />)
  }
  
  return (
    <div className="flex items-center gap-1">
      <svg className="hidden">
        <defs>
          <linearGradient id="half">
            <stop offset="50%" stopColor="#facc15" />
            <stop offset="50%" stopColor="#d1d5db" />
          </linearGradient>
        </defs>
      </svg>
      <div className="flex">{stars}</div>
      {reviewCount && (
        <span className="text-xs text-gray-500 ml-1">({reviewCount})</span>
      )}
    </div>
  )
}

export default function EnhancedProductCard({
  product,
  className,
  viewMode = 'grid',
  onAddToCart,
  onAddToWishlist,
  onQuickView,
  isInWishlist = false
}: EnhancedProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(isInWishlist)
  
  const categoryGradient = getCategoryGradient(product)
  const backgroundGradient = getBackgroundGradient(product)

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
    onAddToWishlist?.(product)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    onAddToCart?.(product)
  }

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation()
    onQuickView?.(product)
  }

  console.log(product, 11)

  if (viewMode === 'list') {
    return (
      <article className={cn("card-luxury group cursor-pointer", className)}>
        <div className="flex">
          {/* Product Image */}
          <div 
            className="w-48 h-100% flex items-center justify-center relative overflow-hidden rounded-l-2xl flex-shrink-0"
            style={{ background: backgroundGradient }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {getProductPlaceholder(product.category, categoryGradient)}
            
          <Image
            src={product?.img[0] ? product.img[0].url : placeholder}
            alt='df'
            fill
            className="absolute inset-0 w-full h-full object-cover transition-transform transition-all duration-500 group-hover:scale-105"
            unoptimized
          />

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-all duration-300" />

            {/* Badges */}
            <div className="absolute top-2 left-2 space-y-1">
              {product.isNewArrival && (
                <span className="bg-yellow-400 text-gray-800 text-xs font-bold px-2 py-1 rounded">
                  Новинка
                </span>
              )}
              {product.discount && (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  -{product.discount}%
                </span>
              )}
              {!product.inStock && (
                <span className="bg-gray-500 text-white text-xs font-bold px-2 py-1 rounded">
                  Нет в наличии
                </span>
              )}
            </div>

            {/* Wishlist button */}
            <button 
              onClick={handleWishlistClick}
              className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md transition-all hover:scale-110"
            >
              <Heart 
                className={cn(
                  "w-4 h-4 transition-colors",
                  isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'
                )}
              />
            </button>
          </div>

          {/* Product Information */}
          <div className="flex-1 p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-lg font-normal text-gray-800 group-hover:text-yellow-600 transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 capitalize">{product.category}</p>
                </div>
                {product.rating && (
                  <div className="ml-4">
                    {renderStars(product.rating, product.reviewCount)}
                  </div>
                )}
              </div>
              
              <p className="text-sm text-luxury mb-3 line-clamp-2">
                {product.description}
              </p>

              {/* Product Details */}
              {(product.material || product.dimensions) && (
                <div className="text-xs text-gray-500 mb-3 space-y-1">
                  {product.material && (
                    <div className="flex items-center gap-2">
                      <Info className="w-3 h-3" />
                      <span>Материал: {product.material}</span>
                    </div>
                  )}
                  {product.dimensions && (
                    <div className="flex items-center gap-2">
                      <Info className="w-3 h-3" />
                      <span>Размеры: {product.dimensions}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Price and Actions */}
            <div className="flex items-center justify-end">
              <div className="flex items-center gap-2">
                {product.oldPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
                {product.price && (
                  <span className="text-lg font-semibold text-gray-800">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>
              
              {/* <div className="flex items-center gap-2">
                <button
                  onClick={handleQuickView}
                  className="p-2 text-gray-400 hover:text-yellow-600 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                </button>
                {product.inStock !== false && (
                  <button
                    onClick={handleAddToCart}
                    className="px-4 py-2 bg-yellow-400 text-gray-800 text-sm font-medium rounded-lg hover:bg-yellow-500 transition-colors flex items-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    В корзину
                  </button>
                )}
              </div> */}
            </div>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article 
      className={cn("card-luxury group cursor-pointer", className)}
      style={{ overflow: 'hidden' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container */}
      <div 
        className="h-64 lg:h-72 flex items-center justify-center relative overflow-hidden rounded-t-2xl"
        style={{ backgroundImage: backgroundGradient }}
      >
        {getProductPlaceholder(product.category, categoryGradient)}
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-all duration-300" />

          <Image
            src={product.img[0] ? product.img[0].url : placeholder}
            alt='df'
            fill
            className="absolute inset-0 w-full h-full object-cover transition-transform transition-all duration-500 group-hover:scale-105"
            unoptimized
          />

        {/* Badges */}
        <div className="absolute top-4 left-4 space-y-2">
          {product.isNewArrival && (
            <span className="bg-yellow-400 text-gray-800 text-xs font-bold px-3 py-1 rounded-full">
              Новинка
            </span>
          )}
          {product.discount && (
            <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              -{product.discount}%
            </span>
          )}
          {!product.inStock && (
            <span className="bg-gray-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              Нет в наличии
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <button 
          onClick={handleWishlistClick}
          className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md transition-all hover:scale-110"
        >
          <Heart 
            className={cn(
              "w-5 h-5 transition-colors",
              isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'
            )}
          />
        </button>

        {/* Quick actions on hover */}
        <div className={cn(
          "absolute bottom-4 left-4 right-4 flex gap-2 transition-all duration-300",
          isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        )}>
          <button
            onClick={handleQuickView}
            className="flex-1 bg-white/90 backdrop-blur-sm text-gray-800 py-2 px-4 rounded-lg font-medium hover:bg-white transition-colors flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4" />
            {/* Быстрый просмотр */}
          </button>
          {product.inStock !== false && (
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-yellow-400 text-gray-800 py-2 px-4 rounded-lg font-medium hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              {/* В корзину */}
            </button>
          )}
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 lg:p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg lg:text-xl font-normal text-gray-800 mb-1 group-hover:text-yellow-600 transition-colors duration-300">
            {product.name}
          </h3>
          {product.rating && (
            <div className="ml-2">
              {renderStars(product.rating, product.reviewCount)}
            </div>
          )}
        </div>
        
        <p className="text-sm lg:text-base text-luxury mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Product Details */}
        {product.material && (
          <p className="text-xs text-gray-500 mb-2">{product.material}</p>
        )}
        
        <div className="flex items-center justify-end">
          <div className="flex items-center gap-2">
            {product.oldPrice && (
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
            {product.price && (
              <span className="text-lg lg:text-xl font-semibold text-gray-800">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
          
          <div className="flex items-center justify-end gap-1">
            {/* <span className="text-xs text-gray-500 capitalize">{product.category}</span> */}
            {product.inStock === false && (
              <span className="text-xs text-red-500 font-medium ml-2">Нет в наличии</span>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
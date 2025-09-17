'use client'

import ProductCard from './ProductCard'
import { Product } from '@/types'
import { cn } from '@/lib/utils'
import Link from "next/link"

interface ProductGridProps {
  products: Product[]
  title: string
  className?: string
  id?: string
  style?: React.CSSProperties
}

export default function ProductGrid({ products, title, className, id, style }: ProductGridProps) {
  return (
    <section id={id} className={cn("section-padding", className)} style={style}>
      <Link href="/catalog">
        <div className="container-luxury">
        <h2 className="text-section font-normal text-gray-800 mb-10 lg:mb-12 tracking-wide">
          {title}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
      </Link>
    </section>
  )
}
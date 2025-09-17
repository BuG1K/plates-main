'use client'

import Link from 'next/link'
import { categories } from '@/lib/categories'
import { ArrowRight, Users, Star } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function CategoriesPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container-luxury">
        {/* Page Header */}
        <div className="text-center mb-16 lg:mb-20">
          <h1 className="text-4xl lg:text-5xl font-normal text-gray-800 mb-6 tracking-wide">
            Категории товаров
          </h1>
          <p className="text-lg lg:text-xl text-luxury max-w-3xl mx-auto">
            Откройте для себя нашу коллекцию роскошных товаров, 
            разделенных по категориям для удобного поиска
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`/categories/${category.id}`}
              className="group block animate-slide-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-card hover:shadow-lg transition-all duration-300 group-hover:-translate-y-2 h-full">
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div 
                    className={cn(
                      "w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110",
                      category.gradient
                    )}
                  >
                    {category.icon}
                  </div>
                  <div>
                    <h2 className="text-xl lg:text-2xl font-normal text-gray-800 mb-1 group-hover:text-yellow-600 transition-colors">
                      {category.name}
                    </h2>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Users className="w-4 h-4" />
                      <span>{category.subcategories.length} подкатегорий</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {category.description}
                </p>

                {/* Subcategories Preview */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-800 mb-3 uppercase tracking-wider">
                    Подкатегории:
                  </h4>
                  <div className="space-y-2">
                    {category.subcategories.slice(0, 3).map((subcategory) => (
                      <div key={subcategory.id} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span className="text-sm text-gray-600">{subcategory.name}</span>
                      </div>
                    ))}
                    {category.subcategories.length > 3 && (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                        <span className="text-sm text-gray-400">
                          и еще {category.subcategories.length - 3}...
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Featured Brands */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-800 mb-3 uppercase tracking-wider">
                    Топ бренды:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {category.subcategories[0]?.brands?.slice(0, 3).map((brand) => (
                      <span 
                        key={brand.id}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium"
                      >
                        {brand.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Special Badge for Bestsellers */}
                {category.id === 'bestsellers' && (
                  <div className="absolute top-4 right-4">
                    <div className="bg-yellow-400 text-gray-800 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      Хит
                    </div>
                  </div>
                )}

                {/* Action */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Смотреть все товары
                  </span>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-yellow-600 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 lg:mt-20">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl lg:rounded-3xl p-8 lg:p-12">
            <h2 className="text-2xl lg:text-3xl font-normal text-gray-800 mb-6 tracking-wide">
              Не нашли то, что искали?
            </h2>
            <p className="text-base lg:text-lg text-luxury mb-8 max-w-2xl mx-auto">
              Наши консультанты помогут подобрать идеальные товары под ваши потребности 
              и предпочтения
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 button-primary"
            >
              Связаться с консультантом
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
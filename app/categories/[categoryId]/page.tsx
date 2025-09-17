import { notFound } from 'next/navigation'
import Link from 'next/link'
import { categories } from '@/lib/categories'
import { ArrowLeft, ArrowRight, Building, Package } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CategoryPageProps {
  params: Promise<{
    categoryId: string
  }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { categoryId } = await params
  const category = categories.find(cat => cat.id === categoryId)

  if (!category) {
    notFound()
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container-luxury">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/categories" className="hover:text-gray-700 transition-colors">
            Категории
          </Link>
          <span>/</span>
          <span className="text-gray-700">{category.name}</span>
        </nav>

        {/* Page Header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div 
              className={cn(
                "w-20 h-20 rounded-2xl bg-gradient-to-br flex items-center justify-center text-3xl",
                category.gradient
              )}
            >
              {category.icon}
            </div>
            <div className="text-left">
              <h1 className="text-4xl lg:text-5xl font-normal text-gray-800 mb-2 tracking-wide">
                {category.name}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Package className="w-4 h-4" />
                  <span>{category.subcategories.length} подкатегорий</span>
                </div>
                <div className="flex items-center gap-1">
                  <Building className="w-4 h-4" />
                  <span>
                    {Array.from(new Set(category.subcategories.flatMap(sub => sub.brands?.map(b => b.id) || []))).length} брендов
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-lg lg:text-xl text-luxury max-w-3xl mx-auto">
            {category.description}
          </p>
        </div>

        {/* Subcategories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-16">
          {category.subcategories.map((subcategory, index) => (
            <Link
              key={subcategory.id}
              href={`/categories/${categoryId}/${subcategory.id}`}
              className="group block animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-card hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1 h-full">
                {/* Subcategory Header */}
                <div className="mb-4">
                  <h3 className="text-xl lg:text-2xl font-normal text-gray-800 mb-2 group-hover:text-yellow-600 transition-colors">
                    {subcategory.name}
                  </h3>
                  {subcategory.description && (
                    <p className="text-gray-600 text-sm">
                      {subcategory.description}
                    </p>
                  )}
                </div>

                {/* Brands */}
                {subcategory.brands && subcategory.brands.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-3 uppercase tracking-wider">
                      Доступные бренды:
                    </h4>
                    <div className="space-y-3">
                      {subcategory.brands.map((brand) => (
                        <div key={brand.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors">
                          <div className="w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">
                            {brand.name.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-medium text-gray-800 text-sm">
                              {brand.name}
                            </div>
                            {brand.description && (
                              <div className="text-xs text-gray-500">
                                {brand.description}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    Смотреть товары
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-yellow-600 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Featured Brands Section */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl lg:rounded-3xl p-8 lg:p-12 mb-16">
          <h2 className="text-2xl lg:text-3xl font-normal text-gray-800 mb-8 text-center tracking-wide">
            Рекомендуемые бренды в категории "{category.name}"
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from(new Set(category.subcategories.flatMap(sub => sub.brands || []))).slice(0, 6).map((brand) => (
              <div key={brand.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-800 rounded-xl flex items-center justify-center text-white font-bold">
                    {brand.name.substring(0, 2)}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">
                      {brand.name}
                    </h4>
                    {brand.description && (
                      <p className="text-sm text-gray-500">
                        {brand.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Link 
            href="/categories" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад к категориям
          </Link>
          
          <Link 
            href="/catalog" 
            className="inline-flex items-center gap-2 button-secondary"
          >
            Смотреть все товары
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
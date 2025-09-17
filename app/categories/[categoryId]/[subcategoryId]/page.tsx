import { notFound } from 'next/navigation'
import Link from 'next/link'
import { categories } from '@/lib/categories'
import { ArrowLeft, ArrowRight, Star, Package, Award } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SubcategoryPageProps {
  params: Promise<{
    categoryId: string
    subcategoryId: string
  }>
}

export default async function SubcategoryPage({ params }: SubcategoryPageProps) {
  const { categoryId, subcategoryId } = await params
  const category = categories.find(cat => cat.id === categoryId)
  const subcategory = category?.subcategories.find(sub => sub.id === subcategoryId)

  if (!category || !subcategory) {
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
          <Link href={`/categories/${categoryId}`} className="hover:text-gray-700 transition-colors">
            {category.name}
          </Link>
          <span>/</span>
          <span className="text-gray-700">{subcategory.name}</span>
        </nav>

        {/* Page Header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div 
              className={cn(
                "w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center text-2xl",
                category.gradient
              )}
            >
              {category.icon}
            </div>
            <div className="text-left">
              <h1 className="text-4xl lg:text-5xl font-normal text-gray-800 mb-2 tracking-wide">
                {subcategory.name}
              </h1>
              <p className="text-gray-500">
                в категории "{category.name}"
              </p>
            </div>
          </div>
          
          {subcategory.description && (
            <p className="text-lg lg:text-xl text-luxury max-w-3xl mx-auto">
              {subcategory.description}
            </p>
          )}
        </div>

        {/* Brands Grid */}
        {subcategory.brands && subcategory.brands.length > 0 && (
          <div className="mb-16 lg:mb-20">
            <div className="text-center mb-12">
              <h2 className="text-2xl lg:text-3xl font-normal text-gray-800 mb-4 tracking-wide">
                Доступные бренды
              </h2>
              <p className="text-gray-600">
                Выберите бренд для просмотра товаров
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {subcategory.brands.map((brand, index) => (
                <Link
                  key={brand.id}
                  href={`/categories/${categoryId}/${subcategoryId}/${brand.id}`}
                  className="group block animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="bg-white rounded-2xl p-8 shadow-card hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1 h-full">
                    {/* Brand Logo/Avatar */}
                    <div className="flex items-center justify-center mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-gray-600 to-gray-800 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
                        {brand.name.split(' ').map(word => word[0]).join('').substring(0, 2)}
                      </div>
                    </div>

                    {/* Brand Info */}
                    <div className="text-center mb-6">
                      <h3 className="text-xl lg:text-2xl font-normal text-gray-800 mb-2 group-hover:text-yellow-600 transition-colors">
                        {brand.name}
                      </h3>
                      {brand.description && (
                        <p className="text-gray-600 text-sm">
                          {brand.description}
                        </p>
                      )}
                    </div>

                    {/* Features/Stats */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Award className="w-4 h-4 text-yellow-500" />
                        <span>Премиум качество</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>Высокий рейтинг</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Package className="w-4 h-4 text-yellow-500" />
                        <span>Быстрая доставка</span>
                      </div>
                    </div>

                    {/* Action */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Смотреть товары
                      </span>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-yellow-600 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl lg:rounded-3xl p-8 lg:p-12 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-normal text-gray-800 mb-4 tracking-wide">
              Почему выбирают {subcategory.name}?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-medium text-gray-800 mb-2">Высокое качество</h4>
              <p className="text-sm text-gray-600">
                Только проверенные бренды с мировой репутацией
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-lg font-medium text-gray-800 mb-2">Эксклюзивность</h4>
              <p className="text-sm text-gray-600">
                Уникальные изделия, недоступные в обычных магазинах
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-lg font-medium text-gray-800 mb-2">Надежность</h4>
              <p className="text-sm text-gray-600">
                Гарантия качества и профессиональная упаковка
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Link 
            href={`/categories/${categoryId}`}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад к {category.name}
          </Link>
          
          <Link 
            href="/catalog" 
            className="inline-flex items-center gap-2 button-secondary"
          >
            Все товары каталога
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
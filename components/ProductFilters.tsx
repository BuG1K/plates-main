'use client'

import { useState } from 'react'
import { ChevronDown, Grid, List, Filter, X, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FilterOptions, SortOption, ViewMode } from '@/types'

interface ProductFiltersProps {
  filters: FilterOptions
  sortBy: string
  viewMode: ViewMode
  onFiltersChange: (filters: FilterOptions) => void
  onSortChange: (sortBy: string) => void
  onViewModeChange: (viewMode: ViewMode) => void
  totalProducts: number
}

const sortOptions: SortOption[] = [
  { id: 'featured', label: 'Рекомендуемые', field: 'isPopular', direction: 'desc' },
  { id: 'newest', label: 'Новые', field: 'isNewArrival', direction: 'desc' },
  { id: 'price-low', label: 'Цена: по возрастанию', field: 'price', direction: 'asc' },
  { id: 'price-high', label: 'Цена: по убыванию', field: 'price', direction: 'desc' },
  { id: 'name', label: 'По названию: А-Я', field: 'name', direction: 'asc' },
]

const priceRanges = [
  { id: 'all', label: 'Все цены', min: undefined, max: undefined },
  { id: 'under-50', label: 'До $50', min: 0, max: 50 },
  { id: '50-100', label: '$50 - $100', min: 50, max: 100 },
  { id: '100-200', label: '$100 - $200', min: 100, max: 200 },
  { id: '200-500', label: '$200 - $500', min: 200, max: 500 },
  { id: 'over-500', label: 'Свыше $500', min: 500, max: Infinity },
]

const materials = [
  'Все материалы',
  'Фарфор',
  'Керамика',
  'Каменная керамика',
  'Тонкий фарфор',
  'Стекло',
  'Нержавеющая сталь',
  'Серебро',
  'Дерево',
  'Бамбук',
  'Меламин'
]

const categories = [
  { id: '', label: 'Все категории' },
  { id: 'dinnerware', label: 'Столовая посуда' },
  { id: 'cutlery', label: 'Столовые приборы' },
  { id: 'serveware', label: 'Сервировочная посуда' },
  { id: 'accessories', label: 'Аксессуары для стола' },
]

export default function ProductFilters({
  filters,
  sortBy,
  viewMode,
  onFiltersChange,
  onSortChange,
  onViewModeChange,
  totalProducts
}: ProductFiltersProps) {
  const [openFilter, setOpenFilter] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const toggleFilter = (filterId: string) => {
    setOpenFilter(openFilter === filterId ? null : filterId)
  }

  const updateFilter = (key: keyof FilterOptions, value: string | number | boolean | undefined) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const clearFilters = () => {
    onFiltersChange({})
    onSortChange('featured') // Reset to default sort
  }

  const getActiveFilterCount = () => {
    let count = 0
    
    // Category filter
    if (filters.category && filters.category !== '') count++
    
    // Price range filters
    if (filters.minPrice !== undefined && filters.minPrice !== null) count++
    if (filters.maxPrice !== undefined && filters.maxPrice !== null && filters.maxPrice !== Infinity) count++
    
    // Material filter
    if (filters.material && filters.material !== '') count++
    
    // In stock filter
    if (filters.inStock === true) count++
    
    return count
  }

  const activeFilterCount = getActiveFilterCount()

  return (
    <>
      {/* Main Filter Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-32 z-30">
        <div className="container-luxury py-4">
          <div className="flex items-center justify-between">
            {/* Left Side - Filters */}
            <div className="flex items-center gap-4">
              {/* Mobile Filter Button */}
              <button
                onClick={() => setShowFilters(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
              >
                <Filter className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  Фильтры {activeFilterCount > 0 && `(${activeFilterCount})`}
                </span>
              </button>

              {/* Desktop Filters */}
              <div className="hidden lg:flex items-center gap-4">
                {/* Category Filter */}
                <div className="relative">
                  <button
                    onClick={() => toggleFilter('category')}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
                  >
                    <span className="text-sm font-medium text-gray-700">
                      Категория
                      {filters.category && ` (${categories.find(c => c.id === filters.category)?.label})`}
                    </span>
                    <ChevronDown 
                      className={cn(
                        "w-4 h-4 text-gray-500 transition-transform",
                        openFilter === 'category' ? 'rotate-180' : ''
                      )} 
                    />
                  </button>
                  
                  {openFilter === 'category' && (
                    <div className="absolute top-12 left-0 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                      <div className="p-4">
                        {categories.map((category) => (
                          <label key={category.id} className="flex items-center gap-3 py-2 cursor-pointer hover:bg-gray-50 rounded px-2">
                            <input
                              type="radio"
                              name="category"
                              value={category.id}
                              checked={filters.category === category.id}
                              onChange={(e) => updateFilter('category', e.target.value)}
                              className="text-yellow-400 focus:ring-yellow-400"
                            />
                            <span className="text-sm text-gray-700">{category.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Price Filter */}
                <div className="relative">
                  <button
                    onClick={() => toggleFilter('price')}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
                  >
                    <span className="text-sm font-medium text-gray-700">
                      Цена
                      {(filters.minPrice !== undefined || filters.maxPrice !== undefined) && ' (Custom)'}
                    </span>
                    <ChevronDown 
                      className={cn(
                        "w-4 h-4 text-gray-500 transition-transform",
                        openFilter === 'price' ? 'rotate-180' : ''
                      )} 
                    />
                  </button>
                  
                  {openFilter === 'price' && (
                    <div className="absolute top-12 left-0 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                      <div className="p-4">
                        {priceRanges.map((range) => (
                          <label key={range.id} className="flex items-center gap-3 py-2 cursor-pointer hover:bg-gray-50 rounded px-2">
                            <input
                              type="radio"
                              name="priceRange"
                              value={range.id}
                              checked={
                                (range.min === undefined && range.max === undefined && 
                                 filters.minPrice === undefined && filters.maxPrice === undefined) ||
                                (filters.minPrice === range.min && filters.maxPrice === range.max)
                              }
                              onChange={() => {
                                updateFilter('minPrice', range.min)
                                updateFilter('maxPrice', range.max)
                              }}
                              className="text-yellow-400 focus:ring-yellow-400"
                            />
                            <span className="text-sm text-gray-700">{range.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Material Filter */}
                <div className="relative">
                  <button
                    onClick={() => toggleFilter('material')}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
                  >
                    <span className="text-sm font-medium text-gray-700">
                      Материал
                      {filters.material && ` (${filters.material})`}
                    </span>
                    <ChevronDown 
                      className={cn(
                        "w-4 h-4 text-gray-500 transition-transform",
                        openFilter === 'material' ? 'rotate-180' : ''
                      )} 
                    />
                  </button>
                  
                  {openFilter === 'material' && (
                    <div className="absolute top-12 left-0 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                      <div className="p-4">
                        {materials.map((material) => (
                          <label key={material} className="flex items-center gap-3 py-2 cursor-pointer hover:bg-gray-50 rounded px-2">
                            <input
                              type="radio"
                              name="material"
                              value={material}
                              checked={
                                (material === 'Все материалы' && !filters.material) ||
                                filters.material === material
                              }
                              onChange={(e) => updateFilter('material', e.target.value === 'Все материалы' ? '' : e.target.value)}
                              className="text-yellow-400 focus:ring-yellow-400"
                            />
                            <span className="text-sm text-gray-700">{material}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* In Stock Filter */}
                <label className="flex items-center gap-3 px-4 py-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.inStock || false}
                    onChange={(e) => updateFilter('inStock', e.target.checked)}
                    className="text-yellow-400 focus:ring-yellow-400"
                  />
                  <span className="text-sm font-medium text-gray-700">Только в наличии</span>
                </label>

                {/* Clear Filters */}
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-gray-500 hover:text-gray-700 underline"
                  >
                    Очистить всё ({activeFilterCount})
                  </button>
                )}
              </div>
            </div>

            {/* Right Side - Sort and View */}
            <div className="flex items-center gap-4">
              {/* Results Count */}
              <span className="hidden sm:block text-sm text-gray-500">
                {totalProducts} {totalProducts === 1 ? 'товар' : 'товаров'}
              </span>

              {/* Sort Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleFilter('sort')}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
                >
                  <span className="text-sm font-medium text-gray-700">
                    {sortOptions.find(option => option.id === sortBy)?.label || 'Сортировка'}
                  </span>
                  <ChevronDown 
                    className={cn(
                      "w-4 h-4 text-gray-500 transition-transform",
                      openFilter === 'sort' ? 'rotate-180' : ''
                    )} 
                  />
                </button>
                
                {openFilter === 'sort' && (
                  <div className="absolute top-12 right-0 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <div className="p-2">
                      {sortOptions.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => {
                            onSortChange(option.id)
                            setOpenFilter(null)
                          }}
                          className={cn(
                            "w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-50 transition-colors flex items-center justify-between",
                            sortBy === option.id ? 'text-yellow-600 font-medium' : 'text-gray-700'
                          )}
                        >
                          {option.label}
                          {sortBy === option.id && <Check className="w-4 h-4" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* View Mode Toggle */}
              <div className="flex items-center gap-1 border border-gray-300 rounded-lg p-1">
                <button
                  onClick={() => onViewModeChange('grid')}
                  className={cn(
                    "p-1.5 rounded transition-colors",
                    viewMode === 'grid' ? 'bg-gray-100 text-gray-700' : 'text-gray-400 hover:text-gray-600'
                  )}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onViewModeChange('list')}
                  className={cn(
                    "p-1.5 rounded transition-colors",
                    viewMode === 'list' ? 'bg-gray-100 text-gray-700' : 'text-gray-400 hover:text-gray-600'
                  )}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Click overlay to close dropdowns */}
        {openFilter && (
          <div 
            className="fixed inset-0 z-20" 
            onClick={() => setOpenFilter(null)}
          />
        )}
      </div>

      {/* Mobile Filters Modal */}
      {showFilters && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="absolute inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Фильтры</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Category Section */}
              <div>
                <h4 className="text-sm font-medium text-gray-800 mb-3">Категория</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category.id} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={category.id}
                        checked={filters.category === category.id}
                        onChange={(e) => updateFilter('category', e.target.value)}
                        className="text-yellow-400 focus:ring-yellow-400"
                      />
                      <span className="text-sm text-gray-700">{category.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Section */}
              <div>
                <h4 className="text-sm font-medium text-gray-800 mb-3">Категория цен</h4>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <label key={range.id} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="priceRange"
                        value={range.id}
                        checked={
                          (range.min === undefined && range.max === undefined && 
                           filters.minPrice === undefined && filters.maxPrice === undefined) ||
                          (filters.minPrice === range.min && filters.maxPrice === range.max)
                        }
                        onChange={() => {
                          updateFilter('minPrice', range.min)
                          updateFilter('maxPrice', range.max)
                        }}
                        className="text-yellow-400 focus:ring-yellow-400"
                      />
                      <span className="text-sm text-gray-700">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Material Section */}
              <div>
                <h4 className="text-sm font-medium text-gray-800 mb-3">Материал</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {materials.map((material) => (
                    <label key={material} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="material"
                        value={material}
                        checked={
                          (material === 'Все материалы' && !filters.material) ||
                          filters.material === material
                        }
                        onChange={(e) => updateFilter('material', e.target.value === 'Все материалы' ? '' : e.target.value)}
                        className="text-yellow-400 focus:ring-yellow-400"
                      />
                      <span className="text-sm text-gray-700">{material}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* In Stock */}
              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.inStock || false}
                    onChange={(e) => updateFilter('inStock', e.target.checked)}
                    className="text-yellow-400 focus:ring-yellow-400"
                  />
                  <span className="text-sm font-medium text-gray-700">Только в наличии</span>
                </label>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-200 p-4 space-y-3">
              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="w-full py-2 text-sm text-gray-500 hover:text-gray-700 underline"
                >
                  Очистить все фильтры
                </button>
              )}
              <button
                onClick={() => setShowFilters(false)}
                className="w-full button-primary"
              >
                Показать {totalProducts} товаров
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
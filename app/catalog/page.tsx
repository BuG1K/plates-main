'use client'

import { useState, useMemo, useEffect, use } from 'react'
import CatalogNavigation from '@/components/CatalogNavigation'
import ProductFilters from '@/components/ProductFilters'
import EnhancedProductCard from '@/components/EnhancedProductCard'
import { allProducts } from '@/lib/data'
import { useCatalogStore } from '@/store/catalog-store'
import { useCartStore } from '@/store/cart-store'
import { useWishlistStore } from '@/store/wishlist-store'
import { Product } from '@/types'
import { cn } from '@/lib/utils'
import Basket from '@/components/Basket'

// Note: Metadata export removed due to 'use client' directive
// In a real Next.js 13+ app, you'd handle this differently or use a Server Component wrapper

export default function CatalogPage() {
  const [loadingCatalog, setLoadingCatalog] = useState(true)
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)
  
  // Store hooks
  const { 
    filters, 
    sortBy, 
    viewMode, 
    updateFilters, 
    setSortBy, 
    setViewMode, 
    getFilteredProducts 
  } = useCatalogStore()
  
  const { addItem: addToCart, getTotalItems } = useCartStore()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist, items: wishlistItems } = useWishlistStore()

  // Active category state for navigation
  const [activeCategory, setActiveCategory] = useState('')

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return getFilteredProducts(allProducts)
  }, [getFilteredProducts])

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    updateFilters({ category })
  }

  const handleAddToCart = (product: Product) => {
    addToCart(product)
    // You could add a toast notification here
    console.log(`Added ${product.name} to cart`)
  }

  const handleWishlistToggle = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
      console.log(`Removed ${product.name} from wishlist`)
    } else {
      addToWishlist(product)
      console.log(`Added ${product.name} to wishlist`)
    }
  }

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product)
  }

  const [products, setProducts] = useState([]);
  const [categorie, setCategorie] = useState('Новинки')
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState("");
  const [showBasket, setShowBasket] = useState(false);

  useEffect(() => {
    fetch(
      "https://gorgeous-captain-cd0a26631f.strapiapp.com/api/products?populate=*"
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data)
      })
      .catch((err) => console.error('Error fetching data:', err))

    fetch(
      "https://gorgeous-captain-cd0a26631f.strapiapp.com/api/categories?&populate=*"
    )
      .then((res) => res.json())
      .then((data) => {
        const res = data.data.map(({ name }) => name)
        
        setCategories(['Новинки', ...res, "Распродажа"])
      })
      .catch((err) => console.error('Error fetching data:', err))
  }, []);

  const onSetCategorie = (czt) => {
    setCategorie(czt)
  };

  const filtProducts = useMemo(() => {
    if (query) {
      const filtered = products.filter(p => {
        const words = query.toLowerCase().split(" ").filter(Boolean);

        return words.every(word =>
          p.name.toLowerCase().includes(word) ||
          p.description.toLowerCase().includes(word)
        );
      });

      return filtered;
    }

    if (categorie === "wishlist") {
      console.log(categorie)
      const df = window.localStorage.getItem("luxetable-wishlist")
      const dfg = JSON.parse(df)
      console.log(dfg)
      const ids = dfg.state.items.map((item) => item.id)
      
      return products.filter((product) => ids.includes(product.id));
    }


    if (categorie === 'Новинки') {
      return products.filter((product) => product.isNewArrival);
    } else if (categorie === 'Распродажа') {
      return products.filter((product) => product.oldPrice);
    } else if (categorie) {
      return products.filter((product) => product.category === categorie);
    }
  }, [categorie, query, products])

  return (
    <div className="min-h-screen">
      {/* Enhanced Catalog Navigation */}
      <CatalogNavigation
        categorie={categorie}
        categories={categories}
        onSetCategorie={onSetCategorie}
        query={query}
        setQuery={setQuery}
        setShowBasket={setShowBasket}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        cartItemCount={getTotalItems()}
        wishlistItemCount={wishlistItems.length}
      />

      {showBasket && (
        <Basket onClose={() => setShowBasket(false)}  />
      )}
      

      {/* Product Filters */}
      {/* <ProductFilters
        filters={filters}
        sortBy={sortBy}
        viewMode={viewMode}
        onFiltersChange={updateFilters}
        onSortChange={setSortBy}
        onViewModeChange={setViewMode}
        totalProducts={filteredProducts.length}
      /> */}

      <div className="container-luxury py-8">
        {/* Page Header */}
        {/* <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-normal text-gray-800 mb-6 tracking-wide">
            {activeCategory ? 
              activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1).replace('-', ' ') : 
              'Наша коллекция'
            }
          </h1>
          <p className="text-lg lg:text-xl text-luxury max-w-3xl mx-auto">
            {filteredProducts.length === 0 
              ? 'Ни один товар не подходит под выбранные фильтры. Попробуйте изменить критерии поиска.'
              : `Откройте для себя наш ${activeCategory || 'полный'} ассортимент роскошной посуды`
            }
          </p>
        </div> */}

        {/* Products Grid/List */}
        {filteredProducts.length > 0 ? (
          <div className={cn(
            viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8'
              : 'space-y-6'
          )}>
            {products.length === 0 && [1, 2, 3, 4].map((product) => (
              <EnhancedProductCard
                loading={true}
                key={product}
                product={{
                  id: product,
                  name: `Product ${product}`,
                  description: 'A beautiful product',
                  price: 1,
                  oldPrice: product % 2 === 0 ? 129.99 : undefined,
                  image: '/placeholder.png',
                  rating: 4.5,
                  reviewCount: 10,
                  inStock: true,
                  isNewArrival: product % 2 === 0,
                  category: 'Category',
                  img: ['/placeholder.png'],
                }}
                viewMode={"grid"}
                className={cn(
                  viewMode === 'list' ? 'max-w-none' : ''
                )}
              />
            ))}
            {products.length !== 0 && filtProducts.map((product) => (
              <EnhancedProductCard
                key={product.name}
                product={product}
                viewMode={viewMode}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleWishlistToggle}
                onQuickView={handleQuickView}
                isInWishlist={isInWishlist(product.id)}
                className={cn(
                  viewMode === 'list' ? 'max-w-none' : ''
                )}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl p-12 shadow-card max-w-2xl mx-auto">
              <h3 className="text-2xl font-normal text-gray-800 mb-4">
                Товары не найдены
              </h3>
              <p className="text-luxury mb-6">
                Мы не смогли найти ни одного товара, соответствующего выбранным фильтрам. 
                Попробуйте изменить критерии поиска или просмотреть все товары.
              </p>
              <button 
                onClick={() => updateFilters({})}
                className="button-primary"
              >
                Очистить все фильтры
              </button>
            </div>
          </div>
        )}

        {/* Load More Button (if needed for pagination) */}
        {filteredProducts.length > 12 && (
          <div className="text-center mt-12">
            <button className="button-secondary">
              Показать ещё товары
            </button>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center mt-16 lg:mt-20">
          <div className="bg-white rounded-2xl lg:rounded-3xl p-8 lg:p-16 shadow-card max-w-4xl mx-auto">
            <h2 className="text-2xl lg:text-3xl font-normal text-gray-800 mb-6 tracking-wide">
              Доступны индивидуальные заказы
            </h2>
            <p className="text-base lg:text-lg text-luxury mb-8">
              Ищете что-то особенное? Мы предлагаем индивидуальные решения для посуды, 
              адаптированные под ваш уникальный стиль и требования.
            </p>
            <button className="button-primary">
              Свяжитесь с нами для индивидуальных заказов
            </button>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-normal text-gray-800">Быстрый просмотр</h3>
                <button
                  onClick={() => setQuickViewProduct(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                >
                  ✕
                </button>
              </div>
              
              <EnhancedProductCard
                product={quickViewProduct}
                viewMode="list"
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleWishlistToggle}
                isInWishlist={isInWishlist(quickViewProduct.id)}
                className="shadow-none border-0"
              />
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      handleAddToCart(quickViewProduct)
                      setQuickViewProduct(null)
                    }}
                    disabled={quickViewProduct.inStock === false}
                    className="flex-1 button-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {quickViewProduct.inStock === false ? 'Нет в наличии' : 'В корзину'}
                  </button>
                  <button
                    onClick={() => {
                      handleWishlistToggle(quickViewProduct)
                      setQuickViewProduct(null)
                    }}
                    className="flex-1 button-secondary"
                  >
                    {isInWishlist(quickViewProduct.id) ? 'Убрать из списка желаний' : 'Добавить в список желаний'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
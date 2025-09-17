'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Review {
  id: number
  customerName: string
  customerLocation: string
  rating: number
  reviewText: string
  productPurchased: string
  avatar: string
  date: string
  verified: boolean
}

interface CustomerReviewsProps {
  className?: string
}

const reviews: Review[] = [
  {
    id: 1,
    customerName: 'Анна Петрова',
    customerLocation: 'Москва',
    rating: 5,
    reviewText: 'Невероятное качество! Посуда выглядит еще лучше вживую. Гости постоянно спрашивают, где я это купила. Упаковка была безупречной, доставка быстрая.',
    productPurchased: 'Элегантная посуда с золотым ободком',
    avatar: 'АП',
    date: '15 декабря 2024',
    verified: true
  },
  {
    id: 2,
    customerName: 'Михаил Соколов',
    customerLocation: 'Санкт-Петербург',
    rating: 5,
    reviewText: 'Купил набор для ресторана. Персонал и гости в восторге! Качество на высшем уровне, выдерживает интенсивное использование.',
    productPurchased: 'Изысканные позолоченные столовые приборы',
    avatar: 'МС',
    date: '12 декабря 2024',
    verified: true
  },
  {
    id: 3,
    customerName: 'Елена Волкова',
    customerLocation: 'Казань',
    rating: 5,
    reviewText: 'Заказывала на юбилей родителей. Все остались довольны! Посуда действительно премиум класса, смотрится дорого и стильно.',
    productPurchased: 'Классические тарелки с золотым ободком',
    avatar: 'ЕВ',
    date: '10 декабря 2024',
    verified: true
  },
  {
    id: 4,
    customerName: 'Дмитрий Орлов',
    customerLocation: 'Екатеринбург',
    rating: 4,
    reviewText: 'Отличное качество материалов и исполнения. Единственное пожелание - хотелось бы больше вариантов цветов. В остальном все супер!',
    productPurchased: 'Роскошные серые керамические миски',
    avatar: 'ДО',
    date: '8 декабря 2024',
    verified: true
  },
  {
    id: 5,
    customerName: 'Ольга Морозова',
    customerLocation: 'Новосибирск',
    rating: 5,
    reviewText: 'Потрясающе! Использую уже полгода, выглядит как новая. Мою в посудомойке - никаких проблем. Рекомендую всем!',
    productPurchased: 'Современное серое керамическое блюдо',
    avatar: 'ОМ',
    date: '5 декабря 2024',
    verified: true
  }
]

const renderStars = (rating: number) => {
  const stars = []
  for (let i = 0; i < 5; i++) {
    stars.push(
      <Star 
        key={i} 
        className={cn(
          "w-4 h-4",
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        )}
      />
    )
  }
  return stars
}

export default function CustomerReviews({ className }: CustomerReviewsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex(currentIndex === 0 ? reviews.length - 1 : currentIndex - 1)
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex(currentIndex === reviews.length - 1 ? 0 : currentIndex + 1)
  }

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false)
    setCurrentIndex(index)
  }

  return (
    <section className={cn("section-padding bg-white", className)}>
      <div className="container-luxury">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-section font-normal text-gray-800 mb-4 lg:mb-6 tracking-wide">
            Отзывы наших клиентов
          </h2>
          <p className="text-base lg:text-lg text-luxury max-w-2xl mx-auto">
            Более 2000+ довольных клиентов делятся своим опытом использования нашей посуды
          </p>
        </div>

        {/* Reviews Slider */}
        <div className="relative max-w-4xl mx-auto">
          {/* Slider Container */}
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {reviews.map((review) => (
                <div key={review.id} className="w-full flex-shrink-0">
                  <div className="bg-gray-50 p-8 lg:p-12 mx-4 rounded-2xl shadow-card">
                    {/* Quote Icon */}
                    <div className="flex justify-center mb-6">
                      <div className="w-12 h-12 bg-yellow-400/20 rounded-full flex items-center justify-center">
                        <Quote className="w-6 h-6 text-yellow-600" />
                      </div>
                    </div>

                    {/* Review Content */}
                    <div className="text-center mb-8">
                      <p className="text-base lg:text-lg text-gray-700 leading-relaxed mb-6 italic">
                        "{review.reviewText}"
                      </p>
                      
                      {/* Rating */}
                      <div className="flex justify-center items-center gap-1 mb-4">
                        {renderStars(review.rating)}
                      </div>

                      {/* Product Info */}
                      <p className="text-sm text-gray-500 mb-6">
                        Товар: {review.productPurchased}
                      </p>
                    </div>

                    {/* Customer Info */}
                    <div className="flex items-center justify-center gap-4">
                      {/* Avatar */}
                      <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center text-white font-semibold">
                        {review.avatar}
                      </div>
                      
                      {/* Customer Details */}
                      <div className="text-left">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-gray-800">
                            {review.customerName}
                          </h4>
                          {review.verified && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                              Проверен
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">
                          {review.customerLocation} • {review.date}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-gray-800 hover:shadow-xl transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-gray-800 hover:shadow-xl transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index === currentIndex 
                  ? "bg-yellow-400 w-6" 
                  : "bg-gray-300 hover:bg-gray-400"
              )}
            />
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 lg:mt-20">
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">4.9</div>
            <div className="flex justify-center items-center gap-1 mb-2">
              {renderStars(5)}
            </div>
            <p className="text-sm text-gray-500">Средняя оценка</p>
          </div>
          
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">2,347</div>
            <p className="text-sm text-gray-500">Довольных клиентов</p>
          </div>
          
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">98%</div>
            <p className="text-sm text-gray-500">Рекомендуют друзьям</p>
          </div>
        </div>
      </div>
    </section>
  )
}
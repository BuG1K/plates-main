'use client'

import { cn } from '@/lib/utils'

interface TrustedBrandsProps {
  className?: string
}

const trustedBrands = [
  {
    id: 1,
    name: 'Four Seasons Hotels',
    logo: 'FS',
    description: 'Luxury hotel chain',
    gradient: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
  },
  {
    id: 2,
    name: 'The Ritz-Carlton',
    logo: 'RC',
    description: 'Premium hospitality',
    gradient: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)'
  },
  {
    id: 3,
    name: 'Michelin Restaurants',
    logo: 'M★',
    description: 'Fine dining establishments',
    gradient: 'linear-gradient(135deg, #DC143C 0%, #B22222 100%)'
  },
  {
    id: 4,
    name: 'Le Bernardin',
    logo: 'LB',
    description: 'Acclaimed restaurant',
    gradient: 'linear-gradient(135deg, #4682B4 0%, #5F9EA0 100%)'
  },
  {
    id: 5,
    name: 'Nobu',
    logo: 'N',
    description: 'Japanese fine dining',
    gradient: 'linear-gradient(135deg, #2F4F4F 0%, #696969 100%)'
  },
  {
    id: 6,
    name: 'The French Laundry',
    logo: 'FL',
    description: 'Culinary excellence',
    gradient: 'linear-gradient(135deg, #8B008B 0%, #9932CC 100%)'
  }
]

export default function TrustedBrands({ className }: TrustedBrandsProps) {
  return (
    <section className={cn("section-padding bg-gray-50", className)}>
      <div className="container-luxury">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-section font-normal text-gray-800 mb-4 lg:mb-6 tracking-wide">
            Нам доверяют
          </h2>
          <p className="text-base lg:text-lg text-luxury max-w-2xl mx-auto">
            Ведущие рестораны, отели и шеф-повара по всему миру выбирают нашу посуду
            для создания незабываемых впечатлений
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8">
          {trustedBrands.map((brand, index) => (
            <div
              key={brand.id}
              className="group cursor-pointer animate-slide-up flex"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-white rounded-xl p-6 lg:p-8 shadow-card hover:shadow-lg transition-all duration-300 text-center group-hover:-translate-y-1 flex flex-col items-center justify-between w-full min-h-[140px] lg:min-h-[160px]">
                <div className="flex flex-col items-center">
                  {/* Brand Logo/Initial */}
                  <div 
                    className="w-14 h-14 lg:w-16 lg:h-16 mb-3 lg:mb-4 rounded-full flex items-center justify-center text-white font-bold text-base lg:text-lg transition-all duration-300 group-hover:scale-110"
                    style={{ background: brand.gradient }}
                  >
                    {brand.logo}
                  </div>
                  
                  {/* Brand Name */}
                  <h3 className="text-xs lg:text-sm font-medium text-gray-800 mb-1 group-hover:text-yellow-600 transition-colors duration-300 text-center leading-tight">
                    {brand.name}
                  </h3>
                </div>
                
                {/* Brand Description */}
                <p className="text-xs text-gray-500 mt-auto">
                  {brand.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-12 lg:mt-16">
          <p className="text-sm lg:text-base text-luxury">
            Более 500+ ресторанов и отелей премиум-класса доверяют качеству нашей посуды
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-8 left-8 w-20 h-20 bg-yellow-400/5 rounded-full blur-xl hidden lg:block" />
        <div className="absolute bottom-8 right-8 w-16 h-16 bg-gray-200/50 rounded-full blur-lg hidden lg:block" />
      </div>
    </section>
  )
}
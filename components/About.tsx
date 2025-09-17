'use client'

import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AboutProps {
  className?: string
  showButton?: boolean
  onLearnMore?: () => void
}

export default function About({ 
  className, 
  showButton = true, 
  onLearnMore 
}: AboutProps) {
  const handleLearnMore = () => {
    if (onLearnMore) {
      onLearnMore()
    } else {
      // Default behavior - navigate to about page
      window.location.href = '/about'
    }
  }

  return (
    <section className={cn("mx-4 lg:mx-16 mb-16 lg:mb-20", className)}>
      <div className="bg-white rounded-2xl lg:rounded-3xl p-8 lg:p-16 shadow-card">
        <div className="max-w-4xl">
          <h2 className="text-section font-normal text-gray-800 mb-6 lg:mb-8 tracking-wide">
            О бренде
          </h2>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-base lg:text-lg text-luxury mb-6 lg:mb-8">
              LuxeTable — это бренд роскошной посуды, посвящённый созданию высококачественной 
              и стильной столовой утвари. Наши дизайны сочетают классическую элегантность с современными 
              тенденциями, используя премиальные материалы и тщательное мастерство.
            </p>
            
            <p className="text-base lg:text-lg text-luxury mb-8 lg:mb-10">
              Мы верим в улучшение впечатлений от трапезы и создание незабываемых моментов 
              через изысканную посуду. Исследуйте наши коллекции и окунитесь в 
              искусство роскошного застолья.
            </p>
          </div>
          
          {showButton && (
            <button
              onClick={handleLearnMore}
              className="inline-flex items-center gap-2 button-secondary group"
            >
              Узнать больше
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          )}
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-8 right-8 w-20 h-20 bg-yellow-400/5 rounded-full blur-xl hidden lg:block" />
        <div className="absolute bottom-8 left-8 w-16 h-16 bg-orange-100/50 rounded-full blur-lg hidden lg:block" />
      </div>
    </section>
  )
}
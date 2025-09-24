'use client'

import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import baner from '../lib/wh.jpg'

interface HeroProps {
  title?: string
  description?: string
  buttonText?: string
  onButtonClick?: () => void
  className?: string
}

export default function Hero({
  title = "Новая коллекция",
  description = "Откройте для себя новинки роскошной посуды. Наша новая коллекция представляет изысканный дизайн и премиальные материалы, идеальные для любого торжества.",
  buttonText = "Смотреть каталог",
  onButtonClick,
  className
}: HeroProps) {
  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick()
    } else {
      // Default behavior - scroll to products or navigate to catalog
      const productsSection = document.querySelector('#new-arrivals')
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <section className={cn("relative mx-4 lg:mx-16 my-5 lg:my-8", className)}>
      <div className="relative h-[400px] lg:h-[500px] bg-gradient-to-br from-neutral-900 to-neutral-700 rounded-2xl lg:rounded-3xl overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 800 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="400"
              cy="250"
              r="150"
              fill="none"
              stroke="white"
              strokeWidth="1"
              opacity="0.2"
            />
            <circle
              cx="400"
              cy="250"
              r="120"
              fill="none"
              stroke="white"
              strokeWidth="1"
              opacity="0.3"
            />
            <circle
              cx="400"
              cy="250"
              r="90"
              fill="none"
              stroke="white"
              strokeWidth="1"
              opacity="0.4"
            />
          </svg>
        </div>

        {/* Content */}
        <div
          className="relative z-10 h-full flex items-center justify-center"
        >
          <div 
            className="relative w-full h-[250px] sm:h-[400px] overflow-hidden"
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: "-20" }}
          >
            <Image
              src={baner}
              alt="banner"
              fill
              className="object-cover"
              style={{ zIndex: "-10", opacity: 0.3 }}
              priority
            />
          </div>
          <div className="text-center max-w-2xl px-6 lg:px-8">
            <h1 className="text-4xl lg:text-hero font-normal text-white mb-6 tracking-wider animate-fade-in">
              {title}
            </h1>
            
            <p className="text-base lg:text-lg text-white/90 mb-8 leading-relaxed animate-slide-up">
              {description}
            </p>
            
            <button
              onClick={handleButtonClick}
              className="inline-flex items-center gap-2 button-primary text-sm lg:text-base group animate-slide-up"
            >
              {buttonText}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-8 left-8 w-16 h-16 bg-white/5 rounded-full blur-sm" />
        <div className="absolute bottom-8 right-8 w-24 h-24 bg-yellow-400/10 rounded-full blur-md" />
        <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-white/10 rounded-full blur-sm" />
      </div>
    </section>
  )
}
import { Metadata } from 'next'
import About from '@/components/About'

export const metadata: Metadata = {
  title: 'О нас - LuxeTable',
  description: 'Узнайте о приверженности LuxeTable к роскошной посуде, мастерству и созданию незабываемых впечатлений от трапезы.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container-luxury">
        {/* Hero Section for About Page */}
        <div className="text-center mb-16 lg:mb-20">
          <h1 className="text-4xl lg:text-5xl font-normal text-gray-800 mb-6 tracking-wide">
            Наша история
          </h1>
          <p className="text-lg lg:text-xl text-luxury max-w-3xl mx-auto">
            Создаём исключительную посуду, которая превращает каждую трапезу в незабываемое впечатление
          </p>
        </div>

        {/* Main About Content */}
        <About showButton={false} className="mx-0 mb-16" />

        {/* Additional Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
          {/* Our Mission */}
          <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-card">
            <h2 className="text-2xl lg:text-3xl font-normal text-gray-800 mb-6 tracking-wide">
              Наша миссия
            </h2>
            <p className="text-base lg:text-lg text-luxury mb-4">
              В LuxeTable мы верим, что каждая трапеза — это возможность создать яркие воспоминания. 
              Наша миссия — возвышать впечатления от трапезы через тщательно созданную посуду, 
              сочетающую вечную элегантность с современной функциональностью.
            </p>
            <p className="text-base lg:text-lg text-luxury">
              От душевных вечеринок до грандиозных торжеств — наши коллекции созданы для того, чтобы 
              дополнять искусство трапезы и объединять людей вокруг красиво сервированных столов.
            </p>
          </div>

          {/* Our Craftsmanship */}
          <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-card">
            <h2 className="text-2xl lg:text-3xl font-normal text-gray-800 mb-6 tracking-wide">
              Наше мастерство
            </h2>
            <p className="text-base lg:text-lg text-luxury mb-4">
              Каждый предмет в нашей коллекции тщательно отобран и создан с использованием премиальных материалов 
              и временем проверенных техник. Мы работаем с опытными мастерами, разделяющими нашу 
              приверженность к совершенству и вниманию к деталям.
            </p>
            <p className="text-base lg:text-lg text-luxury">
              От тончайшей керамики до позолоченных поверхностей — каждый элемент выбран для обеспечения 
              прочности, красоты и совершенного баланса формы и функции.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-neutral-800 rounded-2xl lg:rounded-3xl p-8 lg:p-16 text-white">
          <h2 className="text-2xl lg:text-3xl font-normal mb-8 lg:mb-12 text-center tracking-wide">
            Наши ценности
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-yellow-400 rounded-full"></div>
              </div>
              <h3 className="text-xl font-medium mb-3">Качество</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Мы никогда не идём на компромиссы в вопросах качества, используя только лучшие материалы 
                и работая с мастерами-ремесленниками, чтобы создавать посуду, служащую поколениями.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-yellow-400 rounded-full"></div>
              </div>
              <h3 className="text-xl font-medium mb-3">Элегантность</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Каждый дизайн воплощает вечную элегантность, сочетая классическую изысканность 
                с современной привлекательностью, чтобы улучшить любую сервировку стола.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-yellow-400 rounded-full"></div>
              </div>
              <h3 className="text-xl font-medium mb-3">Впечатления</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Мы создаём не просто посуду — мы создаём впечатления, которые объединяют семьи 
                и друзей, делая каждую трапезу праздником.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
import { Metadata } from 'next'
import { Droplets, Shield, Sparkles, AlertTriangle, CheckCircle, Thermometer, Wind } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Уход за посудой - LuxeTable',
  description: 'Профессиональные рекомендации по уходу за роскошной посудой. Сохраните красоту и долговечность ваших изделий.',
}

const careCategories = [
  {
    id: 'porcelain',
    title: 'Фарфор и керамика',
    icon: Sparkles,
    color: 'from-blue-500 to-blue-600',
    tips: [
      'Мойте теплой водой с мягким моющим средством',
      'Избегайте резких перепадов температуры',
      'Используйте мягкую губку или ткань',
      'Сушите естественным путем на воздухе',
      'Храните с защитными прокладками между изделиями'
    ]
  },
  {
    id: 'cutlery',
    title: 'Столовые приборы',
    icon: Shield,
    color: 'from-gray-500 to-gray-600',
    tips: [
      'Мойте сразу после использования',
      'Полируйте мягкой тканью до блеска',
      'Избегайте агрессивных абразивов',
      'Храните в сухом месте',
      'Для позолоченных изделий используйте специальные средства'
    ]
  },
  {
    id: 'glass',
    title: 'Стекло и хрусталь',
    icon: Droplets,
    color: 'from-cyan-500 to-cyan-600',
    tips: [
      'Мойте в теплой воде с добавлением уксуса',
      'Протирайте безворсовой тканью',
      'Избегайте посудомоечных машин для хрусталя',
      'Храните вертикально, не ставьте друг в друга',
      'Полируйте специальными средствами для стекла'
    ]
  },
  {
    id: 'special',
    title: 'Особый уход',
    icon: AlertTriangle,
    color: 'from-amber-500 to-amber-600',
    tips: [
      'Позолоченные изделия мойте только вручную',
      'Не используйте лимонные и абразивные средства',
      'Деревянные элементы обрабатывайте маслом',
      'Серебряные изделия храните в мягких мешочках',
      'Регулярно осматривайте на предмет повреждений'
    ]
  }
]

const doAndDonts = {
  do: [
    'Мойте посуду сразу после использования',
    'Используйте мягкие моющие средства',
    'Сушите естественным путем',
    'Храните в защищенном от ударов месте',
    'Регулярно проверяйте состояние изделий',
    'Используйте подставки и салфетки'
  ],
  dont: [
    'Не используйте абразивные губки',
    'Не допускайте резких перепадов температуры',
    'Не ставьте горячие предметы на холодную поверхность',
    'Не используйте хлорсодержащие средства',
    'Не храните влажные изделия',
    'Не ставьте в микроволновую печь без проверки'
  ]
}

export default function CarePage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container-luxury">
        {/* Page Header */}
        <div className="text-center mb-16 lg:mb-20">
          <h1 className="text-4xl lg:text-5xl font-normal text-gray-800 mb-6 tracking-wide">
            Уход за посудой
          </h1>
          <p className="text-lg lg:text-xl text-luxury max-w-3xl mx-auto">
            Профессиональные рекомендации для сохранения красоты и долговечности 
            вашей роскошной посуды на долгие годы
          </p>
        </div>

        {/* Care Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mb-16 lg:mb-20">
          {careCategories.map((category) => {
            const IconComponent = category.icon
            return (
              <div key={category.id} className="bg-white rounded-2xl p-8 shadow-card hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-xl lg:text-2xl font-normal text-gray-800 tracking-wide">
                    {category.title}
                  </h2>
                </div>
                
                <ul className="space-y-3">
                  {category.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-base text-gray-700 leading-relaxed">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        {/* Do's and Don'ts Section */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 lg:p-12 mb-16 lg:mb-20">
          <h2 className="text-2xl lg:text-3xl font-normal text-gray-800 mb-8 lg:mb-12 text-center tracking-wide">
            Что нужно и чего нельзя делать
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Do's */}
            <div className="bg-white rounded-2xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-medium text-gray-800">Рекомендуется</h3>
              </div>
              
              <ul className="space-y-3">
                {doAndDonts.do.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-2"></div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Don'ts */}
            <div className="bg-white rounded-2xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-medium text-gray-800">Не рекомендуется</h3>
              </div>
              
              <ul className="space-y-3">
                {doAndDonts.dont.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0 mt-2"></div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Temperature Guide */}
        <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-card mb-16 lg:mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              <Thermometer className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl lg:text-3xl font-normal text-gray-800 tracking-wide">
              Температурный режим
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">❄️</span>
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Холодная вода</h3>
              <p className="text-sm text-gray-600">
                Для деликатных материалов и первичного ополаскивания
              </p>
            </div>

            <div className="text-center p-6 bg-yellow-50 rounded-xl">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌡️</span>
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Теплая вода</h3>
              <p className="text-sm text-gray-600">
                Оптимальная температура для ежедневного мытья
              </p>
            </div>

            <div className="text-center p-6 bg-red-50 rounded-xl">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔥</span>
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Горячая вода</h3>
              <p className="text-sm text-gray-600">
                Только для сильно загрязненной посуды без декора
              </p>
            </div>
          </div>
        </div>

        {/* Storage Tips */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 lg:p-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Wind className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl lg:text-3xl font-normal text-gray-800 tracking-wide">
              Правильное хранение
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xs font-bold text-purple-600">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">Сухое место</h4>
                    <p className="text-gray-600 text-sm">Храните посуду в сухих шкафах с хорошей вентиляцией</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xs font-bold text-purple-600">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">Защитные прокладки</h4>
                    <p className="text-gray-600 text-sm">Используйте мягкие салфетки между тарелками</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xs font-bold text-purple-600">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">Вертикальное положение</h4>
                    <p className="text-gray-600 text-sm">Бокалы и чашки храните в вертикальном положении</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h4 className="font-medium text-gray-800 mb-4">💡 Совет профессионала</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Регулярно проверяйте состояние посуды и при первых признаках износа 
                принимайте меры по восстановлению. Профилактический уход продлевает 
                срок службы изделий в несколько раз.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
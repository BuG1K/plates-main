export interface Brand {
  id: string
  name: string
  description?: string
  logo?: string
}

export interface Subcategory {
  id: string
  name: string
  description?: string
  brands?: Brand[]
}

export interface Category {
  id: string
  name: string
  description: string
  icon: string
  gradient: string
  subcategories: Subcategory[]
}

export const brands: Record<string, Brand> = {
  // Фарфор бренды
  royal_copenhagen: { id: 'royal_copenhagen', name: 'Royal Copenhagen', description: 'Датский королевский фарфор' },
  wedgwood: { id: 'wedgwood', name: 'Wedgwood', description: 'Английская классика' },
  herend: { id: 'herend', name: 'Herend', description: 'Венгерский фарфор ручной работы' },
  
  // Декор бренды
  lalique: { id: 'lalique', name: 'Lalique', description: 'Французский хрусталь и декор' },
  baccarat: { id: 'baccarat', name: 'Baccarat', description: 'Премиальный хрусталь' },
  versace: { id: 'versace', name: 'Versace Home', description: 'Роскошь и стиль' },
  
  // Хрусталь бренды
  waterford: { id: 'waterford', name: 'Waterford', description: 'Ирландский хрусталь' },
  swarovski: { id: 'swarovski', name: 'Swarovski', description: 'Австрийские кристаллы' },
  bohemia: { id: 'bohemia', name: 'Bohemia Crystal', description: 'Чешский хрусталь' },
  
  // Столовые приборы бренды
  christofle: { id: 'christofle', name: 'Christofle', description: 'Французское серебро' },
  georg_jensen: { id: 'georg_jensen', name: 'Georg Jensen', description: 'Датский дизайн' },
  sambonet: { id: 'sambonet', name: 'Sambonet', description: 'Итальянское качество' },
  
  // Текстиль бренды
  frette: { id: 'frette', name: 'Frette', description: 'Итальянский люкс текстиль' },
  pratesi: { id: 'pratesi', name: 'Pratesi', description: 'Премиальное белье' },
  yves_delorme: { id: 'yves_delorme', name: 'Yves Delorme', description: 'Французская элегантность' }
}

export const categories: Category[] = [
  {
    id: 'bestsellers',
    name: 'Наши бестселлеры',
    description: 'Самые популярные товары от ведущих мировых брендов',
    icon: '⭐',
    gradient: 'from-yellow-400 to-orange-500',
    subcategories: [
      {
        id: 'top_porcelain',
        name: 'Топ фарфора',
        description: 'Самые продаваемые фарфоровые изделия',
        brands: [brands.royal_copenhagen, brands.wedgwood, brands.herend]
      },
      {
        id: 'top_crystal',
        name: 'Популярный хрусталь',
        description: 'Хрустальные изделия-хиты продаж',
        brands: [brands.baccarat, brands.waterford, brands.lalique]
      },
      {
        id: 'top_cutlery',
        name: 'Лучшие приборы',
        description: 'Столовые приборы премиум-класса',
        brands: [brands.christofle, brands.georg_jensen, brands.sambonet]
      }
    ]
  },
  {
    id: 'porcelain',
    name: 'Фарфор',
    description: 'Изысканный фарфор от мировых мануфактур',
    icon: '🏺',
    gradient: 'from-blue-500 to-indigo-600',
    subcategories: [
      {
        id: 'dinner_sets',
        name: 'Обеденные сервизы',
        description: 'Полные наборы для торжественных случаев',
        brands: [brands.royal_copenhagen, brands.wedgwood, brands.herend]
      },
      {
        id: 'tea_sets',
        name: 'Чайные сервизы',
        description: 'Элегантные наборы для чаепития',
        brands: [brands.royal_copenhagen, brands.wedgwood, brands.herend]
      },
      {
        id: 'decorative',
        name: 'Декоративный фарфор',
        description: 'Вазы, статуэтки и предметы декора',
        brands: [brands.royal_copenhagen, brands.herend, brands.wedgwood]
      }
    ]
  },
  {
    id: 'decor',
    name: 'Декор',
    description: 'Предметы интерьера и декоративные элементы',
    icon: '🎨',
    gradient: 'from-purple-500 to-pink-500',
    subcategories: [
      {
        id: 'vases',
        name: 'Вазы',
        description: 'Декоративные и функциональные вазы',
        brands: [brands.lalique, brands.baccarat, brands.versace]
      },
      {
        id: 'candles',
        name: 'Свечи и подсвечники',
        description: 'Атмосферное освещение для дома',
        brands: [brands.lalique, brands.baccarat, brands.versace]
      },
      {
        id: 'sculptures',
        name: 'Скульптуры',
        description: 'Художественные произведения для интерьера',
        brands: [brands.lalique, brands.baccarat, brands.swarovski]
      }
    ]
  },
  {
    id: 'crystal',
    name: 'Хрусталь',
    description: 'Премиальный хрусталь ручной работы',
    icon: '💎',
    gradient: 'from-cyan-400 to-blue-500',
    subcategories: [
      {
        id: 'glasses',
        name: 'Бокалы',
        description: 'Винные и коктейльные бокалы',
        brands: [brands.baccarat, brands.waterford, brands.bohemia]
      },
      {
        id: 'decanters',
        name: 'Графины и декантеры',
        description: 'Для подачи вина и крепких напитков',
        brands: [brands.baccarat, brands.waterford, brands.bohemia]
      },
      {
        id: 'crystal_decor',
        name: 'Хрустальный декор',
        description: 'Декоративные хрустальные изделия',
        brands: [brands.swarovski, brands.lalique, brands.baccarat]
      }
    ]
  },
  {
    id: 'cutlery',
    name: 'Столовые приборы',
    description: 'Элитные столовые приборы из благородных материалов',
    icon: '🍴',
    gradient: 'from-gray-500 to-gray-700',
    subcategories: [
      {
        id: 'dinner_cutlery',
        name: 'Обеденные приборы',
        description: 'Наборы для основных блюд',
        brands: [brands.christofle, brands.georg_jensen, brands.sambonet]
      },
      {
        id: 'serving_utensils',
        name: 'Сервировочные приборы',
        description: 'Специализированные приборы для подачи',
        brands: [brands.christofle, brands.georg_jensen, brands.sambonet]
      },
      {
        id: 'silver_cutlery',
        name: 'Серебряные приборы',
        description: 'Приборы из серебра и с серебряным покрытием',
        brands: [brands.christofle, brands.georg_jensen]
      }
    ]
  },
  {
    id: 'textile',
    name: 'Текстиль',
    description: 'Премиальный домашний текстиль',
    icon: '🏠',
    gradient: 'from-green-500 to-teal-600',
    subcategories: [
      {
        id: 'bedding',
        name: 'Постельное белье',
        description: 'Роскошные комплекты постельного белья',
        brands: [brands.frette, brands.pratesi, brands.yves_delorme]
      },
      {
        id: 'pillows',
        name: 'Подушки',
        description: 'Декоративные и спальные подушки',
        brands: [brands.frette, brands.pratesi, brands.yves_delorme]
      },
      {
        id: 'blankets',
        name: 'Одеяла и пледы',
        description: 'Теплые и декоративные покрывала',
        brands: [brands.frette, brands.pratesi, brands.yves_delorme]
      },
      {
        id: 'table_linen',
        name: 'Столовый текстиль',
        description: 'Скатерти, салфетки, дорожки',
        brands: [brands.frette, brands.yves_delorme, brands.pratesi]
      },
      {
        id: 'towels',
        name: 'Полотенца',
        description: 'Банные и кухонные полотенца',
        brands: [brands.frette, brands.pratesi, brands.yves_delorme]
      }
    ]
  }
]
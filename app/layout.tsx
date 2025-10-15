import type { Metadata } from 'next'
import Link from 'next/link'
import { GeistSans } from 'geist/font/sans'
import './globals.css'
import Header from '@/components/Header'
import { cn } from '@/lib/utils'
import contacts from "../data/contacts";

export const metadata: Metadata = {
  title: 'HomePhilosophy - Роскошная посуда',
  description: 'Откройте для себя новинки роскошной посуды. Наша коллекция включает изысканный дизайн и премиальные материалы, идеальные для любого торжества.',
  keywords: ['роскошная посуда', 'столовые приборы', 'элегантная сервировка', 'премиальная посуда', 'фарфор', 'сервировка стола'],
  authors: [{ name: 'HomePhilosophy' }],
  robots: 'index, follow',
  icons: {
    icon: "../lib/log.ico",
    shortcut: "../lib/log.ico",
    apple: "../lib/log.ico",
  },
  openGraph: {
    title: 'HomePhilosophy - Роскошная посуда',
    description: 'Откройте для себя новинки роскошной посуды. Наша коллекция включает изысканный дизайн и премиальные материалы.',
    type: 'website',
    locale: 'ru_RU',
  },
}

interface Contacts {
  id: number,
  documentId: string
  phone: string
  mail: string
  working_hours: string
  address: string
  telegram: string
  whatsapp: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export const viewport = 'width=device-width, initial-scale=1'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const apiUrl = "https://gorgeous-captain-cd0a26631f.strapiapp.com/api/contacts?id=1";
  // const res = await fetch(apiUrl);

  // if (!res.ok) {
  //   console.error('Failed to fetch contact data');
  // }

  // const { data } = await res.json();
  // const con = data[0] as Contacts | undefined
  // const contacts = con

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={cn(
        GeistSans.className,
"font-serif antialiased min-h-screen"
      )}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        
        {/* Footer */}
        <footer className="bg-gray-800 text-white py-12 mt-20">
          <div className="container-luxury">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 bg-white rounded-full" />
                  <span className="text-xl font-bold tracking-tight">HomePhilosophy</span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Создаем роскошные впечатления от трапезы через изысканную посуду и неподвластную времени элегантность.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Быстрые ссылки</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/" className="text-gray-300 hover:text-white transition-colors">Главная</Link></li>
                  <li><Link href="/catalog" className="text-gray-300 hover:text-white transition-colors">Каталог</Link></li>
                  <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">О нас</Link></li>
                  <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Контакты</Link></li>
                </ul>
              </div>
              
              {/* <div>
                <h4 className="font-semibold mb-4">Категории</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Столовая посуда</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Столовые приборы</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Сервировочная посуда</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Аксессуары</a></li>
                </ul>
              </div> */}
              
              <div>
                <h4 className="font-semibold mb-4">Контакты</h4>
                <div className="space-y-2 text-sm text-gray-300">
                  <a style={{ display: "block" }} href={`tel:${contacts?.phone}`}>{contacts?.phone}</a>
                  <a style={{ display: "block" }} href={`mailto:${contacts?.mail}`}>{contacts?.mail}</a>
                  <p>{contacts?.working_hours}</p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-700 mt-12 pt-8 text-center text-sm text-gray-400">
              <p>&copy; {new Date().getFullYear()} HomePhilosophy. Все права защищены.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
import { Metadata } from 'next'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Свяжитесь с нами - LuxeTable',
  description: 'Свяжитесь с LuxeTable для вопросов, индивидуальных заказов или поддержки клиентов.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container-luxury">
        {/* Page Header */}
        <div className="text-center mb-16 lg:mb-20">
          <h1 className="text-4xl lg:text-5xl font-normal text-gray-800 mb-6 tracking-wide">
            Свяжитесь с нами
          </h1>
          <p className="text-lg lg:text-xl text-luxury max-w-3xl mx-auto">
            Мы будем рады слышать от вас. Свяжитесь с нами по любым вопросам или индивидуальным заказам.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-card">
              <h2 className="text-2xl font-normal text-gray-800 mb-8 tracking-wide">
                Связаться с нами
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-yellow-400/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">Телефон</h3>
                    <p className="text-luxury">1-800-LUXETABLE</p>
                    <p className="text-luxury">(1-800-589-3822)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-yellow-400/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">Эл. почта</h3>
                    <p className="text-luxury">info@luxetable.com</p>
                    <p className="text-luxury">support@luxetable.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-yellow-400/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">Адрес</h3>
                    <p className="text-luxury">123 Luxury Avenue</p>
                    <p className="text-luxury">New York, NY 10001</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-yellow-400/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">Часы работы</h3>
                    <p className="text-luxury">Monday - Friday: 9AM - 6PM EST</p>
                    <p className="text-luxury">Saturday: 10AM - 4PM EST</p>
                    <p className="text-luxury">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-card">
            <h2 className="text-2xl font-normal text-gray-800 mb-8 tracking-wide">
              Напишите нам сообщение
            </h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    Имя
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-colors"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Фамилия
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Эл. почта
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Тема
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-colors"
                  required
                >
                  <option value="">Выберите тему</option>
                  <option value="general">Общий вопрос</option>
                  <option value="custom">Индивидуальный заказ</option>
                  <option value="support">Поддержка клиентов</option>
                  <option value="wholesale">Оптовые заказы</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Сообщение
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-colors resize-none"
                  placeholder="Расскажите, как мы можем вам помочь..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full button-primary text-center"
              >
                Отправить сообщение
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
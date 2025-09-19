"use client"

// import { Metadata } from 'next'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import React, { useEffect, useState } from 'react';
import { useSearchParams } from "next/navigation";

// export const metadata: Metadata = {
//   title: 'Свяжитесь с нами - LuxeTable',
//   description: 'Свяжитесь с LuxeTable для вопросов, индивидуальных заказов или поддержки клиентов.',
// }

export default function ContactPage() {
  const [type, setType] = useState('');
  const [messageValue, setMessageValue] = useState('');
  const [showToast, setShowToast] = useState(false);
  const searchParams = useSearchParams();
  const text = searchParams.get("text");

  useEffect(() => {
    if (text) {
      setType("wholesale")
      setMessageValue(text)
  
      const el = document.getElementById("message");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [searchParams])

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);




    const order = {
      name: formData.get("name"),
      lastName: formData.get("lastName"),
      phone: formData.get("phone"),
      type: formData.get("type"),
      message: formData.get("message"),
    };

    console.log(order)

    const res = await fetch("https://gorgeous-captain-cd0a26631f.strapiapp.com/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: order }),
    });

    if (!res.ok) {
      throw new Error("Ошибка при создании заказа");
    } else {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  }

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
            
            <form className="space-y-6" onSubmit={onSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Имя
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
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
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Телефон
                </label>
                <input
                  type="phone"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                  Тема
                </label>
                <select
                  id="type"
                  name="type"
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-colors"
                  required
                  onChange={(e) => setType(e.target.value)}
                  value={type}
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
                  value={messageValue}
                  onChange={(e) => setMessageValue(e.target.value)}
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

            {showToast && (
        <div className="fixed bottom-6 right-6 bg-white border border-yellow-500 shadow-lg rounded-xl px-4 py-2 flex items-center gap-2 animate-fade-in-up">
          <div className="w-4 h-4 rounded-full bg-yellow-500 flex items-center justify-center">
            <span className="text-white text-xs">✔</span>
          </div>
          <span className="text-sm text-yellow-600 font-medium">
            Сообщение отправлено
          </span>
        </div>
      )}

      {/* Анимация */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.4s ease-out;
        }
      `}</style>
    </div>
  )
}
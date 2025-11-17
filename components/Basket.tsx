"use client"

import { cn } from "@/lib/utils";
import EnhancedProductCard from "./EnhancedProductCard";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cart-store";
import { MessageCircle, Send, ShoppingBag, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";


const Basket = ({ onClose }) => {
  const [state, setState] = useState([])
  const { addItem: addToCart, getTotalItems, updateQuantity, removeItem } = useCartStore()
  const router = useRouter();
  const [sum, setSum] = useState(0);
  const [phone, setPhone] = useState<{ tel: string; wat: string } | null>(null);

  useEffect(() => {
    const jbasket = localStorage.getItem('luxetable-cart');
    const basket = jbasket ? JSON.parse(jbasket) : [];

    setState(basket?.state?.items || []);

    const apiUrl = "https://taxi-novoe.online/api/contacts?id=1";

    fetch(apiUrl)
      .then(res => res.json())
      .then(({ data }) => {
        if (data.length !== 0) {
          setPhone({
            tel: data[0]?.telegram,
            wat: data[0]?.whatsapp
          });
          return;
        }
      })
      .catch(err => console.error('Error fetching contact data:', err));
  }, [])

  const onAdd = (id) => {
    let quantity = null

    setState(state.map((item, index) => {
        if (item.product.id === id) {
          quantity = item.quantity + 1

          return {
            ...item,
            quantity
          }
        }

        return item
      }
    ));

    updateQuantity(id, quantity)
  }
  
  const onDelete = (id) => {
    const lastItem = state.find(item => item.product.id === id)

    if (lastItem.quantity === 1) {
      setState(state.filter(item => item.product.id !== id))
      removeItem(id)
    } else {
      let quantity = null

      setState(state.map((item) => {
          if (item.product.id === id) {
            quantity = item.quantity - 1

            return {
              ...item,
              quantity
            }
          }

          return item
        }
      ));

      updateQuantity(id, quantity)
    }
  }

  useEffect(() => {
    let newSum = 0
    state.forEach((item) => {
      const price = item.product.price * item.quantity
      newSum += price
    });

    setSum(newSum)
  }, [state])

  const getBasket = () => {
    let text = ""
    let sum = 0

    state.forEach((item) => {
      const price = item.product.price * item.quantity
      sum += price
      text += `${item.product.name} - ${item.quantity} шт. - ${price}₸\n`
    })

    text += `\nИтого: ${sum}₸`
    
    return text
  }

  const onSiteBasket = () => {
    const bas = getBasket();
    const message = `Здравствуйте! Хочу сделать заказ:\n${bas}`;
    localStorage.setItem("text", message);
    router.push(`/contact`);
  }

  const onTelegramBasket = () => {
    const bas = getBasket();
    const message = `Здравствуйте! Хочу сделать заказ:\n${bas}`;
    const telegramUrl = `https://t.me/${phone?.tel}?text=${encodeURIComponent(message)}`;

    window.open(telegramUrl, '_blank');
  }

  const onWhatsAppBasket = () => {
    const bas = getBasket();
    const message = `Здравствуйте! Хочу сделать заказ:\n${bas}`;
    const phoneNumber = String(phone?.wat || "")
      .replace(/\D/g, "");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");
  }

  return (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}
        >
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-normal text-gray-800">Быстрый просмотр</h3>
                <button
                  onClick={() => onClose()}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                >
                  ✕
                </button>
              </div>

              {getTotalItems() === 0 && (
                 <ShoppingBag className="w-10 h-10 mx-auto my-20" color="grey" />
              )}
              
              {state.map((item: any) => (
                <>
                <EnhancedProductCard
                  product={item.product}
                  viewMode="list"
                  // onAddToCart={handleAddToCart}
                  // onAddToWishlist={handleWishlistToggle}
                  // isInWishlist={isInWishlist(quickViewProduct.id)}
                  className="shadow-none border-0 my-4"
                />
                    <div className={cn("flex items-center gap-3 justify-end", "")}>
                      <button
                        onClick={() => onDelete(item.product.id)}
                        // disabled={quantity <= 0}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 
                                  text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        –
                      </button>
                      <span className="w-6 text-center text-gray-800">{item.quantity}</span>
                      <button
                        onClick={() => onAdd(item.product.id)}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 
                                  text-gray-600 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                </>
              ))}
            </div>



            {state.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200 mb-10">
                          <h1 className="text-xl text-center font-semibold text-gray-800 mb-4">
                            Оформить заказ
                          </h1>

  <div className="border-t border-gray-200 py-4 px-7">
    <div className="flex justify-between items-center text-lg font-semibold">
      <span>Итого:</span>
      <span className="text-yellow-600 text-xl">{sum}₸</span>
    </div>
  </div>

      <div className="flex flex-col sm:flex-row gap-4 p-5 justify-center">
        <button
          onClick={onSiteBasket}
          className="flex items-center gap-2 button-primary px-2 py-2 cursor-pointer"
          style={{ justifyContent: "center" }}
        >
          <ShoppingCart className="w-4 h-4" />
          <span>На сайте</span>
        </button>

        <button
          onClick={onTelegramBasket}
          className="flex items-center gap-2 button-secondary px-2 py-2 cursor-pointer"
          style={{ justifyContent: "center" }}
        >
          <Send className="w-4 h-4 text-sky-500" />
          <span>Telegram</span>
        </button>

        <button
          onClick={onWhatsAppBasket}
          className="flex items-center gap-2 button-secondary px-2 py-2 cursor-pointer"
          style={{ justifyContent: "center" }}
        >
          <MessageCircle className="w-4 h-4 text-green-500" />
          <span>WhatsApp</span>
        </button>
      </div>
              </div>
            )}
          </div>
        </div>
  )
}

export default Basket
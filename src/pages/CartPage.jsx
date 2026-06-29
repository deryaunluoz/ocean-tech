import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus } from 'lucide-react'
import {
  removeFromCart,
  updateCartCount,
  toggleCartItem
} from '../store/actions/shoppingCartActions'

export default function CartPage() {
  const dispatch = useDispatch()
  const { cart } = useSelector(state => state.shoppingCart)

  const checkedItems = cart.filter(item => item.checked)
  const subtotal = checkedItems.reduce((sum, item) => sum + item.product.price * item.count, 0)
  const shipping = subtotal > 500 ? 0 : 29.99
  const total = subtotal + shipping

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Sepetiniz Boş</h2>
        <p className="text-gray-500 mb-8">Sepetinize henüz ürün eklemediniz.</p>
        <Link to="/shop" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition">
          Alışverişe Başla
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">
        Sepetim ({cart.length} Ürün)
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sol: Ürün Listesi */}
        <div className="flex-1 space-y-4">
          {cart.map((item) => (
            <div key={item.product.id} className="bg-white border border-gray-100 rounded-xl p-4 flex items-center gap-4">
              
              {/* Checkbox */}
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => dispatch(toggleCartItem(item.product.id))}
                className="w-5 h-5 accent-blue-600 flex-shrink-0"
              />

              {/* Ürün Resmi */}
              <img
                src={item.product.images?.[0]?.url || 'https://via.placeholder.com/100'}
                alt={item.product.name}
                className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
              />

              {/* Ürün Bilgisi */}
              <div className="flex-1">
                <h4 className="font-bold text-gray-800 text-sm">{item.product.name}</h4>
                <p className="text-blue-600 font-bold mt-1">${item.product.price?.toFixed(2)}</p>
              </div>

              {/* Adet */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => dispatch(updateCartCount(item.product.id, item.count - 1))}
                  className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition"
                >
                  <Minus size={14} />
                </button>
                <span className="w-8 text-center font-bold">{item.count}</span>
                <button
                  onClick={() => dispatch(updateCartCount(item.product.id, item.count + 1))}
                  className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition"
                >
                  <Plus size={14} />
                </button>
              </div>

              {/* Toplam Fiyat */}
              <p className="font-bold text-gray-800 w-24 text-right">
                ${(item.product.price * item.count).toFixed(2)}
              </p>

              {/* Sil */}
              <button
                onClick={() => dispatch(removeFromCart(item.product.id))}
                className="text-gray-400 hover:text-red-500 transition flex-shrink-0"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* Sağ: Sipariş Özeti */}
        <div className="lg:w-80">
          <div className="bg-white border border-gray-100 rounded-xl p-6 sticky top-24">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Sipariş Özeti</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Ürün Toplamı</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Kargo</span>
                <span className={shipping === 0 ? 'text-green-600 font-medium' : 'font-medium'}>
                  {shipping === 0 ? 'Ücretsiz' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-gray-400">
                  $500 üzeri alışverişlerde kargo ücretsiz!
                </p>
              )}
              <div className="border-t pt-3 flex justify-between font-bold text-base">
                <span>Toplam</span>
                <span className="text-blue-600">${total.toFixed(2)}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="block w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-center hover:bg-blue-700 transition mt-6"
            >
              Siparişi Onayla →
            </Link>

            <Link
              to="/shop"
              className="block w-full text-center text-gray-500 text-sm mt-3 hover:text-blue-600 transition"
            >
              Alışverişe Devam Et
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
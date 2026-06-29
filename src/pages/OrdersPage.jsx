import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { ChevronDown, ChevronUp, Package } from 'lucide-react'
import api from '../api/axios'

export default function OrdersPage() {
  const history = useHistory()
  const { user } = useSelector(state => state.client)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [openOrder, setOpenOrder] = useState(null)

  useEffect(() => {
    // Kullanıcı kontrolünü kaldırdık, direkt API çağırıyoruz
    api.get('/order')
      .then(res => setOrders(res.data))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <Package size={64} className="text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Henüz siparişiniz yok</h2>
        <p className="text-gray-500 mb-8">İlk siparişinizi vermek için alışverişe başlayın.</p>
        <button
          onClick={() => history.push('/shop')}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition"
        >
          Alışverişe Başla
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Geçmiş Siparişlerim</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white border border-gray-100 rounded-xl overflow-hidden">
            <div
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition"
              onClick={() => setOpenOrder(openOrder === order.id ? null : order.id)}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Package size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-800">Sipariş #{order.id}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.order_date).toLocaleDateString('tr-TR')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <p className="font-bold text-blue-600">${order.price?.toFixed(2)}</p>
                {openOrder === order.id
                  ? <ChevronUp size={20} className="text-gray-400" />
                  : <ChevronDown size={20} className="text-gray-400" />
                }
              </div>
            </div>

            {openOrder === order.id && (
              <div className="border-t border-gray-100 p-4">
                <div className="space-y-3">
                  {order.products?.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <img
                        src={item.product?.images?.[0]?.url || 'https://via.placeholder.com/60'}
                        alt={item.product?.name}
                        className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1">
                        <p className="font-bold text-gray-800 text-sm">{item.product?.name}</p>
                        <p className="text-gray-500 text-xs mt-1">Adet: {item.count}</p>
                      </div>
                      <p className="font-bold text-gray-800">
                        ${(item.product?.price * item.count)?.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between">
                  <span className="font-bold text-gray-800">Toplam</span>
                  <span className="font-bold text-blue-600">${order.price?.toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
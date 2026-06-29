import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Loader2, Plus } from 'lucide-react'
import api from '../api/axios'
import { setCart } from '../store/actions/shoppingCartActions'

export default function CheckoutPage() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { cart } = useSelector(state => state.shoppingCart)
  const { user } = useSelector(state => state.client)

  const [step, setStep] = useState(1)
  const [addresses, setAddresses] = useState([])
  const [cards, setCards] = useState([])
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [selectedCard, setSelectedCard] = useState(null)
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [showCardForm, setShowCardForm] = useState(false)
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const { register: registerCard, handleSubmit: handleSubmitCard, reset: resetCard } = useForm()

  const checkedItems = cart.filter(item => item.checked)
  const total = checkedItems.reduce((sum, item) => sum + item.product.price * item.count, 0)

  // Giriş yapmamışsa login'e yönlendir
  useEffect(() => {
    if (!user?.email) {
      history.push('/login')
    }
  }, [user])

  // Adresleri çek
  useEffect(() => {
    api.get('/user/address').then(res => setAddresses(res.data)).catch(() => {})
    api.get('/user/card').then(res => setCards(res.data)).catch(() => {})
  }, [])

  // Yeni adres ekle
  const onAddAddress = async (data) => {
    try {
      await api.post('/user/address', data)
      const res = await api.get('/user/address')
      setAddresses(res.data)
      setShowAddressForm(false)
      reset()
      toast.success('Adres eklendi!')
    } catch {
      toast.error('Adres eklenemedi!')
    }
  }

  // Yeni kart ekle
  const onAddCard = async (data) => {
    try {
      await api.post('/user/card', {
        card_no: data.card_no,
        expire_month: parseInt(data.expire_month),
        expire_year: parseInt(data.expire_year),
        name_on_card: data.name_on_card,
      })
      const res = await api.get('/user/card')
      setCards(res.data)
      setShowCardForm(false)
      resetCard()
      toast.success('Kart eklendi!')
    } catch {
      toast.error('Kart eklenemedi!')
    }
  }

  // Siparişi tamamla
  const completeOrder = async () => {
    if (!selectedAddress) { toast.error('Adres seçin!'); return }
    if (!selectedCard) { toast.error('Kart seçin!'); return }

    setLoading(true)
    try {
      await api.post('/order', {
        address_id: selectedAddress.id,
        order_date: new Date().toISOString(),
        card_no: parseInt(selectedCard.card_no),
        card_name: selectedCard.name_on_card,
        card_expire_month: selectedCard.expire_month,
        card_expire_year: selectedCard.expire_year,
        card_ccv: 123,
        price: total,
        products: checkedItems.map(item => ({
          product_id: item.product.id,
          count: item.count,
          detail: item.product.name,
        }))
      })
      dispatch(setCart([]))
      toast.success('Siparişiniz tamamlandı! 🎉')
      history.push('/')
    } catch {
      toast.error('Sipariş oluşturulamadı!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Sipariş Oluştur</h1>

      {/* Adımlar */}
      <div className="flex items-center gap-4 mb-8">
        <div className={`flex items-center gap-2 font-bold ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>1</span>
          Adres Bilgileri
        </div>
        <div className="flex-1 h-0.5 bg-gray-200" />
        <div className={`flex items-center gap-2 font-bold ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>2</span>
          Ödeme
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">

          {/* ADIM 1: Adres */}
          {step === 1 && (
            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-4">Teslimat Adresi</h2>

              <div className="space-y-3 mb-4">
                {addresses.map(addr => (
                  <div
                    key={addr.id}
                    onClick={() => setSelectedAddress(addr)}
                    className={`border rounded-xl p-4 cursor-pointer transition ${selectedAddress?.id === addr.id ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                  >
                    <div className="flex items-center gap-2">
                      <input type="radio" readOnly checked={selectedAddress?.id === addr.id} className="accent-blue-600" />
                      <span className="font-bold text-gray-800">{addr.title}</span>
                    </div>
                    <p className="text-gray-600 text-sm mt-1 ml-6">{addr.name} {addr.surname}</p>
                    <p className="text-gray-500 text-sm ml-6">{addr.neighborhood}, {addr.district}, {addr.city}</p>
                  </div>
                ))}
              </div>

              {/* Yeni Adres Formu */}
              {showAddressForm ? (
                <form onSubmit={handleSubmit(onAddAddress)} className="border border-gray-200 rounded-xl p-4 space-y-3">
                  <h3 className="font-bold text-gray-800">Yeni Adres</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <input {...register('title', { required: true })} placeholder="Adres Başlığı (Ev, İş...)"
                      className="border rounded-lg px-3 py-2 text-sm col-span-2 focus:outline-none focus:border-blue-500" />
                    <input {...register('name', { required: true })} placeholder="Ad"
                      className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                    <input {...register('surname', { required: true })} placeholder="Soyad"
                      className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                    <input {...register('phone', { required: true })} placeholder="Telefon"
                      className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                    <input {...register('city', { required: true })} placeholder="Şehir"
                      className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                    <input {...register('district', { required: true })} placeholder="İlçe"
                      className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                    <input {...register('neighborhood', { required: true })} placeholder="Mahalle ve Adres Detayı"
                      className="border rounded-lg px-3 py-2 text-sm col-span-2 focus:outline-none focus:border-blue-500" />
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition">Kaydet</button>
                    <button type="button" onClick={() => setShowAddressForm(false)} className="border px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition">İptal</button>
                  </div>
                </form>
              ) : (
                <button onClick={() => setShowAddressForm(true)}
                  className="flex items-center gap-2 border-2 border-dashed border-gray-300 rounded-xl p-4 w-full text-gray-500 hover:border-blue-400 hover:text-blue-600 transition">
                  <Plus size={18} /> Yeni Adres Ekle
                </button>
              )}

              <button
                onClick={() => setStep(2)}
                disabled={!selectedAddress}
                className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition disabled:opacity-50"
              >
                Devam Et →
              </button>
            </div>
          )}

          {/* ADIM 2: Ödeme */}
          {step === 2 && (
            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-4">Kart Bilgileri</h2>

              <div className="space-y-3 mb-4">
                {cards.map(card => (
                  <div
                    key={card.id}
                    onClick={() => setSelectedCard(card)}
                    className={`border rounded-xl p-4 cursor-pointer transition ${selectedCard?.id === card.id ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                  >
                    <div className="flex items-center gap-2">
                      <input type="radio" readOnly checked={selectedCard?.id === card.id} className="accent-blue-600" />
                      <span className="font-bold text-gray-800">{card.name_on_card}</span>
                    </div>
                    <p className="text-gray-500 text-sm ml-6">**** **** **** {String(card.card_no).slice(-4)}</p>
                    <p className="text-gray-500 text-sm ml-6">{card.expire_month}/{card.expire_year}</p>
                  </div>
                ))}
              </div>

              {/* Yeni Kart Formu */}
              {showCardForm ? (
                <form onSubmit={handleSubmitCard(onAddCard)} className="border border-gray-200 rounded-xl p-4 space-y-3">
                  <h3 className="font-bold text-gray-800">Yeni Kart</h3>
                  <input {...registerCard('name_on_card', { required: true })} placeholder="Kart Üzerindeki İsim"
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                  <input {...registerCard('card_no', { required: true })} placeholder="Kart Numarası"
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                  <div className="grid grid-cols-2 gap-3">
                    <input {...registerCard('expire_month', { required: true })} placeholder="Ay (12)"
                      className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                    <input {...registerCard('expire_year', { required: true })} placeholder="Yıl (2025)"
                      className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition">Kaydet</button>
                    <button type="button" onClick={() => setShowCardForm(false)} className="border px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition">İptal</button>
                  </div>
                </form>
              ) : (
                <button onClick={() => setShowCardForm(true)}
                  className="flex items-center gap-2 border-2 border-dashed border-gray-300 rounded-xl p-4 w-full text-gray-500 hover:border-blue-400 hover:text-blue-600 transition">
                  <Plus size={18} /> Yeni Kart Ekle
                </button>
              )}

              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep(1)} className="flex-1 border border-gray-300 py-3 rounded-lg font-bold hover:bg-gray-50 transition">
                  ← Geri
                </button>
                <button
                  onClick={completeOrder}
                  disabled={!selectedCard || loading}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? <><Loader2 size={18} className="animate-spin" /> İşleniyor...</> : 'Ödeme Yap'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sipariş Özeti */}
        <div className="lg:w-80">
          <div className="bg-white border border-gray-100 rounded-xl p-6 sticky top-24">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Sipariş Özeti</h2>
            <div className="space-y-2 mb-4">
              {checkedItems.map(item => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span className="text-gray-600 truncate flex-1">{item.product.name} x{item.count}</span>
                  <span className="font-medium ml-2">${(item.product.price * item.count).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-3 flex justify-between font-bold">
              <span>Toplam</span>
              <span className="text-blue-600">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
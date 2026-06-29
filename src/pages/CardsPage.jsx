import { useEffect, useState } from 'react'
import { CreditCard, Plus, Trash2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import api from '../api/axios'

export default function CardsPage() {
  const [cards, setCards] = useState([])
  const [showForm, setShowForm] = useState(false)
  const { register, handleSubmit, reset } = useForm()

  useEffect(() => {
    api.get('/user/card')
      .then(res => setCards(res.data))
      .catch(() => {})
  }, [])

  const onSubmit = async (data) => {
    try {
      await api.post('/user/card', {
        card_no: data.card_no,
        expire_month: parseInt(data.expire_month),
        expire_year: parseInt(data.expire_year),
        name_on_card: data.name_on_card,
      })
      const res = await api.get('/user/card')
      setCards(res.data)
      setShowForm(false)
      reset()
      toast.success('Kart eklendi!')
    } catch {
      toast.error('Kart eklenemedi!')
    }
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/user/card/${id}`)
      setCards(cards.filter(c => c.id !== id))
      toast.success('Kart silindi!')
    } catch {
      toast.error('Silinemedi!')
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Kartlarım</h1>
        <button
          onClick={() => { setShowForm(true); reset() }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition"
        >
          <Plus size={16} /> Yeni Kart
        </button>
      </div>

      {/* Kart Formu */}
      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white border border-gray-200 rounded-xl p-6 mb-6 space-y-4">
          <h3 className="font-bold text-gray-800">Yeni Kart Ekle</h3>
          <input {...register('name_on_card', { required: true })} placeholder="Kart Üzerindeki İsim"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500" />
          <input {...register('card_no', { required: true })} placeholder="Kart Numarası (16 hane)"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500" />
          <div className="grid grid-cols-2 gap-4">
            <input {...register('expire_month', { required: true })} placeholder="Son Kullanma Ay (12)"
              className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500" />
            <input {...register('expire_year', { required: true })} placeholder="Son Kullanma Yıl (2025)"
              className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500" />
          </div>
          <div className="flex gap-3">
            <button type="submit" className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-blue-700 transition">
              Kaydet
            </button>
            <button type="button" onClick={() => { setShowForm(false); reset() }}
              className="border border-gray-300 px-6 py-2.5 rounded-lg text-sm hover:bg-gray-50 transition">
              İptal
            </button>
          </div>
        </form>
      )}

      {/* Kart Listesi */}
      {cards.length === 0 ? (
        <div className="text-center py-16">
          <CreditCard size={48} className="text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Henüz kayıtlı kartınız yok.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cards.map(card => (
            <div key={card.id} className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 text-white relative">
              <div className="flex justify-between items-start mb-8">
                <CreditCard size={32} />
                <button onClick={() => handleDelete(card.id)}
                  className="text-white opacity-70 hover:opacity-100 transition">
                  <Trash2 size={18} />
                </button>
              </div>
              <p className="text-lg font-bold tracking-widest mb-4">
                **** **** **** {String(card.card_no).slice(-4)}
              </p>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-blue-200 text-xs mb-1">Kart Sahibi</p>
                  <p className="font-bold">{card.name_on_card}</p>
                </div>
                <div className="text-right">
                  <p className="text-blue-200 text-xs mb-1">Son Kullanma</p>
                  <p className="font-bold">{card.expire_month}/{card.expire_year}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { MapPin, Plus, Trash2, Edit } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import api from '../api/axios'

export default function AddressesPage() {
  const history = useHistory()
  const { user } = useSelector(state => state.client)
  const [addresses, setAddresses] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editAddress, setEditAddress] = useState(null)
  const { register, handleSubmit, reset, setValue } = useForm()

  useEffect(() => {
    api.get('/user/address')
      .then(res => setAddresses(res.data))
      .catch(() => {})
  }, [])

  const onSubmit = async (data) => {
    try {
      if (editAddress) {
        await api.put('/user/address', { id: editAddress.id, ...data })
        toast.success('Adres güncellendi!')
      } else {
        await api.post('/user/address', data)
        toast.success('Adres eklendi!')
      }
      const res = await api.get('/user/address')
      setAddresses(res.data)
      setShowForm(false)
      setEditAddress(null)
      reset()
    } catch {
      toast.error('İşlem başarısız!')
    }
  }

  const handleEdit = (addr) => {
    setEditAddress(addr)
    setShowForm(true)
    setValue('title', addr.title)
    setValue('name', addr.name)
    setValue('surname', addr.surname)
    setValue('phone', addr.phone)
    setValue('city', addr.city)
    setValue('district', addr.district)
    setValue('neighborhood', addr.neighborhood)
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/user/address/${id}`)
      setAddresses(addresses.filter(a => a.id !== id))
      toast.success('Adres silindi!')
    } catch {
      toast.error('Silinemedi!')
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Adreslerim</h1>
        <button
          onClick={() => { setShowForm(true); setEditAddress(null); reset() }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition"
        >
          <Plus size={16} /> Yeni Adres
        </button>
      </div>

      {/* Adres Formu */}
      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white border border-gray-200 rounded-xl p-6 mb-6 space-y-4">
          <h3 className="font-bold text-gray-800">{editAddress ? 'Adresi Düzenle' : 'Yeni Adres Ekle'}</h3>
          <input {...register('title', { required: true })} placeholder="Adres Başlığı (Ev, İş...)"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500" />
          <div className="grid grid-cols-2 gap-4">
            <input {...register('name', { required: true })} placeholder="Ad"
              className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500" />
            <input {...register('surname', { required: true })} placeholder="Soyad"
              className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500" />
          </div>
          <input {...register('phone', { required: true })} placeholder="Telefon"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500" />
          <div className="grid grid-cols-2 gap-4">
            <input {...register('city', { required: true })} placeholder="Şehir"
              className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500" />
            <input {...register('district', { required: true })} placeholder="İlçe"
              className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500" />
          </div>
          <input {...register('neighborhood', { required: true })} placeholder="Mahalle ve Adres Detayı"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500" />
          <div className="flex gap-3">
            <button type="submit" className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-blue-700 transition">
              {editAddress ? 'Güncelle' : 'Kaydet'}
            </button>
            <button type="button" onClick={() => { setShowForm(false); setEditAddress(null); reset() }}
              className="border border-gray-300 px-6 py-2.5 rounded-lg text-sm hover:bg-gray-50 transition">
              İptal
            </button>
          </div>
        </form>
      )}

      {/* Adres Listesi */}
      {addresses.length === 0 ? (
        <div className="text-center py-16">
          <MapPin size={48} className="text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Henüz kayıtlı adresiniz yok.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map(addr => (
            <div key={addr.id} className="bg-white border border-gray-100 rounded-xl p-5 hover:shadow-sm transition">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-blue-600" />
                  <span className="font-bold text-gray-800">{addr.title}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(addr)}
                    className="text-gray-400 hover:text-blue-600 transition">
                    <Edit size={16} />
                  </button>
                  <button onClick={() => handleDelete(addr.id)}
                    className="text-gray-400 hover:text-red-500 transition">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <p className="text-gray-700 text-sm font-medium">{addr.name} {addr.surname}</p>
              <p className="text-gray-500 text-sm mt-1">{addr.phone}</p>
              <p className="text-gray-500 text-sm">{addr.neighborhood}, {addr.district}, {addr.city}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
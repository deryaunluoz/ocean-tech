import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { fetchRoles } from '../store/actions/clientActions'
import api from '../api/axios'
import { Loader2 } from 'lucide-react'

export default function SignUpPage() {
  const dispatch = useDispatch()
  const history = useHistory()
  const roles = useSelector(state => state.client.roles)
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: { role_id: '' }
  })

  const selectedRole = watch('role_id')
  const isStore = roles.find(r => r.id === parseInt(selectedRole))?.code === 'store'

  useEffect(() => {
    dispatch(fetchRoles())
  }, [dispatch])

  const onSubmit = async (data) => {
    setLoading(true)
    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,
      role_id: parseInt(data.role_id),
    }
    if (isStore) {
      payload.store = {
        name: data.storeName,
        phone: data.storePhone,
        tax_no: data.storeTaxNo,
        bank_account: data.storeBankAccount,
      }
    }

    try {
      await api.post('/signup', payload)
      toast.warning('Hesabı aktif etmek için e-postanızdaki linke tıklayın!')
      history.goBack()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Kayıt başarısız!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Hesap Oluştur</h1>
          <p className="text-gray-500 text-sm mt-2">Ocean Tech ailesine katılın</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Ad */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Ad Soyad</label>
            <input {...register('name', { required: 'Ad zorunludur', minLength: { value: 3, message: 'En az 3 karakter' } })}
              placeholder="Adınız Soyadınız"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500" />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">E-posta</label>
            <input {...register('email', { required: 'E-posta zorunludur', pattern: { value: /^\S+@\S+$/i, message: 'Geçerli e-posta girin' } })}
              placeholder="ornek@mail.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500" />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          {/* Şifre */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Şifre</label>
            <input type="password"
              {...register('password', {
                required: 'Şifre zorunludur',
                minLength: { value: 8, message: 'En az 8 karakter' },
                pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, message: 'Büyük/küçük harf, rakam ve özel karakter içermeli' }
              })}
              placeholder="********"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500" />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          {/* Şifre Tekrar */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Şifre Tekrar</label>
            <input type="password"
              {...register('confirmPassword', {
                required: 'Şifre tekrarı zorunludur',
                validate: val => val === watch('password') || 'Şifreler eşleşmiyor'
              })}
              placeholder="********"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500" />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
          </div>

          {/* Rol */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Hesap Türü</label>
            <select {...register('role_id', { required: 'Hesap türü seçin' })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500">
              <option value="">Seçin...</option>
              {roles.map(role => (
                <option key={role.id} value={role.id}>{role.name}</option>
              ))}
            </select>
            {errors.role_id && <p className="text-red-500 text-xs mt-1">{errors.role_id.message}</p>}
          </div>

          {/* Mağaza Alanları */}
          {isStore && (
            <div className="space-y-4 border border-blue-100 rounded-xl p-4 bg-blue-50">
              <p className="text-sm font-bold text-blue-700">Mağaza Bilgileri</p>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Mağaza Adı</label>
                <input {...register('storeName', { required: 'Mağaza adı zorunludur', minLength: { value: 3, message: 'En az 3 karakter' } })}
                  placeholder="Mağaza adı"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500" />
                {errors.storeName && <p className="text-red-500 text-xs mt-1">{errors.storeName.message}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Mağaza Telefonu</label>
                <input {...register('storePhone', { required: 'Telefon zorunludur', pattern: { value: /^(\+90|0)?[0-9]{10}$/, message: 'Geçerli Türkiye telefonu girin' } })}
                  placeholder="05XX XXX XX XX"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500" />
                {errors.storePhone && <p className="text-red-500 text-xs mt-1">{errors.storePhone.message}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Vergi No (TXXXXVXXXXXX)</label>
                <input {...register('storeTaxNo', { required: 'Vergi no zorunludur', pattern: { value: /^T\d{4}V\d{6}$/, message: 'Format: TXXXXVXXXXXX' } })}
                  placeholder="T1234V123456"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500" />
                {errors.storeTaxNo && <p className="text-red-500 text-xs mt-1">{errors.storeTaxNo.message}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">IBAN</label>
                <input {...register('storeBankAccount', { required: 'IBAN zorunludur', pattern: { value: /^TR\d{24}$/, message: 'Geçerli IBAN girin (TR ile başlamalı)' } })}
                  placeholder="TR000000000000000000000000"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500" />
                {errors.storeBankAccount && <p className="text-red-500 text-xs mt-1">{errors.storeBankAccount.message}</p>}
              </div>
            </div>
          )}

          <button type="submit" disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:opacity-70">
            {loading ? <><Loader2 size={18} className="animate-spin" /> Kaydediliyor...</> : 'Kayıt Ol'}
          </button>
        </form>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Loader2 } from 'lucide-react'
import { setUser } from '../store/actions/clientActions'
import api from '../api/axios'

export default function LoginPage() {
  const dispatch = useDispatch()
  const history = useHistory()
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const response = await api.post('/login', {
        email: data.email,
        password: data.password,
      })

      const { token, ...userInfo } = response.data
      api.defaults.headers.common['Authorization'] = token

      if (data.rememberMe) {
        localStorage.setItem('token', token)
      }

      dispatch(setUser(userInfo))
      toast.success(`Hoş geldin, ${userInfo.name}!`)
      history.push('/')

    } catch (err) {
      toast.error(err.response?.data?.message || 'Giriş başarısız!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Giriş Yap</h1>
          <p className="text-gray-500 text-sm mt-2">Ocean Tech hesabına giriş yap</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">E-posta</label>
            <input
              {...register('email', {
                required: 'E-posta zorunludur',
                pattern: { value: /^\S+@\S+$/i, message: 'Geçerli bir e-posta girin' }
              })}
              placeholder="ornek@mail.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Şifre</label>
            <input
              type="password"
              {...register('password', { required: 'Şifre zorunludur' })}
              placeholder="********"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="rememberMe" {...register('rememberMe')} className="w-4 h-4 accent-blue-600" />
            <label htmlFor="rememberMe" className="text-sm text-gray-600">Beni Hatırla</label>
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:opacity-70">
            {loading ? <><Loader2 size={18} className="animate-spin" /> Giriş yapılıyor...</> : 'Giriş Yap'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Hesabın yok mu?{' '}
          <Link to="/signup" className="text-blue-600 font-medium hover:underline">Kayıt Ol</Link>
        </p>

        <div className="mt-6 p-4 bg-gray-50 rounded-xl text-xs text-gray-500">
          <p className="font-bold text-gray-600 mb-2">Test Kullanıcıları (Şifre: 123456)</p>
          <p>👤 customer@commerce.com</p>
          <p>🏪 store@commerce.com</p>
          <p>👑 admin@commerce.com</p>
        </div>
      </div>
    </div>
  )
}
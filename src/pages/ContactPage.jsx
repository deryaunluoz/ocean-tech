import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function ContactPage() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const onSubmit = (data) => {
    toast.success('Mesajınız gönderildi!')
    reset()
  }

  return (
    <div>
      <div className="bg-gray-50 py-16 text-center">
        <p className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-2">Bize Ulaşın</p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">İletişim</h1>
        <p className="text-gray-500 mt-3 max-w-md mx-auto text-sm">Sorularınız için bize ulaşın.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Bizi Ziyaret Edin</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin size={22} className="text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">Adres</h4>
                  <p className="text-gray-500 text-sm">Sheikh Zayed Road, Downtown Dubai, UAE</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone size={22} className="text-green-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">Telefon</h4>
                  <p className="text-gray-500 text-sm">+971 4 000 0000</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail size={22} className="text-orange-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">E-posta</h4>
                  <p className="text-gray-500 text-sm">info@oceantech.ae</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock size={22} className="text-purple-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">Çalışma Saatleri</h4>
                  <p className="text-gray-500 text-sm">Pzt - Cum: 09:00 - 18:00</p>
                  <p className="text-gray-500 text-sm">Cumartesi: 10:00 - 16:00</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Mesaj Gönderin</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Ad</label>
                  <input {...register('name', { required: 'Ad zorunludur' })} placeholder="Adınız"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500" />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Soyad</label>
                  <input {...register('surname', { required: 'Soyad zorunludur' })} placeholder="Soyadınız"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500" />
                  {errors.surname && <p className="text-red-500 text-xs mt-1">{errors.surname.message}</p>}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">E-posta</label>
                <input {...register('email', { required: 'E-posta zorunludur', pattern: { value: /^\S+@\S+$/i, message: 'Geçerli e-posta girin' } })}
                  placeholder="ornek@mail.com"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500" />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Konu</label>
                <input {...register('subject', { required: 'Konu zorunludur' })} placeholder="Mesajınızın konusu"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500" />
                {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Mesaj</label>
                <textarea {...register('message', { required: 'Mesaj zorunludur', minLength: { value: 10, message: 'En az 10 karakter' } })}
                  placeholder="Mesajınızı yazın..." rows={5}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 resize-none" />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition">
                Gönder
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

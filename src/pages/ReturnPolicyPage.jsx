import { CheckCircle, XCircle, AlertCircle, Phone, Mail } from 'lucide-react'

export default function ReturnPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">İade ve Değişim Politikası</h1>
        <p className="text-gray-500">Ocean Tech'te memnuniyetiniz garantilidir.</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
        <div className="flex items-start gap-4">
          <CheckCircle size={24} className="text-blue-600 mt-1 shrink-0" />
          <div>
            <h2 className="font-bold text-gray-800 text-lg mb-1">7 Gün İade Garantisi</h2>
            <p className="text-gray-600 text-sm">Satın aldığınız üründen memnun kalmazsanız, teslim tarihinden itibaren 7 gün içinde iade edebilirsiniz.</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-2xl p-6 mb-8">
        <h2 className="font-bold text-gray-800 mb-4">İade İçin İletişim</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <Phone size={18} className="text-blue-600" />
            <div>
              <p className="text-xs text-gray-400">Telefon</p>
              <p className="text-sm font-medium">+971 4 000 0000</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Mail size={18} className="text-blue-600" />
            <div>
              <p className="text-xs text-gray-400">E-posta</p>
              <p className="text-sm font-medium">info@oceantech.ae</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-green-500 text-xl">💬</span>
            <div>
              <p className="text-xs text-gray-400">WhatsApp</p>
              <p className="text-sm font-medium">+971 54 309 0859</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="font-bold text-gray-800 text-xl mb-4">İade Koşulları</h2>
        <div className="flex flex-col gap-3">
          {[
            'Ürün orijinal ambalajında ve açılmamış olmalıdır.',
            'Tüm aksesuarlar, kullanım kılavuzu ve garanti kartı eksiksiz olmalıdır.',
            'Orijinal satış faturası ile birlikte iade edilmelidir.',
            'Ürün kullanılmamış ve çizilmemiş olmalıdır.',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 bg-white border border-gray-100 rounded-xl p-4">
              <CheckCircle size={18} className="text-green-500 mt-0.5 shrink-0" />
              <p className="text-sm text-gray-600">{item}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="font-bold text-gray-800 text-xl mb-4">İade Edilemeyen Durumlar</h2>
        <div className="flex flex-col gap-3">
          {[
            'Ambalaj eksik veya ürün hasar görmüşse.',
            'Ürün etkinleştirilmiş veya kullanılmışsa.',
            'Kişisel bakım ve hijyen ürünleri açılmışsa.',
            'Özel sipariş veya kişiye özel ürünler.',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 bg-white border border-gray-100 rounded-xl p-4">
              <XCircle size={18} className="text-red-500 mt-0.5 shrink-0" />
              <p className="text-sm text-gray-600">{item}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="font-bold text-gray-800 text-xl mb-4">Geri Ödemeler</h2>
        <div className="flex flex-col gap-3">
          {[
            'Kredi/banka kartı ile yapılan alışverişlerin iadesi aynı karta yapılır.',
            'İade işlemi tamamlandıktan sonra 7-14 iş günü içinde geri ödeme yapılır.',
            'Teslimat ve kurulum ücretleri iade edilmez.',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 bg-white border border-gray-100 rounded-xl p-4">
              <AlertCircle size={18} className="text-yellow-500 mt-0.5 shrink-0" />
              <p className="text-sm text-gray-600">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
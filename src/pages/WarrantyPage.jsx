import { Shield, CheckCircle, Clock, Wrench } from 'lucide-react'

export default function WarrantyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">Garanti Politikası</h1>
        <p className="text-gray-500">Tüm ürünlerimiz resmi garanti kapsamındadır.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-blue-50 rounded-2xl p-6 text-center">
          <Shield size={32} className="text-blue-600 mx-auto mb-3" />
          <h3 className="font-bold text-gray-800 mb-1">2 Yıl Garanti</h3>
          <p className="text-gray-500 text-sm">Tüm ürünlerde standart garanti</p>
        </div>
        <div className="bg-green-50 rounded-2xl p-6 text-center">
          <Wrench size={32} className="text-green-600 mx-auto mb-3" />
          <h3 className="font-bold text-gray-800 mb-1">Ücretsiz Tamir</h3>
          <p className="text-gray-500 text-sm">Garanti kapsamındaki arızalar</p>
        </div>
        <div className="bg-orange-50 rounded-2xl p-6 text-center">
          <Clock size={32} className="text-orange-600 mx-auto mb-3" />
          <h3 className="font-bold text-gray-800 mb-1">Hızlı Servis</h3>
          <p className="text-gray-500 text-sm">4 iş günü içinde çözüm</p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="font-bold text-gray-800 text-xl mb-4">Garanti Kapsamı</h2>
        <div className="flex flex-col gap-3">
          {[
            'Üretim hatalarından kaynaklanan arızalar',
            'Elektriksel ve mekanik arızalar',
            'Yazılım desteği ve güncellemeleri',
            'Yetkili servis tarafından yapılan onarımlar',
            'Orijinal parça değişimi',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 bg-white border border-gray-100 rounded-xl p-4">
              <CheckCircle size={18} className="text-green-500 mt-0.5 shrink-0" />
              <p className="text-sm text-gray-600">{item}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="font-bold text-gray-800 text-xl mb-4">Uzatılmış Garanti</h2>
        <div className="bg-gray-50 rounded-2xl p-6">
          <p className="text-gray-600 text-sm mb-4">Standart garantinizi 36 aya kadar uzatabilirsiniz!</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <h4 className="font-bold text-gray-800 mb-2">Standart Plan</h4>
              <ul className="text-sm text-gray-600 flex flex-col gap-1">
                <li>✅ 24 ay garanti</li>
                <li>✅ Ücretsiz tamir</li>
                <li>✅ Parça değişimi</li>
              </ul>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <h4 className="font-bold text-blue-800 mb-2">Premium Plan</h4>
              <ul className="text-sm text-gray-600 flex flex-col gap-1">
                <li>✅ 36 ay garanti</li>
                <li>✅ Ücretsiz tamir</li>
                <li>✅ Parça değişimi</li>
                <li>✅ Hasar koruması</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
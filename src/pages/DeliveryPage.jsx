import { Truck, Clock, MapPin, CheckCircle } from 'lucide-react'

export default function DeliveryPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">Teslimat Politikası</h1>
        <p className="text-gray-500">Hızlı ve güvenli teslimat garantisi.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-blue-50 rounded-2xl p-6 text-center">
          <Truck size={32} className="text-blue-600 mx-auto mb-3" />
          <h3 className="font-bold text-gray-800 mb-1">Ücretsiz Kargo</h3>
          <p className="text-gray-500 text-sm">200 AED üzeri siparişlerde</p>
        </div>
        <div className="bg-green-50 rounded-2xl p-6 text-center">
          <Clock size={32} className="text-green-600 mx-auto mb-3" />
          <h3 className="font-bold text-gray-800 mb-1">Hızlı Teslimat</h3>
          <p className="text-gray-500 text-sm">1-3 iş günü içinde</p>
        </div>
        <div className="bg-orange-50 rounded-2xl p-6 text-center">
          <MapPin size={32} className="text-orange-600 mx-auto mb-3" />
          <h3 className="font-bold text-gray-800 mb-1">UAE Geneli</h3>
          <p className="text-gray-500 text-sm">Dubai, Abu Dhabi, Sharjah</p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="font-bold text-gray-800 text-xl mb-4">Teslimat Seçenekleri</h2>
        <div className="flex flex-col gap-4">
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-gray-800">Standart Teslimat</h3>
              <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">Ücretsiz (200 AED+)</span>
            </div>
            <p className="text-gray-500 text-sm">2-3 iş günü içinde teslim edilir.</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-gray-800">Ekspres Teslimat</h3>
              <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">25 AED</span>
            </div>
            <p className="text-gray-500 text-sm">Aynı gün veya ertesi gün teslim edilir.</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-gray-800">Mağazadan Teslim</h3>
              <span className="bg-gray-100 text-gray-700 text-xs font-bold px-3 py-1 rounded-full">Ücretsiz</span>
            </div>
            <p className="text-gray-500 text-sm">Dubai Mall mağazamızdan ücretsiz teslim alabilirsiniz.</p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="font-bold text-gray-800 text-xl mb-4">Teslimat Bölgeleri</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain', 'Al Ain'].map((city) => (
            <div key={city} className="flex items-center gap-2 bg-gray-50 rounded-xl p-3">
              <CheckCircle size={16} className="text-green-500" />
              <span className="text-sm text-gray-600">{city}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
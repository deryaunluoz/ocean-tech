import { Target, Eye, Award } from 'lucide-react'

export default function AboutPage() {
  return (
    <div>
      <div className="bg-gray-50 py-16 text-center">
        <p className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-2">Hakkımızda</p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Ocean Tech Kimiz?</h1>
        <p className="text-gray-500 mt-3 max-w-lg mx-auto text-sm">
          Dubai'nin en güvenilir teknoloji mağazası olarak 2010'dan beri hizmet veriyoruz.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hikaye */}
        <div className="flex flex-col md:flex-row items-center gap-12 mb-20">
          <div className="flex-1">
        <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80"
              alt="Mağaza" className="rounded-2xl w-full h-80 object-cover shadow-lg" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold text-blue-500 tracking-widest uppercase mb-2">Hikayemiz</p>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Yaptığımız şeyi seviyoruz</h2>
            <p className="text-gray-500 leading-relaxed mb-4">
              Ocean Tech, 2010 yılında Dubai'de küçük bir teknoloji dükkanı olarak başladı.
              Bugün 15.000'den fazla müşteriye, 500'den fazla marka ve 10.000'den fazla ürünle hizmet veriyoruz.
            </p>
            <p className="text-gray-500 leading-relaxed">
              Misyonumuz, müşterilerimize en kaliteli teknoloji ürünlerini en uygun fiyatlarla sunmak
              ve satış sonrası destek ile yanlarında olmaktır.
            </p>
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">15K</p>
                <p className="text-xs text-gray-400 mt-1">Mutlu Müşteri</p>
              </div>
              <div className="text-center border-x border-gray-100">
                <p className="text-3xl font-bold text-blue-600">500+</p>
                <p className="text-xs text-gray-400 mt-1">Marka</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">15</p>
                <p className="text-xs text-gray-400 mt-1">Yıllık Deneyim</p>
              </div>
            </div>
          </div>
        </div>

        {/* Misyon / Vizyon / Değerler */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-gray-50 rounded-2xl">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target size={28} className="text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-800 text-lg mb-3">Misyon</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Müşterilerimize en kaliteli teknoloji ürünlerini en uygun fiyatlarla sunmak.
            </p>
          </div>
          <div className="text-center p-8 bg-gray-50 rounded-2xl">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye size={28} className="text-green-600" />
            </div>
            <h3 className="font-bold text-gray-800 text-lg mb-3">Vizyon</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Orta Doğu'nun en büyük ve en güvenilir teknoloji perakende markası olmak.
            </p>
          </div>
          <div className="text-center p-8 bg-gray-50 rounded-2xl">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award size={28} className="text-orange-600" />
            </div>
            <h3 className="font-bold text-gray-800 text-lg mb-3">Değerlerimiz</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Dürüstlük, kalite, müşteri memnuniyeti ve sürekli gelişim.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

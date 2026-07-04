import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import ProductCard from '../components/ProductCard'
import { fetchCategories, fetchProducts } from '../store/actions/productActions'
import { ArrowRight, Truck, RefreshCw, Shield, Star, Zap } from 'lucide-react'

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
}

const brands = ['Apple', 'Samsung', 'Sony', 'Dell', 'Huawei', 'Xiaomi', 'LG', 'Lenovo']

export default function HomePage() {
  const dispatch = useDispatch()
  const { categories, productList, fetchState } = useSelector(state => state.product)

  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchProducts({ limit: 8 }))
  }, [dispatch])

  const topCategories = [...categories]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5)

  return (
    <div>
      {/* ── HERO SLIDER ── */}
      <div className="overflow-hidden">
        <Slider {...sliderSettings}>
          {/* Slide 1 */}
          <div>
            <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">Yeni Sezon</span>
                  <h1 className="text-4xl md:text-6xl font-bold leading-tight mt-4 mb-4">
                    iPhone 15 Pro<br />
                    <span className="text-blue-400">Dubai'de!</span>
                  </h1>
                  <p className="text-gray-300 mb-8 max-w-sm text-lg">
                    En son Apple teknolojisi şimdi Ocean Tech'te. Ücretsiz kargo ve 2 yıl garanti!
                  </p>
                  <div className="flex gap-4">
                    <Link to="/shop" className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition">
                      Hemen Al <ArrowRight size={18} />
                    </Link>
                    <Link to="/shop" className="inline-flex items-center gap-2 border border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-gray-900 transition">
                      Keşfet
                    </Link>
                  </div>
                </div>
                <div className="flex-1 flex justify-center">
                  <img
                    src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1693009279096"
                    alt="iPhone 15 Pro"
                    className="w-64 md:w-80 rounded-2xl shadow-2xl object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Slide 2 */}
          <div>
            <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <span className="bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">Çok Satan</span>
                  <h1 className="text-4xl md:text-6xl font-bold leading-tight mt-4 mb-4">
                    Samsung<br />
                    <span className="text-yellow-400">Galaxy S24</span>
                  </h1>
                  <p className="text-blue-100 mb-8 max-w-sm text-lg">
                    Galaxy AI ile tanışın. Yapay zeka destekli en akıllı Samsung telefon.
                  </p>
                  <Link to="/shop" className="inline-flex items-center gap-2 bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-lg hover:bg-yellow-300 transition">
                    Şimdi Satın Al <ArrowRight size={18} />
                  </Link>
                </div>
                <div className="flex-1 flex justify-center">
                  <img
                    src="https://images.samsung.com/is/image/samsung/assets/us/2501/pcd/smartphones/galaxy-s24/galaxy-S24-ft02-kv_DT.jpg"
                    alt="Samsung Galaxy S24"
                    className="w-64 md:w-80 rounded-2xl shadow-2xl object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Slide 3 */}
          <div>
            <div className="bg-gradient-to-r from-slate-800 to-slate-600 text-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">En İyi Laptop</span>
                  <h1 className="text-4xl md:text-6xl font-bold leading-tight mt-4 mb-4">
                    MacBook Pro<br />
                    <span className="text-green-400">M3 Chip</span>
                  </h1>
                  <p className="text-gray-300 mb-8 max-w-sm text-lg">
                    M3 işlemci ile inanılmaz performans. Profesyoneller için tasarlandı.
                  </p>
                  <Link to="/shop" className="inline-flex items-center gap-2 bg-green-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-400 transition">
                    İncele <ArrowRight size={18} />
                  </Link>
                </div>
                <div className="flex-1 flex justify-center">
                  <img
                    src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1697230830200"
                    alt="MacBook Pro M3"
                    className="w-64 md:w-80 rounded-2xl shadow-2xl object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </Slider>
      </div>

      {/* ── KAMPANYA BANERLARI ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-2xl p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <Truck size={24} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Ücretsiz Kargo</h3>
              <p className="text-gray-500 text-sm">200 AED üzeri siparişlerde</p>
            </div>
          </div>
          <div className="bg-green-50 rounded-2xl p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
              <RefreshCw size={24} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Kolay İade</h3>
              <p className="text-gray-500 text-sm">14 gün içinde ücretsiz iade</p>
            </div>
          </div>
          <div className="bg-orange-50 rounded-2xl p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center">
              <Shield size={24} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">2 Yıl Garanti</h3>
              <p className="text-gray-500 text-sm">Tüm ürünlerde resmi garanti</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── MARKALAR ── */}
      <div className="border-y border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {brands.map((brand) => (
              <span key={brand} className="text-gray-400 font-bold text-lg md:text-xl hover:text-gray-700 transition cursor-pointer">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── KATEGORİLER ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <p className="text-xs font-bold text-blue-500 tracking-widest uppercase">Kategoriler</p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-1">En Çok Satan Kategoriler</h2>
        </div>

        {topCategories.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {topCategories.map(cat => (
              <Link
                key={cat.id}
                to={`/shop/teknoloji/${cat.title?.toLowerCase()}/${cat.id}`}
                className="relative rounded-2xl overflow-hidden h-48 group shadow-md"
              >
                <img src={cat.img} alt={cat.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex flex-col justify-end p-4">
                  <h3 className="text-white font-bold text-lg">{cat.title}</h3>
                  <span className="text-blue-300 text-xs mt-1 flex items-center gap-1">
                    <Star size={10} fill="currentColor" /> {cat.rating}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 py-12">Kategoriler yükleniyor...</div>
        )}
      </div>

      {/* ── ÖNE ÇIKAN ÜRÜNLER ── */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-xs font-bold text-blue-500 tracking-widest uppercase">Öne Çıkan</p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-1">Çok Satan Ürünler</h2>
            </div>
            <Link to="/shop" className="flex items-center gap-2 text-blue-600 font-bold hover:underline">
              Tümünü Gör <ArrowRight size={16} />
            </Link>
          </div>

          {fetchState === 'FETCHING' && (
            <div className="flex justify-center py-12">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {fetchState === 'FETCHED' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {productList.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {fetchState === 'FAILED' && (
            <p className="text-center text-gray-400 py-12">Ürünler yüklenirken bir hata oluştu.</p>
          )}

          <div className="flex justify-center mt-10">
            <Link to="/shop" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-10 py-3 rounded-lg font-bold transition">
              DAHA FAZLA ÜRÜN
            </Link>
          </div>
        </div>
      </div>

      {/* ── ÖZEL TEKLİF BANNER ── */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Zap size={20} className="text-yellow-400" />
              <span className="text-yellow-400 font-bold text-sm uppercase tracking-widest">Özel Teklif</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Sony WH-1000XM5</h2>
            <p className="text-blue-100 text-lg">Dünyanın En İyi Noise Cancelling Kulaklığı</p>
            <p className="text-4xl font-bold mt-4">$349.99</p>
          </div>
          <div className="flex gap-4">
            <Link to="/shop" className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition flex items-center gap-2">
              Hemen Al <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>

      {/* ── HAKKIMIZDA ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&q=80" alt="about1" className="rounded-2xl w-full h-48 object-cover" />
            <img src="https://images.unsplash.com/photo-1555421689-491a97ff2040?w=300&q=80" alt="about2" className="rounded-2xl w-full h-48 object-cover mt-8" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold text-blue-500 tracking-widest uppercase mb-2">Hakkımızda</p>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Dubai'nin En Güvenilir<br />Teknoloji Mağazası</h2>
            <p className="text-gray-500 leading-relaxed mb-6">
              Ocean Tech olarak 2010'dan beri Dubai'de teknoloji tutkunlarına en kaliteli ürünleri
              en uygun fiyatlarla sunuyoruz. Apple, Samsung, Sony ve daha fazlası!
            </p>
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">15K+</p>
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
            <Link to="/about" className="mt-8 inline-flex items-center gap-2 bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition">
              Hakkımızda <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
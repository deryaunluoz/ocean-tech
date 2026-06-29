import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import ProductCard from '../components/ProductCard'
import { fetchCategories, fetchProducts } from '../store/actions/productActions'
import { ArrowRight, Truck, RefreshCw, Shield, Headphones } from 'lucide-react'

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
}

const brands = ['Apple', 'Samsung', 'Sony', 'LG', 'Huawei', 'Xiaomi']

export default function HomePage() {
  const dispatch = useDispatch()
  const { categories, productList, fetchState } = useSelector(state => state.product)

  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchProducts({ limit: 8 }))
  }, [dispatch])

  // En yüksek ratingli 5 kategori
  const topCategories = [...categories]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5)

  return (
    <div>
      {/* ── HERO SLIDER ── */}
      <div className="bg-[#23A6F0] text-white overflow-hidden">
        <Slider {...sliderSettings}>
          <div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <p className="text-sm font-semibold tracking-widest text-blue-100 uppercase mb-2">Yaz 2025 Koleksiyonu</p>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
                  YENİ<br />KOLEKSİYON
                </h1>
                <p className="text-blue-100 mb-8 max-w-sm">
                  Büyük nesnelerin nasıl davrandığını biliyoruz, ama küçük ölçekteki şeyleri bilmiyoruz.
                </p>
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold py-3 px-8 rounded-md hover:bg-blue-50 transition"
                >
                  ŞİMDİ ALIŞVERİŞ YAP <ArrowRight size={18} />
                </Link>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="w-72 h-72 md:w-96 md:h-96 bg-blue-400 rounded-full opacity-30 absolute" />
                <img
                  src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80"
                  alt="Hero"
                  className="relative z-10 w-64 md:w-80 rounded-2xl shadow-2xl object-cover"
                />
              </div>
            </div>
          </div>
          <div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <p className="text-sm font-semibold tracking-widest text-blue-100 uppercase mb-2">Haftalık Ürün</p>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
                  EN İYİ<br />TEKNOLOJİ
                </h1>
                <p className="text-blue-100 mb-8 max-w-sm">
                  iPhone, Samsung, Sony ve daha fazlası. Dubai'nin en büyük teknoloji mağazası.
                </p>
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold py-3 px-8 rounded-md hover:bg-blue-50 transition"
                >
                  KEŞFEDİN <ArrowRight size={18} />
                </Link>
              </div>
              <div className="flex-1 flex justify-center">
                <img
                  src="https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=500&q=80"
                  alt="Hero 2"
                  className="relative z-10 w-64 md:w-80 rounded-2xl shadow-2xl object-cover"
                />
              </div>
            </div>
          </div>
        </Slider>
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

      {/* ── EDİTÖR'ÜN SEÇİMİ (Top Kategoriler) ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <p className="text-xs font-bold text-gray-400 tracking-widest uppercase">EDİTÖRÜN SEÇİMİ</p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-1">En Çok Satan Kategoriler</h2>
        </div>

        {topCategories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topCategories.slice(0, 1).map(cat => (
              <Link
                key={cat.id}
                to={`/shop/${cat.gender === 'k' ? 'kadin' : 'erkek'}/${cat.title?.toLowerCase()}/${cat.id}`}
                className="relative rounded-xl overflow-hidden h-64 md:row-span-2 md:h-full group"
              >
                <img src={cat.img} alt={cat.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-6">
                  <h3 className="text-white font-bold text-xl">{cat.title}</h3>
                  <span className="text-white text-sm underline mt-1">Keşfet</span>
                </div>
              </Link>
            ))}
            <div className="grid grid-cols-1 gap-4 md:col-span-1">
              {topCategories.slice(1, 5).map(cat => (
                <Link
                  key={cat.id}
                  to={`/shop/${cat.gender === 'k' ? 'kadin' : 'erkek'}/${cat.title?.toLowerCase()}/${cat.id}`}
                  className="relative rounded-xl overflow-hidden h-40 group"
                >
                  <img src={cat.img} alt={cat.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-4">
                    <h3 className="text-white font-bold">{cat.title}</h3>
                    <span className="text-white text-xs underline">Keşfet</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          // Kategoriler yüklenirken placeholder
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Telefon', 'Laptop', 'TV', 'Aksesuar'].map((cat) => (
              <Link key={cat} to="/shop" className="relative rounded-xl overflow-hidden h-48 group">
                <img
                  src={`https://source.unsplash.com/400x300/?${cat.toLowerCase()},technology`}
                  alt={cat}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-4">
                  <h3 className="text-white font-bold">{cat}</h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* ── ÇOK SATAN ÜRÜNLER ── */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-bold text-gray-400 tracking-widest uppercase">Öne Çıkan Ürünler</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-1">ÇOK SATAN ÜRÜNLER</h2>
            <p className="text-gray-500 text-sm mt-2">Tüm envanteri reserve etme fiyatlandırması dahildir.</p>
          </div>

          {fetchState === 'FETCHING' && (
            <div className="flex justify-center py-12">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {fetchState === 'FETCHED' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {productList.slice(0, 8).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <div className="flex justify-center mt-10">
                <Link
                  to="/shop"
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-10 py-3 rounded-md font-bold transition"
                >
                  DAHA FAZLA ÜRÜN YÜKLE
                </Link>
              </div>
            </>
          )}

          {fetchState === 'FAILED' && (
            <p className="text-center text-gray-400 py-12">Ürünler yüklenirken bir hata oluştu.</p>
          )}
        </div>
      </div>

      {/* ── BİZ NE YAPIYORUZ ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1503602642458-232111445657?w=300&q=80" alt="about1" className="rounded-2xl w-full h-48 object-cover" />
            <img src="https://images.unsplash.com/photo-1555421689-491a97ff2040?w=300&q=80" alt="about2" className="rounded-2xl w-full h-48 object-cover mt-8" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold text-blue-500 tracking-widest uppercase mb-2">Hakkımızda</p>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Yaptığımız şeyi seviyoruz</h2>
            <p className="text-gray-500 leading-relaxed mb-6">
              Ocean Tech olarak Dubai'de teknoloji tutkunlarına en kaliteli ürünleri en uygun fiyatlarla sunuyoruz.
              2010'dan beri 1 milyondan fazla müşteriye hizmet verdik.
            </p>
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-800">15K</p>
                <p className="text-xs text-gray-400 mt-1">Mutlu Müşteri</p>
              </div>
              <div className="text-center border-x border-gray-100">
                <p className="text-3xl font-bold text-gray-800">150+</p>
                <p className="text-xs text-gray-400 mt-1">Çalışan</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-800">15</p>
                <p className="text-xs text-gray-400 mt-1">Yıllık Deneyim</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── HİZMETLER ── */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-bold text-gray-400 tracking-widest uppercase">Öne Çıkan Hizmetler</p>
            <h2 className="text-2xl font-bold text-gray-800 mt-1">EN İYİ HİZMETLER</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Truck size={28} className="text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Kolay Kazanç</h3>
              <p className="text-gray-500 text-sm">Satın alımlarınızda puan kazanın ve indirim elde edin.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <RefreshCw size={28} className="text-green-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Somut</h3>
              <p className="text-gray-500 text-sm">100.000'den fazla ürün ve hızlı teslimat.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Shield size={28} className="text-orange-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Hızlı Büyüme</h3>
              <p className="text-gray-500 text-sm">Her ay binlerce yeni ürün ekliyoruz.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

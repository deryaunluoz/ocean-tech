import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Newsletter */}
      <div className="bg-blue-600 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-white font-bold text-xl">Bültenimize Abone Olun</h3>
            <p className="text-blue-100 text-sm">En yeni ürünler ve kampanyalardan haberdar olun!</p>
          </div>
          <div className="flex w-full md:w-auto">
            <input
              type="email"
              placeholder="E-posta adresiniz"
              className="flex-1 md:w-72 px-4 py-3 rounded-l-lg text-gray-800 outline-none text-sm"
            />
            <button className="bg-gray-900 text-white px-6 py-3 rounded-r-lg hover:bg-gray-800 transition font-bold text-sm">
              Abone Ol
            </button>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

          {/* Logo & Contact */}
          <div className="lg:col-span-2">
            <Link to="/" className="text-2xl font-bold text-white">🌊 Ocean Tech</Link>
            <p className="mt-3 text-sm text-gray-400 leading-relaxed">
              Dubai'nin en güvenilir teknoloji mağazası. 2010'dan beri 15.000'den fazla müşteriye hizmet veriyoruz.
            </p>
            <div className="mt-4 flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-blue-400" />
                <span>+971 4 000 0000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-blue-400" />
                <span>info@oceantech.ae</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-blue-400" />
                <span>Dubai Mall, Dubai, UAE</span>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition">
                <Facebook size={14} />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition">
                <Twitter size={14} />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition">
                <Instagram size={14} />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition">
                <Youtube size={14} />
              </a>
            </div>
          </div>

          {/* Kategoriler */}
          <div>
            <h4 className="text-white font-bold mb-4">Kategoriler</h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li><Link to="/shop/teknoloji/telefon/1" className="hover:text-blue-400 transition">Telefonlar</Link></li>
              <li><Link to="/shop/teknoloji/laptop/2" className="hover:text-blue-400 transition">Laptoplar</Link></li>
              <li><Link to="/shop/teknoloji/kulaklik/3" className="hover:text-blue-400 transition">Kulaklıklar</Link></li>
              <li><Link to="/shop/teknoloji/tv/4" className="hover:text-blue-400 transition">TV</Link></li>
              <li><Link to="/shop/teknoloji/tablet/5" className="hover:text-blue-400 transition">Tabletler</Link></li>
              <li><Link to="/shop/teknoloji/oyun/7" className="hover:text-blue-400 transition">Oyun</Link></li>
              <li><Link to="/shop/teknoloji/mutfak/8" className="hover:text-blue-400 transition">Mutfak</Link></li>
            </ul>
          </div>

          {/* Yardım */}
          <div>
            <h4 className="text-white font-bold mb-4">Yardım</h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li><Link to="/contact" className="hover:text-blue-400 transition">İletişim</Link></li>
              <li><Link to="/about" className="hover:text-blue-400 transition">Hakkımızda</Link></li>
              <li><Link to="/iade-politikasi" className="hover:text-blue-400 transition">İade Politikası</Link></li>
              <li><Link to="/garanti" className="hover:text-blue-400 transition">Garanti</Link></li>
              <li><Link to="/teslimat" className="hover:text-blue-400 transition">Teslimat</Link></li>
              <li><Link to="/sss" className="hover:text-blue-400 transition">SSS</Link></li>
            </ul>
          </div>

          {/* Şirket */}
          <div>
            <h4 className="text-white font-bold mb-4">Şirket</h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li><Link to="/about" className="hover:text-blue-400 transition">Ocean Tech Hakkında</Link></li>
              <li><Link to="/kariyer" className="hover:text-blue-400 transition">Kariyer</Link></li>
              <li><Link to="/blog" className="hover:text-blue-400 transition">Blog</Link></li>
              <li><Link to="/gizlilik" className="hover:text-blue-400 transition">Gizlilik Politikası</Link></li>
              <li><Link to="/kullanim-sartlari" className="hover:text-blue-400 transition">Kullanım Şartları</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>© 2026 Ocean Tech LLC. Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-2">
            <span>Ödeme Yöntemleri:</span>
            <span className="bg-gray-700 text-white px-2 py-0.5 rounded text-xs">VISA</span>
            <span className="bg-gray-700 text-white px-2 py-0.5 rounded text-xs">Mastercard</span>
            <span className="bg-gray-700 text-white px-2 py-0.5 rounded text-xs">Apple Pay</span>
            <span className="bg-gray-700 text-white px-2 py-0.5 rounded text-xs">PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
import { Link } from 'react-router-dom'
import { ShoppingCart, User, Menu, X, Search, Heart, Package, MapPin, CreditCard, LogOut, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../store/actions/clientActions'
import api from '../api/axios'

const menuItems = [
  { label: 'Telefonlar', path: '/shop/teknoloji/telefon/1' },
  { label: 'Laptoplar', path: '/shop/teknoloji/laptop/2' },
  { label: 'Kulaklıklar', path: '/shop/teknoloji/kulaklik/3' },
  { label: 'TV', path: '/shop/teknoloji/tv/4' },
  { label: 'Tabletler', path: '/shop/teknoloji/tablet/5' },
  { label: 'Aksesuar', path: '/shop/teknoloji/aksesuar/6' },
  { label: 'Oyun', path: '/shop/teknoloji/oyun/7' },
  { label: 'Mutfak', path: '/shop/teknoloji/mutfak/8' },
  { label: 'Süpürge', path: '/shop/teknoloji/supurge/9' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserOpen, setIsUserOpen] = useState(false)
  const dispatch = useDispatch()
  const cart = useSelector(state => state.shoppingCart.cart)
  const user = useSelector(state => state.client.user)

  const totalItems = cart.reduce((sum, item) => sum + item.count, 0)

  const handleLogout = () => {
    localStorage.removeItem('token')
    delete api.defaults.headers.common['Authorization']
    dispatch(setUser({}))
    setIsUserOpen(false)
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-gray-900 text-white text-xs py-2 px-4 flex justify-between items-center">
        <span>📞 +971 4 000 0000 &nbsp;|&nbsp; ✉️ info@oceantech.ae &nbsp;|&nbsp; 🚚 200 AED üzeri ücretsiz kargo</span>
        <span className="hidden md:block">Bizi takip edin ve %20 indirim kazanın!</span>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition whitespace-nowrap">
            🌊 Ocean Tech
          </Link>

          {/* Search bar */}
          <div className="flex-1 hidden md:flex items-center border-2 border-gray-200 rounded-lg overflow-hidden hover:border-blue-400 transition">
            <input
              type="text"
              placeholder="Ürün, marka veya kategori ara..."
              className="flex-1 px-4 py-2 text-sm outline-none"
            />
            <button className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition">
              <Search size={18} />
            </button>
          </div>

          {/* Right icons */}
          <div className="flex items-center space-x-4 text-gray-600">
            <Link to="/favorites" className="hover:text-blue-600 transition hidden md:block">
              <Heart size={20} />
            </Link>
            <Link to="/cart" className="relative hover:text-blue-600 transition">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {user?.name ? (
              <div className="relative hidden md:block">
                <button
                  onClick={() => setIsUserOpen(!isUserOpen)}
                  className="flex items-center gap-2 text-sm font-medium hover:text-blue-600 transition"
                >
                  <User size={18} />
                  <span>{user.name}</span>
                  <ChevronDown size={14} />
                </button>

                {isUserOpen && (
                  <div className="absolute right-0 top-full mt-2 bg-white shadow-xl border border-gray-100 rounded-xl w-56 z-50 overflow-hidden">
                    <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                      <p className="font-bold text-gray-800 text-sm">{user.name}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{user.email}</p>
                    </div>
                    <div className="py-2">
                      <Link to="/orders" onClick={() => setIsUserOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition">
                        <Package size={16} /> Siparişlerim
                      </Link>
                      <Link to="/favorites" onClick={() => setIsUserOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition">
                        <Heart size={16} /> Favorilerim
                      </Link>
                      <Link to="/addresses" onClick={() => setIsUserOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition">
                        <MapPin size={16} /> Adreslerim
                      </Link>
                      <Link to="/cards" onClick={() => setIsUserOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition">
                        <CreditCard size={16} /> Kartlarım
                      </Link>
                    </div>
                    <div className="border-t border-gray-100 py-2">
                      <button onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition w-full text-left">
                        <LogOut size={16} /> Çıkış Yap
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2 text-sm font-medium">
                <Link to="/login" className="hover:text-blue-600 transition">Giriş</Link>
                <span className="text-gray-300">|</span>
                <Link to="/signup" className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition text-xs">Kayıt Ol</Link>
              </div>
            )}

            <button className="md:hidden hover:text-blue-600 transition" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Category nav */}
      <div className="hidden md:block border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 overflow-x-auto">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="text-sm font-medium text-gray-600 hover:text-blue-600 py-3 whitespace-nowrap border-b-2 border-transparent hover:border-blue-600 transition"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-3 text-sm font-medium text-gray-700">
          {menuItems.map((item) => (
            <Link key={item.label} to={item.path} onClick={() => setIsMenuOpen(false)} className="hover:text-blue-600">
              {item.label}
            </Link>
          ))}
          <hr />
          {user?.name ? (
            <>
              <Link to="/orders" onClick={() => setIsMenuOpen(false)} className="hover:text-blue-600">Siparişlerim</Link>
              <button onClick={handleLogout} className="text-red-500 text-left">Çıkış Yap</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="hover:text-blue-600">Giriş Yap</Link>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="hover:text-blue-600">Kayıt Ol</Link>
            </>
          )}
        </div>
      )}
    </header>
  )
}
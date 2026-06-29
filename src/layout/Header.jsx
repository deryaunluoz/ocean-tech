import { Link } from 'react-router-dom'
import { ShoppingCart, User, Menu, X, Search, Heart, Package, MapPin, CreditCard, Truck, LogOut } from 'lucide-react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../store/actions/clientActions'
import api from '../api/axios'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isShopOpen, setIsShopOpen] = useState(false)
  const [isUserOpen, setIsUserOpen] = useState(false)
  const dispatch = useDispatch()
  const cart = useSelector(state => state.shoppingCart.cart)
  const user = useSelector(state => state.client.user)
  const categories = useSelector(state => state.product.categories)

  const totalItems = cart.reduce((sum, item) => sum + item.count, 0)
  const kadinCategories = categories.filter(c => c.gender === 'k')
  const erkekCategories = categories.filter(c => c.gender === 'e')

  const handleLogout = () => {
    localStorage.removeItem('token')
    delete api.defaults.headers.common['Authorization']
    dispatch(setUser({}))
    setIsUserOpen(false)
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Üst bar */}
      <div className="bg-gray-800 text-white text-xs py-2 px-4 flex justify-between items-center">
        <span>📞 +971 4 000 0000 &nbsp;|&nbsp; ✉️ info@oceantech.ae</span>
        <span>Bizi takip edin ve %20 indirim kazanın!</span>
      </div>

      {/* Ana Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition">
            🌊 Ocean Tech
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600">
            <Link to="/" className="hover:text-blue-600 transition">Anasayfa</Link>

            {/* Shop Dropdown */}
            <div className="relative" onMouseEnter={() => setIsShopOpen(true)} onMouseLeave={() => setIsShopOpen(false)}>
              <button className="hover:text-blue-600 transition flex items-center gap-1">
                Mağaza ▾
              </button>
              {isShopOpen && (
                <div className="absolute top-full left-0 bg-white shadow-xl border border-gray-100 rounded-lg p-6 w-80 grid grid-cols-2 gap-4 z-50">
                  <div>
                    <h4 className="font-bold text-gray-800 mb-3">Kadın</h4>
                    {kadinCategories.length > 0 ? kadinCategories.map(c => (
                      <Link key={c.id} to={`/shop/kadin/${c.title.toLowerCase()}/${c.id}`}
                        className="block text-gray-500 hover:text-blue-600 py-1 text-sm transition">
                        {c.title}
                      </Link>
                    )) : (
                      <>
                        <Link to="/shop" className="block text-gray-500 hover:text-blue-600 py-1 text-sm">Telefon</Link>
                        <Link to="/shop" className="block text-gray-500 hover:text-blue-600 py-1 text-sm">Laptop</Link>
                        <Link to="/shop" className="block text-gray-500 hover:text-blue-600 py-1 text-sm">Tablet</Link>
                      </>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-3">Erkek</h4>
                    {erkekCategories.length > 0 ? erkekCategories.map(c => (
                      <Link key={c.id} to={`/shop/erkek/${c.title.toLowerCase()}/${c.id}`}
                        className="block text-gray-500 hover:text-blue-600 py-1 text-sm transition">
                        {c.title}
                      </Link>
                    )) : (
                      <>
                        <Link to="/shop" className="block text-gray-500 hover:text-blue-600 py-1 text-sm">TV</Link>
                        <Link to="/shop" className="block text-gray-500 hover:text-blue-600 py-1 text-sm">Aksesuar</Link>
                        <Link to="/shop" className="block text-gray-500 hover:text-blue-600 py-1 text-sm">Gaming</Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            <Link to="/about" className="hover:text-blue-600 transition">Hakkımızda</Link>
            <Link to="/blog" className="hover:text-blue-600 transition">Blog</Link>
            <Link to="/contact" className="hover:text-blue-600 transition">İletişim</Link>
          </nav>

          {/* Sağ İkonlar */}
          <div className="flex items-center space-x-4 text-gray-600">
            <Link to="/search" className="hover:text-blue-600 transition hidden md:block">
              <Search size={20} />
            </Link>
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

            {/* Kullanıcı Menüsü */}
            {user?.name ? (
              <div className="relative hidden md:block">
                <button
                  onClick={() => setIsUserOpen(!isUserOpen)}
                  className="flex items-center gap-2 text-sm font-medium hover:text-blue-600 transition"
                >
                  <User size={18} />
                  <span>{user.name}</span>
                  <span className="text-xs">▾</span>
                </button>

                {isUserOpen && (
                  <div className="absolute right-0 top-full mt-2 bg-white shadow-xl border border-gray-100 rounded-xl w-56 z-50 overflow-hidden">
                    {/* Kullanıcı Bilgisi */}
                    <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                      <p className="font-bold text-gray-800 text-sm">{user.name}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{user.email}</p>
                    </div>

                    {/* Menü Öğeleri */}
                    <div className="py-2">
                      <Link to="/orders" onClick={() => setIsUserOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition">
                        <Package size={16} /> Geçmiş Siparişlerim
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
                      <Link to="/tracking" onClick={() => setIsUserOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition">
                        <Truck size={16} /> Kargo Takibi
                      </Link>
                    </div>

                    {/* Çıkış */}
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
                <Link to="/signup" className="hover:text-blue-600 transition">Kayıt</Link>
              </div>
            )}

            {/* Mobile hamburger */}
            <button className="md:hidden hover:text-blue-600 transition" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-3 text-sm font-medium text-gray-700">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="hover:text-blue-600">Anasayfa</Link>
          <Link to="/shop" onClick={() => setIsMenuOpen(false)} className="hover:text-blue-600">Mağaza</Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)} className="hover:text-blue-600">Hakkımızda</Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="hover:text-blue-600">İletişim</Link>
          {user?.name ? (
            <>
              <Link to="/orders" onClick={() => setIsMenuOpen(false)} className="hover:text-blue-600">Siparişlerim</Link>
              <Link to="/favorites" onClick={() => setIsMenuOpen(false)} className="hover:text-blue-600">Favorilerim</Link>
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
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Heart, ShoppingCart } from 'lucide-react'
import { addToCart } from '../store/actions/shoppingCartActions'
import { toast } from 'react-toastify'

export default function FavoritesPage() {
  const dispatch = useDispatch()
  const favorites = useSelector(state => state.client.favorites || [])

  const handleAddToCart = (product) => {
    dispatch(addToCart(product))
    toast.success(`${product.name} sepete eklendi!`)
  }

  if (favorites.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <Heart size={64} className="text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Favorileriniz Boş</h2>
        <p className="text-gray-500 mb-8">Beğendiğiniz ürünleri favorilere ekleyin.</p>
        <Link to="/shop"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition">
          Alışverişe Başla
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">
        Favorilerim ({favorites.length} ürün)
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {favorites.map(product => (
          <div key={product.id} className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition">
            <Link to={`/shop/erkek/kategori/${product.category_id}/urun/${product.id}`}>
              <img
                src={product.images?.[0]?.url || 'https://via.placeholder.com/300'}
                alt={product.name}
                className="w-full h-56 object-cover"
              />
            </Link>
            <div className="p-4">
              <h4 className="font-bold text-gray-800 text-sm mb-1">{product.name}</h4>
              <p className="text-blue-600 font-bold mb-3">${product.price?.toFixed(2)}</p>
              <button
                onClick={() => handleAddToCart(product)}
                className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2"
              >
                <ShoppingCart size={16} /> Sepete Ekle
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
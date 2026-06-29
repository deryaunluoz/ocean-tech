import { Link } from 'react-router-dom'
import { Star, Heart, ShoppingCart } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../store/actions/shoppingCartActions'
import { toggleFavorite } from '../store/actions/clientActions'
import { toast } from 'react-toastify'

export default function ProductCard({ product }) {
  const dispatch = useDispatch()
  const favorites = useSelector(state => state.client.favorites)
  const isFavorite = favorites.some(p => p.id === product.id)

  const image = product.images?.[0]?.url || 'https://via.placeholder.com/300'
  const categoryName = product.category?.title?.toLowerCase() || 'kategori'
  const gender = product.category?.gender === 'k' ? 'kadin' : 'erkek'
  const slug = product.name?.toLowerCase().replace(/\s+/g, '-') || 'urun'
  const detailUrl = `/shop/${gender}/${categoryName}/${product.category_id}/${slug}/${product.id}`
  const rating = Math.round(product.rating || 0)

  const handleAddToCart = (e) => {
    e.preventDefault()
    dispatch(addToCart(product))
    toast.success(`${product.name} sepete eklendi!`)
  }

  const handleFavorite = (e) => {
    e.preventDefault()
    dispatch(toggleFavorite(product))
    if (isFavorite) {
      toast.info(`${product.name} favorilerden çıkarıldı!`)
    } else {
      toast.success(`${product.name} favorilere eklendi! ❤️`)
    }
  }

  return (
    <div className="group bg-white rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100">
      <Link to={detailUrl} className="block cursor-pointer">
        <div className="relative h-56 bg-gray-50 overflow-hidden">
          <img
            src={image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <button
            onClick={handleFavorite}
            className={`absolute top-3 right-3 p-2 rounded-full shadow transition ${
              isFavorite
                ? 'bg-red-500 text-white opacity-100'
                : 'bg-white text-gray-400 opacity-0 group-hover:opacity-100'
            }`}
          >
            <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        </div>
        <div className="p-4 text-center">
          <p className="text-xs text-blue-500 font-semibold uppercase tracking-wide mb-1">
            {product.category?.title || 'Teknoloji'}
          </p>
          <h4 className="font-bold text-gray-800 text-sm mb-1 line-clamp-2">{product.name}</h4>
          <div className="flex justify-center items-center gap-0.5 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={12} fill={i < rating ? 'currentColor' : 'none'} className="text-yellow-400" />
            ))}
          </div>
          <div className="flex justify-center items-center gap-3 mb-3">
            <span className="text-gray-400 line-through text-sm">${(product.price * 1.2).toFixed(2)}</span>
            <span className="text-blue-600 font-bold">${product.price?.toFixed(2)}</span>
          </div>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <button
          onClick={handleAddToCart}
          className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2"
        >
          <ShoppingCart size={16} /> Sepete Ekle
        </button>
      </div>
    </div>
  )
}
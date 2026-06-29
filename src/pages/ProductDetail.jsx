import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Star, ShoppingCart, Heart, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'
import { fetchProducts } from '../store/actions/productActions'
import { addToCart } from '../store/actions/shoppingCartActions'
import { toast } from 'react-toastify'
import api from '../api/axios'

export default function ProductDetail() {
  const { productId, gender, categoryName, categoryId } = useParams()
  const dispatch = useDispatch()
  const { productList } = useSelector(state => state.product)

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)

  // T16: API'den ürünü çek
  useEffect(() => {
    setLoading(true)
    api.get(`/products/${productId}`)
      .then(res => {
        setProduct(res.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [productId])

  // Benzer ürünler için kategorideki ürünleri çek
  useEffect(() => {
    if (categoryId) {
      dispatch(fetchProducts({ category: categoryId, limit: 4 }))
    }
  }, [categoryId])

  const handleAddToCart = () => {
    dispatch(addToCart(product))
    toast.success(`${product.name} sepete eklendi!`)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Ürün bulunamadı</h2>
        <Link to="/shop" className="text-blue-600 hover:underline flex items-center justify-center gap-1">
          <ArrowLeft size={16} /> Mağazaya Dön
        </Link>
      </div>
    )
  }

  const images = product.images || []
  const mainImage = images[activeImage]?.url || 'https://via.placeholder.com/500'
  const rating = Math.round(product.rating || 0)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Geri butonu - T16 */}
      <button
        onClick={() => window.history.back()}
        className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition mb-6 text-sm"
      >
        <ArrowLeft size={16} /> Geri Dön
      </button>

      {/* Breadcrumb */}
      <div className="text-sm text-gray-400 mb-8 flex items-center gap-1 flex-wrap">
        <Link to="/" className="hover:text-blue-600">Anasayfa</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-blue-600">Mağaza</Link>
        <span>/</span>
        <Link to={`/shop/${gender}/${categoryName}/${categoryId}`} className="hover:text-blue-600 capitalize">{categoryName}</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium truncate max-w-[200px]">{product.name}</span>
      </div>

      {/* Ana içerik */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        {/* Sol: Görseller */}
        <div>
          <div className="relative rounded-2xl overflow-hidden bg-gray-50 mb-4">
            <img src={mainImage} alt={product.name} className="w-full h-96 object-cover" />
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImage(i => Math.max(0, i - 1))}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2 hover:bg-gray-100"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => setActiveImage(i => Math.min(images.length - 1, i + 1))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2 hover:bg-gray-100"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition ${
                    activeImage === i ? 'border-blue-600' : 'border-transparent'
                  }`}
                >
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sağ: Bilgiler */}
        <div className="flex flex-col">
          <p className="text-sm text-blue-500 font-semibold uppercase tracking-wider mb-1">
            {categoryName || 'Teknoloji'}
          </p>
          <h1 className="text-3xl font-bold text-gray-800 mb-3">{product.name}</h1>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill={i < rating ? 'currentColor' : 'none'} className="text-yellow-400" />
              ))}
            </div>
            <span className="text-sm text-gray-500">({product.sell_count || 0} satış)</span>
          </div>

          <p className="text-3xl font-bold text-gray-900 mb-4">${product.price?.toFixed(2)}</p>

          <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <span className={`font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
              {product.stock > 0 ? `Stokta ${product.stock} adet` : 'Stokta yok'}
            </span>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              disabled={!product.stock}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart size={20} /> Sepete Ekle
            </button>
            <button className="border border-gray-300 px-4 py-3 rounded-lg hover:bg-gray-50 transition">
              <Heart size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Benzer Ürünler */}
      {productList.length > 0 && (
        <div className="border-t pt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Benzer Ürünler</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {productList.filter(p => p.id !== product.id).slice(0, 4).map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

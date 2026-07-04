import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { fetchProducts, setOffset } from '../store/actions/productActions'
import { SlidersHorizontal } from 'lucide-react'

const SORT_OPTIONS = [
  { value: '', label: 'Sıralama Seçin' },
  { value: 'price:asc', label: 'Fiyat: Düşükten Yükseğe' },
  { value: 'price:desc', label: 'Fiyat: Yüksekten Düşüğe' },
  { value: 'rating:asc', label: 'Puan: Düşükten Yükseğe' },
  { value: 'rating:desc', label: 'Puan: Yüksekten Düşüğe' },
]

export default function Shop() {
  const dispatch = useDispatch()
  const { categoryId } = useParams()
  const { productList, total, limit, offset, fetchState } = useSelector(state => state.product)

  const [sort, setSort] = useState('')
  const [filterText, setFilterText] = useState('')

  useEffect(() => {
    const params = { limit, offset }
    if (categoryId) params.category = Number(categoryId)
    if (sort) params.sort = sort
    if (filterText) params.filter = filterText
    dispatch(fetchProducts(params))
  }, [categoryId, sort, offset])

  const handleFilter = () => {
    dispatch(setOffset(0))
    const params = { limit, offset: 0 }
    if (categoryId) params.category = Number(categoryId)
    if (sort) params.sort = sort
    if (filterText) params.filter = filterText
    dispatch(fetchProducts(params))
  }

  const totalPages = Math.ceil(total / limit)
  const currentPage = Math.floor(offset / limit) + 1

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Tüm Ürünler</h1>

      <div className="flex flex-col sm:flex-row gap-3 mb-8 items-start sm:items-center">
        <p className="text-gray-500 text-sm flex-1">Toplam {total} ürün</p>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Ürün ara..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleFilter()}
            className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-blue-500 w-full sm:w-48"
          />
          <select
            value={sort}
            onChange={(e) => { setSort(e.target.value); dispatch(setOffset(0)) }}
            className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
          >
            {SORT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <button
            onClick={handleFilter}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition"
          >
            <SlidersHorizontal size={16} /> Filtrele
          </button>
        </div>
      </div>

      {fetchState === 'FETCHING' && (
        <div className="flex justify-center py-16">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {fetchState === 'FETCHED' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {productList.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-10">
              <button
                disabled={currentPage === 1}
                onClick={() => dispatch(setOffset(offset - limit))}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm disabled:opacity-40 hover:bg-gray-50 transition"
              >
                ← Önceki
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => dispatch(setOffset(i * limit))}
                  className={`w-9 h-9 rounded-md text-sm font-medium transition ${
                    currentPage === i + 1
                      ? 'bg-blue-600 text-white'
                      : 'border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => dispatch(setOffset(offset + limit))}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm disabled:opacity-40 hover:bg-gray-50 transition"
              >
                Sonraki →
              </button>
            </div>
          )}
        </>
      )}

      {fetchState === 'FAILED' && (
        <div className="text-center py-16 text-gray-400">
          <p>Ürünler yüklenirken hata oluştu.</p>
          <button onClick={handleFilter} className="mt-4 text-blue-600 underline text-sm">
            Tekrar dene
          </button>
        </div>
      )}
    </div>
  )
}
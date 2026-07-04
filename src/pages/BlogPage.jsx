import { Link } from 'react-router-dom'
import { Clock, User } from 'lucide-react'

const posts = [
  {
    id: 1,
    title: 'iPhone 15 Pro vs Samsung Galaxy S24: Hangisi Daha İyi?',
    category: 'Telefon',
    date: '15 Haziran 2025',
    author: 'Ocean Tech',
    img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1693009279096',
    desc: 'İki dünyanın en iyi telefonunu karşılaştırdık. Kamera, performans ve pil ömrü açısından hangisi kazanıyor?',
  },
  {
    id: 2,
    title: 'MacBook Pro M3: Profesyoneller İçin Mükemmel Laptop',
    category: 'Laptop',
    date: '10 Haziran 2025',
    author: 'Ocean Tech',
    img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1697230830200',
    desc: 'Apple\'ın yeni M3 işlemcili MacBook Pro\'su gerçekten fark yaratıyor mu? Detaylı inceleme.',
  },
  {
    id: 3,
    title: 'Sony WH-1000XM5: Dünyanın En İyi Kulaklığı',
    category: 'Kulaklık',
    date: '5 Haziran 2025',
    author: 'Ocean Tech',
    img: 'https://www.sony.com/image/623af7b9b246c988fc3f3264a4de278c?fmt=png-alpha&wid=1578&hei=1050&bgcolor=F6F9FF',
    desc: 'Noise cancelling teknolojisinde yeni bir çıta. Sony WH-1000XM5\'i detaylıca inceledik.',
  },
  {
    id: 4,
    title: 'PlayStation 5 vs Xbox Series X: Konsol Savaşları',
    category: 'Oyun',
    date: '1 Haziran 2025',
    author: 'Ocean Tech',
    img: 'https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21',
    desc: 'Hangi konsol sizin için daha iyi? PS5 ve Xbox Series X\'i karşılaştırdık.',
  },
  {
    id: 5,
    title: 'Dubai\'de Teknoloji Alışverişi İçin En İyi Yerler',
    category: 'Rehber',
    date: '25 Mayıs 2025',
    author: 'Ocean Tech',
    img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400',
    desc: 'Dubai\'de teknoloji ürünleri almak istiyorsanız, bu rehber tam size göre!',
  },
  {
    id: 6,
    title: '2025 Yılının En İyi Akıllı Ev Cihazları',
    category: 'Teknoloji',
    date: '20 Mayıs 2025',
    author: 'Ocean Tech',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    desc: 'Evinizi akıllı hale getirecek en iyi cihazları derledik.',
  },
]

export default function BlogPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">Blog</h1>
        <p className="text-gray-500">Teknoloji dünyasından en güncel haberler ve incelemeler.</p>
      </div>

      {/* Featured post */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-md mb-8 flex flex-col md:flex-row">
        <img src={posts[0].img} alt={posts[0].title} className="w-full md:w-64 h-48 md:h-auto object-cover" />
        <div className="p-6 flex flex-col justify-center">
          <span className="bg-blue-100 text-blue-600 text-xs font-bold px-3 py-1 rounded-full w-fit mb-3">{posts[0].category}</span>
          <h2 className="text-xl font-bold text-gray-800 mb-2">{posts[0].title}</h2>
          <p className="text-gray-500 text-sm mb-4">{posts[0].desc}</p>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1"><User size={12} /> {posts[0].author}</span>
            <span className="flex items-center gap-1"><Clock size={12} /> {posts[0].date}</span>
          </div>
        </div>
      </div>

      {/* Other posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.slice(1).map((post) => (
          <div key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition border border-gray-100">
            <img src={post.img} alt={post.title} className="w-full h-40 object-cover" />
            <div className="p-5">
              <span className="bg-blue-100 text-blue-600 text-xs font-bold px-2 py-0.5 rounded-full">{post.category}</span>
              <h3 className="font-bold text-gray-800 mt-2 mb-2 line-clamp-2">{post.title}</h3>
              <p className="text-gray-500 text-sm line-clamp-2 mb-3">{post.desc}</p>
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {post.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
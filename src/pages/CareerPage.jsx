import { MapPin, Clock, Briefcase } from 'lucide-react'

const jobs = [
  {
    title: 'Frontend Developer',
    department: 'Teknoloji',
    location: 'Dubai, UAE',
    type: 'Tam Zamanlı',
    description: 'React ve modern web teknolojileri konusunda deneyimli frontend developer arıyoruz.',
  },
  {
    title: 'Satış Danışmanı',
    department: 'Satış',
    location: 'Dubai Mall, UAE',
    type: 'Tam Zamanlı',
    description: 'Teknoloji ürünleri konusunda bilgili, müşteri odaklı satış danışmanı arıyoruz.',
  },
  {
    title: 'Müşteri Hizmetleri Uzmanı',
    department: 'Destek',
    location: 'Dubai, UAE',
    type: 'Tam Zamanlı',
    description: 'Türkçe ve İngilizce bilen müşteri hizmetleri uzmanı arıyoruz.',
  },
  {
    title: 'Depo Sorumlusu',
    department: 'Lojistik',
    location: 'Dubai, UAE',
    type: 'Tam Zamanlı',
    description: 'Lojistik ve depo yönetimi konusunda deneyimli sorumlu arıyoruz.',
  },
]

export default function CareerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">Kariyer</h1>
        <p className="text-gray-500">Ocean Tech ailesine katılmak ister misin?</p>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white mb-10">
        <h2 className="text-2xl font-bold mb-3">Neden Ocean Tech?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {[
            { emoji: '💰', title: 'Rekabetçi Maaş', desc: 'Sektörün üzerinde maaş ve prim imkanı' },
            { emoji: '📈', title: 'Kariyer Gelişimi', desc: 'Sürekli eğitim ve terfi imkanları' },
            { emoji: '🌍', title: 'Uluslararası Ortam', desc: 'Çok kültürlü ve dinamik çalışma ortamı' },
          ].map((item, i) => (
            <div key={i} className="bg-white bg-opacity-10 rounded-xl p-4">
              <span className="text-2xl">{item.emoji}</span>
              <h3 className="font-bold mt-2 mb-1">{item.title}</h3>
              <p className="text-blue-100 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <h2 className="font-bold text-gray-800 text-xl mb-4">Açık Pozisyonlar</h2>
      <div className="flex flex-col gap-4">
        {jobs.map((job, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-gray-800 text-lg">{job.title}</h3>
                <span className="text-blue-600 text-sm font-medium">{job.department}</span>
              </div>
              <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">{job.type}</span>
            </div>
            <p className="text-gray-500 text-sm mb-4">{job.description}</p>
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
              <span className="flex items-center gap-1"><Clock size={12} /> {job.type}</span>
              <span className="flex items-center gap-1"><Briefcase size={12} /> {job.department}</span>
            </div>
            <button className="mt-4 bg-blue-600 text-white text-sm font-bold px-6 py-2 rounded-lg hover:bg-blue-700 transition">
              Başvur
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-gray-50 rounded-2xl p-6 text-center">
        <h3 className="font-bold text-gray-800 mb-2">Uygun pozisyon bulamadın mı?</h3>
        <p className="text-gray-500 text-sm mb-4">CV'ni bize gönder, uygun bir pozisyon açıldığında seninle iletişime geçelim.</p>
        <a href="mailto:kariyer@oceantech.ae" className="bg-gray-800 text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-gray-700 transition">
          CV Gönder
        </a>
      </div>
    </div>
  )
}
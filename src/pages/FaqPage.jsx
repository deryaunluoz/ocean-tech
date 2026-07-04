import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const faqs = [
  {
    question: 'Siparişimi nasıl takip edebilirim?',
    answer: 'Siparişinizi verdikten sonra e-posta ile gönderilen takip numarası ile kargo firmasının web sitesinden takip edebilirsiniz.'
  },
  {
    question: 'Ürünlerin garantisi var mı?',
    answer: 'Evet! Tüm ürünlerimiz 2 yıl resmi garanti kapsamındadır. Ayrıca uzatılmış garanti seçeneklerimiz de mevcuttur.'
  },
  {
    question: 'Ödeme yöntemleri nelerdir?',
    answer: 'Visa, Mastercard, Apple Pay, PayPal ve kapıda ödeme seçeneklerimiz mevcuttur.'
  },
  {
    question: 'Ürünü iade etmek istiyorum, ne yapmalıyım?',
    answer: '7 gün içinde iade talebinizi +971 4 000 0000 numaralı telefondan veya info@oceantech.ae e-posta adresinden iletebilirsiniz.'
  },
  {
    question: 'Ücretsiz kargo için minimum sipariş tutarı nedir?',
    answer: '200 AED ve üzeri siparişlerde ücretsiz kargo sunuyoruz.'
  },
  {
    question: 'Ürünler orijinal mi?',
    answer: 'Evet, tüm ürünlerimiz %100 orijinal ve resmi distribütörlerden temin edilmektedir.'
  },
  {
    question: 'Taksit seçeneği var mı?',
    answer: 'Evet! Tabby ve Tamara ile faizsiz taksit imkanı sunuyoruz.'
  },
  {
    question: 'Mağazanız nerede?',
    answer: 'Dubai Mall, Dubai, UAE adresinde mağazamız bulunmaktadır. Hafta içi 10:00-22:00, hafta sonu 10:00-24:00 saatleri arasında açığız.'
  },
]

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">Sıkça Sorulan Sorular</h1>
        <p className="text-gray-500">Merak ettiğiniz her şeyin cevabı burada!</p>
      </div>

      <div className="flex flex-col gap-3">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition"
            >
              <span className="font-medium text-gray-800">{faq.question}</span>
              {openIndex === i
                ? <ChevronUp size={18} className="text-blue-600 shrink-0" />
                : <ChevronDown size={18} className="text-gray-400 shrink-0" />
              }
            </button>
            {openIndex === i && (
              <div className="px-5 pb-5 text-sm text-gray-600 border-t border-gray-100 pt-4">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
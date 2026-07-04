import { FileText, CheckCircle, AlertCircle } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">Kullanım Şartları</h1>
        <p className="text-gray-500">Ocean Tech web sitesini kullanmadan önce lütfen okuyunuz.</p>
        <p className="text-xs text-gray-400 mt-2">Son güncelleme: 1 Ocak 2025</p>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mb-8 flex items-start gap-4">
        <AlertCircle size={24} className="text-yellow-600 shrink-0 mt-1" />
        <div>
          <h2 className="font-bold text-gray-800 mb-1">Önemli Bilgi</h2>
          <p className="text-gray-600 text-sm">
            Bu web sitesini kullanarak aşağıdaki kullanım şartlarını kabul etmiş sayılırsınız.
            Şartları kabul etmiyorsanız lütfen siteyi kullanmayınız.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {[
          {
            title: '1. Hizmet Kullanımı',
            content: 'Ocean Tech web sitesi ve mobil uygulaması yalnızca yasal amaçlar için kullanılabilir. Siteyi kötüye kullanmak, yasadışı içerik paylaşmak veya sistemlere zarar vermek kesinlikle yasaktır.'
          },
          {
            title: '2. Hesap Güvenliği',
            content: 'Hesabınızın güvenliğinden siz sorumlusunuz. Şifrenizi kimseyle paylaşmayın. Hesabınızın yetkisiz kullanımını fark ederseniz derhal bize bildirin.'
          },
          {
            title: '3. Ürün Bilgileri',
            content: 'Web sitemizde yer alan ürün bilgileri, fiyatlar ve stok durumu önceden haber verilmeksizin değiştirilebilir. Fiyat hatası durumunda siparişinizi iptal etme hakkımız saklıdır.'
          },
          {
            title: '4. Ödeme Güvenliği',
            content: 'Tüm ödeme işlemleri SSL şifrelemesi ile korunmaktadır. Kredi kartı bilgileriniz sunucularımızda saklanmaz.'
          },
          {
            title: '5. Fikri Mülkiyet',
            content: 'Web sitemizde yer alan tüm içerik, logo ve tasarımlar Ocean Tech\'e aittir. İzinsiz kullanım yasaktır.'
          },
          {
            title: '6. Sorumluluk Sınırlaması',
            content: 'Ocean Tech, web sitesinin kesintisiz çalışmasını garanti etmez. Teknik sorunlardan kaynaklanan zararlardan sorumlu tutulamaz.'
          },
          {
            title: '7. Değişiklikler',
            content: 'Bu kullanım şartları önceden haber verilmeksizin değiştirilebilir. Güncel şartlar için bu sayfayı düzenli olarak kontrol ediniz.'
          },
        ].map((section, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <CheckCircle size={18} className="text-blue-500 shrink-0 mt-1" />
              <div>
                <h2 className="font-bold text-gray-800 text-lg mb-2">{section.title}</h2>
                <p className="text-gray-500 text-sm leading-relaxed">{section.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-gray-50 rounded-2xl p-6 text-center">
        <FileText size={32} className="text-gray-400 mx-auto mb-3" />
        <h3 className="font-bold text-gray-800 mb-2">Sorularınız mı var?</h3>
        <p className="text-gray-500 text-sm mb-4">Kullanım şartları hakkında sorularınız için bizimle iletişime geçin.</p>
        <a href="mailto:info@oceantech.ae" className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition">
          İletişime Geç
        </a>
      </div>
    </div>
  )
}
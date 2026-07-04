import { Shield, Lock, Eye, Database } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">Gizlilik Politikası</h1>
        <p className="text-gray-500">Kişisel verilerinizi nasıl koruduğumuzu öğrenin.</p>
        <p className="text-xs text-gray-400 mt-2">Son güncelleme: 1 Ocak 2025</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-blue-50 rounded-2xl p-6 flex items-start gap-4">
          <Shield size={24} className="text-blue-600 shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-gray-800 mb-1">Veri Güvenliği</h3>
            <p className="text-gray-500 text-sm">Verileriniz SSL şifrelemesi ile korunmaktadır.</p>
          </div>
        </div>
        <div className="bg-green-50 rounded-2xl p-6 flex items-start gap-4">
          <Lock size={24} className="text-green-600 shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-gray-800 mb-1">Şifre Güvenliği</h3>
            <p className="text-gray-500 text-sm">Şifreleriniz asla düz metin olarak saklanmaz.</p>
          </div>
        </div>
        <div className="bg-orange-50 rounded-2xl p-6 flex items-start gap-4">
          <Eye size={24} className="text-orange-600 shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-gray-800 mb-1">Şeffaflık</h3>
            <p className="text-gray-500 text-sm">Verilerinizi nasıl kullandığımızı açıkça belirtiyoruz.</p>
          </div>
        </div>
        <div className="bg-purple-50 rounded-2xl p-6 flex items-start gap-4">
          <Database size={24} className="text-purple-600 shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-gray-800 mb-1">Veri Kontrolü</h3>
            <p className="text-gray-500 text-sm">Verilerinizi istediğiniz zaman silebilirsiniz.</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {[
          {
            title: '1. Topladığımız Bilgiler',
            content: 'Adınız, e-posta adresiniz, telefon numaranız, teslimat adresiniz ve ödeme bilgilerinizi toplarız. Bu bilgiler yalnızca siparişlerinizi işlemek ve size daha iyi hizmet sunmak için kullanılır.'
          },
          {
            title: '2. Bilgileri Nasıl Kullanıyoruz?',
            content: 'Topladığımız bilgileri siparişlerinizi işlemek, teslimat yapmak, müşteri desteği sağlamak ve kampanyalarımız hakkında sizi bilgilendirmek için kullanıyoruz.'
          },
          {
            title: '3. Bilgi Paylaşımı',
            content: 'Kişisel bilgilerinizi üçüncü taraflarla satmıyoruz veya kiralamıyoruz. Yalnızca teslimat firmaları ve ödeme işlemcileri gibi hizmet sağlayıcılarla gerekli bilgileri paylaşıyoruz.'
          },
          {
            title: '4. Çerezler',
            content: 'Web sitemizde daha iyi bir deneyim sunmak için çerezler kullanıyoruz. Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilirsiniz.'
          },
          {
            title: '5. Haklarınız',
            content: 'Kişisel verilerinize erişme, düzeltme veya silme hakkına sahipsiniz. Bu haklarınızı kullanmak için info@oceantech.ae adresinden bizimle iletişime geçebilirsiniz.'
          },
        ].map((section, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-xl p-6">
            <h2 className="font-bold text-gray-800 text-lg mb-3">{section.title}</h2>
            <p className="text-gray-500 text-sm leading-relaxed">{section.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
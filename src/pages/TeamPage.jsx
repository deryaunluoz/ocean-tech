import { Github, Linkedin, Twitter } from 'lucide-react'

const teamMembers = [
  {
    name: 'Gökhan Özdemir',
    role: 'Project Manager',
    image: 'https://ui-avatars.com/api/?name=Gokhan+Ozdemir&background=23A6F0&color=fff&size=200',
  },
  {
    name: 'Derya Unlu Oz',
    role: 'Full Stack Developer',
    image: 'https://ui-avatars.com/api/?name=Derya+Unlu+Oz&background=2DD4BF&color=fff&size=200',
  },
  {
    name: 'Kürşat Oz',
    role: 'Customer Service',
    image: 'https://ui-avatars.com/api/?name=Kursat+Oz&background=F59E0B&color=fff&size=200',
  },
]

export default function TeamPage() {
  return (
    <div>
      <div className="bg-gray-50 py-16 text-center">
        <p className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-2">Ekibimiz</p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Ekibimizle Tanışın</h1>
        <p className="text-gray-500 mt-3 max-w-md mx-auto text-sm">Ocean Tech'i hayata geçiren yetenekli ekibimiz.</p>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center hover:shadow-md transition">
              <img src={member.image} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
              <h3 className="font-bold text-gray-800 text-lg">{member.name}</h3>
              <p className="text-blue-600 text-sm font-medium mt-1">{member.role}</p>
              <div className="flex justify-center gap-4 mt-4">
                <a href="#" className="text-gray-400 hover:text-blue-600 transition"><Linkedin size={18} /></a>
                <a href="#" className="text-gray-400 hover:text-gray-800 transition"><Github size={18} /></a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition"><Twitter size={18} /></a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
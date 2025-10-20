import { Dumbbell, Users, CreditCard, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DashboardHome() {
  const quickLinks = [
    {
      title: 'Manage Classes',
      description: 'Add, edit, or delete gym classes',
      icon: Dumbbell,
      path: '/admin/classes',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Manage Coaches',
      description: 'Update coach profiles and information',
      icon: Users,
      path: '/admin/coaches',
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Manage Pricing',
      description: 'Edit membership plans and pricing',
      icon: CreditCard,
      path: '/admin/pricing',
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Manage Testimonials',
      description: 'Add or edit member testimonials',
      icon: MessageSquare,
      path: '/admin/testimonials',
      color: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-black text-white mb-2">
          Welcome to <span className="text-[#BF9B30]">GRIT CMS</span>
        </h1>
        <p className="text-[#D8C08E] text-lg">
          Manage your gym's website content from one central location
        </p>
      </div>

      {/* Quick Links Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.path}
              to={link.path}
              className="group relative bg-[#0A0A1F]/60 backdrop-blur-xl border border-[#BF9B30]/30 rounded-2xl p-6 hover:border-[#BF9B30]/60 hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${link.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[#BF9B30]/20 border border-[#BF9B30] group-hover:bg-[#BF9B30] transition-all duration-200 mb-4">
                  <Icon className="w-7 h-7 text-[#BF9B30] group-hover:text-[#0A0A1F] transition-colors duration-200" />
                </div>
                
                <h3 className="text-xl font-black text-white mb-2 group-hover:text-[#BF9B30] transition-colors">
                  {link.title}
                </h3>
                
                <p className="text-[#D8C08E] text-sm">
                  {link.description}
                </p>
              </div>

              {/* Hover Accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#BF9B30] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          );
        })}
      </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="bg-[#0A0A1F]/60 backdrop-blur-xl border border-[#BF9B30]/30 rounded-2xl p-6">
          <h4 className="text-[#BF9B30] font-bold mb-2">📋 Content Guidelines</h4>
          <p className="text-[#D8C08E] text-sm">
            Ensure all images meet the required dimensions for optimal display on the website.
          </p>
        </div>

        <div className="bg-[#0A0A1F]/60 backdrop-blur-xl border border-[#BF9B30]/30 rounded-2xl p-6">
          <h4 className="text-[#BF9B30] font-bold mb-2">🖼️ Image Specs</h4>
          <ul className="text-[#D8C08E] text-sm space-y-1">
            <li>• Classes: 1200x800px</li>
            <li>• Coaches: 400x600px</li>
            <li>• Testimonials: 200x200px</li>
          </ul>
        </div>

        <div className="bg-[#0A0A1F]/60 backdrop-blur-xl border border-[#BF9B30]/30 rounded-2xl p-6">
          <h4 className="text-[#BF9B30] font-bold mb-2">🔒 Security</h4>
          <p className="text-[#D8C08E] text-sm">
            All changes are saved to Firebase. Always logout when finished.
          </p>
        </div>
      </div>
    </div>
  );
}

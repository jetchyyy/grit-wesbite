import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { 
  LayoutDashboard, 
  Dumbbell, 
  Users, 
  CreditCard, 
  MessageSquare, 
  Image as ImageIcon, 
  LogOut,
  Menu,
  X,
  UserCheck,
  Zap,
  Home
} from 'lucide-react';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/admin/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    { path: '/admin/hero', label: 'Hero Section', icon: Home },
    { path: '/admin/classes', label: 'Classes', icon: Dumbbell },
    { path: '/admin/coaches', label: 'Coaches', icon: Users },
    { path: '/admin/features', label: 'Features', icon: Zap },
    { path: '/admin/pricing', label: 'Pricing', icon: CreditCard },
    { path: '/admin/testimonials', label: 'Testimonials', icon: MessageSquare },
    { path: '/admin/members', label: 'Members', icon: UserCheck },
    { path: '/admin/media', label: 'Media Library', icon: ImageIcon },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A1F] via-[#1A1A2F] to-[#0A0A1F]">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-[#0A0A1F]/95 backdrop-blur-xl border-r border-[#BF9B30]/30 transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-[#BF9B30]/30">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-black text-white">
                GRIT <span className="text-[#BF9B30]">CMS</span>
              </h1>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-[#BF9B30] hover:text-[#D8C08E]"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.exact}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-[#BF9B30] text-[#0A0A1F]'
                        : 'text-[#D8C08E] hover:bg-[#BF9B30]/20 hover:text-[#BF9B30]'
                    }`
                  }
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-[#BF9B30]/30">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-red-400 hover:bg-red-500/20 transition-all duration-200"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-[#0A0A1F]/80 backdrop-blur-xl border-b border-[#BF9B30]/30">
          <div className="px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-[#BF9B30] hover:text-[#D8C08E]"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="flex-1 lg:flex-none">
              <h2 className="text-xl font-bold text-white">Content Management</h2>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm text-[#D8C08E]">Logged in as</p>
                <p className="text-sm font-semibold text-white">{auth.currentUser?.email}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

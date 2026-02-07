"use client";

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  BookOpen, 
  MessageSquare, 
  Calendar,
  QrCode,
  Bot,
  LogOut,
  Menu,
  X,
  User
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';

interface DashboardLayoutProps {
  children: ReactNode;
}

const menuItems = [
  { icon: LayoutDashboard, label: 'لوحة التحكم', href: '/dashboard' },
  { icon: BookOpen, label: 'المكتبة الرقمية', href: '/dashboard/library' },
  { icon: MessageSquare, label: 'المجتمع', href: '/dashboard/social' },
  { icon: Bot, label: 'المساعد الذكي', href: '/dashboard/ai-assistant' },
  { icon: Calendar, label: 'الأنشطة', href: '/dashboard/activities' },
  { icon: QrCode, label: 'الحضور', href: '/dashboard/attendance' },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Right Aligned for RTL */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                E
              </div>
              <span className="text-xl font-bold text-gray-900">EduHub</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>

          {/* User Info */}
          <div className="p-6 border-b bg-gray-50/50">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold shadow-md">
                {user?.name?.charAt(0) || 'م'}
              </div>
              <div className="flex-1 min-w-0 text-right">
                <p className="text-sm font-bold text-gray-900 truncate">
                  {user?.name || 'مستخدم'}
                </p>
                <p className="text-xs text-gray-500">
                  {user?.role === 'student' ? 'طالب' : user?.role === 'professor' ? 'أستاذ' : 'مدير'}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 shadow-sm translate-x-[-4px]'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-600 hover:bg-red-50 transition-colors duration-200"
            >
              <LogOut size={20} />
              <span className="font-medium">تسجيل الخروج</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content - Adjusted margin for RTL */}
      <div className="lg:mr-64 transition-all duration-300">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-700 transition-colors"
            >
              <Menu size={24} />
            </button>
            
            <div className="flex items-center gap-4 mr-auto">
              <Link
                href="/dashboard/profile"
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
              >
                <span className="hidden sm:inline text-sm font-bold">
                  الملف الشخصي
                </span>
                <div className="bg-gray-100 p-1.5 rounded-full">
                  <User size={18} className="text-gray-600" />
                </div>
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

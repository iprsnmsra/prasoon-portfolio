'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Briefcase, 
  FolderCode, 
  Wrench, 
  Award, 
  FileText, 
  Trophy, 
  Settings,
  LogOut
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Experiences', href: '/admin/experiences', icon: Briefcase },
  { label: 'Projects', href: '/admin/projects', icon: FolderCode },
  { label: 'Skills', href: '/admin/skills', icon: Wrench },
  { label: 'Certifications', href: '/admin/certifications', icon: Award },
  { label: 'Resources', href: '/admin/resources', icon: FileText },
  { label: 'Achievements', href: '/admin/achievements', icon: Trophy },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth', { method: 'DELETE' });
      window.location.href = '/admin';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <aside className="w-16 md:w-64 min-h-screen bg-[#f5f5f5] border-r border-black/10 flex flex-col transition-all duration-300">
      <div className="p-6 flex flex-col items-center md:items-start">
        <h1 className="text-3xl font-pt-serif font-bold tracking-tighter">PM.</h1>
        <span className="text-xs font-jersey uppercase tracking-widest text-black/60 hidden md:block mt-1">Admin</span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors duration-200 ${
                isActive 
                  ? 'bg-black text-white' 
                  : 'text-gray-500 hover:text-black hover:bg-black/5'
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span className="font-jersey text-lg hidden md:block">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-black/10">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center w-full space-x-2 bg-black text-white px-4 py-3 rounded-xl font-jersey uppercase tracking-widest text-sm hover:bg-black/80 transition-colors"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          <span className="hidden md:block">Logout</span>
        </button>
      </div>
    </aside>
  );
}

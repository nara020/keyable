'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Home, MessageSquare, FileText, HelpCircle, ExternalLink, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: Home },
  { href: '/admin/inquiries', label: 'Inquiries', icon: MessageSquare },
  { href: '/admin/notices', label: 'Notices', icon: FileText },
  { href: '/admin/faq', label: 'FAQ', icon: HelpCircle },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-gray-900 text-white flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <Link href="/admin" className="flex items-center gap-3">
          <Image
            src="/images/logo-white.png"
            alt="Keyable Korea"
            width={120}
            height={32}
            className="h-8 w-auto"
          />
          <span className="rounded bg-blue-600 px-2 py-0.5 text-xs font-medium">
            Admin
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="mt-4 flex-1 px-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  )}
                >
                  <IconComponent className="h-5 w-5" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Actions */}
      <div className="border-t border-gray-800 p-4 space-y-2">
        <Link
          href="/en"
          target="_blank"
          className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
        >
          <ExternalLink className="h-4 w-4" />
          View Site
        </Link>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-sm text-gray-400 transition-colors hover:bg-red-900/50 hover:text-red-400"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}

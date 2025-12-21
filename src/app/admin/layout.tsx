import type { Metadata } from 'next';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Admin | Keyable Korea',
  robots: 'noindex, nofollow',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100">
        <div className="flex min-h-screen">
          <AdminSidebar />
          <main className="ml-64 flex-1 p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}

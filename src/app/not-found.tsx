import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900">404</h1>
          <p className="mt-4 text-xl text-gray-600">Page not found</p>
          <p className="mt-2 text-gray-500">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/en"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#040f77] px-6 py-3 text-white transition-colors hover:bg-[#0d1b6d]"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Link>
        </div>
      </body>
    </html>
  );
}

import Link from 'next/link';
import AdminGate from '@/components/admin/AdminGate';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGate>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-gray-900 text-white px-4 py-3">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Link href="/admin/newsletter" className="font-semibold">
              Admin
            </Link>
            <nav className="flex gap-4 text-sm">
              <Link href="/admin/newsletter/campaigns" className="hover:text-yellow-400">
                Campaigns
              </Link>
              <Link href="/admin/newsletter/subscribers" className="hover:text-yellow-400">
                Subscribers
              </Link>
            </nav>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-4 py-8">{children}</main>
      </div>
    </AdminGate>
  );
}

import Link from 'next/link';
import AdminGate from '@/components/admin/AdminGate';

export default function AdminNewsletterLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGate>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-gray-900 text-white px-4 py-3">
          <div className="container-custom flex items-center justify-between">
            <Link href="/admin/newsletter" className="font-semibold">
              Admin
            </Link>
            <nav className="flex items-center gap-6 text-sm">
              <Link href="/admin/newsletter/drafts" className="hover:text-yellow-400">
                Drafts
              </Link>
              <Link href="/admin/newsletter/campaigns" className="hover:text-yellow-400">
                Campaigns
              </Link>
              <Link href="/admin/newsletter/subscribers" className="hover:text-yellow-400">
                Subscribers
              </Link>
              <Link href="/pt" className="text-gray-300 hover:text-yellow-400">
                Back to site
              </Link>
            </nav>
          </div>
        </header>
        <main className="container-custom py-8">{children}</main>
      </div>
    </AdminGate>
  );
}

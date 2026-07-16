import Link from 'next/link';
import Image from 'next/image';
import AdminLoginForm from '@/components/admin/AdminLoginForm';
import GoogleSignInButton from '@/components/admin/GoogleSignInButton';

export default function AdminLoginPage() {
  const showGoogle = !!(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET);
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Link href="/pt" className="inline-flex items-center">
            <Image
              src="/ansa-logo.png"
              alt="ANSA Brasil"
              width={200}
              height={60}
              className="h-12 w-auto"
              style={{ height: 'auto' }}
            />
          </Link>
        </div>
        <div className="bg-white border border-gray-300 rounded-lg shadow-soft p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Newsletter admin</h1>
          <p className="text-sm text-gray-600 mb-6">
            {showGoogle
              ? 'Sign in with Google or enter the admin secret.'
              : 'Enter the admin secret to manage campaigns and subscribers.'}
          </p>
          <div className="space-y-4">
            {showGoogle && <GoogleSignInButton callbackUrl="/admin/newsletter" />}
            <AdminLoginForm redirectTo="/admin/newsletter" />
          </div>
        </div>
        <div className="text-center mt-6">
          <Link href="/pt" className="inline-flex min-h-11 items-center text-sm font-medium text-gray-700 hover:text-amber-800">
            Back to site
          </Link>
        </div>
      </div>
    </main>
  );
}

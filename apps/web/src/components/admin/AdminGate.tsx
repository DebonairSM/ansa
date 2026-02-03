import { cookies } from 'next/headers';
import AdminLoginForm from './AdminLoginForm';
import { getAdminCookieName, isAdminSessionValid } from '@/lib/adminAuth';

type AdminGateProps = {
  children: React.ReactNode;
};

export default function AdminGate({ children }: AdminGateProps) {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) {
    return (
      <div className="max-w-xl mx-auto p-6 bg-yellow-50 border border-yellow-200 rounded">
        <h2 className="text-xl font-semibold mb-2">Admin access not configured</h2>
        <p className="text-sm text-gray-700">Set the ADMIN_SECRET env var to enable access.</p>
      </div>
    );
  }

  const cookieValue = cookies().get(getAdminCookieName())?.value;
  const isAuthed = isAdminSessionValid(cookieValue, secret);

  if (!isAuthed) {
    return (
      <div className="max-w-xl mx-auto p-6 bg-white border border-gray-200 rounded shadow-sm">
        <h2 className="text-2xl font-semibold mb-2">Admin sign-in</h2>
        <p className="text-sm text-gray-600 mb-4">Enter the admin secret to continue.</p>
        <AdminLoginForm />
      </div>
    );
  }

  return <>{children}</>;
}

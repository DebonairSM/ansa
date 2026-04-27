import { getServerSession } from 'next-auth/next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { getAdminCookieName, isAdminAuthorized } from '@/lib/adminAuth';

type AdminGateProps = {
  children: React.ReactNode;
};

export default async function AdminGate({ children }: AdminGateProps) {
  const secret = process.env.ADMIN_SECRET;
  const hasGoogle = !!(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET);
  if (!secret && !hasGoogle) {
    return (
      <div className="max-w-xl mx-auto p-6 bg-yellow-50 border border-yellow-200 rounded">
        <h2 className="text-xl font-semibold mb-2">Admin access not configured</h2>
        <p className="text-sm text-gray-700">
          Set ADMIN_SECRET and/or Google OAuth (AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET, AUTH_ADMIN_EMAILS) to enable access.
        </p>
      </div>
    );
  }

  const session = hasGoogle ? await getServerSession(authOptions) : null;
  const cookieValue = cookies().get(getAdminCookieName())?.value;
  const isAuthed = isAdminAuthorized(cookieValue ?? undefined, secret ?? '', session);

  if (!isAuthed) {
    redirect('/admin/login');
  }

  return <>{children}</>;
}

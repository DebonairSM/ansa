import { listSubscribers } from '@/lib/newsletter/db';
import SubscribersTable from '@/components/admin/SubscribersTable';

export const dynamic = 'force-dynamic';

export default async function AdminSubscribersPage() {
  if (!process.env.SUPABASE_URL) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Subscribers</h1>
        <p className="text-gray-600">Set SUPABASE_URL and SUPABASE_SERVICE_KEY to view subscribers.</p>
      </div>
    );
  }
  const subscribers = await listSubscribers();
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Subscribers</h1>
      <SubscribersTable subscribers={subscribers as { id: string; email: string; status: string; locale: string; created_at?: string }[]} />
    </div>
  );
}

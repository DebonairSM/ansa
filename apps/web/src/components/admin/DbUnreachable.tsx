export default function DbUnreachable({ title }: { title: string }) {
  return (
    <div className="max-w-xl rounded-lg border border-amber-200 bg-amber-50 p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">{title}</h1>
      <p className="text-gray-700 mb-2">Database unreachable. Common causes:</p>
      <ul className="list-disc list-inside text-gray-600 text-sm space-y-1 mb-4">
        <li>Wrong or missing SUPABASE_URL / SUPABASE_SERVICE_KEY in .env.local</li>
        <li>Supabase project paused (restore it in Dashboard)</li>
        <li>Network or DNS (e.g. getaddrinfo ENOTFOUND)</li>
      </ul>
      <p className="text-sm text-gray-500">Fix the connection and refresh the page.</p>
    </div>
  );
}

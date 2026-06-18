import Link from 'next/link';
import { getStandaloneMythEntries } from '@/lib/myths';

export const dynamic = 'force-dynamic';

export default async function AdminMythsPage() {
  const myths = await getStandaloneMythEntries();

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Standalone Myths</h1>
        <div className="flex items-center gap-3">
          <Link href="/admin/posts" className="rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50">
            Back to Posts
          </Link>
          <Link href="/admin/myths/new" className="rounded-lg bg-pink-600 px-4 py-2 font-semibold text-white hover:bg-pink-700">
            New Myth
          </Link>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="min-w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Title</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Label</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Created</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Edit</th>
            </tr>
          </thead>
          <tbody>
            {myths.map((myth) => (
              <tr key={myth.id} className="border-t border-slate-100">
                <td className="px-4 py-3 text-sm text-slate-900">{myth.title || 'Standalone Myth Check'}</td>
                <td className="px-4 py-3 text-sm text-slate-700">{myth.mythOrTruthLabel}</td>
                <td className="px-4 py-3 text-sm text-slate-600">
                  {new Date(myth.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-sm">
                  <Link href={`/admin/myths/${myth.id}/edit`} className="text-pink-700 hover:underline">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {myths.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-sm text-slate-500">
                  No standalone myths yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

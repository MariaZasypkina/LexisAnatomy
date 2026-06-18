import { Metadata } from 'next';
import Link from 'next/link';
import { getAllMythOrTruthEntries } from '@/lib/myths';

export const metadata: Metadata = {
  title: 'Myth or Truth | Lexi\'s Anatomy',
  description: 'Some medical "facts" sound believable until you look closer. Explore myth-vs-fact moments.',
};

export const dynamic = 'force-dynamic';

export default async function MythOrTruthPage() {
  const entries = await getAllMythOrTruthEntries();

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-br from-pink-50 to-blue-50 py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Myth or Truth</h1>
          <p className="text-lg text-gray-600">Some medical "facts" sound believable until you look closer.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
        <div className="mb-8 bg-pink-50 p-6 rounded-lg">
          <p className="text-gray-700">
            <strong className="text-pink-600">Quick myth checks. Clear answers. No drama.</strong>
          </p>
        </div>

        <p className="text-gray-700 leading-relaxed mb-8">
          This page collects short myth-vs-fact moments from across Lexi's Anatomy. Each one starts with a common belief, checks it against real science, and explains the answer in plain English.
        </p>

        {entries.length === 0 ? (
          <div className="bg-gradient-to-br from-pink-50 to-blue-50 p-8 rounded-lg mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Myth Checks Yet</h2>
            <p className="text-gray-700">
              Publish a fact post with Myth or Truth details and it will automatically appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 mb-12">
            {entries.map((entry) => {
              const isMyth = entry.choice === 'Myth';
              return (
                <article key={entry.id} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                  <div className="mb-3">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                        isMyth ? 'bg-pink-100 text-pink-700' : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {entry.choice}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{entry.title}</h2>
                  <p className="text-gray-700 mb-4">{entry.explanation}</p>
                  {entry.postSlug ? (
                    <Link href={`/posts/${entry.postSlug}`} className="text-sm font-semibold text-blue-700 hover:underline">
                      Read the full investigation
                    </Link>
                  ) : (
                    <p className="text-sm font-semibold text-slate-500">Standalone Myth Entry</p>
                  )}
                </article>
              );
            })}
          </div>
        )}

        <div className="text-center bg-gray-50 p-8 rounded-lg">
          <p className="text-gray-700 mb-4">Heard a myth that sounds suspicious?</p>
          <a href="/contact" className="inline-block px-8 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors font-semibold">
            Submit It for a Future Post
          </a>
        </div>
      </div>
    </div>
  );
}

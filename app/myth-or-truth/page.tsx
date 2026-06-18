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
    <div className="la-page min-h-screen">
      <div className="la-hero py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="la-title la-section-title mb-4 text-4xl font-bold md:text-5xl">Myth or Truth</h1>
          <p className="la-subtitle text-lg">Some medical &quot;facts&quot; sound believable until you look closer.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
        <hr className="la-divider mb-8" />
        <div className="la-soft-note mb-8 p-6">
          <p className="text-[#3f5369]">
            <strong className="text-[#a1536d]">Quick myth checks. Clear answers. No drama.</strong>
          </p>
        </div>

        <p className="mb-8 leading-relaxed text-[#3f5369]">
          This page collects short myth-vs-fact moments from across Lexi&apos;s Anatomy. Each one starts with a common belief, checks it against real science, and explains the answer in plain English.
        </p>

        {entries.length === 0 ? (
          <div className="la-panel mb-12 p-8">
            <h2 className="la-title la-section-title mb-2 text-2xl font-bold">No Myth Checks Yet</h2>
            <p className="text-[#3f5369]">
              Publish a fact post with Myth or Truth details and it will automatically appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 mb-12">
            {entries.map((entry) => {
              const isMyth = entry.choice === 'Myth';
              return (
                <article key={entry.id} className="la-card p-6">
                  <div className="mb-3">
                    <span
                      className={`la-badge ${
                        isMyth ? 'bg-[#f8e6ee] text-[#a5546f]' : 'bg-[#e8f2f8] text-[#456c88]'
                      }`}
                    >
                      {entry.choice}
                    </span>
                  </div>
                  <h2 className="la-title la-section-title mb-2 text-xl font-bold">{entry.title}</h2>
                  <p className="mb-4 text-[#3f5369]">{entry.explanation}</p>
                  {entry.postSlug ? (
                    <Link href={`/posts/${entry.postSlug}`} className="la-link text-sm font-semibold hover:underline">
                      Read the full investigation
                    </Link>
                  ) : (
                    <p className="text-sm font-semibold text-[#667889]">Standalone Myth Entry</p>
                  )}
                </article>
              );
            })}
          </div>
        )}

        <div className="la-card text-center p-8">
          <p className="mb-4 text-[#3f5369]">Heard a myth that sounds suspicious?</p>
          <a href="/contact" className="la-btn-primary px-8 py-3">
            Submit It for a Future Post
          </a>
        </div>
      </div>
    </div>
  );
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Myth or Truth | Lexi\'s Anatomy',
  description: 'Some medical "facts" sound believable until you look closer. Explore myth-vs-fact moments.',
};

export default function MythOrTruthPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-pink-50 to-blue-50 py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Myth or Truth
          </h1>
          <p className="text-lg text-gray-600">
            Some medical "facts" sound believable until you look closer.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
        <div className="mb-8 bg-pink-50 p-6 rounded-lg">
          <p className="text-gray-700">
            <strong className="text-pink-600">Quick myth checks. Clear answers. No drama.</strong>
          </p>
        </div>

        <p className="text-gray-700 leading-relaxed mb-12">
          This page collects short myth-vs-fact moments from across Lexi's Anatomy. Each one starts with a common belief, checks it against real science, and explains the answer in plain English.
        </p>

        {/* Sample card */}
        <div className="bg-gradient-to-br from-pink-50 to-blue-50 p-8 rounded-lg mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sample Myth Check</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-pink-500 pl-4">
              <p className="font-semibold text-pink-600 mb-1">Myth:</p>
              <p className="text-gray-700">You only use 10% of your brain.</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="font-semibold text-blue-600 mb-1">Truth:</p>
              <p className="text-gray-700">
                Your brain is active through many connected regions, even when you are resting or doing simple tasks.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gray-50 p-8 rounded-lg">
          <p className="text-gray-700 mb-4">
            Heard a myth that sounds suspicious?
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors font-semibold"
          >
            Submit It for a Future Post
          </a>
        </div>
      </div>
    </div>
  );
}

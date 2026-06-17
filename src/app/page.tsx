import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Fact of the Week</h1>
        <p className="text-xl text-gray-700 mb-8">Why doesn’t your heart sit exactly in the center?</p>
        <div className="flex gap-4 justify-center">
          <Link href="/posts/why-your-heart-isnt-perfectly-centered" className="px-6 py-3 bg-pink-500 text-white rounded-lg">Read This Fact</Link>
          <Link href="/facts" className="px-6 py-3 bg-white border rounded-lg">Explore All Facts</Link>
        </div>
      </div>
    </div>
  );
}

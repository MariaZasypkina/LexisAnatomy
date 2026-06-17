import { notFound } from 'next/navigation';
import { getPostBySlug } from '@/lib/posts';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return {};

  return {
    title: post.seoTitle,
    description: post.metaDescription,
    openGraph: {
      title: post.seoTitle,
      description: post.metaDescription,
      type: 'article',
      publishedTime: post.publishedAt.toISOString(),
      images: post.coverImageUrl ? [{ url: post.coverImageUrl }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle,
      description: post.metaDescription,
      images: post.coverImageUrl ? [post.coverImageUrl] : [],
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-pink-50 to-blue-50 py-12">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          <p className="text-gray-600 text-lg">{post.lead}</p>
          <time className="block text-sm text-gray-500 mt-4">
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>
      </div>

      {/* Cover image */}
      {post.coverImageUrl && (
        <div className="max-w-3xl mx-auto px-6 py-8">
          <img
            src={post.coverImageUrl}
            alt={post.coverImageAlt}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      )}

      {/* Main content */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Main explanation */}
        <div className="mb-12 prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">The Explanation</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {post.mainExplanation}
          </p>
        </div>

        {/* Myth or Truth */}
        <div className="mb-12 bg-pink-50 p-6 rounded-lg border-l-4 border-pink-500">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Myth or Truth?</h2>
          <div className="space-y-2">
            <p>
              <span className="font-semibold text-pink-600">{post.mythOrTruth.label}:</span>{' '}
              {post.mythOrTruth.text}
            </p>
          </div>
        </div>

        {/* Glossary */}
        {post.glossary.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Terms</h2>
            <div className="space-y-4">
              {post.glossary.map((item, i) => (
                <div key={i} className="border-l-2 border-blue-500 pl-4">
                  <p className="font-semibold text-gray-900">{item.term}</p>
                  <p className="text-gray-700">{item.definition}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Why This Matters */}
        <div className="mb-12 bg-blue-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why This Matters</h2>
          <p className="text-gray-700 leading-relaxed">{post.whyThisMatters}</p>
        </div>

        {/* Key Takeaways */}
        {post.keyTakeaways.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3 Key Takeaways</h2>
            <ul className="space-y-2">
              {post.keyTakeaways.map((takeaway, i) => (
                <li key={i} className="flex gap-3 text-gray-700">
                  <span className="text-pink-500 font-bold">{i + 1}.</span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Sources */}
        {post.sources.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Sources</h2>
            <ul className="space-y-2">
              {post.sources.map((source, i) => (
                <li key={i}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 underline"
                  >
                    {source.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-12 pt-12 border-t border-gray-200 text-sm text-gray-600">
          <p>
            <strong>Disclaimer:</strong> Lexi's Anatomy is for educational purposes only and does
            not provide medical advice, diagnosis, or treatment.
          </p>
        </div>
      </div>
    </article>
  );
}

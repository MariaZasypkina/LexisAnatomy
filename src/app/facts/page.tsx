'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  coverImageUrl?: string;
  coverImageAlt?: string;
}

export default function FactsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const skip = (page - 1) * itemsPerPage;
        const response = await fetch(`/api/posts?limit=${itemsPerPage}&skip=${skip}`);
        const data = await response.json();
        setPosts(data.posts || []);
        setTotal(data.total || 0);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

  const totalPages = Math.ceil(total / itemsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            All Facts
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore every investigation published on Lexi's Anatomy, from anatomy and microbiology to medical myths, brain facts, and everyday questions about how the body works.
          </p>
        </div>

        {/* Filter helper */}
        <div className="mb-8 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
          <p className="text-gray-700">
            <span className="font-semibold">Newest first:</span> Short, surprising science stories you can read in just a few minutes.
          </p>
        </div>

        {/* Posts */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No facts yet — but the next mystery is already on its way.
            </p>
          </div>
        ) : (
          <div className="space-y-6 mb-12">
            {posts.map((post) => (
              <Link
                key={post._id}
                href={`/posts/${post.slug}`}
              >
                <article className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden cursor-pointer">
                  <div className="grid md:grid-cols-3 gap-6 p-6">
                    {post.coverImageUrl && (
                      <div className="md:col-span-1">
                        <img
                          src={post.coverImageUrl}
                          alt={post.coverImageAlt || post.title}
                          className="w-full h-48 object-cover rounded"
                        />
                      </div>
                    )}
                    <div className={post.coverImageUrl ? 'md:col-span-2' : 'md:col-span-3'}>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 mb-4">{post.excerpt}</p>
                      <time className="text-sm text-gray-500">
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex gap-4 justify-center items-center">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Older facts
            </button>
            <span className="text-gray-600">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Newer facts
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  lead: string;
  publishedAt: string;
  coverImageUrl?: string;
  coverImageAlt?: string;
}

export default function HomePage() {
  const [featuredPost, setFeaturedPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestPost = async () => {
      try {
        const response = await fetch('/api/posts?limit=1&skip=0');
        const data = await response.json();
        if (data.posts && data.posts.length > 0) {
          setFeaturedPost(data.posts[0]);
        }
      } catch (error) {
        console.error('Error fetching featured post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestPost();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-pink-50 via-white to-blue-50 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center md:text-left">
            <p className="text-pink-600 font-semibold text-sm mb-2">Fact of the Week</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Why doesn't your heart sit exactly in the center?
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mb-8">
              Lexi's Anatomy is a curious, teen-friendly biology and medicine blog where surprising facts turn into clear explanations. One question, one investigation, one reason it matters in real life and real medicine.
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              {featuredPost ? (
                <>
                  <Link
                    href={`/posts/${featuredPost.slug}`}
                    className="inline-block px-8 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors font-semibold text-center"
                  >
                    Read This Fact
                  </Link>
                  <Link
                    href="/facts"
                    className="inline-block px-8 py-3 bg-blue-100 text-blue-900 rounded-lg hover:bg-blue-200 transition-colors font-semibold text-center"
                  >
                    Explore All Facts
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/facts"
                    className="inline-block px-8 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors font-semibold text-center"
                  >
                    Explore All Facts
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Featured post */}
      {!loading && featuredPost && (
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="bg-gradient-to-br from-pink-50 to-blue-50 rounded-lg p-8 md:p-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{featuredPost.title}</h2>
            <p className="text-gray-700 text-lg mb-6">{featuredPost.excerpt}</p>
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-pink-200 text-pink-800 rounded-full text-sm font-semibold mr-2">
                Question-led
              </span>
              <span className="inline-block px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-sm font-semibold">
                Myth or Truth
              </span>
            </div>
            <Link
              href={`/posts/${featuredPost.slug}`}
              className="inline-block px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
            >
              Read the Full Investigation
            </Link>
          </div>
        </div>
      )}

      {/* How each fact unfolds */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How each fact unfolds</h2>
          <p className="text-gray-600 text-lg">
            Every Lexi's Anatomy post follows a simple pattern so science feels easier to explore and easier to remember.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              icon: '❓',
              title: 'Start with a question',
              description: 'A surprising headline pulls the reader into the mystery.',
            },
            {
              icon: '🔬',
              title: 'Follow the explanation',
              description: 'The science is unpacked in clear, teen-friendly English.',
            },
            {
              icon: '✓',
              title: 'Check the myth',
              description: 'A quick Myth or Truth box separates what sounds right from what is right.',
            },
            {
              icon: '📚',
              title: 'Learn the key term',
              description: 'A short glossary explains the tricky word without sounding like a textbook.',
            },
          ].map((step, i) => (
            <div key={i} className="bg-gray-50 p-6 rounded-lg">
              <div className="text-3xl mb-3">{step.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-blue-50 p-6 rounded-lg">
          <div className="text-2xl mb-3">💡</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">See why it matters</h3>
          <p className="text-gray-700">
            Each fact connects back to doctors, patients, parents, or everyday life.
          </p>
        </div>
      </div>

      {/* Myth spotlight */}
      <div className="bg-pink-50 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Myth or Truth</h2>
          <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
            <p className="mb-4">
              <span className="font-bold text-pink-600 block mb-2">Myth:</span>
              <span className="text-gray-700">Your heart is completely on the left side.</span>
            </p>
            <p>
              <span className="font-bold text-blue-600 block mb-2">Truth:</span>
              <span className="text-gray-700">
                It leans left, but a large part of it sits much closer to the center than many people think.
              </span>
            </p>
          </div>
          <div className="text-center">
            <Link
              href="/myth-or-truth"
              className="inline-block px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors font-semibold"
            >
              See More Myths
            </Link>
          </div>
        </div>
      </div>

      {/* Ask Lexi */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-r from-pink-50 to-blue-50 p-8 md:p-12 rounded-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ask Lexi a question</h2>
          <p className="text-gray-700 mb-8">
            Have you ever heard a strange body fact and wondered if it was actually true? Send a question, suggest a myth, or help choose a future topic for the site.
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-block px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors font-semibold"
            >
              Submit a Question
            </Link>
            <Link
              href="/contact"
              className="inline-block px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
            >
              Suggest a Myth
            </Link>
          </div>
        </div>
      </div>

      {/* About teaser */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">About the project</h2>
          <p className="text-gray-700 text-lg mb-8">
            Lexi's Anatomy is an English-language biology and medicine blog created by Lexi, a student who wants to become a doctor. The goal is simple: find surprising facts, explain them clearly, and show why they matter beyond the classroom.
          </p>
          <Link
            href="/about"
            className="inline-block px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
          >
            Read About Lexi's Anatomy
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-white mb-4">Lexi's Anatomy</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/facts" className="hover:text-white">
                    All Facts
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white">
                    About
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Explore</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/myth-or-truth" className="hover:text-white">
                    Myth or Truth
                  </Link>
                </li>
                <li>
                  <Link href="/about-lexi" className="hover:text-white">
                    About Lexi
                  </Link>
                </li>
                <li>
                  <Link href="/sources" className="hover:text-white">
                    Sources
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Get Involved</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Submit a Question
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <p>Lexi's Anatomy is for educational purposes only and does not provide medical advice.</p>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-sm">
            <p>&copy; 2026 Lexi's Anatomy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

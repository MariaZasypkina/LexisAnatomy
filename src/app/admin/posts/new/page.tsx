'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Glossary {
  term: string;
  definition: string;
}

interface Source {
  label: string;
  url: string;
}

export default function NewPostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    lead: '',
    mainExplanation: '',
    mythOrTruth: {
      label: 'Myth' as const,
      text: '',
    },
    glossary: [{ term: '', definition: '' }] as Glossary[],
    whyThisMatters: '',
    keyTakeaways: ['', '', ''],
    sources: [{ label: '', url: '' }] as Source[],
    coverImageUrl: '',
    coverImageAlt: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNestedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const [parent, field] = name.split('.');
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof typeof formData],
        [field]: value,
      },
    }));
  };

  const handleArrayChange = (
    index: number,
    field: string,
    value: string,
    arrayName: 'glossary' | 'sources' | 'keyTakeaways'
  ) => {
    setFormData((prev) => {
      const newArray = [...(prev[arrayName] as any[])];
      if (arrayName === 'keyTakeaways') {
        newArray[index] = value;
      } else {
        newArray[index][field] = value;
      }
      return {
        ...prev,
        [arrayName]: newArray,
      };
    });
  };

  const addGlossary = () => {
    setFormData((prev) => ({
      ...prev,
      glossary: [...prev.glossary, { term: '', definition: '' }],
    }));
  };

  const addSource = () => {
    setFormData((prev) => ({
      ...prev,
      sources: [...prev.sources, { label: '', url: '' }],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Filter out empty items
    const cleanedData = {
      ...formData,
      glossary: formData.glossary.filter((g) => g.term && g.definition),
      sources: formData.sources.filter((s) => s.label && s.url),
      keyTakeaways: formData.keyTakeaways.filter((k) => k),
    };

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cleanedData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create post');
      }

      router.push('/admin/posts');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create post');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-6">
          <a href="/admin/posts" className="text-blue-600 hover:text-blue-700">
            ← Back to Posts
          </a>
        </div>

        <div className="bg-white rounded-lg shadow p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Post</h1>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Title */}
            <div>
              <label className="block text-gray-900 font-semibold mb-2">Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Why doesn't your heart sit exactly in the center?"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>

            {/* Lead */}
            <div>
              <label className="block text-gray-900 font-semibold mb-2">
                Lead (Hook) *
              </label>
              <textarea
                name="lead"
                value={formData.lead}
                onChange={handleChange}
                placeholder="2-3 sentence hook introducing the surprising idea..."
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>

            {/* Main Explanation */}
            <div>
              <label className="block text-gray-900 font-semibold mb-2">
                Main Explanation *
              </label>
              <textarea
                name="mainExplanation"
                value={formData.mainExplanation}
                onChange={handleChange}
                placeholder="The science explained in clear, engaging English..."
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>

            {/* Myth or Truth */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-900 font-semibold mb-2">
                  Myth Label *
                </label>
                <select
                  name="mythOrTruth.label"
                  value={formData.mythOrTruth.label}
                  onChange={handleNestedChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option>Myth</option>
                  <option>Truth</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-900 font-semibold mb-2">
                  Myth Text *
                </label>
                <input
                  type="text"
                  name="mythOrTruth.text"
                  value={formData.mythOrTruth.text}
                  onChange={handleNestedChange}
                  placeholder="The myth or truth statement..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                />
              </div>
            </div>

            {/* Glossary */}
            <div>
              <label className="block text-gray-900 font-semibold mb-2">Glossary</label>
              <div className="space-y-4">
                {formData.glossary.map((item, i) => (
                  <div key={i} className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={item.term}
                      onChange={(e) =>
                        handleArrayChange(i, 'term', e.target.value, 'glossary')
                      }
                      placeholder="Term"
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                    <input
                      type="text"
                      value={item.definition}
                      onChange={(e) =>
                        handleArrayChange(i, 'definition', e.target.value, 'glossary')
                      }
                      placeholder="Definition"
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addGlossary}
                className="mt-4 px-4 py-2 bg-gray-200 text-gray-900 rounded hover:bg-gray-300 transition-colors"
              >
                Add Glossary Item
              </button>
            </div>

            {/* Why This Matters */}
            <div>
              <label className="block text-gray-900 font-semibold mb-2">
                Why This Matters *
              </label>
              <textarea
                name="whyThisMatters"
                value={formData.whyThisMatters}
                onChange={handleChange}
                placeholder="Why the fact matters in real medicine or daily life..."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>

            {/* Key Takeaways */}
            <div>
              <label className="block text-gray-900 font-semibold mb-2">
                3 Key Takeaways *
              </label>
              <div className="space-y-2">
                {formData.keyTakeaways.map((takeaway, i) => (
                  <input
                    key={i}
                    type="text"
                    value={takeaway}
                    onChange={(e) =>
                      handleArrayChange(i, '', e.target.value, 'keyTakeaways')
                    }
                    placeholder={`Takeaway ${i + 1}`}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    required
                  />
                ))}
              </div>
            </div>

            {/* Sources */}
            <div>
              <label className="block text-gray-900 font-semibold mb-2">Sources</label>
              <div className="space-y-4">
                {formData.sources.map((source, i) => (
                  <div key={i} className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={source.label}
                      onChange={(e) =>
                        handleArrayChange(i, 'label', e.target.value, 'sources')
                      }
                      placeholder="Source label (e.g., NIH)"
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                    <input
                      type="url"
                      value={source.url}
                      onChange={(e) =>
                        handleArrayChange(i, 'url', e.target.value, 'sources')
                      }
                      placeholder="Source URL"
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addSource}
                className="mt-4 px-4 py-2 bg-gray-200 text-gray-900 rounded hover:bg-gray-300 transition-colors"
              >
                Add Source
              </button>
            </div>

            {/* Cover Image */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-900 font-semibold mb-2">
                  Cover Image URL *
                </label>
                <input
                  type="url"
                  name="coverImageUrl"
                  value={formData.coverImageUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-900 font-semibold mb-2">
                  Cover Image Alt Text *
                </label>
                <input
                  type="text"
                  name="coverImageAlt"
                  value={formData.coverImageAlt}
                  onChange={handleChange}
                  placeholder="Description of the image..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                />
              </div>
            </div>

            {/* Submit */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 disabled:opacity-50 transition-colors font-semibold"
              >
                {loading ? 'Publishing...' : 'Publish Post'}
              </button>
              <a
                href="/admin/posts"
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors font-semibold text-center"
              >
                Cancel
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

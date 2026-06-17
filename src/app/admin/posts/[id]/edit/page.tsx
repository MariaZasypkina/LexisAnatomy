'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface Glossary {
  term: string;
  definition: string;
}

interface Source {
  label: string;
  url: string;
}

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    lead: '',
    mainExplanation: '',
    mythOrTruth: {
      label: 'Myth' as const,
      text: '',
    },
    glossary: [] as Glossary[],
    whyThisMatters: '',
    keyTakeaways: [] as string[],
    sources: [] as Source[],
    coverImageUrl: '',
    coverImageAlt: '',
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${id}`);
        if (!response.ok) throw new Error('Failed to fetch post');
        const post = await response.json();
        setFormData(post);
      } catch (err) {
        setError('Failed to load post');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPost();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNestedChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
        newArray[index] = { ...newArray[index], [field]: value };
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
    setSaving(true);

    const cleanedData = {
      ...formData,
      glossary: formData.glossary.filter((g) => g.term && g.definition),
      sources: formData.sources.filter((s) => s.label && s.url),
      keyTakeaways: formData.keyTakeaways.filter((k) => k),
    };

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cleanedData),
      });

      if (!response.ok) throw new Error('Failed to update post');
      router.push('/admin/posts');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update post');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post? This cannot be undone.')) return;

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete post');
      router.push('/admin/posts');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete post');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">Loading post...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-6">
          <a href="/admin/posts" className="text-blue-600 hover:text-blue-700">
            ← Back to Posts
          </a>
        </div>

        <div className="bg-white rounded-lg shadow p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Post</h1>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Title */}
            <div>
              <label className="block text-gray-900 font-semibold mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-gray-900 font-semibold mb-2">Slug</label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Lead */}
            <div>
              <label className="block text-gray-900 font-semibold mb-2">Lead</label>
              <textarea
                name="lead"
                value={formData.lead}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Main Explanation */}
            <div>
              <label className="block text-gray-900 font-semibold mb-2">
                Main Explanation
              </label>
              <textarea
                name="mainExplanation"
                value={formData.mainExplanation}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Myth or Truth */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-900 font-semibold mb-2">
                  Myth Label
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
                  Myth Text
                </label>
                <input
                  type="text"
                  name="mythOrTruth.text"
                  value={formData.mythOrTruth.text}
                  onChange={handleNestedChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
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
                Why This Matters
              </label>
              <textarea
                name="whyThisMatters"
                value={formData.whyThisMatters}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Key Takeaways */}
            <div>
              <label className="block text-gray-900 font-semibold mb-2">
                Key Takeaways
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
                      placeholder="Source label"
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
                  Cover Image URL
                </label>
                <input
                  type="url"
                  name="coverImageUrl"
                  value={formData.coverImageUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div>
                <label className="block text-gray-900 font-semibold mb-2">
                  Cover Image Alt Text
                </label>
                <input
                  type="text"
                  name="coverImageAlt"
                  value={formData.coverImageAlt}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 disabled:opacity-50 transition-colors font-semibold"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold"
              >
                Delete
              </button>
              <a
                href="/admin/posts"
                className="px-6 py-3 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
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

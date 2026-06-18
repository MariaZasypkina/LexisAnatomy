'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { generateExcerpt, generateMetaDescription, generateSeoTitle, generateSlug } from '@/models/Post';

type FormState = {
  title: string;
  slug: string;
  lead: string;
  mainExplanation: string;
  mythOrTruthLabel: 'Myth' | 'Truth';
  mythOrTruthText: string;
  glossaryTerm: string;
  glossaryDefinition: string;
  whyThisMatters: string;
  takeaway1: string;
  takeaway2: string;
  takeaway3: string;
  sources: Array<{ label: string; url: string }>;
  coverImageUrl: string;
  coverImageAlt: string;
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  publishedAt: string;
};

const emptyForm: FormState = {
  title: '',
  slug: '',
  lead: '',
  mainExplanation: '',
  mythOrTruthLabel: 'Myth',
  mythOrTruthText: '',
  glossaryTerm: '',
  glossaryDefinition: '',
  whyThisMatters: '',
  takeaway1: '',
  takeaway2: '',
  takeaway3: '',
  sources: [{ label: '', url: '' }],
  coverImageUrl: '',
  coverImageAlt: '',
  seoTitle: '',
  metaDescription: '',
  excerpt: '',
  publishedAt: new Date().toISOString().slice(0, 10),
};

export default function EditPostPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState<FormState>(emptyForm);

  const computedSlug = useMemo(() => generateSlug(form.title || ''), [form.title]);
  const computedSeo = useMemo(() => generateSeoTitle(form.title || ''), [form.title]);
  const computedMeta = useMemo(() => generateMetaDescription(form.lead || '').slice(0, 160), [form.lead]);
  const computedExcerpt = useMemo(() => generateExcerpt(form.lead || ''), [form.lead]);

  useEffect(() => {
    async function loadPost() {
      try {
        const response = await fetch(`/api/posts/${id}`);
        if (!response.ok) {
          throw new Error('Failed to load post');
        }

        const post = await response.json();
        setForm({
          title: post.title || '',
          slug: post.slug || '',
          lead: post.lead || '',
          mainExplanation: post.mainExplanation || '',
          mythOrTruthLabel: post.mythOrTruth?.label || 'Myth',
          mythOrTruthText: post.mythOrTruth?.text || '',
          glossaryTerm: post.glossary?.[0]?.term || '',
          glossaryDefinition: post.glossary?.[0]?.definition || '',
          whyThisMatters: post.whyThisMatters || '',
          takeaway1: post.keyTakeaways?.[0] || '',
          takeaway2: post.keyTakeaways?.[1] || '',
          takeaway3: post.keyTakeaways?.[2] || '',
          sources: Array.isArray(post.sources) && post.sources.length > 0 ? post.sources : [{ label: '', url: '' }],
          coverImageUrl: post.coverImageUrl || '',
          coverImageAlt: post.coverImageAlt || '',
          seoTitle: post.seoTitle || '',
          metaDescription: post.metaDescription || '',
          excerpt: post.excerpt || '',
          publishedAt: post.publishedAt ? new Date(post.publishedAt).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load post');
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [id]);

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function setSource(index: number, key: 'label' | 'url', value: string) {
    setForm((prev) => {
      const next = [...prev.sources];
      next[index] = { ...next[index], [key]: value };
      return { ...prev, sources: next };
    });
  }

  function addSource() {
    setForm((prev) => ({ ...prev, sources: [...prev.sources, { label: '', url: '' }] }));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError('');

    const payload = {
      title: form.title,
      slug: form.slug || computedSlug,
      lead: form.lead,
      mainExplanation: form.mainExplanation,
      mythOrTruthChoice: form.mythOrTruthLabel,
      mythOrTruthExplanation: form.mythOrTruthText,
      mythOrTruth: {
        label: form.mythOrTruthLabel,
        text: form.mythOrTruthText,
      },
      glossary: [{ term: form.glossaryTerm, definition: form.glossaryDefinition }],
      whyThisMatters: form.whyThisMatters,
      keyTakeaways: [form.takeaway1, form.takeaway2, form.takeaway3],
      sources: form.sources,
      coverImageUrl: form.coverImageUrl,
      coverImageAlt: form.coverImageAlt,
      seoTitle: form.seoTitle || computedSeo,
      metaDescription: (form.metaDescription || computedMeta).slice(0, 160),
      excerpt: form.excerpt || computedExcerpt,
      publishedAt: form.publishedAt,
    };

    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setError(data.error || 'Failed to update post');
      setSaving(false);
      return;
    }

    router.push('/admin/posts');
    router.refresh();
  }

  if (loading) {
    return <div className="mx-auto max-w-4xl px-6 py-10 text-slate-600">Loading...</div>;
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-10">
      <h1 className="mb-6 text-3xl font-bold text-slate-900">Edit Post</h1>
      <form onSubmit={onSubmit} className="space-y-6 rounded-xl border border-slate-200 bg-white p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm font-semibold text-slate-700">Title
            <input className="mt-1 w-full rounded border border-slate-300 px-3 py-2" value={form.title} onChange={(e) => setField('title', e.target.value)} required />
          </label>
          <label className="text-sm font-semibold text-slate-700">Slug
            <input className="mt-1 w-full rounded border border-slate-300 px-3 py-2" value={form.slug || computedSlug} onChange={(e) => setField('slug', e.target.value)} />
          </label>
        </div>

        <label className="block text-sm font-semibold text-slate-700">Lead
          <textarea className="mt-1 w-full rounded border border-slate-300 px-3 py-2" rows={3} value={form.lead} onChange={(e) => setField('lead', e.target.value)} required />
        </label>

        <label className="block text-sm font-semibold text-slate-700">Main Explanation
          <textarea className="mt-1 w-full rounded border border-slate-300 px-3 py-2" rows={6} value={form.mainExplanation} onChange={(e) => setField('mainExplanation', e.target.value)} required />
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm font-semibold text-slate-700">Myth or Truth Label
            <select className="mt-1 w-full rounded border border-slate-300 px-3 py-2" value={form.mythOrTruthLabel} onChange={(e) => setField('mythOrTruthLabel', e.target.value as 'Myth' | 'Truth')}>
              <option value="Myth">Myth</option>
              <option value="Truth">Truth</option>
            </select>
          </label>
          <label className="text-sm font-semibold text-slate-700">Myth or Truth Text
            <textarea className="mt-1 w-full rounded border border-slate-300 px-3 py-2" rows={3} value={form.mythOrTruthText} onChange={(e) => setField('mythOrTruthText', e.target.value)} required />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm font-semibold text-slate-700">Glossary Term
            <input className="mt-1 w-full rounded border border-slate-300 px-3 py-2" value={form.glossaryTerm} onChange={(e) => setField('glossaryTerm', e.target.value)} required />
          </label>
          <label className="text-sm font-semibold text-slate-700">Glossary Definition
            <input className="mt-1 w-full rounded border border-slate-300 px-3 py-2" value={form.glossaryDefinition} onChange={(e) => setField('glossaryDefinition', e.target.value)} required />
          </label>
        </div>

        <label className="block text-sm font-semibold text-slate-700">Why This Matters
          <textarea className="mt-1 w-full rounded border border-slate-300 px-3 py-2" rows={4} value={form.whyThisMatters} onChange={(e) => setField('whyThisMatters', e.target.value)} required />
        </label>

        <div className="grid gap-4 md:grid-cols-3">
          <label className="text-sm font-semibold text-slate-700">Takeaway 1
            <input className="mt-1 w-full rounded border border-slate-300 px-3 py-2" value={form.takeaway1} onChange={(e) => setField('takeaway1', e.target.value)} required />
          </label>
          <label className="text-sm font-semibold text-slate-700">Takeaway 2
            <input className="mt-1 w-full rounded border border-slate-300 px-3 py-2" value={form.takeaway2} onChange={(e) => setField('takeaway2', e.target.value)} required />
          </label>
          <label className="text-sm font-semibold text-slate-700">Takeaway 3
            <input className="mt-1 w-full rounded border border-slate-300 px-3 py-2" value={form.takeaway3} onChange={(e) => setField('takeaway3', e.target.value)} required />
          </label>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-slate-700">Sources</p>
          {form.sources.map((source, index) => (
            <div className="grid gap-4 md:grid-cols-2" key={index}>
              <label className="text-sm font-semibold text-slate-700">Source Label
                <input
                  className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
                  value={source.label}
                  onChange={(e) => setSource(index, 'label', e.target.value)}
                  required
                />
              </label>
              <label className="text-sm font-semibold text-slate-700">Source URL
                <input
                  type="url"
                  className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
                  value={source.url}
                  onChange={(e) => setSource(index, 'url', e.target.value)}
                  required
                />
              </label>
            </div>
          ))}
          <button type="button" onClick={addSource} className="rounded border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            Add Source
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm font-semibold text-slate-700">Cover Image URL
            <input className="mt-1 w-full rounded border border-slate-300 px-3 py-2" value={form.coverImageUrl} onChange={(e) => setField('coverImageUrl', e.target.value)} required />
          </label>
          <label className="text-sm font-semibold text-slate-700">Cover Image Alt
            <input className="mt-1 w-full rounded border border-slate-300 px-3 py-2" value={form.coverImageAlt} onChange={(e) => setField('coverImageAlt', e.target.value)} required />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <label className="text-sm font-semibold text-slate-700">SEO Title
            <input className="mt-1 w-full rounded border border-slate-300 px-3 py-2" value={form.seoTitle || computedSeo} onChange={(e) => setField('seoTitle', e.target.value)} />
          </label>
          <label className="text-sm font-semibold text-slate-700">Meta Description (max 160)
            <input maxLength={160} className="mt-1 w-full rounded border border-slate-300 px-3 py-2" value={form.metaDescription || computedMeta} onChange={(e) => setField('metaDescription', e.target.value)} />
          </label>
          <label className="text-sm font-semibold text-slate-700">Excerpt
            <input className="mt-1 w-full rounded border border-slate-300 px-3 py-2" value={form.excerpt || computedExcerpt} onChange={(e) => setField('excerpt', e.target.value)} />
          </label>
        </div>

        <label className="block text-sm font-semibold text-slate-700">Published At
          <input type="date" className="mt-1 w-full rounded border border-slate-300 px-3 py-2" value={form.publishedAt} onChange={(e) => setField('publishedAt', e.target.value)} required />
        </label>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <button type="submit" disabled={saving} className="rounded-lg bg-pink-600 px-4 py-2 font-semibold text-white hover:bg-pink-700 disabled:opacity-60">
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

type FormState = {
  title: string;
  mythOrTruthLabel: 'Myth' | 'Truth';
  mythOrTruthText: string;
};

const emptyForm: FormState = {
  title: '',
  mythOrTruthLabel: 'Myth',
  mythOrTruthText: '',
};

export default function EditMythPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState<FormState>(emptyForm);

  useEffect(() => {
    async function loadEntry() {
      try {
        const response = await fetch(`/api/myths/${id}`);
        if (!response.ok) {
          throw new Error('Failed to load myth entry');
        }

        const entry = await response.json();
        setForm({
          title: entry.title || '',
          mythOrTruthLabel: entry.mythOrTruthLabel || 'Myth',
          mythOrTruthText: entry.mythOrTruthText || '',
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load myth entry');
      } finally {
        setLoading(false);
      }
    }

    loadEntry();
  }, [id]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError('');

    const response = await fetch(`/api/myths/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setError(data.error || 'Failed to update myth entry');
      setSaving(false);
      return;
    }

    router.push('/admin/myths');
    router.refresh();
  }

  async function onDelete() {
    setDeleting(true);
    setError('');

    const response = await fetch(`/api/myths/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setError(data.error || 'Failed to delete myth entry');
      setDeleting(false);
      return;
    }

    router.push('/admin/myths');
    router.refresh();
  }

  if (loading) {
    return <div className="mx-auto max-w-3xl px-6 py-10 text-slate-600">Loading...</div>;
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-10">
      <h1 className="mb-6 text-3xl font-bold text-slate-900">Edit Myth Entry</h1>
      <form onSubmit={onSubmit} className="space-y-6 rounded-xl border border-slate-200 bg-white p-6">
        <label className="block text-sm font-semibold text-slate-700">Title
          <input
            className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
            value={form.title}
            onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
            required
          />
        </label>

        <label className="text-sm font-semibold text-slate-700">Myth or Truth Label
          <select
            className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
            value={form.mythOrTruthLabel}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, mythOrTruthLabel: event.target.value as 'Myth' | 'Truth' }))
            }
          >
            <option value="Myth">Myth</option>
            <option value="Truth">Truth</option>
          </select>
        </label>

        <label className="block text-sm font-semibold text-slate-700">Myth or Truth Text
          <textarea
            className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
            rows={5}
            value={form.mythOrTruthText}
            onChange={(event) => setForm((prev) => ({ ...prev, mythOrTruthText: event.target.value }))}
            required
          />
        </label>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving || deleting}
            className="rounded-lg bg-pink-600 px-4 py-2 font-semibold text-white hover:bg-pink-700 disabled:opacity-60"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={onDelete}
            disabled={saving || deleting}
            className="rounded-lg border border-red-300 px-4 py-2 font-semibold text-red-700 hover:bg-red-50 disabled:opacity-60"
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </form>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewMythPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [mythOrTruthLabel, setMythOrTruthLabel] = useState<'Myth' | 'Truth'>('Myth');
  const [mythOrTruthText, setMythOrTruthText] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError('');

    const response = await fetch('/api/myths', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        mythOrTruthLabel,
        mythOrTruthText,
      }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setError(data.error || 'Failed to create myth entry');
      setSaving(false);
      return;
    }

    router.push('/admin/myths');
    router.refresh();
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-10">
      <h1 className="mb-6 text-3xl font-bold text-slate-900">Create Myth Entry</h1>
      <form onSubmit={onSubmit} className="space-y-6 rounded-xl border border-slate-200 bg-white p-6">
        <label className="block text-sm font-semibold text-slate-700">Title
          <input
            className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm font-semibold text-slate-700">Myth or Truth Label
            <select
              className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
              value={mythOrTruthLabel}
              onChange={(event) => setMythOrTruthLabel(event.target.value as 'Myth' | 'Truth')}
            >
              <option value="Myth">Myth</option>
              <option value="Truth">Truth</option>
            </select>
          </label>
        </div>

        <label className="block text-sm font-semibold text-slate-700">Myth or Truth Text
          <textarea
            className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
            rows={5}
            value={mythOrTruthText}
            onChange={(event) => setMythOrTruthText(event.target.value)}
            required
          />
        </label>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-pink-600 px-4 py-2 font-semibold text-white hover:bg-pink-700 disabled:opacity-60"
        >
          {saving ? 'Saving...' : 'Create Myth'}
        </button>
      </form>
    </div>
  );
}

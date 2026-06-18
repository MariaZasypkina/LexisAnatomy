import { NextRequest, NextResponse } from 'next/server';
import { createStandaloneMythEntry, getAllMythOrTruthEntries } from '@/lib/myths';
import { verifyAdminAuth } from '@/lib/auth';

export async function GET() {
  try {
    const entries = await getAllMythOrTruthEntries();
    return NextResponse.json({ entries });
  } catch (error) {
    console.error('Error fetching myth entries:', error);
    return NextResponse.json({ error: 'Failed to fetch myth entries' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await verifyAdminAuth();
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const title = typeof body?.title === 'string' ? body.title.trim() : '';
    const mythOrTruthLabel = body?.mythOrTruthLabel;
    const mythOrTruthText = typeof body?.mythOrTruthText === 'string' ? body.mythOrTruthText.trim() : '';

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    if (mythOrTruthLabel !== 'Myth' && mythOrTruthLabel !== 'Truth') {
      return NextResponse.json({ error: 'Myth or Truth label is required' }, { status: 400 });
    }

    if (!mythOrTruthText) {
      return NextResponse.json({ error: 'Myth or Truth text is required' }, { status: 400 });
    }

    const created = await createStandaloneMythEntry({
      title,
      mythOrTruthLabel,
      mythOrTruthText,
    });

    return NextResponse.json({ success: true, entry: created }, { status: 201 });
  } catch (error) {
    console.error('Error creating myth entry:', error);
    return NextResponse.json({ error: 'Failed to create myth entry' }, { status: 500 });
  }
}

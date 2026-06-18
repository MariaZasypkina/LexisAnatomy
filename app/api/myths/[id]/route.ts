import { NextRequest, NextResponse } from 'next/server';
import {
  deleteStandaloneMythEntry,
  getStandaloneMythEntryById,
  updateStandaloneMythEntry,
} from '@/lib/myths';
import { verifyAdminAuth } from '@/lib/auth';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const entry = await getStandaloneMythEntryById(id);

    if (!entry) {
      return NextResponse.json({ error: 'Myth entry not found' }, { status: 404 });
    }

    return NextResponse.json(entry);
  } catch (error) {
    console.error('Error fetching myth entry:', error);
    return NextResponse.json({ error: 'Failed to fetch myth entry' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await verifyAdminAuth();
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
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

    const updated = await updateStandaloneMythEntry(id, {
      title,
      mythOrTruthLabel,
      mythOrTruthText,
    });

    if (!updated) {
      return NextResponse.json({ error: 'Myth entry not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating myth entry:', error);
    return NextResponse.json({ error: 'Failed to update myth entry' }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await verifyAdminAuth();
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const deleted = await deleteStandaloneMythEntry(id);

    if (!deleted) {
      return NextResponse.json({ error: 'Myth entry not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting myth entry:', error);
    return NextResponse.json({ error: 'Failed to delete myth entry' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getPostById, getPostBySlug, slugExists, updatePost } from '@/lib/posts';
import { verifyAdminAuth } from '@/lib/auth';
import { generateExcerpt, generateMetaDescription, generateSeoTitle, generateSlug } from '@/models/Post';

function isObjectId(value: string) {
  return ObjectId.isValid(value) && new ObjectId(value).toString() === value;
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ identifier: string }> }
) {
  try {
    const { identifier } = await params;

    // Required behavior: /api/posts/[slug] for public page.
    // Convenience: also supports id lookup for admin edit prefill.
    const post = isObjectId(identifier)
      ? await getPostById(identifier)
      : await getPostBySlug(identifier);

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ identifier: string }> }
) {
  try {
    const auth = await verifyAdminAuth();
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { identifier } = await params;
    if (!isObjectId(identifier)) {
      return NextResponse.json({ error: 'Invalid post id' }, { status: 400 });
    }

    const body = await request.json();
    const updates: Record<string, unknown> = {
      ...body,
      slug: body.slug || generateSlug(body.title || ''),
      seoTitle: body.seoTitle || generateSeoTitle(body.title || ''),
      excerpt: body.excerpt || generateExcerpt(body.lead || ''),
      metaDescription: (body.metaDescription || generateMetaDescription(body.lead || '')).slice(0, 160),
      mythOrTruthChoice: body.mythOrTruthChoice || body.mythOrTruth?.label,
      mythOrTruthExplanation: body.mythOrTruthExplanation || body.mythOrTruth?.text,
    };

    if (updates.slug && (await slugExists(String(updates.slug), identifier))) {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 400 });
    }

    if (body.publishedAt) {
      const date = new Date(body.publishedAt);
      if (!Number.isNaN(date.getTime())) {
        updates.publishedAt = date;
      }
    }

    const ok = await updatePost(identifier, updates as any);
    if (!ok) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

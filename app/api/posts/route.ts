import { NextRequest, NextResponse } from 'next/server';
import { createPost, getAllPosts } from '@/lib/posts';
import { verifyAdminAuth } from '@/lib/auth';
import { generateSlug, generateExcerpt, generateSeoTitle, generateMetaDescription } from '@/models/Post';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '500', 10);
    const skip = parseInt(searchParams.get('skip') || '0', 10);
    const { items, total } = await getAllPosts(limit, skip);

    return NextResponse.json({
      posts: items,
      total,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await verifyAdminAuth();
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const required = [
      'title',
      'lead',
      'mainExplanation',
      'whyThisMatters',
      'keyTakeaways',
      'coverImageUrl',
      'coverImageAlt',
      'sources',
    ];
    for (const field of required) {
      if (!data[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    if (!Array.isArray(data.keyTakeaways) || data.keyTakeaways.length < 3) {
      return NextResponse.json({ error: '3 key takeaways are required' }, { status: 400 });
    }

    if (!Array.isArray(data.sources) || data.sources.length < 1) {
      return NextResponse.json({ error: 'At least one source is required' }, { status: 400 });
    }

    if (!data.slug) {
      data.slug = generateSlug(data.title);
    }

    if (!data.excerpt) data.excerpt = generateExcerpt(data.lead);
    if (!data.seoTitle) data.seoTitle = generateSeoTitle(data.title);
    if (!data.metaDescription) data.metaDescription = generateMetaDescription(data.lead);
    data.metaDescription = String(data.metaDescription).slice(0, 160);

    // Keep standalone myth fields in sync for Myth or Truth page cards.
    data.mythOrTruthChoice = data.mythOrTruthChoice || data.mythOrTruth?.label;
    data.mythOrTruthExplanation = data.mythOrTruthExplanation || data.mythOrTruth?.text;

    if (data.publishedAt) {
      const date = new Date(data.publishedAt);
      if (!Number.isNaN(date.getTime())) {
        data.publishedAt = date;
      }
    }

    const postId = await createPost(data);
    return NextResponse.json({ id: postId.toString(), success: true }, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}

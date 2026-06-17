import { NextRequest, NextResponse } from 'next/server';
import { createPost, getAllPosts } from '@/lib/posts';
import { verifyAdminAuth } from '@/lib/auth';
import { generateSlug, generateExcerpt, generateSeoTitle, generateMetaDescription } from '@/models/Post';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
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
    const required = ['title', 'lead', 'mainExplanation', 'whyThisMatters', 'keyTakeaways', 'coverImageUrl', 'coverImageAlt'];
    for (const field of required) {
      if (!data[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    if (!data.slug) {
      data.slug = generateSlug(data.title);
    }

    if (!data.excerpt) data.excerpt = generateExcerpt(data.lead);
    if (!data.seoTitle) data.seoTitle = generateSeoTitle(data.title);
    if (!data.metaDescription) data.metaDescription = generateMetaDescription(data.lead);

    const postId = await createPost(data);
    return NextResponse.json({ id: postId.toString(), success: true }, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}

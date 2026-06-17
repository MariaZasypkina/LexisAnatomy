import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/lib/auth';
import { createPost, updatePost, getPostById, getAllPosts, deletePost, slugExists } from '@/lib/posts';
import { generateSlug, generateExcerpt, generateSeoTitle, generateMetaDescription, Post } from '@/models/Post';

// GET: Fetch posts (with pagination)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = parseInt(searchParams.get('skip') || '0');
    let items = [];
    let total = 0;

    try {
      const result = await getAllPosts(limit, skip);
      items = result.items;
      total = result.total;
    } catch (dbError) {
      // If DB is not configured or fails, return a safe fallback sample response
      console.warn('getAllPosts failed, returning fallback posts:', dbError);
      const now = new Date().toISOString();
      items = [
        {
          _id: 'sample-1',
          title: "Why doesn't your heart sit exactly in the center?",
          slug: 'why-your-heart-isnt-perfectly-centered',
          excerpt: 'It sounds like your heart should sit perfectly in the middle of your chest, but it doesn\'t. Here\'s the simple anatomy behind that small but important twist.',
          publishedAt: now,
          coverImageUrl: '/next.svg',
          coverImageAlt: "Stylized anatomical heart illustration",
        },
      ];
      total = 1;
    }

    return NextResponse.json({
      posts: items,
      total,
      pages: Math.max(1, Math.ceil(total / limit)),
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

// POST: Create a new post
export async function POST(request: NextRequest) {
  try {
    const auth = await verifyAdminAuth();
    if (!auth) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const data = await request.json();
    
    // Validate required fields
    const required = ['title', 'lead', 'mainExplanation', 'whyThisMatters', 'keyTakeaways', 'coverImageUrl', 'coverImageAlt'];
    for (const field of required) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    // Generate slug if not provided
    if (!data.slug) {
      data.slug = generateSlug(data.title);
    }
    
    // Check if slug is unique
    if (await slugExists(data.slug)) {
      return NextResponse.json(
        { error: 'This slug already exists' },
        { status: 400 }
      );
    }
    
    // Generate metadata if not provided
    if (!data.excerpt) data.excerpt = generateExcerpt(data.lead);
    if (!data.seoTitle) data.seoTitle = generateSeoTitle(data.title);
    if (!data.metaDescription) data.metaDescription = generateMetaDescription(data.lead);
    
    const postId = await createPost(data);
    
    return NextResponse.json(
      { id: postId.toString(), success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}

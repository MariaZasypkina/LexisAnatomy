import { ObjectId } from 'mongodb';
import { getDatabase } from './db';
import { Post, generateSlug } from '@/models/Post';

export async function createPost(postData: Omit<Post, '_id' | 'publishedAt' | 'updatedAt'>) {
  const db = await getDatabase();
  const posts = db.collection('posts');
  
  // Check if slug already exists
  const existing = await posts.findOne({ slug: postData.slug });
  if (existing) {
    throw new Error('A post with this slug already exists');
  }
  
  const now = new Date();
  const providedPublishedAt = (postData as any).publishedAt;
  const publishedAt =
    providedPublishedAt instanceof Date && !Number.isNaN(providedPublishedAt.getTime())
      ? providedPublishedAt
      : now;

  const result = await posts.insertOne({
    ...postData,
    publishedAt,
    updatedAt: now,
  });
  
  return result.insertedId;
}

export async function updatePost(id: string, updates: Partial<Post>) {
  const db = await getDatabase();
  const posts = db.collection('posts');
  
  const objectId = new ObjectId(id);
  const result = await posts.updateOne(
    { _id: objectId },
    {
      $set: {
        ...updates,
        updatedAt: new Date(),
      },
    }
  );
  
  return result.matchedCount > 0;
}

export async function getPostById(id: string) {
  const db = await getDatabase();
  const posts = db.collection<Post>('posts');
  
  const objectId = new ObjectId(id);
  return posts.findOne({ _id: objectId });
}

export async function getPostBySlug(slug: string) {
  const db = await getDatabase();
  const posts = db.collection<Post>('posts');
  
  return posts.findOne({ slug });
}

export async function getAllPosts(limit: number = 10, skip: number = 0) {
  const db = await getDatabase();
  const posts = db.collection<Post>('posts');
  
  const items = await posts
    .find({})
    .sort({ publishedAt: -1 })
    .limit(limit)
    .skip(skip)
    .toArray();
  
  const total = await posts.countDocuments({});
  
  return { items, total };
}

export async function deletePost(id: string) {
  const db = await getDatabase();
  const posts = db.collection('posts');
  
  const objectId = new ObjectId(id);
  const result = await posts.deleteOne({ _id: objectId });
  
  return result.deletedCount > 0;
}

export async function slugExists(slug: string, excludeId?: string): Promise<boolean> {
  const db = await getDatabase();
  const posts = db.collection('posts');
  
  const query: any = { slug };
  if (excludeId) {
    query._id = { $ne: new ObjectId(excludeId) };
  }
  
  const count = await posts.countDocuments(query);
  return count > 0;
}

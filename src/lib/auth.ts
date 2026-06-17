import { cookies } from 'next/headers';
import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import * as jose from 'jose';

const AUTH_SECRET = process.env.AUTH_SECRET || 'your-secret-key-change-this';

const secret = new TextEncoder().encode(AUTH_SECRET);

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString('hex');
  const digest = scryptSync(password, salt, 64).toString('hex');
  return `scrypt$${salt}$${digest}`;
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  if (!hash) return false;

  // Supported format: scrypt$<salt>$<hexDigest>
  if (hash.startsWith('scrypt$')) {
    const parts = hash.split('$');
    if (parts.length !== 3) return false;

    const salt = parts[1];
    const expectedHex = parts[2];
    const actualHex = scryptSync(password, salt, 64).toString('hex');

    const expected = Buffer.from(expectedHex, 'hex');
    const actual = Buffer.from(actualHex, 'hex');
    if (expected.length !== actual.length) return false;
    return timingSafeEqual(expected, actual);
  }

  // Optional plain-text fallback for local/dev bootstrapping.
  const expected = Buffer.from(hash, 'utf8');
  const actual = Buffer.from(password, 'utf8');
  if (expected.length !== actual.length) return false;
  return timingSafeEqual(expected, actual);
}

export async function createToken(userId: string): Promise<string> {
  const token = await new jose.SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);
  
  return token;
}

export async function verifyToken(token: string) {
  try {
    const verified = await jose.jwtVerify(token, secret);
    return verified.payload;
  } catch (error) {
    return null;
  }
}

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });
}

export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete('auth-token');
}

export async function getAuthToken() {
  const cookieStore = await cookies();
  return cookieStore.get('auth-token')?.value;
}

export async function verifyAdminAuth() {
  const token = await getAuthToken();
  if (!token) {
    return null;
  }
  
  const payload = await verifyToken(token);
  return payload;
}

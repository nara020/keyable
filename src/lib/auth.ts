import { cookies } from 'next/headers';

const ADMIN_SESSION_COOKIE = 'keyable_admin_session';
const SESSION_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

// Simple session token generation (use proper JWT in production)
function generateSessionToken(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2);
  const token = Buffer.from(`${timestamp}:${random}:${process.env.ADMIN_API_KEY}`).toString('base64');
  return token;
}

function validateSessionToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const [timestamp, , apiKey] = decoded.split(':');

    // Check if token is expired
    const tokenTime = parseInt(timestamp);
    if (Date.now() - tokenTime > SESSION_EXPIRY) {
      return false;
    }

    // Check if API key matches
    if (apiKey !== process.env.ADMIN_API_KEY) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

export async function verifyAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!sessionToken) {
    return false;
  }

  return validateSessionToken(sessionToken);
}

export async function createAdminSession(): Promise<string> {
  const token = generateSessionToken();
  const cookieStore = await cookies();

  cookieStore.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_EXPIRY / 1000, // in seconds
    path: '/admin',
  });

  return token;
}

export async function destroyAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
}

export function verifyPassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  return password === adminPassword;
}

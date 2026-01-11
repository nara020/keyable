import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const ADMIN_SESSION_COOKIE = 'keyable_admin_session';
const SESSION_EXPIRY = 24 * 60 * 60; // 24 hours in seconds

// JWT secret - should be set in environment variables
const JWT_SECRET = process.env.JWT_SECRET || process.env.ADMIN_API_KEY || 'fallback-secret-change-in-production';

interface JWTPayload {
  role: 'admin';
  iat: number;
  exp: number;
}

/**
 * Generate a secure JWT token for admin session
 */
function generateSessionToken(): string {
  const payload: Omit<JWTPayload, 'iat' | 'exp'> = {
    role: 'admin',
  };

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: SESSION_EXPIRY,
    algorithm: 'HS256',
  });
}

/**
 * Validate JWT session token
 */
function validateSessionToken(token: string): boolean {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      algorithms: ['HS256'],
    }) as JWTPayload;

    return decoded.role === 'admin';
  } catch {
    // Token is invalid or expired
    return false;
  }
}

/**
 * Verify if current request has valid admin session
 */
export async function verifyAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!sessionToken) {
    return false;
  }

  return validateSessionToken(sessionToken);
}

/**
 * Create a new admin session and set cookie
 */
export async function createAdminSession(): Promise<string> {
  const token = generateSessionToken();
  const cookieStore = await cookies();

  cookieStore.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_EXPIRY,
    path: '/admin',
  });

  return token;
}

/**
 * Destroy admin session by deleting cookie
 */
export async function destroyAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
}

/**
 * Hash a password using bcrypt
 * Use this to generate the hashed password for ADMIN_PASSWORD_HASH env variable
 * Example: console.log(await hashPassword('your-secure-password'))
 */
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
}

/**
 * Verify password against stored hash
 * If ADMIN_PASSWORD_HASH is not set, falls back to plain text comparison (dev only)
 */
export async function verifyPassword(password: string): Promise<boolean> {
  const passwordHash = process.env.ADMIN_PASSWORD_HASH;

  if (passwordHash) {
    // Production: Use bcrypt comparison
    return bcrypt.compare(password, passwordHash);
  }

  // Development fallback: Plain text comparison (NOT secure - for dev only)
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  console.warn('Warning: Using plain text password comparison. Set ADMIN_PASSWORD_HASH for production.');
  return password === adminPassword;
}

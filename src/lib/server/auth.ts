import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import { env } from '$env/dynamic/private';

const getSecret = () => new TextEncoder().encode(env.AUTH_SECRET || 'fallback-secret-for-dev-only');

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}

export async function createSession(userId: string, role: string) {
  const jwt = await new SignJWT({ userId, role })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getSecret());
  return jwt;
}

export async function verifySession(token: string) {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload as { userId: string; role: string };
  } catch (error) {
    return null;
  }
}

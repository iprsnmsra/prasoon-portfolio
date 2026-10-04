import { SignJWT, jwtVerify } from 'jose';
import { hash, compare } from 'bcryptjs';
import { cookies } from 'next/headers';

const ADMIN_SECRET = process.env.ADMIN_SECRET;

const getSecretKey = () => {
  const secret = ADMIN_SECRET;
  if (!secret) throw new Error('ADMIN_SECRET is not configured');
  return new TextEncoder().encode(secret);
};

export async function hashPassword(password: string): Promise<string> {
  return await hash(password, 10);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await compare(password, hashedPassword);
}

export async function createSessionToken(): Promise<string> {
  const secretKey = getSecretKey();
  return await new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secretKey);
}

export async function verifySessionToken(token: string): Promise<boolean> {
  try {
    const secretKey = getSecretKey();
    await jwtVerify(token, secretKey);
    return true;
  } catch (error) {
    return false;
  }
}

export async function getSession(cookies: any): Promise<boolean> {
  const token = cookies.get('admin_session')?.value;
  if (!token) return false;
  return await verifySessionToken(token);
}

export async function requireAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_session')?.value;
  if (!token || !(await verifySessionToken(token))) {
    throw new Error('Unauthorized');
  }
}

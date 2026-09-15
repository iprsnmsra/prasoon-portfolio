import { SignJWT, jwtVerify } from 'jose';
import { hash, compare } from 'bcryptjs';

const ADMIN_SECRET = process.env.ADMIN_SECRET;

const getSecretKey = () => {
  if (!ADMIN_SECRET) {
    throw new Error('Missing ADMIN_SECRET environment variable');
  }
  return new TextEncoder().encode(ADMIN_SECRET);
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

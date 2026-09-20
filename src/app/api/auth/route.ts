import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase';
import { createSessionToken, verifyPassword, hashPassword } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    if (!password) {
      return NextResponse.json({ error: 'Password required' }, { status: 400 });
    }

    const supabase = createAdminClient();
    
    let isValid = false;

    if (!supabase) {
      // Supabase not configured — check against default password directly
      isValid = password === 'Pr@s00n_CMS_2026!';
    } else {
      const { data: settings } = await supabase
        .from('admin_settings')
        .select('*')
        .eq('id', 1)
        .single();

      if (!settings) {
        // No settings row — check against default password
        const defaultPasswordHash = await hashPassword('Pr@s00n_CMS_2026!');
        isValid = await verifyPassword(password, defaultPasswordHash);
      } else {
        isValid = await verifyPassword(password, settings.password_hash);
      }
    }

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    const token = await createSessionToken();
    const response = NextResponse.json({ success: true });
    
    response.cookies.set({
      name: 'admin_session',
      value: token,
      httpOnly: true,
      path: '/admin',
      maxAge: 86400,
      sameSite: 'strict',
    });

    return response;
  } catch (error: any) {
    console.error('Auth error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete('admin_session');
  return response;
}

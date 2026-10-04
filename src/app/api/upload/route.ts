import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase';
import crypto from 'crypto';
import { requireAdminSession } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    await requireAdminSession();
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    let bucket = formData.get('bucket') as string | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }
    
    if (!bucket) {
      bucket = 'portfolio-assets';
    }
    if (bucket !== 'portfolio-assets') {
      return NextResponse.json({ error: 'Invalid storage bucket' }, { status: 400 });
    }

    const supabase = createAdminClient();
    if (!supabase) {
      return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
    }
    
    const ext = file.name.split('.').pop() || 'tmp';
    const filename = `${crypto.randomUUID()}.${ext}`;
    
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { error } = await supabase.storage
      .from(bucket)
      .upload(filename, buffer, {
        contentType: file.type || 'application/octet-stream',
      });

    if (error) {
      throw error;
    }

    const { data: publicUrlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filename);

    return NextResponse.json({ url: publicUrlData.publicUrl, success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    console.error('Upload error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

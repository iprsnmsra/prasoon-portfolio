'use server'

import { createAdminClient } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'
import { Certification } from '@/lib/types'

export async function getCertifications(): Promise<{ success: boolean; error?: string; data?: Certification[] }> {
  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase.from('certifications').select('*').order('display_order', { ascending: true })

    if (error) throw error

    return { success: true, data }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function createCertification(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createAdminClient()
    const { error } = await supabase.from('certifications').insert({
      title: formData.get('title'),
      issuer: formData.get('issuer'),
      date: formData.get('date'),
      credential_url: formData.get('credential_url'),
      image_url: formData.get('image_url'),
      display_order: parseInt(formData.get('display_order') as string) || 0,
    })

    if (error) throw error

    revalidatePath('/')
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function updateCertification(id: string, formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createAdminClient()
    const { error } = await supabase.from('certifications').update({
      title: formData.get('title'),
      issuer: formData.get('issuer'),
      date: formData.get('date'),
      credential_url: formData.get('credential_url'),
      image_url: formData.get('image_url'),
      display_order: parseInt(formData.get('display_order') as string) || 0,
    }).eq('id', id)

    if (error) throw error

    revalidatePath('/')
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function deleteCertification(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createAdminClient()
    const { error } = await supabase.from('certifications').delete().eq('id', id)

    if (error) throw error

    revalidatePath('/')
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

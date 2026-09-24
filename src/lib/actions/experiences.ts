'use server'

import { createAdminClient } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'
import { Experience } from '@/lib/types'
import { experiences as staticExperiences } from '@/data/projects'

export async function getExperiences(): Promise<{ success: boolean; error?: string; data?: Experience[] }> {
  try {
    const supabase = createAdminClient()
    if (!supabase) return { success: true, data: staticExperiences.map((e, i) => ({ id: String(e.id), company: e.company, role: e.role, join_date: e.joinDate, description: e.description, logo_url: e.logoPlaceholder, image_url: e.imagePlaceholder, display_order: i })) as unknown as Experience[] }
    const { data, error } = await supabase.from('experiences').select('*').order('display_order', { ascending: true })

    if (error) throw error

    return { success: true, data }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function createExperience(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createAdminClient()
    if (!supabase) return { success: false, error: 'Supabase not configured' }
    const { error } = await supabase.from('experiences').insert({
      company: formData.get('company'),
      role: formData.get('role'),
      join_date: formData.get('join_date'),
      description: formData.get('description'),
      logo_url: formData.get('logo_url'),
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

export async function updateExperience(id: string, formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createAdminClient()
    if (!supabase) return { success: false, error: 'Supabase not configured' }
    const { error } = await supabase.from('experiences').update({
      company: formData.get('company'),
      role: formData.get('role'),
      join_date: formData.get('join_date'),
      description: formData.get('description'),
      logo_url: formData.get('logo_url'),
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

export async function deleteExperience(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createAdminClient()
    if (!supabase) return { success: false, error: 'Supabase not configured' }
    const { error } = await supabase.from('experiences').delete().eq('id', id)

    if (error) throw error

    revalidatePath('/')
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}


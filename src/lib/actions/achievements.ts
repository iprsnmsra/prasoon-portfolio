'use server'

import { createAdminClient } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'
import { Achievement } from '@/lib/types'
import { achievements as staticAchievements } from '@/data/projects'

export async function getAchievements(): Promise<{ success: boolean; error?: string; data?: Achievement[] }> {
  try {
    const supabase = createAdminClient()
    if (!supabase) return { success: true, data: staticAchievements.map((a, i) => ({ id: String(a.id), type: a.type, title: a.title, description: a.description, perks: a.perks, image_url: a.imagePlaceholder, display_order: i })) as unknown as Achievement[] }
    const { data, error } = await supabase.from('achievements').select('*').order('display_order', { ascending: true })

    if (error) throw error

    return { success: true, data }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function createAchievement(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createAdminClient()
    if (!supabase) return { success: false, error: 'Supabase not configured' }
    const { error } = await supabase.from('achievements').insert({
      type: formData.get('type'),
      title: formData.get('title'),
      description: formData.get('description'),
      perks: formData.get('perks'),
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

export async function updateAchievement(id: string, formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createAdminClient()
    if (!supabase) return { success: false, error: 'Supabase not configured' }
    const { error } = await supabase.from('achievements').update({
      type: formData.get('type'),
      title: formData.get('title'),
      description: formData.get('description'),
      perks: formData.get('perks'),
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

export async function deleteAchievement(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createAdminClient()
    if (!supabase) return { success: false, error: 'Supabase not configured' }
    const { error } = await supabase.from('achievements').delete().eq('id', id)

    if (error) throw error

    revalidatePath('/')
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}


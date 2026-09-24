'use server'

import { createAdminClient } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'
import { Skill } from '@/lib/types'
import { skills as staticSkills } from '@/data/projects'

export async function getSkills(): Promise<{ success: boolean; error?: string; data?: Skill[] }> {
  try {
    const supabase = createAdminClient()
    if (!supabase) return { success: true, data: staticSkills.map((s, i) => ({ id: String(i+1), name: s.name, icon_url: s.iconUrl, display_order: i })) as unknown as Skill[] }
    const { data, error } = await supabase.from('skills').select('*').order('display_order', { ascending: true })

    if (error) throw error

    return { success: true, data }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function createSkill(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createAdminClient()
    if (!supabase) return { success: false, error: 'Supabase not configured' }
    const { error } = await supabase.from('skills').insert({
      name: formData.get('name'),
      icon_url: formData.get('icon_url'),
      display_order: parseInt(formData.get('display_order') as string) || 0,
    })

    if (error) throw error

    revalidatePath('/')
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function updateSkill(id: string, formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createAdminClient()
    if (!supabase) return { success: false, error: 'Supabase not configured' }
    const { error } = await supabase.from('skills').update({
      name: formData.get('name'),
      icon_url: formData.get('icon_url'),
      display_order: parseInt(formData.get('display_order') as string) || 0,
    }).eq('id', id)

    if (error) throw error

    revalidatePath('/')
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function deleteSkill(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createAdminClient()
    if (!supabase) return { success: false, error: 'Supabase not configured' }
    const { error } = await supabase.from('skills').delete().eq('id', id)

    if (error) throw error

    revalidatePath('/')
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}


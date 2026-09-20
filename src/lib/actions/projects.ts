'use server'

import { createAdminClient } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'
import { Project, ProjectCategory } from '@/lib/types'

export async function getProjectCategories(): Promise<{ success: boolean; error?: string; data?: ProjectCategory[] }> {
  try {
    const supabase = createAdminClient()
    if (!supabase) return { success: false, error: 'Supabase not configured' }
    const { data, error } = await supabase.from('project_categories').select('*').order('display_order', { ascending: true })

    if (error) throw error

    return { success: true, data }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function getProjects(categoryId?: string): Promise<{ success: boolean; error?: string; data?: Project[] }> {
  try {
    const supabase = createAdminClient()
    if (!supabase) return { success: false, error: 'Supabase not configured' }
    let query = supabase.from('projects').select('*').order('display_order', { ascending: true })
    
    if (categoryId) {
      query = query.eq('category_id', categoryId)
    }

    const { data, error } = await query

    if (error) throw error

    return { success: true, data }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function createCategory(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createAdminClient()
    if (!supabase) return { success: false, error: 'Supabase not configured' }
    const { error } = await supabase.from('project_categories').insert({
      id: formData.get('id'),
      name: formData.get('name'),
      display_order: parseInt(formData.get('display_order') as string) || 0,
    })

    if (error) throw error

    revalidatePath('/')
    revalidatePath('/projects/[category]', 'page')
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function updateCategory(id: string, formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createAdminClient()
    if (!supabase) return { success: false, error: 'Supabase not configured' }
    const { error } = await supabase.from('project_categories').update({
      name: formData.get('name'),
      display_order: parseInt(formData.get('display_order') as string) || 0,
    }).eq('id', id)

    if (error) throw error

    revalidatePath('/')
    revalidatePath('/projects/[category]', 'page')
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function deleteCategory(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createAdminClient()
    if (!supabase) return { success: false, error: 'Supabase not configured' }
    const { error } = await supabase.from('project_categories').delete().eq('id', id)

    if (error) throw error

    revalidatePath('/')
    revalidatePath('/projects/[category]', 'page')
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function createProject(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    const techStackStr = formData.get('tech_stack') as string || ''
    const keyFeaturesStr = formData.get('key_features') as string || ''
    
    const techStack = techStackStr ? techStackStr.split(',').map(s => s.trim()).filter(Boolean) : []
    const keyFeatures = keyFeaturesStr ? keyFeaturesStr.split(',').map(s => s.trim()).filter(Boolean) : []

    const supabase = createAdminClient()
    if (!supabase) return { success: false, error: 'Supabase not configured' }
    const { error } = await supabase.from('projects').insert({
      category_id: formData.get('category_id'),
      title: formData.get('title'),
      description: formData.get('description'),
      image_url: formData.get('image_url'),
      project_url: formData.get('project_url'),
      github_url: formData.get('github_url'),
      tech_stack: techStack,
      key_features: keyFeatures,
      display_order: parseInt(formData.get('display_order') as string) || 0,
    })

    if (error) throw error

    revalidatePath('/')
    revalidatePath('/projects/[category]', 'page')
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function updateProject(id: string, formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    const techStackStr = formData.get('tech_stack') as string || ''
    const keyFeaturesStr = formData.get('key_features') as string || ''
    
    const techStack = techStackStr ? techStackStr.split(',').map(s => s.trim()).filter(Boolean) : []
    const keyFeatures = keyFeaturesStr ? keyFeaturesStr.split(',').map(s => s.trim()).filter(Boolean) : []

    const supabase = createAdminClient()
    if (!supabase) return { success: false, error: 'Supabase not configured' }
    const { error } = await supabase.from('projects').update({
      category_id: formData.get('category_id'),
      title: formData.get('title'),
      description: formData.get('description'),
      image_url: formData.get('image_url'),
      project_url: formData.get('project_url'),
      github_url: formData.get('github_url'),
      tech_stack: techStack,
      key_features: keyFeatures,
      display_order: parseInt(formData.get('display_order') as string) || 0,
    }).eq('id', id)

    if (error) throw error

    revalidatePath('/')
    revalidatePath('/projects/[category]', 'page')
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function deleteProject(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createAdminClient()
    if (!supabase) return { success: false, error: 'Supabase not configured' }
    const { error } = await supabase.from('projects').delete().eq('id', id)

    if (error) throw error

    revalidatePath('/')
    revalidatePath('/projects/[category]', 'page')
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}


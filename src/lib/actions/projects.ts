'use server'

import { createAdminClient } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'
import { Project, ProjectCategory } from '@/lib/types'
import { projectCategories as staticCategories, categoryProjects as staticCategoryProjects } from '@/data/projects'
import { requireAdminSession } from '@/lib/auth'

function parseList(value: FormDataEntryValue | null): string[] {
  if (typeof value !== 'string' || !value.trim()) return []
  try {
    const parsed = JSON.parse(value)
    if (Array.isArray(parsed)) return parsed.map(String).map((item) => item.trim()).filter(Boolean)
  } catch {
    // Admin clients from older versions submit comma-separated values.
  }
  return value.split(',').map((item) => item.trim()).filter(Boolean)
}

export async function getProjectCategories(): Promise<{ success: boolean; error?: string; data?: ProjectCategory[] }> {
  try {
    const supabase = createAdminClient()
    if (!supabase) return { success: true, data: staticCategories.map((c, i) => ({ id: c.id, title: c.title, description: c.description, icon: c.icon, display_order: i })) as unknown as ProjectCategory[] }
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
    if (!supabase) {
      const all = Object.entries(staticCategoryProjects).flatMap(([catId, projects]) => projects.map((p, i) => ({ id: String(p.id), title: p.title, description: p.description, tech_stack: p.techStack, key_features: p.keyFeatures, repo_link: p.repoLink, live_link: p.liveLink, category_id: catId, display_order: i })))
      const filtered = categoryId ? all.filter(p => p.category_id === categoryId) : all
      return { success: true, data: filtered as unknown as Project[] }
    }
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
    await requireAdminSession()
    const supabase = createAdminClient()
    if (!supabase) return { success: false, error: 'Supabase not configured' }
    const { error } = await supabase.from('project_categories').insert({
      id: formData.get('id'),
      title: formData.get('title'),
      description: formData.get('description'),
      icon: formData.get('icon'),
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
    await requireAdminSession()
    const supabase = createAdminClient()
    if (!supabase) return { success: false, error: 'Supabase not configured' }
    const { error } = await supabase.from('project_categories').update({
      title: formData.get('title'),
      description: formData.get('description'),
      icon: formData.get('icon'),
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
    await requireAdminSession()
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
    await requireAdminSession()
    const techStack = parseList(formData.get('tech_stack'))
    const keyFeatures = parseList(formData.get('key_features'))

    const supabase = createAdminClient()
    if (!supabase) return { success: false, error: 'Supabase not configured' }
    const { error } = await supabase.from('projects').insert({
      category_id: formData.get('category_id'),
      title: formData.get('title'),
      description: formData.get('description'),
      repo_link: formData.get('repo_link'),
      live_link: formData.get('live_link'),
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
    await requireAdminSession()
    const techStack = parseList(formData.get('tech_stack'))
    const keyFeatures = parseList(formData.get('key_features'))

    const supabase = createAdminClient()
    if (!supabase) return { success: false, error: 'Supabase not configured' }
    const { error } = await supabase.from('projects').update({
      category_id: formData.get('category_id'),
      title: formData.get('title'),
      description: formData.get('description'),
      repo_link: formData.get('repo_link'),
      live_link: formData.get('live_link'),
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
    await requireAdminSession()
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

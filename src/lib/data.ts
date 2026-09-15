import { createClient } from '@/lib/supabase'
import { Experience, ProjectCategory, Project, Skill, Certification, Resource, Achievement, PersonalInfo } from '@/lib/types'

import {
  experiences as staticExperiences,
  projectCategories as staticProjectCategories,
  categoryProjects as staticCategoryProjects,
  skills as staticSkills,
  certifications as staticCertifications,
  freeResources as staticResources,
  achievements as staticAchievements,
  personalInfo as staticPersonalInfo
} from '@/data/projects'

export async function fetchExperiences(): Promise<Experience[]> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase.from('experiences').select('*').order('display_order', { ascending: true })
    if (error || !data || data.length === 0) return staticExperiences as unknown as Experience[]
    return data
  } catch {
    return staticExperiences as unknown as Experience[]
  }
}

export async function fetchProjectCategories(): Promise<ProjectCategory[]> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase.from('project_categories').select('*').order('display_order', { ascending: true })
    if (error || !data || data.length === 0) return staticProjectCategories as unknown as ProjectCategory[]
    return data
  } catch {
    return staticProjectCategories as unknown as ProjectCategory[]
  }
}

export async function fetchProjects(categoryId?: string): Promise<Project[]> {
  try {
    const supabase = createClient()
    let query = supabase.from('projects').select('*').order('display_order', { ascending: true })
    if (categoryId) {
      query = query.eq('category_id', categoryId)
    }
    const { data, error } = await query
    if (error || !data || data.length === 0) {
      if (categoryId) return (staticCategoryProjects[categoryId] || []) as unknown as Project[]
      return Object.values(staticCategoryProjects).flat() as unknown as Project[]
    }
    return data
  } catch {
    if (categoryId) return (staticCategoryProjects[categoryId] || []) as unknown as Project[]
    return Object.values(staticCategoryProjects).flat() as unknown as Project[]
  }
}

export async function fetchSkills(): Promise<Skill[]> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase.from('skills').select('*').order('display_order', { ascending: true })
    if (error || !data || data.length === 0) return staticSkills as unknown as Skill[]
    return data
  } catch {
    return staticSkills as unknown as Skill[]
  }
}

export async function fetchCertifications(): Promise<Certification[]> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase.from('certifications').select('*').order('display_order', { ascending: true })
    if (error || !data || data.length === 0) return staticCertifications as unknown as Certification[]
    return data
  } catch {
    return staticCertifications as unknown as Certification[]
  }
}

export async function fetchResources(): Promise<Resource[]> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase.from('resources').select('*').order('display_order', { ascending: true })
    if (error || !data || data.length === 0) return staticResources as unknown as Resource[]
    return data
  } catch {
    return staticResources as unknown as Resource[]
  }
}

export async function fetchAchievements(): Promise<Achievement[]> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase.from('achievements').select('*').order('display_order', { ascending: true })
    if (error || !data || data.length === 0) return staticAchievements as unknown as Achievement[]
    return data
  } catch {
    return staticAchievements as unknown as Achievement[]
  }
}

export async function fetchPersonalInfo(): Promise<PersonalInfo> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase.from('personal_info').select('*').eq('id', 1).single()
    if (error || !data) return staticPersonalInfo as unknown as PersonalInfo
    return data
  } catch {
    return staticPersonalInfo as unknown as PersonalInfo
  }
}

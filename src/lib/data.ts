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

const fallbackExperiences = staticExperiences.map((item, index) => ({
  id: String(item.id),
  company: item.company,
  role: item.role,
  join_date: item.joinDate,
  description: item.description,
  logo_url: item.logoPlaceholder,
  image_url: item.imagePlaceholder,
  display_order: index,
}))

const fallbackCategories = staticProjectCategories.map((item, index) => ({
  ...item,
  display_order: index,
}))

const fallbackProjects = Object.entries(staticCategoryProjects).flatMap(([categoryId, projects]) =>
  projects.map((item, index) => ({
    id: String(item.id),
    category_id: categoryId,
    title: item.title,
    description: item.description,
    tech_stack: item.techStack,
    key_features: item.keyFeatures,
    repo_link: item.repoLink,
    live_link: item.liveLink,
    display_order: index,
  })),
)

const fallbackSkills = staticSkills.map((item, index) => ({
  id: String(index + 1),
  name: item.name,
  icon_url: item.iconUrl,
  display_order: index,
}))

const fallbackCertifications = staticCertifications.map((item, index) => ({
  id: String(item.id),
  title: item.title,
  issuer: item.issuer,
  date: item.date,
  credential_url: item.credentialUrl,
  image_url: item.imageUrl,
  display_order: index,
}))

const fallbackResources = staticResources.map((item, index) => ({
  id: String(item.id),
  title: item.title,
  file_url: item.fileUrl,
  display_order: index,
}))

const fallbackAchievements = staticAchievements.map((item, index) => ({
  id: String(item.id),
  type: item.type,
  title: item.title,
  description: item.description,
  perks: item.perks,
  image_url: item.imagePlaceholder,
  display_order: index,
}))

const fallbackPersonalInfo: PersonalInfo = {
  id: 1,
  name: staticPersonalInfo.name,
  role: staticPersonalInfo.role,
  tagline: staticPersonalInfo.tagline,
  email: staticPersonalInfo.email,
  avatar_url: staticPersonalInfo.avatarUrl,
  github: staticPersonalInfo.socials.github,
  linkedin: staticPersonalInfo.socials.linkedin,
  instagram: staticPersonalInfo.socials.instagram,
}

export async function fetchExperiences(): Promise<Experience[]> {
  try {
    const supabase = createClient()
    if (!supabase) return fallbackExperiences
    const { data, error } = await supabase.from('experiences').select('*').order('display_order', { ascending: true })
    if (error || !data || data.length === 0) return fallbackExperiences
    return data
  } catch {
    return staticExperiences as unknown as Experience[]
  }
}

export async function fetchProjectCategories(): Promise<ProjectCategory[]> {
  try {
    const supabase = createClient()
    if (!supabase) return staticProjectCategories as unknown as ProjectCategory[]
    const { data, error } = await supabase.from('project_categories').select('*').order('display_order', { ascending: true })
    if (error || !data || data.length === 0) return fallbackCategories
    return data
  } catch {
    return fallbackCategories
  }
}

export async function fetchProjects(categoryId?: string): Promise<Project[]> {
  try {
    const supabase = createClient()
    if (!supabase) {
      if (categoryId) return fallbackProjects.filter((project) => project.category_id === categoryId)
      return fallbackProjects
    }
    let query = supabase.from('projects').select('*').order('display_order', { ascending: true })
    if (categoryId) {
      query = query.eq('category_id', categoryId)
    }
    const { data, error } = await query
    if (error || !data || data.length === 0) {
      if (categoryId) return fallbackProjects.filter((project) => project.category_id === categoryId)
      return fallbackProjects
    }
    return data
  } catch {
    if (categoryId) return fallbackProjects.filter((project) => project.category_id === categoryId)
    return fallbackProjects
  }
}

export async function fetchSkills(): Promise<Skill[]> {
  try {
    const supabase = createClient()
    if (!supabase) return fallbackSkills
    const { data, error } = await supabase.from('skills').select('*').order('display_order', { ascending: true })
    if (error || !data || data.length === 0) return fallbackSkills
    return data
  } catch {
    return staticSkills as unknown as Skill[]
  }
}

export async function fetchCertifications(): Promise<Certification[]> {
  try {
    const supabase = createClient()
    if (!supabase) return fallbackCertifications
    const { data, error } = await supabase.from('certifications').select('*').order('display_order', { ascending: true })
    if (error || !data || data.length === 0) return fallbackCertifications
    return data
  } catch {
    return staticCertifications as unknown as Certification[]
  }
}

export async function fetchResources(): Promise<Resource[]> {
  try {
    const supabase = createClient()
    if (!supabase) return fallbackResources
    const { data, error } = await supabase.from('resources').select('*').order('display_order', { ascending: true })
    if (error || !data || data.length === 0) return fallbackResources
    return data
  } catch {
    return staticResources as unknown as Resource[]
  }
}

export async function fetchAchievements(): Promise<Achievement[]> {
  try {
    const supabase = createClient()
    if (!supabase) return fallbackAchievements
    const { data, error } = await supabase.from('achievements').select('*').order('display_order', { ascending: true })
    if (error || !data || data.length === 0) return fallbackAchievements
    return data
  } catch {
    return staticAchievements as unknown as Achievement[]
  }
}

export async function fetchPersonalInfo(): Promise<PersonalInfo> {
  try {
    const supabase = createClient()
    if (!supabase) return fallbackPersonalInfo
    const { data, error } = await supabase.from('personal_info').select('*').eq('id', 1).single()
    if (error || !data) return fallbackPersonalInfo
    return data
  } catch {
    return fallbackPersonalInfo
  }
}

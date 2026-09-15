'use server'

import { createAdminClient } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'
import { PersonalInfo } from '@/lib/types'
import { hash, compare } from 'bcryptjs'

export async function changePassword(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    const currentPassword = formData.get('current_password') as string
    const newPassword = formData.get('new_password') as string

    if (!currentPassword || !newPassword) {
      throw new Error("Both current and new passwords are required.")
    }

    const supabase = createAdminClient()
    
    // 1. Get current hash from admin_settings table (Assuming id = 1 for the admin user)
    const { data: adminSetting, error: fetchError } = await supabase
      .from('admin_settings')
      .select('password_hash')
      .eq('id', 1)
      .single()

    if (fetchError || !adminSetting) {
      throw new Error("Could not find admin settings.")
    }

    // 2. Compare current_password with hash
    const isValid = await compare(currentPassword, adminSetting.password_hash)
    if (!isValid) {
      throw new Error("Incorrect current password.")
    }

    // 3. Hash new password and UPDATE admin_settings
    const newHash = await hash(newPassword, 10)
    const { error: updateError } = await supabase
      .from('admin_settings')
      .update({ password_hash: newHash })
      .eq('id', 1)

    if (updateError) {
      throw updateError
    }

    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function getPersonalInfo(): Promise<{ success: boolean; error?: string; data?: PersonalInfo }> {
  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('personal_info')
      .select('*')
      .eq('id', 1)
      .single()

    if (error) throw error

    return { success: true, data }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function updatePersonalInfo(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createAdminClient()
    
    const { error } = await supabase.from('personal_info').update({
      name: formData.get('name'),
      role: formData.get('role'),
      tagline: formData.get('tagline'),
      email: formData.get('email'),
      avatar_url: formData.get('avatar_url'),
      github: formData.get('github'),
      linkedin: formData.get('linkedin'),
      instagram: formData.get('instagram'),
    }).eq('id', 1) // Assuming id=1 as per spec

    if (error) throw error

    revalidatePath('/')
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export interface Experience { id: string; company: string; role: string; join_date: string; description: string; logo_url: string; image_url: string; display_order: number; }
export interface ProjectCategory { id: string; title: string; description: string; icon: string; display_order: number; }
export interface Project { id: string; category_id: string; title: string; description: string; tech_stack: string[]; key_features: string[]; repo_link: string; live_link: string; display_order: number; }
export interface Skill { id: string; name: string; icon_url: string; display_order: number; }
export interface Certification { id: string; title: string; issuer: string; date: string; credential_url: string; image_url: string; display_order: number; }
export interface Resource { id: string; title: string; file_url: string; display_order: number; }
export interface Achievement { id: string; type: string; title: string; description: string; perks: string; image_url: string; display_order: number; }
export interface PersonalInfo { id: number; name: string; role: string; tagline: string; email: string; avatar_url: string; github: string; linkedin: string; instagram: string; }

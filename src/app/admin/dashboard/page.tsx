import { getExperiences } from '@/lib/actions/experiences';
import { getProjects } from '@/lib/actions/projects';
import { getSkills } from '@/lib/actions/skills';
import { getCertifications } from '@/lib/actions/certifications';
import { getResources } from '@/lib/actions/resources';
import { getAchievements } from '@/lib/actions/achievements';
import { 
  Briefcase, 
  FolderCode, 
  Wrench, 
  Award, 
  FileText, 
  Trophy,
  Plus
} from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function DashboardPage() {
  // We handle potential errors gracefully to avoid breaking the dashboard if one table fails
  const [
    experiences,
    projects,
    skills,
    certifications,
    resources,
    achievements
  ] = await Promise.all([
    getExperiences().catch(() => []),
    getProjects().catch(() => []),
    getSkills().catch(() => []),
    getCertifications().catch(() => []),
    getResources().catch(() => []),
    getAchievements().catch(() => [])
  ]);

  const stats = [
    { label: 'Experiences', count: (Array.isArray(experiences) ? experiences : experiences.data)?.length || 0, icon: Briefcase, href: '/admin/experiences' },
    { label: 'Projects', count: (Array.isArray(projects) ? projects : projects.data)?.length || 0, icon: FolderCode, href: '/admin/projects' },
    { label: 'Skills', count: (Array.isArray(skills) ? skills : skills.data)?.length || 0, icon: Wrench, href: '/admin/skills' },
    { label: 'Certifications', count: (Array.isArray(certifications) ? certifications : certifications.data)?.length || 0, icon: Award, href: '/admin/certifications' },
    { label: 'Resources', count: (Array.isArray(resources) ? resources : resources.data)?.length || 0, icon: FileText, href: '/admin/resources' },
    { label: 'Achievements', count: (Array.isArray(achievements) ? achievements : achievements.data)?.length || 0, icon: Trophy, href: '/admin/achievements' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-pt-serif font-bold text-black mb-2">Dashboard</h1>
        <p className="text-2xl font-caveat text-black/60">Welcome back, Prasoon. Overview of your portfolio content.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-[#f5f5f5] border border-black/10 rounded-xl p-6 relative overflow-hidden group hover:border-black/30 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-jersey uppercase tracking-widest text-black/60">{stat.label}</h3>
                <div className="p-3 bg-white rounded-full border border-black/5 text-black">
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <p className="text-5xl font-pt-serif font-bold">{stat.count}</p>
              
              <Link href={stat.href} className="absolute inset-0 z-10" aria-label={`Go to ${stat.label}`} />
            </div>
          );
        })}
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-pt-serif font-bold mb-6">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          {stats.map((stat, i) => (
            <Link 
              key={`action-${i}`}
              href={`${stat.href}/new`}
              className="flex items-center space-x-2 bg-black text-white px-5 py-3 rounded-full font-jersey uppercase tracking-widest text-sm hover:bg-black/80 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add {stat.label.slice(0, -1)}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

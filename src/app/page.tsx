import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Marquee from "@/components/Marquee";
import ProjectCard from "@/components/ProjectCard";
import SkillGrid from "@/components/SkillGrid";
import Resources from "@/components/Resources";
import Image from "next/image";
import Terminal from "@/components/Terminal"; 
import FluidBackground from "@/components/FluidBackground"; // <-- Added Fluid Background Import
import { projects, personalInfo } from "@/data/projects";

export default function Home() {
  return (
    // Added 'relative' to the main wrapper
    <main className="bg-[#0a0a0a] min-h-screen font-sans selection:bg-orange-500 selection:text-white relative">
      
      {/* 1. THE CINEMATIC BACKGROUND (Renders behind everything) */}
      <FluidBackground />
      
      {/* 2. THE CONTENT LAYER (Renders above the fluid background) */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Marquee />
        
        {/* Projects Section */}
        <section id="projects" className="py-32 px-8 md:px-24 max-w-[1600px] mx-auto">
          <div className="mb-16">
            <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter">
              Featured Work<span className="text-orange-500">.</span>
            </h2>
            <p className="text-gray-400 font-mono mt-4">Selected projects, hackathons, and systems. Entire card is clickable.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </section>

        <SkillGrid />
        <Resources />

        {/* Huge Footer with Integrated Portrait */}
        <footer className="border-t border-white/10 mt-20 bg-[#0a0a0a]/80 backdrop-blur-sm">
          <div className="py-24 px-8 md:px-24 max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-end gap-12 overflow-hidden">
            
            {/* LEFT: Portrait & Text Combined */}
            <div className="flex flex-col md:flex-row items-start md:items-end gap-12 flex-1">
              
              {/* Portrait - Stylized blend */}
              <div className="relative aspect-[3/4] w-full max-w-[300px] rounded-3xl border border-white/10 overflow-hidden bg-white/5 order-2 md:order-1">
                <Image 
                  src={personalInfo.avatarUrl} 
                  alt={personalInfo.name} 
                  fill 
                  className="object-cover object-top mix-blend-luminosity hover:mix-blend-normal transition-all duration-1000"
                  sizes="300px"
                />
              </div>
              
              {/* Big text and Email link */}
              <div className="order-1 md:order-2 flex-1">
                <h2 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter mb-4 leading-none whitespace-nowrap">
                  Let's<br/>Build<span className="text-orange-500">.</span>
                </h2>
                <a 
                  href={`mailto:${personalInfo.email}`}
                  className="text-xl md:text-2xl font-mono text-orange-500 hover:text-white transition-colors border-b border-orange-500 hover:border-white pb-1"
                >
                  {personalInfo.email}
                </a>
              </div>
            </div>
            
            {/* RIGHT: Footer details */}
            <div className="text-right font-mono text-sm text-gray-500 space-y-2 order-3">
              <p>DESIGNED & ENGINEERED BY</p>
              <p className="text-white text-lg font-bold">{personalInfo.name}</p>
              <p>© {new Date().getFullYear()} ALL RIGHTS RESERVED.</p>
            </div>
          </div>
        </footer>

        {/* Hidden Terminal Easter Egg */}
        <Terminal />
      </div>
    </main>
  );
}
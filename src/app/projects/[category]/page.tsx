"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { use } from "react";
import { MoveLeft, ExternalLink, Github } from "lucide-react";
import { categoryProjects, projectCategories } from "@/data/projects";

interface Props {
  params: Promise<{ category: string }>;
}

export default function ProjectCategoryPage({ params }: Props) {
  const { category } = use(params);
  const projects = categoryProjects[category] || [];
  const categoryInfo = projectCategories.find((c) => c.id === category);
  const categoryTitle = categoryInfo?.title || category;

  const container: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } },
  };

  return (
    <main className="bg-white min-h-screen text-black font-sans selection:bg-black selection:text-white">
      <nav className="py-8 container-85 flex items-center justify-between border-b border-black/10">
        <Link href="/#projects">
          <motion.div whileHover={{ x: -5 }} className="font-jersey flex items-center gap-2 text-gray-400 text-sm tracking-widest uppercase cursor-pointer hover:text-black transition-colors">
            <MoveLeft size={16} /> Back
          </motion.div>
        </Link>
        <Link href="/" className="font-pt-serif font-black text-xl tracking-widest uppercase">
          PM<span className="text-gray-300">.</span>
        </Link>
      </nav>

      <section className="pt-20 pb-8 container-85">
        <h1 className="font-pt-serif text-5xl md:text-7xl font-black text-black uppercase tracking-tighter leading-none">
          Welcome To<br />
          {categoryTitle}<span className="text-gray-300">.</span>
        </h1>
        <p className="font-caveat text-xl text-gray-500 mt-4">
          {categoryInfo?.description}
        </p>
        <div className="mt-8 manga-brush-divider" />
      </section>

      <motion.section variants={container} initial="hidden" animate="show" className="pb-32 container-85 space-y-16">
        {projects.map((project, index) => (
          <motion.div key={project.id} variants={item} className="relative">
            <div className="absolute -left-4 md:-left-8 top-0 text-6xl font-black text-black/[0.05] font-pt-serif">
              {String(index + 1).padStart(2, "0")}
            </div>

            <div className="bg-[#f5f5f5] border border-black/10 rounded-2xl p-8 md:p-10 hover:border-black/20 transition-all duration-300">
              <h2 className="font-pt-serif text-2xl md:text-3xl font-bold text-black mb-4">
                Project {index + 1} \u2014 {project.title}
              </h2>
              <p className="font-caveat text-lg text-gray-500 leading-relaxed mb-6">{project.description}</p>

              <div className="mb-6">
                <h4 className="font-jersey text-sm font-bold text-black uppercase tracking-wider mb-3">Tech Stack Used</h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="font-jersey px-4 py-1.5 bg-black/5 border border-black/10 rounded-full text-xs text-gray-600">{tech}</span>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h4 className="font-jersey text-sm font-bold text-black uppercase tracking-wider mb-3">Key Features</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {project.keyFeatures.map((feature) => (
                    <li key={feature} className="font-caveat flex items-start gap-2 text-lg text-gray-500">
                      <span className="text-black/30 mt-0.5">\u25B8</span>{feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-3">
                {project.repoLink && project.repoLink !== "#" && (
                  <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="font-jersey flex items-center gap-2 px-5 py-2 border border-black/20 rounded-full text-xs uppercase tracking-widest text-black hover:bg-black hover:text-white transition-all duration-300">
                    <Github size={14} /> Repo Link
                  </a>
                )}
                {project.liveLink && project.liveLink !== "" && (
                  <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="font-jersey flex items-center gap-2 px-5 py-2 bg-black text-white rounded-full text-xs uppercase tracking-widest hover:bg-gray-800 transition-all duration-300">
                    <ExternalLink size={14} /> Live Link
                  </a>
                )}
              </div>
            </div>

            {index < projects.length - 1 && <div className="mt-16 manga-brush-divider" />}
          </motion.div>
        ))}
      </motion.section>

      <footer className="border-t border-black/10 text-center py-10 font-jersey text-xs text-gray-400">
        PRASOON MISHRA | \u00A9 {new Date().getFullYear()} All Rights Reserved.
      </footer>
    </main>
  );
}

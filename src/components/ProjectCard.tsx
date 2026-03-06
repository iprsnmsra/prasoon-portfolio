"use client";

import { motion } from "framer-motion";
import { FolderGit2, ExternalLink } from "lucide-react";

interface ProjectProps {
  title: string;
  category: string;
  description: string;
  tech: string[];
  githubUrl?: string; // Updated optional fields
  liveUrl?: string;   // Updated optional fields
}

export default function ProjectCard({ title, category, description, tech, githubUrl, liveUrl }: ProjectProps) {
  // Logic: Use live url if finished, otherwise fallback to github, or '#' as final fallback
  const linkUrl = liveUrl && liveUrl !== "" ? liveUrl : githubUrl && githubUrl !== "" ? githubUrl : "#";
  const isExternalLink = linkUrl !== "#";

  return (
    <motion.a
      href={linkUrl}
      target={isExternalLink ? "_blank" : undefined}
      rel={isExternalLink ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ 
          y: -10,
          border: "1px solid rgba(249, 115, 22, 0.4)" // Highlight border on hover
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-[#111] border border-white/10 p-8 rounded-2xl group transition-all cursor-pointer flex flex-col justify-between overflow-hidden relative"
    >
      <div>
        <div className="flex justify-between items-start mb-6 relative z-10">
          <div className="text-orange-500 text-sm font-mono font-bold tracking-widest uppercase">{category}</div>
          {/* ExternalLink icon only shows if a link exists */}
          {isExternalLink && (
            <ExternalLink className="text-gray-600 group-hover:text-orange-500 transition-colors" size={20} />
          )}
        </div>
        
        <h3 className="text-3xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-red-500 transition-all duration-300 relative z-10">
          {title}
        </h3>
        
        <p className="text-gray-400 mb-8 leading-relaxed relative z-10">
          {description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 relative z-10">
        {tech.map((t, i) => (
          <span key={i} className="px-3 py-1 bg-white/5 border border-white/5 text-gray-300 rounded-full text-xs font-mono">
            {t}
          </span>
        ))}
      </div>
    </motion.a>
  );
}
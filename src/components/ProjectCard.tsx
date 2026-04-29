"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FolderGit2, ExternalLink } from "lucide-react";
import React from "react";

interface ProjectProps {
  title: string;
  category: string;
  description: string;
  tech: string[];
  githubUrl?: string; 
  liveUrl?: string;   
}

export default function ProjectCard({ title, category, description, tech, githubUrl, liveUrl }: ProjectProps) {
  const linkUrl = liveUrl && liveUrl !== "" ? liveUrl : githubUrl && githubUrl !== "" ? githubUrl : "#";
  const isExternalLink = linkUrl !== "#";

  // --- 3D HOLOGRAPHIC TILT LOGIC ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={linkUrl}
      target={isExternalLink ? "_blank" : undefined}
      rel={isExternalLink ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      // Apply the 3D rotations based on mouse position
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="bg-[#111] border border-white/10 p-8 rounded-2xl group transition-all cursor-none flex flex-col justify-between overflow-visible relative h-full"
    >
      {/* Glow effect that tracks the mouse behind the card */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 via-orange-500/0 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

      {/* Adding transformZ pushes the content "off" the card to create depth */}
      <div style={{ transform: "translateZ(30px)" }}>
        <div className="flex justify-between items-start mb-6 relative z-10">
          <div className="text-orange-500 text-sm font-mono font-bold tracking-widest uppercase">{category}</div>
          {isExternalLink && (
            <ExternalLink className="text-gray-600 group-hover:text-orange-500 transition-colors" size={20} />
          )}
        </div>
        
        {/* CYBER GLITCH TITLE */}
        <h3 
          className="text-3xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-red-500 transition-all duration-300 relative z-10 glitch-hover"
          data-text={title} // Required for the glitch CSS to work
        >
          {title}
        </h3>
        
        <p className="text-gray-400 mb-8 leading-relaxed relative z-10">
          {description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 relative z-10" style={{ transform: "translateZ(40px)" }}>
        {tech.map((t, i) => (
          <span key={i} className="px-3 py-1 bg-white/5 border border-white/5 text-gray-300 rounded-full text-xs font-mono group-hover:border-orange-500/30 transition-colors duration-300">
            {t}
          </span>
        ))}
      </div>
    </motion.a>
  );
}
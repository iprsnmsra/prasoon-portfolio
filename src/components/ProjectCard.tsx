"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink } from "lucide-react";
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

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

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
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="bg-[#f5f5f5] border border-black/10 p-8 rounded-2xl group transition-all flex flex-col justify-between overflow-visible relative h-full hover:border-black/20"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/0 via-black/0 to-black/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
      <div style={{ transform: "translateZ(30px)" }}>
        <div className="flex justify-between items-start mb-6 relative z-10">
          <div className="text-gray-400 text-xs font-mono font-medium tracking-[0.2em] uppercase">{category}</div>
          {isExternalLink && <ExternalLink className="text-gray-300 group-hover:text-black transition-colors" size={18} />}
        </div>
        <h3 className="text-2xl md:text-3xl font-bold mb-4 text-black transition-all duration-300 relative z-10 glitch-hover" data-text={title}>{title}</h3>
        <p className="text-gray-500 mb-8 leading-relaxed relative z-10 text-sm">{description}</p>
      </div>
      <div className="flex flex-wrap gap-2 relative z-10" style={{ transform: "translateZ(40px)" }}>
        {tech.map((t, i) => (
          <span key={i} className="px-3 py-1 bg-black/5 border border-black/5 text-gray-500 rounded-full text-xs font-mono group-hover:border-black/15 transition-colors duration-300">{t}</span>
        ))}
      </div>
    </motion.a>
  );
}
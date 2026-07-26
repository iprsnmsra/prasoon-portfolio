"use client";

import { motion, Variants } from "framer-motion";
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";
import { personalInfo } from "../data/projects";
import MagneticElement from "./MagneticElement";
import img99 from './assets/99.jpg';

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.5 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 80, damping: 15 },
    },
  };

  return (
    <section className="min-h-screen flex flex-col justify-center container-85 text-black overflow-hidden relative pt-28">
      <div className="absolute inset-0 geo-grid pointer-events-none" />

      {/* ── "PM" watermark — pushed to far right, won't overlap text ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.03, scale: 1 }}
        transition={{ duration: 2 }}
        className="absolute top-[10%] right-[2%] text-[8rem] md:text-[12rem] font-black pointer-events-none select-none tracking-tighter leading-none text-black font-pt-serif"
        aria-hidden="true"
      >
        PM
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="z-10 relative"
      >
        {/* Status badge */}
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
          <div className="w-2 h-2 bg-black rounded-full animate-pulse-dot" />
          <span className="font-mono text-sm text-gray-500 uppercase tracking-[0.3em]">
            OPEN FOR WORK IN SOFTWARE ENGINEERING ROLES
          </span>
        </motion.div>

        {/* ── MAIN HEADING — "PRASOON MISHRA" — uses PT Serif ── */}
        <motion.h1
          variants={itemVariants}
          className="font-pt-serif text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-black uppercase tracking-tighter leading-[0.9] mb-6 text-black"
        >
          PRASOON
          <br />
          <span className="text-shimmer">MISHRA</span>
        </motion.h1>

        {/* ── Description — uses Caveat ── */}
        <motion.div variants={itemVariants} className="mb-10">
          <p className="font-caveat text-2xl md:text-3xl text-gray-600 max-w-2xl leading-relaxed">
            {personalInfo.tagline}
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-4 font-caveat text-lg text-gray-400 tracking-wide">
            <span>Full-Stack Developer</span>
            <span className="text-black/20">•</span>
            <span>C++ Competitive Programmer</span>
            <span className="text-black/20">•</span>
            <span>Community Leader</span>
          </div>
        </motion.div>

        {/* ── CTA buttons — uses Jersey 20 ── */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-0">
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.03, backgroundColor: "#000", color: "#fff" }}
            whileTap={{ scale: 0.97 }}
            className="font-jersey flex items-center gap-3 border border-black/30 px-8 py-3 rounded-full text-base uppercase tracking-widest transition-all duration-300 text-black"
          >
            EXPLORE ME
            <ArrowDown size={16} />
          </motion.a>

          <div className="flex gap-3">
            <SocialIcon href={personalInfo.socials.github} icon={<Github size={20} />} label="GitHub" />
            <SocialIcon href={personalInfo.socials.linkedin} icon={<Linkedin size={20} />} label="LinkedIn" />
            <SocialIcon href={`mailto:${personalInfo.email}`} icon={<Mail size={20} />} label="Email" />
          </div>
        </motion.div>

        {/* ── About Me section ── */}
        <motion.div
          variants={itemVariants}
          className="mt-24 flex flex-col md:flex-row items-center gap-8 md:gap-12"
        >
{/* Image */}
<div className="relative flex-shrink-0 manga-corners">
  <div className="w-[260px] h-[340px] bg-[#f5f5f5] border-2 border-black/10 rounded-2xl flex items-center justify-center overflow-hidden group hover:border-black/25 transition-all duration-300">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img 
      src={img99} 
      alt="Profile" 
      className="w-full h-full object-cover" 
    />
  </div>
</div>

          {/* Cursive arrow SVG */}
          <div className="hidden md:block flex-shrink-0">
            <svg width="120" height="60" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <motion.path
                d="M5 30 C20 10, 40 50, 60 30 C80 10, 95 35, 110 25"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
              <motion.path
                d="M105 20 L112 26 L104 30"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2, duration: 0.3 }}
              />
            </svg>
          </div>

          {/* About paragraph */}
          <div className="flex-1 max-w-md">
            {/* Title card heading — PT Serif */}
            <h3 className="font-pt-serif text-2xl font-bold text-black mb-3">About Me</h3>
            {/* Description — Caveat */}
            <p className="font-caveat text-xl text-gray-600 leading-relaxed">
              A passionate full-stack developer and competitive programmer from VIT Bhopal, driven by the spirit of One Piece. I build production-grade systems, solve complex algorithmic challenges, and lead tech communities as a Google Gemini Student Ambassador and HackerRank Campus Ambassador.
            </p>
            {/* Quote — Jersey 20 */}
            <p className="font-jersey text-gray-400 text-base mt-4 tracking-wider">
              &ldquo;The code is the weapon. The keyboard is the battlefield.&rdquo;
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function SocialIcon({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <MagneticElement>
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="text-gray-400 flex items-center justify-center p-3 rounded-full bg-black/5 border border-black/10 transition-colors duration-300 hover:text-black hover:border-black/30"
        whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
        whileTap={{ scale: 0.9 }}
      >
        {icon}
      </motion.a>
    </MagneticElement>
  );
}

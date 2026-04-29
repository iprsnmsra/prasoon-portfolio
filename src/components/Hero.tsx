"use client";

import { motion, Variants } from "framer-motion";
import { Github, Linkedin, Instagram, Mail, MapPin, Gamepad2, Dumbbell } from "lucide-react";
import { personalInfo } from "../data/projects";
import Link from "next/link"; 
import MagneticElement from "./MagneticElement"; // <-- Added Magnetic Physics Import

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  };

  return (
    <section className="min-h-screen flex flex-col justify-center px-8 md:px-24 bg-transparent text-white overflow-hidden relative">
      {/* Background Graphic Element */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.05, scale: 1 }}
        transition={{ duration: 2 }}
        className="absolute top-[-10%] right-[-5%] text-[20rem] font-black pointer-events-none select-none"
      >
        MERN
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="z-10 relative"
      >
        {/* Location & Hobbies Badges */}
        <motion.div variants={itemVariants} className="flex flex-wrap gap-4 items-center mb-6 text-sm text-gray-400 font-mono">
          <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full">
            <MapPin size={14} /> {personalInfo.location}
          </span>
          
          <Link href="/gym" className="inline-block">
            <motion.div 
              whileHover={{ scale: 1.05, backgroundColor: "#ffffff", color: "#f87171" }} 
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full text-red-400 cursor-none transition-colors"
            >
              <Dumbbell size={14} /> Gym Rat
            </motion.div>
          </Link>

          <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full text-purple-400">
            <Gamepad2 size={14} /> Gamer
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1 
          variants={itemVariants}
          className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-4"
        >
          HELLO, I'M <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
            {personalInfo.name.split(' ')[0]}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.h2 
            variants={itemVariants}
            className="text-xl md:text-3xl font-light text-gray-300 mb-8 max-w-2xl"
        >
            {personalInfo.role}. I build data-driven systems, secure architectures, and immersive digital experiences.
        </motion.h2>

        {/* Social Icons with MAGNETIC PHYSICS */}
        <motion.div variants={itemVariants} className="flex gap-6">
          <SocialIcon href={personalInfo.socials.github} icon={<Github size={24} />} label="GitHub" hoverColor="hover:text-gray-300 hover:border-gray-300" />
          <SocialIcon href={personalInfo.socials.linkedin} icon={<Linkedin size={24} />} label="LinkedIn" hoverColor="hover:text-blue-500 hover:border-blue-500" />
          <SocialIcon href={personalInfo.socials.instagram} icon={<Instagram size={24} />} label="Instagram" hoverColor="hover:text-pink-500 hover:border-pink-500" />
          <SocialIcon href={`mailto:${personalInfo.email}`} icon={<Mail size={24} />} label="Email" hoverColor="hover:text-green-400 hover:border-green-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// Re-engineered Social Icon with Magnetic Wrapper
function SocialIcon({ href, icon, label, hoverColor }: { href: string, icon: React.ReactNode, label: string, hoverColor: string }) {
  return (
    <MagneticElement>
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className={`text-gray-500 flex items-center justify-center p-4 rounded-full bg-white/5 border border-white/10 transition-colors duration-300 ${hoverColor} cursor-none`}
        whileHover={{ 
          scale: 1.15, 
          transition: { duration: 0.2 }
        }}
        whileTap={{ scale: 0.9 }} 
      >
        {icon}
      </motion.a>
    </MagneticElement>
  );
}
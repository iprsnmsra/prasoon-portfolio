"use client";

import { motion, Variants } from "framer-motion"; // <-- 1. Added Variants import
import { MoveLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { gymImages } from "../../data/projects";

export default function GymPage() {
  // <-- 2. Added ': Variants' to satisfy TypeScript
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  // <-- 3. Added ': Variants' here too
  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -5, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 15 },
    },
  };

  return (
    <main className="bg-[#0a0a0a] min-h-screen text-white font-sans selection:bg-red-500">
      {/* Header with animated back button */}
      <nav className="py-8 px-8 md:px-24 flex items-center justify-between border-b border-white/10">
        <Link href="/" passHref>
          <motion.div 
            whileHover={{ x: -5, color: "#f87171" }}
            className="flex items-center gap-2 text-gray-400 font-mono text-sm tracking-widest uppercase cursor-pointer transition-colors"
          >
            <MoveLeft size={16} /> Home
          </motion.div>
        </Link>
        <div className="font-black text-xl tracking-widest uppercase cursor-pointer">
          PRASOON<span className="text-red-500">.</span>
        </div>
      </nav>

      {/* Hero Header */}
      <section className="py-24 px-8 md:px-24 max-w-[1600px] mx-auto">
        <h2 className="text-7xl md:text-9xl font-black text-white uppercase tracking-tighter mb-4 leading-none">
          Power &<br/> Discipline<span className="text-red-500">.</span>
        </h2>
        <p className="text-gray-400 font-mono text-xl max-w-xl">
          Showcasing immersive environments, gaming tech, and the physical discipline that drives engineering output.
        </p>
      </section>

      {/* DYNAMIC, ANIMATED GALLERY GRID */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        viewport={{ once: true }}
        className="pb-32 px-8 md:px-24 max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {gymImages.map((src, index) => (
          <motion.div 
            key={index}
            variants={imageVariants}
            className={`
              relative overflow-hidden rounded-3xl group cursor-pointer border border-white/10 aspect-square
              ${index === 0 ? "lg:col-span-2 lg:row-span-2 aspect-auto" : ""}
            `}
            whileHover={{ scale: 1.03, zIndex: 10 }}
            transition={{ duration: 0.4 }}
          >
            {/* Using next/image for automatic optimization */}
            <Image 
              src={src} 
              alt={`Prasoon Mishra Gym / Environment Photo ${index + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
              priority={index < 3} 
            />
            {/* Glossy overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
               <p className="text-red-400 font-mono font-black text-4xl">0{index+1}</p>
            </div>
          </motion.div>
        ))}
      </motion.section>

      {/* Simple Footer */}
       <footer className="border-t border-white/10 text-center py-10 font-mono text-xs text-gray-500">
         PRASOON MISHRA GALLERY | © {new Date().getFullYear()}
       </footer>
    </main>
  );
}
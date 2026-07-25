"use client";

import { motion, Variants } from "framer-motion";
import { MoveLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { gymImages } from "../../data/projects";

export default function GymPage() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
  };
  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -5, y: 30 },
    visible: { opacity: 1, scale: 1, rotate: 0, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } },
  };

  return (
    <main className="bg-white min-h-screen text-black font-sans selection:bg-black selection:text-white">
      <nav className="py-8 container-85 flex items-center justify-between border-b border-black/10">
        <Link href="/" passHref>
          <motion.div whileHover={{ x: -5 }} className="flex items-center gap-2 text-gray-400 font-mono text-sm tracking-widest uppercase cursor-pointer hover:text-black transition-colors">
            <MoveLeft size={16} /> Home
          </motion.div>
        </Link>
        <div className="font-black text-xl tracking-widest uppercase">PM<span className="text-gray-300">.</span></div>
      </nav>

      <section className="py-24 container-85">
        <h2 className="text-7xl md:text-9xl font-black text-black uppercase tracking-tighter mb-4 leading-none">
          Power &<br />Discipline<span className="text-gray-300">.</span>
        </h2>
        <p className="text-gray-500 font-mono text-xl max-w-xl">The physical discipline that drives engineering output.</p>
      </section>

      <motion.section variants={containerVariants} initial="hidden" animate="visible" className="pb-32 container-85 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gymImages.map((src, index) => (
          <motion.div key={index} variants={imageVariants}
            className={`relative overflow-hidden rounded-2xl group cursor-pointer border border-black/10 aspect-square ${index === 0 ? "lg:col-span-2 lg:row-span-2 aspect-auto" : ""}`}
            whileHover={{ scale: 1.03, zIndex: 10 }} transition={{ duration: 0.4 }}>
            <Image src={src} alt={`Prasoon Mishra Gym Photo ${index + 1}`} fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" priority={index < 3} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
              <p className="text-white font-mono font-black text-4xl">0{index + 1}</p>
            </div>
          </motion.div>
        ))}
      </motion.section>

      <footer className="border-t border-black/10 text-center py-10 font-mono text-xs text-gray-400">
        PRASOON MISHRA | © {new Date().getFullYear()} All Rights Reserved.
      </footer>
    </main>
  );
}
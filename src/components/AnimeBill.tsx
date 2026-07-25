"use client";

import { motion, Variants } from "framer-motion";
import { animeFavorites } from "../data/projects";

export default function AnimeBill() {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
  };

  return (
    <section id="anime" className="py-32 container-85 text-black relative">
      <div className="absolute top-20 right-0 text-[10rem] font-black text-black/[0.03] leading-none pointer-events-none select-none">ANIME</div>

      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}>
        <motion.div variants={item} className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 bg-black rounded-full animate-pulse-dot" />
            <span className="font-mono text-sm text-gray-400 uppercase tracking-[0.3em]">Beyond the Code</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-black">
            Anime Bill<span className="text-gray-300">.</span>
          </h2>
          <p className="text-gray-500 font-mono mt-4 max-w-2xl text-sm">
            Great developers draw inspiration from everywhere. Here's the anime that fuels my mindset and creativity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {animeFavorites.map((anime, index) => (
            <motion.div key={anime.title} variants={item} className="bg-[#f5f5f5] border border-black/10 rounded-2xl p-6 group hover:border-black/20 transition-all duration-300 relative overflow-hidden" whileHover={{ y: -4 }}>
              <div className="absolute top-4 right-4 text-5xl font-black text-black/[0.04] leading-none">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-black">{anime.title}</h3>
                  <span className="text-black/40 text-xs font-mono whitespace-nowrap ml-2">{anime.rating}</span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{anime.note}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

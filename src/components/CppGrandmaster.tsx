"use client";

import { motion, Variants } from "framer-motion";
import { Target } from "lucide-react";
import { competitiveProgramming } from "../data/projects";

export default function CppGrandmaster() {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } },
  };

  return (
    <section id="cpp" className="py-32 container-85 text-black relative overflow-hidden">
      <div className="absolute top-10 right-0 text-[12rem] font-black text-black/[0.03] leading-none pointer-events-none select-none tracking-tighter">C++</div>

      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}>
        <motion.div variants={item} className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 bg-black rounded-full animate-pulse-dot" />
            <span className="font-mono text-sm text-gray-400 uppercase tracking-[0.3em]">Competitive Programming</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-black">
            {competitiveProgramming.title}<span className="text-gray-300">.</span>
          </h2>
          <p className="text-gray-500 font-mono mt-4 max-w-2xl text-sm leading-relaxed">{competitiveProgramming.description}</p>
        </motion.div>

        <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {competitiveProgramming.stats.map((stat) => (
            <motion.div key={stat.label} variants={item} className="bg-[#f5f5f5] border border-black/10 rounded-2xl p-6 text-center group hover:border-black/25 transition-all duration-300" whileHover={{ y: -4 }}>
              <div className="text-3xl md:text-4xl font-black text-black mb-2 font-mono">{stat.value}</div>
              <div className="text-xs text-gray-400 font-mono uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={item}>
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2 font-mono uppercase tracking-wider text-gray-400">
            <Target size={18} /> Platforms
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {competitiveProgramming.platforms.map((platform) => (
              <motion.div key={platform.name} className="bg-[#f5f5f5] border border-black/10 rounded-xl p-5 group hover:border-black/25 transition-all duration-300" whileHover={{ scale: 1.02 }}>
                <div className="text-black font-bold text-lg mb-1">{platform.name}</div>
                <div className="text-gray-400 font-mono text-sm">@{platform.handle}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={item} className="mt-16 border-l-2 border-black/20 pl-8 py-4">
          <p className="text-xl md:text-2xl font-light italic text-gray-500">
            "I don't want to conquer anything. I just think the guy with the most freedom in this whole ocean... is the Pirate King!"
          </p>
          <p className="text-sm font-mono text-gray-400 mt-3">— Monkey D. Luffy</p>
        </motion.div>
      </motion.div>
    </section>
  );
}

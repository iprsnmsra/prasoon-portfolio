"use client";

import { motion, Variants } from "framer-motion";
import { Cpu } from "lucide-react";
import { dsaTopics } from "../data/projects";

export default function DsaGrandmaster() {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
  };

  return (
    <section id="dsa" className="py-32 container-85 text-black relative">
      <div className="absolute bottom-0 left-0 text-[10rem] font-black text-black/[0.03] leading-none pointer-events-none select-none tracking-tighter">DSA</div>

      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}>
        <motion.div variants={item} className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 bg-black rounded-full animate-pulse-dot" />
            <span className="font-mono text-sm text-gray-400 uppercase tracking-[0.3em]">Data Structures & Algorithms</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-black">
            DSA Grandmaster<span className="text-gray-300">.</span>
          </h2>
          <p className="text-gray-500 font-mono mt-4 max-w-2xl text-sm">
            Mastery across core algorithmic domains. Every topic battle-tested through hundreds of problems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dsaTopics.map((topic, index) => (
            <motion.div key={topic.name} variants={item} className="bg-[#f5f5f5] border border-black/10 rounded-xl p-5 group hover:border-black/25 transition-all duration-300" whileHover={{ y: -2 }}>
              <div className="flex justify-between items-center mb-3">
                <span className="text-black font-semibold text-sm">{topic.name}</span>
                <span className="text-gray-400 font-mono text-xs">{topic.proficiency}%</span>
              </div>
              <div className="h-1.5 bg-black/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-gray-400 to-black rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${topic.proficiency}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.05, ease: [0.33, 1, 0.68, 1] }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={item} className="mt-12 flex items-center gap-4 text-gray-400 font-mono text-sm">
          <Cpu size={16} />
          <span>12 core domains • 500+ problems solved • Consistently improving</span>
        </motion.div>
      </motion.div>
    </section>
  );
}

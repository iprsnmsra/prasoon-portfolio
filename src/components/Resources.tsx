"use client";

import { motion, Variants } from "framer-motion"; // <-- 1. Added Variants here
import { Download, FileText, Gift } from "lucide-react";
import { freeResources } from "../data/projects";

export default function Resources() {
  // <-- 2. Added ': Variants' here to satisfy TypeScript
  const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] } }
  };

  return (
    <section id="resources" className="py-24 px-8 md:px-24 max-w-[1600px] mx-auto text-white">
      <div className="mb-16 flex items-start justify-between gap-8">
        <div>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
            Community <br/> Reward<span className="text-green-400">.</span>
          </h2>
          <p className="text-gray-400 font-mono mt-4 max-w-xl">
            Free notes, cheat sheets, and handbooks to help you learn faster. Built to help people visiting my portfolio.
          </p>
        </div>
        <Gift size={64} className="text-white/10 hidden md:block" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {freeResources.map((resource, index) => (
          <motion.div 
            key={resource.id}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={item}
            transition={{ delay: index * 0.15 }} 
            className="bg-[#111] border-l-4 border-l-green-400 border border-white/10 rounded-2xl p-8 group hover:bg-[#151515] transition-all relative overflow-hidden flex flex-col justify-between"
          >
            <FileText className="absolute -right-4 -bottom-4 text-white/5 w-48 h-48 group-hover:text-green-500/10 transition-colors" />

            <div className="relative z-10">
              <span className="bg-green-400/10 text-green-300 font-mono text-xs px-3 py-1 rounded-full border border-green-500/20">
                {resource.type}
              </span>
              <h3 className="text-2xl font-bold text-white mt-4 mb-3 tracking-tight">
                {resource.title}
              </h3>
              <p className="text-gray-400 text-sm mb-12 leading-relaxed">
                {resource.description}
              </p>
            </div>

            <motion.a 
              href={resource.fileUrl} 
              download 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 w-full justify-center bg-white text-black font-bold py-3 px-6 rounded-full hover:bg-green-400 transition-colors relative z-10 text-sm uppercase tracking-widest font-mono"
            >
              Download PDF <Download size={18} />
            </motion.a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
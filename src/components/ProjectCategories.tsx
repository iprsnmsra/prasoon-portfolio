"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { Code2, Box, Gamepad2, Sparkles, ArrowUpRight } from "lucide-react";
import { projectCategories } from "../data/projects";

const iconMap: Record<string, React.ReactNode> = {
  code: <Code2 size={32} />,
  cube: <Box size={32} />,
  gamepad: <Gamepad2 size={32} />,
  sparkles: <Sparkles size={32} />,
};

export default function ProjectCategories() {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } },
  };

  return (
    <section id="projects" className="py-32 container-85 text-black relative">
      <div className="absolute bottom-0 right-0 text-[10rem] font-black text-black/[0.03] leading-none pointer-events-none select-none tracking-tighter font-pt-serif">WORK</div>

      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}>
        <motion.div variants={item} className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 bg-black rounded-full animate-pulse-dot" />
            <span className="font-jersey text-sm text-gray-400 uppercase tracking-[0.3em]">Selected Work</span>
          </div>
          <h2 className="font-pt-serif text-5xl md:text-7xl font-black uppercase tracking-tighter text-black">
            Projects<span className="text-gray-300">.</span>
          </h2>
          <p className="font-caveat text-xl text-gray-500 mt-4">Click a category to explore the full project collection.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectCategories.map((cat, index) => (
            <motion.div key={cat.id} variants={item}>
              <Link href={`/projects/${cat.id}`} className="block">
                <motion.div
                  whileHover={{ y: -6, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-[#f5f5f5] border border-black/10 rounded-2xl p-10 group hover:border-black/25 transition-all duration-300 relative overflow-hidden cursor-pointer h-full"
                >
                  <div className="absolute top-0 right-0 w-20 h-20 border-b border-l border-black/5 rounded-bl-3xl" />
                  <div className="absolute -bottom-4 -right-4 text-7xl font-black text-black/[0.03] group-hover:text-black/[0.06] transition-colors font-pt-serif">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div className="text-gray-400 group-hover:text-black transition-colors duration-300">
                        {iconMap[cat.icon]}
                      </div>
                      <ArrowUpRight size={20} className="text-gray-300 group-hover:text-black transition-colors" />
                    </div>
                    <h3 className="font-pt-serif text-2xl md:text-3xl font-bold text-black mb-3">{cat.title}</h3>
                    <p className="font-caveat text-lg text-gray-500 leading-relaxed">{cat.description}</p>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

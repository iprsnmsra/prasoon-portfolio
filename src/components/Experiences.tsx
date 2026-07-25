"use client";

import { motion, Variants } from "framer-motion";
import { experiences } from "../data/projects";

export default function Experiences() {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } },
  };

  return (
    <section id="experiences" className="py-32 container-85 text-black relative">
      <div className="absolute top-10 right-0 text-[10rem] font-black text-black/[0.03] leading-none pointer-events-none select-none tracking-tighter font-pt-serif">EXP</div>

      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}>
        <motion.div variants={item} className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 bg-black rounded-full animate-pulse-dot" />
            {/* Jersey 20 — section label */}
            <span className="font-jersey text-sm text-gray-400 uppercase tracking-[0.3em]">Leadership &amp; Roles</span>
          </div>
          {/* PT Serif — main heading */}
          <h2 className="font-pt-serif text-5xl md:text-7xl font-black uppercase tracking-tighter text-black">
            My Experiences<span className="text-gray-300">.</span>
          </h2>
        </motion.div>

        <div className="space-y-10">
          {experiences.map((exp) => (
            <motion.div
              key={exp.id}
              variants={item}
              className="bg-[#f5f5f5] border border-black/10 rounded-2xl p-8 md:p-10 group hover:border-black/20 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Left: Logo + Text */}
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    {/* Company logo placeholder */}
                    <div className="w-12 h-12 bg-black/5 border border-black/10 rounded-xl flex items-center justify-center text-gray-400 font-bold text-lg flex-shrink-0 font-jersey">
                      {exp.company.charAt(0)}
                    </div>
                    <div>
                      {/* PT Serif — card title */}
                      <h3 className="font-pt-serif text-xl md:text-2xl font-bold text-black">{exp.role}</h3>
                      {/* Jersey 20 — company label */}
                      <p className="font-jersey text-sm text-gray-400">{exp.company}</p>
                    </div>
                  </div>
                  {/* Jersey 20 — date badge */}
                  <p className="font-jersey text-xs text-gray-400 uppercase tracking-wider mb-4 border border-black/10 inline-block px-3 py-1 rounded-full">
                    {exp.joinDate}
                  </p>
                  {/* Caveat — description */}
                  <p className="font-caveat text-xl text-gray-500 leading-relaxed">{exp.description}</p>
                </div>

                {/* Right: Welcome kit image placeholder */}
                <div className="flex-shrink-0">
                  <div className="w-[200px] h-[150px] bg-black/5 border border-dashed border-black/15 rounded-xl flex items-center justify-center text-center group-hover:border-black/25 transition-colors">
                    <div className="text-gray-400 text-xs">
                      <div className="text-2xl mb-1">🖼️</div>
                      {/* Jersey 20 — placeholder label */}
                      <p className="font-jersey text-xs">Welcome Kit Image</p>
                      <p className="font-jersey text-[10px] text-gray-300">{exp.company}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

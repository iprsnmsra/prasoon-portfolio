"use client";

import { motion, Variants } from "framer-motion";
import { Building2, ChevronRight, ImagePlus } from "lucide-react";
import { communityRoles } from "../data/projects";

export default function CommunityExperience() {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } },
  };

  return (
    <section id="community" className="py-32 container-85 text-black relative">
      <div className="absolute bottom-10 right-0 text-[8rem] font-black text-black/[0.03] leading-none pointer-events-none select-none font-pt-serif">LEAD</div>

      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}>
        <motion.div variants={item} className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 bg-black rounded-full animate-pulse-dot" />
            {/* Jersey 20 — label/tag text */}
            <span className="font-jersey text-sm text-gray-400 uppercase tracking-[0.3em]">Leadership &amp; Advocacy</span>
          </div>
          {/* PT Serif — section heading */}
          <h2 className="font-pt-serif text-5xl md:text-7xl font-black uppercase tracking-tighter text-black">
            Community<br />Experience<span className="text-gray-300">.</span>
          </h2>
          {/* Caveat — description */}
          <p className="font-caveat text-xl text-gray-500 mt-4 max-w-2xl leading-relaxed">
            Representing global tech companies on campus. Organizing events, mentoring peers, and building communities.
          </p>
        </motion.div>

        <div className="space-y-8">
          {communityRoles.map((role) => (
            <motion.div key={role.id} variants={item} className="bg-[#f5f5f5] border border-black/10 rounded-2xl overflow-hidden group hover:border-black/20 transition-all duration-300">
              <div className="p-8 md:p-10">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Building2 size={18} className="text-gray-400" />
                      {/* Jersey 20 — company tag */}
                      <span className="font-jersey text-sm text-gray-400 uppercase tracking-wider">{role.company}</span>
                    </div>
                    {/* PT Serif — card title */}
                    <h3 className="font-pt-serif text-2xl md:text-3xl font-bold text-black">{role.role}</h3>
                  </div>
                  {/* Jersey 20 — duration badge */}
                  <span className="font-jersey text-sm text-gray-400 whitespace-nowrap border border-black/10 px-4 py-2 rounded-full">{role.duration}</span>
                </div>
                {/* Caveat — description paragraph */}
                <p className="font-caveat text-xl text-gray-500 leading-relaxed mb-6 max-w-3xl">{role.description}</p>
                <div className="space-y-2 mb-8">
                  {role.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm">
                      <ChevronRight size={14} className="text-black/30 mt-0.5 flex-shrink-0" />
                      {/* Caveat — highlight text */}
                      <span className="font-caveat text-lg text-gray-600">{highlight}</span>
                    </div>
                  ))}
                </div>
                <div className="border border-dashed border-black/10 rounded-xl p-6 flex items-center justify-center gap-3 text-gray-400 hover:border-black/20 hover:text-gray-500 transition-colors">
                  <ImagePlus size={20} />
                  {/* Jersey 20 — action label */}
                  <span className="font-jersey text-sm">Add event photos &amp; certificates for {role.company}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

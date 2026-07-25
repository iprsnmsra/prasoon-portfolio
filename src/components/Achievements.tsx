"use client";

import { motion, Variants } from "framer-motion";
import { Trophy, Star } from "lucide-react";
import { achievements } from "../data/projects";

export default function Achievements() {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } },
  };

  const hackathonWins = achievements.filter((a) => a.type === "hackathon");
  const otherAchievements = achievements.filter((a) => a.type === "achievement");

  return (
    <section id="achievements" className="py-32 container-85 text-black relative">
      <div className="absolute top-10 right-0 text-[8rem] font-black text-black/[0.03] leading-none pointer-events-none select-none tracking-tighter font-pt-serif">WIN</div>

      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}>
        <motion.div variants={item} className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 bg-black rounded-full animate-pulse-dot" />
            <span className="font-jersey text-sm text-gray-400 uppercase tracking-[0.3em]">Recognition & Wins</span>
          </div>
          <h2 className="font-pt-serif text-5xl md:text-7xl font-black uppercase tracking-tighter text-black">
            My Technical<br />Achievements<span className="text-gray-300">.</span>
          </h2>
        </motion.div>

        {/* Hackathon Wins */}
        <motion.div variants={item} className="mb-16">
          <h3 className="font-pt-serif text-2xl font-black uppercase mb-8 flex items-center gap-3 tracking-tight text-black">
            <Trophy size={22} className="text-gray-400" /> Hackathon Wins
          </h3>
          <div className="space-y-6">
            {hackathonWins.map((a) => (
              <motion.div key={a.id} variants={item} className="bg-[#f5f5f5] border border-black/10 rounded-2xl p-8 group hover:border-black/20 transition-all duration-300">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="flex-1">
                    <h4 className="font-pt-serif text-xl font-bold text-black mb-3">{a.title}</h4>
                    <p className="font-caveat text-lg text-gray-500 leading-relaxed mb-4">{a.description}</p>
                    <p className="font-jersey text-xs text-gray-400 border border-black/10 inline-block px-3 py-1 rounded-full">Perks: {a.perks}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-[180px] h-[130px] bg-black/5 border border-dashed border-black/15 rounded-xl flex items-center justify-center text-center group-hover:border-black/25 transition-colors">
                      <div className="text-gray-400 text-xs">
                        <div className="text-2xl mb-1">\uD83C\uDFC6</div>
                        <p className="font-jersey">Achievement Image</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Other Achievements */}
        <motion.div variants={item}>
          <h3 className="font-pt-serif text-2xl font-black uppercase mb-8 flex items-center gap-3 tracking-tight text-black">
            <Star size={22} className="text-gray-400" /> Other Achievements
          </h3>
          <div className="space-y-6">
            {otherAchievements.map((a) => (
              <motion.div key={a.id} variants={item} className="bg-[#f5f5f5] border border-black/10 rounded-2xl p-8 group hover:border-black/20 transition-all duration-300">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="flex-1">
                    <h4 className="font-pt-serif text-xl font-bold text-black mb-3">{a.title}</h4>
                    <p className="font-caveat text-lg text-gray-500 leading-relaxed mb-4">{a.description}</p>
                    <p className="font-jersey text-xs text-gray-400 border border-black/10 inline-block px-3 py-1 rounded-full">Perks: {a.perks}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-[180px] h-[130px] bg-black/5 border border-dashed border-black/15 rounded-xl flex items-center justify-center text-center group-hover:border-black/25 transition-colors">
                      <div className="text-gray-400 text-xs">
                        <div className="text-2xl mb-1">\u2B50</div>
                        <p className="font-jersey">Achievement Image</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

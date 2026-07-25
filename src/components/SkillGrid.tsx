"use client";

import { motion, Variants } from "framer-motion";
import { ExternalLink, Award } from "lucide-react";
import { skills, certifications } from "../data/projects";

export default function SkillGrid() {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
  };

  return (
    <section id="skills" className="py-32 container-85 text-black">
      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}>
        <motion.div variants={item} className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 bg-black rounded-full animate-pulse-dot" />
            <span className="font-jersey text-sm text-gray-400 uppercase tracking-[0.3em]">Technical Proficiency</span>
          </div>
          <h2 className="font-pt-serif text-5xl md:text-7xl font-black uppercase tracking-tighter text-black">
            Skills & Certifications<span className="text-gray-300">.</span>
          </h2>
        </motion.div>

        {/* Skills Grid */}
        <motion.div variants={item} className="mb-20">
          <h3 className="font-pt-serif text-2xl font-black uppercase mb-8 tracking-tight text-black">Skills</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {skills.map((skill) => (
              <motion.div
                key={skill.name}
                variants={item}
                whileHover={{ y: -4, scale: 1.05 }}
                className="bg-[#f5f5f5] border border-black/10 rounded-xl p-4 flex flex-col items-center gap-3 group hover:border-black/20 transition-all duration-300"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={skill.iconUrl} alt={skill.name} className="w-10 h-10 object-contain grayscale group-hover:grayscale-0 transition-all duration-300" loading="lazy" />
                <span className="font-jersey text-xs text-gray-500 text-center leading-tight">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div variants={item}>
          <h3 className="font-pt-serif text-2xl font-black uppercase mb-8 flex items-center gap-3 tracking-tight text-black">
            <Award size={22} className="text-gray-400" /> Certifications
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {certifications.map((cert) => (
              <motion.div
                key={cert.id}
                variants={item}
                whileHover={{ y: -4 }}
                className="bg-[#f5f5f5] border border-black/10 rounded-xl overflow-hidden group hover:border-black/20 transition-all duration-300"
              >
                <div className="w-full h-32 bg-black/5 flex items-center justify-center border-b border-black/5">
                  <div className="text-gray-400 text-xs text-center">
                    <div className="text-2xl mb-1">\uD83D\uDCDC</div>
                    <p className="font-jersey">Cert Image {cert.id}</p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="font-pt-serif font-bold text-black text-sm mb-1">{cert.title}</p>
                  <p className="font-jersey text-gray-400 text-xs">{cert.issuer}</p>
                  <p className="font-jersey text-gray-300 text-[10px] mt-1">{cert.date}</p>
                  <div className="mt-3">
                    <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="font-jersey flex items-center gap-1 text-xs text-gray-400 hover:text-black transition-colors">
                      <ExternalLink size={12} /> View Credential
                    </a>
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
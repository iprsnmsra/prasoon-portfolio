"use client";

import { motion, Variants } from "framer-motion";
import { Download, FileText } from "lucide-react";
import { freeResources } from "../data/projects";

export default function Resources() {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] } },
  };

  return (
    <section id="resources" className="py-32 container-85 text-black">
      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}>
        <motion.div variants={item} className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 bg-black rounded-full animate-pulse-dot" />
            <span className="font-jersey text-sm text-gray-400 uppercase tracking-[0.3em]">Free Downloads</span>
          </div>
          <h2 className="font-pt-serif text-5xl md:text-7xl font-black uppercase tracking-tighter text-black">
            My Open Source<br />Free Resources<span className="text-gray-300">.</span>
          </h2>
          <p className="font-caveat text-xl text-gray-500 mt-4 max-w-xl">Free cheat sheets and notes to help you learn faster.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {freeResources.map((resource) => (
            <motion.div
              key={resource.id}
              variants={item}
              whileHover={{ y: -4 }}
              className="bg-[#f5f5f5] border border-black/10 rounded-xl p-6 group hover:border-black/20 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="mb-6">
                <FileText size={24} className="text-gray-300 mb-4 group-hover:text-black/50 transition-colors" />
                <h3 className="font-pt-serif font-bold text-black text-base tracking-tight">{resource.title}</h3>
              </div>
              <motion.a
                href={resource.fileUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="font-jersey flex items-center gap-2 w-full justify-center bg-black text-white font-bold py-2.5 px-4 rounded-full hover:bg-gray-800 transition-colors text-xs uppercase tracking-widest"
              >
                <Download size={14} /> Download PDF
              </motion.a>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
"use client";

import { motion, Variants } from "framer-motion"; // <-- Variant type fix added here
import { Code2, Gamepad2, Award, ExternalLink, Zap } from "lucide-react";
import { detailedCertifications } from "../data/projects";

export default function SkillGrid() {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  return (
    <section id="skills" className="py-24 px-8 md:px-24 max-w-[1600px] mx-auto text-white">
      <div className="mb-16">
        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
          The Arsenal<span className="text-orange-500">.</span>
        </h2>
        <p className="text-gray-400 font-mono mt-4">Technologies, engines, and achievements.</p>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]" // Increased row height for cert details
      >
        {/* Full Stack Box */}
        <motion.div variants={item} className="md:col-span-2 bg-[#111] border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:border-orange-500/50 transition-colors">
          <Code2 className="absolute -right-4 -bottom-4 text-white/5 w-64 h-64 group-hover:text-orange-500/10 transition-colors" />
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Code2 className="text-orange-500" /> Full-Stack Engineering
            </h3>
            <p className="text-gray-400 mb-6 font-mono text-sm">Scalable MERN architectures and real-time systems.</p>
            <div className="flex flex-wrap gap-2">
              {['React', 'Next.js', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS', 'WebSockets', 'AWS'].map(skill => (
                <span key={skill} className="bg-white/10 px-4 py-2 rounded-lg text-sm font-medium border border-white/5">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Game Dev Box */}
        <motion.div variants={item} className="bg-[#111] border border-white/10 rounded-3xl p-8 hover:border-purple-500/50 transition-colors group relative overflow-hidden">
          <Gamepad2 className="absolute -right-4 -bottom-4 text-white/5 w-48 h-48 group-hover:text-purple-500/10 transition-colors" />
          <div className="relative z-10">
             <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Gamepad2 className="text-purple-500" /> Game Dev
            </h3>
            <p className="text-gray-400 mb-6 font-mono text-sm">3D world building and C# scripting.</p>
            <div className="flex flex-wrap gap-2">
              {['Unity', 'Unreal Engine 5', 'Blender', 'C#', 'C++'].map(skill => (
                <span key={skill} className="bg-purple-500/10 text-purple-300 border border-purple-500/20 px-3 py-1 rounded-lg text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Detailed Certification Box (Takes up 2/3 space now) */}
        <motion.div variants={item} className="md:col-span-2 bg-[#111] border border-white/10 rounded-3xl p-8 overflow-y-auto hover:border-orange-500/50 transition-colors">
          <h3 className="text-2xl font-black uppercase mb-6 flex items-center gap-2 tracking-tight text-white">
            <Zap size={24} className="text-orange-500" /> Professional Commendations
          </h3>
          <div className="space-y-4">
            {detailedCertifications.map(cert => (
              <div key={cert.id} className="bg-white/5 border border-white/5 rounded-xl p-4 font-mono text-sm flex justify-between items-start gap-4 hover:bg-white/10 transition-colors">
                <div>
                    <p className="font-bold text-white text-base">{cert.title}</p>
                    <p className="text-gray-400">{cert.issuer} • {cert.date}</p>
                    <p className="text-xs text-orange-400 mt-1">ID: {cert.credentialId}</p>
                </div>
                <a 
                  href={cert.credentialUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2 bg-orange-500 text-black rounded-full hover:bg-white transition-colors"
                >
                  <ExternalLink size={16} />
                </a>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Core Langs Box */}
        <motion.div variants={item} className="bg-[#111] border border-white/10 rounded-3xl p-8 flex flex-col justify-center group hover:border-white/30 transition-colors">
             <h3 className="text-xl font-bold mb-2 text-white">Core Logic & Security</h3>
             <p className="text-gray-400 font-mono text-sm mb-4">Algorithmic problem solving and threat analysis.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <span className="text-4xl font-black text-white/20 group-hover:text-white transition-colors">DSA</span>
            <span className="text-4xl font-black text-white/20 group-hover:text-white transition-colors">AI</span>
            <span className="text-4xl font-black text-white/20 group-hover:text-white transition-colors">MERN</span>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}
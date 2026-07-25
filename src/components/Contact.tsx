"use client";

import { motion, Variants } from "framer-motion";
import { Mail, Github, Linkedin, Instagram, Copy } from "lucide-react";
import { useState } from "react";
import { personalInfo } from "../data/projects";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const container: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
  };

  const socials = [
    { icon: <Github size={20} />, href: personalInfo.socials.github, label: "GitHub" },
    { icon: <Linkedin size={20} />, href: personalInfo.socials.linkedin, label: "LinkedIn" },
    { icon: <Instagram size={20} />, href: personalInfo.socials.instagram, label: "Instagram" },
    { icon: <Mail size={20} />, href: `mailto:${personalInfo.email}`, label: "Email" },
  ];

  return (
    <section id="contact" className="py-32 container-85 text-black">
      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="text-center">
        <motion.div variants={item} className="mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-2 h-2 bg-black rounded-full animate-pulse-dot" />
            <span className="font-mono text-sm text-gray-400 uppercase tracking-[0.3em]">Get in Touch</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-black">
            Let's Connect<span className="text-gray-300">.</span>
          </h2>
        </motion.div>

        <motion.div variants={item} className="mb-12">
          <div className="inline-flex items-center gap-4 bg-[#f5f5f5] border border-black/10 rounded-2xl px-8 py-5 group hover:border-black/20 transition-all duration-300">
            <Mail size={20} className="text-gray-400" />
            <a href={`mailto:${personalInfo.email}`} className="text-lg md:text-xl font-mono text-black hover:text-gray-600 transition-colors">{personalInfo.email}</a>
            <motion.button onClick={copyEmail} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-2 rounded-lg bg-black/5 hover:bg-black/10 transition-colors text-gray-400 hover:text-black" title="Copy email">
              {copied ? <span className="text-xs font-mono text-black">Copied!</span> : <Copy size={16} />}
            </motion.button>
          </div>
        </motion.div>

        <motion.div variants={item} className="flex justify-center gap-4">
          {socials.map((social) => (
            <motion.a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} whileHover={{ y: -4, scale: 1.05 }} whileTap={{ scale: 0.95 }} className="p-4 rounded-xl bg-[#f5f5f5] border border-black/10 text-gray-400 hover:text-black hover:border-black/25 transition-all duration-300">
              {social.icon}
            </motion.a>
          ))}
        </motion.div>

        <motion.p variants={item} className="mt-12 text-gray-400 font-mono text-sm">
          Open to opportunities, collaborations, and interesting conversations.
        </motion.p>
      </motion.div>
    </section>
  );
}

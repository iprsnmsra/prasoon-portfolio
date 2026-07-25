"use client";

import { motion, Variants } from "framer-motion";
import { Mail, Github, Linkedin, Instagram, Copy, Send, MoveLeft } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { personalInfo } from "@/data/projects";

export default function ContactPage() {
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");
  const [sent, setSent] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setEmail("");
    setQuery("");
  };

  const container: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
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
    <main className="bg-white min-h-screen text-black font-sans selection:bg-black selection:text-white">
      <nav className="py-8 container-85 flex items-center justify-between border-b border-black/10">
        <Link href="/">
          <motion.div whileHover={{ x: -5 }} className="font-jersey flex items-center gap-2 text-gray-400 text-sm tracking-widest uppercase cursor-pointer hover:text-black transition-colors">
            <MoveLeft size={16} /> Home
          </motion.div>
        </Link>
        <Link href="/" className="font-pt-serif font-black text-xl tracking-widest uppercase">
          PM<span className="text-gray-300">.</span>
        </Link>
      </nav>

      <motion.section variants={container} initial="hidden" animate="show" className="py-24 container-85">
        <motion.div variants={item} className="mb-16">
          <h1 className="font-pt-serif text-5xl md:text-7xl font-black text-black uppercase tracking-tighter leading-none">
            Get in Touch<span className="text-gray-300">.</span>
          </h1>
          <p className="font-caveat text-xl text-gray-500 mt-4">Open to opportunities, collaborations, and interesting conversations.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <motion.div variants={item}>
            <h3 className="font-pt-serif text-xl font-bold mb-6 text-black">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="contact-email" className="font-jersey block text-xs text-gray-400 uppercase tracking-wider mb-2">Your Email</label>
                <input id="contact-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="your@email.com" className="font-caveat w-full bg-[#f5f5f5] border border-black/10 rounded-xl px-5 py-3 text-black text-lg placeholder:text-gray-300 focus:outline-none focus:border-black/30 transition-colors" />
              </div>
              <div>
                <label htmlFor="contact-query" className="font-jersey block text-xs text-gray-400 uppercase tracking-wider mb-2">Your Message</label>
                <textarea id="contact-query" value={query} onChange={(e) => setQuery(e.target.value)} required rows={5} placeholder="What would you like to discuss?" className="font-caveat w-full bg-[#f5f5f5] border border-black/10 rounded-xl px-5 py-3 text-black text-lg placeholder:text-gray-300 focus:outline-none focus:border-black/30 transition-colors resize-none" />
              </div>
              <motion.button type="submit" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="font-jersey flex items-center gap-3 bg-black text-white font-bold py-3 px-8 rounded-full hover:bg-gray-800 transition-colors text-sm uppercase tracking-widest">
                {sent ? "Sent \u2713" : "Send"} <Send size={16} />
              </motion.button>
            </form>
          </motion.div>

          <motion.div variants={item} className="space-y-8">
            <div>
              <h3 className="font-pt-serif text-xl font-bold mb-4 text-black">Email</h3>
              <div className="flex items-center gap-3 bg-[#f5f5f5] border border-black/10 rounded-xl px-5 py-4">
                <Mail size={18} className="text-gray-400" />
                <a href={`mailto:${personalInfo.email}`} className="font-jersey text-sm text-black hover:text-gray-600 transition-colors">{personalInfo.email}</a>
                <motion.button onClick={copyEmail} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="ml-auto p-2 rounded-lg bg-black/5 hover:bg-black/10 transition-colors text-gray-400 hover:text-black">
                  {copied ? <span className="font-jersey text-xs">Copied!</span> : <Copy size={14} />}
                </motion.button>
              </div>
            </div>
            <div>
              <h3 className="font-pt-serif text-xl font-bold mb-4 text-black">Socials</h3>
              <div className="flex gap-3">
                {socials.map((social) => (
                  <motion.a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} whileHover={{ y: -4, scale: 1.05 }} whileTap={{ scale: 0.95 }} className="p-4 rounded-xl bg-[#f5f5f5] border border-black/10 text-gray-400 hover:text-black hover:border-black/25 transition-all duration-300">
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <footer className="border-t border-black/10 text-center py-10 font-jersey text-xs text-gray-400">
        PRASOON MISHRA | \u00A9 {new Date().getFullYear()} All Rights Reserved.
      </footer>
    </main>
  );
}

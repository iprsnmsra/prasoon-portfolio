"use client";

import { motion, Variants } from "framer-motion";
import { Send } from "lucide-react";
import { useState } from "react";

export default function ContactForm() {
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setEmail("");
    setQuery("");
  };

  const container: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
  };

  return (
    <section className="py-32 container-85 text-black">
      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}>
        <motion.div variants={item} className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 bg-black rounded-full animate-pulse-dot" />
            <span className="font-jersey text-sm text-gray-400 uppercase tracking-[0.3em]">Reach Out</span>
          </div>
          <h2 className="font-pt-serif text-4xl md:text-5xl font-black uppercase tracking-tighter text-black">
            Send a Message<span className="text-gray-300">.</span>
          </h2>
        </motion.div>

        <motion.form variants={item} onSubmit={handleSubmit} className="max-w-xl space-y-6">
          <div>
            <label htmlFor="email" className="font-jersey block text-xs text-gray-400 uppercase tracking-wider mb-2">Send Email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="your@email.com" className="font-caveat w-full bg-[#f5f5f5] border border-black/10 rounded-xl px-5 py-3 text-black text-lg placeholder:text-gray-300 focus:outline-none focus:border-black/30 transition-colors" />
          </div>
          <div>
            <label htmlFor="query" className="font-jersey block text-xs text-gray-400 uppercase tracking-wider mb-2">Ask Query</label>
            <textarea id="query" value={query} onChange={(e) => setQuery(e.target.value)} required rows={4} placeholder="What would you like to discuss?" className="font-caveat w-full bg-[#f5f5f5] border border-black/10 rounded-xl px-5 py-3 text-black text-lg placeholder:text-gray-300 focus:outline-none focus:border-black/30 transition-colors resize-none" />
          </div>
          <motion.button type="submit" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="font-jersey flex items-center gap-3 bg-black text-white font-bold py-3 px-8 rounded-full hover:bg-gray-800 transition-colors text-sm uppercase tracking-widest">
            {sent ? "Sent \u2713" : "Send"} <Send size={16} />
          </motion.button>
        </motion.form>
      </motion.div>
    </section>
  );
}

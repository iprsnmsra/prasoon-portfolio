"use client";

import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 md:px-24 py-6 mix-blend-difference text-white"
    >
      {/* Your Logo / Brand */}
      <div className="font-black text-xl tracking-widest uppercase cursor-pointer">
        PRASOON<span className="text-red-500">.</span>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex gap-8 font-mono text-sm tracking-widest">
        <NavLink href="#about">ABOUT</NavLink>
        <NavLink href="#projects">PROJECTS</NavLink>
        <NavLink href="#skills">SKILLS</NavLink>
      </div>

      {/* Resume Button */}
      <motion.a 
        href="#" 
        whileHover={{ scale: 1.05, backgroundColor: "#ffffff", color: "#000000" }}
        whileTap={{ scale: 0.95 }}
        className="border border-white/30 px-6 py-2 rounded-full font-mono text-xs uppercase tracking-widest transition-colors"
      >
        Resume
      </motion.a>
    </motion.nav>
  );
}

// Small helper component for the hover effect on links
function NavLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <motion.a 
      href={href} 
      whileHover={{ y: -2, color: "#f87171" }} // Changes to red on hover
      className="transition-colors"
    >
      {children}
    </motion.a>
  );
}
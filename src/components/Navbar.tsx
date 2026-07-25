"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center bg-white/80 backdrop-blur-md border-b border-black/5"
    >
      <div className="container-85 flex justify-between items-center py-5">
        <Link href="/" className="font-pt-serif font-black text-xl tracking-widest uppercase text-black">
          PM<span className="text-gray-300">.</span>
        </Link>

        <div className="flex items-center gap-2 md:gap-3">
          <NavTag href="#projects">Projects</NavTag>
          <NavTag href="#skills">Skills</NavTag>
          <NavTag href="/contact" isPage>Contact</NavTag>
          <motion.a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, backgroundColor: "#000", color: "#fff" }}
            whileTap={{ scale: 0.95 }}
            className="font-jersey border border-black/20 px-4 md:px-5 py-2 rounded-full text-xs md:text-sm uppercase tracking-widest transition-all duration-300 text-black hidden sm:block"
          >
            My Resume
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
}

function NavTag({ href, children, isPage }: { href: string; children: React.ReactNode; isPage?: boolean }) {
  if (isPage) {
    return (
      <motion.div whileHover={{ scale: 1.05, y: -1 }} whileTap={{ scale: 0.95 }}>
        <Link
          href={href}
          className="font-jersey border border-black/15 px-4 md:px-5 py-2 rounded-full text-xs md:text-sm uppercase tracking-widest text-gray-500 hover:text-black hover:border-black/30 transition-all duration-300"
        >
          {children}
        </Link>
      </motion.div>
    );
  }
  return (
    <motion.div whileHover={{ scale: 1.05, y: -1 }} whileTap={{ scale: 0.95 }}>
      <a
        href={href}
        className="font-jersey border border-black/15 px-4 md:px-5 py-2 rounded-full text-xs md:text-sm uppercase tracking-widest text-gray-500 hover:text-black hover:border-black/30 transition-all duration-300"
      >
        {children}
      </a>
    </motion.div>
  );
}
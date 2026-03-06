"use client";

import { motion } from "framer-motion";

export default function Marquee() {
  return (
    <div className="py-12 bg-gradient-to-r from-orange-500 to-red-600 text-black overflow-hidden flex whitespace-nowrap border-y border-white/20">
      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: "-50%" }}
        transition={{ 
          repeat: Infinity, 
          ease: "linear", 
          duration: 15 // Adjust this number to make it faster or slower
        }}
        className="text-5xl md:text-7xl font-black uppercase flex gap-16 px-8 tracking-tighter"
      >
        {/* We duplicate the text so it loops seamlessly */}
        <span>DEVELOP DATA SYSTEMS</span>
        <span>•</span>
        <span>BUILD IMMERSIVE GAMES</span>
        <span>•</span>
        <span>ENGINEER CYBERSECURITY</span>
        <span>•</span>
        <span>DEVELOP DATA SYSTEMS</span>
        <span>•</span>
        <span>BUILD IMMERSIVE GAMES</span>
        <span>•</span>
        <span>ENGINEER CYBERSECURITY</span>
        <span>•</span>
      </motion.div>
    </div>
  );
}
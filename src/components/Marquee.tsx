"use client";

import { motion } from "framer-motion";
import { VT323 } from "next/font/google";

// Initialize the pixel font
const pixelFont = VT323({ 
  weight: "400", 
  subsets: ["latin"],
  display: "swap" 
});

export default function Marquee() {
  return (
    <div className="py-10 bg-gradient-to-r from-orange-500 to-red-600 text-black overflow-hidden flex whitespace-nowrap border-y border-white/20">
      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: "-50%" }}
        transition={{ 
          repeat: Infinity, 
          ease: "linear", 
          duration: 20 // Slightly slowed down to make the pixel font easier to read
        }}
        // We inject the pixelFont.className here to change ONLY this section
        className={`${pixelFont.className} text-6xl md:text-8xl tracking-widest flex gap-16 px-8 uppercase`}
      >
        {/* We duplicate the text so it loops seamlessly */}
        <span>DEVELOP DATA SYSTEMS</span>
        <span className="opacity-50">•</span>
        <span>BUILD IMMERSIVE GAMES</span>
        <span className="opacity-50">•</span>
        <span>ENGINEER CYBERSECURITY</span>
        <span className="opacity-50">•</span>
        <span>DEVELOP DATA SYSTEMS</span>
        <span className="opacity-50">•</span>
        <span>BUILD IMMERSIVE GAMES</span>
        <span className="opacity-50">•</span>
        <span>ENGINEER CYBERSECURITY</span>
        <span className="opacity-50">•</span>
      </motion.div>
    </div>
  );
}
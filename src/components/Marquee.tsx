"use client";

import { motion } from "framer-motion";

export default function Marquee() {
  return (
    <div className="py-8 bg-black text-white overflow-hidden flex whitespace-nowrap border-y border-black/10">
      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: "-50%" }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 25,
        }}
        className="font-black text-5xl md:text-7xl tracking-tighter flex gap-12 px-8 uppercase"
      >
        <span>C++ GRANDMASTER</span>
        <span className="opacity-20">◆</span>
        <span>DSA EXPERT</span>
        <span className="opacity-20">◆</span>
        <span>FULL-STACK DEVELOPER</span>
        <span className="opacity-20">◆</span>
        <span>OPEN SOURCE</span>
        <span className="opacity-20">◆</span>
        <span>COMPETITIVE PROGRAMMING</span>
        <span className="opacity-20">◆</span>
        <span>C++ GRANDMASTER</span>
        <span className="opacity-20">◆</span>
        <span>DSA EXPERT</span>
        <span className="opacity-20">◆</span>
        <span>FULL-STACK DEVELOPER</span>
        <span className="opacity-20">◆</span>
        <span>OPEN SOURCE</span>
        <span className="opacity-20">◆</span>
        <span>COMPETITIVE PROGRAMMING</span>
        <span className="opacity-20">◆</span>
      </motion.div>
    </div>
  );
}
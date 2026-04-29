"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { VT323 } from "next/font/google";

const pixelFont = VT323({ weight: "400", subsets: ["latin"] });

export default function BootSequence() {
  const [isLoading, setIsLoading] = useState(true);
  const [textIndex, setTextIndex] = useState(0);

  const messages = [
    "INITIALIZING KERNEL...",
    "LOADING MERN PROTOCOLS...",
    "COMPILING 3D ENVIRONMENTS...",
    "ESTABLISHING SECURE CONNECTION...",
    "ACCESS GRANTED."
  ];

  useEffect(() => {
    // Reveal a new line of text every 400ms
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev < messages.length - 1 ? prev + 1 : prev));
    }, 400);

    // Destroy the loading screen after 2.5 seconds
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[10000] bg-[#050505] flex flex-col items-center justify-center text-red-500"
        >
          <div className={`${pixelFont.className} text-2xl md:text-4xl tracking-widest text-left w-[300px] md:w-[500px]`}>
            <p className="mb-4 text-white">PRASOON_OS v1.0.0</p>
            {messages.map((msg, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: i <= textIndex ? 1 : 0 }}
                className={i === messages.length - 1 && i === textIndex ? "text-green-500 mt-4 animate-pulse font-bold" : ""}
              >
                {i <= textIndex ? `> ${msg}` : ""}
              </motion.p>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const greetings = [
  { text: "Namaste", lang: "Hindi" },
  { text: "Hello", lang: "English" },
  { text: "\u4F60\u597D", lang: "Chinese" },
  { text: "\u3053\u3093\u306B\u3061\u306F", lang: "Japanese" },
  { text: "Hola", lang: "Spanish" },
  { text: "Bonjour", lang: "French" },
  { text: "\u0645\u0631\u062D\u0628\u0627", lang: "Arabic" },
  { text: "\u0C28\u0C2E\u0C38\u0C4D\u0C24\u0C47", lang: "Telugu" },
  { text: "\u0BB5\u0BA3\u0B95\u0BCD\u0B95\u0BAE\u0BCD", lang: "Tamil" },
  { text: "Ciao", lang: "Italian" },
  { text: "Ol\u00E1", lang: "Portuguese" },
  { text: "\u041F\u0440\u0438\u0432\u0435\u0442", lang: "Russian" },
  { text: "\uC548\uB155\uD558\uC138\uC694", lang: "Korean" },
  { text: "Hallo", lang: "German" },
  { text: "\u0E2A\u0E27\u0E31\u0E2A\u0E14\u0E35", lang: "Thai" },
  { text: "Xin ch\u00E0o", lang: "Vietnamese" },
  { text: "Merhaba", lang: "Turkish" },
  { text: "Hej", lang: "Swedish" },
  { text: "Sawubona", lang: "Zulu" },
  { text: "Aloha", lang: "Hawaiian" },
];

export default function BootSequence() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const greetingInterval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % greetings.length);
    }, 400);
    const timeout = setTimeout(() => setIsLoading(false), 3500);
    return () => {
      clearInterval(greetingInterval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[10000] bg-white flex flex-col items-center justify-center"
        >
          <AnimatePresence mode="wait">
            <motion.h1
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="font-pt-serif text-6xl md:text-8xl font-black text-black tracking-tight"
            >
              {greetings[currentIndex].text}
            </motion.h1>
          </AnimatePresence>

          <motion.p
            key={`lang-${currentIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-jersey text-gray-400 text-sm mt-4 tracking-widest uppercase"
          >
            {greetings[currentIndex].lang}
          </motion.p>

          <div className="mt-10 w-72 md:w-[450px] h-10 relative">
            <svg viewBox="0 0 450 35" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="ink-roughness">
                  <feTurbulence type="turbulence" baseFrequency="0.04" numOctaves="3" result="turbulence" />
                  <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="3" xChannelSelector="R" yChannelSelector="G" />
                </filter>
              </defs>
              <motion.path d="M5 18 C30 8, 60 28, 100 16 C140 4, 170 26, 220 17 C270 8, 300 25, 340 15 C370 8, 410 22, 445 17" stroke="black" strokeWidth="3.5" strokeLinecap="round" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, ease: "easeInOut" }} style={{ filter: "url(#ink-roughness)" }} />
              <motion.circle cx="225" cy="8" r="2" fill="black" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 0.3, scale: 1 }} transition={{ delay: 1.5, duration: 0.3 }} />
              <motion.circle cx="340" cy="28" r="1.5" fill="black" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 0.2, scale: 1 }} transition={{ delay: 2, duration: 0.3 }} />
              <motion.circle cx="100" cy="5" r="1" fill="black" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 0.15, scale: 1 }} transition={{ delay: 1, duration: 0.3 }} />
            </svg>
          </div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} transition={{ delay: 1 }} className="font-jersey mt-8 text-xs text-gray-300 uppercase tracking-[0.3em]">
            Loading portfolio...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
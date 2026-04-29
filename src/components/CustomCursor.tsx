"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, [isVisible]);

  // Hide custom cursor on mobile devices
  if (typeof window !== "undefined" && window.innerWidth < 768) return null;

  return (
    <>
      {/* The core dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-red-500 rounded-full mix-blend-screen pointer-events-none z-[9999]"
        animate={{ x: mousePosition.x - 6, y: mousePosition.y - 6, opacity: isVisible ? 1 : 0 }}
        transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
      />
      {/* The trailing ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-red-500/50 rounded-full mix-blend-screen pointer-events-none z-[9998]"
        animate={{ x: mousePosition.x - 20, y: mousePosition.y - 20, opacity: isVisible ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.5 }}
      />
    </>
  );
}
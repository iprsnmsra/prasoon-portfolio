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

  if (typeof window !== "undefined" && window.innerWidth < 768) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-black rounded-full mix-blend-difference pointer-events-none z-[9999]"
        animate={{ x: mousePosition.x - 5, y: mousePosition.y - 5, opacity: isVisible ? 1 : 0 }}
        transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-black/30 rounded-full mix-blend-difference pointer-events-none z-[9998]"
        animate={{ x: mousePosition.x - 20, y: mousePosition.y - 20, opacity: isVisible ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.5 }}
      />
    </>
  );
}
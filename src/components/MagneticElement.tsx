"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { playTick } from "@/utils/sounds"; // <-- Import the sound

export default function MagneticElement({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    
    setPosition({ x: middleX * 0.4, y: middleY * 0.4 }); 
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseEnter = () => {
    playTick(); // <-- Fire the sound when mouse touches the element!
  };

  const { x, y } = position;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onMouseEnter={handleMouseEnter} // <-- Added listener
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="cursor-none"
    >
      {children}
    </motion.div>
  );
}
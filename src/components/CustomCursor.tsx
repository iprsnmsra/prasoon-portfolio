"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, input, textarea, select')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isVisible]);

  if (typeof window !== "undefined" && window.innerWidth < 768) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      animate={{ 
        x: mousePosition.x - (isHovering ? 16 : 8), 
        y: mousePosition.y - (isHovering ? 16 : 8),
        opacity: isVisible ? 1 : 0 
      }}
      transition={{ type: "tween", ease: "linear", duration: 0 }}
      style={{ willChange: "transform" }}
    >
      {/* We use the .cur file for normal pointer, and an SVG skull for hover since .ani is unsupported */}
      {!isHovering ? (
        <img 
          src="/one-piece-cursor.cur" 
          alt="cursor" 
          style={{ width: '40px', height: '40px', filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.5))' }} 
        />
      ) : (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.5))' }}>
          <path d="M12 2C8.13 2 5 5.13 5 9C5 11.38 6.19 13.47 8 14.74V17C8 18.1 8.9 19 10 19H14C15.1 19 16 18.1 16 17V14.74C17.81 13.47 19 11.38 19 9C19 5.13 15.87 2 12 2ZM10 10C8.9 10 8 9.1 8 8C8 6.9 8.9 6 10 6C11.1 6 12 6.9 12 8C12 9.1 11.1 10 10 10ZM14 10C12.9 10 12 9.1 12 8C12 6.9 12.9 6 14 6C15.1 6 16 6.9 16 8C16 9.1 15.1 10 14 10ZM15 22H9C8.45 22 8 21.55 8 21V20H16V21C16 21.55 15.55 22 15 22Z" fill="black"/>
          <path d="M10 8C10 9.1 9.1 10 8 10C6.9 10 6 9.1 6 8C6 6.9 6.9 6 8 6C9.1 6 10 6.9 10 8ZM18 8C18 9.1 17.1 10 16 10C14.9 10 14 9.1 14 8C14 6.9 14.9 6 16 6C17.1 6 18 6.9 18 8Z" fill="white"/>
        </svg>
      )}
    </motion.div>
  );
}
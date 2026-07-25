"use client";

import { useEffect, useState } from "react";

// Pure SVG icons — always render as true black, no emoji color issues
const ICON_SVGS = [
  // Coding icons
  { label: "code",     path: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" },
  { label: "terminal", path: "M4 17l6-6-6-6M12 19h8" },
  { label: "cpu",      path: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v4m0 0H5m4 0h10M9 7v10m0 0H5a2 2 0 01-2-2v-4m6 6h10a2 2 0 002-2v-4m0 0h-10" },
  { label: "git",      path: "M6 3v12M18 9a3 3 0 100-6 3 3 0 000 6zM6 21a3 3 0 100-6 3 3 0 000 6zM18 9a9 9 0 01-9 9" },
  { label: "database", path: "M4 7c0-1.656 3.582-3 8-3s8 1.344 8 3M4 7v5c0 1.656 3.582 3 8 3s8-1.344 8-3V7M4 12v5c0 1.656 3.582 3 8 3s8-1.344 8-3v-5" },
  { label: "layers",   path: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" },
  { label: "server",   path: "M5 3h14a2 2 0 012 2v4a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2zm0 10h14a2 2 0 012 2v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4a2 2 0 012-2zm12 2h.01M12 15h.01" },
  { label: "globe",    path: "M12 2a10 10 0 100 20A10 10 0 0012 2zM2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" },
  // Feelings / Enjoyment icons
  { label: "heart",    path: "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" },
  { label: "star",     path: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" },
  { label: "trophy",   path: "M8 21h8M12 17v4M4 7h16M4 7V5a1 1 0 011-1h14a1 1 0 011 1v2M4 7l2 8a6 6 0 0012 0l2-8" },
  { label: "target",   path: "M12 22a10 10 0 100-20 10 10 0 000 20zM12 18a6 6 0 100-12 6 6 0 000 12zM12 14a2 2 0 100-4 2 2 0 000 4z" },
  { label: "smile",    path: "M12 22a10 10 0 100-20 10 10 0 000 20zM8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" },
  { label: "zap",      path: "M13 2L3 14h9l-1 8 10-12h-9l1-8z" },
  { label: "music",    path: "M9 18V5l12-2v13M9 18a3 3 0 11-6 0 3 3 0 016 0zM21 16a3 3 0 11-6 0 3 3 0 016 0z" },
  { label: "gamepad",  path: "M21 6H3a2 2 0 00-2 2v8a2 2 0 002 2h18a2 2 0 002-2V8a2 2 0 00-2-2zM7 12h2m-1-1v2M17 11h.01M20 11h.01" },
  { label: "rocket",   path: "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09zM12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" },
  { label: "award",    path: "M12 15a7 7 0 100-14 7 7 0 000 14zM8.21 13.89L7 23l5-3 5 3-1.21-9.12" },
  { label: "coffee",   path: "M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3" },
  { label: "box",      path: "M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16zM3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" },
  { label: "flame",    path: "M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 01-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z" },
  { label: "puzzle",   path: "M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82zM7 7h.01" },
];

type IconItem = {
  id: number;
  svgPath: string;
  label: string;
  top: string;
  left: string;
  size: number;
  animDelay: string;
};

export default function FloatingIcons() {
  const [icons, setIcons] = useState<IconItem[]>([]);

  useEffect(() => {
    const placed: IconItem[] = [];
    const count = 22;
    for (let i = 0; i < count; i++) {
      const icon = ICON_SVGS[i % ICON_SVGS.length];
      placed.push({
        id: i,
        svgPath: icon.path,
        label: icon.label,
        top: `${4 + Math.floor(Math.random() * 88)}%`,
        left: `${2 + Math.floor(Math.random() * 92)}%`,
        size: 28 + Math.floor(Math.random() * 20), // 28–48px
        animDelay: `${(Math.random() * 9).toFixed(2)}s`,
      });
    }
    setIcons(placed);
  }, []);

  return (
    <>
      {icons.map((icon) => (
        <span
          key={icon.id}
          aria-hidden="true"
          className="bg-float-icon"
          style={{
            top: icon.top,
            left: icon.left,
            animationDelay: icon.animDelay,
          }}
        >
          <svg
            width={icon.size}
            height={icon.size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-label={icon.label}
          >
            <path d={icon.svgPath} />
          </svg>
        </span>
      ))}
    </>
  );
}

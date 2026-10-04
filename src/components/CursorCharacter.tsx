"use client";

import { useEffect, useRef, useState } from "react";

export default function CursorCharacter() {
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 });
  const frame = useRef<number | null>(null);
  const target = useRef({ x: 0.5, y: 0.5 });
  const current = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const onPointerMove = (event: PointerEvent) => {
      target.current = {
        x: event.clientX / window.innerWidth,
        y: event.clientY / window.innerHeight,
      };
    };

    const animate = () => {
      current.current.x += (target.current.x - current.current.x) * 0.08;
      current.current.y += (target.current.y - current.current.y) * 0.08;
      setPosition({ ...current.current });
      frame.current = window.requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    frame.current = window.requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
    };
  }, []);

  const eyeX = (position.x - 0.5) * 8;
  const eyeY = (position.y - 0.5) * 6;
  const followX = (position.x - 0.5) * 18;
  const followY = (position.y - 0.5) * -10;
  const tilt = (position.x - 0.5) * 5;

  return (
    <div
      className="cursor-character"
      aria-hidden="true"
      style={{ transform: `translate3d(${followX}px, ${followY}px, 0) rotate(${tilt}deg)` }}
    >
      <svg viewBox="0 0 180 220" role="presentation">
        <path className="character-sword" d="M145 196L174 52l-9-8-31 144z" />
        <path className="character-coat" d="M42 218c4-36 13-56 34-69h29c21 13 30 33 34 69z" />
        <path className="character-shirt" d="M72 143l18 18 18-18 11 75H61z" />
        <path className="character-neck" d="M80 126h20v25c-7 6-13 6-20 0z" />
        <path className="character-face" d="M61 67c0-28 58-28 58 0v55c-8 21-50 21-58 0z" />
        <path className="character-hair" d="M59 78c-9-36 13-57 36-57 30 0 38 26 29 61l-13-18-9 18-10-18-14 17-5-19z" />
        <path className="character-bandana" d="M55 57c19-12 50-12 70 0l-4 10c-21-8-42-8-62 0z" />
        <g className="character-eyes" style={{ transform: `translate(${eyeX}px, ${eyeY}px)` }}>
          <ellipse cx="77" cy="91" rx="5" ry="7" />
          <ellipse cx="103" cy="91" rx="5" ry="7" />
          <circle cx="78" cy="92" r="2" className="character-pupil" />
          <circle cx="104" cy="92" r="2" className="character-pupil" />
        </g>
        <path className="character-brow" d="M69 80l15-4M96 76l15 4" />
        <path className="character-mouth" d="M82 111c5 4 11 4 16 0" />
        <path className="character-collar" d="M80 146l10 15 10-15" />
      </svg>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";

export default function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let particles: Particle[] = [];

    const mouse = { x: -1000, y: -1000, radius: 150 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.x;
      mouse.y = e.y;
    };
    const handleMouseOut = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      init();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("resize", handleResize);

    class Particle {
      x: number; y: number;
      baseX: number; baseY: number;
      size: number; density: number;
      color: string;

      constructor(x: number, y: number) {
        this.x = x; this.y = y;
        this.baseX = x; this.baseY = y;
        this.size = Math.random() * 1.5 + 0.5;
        this.density = Math.random() * 30 + 1;
        const colors = ["#000000", "#555555", "#999999", "#cccccc"];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const maxDistance = mouse.radius;
        const force = (maxDistance - distance) / maxDistance;
        const directionX = forceDirectionX * force * this.density;
        const directionY = forceDirectionY * force * this.density;

        if (distance < mouse.radius) {
          this.x -= directionX;
          this.y -= directionY;
        } else {
          if (this.x !== this.baseX) { const dx2 = this.x - this.baseX; this.x -= dx2 / 20; }
          if (this.y !== this.baseY) { const dy2 = this.y - this.baseY; this.y -= dy2 / 20; }
        }
      }
    }

    function init() {
      particles = [];
      const numberOfParticles = (canvas!.width * canvas!.height) / 12000;
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle(Math.random() * width, Math.random() * height));
      }
    }

    function connect() {
      if (!ctx) return;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const distance = (particles[a].x - particles[b].x) ** 2 + (particles[a].y - particles[b].y) ** 2;
          if (distance < 2500) {
            const opacityValue = 1 - distance / 2500;
            ctx.strokeStyle = `rgba(0, 0, 0, ${opacityValue * 0.06})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) { particles[i].draw(); particles[i].update(); }
      connect();
      requestAnimationFrame(animate);
    }

    init();
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-30" />;
}
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, X } from "lucide-react";
import { VT323 } from "next/font/google";
import { playClack, playTick } from "@/utils/sounds"; // <-- Import both sounds

const pixelFont = VT323({ weight: "400", subsets: ["latin"] });

export default function Terminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([
    "Type 'help' to see available commands."
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, history]);

  // Handle keystrokes
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Play the mechanical switch sound on EVERY key press
    playClack(); 

    if (e.key === "Enter") {
      const cmd = input.trim().toLowerCase();
      let response = "";

      switch (cmd) {
        case "help":
          response = "Commands: whoami, skills, projects, clear, sudo";
          break;
        case "whoami":
          response = "Prasoon Mishra: Full-Stack Developer, Game Dev, Gym Rat. Location: Lucknow, India.";
          break;
        case "skills":
          response = "MERN Stack, C++, C#, Unity, Unreal Engine 5, Blender, AWS, DSA.";
          break;
        case "projects":
          response = "1. Kestrel AI (Threat Analyzer)\n2. RetroSync-Engine (Real-time Editor)\n3. Aero-Box (AMD Hackathon)";
          break;
        case "clear":
          setHistory([]);
          setInput("");
          return;
        case "sudo":
          response = "Nice try. This incident will be reported. 🚨";
          break;
        case "":
          response = "";
          break;
        default:
          response = `Command not found: ${cmd}. Type 'help' for a list of commands.`;
      }

      setHistory((prev) => [...prev, `> ${input}`, response].filter(Boolean));
      setInput("");
    }
  };

  const toggleTerminal = (state: boolean) => {
    playTick(); // Play hover sound when opening/closing
    setIsOpen(state);
  };

  return (
    <>
      <motion.button
        onClick={() => toggleTerminal(true)}
        whileHover={{ scale: 1.1, rotate: 180 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 z-40 bg-white/10 p-4 rounded-full border border-white/20 hover:bg-orange-500 hover:text-black transition-colors backdrop-blur-md cursor-none"
        title="Open Terminal"
      >
        <TerminalIcon size={24} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <div className={`w-full max-w-2xl h-[400px] bg-[#050505] border border-white/20 rounded-lg overflow-hidden flex flex-col shadow-[0_0_50px_rgba(249,115,22,0.15)] ${pixelFont.className} text-xl md:text-2xl tracking-widest cursor-none`}>
              
              <div className="bg-white/10 px-4 py-2 flex justify-between items-center border-b border-white/10">
                <span className="text-gray-400 text-sm font-sans tracking-normal">prasoon@system: ~</span>
                <button onClick={() => toggleTerminal(false)} className="text-gray-400 hover:text-red-500 transition-colors cursor-none">
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 p-4 overflow-y-auto text-green-500 flex flex-col gap-1" onClick={() => inputRef.current?.focus()}>
                <p>PRASOON_OS v1.0.0 (tty1)</p>
                {history.map((line, i) => (
                  <p key={i} className={line.startsWith(">") ? "text-white mt-2" : "text-green-400 whitespace-pre-line"}>
                    {line}
                  </p>
                ))}
                
                <div className="flex items-center mt-2">
                  <span className="text-orange-500 mr-2">{`>`}</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown} // <-- Sound triggers here
                    className="flex-1 bg-transparent outline-none text-white focus:ring-0 border-none p-0 cursor-none"
                    autoComplete="off"
                    spellCheck="false"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
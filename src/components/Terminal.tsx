"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, X } from "lucide-react";
import { playClack, playTick } from "@/utils/sounds";

export default function Terminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>(["Type 'help' to see available commands."]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { if (isOpen && inputRef.current) inputRef.current.focus(); }, [isOpen, history]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    playClack();
    if (e.key === "Enter") {
      const cmd = input.trim().toLowerCase();
      let response = "";
      switch (cmd) {
        case "help": response = "Commands: whoami, skills, projects, cp, anime, clear, sudo"; break;
        case "whoami": response = "Prasoon Mishra: Full-Stack Developer, C++ Competitive Programmer, Community Leader."; break;
        case "skills": response = "MERN Stack, C++, TypeScript, Python, Unity, Blender, AWS, DSA."; break;
        case "projects": response = "1. Kestrel AI (Threat Analyzer)\n2. RetroSync-Engine (Real-time Editor)\n3. Aero-Box (AMD Hackathon)"; break;
        case "cp": response = "Platforms: Codeforces, CodeChef, LeetCode, HackerRank\nProblems Solved: 500+"; break;
        case "anime": response = "Top 3: One Piece, Death Note, Attack on Titan"; break;
        case "clear": setHistory([]); setInput(""); return;
        case "sudo": response = "Nice try. This incident will be reported. 🚨"; break;
        case "": response = ""; break;
        default: response = `Command not found: ${cmd}. Type 'help' for available commands.`;
      }
      setHistory((prev) => [...prev, `> ${input}`, response].filter(Boolean));
      setInput("");
    }
  };

  const toggleTerminal = (state: boolean) => { playTick(); setIsOpen(state); };

  return (
    <>
      <motion.button onClick={() => toggleTerminal(true)} whileHover={{ scale: 1.1, rotate: 180 }} whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 z-40 bg-black/5 p-4 rounded-full border border-black/10 hover:bg-black hover:text-white transition-all duration-300 backdrop-blur-md text-black" title="Open Terminal">
        <TerminalIcon size={20} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 50, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/70 backdrop-blur-sm">
            <div className="w-full max-w-2xl h-[400px] bg-[#fafafa] border border-black/15 rounded-lg overflow-hidden flex flex-col shadow-[0_0_60px_rgba(0,0,0,0.08)] font-mono text-base tracking-wide">
              <div className="bg-black/5 px-4 py-2 flex justify-between items-center border-b border-black/10">
                <span className="text-gray-400 text-sm">prasoon@system: ~</span>
                <button onClick={() => toggleTerminal(false)} className="text-gray-400 hover:text-black transition-colors"><X size={16} /></button>
              </div>
              <div className="flex-1 p-4 overflow-y-auto text-gray-500 flex flex-col gap-1" onClick={() => inputRef.current?.focus()}>
                <p className="text-black font-bold">PRASOON_OS v2.0</p>
                {history.map((line, i) => (
                  <p key={i} className={`text-sm ${line.startsWith(">") ? "text-black mt-2" : "text-gray-400 whitespace-pre-line"}`}>{line}</p>
                ))}
                <div className="flex items-center mt-2">
                  <span className="text-black mr-2">{`>`}</span>
                  <input ref={inputRef} type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent outline-none text-black focus:ring-0 border-none p-0 text-sm" autoComplete="off" spellCheck="false" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
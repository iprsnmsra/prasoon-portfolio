'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push('/admin/dashboard');
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-white flex items-center justify-center p-4">
      {/* Ink decoration similar to BootSequence */}
      <div className="absolute inset-0 pointer-events-none opacity-5 flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 100 100" className="w-[150%] h-[150%] rotate-12 text-black">
          <path d="M10,50 Q40,10 50,50 T90,50" stroke="currentColor" strokeWidth="2" fill="none" />
          <circle cx="20" cy="30" r="5" fill="currentColor" />
          <circle cx="80" cy="70" r="3" fill="currentColor" />
          <circle cx="60" cy="20" r="8" fill="currentColor" />
          <path d="M0,80 Q50,100 100,80" stroke="currentColor" strokeWidth="1" fill="none" />
        </svg>
      </div>

      <motion.div 
        animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-[#f5f5f5] rounded-2xl border border-black/10 p-8 relative z-10 shadow-2xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-5xl font-pt-serif font-bold tracking-tighter mb-2 text-black">PM.</h1>
          <p className="font-jersey text-xl uppercase tracking-widest text-black/60">Admin Panel</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="ENTER SYSTEM PASSWORD"
              className="w-full bg-white border border-black/20 rounded-xl px-4 py-4 font-jersey text-lg tracking-widest text-center focus:outline-none focus:border-black transition-colors text-black placeholder:text-black/30"
              required
            />
            {error && (
              <p className="text-red-500 font-caveat text-xl text-center mt-2">
                Access denied. Invalid password.
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black text-white rounded-full py-4 font-jersey text-xl uppercase tracking-widest hover:bg-black/80 transition-colors flex items-center justify-center disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Authenticate'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

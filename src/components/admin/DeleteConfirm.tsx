'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

interface DeleteConfirmProps {
  onConfirm: () => void;
  title?: string;
  children: React.ReactNode;
}

export default function DeleteConfirm({ onConfirm, title = "Are you sure you want to delete this?", children }: DeleteConfirmProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setIsOpen(false);
  };

  return (
    <>
      <div onClick={() => setIsOpen(true)} className="inline-block">
        {children}
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative bg-white border border-black/10 rounded-2xl p-6 max-w-sm w-full shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-4 text-red-600">
                <div className="p-3 bg-red-50 rounded-full">
                  <AlertTriangle size={24} />
                </div>
                <h3 className="font-pt-serif font-bold text-xl text-black">Confirm Deletion</h3>
              </div>
              <p className="font-caveat text-lg text-gray-500 mb-6">{title}</p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsOpen(false)}
                  className="font-jersey px-6 py-2 rounded-full border border-black/20 text-black hover:bg-gray-50 uppercase tracking-widest text-xs transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  className="font-jersey px-6 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 uppercase tracking-widest text-xs transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

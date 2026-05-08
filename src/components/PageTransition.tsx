"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Preloader from './Preloader';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [removePreloader, setRemovePreloader] = useState(false);

  // We keep the animation on every refresh for development, 
  // but we can easily add sessionStorage check here later.
  useEffect(() => {
    // If you want it only once per session, uncomment below:
    /*
    const hasPlayed = sessionStorage.getItem('introPlayed');
    if (hasPlayed) {
      setLoading(false);
      setRemovePreloader(true);
    }
    */
  }, []);

  const handleComplete = () => {
    setLoading(false);
    // sessionStorage.setItem('introPlayed', 'true');
    setTimeout(() => setRemovePreloader(true), 1000); // Small buffer for exit animation
  };

  return (
    <div style={{ position: 'relative', backgroundColor: '#F2F0F1', minHeight: '100vh' }}>
      <AnimatePresence mode="wait">
        {!removePreloader && (
          <Preloader key="preloader" onComplete={handleComplete} />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

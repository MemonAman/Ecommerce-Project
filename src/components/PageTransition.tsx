"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Preloader from './Preloader';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [removePreloader, setRemovePreloader] = useState(false);

  // We temporarily disabled the sessionStorage check so you can see the animation on every refresh!
  /*
  useEffect(() => {
    const hasPlayed = sessionStorage.getItem('introPlayed');
    if (hasPlayed) {
      setReady(true);
      setRemovePreloader(true);
    }
  }, []);
  */

  return (
    <>
      {!removePreloader && (
        <Preloader onComplete={() => {
          // Force scroll to top before revealing
          window.scrollTo(0, 0);
          
          // Trigger the page to push up
          setReady(true);
          
          // Wait for the Preloader's 0.8s exit animation to complete before removing it from DOM
          setTimeout(() => setRemovePreloader(true), 1000);
        }} />
      )}
      
      <motion.div 
        initial={{ y: "100vh" }}
        animate={{ y: ready ? 0 : "100vh" }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        style={{ 
          position: 'relative', 
          zIndex: 1, 
          backgroundColor: '#F2F0F1', // Match theme background so no black gaps appear
          minHeight: '100vh' 
        }}
      >
        {children}
      </motion.div>
    </>
  );
}

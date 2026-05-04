"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './preloader.css';

const IMAGES = [
  'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&q=80',
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80',
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80',
  'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80',
];

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [imgIdx, setImgIdx] = useState(0);
  const [phase, setPhase] = useState('loading'); // loading | reveal | done

  // Synchronized Counter and Image Flash (100ms interval, exactly 16 ticks to hit 1600ms)
  useEffect(() => {
    const t = setInterval(() => {
      // Advance Image
      setImgIdx(i => (i + 1) % IMAGES.length);
      
      // Advance Counter (Target: ~100 over 16 ticks = ~6.25 per tick)
      setCount(c => {
        if (c >= 100) return 100;
        const increment = Math.floor(Math.random() * 4) + 4; // 4 to 7 per tick
        return Math.min(c + increment, 100);
      });
    }, 100);
    
    return () => clearInterval(t);
  }, []);

  // Precise Sequence matching reference
  useEffect(() => {
    // Transition directly to 'done' and slide up without the secondary text
    const t1 = setTimeout(() => { 
      setPhase('done'); 
      onComplete(); 
    }, 1600); // Total duration 1.6s
    return () => { clearTimeout(t1); };
  }, [onComplete]);

  return (
    <AnimatePresence mode="wait">
      {phase !== 'done' && (
        <motion.div 
          className="preloader"
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%", 
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
        >
          {/* Phase 1 — VŌGE Center Reveal with Fast Images INSIDE text */}
          <motion.div 
            className="pre-inner" 
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {/* Chaotic Image Background Layer */}
            <motion.div 
              className="pre-img-background"
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 0
              }}
            >
              {IMAGES.map((src, i) => {
                // Generate consistent "random" transforms for each image to look like scattered polaroids
                const rotation = (i % 2 === 0 ? 1 : -1) * (5 + (i * 3));
                const scale = 0.8 + (i * 0.05);
                const xOffset = (i % 2 === 0 ? 1 : -1) * (i * 10);
                
                return (
                  <motion.div
                    key={i}
                    style={{
                      position: 'absolute',
                      width: '30vw',
                      height: '40vw',
                      maxWidth: '400px',
                      maxHeight: '500px',
                      opacity: i === imgIdx ? 1 : 0, // Keep smooth toggle 
                      transform: `translate(${xOffset}px, 0) rotate(${rotation}deg) scale(${scale})`,
                      boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                    }}
                  >
                    <img 
                      src={src.replace('w=600&q=80', 'w=400&q=60')} 
                      alt=""
                      fetchPriority="high"
                      style={{ 
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Foreground Text Layer */}
            <div className="pre-letters" style={{ 
              fontSize: '15vw', 
              letterSpacing: '-0.02em', 
              display: 'flex', 
              alignItems: 'center',
              position: 'relative',
              zIndex: 1, // Keep text on top of images
              color: '#fff',
              fontWeight: 'bold',
              textShadow: '0 10px 30px rgba(0,0,0,0.5)' // Ensure readability over photos
            }}>
              {['V', 'Ō', 'G', 'E'].map((l, i) => (
                <motion.span 
                  key={l + i}
                  className="pre-letter"
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    delay: 0.1 + i * 0.08, 
                    duration: 0.6, 
                    ease: [0.215, 0.61, 0.355, 1] 
                  }}
                >
                  {l}
                </motion.span>
              ))}
            </div>

            {/* Progress Count */}
            <motion.span 
              className="pre-counter"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              style={{ position: 'absolute', bottom: '10%', fontSize: '1.2rem' }}
            >
              {Math.min(count, 100)}%
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

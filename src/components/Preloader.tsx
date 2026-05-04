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

  // Balanced Counter tick (~1.6s to reach 100%)
  useEffect(() => {
    const t = setInterval(() => {
      setCount(c => {
        if (c >= 100) { 
          clearInterval(t); 
          return 100; 
        }
        return c + Math.floor(Math.random() * 6) + 2; 
      });
    }, 35);
    return () => clearInterval(t);
  }, []);

  // Professional Image Flash Speed (100ms for 'shimmer' effect)
  useEffect(() => {
    const t = setInterval(() => setImgIdx(i => (i + 1) % IMAGES.length), 100);
    return () => clearInterval(t);
  }, []);

  // Precise Sequence matching reference
  useEffect(() => {
    const t1 = setTimeout(() => setPhase('reveal'), 1600); 
    const t2 = setTimeout(() => { 
      setPhase('done'); 
      onComplete(); 
    }, 2600); // Total duration ~2.6s
    return () => { clearTimeout(t1); clearTimeout(t2); };
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
          {phase === 'loading' && (
            <motion.div 
              className="pre-inner" 
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="pre-letters" style={{ 
                fontSize: '10vw', 
                letterSpacing: '-0.05em', 
                display: 'flex', 
                alignItems: 'center',
                gap: '0.1em'
              }}>
                <motion.span 
                  className="pre-letter"
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
                >
                  V
                </motion.span>

                {/* Image Flash Slot as the 'O' / Center Element */}
                <motion.div 
                  className="pre-img-slot"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.15, duration: 0.5 }}
                  style={{ 
                    width: '8vw', 
                    height: '8vw', 
                    position: 'relative', 
                    overflow: 'hidden',
                    borderRadius: '50%', // Circle shape for the 'O'
                    margin: '0 0.1em'
                  }}
                >
                  {IMAGES.map((src, i) => (
                    <img key={i} src={src} alt=""
                      style={{ 
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: i === imgIdx ? 1 : 0 
                      }}
                    />
                  ))}
                </motion.div>

                {['G', 'E'].map((l, i) => (
                  <motion.span 
                    key={l + i}
                    className="pre-letter"
                    initial={{ y: 80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ 
                      delay: 0.2 + i * 0.05, 
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
          )}

          {/* Phase 2 — Final Transition Reveal */}
          {(phase === 'reveal' || phase === 'done') && (
            <motion.div className="pre-reveal">
              <motion.span 
                className="pre-big-word"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                transition={{ duration: 0.4, ease: "circOut" }}
                style={{ fontSize: '15vw', fontWeight: 700 }}
              >
                VŌGE
              </motion.span>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

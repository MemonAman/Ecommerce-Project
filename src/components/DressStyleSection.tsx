"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

const dressStyles = [
  { id: "casual", label: "Casual", img: "/casual.jpg" },
  { id: "formal", label: "Formal", img: "/formal.jpg" },
  { id: "party", label: "Party", img: "/party.jpg" },
  { id: "gym", label: "Gym", img: "/gym.jpg" },
];

export default function DressStyleSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Create a scroll-linked parallax effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax values for the images
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -120]);

  const parallaxValues = [y1, y2, y3, y4];

  // Title split text animation
  const titleText = "BROWSE BY DRESS STYLE";
  const letters = titleText.split("");

  return (
    <div ref={sectionRef} className="shopco-dress-style">
      {/* Title with GSAP-style character stagger mask */}
      <h2 className="shopco-dress-title" style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", overflow: "hidden" }}>
        {letters.map((char, index) => (
          <motion.span
            key={index}
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1], // Apple spring
              delay: index * 0.03, // Classic GSAP text stagger
            }}
            style={{ 
              display: "inline-block", 
              whiteSpace: char === " " ? "pre" : "normal" 
            }}
          >
            {char}
          </motion.span>
        ))}
      </h2>

      {/* Grid container */}
      <div className="shopco-dress-grid">
        {dressStyles.map((item, index) => (
          <motion.div
            key={item.id}
            className="shopco-dress-card"
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 1.2,
              delay: index * 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover="hover"
            style={{ overflow: "hidden", position: "relative" }}
          >
            <Link href={`/shop?cat=${item.id}`} style={{ display: "block", width: "100%", height: "100%" }}>
              
              {/* GSAP-style Dark Overlay */}
              <motion.div
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 1,
                  background: "rgba(0,0,0,0.4)",
                  opacity: 0,
                }}
                variants={{ hover: { opacity: 1 } }}
                transition={{ duration: 0.4 }}
              />

              {/* Animated Label */}
              <motion.span
                className="shopco-dress-label"
                variants={{ hover: { color: "#fff", x: 10 } }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{ position: "absolute", zIndex: 3 }}
              >
                {item.label}
              </motion.span>

              {/* View Collection Button */}
              <motion.div
                style={{
                  position: "absolute",
                  bottom: "30px",
                  right: "30px",
                  zIndex: 3,
                  background: "#fff",
                  color: "#000",
                  padding: "12px 24px",
                  borderRadius: "64px",
                  fontWeight: 600,
                  fontSize: "14px",
                  opacity: 0,
                  y: 20,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}
                variants={{ hover: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                View Collection
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </motion.div>

              {/* Image with Parallax & Hover Scale */}
              <motion.div
                style={{
                  width: "100%",
                  height: "130%", // Make taller for parallax room
                  y: parallaxValues[index], // Scroll-linked parallax
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              >
                <motion.img
                  src={item.img}
                  alt={item.label}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    originX: 0.5,
                    originY: 0.5,
                  }}
                  variants={{ hover: { scale: 1.05 } }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                />
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

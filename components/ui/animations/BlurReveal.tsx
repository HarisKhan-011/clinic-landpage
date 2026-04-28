"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BlurRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export default function BlurReveal({
  children,
  delay = 0,
  duration = 0.8,
  className = "",
}: BlurRevealProps) {
  return (
    <motion.div
      initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
      whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

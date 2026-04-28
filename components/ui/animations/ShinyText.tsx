"use client";

import { ReactNode } from "react";

type ShinyTextProps = {
  text?: string;
  children?: ReactNode;
  disabled?: boolean;
  speed?: number;
  className?: string;
  shinyColor?: string;
};

const ShinyText: React.FC<ShinyTextProps> = ({ 
  text, 
  children, 
  disabled = false, 
  speed = 5, 
  className = "",
  shinyColor = "rgba(255, 255, 255, 0.8)"
}) => {
  const animationDuration = `${speed}s`;

  return (
    <div
      className={`text-[#b5b5b5a4] bg-clip-text inline-block ${disabled ? "" : "animate-shiny-text"} ${className}`}
      style={{
        backgroundImage: `linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, ${shinyColor} 50%, rgba(255, 255, 255, 0) 60%)`,
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        animationDuration: animationDuration,
      }}
    >
      {children || text}
    </div>
  );
};

export default ShinyText;

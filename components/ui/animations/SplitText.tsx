"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { gsap } from "gsap";

type SplitTextProps = {
  text?: string;
  className?: string;
  delay?: number;
  animationFrom?: gsap.TweenVars;
  animationTo?: gsap.TweenVars;
  easing?: string;
  threshold?: number;
  rootMargin?: string;
  onAnimationComplete?: () => void;
};

const SplitText: React.FC<SplitTextProps> = ({
  text = "",
  className = "",
  delay = 100,
  animationFrom = { opacity: 0, y: 40 },
  animationTo = { opacity: 1, y: 0 },
  easing = "power2.out",
  threshold = 0.1,
  rootMargin = "0px",
  onAnimationComplete,
}) => {
  const words = useMemo(() => text.split(" "), [text]);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current as Element);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  useEffect(() => {
    if (inView && ref.current) {
      const children = ref.current.children;
      gsap.fromTo(
        children,
        animationFrom,
        {
          ...animationTo,
          delay: delay / 1000,
          stagger: 0.1,
          ease: easing,
          onComplete: onAnimationComplete,
        }
      );
    }
  }, [inView, delay, animationFrom, animationTo, easing, onAnimationComplete]);

  return (
    <p ref={ref} className={`split-parent ${className} flex flex-wrap justify-center`}>
      {words.map((word, i) => (
        <span key={i} style={{ display: "inline-block", whiteSpace: "pre" }}>
          {word + (i !== words.length - 1 ? " " : "")}
        </span>
      ))}
    </p>
  );
};

export default SplitText;

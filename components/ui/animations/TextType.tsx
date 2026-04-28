"use client";

import { useEffect, useState, useMemo, useCallback } from "react";

interface TextTypeProps {
  text: string | string[];
  typingSpeed?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
  showCursor?: boolean;
  cursorCharacter?: string;
  className?: string;
}

const TextType: React.FC<TextTypeProps> = ({
  text,
  typingSpeed = 75,
  pauseDuration = 1500,
  deletingSpeed = 50,
  showCursor = true,
  cursorCharacter = "|",
  className = "",
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const phrases = useMemo(() => {
    if (!text) return [""];
    return Array.isArray(text) ? text : [text];
  }, [text]);

  const handleTyping = useCallback(() => {
    const currentPhrase = phrases[phraseIndex] || "";
    
    if (isDeleting) {
      if (charIndex > 0) {
        setDisplayedText(currentPhrase.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      } else {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    } else {
      if (charIndex < currentPhrase.length) {
        setDisplayedText(currentPhrase.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      } else {
        if (phrases.length > 1) {
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      }
    }
  }, [charIndex, isDeleting, phraseIndex, phrases, pauseDuration]);

  useEffect(() => {
    const timeout = isDeleting ? deletingSpeed : typingSpeed;
    
    // Prevent starting deleting/typing if we're paused at the end of a phrase
    const currentPhrase = phrases[phraseIndex] || "";
    if (!isDeleting && charIndex === currentPhrase.length && phrases.length > 1) {
      return;
    }

    const timer = setTimeout(handleTyping, timeout);
    return () => clearTimeout(timer);
  }, [handleTyping, isDeleting, deletingSpeed, typingSpeed, charIndex, phrases, phraseIndex]);

  return (
    <span className={className}>
      {displayedText}
      {showCursor && (
        <span className="animate-pulse ml-0.5 inline-block" style={{ verticalAlign: 'middle' }}>
          {cursorCharacter}
        </span>
      )}
    </span>
  );
};

export default TextType;

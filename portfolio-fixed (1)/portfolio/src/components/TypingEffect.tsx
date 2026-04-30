import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface TypingEffectProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetween?: number;
  className?: string;
}

export default function TypingEffect({ 
  texts, 
  typingSpeed = 100, 
  deletingSpeed = 50, 
  delayBetween = 2000,
  className = '' 
}: TypingEffectProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = texts[currentTextIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Escribiendo
        if (currentText.length < currentFullText.length) {
          setCurrentText(currentFullText.slice(0, currentText.length + 1));
        } else {
          // Terminó de escribir, esperar y empezar a borrar
          setTimeout(() => setIsDeleting(true), delayBetween);
        }
      } else {
        // Borrando
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          // Terminó de borrar, pasar al siguiente texto
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentTextIndex, texts, typingSpeed, deletingSpeed, delayBetween]);

  return (
    <span className={className}>
      {currentText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block w-0.5 h-6 bg-primary ml-1 align-middle"
      />
    </span>
  );
}

import { useState, useEffect } from 'react';
// No need to import NodeJS, it's a global namespace

export function useTypewriter(phrases: string[], typingSpeed = 100, deletingSpeed = 50, pauseDuration = 2000) {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (isTyping) {
      if (text.length < currentPhrase.length) {
        timeout = setTimeout(() => {
          setText(currentPhrase.slice(0, text.length + 1));
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, pauseDuration);
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => {
          setText(text.slice(0, -1));
        }, deletingSpeed);
      } else {
        setIsTyping(true);
        setPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, isTyping, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseDuration]);

  return text;
}
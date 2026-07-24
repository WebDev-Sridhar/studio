import { useEffect, useState, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

/**
 * CustomCursor — Magnetic premium cursor overlay
 * Shows a refined dot + ring cursor on non-touch devices
 */
export default function Cursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const mouseX = useSpring(0, { damping: 20, stiffness: 200, mass: 0.5 });
  const mouseY = useSpring(0, { damping: 20, stiffness: 200, mass: 0.5 });

  const ringX = useSpring(0, { damping: 28, stiffness: 120, mass: 0.8 });
  const ringY = useSpring(0, { damping: 28, stiffness: 120, mass: 0.8 });

  useEffect(() => {
    // Don't show on touch devices
    if ('ontouchstart' in window) return;

    const handleMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
      setIsVisible(true);
    };

    const handleLeave = () => setIsHidden(true);
    const handleEnter = () => setIsHidden(false);

    const handleOver = (e) => {
      const el = e.target;
      const isClickable =
        el.tagName === 'A' ||
        el.tagName === 'BUTTON' ||
        el.closest('a') ||
        el.closest('button') ||
        el.classList.contains('cursor-pointer') ||
        el.closest('[data-cursor="pointer"]');
      setIsPointer(!!isClickable);
    };

    window.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseenter', handleEnter);
    window.addEventListener('mouseover', handleOver);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseenter', handleEnter);
      window.removeEventListener('mouseover', handleOver);
    };
  }, [mouseX, mouseY, ringX, ringY]);

  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <>
      {/* Small center dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-multiply"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: isVisible && !isHidden ? 1 : 0,
          scale: isPointer ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-charcoal-600" />
      </motion.div>

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: isVisible && !isHidden ? 1 : 0,
          scale: isPointer ? 1.8 : 1,
          width: isPointer ? 44 : 32,
          height: isPointer ? 44 : 32,
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className="w-8 h-8 rounded-full border border-charcoal-400 opacity-40"
          style={{ width: '100%', height: '100%' }}
        />
      </motion.div>
    </>
  );
}

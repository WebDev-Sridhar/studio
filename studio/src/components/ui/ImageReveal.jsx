import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

/**
 * ImageReveal — Clip-path wipe reveal + scale animation for images
 */
export function ImageReveal({ src, alt, className = '', imgClassName = '', delay = 0, priority = false }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden relative ${className}`}
      initial={{ clipPath: 'inset(0 0 100% 0)' }}
      animate={isInView ? { clipPath: 'inset(0 0 0% 0)' } : { clipPath: 'inset(0 0 100% 0)' }}
      transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover ${imgClassName}`}
        loading={priority ? 'eager' : 'lazy'}
        initial={{ scale: 1.12 }}
        animate={isInView ? { scale: 1 } : { scale: 1.12 }}
        transition={{ duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.div>
  );
}

/**
 * ParallaxImage — Image with gentle parallax on scroll
 */
export function ParallaxImage({ src, alt, className = '', imgClassName = '', scale = 1.15 }) {
  return (
    <div className={`overflow-hidden relative ${className}`}>
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover ${imgClassName}`}
        style={{ transform: `scale(${scale})` }}
        loading="lazy"
      />
    </div>
  );
}

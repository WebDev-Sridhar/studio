import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

/**
 * AnimatedText — word-by-word reveal animation for headlines
 */
export function AnimatedHeadline({ text, className = '', delay = 0, as: Tag = 'h2' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const words = Array.isArray(text) ? text : text.split(' ');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1, delayChildren: delay },
    },
  };

  const wordVariants = {
    hidden: { y: '110%', opacity: 0 },
    visible: {
      y: '0%',
      opacity: 1,
      transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={`overflow-visible ${className}`}
      aria-label={Array.isArray(text) ? text.join(' ') : text}
    >
      <Tag className="flex flex-wrap gap-x-[0.25em] gap-y-0" aria-hidden="true">
        {words.map((word, i) => (
          <span key={i} className="overflow-hidden inline-block">
            <motion.span variants={wordVariants} className="inline-block">
              {word}
            </motion.span>
          </span>
        ))}
      </Tag>
    </motion.div>
  );
}

/**
 * FadeUp — simple fade + translate up reveal
 */
export function FadeUp({ children, className = '', delay = 0, duration = 0.9 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * FadeIn — simple opacity reveal
 */
export function FadeIn({ children, className = '', delay = 0, duration = 0.8 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerChildren — wraps children in stagger container
 */
export function StaggerChildren({ children, className = '', stagger = 0.12, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        : <motion.div variants={itemVariants}>{children}</motion.div>
      }
    </motion.div>
  );
}

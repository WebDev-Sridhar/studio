import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

/**
 * Button — Primary filled dark button
 */
export function Button({ children, onClick, href, className = '', icon = true, type = 'button' }) {
  const content = (
    <>
      <span>{children}</span>
      {icon && <ArrowRight size={14} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-1" />}
    </>
  );

  const classes = `group btn-primary ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={classes}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {content}
    </motion.button>
  );
}

/**
 * GhostButton — Outlined button
 */
export function GhostButton({ children, onClick, href, className = '', icon = true }) {
  const content = (
    <>
      <span>{children}</span>
      {icon && <ArrowRight size={14} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-1" />}
    </>
  );

  const classes = `group btn-ghost ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={classes}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {content}
    </motion.button>
  );
}

/**
 * LinkButton — Underline text link button
 */
export function LinkButton({ children, href, className = '' }) {
  return (
    <a href={href} className={`btn-link ${className}`}>
      {children}
      <ArrowUpRight size={13} strokeWidth={1.5} />
    </a>
  );
}

import { useReducedMotion as useFramerReducedMotion } from 'framer-motion';

/**
 * Hook that respects prefers-reduced-motion
 * Returns true if the user prefers reduced motion
 */
export function useReducedMotion() {
  return useFramerReducedMotion();
}

// Animation variants for Framer Motion
// Designed to be smooth, cinematic, and intentional

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

export const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

export const clipReveal = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  visible: {
    clipPath: 'inset(0 0% 0 0)',
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  },
};

export const scaleReveal = {
  hidden: { scale: 1.1, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const staggerContainerSlow = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

export const wordReveal = {
  hidden: { y: '110%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export const lineReveal = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] },
  },
};

export const imageReveal = {
  hidden: {
    clipPath: 'inset(0 0 100% 0)',
    scale: 1.1,
  },
  visible: {
    clipPath: 'inset(0 0 0% 0)',
    scale: 1,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  },
};

// Viewport trigger config for useInView
export const viewportConfig = {
  once: true,
  amount: 0.2,
};

export const viewportConfigEarly = {
  once: true,
  amount: 0.1,
};

// Transition presets
export const spring = {
  type: 'spring',
  stiffness: 100,
  damping: 20,
};

export const smooth = {
  duration: 0.8,
  ease: [0.16, 1, 0.3, 1],
};

export const cinematic = {
  duration: 1.4,
  ease: [0.16, 1, 0.3, 1],
};

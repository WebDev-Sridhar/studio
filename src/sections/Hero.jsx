import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button, GhostButton } from '../components/ui/Button';
import siteData from '../data/siteData.json';

export default function Hero() {
  const { hero } = siteData;
  const [currentImage, setCurrentImage] = useState(0);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Auto-rotate hero images
  useEffect(() => {
    if (hero.images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % hero.images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [hero.images.length]);

  const wordVariants = {
    hidden: { y: '110%', opacity: 0 },
    visible: (i) => ({
      y: '0%',
      opacity: 1,
      transition: {
        delay: 0.6 + i * 0.1,
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  const handleNavClick = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col overflow-hidden bg-charcoal-600"
      aria-label="Hero section"
    >
      {/* Background Images */}
      <div className="absolute inset-0 z-0">
        {hero.images.map((img, i) => (
          <motion.div
            key={i}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: i === currentImage ? 1 : 0 }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
            style={{ y: imageY }}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover"
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          </motion.div>
        ))}
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-charcoal-700/50" />
        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-charcoal-600/30" 
          style={{ background: 'linear-gradient(to top, rgba(26,24,20,0.6), transparent)' }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col justify-end h-screen pb-16 md:pb-24 container-editorial"
        style={{ y: textY, opacity }}
      >
        {/* Eyebrow */}
        <motion.div
          className="mb-6 md:mb-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-eyebrow text-ivory-300">{hero.eyebrow}</span>
        </motion.div>

        {/* Headline — word by word */}
        <div className="mb-8 md:mb-10">
          <h1
            className="font-serif font-light text-ivory-100 flex flex-wrap gap-x-[0.2em]"
            style={{
              fontSize: 'clamp(3.5rem, 10vw, 9rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
            }}
            aria-label={hero.headline.join(' ')}
          >
            {hero.headline.map((word, i) => (
              <span key={i} className="overflow-hidden inline-block">
                <motion.span
                  className="inline-block"
                  custom={i}
                  variants={wordVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>
        </div>

        {/* Subheadline + CTAs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-end">
          <motion.p
            className="font-sans font-light text-ivory-200 max-w-lg"
            style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)', lineHeight: 1.85 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {hero.subheadline}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 lg:justify-end"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Button
              href={hero.cta.primary.href}
              onClick={() => handleNavClick(hero.cta.primary.href)}
              className="bg-ivory-100 text-charcoal-600 hover:bg-ivory-200 w-fit"
            >
              {hero.cta.primary.label}
            </Button>
            <GhostButton
              href={hero.cta.secondary.href}
              onClick={() => handleNavClick(hero.cta.secondary.href)}
              className="border-ivory-200 text-ivory-100 hover:bg-ivory-100/10 w-fit"
            >
              {hero.cta.secondary.label}
            </GhostButton>
          </motion.div>
        </div>

        {/* Image indicators */}
        <motion.div
          className="flex items-center gap-2 mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          {hero.images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentImage(i)}
              aria-label={`View image ${i + 1}`}
              className={`h-px transition-all duration-500 ${
                i === currentImage ? 'w-8 bg-ivory-100' : 'w-4 bg-ivory-100/30'
              }`}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 right-8 md:right-12 z-10 flex items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <span className="writing-vertical text-eyebrow text-ivory-200/60 rotate-180" style={{ fontSize: '0.6rem', letterSpacing: '0.2em' }}>
          {hero.scrollIndicator}
        </span>
        <div className="w-px h-12 bg-ivory-100/30 relative overflow-hidden">
          <motion.div
            className="w-full bg-ivory-100/70 absolute top-0"
            style={{ height: '40%' }}
            animate={{ y: ['0%', '250%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.5 }}
          />
        </div>
      </motion.div>
    </section>
  );
}

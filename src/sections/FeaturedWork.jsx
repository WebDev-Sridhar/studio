import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { FadeUp } from '../components/ui/AnimatedText';
import { LinkButton } from '../components/ui/Button';
import siteData from '../data/siteData.json';


export default function FeaturedWork() {
  const { featuredWork } = siteData;

  // Ref on the outer sticky container that defines the scroll-driven range
  const sectionRef = useRef(null);

  // Track vertical scroll progress through this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Smooth spring so the gallery glides rather than snapping
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });

  // Map 0→1 progress to a leftward translation.
  // Negative end value = how far the strip slides left (tune as needed).
  const x = useTransform(smoothProgress, [0, 1], ['0%', '-70%']);

  return (
    // Tall outer section — its height controls how long the user scrolls
    <section
      ref={sectionRef}
      id="work"
      className="bg-ivory-100 h-[300vh]"
      aria-label="Featured Work"
      /* extra scroll room */
    >
      {/* Sticky viewport — stays in view while user scrolls through the tall section */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-start">

        {/* Header */}
        <div className="pt-20 md:pt-28 pb-14 md:pb-16 px-6 md:px-12 lg:px-20 w-full">
          <div className="flex flex-row items-end justify-between gap-6 w-full">
            <div className="flex flex-col items-start">
              <FadeUp>
                <span className="text-eyebrow mb-4 block">{featuredWork.eyebrow}</span>
              </FadeUp>
              <FadeUp delay={0.1}>
                <h2 className="text-display-md text-charcoal-600 text-balance">
                  {featuredWork.headline}
                </h2>
              </FadeUp>
            </div>
            <FadeUp delay={0.2}>
              <LinkButton href="#gallery">View all work</LinkButton>
            </FadeUp>
          </div>
        </div>

        {/* Horizontally-translating gallery strip */}
        <div className="overflow-hidden pl-6 md:pl-12 lg:pl-20 flex-1 flex items-center">
          <motion.div
            className="flex gap-5 md:gap-7"
            style={{ x, width: 'max-content', paddingRight: '3rem', willChange: 'transform' }}
          >
            {featuredWork.items.map((item, i) => (
              <FeaturedItem key={item.id} item={item} index={i} />
            ))}
          </motion.div>
        </div>

        {/* Scroll progress indicator */}
        <div className="container-editorial py-6">
          <div className="w-full h-px bg-ivory-300 relative">
            <motion.div
              className="absolute left-0 top-0 h-full bg-charcoal-400"
              style={{ scaleX: smoothProgress, transformOrigin: 'left' }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}

function FeaturedItem({ item, index }) {
  const isPortrait = item.aspectRatio === 'portrait';

  return (
    <motion.article
      className="flex-shrink-0 group cursor-pointer"
      style={{ width: isPortrait ? 'clamp(240px, 22vw, 380px)' : 'clamp(340px, 30vw, 520px)' }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      aria-label={`${item.title} — ${item.category}`}
    >
      {/* Image */}
      <div
        className="overflow-hidden relative mb-4 md:mb-5"
        style={{ aspectRatio: isPortrait ? '3/4' : '4/3' }}
      >
        <motion.img
          src={item.image}
          alt={item.alt}
          className="w-full h-full object-cover"
          loading="lazy"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 bg-charcoal-600/0 group-hover:bg-charcoal-600/10 transition-colors duration-500"
        />
      </div>

      {/* Meta */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-serif font-light text-charcoal-600 mb-1"
            style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)' }}>
            {item.title}
          </h3>
          <p className="text-eyebrow text-stone-300">{item.category}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="font-sans font-light text-xs text-stone-300">{item.location}</p>
          <p className="font-sans font-light text-xs text-stone-300/60">{item.year}</p>
        </div>
      </div>
    </motion.article>
  );
}

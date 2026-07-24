import { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { FadeUp } from '../components/ui/AnimatedText';
import { LinkButton } from '../components/ui/Button';
import siteData from '../data/siteData.json';


export default function FeaturedWork() {
  const { featuredWork } = siteData;
  const scrollRef = useRef(null);

  const { scrollXProgress } = useScroll({ container: scrollRef });

  return (
    <section id="work" className="bg-ivory-100 overflow-hidden" aria-label="Featured Work">
      {/* Header */}
      <div className="container-editorial pt-20 md:pt-28 pb-14 md:pb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
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

      {/* Horizontal Scroll Gallery */}
      <div
        ref={scrollRef}
        className="horizontal-scroll pl-6 md:pl-12 lg:pl-20 pb-16 md:pb-24"
        role="region"
        aria-label="Featured photography work"
      >
        <div className="flex gap-5 md:gap-7" style={{ width: 'max-content', paddingRight: '3rem' }}>
          {featuredWork.items.map((item, i) => (
            <FeaturedItem key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>

      {/* Scroll progress indicator */}
      <div className="container-editorial pb-6">
        <div className="w-full h-px bg-ivory-300 relative">
          <motion.div
            className="absolute left-0 top-0 h-full bg-charcoal-400"
            style={{ scaleX: scrollXProgress, transformOrigin: 'left' }}
          />
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

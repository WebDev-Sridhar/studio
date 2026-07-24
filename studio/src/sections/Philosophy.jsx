import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FadeUp } from '../components/ui/AnimatedText';
import siteData from '../data/siteData.json';

export default function Philosophy() {
  const { philosophy } = siteData;
  const quoteRef = useRef(null);
  const isQuoteInView = useInView(quoteRef, { once: true, amount: 0.3 });

  const words = philosophy.quote.split(' ');

  return (
    <section className="section-padding bg-ivory-100 overflow-hidden" aria-label="Philosophy">
      <div className="container-editorial">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-start">
          
          {/* Left — Eyebrow + line */}
          <div className="lg:col-span-3">
            <FadeUp>
              <div className="flex items-center gap-4">
                <motion.div
                  className="h-px bg-gold-300"
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                  style={{ width: '2rem' }}
                />
                <span className="text-eyebrow">{philosophy.eyebrow}</span>
              </div>
            </FadeUp>
          </div>

          {/* Right — Quote + body */}
          <div className="lg:col-span-9 lg:pl-12">
            
            {/* Animated quote */}
            <blockquote ref={quoteRef} className="mb-12 md:mb-16" aria-label={philosophy.quote}>
              <p
                className="font-serif font-light text-charcoal-600 flex flex-wrap gap-x-[0.25em]"
                style={{
                  fontSize: 'clamp(1.75rem, 3.5vw, 3rem)',
                  lineHeight: 1.2,
                  letterSpacing: '-0.01em',
                  fontStyle: 'italic',
                }}
                aria-hidden="true"
              >
                {words.map((word, i) => (
                  <span key={i} className="overflow-hidden inline-block">
                    <motion.span
                      className="inline-block"
                      initial={{ y: '110%', opacity: 0 }}
                      animate={isQuoteInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
                      transition={{
                        delay: 0.1 + i * 0.04,
                        duration: 0.7,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </p>
            </blockquote>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
              <FadeUp delay={0.2}>
                <p className="text-body-lg text-stone-400">
                  {philosophy.body}
                </p>
              </FadeUp>

              <FadeUp delay={0.35}>
                <div className="flex flex-col gap-8">
                  {/* Horizontal rule */}
                  <div className="h-px bg-ivory-300 w-full" />
                  <p className="font-serif font-light text-charcoal-400 italic"
                    style={{ fontSize: '1.1rem' }}>
                    {philosophy.signature}
                  </p>
                  
                  {/* Decorative number */}
                  <div className="mt-4">
                    <span className="font-serif font-light text-ivory-300"
                      style={{ fontSize: '6rem', lineHeight: 1, letterSpacing: '-0.04em' }}>
                      L
                    </span>
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

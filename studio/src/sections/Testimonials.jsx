import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FadeUp } from '../components/ui/AnimatedText';
import siteData from '../data/siteData.json';

export default function Testimonials() {
  const { testimonials } = siteData;
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.items.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [testimonials.items.length]);

  const goTo = (index) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.items.length) % testimonials.items.length);
  };

  const next = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.items.length);
  };

  const activeTestimonial = testimonials.items[current];

  const variants = {
    enter: (dir) => ({
      opacity: 0,
      x: dir > 0 ? 30 : -30,
    }),
    center: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
    exit: (dir) => ({
      opacity: 0,
      x: dir > 0 ? -30 : 30,
      transition: { duration: 0.4 },
    }),
  };

  return (
    <section className="section-padding bg-charcoal-600 overflow-hidden" aria-label="Client testimonials">
      <div className="container-editorial">
        
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 md:mb-20">
          <div className="lg:col-span-8">
            <FadeUp>
              <span className="text-eyebrow text-stone-200 mb-4 block">{testimonials.eyebrow}</span>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="text-display-md text-ivory-100">
                {testimonials.headline}
              </h2>
            </FadeUp>
          </div>
        </div>

        {/* Testimonial */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          
          {/* Quote */}
          <div className="lg:col-span-8">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                {/* Opening quote mark */}
                <div className="mb-6">
                  <span
                    className="font-serif text-stone-400/30"
                    style={{ fontSize: '6rem', lineHeight: 0.6, display: 'block', marginBottom: '-1rem' }}
                    aria-hidden="true"
                  >
                    "
                  </span>
                </div>
                
                <blockquote>
                  <p
                    className="font-serif font-light text-ivory-100 mb-10"
                    style={{
                      fontSize: 'clamp(1.15rem, 2vw, 1.5rem)',
                      lineHeight: 1.65,
                      fontStyle: 'italic',
                    }}
                  >
                    {activeTestimonial.quote}
                  </p>
                  
                  <footer>
                    <p className="font-sans font-light text-ivory-100 text-sm">{activeTestimonial.client}</p>
                    <p className="font-sans font-light text-stone-300 text-xs mt-1">
                      {activeTestimonial.event} · {activeTestimonial.location}
                    </p>
                  </footer>
                </blockquote>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-4">
            <div className="flex flex-col gap-6">
              
              {/* Progress */}
              <div className="flex items-center gap-3">
                <span className="font-serif font-light text-ivory-100"
                  style={{ fontSize: '2rem', letterSpacing: '-0.03em' }}>
                  {String(current + 1).padStart(2, '0')}
                </span>
                <div className="flex-1 h-px bg-stone-400/20 relative">
                  <motion.div
                    className="absolute left-0 top-0 h-full bg-gold-300"
                    key={current}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 7, ease: 'linear' }}
                  />
                </div>
                <span className="font-serif font-light text-stone-300"
                  style={{ fontSize: '1rem' }}>
                  {String(testimonials.items.length).padStart(2, '0')}
                </span>
              </div>

              {/* Dot indicators */}
              <div className="flex gap-2">
                {testimonials.items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`View testimonial ${i + 1}`}
                    className={`h-px transition-all duration-500 ${
                      i === current ? 'w-8 bg-ivory-100' : 'w-4 bg-stone-400/30'
                    }`}
                  />
                ))}
              </div>

              {/* Arrow navigation */}
              <div className="flex items-center gap-4">
                <button
                  onClick={prev}
                  aria-label="Previous testimonial"
                  className="w-10 h-10 border border-stone-400/30 flex items-center justify-center text-ivory-100 hover:border-stone-300 hover:text-gold-300 transition-colors duration-300"
                >
                  <ChevronLeft size={16} strokeWidth={1} />
                </button>
                <button
                  onClick={next}
                  aria-label="Next testimonial"
                  className="w-10 h-10 border border-stone-400/30 flex items-center justify-center text-ivory-100 hover:border-stone-300 hover:text-gold-300 transition-colors duration-300"
                >
                  <ChevronRight size={16} strokeWidth={1} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

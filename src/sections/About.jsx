import { motion } from 'framer-motion';
import { FadeUp } from '../components/ui/AnimatedText';
import siteData from '../data/siteData.json';

export default function About() {
  const { about } = siteData;

  return (
    <section id="about" className="section-padding bg-ivory-200 overflow-hidden" aria-label="About the photographer">
      <div className="container-editorial">

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-start">
          
          {/* Left — Image + stats */}
          <div className="lg:col-span-5">
            
            {/* Portrait image */}
            <motion.div
              className="overflow-hidden w-full mb-10"
              style={{ aspectRatio: '3/4', maxHeight: '680px' }}
              initial={{ clipPath: 'inset(0 0 0% 0)' }}
              whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.img
                src={about.image}
                alt={about.imageAlt}
                className="w-full h-full object-cover"
                loading="lazy"
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-4 pt-8 border-t border-ivory-400"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {about.stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-serif font-light text-charcoal-600"
                    style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', lineHeight: 1, letterSpacing: '-0.02em' }}>
                    {stat.number}
                  </p>
                  <p className="text-eyebrow text-stone-300 mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Content */}
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-6">
            
            <FadeUp>
              <span className="text-eyebrow mb-6 block">{about.eyebrow}</span>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h2 className="text-display-md text-charcoal-600 mb-10 text-balance">
                {about.headline}
              </h2>
            </FadeUp>

            {/* Bio paragraphs */}
            <div className="space-y-5 mb-12">
              {about.bio.map((paragraph, i) => (
                <FadeUp key={i} delay={0.15 + i * 0.1}>
                  <p className="text-body text-stone-400 leading-relaxed">
                    {paragraph}
                  </p>
                </FadeUp>
              ))}
            </div>

            {/* Signature */}
            <FadeUp delay={0.45}>
              <div className="flex items-center gap-4 mb-10">
                <div>
                  <p className="font-serif italic text-charcoal-600"
                    style={{ fontSize: '2rem', lineHeight: 1 }}>
                    {about.signature}
                  </p>
                  <p className="text-eyebrow text-stone-300 mt-1">{about.role}</p>
                </div>
              </div>
            </FadeUp>

            {/* Featured in */}
            <FadeUp delay={0.55}>
              <div className="pt-8 border-t border-ivory-400">
                <p className="text-eyebrow mb-4">{about.awardsLabel}</p>
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {about.awards.map((award) => (
                    <span
                      key={award}
                      className="font-serif italic text-stone-300"
                      style={{ fontSize: '0.9rem' }}
                    >
                      {award}
                    </span>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}

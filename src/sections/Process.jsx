import { motion } from 'framer-motion';
import { FadeUp } from '../components/ui/AnimatedText';
import siteData from '../data/siteData.json';

export default function Process() {
  const { process } = siteData;

  return (
    <section id="process" className="section-padding bg-ivory-200 overflow-hidden" aria-label="Our process">
      <div className="container-editorial">
        
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 md:mb-24">
          <div>
            <FadeUp>
              <span className="text-eyebrow mb-4 block">{process.eyebrow}</span>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="text-display-md text-charcoal-600">
                {process.headline}
              </h2>
            </FadeUp>
          </div>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          {process.items.map((step, i) => (
            <motion.div
              key={step.step}
              className={`border-t border-ivory-400 py-10 pr-0 md:pr-10 ${
                i < 3 ? 'lg:border-r last:lg:border-r-0' : ''
              } ${i >= 3 ? 'lg:border-r last:lg:border-r-0' : ''}`}
              style={{
                borderRight: i % 3 !== 2 ? undefined : undefined,
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.09, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="pl-8">
                {/* Step number */}
                <span
                  className="font-serif font-light text-ivory-300 block mb-4"
                  style={{ fontSize: '3.5rem', lineHeight: 1, letterSpacing: '-0.03em' }}
                  aria-hidden="true"
                >
                  {step.step}
                </span>
                
                <h3 className="font-serif font-light text-charcoal-600 mb-3"
                  style={{ fontSize: '1.15rem', lineHeight: 1.25 }}>
                  {step.title}
                </h3>
                
                <p className="text-body-sm text-stone-400 leading-relaxed">
                  {step.description}
                </p>

                {/* Connecting line (horizontal) */}
                {i < process.items.length - 1 && (
                  <motion.div
                    className="hidden lg:block absolute top-0 right-0 w-px h-full bg-ivory-400"
                    aria-hidden="true"
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

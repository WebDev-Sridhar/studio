import { motion } from 'framer-motion';
import { FadeUp } from '../components/ui/AnimatedText';
import siteData from '../data/siteData.json';

export default function StorySequence() {
  const { storySequence } = siteData;

  return (
    <section className="section-padding bg-ivory-100 overflow-hidden" aria-label="Our approach">
      <div className="container-editorial">
        
        {/* Header */}
        <div className="mb-20 md:mb-28">
          <FadeUp>
            <span className="text-eyebrow mb-4 block">{storySequence.eyebrow}</span>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="text-display-md text-charcoal-600">
              {storySequence.headline}
            </h2>
          </FadeUp>
        </div>

        {/* Story Items */}
        <div className="space-y-28 md:space-y-36 lg:space-y-44">
          {storySequence.items.map((item, i) => (
            <StoryItem key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StoryItem({ item, index }) {
  const isImageRight = item.imagePosition === 'right';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
      
      {/* Text side */}
      <motion.div
        className={`lg:col-span-5 ${
          isImageRight ? 'lg:col-start-1 lg:order-1' : 'lg:col-start-8 lg:order-2'
        }`}
        initial={{ opacity: 0, x: isImageRight ? -30 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Step number */}
        <div className="flex items-center gap-4 mb-8">
          <span
            className="font-serif font-light text-ivory-300"
            style={{ fontSize: '5rem', lineHeight: 1, letterSpacing: '-0.04em' }}
            aria-hidden="true"
          >
            {item.number}
          </span>
          <div className="h-px flex-1 bg-ivory-300" />
        </div>

        <h3
          className="font-serif font-light text-charcoal-600 mb-6"
          style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.1rem)', lineHeight: 1.15 }}
        >
          {item.headline}
        </h3>
        
        <p className="text-body text-stone-400 leading-relaxed">
          {item.body}
        </p>
      </motion.div>

      {/* Image side */}
      <motion.div
        className={`lg:col-span-6 overflow-hidden ${
          isImageRight ? 'lg:col-start-7 lg:order-2' : 'lg:col-start-1 lg:order-1'
        }`}
        initial={{ clipPath: 'inset(0 0 0% 0)' }}
        whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.img
          src={item.image}
          alt={item.alt}
          className="w-full h-auto object-cover"
          style={{ aspectRatio: '4/3' }}
          loading="lazy"
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>
    </div>
  );
}

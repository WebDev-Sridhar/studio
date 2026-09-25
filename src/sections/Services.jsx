import { motion } from 'framer-motion';
import { FadeUp } from '../components/ui/AnimatedText';
import { LinkButton } from '../components/ui/Button';
import siteData from '../data/siteData.json';


export default function Services() {
  const { services } = siteData;

  return (
    <section id="services" className="section-padding bg-ivory-200" aria-label="Services">
      <div className="container-editorial">
        
        {/* Header */}
        <div className="mb-16 md:mb-24">
          <FadeUp>
            <span className="text-eyebrow mb-4 block">{services.eyebrow}</span>
          </FadeUp>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <FadeUp delay={0.1}>
              <h2 className="text-display-md text-charcoal-600 text-balance">
                {services.headline}
              </h2>
            </FadeUp>
          </div>
        </div>

        {/* Services */}
        <div className="space-y-0">
          {services.items.map((service, i) => (
            <ServiceItem key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceItem({ service, index }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      className={`grid grid-cols-1 lg:grid-cols-2 gap-0 border-t border-ivory-400 ${
        index === 0 ? '' : ''
      }`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Content side */}
      <div className={`py-12 md:py-16 ${isEven ? 'lg:pr-16' : 'lg:order-2 lg:pl-16'}`}>
        <div className="flex items-start gap-6 mb-6">
          <span className="font-sans font-light text-xs text-stone-300 mt-1" style={{ letterSpacing: '0.05em' }}>
            {service.number}
          </span>
          <div>
            <h3 className="font-serif font-light text-charcoal-600 mb-2"
              style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)', lineHeight: 1.1 }}>
              {service.title}
            </h3>
            <p className="font-serif font-light italic text-stone-300 text-sm">
              {service.tagline}
            </p>
          </div>
        </div>

        <p className="text-body text-stone-400 mb-8 leading-relaxed" style={{ paddingLeft: '2.5rem' }}>
          {service.description}
        </p>

        {/* Features */}
        <ul className="space-y-2.5 mb-8" style={{ paddingLeft: '2.5rem' }} role="list">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <div className="w-3 h-3 rounded-full border border-gold-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-1 h-1 rounded-full bg-gold-300" />
              </div>
              <span className="font-sans font-light text-sm text-stone-400">{feature}</span>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between" style={{ paddingLeft: '2.5rem' }}>
          <p className="font-sans font-light text-xs text-stone-300 uppercase tracking-widest"
            style={{ letterSpacing: '0.12em', fontSize: '0.7rem' }}>
            {service.startingPrice}
          </p>
          {/* <LinkButton href="#contact">{service.cta}</LinkButton> */}
        </div>
      </div>

      {/* Image side */}
      <div className={`relative h-screen ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
        style={{ minHeight: '360px' }}>
        <motion.div
          className="overflow-hidden h-full"
          whileHover="hover"
          initial="rest"
        >
          <motion.img
            src={service.image}
            alt={service.alt}
            className="w-full h-full object-cover p-2"
            style={{ minHeight: '360px' }}
            loading="lazy"
            variants={{
              rest: { scale: 1 },
              hover: { scale: 1.04, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

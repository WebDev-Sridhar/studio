import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeUp } from '../components/ui/AnimatedText';
import Lightbox from '../components/ui/Lightbox';
import siteData from '../data/siteData.json';

export default function Gallery() {
  const { gallery } = siteData;
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const filteredImages = activeCategory === 'All'
    ? gallery.images
    : gallery.images.filter((img) => img.category === activeCategory);

  const openLightbox = useCallback((index) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
  }, []);

  const prevImage = useCallback(() => {
    setLightboxIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  }, [filteredImages.length]);

  const nextImage = useCallback(() => {
    setLightboxIndex((prev) => (prev + 1) % filteredImages.length);
  }, [filteredImages.length]);

  return (
    <section id="gallery" className="section-padding bg-ivory-100" aria-label="Photography Gallery">
      <div className="container-editorial">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-16">
          <div>
            <FadeUp>
              <span className="text-eyebrow mb-4 block">{gallery.eyebrow}</span>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="text-display-md text-charcoal-600">
                {gallery.headline}
              </h2>
            </FadeUp>
          </div>

          {/* Filter tabs */}
          <FadeUp delay={0.2}>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter gallery by category">
              {gallery.categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={activeCategory === cat}
                  className={`font-sans font-light text-xs uppercase tracking-widest px-4 py-2 transition-all duration-300 border ${
                    activeCategory === cat
                      ? 'bg-charcoal-600 text-ivory-100 border-charcoal-600'
                      : 'bg-transparent text-stone-400 border-ivory-300 hover:border-charcoal-300 hover:text-charcoal-500'
                  }`}
                  style={{ letterSpacing: '0.12em', fontSize: '0.65rem' }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeUp>
        </div>

        {/* Masonry grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {filteredImages.map((image, i) => (
              <GalleryItem
                key={image.id}
                image={image}
                index={i}
                onClick={() => openLightbox(i)}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <Lightbox
        images={filteredImages}
        currentIndex={lightboxIndex ?? 0}
        isOpen={isLightboxOpen}
        onClose={closeLightbox}
        onPrev={prevImage}
        onNext={nextImage}
      />
    </section>
  );
}

function GalleryItem({ image, index, onClick }) {
  const isPortrait = image.height > image.width;

  return (
    <motion.div
      className="break-inside-avoid mb-4 md:mb-5 gallery-item cursor-pointer relative overflow-hidden group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay: index * 0.06, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`Open image: ${image.alt}`}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
    >
      <motion.img
        src={image.src}
        alt={image.alt}
        className="w-full h-auto block"
        loading="lazy"
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />
      
      {/* Category label on hover */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-3 bg-charcoal-600/0 group-hover:bg-charcoal-600/60 transition-all duration-400"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        <p className="font-sans font-light text-xs text-ivory-100 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ letterSpacing: '0.12em', fontSize: '0.65rem' }}>
          {image.category}
        </p>
      </motion.div>
    </motion.div>
  );
}

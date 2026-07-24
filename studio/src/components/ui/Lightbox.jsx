import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Lightbox — Full-screen image viewer with keyboard navigation
 */
export default function Lightbox({ images, currentIndex, isOpen, onClose, onPrev, onNext }) {
  const handleKeyDown = useCallback(
    (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    },
    [isOpen, onClose, onPrev, onNext]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-charcoal-700/95"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Image container */}
          <div className="relative z-10 w-full h-full flex items-center justify-center px-16 py-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="relative max-w-5xl max-h-full"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <img
                  src={currentImage?.src}
                  alt={currentImage?.alt}
                  className="max-w-full max-h-[80vh] object-contain"
                  style={{ maxHeight: 'calc(100vh - 8rem)' }}
                />
                {/* Caption */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-4 text-ivory-100"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <p className="font-sans font-light text-sm text-ivory-300 tracking-wide">
                    {currentImage?.alt}
                  </p>
                  <p className="font-sans font-light text-xs text-stone-300 mt-1">
                    {currentIndex + 1} / {images.length}
                  </p>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close lightbox"
            className="absolute top-6 right-6 z-20 w-10 h-10 flex items-center justify-center text-ivory-100 hover:text-gold-300 transition-colors duration-300"
          >
            <X size={20} strokeWidth={1} />
          </button>

          {/* Prev button */}
          <button
            onClick={onPrev}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center text-ivory-100 hover:text-gold-300 transition-colors duration-300"
          >
            <ChevronLeft size={28} strokeWidth={1} />
          </button>

          {/* Next button */}
          <button
            onClick={onNext}
            aria-label="Next image"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center text-ivory-100 hover:text-gold-300 transition-colors duration-300"
          >
            <ChevronRight size={28} strokeWidth={1} />
          </button>

          {/* Thumbnail strip */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 px-4">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  /* handled by parent */
                }}
                aria-label={`View image ${i + 1}`}
                className={`h-px w-6 transition-all duration-300 ${
                  i === currentIndex ? 'bg-ivory-100 w-10' : 'bg-stone-400 opacity-50'
                }`}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

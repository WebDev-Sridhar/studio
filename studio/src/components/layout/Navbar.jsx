import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import siteData from '../../data/siteData.json';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const { brand, nav } = siteData;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const handleNavClick = (href) => {
    setIsMenuOpen(false);
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-ivory-100/95 backdrop-blur-sm border-b border-ivory-300'
            : 'bg-transparent'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container-editorial">
          <nav className="flex items-center justify-between h-18 md:h-20" role="navigation" aria-label="Main navigation">
            
            {/* Logo / Wordmark */}
            <a
              href="#"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex flex-col leading-none group"
              aria-label={brand.logoAlt}
            >
              <span className="font-serif font-light text-charcoal-600 tracking-tight transition-opacity duration-300 group-hover:opacity-70"
                style={{ fontSize: 'clamp(1.1rem, 2vw, 1.35rem)', letterSpacing: '-0.01em' }}>
                {brand.wordmark}
              </span>
              <span className="font-sans font-light text-stone-300 tracking-widest transition-opacity duration-300 group-hover:opacity-70"
                style={{ fontSize: '0.55rem', letterSpacing: '0.2em', marginTop: '1px' }}>
                {brand.wordmarkSuffix}
              </span>
            </a>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center gap-8" role="list">
              {nav.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    className="nav-link"
                    aria-label={link.label}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-6">
              <a
                href={nav.cta.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(nav.cta.href); }}
                className="font-sans font-light text-xs uppercase tracking-widest text-charcoal-600 
                           border-b border-charcoal-600 pb-0.5 transition-all duration-300 hover:text-stone-300 hover:border-stone-300"
                style={{ letterSpacing: '0.14em', fontSize: '0.7rem' }}
              >
                {nav.cta.label}
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-charcoal-600 transition-opacity duration-200 hover:opacity-60"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={18} strokeWidth={1} /> : <Menu size={18} strokeWidth={1} />}
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-ivory-100 flex flex-col"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-col h-full px-8 pt-28 pb-12">
              {/* Nav Links */}
              <nav className="flex-1" role="navigation" aria-label="Mobile navigation">
                <ul className="space-y-1" role="list">
                  {nav.links.map((link, i) => (
                    <motion.li
                      key={link.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <a
                        href={link.href}
                        onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                        className="block font-serif font-light text-charcoal-600 py-3 border-b border-ivory-300 
                                   transition-colors duration-200 hover:text-stone-300"
                        style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', lineHeight: 1.2 }}
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Bottom Section */}
              <motion.div
                className="mt-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <a
                  href={nav.cta.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(nav.cta.href); }}
                  className="inline-flex items-center gap-3 btn-primary mb-8"
                >
                  {nav.cta.label}
                </a>
                <p className="text-eyebrow text-stone-300">{brand.tagline}</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

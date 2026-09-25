import { motion } from 'framer-motion';
import { FadeUp } from '../ui/AnimatedText';
import siteData from '../../data/Yazhistudio.json';

// Custom SVG social icons
const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const PinterestIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 12a4 4 0 1 0 8 0 4 4 0 0 0-8 0M12 8v8M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"/>
  </svg>
);

export default function Footer() {
  const { brand, footer, social, nav } = siteData;

  const handleNavClick = (href) => {
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-charcoal-600 text-ivory-200" role="contentinfo">
      {/* Main Footer */}
      <div className="container-editorial py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 md:gap-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <FadeUp>
              <div className="mb-6">
                <span className="font-serif font-light text-ivory-100 block"
                  style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', letterSpacing: '-0.01em' }}>
                  {brand.wordmark}
                </span>
                <span className="font-sans font-light text-stone-300 tracking-widest block"
                  style={{ fontSize: '0.6rem', letterSpacing: '0.2em', marginTop: '2px' }}>
                  {brand.wordmarkSuffix}
                </span>
              </div>
              <p className="text-body-sm text-stone-200 max-w-xs leading-relaxed mb-8">
                {footer.description}
              </p>
              {/* Social */}
              <div className="flex items-center gap-5">
                <a
                  href={social.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-stone-200 hover:text-ivory-100 transition-colors duration-300"
                >
                  <InstagramIcon />
                </a>
                <a
                  href={social.facebook.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="text-stone-200 hover:text-ivory-100 transition-colors duration-300"
                >
                  <FacebookIcon />
                </a>
                <a
                  href={social.pinterest.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Pinterest"
                  className="text-stone-200 hover:text-ivory-100 transition-colors duration-300"
                >
                  <PinterestIcon />
                </a>
              </div>
            </FadeUp>
          </div>

          {/* Nav Columns */}
          {footer.columns.map((col, i) => (
            <FadeUp key={col.title} delay={0.1 * (i + 1)}>
              <div>
                <h3 className="text-eyebrow text-stone-300 mb-5">{col.title}</h3>
                <ul className="space-y-3" role="list">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        onClick={(e) => {
                          if (link.href.startsWith('#')) {
                            e.preventDefault();
                            handleNavClick(link.href);
                          }
                        }}
                        className="text-stone-200 font-sans font-light text-sm hover:text-ivory-100 transition-colors duration-300"
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>

      {/* Footer Bar */}
      <div className="border-t border-charcoal-500">
        <div className="container-editorial py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans font-light text-xs text-stone-300" style={{ letterSpacing: '0.02em' }}>
            {footer.copyright}
          </p>
          <div className="flex items-center gap-6">
            {footer.legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-sans font-light text-xs text-stone-300 hover:text-ivory-100 transition-colors duration-300"
                style={{ letterSpacing: '0.02em' }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

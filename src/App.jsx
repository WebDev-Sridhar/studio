import { useEffect } from 'react';
import Cursor from './components/ui/Cursor';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './sections/Hero';
import Philosophy from './sections/Philosophy';
import FeaturedWork from './sections/FeaturedWork';
import Services from './sections/Services';
import StorySequence from './sections/StorySequence';
import About from './sections/About';
import Gallery from './sections/Gallery';
import Testimonials from './sections/Testimonials';
import Process from './sections/Process';
import Inquiry from './sections/Inquiry';
import siteData from './data/siteData.json';

export default function App() {
  const { meta } = siteData;

  // Set page title and meta description from JSON
  useEffect(() => {
    document.title = meta.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', meta.description);
    }
    // Theme color
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) {
      themeColor.setAttribute('content', meta.themeColor);
    }
  }, [meta]);

  return (
    <div className="min-h-screen bg-ivory-100">
      {/* Premium custom cursor (desktop only) */}
      <Cursor />
      
      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main>
        {/* 1. Cinematic full-bleed hero */}
        <Hero />

        {/* 2. Philosophy / manifesto */}
        <Philosophy />

        {/* 3. Horizontal scroll featured work */}
        <FeaturedWork />

        {/* 4. Services */}
        <Services />

        {/* 5. Story sequence — the experience */}
        <StorySequence />

        {/* 6. About the photographer */}
        <About />

        {/* 7. Gallery with lightbox */}
        <Gallery />

        {/* 8. Testimonials — dark section */}
        <Testimonials />

        {/* 9. Process timeline */}
        <Process />

        {/* 10. Inquiry / Contact */}
        <Inquiry />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

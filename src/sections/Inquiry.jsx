import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { FadeUp } from '../components/ui/AnimatedText';
import { Button } from '../components/ui/Button';
import siteData from '../data/Yazhistudio.json';

export default function Inquiry() {
  const { inquiry } = siteData;
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Build a nicely formatted WhatsApp message
    const lines = [
      'New Photography Enquiry',
      '━━━━━━━━━━━━━━━━━━━━',
      `Name: ${formData.name || '—'}`,
      `Email: ${formData.email || '—'}`,
      `Photography Type: ${formData.eventType || '—'}`,
      `Preferred Date: ${formData.eventDate || '—'}`,
      `Location / Venue: ${formData.location || '—'}`,
      '',
      `Message:`,
      formData.message || '—',
      '━━━━━━━━━━━━━━━━━━━━',
      '_Sent via Lumière & Co. website_',
    ];

    const text = encodeURIComponent(lines.join('\n'));

    // Convert 09597492472 → 919597492472 (India country code)
    const rawNumber = inquiry.contactDetails.whatsapp.replace(/^0/, '91').replace(/\s/g, '');
    const waUrl = `https://wa.me/${rawNumber}?text=${text}`;

    setIsSubmitting(false);
    setSubmitted(true);

    // Open WhatsApp in a new tab
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="section-padding bg-ivory-100 overflow-hidden" aria-label="Contact and inquiry">
      <div className="container-editorial">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Left — CTA copy */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <FadeUp>
                <span className="text-eyebrow mb-6 block">{inquiry.eyebrow}</span>
              </FadeUp>
              <FadeUp delay={0.1}>
                <h2 className="text-display-md text-charcoal-600 mb-6 text-balance">
                  {inquiry.headline}
                </h2>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="text-body text-stone-400 leading-relaxed mb-12">
                  {inquiry.subtext}
                </p>
              </FadeUp>

              {/* Contact details */}
              <div className="space-y-5">
                <FadeUp delay={0.3}>
                  <a
                    href={`mailto:${inquiry.contactDetails.email}`}
                    className="flex items-center gap-4 group"
                    aria-label={`Email: ${inquiry.contactDetails.email}`}
                  >
                    <div className="w-9 h-9 border border-ivory-400 flex items-center justify-center text-stone-300 group-hover:border-gold-300 group-hover:text-gold-300 transition-colors duration-300">
                      <Mail size={14} strokeWidth={1.5} />
                    </div>
                    <span className="font-sans font-light text-sm text-stone-400 group-hover:text-charcoal-600 transition-colors duration-300">
                      {inquiry.contactDetails.email}
                    </span>
                  </a>
                </FadeUp>

                <FadeUp delay={0.35}>
                  <a
                    href={`tel:${inquiry.contactDetails.phone}`}
                    className="flex items-center gap-4 group"
                    aria-label={`Phone: ${inquiry.contactDetails.phone}`}
                  >
                    <div className="w-9 h-9 border border-ivory-400 flex items-center justify-center text-stone-300 group-hover:border-gold-300 group-hover:text-gold-300 transition-colors duration-300">
                      <Phone size={14} strokeWidth={1.5} />
                    </div>
                    <span className="font-sans font-light text-sm text-stone-400 group-hover:text-charcoal-600 transition-colors duration-300">
                      {inquiry.contactDetails.phone}
                    </span>
                  </a>
                </FadeUp>

                <FadeUp delay={0.4}>
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 border border-ivory-400 flex items-center justify-center text-stone-300">
                      <MapPin size={14} strokeWidth={1.5} />
                    </div>
                    <span className="font-sans font-light text-sm text-stone-400">
                      {inquiry.contactDetails.location}
                    </span>
                  </div>
                </FadeUp>
              </div>

              {/* Response note */}
              <FadeUp delay={0.45}>
                <p className="text-eyebrow text-stone-300 mt-10">{inquiry.note}</p>
              </FadeUp>
            </div>
          </div>

          {/* Right — Form */}
          <div className="lg:col-span-7">
            {submitted ? (
              <motion.div
                className="flex flex-col items-start justify-center py-20"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="w-12 h-12 border border-gold-300 flex items-center justify-center mb-8">
                  <Send size={16} strokeWidth={1.5} className="text-gold-300" />
                </div>
                <h3 className="font-serif font-light text-charcoal-600 mb-4"
                  style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)' }}>
                  Opening WhatsApp for you.
                </h3>
                <p className="text-body text-stone-400">
                  Your enquiry details have been pre-filled in WhatsApp. Just hit send to reach us directly!
                </p>
              </motion.div>
            ) : (
              <FadeUp delay={0.15}>
                <form
                  onSubmit={handleSubmit}
                  className="space-y-8"
                  aria-label="Inquiry form"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {inquiry.formFields.slice(0, 2).map((field) => (
                      <FormField key={field.name} field={field} onChange={handleChange} />
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {inquiry.formFields.slice(2, 4).map((field) => (
                      <FormField key={field.name} field={field} onChange={handleChange} />
                    ))}
                  </div>

                  {inquiry.formFields.slice(4).map((field) => (
                    <FormField key={field.name} field={field} onChange={handleChange} />
                  ))}

                  <div className="pt-4">
                    <Button
                      type="submit"
                      className={isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}
                    >
                      {isSubmitting ? 'Sending...' : inquiry.cta}
                    </Button>
                  </div>
                </form>
              </FadeUp>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function FormField({ field, onChange }) {
  const baseProps = {
    id: field.name,
    name: field.name,
    onChange,
    required: field.required,
    'aria-label': field.label,
  };

  return (
    <div>
      <label htmlFor={field.name} className="form-label">
        {field.label}
      </label>
      {field.type === 'textarea' ? (
        <textarea
          {...baseProps}
          rows={4}
          placeholder={field.placeholder}
          className="form-field resize-none"
        />
      ) : field.type === 'select' ? (
        <select {...baseProps} className="form-field bg-transparent cursor-pointer">
          <option value="">Select an option</option>
          {field.options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      ) : (
        <input
          {...baseProps}
          type={field.type}
          placeholder={field.placeholder}
          className="form-field"
        />
      )}
    </div>
  );
}

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { header } from '../../data/siteData';

const MotionDiv = motion.div;
const MotionAnchor = motion.a;
const CONTACT_CTA_STATES = [
  'Get in Touch',
  'MAILBOX_READY',
  'START_MAIL',
  'CONTACT://NOW',
  'CONTACT.EXE',
  'Ping Me',
];

const ContactSection = () => {
  const email = header.socials.find((item) => item.label === 'Email')?.url;
  const [contactCtaMode, setContactCtaMode] = useState(0);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 768px)').matches : false,
  );

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const media = window.matchMedia('(max-width: 768px)');
    const onChange = (event) => setIsMobile(event.matches);
    setIsMobile(media.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setContactCtaMode(0);
      return undefined;
    }
    const timer = setInterval(() => {
      setContactCtaMode((prev) => (prev + 1) % CONTACT_CTA_STATES.length);
    }, 1600);
    return () => clearInterval(timer);
  }, [isMobile]);

  return (
    <section id="contact" className="portfolio-section contact-section">
      <div className="container">
        <MotionDiv
          className="contact-minimal"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <p className="eyebrow dot-text">Contact</p>
          <h2>Let&apos;s build something purposeful.</h2>
          <p className="contact-description">Open to software engineering roles and freelance opportunities.</p>

          <div className="contact-line-actions">
            <MotionAnchor 
              href={email} 
              className={`contact-link cta-morph mode-${contactCtaMode}`}
              whileTap={{ scale: 0.98 }}
            >
              <span className="link-label">{CONTACT_CTA_STATES[contactCtaMode]}</span>
              <ExternalLink size={16} />
            </MotionAnchor>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
};

export default ContactSection;

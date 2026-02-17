import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { header } from '../../data/siteData';

const MotionDiv = motion.div;
const MotionAnchor = motion.a;

const ContactSection = () => {
  const email = header.socials.find((item) => item.label === 'Email')?.url;

  return (
    <section id="contact" className="portfolio-section contact-section">
      <div className="container">
        <MotionDiv
          className="contact-minimal"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <p className="eyebrow dot-text">Contact</p>
          <h2>Let&apos;s build something purposeful.</h2>
          <p className="contact-description">Open to software engineering roles and freelance opportunities.</p>

          <div className="contact-line-actions">
            <MotionAnchor 
              href={email} 
              className="contact-link"
              whileTap={{ scale: 0.98 }}
            >
              Get in Touch
              <ExternalLink size={16} />
            </MotionAnchor>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
};

export default ContactSection;

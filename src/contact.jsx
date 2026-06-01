import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
}

const contactLinks = [
  { icon: '📧', label: 'Email', value: 'aashika@gmail.com', href: 'mailto:aashika@gmail.com' },
  { icon: '🐙', label: 'GitHub', value: 'github.com/aashika', href: 'https://github.com/aashika' },
  { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/aashika', href: 'https://linkedin.com/in/aashika' },
  { icon: '🐦', label: 'Twitter', value: '@aashika_dev', href: 'https://twitter.com/aashika_dev' },
];

export default function Contact() {
  const [ref, inView] = useInView(0.1);

  return (
    <section id="contact" className="contact-section">
      <div className="section-container">
        <motion.div
          ref={ref}
          className="contact-wrapper"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Glow orbs behind card */}
          <div style={{
            position: 'absolute',
            width: '400px', height: '400px',
            background: 'radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)',
            left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            filter: 'blur(40px)',
          }} />

          <div className="glass-card contact-card" style={{ position: 'relative' }}>
            {/* Top accent */}
            <div style={{
              position: 'absolute', top: 0, left: '20%', right: '20%', height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.6), transparent)',
            }} />

            <motion.span
              className="section-tag"
              style={{ marginBottom: '24px' }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
            >
              Let's Talk
            </motion.span>

            <motion.h2
              className="contact-big-text"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.65 }}
            >
              Ready to build{' '}
              <span className="grad-text">something great</span>
              {' '}together?
            </motion.h2>

            <motion.p
              className="contact-subtext"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.65 }}
            >
              Whether you have a project idea, a collaboration proposal, or just want to say
              hello — my inbox is always open. I'll get back to you as soon as possible! ✨
            </motion.p>

            <motion.div
              className="contact-links-row"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.65 }}
            >
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="contact-link-item"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="link-icon">{link.icon}</span>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '1px' }}>
                      {link.label}
                    </div>
                    <div style={{ fontWeight: 600 }}>{link.value}</div>
                  </div>
                </a>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.65 }}
            >
              <a
                href="mailto:aashika@gmail.com"
                className="btn-primary"
                style={{ display: 'inline-flex', fontSize: '1rem', padding: '16px 40px' }}
              >
                <span>✉ Send Me A Message</span>
              </a>
            </motion.div>

            <div className="contact-divider" />
            <div className="contact-bottom">
              Currently available for <span>internships</span> and{' '}
              <span>freelance projects</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
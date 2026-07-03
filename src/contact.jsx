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

const contactInfo = [
  {
    icon: '📧',
    label: 'Email',
    value: 'aashika@example.com',
    href: 'mailto:aashika@example.com',
    id: 'contact-email-link',
  },
  {
    icon: '🐙',
    label: 'GitHub',
    value: 'github.com/aashika',
    href: 'https://github.com/aashika',
    id: 'contact-github-link',
  },
  {
    icon: '💼',
    label: 'LinkedIn',
    value: 'linkedin.com/in/aashika',
    href: 'https://linkedin.com/in/aashika',
    id: 'contact-linkedin-link',
  },
  {
    icon: '📍',
    label: 'Location',
    value: 'Madurai, Tamil Nadu',
    href: null,
    id: 'contact-location',
  },
];

export default function Contact() {
  const [ref, inView] = useInView(0.1);
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

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
          {/* Glow orb behind card */}
          <div style={{
            position: 'absolute',
            width: '500px', height: '500px',
            background: 'radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)',
            left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            filter: 'blur(50px)',
          }} />

          <div className="glass-card contact-card" style={{ position: 'relative' }}>
            {/* Top accent line */}
            <div style={{
              position: 'absolute', top: 0, left: '15%', right: '15%', height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.7), rgba(6,182,212,0.5), transparent)',
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
              Let's Build Something{' '}
              <span className="grad-text">Amazing Together</span>
            </motion.h2>

            <motion.p
              className="contact-subtext"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.65 }}
            >
              I'm actively looking for internships, freelance opportunities, and exciting
              collaborations. Feel free to connect with me — I'd love to hear from you! ✨
            </motion.p>

            {/* Contact Info Cards */}
            <motion.div
              className="contact-info-grid"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.65 }}
            >
              {contactInfo.map((item) =>
                item.href ? (
                  <a
                    key={item.label}
                    id={item.id}
                    href={item.href}
                    className="contact-info-card"
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                  >
                    <span className="card-icon">{item.icon}</span>
                    <span className="card-label">{item.label}</span>
                    <span className="card-value">{item.value}</span>
                  </a>
                ) : (
                  <div key={item.label} id={item.id} className="contact-info-card">
                    <span className="card-icon">{item.icon}</span>
                    <span className="card-label">{item.label}</span>
                    <span className="card-value">{item.value}</span>
                  </div>
                )
              )}
            </motion.div>

            {/* Contact Form */}
            <motion.form
              className="contact-form"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.65 }}
              onSubmit={handleSubmit}
            >
              <div className="contact-form-row">
                <div className="form-group">
                  <label htmlFor="contact-name">Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={formState.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="contact-subject">Subject</label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  placeholder="What's this about?"
                  value={formState.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="5"
                  placeholder="Tell me about your project or idea..."
                  value={formState.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                id="contact-submit-btn"
                className="btn-primary"
                style={{ alignSelf: 'flex-start', padding: '16px 40px', fontSize: '1rem' }}
              >
                <span>
                  {submitted ? '✅ Message Sent!' : '✉ Send Message'}
                </span>
              </button>
            </motion.form>

            <div className="contact-divider" />
            <div className="contact-bottom">
              Currently available for{' '}
              <span>internships</span>,{' '}
              <span>freelance projects</span>, and{' '}
              <span>collaborations</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
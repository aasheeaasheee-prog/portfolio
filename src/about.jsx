import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

const featureCards = [
  { icon: '✨', label: 'Modern UI Design' },
  { icon: '📱', label: 'Responsive Development' },
  { icon: '🚀', label: 'Continuous Learning' },
  { icon: '🧹', label: 'Clean & Maintainable Code' },
];

export default function About() {
  const [ref, inView] = useInView(0.12);

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] } },
  };

  return (
    <section id="about" className="about-section">
      <div className="section-container">
        <motion.div
          ref={ref}
          className="about-grid"
          variants={container}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Image column */}
          <motion.div className="about-image-area" variants={fadeUp}>
            <div className="glass-card about-image-frame">
              <img
                src="/stfu_edited.png"
                alt="Aashika — Frontend Developer from Madurai"
                loading="lazy"
                onError={(e) => {
                  e.target.style.cssText = `
                    width:100%;height:440px;object-fit:cover;
                    background:linear-gradient(135deg,rgba(168,85,247,0.3),rgba(6,182,212,0.2));
                    display:flex;align-items:center;justify-content:center;
                  `;
                }}
              />
              <div className="about-image-overlay" />
            </div>

            {/* Floating badge */}
            <div className="about-badge">
              <div className="about-badge-icon">💜</div>
              <div className="about-badge-text">
                <strong>Open to Opportunities</strong>
                <span>Internships & Freelance</span>
              </div>
            </div>
          </motion.div>

          {/* Text column */}
          <motion.div className="about-text" variants={container}>
            <motion.span className="section-tag" variants={fadeUp}>About Me</motion.span>
            <motion.h2 className="section-title" variants={fadeUp}>
              Creating beautiful digital experiences with <span className="grad-text">passion.</span>
            </motion.h2>

            <motion.p className="about-description" variants={fadeUp}>
              I'm <strong style={{ color: 'var(--purple-light)' }}>Aashika</strong>, currently pursuing
              B.Sc. Information Technology at <strong style={{ color: 'var(--blue-light)' }}>The American College, Madurai</strong>.
            </motion.p>

            <motion.p className="about-description" variants={fadeUp}>
              I completed my Higher Secondary education at <strong style={{ color: 'var(--blue-light)' }}>Nirmala Girls Higher Secondary School</strong> and
              studied up to Class 10 at <strong style={{ color: 'var(--blue-light)' }}>Saracens Matriculation School</strong>.
            </motion.p>

            <motion.p className="about-description" variants={fadeUp} style={{ marginBottom: 0 }}>
              I love frontend development, UI/UX design, and creating interactive web applications with clean
              code and modern interfaces. My goal is to become a professional Full Stack Developer while building
              impactful applications that solve real-world problems.
            </motion.p>

            {/* Feature Cards */}
            <motion.div className="about-feature-cards" variants={fadeUp}>
              {featureCards.map((card) => (
                <div className="about-feature-card" key={card.label}>
                  <span style={{ fontSize: '1.1rem' }}>{card.icon}</span>
                  <span>{card.label}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '8px' }}
              variants={fadeUp}
            >
              <a
                href="#contact"
                id="about-connect-btn"
                className="btn-primary"
                onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              >
                <span>✦ Let's Connect</span>
              </a>
              <a
                href="#skills"
                id="about-skills-btn"
                className="btn-ghost"
                onClick={(e) => { e.preventDefault(); document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }); }}
              >
                My Skills ↓
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

function useInView(threshold = 0.2) {
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

export default function About() {
  const [ref, inView] = useInView(0.15);

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
              <img src="/aashika.png" alt="Aashika"
                onError={(e) => {
                  e.target.style.cssText = 'width:100%;height:420px;object-fit:cover;background:linear-gradient(135deg,rgba(168,85,247,0.3),rgba(6,182,212,0.2));display:flex;align-items:center;justify-content:center;';
                }}
              />
              <div className="about-image-overlay" />
            </div>

            {/* Floating badge */}
            <div className="about-badge">
              <div className="about-badge-icon">💜</div>
              <div className="about-badge-text">
                <strong>Open to work</strong>
                <span>Frontend Roles</span>
              </div>
            </div>
          </motion.div>

          {/* Text column */}
          <motion.div className="about-text" variants={container}>
            <motion.span className="section-tag" variants={fadeUp}>About Me</motion.span>
            <motion.h2 className="section-title" variants={fadeUp}>
              Crafting digital experiences that <span className="grad-text">inspire</span>
            </motion.h2>
            <motion.p className="about-description" variants={fadeUp}>
              I'm <strong style={{ color: 'var(--purple-light)' }}>Aashika</strong>, an
              enthusiastic IT student with a deep passion for frontend development and beautiful
              UI design. I love turning creative ideas into pixel-perfect, performant web
              experiences that users truly enjoy.
            </motion.p>
            <motion.p className="about-description" variants={fadeUp}
              style={{ marginBottom: 0 }}>
              I believe great design isn't just about aesthetics — it's about creating
              intuitive, accessible products that solve real problems with elegance.
            </motion.p>

            <motion.div className="about-highlights" variants={fadeUp}
              style={{ marginTop: '28px' }}>
              {[
                'Passionate about modern UI/UX design principles',
                'Always learning new frameworks and tools',
                'Love building clean, maintainable code',
                'Dreaming of creating products that reach millions',
              ].map((text) => (
                <div className="highlight-item" key={text}>
                  <div className="highlight-dot" />
                  <span>{text}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '36px' }}
              variants={fadeUp}
            >
              <a
                href="#contact"
                className="btn-primary"
                onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              >
                <span>✦ Let's Connect</span>
              </a>
              <a href="#skills" className="btn-ghost"
                onClick={(e) => { e.preventDefault(); document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }); }}>
                My Skills ↓
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
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

const education = [
  {
    emoji: '🎓',
    period: '2023 – Present',
    degree: 'B.Sc. Information Technology',
    institution: 'The American College, Madurai',
    stream: null,
    desc: 'Focused on Programming, Database Systems, Web Development, Software Engineering, and Artificial Intelligence fundamentals.',
    isCurrent: true,
  },
  {
    emoji: '📘',
    period: 'Completed HSC',
    degree: 'Higher Secondary Education',
    institution: 'Nirmala Girls Higher Secondary School',
    stream: 'Computer Science Stream',
    desc: 'Completed Higher Secondary Certificate with Computer Science as the primary subject, building a strong foundation in programming and technology.',
    isCurrent: false,
  },
  {
    emoji: '🏫',
    period: 'Completed SSLC',
    degree: 'Secondary School Education',
    institution: 'Saracens Matriculation School',
    stream: null,
    desc: 'Strong academic foundation in Mathematics and Science, laying the groundwork for a career in technology.',
    isCurrent: false,
  },
];

export default function Education() {
  const [ref, inView] = useInView(0.1);

  return (
    <section id="education" className="education-section">
      <div className="section-container">
        <motion.div
          ref={ref}
          className="education-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
        >
          <span className="section-tag">Background</span>
          <h2 className="section-title">Education</h2>
          <p className="section-subtitle">
            My academic journey that shaped my passion for technology, design, and innovation.
          </p>
        </motion.div>

        <div className="education-timeline">
          {education.map((item, i) => (
            <motion.div
              key={i}
              className="education-item"
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.18, ease: [0.23, 1, 0.32, 1] }}
            >
              <motion.div
                className="edu-dot"
                whileHover={{ scale: 1.12 }}
                style={item.isCurrent ? {
                  background: 'rgba(168,85,247,0.2)',
                  border: '2px solid rgba(168,85,247,0.6)',
                  boxShadow: '0 0 20px rgba(168,85,247,0.3)',
                } : {}}
              >
                {item.emoji}
              </motion.div>

              <motion.div
                className="glass-card edu-card"
                whileHover={{ x: 8 }}
                transition={{ duration: 0.3 }}
                style={{ position: 'relative' }}
              >
                {item.isCurrent && (
                  <div className="edu-current-badge">Current</div>
                )}

                <div className="edu-period">{item.period}</div>
                <div className="edu-degree">{item.degree}</div>
                <div className="edu-institution">🏛 {item.institution}</div>
                {item.stream && (
                  <div className="edu-stream">📖 {item.stream}</div>
                )}
                <div className="edu-desc">{item.desc}</div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

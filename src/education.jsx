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
//education deatials

const education = [
  {
    emoji: '🎓',
    period: '2023 – Present',
    degree: 'B.Tech in Information Technology',
    institution: 'Sri Eshwar College of Engineering, Coimbatore',
    desc: 'Pursuing a full-time degree in IT with focus areas in software development, data structures, databases, and modern web technologies.',
  },
  {
    emoji: '📘',
    period: '2021 – 2023',
    degree: 'Higher Secondary Certificate (HSC)',
    institution: 'Tamil Nadu State Board',
    desc: 'Completed Class 12 with Computer Science as a major subject, securing a distinction score.',
  },
  {
    emoji: '🏫',
    period: '2019 – 2021',
    degree: 'Secondary School Certificate (SSLC)',
    institution: 'Tamil Nadu State Board',
    desc: 'Completed Class 10 with high academic standing, building a strong foundation in sciences and mathematics.',
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
            My academic journey that shaped my passion for technology and design.
          </p>
        </motion.div>

        <div className="education-timeline">
          {education.map((item, i) => (
            <motion.div
              key={i}
              className="education-item"
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.23, 1, 0.32, 1] }}
            >
              <motion.div
                className="edu-dot"
                whileHover={{ scale: 1.1 }}
              >
                {item.emoji}
              </motion.div>

              <motion.div
                className="glass-card edu-card"
                whileHover={{ x: 6 }}
                transition={{ duration: 0.3 }}
              >
                <div className="edu-period">{item.period}</div>
                <div className="edu-degree">{item.degree}</div>
                <div className="edu-institution">🏛 {item.institution}</div>
                <div className="edu-desc">{item.desc}</div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

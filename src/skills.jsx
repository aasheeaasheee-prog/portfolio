import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

function useInView(threshold = 0.2) {
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

const skills = [
  { name: 'HTML5',       icon: '🌐', level: 92, color: '#e34f26' },
  { name: 'CSS3',        icon: '🎨', level: 88, color: '#2965f1' },
  { name: 'JavaScript',  icon: '⚡', level: 80, color: '#f7df1e' },
  { name: 'React',       icon: '⚛️', level: 75, color: '#61dafb' },
  { name: 'Node.js',     icon: '🟢', level: 60, color: '#8cc84b' },
  { name: 'SQL',         icon: '🗄️', level: 65, color: '#336791' },
  { name: 'Git',         icon: '🔀', level: 70, color: '#f05032' },
];

function SkillCard({ skill, index, inView }) {
  return (
    <motion.div
      className="glass-card skill-card"
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ y: -8 }}
    >
      <div
        className="skill-icon-wrapper"
        style={{ background: `${skill.color}18`, border: `1.5px solid ${skill.color}30` }}
      >
        <span style={{ fontSize: '1.9rem' }}>{skill.icon}</span>
      </div>
      <div className="skill-name">{skill.name}</div>
      <div className="skill-bar-track">
        <motion.div
          className="skill-bar-fill"
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: 0.3 + index * 0.08, ease: [0.23, 1, 0.32, 1] }}
          style={{ background: `linear-gradient(90deg, ${skill.color}99, var(--purple))` }}
        />
      </div>
      <div style={{
        fontSize: '0.72rem',
        color: 'var(--text-muted)',
        marginTop: '8px',
        fontWeight: 600,
      }}>
        {skill.level}%
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [ref, inView] = useInView(0.1);

  return (
    <section id="skills" className="skills-section">
      <div className="section-container">
        <motion.div
          className="skills-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          ref={ref}
        >
          <span className="section-tag">My Toolkit</span>
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-subtitle">
            Technologies I've worked with and continue to level up every day.
          </p>
        </motion.div>

        <div className="skills-grid">
          {skills.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
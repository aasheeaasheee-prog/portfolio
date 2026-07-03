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

const skills = [
  { name: 'HTML',       icon: '🌐', level: 95, color: '#e34f26' },
  { name: 'CSS',        icon: '🎨', level: 92, color: '#2965f1' },
  { name: 'JavaScript', icon: '⚡', level: 85, color: '#f7df1e' },
  { name: 'React.js',   icon: '⚛️', level: 82, color: '#61dafb' },
  { name: 'Python',     icon: '🐍', level: 80, color: '#3776ab' },
  { name: 'SQL',        icon: '🗄️', level: 75, color: '#336791' },
  { name: 'Node.js',    icon: '🟢', level: 70, color: '#8cc84b' },
  { name: 'Express.js', icon: '🛠️', level: 68, color: '#68a063' },
  { name: 'Git & GitHub', icon: '🔀', level: 78, color: '#f05032' },
  { name: 'MongoDB',    icon: '🍃', level: 65, color: '#47a248' },
];

function SkillCard({ skill, index, inView }) {
  return (
    <motion.div
      className="glass-card skill-card"
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ y: -8 }}
      style={{ border: `1px solid ${skill.color}20` }}
    >
      {/* Glowing top border on hover */}
      <div style={{
        position: 'absolute',
        top: 0, left: '10%', right: '10%',
        height: '1px',
        background: `linear-gradient(90deg, transparent, ${skill.color}88, transparent)`,
        borderRadius: '20px 20px 0 0',
        opacity: 0.7,
      }} />

      <div
        className="skill-icon-wrapper"
        style={{
          background: `${skill.color}18`,
          border: `1.5px solid ${skill.color}35`,
        }}
      >
        <span style={{ fontSize: '2rem' }}>{skill.icon}</span>
      </div>

      <div className="skill-name">{skill.name}</div>

      <div className="skill-bar-track">
        <motion.div
          className="skill-bar-fill"
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1.4, delay: 0.3 + index * 0.07, ease: [0.23, 1, 0.32, 1] }}
          style={{
            background: `linear-gradient(90deg, ${skill.color}cc, var(--purple))`,
            boxShadow: `0 0 12px ${skill.color}60`,
          }}
        />
      </div>

      <div className="skill-percent">{skill.level}%</div>
    </motion.div>
  );
}

export default function Skills() {
  const [ref, inView] = useInView(0.08);

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
            Technologies I've worked with and continue to level up through real-world projects and learning.
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
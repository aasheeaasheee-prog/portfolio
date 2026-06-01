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

const projects = [
  {
    num: '01',
    emoji: '🌐',
    title: 'Personal Portfolio',
    desc: 'A futuristic, cinematic portfolio site built with React and Framer Motion. Features glassmorphism, animated gradients, and premium dark UI.',
    tags: ['React', 'CSS3', 'Framer Motion'],
    github: '#',
    live: '#',
    accent: '#a855f7',
  },
  {
    num: '02',
    emoji: '✅',
    title: 'Task Flow App',
    desc: 'A sleek task management application with drag-and-drop, local storage persistence, and a beautiful minimal UI for productivity.',
    tags: ['JavaScript', 'HTML5', 'CSS3'],
    github: '#',
    live: '#',
    accent: '#06b6d4',
  },
  {
    num: '03',
    emoji: '🛒',
    title: 'E-Shop UI',
    desc: 'Modern e-commerce frontend with product listings, cart functionality, and responsive layout — built as a React SPA.',
    tags: ['React', 'Node.js', 'SQL'],
    github: '#',
    live: '#',
    accent: '#8b5cf6',
  },
  {
    num: '04',
    emoji: '🌤️',
    title: 'Weather Dashboard',
    desc: 'Real-time weather app using OpenWeatherMap API. Clean card-based UI with location search and animated weather icons.',
    tags: ['JavaScript', 'REST API', 'CSS3'],
    github: '#',
    live: '#',
    accent: '#22d3ee',
  },
];

function ProjectCard({ project, index, inView }) {
  return (
    <motion.div
      className="glass-card project-card"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ y: -8 }}
      style={{
        '--project-accent': project.accent,
      }}
    >
      {/* Top glow line */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '2px',
        background: `linear-gradient(90deg, transparent, ${project.accent}88, transparent)`,
        borderRadius: '20px 20px 0 0',
        transition: 'opacity 0.3s',
      }} />

      <div className="project-number">PROJECT {project.num}</div>
      <span className="project-emoji">{project.emoji}</span>
      <h3 className="project-title">{project.title}</h3>
      <p className="project-desc">{project.desc}</p>

      <div className="project-tags">
        {project.tags.map((t) => (
          <span
            key={t}
            className="project-tag"
            style={{
              background: `${project.accent}14`,
              borderColor: `${project.accent}30`,
              color: project.accent,
            }}
          >
            {t}
          </span>
        ))}
      </div>

      <div className="project-links">
        <a href={project.github} className="project-link" target="_blank" rel="noreferrer">
          <span>⌥</span> GitHub
        </a>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>·</span>
        <a href={project.live} className="project-link" target="_blank" rel="noreferrer">
          <span>↗</span> Live Demo
        </a>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [ref, inView] = useInView(0.05);

  return (
    <section id="projects" className="projects-section">
      <div className="section-container">
        <motion.div
          ref={ref}
          className="projects-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
        >
          <span className="section-tag">Featured Work</span>
          <h2 className="section-title">Projects I've Built</h2>
          <p className="section-subtitle">
            A curated selection of projects showcasing my skills in frontend development and UI design.
          </p>
        </motion.div>

        <div className="projects-grid">
          {projects.map((p, i) => (
            <ProjectCard key={p.num} project={p} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

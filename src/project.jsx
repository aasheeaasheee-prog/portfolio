import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

function useInView(threshold = 0.05) {
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
    emoji: '🤖',
    title: 'HireMirror AI',
    desc: 'An AI-powered mock interview platform that helps students prepare for technical interviews with authentication, dashboard, interview sessions, AI-generated questions, and performance tracking.',
    tags: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
    github: '#',
    live: '#',
    accent: '#a855f7',
  },
  {
    num: '02',
    emoji: '🏠',
    title: 'HomeScapes AI',
    desc: 'A modern AI-powered home interior inspiration platform with elegant UI, responsive design, and smart recommendations for interior design ideas.',
    tags: ['React', 'JavaScript', 'CSS'],
    github: '#',
    live: '#',
    accent: '#06b6d4',
  },
  {
    num: '03',
    emoji: '🌐',
    title: 'Personal Portfolio',
    desc: 'A premium animated portfolio built with React, glassmorphism, Framer Motion, smooth transitions, and responsive layouts to showcase my projects and skills.',
    tags: ['React', 'Framer Motion', 'CSS'],
    github: '#',
    live: '#',
    accent: '#8b5cf6',
  },
  {
    num: '04',
    emoji: '🎓',
    title: 'Student Management System',
    desc: 'A full-stack CRUD application to manage student records with authentication, dashboard, search functionality, and complete database integration.',
    tags: ['Python', 'FastAPI', 'SQL', 'React'],
    github: '#',
    live: '#',
    accent: '#22d3ee',
  },
];

function ProjectCard({ project, index, inView }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cardRef.current.style.setProperty('--mouse-x', `${x}%`);
    cardRef.current.style.setProperty('--mouse-y', `${y}%`);
  };

  return (
    <motion.div
      ref={cardRef}
      className="glass-card project-card"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
      onMouseMove={handleMouseMove}
      style={{ '--project-accent': project.accent }}
    >
      {/* Top accent glow line */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '2px',
        background: `linear-gradient(90deg, transparent, ${project.accent}aa, transparent)`,
        borderRadius: '20px 20px 0 0',
        transition: 'opacity 0.3s',
      }} />

      {/* Side accent glow */}
      <div style={{
        position: 'absolute',
        left: 0, top: '20%', bottom: '20%',
        width: '2px',
        background: `linear-gradient(180deg, transparent, ${project.accent}55, transparent)`,
        borderRadius: '0 0 0 20px',
        opacity: 0,
        transition: 'opacity 0.4s ease',
      }} className="project-side-glow" />

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
        <a
          href={project.github}
          id={`project-${project.num}-github`}
          className="project-link"
          target="_blank"
          rel="noreferrer"
          style={{ borderColor: `${project.accent}25` }}
        >
          <span>⌥</span> GitHub
        </a>
        <a
          href={project.live}
          id={`project-${project.num}-live`}
          className="project-link"
          target="_blank"
          rel="noreferrer"
          style={{ borderColor: `${project.accent}25` }}
        >
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
            A curated selection of real-world projects showcasing my skills in
            frontend development, full-stack engineering, and modern UI design.
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

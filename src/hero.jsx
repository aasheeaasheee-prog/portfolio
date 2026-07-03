import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

// Floating particles around profile
function ProfileParticles() {
  const particles = [
    { size: 8, orbitR: 130, duration: 8, delay: 0, opacity: 0.7 },
    { size: 5, orbitR: 150, duration: 12, delay: 2, opacity: 0.5 },
    { size: 6, orbitR: 120, duration: 10, delay: 4, opacity: 0.6 },
    { size: 4, orbitR: 145, duration: 14, delay: 1, opacity: 0.4 },
    { size: 7, orbitR: 135, duration: 9, delay: 3, opacity: 0.65 },
    { size: 3, orbitR: 155, duration: 16, delay: 5, opacity: 0.35 },
  ];

  return (
    <div className="hero-profile-particles">
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: '50%',
            background: i % 2 === 0
              ? 'linear-gradient(135deg,#a855f7,#06b6d4)'
              : 'linear-gradient(135deg,#06b6d4,#c084fc)',
            '--orbit-r': `${p.orbitR}px`,
            '--opacity': p.opacity,
            animation: `orbit ${p.duration}s linear ${p.delay}s infinite`,
            boxShadow: `0 0 ${p.size * 2}px rgba(168,85,247,0.6)`,
          }}
        />
      ))}
    </div>
  );
}

// Floating background particles
function Particles() {
  const particles = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 12}s`,
    duration: `${10 + Math.random() * 14}s`,
    size: `${3 + Math.random() * 4}px`,
  }));

  return (
    <div className="particles-container">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            bottom: '-10px',
            width: p.size,
            height: p.size,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
}

// Animated typing for role
function TypedRole() {
  const roles = ['Frontend Developer', 'UI/UX Enthusiast', 'React Developer', 'IT Student'];
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout;
    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 75);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2400);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  return (
    <span>
      {displayed}
      <span style={{
        display: 'inline-block',
        width: '2px',
        height: '1.1em',
        background: 'linear-gradient(135deg,#a855f7,#06b6d4)',
        marginLeft: '3px',
        verticalAlign: 'middle',
        borderRadius: '1px',
        animation: 'blink 0.9s step-end infinite',
      }} />
    </span>
  );
}

export default function Hero() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const stats = [
    { number: '8+', label: 'Technologies' },
    { number: '5+', label: 'Projects Built' },
    { number: '2+', label: 'Learning Journey' },
  ];

  return (
    <section id="hero" className="hero-section">
      <Particles />

      <div className="hero-content">
        {/* Greeting */}
        <motion.div
          className="hero-greeting"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Hello, I'm 👋
        </motion.div>

        {/* Profile Image */}
        <motion.div
          className="hero-profile-wrapper"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="hero-profile-glow" />
          <div className="hero-profile-ring-outer">
            <div className="hero-profile-ring-inner" />
          </div>
          <img
            src="/stfu_edited.png"
            alt="Aashika — Frontend Developer from Madurai"
            className="hero-profile-img"
            loading="eager"
            decoding="async"
            onError={(e) => {
              e.target.style.display = 'none';
              const fallback = document.createElement('div');
              fallback.style.cssText = `
                width:230px;height:230px;border-radius:50%;
                background:linear-gradient(135deg,#a855f7,#06b6d4);
                display:flex;align-items:center;justify-content:center;
                font-size:5rem;font-weight:900;color:white;
                position:absolute;top:0;left:0;z-index:2;
              `;
              fallback.textContent = 'A';
              e.target.parentNode.appendChild(fallback);
            }}
          />
          <ProfileParticles />
        </motion.div>


        {/* Name */}
        <motion.h1
          className="hero-name"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.23, 1, 0.32, 1] }}
        >
          Aashika
        </motion.h1>

        {/* Role */}
        <motion.p
          className="hero-role"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          B.Sc. Information Technology Student&nbsp;•&nbsp;
          <span className="role-highlight"><TypedRole /></span>
        </motion.p>

        {/* Short Description */}
        <motion.p
          className="hero-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          Passionate about creating beautiful, responsive, and user-friendly web applications.
          I enjoy transforming ideas into modern digital experiences using React, JavaScript,
          and creative UI design. Currently expanding my skills through real-world projects
          and continuous learning.
        </motion.p>

        {/* Stats */}
        <motion.div
          className="hero-stats"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.72 }}
        >
          {stats.map((s) => (
            <div className="stat-item" key={s.label}>
              <div className="stat-number">{s.number}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Buttons */}
        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
        >
          <button
            className="btn-primary"
            id="hero-view-projects"
            onClick={() => scrollTo('projects')}
          >
            <span>✦ View My Projects</span>
          </button>
          <button
            className="btn-ghost"
            id="hero-contact"
            onClick={() => scrollTo('contact')}
          >
            Contact Me ↗
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="hero-scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
        >
          <div className="scroll-mouse">
            <div className="scroll-wheel" />
          </div>
          <span>Scroll to explore</span>
        </motion.div>
      </div>
    </section>
  );
}
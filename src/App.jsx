import './index.css';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './hero';
import About from './about';
import Skills from './skills';
import Projects from './project';
import Education from './education';
import Contact from './contact';

// Custom cursor glow
function CursorGlow() {
  const glowRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (glowRef.current) {
        glowRef.current.style.left = e.clientX + 'px';
        glowRef.current.style.top = e.clientY + 'px';
      }
      if (ringRef.current) {
        ringRef.current.style.left = e.clientX + 'px';
        ringRef.current.style.top = e.clientY + 'px';
      }
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <>
      <div className="cursor-glow" ref={glowRef} />
      <div className="cursor-ring" ref={ringRef} />
    </>
  );
}

// Scroll Progress Indicator
function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrollTop = window.scrollY;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      setProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className="scroll-progress-bar"
      style={{ width: `${progress}%` }}
    />
  );
}

// Mouse follow light
function MouseLight() {
  const ref = useRef(null);
  useEffect(() => {
    const move = (e) => {
      if (ref.current) {
        ref.current.style.left = e.clientX + 'px';
        ref.current.style.top = e.clientY + 'px';
      }
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return <div className="mouse-light" ref={ref} />;
}

// Page Loader
function PageLoader({ onDone }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => {
      setLoaded(true);
      setTimeout(onDone, 600);
    }, 1800);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div className={`page-loader ${loaded ? 'loaded' : ''}`}>
      <div className="loader-logo">A.</div>
      <div className="loader-bar">
        <div className="loader-bar-fill" />
      </div>
      <div style={{ fontSize: '0.75rem', color: 'rgba(240,240,255,0.3)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
        Loading Portfolio...
      </div>
    </div>
  );
}

// Floating background blobs
function BackgroundBlobs() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {/* Purple blob top-left */}
      <div className="blob" style={{
        width: '600px', height: '600px',
        top: '-150px', left: '-150px',
        background: 'radial-gradient(circle, rgba(168,85,247,0.18) 0%, transparent 70%)',
        animation: 'float 12s ease-in-out infinite',
      }} />
      {/* Blue blob top-right */}
      <div className="blob" style={{
        width: '500px', height: '500px',
        top: '100px', right: '-120px',
        background: 'radial-gradient(circle, rgba(6,182,212,0.14) 0%, transparent 70%)',
        animation: 'float2 15s ease-in-out infinite',
      }} />
      {/* Purple blob center */}
      <div className="blob" style={{
        width: '700px', height: '700px',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 65%)',
        animation: 'float 20s ease-in-out infinite reverse',
      }} />
      {/* Blue blob bottom-left */}
      <div className="blob" style={{
        width: '450px', height: '450px',
        bottom: '100px', left: '5%',
        background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)',
        animation: 'float2 18s ease-in-out infinite',
      }} />
      {/* Purple blob bottom-right */}
      <div className="blob" style={{
        width: '380px', height: '380px',
        bottom: '-80px', right: '10%',
        background: 'radial-gradient(circle, rgba(168,85,247,0.14) 0%, transparent 70%)',
        animation: 'float 14s ease-in-out infinite 3s',
      }} />
      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(168,85,247,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(168,85,247,0.025) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />
    </div>
  );
}

export default function App() {
  const [loaderDone, setLoaderDone] = useState(false);

  return (
    <>
      <PageLoader onDone={() => setLoaderDone(true)} />
      <CursorGlow />
      <ScrollProgress />
      <MouseLight />
      <div style={{ position: 'relative', background: 'var(--bg)', opacity: loaderDone ? 1 : 0, transition: 'opacity 0.6s ease' }}>
        <BackgroundBlobs />
        <Navbar />
        <main style={{ position: 'relative', zIndex: 1 }}>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Education />
          <Contact />
        </main>
        <footer className="footer">
          <div className="footer-content">
            <p>Crafted with <span className="heart">❤️</span> by <span>Aashika</span> · © 2026 All Rights Reserved.</p>
            <div className="footer-links">
              <a href="mailto:aashika@example.com">Email</a>
              <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
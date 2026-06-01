import './index.css';
import './App.css';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './hero';
import About from './about';
import Skills from './skills';
import Projects from './project';
import Education from './education';
import Contact from './contact';

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
  return (
    <div style={{ position: 'relative', background: 'var(--bg)' }}>
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
        <p>Crafted with <span>♥</span> by <span>Aashika</span> · 2025</p>
      </footer>
    </div>
  );
}
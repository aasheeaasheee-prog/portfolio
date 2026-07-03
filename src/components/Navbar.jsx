import { useEffect, useState } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section highlight via IntersectionObserver
  useEffect(() => {
    const sections = ['hero', 'about', 'skills', 'projects', 'education', 'contact'];
    const observers = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = ['about', 'skills', 'projects', 'education', 'contact'];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <span
        className="nav-logo"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{ cursor: 'pointer' }}
        role="button"
        tabIndex={0}
        aria-label="Go to top"
        onKeyDown={(e) => e.key === 'Enter' && window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        Aashika.
      </span>

      <ul className="nav-links" role="list">
        {navItems.map((item) => (
          <li key={item}>
            <a
              href={`#${item}`}
              className={activeSection === item ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollTo(item); }}
              aria-current={activeSection === item ? 'section' : undefined}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </a>
          </li>
        ))}
      </ul>

      <a
        href="#contact"
        id="nav-hire-me"
        className="nav-cta"
        onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}
      >
        Hire Me ✨
      </a>
    </nav>
  );
}

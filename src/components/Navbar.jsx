import { useEffect, useState } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <span
        className="nav-logo"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{ cursor: 'pointer' }}
      >
        A.
      </span>

      <ul className="nav-links">
        {['about', 'skills', 'projects', 'education', 'contact'].map((item) => (
          <li key={item}>
            <a
              href={`#${item}`}
              onClick={(e) => { e.preventDefault(); scrollTo(item); }}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </a>
          </li>
        ))}
      </ul>

      <a
        href="#contact"
        className="nav-cta"
        onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}
      >
        Hire Me
      </a>
    </nav>
  );
}

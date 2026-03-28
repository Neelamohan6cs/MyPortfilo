import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const NAV_LINKS = ['About', 'Skills', 'Projects', 'Internships', 'Education', 'Certifications', 'Workshops', 'Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active,   setActive]   = useState('');
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      NAV_LINKS.forEach((link) => {
        const el = document.getElementById(link.toLowerCase());
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) setActive(link.toLowerCase());
        }
      });
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <span className="nav-logo">NR.</span>

      <ul className="nav-links">
        {NAV_LINKS.map((link) => (
          <li key={link}>
            <button
              className={active === link.toLowerCase() ? 'active' : ''}
              onClick={() => scrollTo(link.toLowerCase())}
            >
              {link}
            </button>
          </li>
        ))}
      </ul>

      <Link to="/admin" className="nav-admin">Admin</Link>

      <button className="hamburger" onClick={() => setOpen(!open)}>
        <span className={open ? 'open' : ''} />
        <span className={open ? 'open' : ''} />
        <span className={open ? 'open' : ''} />
      </button>

      {open && (
        <div className="mobile-menu">
          {NAV_LINKS.map((link) => (
            <button key={link} onClick={() => scrollTo(link.toLowerCase())}>{link}</button>
          ))}
          <Link to="/admin" onClick={() => setOpen(false)}>Admin Panel</Link>
        </div>
      )}
    </nav>
  );
}

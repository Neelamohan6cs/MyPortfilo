import React, { useState, useEffect } from 'react';
import './Hero.css';

const ROLES = ['Full Stack Developer', 'Data Enthusiast', 'MERN Stack Dev', 'ML Engineer', 'React Developer'];

export default function Hero({ data }) {
  const [index,     setIndex]     = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting,  setDeleting]  = useState(false);

  useEffect(() => {
    const current = ROLES[index];
    let t;
    if (!deleting && displayed.length < current.length) {
      t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 75);
    } else if (!deleting && displayed.length === current.length) {
      t = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      t = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 40);
    } else {
      setDeleting(false);
      setIndex((index + 1) % ROLES.length);
    }
    return () => clearTimeout(t);
  }, [displayed, deleting, index]);

  const photoUrl = data?.photo_url || null;

  return (
    <section id="hero" className="hero">
      <div className="hero-shapes">
        <div className="shape s1" /><div className="shape s2" /><div className="shape s3" />
        <div className="dots-grid" />
      </div>

      <div className="hero-right">
        {photoUrl ? (
          <div className="hero-photo-ring">
            <img src={photoUrl} alt={data?.name || 'Profile'} className="hero-photo" />
          </div>
        ) : (
          <div className="hero-card-stack">
            <div className="profile-card">
              <div className="profile-avatar">NR</div>
              <div className="profile-info">
                <p className="profile-name">Neelamohan R</p>
                <p className="profile-role">CSE Student · DSEC</p>
                <div className="profile-tags">
                  <span>React</span><span>Django</span><span>Python</span>
                </div>
              </div>
            </div>
            <div className="code-snippet">
              <div className="snippet-bar">
                <span className="dot r"/><span className="dot y"/><span className="dot g"/>
                <span className="snippet-title">neelamohan.py</span>
              </div>
              <pre>{`skills = {
  "frontend": "React.js",
  "backend":  "Django",
  "database": "MySQL",
  "ml":       "Scikit-learn",
  "cgpa":     7.54
}`}</pre>
            </div>
          </div>
        )}
      </div>

      <div className="hero-left">
        <div className="hero-tag"><span className="pulse" />Open to Opportunities</div>
        <h1 className="hero-name">
          Hi, I'm <br />
          <span className="gradient-text">{data?.name || 'Neelamohan R'}</span>
        </h1>
        <div className="hero-role-wrap">
          <span className="role-prefix">I'm a </span>
          <span className="role-typed">{displayed}</span>
          <span className="role-cursor">|</span>
        </div>
        <p className="hero-bio">{data?.bio || 'Passionate CSE student building real-world web apps and ML projects at DSEC Perambalur.'}</p>
        <div className="hero-stats">
          <div className="hstat"><span className="hstat-n">7.54</span><span className="hstat-l">CGPA</span></div>
          <div className="hstat-divider" />
          <div className="hstat"><span className="hstat-n">2+</span><span className="hstat-l">Projects</span></div>
          <div className="hstat-divider" />
          <div className="hstat"><span className="hstat-n">6+</span><span className="hstat-l">Certs</span></div>
          <div className="hstat-divider" />
          <div className="hstat"><span className="hstat-n">2+</span><span className="hstat-l">Internships</span></div>
        </div>
        <div className="hero-actions">
          <button className="btn-primary" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>View Projects →</button>
          <button className="btn-outline" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>Contact Me</button>
        </div>
        <div className="hero-socials">
          <a href={data?.github || '#'} target="_blank" rel="noreferrer" className="social-chip">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            GitHub
          </a>
          <a href={data?.linkedin || '#'} target="_blank" rel="noreferrer" className="social-chip">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            LinkedIn
          </a>
          <a href={`mailto:${data?.email || ''}`} className="social-chip">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            Email
          </a>
        </div>
      </div>
    </section>
  );
}

import React, { useState, useEffect } from 'react';
import './Hero.css';
import HeroSocials from './HeroSocials';

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
        <div>
          <HeroSocials/>
        </div>
      </div>
    </section>
  );
}

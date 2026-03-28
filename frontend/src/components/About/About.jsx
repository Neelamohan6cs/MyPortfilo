import React from 'react';
import useFadeIn from '../../hooks/useFadeIn';
import './About.css';

export default function About({ data }) {
  const ref = useFadeIn();
  return (
    <section id="about" className="about-section">
      <div className="fade-in" ref={ref}>
        <span className="section-label"><span className="pulse" /> About Me</span>
        <h2 className="section-title">Who <span>I Am</span></h2>
        <div className="about-grid">
          <p className="about-text">{data?.bio}</p>
          <div className="about-stats">
            <div className="stat"><span className="stat-num">7.54</span><span className="stat-label">CGPA</span></div>
            <div className="stat"><span className="stat-num">2+</span><span className="stat-label">Internships</span></div>
            <div className="stat"><span className="stat-num">6+</span><span className="stat-label">Certifications</span></div>
            <div className="stat"><span className="stat-num">2+</span><span className="stat-label">Projects</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

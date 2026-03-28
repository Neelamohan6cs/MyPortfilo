import React from 'react';
import useFadeIn from '../../hooks/useFadeIn';
import './Education.css';

export default function Education({ data }) {
  const ref = useFadeIn();
  return (
    <section id="education" className="education-section">
      <div className="fade-in" ref={ref}>
        <span className="section-label"><span className="pulse" /> Education</span>
        <h2 className="section-title">Academic <span>Background</span></h2>
        <p className="section-sub">My educational journey</p>
      </div>
      <div className="edu-grid">
        {data.map((edu) => (
          <div key={edu.id} className="edu-card card">
            <span className="edu-year">{edu.year}</span>
            <h3 className="edu-degree">{edu.degree}</h3>
            <p className="edu-inst">{edu.institution}</p>
            <span className="edu-score">{edu.score}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

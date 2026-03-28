import React from 'react';
import useFadeIn from '../../hooks/useFadeIn';
import './Certifications.css';

export default function Certifications({ data }) {
  const ref = useFadeIn();
  return (
    <section id="certifications" className="certs-section">
      <div className="fade-in" ref={ref}>
        <span className="section-label"><span className="pulse" /> Credentials</span>
        <h2 className="section-title">Certifi<span>cations</span></h2>
        <p className="section-sub">Industry recognised certificates</p>
      </div>
      <div className="certs-grid">
        {data.map((cert) => (
          <div key={cert.id} className="cert-card card">
            {cert.image_url ? (
              <img src={cert.image_url} alt={cert.name} className="cert-img" onError={(e) => { e.target.style.display='none'; }} />
            ) : (
              <div className="cert-placeholder">
                <div className="cert-placeholder-icon">🏆</div>
                <span className="cert-placeholder-text">Certificate</span>
              </div>
            )}
            <div className="cert-info">
              <h4 className="cert-name">{cert.name}</h4>
              <p className="cert-issuer">{cert.issuer}</p>
              {cert.year && <span className="cert-year">{cert.year}</span>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

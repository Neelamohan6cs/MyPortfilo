import React, { useState } from 'react';
import useFadeIn from '../../hooks/useFadeIn';
import './Certifications.css';

export default function Certifications({ data }) {
  const ref = useFadeIn();
  const [selected, setSelected] = useState(null);

  return (
    <>
      <section id="certifications" className="certs-section">
        <div className="fade-in" ref={ref}>
          <span className="section-label"><span className="pulse" /> Credentials</span>
          <h2 className="section-title">Certifi<span>cations</span></h2>
          <p className="section-sub">Industry recognised certificates</p>
        </div>

        <div className="certs-grid">
          {data.map((cert) => (
            <div key={cert.id} className="cert-card card" onClick={() => setSelected(cert)}>
              <div className="cert-img-wrap">
                {cert.image_url ? (
                  <img
                    src={cert.image_url}
                    alt={cert.name}
                    className="cert-img"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                ) : (
                  <div className="cert-placeholder">
                    <div className="cert-placeholder-icon">🏆</div>
                    <span className="cert-placeholder-text">Certificate</span>
                  </div>
                )}
                <span className="cert-zoom-hint">⊕ View full</span>
                <span className="cert-verified">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" width="10" height="10">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Verified
                </span>
              </div>
              <div className="cert-info">
                <h4 className="cert-name">{cert.name}</h4>
                <p className="cert-issuer">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  {cert.issuer}
                </p>
                {cert.year && <span className="cert-year">{cert.year}</span>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {selected && (
        <div className="cert-overlay" onClick={(e) => e.target.classList.contains('cert-overlay') && setSelected(null)}>
          <div className="cert-lightbox">
            <button className="cert-lb-close-x" onClick={() => setSelected(null)}>✕</button>
            <div className="cert-lb-img-wrap">
              {selected.image_url ? (
                <img
                  src={selected.image_url}
                  alt={selected.name}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              ) : (
                <div className="cert-lb-placeholder">
                  <div className="cert-lb-ph-icon">🏆</div>
                </div>
              )}
            </div>
            <div className="cert-lb-body">
              <h3 className="cert-lb-name">{selected.name}</h3>
              <p className="cert-lb-issuer">{selected.issuer}</p>
              <div className="cert-lb-footer">
                {selected.year && <span className="cert-year">{selected.year}</span>}
                <button className="cert-lb-btn" onClick={() => setSelected(null)}>✕ Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
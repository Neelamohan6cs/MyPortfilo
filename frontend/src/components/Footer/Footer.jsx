import React from 'react';
import './Footer.css';

export default function Footer({ hero }) {
  return (
    <footer className="footer">
      <div className="footer-left">
        <span className="footer-logo">{hero?.name || 'Neelamohan R'}</span>
        <span className="footer-tagline">Developer & Data Enthusiast</span>
      </div>
      <span className="footer-center">B.E CSE · DSEC Perambalur · 2023–2027</span>
      <span className="footer-right">Built with React & Django</span>
    </footer>
  );
}

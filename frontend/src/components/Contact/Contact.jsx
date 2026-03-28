import React, { useState } from 'react';
import API from '../../utils/api';
import useFadeIn from '../../hooks/useFadeIn';
import './Contact.css';

export default function Contact({ hero }) {
  const ref = useFadeIn();
  const [form,    setForm]    = useState({ name:'', email:'', message:'' });
  const [status,  setStatus]  = useState('');
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/contact/', form);
      setStatus('success');
      setForm({ name:'', email:'', message:'' });
    } catch {
      setStatus('error');
    }
    setLoading(false);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="fade-in" ref={ref}>
        <span className="section-label"><span className="pulse" /> Contact</span>
        <h2 className="section-title">Let's <span>Connect</span></h2>
        <p className="section-sub">Open to internships, collaborations and opportunities</p>
      </div>
      <div className="contact-grid">
        <div className="contact-info">
          <div className="info-row">
            <span className="info-label">Email</span>
            <a href={`mailto:${hero?.email}`} className="info-val">{hero?.email}</a>
          </div>
          <div className="info-row">
            <span className="info-label">Phone</span>
            <span className="info-val">{hero?.phone}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Location</span>
            <span className="info-val">Perambalur, Tamil Nadu, India</span>
          </div>
          <div className="info-row">
            <span className="info-label">College</span>
            <span className="info-val">DSEC · B.E CSE · 2023–2027</span>
          </div>
          <div className="contact-socials">
            <a href={hero?.github   || '#'} target="_blank" rel="noreferrer" className="social-pill">GitHub</a>
            <a href={hero?.linkedin || '#'} target="_blank" rel="noreferrer" className="social-pill">LinkedIn</a>
          </div>
        </div>
        <form className="contact-form card" onSubmit={handleSubmit}>
          <div className="form-field">
            <label>Your Name</label>
            <input name="name" value={form.name} placeholder="John Doe" required onChange={onChange} />
          </div>
          <div className="form-field">
            <label>Email Address</label>
            <input name="email" type="email" value={form.email} placeholder="john@company.com" required onChange={onChange} />
          </div>
          <div className="form-field">
            <label>Message</label>
            <textarea name="message" rows={5} value={form.message} placeholder="Hi Neelamohan, I'd like to discuss an opportunity..." required onChange={onChange} />
          </div>
          {status === 'success' && <p className="form-ok">✓ Message sent successfully!</p>}
          {status === 'error'   && <p className="form-err">✗ Something went wrong. Try again.</p>}
          <button type="submit" className="btn-primary" style={{width:'100%', justifyContent:'center'}} disabled={loading}>
            {loading ? 'Sending...' : 'Send Message →'}
          </button>
        </form>
      </div>
    </section>
  );
}

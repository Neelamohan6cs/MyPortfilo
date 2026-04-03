import React, { useRef, useEffect, useState } from 'react';
import API from '../../utils/api';
import './Gallery.css';

const CAT_COLOR = {
  certificate: '#2563eb',
  internship:  '#7c3aed',
  workshop:    '#0891b2',
  project:     '#059669',
  achievement: '#d97706',
};

export default function Gallery() {
  const trackRef   = useRef(null);
  const animRef    = useRef(null);
  const posRef     = useRef(0);
  const isDragging = useRef(false);
  const dragStart  = useRef(0);

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    API.get('/gallery/')
      .then((res) => {
        setImages(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || images.length === 0) return;

    const animate = () => {
      if (!isDragging.current) {
        posRef.current -= 0.5;
        const half = track.scrollWidth / 2;
        if (Math.abs(posRef.current) >= half) posRef.current = 0;
        track.style.transform = `translateX(${posRef.current}px)`;
      }
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    const stop = () => cancelAnimationFrame(animRef.current);
    const start = () => animRef.current = requestAnimationFrame(animate);

    const onMouseDown = (e) => {
      isDragging.current = true;
      dragStart.current = e.clientX - posRef.current;
      track.style.cursor = 'grabbing';
    };

    const onMouseMove = (e) => {
      if (!isDragging.current) return;
      posRef.current = e.clientX - dragStart.current;
      track.style.transform = `translateX(${posRef.current}px)`;
    };

    const onMouseUp = () => {
      isDragging.current = false;
      track.style.cursor = 'grab';
    };

    track.addEventListener('mouseenter', stop);
    track.addEventListener('mouseleave', start);
    track.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      cancelAnimationFrame(animRef.current);
      track.removeEventListener('mouseenter', stop);
      track.removeEventListener('mouseleave', start);
      track.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [images.length]);

  if (loading || images.length === 0) return null;

  const doubled = [...images, ...images];

  return (
    <section className="gallery-section">
      <div className="gallery-head">
        <h2 className="section-title">
          My <span>Achievements & Gallery</span>
        </h2>
      </div>

      <div className="gallery-wrapper">
        <div className="fade-l" />
        <div className="fade-r" />

        <div className="gallery-track" ref={trackRef}>
          {doubled.map((item, i) => (
            <div key={i} className="g-card" onClick={() => setLightbox(item)}>
              
              <div className="g-img-wrap">
                {item.image_url && (
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="g-img"
                  />
                )}
              </div>

              <div className="g-footer">
                <span className="g-badge">
                  {item.category}
                </span>
                <p className="g-title">{item.title}</p>
              </div>

            </div>
          ))}
        </div>
      </div>

      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <div className="lightbox-box" onClick={(e) => e.stopPropagation()}>
            <button className="lb-close">✕</button>
            <img src={lightbox.image_url} alt="" className="lb-img" />
            <div className="lb-info">
              <h3>{lightbox.title}</h3>
              <p>{lightbox.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
import React, { useRef, useEffect, useState } from 'react';
import API from '../../utils/api';
import './Gallery.css';

export default function Gallery() {
  const trackRef   = useRef(null);
  const animRef    = useRef(null);
  const posRef     = useRef(0);
  const isDragging = useRef(false);
  const dragStart  = useRef(0);

  const [images, setImages] = useState([]);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    API.get('/gallery/')
      .then((res) => setImages(res.data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || images.length === 0) return;

    const animate = () => {
      if (!isDragging.current) {
        posRef.current -= 0.4;
        const half = track.scrollWidth / 2;
        if (Math.abs(posRef.current) >= half) posRef.current = 0;
        track.style.transform = `translateX(${posRef.current}px)`;
      }
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

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

    track.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      cancelAnimationFrame(animRef.current);
      track.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [images.length]);

  if (images.length === 0) return null;

  const doubled = [...images, ...images];

  return (
    <section className="gallery-section">
      <div className="gallery-wrapper">
        <div className="fade-l" />
        <div className="fade-r" />

        <div className="gallery-track" ref={trackRef}>
          {doubled.map((item, i) => (
            <div key={i} className="g-card" onClick={() => setLightbox(item)}>
              
              {/* IMAGE */}
              <div className="g-img-wrap">
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="g-img"
                />
              </div>

              {/* TITLE BELOW IMAGE */}
              <div className="g-footer">
                <p className="g-title">{item.title}</p>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <div className="lightbox-box" onClick={(e) => e.stopPropagation()}>
            <button className="lb-close" onClick={() => setLightbox(null)}>✕</button>

            <img src={lightbox.image_url} alt={lightbox.title} className="lb-img" />

            <div className="lb-info">
              <h3 className="lb-title">{lightbox.title}</h3>
              {lightbox.caption && <p className="lb-caption">{lightbox.caption}</p>}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
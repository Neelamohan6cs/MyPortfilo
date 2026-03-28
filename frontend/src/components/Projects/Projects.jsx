import React, { useState } from 'react';
import useFadeIn from '../../hooks/useFadeIn';
import './Projects.css';

export default function Projects({ data }) {
  const ref = useFadeIn();
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section id="projects" className="projects-section">
      <div className="fade-in" ref={ref}>
        <span className="section-label"><span className="pulse" /> Projects</span>
        <h2 className="section-title">What I've <span>Built</span></h2>
        <p className="section-sub">Real-world projects with modern tech stacks</p>
      </div>
      <div className="projects-grid">
        {data.map((project) => (
          <div key={project.id} className="project-card card">
            <div className="project-media">
              {activeVideo === project.id && project.video_url ? (
                <iframe src={project.video_url} title={project.title} frameBorder="0" allowFullScreen />
              ) : project.image_url ? (
                <img src={project.image_url} alt={project.title} onError={(e) => { e.target.style.display='none'; }} />
              ) : (
                <div className="project-empty">
                  <div className="project-empty-inner">
                    <span className="project-empty-icon">&lt;/&gt;</span>
                    <span className="project-empty-label">Source Code</span>
                  </div>
                </div>
              )}
              {project.video_url && activeVideo !== project.id && (
                <button className="play-btn" onClick={() => setActiveVideo(project.id)}>▶ Watch Demo</button>
              )}
            </div>
            <div className="project-body">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.description}</p>
              <div className="project-tech">
                {(project.tech_list || []).map((t, i) => <span key={i} className="badge">{t}</span>)}
              </div>
              <div className="project-links">
                {project.github_url && <a href={project.github_url} target="_blank" rel="noreferrer" className="plink green">GitHub →</a>}
                {project.live_url   && <a href={project.live_url}   target="_blank" rel="noreferrer" className="plink blue">Live Demo →</a>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

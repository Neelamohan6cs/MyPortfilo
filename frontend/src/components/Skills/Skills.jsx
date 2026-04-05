import React from 'react';
import useFadeIn from '../../hooks/useFadeIn';
import './Skills.css';

// ✅ Icon Component (auto hide if image fails)
const SkillIcon = ({ src, alt }) => {
  const [show, setShow] = React.useState(true);

  if (!show) return null;

  return (
    <div className="skill-icon-wrap">
      <img
        src={src}
        alt={alt}
        className="skill-icon-img"
        onError={() => setShow(false)} // ❌ hide broken image
      />
    </div>
  );
};

// ✅ Map backend skill → frontend icon
const getSkillIcon = (name) => {
  if (!name) return null;

  const key = name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, ''); // normalize

  const icons = {
    html: '/img/skills/html.png',
    css: '/img/skills/css.png',

    javascript: '/img/skills/javascript.png',
    js: '/img/skills/js.png',

    react: '/img/skills/react.png',
    reactjs: '/img/skills/react.png',

    node: '/img/skills/node.png',
    nodejs: '/img/skills/node.png',

    mongodb: '/img/skills/mongodb.png',

    mysql: '/img/skills/mysql.png',

    python: '/img/skills/python.png',
    django: '/img/skills/django.png',
    flask: '/img/skills/flask.png',
  };

  return icons[key] || null; // ❌ return null if not found
};

export default function Skills({ data }) {
  const ref = useFadeIn();

  // ✅ Filter only skills that have valid icons
  const validSkills =
    data && data.length > 0
      ? data.filter((skill) => getSkillIcon(skill.name))
      : [];

  return (
    <section id="skills" className="skills-section">
      
      {/* Header */}
      <div className="skills-header fade-in" ref={ref}>
        <h2 className="section-title">
          My <span className="skills-title-accent">Skills</span>
        </h2>
      </div>

      {/* Skills Grid */}
      <div className="skills-icon-grid">
        {validSkills.length > 0 ? (
          validSkills.map((skill, i) => (
            <div
              key={skill.id}
              className="skill-tile"
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              {/* ✅ Only valid icons shown */}
              <SkillIcon
                src={getSkillIcon(skill.name)}
                alt={skill.name}
              />

              <span className="skill-tile-name">
                {skill.name.toUpperCase()}
              </span>
            </div>
          ))
        ) : (
          <p className="no-skills">No skills available</p>
        )}
      </div>

    </section>
  );
}
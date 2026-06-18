import React, { useState } from 'react';
import './Skills.css';

/* ─────────────────────────────────────────────────────────
   MERN Stack — Skills Component
   Layout (PC):  Tooling top | Frontend — AWS — Backend | DB bottom
   Layout (Mobile): same order, stacked vertically
   Animated data packets: blue (request) & green (response)
───────────────────────────────────────────────────────── */

const ICON_BASE = 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/';

const SKILLS = {
  frontend: [
    { name: 'React',       svg: 'react',              color: '#61dbfb' },
    { name: 'Next.js',     svg: 'nextdotjs',          color: '#555555' },
    { name: 'TypeScript',  svg: 'typescript',         color: '#3178c6' },
    { name: 'Redux',       svg: 'redux',              color: '#764abc' },
    { name: 'Tailwind',    svg: 'tailwindcss',        color: '#38bdf8' },
    { name: 'HTML5',       svg: 'html5',              color: '#e44d26' },
    { name: 'CSS3',        svg: 'css3',               color: '#264de4' },
    { name: 'Sass',        svg: 'sass',               color: '#cc6699' },
  ],
  backend: [
    { name: 'Node.js',     svg: 'nodedotjs',          color: '#68a063' },
    { name: 'Express',     svg: 'express',            color: '#888888' },
    { name: 'GraphQL',     svg: 'graphql',            color: '#e535ab' },
    { name: 'Socket.io',   svg: 'socketdotio',        color: '#010101' },
    { name: 'Python',      svg: 'python',             color: '#ffd43b' },
    { name: 'Django',      svg: 'django',             color: '#0c4b33' },
  ],
  database: [
    { name: 'MongoDB',     svg: 'mongodb',            color: '#00ed64' },
    { name: 'Redis',       svg: 'redis',              color: '#ff4438' },
    { name: 'MySQL',       svg: 'mysql',              color: '#00758f' },
    { name: 'Firebase',    svg: 'firebase',           color: '#ff9800' },
    { name: 'PostgreSQL',  svg: 'postgresql',         color: '#336791' },
  ],
  tooling: [
    { name: 'Git',         svg: 'git',                color: '#f05032' },
    { name: 'GitHub',      svg: 'github',             color: '#888888' },
    { name: 'Docker',      svg: 'docker',             color: '#2496ed' },
    { name: 'VS Code',     svg: 'visualstudiocode',   color: '#007acc' },
    { name: 'Postman',     svg: 'postman',            color: '#ff6c37' },
    { name: 'npm',         svg: 'npm',                color: '#cb3837' },
  ],
};

// ── Chip: icon + label, with fallback monogram ──────────────────────────────
// simple-icons SVGs are flat monochrome shapes — loading them as a plain
// <img> ignores skill.color entirely. We mask the shape and paint the exact
// brand color through it via background-color, so every icon shows its real
// color instead of one uniform block color. A hidden probe <img> preserves
// the original load-failure → monogram fallback behavior.
function Chip({ skill }) {
  const [imgOk, setImgOk] = useState(true);
  const iconUrl = `${ICON_BASE}${skill.svg}.svg`;

  return (
    <div
      className="sk-chip"
      title={skill.name}
      style={{ borderColor: `${skill.color}55` }}
    >
      <img
        src={iconUrl}
        alt=""
        aria-hidden="true"
        className="sk-chip-probe"
        onError={() => setImgOk(false)}
      />
      {imgOk ? (
        <div
          className="sk-chip-icon"
          style={{
            backgroundColor: skill.color,
            WebkitMaskImage: `url(${iconUrl})`,
            maskImage: `url(${iconUrl})`,
          }}
        />
      ) : (
        <div
          className="sk-chip-fb"
          style={{ background: `${skill.color}22`, color: skill.color }}
        >
          {skill.name[0]}
        </div>
      )}
      <span className="sk-chip-lbl" style={{ color: skill.color }}>
        {skill.name}
      </span>
    </div>
  );
}

// ── Chip group ──────────────────────────────────────────────────────────────
function Chips({ skills }) {
  return (
    <div className="sk-chips">
      {skills.map(s => <Chip key={s.name} skill={s} />)}
    </div>
  );
}

// ── Layer pill label ─────────────────────────────────────────────────────────
function Pill({ children, variant }) {
  return <div className={`sk-pill sk-pill-${variant}`}>{children}</div>;
}

// ── Layer card wrapper ───────────────────────────────────────────────────────
function LayerCard({ skills, accentColor }) {
  return (
    <div className="sk-layer-box" style={{ borderColor: `${accentColor}55` }}>
      <Chips skills={skills} />
    </div>
  );
}

// ── AWS Cloud Hub ────────────────────────────────────────────────────────────
function AwsHub() {
  return (
    <div className="sk-hub-col">
      <div className="sk-hub-box">
        <svg width="40" height="32" viewBox="0 0 40 32" fill="none" className="sk-hub-pulse">
          <path
            d="M32 14.5c0-.5-.1-1-.2-1.5A8 8 0 0 0 15.5 11a5.5 5.5 0 0 0-5.5 5.5c0 .3 0 .5.1.8A5.5 5.5 0 0 0 10.5 28h20a5.5 5.5 0 0 0 1.5-10.5z"
            fill="#fff7ed"
            stroke="#f97316"
            strokeWidth="1.2"
          />
          <text
            x="20" y="21"
            textAnchor="middle"
            fontSize="7.5"
            fontWeight="800"
            fill="#c2410c"
            fontFamily="sans-serif"
          >
            AWS
          </text>
        </svg>
        <div className="sk-hub-text">
          <div className="sk-hub-title">Cloud / AWS</div>
          <div className="sk-hub-sub">Full-Stack Core</div>
        </div>
      </div>
    </div>
  );
}

// ── Horizontal animated arrow (request + response) ───────────────────────────
function HArrow({ topLabel, bottomLabel, fwdColor, revColor, fwdDelay = 0, revDelay = 0.9 }) {
  return (
    <div className="sk-h-arrow">
      <span className="sk-h-lbl">{topLabel}</span>
      <div className="sk-track-pair">
        {/* Forward */}
        <div className="sk-track">
          <div className="sk-track-line" style={{ background: fwdColor }} />
          <div
            className="sk-pkt"
            style={{ background: fwdColor, animationDelay: `${fwdDelay}s` }}
          />
          <div className="sk-ah-r" style={{ '--ah-color': fwdColor }} />
        </div>
        {/* Return */}
        <div className="sk-track sk-track-rev">
          <div className="sk-ah-l" style={{ '--ah-color': revColor }} />
          <div className="sk-track-line" style={{ background: revColor }} />
          <div
            className="sk-pkt sk-pkt-rev"
            style={{ background: revColor, animationDelay: `${revDelay}s` }}
          />
        </div>
      </div>
      <span className="sk-h-lbl">{bottomLabel}</span>
    </div>
  );
}

// ── Vertical animated connector ──────────────────────────────────────────────
function VConnector({ color, delay = 0 }) {
  return (
    <div className="sk-v-conn">
      <div className="sk-v-line">
        <div
          className="sk-v-pkt"
          style={{ background: color, animationDelay: `${delay}s` }}
        />
      </div>
      <div className="sk-v-head" />
    </div>
  );
}

// ── Main exported component ──────────────────────────────────────────────────
export default function Skills() {
  return (
    <section id="skills" className="sk-section">

      {/* ── Header ── */}
      <div className="sk-header">
      {/* <span className="sk-eyebrow">MERN Stack</span> */}
        <h2 className="sk-h2">
          My <span className="sk-accent">Tech Stack</span>
        </h2>
        {/* <p className="sk-sub">How a full-stack request travels: Browser → Cloud → Server → Database</p> */}
      </div>

      {/* ── Cloud / deployment frame ── */}
      <div className="sk-cloud-wrap">
        <div className="sk-cloud-badge">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z" />
          </svg>
          Deployed on Cloud / AWS
        </div>

        {/* ── Tooling top ── */}
        <div className="sk-top-block">
          <Pill variant="tool">Tooling / DevOps</Pill>
          <Chips skills={SKILLS.tooling} />
        </div>

        <VConnector color="#a855f7" delay={0} />

        {/* ── Main flow row: Frontend | AWS | Backend ── */}
        <div className="sk-flow-row">

          <div className="sk-panel">
            <Pill variant="fe">Frontend / Client</Pill>
            <LayerCard skills={SKILLS.frontend} accentColor="#3b82f6" />
          </div>

          <HArrow
            topLabel="Request"
            bottomLabel="Response"
            fwdColor="#3b82f6"
            revColor="#22c55e"
            fwdDelay={0}
            revDelay={0.9}
          />

          <AwsHub />

          <HArrow
            topLabel="API Call"
            bottomLabel="Data"
            fwdColor="#3b82f6"
            revColor="#22c55e"
            fwdDelay={0.4}
            revDelay={1.4}
          />

          <div className="sk-panel">
            <Pill variant="be">Backend / Server</Pill>
            <LayerCard skills={SKILLS.backend} accentColor="#22c55e" />
          </div>

        </div>

        <VConnector color="#f59e0b" delay={0.5} />

        {/* ── Database bottom ── */}
        <div className="sk-bottom-block">
          <div className="sk-panel sk-panel-db">
            <Pill variant="db">Database / Data</Pill>
            <LayerCard skills={SKILLS.database} accentColor="#f59e0b" />
          </div>
        </div>

      </div>

    </section>
  );
}

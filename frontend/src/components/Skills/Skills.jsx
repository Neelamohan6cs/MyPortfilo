import React from 'react';
import useFadeIn from '../../hooks/useFadeIn';
import './Skills.css';

/* ============================================================================
   MERN / FULL-STACK TECH NETWORK
   ----------------------------------------------------------------------------
   Architecture mirrors the real MERN request lifecycle instead of a generic
   "frontend / backend / db" cloud:

     CLIENT (React, Redux, Next.js, TS, Tailwind...)
         │  HTTP / REST / GraphQL
         ▼
     SERVER (Node, Express, Socket.io, JWT...)
         │  Driver / ODM
         ▼
     DATA (MongoDB, Mongoose, Redis...)

   A 4th ring — TOOLING (Git, Docker, AWS, Postman, VS Code) — sits around the
   hub since these support all three layers rather than belonging to one.
   The hub itself spells out M·E·R·N, which is the actual signature of this
   stack rather than a decorative cloud/docker glyph pairing.
============================================================================ */

// ─── Skill icon (hides on broken img, falls back to monogram chip) ─────────
const SkillIcon = ({ src, alt, color }) => {
  const [show, setShow] = React.useState(true);
  if (!show || !src) {
    const letter = (alt || '?').trim().charAt(0).toUpperCase();
    return (
      <span className="skill-tile-monogram" style={{ '--glow': color }}>
        {letter}
      </span>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      className="skill-tile-img"
      onError={() => setShow(false)}
    />
  );
};

// ─── Icon map ────────────────────────────────────────────────────────────────
const ICONS = {
  // Client / Frontend
  html:        '/img/skills/html.png',
  html5:       '/img/skills/html.png',
  css:         '/img/skills/css.png',
  css3:        '/img/skills/css.png',
  javascript:  '/img/skills/javascript.png',
  js:          '/img/skills/javascript.png',
  typescript:  '/img/skills/typescript.png',
  ts:          '/img/skills/typescript.png',
  react:       '/img/skills/react.png',
  reactjs:     '/img/skills/react.png',
  redux:       '/img/skills/redux.png',
  nextjs:      '/img/skills/nextjs.png',
  next:        '/img/skills/nextjs.png',
  tailwind:    '/img/skills/tailwind.png',
  tailwindcss: '/img/skills/tailwind.png',
  bootstrap:   '/img/skills/bootstrap.png',
  sass:        '/img/skills/sass.png',

  // Server / Backend
  node:        '/img/skills/node.png',
  nodejs:      '/img/skills/node.png',
  express:     '/img/skills/express.png',
  expressjs:   '/img/skills/express.png',
  socketio:    '/img/skills/socketio.png',
  graphql:     '/img/skills/graphql.png',
  jwt:         '/img/skills/jwt.png',
  rest:        '/img/skills/rest.png',
  restapi:     '/img/skills/rest.png',
  python:      '/img/skills/python.png',
  django:      '/img/skills/django.png',
  flask:       '/img/skills/flask.png',

  // Data
  mongodb:     '/img/skills/mongodb.png',
  mongoose:    '/img/skills/mongoose.png',
  redis:       '/img/skills/redis.png',
  mysql:       '/img/skills/mysql.png',
  postgresql:  '/img/skills/postgresql.png',
  postgres:    '/img/skills/postgresql.png',
  firebase:    '/img/skills/firebase.png',

  // Tooling / DevOps
  git:         '/img/skills/git.png',
  github:      '/img/skills/github.png',
  docker:      '/img/skills/docker.png',
  aws:         '/img/skills/aws.png',
  vercel:      '/img/skills/vercel.png',
  postman:     '/img/skills/postman.png',
  vscode:      '/img/skills/vscode.png',
  npm:         '/img/skills/npm.png',
};

const getSkillIcon = (name) => {
  if (!name) return null;
  const key = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  return ICONS[key] || null;
};

// ─── Brand colour per skill ──────────────────────────────────────────────────
const COLORS = {
  html: '#e44d26',   html5: '#e44d26',
  css: '#264de4',    css3: '#264de4',
  javascript: '#f7df1e', js: '#f7df1e',
  typescript: '#3178c6', ts: '#3178c6',
  react: '#61dbfb',  reactjs: '#61dbfb',
  redux: '#764abc',
  nextjs: '#ffffff', next: '#ffffff',
  tailwind: '#38bdf8', tailwindcss: '#38bdf8',
  bootstrap: '#7952b3',
  sass: '#cc6699',

  node: '#68a063',   nodejs: '#68a063',
  express: '#9e9e9e', expressjs: '#9e9e9e',
  socketio: '#ffffff',
  graphql: '#e535ab',
  jwt: '#d63aff',
  rest: '#2dd4bf', restapi: '#2dd4bf',
  python: '#ffd43b',
  django: '#0c4b33',
  flask: '#aaaaaa',

  mongodb: '#00ed64',
  mongoose: '#88001a',
  redis: '#ff4438',
  mysql: '#00758f',
  postgresql: '#336791', postgres: '#336791',
  firebase: '#ff9800',

  git: '#f05032',
  github: '#cccccc',
  docker: '#2496ed',
  aws: '#ff9900',
  vercel: '#ffffff',
  postman: '#ff6c37',
  vscode: '#007acc',
  npm: '#cb3837',
};

const getSkillColor = (name) => {
  if (!name) return '#22d3ee';
  const key = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  return COLORS[key] || '#22d3ee';
};

// ─── MERN layer membership (this is the real architecture, not a guess) ────
const CLIENT_KEYS  = ['html','html5','css','css3','javascript','js','typescript','ts','react','reactjs','redux','nextjs','next','tailwind','tailwindcss','bootstrap','sass'];
const SERVER_KEYS  = ['node','nodejs','express','expressjs','socketio','graphql','jwt','rest','restapi','python','django','flask'];
const DATA_KEYS    = ['mongodb','mongoose','redis','mysql','postgresql','postgres','firebase'];
const TOOLING_KEYS = ['git','github','docker','aws','vercel','postman','vscode','npm'];

const LAYER_META = {
  client:  { label: 'Client',  tag: 'UI',     side: 'left'   },
  server:  { label: 'Server',  tag: 'API',    side: 'right'  },
  data:    { label: 'Data',    tag: 'DB',     side: 'bottom' },
  tooling: { label: 'Tooling', tag: 'OPS',    side: 'top'    },
};

const getLayer = (name) => {
  const key = (name || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  if (CLIENT_KEYS.includes(key))  return 'client';
  if (DATA_KEYS.includes(key))    return 'data';
  if (TOOLING_KEYS.includes(key)) return 'tooling';
  if (SERVER_KEYS.includes(key))  return 'server';
  return 'server'; // unknown → assume backend utility
};

// ─── Main component ──────────────────────────────────────────────────────────
export default function Skills({ data }) {
  const ref = useFadeIn();

  const allSkills = (data || []).filter((s) => s && s.name);

  const clientSkills  = allSkills.filter((s) => getLayer(s.name) === 'client');
  const serverSkills  = allSkills.filter((s) => getLayer(s.name) === 'server');
  const dataSkills    = allSkills.filter((s) => getLayer(s.name) === 'data');
  const toolingSkills = allSkills.filter((s) => getLayer(s.name) === 'tooling');

  return (
    <section id="skills" className="skills-section">

      {/* ── Header ── */}
      <div className="skills-header fade-in" ref={ref}>
        <span className="skills-eyebrow">M·E·R·N — Full Stack</span>
        <h2 className="skills-title">
          My <span className="skills-title-accent">Tech Stack</span>
        </h2>
        <p className="skills-subtitle">
          From the browser to the database — one connected request lifecycle.
        </p>
      </div>

      {/* ── Network card ── */}
      <div className="skills-card">

        {/* column labels — read like an architecture diagram, not decoration */}
        <div className="skills-col-labels">
          <span className="skills-col-label label-client">⌘ Client</span>
          <span className="skills-col-label label-tooling">⚙ Tooling</span>
          <span className="skills-col-label label-server">⬡ Server</span>
        </div>

        {/* canvas + positioned tiles */}
        <div className="skills-network" id="skills-network">
          <canvas id="skills-canvas" className="skills-canvas" />

          {/* CENTER HUB — the MERN acronym itself */}
          <div className="skills-hub" id="skills-hub">
            <div className="skills-hub-ring">
              <div className="skills-hub-circle">
                <div className="skills-hub-letters">
                  <span className="hub-letter hub-letter-m">M</span>
                  <span className="hub-letter hub-letter-e">E</span>
                  <span className="hub-letter hub-letter-r">R</span>
                  <span className="hub-letter hub-letter-n">N</span>
                </div>
                <div className="skills-hub-label">Full-Stack Core</div>
              </div>
            </div>
          </div>

          {/* CLIENT — left (React layer) */}
          {clientSkills.map((skill, i) => (
            <SkillTile key={skill.id ?? skill.name} skill={skill} layer="client" side="left" idx={i} total={clientSkills.length} />
          ))}

          {/* SERVER — right (Express/Node layer) */}
          {serverSkills.map((skill, i) => (
            <SkillTile key={skill.id ?? skill.name} skill={skill} layer="server" side="right" idx={i} total={serverSkills.length} />
          ))}

          {/* DATA — bottom arc (Mongo layer) */}
          {dataSkills.map((skill, i) => (
            <SkillTile key={skill.id ?? skill.name} skill={skill} layer="data" side="bottom" idx={i} total={dataSkills.length} />
          ))}

          {/* TOOLING — top arc (supports all layers) */}
          {toolingSkills.map((skill, i) => (
            <SkillTile key={skill.id ?? skill.name} skill={skill} layer="tooling" side="top" idx={i} total={toolingSkills.length} />
          ))}
        </div>

        {/* Data label below network */}
        {dataSkills.length > 0 && (
          <div className="skills-db-label">
            <span className="skills-col-label label-db">🗄 Database</span>
          </div>
        )}
      </div>

      {/* ── Canvas animator ── */}
      <SkillsCanvas
        client={clientSkills}
        server={serverSkills}
        data={dataSkills}
        tooling={toolingSkills}
      />
    </section>
  );
}

// ─── Single tile ─────────────────────────────────────────────────────────────
function SkillTile({ skill, layer, side, idx, total }) {
  const color = getSkillColor(skill.name);
  const src   = getSkillIcon(skill.name);
  const tag   = LAYER_META[layer]?.tag ?? '';
  return (
    <div
      className="skill-tile"
      data-side={side}
      data-idx={idx}
      data-total={total}
      data-color={color}
      style={{ '--glow': color, animationDelay: `${idx * 0.1}s` }}
    >
      <div className="skill-tile-box" style={{ '--glow': color }}>
        <SkillIcon src={src} alt={skill.name} color={color} />
      </div>
      <span className="skill-tile-name">{skill.name}</span>
      <span className="skill-tile-tag" style={{ '--glow': color }}>{tag}</span>
    </div>
  );
}

// ─── Canvas — glowing lines + traveling dots ──────────────────────────────────
function SkillsCanvas({ client, server, data, tooling }) {
  React.useEffect(() => {
    let animId = null;

    function init() {
      const canvas    = document.getElementById('skills-canvas');
      const container = document.getElementById('skills-network');
      if (!canvas || !container) return;

      const W  = container.offsetWidth;
      const H  = container.offsetHeight;
      canvas.width  = W;
      canvas.height = H;
      const ctx = canvas.getContext('2d');
      const cx  = W / 2;
      const cy  = H / 2;

      const place = (selector, x, y) => {
        const el = document.querySelector(selector);
        if (el) { el.style.left = x + 'px'; el.style.top = y + 'px'; }
      };

      const isMobile  = W < 480;
      const isTablet  = W < 768;
      const leftX     = isMobile ? W * 0.13 : isTablet ? W * 0.12 : W * 0.10;
      const rightX    = isMobile ? W * 0.87 : isTablet ? W * 0.88 : W * 0.90;
      const xWiggleAmt = isMobile ? 10 : 20;

      // CLIENT — left, vertically stacked
      const clientCount = client.length;
      const clientGap    = Math.min(isMobile ? 80 : 108, (H * 0.62) / Math.max(clientCount, 1));
      const clientStartY = cy - ((clientCount - 1) * clientGap) / 2;
      document.querySelectorAll('[data-side="left"]').forEach((el) => {
        const i = parseInt(el.dataset.idx);
        const xWiggle = i % 2 === 0 ? 0 : xWiggleAmt;
        el.style.left = (leftX + xWiggle) + 'px';
        el.style.top  = (clientStartY + i * clientGap) + 'px';
      });

      // SERVER — right
      const serverCount = server.length;
      const serverGap    = Math.min(isMobile ? 80 : 108, (H * 0.62) / Math.max(serverCount, 1));
      const serverStartY = cy - ((serverCount - 1) * serverGap) / 2;
      document.querySelectorAll('[data-side="right"]').forEach((el) => {
        const i = parseInt(el.dataset.idx);
        const xWiggle = i % 2 === 0 ? 0 : -xWiggleAmt;
        el.style.left = (rightX + xWiggle) + 'px';
        el.style.top  = (serverStartY + i * serverGap) + 'px';
      });

      // DATA — bottom arc
      const dataCount = data.length;
      const dataY      = cy + (isMobile ? 130 : 170);
      const dataSpread = Math.min(W * (isMobile ? 0.68 : 0.5), dataCount * (isMobile ? 70 : 105));
      document.querySelectorAll('[data-side="bottom"]').forEach((el) => {
        const i = parseInt(el.dataset.idx);
        const fraction = dataCount === 1 ? 0.5 : i / (dataCount - 1);
        const x = (cx - dataSpread / 2) + fraction * dataSpread;
        el.style.left = x + 'px';
        el.style.top  = dataY + 'px';
      });

      // TOOLING — top arc
      const toolingCount = tooling.length;
      const toolingY      = cy - (isMobile ? 130 : 170);
      const toolingSpread = Math.min(W * (isMobile ? 0.62 : 0.42), toolingCount * (isMobile ? 64 : 95));
      document.querySelectorAll('[data-side="top"]').forEach((el) => {
        const i = parseInt(el.dataset.idx);
        const fraction = toolingCount === 1 ? 0.5 : i / (toolingCount - 1);
        const x = (cx - toolingSpread / 2) + fraction * toolingSpread;
        el.style.left = x + 'px';
        el.style.top  = toolingY + 'px';
      });

      // ── Animate ─────────────────────────────────────────────────────────────
      let t = 0;

      function frame() {
        ctx.clearRect(0, 0, W, H);
        t += 0.013;

        document.querySelectorAll('.skill-tile').forEach((tile, globalIdx) => {
          const nx = parseFloat(tile.style.left);
          const ny = parseFloat(tile.style.top);
          if (isNaN(nx)) return;

          const color = tile.dataset.color || '#22d3ee';
          const side  = tile.dataset.side;

          // Control point for curve — flow direction matches request lifecycle:
          // client -> hub -> server -> hub -> data, tooling floats in from top
          let cpx, cpy;
          if (side === 'left') {
            cpx = nx + (cx - nx) * 0.5;
            cpy = ny + (cy - ny) * 0.35;
          } else if (side === 'right') {
            cpx = nx + (cx - nx) * 0.5;
            cpy = ny + (cy - ny) * 0.35;
          } else if (side === 'top') {
            cpx = (nx + cx) / 2;
            cpy = ny + 90;
          } else {
            // bottom — curve upward toward hub
            cpx = (nx + cx) / 2;
            cpy = ny - 90;
          }

          const grad = ctx.createLinearGradient(nx, ny, cx, cy);
          grad.addColorStop(0,    color + '22');
          grad.addColorStop(0.5,  color + '77');
          grad.addColorStop(1,    color + 'dd');
          ctx.beginPath();
          ctx.moveTo(nx, ny);
          ctx.quadraticCurveTo(cpx, cpy, cx, cy);
          ctx.strokeStyle = grad;
          ctx.lineWidth   = 1.8;
          ctx.shadowBlur  = 10;
          ctx.shadowColor = color;
          ctx.stroke();
          ctx.shadowBlur  = 0;

          const p  = Math.sin(t * 0.85 + globalIdx * 1.05) * 0.5 + 0.5;
          const q  = 1 - p;
          const dx = q*q*nx + 2*q*p*cpx + p*p*cx;
          const dy = q*q*ny + 2*q*p*cpy + p*p*cy;
          ctx.beginPath();
          ctx.arc(dx, dy, 4, 0, Math.PI * 2);
          ctx.fillStyle   = color;
          ctx.shadowBlur  = 18;
          ctx.shadowColor = color;
          ctx.fill();
          ctx.shadowBlur  = 0;

          const p2 = Math.max(0, p - 0.15);
          const q2 = 1 - p2;
          const gx = q2*q2*nx + 2*q2*p2*cpx + p2*p2*cx;
          const gy = q2*q2*ny + 2*q2*p2*cpy + p2*p2*cy;
          ctx.beginPath();
          ctx.arc(gx, gy, 2.2, 0, Math.PI * 2);
          ctx.fillStyle   = color + '55';
          ctx.shadowBlur  = 8;
          ctx.shadowColor = color;
          ctx.fill();
          ctx.shadowBlur  = 0;
        });

        animId = requestAnimationFrame(frame);
      }

      if (animId) cancelAnimationFrame(animId);
      frame();
    }

    const timeout = setTimeout(init, 80);
    window.addEventListener('resize', init);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', init);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [client, server, data, tooling]);

  return null;
}

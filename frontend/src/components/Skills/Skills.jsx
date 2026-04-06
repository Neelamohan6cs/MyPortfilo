import React from 'react';
import useFadeIn from '../../hooks/useFadeIn';
import './Skills.css';

// ─── Skill icon (hides on broken img) ───────────────────────────────────────
const SkillIcon = ({ src, alt }) => {
  const [show, setShow] = React.useState(true);
  if (!show) return <span className="skill-tile-emoji">💡</span>;
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
const getSkillIcon = (name) => {
  if (!name) return null;
  const key = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  const icons = {
    html:        '/img/skills/html.png',
    html5:       '/img/skills/html.png',
    css:         '/img/skills/css.png',
    css3:        '/img/skills/css.png',
    javascript:  '/img/skills/javascript.png',
    js:          '/img/skills/javascript.png',
    react:       '/img/skills/react.png',
    reactjs:     '/img/skills/react.png',
    tailwind:    '/img/skills/tailwind.png',
    tailwindcss: '/img/skills/tailwind.png',
    bootstrap:   '/img/skills/bootstrap.png',
    node:        '/img/skills/node.png',
    nodejs:      '/img/skills/node.png',
    express:     '/img/skills/express.png',
    expressjs:   '/img/skills/express.png',
    python:      '/img/skills/python.png',
    django:      '/img/skills/django.png',
    flask:       '/img/skills/flask.png',
    mongodb:     '/img/skills/mongodb.png',
    mysql:       '/img/skills/mysql.png',
    postgresql:  '/img/skills/postgresql.png',
    postgres:    '/img/skills/postgresql.png',
    firebase:    '/img/skills/firebase.png',
    git:         '/img/skills/git.png',
    docker:      '/img/skills/docker.png',
    aws:         '/img/skills/aws.png',
  };
  return icons[key] || null;
};

// ─── Brand colour per skill ──────────────────────────────────────────────────
const getSkillColor = (name) => {
  if (!name) return '#2563eb';
  const key = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  const map = {
    html: '#e44d26',   html5: '#e44d26',
    css: '#264de4',    css3: '#264de4',
    javascript: '#f7df1e', js: '#f7df1e',
    react: '#61dbfb',  reactjs: '#61dbfb',
    tailwind: '#38bdf8', tailwindcss: '#38bdf8',
    bootstrap: '#7952b3',
    node: '#68a063',   nodejs: '#68a063',
    express: '#888888', expressjs: '#888888',
    python: '#ffd43b',
    django: '#0c4b33',
    flask: '#aaaaaa',
    mongodb: '#00ed64',
    mysql: '#00758f',
    postgresql: '#336791', postgres: '#336791',
    firebase: '#ff9800',
    git: '#f05032',
    docker: '#2496ed',
    aws: '#ff9900',
  };
  return map[key] || '#2563eb';
};

// ─── Which column does a skill belong to? ───────────────────────────────────
const FRONTEND_KEYS  = ['html','html5','css','css3','javascript','js','react','reactjs','tailwind','tailwindcss','bootstrap'];
const BACKEND_KEYS   = ['node','nodejs','express','expressjs','python','django','flask','git'];
const DATABASE_KEYS  = ['mongodb','mysql','postgresql','postgres','firebase'];

const getSide = (name) => {
  const key = (name || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  if (FRONTEND_KEYS.includes(key))  return 'left';
  if (DATABASE_KEYS.includes(key))  return 'bottom';
  if (BACKEND_KEYS.includes(key))   return 'right';
  return 'right'; // default unknown → backend side
};

// ─── Main component ──────────────────────────────────────────────────────────
export default function Skills({ data }) {
  const ref = useFadeIn();

  const validSkills = (data || []).filter((s) => getSkillIcon(s.name));

  const frontendSkills  = validSkills.filter(s => getSide(s.name) === 'left');
  const backendSkills   = validSkills.filter(s => getSide(s.name) === 'right');
  const databaseSkills  = validSkills.filter(s => getSide(s.name) === 'bottom');

  return (
    <section id="skills" className="skills-section">

      {/* ── Header ── */}
      <div className="skills-header fade-in" ref={ref}>
        
        <h2 className="skills-title">
          My <span className="skills-title-accent">Experience </span>
        </h2>
        
      </div>

      {/* ── Network card ── */}
      <div className="skills-card">

        {/* column labels */}
        <div className="skills-col-labels">
          <span className="skills-col-label label-frontend">⬡ Frontend</span>
          <span className="skills-col-label label-cloud">☁ Cloud Hub</span>
          <span className="skills-col-label label-backend">⬡ Backend</span>
        </div>

        {/* canvas + positioned tiles */}
        <div className="skills-network" id="skills-network">
          <canvas id="skills-canvas" className="skills-canvas" />

          {/* CENTER HUB */}
          <div className="skills-hub" id="skills-hub">
            <div className="skills-hub-ring">
              <div className="skills-hub-circle">
                <div className="skills-hub-icons">
                  <span className="hub-ico">☁️</span>
                  <span className="hub-ico">🐳</span>
                </div>
                <div className="skills-hub-label">AWS · Docker</div>
              </div>
            </div>
          </div>

          {/* FRONTEND — left */}
          {frontendSkills.map((skill, i) => (
            <SkillTile key={skill.id} skill={skill} side="left"  idx={i} total={frontendSkills.length} />
          ))}

          {/* BACKEND — right */}
          {backendSkills.map((skill, i) => (
            <SkillTile key={skill.id} skill={skill} side="right" idx={i} total={backendSkills.length} />
          ))}

          {/* DATABASES — bottom arc */}
          {databaseSkills.map((skill, i) => (
            <SkillTile key={skill.id} skill={skill} side="bottom" idx={i} total={databaseSkills.length} />
          ))}
        </div>

        {/* Database label below network */}
        {databaseSkills.length > 0 && (
          <div className="skills-db-label">
            <span className="skills-col-label label-db">🗄 Databases</span>
          </div>
        )}
      </div>

      {/* ── Canvas animator ── */}
      <SkillsCanvas
        frontend={frontendSkills}
        backend={backendSkills}
        databases={databaseSkills}
      />
    </section>
  );
}

// ─── Single tile ─────────────────────────────────────────────────────────────
function SkillTile({ skill, side, idx, total }) {
  const color = getSkillColor(skill.name);
  const src   = getSkillIcon(skill.name);
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
        {src ? (
          <SkillIcon src={src} alt={skill.name} />
        ) : (
          <span className="skill-tile-emoji">💡</span>
        )}
      </div>
      <span className="skill-tile-name">{skill.name}</span>
    </div>
  );
}

// ─── Canvas — glowing lines + traveling dots ──────────────────────────────────
function SkillsCanvas({ frontend, backend, databases }) {
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
      const cy  = H / 2 - 20; // hub sits slightly above true center (db row below)

      // ── Position tiles ──────────────────────────────────────────────────────
      const place = (selector, x, y) => {
        const el = document.querySelector(selector);
        if (el) { el.style.left = x + 'px'; el.style.top = y + 'px'; }
      };

      // LEFT — frontend (stacked vertically)
      const leftCount = frontend.length;
      const leftGap   = Math.min(108, (H * 0.72) / Math.max(leftCount, 1));
      const leftStartY = cy - ((leftCount - 1) * leftGap) / 2;
      document.querySelectorAll('[data-side="left"]').forEach((el) => {
        const i = parseInt(el.dataset.idx);
        const xWiggle = i % 2 === 0 ? 0 : 20;
        el.style.left = (W * 0.10 + xWiggle) + 'px';
        el.style.top  = (leftStartY + i * leftGap) + 'px';
      });

      // RIGHT — backend
      const rightCount = backend.length;
      const rightGap   = Math.min(108, (H * 0.72) / Math.max(rightCount, 1));
      const rightStartY = cy - ((rightCount - 1) * rightGap) / 2;
      document.querySelectorAll('[data-side="right"]').forEach((el) => {
        const i = parseInt(el.dataset.idx);
        const xWiggle = i % 2 === 0 ? 0 : -20;
        el.style.left = (W * 0.90 + xWiggle) + 'px';
        el.style.top  = (rightStartY + i * rightGap) + 'px';
      });

      // BOTTOM — databases spread in arc below hub
      const dbCount = databases.length;
      const dbY     = cy + 180;
      const dbSpread = Math.min(W * 0.55, dbCount * 110);
      document.querySelectorAll('[data-side="bottom"]').forEach((el) => {
        const i = parseInt(el.dataset.idx);
        const fraction = dbCount === 1 ? 0.5 : i / (dbCount - 1);
        const x = (cx - dbSpread / 2) + fraction * dbSpread;
        el.style.left = x + 'px';
        el.style.top  = dbY + 'px';
      });

      // ── Animate ─────────────────────────────────────────────────────────────
      let t = 0;

      function frame() {
        ctx.clearRect(0, 0, W, H);
        t += 0.013;

        document.querySelectorAll('.skill-tile').forEach((tile, globalIdx) => {
          const nx    = parseFloat(tile.style.left);
          const ny    = parseFloat(tile.style.top);
          if (isNaN(nx)) return;

          const color  = tile.dataset.color || '#2563eb';
          const side   = tile.dataset.side;
          const rowIdx = parseInt(tile.dataset.idx);
          const total  = parseInt(tile.dataset.total) || 1;

          // Control point for curve
          let cpx, cpy;
          if (side === 'left') {
            cpx = nx + (cx - nx) * 0.5;
            cpy = ny + (cy - ny) * 0.35;
          } else if (side === 'right') {
            cpx = nx + (cx - nx) * 0.5;
            cpy = ny + (cy - ny) * 0.35;
          } else {
            // bottom — curve upward toward hub
            cpx = (nx + cx) / 2;
            cpy = ny - 90;
          }

          // Glow line
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

          // Traveling dot
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

          // Ghost trail
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

    // slight delay so DOM positions settle
    const timeout = setTimeout(init, 80);
    window.addEventListener('resize', init);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', init);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [frontend, backend, databases]);

  return null;
}

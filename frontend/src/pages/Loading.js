import React, { useEffect, useState, useRef } from 'react';
import './Loading.css';

const TIPS = [
  'Full-stack developer passionate about clean code',
  'Built with React · Node.js · MongoDB · Tailwind',
  'Turning complex problems into elegant solutions',
  'Open to exciting freelance & full-time roles',
  'Writing code in C++, Java, Python, Dart & more',
  'Every pixel placed with purpose',
  'Performance-first · Mobile-first · User-first',
  'Let great design do the talking',
];

const STEPS = [
  { id: 0, label: 'Connecting',    threshold: 20 },
  { id: 1, label: 'Fetching data', threshold: 55 },
  { id: 2, label: 'Rendering',     threshold: 82 },
  { id: 3, label: 'Almost ready',  threshold: 95 },
];

const COLORS = ['#3b82f6', '#06b6d4', '#8b5cf6', '#f59e0b'];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning \uD83D\uDC4B';
  if (h < 17) return 'Good afternoon \uD83D\uDC4B';
  return 'Good evening \uD83D\uDC4B';
}

function getStepState(i, progress) {
  const cur  = STEPS[i];
  const prev = STEPS[i - 1];
  if (progress >= cur.threshold) return 'done';
  if (progress >= (prev?.threshold ?? 0)) return 'active';
  return 'idle';
}

function Particles() {
  return (
    <div className="ld-particles" aria-hidden="true">
      {Array.from({ length: 16 }, (_, i) => (
        <span
          key={i}
          className="ld-particle"
          style={{
            '--size':  `${Math.random() * 4 + 2}px`,
            '--color': COLORS[i % COLORS.length],
            '--left':  `${Math.random() * 100}%`,
            '--dur':   `${4 + Math.random() * 6}s`,
            '--delay': `${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function Loading() {
  const [progress,   setProgress]   = useState(0);
  const [tipIndex,   setTipIndex]   = useState(0);
  const [tipVisible, setTipVisible] = useState(true);
  const progRef = useRef(0);

  useEffect(() => {
    const id = setInterval(() => {
      const p = progRef.current;
      const speed = p < 30 ? 4 : p < 60 ? 2.5 : p < 80 ? 1.5 : 0.6;
      const next  = Math.min(95, p + Math.random() * speed + speed * 0.5);
      progRef.current = next;
      setProgress(Math.round(next));
    }, 280);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setTipVisible(false);
      setTimeout(() => {
        setTipIndex(i => (i + 1) % TIPS.length);
        setTipVisible(true);
      }, 370);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  const secLeft = Math.max(1, Math.round((95 - progress) / 3.5));

  return (
    <div className="ld-root">
      <div className="ld-orb ld-orb1" />
      <div className="ld-orb ld-orb2" />
      <div className="ld-orb ld-orb3" />
      <div className="ld-grid"        />
      <Particles />

      <div className="ld-center">
        <div className="ld-rings">
          <div className="ld-ring ld-ring1" />
          <div className="ld-ring ld-ring2" />
          <div className="ld-ring ld-ring3" />
          <div className="ld-ring-core"     />
        </div>

        <p className="ld-greet">{getGreeting()}</p>

        <h1 className="ld-headline">
          Welcome to my <span className="ld-accent">Portfolio</span>
        </h1>

        <p className="ld-tagline">Crafting digital experiences with code</p>

        <div className="ld-steps">
          {STEPS.map((s, i) => (
            <div key={s.id} className={`ld-step ld-step--${getStepState(i, progress)}`}>
              <div className="ld-step-dot" />
              <span>{s.label}</span>
            </div>
          ))}
        </div>

        <div className="ld-bar-wrap">
          <div className="ld-bar-track">
            <div className="ld-bar-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="ld-bar-meta">
            <span>{progress}%</span>
            <span>~{secLeft}s</span>
          </div>
        </div>

        <div className="ld-tip-wrap">
          <p className={`ld-tip ${tipVisible ? 'ld-tip--in' : 'ld-tip--out'}`}>
            {TIPS[tipIndex]}
          </p>
        </div>
      </div>
    </div>
  );
}
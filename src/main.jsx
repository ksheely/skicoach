import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { sessions } from './data';
import { getCoaching } from './coaching';
import './style.css';

function Chart({ values }) {
  const polyPoints = values
    .map((v, i) => `${(i / (values.length - 1)) * 100},${45 - (v - 50) * 0.7}`)
    .join(' ');

  return (
    <div className="chart">
      <div className="chart-label">
        <span>START</span>
        <span>FINISH</span>
      </div>

      <svg
        viewBox="0 0 100 45"
        preserveAspectRatio="none"
        role="img"
        aria-label="Illustrative technique trend over the run"
      >
        <defs>
          <linearGradient id="fill" x1="0" x2="0" y1="0" y2="1">
            <stop stopColor="#8fe9d3" stopOpacity=".32" />
            <stop offset="1" stopColor="#8fe9d3" stopOpacity="0" />
          </linearGradient>
        </defs>

        <polygon points={`0,45 ${polyPoints} 100,45`} fill="url(#fill)" />
        <polyline
          points={polyPoints}
          fill="none"
          stroke="#9aefd8"
          strokeWidth="1.1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

function App() {
  const [id, setId] = useState(sessions[0]?.id || '');
  const [tab, setTab] = useState('overview');
  const [snow, setSnow] = useState(false);
  const [spoken, setSpoken] = useState(false);

  const session = sessions.find((s) => s.id === id) || sessions[0];
  const coaching = getCoaching(session);

  function speak() {
    if (!('speechSynthesis' in window)) {
      setSpoken(false);
      return;
    }

    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(coaching.cue);
    u.rate = 0.88;
    window.speechSynthesis.speak(u);
    setSpoken(true);
    u.onend = () => setSpoken(false);
  }

  function switchSession(value) {
    window.speechSynthesis?.cancel();
    setSpoken(false);
    setId(value);
  }

  return (
    <div className={snow ? 'app snow' : 'app'}>
      <header className="topbar">
        <div className="brand">
          <span className="brandmark">⌁</span>
          <span>
            SLOPE
            <span className="brand-light">NOTES</span>
          </span>
        </div>
        <span className="concept">PERSONAL PROJECT</span>
      </header>

      <main>
        <div className="eyebrow">
          YOUR SKI DAY <span className="dot">●</span> SIMULATED DATA
        </div>

        <section className="intro">
          <div>
            <h1>
              Every run
              <br />
              <em>tells a story.</em>
            </h1>
            <p>Explore a simple coaching experience built around one useful takeaway.</p>
          </div>

          <div className="mountain" aria-hidden="true">
            <div className="sun" />
            <div className="peak p1" />
            <div className="peak p2" />
            <div className="peak p3" />
          </div>
        </section>

        <div className="controls">
          <label htmlFor="session">SESSION</label>
          <select id="session" value={id} onChange={(e) => switchSession(e.target.value)}>
            {sessions.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} · {s.date}
              </option>
            ))}
          </select>

          <button className="mode" type="button" aria-pressed={snow} onClick={() => setSnow(!snow)}>
            {snow ? 'Exit on-snow mode' : '↗ On-snow mode'}
          </button>
        </div>

        <section className="session-head">
          <div>
            <div className="eyebrow muted">{session.date.toUpperCase()} / {session.conditions.toUpperCase()}</div>
            <h2>{session.trail}</h2>
            <p>
              {session.duration} on snow <span>·</span> {session.turns} turns <span>·</span> {session.speed} mph average*
            </p>
          </div>

          <div className="number">
            <strong>{session.balance}</strong>
            <span>
              BALANCE
              <br />S
            </span>
          </div>
        </section>

        <section className="session-body">
          <div className="chart-wrap">
            <Chart values={session.samples} />

            <div className="stats">
              <div>
                <strong>{session.rhythm}</strong>
                <span>RHYTHM</span>
              </div>
              <div>
                <strong>{session.left}</strong>
                <span>LEFT</span>
              </div>
              <div>
                <strong>{session.right}</strong>
                <span>RIGHT</span>
              </div>
            </div>
          </div>

          <aside className="coaching">
            <h3>{coaching.title}</h3>
            <p className="cue">{coaching.cue}</p>

            <div className="controls-row">
              <button onClick={speak} type="button" aria-pressed={spoken} className="speak">
                {spoken ? 'Speaking…' : 'Hear cue'}
              </button>

              <button onClick={() => setTab(tab === 'overview' ? 'details' : 'overview')} className="toggle">
                {tab === 'overview' ? 'Show details' : 'Overview'}
              </button>
            </div>

            {tab === 'details' && (
              <div className="reason">
                <p>{coaching.reason}</p>
                <small>{coaching.priority}</small>
              </div>
            )}

            <div className="moments">
              <h4>Notable moments</h4>
              <ul>
                {session.moments.map((m, i) => (
                  <li key={i} className={m.kind}>
                    {m.time} — <strong>{m.label}</strong>
                    <div className="detail">{m.detail}</div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </section>

        
      </main>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);

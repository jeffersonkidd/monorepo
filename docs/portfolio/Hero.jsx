// Hero.jsx — Monofly Personal Brand Hero Section
// Exports: Hero (to window.Hero)

function Hero({ onNavigate }) {
  return (
    <section style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      justifyContent: 'center', padding: '80px 32px 64px',
      maxWidth: '900px', margin: '0 auto',
    }}>
      {/* Eyebrow */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        marginBottom: '28px',
      }}>
        <div style={{
          width: '8px', height: '8px', borderRadius: '50%',
          background: '#2c2c2c', animation: 'pulse 2s infinite',
        }}/>
        <span style={{ font: '500 13px/1 Inter, sans-serif', color: '#757575', letterSpacing: '.04em' }}>
          Available for projects
        </span>
      </div>

      {/* Headline */}
      <h1 style={{
        font: '700 clamp(48px, 8vw, 72px)/1.05 Inter, sans-serif',
        color: '#111111', letterSpacing: '-0.04em', marginBottom: '20px',
        maxWidth: '700px',
      }}>
        Design systems<br/>for{' '}
        <span style={{ color: '#757575', fontWeight: 300 }}>personal brands.</span>
      </h1>

      {/* Subheadline */}
      <p style={{
        font: '400 20px/1.5 Inter, sans-serif', color: '#444444',
        maxWidth: '520px', marginBottom: '40px',
      }}>
        Monofly is a clean, extensible boilerplate that gets you from zero
        to a polished personal brand — design tokens, components, and all.
      </p>

      {/* CTAs */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <button onClick={() => onNavigate('Work')} style={{
          font: '600 15px/1 Inter, sans-serif', padding: '13px 24px',
          borderRadius: '8px', background: '#1e1e1e', color: '#fff',
          border: '1px solid #1e1e1e', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '8px',
        }}>
          View Work
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </button>
        <button onClick={() => onNavigate('Writing')} style={{
          font: '600 15px/1 Inter, sans-serif', padding: '13px 24px',
          borderRadius: '8px', background: 'transparent', color: '#1e1e1e',
          border: '1px solid #d9d9d9', cursor: 'pointer',
        }}>
          Read Writing
        </button>
      </div>

      {/* Stats row */}
      <div style={{
        display: 'flex', gap: '40px', marginTop: '72px',
        paddingTop: '32px', borderTop: '1px solid #e6e6e6',
      }}>
        {[
          { val: '24+', label: 'Projects shipped' },
          { val: '8k', label: 'Newsletter readers' },
          { val: '3', label: 'Years building in public' },
        ].map(s => (
          <div key={s.label}>
            <div style={{ font: '700 28px/1 Inter, sans-serif', color: '#111111', letterSpacing: '-0.03em' }}>{s.val}</div>
            <div style={{ font: '400 13px/1.4 Inter, sans-serif', color: '#757575', marginTop: '5px' }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { Hero });

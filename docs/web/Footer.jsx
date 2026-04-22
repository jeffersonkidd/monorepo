// Footer.jsx — Monofly Personal Brand Footer
// Exports: Footer (to window.Footer)

function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid #e6e6e6', background: '#fff',
      padding: '48px 32px 32px',
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '32px', flexWrap: 'wrap', marginBottom: '48px' }}>
          {/* Brand */}
          <div style={{ maxWidth: '280px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
              <span style={{ font: '700 15px/1 Inter, sans-serif', color: '#111111' }}>Monofly</span>
            </div>
            <p style={{ font: '400 13px/1.6 Inter, sans-serif', color: '#757575' }}>
              A minimal, extensible design system boilerplate for personal brand creators.
            </p>
          </div>
          {/* Links */}
          <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
            {[
              { group: 'Navigate', links: ['Home', 'Work', 'Writing', 'About'] },
              { group: 'Connect', links: ['Twitter / X', 'GitHub', 'Newsletter', 'RSS'] },
            ].map(col => (
              <div key={col.group}>
                <div style={{ font: '600 12px/1 Inter, sans-serif', color: '#111111', letterSpacing: '.05em', textTransform: 'uppercase', marginBottom: '14px' }}>{col.group}</div>
                {col.links.map(link => (
                  <div key={link} style={{ font: '400 13px/1 Inter, sans-serif', color: '#757575', marginBottom: '10px', cursor: 'pointer' }}
                    onMouseEnter={e => e.target.style.color = '#111111'}
                    onMouseLeave={e => e.target.style.color = '#757575'}
                  >{link}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
        {/* Bottom bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '24px', borderTop: '1px solid #e6e6e6', flexWrap: 'wrap', gap: '12px' }}>
          <span style={{ font: '400 12px/1 Inter, sans-serif', color: '#b3b3b3' }}>
            © 2024 Monofly. Built with the Simple Design System.
          </span>
          <span style={{ font: '400 12px/1 Inter, sans-serif', color: '#b3b3b3' }}>
            Design tokens · React · Open source
          </span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Footer });

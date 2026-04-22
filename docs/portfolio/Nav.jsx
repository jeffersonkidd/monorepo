// Nav.jsx — Monofly Personal Brand Site Navigation
// Exports: Nav (to window.Nav)

const NavStyles = {
  nav: {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 32px', height: '56px',
    background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(8px)',
    borderBottom: '1px solid #e6e6e6',
  },
  logo: {
    display: 'flex', alignItems: 'center', gap: '8px',
    font: '700 15px/1 Inter, sans-serif', color: '#1e1e1e',
    letterSpacing: '-0.02em', textDecoration: 'none', cursor: 'pointer',
  },
  links: { display: 'flex', gap: '2px' },
  link: {
    font: '400 13px/1 Inter, sans-serif', color: '#757575',
    padding: '6px 12px', borderRadius: '6px', cursor: 'pointer',
    border: '1px solid transparent', transition: 'all .15s',
    textDecoration: 'none',
  },
  linkActive: {
    color: '#1e1e1e', background: '#f5f5f5', borderColor: '#d9d9d9', fontWeight: '500',
  },
  actions: { display: 'flex', gap: '8px', alignItems: 'center' },
  btnContact: {
    font: '600 13px/1 Inter, sans-serif', padding: '7px 14px',
    borderRadius: '6px', background: '#2c2c2c', color: '#fff',
    border: '1px solid #2c2c2c', cursor: 'pointer',
  },
};

function Nav({ activePage, onNavigate }) {
  const links = ['Home', 'Work', 'Writing', 'About'];
  return (
    <nav style={NavStyles.nav}>
      <div style={NavStyles.logo} onClick={() => onNavigate('Home')}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
        </svg>
        Monofly
      </div>
      <div style={NavStyles.links}>
        {links.map(l => (
          <div key={l} style={{
            ...NavStyles.link,
            ...(activePage === l ? NavStyles.linkActive : {}),
          }} onClick={() => onNavigate(l)}>{l}</div>
        ))}
      </div>
      <div style={NavStyles.actions}>
        <button style={NavStyles.btnContact} onClick={() => onNavigate('About')}>Contact</button>
      </div>
    </nav>
  );
}

Object.assign(window, { Nav });

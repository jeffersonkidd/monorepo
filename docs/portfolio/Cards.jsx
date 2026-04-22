// Cards.jsx — Monofly Work & Writing Grid Components
// Exports: WorkGrid, WritingGrid (to window)

const WORK_ITEMS = [
  { title: 'Brand Identity System', category: 'Design', year: '2024', desc: 'Full visual identity for a SaaS startup — logo, colors, type, and component library.', tag: 'Case Study' },
  { title: 'Personal Blog Platform', category: 'Development', year: '2024', desc: 'Built a minimal publishing platform with MDX, Next.js, and a custom design system.', tag: 'Open Source' },
  { title: 'Portfolio Template', category: 'Design + Dev', year: '2023', desc: 'A Monofly-powered portfolio template that creators can fork and launch in hours.', tag: 'Template' },
  { title: 'Newsletter Growth Toolkit', category: 'Strategy', year: '2023', desc: 'Wrote a comprehensive guide to growing a design-focused newsletter from 0 to 5k.', tag: 'Guide' },
  { title: 'Icon Set v2', category: 'Design', year: '2023', desc: 'Refreshed 300+ stroke icons to align with updated brand guidelines and weight system.', tag: 'Asset' },
  { title: 'Component Playground', category: 'Development', year: '2022', desc: 'Interactive component explorer for the Monofly SDS, built with Storybook + Figma.', tag: 'Tool' },
];

const WRITING_ITEMS = [
  { title: 'Why every creator needs a design system', date: 'Mar 12, 2024', readTime: '6 min', desc: 'A design system isn\'t just for big teams — it\'s the single best investment a solo creator can make.' },
  { title: 'Building in public: what I learned after 2 years', date: 'Feb 3, 2024', readTime: '8 min', desc: 'The honest truth about building in public — the audience it creates, and the pressure it brings.' },
  { title: 'Monochromatic design: a masterclass in restraint', date: 'Jan 18, 2024', readTime: '5 min', desc: 'How stripping color from your palette forces better design decisions everywhere else.' },
  { title: 'The minimal portfolio: say less, show more', date: 'Dec 9, 2023', readTime: '4 min', desc: 'Most portfolios say too much. Here\'s a framework for editing your work down to what counts.' },
];

function Tag({ children, variant = 'default' }) {
  const colors = {
    default: { bg: '#f5f5f5', color: '#444444', border: '#d9d9d9' },
    brand: { bg: '#2c2c2c', color: '#ffffff', border: '#2c2c2c' },
  };
  const c = colors[variant] || colors.default;
  return (
    <span style={{
      font: '500 11px/1 Inter, sans-serif', padding: '3px 8px',
      borderRadius: '999px', background: c.bg, color: c.color,
      border: `1px solid ${c.border}`,
    }}>{children}</span>
  );
}

function WorkCard({ item }) {
  return (
    <div style={{
      background: '#fff', border: '1px solid #e6e6e6', borderRadius: '10px',
      padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px',
      cursor: 'pointer', transition: 'box-shadow .2s, transform .2s',
      boxShadow: '0 1px 4px rgba(12,12,13,.06)',
    }}
    onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(12,12,13,.12)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
    onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 1px 4px rgba(12,12,13,.06)'; e.currentTarget.style.transform = ''; }}>
      {/* Top row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Tag>{item.category}</Tag>
        <span style={{ font: '400 12px/1 Inter, sans-serif', color: '#b3b3b3' }}>{item.year}</span>
      </div>
      {/* Title */}
      <div style={{ font: '600 16px/1.3 Inter, sans-serif', color: '#111111', letterSpacing: '-0.01em' }}>{item.title}</div>
      {/* Desc */}
      <div style={{ font: '400 13px/1.5 Inter, sans-serif', color: '#757575', flex: 1 }}>{item.desc}</div>
      {/* Bottom */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px solid #f0f0f0' }}>
        <Tag variant="brand">{item.tag}</Tag>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#b3b3b3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
        </svg>
      </div>
    </div>
  );
}

function WorkGrid() {
  return (
    <section style={{ maxWidth: '900px', margin: '0 auto', padding: '80px 32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
        <div>
          <h2 style={{ font: '700 36px/1.1 Inter, sans-serif', color: '#111111', letterSpacing: '-0.03em' }}>Work</h2>
          <p style={{ font: '400 16px/1.5 Inter, sans-serif', color: '#757575', marginTop: '8px' }}>Selected projects and case studies</p>
        </div>
        <span style={{ font: '500 13px/1 Inter, sans-serif', color: '#757575' }}>{WORK_ITEMS.length} projects</span>
      </div>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '16px',
      }}>
        {WORK_ITEMS.map(item => <WorkCard key={item.title} item={item} />)}
      </div>
    </section>
  );
}

function WritingRow({ item }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
      padding: '20px 0', borderBottom: '1px solid #e6e6e6', gap: '20px',
      cursor: 'pointer',
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ font: '600 16px/1.3 Inter, sans-serif', color: '#111111', letterSpacing: '-0.01em', marginBottom: '6px' }}>{item.title}</div>
        <div style={{ font: '400 13px/1.5 Inter, sans-serif', color: '#757575' }}>{item.desc}</div>
      </div>
      <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
        <div style={{ font: '400 12px/1 Inter, sans-serif', color: '#b3b3b3' }}>{item.date}</div>
        <div style={{ font: '400 12px/1 Inter, sans-serif', color: '#b3b3b3' }}>{item.readTime} read</div>
      </div>
    </div>
  );
}

function WritingGrid() {
  return (
    <section style={{ maxWidth: '900px', margin: '0 auto', padding: '80px 32px' }}>
      <div style={{ marginBottom: '8px' }}>
        <h2 style={{ font: '700 36px/1.1 Inter, sans-serif', color: '#111111', letterSpacing: '-0.03em' }}>Writing</h2>
        <p style={{ font: '400 16px/1.5 Inter, sans-serif', color: '#757575', marginTop: '8px' }}>Thoughts on design, development, and building in public</p>
      </div>
      <div style={{ marginTop: '32px' }}>
        {WRITING_ITEMS.map(item => <WritingRow key={item.title} item={item} />)}
      </div>
      <div style={{ marginTop: '24px' }}>
        <button style={{
          font: '500 13px/1 Inter, sans-serif', padding: '9px 16px',
          borderRadius: '6px', background: 'transparent', color: '#444444',
          border: '1px solid #d9d9d9', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '6px',
        }}>
          View all posts
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </button>
      </div>
    </section>
  );
}

Object.assign(window, { WorkGrid, WritingGrid });

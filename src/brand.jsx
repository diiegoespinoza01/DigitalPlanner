// brand.jsx — Linen Paper Co. · sistema de marca
// Tokens + 6 paletas Pantone + primitives. Todo se exporta a window al final.

const LP = {
  cream:     '#F5EFE6',
  creamDeep: '#EDE4D2',
  paper:     '#FAF6EE',
  ink:       '#2B2622',
  ink2:      '#5A4F45',
  ink3:      '#8C8275',
  ink4:      '#B8AE9D',
  line:      '#D8CFC0',
  lineSoft:  '#E8DFD0',
  serif: "'Cormorant Garamond', Georgia, serif",
  sans:  "'Manrope', -apple-system, system-ui, sans-serif",
  mono:  "'JetBrains Mono', ui-monospace, monospace",
};

const THEMES = {
  greige:   { tint:'#EFE6D2', mid:'#C9BBA0', deep:'#8A7B62', ink:'#5C4F3B', name:'Greige',   pantone:'15-1216 TPX' },
  sage:     { tint:'#DCE4D2', mid:'#A8B895', deep:'#6E8059', ink:'#4D5C3D', name:'Salvia',   pantone:'16-0220 TPX' },
  lavender: { tint:'#E1DAE6', mid:'#B6A8C4', deep:'#8473A0', ink:'#5C4E73', name:'Lavanda',  pantone:'15-3508 TPX' },
  sky:      { tint:'#D8E1E7', mid:'#A7BACA', deep:'#6F8DA4', ink:'#4D6577', name:'Cielo',    pantone:'14-4214 TPX' },
  blush:    { tint:'#ECD9D2', mid:'#D2A99A', deep:'#A87567', ink:'#76493D', name:'Rubor',    pantone:'14-1316 TPX' },
  clay:     { tint:'#E5C9B3', mid:'#C99577', deep:'#9A6243', ink:'#6B4029', name:'Arcilla',  pantone:'16-1330 TPX' },
};
const THEME_ORDER = ['greige','sage','lavender','sky','blush','clay'];
const T = (theme) => THEMES[theme] || THEMES.greige;

if (typeof document !== 'undefined' && !document.getElementById('lp-base-styles')) {
  const s = document.createElement('style');
  s.id = 'lp-base-styles';
  s.textContent = `
    .lp-page{position:relative;box-sizing:border-box;overflow:hidden;background:${LP.cream};
      font-family:${LP.sans};color:${LP.ink};-webkit-font-smoothing:antialiased}
    .lp-page::before{content:'';position:absolute;inset:0;pointer-events:none;z-index:0;opacity:.35;
      background-image:radial-gradient(rgba(120,105,82,.16) .6px, transparent .7px);
      background-size:3px 3px;mix-blend-mode:multiply}
    .lp-page > *{position:relative;z-index:1}
    .lp-link{cursor:pointer;transition:opacity .12s,color .12s;text-decoration:none}
    .lp-link:hover{opacity:.62}
    .lp-cb{display:inline-flex;align-items:center;justify-content:center;flex:0 0 auto}
    .lp-serif{font-family:${LP.serif}}
    .lp-mono{font-family:${LP.mono}}
  `;
  document.head.appendChild(s);
}

const ICON_PATHS = {
  home:   <><path d="M2.5 7L8 2.5 13.5 7"/><path d="M4 6.4V13h8V6.4"/></>,
  grid:   <><rect x="2.5" y="2.5" width="4.2" height="4.2" rx=".6"/><rect x="9.3" y="2.5" width="4.2" height="4.2" rx=".6"/><rect x="2.5" y="9.3" width="4.2" height="4.2" rx=".6"/><rect x="9.3" y="9.3" width="4.2" height="4.2" rx=".6"/></>,
  cal:    <><rect x="2.5" y="3.5" width="11" height="10" rx="1"/><path d="M2.5 6.3h11M5.3 2.3v2.4M10.7 2.3v2.4"/></>,
  week:   <><rect x="2.3" y="4" width="11.4" height="8" rx="1"/><path d="M5.4 4v8M8 4v8M10.6 4v8"/></>,
  sun:    <><circle cx="8" cy="8" r="2.8"/><path d="M8 1.5v1.4M8 13.1v1.4M1.5 8h1.4M13.1 8h1.4M3.4 3.4l1 1M11.6 11.6l1 1M12.6 3.4l-1 1M4.4 11.6l-1 1"/></>,
  moon:   <path d="M12.5 9.3A5 5 0 1 1 6.7 3.5 4 4 0 0 0 12.5 9.3z"/>,
  drop:   <path d="M8 2.3C5.6 5.4 4 7.3 4 9.4a4 4 0 0 0 8 0c0-2.1-1.6-4-4-7.1z"/>,
  heart:  <path d="M8 13.2S2.6 9.8 2.6 6.2A2.7 2.7 0 0 1 8 4.8a2.7 2.7 0 0 1 5.4 1.4C13.4 9.8 8 13.2 8 13.2z"/>,
  leaf:   <><path d="M3 13C3 7 7 3 13 3c0 6-4 10-10 10z"/><path d="M3 13C6 10 9 8.5 11 7"/></>,
  coin:   <><circle cx="8" cy="8" r="5.4"/><path d="M8 5.2v5.6M6.4 6.4h2.4a1.2 1.2 0 0 1 0 2.4H6.4h2.6"/></>,
  star:   <path d="M8 2.2l1.7 3.6 3.9.5-2.9 2.7.8 3.9L8 11.6 4.5 13.6l.8-3.9-2.9-2.7 3.9-.5z"/>,
  target: <><circle cx="8" cy="8" r="5.4"/><circle cx="8" cy="8" r="2.6"/></>,
  book:   <><path d="M8 3.6C6.6 2.7 4.6 2.6 2.8 3v9c1.8-.4 3.8-.3 5.2.6 1.4-.9 3.4-1 5.2-.6V3c-1.8-.4-3.8-.3-5.2.6z"/><path d="M8 3.6v9"/></>,
  edit:   <><path d="M11.2 2.8l2 2L5.6 12.4 3 13l.6-2.6z"/><path d="M10 4l2 2"/></>,
  arrowR: <path d="M3 8h9M8.4 4.4L12 8l-3.6 3.6"/>,
  arrowL: <path d="M13 8H4M7.6 4.4L4 8l3.6 3.6"/>,
  plus:   <path d="M8 3.2v9.6M3.2 8h9.6"/>,
  sticker:<><path d="M3 3h7l3 3v7H3z"/><path d="M10 3v3h3"/></>,
  flag:   <><path d="M4 2.5v11"/><path d="M4 3.2c2-1 4 1 6 0v5c-2 1-4-1-6 0z"/></>,
  cloud:  <path d="M5 11.5a2.6 2.6 0 0 1-.2-5.2 3.4 3.4 0 0 1 6.5.9A2.4 2.4 0 0 1 11 11.5z"/>,
  pencil: <><path d="M3 13l1-3 6.5-6.5 2 2L6 11z"/><path d="M9.5 4.5l2 2"/></>,
  note:   <><rect x="3" y="2.5" width="10" height="11" rx="1"/><path d="M5.4 5.6h5.2M5.4 8h5.2M5.4 10.4h3.2"/></>,
  folder: <><path d="M2.5 4.2h3.8l1.1 1.3h5.1v6.8H2.5z"/></>,
  chart:  <><path d="M2.6 13.4h10.8"/><path d="M4.4 13V8.4M7.2 13V5.6M10 13V9.4M12.4 13V6.6"/></>,
  flower: <><circle cx="8" cy="8" r="1.6"/><path d="M8 6.4C8 4 9 2.6 8 2.6S8 4 8 6.4M8 9.6C8 12 7 13.4 8 13.4S8 12 8 9.6M6.4 8C4 8 2.6 7 2.6 8S4 8 6.4 8M9.6 8C12 8 13.4 9 13.4 8S12 8 9.6 8"/></>,
  bowl:   <><path d="M2.5 7.5h11a5.5 5.5 0 0 1-11 0z"/><path d="M6 4.5c0-1 .6-1.4.6-2M8 4.5c0-1 .6-1.4.6-2M10 4.5c0-1 .6-1.4.6-2"/></>,
  check:  <path d="M3 8.4l3 3 7-7.4"/>,
  clock:  <><circle cx="8" cy="8" r="5.4"/><path d="M8 5v3.2l2.2 1.4"/></>,
  bell:   <><path d="M4.4 11.2c.9-.8 1-1.6 1-3.4a2.6 2.6 0 0 1 5.2 0c0 1.8.1 2.6 1 3.4z"/><path d="M6.8 11.4a1.3 1.3 0 0 0 2.4 0M8 3.6V2.4"/></>,
};

// (e) Icon usa style en lugar de atributos SVG de presentación
function Icon({ name, size = 16, stroke = 1.2, color = 'currentColor', style: extStyle }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none"
      style={{ display: 'block', flex: '0 0 auto',
        stroke: color, strokeWidth: stroke, strokeLinecap: 'round', strokeLinejoin: 'round',
        ...extStyle }}>
      {ICON_PATHS[name] || ICON_PATHS.note}
    </svg>
  );
}

// (c) CB → label + input.lp-toggle + span.lp-tg-cb
function CB({ on = false, size = 14, theme = 'greige', name }) {
  return (
    <label className="lp-cb" style={{ width: size, height: size, display: 'inline-flex',
      alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      cursor: 'pointer', position: 'relative' }}>
      <input type="checkbox" className="lp-toggle" name={name} defaultChecked={on} />
      <span className="lp-tg lp-tg-cb" style={{ width: size, height: size,
        borderRadius: 3, border: `1px solid ${LP.line}` }} />
    </label>
  );
}

// ── <LinkChip> ────────────────────────────────────────────────────────────
function LinkChip({ children, theme = 'greige', active = false, icon, href, style }) {
  const c = T(theme);
  return (
    <a href={href || '#'} className="lp-link" style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '5px 12px', borderRadius: 999,
      border: `1px solid ${active ? c.deep : LP.line}`,
      background: active ? c.tint : 'transparent',
      color: active ? c.ink : LP.ink2,
      fontFamily: LP.sans, fontSize: 12.5, fontWeight: active ? 600 : 500,
      letterSpacing: .2, whiteSpace: 'nowrap', ...style }}>
      {icon && <Icon name={icon} size={13} color={active ? c.deep : LP.ink3} />}
      {children}
    </a>
  );
}

// ── <Eyebrow> ─────────────────────────────────────────────────────────────
function Eyebrow({ children, color, line = true, style }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, ...style }}>
      <span style={{ fontFamily: LP.mono, fontSize: 10, fontWeight: 500,
        letterSpacing: 2.4, textTransform: 'uppercase', color: color || LP.ink3, whiteSpace: 'nowrap' }}>
        {children}
      </span>
      {line && <span style={{ flex: 1, height: 1, background: LP.line }} />}
    </div>
  );
}

// (b) SideTabs — cada pestaña apunta a su sección ──────────────────────────
const SECTIONS = ['Estilo', 'Bienestar', 'Autocuidado', 'Finanzas', 'Productividad'];
const SECTION_ICON = { Estilo:'sticker', Bienestar:'leaf', Autocuidado:'heart', Finanzas:'coin', Productividad:'target' };
const SECTION_HREF = { Estilo:'#hub', Bienestar:'#habits', Autocuidado:'#daily', Finanzas:'#finance', Productividad:'#productivity' };
function SideTabs({ theme = 'greige', active, width = 46 }) {
  const c = T(theme);
  return (
    <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width,
      display: 'flex', flexDirection: 'column', borderLeft: `1px solid ${LP.line}`,
      background: LP.paper, zIndex: 2 }}>
      {SECTIONS.map((s) => {
        const on = s === active;
        return (
          <a key={s} href={SECTION_HREF[s]} className="lp-link" style={{
            flex: 1, minHeight: 150, position: 'relative',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderBottom: `1px solid ${LP.lineSoft}`,
            background: on ? c.tint : 'transparent',
            color: on ? c.ink : LP.ink3 }}>
            {on && <span style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 3, background: c.deep }} />}
            <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)',
              fontFamily: LP.sans, fontSize: 9, fontWeight: on ? 700 : 600,
              letterSpacing: on ? .5 : .3, textTransform: 'uppercase', whiteSpace: 'nowrap',
              display: 'flex', alignItems: 'center', gap: 9 }}>
              <Icon name={SECTION_ICON[s]} size={12} color={on ? c.deep : LP.ink4}
                style={{ transform: 'rotate(180deg)' }} />
              {s}
            </span>
          </a>
        );
      })}
    </div>
  );
}

// (b) TopNav — cada chip navega a su ruta ─────────────────────────────────
const NAV = ['Índice', 'Año', 'Mes', 'Semana', 'Día', 'Notas'];
const NAV_HREF = { 'Índice':'#hub', 'Año':'#yearly', 'Mes':'#monthly', 'Semana':'#weekly-mon', 'Día':'#daily', 'Notas':'#notes' };
function TopNav({ theme = 'greige', current, height = 58 }) {
  const c = T(theme);
  return (
    <div style={{ height, flex: `0 0 ${height}px`, display: 'flex', alignItems: 'center',
      padding: '0 30px', borderBottom: `1px solid ${LP.line}`, background: LP.paper, gap: 24 }}>
      <a href="#hub" className="lp-link lp-serif" style={{ fontStyle: 'italic', fontWeight: 500,
        fontSize: 21, color: LP.ink, letterSpacing: .2, whiteSpace: 'nowrap' }}>
        Linen Paper Co.
      </a>
      <span style={{ width: 1, height: 22, background: LP.line }} />
      <div style={{ display: 'flex', gap: 6, flex: 1 }}>
        {NAV.map((n) => {
          const on = n === current;
          return (
            <a key={n} href={NAV_HREF[n]} className="lp-link" style={{
              padding: '5px 13px', borderRadius: 999, fontFamily: LP.sans,
              fontSize: 12, fontWeight: on ? 600 : 500, letterSpacing: .2,
              color: on ? c.ink : LP.ink2,
              background: on ? c.tint : 'transparent',
              border: `1px solid ${on ? c.deep : 'transparent'}` }}>
              {n}
            </a>
          );
        })}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: LP.mono,
        fontSize: 9.5, letterSpacing: 1.4, textTransform: 'uppercase', color: LP.ink3, whiteSpace: 'nowrap' }}>
        Sin fechar
        <span style={{ width: 4, height: 4, borderRadius: 4, background: c.deep }} />
        <span className="js-theme-name" style={{ color: c.ink, fontWeight: 600 }}>{c.name}</span>
      </div>
    </div>
  );
}

// (a) Page — id prop para ancla de navegación ─────────────────────────────
function Page({ id, theme = 'greige', tab, currentNav, padding = 34, children, contentStyle }) {
  const tabsW = 46;
  return (
    <div id={id} className="lp-page" style={{ width: 1080, height: 810, display: 'flex', flexDirection: 'column' }}>
      <TopNav theme={theme} current={currentNav} />
      <div style={{ flex: 1, position: 'relative', minHeight: 0 }}>
        <SideTabs theme={theme} active={tab} width={tabsW} />
        <div style={{ position: 'absolute', inset: 0, right: tabsW, padding,
          display: 'flex', flexDirection: 'column', minHeight: 0, ...contentStyle }}>
          {children}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  LP, THEMES, THEME_ORDER, T, SECTIONS, SECTION_ICON, NAV, NAV_HREF, SECTION_HREF,
  Icon, CB, LinkChip, Eyebrow, SideTabs, TopNav, Page,
});

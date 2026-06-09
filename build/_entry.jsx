import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
globalThis.React = React;
globalThis.window = globalThis;

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

// covers.jsx — <Cover theme/>  ·  un solo diseño, recoloreado en 6 paletas.
// Página 1080×810. La paleta solo cambia acentos + detalle vegetal; fondo crema fijo.

function Cover({ theme = 'greige', id }) {
  const c = T(theme);
  const petal = (rot) => (
    <span style={{ position: 'absolute', left: '50%', top: '50%', width: 12, height: 58,
      borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
      border: `1px solid ${c.deep}`, transformOrigin: '50% 100%',
      transform: `translate(-50%,-100%) rotate(${rot}deg)` }} />
  );
  return (
    <div id={id} className="lp-page" style={{ width: 1080, height: 810, padding: 26 }}>
      {/* marco hairline doble */}
      <div style={{ position: 'absolute', inset: 26, border: `1px solid ${LP.line}` }} />
      <div style={{ position: 'absolute', inset: 34, border: `1px solid ${c.mid}`, opacity: .55 }} />

      <div style={{ position: 'absolute', inset: 34, display: 'flex', flexDirection: 'column',
        padding: '46px 60px' }}>

        {/* cabecera */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div className="lp-serif" style={{ fontStyle: 'italic', fontWeight: 500, fontSize: 26, color: LP.ink }}>
            Linen&nbsp;Paper&nbsp;Co.
          </div>
          <div style={{ fontFamily: LP.mono, fontSize: 10, letterSpacing: 2.4, textTransform: 'uppercase',
            color: LP.ink3, textAlign: 'right', lineHeight: 1.9 }}>
            Edición sin fechar<br />Descarga instantánea
          </div>
        </div>

        {/* centro */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', textAlign: 'center', marginTop: -10 }}>

          {/* detalle vegetal abstracto */}
          <div style={{ position: 'relative', width: 130, height: 120, marginBottom: 26 }}>
            {[0, 45, 90, 135, 180, 225, 270, 315].map((r) => <React.Fragment key={r}>{petal(r)}</React.Fragment>)}
            <span style={{ position: 'absolute', left: '50%', top: '50%', width: 14, height: 14, borderRadius: 14,
              background: c.tint, border: `1px solid ${c.deep}`, transform: 'translate(-50%,-50%)' }} />
          </div>

          <div style={{ fontFamily: LP.mono, fontSize: 11, letterSpacing: 5, textTransform: 'uppercase',
            color: c.deep, marginBottom: 20 }}>
            Planner&nbsp;Digital
          </div>

          <div className="lp-serif" style={{ fontWeight: 500, fontSize: 116, lineHeight: .92,
            letterSpacing: -1, color: LP.ink }}>
            Todo<br />
            <span style={{ fontStyle: 'italic', color: c.ink }}>en uno</span>
          </div>

          <div style={{ width: 80, height: 1, background: c.mid, margin: '30px 0 22px' }} />

          <div style={{ fontFamily: LP.sans, fontSize: 15, fontWeight: 400, color: LP.ink2,
            letterSpacing: .3, maxWidth: 540, lineHeight: 1.6 }}>
            Un planner hiperenlazado para iPad y Android · GoodNotes · Notability · Xodo
          </div>
        </div>

        {/* pie: paleta + pantone */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
            {THEME_ORDER.map((k) => (
              <span key={k} style={{ width: 16, height: 16, borderRadius: 16,
                background: THEMES[k].mid,
                border: k === theme ? `1.5px solid ${LP.ink}` : `1px solid ${LP.line}`,
                boxShadow: k === theme ? `0 0 0 2px ${LP.cream}` : 'none' }} />
            ))}
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="lp-serif" style={{ fontStyle: 'italic', fontSize: 22, color: c.ink, lineHeight: 1 }}>
              {c.name}
            </div>
            <div style={{ fontFamily: LP.mono, fontSize: 9.5, letterSpacing: 2, color: LP.ink3, marginTop: 5 }}>
              PANTONE {c.pantone}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Cover });

// masters-core.jsx — IndexHub · Yearly · MonthlySpread · Daily

const DOW = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
const MONTHS = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

function monthCells(offset, days) {
  const cells = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

function CoreHead({ children, theme, sub }) {
  const c = T(theme);
  return (
    <div style={{ marginBottom: 10 }}>
      <Eyebrow color={c.deep}>{children}</Eyebrow>
      {sub && <div style={{ fontFamily: LP.sans, fontSize: 11, color: LP.ink3, marginTop: 5 }}>{sub}</div>}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// ÍNDICE / HUB
// ═══════════════════════════════════════════════════════════════════════
function IndexHub({ theme = 'greige', id }) {
  const c = T(theme);
  const routes = [
    { ic: 'grid',   label: 'Vista anual',          meta: '12 meses · metas',        href: '#yearly' },
    { ic: 'cal',    label: 'Planificador mensual',  meta: 'calendario + foco',       href: '#monthly' },
    { ic: 'week',   label: 'Semanal · lunes',       meta: 'inicio L',                href: '#weekly-mon' },
    { ic: 'week',   label: 'Semanal · domingo',     meta: 'inicio D',                href: '#weekly-sun' },
    { ic: 'sun',    label: 'Planificador diario',   meta: 'agenda 6–19h',            href: '#daily' },
    { ic: 'target', label: 'Tracker de hábitos',    meta: '11 × 31 días',            href: '#habits' },
    { ic: 'coin',   label: 'Finanzas',              meta: 'presupuesto + ledger',    href: '#finance' },
    { ic: 'leaf',   label: 'Bienestar',             meta: 'comidas · agua · cuerpo', href: '#wellness' },
    { ic: 'chart',  label: 'Productividad',         meta: 'proyectos + metas',       href: '#productivity' },
    { ic: 'note',   label: 'Notas',                 meta: 'rayado · punteado',       href: '#notes' },
  ];
  return (
    <Page id={id} theme={theme} tab="Estilo" currentNav="Índice">
      <div style={{ display: 'flex', gap: 30, flex: 1, minHeight: 0 }}>
        <div style={{ flex: '1 1 56%', display: 'flex', flexDirection: 'column' }}>
          <Eyebrow color={c.deep}>Índice interactivo · todo enlazado</Eyebrow>
          <div className="lp-serif" style={{ fontWeight: 500, fontSize: 62, lineHeight: .95,
            letterSpacing: -1, color: LP.ink, marginTop: 16 }}>
            Tu año,<br /><span style={{ fontStyle: 'italic', color: c.ink }}>en una sola toca.</span>
          </div>
          <div style={{ fontFamily: LP.sans, fontSize: 13, color: LP.ink2, marginTop: 14,
            lineHeight: 1.6, maxWidth: 420 }}>
            Navega cualquier sección desde aquí. Las pestañas de la derecha te siguen en cada página.
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 22 }}>
            {SECTIONS.map((s) => (
              <LinkChip key={s} theme={theme} icon={SECTION_ICON[s]}
                href={SECTION_HREF[s]} active={s === 'Estilo'}>{s}</LinkChip>
            ))}
          </div>
          <div style={{ marginTop: 'auto', paddingTop: 26 }}>
            <Eyebrow color={c.deep}>Los 12 meses</Eyebrow>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, marginTop: 12 }}>
              {MONTHS.map((m, i) => (
                <a key={m} href="#monthly" className="lp-link" style={{ border: `1px solid ${LP.line}`,
                  borderRadius: 6, padding: '11px 12px', background: LP.paper,
                  display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <span style={{ fontFamily: LP.mono, fontSize: 9, color: c.deep, letterSpacing: 1 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="lp-serif" style={{ fontStyle: 'italic', fontSize: 18, color: LP.ink, lineHeight: 1 }}>
                    {m}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div style={{ flex: '1 1 44%', background: c.tint, borderRadius: 10,
          padding: '26px 24px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontFamily: LP.mono, fontSize: 10, letterSpacing: 2.4, textTransform: 'uppercase', color: c.ink }}>
              Directorio
            </span>
            <span style={{ fontFamily: LP.mono, fontSize: 10, letterSpacing: 1, color: c.deep }}>10 rutas</span>
          </div>
          <div style={{ height: 1, background: c.mid, opacity: .5, margin: '14px 0 4px' }} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            {routes.map((r, i) => (
              <a key={r.label} href={r.href} className="lp-link" style={{ display: 'flex', alignItems: 'center', gap: 13,
                padding: '8px 0', borderBottom: i < routes.length - 1 ? `1px solid ${c.mid}55` : 'none' }}>
                <span style={{ fontFamily: LP.mono, fontSize: 11, color: c.deep, width: 18 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{ width: 28, height: 28, borderRadius: 999, background: LP.paper,
                  border: `1px solid ${c.mid}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name={r.ic} size={14} color={c.deep} />
                </span>
                <span style={{ flex: 1, fontFamily: LP.sans, fontSize: 13.5, fontWeight: 600, color: c.ink }}>
                  {r.label}
                </span>
                <span style={{ fontFamily: LP.mono, fontSize: 9.5, color: c.ink, opacity: .7 }}>{r.meta}</span>
                <Icon name="arrowR" size={13} color={c.deep} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </Page>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// VISTA ANUAL
// ═══════════════════════════════════════════════════════════════════════
function MiniMonth({ name, idx, offset, days, theme }) {
  const c = T(theme);
  const cells = monthCells(offset, days);
  return (
    <a href="#monthly" className="lp-link" style={{ border: `1px solid ${LP.line}`, borderRadius: 6,
      padding: '8px 9px 9px', background: LP.paper }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 5 }}>
        <span className="lp-serif" style={{ fontStyle: 'italic', fontSize: 14, color: LP.ink, lineHeight: 1 }}>{name}</span>
        <span style={{ fontFamily: LP.mono, fontSize: 8, color: c.deep }}>{String(idx + 1).padStart(2, '0')}</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 1 }}>
        {DOW.map((d, i) => (
          <span key={i} style={{ fontFamily: LP.mono, fontSize: 6.5, textAlign: 'center',
            color: i >= 5 ? c.deep : LP.ink3 }}>{d}</span>
        ))}
        {cells.map((n, i) => (
          <span key={i} style={{ fontFamily: LP.sans, fontSize: 8, textAlign: 'center', lineHeight: '12px',
            height: 12, color: n == null ? 'transparent' : (i % 7 >= 5 ? c.deep : LP.ink2),
            background: 'transparent', borderRadius: 3 }}>{n || '·'}</span>
        ))}
      </div>
    </a>
  );
}

function Yearly({ theme = 'greige', id }) {
  const c = T(theme);
  const offsets = [3, 6, 0, 2, 4, 0, 2, 5, 0, 3, 5, 0];
  const lengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const goals = [
    { ic: 'heart', area: 'Cuerpo' }, { ic: 'book', area: 'Mente' },
    { ic: 'coin',  area: 'Dinero' }, { ic: 'edit', area: 'Oficio' },
    { ic: 'home',  area: 'Hogar' },  { ic: 'star', area: 'Gente' },
    { ic: 'sun',   area: 'Alegría' },
  ];
  return (
    <Page id={id} theme={theme} tab="Estilo" currentNav="Año">
      <div style={{ display: 'flex', gap: 26, flex: 1, minHeight: 0 }}>
        <div style={{ flex: '1 1 70%', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 14 }}>
            <div>
              <Eyebrow color={c.deep}>Vista anual · sin fechar</Eyebrow>
              <div className="lp-serif" style={{ fontWeight: 500, fontSize: 34, color: LP.ink, marginTop: 6 }}>
                El año <span style={{ fontStyle: 'italic', color: c.ink }}>completo</span>
              </div>
            </div>
            <span style={{ fontFamily: LP.mono, fontSize: 9.5, color: LP.ink3, letterSpacing: 1 }}>toca un mes →</span>
          </div>
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
            gridTemplateRows: 'repeat(3,1fr)', gap: 11 }}>
            {MONTHS.map((m, i) => (
              <MiniMonth key={m} name={m} idx={i} offset={offsets[i]} days={lengths[i]} theme={theme} />
            ))}
          </div>
        </div>

        <div style={{ flex: '1 1 30%', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: c.tint, borderRadius: 10, padding: '16px 18px' }}>
            <span style={{ fontFamily: LP.mono, fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: c.deep }}>
              Palabra del año
            </span>
            <input type="text" className="lp-field lp-serif" name="word-year"
              placeholder="Tu palabra…"
              style={{ fontStyle: 'italic', fontWeight: 500, fontSize: 38,
                color: c.ink, lineHeight: 1, marginTop: 6, width: '100%',
                background: 'transparent', border: 'none', outline: 'none',
                fontFamily: LP.serif, padding: 0, display: 'block' }} />
          </div>

          <div style={{ flex: 1 }}>
            <Eyebrow color={c.deep}>Metas · 7 áreas</Eyebrow>
            <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 9 }}>
              {goals.map((g, gi) => (
                <div key={g.area} style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                  <span style={{ width: 24, height: 24, borderRadius: 999, border: `1px solid ${LP.line}`,
                    background: LP.paper, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon name={g.ic} size={12} color={c.deep} />
                  </span>
                  <span style={{ fontFamily: LP.sans, fontSize: 12, fontWeight: 600, color: LP.ink, width: 56, flexShrink: 0 }}>{g.area}</span>
                  <input type="text" className="lp-field" name={`goal-${gi}`}
                    style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none',
                      borderBottom: `1px solid ${LP.line}`, height: 16, fontFamily: LP.sans,
                      fontSize: 11.5, color: LP.ink, padding: 0, minWidth: 0 }} />
                </div>
              ))}
            </div>
          </div>

          <div>
            <Eyebrow color={c.deep}>Soltar este año</Eyebrow>
            <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                  <Icon name="leaf" size={12} color={c.mid} />
                  <input type="text" className="lp-field" name={`let-go-${i}`}
                    style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none',
                      borderBottom: `1px solid ${LP.line}`, height: 15, fontFamily: LP.sans,
                      fontSize: 11.5, color: LP.ink, padding: 0 }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// MENSUAL
// ═══════════════════════════════════════════════════════════════════════
function Spine() {
  return (
    <div style={{ position: 'relative', width: 1, flex: '0 0 1px', alignSelf: 'stretch' }}>
      <div style={{ position: 'absolute', inset: 0, background: LP.line }} />
      <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: 18,
        background: `linear-gradient(90deg, rgba(120,105,82,.07), transparent)` }} />
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 18,
        background: `linear-gradient(270deg, rgba(120,105,82,.07), transparent)` }} />
    </div>
  );
}

function ProgressBar({ value, total, label, theme }) {
  const c = T(theme);
  const pct = total > 0 ? Math.round((value / total) * 100) : 0;
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
        <span style={{ fontFamily: LP.sans, fontSize: 11.5, fontWeight: 600, color: LP.ink }}>{label}</span>
        <span style={{ fontFamily: LP.mono, fontSize: 9.5, color: c.deep }}>{value}/{total}</span>
      </div>
      <div style={{ height: 6, borderRadius: 6, background: LP.paper, border: `1px solid ${LP.lineSoft}`, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: c.mid }} />
      </div>
    </div>
  );
}

function MonthlySpread({ theme = 'greige', id }) {
  const c = T(theme);
  const cells = monthCells(2, 31);
  const habits = ['Agua', 'Lectura', 'Ejercicio', 'Meditar'];
  return (
    <Page id={id} theme={theme} tab="Productividad" currentNav="Mes" padding={28}>
      <div style={{ display: 'flex', gap: 0, flex: 1, minHeight: 0 }}>
        <div style={{ flex: '1 1 60%', display: 'flex', flexDirection: 'column', paddingRight: 26 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 12 }}>
            <div>
              <Eyebrow color={c.deep}>Planificador mensual</Eyebrow>
              <input type="text" className="lp-field lp-serif" name="month-name"
                placeholder="Mes"
                style={{ fontWeight: 500, fontSize: 40, color: LP.ink, marginTop: 4, display: 'block',
                  fontStyle: 'italic', fontFamily: LP.serif, background: 'transparent',
                  border: 'none', outline: 'none', padding: 0, width: 200 }} />
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <a href="#monthly" className="lp-link" style={{ width: 26, height: 26, borderRadius: 999,
                border: `1px solid ${LP.line}`, display: 'flex', alignItems: 'center',
                justifyContent: 'center', background: LP.paper }}>
                <Icon name="arrowL" size={13} color={c.deep} /></a>
              <a href="#monthly" className="lp-link" style={{ width: 26, height: 26, borderRadius: 999,
                border: `1px solid ${LP.line}`, display: 'flex', alignItems: 'center',
                justifyContent: 'center', background: LP.paper }}>
                <Icon name="arrowR" size={13} color={c.deep} /></a>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', marginBottom: 4 }}>
            {DOW.map((d, i) => (
              <span key={i} style={{ fontFamily: LP.mono, fontSize: 9, textAlign: 'center', letterSpacing: 1,
                color: i >= 5 ? c.deep : LP.ink3, paddingBottom: 4 }}>{d}</span>
            ))}
          </div>
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(7,1fr)',
            gridAutoRows: '1fr', border: `1px solid ${LP.line}`, borderRadius: 6, overflow: 'hidden' }}>
            {cells.map((n, i) => {
              const wknd = i % 7 >= 5;
              return (
                <div key={i} style={{
                  borderRight: (i % 7 !== 6) ? `1px solid ${LP.lineSoft}` : 'none',
                  borderBottom: i < 35 ? `1px solid ${LP.lineSoft}` : 'none',
                  background: wknd ? `${c.tint}55` : 'transparent',
                  padding: '3px 4px', display: 'flex', flexDirection: 'column', gap: 2, minHeight: 0 }}>
                  <span style={{ fontFamily: LP.sans, fontSize: 11, fontWeight: 500,
                    color: n == null ? 'transparent' : LP.ink2 }}>{n || ''}</span>
                  {n && <input type="text" className="lp-field" name={`day-${n}-event`}
                    style={{ flex: 1, width: '100%', background: 'transparent', border: 'none',
                      outline: 'none', fontFamily: LP.sans, fontSize: 8, color: c.ink, padding: 0 }} />}
                </div>
              );
            })}
          </div>
        </div>

        <Spine />

        <div style={{ flex: '1 1 40%', display: 'flex', flexDirection: 'column', paddingLeft: 26, gap: 14 }}>
          <div style={{ background: c.tint, borderRadius: 9, padding: '13px 16px' }}>
            <span style={{ fontFamily: LP.mono, fontSize: 8.5, letterSpacing: 2, textTransform: 'uppercase', color: c.deep }}>Foco del mes</span>
            <input type="text" className="lp-field lp-serif" name="month-focus"
              placeholder="Hacer menos, pero mejor."
              style={{ fontStyle: 'italic', fontWeight: 500, fontSize: 21, color: c.ink, lineHeight: 1.2, marginTop: 4,
                width: '100%', background: 'transparent', border: 'none', outline: 'none',
                fontFamily: LP.serif, padding: 0, display: 'block' }} />
          </div>

          <div style={{ display: 'flex', gap: 18, flex: 1, minHeight: 0 }}>
            <div style={{ flex: 1 }}>
              <Eyebrow color={c.deep}>Prioridades</Eyebrow>
              <div style={{ marginTop: 9, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <CB theme={theme} name={`prio-cb-${i}`} />
                    <input type="text" className="lp-field" name={`prio-${i}`}
                      style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none',
                        borderBottom: `1px solid ${LP.line}`, height: 14, fontFamily: LP.sans,
                        fontSize: 11.5, color: LP.ink, padding: 0, minWidth: 0 }} />
                  </div>
                ))}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <Eyebrow color={c.deep}>Pagos · fechas</Eyebrow>
              <div style={{ marginTop: 9, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <CB theme={theme} name={`pay-cb-${i}`} />
                    <input type="text" className="lp-field" name={`pay-date-${i}`}
                      placeholder="dd"
                      style={{ fontFamily: LP.mono, fontSize: 9.5, color: c.deep, width: 22,
                        background: 'transparent', border: 'none', outline: 'none',
                        borderBottom: `1px solid ${LP.line}`, padding: 0 }} />
                    <input type="text" className="lp-field" name={`pay-name-${i}`}
                      style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none',
                        borderBottom: `1px solid ${LP.line}`, height: 14, fontFamily: LP.sans,
                        fontSize: 11.5, color: LP.ink, padding: 0, minWidth: 0 }} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <Eyebrow color={c.deep}>Hábitos del mes</Eyebrow>
            <div style={{ marginTop: 10, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '11px 18px' }}>
              {habits.map((h, hi) => (
                <div key={hi}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                    <span style={{ fontFamily: LP.sans, fontSize: 11.5, fontWeight: 600, color: LP.ink }}>{h}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 1, fontFamily: LP.mono, fontSize: 9.5, color: c.deep }}>
                      <input type="number" className="lp-field" name={`habit-val-${hi}`} min="0" max="31" defaultValue="0"
                        style={{ width: 22, background: 'transparent', border: 'none', outline: 'none',
                          fontFamily: LP.mono, fontSize: 9.5, color: c.deep, padding: 0, textAlign: 'right' }} />
                      /31
                    </span>
                  </div>
                  <div style={{ height: 6, borderRadius: 6, background: LP.paper, border: `1px solid ${LP.lineSoft}`, overflow: 'hidden' }}>
                    <div id={`monthly-habit-bar-${hi}`} style={{ width: '0%', height: '100%', background: c.mid }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Eyebrow color={c.deep}>Reflexión del mes</Eyebrow>
            <div style={{ marginTop: 9 }}>
              {[0, 1, 2].map((i) => (
                <input key={i} type="text" className="lp-field" name={`reflection-${i}`}
                  style={{ display: 'block', width: '100%', background: 'transparent', border: 'none',
                    outline: 'none', borderBottom: `1px solid ${LP.line}`, height: 19,
                    fontFamily: LP.sans, fontSize: 11.5, color: LP.ink, padding: 0 }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// DIARIO
// ═══════════════════════════════════════════════════════════════════════
function WaterDrops({ total, theme, size = 15 }) {
  const c = T(theme);
  return (
    <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
      {Array.from({ length: total }).map((_, i) => (
        <label key={i} className="lp-cb" style={{ cursor: 'pointer', position: 'relative',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
          <input type="checkbox" className="lp-toggle lp-toggle-drop" name={`water-${i}`} />
          <span className="lp-tg lp-tg-drop">
            <Icon name="drop" size={size} color={c.deep} stroke={1.3} />
          </span>
        </label>
      ))}
    </div>
  );
}

function Daily({ theme = 'greige', id }) {
  const c = T(theme);
  const hours = [];
  for (let h = 6; h <= 19; h++) hours.push(h);
  const meals = ['Desayuno', 'Almuerzo', 'Cena', 'Snack'];
  const dayHabits = ['Movimiento', 'Sin pantalla AM', 'Leer', 'Vitaminas', 'Diario'];
  return (
    <Page id={id} theme={theme} tab="Autocuidado" currentNav="Día" padding={26}>
      <div style={{ display: 'flex', gap: 22, flex: 1, minHeight: 0 }}>

        {/* COL 1 */}
        <div style={{ flex: '1 1 33%', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12 }}>
            <input type="text" className="lp-field lp-serif" name="day-num"
              placeholder="14"
              style={{ fontStyle: 'italic', fontWeight: 500, fontSize: 76, lineHeight: .8, color: c.ink,
                width: 90, background: 'transparent', border: 'none', outline: 'none',
                fontFamily: LP.serif, padding: 0 }} />
            <div style={{ paddingBottom: 6 }}>
              <input type="text" className="lp-field" name="day-name"
                placeholder="Miércoles"
                style={{ display: 'block', fontFamily: LP.sans, fontSize: 15, fontWeight: 700,
                  color: LP.ink, letterSpacing: .3, background: 'transparent',
                  border: 'none', outline: 'none', borderBottom: `1px solid ${LP.line}`,
                  width: 110, padding: 0 }} />
              <div style={{ fontFamily: LP.mono, fontSize: 9, letterSpacing: 1.5, color: LP.ink3, marginTop: 2 }}>SIN FECHAR</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, margin: '14px 0' }}>
            {[{ic:'sun',k:'Clima'},{ic:'heart',k:'Ánimo'},{ic:'moon',k:'Sueño'},{ic:'drop',k:'Agua'}].map((m, mi) => (
              <div key={m.k} style={{ display: 'flex', alignItems: 'center', gap: 7, border: `1px solid ${LP.line}`,
                borderRadius: 6, padding: '6px 9px', background: LP.paper }}>
                <Icon name={m.ic} size={13} color={c.deep} />
                <div style={{ lineHeight: 1.1, minWidth: 0, flex: 1 }}>
                  <div style={{ fontFamily: LP.mono, fontSize: 7.5, letterSpacing: 1, textTransform: 'uppercase', color: LP.ink3 }}>{m.k}</div>
                  <input type="text" className="lp-field" name={`chip-${mi}`}
                    style={{ display: 'block', width: '100%', fontFamily: LP.sans, fontSize: 10.5, fontWeight: 600,
                      color: LP.ink, background: 'transparent', border: 'none', outline: 'none', padding: 0 }} />
                </div>
              </div>
            ))}
          </div>
          <Eyebrow color={c.deep}>Agenda</Eyebrow>
          <div style={{ flex: 1, marginTop: 8, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            {hours.map((h) => (
              <div key={h} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 9,
                borderTop: `1px solid ${LP.lineSoft}`, minHeight: 0 }}>
                <span style={{ fontFamily: LP.mono, fontSize: 8.5, color: LP.ink3, width: 26, flexShrink: 0 }}>
                  {String(h).padStart(2, '0')}:00
                </span>
                <input type="text" className="lp-field" name={`agenda-${h}`}
                  style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none',
                    fontFamily: LP.sans, fontSize: 10, color: c.ink, padding: 0 }} />
              </div>
            ))}
          </div>
        </div>

        <div style={{ width: 1, background: LP.line }} />

        {/* COL 2 */}
        <div style={{ flex: '1 1 33%', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <Eyebrow color={c.deep}>Las tres del día</Eyebrow>
          <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 9 }}>
            {[1, 2, 3].map((n, ni) => (
              <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                <span className="lp-serif" style={{ fontStyle: 'italic', fontSize: 20, color: c.mid, width: 16 }}>{n}</span>
                <CB theme={theme} name={`top3-cb-${ni}`} />
                <input type="text" className="lp-field" name={`top3-${ni}`}
                  style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none',
                    borderBottom: `1px solid ${LP.line}`, height: 18,
                    fontFamily: LP.sans, fontSize: 11.5, color: LP.ink, padding: 0, minWidth: 0 }} />
              </div>
            ))}
          </div>

          <div style={{ background: c.tint, borderRadius: 9, padding: '11px 14px', margin: '16px 0' }}>
            <span style={{ fontFamily: LP.mono, fontSize: 8, letterSpacing: 2, textTransform: 'uppercase', color: c.deep }}>Foco del día</span>
            <input type="text" className="lp-field lp-serif" name="day-focus"
              placeholder="Una cosa bien hecha."
              style={{ fontStyle: 'italic', fontSize: 18, color: c.ink, marginTop: 3, lineHeight: 1.2,
                width: '100%', background: 'transparent', border: 'none', outline: 'none',
                fontFamily: LP.serif, padding: 0, display: 'block' }} />
          </div>

          <Eyebrow color={c.deep}>Por hacer</Eyebrow>
          <div style={{ flex: 1, marginTop: 10, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            {[0,1,2,3,4,5,6,7].map((i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <CB theme={theme} name={`todo-cb-${i}`} />
                <input type="text" className="lp-field" name={`todo-${i}`}
                  style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none',
                    borderBottom: `1px solid ${LP.line}`, height: 14,
                    fontFamily: LP.sans, fontSize: 11.5, color: LP.ink, padding: 0, minWidth: 0 }} />
              </div>
            ))}
          </div>

          <div style={{ marginTop: 14 }}>
            <Eyebrow color={c.deep}>Gratitud</Eyebrow>
            <div style={{ marginTop: 8 }}>
              {[0, 1, 2].map((i) => (
                <input key={i} type="text" className="lp-field" name={`gratitude-${i}`}
                  style={{ display: 'block', width: '100%', background: 'transparent', border: 'none',
                    outline: 'none', borderBottom: `1px solid ${LP.line}`, height: 17,
                    fontFamily: LP.sans, fontSize: 11.5, color: LP.ink, padding: 0 }} />
              ))}
            </div>
          </div>
        </div>

        <div style={{ width: 1, background: LP.line }} />

        {/* COL 3 */}
        <div style={{ flex: '1 1 33%', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <Eyebrow color={c.deep}>Agua · 8 vasos</Eyebrow>
          <div style={{ marginTop: 10, marginBottom: 16 }}>
            <WaterDrops total={8} theme={theme} size={17} />
          </div>

          <Eyebrow color={c.deep}>Comidas</Eyebrow>
          <div style={{ marginTop: 9, marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 7 }}>
            {meals.map((m, mi) => (
              <div key={m} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                <span style={{ fontFamily: LP.mono, fontSize: 8.5, letterSpacing: .5, textTransform: 'uppercase',
                  color: c.deep, width: 56, flexShrink: 0 }}>{m}</span>
                <input type="text" className="lp-field" name={`meal-${mi}`}
                  style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none',
                    borderBottom: `1px solid ${LP.line}`, height: 15,
                    fontFamily: LP.sans, fontSize: 11.5, color: LP.ink, padding: 0, minWidth: 0 }} />
              </div>
            ))}
          </div>

          <Eyebrow color={c.deep}>Hábitos</Eyebrow>
          <div style={{ marginTop: 9, marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 7 }}>
            {dayHabits.map((h, hi) => (
              <div key={h} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                <CB theme={theme} name={`day-habit-${hi}`} />
                <span style={{ fontFamily: LP.sans, fontSize: 11.5, color: LP.ink2 }}>{h}</span>
              </div>
            ))}
          </div>

          <div style={{ border: `1px dashed ${c.mid}`, borderRadius: 9, padding: '11px 14px', marginBottom: 14 }}>
            <span style={{ fontFamily: LP.mono, fontSize: 8, letterSpacing: 2, textTransform: 'uppercase', color: c.deep }}>Momento destacado</span>
            <textarea className="lp-area" name="highlight"
              placeholder="Lo que hoy quiero recordar…"
              rows={2}
              style={{ display: 'block', width: '100%', fontFamily: LP.serif, fontStyle: 'italic',
                fontSize: 16, color: LP.ink2, marginTop: 3, lineHeight: 1.25,
                background: 'transparent', border: 'none', outline: 'none', resize: 'none', padding: 0 }} />
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Eyebrow color={c.deep}>Notas</Eyebrow>
            <div style={{ flex: 1, marginTop: 8, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              {[0, 1, 2, 3].map((i) => (
                <input key={i} type="text" className="lp-field" name={`note-${i}`}
                  style={{ display: 'block', width: '100%', background: 'transparent', border: 'none',
                    outline: 'none', borderBottom: `1px solid ${LP.line}`, height: 16,
                    fontFamily: LP.sans, fontSize: 11.5, color: LP.ink, padding: 0 }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

Object.assign(window, { IndexHub, Yearly, MonthlySpread, Daily, MiniMonth, ProgressBar, WaterDrops, MONTHS, DOW });

// masters-week.jsx — WeeklySpread weekStart=1 (lunes) / weekStart=0 (domingo)

function WeeklySpread({ theme = 'greige', weekStart = 1, id }) {
  const c = T(theme);
  const full = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const abbr = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'];
  const order = weekStart === 1 ? [1, 2, 3, 4, 5, 6, 0] : [0, 1, 2, 3, 4, 5, 6];
  const habits = ['Agua', 'Movimiento', 'Lectura', 'Meditar'];

  return (
    <Page id={id} theme={theme} tab="Productividad" currentNav="Semana" padding={26}>
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>

        {/* cabecera */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 12 }}>
          <div>
            <Eyebrow color={c.deep}>Planificador semanal · inicio {weekStart === 1 ? 'lunes' : 'domingo'}</Eyebrow>
            <div className="lp-serif" style={{ fontWeight: 500, fontSize: 36, color: LP.ink, marginTop: 4 }}>
              La <span style={{ fontStyle: 'italic', color: c.ink }}>semana</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: LP.mono,
              fontSize: 9.5, letterSpacing: 1.5, color: LP.ink3 }}>
              SEMANA{' '}
              {/* (d) número de semana → input */}
              <input type="text" className="lp-field" name="week-num"
                placeholder="__"
                style={{ width: 22, background: 'transparent', border: 'none', outline: 'none',
                  borderBottom: `1px solid ${LP.line}`, fontFamily: LP.mono,
                  fontSize: 9.5, color: LP.ink3, padding: 0, textAlign: 'center' }} />
              {' '}/ 52
            </div>
            {/* (b) variante opuesta */}
            <a href={weekStart === 1 ? '#weekly-sun' : '#weekly-mon'} className="lp-link"
              style={{ fontFamily: LP.mono, fontSize: 9, letterSpacing: 1, color: c.deep,
                border: `1px solid ${c.mid}`, borderRadius: 999, padding: '3px 10px' }}>
              {weekStart === 1 ? 'Dom ↗' : 'Lun ↗'}
            </a>
            <div style={{ display: 'flex', gap: 6 }}>
              <a href={id === 'weekly-mon' ? '#weekly-mon' : '#weekly-sun'} className="lp-link"
                style={{ width: 26, height: 26, borderRadius: 999, border: `1px solid ${LP.line}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', background: LP.paper }}>
                <Icon name="arrowL" size={13} color={c.deep} /></a>
              <a href={id === 'weekly-mon' ? '#weekly-mon' : '#weekly-sun'} className="lp-link"
                style={{ width: 26, height: 26, borderRadius: 999, border: `1px solid ${LP.line}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', background: LP.paper }}>
                <Icon name="arrowR" size={13} color={c.deep} /></a>
            </div>
          </div>
        </div>

        {/* 7 columnas de día */}
        <div style={{ flex: '1 1 62%', display: 'grid', gridTemplateColumns: 'repeat(7,minmax(0,1fr))',
          border: `1px solid ${LP.line}`, borderRadius: 7, overflow: 'hidden' }}>
          {order.map((d, ci) => {
            const wknd = d === 0 || d === 6;
            return (
              <div key={ci} style={{ borderRight: ci < 6 ? `1px solid ${LP.lineSoft}` : 'none',
                display: 'flex', flexDirection: 'column',
                background: wknd ? `${c.tint}44` : 'transparent', minWidth: 0 }}>
                {/* (b) cabecera de columna → enlace al diario */}
                <a href="#daily" className="lp-link" style={{ display: 'flex', alignItems: 'baseline',
                  justifyContent: 'space-between', padding: '8px 9px 7px',
                  borderBottom: `1px solid ${LP.lineSoft}`,
                  background: wknd ? `${c.tint}77` : LP.paper, minWidth: 0 }}>
                  <span style={{ fontFamily: LP.mono, fontSize: 8.5, letterSpacing: 1.5,
                    color: wknd ? c.deep : LP.ink3 }}>{abbr[d]}</span>
                  {/* (d) número de día → input */}
                  <input type="text" className="lp-field lp-serif" name={`day-num-${ci}`}
                    style={{ fontStyle: 'italic', fontSize: 24, lineHeight: 1,
                      color: wknd ? c.ink : LP.ink, width: 28, background: 'transparent',
                      border: 'none', outline: 'none', fontFamily: LP.serif,
                      padding: 0, textAlign: 'right' }}
                    onClick={e => e.preventDefault()} />
                </a>
                {/* 6 filas con CB + línea */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  {[0, 1, 2, 3, 4, 5].map((r) => (
                    <div key={r} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 5,
                      padding: '0 6px', borderTop: r > 0 ? `1px solid ${LP.lineSoft}` : 'none', minHeight: 0 }}>
                      {/* (c) CB con name */}
                      <CB theme={theme} name={`day-${ci}-cb-${r}`} size={11} />
                      {/* (d) línea → input */}
                      <input type="text" className="lp-field" name={`day-${ci}-task-${r}`}
                        style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none',
                          fontFamily: LP.sans, fontSize: 9, color: LP.ink, padding: 0, minWidth: 0 }} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* tira inferior: Top 3 · Hábitos · Notas */}
        <div style={{ flex: '1 1 38%', display: 'flex', gap: 22, marginTop: 16, minHeight: 0 }}>
          {/* Top 3 */}
          <div style={{ flex: '0 0 22%', display: 'flex', flexDirection: 'column' }}>
            <Eyebrow color={c.deep}>Top 3 · semana</Eyebrow>
            <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[1, 2, 3].map((n, ni) => (
                <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="lp-serif" style={{ fontStyle: 'italic', fontSize: 20, color: c.mid, width: 14 }}>{n}</span>
                  <CB theme={theme} name={`top3-cb-${ni}`} />
                  <input type="text" className="lp-field" name={`top3-${ni}`}
                    style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none',
                      borderBottom: `1px solid ${LP.line}`, height: 18,
                      fontFamily: LP.sans, fontSize: 11.5, color: LP.ink, padding: 0, minWidth: 0 }} />
                </div>
              ))}
            </div>
          </div>

          {/* (c) Hábitos 4 × 7 días → lp-toggle/lp-tg */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <Eyebrow color={c.deep}>Hábitos · 7 días</Eyebrow>
            <div style={{ marginTop: 10, flex: 1, display: 'flex', flexDirection: 'column' }}>
              {/* header días */}
              <div style={{ display: 'grid', gridTemplateColumns: '88px repeat(7,minmax(0,1fr))', marginBottom: 4 }}>
                <span />
                {order.map((d, i) => (
                  <span key={i} style={{ fontFamily: LP.mono, fontSize: 7.5, textAlign: 'center', letterSpacing: .5,
                    color: (d === 0 || d === 6) ? c.deep : LP.ink3 }}>{abbr[d].slice(0, 1)}</span>
                ))}
              </div>
              {habits.map((h, hi) => (
                <div key={h} style={{ flex: 1, display: 'grid', gridTemplateColumns: '88px repeat(7,minmax(0,1fr))',
                  alignItems: 'center', borderTop: `1px solid ${LP.lineSoft}` }}>
                  <span style={{ fontFamily: LP.sans, fontSize: 11, fontWeight: 600, color: LP.ink, overflow: 'hidden',
                    textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{h}</span>
                  {order.map((d, i) => (
                    <span key={i} style={{ display: 'flex', justifyContent: 'center' }}>
                      <label style={{ cursor: 'pointer', position: 'relative',
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        width: 13, height: 13 }}>
                        <input type="checkbox" className="lp-toggle" name={`habit-${hi}-day-${i}`} />
                        <span className="lp-tg lp-tg-round"
                          style={{ width: 13, height: 13, borderRadius: 999,
                            border: `1px solid ${LP.line}`, background: 'transparent' }} />
                      </label>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Notas */}
          <div style={{ flex: '0 0 26%', display: 'flex', flexDirection: 'column' }}>
            <Eyebrow color={c.deep}>Notas de la semana</Eyebrow>
            <div style={{ flex: 1, marginTop: 10, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              {[0, 1, 2, 3, 4].map((i) => (
                <input key={i} type="text" className="lp-field" name={`note-${i}`}
                  style={{ display: 'block', width: '100%', background: 'transparent', border: 'none',
                    outline: 'none', borderBottom: `1px solid ${LP.line}`, height: 16,
                    fontFamily: LP.sans, fontSize: 11.5, color: LP.ink, padding: 0 }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

Object.assign(window, { WeeklySpread });

// masters-extras.jsx — HabitTracker · Finance · Wellness · Productivity · Notes

// ═══════════════════════════════════════════════════════════════════════
// TRACKER DE HÁBITOS — 11 hábitos × 31 días
// ═══════════════════════════════════════════════════════════════════════
function HabitTracker({ theme = 'greige', id }) {
  const c = T(theme);
  const defaultHabits = ['Agua 2L','Movimiento','Lectura','Meditar','Sin azúcar','Dormir 8h','Diario','Pasos 8k','Estiramiento','Vitaminas','Sin pantalla'];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const moods = ['😣','😕','😌','🙂','😄'];

  return (
    <Page id={id} theme={theme} tab="Bienestar" currentNav="Mes" padding={26}>
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 14 }}>
          <div>
            <Eyebrow color={c.deep}>Tracker de hábitos · mensual</Eyebrow>
            <div className="lp-serif" style={{ fontWeight: 500, fontSize: 34, color: LP.ink, marginTop: 4 }}>
              Constancia <span style={{ fontStyle: 'italic', color: c.ink }}>diaria</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 22 }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: LP.mono, fontSize: 8.5, letterSpacing: 2, textTransform: 'uppercase', color: LP.ink3 }}>Mes</div>
              {/* (d) nombre del mes → input */}
              <input type="text" className="lp-field lp-serif" name="month-name"
                placeholder="______"
                style={{ fontStyle: 'italic', fontSize: 22, color: LP.ink, display: 'block',
                  background: 'transparent', border: 'none', outline: 'none',
                  borderBottom: `1px solid ${LP.line}`, width: 100, padding: 0,
                  fontFamily: LP.serif, textAlign: 'right' }} />
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: LP.mono, fontSize: 8.5, letterSpacing: 2, textTransform: 'uppercase', color: LP.ink3 }}>Mejor racha</div>
              {/* (d) mejor racha → input */}
              <input type="text" className="lp-field lp-serif" name="best-streak"
                placeholder="__ días"
                style={{ fontStyle: 'italic', fontSize: 22, color: c.ink, display: 'block',
                  background: 'transparent', border: 'none', outline: 'none',
                  borderBottom: `1px solid ${LP.line}`, width: 80, padding: 0,
                  fontFamily: LP.serif, textAlign: 'right' }} />
            </div>
          </div>
        </div>

        {/* rejilla */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', border: `1px solid ${LP.line}`,
          borderRadius: 7, overflow: 'hidden', minHeight: 0 }}>
          {/* header días */}
          <div style={{ display: 'grid', gridTemplateColumns: '108px repeat(31,minmax(0,1fr)) 42px',
            borderBottom: `1px solid ${LP.line}`, background: LP.paper, flexShrink: 0 }}>
            <span style={{ fontFamily: LP.mono, fontSize: 8, letterSpacing: 1, color: LP.ink3, padding: '6px 8px' }}>HÁBITO</span>
            {days.map((d) => (
              <span key={d} style={{ fontFamily: LP.mono, fontSize: 7, textAlign: 'center', color: LP.ink3,
                alignSelf: 'center' }}>{d}</span>
            ))}
            <span style={{ fontFamily: LP.mono, fontSize: 8, textAlign: 'center', color: c.deep, alignSelf: 'center' }}>Σ</span>
          </div>
          {defaultHabits.map((h, hi) => (
            <div key={hi} style={{ flex: 1, display: 'grid', gridTemplateColumns: '108px repeat(31,minmax(0,1fr)) 42px',
              borderTop: hi > 0 ? `1px solid ${LP.lineSoft}` : 'none', alignItems: 'stretch' }}>
              {/* (d) nombre del hábito → input editable */}
              <input type="text" className="lp-field" name={`habit-name-${hi}`}
                defaultValue={h}
                style={{ fontFamily: LP.sans, fontSize: 10.5, fontWeight: 600, color: LP.ink,
                  display: 'flex', alignItems: 'center', padding: '0 8px',
                  background: 'transparent', border: 'none', outline: 'none', width: '100%' }} />
              {days.map((d) => (
                // (c) celda tracker → lp-toggle/lp-tg
                <span key={d} style={{ borderLeft: `1px solid ${LP.lineSoft}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <label style={{ cursor: 'pointer', position: 'relative', display: 'inline-flex',
                    alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                    <input type="checkbox" className="lp-toggle lp-toggle-tracker"
                      name={`habit-${hi}-day-${d}`} />
                    <span className="lp-tg lp-tg-tracker"
                      style={{ width: 9, height: 9, borderRadius: 2, display: 'block' }} />
                  </label>
                </span>
              ))}
              {/* Σ — suma calculada por JS */}
              <span id={`habit-sum-${hi}`} style={{ fontFamily: LP.mono, fontSize: 9.5, color: c.deep,
                fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: `${c.tint}66`, borderLeft: `1px solid ${LP.line}` }}>0</span>
            </div>
          ))}
        </div>

        {/* fila de ánimo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 14, background: c.tint,
          borderRadius: 9, padding: '12px 18px', flexShrink: 0 }}>
          <span style={{ fontFamily: LP.mono, fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: c.deep }}>Ánimo</span>
          {/* (c) emojis de ánimo → radio lp-toggle */}
          <div style={{ display: 'flex', gap: 10 }}>
            {moods.map((m, i) => (
              <label key={i} style={{ cursor: 'pointer', position: 'relative',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <input type="radio" className="lp-toggle" name="mood" value={String(i)} />
                <span className="lp-tg lp-tg-mood" style={{ fontSize: 20, opacity: .9,
                  filter: 'grayscale(.15)', lineHeight: 1, userSelect: 'none' }}>{m}</span>
              </label>
            ))}
          </div>
          <span style={{ width: 1, height: 24, background: c.mid }} />
          <span className="lp-serif" style={{ fontStyle: 'italic', fontSize: 18, color: c.ink, flex: 1 }}>
            Lo importante no es ser perfecta, es volver.
          </span>
        </div>
      </div>
    </Page>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// FINANZAS — presupuesto + ledger auto-crece
// ═══════════════════════════════════════════════════════════════════════
function Finance({ theme = 'greige', id }) {
  const c = T(theme);
  const cats = ['Vivienda','Comida','Transporte','Ocio','Salud','Ahorro','Suscripciones','Otros'];

  return (
    <Page id={id} theme={theme} tab="Finanzas" currentNav="Mes" padding={28}>
      <div style={{ display: 'flex', gap: 28, flex: 1, minHeight: 0 }}>

        {/* IZQUIERDA — presupuesto */}
        <div style={{ flex: '1 1 50%', display: 'flex', flexDirection: 'column' }}>
          <Eyebrow color={c.deep}>Presupuesto del mes</Eyebrow>
          <div style={{ display: 'flex', gap: 10, background: c.tint, borderRadius: 10,
            padding: '16px 18px', margin: '12px 0 18px' }}>
            {[{k:'Entra',name:'budget-in'},{k:'Sale',name:'budget-out'},{k:'Queda',name:'budget-left'}].map((x, i) => (
              <div key={x.k} style={{ flex: 1, textAlign: 'center', borderLeft: i ? `1px solid ${c.mid}66` : 'none' }}>
                <div style={{ fontFamily: LP.mono, fontSize: 8.5, letterSpacing: 2, textTransform: 'uppercase', color: c.deep }}>{x.k}</div>
                {/* (d) cifras → input (Queda es derivado, muestra span) */}
                {x.name === 'budget-left'
                  ? <span id="finance-balance" className="lp-serif"
                      style={{ fontStyle: 'italic', fontWeight: 500, fontSize: 32, color: c.ink,
                        lineHeight: 1.1, display: 'block' }}>0 <span style={{ fontSize: 15 }}>€</span></span>
                  : <input type="number" className="lp-field lp-serif" name={x.name} defaultValue=""
                      placeholder="0"
                      style={{ fontStyle: 'italic', fontWeight: 500, fontSize: 32, color: c.ink,
                        lineHeight: 1.1, width: '100%', background: 'transparent', border: 'none',
                        outline: 'none', fontFamily: LP.serif, padding: 0, textAlign: 'center' }} />
                }
              </div>
            ))}
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            {cats.map((cat, ci) => (
              <div key={ci}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                  <span style={{ fontFamily: LP.sans, fontSize: 11.5, fontWeight: 600, color: LP.ink }}>{cat}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 2,
                    fontFamily: LP.mono, fontSize: 9.5, color: c.deep }}>
                    <input type="number" className="lp-field" name={`cat-spent-${ci}`} defaultValue=""
                      placeholder="0"
                      style={{ width: 38, background: 'transparent', border: 'none', outline: 'none',
                        fontFamily: LP.mono, fontSize: 9.5, color: c.deep, padding: 0, textAlign: 'right' }} />
                    /
                    <input type="number" className="lp-field" name={`cat-budget-${ci}`} defaultValue=""
                      placeholder="0"
                      style={{ width: 38, background: 'transparent', border: 'none', outline: 'none',
                        fontFamily: LP.mono, fontSize: 9.5, color: c.deep, padding: 0, textAlign: 'right' }} />
                  </span>
                </div>
                <div style={{ height: 6, borderRadius: 6, background: LP.paper,
                  border: `1px solid ${LP.lineSoft}`, overflow: 'hidden', marginBottom: 2 }}>
                  <div id={`finance-cat-bar-${ci}`}
                    style={{ width: '0%', height: '100%', background: c.mid }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ border: `1px dashed ${c.mid}`, borderRadius: 9, padding: '11px 14px', marginTop: 14 }}>
            <span style={{ fontFamily: LP.mono, fontSize: 8, letterSpacing: 2, textTransform: 'uppercase', color: c.deep }}>Nota financiera</span>
            <input type="text" className="lp-field lp-serif" name="finance-note"
              placeholder="Cada euro tiene un propósito."
              style={{ fontStyle: 'italic', fontSize: 16, color: LP.ink2, marginTop: 3, display: 'block',
                width: '100%', background: 'transparent', border: 'none', outline: 'none',
                fontFamily: LP.serif, padding: 0 }} />
          </div>
        </div>

        <div style={{ width: 1, background: LP.line }} />

        {/* DERECHA — ledger auto-crece */}
        <div style={{ flex: '1 1 50%', display: 'flex', flexDirection: 'column' }}>
          <Eyebrow color={c.deep}>Registro de gastos</Eyebrow>
          <div style={{ flex: 1, marginTop: 12, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '34px 1fr 80px 72px', padding: '0 4px 7px',
              borderBottom: `1px solid ${LP.line}`, flexShrink: 0 }}>
              {['Fecha','Descripción','Categoría','Importe'].map((h, i) => (
                <span key={h} style={{ fontFamily: LP.mono, fontSize: 8, letterSpacing: 1, textTransform: 'uppercase',
                  color: LP.ink3, textAlign: i === 3 ? 'right' : 'left' }}>{h}</span>
              ))}
            </div>
            {/* ledger auto-crece: 12 filas vacías iniciales */}
            <div id="finance-ledger" style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="ledger-row" style={{ display: 'grid',
                  gridTemplateColumns: '34px 1fr 80px 72px',
                  alignItems: 'center', padding: '0 4px', height: 28,
                  borderBottom: `1px solid ${LP.lineSoft}` }}>
                  <input type="text" className="lp-field" name={`ledger-date-${i}`}
                    style={{ fontFamily: LP.mono, fontSize: 9.5, color: c.deep,
                      background: 'transparent', border: 'none', outline: 'none', padding: 0, width: '100%' }} />
                  <input type="text" className="lp-field" name={`ledger-desc-${i}`}
                    style={{ fontFamily: LP.sans, fontSize: 11.5, color: LP.ink,
                      background: 'transparent', border: 'none', outline: 'none', padding: 0, width: '100%', minWidth: 0 }} />
                  <input type="text" className="lp-field" name={`ledger-cat-${i}`}
                    style={{ fontFamily: LP.sans, fontSize: 10, color: LP.ink3,
                      background: 'transparent', border: 'none', outline: 'none', padding: 0, width: '100%', minWidth: 0 }} />
                  <input type="text" className="lp-field" name={`ledger-amt-${i}`}
                    style={{ fontFamily: LP.mono, fontSize: 10.5, color: LP.ink2, textAlign: 'right',
                      background: 'transparent', border: 'none', outline: 'none', padding: 0, width: '100%' }} />
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 14,
            paddingTop: 12, borderTop: `1.5px solid ${c.mid}`, flexShrink: 0 }}>
            <span style={{ fontFamily: LP.mono, fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: c.deep }}>Total gastos</span>
            <span id="finance-total" className="lp-serif"
              style={{ fontStyle: 'italic', fontWeight: 500, fontSize: 34, color: c.ink }}>
              0 <span style={{ fontSize: 17 }}>€</span>
            </span>
          </div>
        </div>
      </div>
    </Page>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// BIENESTAR — comidas + compra + agua + autocuidado + cuerpo
// ═══════════════════════════════════════════════════════════════════════
function Wellness({ theme = 'greige', id }) {
  const c = T(theme);
  const wkDays = ['L','M','X','J','V','S','D'];
  const slots = ['Desayuno','Almuerzo','Cena','Snacks'];
  const care = [
    { ic:'bowl', t:'Baño caliente',    d:'20 min' },
    { ic:'book', t:'Leer ficción',     d:'30 min' },
    { ic:'leaf', t:'Paseo lento',      d:'15 min' },
    { ic:'moon', t:'Skincare',         d:'10 min' },
    { ic:'heart',t:'Llamar a alguien', d:'15 min' },
    { ic:'flower',t:'Estiramiento',    d:'12 min' },
  ];
  const body = ['Energía','Estrés','Descanso'];

  return (
    <Page id={id} theme={theme} tab="Bienestar" currentNav="Semana" padding={26}>
      <div style={{ display: 'flex', gap: 22, flex: 1, minHeight: 0 }}>

        {/* IZQUIERDA — meal planner */}
        <div style={{ flex: '1 1 42%', display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: 10 }}>
            <Eyebrow color={c.deep}>Bienestar · semana</Eyebrow>
            <div className="lp-serif" style={{ fontWeight: 500, fontSize: 30, color: LP.ink, marginTop: 4 }}>
              Menú <span style={{ fontStyle: 'italic', color: c.ink }}>de la semana</span>
            </div>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', border: `1px solid ${LP.line}`,
            borderRadius: 7, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '26px repeat(4,minmax(0,1fr))', background: LP.paper,
              borderBottom: `1px solid ${LP.line}`, flexShrink: 0 }}>
              <span />
              {slots.map((s) => (
                <span key={s} style={{ fontFamily: LP.mono, fontSize: 7.5, letterSpacing: .5, textTransform: 'uppercase',
                  color: c.deep, textAlign: 'center', padding: '6px 2px' }}>{s}</span>
              ))}
            </div>
            {wkDays.map((d, di) => (
              <div key={di} style={{ flex: 1, display: 'grid', gridTemplateColumns: '26px repeat(4,minmax(0,1fr))',
                borderTop: di > 0 ? `1px solid ${LP.lineSoft}` : 'none' }}>
                <span style={{ fontFamily: LP.mono, fontSize: 9, color: LP.ink3, display: 'flex',
                  alignItems: 'center', justifyContent: 'center', background: `${c.tint}55` }}>{d}</span>
                {slots.map((s, si) => (
                  /* (d) celda de comida → input */
                  <input key={si} type="text" className="lp-field" name={`meal-${di}-${si}`}
                    style={{ fontFamily: LP.sans,
                      fontSize: 9.5, color: LP.ink, background: 'transparent', border: 'none',
                      outline: 'none', borderLeft: `1px solid ${LP.lineSoft}`,
                      padding: '2px 4px', width: '100%', minWidth: 0 }} />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div style={{ width: 1, background: LP.line }} />

        {/* DERECHA */}
        <div style={{ flex: '1 1 58%', display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0 }}>
          <div style={{ display: 'flex', gap: 22 }}>
            {/* lista de compra */}
            <div style={{ flex: 1 }}>
              <Eyebrow color={c.deep}>Lista de compra</Eyebrow>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px', marginTop: 9 }}>
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, height: 22 }}>
                    <CB theme={theme} name={`shop-cb-${i}`} size={11} />
                    <input type="text" className="lp-field" name={`shop-item-${i}`}
                      style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none',
                        borderBottom: `1px solid ${LP.line}`, fontFamily: LP.sans,
                        fontSize: 11, color: LP.ink, padding: 0, minWidth: 0 }} />
                  </div>
                ))}
              </div>
            </div>
            {/* agua semanal */}
            <div style={{ flex: '0 0 44%' }}>
              <Eyebrow color={c.deep}>Agua · 7 días</Eyebrow>
              <div style={{ marginTop: 9, display: 'flex', flexDirection: 'column', gap: 4 }}>
                {wkDays.map((d, di) => (
                  <div key={di} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <span style={{ fontFamily: LP.mono, fontSize: 8.5, color: LP.ink3, width: 10 }}>{d}</span>
                    {/* (c) gotas de agua → lp-toggle/lp-tg-round */}
                    {Array.from({ length: 8 }).map((_, i) => (
                      <label key={i} style={{ cursor: 'pointer', position: 'relative',
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        width: 10, height: 10 }}>
                        <input type="checkbox" className="lp-toggle" name={`water-${di}-${i}`} />
                        <span className="lp-tg lp-tg-round"
                          style={{ width: 8, height: 8, borderRadius: 999,
                            border: `1px solid ${LP.line}`, background: 'transparent' }} />
                      </label>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* autocuidado */}
          <div>
            <Eyebrow color={c.deep}>Menú de autocuidado</Eyebrow>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 9, marginTop: 10 }}>
              {care.map((x, xi) => (
                <label key={xi} style={{ border: `1px solid ${LP.line}`, borderRadius: 7,
                  padding: '9px 11px', background: LP.paper, display: 'flex', alignItems: 'center',
                  gap: 9, cursor: 'pointer', position: 'relative' }}>
                  {/* (c) item de autocuidado → toggle */}
                  <input type="checkbox" className="lp-toggle lp-toggle-care" name={`care-${xi}`} />
                  <span style={{ width: 26, height: 26, borderRadius: 999, background: c.tint, flex: '0 0 auto',
                    display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name={x.ic} size={13} color={c.deep} /></span>
                  <div style={{ lineHeight: 1.2, minWidth: 0 }}>
                    <div style={{ fontFamily: LP.sans, fontSize: 11.5, fontWeight: 600, color: LP.ink }}>{x.t}</div>
                    <div style={{ fontFamily: LP.mono, fontSize: 8.5, color: c.deep }}>{x.d}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* chequeo corporal */}
          <div style={{ background: c.tint, borderRadius: 9, padding: '13px 18px', marginTop: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <span style={{ fontFamily: LP.mono, fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: c.deep }}>Chequeo corporal</span>
              <span style={{ flex: 1, height: 1, background: `${c.mid}88` }} />
            </div>
            <div style={{ display: 'flex', gap: 22 }}>
              {body.map((b, bi) => (
                <div key={bi} style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                    <span style={{ fontFamily: LP.sans, fontSize: 11, fontWeight: 600, color: c.ink }}>{b}</span>
                    {/* (d) valor → input range */}
                    <input type="number" className="lp-field" name={`body-${bi}`}
                      min="1" max="10" defaultValue=""
                      placeholder="—"
                      style={{ width: 28, background: 'transparent', border: 'none', outline: 'none',
                        fontFamily: LP.mono, fontSize: 9.5, color: c.deep, padding: 0, textAlign: 'right' }} />
                  </div>
                  <div style={{ display: 'flex', gap: 3 }}>
                    {Array.from({ length: 10 }).map((_, i) => (
                      <span key={i} style={{ flex: 1, height: 6, borderRadius: 2,
                        background: `${c.mid}44` }} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// PRODUCTIVIDAD — proyectos + meta + hitos
// ═══════════════════════════════════════════════════════════════════════
function Productivity({ theme = 'greige', id }) {
  const c = T(theme);
  const milestoneCount = 6;
  const actionCount = 3;

  return (
    <Page id={id} theme={theme} tab="Productividad" currentNav="Mes" padding={28}>
      <div style={{ display: 'flex', gap: 28, flex: 1, minHeight: 0 }}>

        {/* IZQUIERDA — proyectos */}
        <div style={{ flex: '1 1 52%', display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: 12 }}>
            <Eyebrow color={c.deep}>Productividad · proyectos</Eyebrow>
            <div className="lp-serif" style={{ fontWeight: 500, fontSize: 30, color: LP.ink, marginTop: 4 }}>
              En <span style={{ fontStyle: 'italic', color: c.ink }}>marcha</span>
            </div>
          </div>
          <div style={{ flex: 1, display: 'grid', gridTemplateRows: 'repeat(4,1fr)', gap: 10 }}>
            {[0,1,2,3].map((pi) => (
              <div key={pi} style={{ border: `1px solid ${LP.line}`, borderRadius: 8,
                padding: '11px 14px', background: LP.paper, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 8 }}>
                  {/* (d) título del proyecto → input */}
                  <input type="text" className="lp-field" name={`proj-title-${pi}`}
                    placeholder="Nombre del proyecto"
                    style={{ flex: 1, fontFamily: LP.sans, fontSize: 14, fontWeight: 700, color: LP.ink,
                      background: 'transparent', border: 'none', outline: 'none',
                      borderBottom: `1px solid ${LP.line}`, padding: 0, minWidth: 0 }} />
                  {/* (d) estado → input */}
                  <input type="text" className="lp-field" name={`proj-status-${pi}`}
                    placeholder="Estado"
                    style={{ fontFamily: LP.mono, fontSize: 8.5, letterSpacing: 1, textTransform: 'uppercase',
                      color: c.deep, background: c.tint, borderRadius: 999, padding: '2px 8px',
                      border: 'none', outline: 'none', width: 70 }} />
                  {/* (d) % → input */}
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                    <input type="number" className="lp-field" name={`proj-pct-${pi}`}
                      min="0" max="100" defaultValue="" placeholder="0"
                      style={{ fontFamily: LP.serif, fontStyle: 'italic', fontSize: 22, color: c.ink,
                        background: 'transparent', border: 'none', outline: 'none',
                        width: 40, padding: 0, textAlign: 'right' }} />
                    <span className="lp-serif" style={{ fontStyle: 'italic', fontSize: 18, color: c.ink }}>%</span>
                  </div>
                </div>
                <div style={{ height: 6, borderRadius: 6, background: c.tint, overflow: 'hidden', marginBottom: 9 }}>
                  <div id={`proj-bar-${pi}`} style={{ width: '0%', height: '100%', background: c.deep }} />
                </div>
                {/* fases con CB */}
                <div style={{ display: 'flex', gap: 6 }}>
                  {Array.from({ length: 6 }).map((_, fi) => (
                    <span key={fi} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <CB theme={theme} name={`proj-${pi}-fase-${fi}`} size={11} />
                      <span style={{ fontFamily: LP.mono, fontSize: 8, color: LP.ink3 }}>F{fi + 1}</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ width: 1, background: LP.line }} />

        {/* DERECHA — meta + hitos + acciones */}
        <div style={{ flex: '1 1 48%', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: c.tint, borderRadius: 10, padding: '15px 18px' }}>
            <span style={{ fontFamily: LP.mono, fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: c.deep }}>Desglose de meta</span>
            <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 9 }}>
              {['Por qué','Resultado','Responsable','Fecha'].map((k, ki) => (
                <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontFamily: LP.sans, fontSize: 11, fontWeight: 700, color: c.ink, width: 80, flexShrink: 0 }}>{k}</span>
                  <input type="text" className="lp-field" name={`goal-${ki}`}
                    style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none',
                      borderBottom: `1px solid ${c.mid}88`, height: 16,
                      fontFamily: LP.sans, fontSize: 11.5, color: LP.ink, padding: 0, minWidth: 0 }} />
                </div>
              ))}
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <Eyebrow color={c.deep}>Hitos</Eyebrow>
            <div style={{ marginTop: 12, position: 'relative', paddingLeft: 18 }}>
              <span style={{ position: 'absolute', left: 5, top: 4, bottom: 4, width: 1, background: LP.line }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                {Array.from({ length: milestoneCount }).map((_, mi) => (
                  <div key={mi} style={{ display: 'flex', alignItems: 'center', gap: 12, position: 'relative' }}>
                    {/* (c) punto de hito → CB */}
                    <CB theme={theme} name={`milestone-cb-${mi}`} size={9}
                      style={{ position: 'absolute', left: -16 }} />
                    <input type="text" className="lp-field" name={`milestone-date-${mi}`}
                      placeholder="Sem X"
                      style={{ fontFamily: LP.mono, fontSize: 9, color: c.deep, width: 38, flexShrink: 0,
                        background: 'transparent', border: 'none', outline: 'none',
                        borderBottom: `1px solid ${LP.line}`, padding: 0 }} />
                    <input type="text" className="lp-field" name={`milestone-text-${mi}`}
                      style={{ flex: 1, fontFamily: LP.sans, fontSize: 12.5, color: LP.ink,
                        background: 'transparent', border: 'none', outline: 'none',
                        borderBottom: `1px solid ${LP.line}`, padding: 0, minWidth: 0 }} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <Eyebrow color={c.deep}>Acciones de la semana</Eyebrow>
            <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 9 }}>
              {Array.from({ length: actionCount }).map((_, ai) => (
                <div key={ai} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                  <CB theme={theme} name={`action-cb-${ai}`} />
                  <input type="text" className="lp-field" name={`action-${ai}`}
                    style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none',
                      borderBottom: `1px solid ${LP.line}`, height: 16,
                      fontFamily: LP.sans, fontSize: 11.5, color: LP.ink, padding: 0, minWidth: 0 }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// NOTAS — rayado izquierda · punteado derecha
// ═══════════════════════════════════════════════════════════════════════
function Notes({ theme = 'greige', id }) {
  const c = T(theme);
  return (
    <Page id={id} theme={theme} tab="Estilo" currentNav="Notas" padding={0}>
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        {/* rayado */}
        <div style={{ flex: 1, position: 'relative', padding: '24px 30px',
          display: 'flex', flexDirection: 'column' }}>
          <Eyebrow color={c.deep}>Rayado</Eyebrow>
          <div style={{ flex: 1, marginTop: 16, position: 'relative',
            backgroundImage: `repeating-linear-gradient(${LP.line}, ${LP.line} 1px, transparent 1px, transparent 24px)`,
            backgroundPosition: '0 6px' }}>
            {/* (d) textarea transparente sobre el fondo decorativo */}
            <textarea className="lp-area" name="notes-lined"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
                background: 'transparent', border: 'none', outline: 'none', resize: 'none',
                fontFamily: LP.sans, fontSize: 13, lineHeight: '24px', color: LP.ink,
                padding: '6px 0 0 0', zIndex: 1 }} />
          </div>
        </div>

        {/* lomo */}
        <div style={{ position: 'relative', width: 1, flex: '0 0 1px' }}>
          <div style={{ position: 'absolute', inset: 0, background: LP.line }} />
          <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: 22,
            background: `linear-gradient(90deg, rgba(120,105,82,.06), transparent)` }} />
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 22,
            background: `linear-gradient(270deg, rgba(120,105,82,.06), transparent)` }} />
        </div>

        {/* punteado */}
        <div style={{ flex: 1, position: 'relative', padding: '24px 30px',
          display: 'flex', flexDirection: 'column' }}>
          <Eyebrow color={c.deep}>Punteado</Eyebrow>
          <div style={{ flex: 1, marginTop: 16, position: 'relative',
            backgroundImage: `radial-gradient(${LP.line} 1px, transparent 1.4px)`,
            backgroundSize: '18px 18px', backgroundPosition: '4px 6px' }}>
            <textarea className="lp-area" name="notes-dotted"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
                background: 'transparent', border: 'none', outline: 'none', resize: 'none',
                fontFamily: LP.sans, fontSize: 13, lineHeight: '18px', color: LP.ink,
                padding: '2px 0 0 0', zIndex: 1 }} />
          </div>
        </div>
      </div>
    </Page>
  );
}

Object.assign(window, { HabitTracker, Finance, Wellness, Productivity, Notes });


THEMES['_s_'] = { tint:'Z9TINT', mid:'Z9MID', deep:'Z9DEEP', ink:'Z9TINK', name:'Z9TNAME', pantone:'' };

export function renderBody() {
  const S = '_s_';
  return [
    { id:'cover',        html: renderToStaticMarkup(React.createElement(Cover,        { id:'cover',        theme:S })) },
    { id:'hub',          html: renderToStaticMarkup(React.createElement(IndexHub,      { id:'hub',          theme:S })) },
    { id:'yearly',       html: renderToStaticMarkup(React.createElement(Yearly,        { id:'yearly',       theme:S })) },
    { id:'monthly',      html: renderToStaticMarkup(React.createElement(MonthlySpread, { id:'monthly',      theme:S })) },
    { id:'weekly-mon',   html: renderToStaticMarkup(React.createElement(WeeklySpread,  { id:'weekly-mon',   theme:S, weekStart:1 })) },
    { id:'weekly-sun',   html: renderToStaticMarkup(React.createElement(WeeklySpread,  { id:'weekly-sun',   theme:S, weekStart:0 })) },
    { id:'daily',        html: renderToStaticMarkup(React.createElement(Daily,          { id:'daily',        theme:S })) },
    { id:'habits',       html: renderToStaticMarkup(React.createElement(HabitTracker,  { id:'habits',       theme:S })) },
    { id:'finance',      html: renderToStaticMarkup(React.createElement(Finance,       { id:'finance',      theme:S })) },
    { id:'wellness',     html: renderToStaticMarkup(React.createElement(Wellness,      { id:'wellness',     theme:S })) },
    { id:'productivity', html: renderToStaticMarkup(React.createElement(Productivity,  { id:'productivity', theme:S })) },
    { id:'notes',        html: renderToStaticMarkup(React.createElement(Notes,          { id:'notes',        theme:S })) },
  ];
}
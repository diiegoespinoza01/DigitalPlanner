// build/build-planner.mjs — Linen Paper Co. · Planner Digital
import { createRequire as __cr } from 'module';
const require = __cr(import.meta.url);
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import * as esbuild from 'esbuild';
import https from 'https';
import http from 'http';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const SRC  = resolve(ROOT, 'src');
const OUT  = resolve(ROOT, 'out');
const ASSETS = resolve(ROOT, 'assets/fonts');

mkdirSync(OUT, { recursive: true });
mkdirSync(ASSETS, { recursive: true });

// ── Configuración ──────────────────────────────────────────────────────
const DOC_ID   = 'planner-digital';
const PAGE_W   = 1080;
const PAGE_H   = 810;
const THEMES = {
  greige:   { tint:'#EFE6D2', mid:'#C9BBA0', deep:'#8A7B62', ink:'#5C4F3B', name:'Greige' },
  sage:     { tint:'#DCE4D2', mid:'#A8B895', deep:'#6E8059', ink:'#4D5C3D', name:'Salvia' },
  lavender: { tint:'#E1DAE6', mid:'#B6A8C4', deep:'#8473A0', ink:'#5C4E73', name:'Lavanda' },
  sky:      { tint:'#D8E1E7', mid:'#A7BACA', deep:'#6F8DA4', ink:'#4D6577', name:'Cielo' },
  blush:    { tint:'#ECD9D2', mid:'#D2A99A', deep:'#A87567', ink:'#76493D', name:'Rubor' },
  clay:     { tint:'#E5C9B3', mid:'#C99577', deep:'#9A6243', ink:'#6B4029', name:'Arcilla' },
};
const THEME_ORDER = ['greige','sage','lavender','sky','blush','clay'];
const DEFAULT_THEME = 'greige';

const PAGES = [
  { id:'cover',       label:'Portada' },
  { id:'hub',         label:'Índice' },
  { id:'yearly',      label:'Vista anual' },
  { id:'monthly',     label:'Mensual' },
  { id:'weekly-mon',  label:'Semanal · lunes' },
  { id:'weekly-sun',  label:'Semanal · domingo' },
  { id:'daily',       label:'Diario' },
  { id:'habits',      label:'Hábitos' },
  { id:'finance',     label:'Finanzas' },
  { id:'wellness',    label:'Bienestar' },
  { id:'productivity',label:'Productividad' },
  { id:'notes',       label:'Notas' },
];

// ── Utilidades ─────────────────────────────────────────────────────────
function fetchUrl(url) {
  return new Promise((res, rej) => {
    const mod = url.startsWith('https') ? https : http;
    const opts = { headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36' } };
    mod.get(url, opts, r => {
      if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location) {
        return fetchUrl(r.headers.location).then(res).catch(rej);
      }
      const chunks = [];
      r.on('data', c => chunks.push(c));
      r.on('end', () => res(Buffer.concat(chunks)));
      r.on('error', rej);
    }).on('error', rej);
  });
}

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0,2), 16);
  const g = parseInt(h.slice(2,4), 16);
  const b = parseInt(h.slice(4,6), 16);
  return [r, g, b];
}

function hexWithAlpha(hex, alphaHex) {
  const [r,g,b] = hexToRgb(hex);
  const a = parseInt(alphaHex, 16) / 255;
  return `rgba(${r},${g},${b},${a.toFixed(3)})`;
}

// ── Fuentes ────────────────────────────────────────────────────────────
async function getFontsCSS() {
  const cacheFile = resolve(ASSETS, 'fonts-inline.css');
  if (existsSync(cacheFile)) {
    console.log('  ✓ Fuentes desde caché');
    return readFileSync(cacheFile, 'utf8');
  }
  console.log('  ↓ Descargando fuentes de Google Fonts…');
  const gfUrl = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600&family=Manrope:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap';
  let css;
  try {
    css = (await fetchUrl(gfUrl)).toString('utf8');
  } catch(e) {
    console.warn('  ✗ No se pudo descargar fuentes:', e.message, '→ usando cadena de sistema');
    return '';
  }

  // Extraer solo bloques latin (filtrar por comentario /* latin */)
  const blocks = css.split(/(?=\/\* )/);
  const latinBlocks = blocks.filter(b => b.startsWith('/* latin */') || b.startsWith('/* latin-ext */'));

  // Para cada @font-face, descargar la URL woff2 y reemplazar con base64
  const processed = [];
  for (const block of latinBlocks) {
    const urlMatch = block.match(/url\((https:\/\/[^)]+\.woff2)\)/);
    if (!urlMatch) { processed.push(block); continue; }
    const woff2Url = urlMatch[1];
    try {
      const buf = await fetchUrl(woff2Url);
      const b64 = buf.toString('base64');
      processed.push(block.replace(urlMatch[0], `url(data:font/woff2;base64,${b64})`));
    } catch(e) {
      console.warn('  ✗ No se pudo descargar', woff2Url);
      processed.push(block);
    }
  }

  const result = processed.join('');
  writeFileSync(cacheFile, result, 'utf8');
  console.log('  ✓ Fuentes inlineadas y cacheadas');
  return result;
}

// ── Entry JSX ─────────────────────────────────────────────────────────
function buildEntry() {
  const srcFiles = [
    'brand.jsx', 'covers.jsx', 'masters-core.jsx', 'masters-week.jsx', 'masters-extras.jsx'
  ];
  const parts = [
    `import React from 'react';`,
    `import { renderToStaticMarkup } from 'react-dom/server';`,
    `globalThis.React = React;`,
    `globalThis.window = globalThis;`,
    ``,
    ...srcFiles.map(f => readFileSync(resolve(SRC, f), 'utf8')),
    ``,
    // Inyectar tema centinela — los tokens Z9* se reemplazarán por CSS vars en post-proceso
    `THEMES['_s_'] = { tint:'Z9TINT', mid:'Z9MID', deep:'Z9DEEP', ink:'Z9TINK', name:'Z9TNAME', pantone:'' };`,
    ``,
    `export function renderBody() {`,
    `  const S = '_s_';`,
    `  return [`,
    `    { id:'cover',        html: renderToStaticMarkup(React.createElement(Cover,        { id:'cover',        theme:S })) },`,
    `    { id:'hub',          html: renderToStaticMarkup(React.createElement(IndexHub,      { id:'hub',          theme:S })) },`,
    `    { id:'yearly',       html: renderToStaticMarkup(React.createElement(Yearly,        { id:'yearly',       theme:S })) },`,
    `    { id:'monthly',      html: renderToStaticMarkup(React.createElement(MonthlySpread, { id:'monthly',      theme:S })) },`,
    `    { id:'weekly-mon',   html: renderToStaticMarkup(React.createElement(WeeklySpread,  { id:'weekly-mon',   theme:S, weekStart:1 })) },`,
    `    { id:'weekly-sun',   html: renderToStaticMarkup(React.createElement(WeeklySpread,  { id:'weekly-sun',   theme:S, weekStart:0 })) },`,
    `    { id:'daily',        html: renderToStaticMarkup(React.createElement(Daily,          { id:'daily',        theme:S })) },`,
    `    { id:'habits',       html: renderToStaticMarkup(React.createElement(HabitTracker,  { id:'habits',       theme:S })) },`,
    `    { id:'finance',      html: renderToStaticMarkup(React.createElement(Finance,       { id:'finance',      theme:S })) },`,
    `    { id:'wellness',     html: renderToStaticMarkup(React.createElement(Wellness,      { id:'wellness',     theme:S })) },`,
    `    { id:'productivity', html: renderToStaticMarkup(React.createElement(Productivity,  { id:'productivity', theme:S })) },`,
    `    { id:'notes',        html: renderToStaticMarkup(React.createElement(Notes,          { id:'notes',        theme:S })) },`,
    `  ];`,
    `}`,
  ];
  return parts.join('\n');
}

// ── Post-proceso: Z9* → CSS vars ───────────────────────────────────────
function collectAlphas(html) {
  const alphas = new Set();
  const re = /Z9(TINT|MID|DEEP|TINK)([0-9a-f]{2})/gi;
  let m;
  while ((m = re.exec(html)) !== null) alphas.add(`${m[1].toLowerCase()}-${m[2]}`);
  // Set base mínimo según spec
  ['deep-22','deep-33','deep-44','mid-22','mid-66','mid-88','tint-44','tint-55','tint-66','tint-77'].forEach(a => alphas.add(a));
  return alphas;
}

function processHtml(html) {
  // Z9TINT55 → var(--c-tint-55), Z9TINT → var(--c-tint)
  return html.replace(/Z9(TINT|MID|DEEP|TINK)([0-9a-f]{2})?/gi, (_, base, alpha) => {
    const b = base.toLowerCase().replace('tink','ink');
    return alpha ? `var(--c-${b}-${alpha})` : `var(--c-${b})`;
  }).replace(/Z9TNAME/g, `<span class="js-theme-name">Greige</span>`);
}

function buildThemeCSS(alphas) {
  return THEME_ORDER.map(id => {
    const t = THEMES[id];
    const vars = [
      `  --c-tint:${t.tint};`,
      `  --c-mid:${t.mid};`,
      `  --c-deep:${t.deep};`,
      `  --c-ink:${t.ink};`,
    ];
    for (const a of [...alphas].sort()) {
      const [base, hex] = a.split('-');
      const colorKey = { tint:'tint', mid:'mid', deep:'deep', ink:'ink' }[base];
      if (!colorKey) continue;
      vars.push(`  --c-${base}-${hex}:${hexWithAlpha(t[colorKey], hex)};`);
    }
    return `html[data-theme="${id}"]{\n${vars.join('\n')}\n}`;
  }).join('\n');
}

// ── CSS global del runtime ─────────────────────────────────────────────
function buildGlobalCSS(fontsCSS) {
  return `
${fontsCSS}

*, *::before, *::after { box-sizing: border-box; }
html, body { margin: 0; padding: 0; height: 100%; overflow: hidden; background: #f0eee9; }
body { display: flex; flex-direction: column; }

/* ── Toolbar ── */
#lp-toolbar {
  height: 44px; flex-shrink: 0;
  display: flex; align-items: center; gap: 8px;
  padding: 0 14px;
  background: #FAF6EE; border-bottom: 1px solid #D8CFC0;
  font-family: 'Manrope', system-ui, sans-serif; font-size: 12px; color: #2B2622;
  position: relative; z-index: 100;
}
.tb-brand { font-family: 'Cormorant Garamond', Georgia, serif; font-style: italic;
  font-size: 17px; font-weight: 500; color: #2B2622; text-decoration: none; white-space: nowrap; }
.tb-sep { width: 1px; height: 20px; background: #D8CFC0; flex-shrink: 0; }
.tb-nav { display: flex; align-items: center; gap: 4px; }
.tb-nav button { background: none; border: 1px solid transparent; border-radius: 6px;
  padding: 3px 8px; cursor: pointer; font-size: 13px; color: #5A4F45; line-height: 1; }
.tb-nav button:hover { border-color: #D8CFC0; background: #F5EFE6; }
#tb-label { font-size: 12px; font-weight: 600; color: #2B2622; min-width: 120px;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; text-align: center; }
.tb-right { margin-left: auto; display: flex; align-items: center; gap: 8px; }
.tb-dots { display: flex; gap: 6px; align-items: center; }
.tb-dot { width: 14px; height: 14px; border-radius: 50%; cursor: pointer;
  border: 1.5px solid transparent; transition: transform .15s; flex-shrink: 0; }
.tb-dot:hover { transform: scale(1.2); }
.tb-dot.is-active { border-color: #2B2622; box-shadow: 0 0 0 2px #FAF6EE; }
.tb-btn { background: none; border: 1px solid #D8CFC0; border-radius: 6px;
  padding: 4px 10px; cursor: pointer; font-size: 11px; font-family: inherit;
  color: #5A4F45; white-space: nowrap; transition: background .12s; }
.tb-btn:hover { background: #F5EFE6; }
.tb-btn.danger { color: #A87567; border-color: #D2A99A; }
.tb-btn.danger:hover { background: #ECD9D2; }

/* ── Stage / Fit ── */
#lp-fit {
  flex: 1; overflow: auto; display: flex;
  align-items: center; justify-content: center; padding: 8px;
}
#lp-stage {
  width: ${PAGE_W}px; height: ${PAGE_H}px;
  position: relative; transform-origin: top center; flex-shrink: 0;
}

/* ── Router: solo visible la página activa ── */
.lp-page { display: none !important; }
.lp-page.is-active { display: flex !important; }

/* ── Inputs / Textareas (lp-field, lp-area) ── */
.lp-field, .lp-area {
  font-family: inherit; color: inherit; caret-color: var(--c-deep, #8A7B62);
}
.lp-field::placeholder, .lp-area::placeholder { color: #B8AE9D; }
.lp-field:focus, .lp-area:focus { background: rgba(0,0,0,.02) !important; }

/* ── Checkboxes / Toggles ── */
.lp-toggle {
  position: absolute; opacity: 0; inset: 0; width: 100%; height: 100%;
  margin: 0; cursor: pointer; z-index: 2;
}

/* Checkbox estándar (lp-tg-cb) */
.lp-tg-cb {
  border: 1px solid #D8CFC0; background: transparent;
  display: inline-flex; align-items: center; justify-content: center;
  transition: background .12s, border-color .12s;
}
.lp-toggle:checked + .lp-tg-cb {
  background: var(--c-tint); border-color: var(--c-deep);
}
.lp-toggle:checked + .lp-tg-cb::after {
  content: '';
  display: block; width: 55%; height: 55%;
  background: var(--c-deep);
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 10'%3E%3Cpath d='M1.5 5.2L4 7.6 8.6 2.2' stroke='black' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3C/svg%3E");
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 10'%3E%3Cpath d='M1.5 5.2L4 7.6 8.6 2.2' stroke='black' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3C/svg%3E");
  -webkit-mask-size: contain; mask-size: contain;
  -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;
  -webkit-mask-position: center; mask-position: center;
}

/* Toggle redondo (habits semanal, agua wellness) */
.lp-tg-round {
  border: 1px solid #D8CFC0; background: transparent;
  display: block; transition: background .12s, border-color .12s;
}
.lp-toggle:checked + .lp-tg-round {
  background: var(--c-mid); border-color: var(--c-deep);
}

/* Toggle tracker de hábitos (cuadrito en rejilla) */
.lp-tg-tracker {
  background: transparent; border-radius: 2px;
  transition: background .12s;
}
.lp-toggle-tracker:checked + .lp-tg-tracker {
  background: var(--c-mid);
}

/* Toggle gota de agua */
.lp-tg-drop { display: inline-flex; transition: opacity .12s; }
.lp-toggle-drop:checked + .lp-tg-drop { filter: none; }
.lp-toggle-drop:not(:checked) + .lp-tg-drop { opacity: 0.35; }
.lp-toggle-drop:checked + .lp-tg-drop svg path { fill: var(--c-tint); }

/* Radio de ánimo */
.lp-tg-mood { display: block; user-select: none; transition: filter .15s, transform .15s; filter: grayscale(1); opacity: .45; }
.lp-toggle:checked + .lp-tg-mood { filter: grayscale(0); opacity: 1; transform: scale(1.2); }

/* Toggle de autocuidado: label completo */
label:has(.lp-toggle-care:checked) {
  background: var(--c-tint) !important;
  border-color: var(--c-mid) !important;
}

/* ── Print ── */
@page { size: ${PAGE_W}px ${PAGE_H}px; margin: 0; }
@media print {
  #lp-toolbar { display: none !important; }
  #lp-fit { display: block !important; overflow: visible !important;
    padding: 0 !important; align-items: flex-start !important; }
  #lp-stage { transform: none !important; width: ${PAGE_W}px !important;
    height: auto !important; position: static !important; }
  .lp-page { display: flex !important; page-break-after: always; break-after: page;
    position: relative !important; top: auto !important; left: auto !important;
    width: ${PAGE_W}px !important; height: ${PAGE_H}px !important; }
  .lp-page:last-child { page-break-after: avoid; break-after: avoid; }
}
`;
}

// ── Runtime JS ────────────────────────────────────────────────────────
function buildRuntimeJS() {
  const pagesJson = JSON.stringify(PAGES.map(p => p.id));
  const labelsJson = JSON.stringify(Object.fromEntries(PAGES.map(p => [p.id, p.label])));
  const themesJson = JSON.stringify(THEMES);
  const themeOrderJson = JSON.stringify(THEME_ORDER);
  const docId = DOC_ID;

  return `
(function(){
'use strict';
const DOC_ID = '${docId}';
const PAGES = ${pagesJson};
const PAGE_LABEL = ${labelsJson};
const THEMES_DATA = ${themesJson};
const THEME_ORDER = ${themeOrderJson};

// ── LocalStorage helpers ──
function lsGet(pageId, name){
  try{ return localStorage.getItem('lp:'+DOC_ID+':'+pageId+'|'+name); }catch(e){ return null; }
}
function lsSet(pageId, name, val){
  try{ localStorage.setItem('lp:'+DOC_ID+':'+pageId+'|'+name, val); }catch(e){}
}

// ── Router ──
let currentPage = null;
const restored = new Set();

function show(id){
  if(!id) return;
  const target = id.startsWith('#') ? id.slice(1) : id;
  const el = document.getElementById(target);
  if(!el || !el.classList.contains('lp-page')) return;
  if(currentPage){
    const cur = document.getElementById(currentPage);
    if(cur) cur.classList.remove('is-active');
  }
  el.classList.add('is-active');
  currentPage = target;
  if(!restored.has(target)){ restored.add(target); lazyRestore(el); }
  const lbl = document.getElementById('tb-label');
  if(lbl) lbl.textContent = PAGE_LABEL[target] || target;
  history.replaceState(null,'','#'+target);
  const fit = document.getElementById('lp-fit');
  if(fit){ fit.scrollTop=0; fit.scrollLeft=0; }
}
window.show = show;

// ── Lazy restore ──
function lazyRestore(pageEl){
  const pid = pageEl.id;
  // Rebuild ledger rows first (finance auto-grow)
  if(pid==='finance') rebuildLedger(pageEl);
  pageEl.querySelectorAll('[name]').forEach(inp => {
    const n = inp.name; if(!n) return;
    if(inp.type==='radio'){
      const v = lsGet(pid,'radio|'+n);
      if(v!==null && inp.value===v) inp.checked=true;
    } else if(inp.type==='checkbox'){
      const v = lsGet(pid,n);
      if(v!==null) inp.checked = v==='true';
    } else {
      const v = lsGet(pid,n);
      if(v!==null) inp.value=v;
    }
  });
  pageEl.querySelectorAll('textarea[name]').forEach(ta => {
    const v = lsGet(pid,ta.name); if(v!==null) ta.value=v;
  });
  if(pid==='finance') updateFinance();
  if(pid==='habits') updateHabitSums();
  if(pid==='monthly') updateMonthlyBars();
  if(pid==='productivity') updateProjectBars();
}

// ── Rebuild ledger para restore ──
function rebuildLedger(pageEl){
  const ledger = document.getElementById('finance-ledger');
  if(!ledger) return;
  const countStr = lsGet('finance','addcount');
  const count = parseInt(countStr)||0;
  const existing = ledger.querySelectorAll('.ledger-row').length;
  for(let i=existing; i<count; i++) addLedgerRow(ledger,i);
}
function addLedgerRow(ledger, i){
  const row = document.createElement('div');
  row.className='ledger-row';
  row.style.cssText='display:grid;grid-template-columns:34px 1fr 80px 72px;align-items:center;padding:0 4px;height:28px;border-bottom:1px solid #E8DFD0';
  const cols=[
    {name:'ledger-date-'+i, style:'font-family:monospace;font-size:9.5px;color:var(--c-deep);background:transparent;border:none;outline:none;padding:0;width:100%'},
    {name:'ledger-desc-'+i, style:'font-family:sans-serif;font-size:11.5px;color:#2B2622;background:transparent;border:none;outline:none;padding:0;width:100%;min-width:0'},
    {name:'ledger-cat-'+i,  style:'font-family:sans-serif;font-size:10px;color:#8C8275;background:transparent;border:none;outline:none;padding:0;width:100%;min-width:0'},
    {name:'ledger-amt-'+i,  style:'font-family:monospace;font-size:10.5px;color:#5A4F45;text-align:right;background:transparent;border:none;outline:none;padding:0;width:100%'},
  ];
  cols.forEach(c=>{
    const inp=document.createElement('input');
    inp.type='text'; inp.className='lp-field'; inp.name=c.name; inp.style.cssText=c.style;
    row.appendChild(inp);
  });
  ledger.appendChild(row);
}

// ── Ledger auto-grow ──
function initLedgerAutoGrow(){
  const ledger=document.getElementById('finance-ledger');
  if(!ledger) return;
  ledger.addEventListener('input',()=>{
    const rows=ledger.querySelectorAll('.ledger-row');
    const last=rows[rows.length-1];
    if(!last) return;
    const hasContent=[...last.querySelectorAll('input')].some(i=>i.value.trim());
    if(hasContent){
      const i=rows.length;
      addLedgerRow(ledger,i);
      try{ localStorage.setItem('lp:'+DOC_ID+':finance|addcount',String(i+1)); }catch(e){}
    }
  });
}

// ── Derivados: finanzas ──
function updateFinance(){
  const p=document.getElementById('finance'); if(!p) return;
  const inEl=p.querySelector('[name="budget-in"]');
  const outEl=p.querySelector('[name="budget-out"]');
  const balEl=document.getElementById('finance-balance');
  const totalEl=document.getElementById('finance-total');
  const inV=parseFloat(inEl&&inEl.value||0)||0;
  const outV=parseFloat(outEl&&outEl.value||0)||0;
  if(balEl) balEl.innerHTML=(inV-outV).toFixed(2).replace('.',',')+' <span style="font-size:17px">€</span>';
  let total=0;
  p.querySelectorAll('[name^="ledger-amt-"]').forEach(e=>{
    total+=(parseFloat(e.value.replace(',','.'))||0);
  });
  if(totalEl) totalEl.innerHTML=total.toFixed(2).replace('.',',')+' <span style="font-size:17px">€</span>';
  for(let ci=0;ci<8;ci++){
    const sEl=p.querySelector('[name="cat-spent-'+ci+'"]');
    const bEl=p.querySelector('[name="cat-budget-'+ci+'"]');
    const bar=document.getElementById('finance-cat-bar-'+ci);
    if(bar&&sEl&&bEl){
      const s=parseFloat(sEl.value)||0, b=parseFloat(bEl.value)||0;
      bar.style.width=(b>0?Math.min(100,Math.round(s/b*100)):0)+'%';
    }
  }
}

// ── Derivados: hábitos ──
function updateHabitSums(){
  const p=document.getElementById('habits'); if(!p) return;
  for(let hi=0;hi<11;hi++){
    let n=0;
    for(let d=1;d<=31;d++){
      const cb=p.querySelector('[name="habit-'+hi+'-day-'+d+'"]');
      if(cb&&cb.checked) n++;
    }
    const el=document.getElementById('habit-sum-'+hi);
    if(el) el.textContent=n;
  }
}

// ── Derivados: barras mensual ──
function updateMonthlyBars(){
  const p=document.getElementById('monthly'); if(!p) return;
  for(let hi=0;hi<4;hi++){
    const v=p.querySelector('[name="habit-val-'+hi+'"]');
    const bar=document.getElementById('monthly-habit-bar-'+hi);
    if(bar&&v) bar.style.width=Math.min(100,Math.round((parseInt(v.value)||0)/31*100))+'%';
  }
}

// ── Derivados: barras proyectos ──
function updateProjectBars(){
  const p=document.getElementById('productivity'); if(!p) return;
  for(let pi=0;pi<4;pi++){
    const v=p.querySelector('[name="proj-pct-'+pi+'"]');
    const bar=document.getElementById('proj-bar-'+pi);
    if(bar&&v) bar.style.width=(Math.min(100,parseInt(v.value)||0))+'%';
  }
}

// ── Persistencia: listeners ──
document.addEventListener('input', e=>{
  const el=e.target; if(!el.name) return;
  const page=el.closest('.lp-page'); if(!page) return;
  if(el.type==='checkbox'||el.type==='radio') return;
  lsSet(page.id, el.name, el.value);
  if(page.id==='finance') updateFinance();
  if(page.id==='monthly') updateMonthlyBars();
  if(page.id==='productivity') updateProjectBars();
});
document.addEventListener('change', e=>{
  const el=e.target; if(!el.name) return;
  const page=el.closest('.lp-page'); if(!page) return;
  if(el.type==='checkbox'){
    lsSet(page.id, el.name, String(el.checked));
    if(page.id==='habits') updateHabitSums();
  } else if(el.type==='radio'){
    lsSet(page.id, 'radio|'+el.name, el.value);
  }
});

// ── Tema ──
function applyTheme(id){
  document.documentElement.setAttribute('data-theme',id);
  document.querySelectorAll('.js-theme-name').forEach(el=>{ el.textContent=THEMES_DATA[id]&&THEMES_DATA[id].name||id; });
  document.querySelectorAll('.tb-dot').forEach(d=>{ d.classList.toggle('is-active',d.dataset.theme===id); });
  try{ localStorage.setItem('lp:theme',id); }catch(e){}
}
window.applyTheme = applyTheme;

// ── Escalado ──
function rescale(){
  const tH=44, pad=16;
  const s=Math.min((window.innerWidth-pad)/${PAGE_W},(window.innerHeight-tH-pad)/${PAGE_H});
  const stage=document.getElementById('lp-stage');
  if(stage) stage.style.transform='scale('+s+')';
  const fit=document.getElementById('lp-fit');
  if(fit){
    fit.style.minWidth=Math.ceil(${PAGE_W}*s+pad)+'px';
    fit.style.minHeight=Math.ceil(${PAGE_H}*s+pad)+'px';
  }
}
window.addEventListener('resize', rescale);

// ── Teclado ──
document.addEventListener('keydown', e=>{
  const active=document.activeElement;
  if(active&&(active.tagName==='INPUT'||active.tagName==='TEXTAREA')) return;
  const idx=PAGES.indexOf(currentPage);
  if(e.key==='ArrowRight'||e.key==='ArrowDown'){ e.preventDefault(); if(idx<PAGES.length-1) show(PAGES[idx+1]); }
  else if(e.key==='ArrowLeft'||e.key==='ArrowUp'){ e.preventDefault(); if(idx>0) show(PAGES[idx-1]); }
});

// ── Toolbar: export/import/borrar ──
const tbExport=document.getElementById('tb-export');
const tbImport=document.getElementById('tb-import');
const tbImportFile=document.getElementById('tb-import-file');
const tbClearPage=document.getElementById('tb-clear-page');
const tbClearAll=document.getElementById('tb-clear-all');

if(tbExport) tbExport.addEventListener('click',()=>{
  const data={app:DOC_ID,version:1,date:new Date().toISOString(),data:{}};
  for(let i=0;i<localStorage.length;i++){
    const k=localStorage.key(i);
    if(k&&k.startsWith('lp:'+DOC_ID+':')) data.data[k]=localStorage.getItem(k);
  }
  const a=document.createElement('a');
  a.href=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));
  a.download=DOC_ID+'-datos.json'; a.click();
});
if(tbImport) tbImport.addEventListener('click',()=>{ if(tbImportFile) tbImportFile.click(); });
if(tbImportFile) tbImportFile.addEventListener('change',e=>{
  const f=e.target.files[0]; if(!f) return;
  const r=new FileReader();
  r.onload=ev=>{
    try{
      const j=JSON.parse(ev.target.result);
      const items=j.data||j;
      Object.entries(items).forEach(([k,v])=>{ if(k.startsWith('lp:'+DOC_ID+':')){ try{localStorage.setItem(k,v);}catch(er){} } });
      location.reload();
    }catch(er){ alert('Error al importar: '+er.message); }
  };
  r.readAsText(f);
});
if(tbClearPage) tbClearPage.addEventListener('click',()=>{
  if(!currentPage) return;
  if(!confirm('¿Borrar todos los datos de "'+PAGE_LABEL[currentPage]+'"?')) return;
  const prefix='lp:'+DOC_ID+':'+currentPage+'|';
  const keys=[];
  for(let i=0;i<localStorage.length;i++){ const k=localStorage.key(i); if(k&&k.startsWith(prefix)) keys.push(k); }
  keys.forEach(k=>{ try{localStorage.removeItem(k);}catch(e){} });
  restored.delete(currentPage);
  const page=document.getElementById(currentPage);
  if(page){
    page.querySelectorAll('[name]').forEach(inp=>{ if(inp.type==='checkbox'||inp.type==='radio') inp.checked=false; else inp.value=''; });
    page.querySelectorAll('textarea[name]').forEach(ta=>{ ta.value=''; });
  }
});
if(tbClearAll) tbClearAll.addEventListener('click',()=>{
  if(!confirm('¿Borrar TODOS los datos del planner?')) return;
  const prefix='lp:'+DOC_ID+':';
  const keys=[];
  for(let i=0;i<localStorage.length;i++){ const k=localStorage.key(i); if(k&&k.startsWith(prefix)) keys.push(k); }
  keys.forEach(k=>{ try{localStorage.removeItem(k);}catch(e){} });
  location.reload();
});

// ── Init ──
(function init(){
  rescale();
  // Restaurar tema guardado
  let savedTheme;
  try{ savedTheme=localStorage.getItem('lp:theme'); }catch(e){}
  applyTheme(savedTheme&&THEMES_DATA[savedTheme]?savedTheme:'${DEFAULT_THEME}');
  // Ir a hash o hub
  const hash=location.hash.slice(1);
  show(hash&&document.getElementById(hash)&&document.getElementById(hash).classList.contains('lp-page')?hash:'hub');
  initLedgerAutoGrow();
})();
})();
`;
}

// ── Toolbar HTML ──────────────────────────────────────────────────────
function buildToolbarHTML() {
  const dots = THEME_ORDER.map(id =>
    `<span class="tb-dot${id===DEFAULT_THEME?' is-active':''}" data-theme="${id}" style="background:${THEMES[id].mid}" title="${THEMES[id].name}" onclick="applyTheme('${id}')"></span>`
  ).join('');
  return `<div id="lp-toolbar">
  <a href="#hub" class="tb-brand">Linen Paper Co.</a>
  <div class="tb-sep"></div>
  <div class="tb-nav">
    <button onclick="(function(){const i=window._pages?window._pages.indexOf(window._cur):-1;if(i>0)show(window._pages?window._pages[i-1]:'hub');else{const ps=${JSON.stringify(PAGES.map(p=>p.id))};const ci=ps.indexOf(window.currentPage||(location.hash.slice(1)));if(ci>0)show(ps[ci-1]);}})()">←</button>
    <span id="tb-label">Índice</span>
    <button onclick="(function(){const ps=${JSON.stringify(PAGES.map(p=>p.id))};const ci=ps.indexOf(document.querySelector('.lp-page.is-active')?.id);if(ci>=0&&ci<ps.length-1)show(ps[ci+1]);})()">→</button>
  </div>
  <div class="tb-sep"></div>
  <a href="#hub" class="tb-btn" onclick="show('hub');return false;">Índice</a>
  <div class="tb-right">
    <div class="tb-dots">${dots}</div>
    <div class="tb-sep"></div>
    <button class="tb-btn" id="tb-export">Exportar</button>
    <button class="tb-btn" id="tb-import">Importar</button>
    <input type="file" id="tb-import-file" accept=".json" style="display:none">
    <button class="tb-btn danger" id="tb-clear-page">Borrar página</button>
    <button class="tb-btn danger" id="tb-clear-all">Borrar todo</button>
    <button class="tb-btn" onclick="window.print()">Imprimir</button>
  </div>
</div>`;
}

// ── HTML final ────────────────────────────────────────────────────────
function buildFinalHTML(pagesHtml, globalCSS, themeCSS, runtimeJS) {
  const toolbar = buildToolbarHTML();
  const pagesBlock = pagesHtml.map(p => p.html).join('\n');
  return `<!DOCTYPE html>
<html lang="es" data-theme="${DEFAULT_THEME}">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
<title>Planner Digital Todo en Uno · Linen Paper Co.</title>
<style>
${themeCSS}
${globalCSS}
</style>
</head>
<body>
${toolbar}
<div id="lp-fit">
  <div id="lp-stage">
${pagesBlock}
  </div>
</div>
<script>
${runtimeJS}
</script>
</body>
</html>`;
}

// ── Main ──────────────────────────────────────────────────────────────
async function main() {
  console.log('\n🌿 Planner Digital · Build\n');

  // 1. Fuentes
  console.log('1/4  Fuentes…');
  const fontsCSS = await getFontsCSS();

  // 2. Bundlear JSX con esbuild
  console.log('2/4  Compilando JSX…');
  const entryContent = buildEntry();
  const entryPath = resolve(ROOT, 'build', '_entry.jsx');
  writeFileSync(entryPath, entryContent, 'utf8');

  const bundlePath = resolve(ROOT, 'build', '_bundle.mjs');
  await esbuild.build({
    entryPoints: [entryPath],
    bundle: true,
    format: 'esm',
    platform: 'node',
    outfile: bundlePath,
    loader: { '.jsx': 'jsx' },
    banner: {
      js: `import { createRequire as __cr } from 'module'; const require = __cr(import.meta.url);`
    },
    logLevel: 'warning',
  });

  // 3. Renderizar páginas
  console.log('3/4  Renderizando páginas…');
  const { renderBody } = await import(bundlePath + '?t=' + Date.now());
  const rawPages = renderBody();

  // Post-proceso: Z9* → CSS vars
  const allHtml = rawPages.map(p => p.html).join('');
  const alphas = collectAlphas(allHtml);
  const pagesProcessed = rawPages.map(p => ({ id: p.id, html: processHtml(p.html) }));

  // 4. Ensamblar HTML
  console.log('4/4  Ensamblando HTML…');
  const themeCSS = buildThemeCSS(alphas);
  const globalCSS = buildGlobalCSS(fontsCSS);
  const runtimeJS = buildRuntimeJS();
  const finalHtml = buildFinalHTML(pagesProcessed, globalCSS, themeCSS, runtimeJS);

  const outFile = resolve(OUT, `${DOC_ID}.html`);
  writeFileSync(outFile, finalHtml, 'utf8');

  const sizeKB = Math.round(finalHtml.length / 1024);
  console.log(`\n✅  out/${DOC_ID}.html  (${sizeKB} KB)\n`);
  console.log('   Páginas:', PAGES.map(p => p.id).join(', '));
  if (sizeKB > 25000) console.warn('  ⚠ El archivo supera 25 MB');
}

main().catch(e => { console.error(e); process.exit(1); });

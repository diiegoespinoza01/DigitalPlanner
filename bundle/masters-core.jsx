// masters-core.jsx — IndexHub · Yearly · MonthlySpread · Daily
// Todas páginas 1080×810 envueltas en <Page>. Navegables: .lp-link / checkboxes: <CB>.

const DOW = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
const MONTHS = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

// líneas de calendario genérico (master sin fechar): offset de inicio + nº días
function monthCells(offset, days) {
  const cells = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

// ── Hairline section heading reutilizable ────────────────────────────────
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
// 2 · ÍNDICE / HUB
// ═══════════════════════════════════════════════════════════════════════
function IndexHub({ theme = 'greige' }) {
  const c = T(theme);
  const routes = [
    { ic: 'grid',   label: 'Vista anual',          meta: '12 meses · metas' },
    { ic: 'cal',    label: 'Planificador mensual',  meta: 'calendario + foco' },
    { ic: 'week',   label: 'Semanal · lunes',       meta: 'inicio L' },
    { ic: 'week',   label: 'Semanal · domingo',     meta: 'inicio D' },
    { ic: 'sun',    label: 'Planificador diario',   meta: 'agenda 6–19h' },
    { ic: 'target', label: 'Tracker de hábitos',    meta: '11 × 31 días' },
    { ic: 'coin',   label: 'Finanzas',              meta: 'presupuesto + ledger' },
    { ic: 'leaf',   label: 'Bienestar',             meta: 'comidas · agua · cuerpo' },
    { ic: 'chart',  label: 'Productividad',         meta: 'proyectos + metas' },
    { ic: 'note',   label: 'Notas y stickers',      meta: 'rayado · punteado' },
  ];
  return (
    <Page theme={theme} tab="Estilo" currentNav="Índice">
      <div style={{ display: 'flex', gap: 30, flex: 1, minHeight: 0 }}>
        {/* IZQUIERDA — hero + meses */}
        <div style={{ flex: '1 1 56%', display: 'flex', flexDirection: 'column' }}>
          <Eyebrow color={c.deep}>Índice interactivo · todo enlazado</Eyebrow>
          <div className="lp-serif" style={{ fontWeight: 500, fontSize: 62, lineHeight: .95,
            letterSpacing: -1, color: LP.ink, marginTop: 16 }}>
            Tu año,<br /><span style={{ fontStyle: 'italic', color: c.ink }}>en una sola toca.</span>
          </div>
          <div style={{ fontFamily: LP.sans, fontSize: 13, color: LP.ink2, marginTop: 14,
            lineHeight: 1.6, maxWidth: 420 }}>
            Navega cualquier sección desde aquí. Las pestañas de la derecha te
            siguen en cada página.
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 22 }}>
            {SECTIONS.map((s) => (
              <LinkChip key={s} theme={theme} icon={SECTION_ICON[s]} active={s === 'Estilo'}>{s}</LinkChip>
            ))}
          </div>

          <div style={{ marginTop: 'auto', paddingTop: 26 }}>
            <Eyebrow color={c.deep}>Los 12 meses</Eyebrow>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, marginTop: 12 }}>
              {MONTHS.map((m, i) => (
                <div key={m} className="lp-link" style={{ border: `1px solid ${LP.line}`,
                  borderRadius: 6, padding: '11px 12px', background: LP.paper,
                  display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <span style={{ fontFamily: LP.mono, fontSize: 9, color: c.deep, letterSpacing: 1 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="lp-serif" style={{ fontStyle: 'italic', fontSize: 18, color: LP.ink, lineHeight: 1 }}>
                    {m}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DERECHA — directorio sobre tint */}
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
              <div key={r.label} className="lp-link" style={{ display: 'flex', alignItems: 'center', gap: 13,
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </Page>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// 3 · VISTA ANUAL
// ═══════════════════════════════════════════════════════════════════════
function MiniMonth({ name, idx, offset, days, theme }) {
  const c = T(theme);
  const cells = monthCells(offset, days);
  return (
    <div className="lp-link" style={{ border: `1px solid ${LP.line}`, borderRadius: 6,
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
            fontWeight: n === 15 ? 700 : 400,
            background: n === 15 ? c.tint : 'transparent', borderRadius: 3 }}>{n || '·'}</span>
        ))}
      </div>
    </div>
  );
}

function Yearly({ theme = 'greige' }) {
  const c = T(theme);
  const offsets = [3, 6, 0, 2, 4, 0, 2, 5, 0, 3, 5, 0];
  const lengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const goals = [
    { ic: 'heart',  area: 'Cuerpo' }, { ic: 'book', area: 'Mente' },
    { ic: 'coin',   area: 'Dinero' }, { ic: 'edit', area: 'Oficio' },
    { ic: 'home',   area: 'Hogar' },  { ic: 'star', area: 'Gente' },
    { ic: 'sun',    area: 'Alegría' },
  ];
  return (
    <Page theme={theme} tab="Estilo" currentNav="Año">
      <div style={{ display: 'flex', gap: 26, flex: 1, minHeight: 0 }}>
        {/* IZQUIERDA — 12 mini calendarios */}
        <div style={{ flex: '1 1 70%', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 14 }}>
            <div>
              <Eyebrow color={c.deep}>Vista anual · sin fechar</Eyebrow>
              <div className="lp-serif" style={{ fontWeight: 500, fontSize: 34, color: LP.ink, marginTop: 6 }}>
                El año <span style={{ fontStyle: 'italic', color: c.ink }}>completo</span>
              </div>
            </div>
            <span style={{ fontFamily: LP.mono, fontSize: 9.5, color: LP.ink3, letterSpacing: 1 }}>
              toca un mes →
            </span>
          </div>
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
            gridTemplateRows: 'repeat(3,1fr)', gap: 11 }}>
            {MONTHS.map((m, i) => (
              <MiniMonth key={m} name={m} idx={i} offset={offsets[i]} days={lengths[i]} theme={theme} />
            ))}
          </div>
        </div>

        {/* DERECHA — metas + palabra + soltar */}
        <div style={{ flex: '1 1 30%', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: c.tint, borderRadius: 10, padding: '16px 18px' }}>
            <span style={{ fontFamily: LP.mono, fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: c.deep }}>
              Palabra del año
            </span>
            <div className="lp-serif" style={{ fontStyle: 'italic', fontWeight: 500, fontSize: 38,
              color: c.ink, lineHeight: 1, marginTop: 6 }}>Calma</div>
          </div>

          <div style={{ flex: 1 }}>
            <Eyebrow color={c.deep}>Metas · 7 áreas</Eyebrow>
            <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 9 }}>
              {goals.map((g) => (
                <div key={g.area} style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                  <span style={{ width: 24, height: 24, borderRadius: 999, border: `1px solid ${LP.line}`,
                    background: LP.paper, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name={g.ic} size={12} color={c.deep} />
                  </span>
                  <span style={{ fontFamily: LP.sans, fontSize: 12, fontWeight: 600, color: LP.ink, width: 56 }}>{g.area}</span>
                  <span style={{ flex: 1, borderBottom: `1px solid ${LP.line}`, height: 16 }} />
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
                  <span style={{ flex: 1, borderBottom: `1px solid ${LP.line}`, height: 15 }} />
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
// 4 · MENSUAL (master replicable ×12) — página única con lomo central
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
  const pct = Math.round((value / total) * 100);
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

function MonthlySpread({ theme = 'greige' }) {
  const c = T(theme);
  const cells = monthCells(2, 31); // empieza miércoles
  const events = { 4: 'Reunión', 9: 'Pago', 14: 'Cena', 18: 'Viaje', 23: 'Taller', 27: 'Llamada' };
  const prios = ['Cerrar trimestre', 'Reservar escapada', 'Revisión médica', 'Curso online', ''];
  const pays = [{ d: 3, t: 'Alquiler' }, { d: 8, t: 'Internet' }, { d: 15, t: 'Tarjeta' }, { d: 22, t: 'Gimnasio' }, { d: 28, t: 'Ahorro' }];
  const habits = [{ l: 'Agua', v: 22 }, { l: 'Lectura', v: 18 }, { l: 'Ejercicio', v: 14 }, { l: 'Meditar', v: 25 }];
  return (
    <Page theme={theme} tab="Productividad" currentNav="Mes" padding={28}>
      <div style={{ display: 'flex', gap: 0, flex: 1, minHeight: 0 }}>
        {/* IZQUIERDA — calendario 7×6 */}
        <div style={{ flex: '1 1 60%', display: 'flex', flexDirection: 'column', paddingRight: 26 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 12 }}>
            <div>
              <Eyebrow color={c.deep}>Planificador mensual</Eyebrow>
              <div className="lp-serif" style={{ fontWeight: 500, fontSize: 40, color: LP.ink, marginTop: 4 }}>
                <span style={{ fontStyle: 'italic' }}>Mes</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <span className="lp-link" style={{ width: 26, height: 26, borderRadius: 999, border: `1px solid ${LP.line}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', background: LP.paper }}>
                <Icon name="arrowL" size={13} color={c.deep} /></span>
              <span className="lp-link" style={{ width: 26, height: 26, borderRadius: 999, border: `1px solid ${LP.line}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', background: LP.paper }}>
                <Icon name="arrowR" size={13} color={c.deep} /></span>
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
              const today = n === 14;
              return (
                <div key={i} className={n ? 'lp-link' : ''} style={{
                  borderRight: (i % 7 !== 6) ? `1px solid ${LP.lineSoft}` : 'none',
                  borderBottom: i < 35 ? `1px solid ${LP.lineSoft}` : 'none',
                  background: today ? c.tint : (wknd ? `${c.tint}55` : 'transparent'),
                  padding: '4px 5px', display: 'flex', flexDirection: 'column', gap: 3, minHeight: 0 }}>
                  <span style={{ fontFamily: LP.sans, fontSize: 11, fontWeight: today ? 700 : 500,
                    color: n == null ? 'transparent' : (today ? c.deep : LP.ink2) }}>{n || ''}</span>
                  {n && events[n] && (
                    <span style={{ fontFamily: LP.sans, fontSize: 8, color: c.ink, background: LP.paper,
                      border: `1px solid ${c.mid}`, borderRadius: 999, padding: '1px 6px',
                      borderLeft: `2px solid ${c.deep}`, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {events[n]}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <Spine />

        {/* DERECHA — foco · prioridades · pagos · hábitos · reflexión */}
        <div style={{ flex: '1 1 40%', display: 'flex', flexDirection: 'column', paddingLeft: 26, gap: 14 }}>
          <div style={{ background: c.tint, borderRadius: 9, padding: '13px 16px' }}>
            <span style={{ fontFamily: LP.mono, fontSize: 8.5, letterSpacing: 2, textTransform: 'uppercase', color: c.deep }}>Foco del mes</span>
            <div className="lp-serif" style={{ fontStyle: 'italic', fontWeight: 500, fontSize: 21, color: c.ink, lineHeight: 1.2, marginTop: 4 }}>
              Hacer menos, pero mejor.
            </div>
          </div>

          <div style={{ display: 'flex', gap: 18, flex: 1, minHeight: 0 }}>
            <div style={{ flex: 1 }}>
              <Eyebrow color={c.deep}>Prioridades</Eyebrow>
              <div style={{ marginTop: 9, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {prios.map((p, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <CB on={i < 1} theme={theme} />
                    {p ? <span style={{ fontFamily: LP.sans, fontSize: 11.5, color: LP.ink2 }}>{p}</span>
                       : <span style={{ flex: 1, borderBottom: `1px solid ${LP.line}`, height: 14 }} />}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <Eyebrow color={c.deep}>Pagos · fechas</Eyebrow>
              <div style={{ marginTop: 9, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {pays.map((p, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <CB on={i < 2} theme={theme} />
                    <span style={{ fontFamily: LP.mono, fontSize: 9.5, color: c.deep, width: 18 }}>{String(p.d).padStart(2, '0')}</span>
                    <span style={{ fontFamily: LP.sans, fontSize: 11.5, color: LP.ink2 }}>{p.t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <Eyebrow color={c.deep}>Hábitos del mes</Eyebrow>
            <div style={{ marginTop: 10, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '11px 18px' }}>
              {habits.map((h) => <ProgressBar key={h.l} label={h.l} value={h.v} total={31} theme={theme} />)}
            </div>
          </div>

          <div>
            <Eyebrow color={c.deep}>Reflexión del mes</Eyebrow>
            <div style={{ marginTop: 9 }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ borderBottom: `1px solid ${LP.line}`, height: 19 }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// 7 · DIARIO (master ×365) — 3 columnas
// ═══════════════════════════════════════════════════════════════════════
function WaterDrops({ filled, total, theme, size = 15 }) {
  const c = T(theme);
  return (
    <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
      {Array.from({ length: total }).map((_, i) => (
        <span key={i} style={{ opacity: i < filled ? 1 : .4 }}>
          <Icon name="drop" size={size} color={i < filled ? c.deep : LP.ink4}
            stroke={1.3} style={i < filled ? { fill: c.tint } : {}} />
        </span>
      ))}
    </div>
  );
}

function Daily({ theme = 'greige' }) {
  const c = T(theme);
  const hours = [];
  for (let h = 6; h <= 19; h++) hours.push(h);
  const agenda = { 8: 'Café + plan', 10: 'Trabajo profundo', 13: 'Almuerzo', 16: 'Llamada equipo', 18: 'Paseo' };
  const microChips = [
    { ic: 'sun',  k: 'Clima', v: '22° despejado' },
    { ic: 'heart', k: 'Ánimo', v: 'En calma' },
    { ic: 'moon', k: 'Sueño', v: '7h 40m' },
    { ic: 'drop', k: 'Agua', v: '6/8' },
  ];
  const todos = ['Responder correos', 'Llamar al banco', 'Comprar flores', 'Editar borrador', 'Stretching 10 min', 'Regar plantas', '', ''];
  const meals = ['Desayuno', 'Almuerzo', 'Cena', 'Snack'];
  const dayHabits = ['Movimiento', 'Sin pantalla AM', 'Leer', 'Vitaminas', 'Diario'];
  return (
    <Page theme={theme} tab="Autocuidado" currentNav="Día" padding={26}>
      <div style={{ display: 'flex', gap: 22, flex: 1, minHeight: 0 }}>

        {/* COL 1 — fecha + micro chips + agenda */}
        <div style={{ flex: '1 1 33%', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12 }}>
            <div className="lp-serif" style={{ fontStyle: 'italic', fontWeight: 500, fontSize: 76, lineHeight: .8, color: c.ink }}>14</div>
            <div style={{ paddingBottom: 6 }}>
              <div style={{ fontFamily: LP.sans, fontSize: 15, fontWeight: 700, color: LP.ink, letterSpacing: .3 }}>Miércoles</div>
              <div style={{ fontFamily: LP.mono, fontSize: 9, letterSpacing: 1.5, color: LP.ink3, marginTop: 2 }}>SIN FECHAR</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, margin: '14px 0' }}>
            {microChips.map((m) => (
              <div key={m.k} style={{ display: 'flex', alignItems: 'center', gap: 7, border: `1px solid ${LP.line}`,
                borderRadius: 6, padding: '6px 9px', background: LP.paper }}>
                <Icon name={m.ic} size={13} color={c.deep} />
                <div style={{ lineHeight: 1.1 }}>
                  <div style={{ fontFamily: LP.mono, fontSize: 7.5, letterSpacing: 1, textTransform: 'uppercase', color: LP.ink3 }}>{m.k}</div>
                  <div style={{ fontFamily: LP.sans, fontSize: 10.5, fontWeight: 600, color: LP.ink }}>{m.v}</div>
                </div>
              </div>
            ))}
          </div>
          <Eyebrow color={c.deep}>Agenda</Eyebrow>
          <div style={{ flex: 1, marginTop: 8, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            {hours.map((h) => (
              <div key={h} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 9,
                borderTop: `1px solid ${LP.lineSoft}`, minHeight: 0 }}>
                <span style={{ fontFamily: LP.mono, fontSize: 8.5, color: LP.ink3, width: 26 }}>{String(h).padStart(2, '0')}:00</span>
                {agenda[h]
                  ? <span style={{ flex: 1, fontFamily: LP.sans, fontSize: 10, color: c.ink, background: c.tint,
                      borderLeft: `2px solid ${c.deep}`, borderRadius: '0 4px 4px 0', padding: '2px 8px' }}>{agenda[h]}</span>
                  : <span style={{ flex: 1 }} />}
              </div>
            ))}
          </div>
        </div>

        <div style={{ width: 1, background: LP.line }} />

        {/* COL 2 — tres del día + foco + to-do + gratitud */}
        <div style={{ flex: '1 1 33%', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <Eyebrow color={c.deep}>Las tres del día</Eyebrow>
          <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 9 }}>
            {[1, 2, 3].map((n) => (
              <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                <span className="lp-serif" style={{ fontStyle: 'italic', fontSize: 20, color: c.mid, width: 16 }}>{n}</span>
                <CB on={n === 1} theme={theme} />
                <span style={{ flex: 1, borderBottom: `1px solid ${LP.line}`, height: 18 }} />
              </div>
            ))}
          </div>

          <div style={{ background: c.tint, borderRadius: 9, padding: '11px 14px', margin: '16px 0' }}>
            <span style={{ fontFamily: LP.mono, fontSize: 8, letterSpacing: 2, textTransform: 'uppercase', color: c.deep }}>Foco del día</span>
            <div className="lp-serif" style={{ fontStyle: 'italic', fontSize: 18, color: c.ink, marginTop: 3, lineHeight: 1.2 }}>
              Una cosa bien hecha.
            </div>
          </div>

          <Eyebrow color={c.deep}>Por hacer</Eyebrow>
          <div style={{ flex: 1, marginTop: 10, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            {todos.map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <CB on={i < 2} theme={theme} />
                {t ? <span style={{ fontFamily: LP.sans, fontSize: 11.5, color: LP.ink2,
                  textDecoration: i < 2 ? 'line-through' : 'none', opacity: i < 2 ? .55 : 1 }}>{t}</span>
                   : <span style={{ flex: 1, borderBottom: `1px solid ${LP.line}`, height: 14 }} />}
              </div>
            ))}
          </div>

          <div style={{ marginTop: 14 }}>
            <Eyebrow color={c.deep}>Gratitud</Eyebrow>
            <div style={{ marginTop: 8 }}>
              {[0, 1, 2].map((i) => <div key={i} style={{ borderBottom: `1px solid ${LP.line}`, height: 17 }} />)}
            </div>
          </div>
        </div>

        <div style={{ width: 1, background: LP.line }} />

        {/* COL 3 — agua + comidas + hábitos + momento + notas */}
        <div style={{ flex: '1 1 33%', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <Eyebrow color={c.deep}>Agua · 8 vasos</Eyebrow>
          <div style={{ marginTop: 10, marginBottom: 16 }}>
            <WaterDrops filled={6} total={8} theme={theme} size={17} />
          </div>

          <Eyebrow color={c.deep}>Comidas</Eyebrow>
          <div style={{ marginTop: 9, marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 7 }}>
            {meals.map((m) => (
              <div key={m} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                <span style={{ fontFamily: LP.mono, fontSize: 8.5, letterSpacing: .5, textTransform: 'uppercase',
                  color: c.deep, width: 56 }}>{m}</span>
                <span style={{ flex: 1, borderBottom: `1px solid ${LP.line}`, height: 15 }} />
              </div>
            ))}
          </div>

          <Eyebrow color={c.deep}>Hábitos</Eyebrow>
          <div style={{ marginTop: 9, marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 7 }}>
            {dayHabits.map((h, i) => (
              <div key={h} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                <CB on={i < 3} theme={theme} />
                <span style={{ fontFamily: LP.sans, fontSize: 11.5, color: LP.ink2 }}>{h}</span>
              </div>
            ))}
          </div>

          <div style={{ border: `1px dashed ${c.mid}`, borderRadius: 9, padding: '11px 14px', marginBottom: 14 }}>
            <span style={{ fontFamily: LP.mono, fontSize: 8, letterSpacing: 2, textTransform: 'uppercase', color: c.deep }}>Momento destacado</span>
            <div className="lp-serif" style={{ fontStyle: 'italic', fontSize: 16, color: LP.ink2, marginTop: 3, lineHeight: 1.25 }}>
              Lo que hoy quiero recordar…
            </div>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Eyebrow color={c.deep}>Notas</Eyebrow>
            <div style={{ flex: 1, marginTop: 8, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              {[0, 1, 2, 3].map((i) => <div key={i} style={{ borderBottom: `1px solid ${LP.line}`, height: 16 }} />)}
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

Object.assign(window, { IndexHub, Yearly, MonthlySpread, Daily, MiniMonth, ProgressBar, WaterDrops, MONTHS, DOW });

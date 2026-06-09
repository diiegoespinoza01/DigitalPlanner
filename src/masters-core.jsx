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

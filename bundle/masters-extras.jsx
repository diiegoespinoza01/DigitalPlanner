// masters-extras.jsx — HabitTracker · Finance · Wellness · Productivity · Notes · Stickers
// Todas páginas 1080×810 con <Page>. Emojis solo donde el sistema los marca (stickers · mood).

// ═══════════════════════════════════════════════════════════════════════
// 8 · TRACKER DE HÁBITOS — 11 hábitos × 31 días + Σ + fila de ánimo
// ═══════════════════════════════════════════════════════════════════════
function HabitTracker({ theme = 'greige' }) {
  const c = T(theme);
  const habits = ['Agua 2L', 'Movimiento', 'Lectura', 'Meditar', 'Sin azúcar', 'Dormir 8h', 'Diario', 'Pasos 8k', 'Estiramiento', 'Vitaminas', 'Sin pantalla'];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const moods = ['😣', '😕', '😌', '🙂', '😄'];
  // patrón determinista de marcas
  const marked = (h, d) => ((h * 7 + d * 3) % 5) < (3 - (h % 2));
  return (
    <Page theme={theme} tab="Bienestar" currentNav="Mes" padding={26}>
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
              <div className="lp-serif" style={{ fontStyle: 'italic', fontSize: 22, color: LP.ink }}>______</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: LP.mono, fontSize: 8.5, letterSpacing: 2, textTransform: 'uppercase', color: LP.ink3 }}>Mejor racha</div>
              <div className="lp-serif" style={{ fontStyle: 'italic', fontSize: 22, color: c.ink }}>21 días</div>
            </div>
          </div>
        </div>

        {/* rejilla */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', border: `1px solid ${LP.line}`,
          borderRadius: 7, overflow: 'hidden', minHeight: 0 }}>
          {/* header días */}
          <div style={{ display: 'grid', gridTemplateColumns: '108px repeat(31,1fr) 42px',
            borderBottom: `1px solid ${LP.line}`, background: LP.paper }}>
            <span style={{ fontFamily: LP.mono, fontSize: 8, letterSpacing: 1, color: LP.ink3, padding: '6px 8px' }}>HÁBITO</span>
            {days.map((d) => (
              <span key={d} style={{ fontFamily: LP.mono, fontSize: 7, textAlign: 'center', color: LP.ink3,
                alignSelf: 'center' }}>{d}</span>
            ))}
            <span style={{ fontFamily: LP.mono, fontSize: 8, textAlign: 'center', color: c.deep, alignSelf: 'center' }}>Σ</span>
          </div>
          {habits.map((h, hi) => {
            const total = days.filter((d) => marked(hi, d)).length;
            return (
              <div key={h} style={{ flex: 1, display: 'grid', gridTemplateColumns: '108px repeat(31,1fr) 42px',
                borderTop: hi > 0 ? `1px solid ${LP.lineSoft}` : 'none', alignItems: 'stretch' }}>
                <span style={{ fontFamily: LP.sans, fontSize: 10.5, fontWeight: 600, color: LP.ink,
                  display: 'flex', alignItems: 'center', padding: '0 8px' }}>{h}</span>
                {days.map((d) => {
                  const on = marked(hi, d);
                  return (
                    <span key={d} className="lp-cb" style={{ borderLeft: `1px solid ${LP.lineSoft}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {on && <span style={{ width: 9, height: 9, borderRadius: 2, background: c.mid }} />}
                    </span>
                  );
                })}
                <span style={{ fontFamily: LP.mono, fontSize: 9.5, color: c.deep, fontWeight: 600,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${c.tint}66`,
                  borderLeft: `1px solid ${LP.line}` }}>{total}</span>
              </div>
            );
          })}
        </div>

        {/* fila de ánimo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 14, background: c.tint,
          borderRadius: 9, padding: '12px 18px' }}>
          <span style={{ fontFamily: LP.mono, fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: c.deep }}>Ánimo</span>
          <div style={{ display: 'flex', gap: 14 }}>
            {moods.map((m, i) => (
              <span key={i} style={{ fontSize: 20, opacity: .9, filter: 'grayscale(.15)' }}>{m}</span>
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
// 9 · FINANZAS — presupuesto + ledger
// ═══════════════════════════════════════════════════════════════════════
function Finance({ theme = 'greige' }) {
  const c = T(theme);
  const cats = [
    { l: 'Vivienda', v: 920, t: 1000 }, { l: 'Comida', v: 410, t: 500 },
    { l: 'Transporte', v: 130, t: 200 }, { l: 'Ocio', v: 180, t: 180 },
    { l: 'Salud', v: 60, t: 150 }, { l: 'Ahorro', v: 300, t: 400 },
    { l: 'Suscripciones', v: 48, t: 60 }, { l: 'Otros', v: 90, t: 150 },
  ];
  const ledger = [
    { d: '03', desc: 'Alquiler', cat: 'Vivienda', amt: '920,00' },
    { d: '05', desc: 'Mercado semanal', cat: 'Comida', amt: '84,30' },
    { d: '08', desc: 'Gasolina', cat: 'Transporte', amt: '52,00' },
    { d: '11', desc: 'Café con Ana', cat: 'Ocio', amt: '9,40' },
    { d: '14', desc: 'Farmacia', cat: 'Salud', amt: '23,10' },
    { d: '17', desc: 'Streaming', cat: 'Suscripc.', amt: '12,99' },
    { d: '20', desc: 'Cena fuera', cat: 'Ocio', amt: '46,50' },
    { d: '24', desc: 'Transferencia ahorro', cat: 'Ahorro', amt: '300,00' },
    { d: '28', desc: 'Regalo', cat: 'Otros', amt: '35,00' },
  ];
  return (
    <Page theme={theme} tab="Finanzas" currentNav="Mes" padding={28}>
      <div style={{ display: 'flex', gap: 28, flex: 1, minHeight: 0 }}>
        {/* IZQUIERDA — presupuesto */}
        <div style={{ flex: '1 1 50%', display: 'flex', flexDirection: 'column' }}>
          <Eyebrow color={c.deep}>Presupuesto del mes</Eyebrow>
          <div style={{ display: 'flex', gap: 10, background: c.tint, borderRadius: 10, padding: '16px 18px', margin: '12px 0 18px' }}>
            {[{ k: 'Entra', v: '2.450' }, { k: 'Sale', v: '2.138' }, { k: 'Queda', v: '312' }].map((x, i) => (
              <div key={x.k} style={{ flex: 1, textAlign: 'center', borderLeft: i ? `1px solid ${c.mid}66` : 'none' }}>
                <div style={{ fontFamily: LP.mono, fontSize: 8.5, letterSpacing: 2, textTransform: 'uppercase', color: c.deep }}>{x.k}</div>
                <div className="lp-serif" style={{ fontStyle: 'italic', fontWeight: 500, fontSize: 32, color: c.ink, lineHeight: 1.1 }}>
                  {x.v}<span style={{ fontSize: 15 }}> €</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            {cats.map((cat) => <ProgressBar key={cat.l} label={cat.l} value={cat.v} total={cat.t} theme={theme} />)}
          </div>
          <div style={{ border: `1px dashed ${c.mid}`, borderRadius: 9, padding: '11px 14px', marginTop: 16 }}>
            <span style={{ fontFamily: LP.mono, fontSize: 8, letterSpacing: 2, textTransform: 'uppercase', color: c.deep }}>Nota financiera</span>
            <div className="lp-serif" style={{ fontStyle: 'italic', fontSize: 16, color: LP.ink2, marginTop: 3 }}>
              Cada euro tiene un propósito.
            </div>
          </div>
        </div>

        <div style={{ width: 1, background: LP.line }} />

        {/* DERECHA — ledger */}
        <div style={{ flex: '1 1 50%', display: 'flex', flexDirection: 'column' }}>
          <Eyebrow color={c.deep}>Registro de gastos</Eyebrow>
          <div style={{ flex: 1, marginTop: 12, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '34px 1fr 84px 76px', padding: '0 4px 7px',
              borderBottom: `1px solid ${LP.line}` }}>
              {['Fecha', 'Descripción', 'Categoría', 'Importe'].map((h, i) => (
                <span key={h} style={{ fontFamily: LP.mono, fontSize: 8, letterSpacing: 1, textTransform: 'uppercase',
                  color: LP.ink3, textAlign: i === 3 ? 'right' : 'left' }}>{h}</span>
              ))}
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              {ledger.map((e, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '34px 1fr 84px 76px',
                  alignItems: 'center', padding: '0 4px', height: 28, borderBottom: `1px solid ${LP.lineSoft}` }}>
                  <span style={{ fontFamily: LP.mono, fontSize: 9.5, color: c.deep }}>{e.d}</span>
                  <span style={{ fontFamily: LP.sans, fontSize: 11.5, color: LP.ink }}>{e.desc}</span>
                  <span style={{ fontFamily: LP.sans, fontSize: 10, color: LP.ink3 }}>{e.cat}</span>
                  <span style={{ fontFamily: LP.mono, fontSize: 10.5, color: LP.ink2, textAlign: 'right' }}>{e.amt}</span>
                </div>
              ))}
              {[0, 1, 2].map((i) => (
                <div key={`e${i}`} style={{ display: 'grid', gridTemplateColumns: '34px 1fr 84px 76px',
                  alignItems: 'center', padding: '0 4px', height: 28, borderBottom: `1px solid ${LP.lineSoft}` }}>
                  <span style={{ fontFamily: LP.mono, fontSize: 9.5, color: LP.ink4 }}>__</span>
                  <span /><span /><span />
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 14,
            paddingTop: 12, borderTop: `1.5px solid ${c.mid}` }}>
            <span style={{ fontFamily: LP.mono, fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: c.deep }}>Total gastos</span>
            <span className="lp-serif" style={{ fontStyle: 'italic', fontWeight: 500, fontSize: 34, color: c.ink }}>
              1.583,29 <span style={{ fontSize: 17 }}>€</span>
            </span>
          </div>
        </div>
      </div>
    </Page>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// 10 · BIENESTAR — comidas + compra + agua + autocuidado + cuerpo
// ═══════════════════════════════════════════════════════════════════════
function Wellness({ theme = 'greige' }) {
  const c = T(theme);
  const wkDays = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
  const slots = ['Desayuno', 'Almuerzo', 'Cena', 'Snacks'];
  const care = [
    { ic: 'bowl', t: 'Baño caliente', d: '20 min' }, { ic: 'book', t: 'Leer ficción', d: '30 min' },
    { ic: 'leaf', t: 'Paseo lento', d: '15 min' }, { ic: 'moon', t: 'Skincare', d: '10 min' },
    { ic: 'heart', t: 'Llamar a alguien', d: '15 min' }, { ic: 'flower', t: 'Estiramiento', d: '12 min' },
  ];
  const body = [{ l: 'Energía', v: 7 }, { l: 'Estrés', v: 3 }, { l: 'Descanso', v: 8 }];
  return (
    <Page theme={theme} tab="Bienestar" currentNav="Semana" padding={26}>
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
            <div style={{ display: 'grid', gridTemplateColumns: '26px repeat(4,1fr)', background: LP.paper,
              borderBottom: `1px solid ${LP.line}` }}>
              <span />
              {slots.map((s) => (
                <span key={s} style={{ fontFamily: LP.mono, fontSize: 7.5, letterSpacing: .5, textTransform: 'uppercase',
                  color: c.deep, textAlign: 'center', padding: '6px 2px' }}>{s}</span>
              ))}
            </div>
            {wkDays.map((d, di) => (
              <div key={di} style={{ flex: 1, display: 'grid', gridTemplateColumns: '26px repeat(4,1fr)',
                borderTop: di > 0 ? `1px solid ${LP.lineSoft}` : 'none' }}>
                <span style={{ fontFamily: LP.mono, fontSize: 9, color: LP.ink3, display: 'flex',
                  alignItems: 'center', justifyContent: 'center', background: `${c.tint}55` }}>{d}</span>
                {slots.map((s) => (
                  <span key={s} style={{ borderLeft: `1px solid ${LP.lineSoft}` }} />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div style={{ width: 1, background: LP.line }} />

        {/* DERECHA — compra · agua · autocuidado · cuerpo */}
        <div style={{ flex: '1 1 58%', display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0 }}>
          <div style={{ display: 'flex', gap: 22 }}>
            {/* lista de compra */}
            <div style={{ flex: 1 }}>
              <Eyebrow color={c.deep}>Lista de compra</Eyebrow>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px', marginTop: 9 }}>
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, height: 19 }}>
                    <CB on={i < 2} theme={theme} size={11} />
                    <span style={{ flex: 1, borderBottom: `1px solid ${LP.line}` }} />
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
                    {Array.from({ length: 8 }).map((_, i) => {
                      const on = i < (5 - (di % 3));
                      return <span key={i} style={{ width: 8, height: 8, borderRadius: 999,
                        background: on ? c.mid : 'transparent', border: `1px solid ${on ? c.deep : LP.line}` }} />;
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* menú de autocuidado */}
          <div>
            <Eyebrow color={c.deep}>Menú de autocuidado</Eyebrow>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 9, marginTop: 10 }}>
              {care.map((x) => (
                <div key={x.t} className="lp-link" style={{ border: `1px solid ${LP.line}`, borderRadius: 7,
                  padding: '9px 11px', background: LP.paper, display: 'flex', alignItems: 'center', gap: 9 }}>
                  <span style={{ width: 26, height: 26, borderRadius: 999, background: c.tint, flex: '0 0 auto',
                    display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name={x.ic} size={13} color={c.deep} /></span>
                  <div style={{ lineHeight: 1.2, minWidth: 0 }}>
                    <div style={{ fontFamily: LP.sans, fontSize: 11.5, fontWeight: 600, color: LP.ink }}>{x.t}</div>
                    <div style={{ fontFamily: LP.mono, fontSize: 8.5, color: c.deep }}>{x.d}</div>
                  </div>
                </div>
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
              {body.map((b) => (
                <div key={b.l} style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                    <span style={{ fontFamily: LP.sans, fontSize: 11, fontWeight: 600, color: c.ink }}>{b.l}</span>
                    <span style={{ fontFamily: LP.mono, fontSize: 9.5, color: c.deep }}>{b.v}/10</span>
                  </div>
                  <div style={{ display: 'flex', gap: 3 }}>
                    {Array.from({ length: 10 }).map((_, i) => (
                      <span key={i} style={{ flex: 1, height: 6, borderRadius: 2,
                        background: i < b.v ? c.deep : `${c.mid}44` }} />
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
// 11 · PRODUCTIVIDAD — proyectos + meta + hitos
// ═══════════════════════════════════════════════════════════════════════
function Productivity({ theme = 'greige' }) {
  const c = T(theme);
  const projects = [
    { t: 'Lanzar tienda', pct: 70, status: 'En curso', done: 4 },
    { t: 'Curso de cerámica', pct: 40, status: 'En curso', done: 2 },
    { t: 'Renovar portfolio', pct: 90, status: 'Casi', done: 5 },
    { t: 'Mudanza', pct: 20, status: 'Inicio', done: 1 },
  ];
  const milestones = [
    { d: 'Sem 1', t: 'Investigación', done: true }, { d: 'Sem 2', t: 'Bocetos', done: true },
    { d: 'Sem 3', t: 'Primer prototipo', done: true }, { d: 'Sem 5', t: 'Pruebas', done: false },
    { d: 'Sem 7', t: 'Revisión final', done: false }, { d: 'Sem 8', t: 'Lanzamiento', done: false },
  ];
  return (
    <Page theme={theme} tab="Productividad" currentNav="Mes" padding={28}>
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
            {projects.map((p) => (
              <div key={p.t} className="lp-link" style={{ border: `1px solid ${LP.line}`, borderRadius: 8,
                padding: '11px 14px', background: LP.paper, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 8 }}>
                  <span style={{ fontFamily: LP.sans, fontSize: 14, fontWeight: 700, color: LP.ink, flex: 1 }}>{p.t}</span>
                  <span style={{ fontFamily: LP.mono, fontSize: 8.5, letterSpacing: 1, textTransform: 'uppercase',
                    color: c.deep, background: c.tint, borderRadius: 999, padding: '2px 8px' }}>{p.status}</span>
                  <span className="lp-serif" style={{ fontStyle: 'italic', fontSize: 22, color: c.ink }}>{p.pct}%</span>
                </div>
                <div style={{ height: 6, borderRadius: 6, background: c.tint, overflow: 'hidden', marginBottom: 9 }}>
                  <div style={{ width: `${p.pct}%`, height: '100%', background: c.deep }} />
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <CB on={i < p.done} theme={theme} size={11} />
                      <span style={{ fontFamily: LP.mono, fontSize: 8, color: LP.ink3 }}>F{i + 1}</span>
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
              {['Por qué', 'Resultado', 'Responsable', 'Fecha'].map((k) => (
                <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontFamily: LP.sans, fontSize: 11, fontWeight: 700, color: c.ink, width: 80 }}>{k}</span>
                  <span style={{ flex: 1, borderBottom: `1px solid ${c.mid}88`, height: 16 }} />
                </div>
              ))}
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <Eyebrow color={c.deep}>Hitos</Eyebrow>
            <div style={{ marginTop: 12, position: 'relative', paddingLeft: 18 }}>
              <span style={{ position: 'absolute', left: 5, top: 4, bottom: 4, width: 1, background: LP.line }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                {milestones.map((m) => (
                  <div key={m.t} style={{ display: 'flex', alignItems: 'center', gap: 12, position: 'relative' }}>
                    <span style={{ position: 'absolute', left: -16, width: 9, height: 9, borderRadius: 999,
                      background: m.done ? c.deep : LP.paper, border: `1px solid ${m.done ? c.deep : LP.line}` }} />
                    <span style={{ fontFamily: LP.mono, fontSize: 9, color: c.deep, width: 38 }}>{m.d}</span>
                    <span style={{ fontFamily: LP.sans, fontSize: 12.5, color: m.done ? LP.ink4 : LP.ink,
                      textDecoration: m.done ? 'line-through' : 'none' }}>{m.t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <Eyebrow color={c.deep}>Acciones de la semana</Eyebrow>
            <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 9 }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                  <CB on={i === 0} theme={theme} />
                  <span style={{ flex: 1, borderBottom: `1px solid ${LP.line}`, height: 16 }} />
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
// 12 · NOTAS — rayado a la izquierda · punteado a la derecha
// ═══════════════════════════════════════════════════════════════════════
function Notes({ theme = 'greige' }) {
  const c = T(theme);
  return (
    <Page theme={theme} tab="Estilo" currentNav="Notas" padding={0}>
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        {/* rayado */}
        <div style={{ flex: 1, position: 'relative', padding: '24px 30px', display: 'flex', flexDirection: 'column' }}>
          <Eyebrow color={c.deep}>Rayado</Eyebrow>
          <div style={{ flex: 1, marginTop: 16, backgroundImage: `repeating-linear-gradient(
            ${LP.line}, ${LP.line} 1px, transparent 1px, transparent 24px)`,
            backgroundPosition: '0 6px' }} />
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
        <div style={{ flex: 1, position: 'relative', padding: '24px 30px', display: 'flex', flexDirection: 'column' }}>
          <Eyebrow color={c.deep}>Punteado</Eyebrow>
          <div style={{ flex: 1, marginTop: 16, backgroundImage: `radial-gradient(${LP.line} 1px, transparent 1.4px)`,
            backgroundSize: '18px 18px', backgroundPosition: '4px 6px' }} />
        </div>
      </div>
    </Page>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// 13 · STICKERS funcionales
// ═══════════════════════════════════════════════════════════════════════
function StickerBanner({ children, theme, solid }) {
  const c = T(theme);
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: solid ? c.deep : c.tint, color: solid ? LP.paper : c.ink,
      borderRadius: 6, padding: '9px 6px', fontFamily: LP.sans, fontSize: 11, fontWeight: 700,
      letterSpacing: 1.5, textTransform: 'uppercase',
      boxShadow: '0 1px 3px rgba(0,0,0,.08)' }}>{children}</div>
  );
}
function PriPill({ children, theme, tone }) {
  const c = T(theme);
  const styles = {
    deep: { bg: c.deep, fg: LP.paper, bd: c.deep },
    mid: { bg: c.tint, fg: c.ink, bd: c.mid },
    out: { bg: LP.paper, fg: LP.ink2, bd: LP.line },
  }[tone || 'mid'];
  return (
    <span style={{ background: styles.bg, color: styles.fg, border: `1px solid ${styles.bd}`,
      borderRadius: 999, padding: '5px 12px', fontFamily: LP.sans, fontSize: 10.5, fontWeight: 600,
      letterSpacing: .5, whiteSpace: 'nowrap', boxShadow: '0 1px 2px rgba(0,0,0,.06)' }}>{children}</span>
  );
}
function Stickers({ theme = 'greige' }) {
  const c = T(theme);
  const banners = ['Hoy', 'Esta semana', 'Recordar', 'Metas', 'Hábitos', 'Dinero'];
  const trackers = [{ ic: 'drop', l: 'Agua' }, { ic: 'chart', l: 'Pasos' }, { ic: 'moon', l: 'Sueño' }, { ic: 'book', l: 'Leer' }];
  return (
    <Page theme={theme} tab="Estilo" currentNav="Notas" padding={26}>
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 12 }}>
          <div>
            <Eyebrow color={c.deep}>Stickers funcionales · recórtalos en tu app</Eyebrow>
            <div className="lp-serif" style={{ fontWeight: 500, fontSize: 30, color: LP.ink, marginTop: 4 }}>
              Hoja de <span style={{ fontStyle: 'italic', color: c.ink }}>stickers</span>
            </div>
          </div>
          <span style={{ fontFamily: LP.mono, fontSize: 9, letterSpacing: 1.5, color: LP.ink3 }}>60+ piezas</span>
        </div>

        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 18, minHeight: 0 }}>
          {/* col izq */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <Eyebrow color={c.deep}>Banners de sección</Eyebrow>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginTop: 9 }}>
                {banners.map((b, i) => <StickerBanner key={b} theme={theme} solid={i % 2 === 0}>{b}</StickerBanner>)}
              </div>
            </div>
            <div>
              <Eyebrow color={c.deep}>Prioridad y estado</Eyebrow>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 9 }}>
                <PriPill theme={theme} tone="deep">urgente</PriPill>
                <PriPill theme={theme} tone="mid">luego</PriPill>
                <PriPill theme={theme} tone="out">algún día</PriPill>
                <PriPill theme={theme} tone="deep">hecho</PriPill>
                <PriPill theme={theme} tone="out">en espera</PriPill>
                <PriPill theme={theme} tone="mid">p1</PriPill>
                <PriPill theme={theme} tone="mid">p2</PriPill>
                <PriPill theme={theme} tone="mid">p3</PriPill>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, border: `1px solid ${LP.line}`,
                  borderRadius: 999, padding: '5px 11px', background: LP.paper }}>
                  <Icon name="flag" size={12} color={c.deep} /></span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, border: `1px solid ${LP.line}`,
                  borderRadius: 999, padding: '5px 11px', background: LP.paper }}>
                  <Icon name="star" size={12} color={c.deep} /></span>
              </div>
            </div>
            <div>
              <Eyebrow color={c.deep}>Ánimo y clima</Eyebrow>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 10 }}>
                <div style={{ display: 'flex', gap: 11 }}>
                  {['😄', '🙂', '😌', '😕', '😴'].map((m, i) => (
                    <span key={i} style={{ fontSize: 22 }}>{m}</span>
                  ))}
                </div>
                <span style={{ width: 1, height: 24, background: LP.line }} />
                <div style={{ display: 'flex', gap: 12 }}>
                  {['sun', 'cloud', 'drop', 'moon'].map((ic) => (
                    <span key={ic} style={{ width: 30, height: 30, borderRadius: 999, background: c.tint,
                      display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon name={ic} size={15} color={c.deep} /></span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* col der */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <Eyebrow color={c.deep}>Mini-trackers</Eyebrow>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 9, marginTop: 9 }}>
                {trackers.map((t) => (
                  <div key={t.l} style={{ aspectRatio: '1', border: `1px solid ${LP.line}`, borderRadius: 8,
                    background: LP.paper, display: 'flex', flexDirection: 'column', alignItems: 'center',
                    justifyContent: 'center', gap: 5, boxShadow: '0 1px 3px rgba(0,0,0,.06)' }}>
                    <Icon name={t.ic} size={18} color={c.deep} />
                    <span style={{ fontFamily: LP.sans, fontSize: 10, fontWeight: 600, color: LP.ink }}>{t.l}</span>
                    <span style={{ fontFamily: LP.mono, fontSize: 8.5, color: c.deep }}>0/0</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <Eyebrow color={c.deep}>Notas y listas</Eyebrow>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9, marginTop: 9, height: 'calc(100% - 22px)' }}>
                {/* nota rayada */}
                <div style={{ border: `1px solid ${LP.line}`, borderRadius: 8, background: LP.paper, overflow: 'hidden',
                  boxShadow: '0 1px 3px rgba(0,0,0,.06)' }}>
                  <div style={{ background: c.tint, padding: '5px 10px', fontFamily: LP.mono, fontSize: 8,
                    letterSpacing: 1.5, textTransform: 'uppercase', color: c.ink }}>Nota</div>
                  <div style={{ height: 'calc(100% - 24px)', backgroundImage: `repeating-linear-gradient(
                    ${LP.lineSoft}, ${LP.lineSoft} 1px, transparent 1px, transparent 16px)`, backgroundPosition: '0 12px' }} />
                </div>
                {/* lista con checks */}
                <div style={{ border: `1px solid ${LP.line}`, borderRadius: 8, background: LP.paper, overflow: 'hidden',
                  boxShadow: '0 1px 3px rgba(0,0,0,.06)' }}>
                  <div style={{ background: c.tint, padding: '5px 10px', fontFamily: LP.mono, fontSize: 8,
                    letterSpacing: 1.5, textTransform: 'uppercase', color: c.ink }}>Lista</div>
                  <div style={{ padding: '10px 11px', display: 'flex', flexDirection: 'column', gap: 9 }}>
                    {[0, 1, 2, 3].map((i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                        <CB on={false} theme={theme} size={11} />
                        <span style={{ flex: 1, borderBottom: `1px solid ${LP.lineSoft}`, height: 11 }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

Object.assign(window, { HabitTracker, Finance, Wellness, Productivity, Notes, Stickers, StickerBanner, PriPill });

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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 0 }}>
            <Eyebrow color={c.deep}>Presupuesto del mes</Eyebrow>
            {/* (c) selector de moneda */}
            <div style={{ display: 'flex', gap: 3 }}>
              {['CLP','USD','EUR','GBP','MXN','BRL'].map(code => (
                <label key={code} style={{ position: 'relative', cursor: 'pointer',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <input type="radio" className="lp-toggle" name="currency" value={code}
                    defaultChecked={code === 'CLP'} />
                  <span className="lp-tg-currency" style={{ fontFamily: LP.mono, fontSize: 7.5,
                    letterSpacing: .5, padding: '2px 5px', borderRadius: 999,
                    border: `1px solid ${LP.line}`, color: LP.ink3, display: 'block',
                    whiteSpace: 'nowrap' }}>{code}</span>
                </label>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, background: c.tint, borderRadius: 10,
            padding: '16px 18px', margin: '12px 0 18px' }}>
            {[{k:'Entra',name:'budget-in'},{k:'Sale',name:'budget-out'},{k:'Queda',name:'budget-left'}].map((x, i) => (
              <div key={x.k} style={{ flex: 1, textAlign: 'center', borderLeft: i ? `1px solid ${c.mid}66` : 'none' }}>
                <div style={{ fontFamily: LP.mono, fontSize: 8.5, letterSpacing: 2, textTransform: 'uppercase', color: c.deep }}>{x.k}</div>
                {/* (d) cifras → input (Queda es derivado, muestra span) */}
                {x.name === 'budget-left'
                  ? <span id="finance-balance" className="lp-serif"
                      style={{ fontStyle: 'italic', fontWeight: 500, fontSize: 32, color: c.ink,
                        lineHeight: 1.1, display: 'block' }}>0 <span className="currency-sym" style={{ fontSize: 15 }}>$</span></span>
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
              placeholder="Cada peso tiene su propósito."
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
              0 <span className="currency-sym" style={{ fontSize: 17 }}>$</span>
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

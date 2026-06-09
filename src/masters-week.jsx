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

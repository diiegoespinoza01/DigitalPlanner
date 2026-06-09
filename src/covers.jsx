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
            Vida &amp; Plan
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

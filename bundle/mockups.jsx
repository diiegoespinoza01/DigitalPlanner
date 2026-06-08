// mockups.jsx — Tablet · PantoneSwatch · Mockup1–4  ·  imágenes de listing 2000×1500.
// CRÍTICO: todo contenido del planner se escala con min(scaleX, scaleY) para que
// nunca se recorte ni quede flotando.

// ── Fit — escala un contenido de tamaño natural (cw×ch) dentro de w×h ─────
function Fit({ w, h, cw, ch, children, bg = '#fff' }) {
  const scale = Math.min(w / cw, h / ch);
  return (
    <div style={{ width: w, height: h, position: 'relative', overflow: 'hidden', background: bg }}>
      <div style={{ position: 'absolute', left: '50%', top: '50%', width: cw, height: ch,
        transform: `translate(-50%,-50%) scale(${scale})`, transformOrigin: 'center center' }}>
        {children}
      </div>
    </div>
  );
}

// ── Tablet — bezel negro radio 38, camera dot, pantalla 4:3 ───────────────
function Tablet({ screenW = 760, children, rotate = 0, shadow = true }) {
  const screenH = screenW * 810 / 1080;       // pantalla 4:3 → encaje exacto
  const bezel = Math.round(screenW * 0.035);
  return (
    <div style={{ transform: `rotate(${rotate}deg)`, transformOrigin: 'center center' }}>
      <div style={{ background: '#1a1715', borderRadius: 38, padding: bezel, position: 'relative',
        boxShadow: shadow ? '0 40px 90px rgba(40,30,20,.28), 0 8px 24px rgba(40,30,20,.18)' : 'none' }}>
        {/* camera dot */}
        <div style={{ position: 'absolute', top: bezel / 2 - 2, left: '50%', transform: 'translateX(-50%)',
          width: 7, height: 7, borderRadius: 999, background: '#3a342f' }} />
        <div style={{ borderRadius: 18, overflow: 'hidden', background: '#fff' }}>
          <Fit w={screenW} h={screenH} cw={1080} ch={810}>{children}</Fit>
        </div>
      </div>
    </div>
  );
}

// ── PantoneSwatch — bloque de color + tarjeta paper estilo Pantone ────────
function PantoneSwatch({ themeKey, w = 150 }) {
  const c = THEMES[themeKey];
  return (
    <div style={{ width: w, boxShadow: '0 8px 24px rgba(40,30,20,.12)', borderRadius: 4, overflow: 'hidden',
      background: LP.paper }}>
      <div style={{ height: 200, background: c.mid }} />
      <div style={{ padding: '14px 14px 16px' }}>
        <div className="lp-serif" style={{ fontStyle: 'italic', fontWeight: 500, fontSize: 23, color: LP.ink, lineHeight: 1 }}>
          {c.name}
        </div>
        <div style={{ fontFamily: LP.mono, fontSize: 9, letterSpacing: 1.2, color: LP.ink3, marginTop: 8 }}>
          PANTONE<br />{c.pantone}
        </div>
      </div>
    </div>
  );
}

// header de mockup reutilizable (numerado · separado por ·)
function MockHeader({ parts, accent }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
      {parts.map((p, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span style={{ width: 4, height: 4, borderRadius: 4, background: accent }} />}
          <span style={{ fontFamily: LP.mono, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase',
            color: i === 0 ? accent : LP.ink3, fontWeight: i === 0 ? 600 : 400 }}>{p}</span>
        </React.Fragment>
      ))}
    </div>
  );
}

const MOCK_BG = (c) => ({
  width: 2000, height: 1500, background: LP.cream, position: 'relative', overflow: 'hidden',
  fontFamily: LP.sans, color: LP.ink,
  backgroundImage: `radial-gradient(circle at 0% 0%, ${c.tint}cc, transparent 38%),
    radial-gradient(circle at 100% 100%, ${c.tint}cc, transparent 38%),
    radial-gradient(rgba(120,105,82,.10) .7px, transparent .8px)`,
  backgroundSize: 'auto, auto, 4px 4px',
});

// ═══════════════════════════════════════════════════════════════════════
// MOCKUP 1 · HERO "TODO EN UNO"
// ═══════════════════════════════════════════════════════════════════════
function Mockup1Hero({ theme = 'greige' }) {
  const c = T(theme);
  const claims = ['Sin fechar', 'iPad · Android', 'GoodNotes · Notability · Xodo', 'Hiperenlazado'];
  return (
    <div style={MOCK_BG(c)}>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '0 110px', gap: 70 }}>
        {/* IZQUIERDA */}
        <div style={{ flex: '1 1 47%' }}>
          <div style={{ fontFamily: LP.mono, fontSize: 14, letterSpacing: 4, textTransform: 'uppercase',
            color: c.deep, marginBottom: 26 }}>Linen Paper Co. · descarga digital</div>
          <div className="lp-serif" style={{ fontWeight: 500, fontSize: 168, lineHeight: .86,
            letterSpacing: -2, textTransform: 'uppercase', color: LP.ink }}>Todo<br />en uno</div>
          <div className="lp-serif" style={{ fontStyle: 'italic', fontWeight: 500, fontSize: 60, color: c.ink,
            marginTop: 14 }}>planner digital</div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 40, maxWidth: 640 }}>
            {claims.map((cl) => (
              <span key={cl} style={{ border: `1.5px solid ${c.mid}`, borderRadius: 999, padding: '11px 22px',
                fontFamily: LP.sans, fontSize: 18, fontWeight: 600, color: LP.ink2, background: LP.paper }}>{cl}</span>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 44 }}>
            <div style={{ display: 'flex', gap: 10 }}>
              {THEME_ORDER.map((k) => (
                <span key={k} style={{ width: 30, height: 30, borderRadius: 999, background: THEMES[k].mid,
                  border: `1px solid ${LP.line}` }} />
              ))}
            </div>
            <span style={{ fontFamily: LP.mono, fontSize: 14, letterSpacing: 1.5, color: LP.ink2 }}>
              6 paletas Pantone suaves
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 26, marginTop: 50 }}>
            <span style={{ background: LP.ink, color: LP.cream, borderRadius: 999, padding: '20px 40px',
              fontFamily: LP.sans, fontSize: 22, fontWeight: 700, letterSpacing: .5,
              boxShadow: '0 16px 40px rgba(40,30,20,.22)' }}>Descarga inmediata</span>
            <span className="lp-serif" style={{ fontStyle: 'italic', fontSize: 24, color: LP.ink2, lineHeight: 1.3 }}>
              1 PDF · 200+ páginas<br />acceso de por vida
            </span>
          </div>
        </div>

        {/* DERECHA — 2 tablets */}
        <div style={{ flex: '1 1 53%', position: 'relative', height: 1180 }}>
          <div style={{ position: 'absolute', top: 150, left: 60 }}>
            <Tablet screenW={760}><Daily theme={theme} /></Tablet>
          </div>
          <div style={{ position: 'absolute', bottom: 120, right: 30, zIndex: 3 }}>
            <Tablet screenW={400} rotate={4}><Cover theme={theme} /></Tablet>
          </div>
          {/* tag rotada */}
          <div style={{ position: 'absolute', top: 60, right: 120, zIndex: 5, transform: 'rotate(7deg)',
            background: c.deep, color: LP.paper, borderRadius: 999, padding: '14px 28px',
            fontFamily: LP.mono, fontSize: 15, letterSpacing: 2.5, textTransform: 'uppercase', fontWeight: 600,
            boxShadow: '0 12px 30px rgba(40,30,20,.25)' }}>Más vendido · Nuevo</div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// MOCKUP 2 · CARACTERÍSTICAS
// ═══════════════════════════════════════════════════════════════════════
function Mockup2Features({ theme = 'greige' }) {
  const c = T(theme);
  const feats = [
    { ic: 'sticker', t: '6 paletas suaves', b: 'Greige, Salvia, Lavanda, Cielo, Rubor y Arcilla. Una compra, las seis.' },
    { ic: 'grid',    t: 'Hiperenlazado',   b: 'Índice, pestañas y meses conectados. Navega con un toque.' },
    { ic: 'book',    t: '13 plantillas',   b: 'Anual, mensual, semanal, diario y secciones temáticas.' },
    { ic: 'star',    t: 'Stickers funcionales', b: '60+ piezas: banners, prioridades, ánimo y trackers.' },
    { ic: 'edit',    t: 'PDF escribible',  b: 'Marca, escribe y dibuja encima en tu app favorita.' },
    { ic: 'week',    t: 'Lunes y domingo', b: 'Semanales con los dos inicios de semana incluidos.' },
  ];
  const callouts = [
    { t: 'toca cualquier pestaña →', top: 120, left: 70, rot: -5 },
    { t: '10 rutas rápidas', top: 600, left: 30, rot: 4 },
    { t: 'menú superior siempre visible', top: 360, right: 40, rot: 5 },
  ];
  return (
    <div style={MOCK_BG(c)}>
      <div style={{ position: 'absolute', top: 70, left: 110, right: 110, display: 'flex',
        justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <MockHeader accent={c.deep} parts={['02', 'Características', 'qué incluye', 'un PDF', 'todo lo que necesitas', 'sin ruido']} />
        <div style={{ textAlign: 'right' }}>
          <div className="lp-serif" style={{ fontStyle: 'italic', fontWeight: 500, fontSize: 92, color: c.deep, lineHeight: .8 }}>200+</div>
          <div style={{ fontFamily: LP.mono, fontSize: 12, letterSpacing: 2.5, textTransform: 'uppercase', color: LP.ink3, marginTop: 8 }}>
            Páginas hiperenlazadas</div>
        </div>
      </div>

      <div style={{ position: 'absolute', top: 220, left: 110, bottom: 90, right: 110, display: 'flex', gap: 70 }}>
        {/* rejilla 2×3 */}
        <div style={{ flex: '1 1 52%', display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'repeat(3,1fr)', gap: 22 }}>
          {feats.map((f, i) => (
            <div key={f.t} style={{ background: LP.paper, border: `1px solid ${LP.line}`, borderRadius: 16,
              padding: '30px 32px', display: 'flex', flexDirection: 'column', boxShadow: '0 6px 20px rgba(40,30,20,.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <span style={{ width: 56, height: 56, borderRadius: 999, background: c.tint,
                  display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name={f.ic} size={26} color={c.deep} stroke={1.3} /></span>
                <span style={{ fontFamily: LP.mono, fontSize: 14, color: c.mid, letterSpacing: 1 }}>{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className="lp-serif" style={{ fontStyle: 'italic', fontWeight: 500, fontSize: 30, color: LP.ink, marginBottom: 8 }}>{f.t}</div>
              <div style={{ fontFamily: LP.sans, fontSize: 16, lineHeight: 1.45, color: LP.ink2 }}>{f.b}</div>
            </div>
          ))}
        </div>
        {/* tablet + callouts */}
        <div style={{ flex: '1 1 48%', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 80, left: '50%', transform: 'translateX(-50%)' }}>
            <Tablet screenW={620}><IndexHub theme={theme} /></Tablet>
          </div>
          {callouts.map((co, i) => (
            <div key={i} style={{ position: 'absolute', top: co.top, left: co.left, right: co.right,
              transform: `rotate(${co.rot}deg)` }}>
              <span className="lp-serif" style={{ fontStyle: 'italic', fontSize: 26, color: c.deep,
                background: LP.paper, border: `1px solid ${c.mid}`, borderRadius: 999, padding: '8px 18px',
                boxShadow: '0 6px 18px rgba(40,30,20,.10)', whiteSpace: 'nowrap' }}>{co.t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// MOCKUP 3 · CONTENIDO — 12 miniaturas 430×322
// ═══════════════════════════════════════════════════════════════════════
function Thumb({ label, theme, children, w = 430, h = 322 }) {
  const c = T(theme);
  return (
    <div style={{ width: w, position: 'relative' }}>
      <div style={{ width: w, height: h, borderRadius: 12, overflow: 'hidden', background: '#fff',
        border: `1px solid ${LP.line}`, boxShadow: '0 10px 28px rgba(40,30,20,.10)' }}>
        <Fit w={w} h={h} cw={1080} ch={810}>{children}</Fit>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}>
        <span style={{ width: 8, height: 8, borderRadius: 999, background: c.deep }} />
        <span style={{ fontFamily: LP.sans, fontSize: 17, fontWeight: 600, color: LP.ink }}>{label}</span>
      </div>
    </div>
  );
}

function Mockup3Contents({ theme = 'greige' }) {
  const c = T(theme);
  return (
    <div style={MOCK_BG(c)}>
      <div style={{ position: 'absolute', top: 70, left: 110, right: 110, display: 'flex',
        justifyContent: 'space-between', alignItems: 'center' }}>
        <MockHeader accent={c.deep} parts={['03', 'Contenido', 'todo lo incluido', '13 plantillas master', '6 paletas', '60+ stickers']} />
        <div style={{ display: 'flex', gap: 9 }}>
          {THEME_ORDER.map((k) => (
            <span key={k} style={{ width: 34, height: 34, borderRadius: 7, background: THEMES[k].mid,
              border: `1px solid ${LP.line}` }} />
          ))}
        </div>
      </div>

      <div style={{ position: 'absolute', top: 190, left: 110, right: 110, bottom: 80,
        display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gridTemplateRows: 'repeat(3,1fr)', gap: '34px 40px',
        justifyItems: 'center', alignItems: 'start' }}>
        <Thumb label="Portada" theme={theme}><Cover theme={theme} /></Thumb>
        <Thumb label="Hub índice" theme={theme}><IndexHub theme={theme} /></Thumb>
        <Thumb label="Anual" theme={theme}><Yearly theme={theme} /></Thumb>
        <Thumb label="Diario" theme={theme}><Daily theme={theme} /></Thumb>
        <Thumb label="Mensual" theme={theme}><MonthlySpread theme={theme} /></Thumb>
        <Thumb label="Semanal · Lun" theme={theme}><WeeklySpread theme={theme} weekStart={1} /></Thumb>
        <Thumb label="Semanal · Dom" theme={theme}><WeeklySpread theme={theme} weekStart={0} /></Thumb>
        <Thumb label="Hábitos" theme={theme}><HabitTracker theme={theme} /></Thumb>
        <Thumb label="Finanzas" theme={theme}><Finance theme={theme} /></Thumb>
        <Thumb label="Bienestar" theme={theme}><Wellness theme={theme} /></Thumb>
        <Thumb label="Productividad" theme={theme}><Productivity theme={theme} /></Thumb>
        <Thumb label="Stickers" theme={theme}><Stickers theme={theme} /></Thumb>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// MOCKUP 4 · LAS 6 PALETAS
// ═══════════════════════════════════════════════════════════════════════
function Mockup4Themes({ theme = 'greige' }) {
  const c = T(theme);
  return (
    <div style={MOCK_BG(c)}>
      <div style={{ position: 'absolute', top: 80, left: 110, right: 110, display: 'flex',
        justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ maxWidth: 1100 }}>
          <MockHeader accent={c.deep} parts={['04', 'Paletas', 'seis paletas suaves']} />
          <div className="lp-serif" style={{ fontWeight: 500, fontSize: 72, color: LP.ink, marginTop: 22, lineHeight: 1 }}>
            Cambia la paleta, <span style={{ fontStyle: 'italic', color: c.ink }}>conserva la calma.</span>
          </div>
          <div className="lp-serif" style={{ fontStyle: 'italic', fontSize: 30, color: LP.ink3, marginTop: 12 }}>
            Una compra, las seis.
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-end' }}>
          <span style={{ background: LP.ink, color: LP.cream, borderRadius: 999, padding: '15px 30px',
            fontFamily: LP.sans, fontSize: 18, fontWeight: 700, letterSpacing: .5 }}>Descarga inmediata</span>
          <span style={{ border: `1.5px solid ${c.deep}`, color: c.ink, borderRadius: 999, padding: '13px 28px',
            fontFamily: LP.sans, fontSize: 17, fontWeight: 600 }}>Inicio Lunes y Domingo</span>
        </div>
      </div>

      {/* 6 cards Pantone en fila */}
      <div style={{ position: 'absolute', top: 560, left: 110, right: 110, display: 'flex',
        justifyContent: 'space-between' }}>
        {THEME_ORDER.map((k) => <PantoneSwatch key={k} themeKey={k} w={250} />)}
      </div>

      {/* footer */}
      <div style={{ position: 'absolute', bottom: 70, left: 110, right: 110, display: 'flex',
        justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${c.mid}`, paddingTop: 28 }}>
        <span className="lp-serif" style={{ fontStyle: 'italic', fontSize: 34, color: LP.ink }}>
          Un planner sereno para todo el año.
        </span>
        <span style={{ fontFamily: LP.mono, fontSize: 14, letterSpacing: 2, textTransform: 'uppercase', color: LP.ink3 }}>
          PDF · iPad · Android · GoodNotes · Notability · Xodo
        </span>
      </div>
    </div>
  );
}

Object.assign(window, {
  Fit, Tablet, PantoneSwatch, MockHeader, Thumb,
  Mockup1Hero, Mockup2Features, Mockup3Contents, Mockup4Themes,
});

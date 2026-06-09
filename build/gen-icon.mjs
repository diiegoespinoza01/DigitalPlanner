// gen-icon.mjs — genera el ícono de perfil de DigitalesCL en PNG 800×800
import sharp from 'sharp';
import { writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, '..', 'out');
mkdirSync(OUT, { recursive: true });

// ── SVG del ícono ──────────────────────────────────────────────────────
// Paleta cálida que conecta con el Digital Planner
// Diseño: fondo oscuro cálido · "D" serif italic grande · DIGITALES · CL

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">
  <defs>
    <!-- Sutil gradiente radial para profundidad -->
    <radialGradient id="bg" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#4A3D2F"/>
      <stop offset="100%" stop-color="#2A2018"/>
    </radialGradient>
  </defs>

  <!-- Fondo cuadrado (Etsy recorta en círculo) -->
  <rect width="800" height="800" fill="url(#bg)"/>

  <!-- Marco decorativo exterior -->
  <rect x="32" y="32" width="736" height="736"
        fill="none" stroke="#C9BBA0" stroke-width="1.2" opacity="0.35"/>

  <!-- Marco decorativo interior -->
  <rect x="44" y="44" width="712" height="712"
        fill="none" stroke="#C9BBA0" stroke-width="0.6" opacity="0.18"/>

  <!-- D grande en serif itálica — construida con paths para independencia de fuentes -->
  <!-- Letra D: palo vertical izquierdo + curva derecha -->
  <!-- Palo izquierdo -->
  <rect x="218" y="178" width="52" height="366" rx="4" fill="#F0E8DA"/>
  <!-- Arco derecho de la D — semicírculo con hueco interior -->
  <path d="
    M 260 178
    Q 480 178 480 361
    Q 480 544 260 544
    L 260 494
    Q 426 494 426 361
    Q 426 228 260 228
    Z
  " fill="#F0E8DA"/>

  <!-- Línea separadora doble -->
  <line x1="200" y1="592" x2="600" y2="592" stroke="#C9BBA0" stroke-width="1.4" opacity="0.55"/>
  <line x1="200" y1="597" x2="600" y2="597" stroke="#C9BBA0" stroke-width="0.6" opacity="0.28"/>

  <!-- DIGITALES en versalitas espaciadas -->
  <text x="400" y="654"
    text-anchor="middle"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="46"
    font-weight="normal"
    letter-spacing="14"
    fill="#C9BBA0"
    opacity="0.90">DIGITALES</text>

  <!-- CL — indicador de país, más discreto -->
  <text x="408" y="706"
    text-anchor="middle"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="24"
    font-weight="normal"
    letter-spacing="10"
    fill="#8A7B62"
    opacity="0.80">CL</text>

  <!-- Pequeño detalle ornamental: punto diamante -->
  <polygon points="400,135 408,143 400,151 392,143"
    fill="#C9BBA0" opacity="0.45"/>
</svg>`;

// ── Exportar PNG 800×800 ───────────────────────────────────────────────
const outFile = resolve(OUT, 'digitales-cl-icon.png');

await sharp(Buffer.from(svg))
  .resize(800, 800)
  .png({ compressionLevel: 9 })
  .toFile(outFile);

console.log(`\n✅  out/digitales-cl-icon.png  (800×800 px)\n`);

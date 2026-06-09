// gen-banner.mjs — banner de tienda DigitalesCL 1200×160 px
import sharp from 'sharp';
import { mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, '..', 'out');
mkdirSync(OUT, { recursive: true });

const W = 1200, H = 160;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">
  <defs>
    <!-- Gradiente horizontal cálido -->
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%"   stop-color="#1E1510"/>
      <stop offset="30%"  stop-color="#2E2318"/>
      <stop offset="50%"  stop-color="#38291C"/>
      <stop offset="70%"  stop-color="#2E2318"/>
      <stop offset="100%" stop-color="#1E1510"/>
    </linearGradient>

    <!-- Gradiente para la "D" fantasma de fondo -->
    <linearGradient id="ghostD" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%"   stop-color="#C9BBA0" stop-opacity="0.07"/>
      <stop offset="100%" stop-color="#C9BBA0" stop-opacity="0.02"/>
    </linearGradient>
  </defs>

  <!-- Fondo -->
  <rect width="${W}" height="${H}" fill="url(#bg)"/>

  <!-- "D" grande fantasma centrada a la derecha como textura -->
  <rect x="870" y="-60" width="44" height="280" rx="4" fill="url(#ghostD)"/>
  <path d="M 906 -60 Q 1080 -60 1080 80 Q 1080 220 906 220 L 906 170 Q 1026 170 1026 80 Q 1026 -10 906 -10 Z"
        fill="url(#ghostD)"/>

  <!-- Línea decorativa superior (doble) -->
  <line x1="0"    y1="14" x2="${W}" y2="14" stroke="#C9BBA0" stroke-width="0.7" opacity="0.30"/>
  <line x1="0"    y1="18" x2="${W}" y2="18" stroke="#C9BBA0" stroke-width="0.3" opacity="0.14"/>

  <!-- Línea decorativa inferior (doble) -->
  <line x1="0"    y1="${H-14}" x2="${W}" y2="${H-14}" stroke="#C9BBA0" stroke-width="0.7" opacity="0.30"/>
  <line x1="0"    y1="${H-18}" x2="${W}" y2="${H-18}" stroke="#C9BBA0" stroke-width="0.3" opacity="0.14"/>

  <!-- Ornamentos de diamante flanqueando el texto -->
  <!-- Izquierdo -->
  <polygon points="330,80  338,72  346,80  338,88" fill="#8A7B62" opacity="0.70"/>
  <polygon points="358,80  364,74  370,80  364,86" fill="#8A7B62" opacity="0.38"/>
  <!-- Derecho -->
  <polygon points="854,80  862,72  870,80  862,88" fill="#8A7B62" opacity="0.70"/>
  <polygon points="830,80  836,74  842,80  836,86" fill="#8A7B62" opacity="0.38"/>

  <!-- Línea corta izquierda -->
  <line x1="80" y1="80" x2="308" y2="80" stroke="#C9BBA0" stroke-width="0.8" opacity="0.28"/>
  <!-- Línea corta derecha -->
  <line x1="892" y1="80" x2="1120" y2="80" stroke="#C9BBA0" stroke-width="0.8" opacity="0.28"/>

  <!-- Nombre principal: DIGITALES CL -->
  <!-- "DIGITALES" -->
  <text x="600" y="74"
    text-anchor="middle"
    font-family="Georgia, 'Times New Roman', serif"
    font-style="italic"
    font-size="52"
    font-weight="normal"
    letter-spacing="18"
    fill="#EFE6D2"
    opacity="0.95">DIGITALES</text>

  <!-- Punto separador central entre DIGITALES y CL -->
  <circle cx="600" cy="89" r="1.8" fill="#8A7B62" opacity="0.6"/>

  <!-- "CL" más pequeño, alineado debajo -->
  <text x="600" y="114"
    text-anchor="middle"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="17"
    font-weight="normal"
    letter-spacing="12"
    fill="#C9BBA0"
    opacity="0.65">CL</text>

  <!-- Eslogan -->
  <text x="600" y="138"
    text-anchor="middle"
    font-family="Georgia, 'Times New Roman', serif"
    font-style="italic"
    font-size="13"
    letter-spacing="3"
    fill="#8A7B62"
    opacity="0.80">Lo digital, bien hecho.</text>
</svg>`;

const outFile = resolve(OUT, 'digitales-cl-banner.png');
await sharp(Buffer.from(svg))
  .resize(W, H)
  .png({ compressionLevel: 9 })
  .toFile(outFile);

console.log(`\n✅  out/digitales-cl-banner.png  (${W}×${H} px)\n`);

// Monta un proyecto de HyperFrames por vídeo (index.html + assets) a partir de videos.mjs.
// Uso: node herramientas/redes/videos/construir.mjs <carpeta-de-salida> <ruta-a-gsap.min.js>
// Después, en cada carpeta: hyperframes check y hyperframes render (ver PLAN-PUBLICACION.md).
import { copyFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { RAIZ } from '../../publicar/articulos.mjs';
import { VIDEOS } from './videos.mjs';

const [, , SALIDA, GSAP] = process.argv;
if (!SALIDA || !GSAP) { console.error('Uso: node construir.mjs <salida> <gsap.min.js>'); process.exit(1); }
const FUENTES = join(RAIZ, 'tema', 'jubilometro', 'assets', 'fonts');
const DURACION = 30;

// Las cifras no se separan de su unidad al partir la línea («3,3 %», «37 €»)
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/ (%|€)/g, '\u00A0$1');
const fmt = (v, d) => Number(v).toLocaleString('es-ES', { minimumFractionDigits: d, maximumFractionDigits: d, useGrouping: 'always' });
// {n:desde:hasta:decimales} → cifra que cuenta; *texto* → resaltado
const rico = (s) => esc(s)
  .replace(/\{n:([\d.]+):([\d.]+):(\d)\}/g, (_, a, b, d) => `<span class="num" data-de="${a}" data-a="${b}" data-dec="${d}">${fmt(b, +d)}</span>`)
  .replace(/\*([^*]+)\*/g, '<em>$1</em>');

const LOGO = '<svg viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="11" fill="#1D4ED8"/><path d="M9.5 27a10.5 10.5 0 0 1 21 0" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/><path d="M20 27l5.8-7.6" stroke="#93C5FD" stroke-width="3" stroke-linecap="round"/><circle cx="20" cy="27" r="2.7" fill="#fff"/></svg>';

function bloque(b, id) {
  if (b.tipo === 'flecha') return `<div class="flecha"><p class="flecha__de">${rico(b.de)}</p><svg class="flecha__f" viewBox="0 0 120 60" aria-hidden="true"><path d="M8 30h96M84 12l20 18-20 18" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg><p class="flecha__a">${rico(b.a)}</p></div>`;
  if (b.tipo === 'barras') return `<div class="barras">${b.barras.map(([p, txt, nueva], i) => `<div class="barra${nueva ? ' is-new' : ''}" id="${id}-b${i}"><p class="barra__k"><span class="barra__p">${p} %</span><span>${esc(txt)}</span></p><div class="barra__t"><div class="barra__f" style="width:${p}%"></div></div></div>`).join('')}</div>`;
  if (b.tipo === 'linea') return `<div class="linea"><div class="linea__eje"></div>${b.puntos.map(([anio, txt, foco], i) => `<div class="linea__p${foco ? ' is-foco' : ''}" style="left:${b.puntos.length === 1 ? 0 : (i / (b.puntos.length - 1)) * 100}%"><span class="linea__dot"></span><p class="linea__anio">${esc(anio)}</p><p class="linea__txt">${esc(txt)}</p></div>`).join('')}</div>`;
  if (b.tipo === 'lista') return `<ul class="lista">${b.items.map((t) => `<li><span class="lista__ok">✓</span><span>${esc(t)}</span></li>`).join('')}</ul>`;
  throw new Error(`Bloque desconocido: ${b.tipo}`);
}

function html(v) {
  const escenas = v.escenas.map((e, i) => {
    const id = `e${i}`, [a, b] = e.t;
    return `<section id="${id}" class="clip escena" data-start="${a}" data-duration="${b - a}" data-track-index="1">
        <div class="escena__in">
          <p class="ante">${esc(e.antetitulo)}</p>
          ${e.grande ? `<h1 class="grande grande--${e.tam}">${rico(e.grande)}</h1>` : ''}
          ${e.bloque ? bloque(e.bloque, id) : ''}
          ${e.apoyo ? `<p class="apoyo">${rico(e.apoyo)}</p>` : ''}
        </div>
      </section>
      <p id="${id}-sub" class="clip sub" data-start="${a}" data-duration="${b - a}" data-track-index="3"><span>${esc(e.sub)}</span></p>`;
  }).join('\n      ');
  const [ca, cb] = v.cierre.t;
  return `<!doctype html>
<html lang="es" data-resolution="portrait">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1080, height=1920" />
    <title>${esc(v.archivo)}</title>
    <script src="assets/gsap.min.js"></script>
    <style>
      @font-face { font-family: "Newsreader"; font-style: normal; font-weight: 300 650; src: url("assets/newsreader-normal-latin.woff2") format("woff2"); }
      @font-face { font-family: "Public Sans"; font-style: normal; font-weight: 100 900; src: url("assets/public-sans-normal-latin.woff2") format("woff2"); }
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { width: 1080px; height: 1920px; overflow: hidden; background: #0F1B2D; }
      #root { position: relative; width: 100%; height: 100%; overflow: hidden; font-family: "Public Sans", Arial, sans-serif; color: #F4F7FB; }
      /* Fondo: tinta de la marca con dos auroras que se mueven despacio */
      .fondo { position: absolute; inset: 0; background: #0F1B2D; overflow: hidden; }
      .aurora { position: absolute; width: 1400px; height: 1400px; border-radius: 50%; }
      .aurora--a { left: -520px; top: -380px; background: radial-gradient(closest-side, rgba(29, 78, 216, .55), rgba(29, 78, 216, 0)); }
      .aurora--b { left: 320px; top: 980px; background: radial-gradient(closest-side, rgba(56, 189, 248, .28), rgba(56, 189, 248, 0)); }
      .marca { position: absolute; left: 90px; top: 178px; display: flex; align-items: center; gap: 22px; }
      .marca svg { width: 72px; height: 72px; display: block; }
      .marca b { display: block; font: 600 50px/1 "Newsreader", Georgia, serif; letter-spacing: -.01em; }
      .marca small { display: block; margin-top: 8px; font: 700 24px/1 "Public Sans", Arial, sans-serif; letter-spacing: .14em; text-transform: uppercase; color: #93C5FD; }
      .progreso { position: absolute; left: 90px; top: 296px; width: 810px; height: 8px; border-radius: 8px; background: rgba(255, 255, 255, .14); overflow: hidden; }
      .progreso__f { display: block; width: 100%; height: 100%; background: #60A5FA; transform-origin: 0 50%; }
      /* Zona segura: nada importante en los 180 px de la derecha (botones) ni por debajo de 1450 px (descripción) */
      .escena { position: absolute; left: 90px; top: 370px; width: 810px; height: 760px; display: flex; align-items: center; }
      .escena__in { width: 100%; display: flex; flex-direction: column; gap: 34px; }
      .ante { font: 700 32px/1.25 "Public Sans", Arial, sans-serif; letter-spacing: .1em; text-transform: uppercase; color: #93C5FD; }
      .grande { font-family: "Newsreader", Georgia, serif; font-weight: 600; letter-spacing: -.02em; line-height: 1.04; text-wrap: balance; }
      .grande--xl { font-size: 180px; } .grande--l { font-size: 124px; } .grande--m { font-size: 100px; }
      em { font-style: normal; color: #FDE68A; }
      .num { font-variant-numeric: tabular-nums; }
      .apoyo { font: 500 46px/1.32 "Public Sans", Arial, sans-serif; color: #D6E2F3; text-wrap: pretty; }
      .flecha { display: flex; flex-direction: column; gap: 10px; }
      .flecha__de { font: 600 110px/1 "Newsreader", Georgia, serif; color: #C9D6E8; }
      .flecha__f { width: 150px; height: 75px; color: #60A5FA; display: block; transform: rotate(90deg); transform-origin: 75px 37px; margin: 26px 0 16px; }
      .flecha__a { font: 600 136px/1 "Newsreader", Georgia, serif; color: #FDE68A; letter-spacing: -.02em; }
      .barras { display: flex; flex-direction: column; gap: 44px; }
      .barra__k { display: flex; align-items: baseline; gap: 22px; font: 600 38px/1.2 "Public Sans", Arial, sans-serif; color: #D6E2F3; }
      .barra__p { font: 600 92px/1 "Newsreader", Georgia, serif; color: #F4F7FB; min-width: 230px; }
      .barra.is-new .barra__p { color: #FDE68A; }
      .barra__t { margin-top: 18px; height: 30px; border-radius: 30px; background: rgba(255, 255, 255, .12); overflow: hidden; }
      .barra__f { height: 100%; border-radius: 30px; background: #60A5FA; transform-origin: 0 50%; }
      .barra.is-new .barra__f { background: #FDE68A; }
      .linea { position: relative; height: 330px; margin: 30px 70px 0 30px; }
      .linea__eje { position: absolute; left: 0; right: 0; top: 40px; height: 8px; border-radius: 8px; background: rgba(255, 255, 255, .3); transform-origin: 0 50%; }
      .linea__p { position: absolute; top: 0; width: 0; display: flex; flex-direction: column; align-items: center; }
      .linea__dot { display: block; width: 88px; height: 88px; border-radius: 50%; background: #0F1B2D; border: 8px solid #93C5FD; }
      .linea__p.is-foco .linea__dot { background: #FDE68A; border-color: #FDE68A; }
      .linea__anio { margin-top: 26px; font: 600 84px/1 "Newsreader", Georgia, serif; white-space: nowrap; }
      .linea__txt { margin-top: 12px; font: 600 38px/1 "Public Sans", Arial, sans-serif; color: #D6E2F3; white-space: nowrap; }
      .linea__p.is-foco .linea__anio, .linea__p.is-foco .linea__txt { color: #FDE68A; }
      .lista { list-style: none; display: flex; flex-direction: column; gap: 40px; }
      .lista li { display: flex; gap: 28px; align-items: flex-start; font: 600 54px/1.22 "Public Sans", Arial, sans-serif; }
      .lista__ok { flex: none; display: grid; place-items: center; width: 70px; height: 70px; border-radius: 50%; background: #FDE68A; color: #0F1B2D; font-size: 42px; }
      /* Subtítulo: lo que diría la voz, para quien lo ve sin sonido */
      .sub { position: absolute; left: 90px; top: 1176px; width: 810px; }
      .sub span { display: block; padding: 22px 30px; border-left: 8px solid #FDE68A; background: rgba(8, 15, 27, .62); border-radius: 0 16px 16px 0; font: 600 44px/1.3 "Public Sans", Arial, sans-serif; color: #FFFFFF; }
      .cierre { position: absolute; left: 90px; top: 370px; width: 810px; height: 760px; display: flex; align-items: center; }
      .cierre__in { width: 100%; display: flex; flex-direction: column; gap: 36px; }
      .cierre__logo { width: 150px; height: 150px; display: block; }
      .cierre__t { font: 600 64px/1.1 "Newsreader", Georgia, serif; }
      .cierre__url { font: 800 70px/1.12 "Public Sans", Arial, sans-serif; color: #FDE68A; letter-spacing: -.01em; overflow-wrap: anywhere; }
      .cierre__url span { display: block; }
      .cierre__raya { display: block; width: 100%; height: 8px; border-radius: 8px; background: #FDE68A; transform-origin: 0 50%; }
      .cierre__nota { font: 500 38px/1.3 "Public Sans", Arial, sans-serif; color: #C9D6E8; }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="${DURACION}" data-width="1080" data-height="1920">
      <div id="fondo" class="clip fondo" data-layout-allow-overflow data-start="0" data-duration="${DURACION}" data-track-index="0">
        <div id="aurora-a" class="aurora aurora--a"></div>
        <div id="aurora-b" class="aurora aurora--b"></div>
      </div>
      <div id="marca" class="clip marca" data-start="0" data-duration="${DURACION}" data-track-index="2">${LOGO}<div><b>Jubilómetro</b><small>La cifra en 30 segundos</small></div></div>
      <div id="progreso" class="clip progreso" data-start="0" data-duration="${DURACION}" data-track-index="2"><span id="progreso-f" class="progreso__f"></span></div>
      ${escenas}
      <section id="cierre" class="clip cierre" data-start="${ca}" data-duration="${cb - ca}" data-track-index="1">
        <div id="cierre-in" class="cierre__in">
          ${LOGO.replace('<svg ', '<svg class="cierre__logo" ')}
          <p class="cierre__t">${esc(v.final)}</p>
          <p class="cierre__url">${v.enlace.length > 24 ? v.enlace.replace(/^([^/]+\/)(.*)$/, (_, a, b) => `<span>${esc(a)}</span><span>${esc(b)}</span>`) : esc(v.enlace)}</p>
          <span id="cierre-raya" class="cierre__raya"></span>
          <p class="cierre__nota">Cifras con su norma y su fecha · octubre de 2026</p>
        </div>
      </section>
      <p id="cierre-sub" class="clip sub" data-start="${ca}" data-duration="${cb - ca}" data-track-index="3"><span>${esc(v.cierre.sub)}</span></p>
    </div>
    <script>
      document.fonts.ready.then(function () {
        var tl = gsap.timeline({ paused: true });
        var D = ${DURACION};
        tl.fromTo("#progreso-f", { scaleX: 0 }, { scaleX: 1, duration: D, ease: "none" }, 0);
        tl.fromTo("#aurora-a", { x: 0, y: 0, scale: 1 }, { x: 260, y: 180, scale: 1.15, duration: D, ease: "sine.inOut" }, 0);
        tl.fromTo("#aurora-b", { x: 0, y: 0 }, { x: -320, y: -260, duration: D, ease: "sine.inOut" }, 0);
        tl.fromTo("#marca svg", { scale: .6, opacity: 0 }, { scale: 1, opacity: 1, duration: .5, ease: "back.out(2)" }, 0);
        var fmt = function (v, d) { return v.toLocaleString("es-ES", { minimumFractionDigits: d, maximumFractionDigits: d, useGrouping: "always" }); };
        var escenas = ${JSON.stringify(v.escenas.map((e) => e.t))};
        escenas.forEach(function (t, i) {
          var a = t[0], b = t[1], s = document.getElementById("e" + i), sub = document.getElementById("e" + i + "-sub").firstElementChild;
          var partes = s.querySelectorAll(".ante, .grande, .flecha__de, .flecha__f, .flecha__a, .apoyo, .lista li, .linea__eje");
          tl.fromTo(partes, { y: 56, opacity: 0 }, { y: 0, opacity: 1, duration: .6, ease: "power3.out", stagger: .16 }, a + .05);
          tl.fromTo(sub, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: .4, ease: "power2.out" }, a + .1);
          s.querySelectorAll(".num").forEach(function (n) {
            var o = { v: +n.getAttribute("data-de") }, fin = +n.getAttribute("data-a"), d = +n.getAttribute("data-dec");
            tl.fromTo(o, { v: +n.getAttribute("data-de") }, { v: fin, duration: 1.4, ease: "power2.out", onUpdate: function () { n.textContent = fmt(o.v, d); } }, a + .5);
          });
          s.querySelectorAll(".barra").forEach(function (bar, j, all) {
            var nueva = bar.classList.contains("is-new"), at = nueva ? a + .5 : a + .05;
            tl.fromTo(bar, { opacity: 0, y: nueva ? 40 : 0 }, { opacity: 1, y: 0, duration: nueva ? .5 : .01 }, at);
            if (nueva || all.length === 1) tl.fromTo(bar.querySelector(".barra__f"), { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "power3.out" }, at + .15);
          });
          s.querySelectorAll(".linea__p").forEach(function (p, j, all) {
            var foco = p.classList.contains("is-foco"), at = foco ? a + .9 : a + .25 + j * .2;
            tl.fromTo(p.querySelector(".linea__dot"), { scale: 0 }, { scale: 1, duration: .45, ease: "back.out(2.4)" }, at);
            tl.fromTo([p.querySelector(".linea__anio"), p.querySelector(".linea__txt")], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .4, stagger: .08 }, at + .15);
          });
          var eje = s.querySelector(".linea__eje");
          if (eje) tl.fromTo(eje, { scaleX: 0 }, { scaleX: 1, duration: .9, ease: "power2.inOut" }, a + .1);
          tl.to([s.firstElementChild, sub], { opacity: 0, y: -30, duration: .3, ease: "power2.in" }, b - .32);
        });
        var c = ${JSON.stringify([ca, cb])};
        tl.fromTo("#cierre-in > *", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: .55, ease: "power3.out", stagger: .14 }, c[0] + .05);
        tl.fromTo("#cierre-raya", { scaleX: 0 }, { scaleX: 1, duration: .8, ease: "power3.inOut" }, c[0] + .7);
        tl.fromTo("#cierre-sub span", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: .4 }, c[0] + .1);
        window.__timelines["main"] = tl;
      });
    </script>
  </body>
</html>
`;
}

for (const v of VIDEOS) {
  const dir = join(SALIDA, v.archivo);
  mkdirSync(join(dir, 'assets'), { recursive: true });
  for (const f of ['newsreader-normal-latin.woff2', 'public-sans-normal-latin.woff2']) copyFileSync(join(FUENTES, f), join(dir, 'assets', f));
  copyFileSync(GSAP, join(dir, 'assets', 'gsap.min.js'));
  writeFileSync(join(dir, 'index.html'), html(v));
  writeFileSync(join(dir, 'hyperframes.json'), JSON.stringify({ $schema: 'https://hyperframes.heygen.com/schema/hyperframes.json', paths: { assets: 'assets' } }, null, 2) + '\n');
  writeFileSync(join(dir, 'meta.json'), JSON.stringify({ id: v.archivo, name: v.archivo }, null, 2) + '\n');
  console.log(dir);
}

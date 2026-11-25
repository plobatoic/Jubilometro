// Escenarios y atrezo de los reels en 3D: salón, oficina, móvil con pantalla, calendario de pared que pasa la hoja,
// bocadillos, monedas que caen, carpeta y sello. Todo hecho con código.
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

export const mat = (color, rough = 0.7, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, ...extra });
const sombra = (m) => { m.castShadow = true; m.receiveShadow = true; return m; };
const caja = (w, h, d, m, r = 0.04) => sombra(new THREE.Mesh(r ? new RoundedBoxGeometry(w, h, d, 3, r) : new THREE.BoxGeometry(w, h, d), m));
const FUENTE = '"Inter Display", "Inter", system-ui, sans-serif';

// Lienzo de dibujo convertido en textura
export function lienzo(w, h, dibujar) {
  const c = document.createElement("canvas"); c.width = w; c.height = h;
  const ctx = c.getContext("2d");
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 8;
  const redibujar = (...a) => { ctx.clearRect(0, 0, w, h); dibujar(ctx, w, h, ...a); tex.needsUpdate = true; };
  redibujar();
  return { tex, redibujar, ctx };
}
function redondeado(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); }

// ---------- Salón ----------
// Salón de casa de abuelos, todo en código: tarima de roble, papel pintado, zócalo, ventana con cortinas,
// sillón orejero, sofá, aparador con fotos, estantería con libros, reloj, lámpara de pie que da luz y plantas.
const azar = (s) => () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
function texMadera(w = 1024, h = 1024, tablas = 8, base = "#b98a5a") {
  const r = azar(11);
  return lienzo(w, h, (ctx) => {
    const alto = h / tablas;
    for (let i = 0; i < tablas; i++) {
      const tono = 0.86 + r() * 0.22, c = new THREE.Color(base).multiplyScalar(tono);
      ctx.fillStyle = `#${c.getHexString()}`; ctx.fillRect(0, i * alto, w, alto);
      // veta
      for (let k = 0; k < 26; k++) { const y = i * alto + r() * alto; ctx.strokeStyle = `rgba(70,40,15,${0.05 + r() * 0.09})`; ctx.lineWidth = 1 + r() * 2; ctx.beginPath(); ctx.moveTo(0, y); for (let x = 0; x <= w; x += 64) ctx.lineTo(x, y + Math.sin(x * 0.01 + k) * 3 * r()); ctx.stroke(); }
      // nudos
      if (r() < 0.5) { const x = r() * w, y = i * alto + alto / 2; const g = ctx.createRadialGradient(x, y, 1, x, y, 14); g.addColorStop(0, "rgba(60,30,10,0.55)"); g.addColorStop(1, "rgba(60,30,10,0)"); ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(x, y, 22, 9, 0, 0, 7); ctx.fill(); }
      ctx.fillStyle = "rgba(40,22,8,0.45)"; ctx.fillRect(0, i * alto + alto - 2, w, 2);
      const corte = (r() * w) | 0; ctx.fillRect(corte, i * alto, 2, alto);
    }
  });
}
function texPapel() {
  return lienzo(512, 512, (ctx, w, h) => {
    ctx.fillStyle = "#efe1c8"; ctx.fillRect(0, 0, w, h);
    for (let x = 0; x < w; x += 64) { ctx.fillStyle = "rgba(255,255,255,0.35)"; ctx.fillRect(x, 0, 22, h); }
    ctx.fillStyle = "rgba(176,120,80,0.16)";
    for (let y = 32; y < h; y += 64) for (let x = 43; x < w; x += 64) { ctx.beginPath(); ctx.ellipse(x, y + ((x / 64) % 2) * 32, 6, 11, 0, 0, 7); ctx.fill(); ctx.beginPath(); ctx.arc(x, y + 14 + ((x / 64) % 2) * 32, 3, 0, 7); ctx.fill(); }
  });
}
function texAlfombra() {
  return lienzo(1024, 768, (ctx, w, h) => {
    ctx.fillStyle = "#9a5a4c"; ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "#e8cf9f"; ctx.lineWidth = 18; ctx.strokeRect(40, 40, w - 80, h - 80);
    ctx.strokeStyle = "#4a5a6e"; ctx.lineWidth = 34; ctx.strokeRect(90, 90, w - 180, h - 180);
    ctx.fillStyle = "#e8cf9f"; ctx.save(); ctx.translate(w / 2, h / 2); ctx.rotate(Math.PI / 4); ctx.fillRect(-120, -120, 240, 240); ctx.restore();
    ctx.fillStyle = "#4a5a6e"; ctx.save(); ctx.translate(w / 2, h / 2); ctx.rotate(Math.PI / 4); ctx.fillRect(-70, -70, 140, 140); ctx.restore();
    for (const [x, y] of [[230, 220], [w - 230, 220], [230, h - 220], [w - 230, h - 220]]) { ctx.fillStyle = "#c98a3c"; ctx.beginPath(); ctx.arc(x, y, 44, 0, 7); ctx.fill(); }
    const r = azar(5); for (let k = 0; k < 9000; k++) { ctx.fillStyle = `rgba(${r() < 0.5 ? "0,0,0" : "255,255,255"},0.05)`; ctx.fillRect(r() * w, r() * h, 2, 2); }
  });
}
function texFoto(semilla) {
  const r = azar(semilla);
  return lienzo(256, 320, (ctx, w, h) => {
    const g = ctx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, ["#9cc3e0", "#e7c79b", "#b9d3a9"][semilla % 3]); g.addColorStop(1, "#e9dcc6"); ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    for (let k = 0; k < 2 + (semilla % 2); k++) { const x = 70 + k * 70 + r() * 20; ctx.fillStyle = ["#c9524b", "#3f6c99", "#d9a441"][k % 3]; ctx.beginPath(); ctx.ellipse(x, h - 60, 32, 70, 0, 0, 7); ctx.fill(); ctx.fillStyle = "#f2c7a5"; ctx.beginPath(); ctx.arc(x, h - 150, 26, 0, 7); ctx.fill(); }
    ctx.fillStyle = "rgba(120,90,50,0.18)"; ctx.fillRect(0, 0, w, h);
  });
}
function planta(r) {
  const g = new THREE.Group(), verde = [mat("#4f8a46", 0.7, { side: THREE.DoubleSide }), mat("#3f7a3a", 0.7, { side: THREE.DoubleSide }), mat("#66a35a", 0.7, { side: THREE.DoubleSide })];
  const maceta = sombra(new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.24, 0.55, 28), mat("#b8643c", 0.65))); maceta.position.y = 0.275; g.add(maceta);
  const tierra = new THREE.Mesh(new THREE.CircleGeometry(0.3, 24), mat("#3b2a1e", 1)); tierra.rotation.x = -Math.PI / 2; tierra.position.y = 0.52; g.add(tierra);
  const hoja = new THREE.ShapeGeometry(new THREE.Shape().moveTo(0, 0).quadraticCurveTo(0.16, 0.3, 0, 0.62).quadraticCurveTo(-0.16, 0.3, 0, 0));
  for (let k = 0; k < 22; k++) {
    const a = r() * Math.PI * 2, alto = 0.55 + r() * 0.9, h = sombra(new THREE.Mesh(hoja, verde[k % 3]));
    h.position.set(Math.cos(a) * 0.08, alto, Math.sin(a) * 0.08); h.rotation.set(-0.5 - r() * 0.7, a, 0); h.rotateX(-0.3); h.scale.setScalar(0.8 + r() * 0.6); g.add(h);
    const tallo = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.016, alto - 0.5, 5), verde[1]); tallo.position.set(Math.cos(a) * 0.04, 0.5 + (alto - 0.5) / 2, Math.sin(a) * 0.04); g.add(tallo);
  }
  return g;
}
export function salon() {
  const g = new THREE.Group(), r = azar(3);
  // Suelo de tarima
  const madera = texMadera(); madera.tex.wrapS = madera.tex.wrapT = THREE.RepeatWrapping; madera.tex.repeat.set(4, 6);
  const suelo = new THREE.Mesh(new THREE.PlaneGeometry(24, 24), new THREE.MeshStandardMaterial({ map: madera.tex, roughness: 0.42, metalness: 0 }));
  suelo.rotation.x = -Math.PI / 2; suelo.receiveShadow = true; g.add(suelo);
  // Paredes con papel pintado y zócalo de madera
  const papel = texPapel(); papel.tex.wrapS = papel.tex.wrapT = THREE.RepeatWrapping; papel.tex.repeat.set(10, 4);
  const mPapel = new THREE.MeshStandardMaterial({ map: papel.tex, roughness: 0.92 });
  const pared = sombra(new THREE.Mesh(new THREE.PlaneGeometry(24, 10), mPapel)); pared.position.set(0, 5, -3.2); g.add(pared);
  const lat = sombra(new THREE.Mesh(new THREE.PlaneGeometry(12, 10), mPapel.clone())); lat.material.map = papel.tex; lat.rotation.y = Math.PI / 2; lat.position.set(-6.5, 5, 2.8); g.add(lat);
  const mZoc = new THREE.MeshStandardMaterial({ color: "#7a4e2d", roughness: 0.45 });
  const zoc = caja(24, 1.1, 0.06, mZoc, 0); zoc.position.set(0, 0.55, -3.16); g.add(zoc);
  const mold = caja(24, 0.08, 0.1, mat("#f6ede0", 0.5), 0.02); mold.position.set(0, 1.12, -3.13); g.add(mold);
  const techo = caja(24, 0.14, 0.14, mat("#f6ede0", 0.5), 0.02); techo.position.set(0, 7.0, -3.12); g.add(techo);
  // Ventana con cielo, luz y cortinas con pliegues
  const cielo = lienzo(512, 640, (ctx, w, h) => { const gr = ctx.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, "#8fbde6"); gr.addColorStop(0.65, "#d8ebf7"); gr.addColorStop(0.66, "#9cbf8a"); gr.addColorStop(1, "#6f9a62"); ctx.fillStyle = gr; ctx.fillRect(0, 0, w, h); ctx.fillStyle = "rgba(255,255,255,0.8)"; for (const [x, y, s] of [[120, 120, 50], [170, 110, 40], [360, 200, 34], [400, 190, 44]]) { ctx.beginPath(); ctx.arc(x, y, s, 0, 7); ctx.fill(); } ctx.fillStyle = "#4f7a45"; for (let k = 0; k < 6; k++) { ctx.beginPath(); ctx.arc(40 + k * 90, 430, 60, 0, 7); ctx.fill(); } });
  const vid = new THREE.Mesh(new THREE.PlaneGeometry(2.1, 2.7), new THREE.MeshBasicMaterial({ map: cielo.tex })); vid.position.set(-3.1, 3.4, -3.14); g.add(vid);
  const mMarco = mat("#fbf7f0", 0.4);
  for (const [w, h, x, y] of [[2.4, 0.14, -3.1, 4.82], [2.4, 0.2, -3.1, 1.98], [0.14, 2.9, -4.25, 3.4], [0.14, 2.9, -1.95, 3.4], [0.07, 2.7, -3.1, 3.4], [2.1, 0.07, -3.1, 3.9]]) { const b = caja(w, h, 0.12, mMarco, 0.02); b.position.set(x, y, -3.08); g.add(b); }
  const alfeizar = caja(2.7, 0.08, 0.36, mMarco, 0.02); alfeizar.position.set(-3.1, 1.92, -2.98); g.add(alfeizar);
  const pliegues = (ancho, alto) => { const geo = new THREE.PlaneGeometry(ancho, alto, 40, 8); const p = geo.attributes.position; for (let k = 0; k < p.count; k++) p.setZ(k, Math.sin(p.getX(k) * 18) * 0.06); geo.computeVertexNormals(); return geo; };
  const mCort = new THREE.MeshStandardMaterial({ color: "#c98f52", roughness: 0.95, side: THREE.DoubleSide });
  for (const x of [-4.6, -1.6]) { const c = sombra(new THREE.Mesh(pliegues(0.9, 4.6), mCort)); c.position.set(x, 3.0, -2.95); g.add(c); }
  const barra = sombra(new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 3.8, 10), mat("#5a3a22", 0.4))); barra.rotation.z = Math.PI / 2; barra.position.set(-3.1, 5.3, -2.92); g.add(barra);
  // Sillón orejero
  const terc = new THREE.MeshStandardMaterial({ color: "#6b7f5a", roughness: 0.96, bumpMap: texPapel().tex, bumpScale: 0.4 });
  const sillon = new THREE.Group(); sillon.position.set(-2.9, 0, -1.7); sillon.rotation.y = 0.55; g.add(sillon);
  const sA = caja(1.5, 0.45, 1.3, terc, 0.14); sA.position.y = 0.65; sillon.add(sA);
  const sR = caja(1.5, 1.7, 0.35, terc, 0.16); sR.position.set(0, 1.45, -0.55); sillon.add(sR);
  for (const sx of [-1, 1]) { const b = caja(0.28, 0.75, 1.3, terc, 0.12); b.position.set(0.7 * sx, 0.95, 0); sillon.add(b); const o = caja(0.22, 0.75, 0.5, terc, 0.1); o.position.set(0.65 * sx, 1.9, -0.4); sillon.add(o); const pt = sombra(new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.04, 0.42, 10), mat("#4a2e1a", 0.4))); pt.position.set(0.6 * sx, 0.21, 0.5); sillon.add(pt); const pt2 = pt.clone(); pt2.position.z = -0.5; sillon.add(pt2); }
  const manta = caja(0.9, 0.06, 1.2, new THREE.MeshStandardMaterial({ color: "#d9c4a0", roughness: 1, bumpMap: texPapel().tex, bumpScale: 1 }), 0.03); manta.position.set(0.3, 0.9, 0.1); manta.rotation.z = -0.25; sillon.add(manta);
  // Sofá
  const tela = new THREE.MeshStandardMaterial({ color: "#8c5a4a", roughness: 0.95 });
  const sofa = new THREE.Group(); sofa.position.set(0.2, 0, -2.45); g.add(sofa);
  for (const sx of [-0.78, 0.78]) { const a = caja(1.5, 0.42, 1.15, tela, 0.14); a.position.set(sx, 0.64, 0.05); sofa.add(a); const rp = caja(1.5, 0.95, 0.32, tela, 0.15); rp.position.set(sx, 1.25, -0.42); rp.rotation.x = -0.08; sofa.add(rp); }
  const base = caja(3.2, 0.36, 1.2, tela, 0.06); base.position.y = 0.3; sofa.add(base);
  for (const sx of [-1, 1]) { const b = caja(0.32, 0.78, 1.2, tela, 0.14); b.position.set(1.72 * sx, 0.72, 0); sofa.add(b); }
  for (const [x, col, rz] of [[-1.15, "#e6b35c", 0.18], [1.2, "#6f8fa8", -0.15], [0.05, "#efe3cf", 0.05]]) { const c = caja(0.62, 0.55, 0.2, mat(col, 0.95), 0.12); c.position.set(x, 1.2, -0.18); c.rotation.set(-0.2, 0, rz); sofa.add(c); }
  // Aparador con fotos y reloj encima
  const mMueble = new THREE.MeshStandardMaterial({ map: texMadera(512, 512, 5, "#7a4b2a").tex, roughness: 0.38 });
  const apa = caja(2.4, 1.05, 0.55, mMueble, 0.03); apa.position.set(4.4, 0.62, -2.88); g.add(apa);
  for (let k = 0; k < 3; k++) { const cj = caja(0.72, 0.36, 0.04, mMueble, 0.02); cj.position.set(3.6 + k * 0.8, 0.8, -2.59); g.add(cj); const ti = sombra(new THREE.Mesh(new THREE.SphereGeometry(0.035, 12, 8), mat("#d8b46a", 0.25, { metalness: 0.8 }))); ti.position.set(3.6 + k * 0.8, 0.8, -2.55); g.add(ti); }
  for (const [x, sem, rot] of [[3.6, 1, 0.2], [4.35, 2, -0.05], [5.0, 3, -0.25]]) { const marco = caja(0.36, 0.44, 0.04, mat("#d8b46a", 0.3, { metalness: 0.6 }), 0.01); marco.position.set(x, 1.38, -2.85); marco.rotation.set(-0.12, rot, 0); g.add(marco); const f = new THREE.Mesh(new THREE.PlaneGeometry(0.29, 0.36), new THREE.MeshStandardMaterial({ map: texFoto(sem).tex, roughness: 0.4 })); f.position.set(0, 0, 0.022); marco.add(f); }
  const reloj = new THREE.Group(); reloj.position.set(-0.9, 3.6, -3.12); g.add(reloj);
  const esfR = sombra(new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.08, 40), mat("#5a3a22", 0.4))); esfR.rotation.x = Math.PI / 2; reloj.add(esfR);
  const caraR = lienzo(256, 256, (ctx, w) => { ctx.fillStyle = "#fbf5e6"; ctx.beginPath(); ctx.arc(128, 128, 126, 0, 7); ctx.fill(); ctx.fillStyle = "#3a2a1a"; for (let k = 0; k < 12; k++) { const a = (k / 12) * Math.PI * 2; ctx.fillRect(128 + Math.sin(a) * 100 - 4, 128 - Math.cos(a) * 100 - 4, 8, 8); } ctx.lineWidth = 8; ctx.lineCap = "round"; ctx.strokeStyle = "#3a2a1a"; ctx.beginPath(); ctx.moveTo(128, 128); ctx.lineTo(128 + 55, 128 - 20); ctx.moveTo(128, 128); ctx.lineTo(128 - 10, 128 - 85); ctx.stroke(); });
  const disco = new THREE.Mesh(new THREE.CircleGeometry(0.36, 40), new THREE.MeshStandardMaterial({ map: caraR.tex, roughness: 0.5 })); disco.position.z = 0.045; reloj.add(disco);
  // Estantería con libros
  const est = new THREE.Group(); est.position.set(-5.2, 0, -2.75); g.add(est);
  const lado = (x) => { const l = caja(0.08, 3.6, 0.5, mMueble, 0.01); l.position.set(x, 1.8, 0); est.add(l); }; lado(-0.75); lado(0.75);
  for (let k = 0; k < 5; k++) { const bal = caja(1.5, 0.06, 0.5, mMueble, 0.01); bal.position.set(0, 0.1 + k * 0.85, 0); est.add(bal); if (k === 4) continue; let x = -0.68; while (x < 0.6) { const an = 0.06 + r() * 0.06, al = 0.45 + r() * 0.25; const lib = caja(an, al, 0.36, mat(["#8e3b35", "#2e4a6b", "#d9a441", "#4f6f4a", "#e8dcc4", "#6b3f5a"][(r() * 6) | 0], 0.7), 0.01); lib.position.set(x + an / 2, 0.13 + k * 0.85 + al / 2, 0.02); if (r() < 0.12) lib.rotation.z = 0.2; est.add(lib); x += an + 0.01; } }
  // Lámpara de pie con luz cálida
  const lamp = new THREE.Group(); lamp.position.set(2.45, 0, -2.5); g.add(lamp);
  const lb = sombra(new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.32, 0.06, 24), mat("#3a2a1a", 0.35, { metalness: 0.6 }))); lb.position.y = 0.03; lamp.add(lb);
  const lp = sombra(new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 3.0, 10), mat("#3a2a1a", 0.35, { metalness: 0.6 }))); lp.position.y = 1.5; lamp.add(lp);
  const tulipa = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.5, 0.6, 32, 1, true), new THREE.MeshStandardMaterial({ color: "#f6e3c0", emissive: "#ffcf8a", emissiveIntensity: 1.1, side: THREE.DoubleSide, roughness: 0.9 })); tulipa.position.y = 3.05; lamp.add(tulipa);
  const bombilla = new THREE.PointLight("#ffbf73", 9, 9, 1.6); bombilla.position.y = 2.95; lamp.add(bombilla);
  // Plantas
  const p1 = planta(r); p1.position.set(-1.95, 0, -2.75); g.add(p1);
  const p2 = planta(r); p2.position.set(4.9, 1.15, -2.85); p2.scale.setScalar(0.45); g.add(p2);
  // Alfombra con flecos
  const alf = new THREE.Mesh(new THREE.PlaneGeometry(6.4, 4.4), new THREE.MeshStandardMaterial({ map: texAlfombra().tex, roughness: 1 })); alf.rotation.x = -Math.PI / 2; alf.position.set(0.2, 0.012, 0.6); alf.receiveShadow = true; g.add(alf);
  for (const sz of [-1, 1]) for (let k = 0; k < 40; k++) { const fl = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.005, 0.16), mat("#e8cf9f", 1)); fl.position.set(-3.0 + k * 0.16 + 0.2, 0.013, 0.6 + sz * 2.28); g.add(fl); }
  // Cuadro de paisaje
  const cuadro = lienzo(512, 384, (ctx, w, h) => { const gr = ctx.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, "#9fc9ea"); gr.addColorStop(1, "#f6d9a8"); ctx.fillStyle = gr; ctx.fillRect(0, 0, w, h); ctx.fillStyle = "#6aa36a"; ctx.beginPath(); ctx.moveTo(0, h); ctx.quadraticCurveTo(w * 0.3, h * 0.45, w * 0.6, h * 0.7); ctx.quadraticCurveTo(w * 0.8, h * 0.55, w, h * 0.65); ctx.lineTo(w, h); ctx.fill(); ctx.fillStyle = "#ffd36b"; ctx.beginPath(); ctx.arc(w * 0.75, h * 0.3, 40, 0, 7); ctx.fill(); });
  const marcoC = caja(1.7, 1.3, 0.08, mat("#d8b46a", 0.3, { metalness: 0.5 }), 0.03); marcoC.position.set(1.0, 3.5, -3.12); g.add(marcoC);
  const lam = new THREE.Mesh(new THREE.PlaneGeometry(1.45, 1.05), new THREE.MeshStandardMaterial({ map: cuadro.tex, roughness: 0.9 })); lam.position.set(1.0, 3.5, -3.07); g.add(lam);
  // Luz de día que entra por la ventana
  const dia = new THREE.SpotLight("#dfeeff", 30, 18, 0.55, 0.6, 1.2); dia.position.set(-3.1, 4.6, -1.0); dia.target.position.set(0.5, 0, 1.5); dia.castShadow = false; g.add(dia, dia.target);
  return g;
}

// ---------- Oficina ----------
export function oficina() {
  const g = new THREE.Group();
  const baldosa = lienzo(512, 512, (ctx, w, h) => { ctx.fillStyle = "#cfd8e3"; ctx.fillRect(0, 0, w, h); ctx.strokeStyle = "rgba(80,100,130,0.25)"; ctx.lineWidth = 4; for (let i = 0; i <= 4; i++) { ctx.beginPath(); ctx.moveTo(i * 128, 0); ctx.lineTo(i * 128, h); ctx.moveTo(0, i * 128); ctx.lineTo(w, i * 128); ctx.stroke(); } });
  baldosa.tex.wrapS = baldosa.tex.wrapT = THREE.RepeatWrapping; baldosa.tex.repeat.set(6, 6);
  const suelo = new THREE.Mesh(new THREE.PlaneGeometry(24, 24), new THREE.MeshStandardMaterial({ map: baldosa.tex, roughness: 0.6 })); suelo.rotation.x = -Math.PI / 2; suelo.receiveShadow = true; g.add(suelo);
  const pared = sombra(new THREE.Mesh(new THREE.PlaneGeometry(24, 10), mat("#dfe9f2", 0.95))); pared.position.set(0, 5, -3.2); g.add(pared);
  const franja = caja(24, 0.5, 0.06, mat("#7fb1ea", 0.7), 0); franja.position.set(0, 1.4, -3.15); g.add(franja);
  // Cartel y pantalla de turnos
  const cartel = lienzo(1024, 256, (ctx, w, h) => { ctx.fillStyle = "#1f3a5f"; redondeado(ctx, 0, 0, w, h, 40); ctx.fill(); ctx.fillStyle = "#fff"; ctx.font = `800 96px ${FUENTE}`; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText("Atención al público", w / 2, h / 2 + 4); });
  const cart = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 0.8), new THREE.MeshStandardMaterial({ map: cartel.tex, transparent: true, roughness: 0.6 })); cart.position.set(-3.9, 3.0, -3.1); g.add(cart);
  const turno = lienzo(512, 256, (ctx, w, h) => { ctx.fillStyle = "#0c1424"; redondeado(ctx, 0, 0, w, h, 30); ctx.fill(); ctx.fillStyle = "#6fd3a0"; ctx.font = `800 120px ${FUENTE}`; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText("A-27", w / 2, h / 2 + 6); });
  const tur = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 0.65), new THREE.MeshStandardMaterial({ map: turno.tex, emissive: "#ffffff", emissiveMap: turno.tex, emissiveIntensity: 0.6, transparent: true })); tur.position.set(2.9, 3.6, -3.1); g.add(tur);
  // Mesa con ordenador, papeles y planta
  const mesa = caja(3.6, 0.12, 1.5, mat("#f5f1ea", 0.5), 0.03); mesa.position.set(0.9, 1.3, -1.2); g.add(mesa);
  const frente = caja(3.6, 1.2, 0.08, mat("#3d86e0", 0.7), 0.02); frente.position.set(0.9, 0.66, -0.47); g.add(frente);
  for (const x of [-0.8, 2.6]) { const p = caja(0.1, 1.25, 1.4, mat("#c9d3df", 0.6), 0.02); p.position.set(x, 0.62, -1.2); g.add(p); }
  const monitor = caja(1.2, 0.75, 0.08, mat("#1c2433", 0.4), 0.04); monitor.position.set(2.0, 2.0, -1.6); monitor.rotation.y = -0.35; g.add(monitor);
  const pant = new THREE.Mesh(new THREE.PlaneGeometry(1.08, 0.63), new THREE.MeshStandardMaterial({ color: "#9cc5f0", emissive: "#6fa6e6", emissiveIntensity: 0.5 })); pant.position.set(1.985, 2.0, -1.55); pant.rotation.y = -0.35; g.add(pant);
  const pieM = caja(0.1, 0.35, 0.1, mat("#1c2433", 0.4), 0); pieM.position.set(2.02, 1.53, -1.65); g.add(pieM);
  for (let i = 0; i < 5; i++) { const h = caja(0.8, 0.02, 0.6, mat(i % 2 ? "#ffffff" : "#f3efe6", 0.9), 0); h.position.set(-0.2, 1.37 + i * 0.022, -1.5); h.rotation.y = 0.05 * (i - 2); g.add(h); }
  const arch = caja(1.0, 2.2, 0.9, mat("#9aa8ba", 0.5), 0.03); arch.position.set(-3.6, 1.1, -2.6); g.add(arch);
  for (const y of [0.55, 1.25, 1.95]) { const t = caja(0.4, 0.07, 0.05, mat("#e1e7ef", 0.3), 0.02); t.position.set(-3.6, y, -2.13); g.add(t); }
  const maceta = sombra(new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.22, 0.5, 24), mat("#f3f3f3", 0.5))); maceta.position.set(4.6, 0.25, -2.2); g.add(maceta);
  for (let i = 0; i < 8; i++) { const h = sombra(new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 12), mat("#4d8a49", 0.8))); h.scale.set(0.6, 1.5, 0.35); const a = (i / 8) * Math.PI * 2; h.position.set(4.6 + Math.cos(a) * 0.25, 0.95 + (i % 3) * 0.25, -2.2 + Math.sin(a) * 0.25); h.rotation.set(Math.sin(a) * 0.5, a, Math.cos(a) * 0.5); g.add(h); }
  return g;
}

// ---------- Atrezo ----------
export function movil() {
  const g = new THREE.Group();
  const cuerpo = caja(0.34, 0.66, 0.05, mat("#1d2330", 0.35), 0.05); g.add(cuerpo);
  const p = lienzo(340, 660, () => {});
  const pantalla = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.6), new THREE.MeshStandardMaterial({ map: p.tex, emissive: "#ffffff", emissiveMap: p.tex, emissiveIntensity: 0.85, roughness: 0.3 }));
  pantalla.position.z = 0.027; g.add(pantalla);
  let estado = null;
  // estados: "inicio" o "ingreso" (notificación del banco), con avance 0..1 para la animación
  g.userData.pantalla = (nuevo, k = 1) => {
    const clave = `${nuevo}-${Math.round(k * 20)}`;
    if (clave === estado) return; estado = clave;
    p.redibujar = p.redibujar || (() => {});
    const ctx = p.ctx, w = 340, h = 660;
    const gr = ctx.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, "#2b4c7e"); gr.addColorStop(1, "#13213b");
    ctx.fillStyle = gr; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#fff"; ctx.textAlign = "center"; ctx.font = `700 64px ${FUENTE}`; ctx.fillText("09:41", w / 2, 120);
    ctx.font = `600 22px ${FUENTE}`; ctx.fillStyle = "rgba(255,255,255,0.8)"; ctx.fillText("lunes, 23 de noviembre", w / 2, 156);
    if (nuevo === "ingreso") {
      const y = 200 + (1 - k) * -60;
      ctx.globalAlpha = Math.min(1, k * 1.5);
      ctx.fillStyle = "rgba(255,255,255,0.95)"; redondeado(ctx, 16, y, w - 32, 170, 26); ctx.fill();
      ctx.fillStyle = "#6fd3a0"; redondeado(ctx, 34, y + 22, 52, 52, 14); ctx.fill();
      ctx.fillStyle = "#0b1220"; ctx.font = `900 34px ${FUENTE}`; ctx.fillText("€", 60, y + 60);
      ctx.textAlign = "left"; ctx.fillStyle = "#13213b"; ctx.font = `800 24px ${FUENTE}`; ctx.fillText("Tu banco", 100, y + 44);
      ctx.fillStyle = "#4a5568"; ctx.font = `600 18px ${FUENTE}`; ctx.fillText("ahora", 100, y + 68);
      ctx.fillStyle = "#13213b"; ctx.font = `800 25px ${FUENTE}`; ctx.fillText("Ingreso recibido:", 34, y + 112);
      ctx.fillStyle = "#1f7a52"; ctx.fillText("pensión + paga extra", 34, y + 146);
      ctx.globalAlpha = 1; ctx.textAlign = "center";
    }
    p.tex.needsUpdate = true;
  };
  g.userData.pantalla("inicio");
  return g;
}

export function calendarioPared(de = ["NOVIEMBRE", "23", "#c24b43"], a = ["DICIEMBRE", "1", "#1f9d6b"]) {
  const g = new THREE.Group();
  const hoja = (mes, dia, color) => lienzo(512, 600, (ctx, w, h) => {
    ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = color; ctx.fillRect(0, 0, w, 150);
    ctx.fillStyle = "#fff"; let fm = 70; ctx.font = `800 ${fm}px ${FUENTE}`; ctx.textAlign = "center"; ctx.textBaseline = "middle"; while (ctx.measureText(mes).width > w - 40 && fm > 30) { fm -= 4; ctx.font = `800 ${fm}px ${FUENTE}`; } ctx.fillText(mes, w / 2, 82);
    ctx.fillStyle = "#13213b"; let fs = 330; ctx.font = `900 ${fs}px ${FUENTE}`; while (ctx.measureText(dia).width > w - 50 && fs > 80) { fs -= 10; ctx.font = `900 ${fs}px ${FUENTE}`; } ctx.fillText(dia, w / 2, 370);
    ctx.fillStyle = "#7d8aa0"; ctx.font = `700 40px ${FUENTE}`; ctx.fillText("2026", w / 2, 548);
  });
  const atras = hoja(...a), frente = hoja(...de);
  const tabla = caja(1.25, 1.55, 0.06, mat("#8a5a3a", 0.5), 0.03); g.add(tabla);
  const fondo = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 1.3), new THREE.MeshStandardMaterial({ map: atras.tex, roughness: 0.9 })); fondo.position.set(0, -0.05, 0.035); g.add(fondo);
  const bisagra = new THREE.Group(); bisagra.position.set(0, 0.6, 0.045); g.add(bisagra);
  const pag = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 1.3), new THREE.MeshStandardMaterial({ map: frente.tex, roughness: 0.9 })); pag.position.y = -0.65; bisagra.add(pag);
  const dorso = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 1.3), mat("#f1ece4", 0.9)); dorso.rotation.y = Math.PI; dorso.position.y = -0.65; bisagra.add(dorso);
  for (const x of [-0.35, 0.35]) { const a = sombra(new THREE.Mesh(new THREE.TorusGeometry(0.05, 0.012, 8, 16), mat("#9aa3ad", 0.3, { metalness: 0.8 }))); a.position.set(x, 0.66, 0.05); g.add(a); }
  g.userData.pasar = (k) => { bisagra.rotation.x = -Math.PI * 0.98 * k; pag.visible = dorso.visible = k < 0.98; };
  return g;
}

export function bocadillo(texto, color = "#13213b") {
  const g = new THREE.Group();
  const l = lienzo(256, 256, (ctx, w, h) => { ctx.fillStyle = color; ctx.font = `900 190px ${FUENTE}`; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(texto, w / 2, h / 2 + 10); });
  const globo = sombra(new THREE.Mesh(new THREE.SphereGeometry(0.42, 32, 24), mat("#ffffff", 0.4))); globo.scale.set(1, 1, 0.6); g.add(globo);
  const sig = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 0.6), new THREE.MeshBasicMaterial({ map: l.tex, transparent: true })); sig.position.z = 0.26; g.add(sig);
  for (const [r, x, y] of [[0.1, -0.32, -0.45], [0.06, -0.45, -0.65]]) { const b = sombra(new THREE.Mesh(new THREE.SphereGeometry(r, 16, 12), mat("#ffffff", 0.4))); b.position.set(x, y, 0); g.add(b); }
  return g;
}

export function lluviaMonedas(n = 40, semilla = 3) {
  const g = new THREE.Group();
  let a = semilla; const rnd = () => { a = (a * 16807) % 2147483647; return a / 2147483647; };
  const geo = new THREE.CylinderGeometry(0.18, 0.18, 0.04, 32), m = new THREE.MeshStandardMaterial({ color: "#f2b93b", metalness: 0.85, roughness: 0.25 });
  const monedas = [];
  for (let i = 0; i < n; i++) {
    const mo = sombra(new THREE.Mesh(geo, m)); g.add(mo);
    monedas.push({ mo, x: (rnd() - 0.5) * 7, z: (rnd() - 0.5) * 2.5 + 0.3, y0: 6 + rnd() * 3, ret: rnd() * 1.2, gx: rnd() * 6, gz: rnd() * 6, suelo: 0.02 + rnd() * 0.05 });
  }
  g.userData.actualizar = (dt) => {
    for (const c of monedas) {
      const tt = dt - c.ret;
      if (tt < 0) { c.mo.visible = false; continue; }
      c.mo.visible = true;
      let y = c.y0 - 4.9 * tt * tt * 1.4, rot = tt;
      if (y < c.suelo) { const tc = Math.sqrt((c.y0 - c.suelo) / 6.86), td = tt - tc; y = c.suelo + Math.max(0, 1.2 * td - 4.9 * td * td * 1.4) * 0.5; rot = tc; }
      c.mo.position.set(c.x, y, c.z);
      c.mo.rotation.set(c.gx * rot * 2 + (y <= c.suelo + 0.01 ? Math.PI / 2 - c.gx * rot * 2 : 0), 0, c.gz * rot * 2);
      if (y <= c.suelo + 0.01) c.mo.rotation.set(0, c.gx, 0);
    }
  };
  return g;
}

export function carpeta(etiqueta = "Expediente", marcaTexto = "✓ EN CURSO", marcaColor = "#1f9d6b") {
  const g = new THREE.Group();
  const l = lienzo(512, 360, (ctx, w, h) => {
    ctx.fillStyle = "#f2c66d"; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#ffffff"; redondeado(ctx, 60, 60, w - 120, 110, 16); ctx.fill();
    ctx.fillStyle = "#13213b"; ctx.font = `800 ${etiqueta.length > 14 ? 40 : 54}px ${FUENTE}`; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(etiqueta, w / 2, 117);
  });
  const tapa = sombra(new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.06, 0.78), [mat("#e2b259"), mat("#e2b259"), new THREE.MeshStandardMaterial({ map: l.tex, roughness: 0.8 }), mat("#e2b259"), mat("#e2b259"), mat("#e2b259")]));
  g.add(tapa);
  // Marca del sello (aparece al sellar)
  const marca = lienzo(512, 256, (ctx, w, h) => {
    ctx.strokeStyle = marcaColor; ctx.lineWidth = 16; redondeado(ctx, 20, 20, w - 40, h - 40, 30); ctx.stroke();
    ctx.fillStyle = marcaColor; ctx.font = `900 ${marcaTexto.length > 11 ? 70 : 84}px ${FUENTE}`; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(marcaTexto, w / 2, h / 2 + 6);
  });
  const sello = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 0.4), new THREE.MeshBasicMaterial({ map: marca.tex, transparent: true }));
  sello.rotation.x = -Math.PI / 2; sello.rotation.z = 0.12; sello.position.set(0, 0.035, 0.12); sello.visible = false; g.add(sello);
  g.userData.sellar = (v) => { sello.visible = v; };
  return g;
}

export function sello() {
  const g = new THREE.Group();
  const base = caja(0.7, 0.16, 0.42, mat("#2f3540", 0.5), 0.03); g.add(base);
  const goma = caja(0.66, 0.05, 0.38, mat("#1f9d6b", 0.6), 0.01); goma.position.y = -0.1; g.add(goma);
  const mango = sombra(new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.5, 20), mat("#8a5a3a", 0.5))); mango.position.y = 0.33; g.add(mango);
  const pomo = sombra(new THREE.Mesh(new THREE.SphereGeometry(0.17, 24, 16), mat("#c24b43", 0.4))); pomo.position.y = 0.66; g.add(pomo);
  return g;
}

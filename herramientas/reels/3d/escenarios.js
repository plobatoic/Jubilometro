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
export function salon() {
  const g = new THREE.Group();
  const madera = lienzo(1024, 1024, (ctx, w, h) => {
    ctx.fillStyle = "#d7b48a"; ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 16; i++) { ctx.fillStyle = i % 2 ? "#cfa97c" : "#dbb98f"; ctx.fillRect(0, i * 64, w, 62); ctx.fillStyle = "rgba(90,60,30,0.25)"; ctx.fillRect(0, i * 64 + 62, w, 2); ctx.fillRect((i * 337) % w, i * 64, 2, 64); }
  });
  madera.tex.wrapS = madera.tex.wrapT = THREE.RepeatWrapping; madera.tex.repeat.set(3, 3);
  const suelo = new THREE.Mesh(new THREE.PlaneGeometry(24, 24), new THREE.MeshStandardMaterial({ map: madera.tex, roughness: 0.75 }));
  suelo.rotation.x = -Math.PI / 2; suelo.receiveShadow = true; g.add(suelo);
  const pared = sombra(new THREE.Mesh(new THREE.PlaneGeometry(24, 10), mat("#f4e4cf", 0.95))); pared.position.set(0, 5, -3.2); g.add(pared);
  const zocalo = caja(24, 0.9, 0.08, mat("#e6cfb1", 0.8), 0); zocalo.position.set(0, 0.45, -3.15); g.add(zocalo);
  const moldura = caja(24, 0.06, 0.1, mat("#ffffff", 0.6), 0); moldura.position.set(0, 0.92, -3.13); g.add(moldura);
  const lateral = sombra(new THREE.Mesh(new THREE.PlaneGeometry(10, 10), mat("#efdcc4", 0.95))); lateral.rotation.y = Math.PI / 2; lateral.position.set(-5.5, 5, 1.8); g.add(lateral);
  // Ventana con luz
  const marco = caja(2.2, 2.6, 0.12, mat("#ffffff", 0.5), 0.03); marco.position.set(-2.6, 3.0, -3.12); g.add(marco);
  const cristal = new THREE.Mesh(new THREE.PlaneGeometry(1.95, 2.35), new THREE.MeshStandardMaterial({ color: "#cfe6ff", emissive: "#bfe0ff", emissiveIntensity: 0.9 })); cristal.position.set(-2.6, 3.0, -3.04); g.add(cristal);
  for (const [w, h, x, y] of [[0.07, 2.35, -2.6, 3.0], [1.95, 0.07, -2.6, 3.0]]) { const b = caja(w, h, 0.05, mat("#ffffff", 0.5), 0); b.position.set(x, y, -3.0); g.add(b); }
  const cortina = sombra(new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.45, 3.0, 20, 1, true), mat("#e9a23b", 0.9))); cortina.material.side = THREE.DoubleSide; cortina.position.set(-1.25, 2.7, -2.95); cortina.scale.z = 0.35; g.add(cortina);
  // Sofá
  const tela = mat("#4f8f8b", 0.95);
  const asiento = caja(3.2, 0.55, 1.2, tela, 0.15); asiento.position.set(3.2, 0.62, -2.35); g.add(asiento);
  const respaldo = caja(3.2, 1.1, 0.4, tela, 0.18); respaldo.position.set(3.2, 1.25, -2.85); g.add(respaldo);
  for (const x of [1.55, 4.85]) { const b = caja(0.35, 0.85, 1.25, tela, 0.15); b.position.set(x, 0.85, -2.35); g.add(b); }
  for (const x of [2.5, 3.9]) { const coj = caja(0.75, 0.6, 0.22, mat("#f0c26a", 0.95), 0.12); coj.position.set(x, 1.25, -2.55); coj.rotation.z = x < 3 ? 0.12 : -0.1; g.add(coj); }
  // Mesita con lámpara
  const mesa = sombra(new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 0.06, 32), mat("#8a5a3a", 0.5))); mesa.position.set(-4.0, 1.1, -2.2); g.add(mesa);
  const pata = sombra(new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.08, 1.1, 12), mat("#6d4529", 0.5))); pata.position.set(-4.0, 0.55, -2.2); g.add(pata);
  const pie = sombra(new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.12, 0.6, 16), mat("#f3e3c3", 0.4))); pie.position.set(-4.0, 1.43, -2.2); g.add(pie);
  const pantalla = sombra(new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.4, 0.45, 24, 1, true), new THREE.MeshStandardMaterial({ color: "#fff1d6", emissive: "#ffd9a0", emissiveIntensity: 0.6, side: THREE.DoubleSide }))); pantalla.position.set(-4.0, 1.9, -2.2); g.add(pantalla);
  // Planta
  const maceta = sombra(new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.26, 0.6, 24), mat("#c8693e", 0.7))); maceta.position.set(5.6, 0.3, -2.0); g.add(maceta);
  for (let i = 0; i < 9; i++) { const h = sombra(new THREE.Mesh(new THREE.SphereGeometry(0.32, 16, 12), mat(i % 2 ? "#5f9e58" : "#4d8a49", 0.8))); h.scale.set(0.7, 1.4, 0.4); const a = (i / 9) * Math.PI * 2; h.position.set(5.6 + Math.cos(a) * 0.3, 1.0 + (i % 3) * 0.3, -2.0 + Math.sin(a) * 0.3); h.rotation.set(Math.sin(a) * 0.5, a, Math.cos(a) * 0.5); g.add(h); }
  // Alfombra
  const alf = new THREE.Mesh(new THREE.CircleGeometry(2.6, 48), mat("#e8d6bf", 1)); alf.rotation.x = -Math.PI / 2; alf.position.set(0.3, 0.01, 0.4); alf.receiveShadow = true; g.add(alf);
  const alf2 = new THREE.Mesh(new THREE.RingGeometry(2.2, 2.35, 64), mat("#c9705c", 1)); alf2.rotation.x = -Math.PI / 2; alf2.position.set(0.3, 0.015, 0.4); g.add(alf2);
  // Cuadro
  const cuadro = lienzo(512, 384, (ctx, w, h) => {
    const gr = ctx.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, "#9fc9ea"); gr.addColorStop(1, "#f6d9a8"); ctx.fillStyle = gr; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#6aa36a"; ctx.beginPath(); ctx.moveTo(0, h); ctx.quadraticCurveTo(w * 0.3, h * 0.45, w * 0.6, h * 0.7); ctx.quadraticCurveTo(w * 0.8, h * 0.55, w, h * 0.65); ctx.lineTo(w, h); ctx.fill();
    ctx.fillStyle = "#ffd36b"; ctx.beginPath(); ctx.arc(w * 0.75, h * 0.3, 40, 0, 7); ctx.fill();
  });
  const marcoC = caja(1.5, 1.15, 0.08, mat("#8a5a3a", 0.5), 0.02); marcoC.position.set(3.2, 3.1, -3.12); g.add(marcoC);
  const lam = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 0.95), new THREE.MeshStandardMaterial({ map: cuadro.tex, roughness: 0.9 })); lam.position.set(3.2, 3.1, -3.07); g.add(lam);
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

export function calendarioPared() {
  const g = new THREE.Group();
  const hoja = (mes, dia, color) => lienzo(512, 600, (ctx, w, h) => {
    ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = color; ctx.fillRect(0, 0, w, 150);
    ctx.fillStyle = "#fff"; ctx.font = `800 70px ${FUENTE}`; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(mes, w / 2, 82);
    ctx.fillStyle = "#13213b"; ctx.font = `900 330px ${FUENTE}`; ctx.fillText(dia, w / 2, 370);
    ctx.fillStyle = "#7d8aa0"; ctx.font = `700 40px ${FUENTE}`; ctx.fillText("2026", w / 2, 548);
  });
  const atras = hoja("DICIEMBRE", "1", "#1f9d6b"), frente = hoja("NOVIEMBRE", "23", "#c24b43");
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

export function carpeta(etiqueta = "Expediente") {
  const g = new THREE.Group();
  const l = lienzo(512, 360, (ctx, w, h) => {
    ctx.fillStyle = "#f2c66d"; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#ffffff"; redondeado(ctx, 60, 60, w - 120, 110, 16); ctx.fill();
    ctx.fillStyle = "#13213b"; ctx.font = `800 54px ${FUENTE}`; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(etiqueta, w / 2, 117);
  });
  const tapa = sombra(new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.06, 0.78), [mat("#e2b259"), mat("#e2b259"), new THREE.MeshStandardMaterial({ map: l.tex, roughness: 0.8 }), mat("#e2b259"), mat("#e2b259"), mat("#e2b259")]));
  g.add(tapa);
  // Marca del sello (aparece al sellar)
  const marca = lienzo(512, 256, (ctx, w, h) => {
    ctx.strokeStyle = "#1f9d6b"; ctx.lineWidth = 16; redondeado(ctx, 20, 20, w - 40, h - 40, 30); ctx.stroke();
    ctx.fillStyle = "#1f9d6b"; ctx.font = `900 84px ${FUENTE}`; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText("✓ EN CURSO", w / 2, h / 2 + 6);
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

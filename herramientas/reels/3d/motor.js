// Motor de las escenas 3D de un reel. Lo carga motor.html; fondo3d.mjs llama a __init3d(datos) y luego a __frame3d(t)
// para cada fotograma. Cada escena del reel puede llevar `animacion` (ver herramientas/reels/README.md, «Muñecos 3D»).
import * as THREE from "three";
import { crearPersonaje, aplicar, POSES, CARAS, mezclarPose, mezclarCara } from "./personajes.js";
import { salon, oficina, movil, calendarioPared, bocadillo, lluviaMonedas, carpeta, sello } from "./escenarios.js";

const W = 1080, H = 1920;
const SETS = { salon: { x: 0, crear: salon, fondo: "#f4e4cf" }, oficina: { x: 60, crear: oficina, fondo: "#dfe9f2" } };
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const suave = (x) => { x = clamp(x); return x * x * (3 - 2 * x); };
const salida = (x) => { x = clamp(x); return 1 - Math.pow(1 - x, 3); };
const rebote = (x) => { x = clamp(x); const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };
const v3 = (a) => new THREE.Vector3(...a);

let r, mundo, cam, sol, D, escenas = [], actores = {};
const tmp = new THREE.Vector3();

window.__init3d = (datos) => {
  D = datos;
  r = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
  r.setPixelRatio(1); r.setSize(W, H);
  r.shadowMap.enabled = true; r.shadowMap.type = THREE.PCFSoftShadowMap;
  r.toneMapping = THREE.ACESFilmicToneMapping; r.toneMappingExposure = 1.05; r.outputColorSpace = THREE.SRGBColorSpace;
  document.body.appendChild(r.domElement);
  mundo = new THREE.Scene();
  cam = new THREE.PerspectiveCamera(30, W / H, 0.1, 200);
  mundo.add(new THREE.HemisphereLight("#fff7ec", "#b9a58c", 1.25));
  sol = new THREE.DirectionalLight("#fff0d8", 2.6); sol.castShadow = true; sol.shadow.mapSize.set(2048, 2048);
  Object.assign(sol.shadow.camera, { left: -7, right: 7, top: 7, bottom: -3, near: 0.5, far: 40 }); sol.shadow.radius = 5; sol.shadow.bias = -0.0004;
  mundo.add(sol, sol.target);
  const relleno = new THREE.DirectionalLight("#cfe0ff", 0.7); relleno.position.set(-6, 4, 6); mundo.add(relleno);
  const contra = new THREE.DirectionalLight("#ffe2b8", 1.1); contra.position.set(2, 6, -8); mundo.add(contra);
  for (const [k, s] of Object.entries(SETS)) { const g = s.crear(); g.position.x = s.x; mundo.add(g); }
  for (const n of ["rosa", "luis"]) { actores[n] = crearPersonaje(n); actores[n].raiz.visible = false; mundo.add(actores[n].raiz); }

  // Atrezo de cada escena
  escenas = D.escenas.map((e) => {
    const a = e.animacion;
    if (!a) return { ...e };
    const ox = SETS[a.set || "salon"].x;
    const props = (a.atrezo || []).map((p) => {
      let obj;
      if (p.tipo === "movil") obj = movil();
      else if (p.tipo === "calendarioPared") obj = calendarioPared();
      else if (p.tipo === "bocadillo") obj = bocadillo(p.texto || "?", p.color);
      else if (p.tipo === "monedas") obj = lluviaMonedas(p.n || 40, p.semilla || 3);
      else if (p.tipo === "carpeta") obj = carpeta(p.texto);
      else if (p.tipo === "sello") obj = sello();
      obj.visible = false;
      if (p.pos) obj.position.set(ox + p.pos[0], p.pos[1], p.pos[2]);
      if (p.giro) obj.rotation.y = (p.giro * Math.PI) / 180;
      if (p.tipo === "monedas") obj.position.set(ox, 0, 0);
      mundo.add(obj);
      return { ...p, obj };
    });
    return { ...e, ox, props };
  });
  window.__listo3d = true;
};

// Estado de un actor en el instante t según la escena
function estadoActor(spec, t, ini) {
  let pos = [...spec.pos], giro = spec.giro || 0;
  let poseA = spec.pose || "reposo", poseB = poseA, tPose = -99;
  let caraA = spec.cara || "neutra", caraB = caraA, tCara = -99;
  let anda = false, extra = {};
  const acc = [...(spec.acciones || [])].sort((x, y) => x.t - y.t);
  for (const a of acc) {
    if (a.t > t) break;
    if (a.pose) { poseA = poseB; poseB = a.pose; tPose = a.t; }
    if (a.cara) { caraA = caraB; caraB = a.cara; tCara = a.t; }
    if (a.mueve) {
      const dur = a.dur || 1.2, k = clamp((t - a.t) / dur);
      const desde = [...pos];
      pos = [desde[0] + (a.mueve[0] - desde[0]) * suave(k), desde[1] + (a.mueve[1] - desde[1]) * suave(k)];
      if (k < 1) { anda = true; giro = (Math.atan2(a.mueve[0] - desde[0], a.mueve[1] - desde[1]) * 180) / Math.PI; }
      else if (a.giroFinal !== undefined) giro = a.giroFinal;
    }
    if (a.gira !== undefined) giro = a.gira;
    if (a.bote !== undefined) extra.bote = a.bote;
  }
  const pose = mezclarPose(POSES[poseA], POSES[poseB], (t - tPose) / 0.45);
  const cara = mezclarCara(CARAS[caraA], CARAS[caraB], (t - tCara) / 0.3);
  if (poseB === "saluda") extra.saludo = true;
  if (poseB === "celebra") { extra.celebra = true; extra.bote = extra.bote ?? true; }
  if (poseB === "pulgar") extra.pulgar = true;
  return { pos, giro, pose, cara, anda, extra };
}

window.__frame3d = (t) => {
  const e = escenas.find((x) => t >= x.ini && t < x.fin) || escenas.at(-1);
  const a = e.animacion;
  for (const x of escenas) for (const p of x.props || []) p.obj.visible = false;
  for (const n in actores) actores[n].raiz.visible = false;
  if (!a) { r.render(mundo, cam); return; }
  const ox = e.ox, t0 = Math.max(0, e.ini);
  mundo.background = new THREE.Color(SETS[a.set || "salon"].fondo);
  sol.position.set(ox + 4, 8, 6); sol.target.position.set(ox, 0, -1);

  // Actores
  for (const [n, spec] of Object.entries(a.actores || {})) {
    const p = actores[n], s = estadoActor(spec, t, t0);
    p.raiz.visible = true;
    p.raiz.position.set(ox + s.pos[0], 0, s.pos[1]);
    p.raiz.rotation.y = (s.giro * Math.PI) / 180;
    aplicar(p, s.pose, s.cara, t, { ...s.extra, anda: s.anda });
  }
  mundo.updateMatrixWorld(true);

  // Cámara: de `desde` a `hasta` con frenada suave y un pulso de cámara en mano
  const c = a.camara, dur = c.dur || Math.max(0.5, e.fin - t0), k = salida((t - t0) / dur);
  const pos = v3(c.desde.pos).lerp(v3(c.hasta?.pos || c.desde.pos), k);
  const mira = v3(c.desde.mira).lerp(v3(c.hasta?.mira || c.desde.mira), k);
  pos.x += ox + 0.03 * Math.sin(t * 1.3); pos.y += 0.025 * Math.sin(t * 1.7 + 1); mira.x += ox;
  cam.position.copy(pos); cam.lookAt(mira);
  if (c.fov) { cam.fov = c.fov; cam.updateProjectionMatrix(); }

  // Atrezo
  for (const p of e.props) {
    const o = p.obj, dt = t - (p.t ?? t0);
    if (p.tipo === "movil") {
      o.visible = true;
      const mano = actores[p.quien].bD.mano; mano.getWorldPosition(tmp);
      o.position.copy(tmp).add(new THREE.Vector3(0, 0.22, 0.08));
      o.lookAt(cam.position); o.rotateX(p.inclina ?? -0.15);
      const ing = (p.pantallas || []).filter((x) => x.t <= t).at(-1);
      o.userData.pantalla(ing ? ing.estado : "inicio", ing ? clamp((t - ing.t) / 0.5) : 1);
    } else if (p.tipo === "bocadillo") {
      if (dt < 0 || (p.hasta !== undefined && t > p.hasta + 0.25)) continue;
      o.visible = true;
      const cab = actores[p.quien].cabeza; cab.getWorldPosition(tmp);
      o.position.copy(tmp).add(new THREE.Vector3(0.75, 0.95 + 0.05 * Math.sin(t * 3), 0.2));
      const sal = p.hasta !== undefined ? 1 - clamp((t - p.hasta) / 0.25) : 1;
      o.scale.setScalar(Math.max(0.001, rebote(dt / 0.45) * sal));
      o.lookAt(cam.position);
    } else if (p.tipo === "calendarioPared") {
      o.visible = true; o.userData.pasar(dt < 0 ? 0 : salida(dt / 0.9));
    } else if (p.tipo === "monedas") {
      if (dt < 0) continue;
      o.visible = true; o.userData.actualizar(dt);
    } else if (p.tipo === "carpeta") {
      o.visible = true; o.userData.sellar(p.t !== undefined && t >= p.t);
    } else if (p.tipo === "sello") {
      o.visible = dt > -0.9 && dt < 1.2;
      const baja = dt < 0 ? 1 - suave((dt + 0.6) / 0.6) : suave((dt - 0.3) / 0.6);
      o.position.y = p.pos[1] + 0.1 + baja * 1.6;
      o.rotation.z = 0.12;
    }
  }
  r.render(mundo, cam);
};

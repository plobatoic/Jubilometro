// Personajes de Jubilómetro en 3D, hechos solo con código (three.js). Estilo muñeco de juguete: cabeza grande,
// colores cálidos y movimientos tranquilos. Cada personaje tiene un esqueleto sencillo (torso, cabeza, brazos con codo,
// piernas), poses con nombre que se mezclan suavemente y expresiones de cara.
import * as THREE from "three";

const mat = (color, rough = 0.6, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, ...extra });
const sombra = (m) => { m.castShadow = true; m.receiveShadow = true; return m; };
const esfera = (r, m, ws = 32, hs = 24) => sombra(new THREE.Mesh(new THREE.SphereGeometry(r, ws, hs), m));
const capsula = (r, l, m) => sombra(new THREE.Mesh(new THREE.CapsuleGeometry(r, l, 10, 24), m));

export const REPARTO = {
  rosa: { tipo: "mujer", piel: "#f2c7a5", mejillas: "#f09a88", pelo: "#e6e1d8", ropa: "#d4574e", ropa2: "#34445f", cuello: "#fbf6ee", zapato: "#4a2f25", gafas: "#8a5a3a", bolsa: false },
  luis: { tipo: "hombre", piel: "#e8b993", mejillas: "#e59a82", pelo: "#c9c4bc", ropa: "#d9a441", ropa2: "#4a5568", cuello: "#f4f7fb", zapato: "#2f2a28", gafas: "#2f3540", bigote: true },
};

// Ángulos de cada pose: hombros (x adelante, z hacia fuera), codos (x), cabeza y torso.
const P = (o) => ({ hIx: 0, hIz: -0.12, hDx: 0, hDz: 0.12, cI: -0.15, cD: -0.15, cbx: 0, cby: 0, cbz: 0, tx: 0, ty: 0, ...o });
export const POSES = {
  reposo: P({}),
  saluda: P({ hDz: 2.55, hDx: -0.15, cD: -0.35 }),
  senala: P({ hDz: 1.25, hDx: -0.55, cD: -0.05, cby: -0.25 }),
  senalaArriba: P({ hDz: 2.2, hDx: -0.5, cD: -0.1, cby: -0.2, cbx: -0.15 }),
  pulgar: P({ hDx: -1.15, hDz: 0.35, cD: -1.35, cbz: -0.06 }),
  celebra: P({ hIz: -2.6, hDz: 2.6, cI: -0.3, cD: -0.3, cbx: -0.12 }),
  piensa: P({ hDx: -0.85, hDz: 0.42, cD: -2.35, cbz: 0.16, cbx: 0.06 }),
  encoge: P({ hIz: -0.55, hDz: 0.55, hIx: -0.3, hDx: -0.3, cI: -1.1, cD: -1.1, cbz: 0.1 }),
  movil: P({ hDx: -0.95, hDz: 0.12, cD: -1.25, cbx: 0.32, cby: -0.12 }),
  movilEnsena: P({ hDx: -1.45, hDz: 0.25, cD: -0.25, cbx: 0.05, cbz: -0.05 }),
  carpeta: P({ hIx: -0.75, hIz: -0.18, hDx: -0.75, hDz: 0.18, cI: -1.05, cD: -1.05, cbx: 0.2 }),
  brazosArriba: P({ hIz: -2.3, hDz: 2.3, hIx: -0.4, hDx: -0.4, cI: -0.6, cD: -0.6 }),
};

// Expresiones: cejas (altura y giro), sonrisa (+ sonríe, − preocupa) y boca abierta.
export const CARAS = {
  neutra: { cejaY: 0, cejaR: 0, sonrisa: 0.35, abierta: 0 },
  feliz: { cejaY: 0.03, cejaR: -0.08, sonrisa: 1, abierta: 0.15 },
  preocupada: { cejaY: 0.04, cejaR: 0.32, sonrisa: -0.7, abierta: 0 },
  sorpresa: { cejaY: 0.08, cejaR: -0.05, sonrisa: 0, abierta: 0.9 },
  contenta: { cejaY: 0.02, cejaR: -0.04, sonrisa: 0.8, abierta: 0 },
};

export function crearPersonaje(nombre) {
  const c = REPARTO[nombre];
  const raiz = new THREE.Group(); raiz.name = nombre;
  const piel = mat(c.piel, 0.55), ropa = mat(c.ropa, 0.85), ropa2 = mat(c.ropa2, 0.85), pelo = mat(c.pelo, 0.75), oscuro = mat("#1f1a17", 0.3);
  const cadera = new THREE.Group(); cadera.position.y = 0.92; raiz.add(cadera);

  // Piernas
  const piernas = [];
  for (const x of [-0.19, 0.19]) {
    const g = new THREE.Group(); g.position.set(x, 0.02, 0); cadera.add(g);
    const pierna = capsula(0.135, 0.5, c.tipo === "hombre" ? ropa2 : piel); pierna.position.y = -0.4; g.add(pierna);
    const zap = esfera(0.17, mat(c.zapato, 0.45)); zap.scale.set(1, 0.55, 1.45); zap.position.set(0, -0.83, 0.07); g.add(zap);
    piernas.push(g);
  }
  // Torso
  const torso = new THREE.Group(); cadera.add(torso);
  const cuerpo = capsula(0.5, 0.5, ropa); cuerpo.scale.set(1, 1, 0.84); cuerpo.position.y = 0.5; torso.add(cuerpo);
  if (c.tipo === "mujer") {
    const falda = sombra(new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.66, 0.62, 40, 1, true), ropa2));
    falda.material.side = THREE.DoubleSide; falda.position.y = -0.08; torso.add(falda);
    const cierre = sombra(new THREE.Mesh(new THREE.CircleGeometry(0.66, 40), ropa2)); cierre.rotation.x = Math.PI / 2; cierre.position.y = -0.39; torso.add(cierre);
  } else {
    const cinturon = sombra(new THREE.Mesh(new THREE.CylinderGeometry(0.49, 0.49, 0.1, 40), mat("#3b2f2a", 0.5))); cinturon.position.y = 0.06; torso.add(cinturon);
    const pant = sombra(new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.42, 0.3, 40), ropa2)); pant.position.y = -0.1; torso.add(pant);
  }
  // Rebeca o jersey: tira delantera, botones y cuello de camisa
  const tira = sombra(new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.85, 0.05), mat(new THREE.Color(c.ropa).multiplyScalar(0.8), 0.85)));
  tira.position.set(0, 0.48, 0.42); torso.add(tira);
  if (c.tipo === "mujer") for (const y of [0.25, 0.48, 0.71]) { const b = esfera(0.035, mat("#f3e3c3", 0.3), 12, 8); b.position.set(0, y, 0.45); torso.add(b); }
  for (const s of [-1, 1]) {
    const solapa = sombra(new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.22, 3), mat(c.cuello, 0.6)));
    solapa.rotation.set(Math.PI, 0, s * 0.5); solapa.position.set(s * 0.1, 0.98, 0.31); torso.add(solapa);
  }
  const cuello = sombra(new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.17, 0.2, 24), piel)); cuello.position.y = 1.08; torso.add(cuello);

  // Brazos (hombro → codo → mano)
  const brazo = (lado) => {
    const hombro = new THREE.Group(); hombro.position.set(0.52 * lado, 0.9, 0); torso.add(hombro);
    const sup = capsula(0.13, 0.3, ropa); sup.position.y = -0.24; hombro.add(sup);
    const codo = new THREE.Group(); codo.position.y = -0.46; hombro.add(codo);
    const ante = capsula(0.12, 0.28, ropa); ante.position.y = -0.2; codo.add(ante);
    const puno = sombra(new THREE.Mesh(new THREE.CylinderGeometry(0.125, 0.125, 0.06, 20), mat(c.cuello, 0.6))); puno.position.y = -0.39; codo.add(puno);
    const mano = new THREE.Group(); mano.position.y = -0.5; codo.add(mano);
    const palma = esfera(0.14, piel); palma.scale.set(1, 1.08, 0.82); mano.add(palma);
    const pulgar = capsula(0.045, 0.08, piel); pulgar.position.set(-0.1 * lado, 0.05, 0.06); pulgar.rotation.z = 0.6 * lado; mano.add(pulgar);
    return { hombro, codo, mano, pulgar };
  };
  const bI = brazo(-1), bD = brazo(1);

  // Cabeza
  const cabeza = new THREE.Group(); cabeza.position.y = 1.62; torso.add(cabeza);
  const craneo = esfera(0.58, piel, 48, 36); craneo.scale.set(1, 0.97, 0.94); cabeza.add(craneo);
  for (const s of [-1, 1]) { const oreja = esfera(0.11, piel); oreja.scale.set(0.5, 1, 0.8); oreja.position.set(0.57 * s, -0.02, -0.02); cabeza.add(oreja); }
  if (c.tipo === "mujer") {
    const casco = sombra(new THREE.Mesh(new THREE.SphereGeometry(0.62, 48, 36, 0, Math.PI * 2, 0, Math.PI * 0.52), pelo));
    casco.scale.set(1, 1, 0.98); casco.position.set(0, 0.03, -0.05); casco.rotation.x = -0.22; cabeza.add(casco);
    const nuca = esfera(0.55, pelo); nuca.scale.set(1.08, 0.95, 0.7); nuca.position.set(0, -0.08, -0.22); cabeza.add(nuca);
    const mono = esfera(0.25, pelo); mono.position.set(0, 0.55, -0.3); cabeza.add(mono);
    const goma = sombra(new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.035, 10, 24), mat("#c24b43", 0.5))); goma.position.set(0, 0.42, -0.24); goma.rotation.x = 1.0; cabeza.add(goma);
    for (let i = -2; i <= 2; i++) { const f = esfera(0.16, pelo, 20, 14); f.scale.set(1.2, 0.7, 0.8); f.position.set(i * 0.17, 0.4 - Math.abs(i) * 0.05, 0.4 - Math.abs(i) * 0.05); cabeza.add(f); }
  } else {
    const lados = sombra(new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.13, 16, 40, Math.PI * 1.25), pelo));
    lados.rotation.set(Math.PI / 2 + 0.25, 0, Math.PI * 0.375 + Math.PI); lados.position.set(0, -0.05, -0.05); lados.rotation.z = -Math.PI * 0.125; cabeza.add(lados);
    lados.rotation.set(Math.PI / 2 + 0.1, 0, Math.PI - Math.PI * 0.125 + Math.PI * 0.5);
    for (const s of [-1, 1]) { const p = esfera(0.17, pelo, 20, 14); p.scale.set(0.7, 1.1, 1); p.position.set(0.52 * s, 0.05, -0.08); cabeza.add(p); }
  }
  // Ojos, cejas, nariz, mejillas, boca y gafas
  const ojos = [], cejas = [];
  for (const s of [-1, 1]) {
    const ojo = esfera(0.075, oscuro, 24, 16); ojo.position.set(0.19 * s, 0.04, 0.53); cabeza.add(ojo); ojos.push(ojo);
    const brillo = new THREE.Mesh(new THREE.SphereGeometry(0.022, 12, 8), mat("#ffffff", 0.1)); brillo.position.set(0.19 * s + 0.025, 0.075, 0.598); cabeza.add(brillo); ojos.push(brillo);
    const ceja = capsula(0.025, 0.12, mat(new THREE.Color(c.pelo).multiplyScalar(0.72), 0.7)); ceja.rotation.z = Math.PI / 2;
    const cg = new THREE.Group(); cg.position.set(0.19 * s, 0.24, 0.53); cg.add(ceja); cg.userData.s = s; cabeza.add(cg); cejas.push(cg);
    const mej = new THREE.Mesh(new THREE.SphereGeometry(0.09, 16, 12), mat(c.mejillas, 0.9)); mej.scale.set(1, 0.6, 0.25); mej.position.set(0.31 * s, -0.12, 0.49); cabeza.add(mej);
    const lente = sombra(new THREE.Mesh(new THREE.TorusGeometry(0.135, 0.017, 10, 36), mat(c.gafas, 0.35))); lente.position.set(0.19 * s, 0.05, 0.57); cabeza.add(lente);
    const patilla = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.5, 6), mat(c.gafas, 0.35)); patilla.rotation.x = Math.PI / 2; patilla.position.set(0.32 * s, 0.07, 0.33); cabeza.add(patilla);
  }
  const puente = new THREE.Mesh(new THREE.CylinderGeometry(0.013, 0.013, 0.11, 8), mat(c.gafas, 0.35)); puente.rotation.z = Math.PI / 2; puente.position.set(0, 0.08, 0.6); cabeza.add(puente);
  const nariz = esfera(0.075, mat(new THREE.Color(c.piel).multiplyScalar(0.93), 0.55), 20, 14); nariz.position.set(0, -0.06, 0.58); cabeza.add(nariz);
  if (c.bigote) { const big = capsula(0.06, 0.2, pelo); big.rotation.z = Math.PI / 2; big.position.set(0, -0.17, 0.55); cabeza.add(big); }
  const boca = new THREE.Group(); boca.position.set(0, c.bigote ? -0.29 : -0.25, 0.535); cabeza.add(boca);
  const sonrisa = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.018, 8, 24, Math.PI), mat("#7a2a2a", 0.5)); sonrisa.rotation.z = Math.PI; boca.add(sonrisa);
  const abierta = new THREE.Mesh(new THREE.SphereGeometry(0.085, 24, 16), mat("#6e1f22", 0.5)); abierta.scale.set(1, 0.01, 0.4); boca.add(abierta);
  const lengua = new THREE.Mesh(new THREE.SphereGeometry(0.05, 16, 12), mat("#d9706d", 0.6)); lengua.scale.set(1, 0.5, 0.4); lengua.position.set(0, -0.035, 0.015); abierta.add(lengua);

  return { nombre, raiz, cadera, torso, cabeza, piernas, bI, bD, ojos, cejas, boca, sonrisa, abierta, cfg: c };
}

const lerp = (a, b, k) => a + (b - a) * k;
const suave = (x) => { x = Math.min(1, Math.max(0, x)); return x * x * (3 - 2 * x); };

// Aplica pose y cara ya mezcladas, más los movimientos de vida (respirar, balanceo, parpadeo, saludo).
export function aplicar(p, pose, cara, t, extra = {}) {
  const sem = p.nombre === "rosa" ? 0 : 1.7;
  const respira = Math.sin(t * 2.1 + sem);
  p.torso.scale.set(1, 1 + 0.012 * respira, 1);
  p.torso.rotation.x = pose.tx + 0.015 * respira;
  p.torso.rotation.y = pose.ty;
  p.torso.rotation.z = 0.025 * Math.sin(t * 0.9 + sem);
  const ola = extra.saludo ? Math.sin(t * 9) * 0.35 : 0;
  const bote = extra.bote ? Math.abs(Math.sin(t * 7)) * 0.12 : 0;
  p.raiz.position.y = (extra.y || 0) + bote;
  p.bI.hombro.rotation.set(pose.hIx + 0.03 * Math.sin(t * 1.3 + sem), 0, pose.hIz + (extra.celebra ? 0.15 * Math.sin(t * 8) : 0));
  p.bD.hombro.rotation.set(pose.hDx + 0.03 * Math.sin(t * 1.2 + sem), 0, pose.hDz + ola * 0.5 + (extra.celebra ? 0.15 * Math.sin(t * 8 + 1) : 0));
  p.bI.codo.rotation.x = pose.cI;
  p.bD.codo.rotation.x = pose.cD;
  p.bD.codo.rotation.z = ola * 0.6;
  p.bD.pulgar.rotation.x = extra.pulgar ? -1.4 : 0;
  p.cabeza.rotation.set(pose.cbx + 0.04 * Math.sin(t * 1.1 + sem), pose.cby + 0.06 * Math.sin(t * 0.7 + sem), pose.cbz + 0.035 * Math.sin(t * 1.4 + sem));
  // Cara
  for (const cg of p.cejas) { cg.position.y = 0.24 + cara.cejaY; cg.rotation.z = -cg.userData.s * cara.cejaR; }
  const ab = Math.max(cara.abierta, extra.habla || 0);
  p.abierta.scale.set(1, 0.01 + ab * 0.85, 0.4);
  p.sonrisa.visible = ab < 0.35;
  p.sonrisa.rotation.z = cara.sonrisa >= 0 ? Math.PI : 0;
  p.sonrisa.scale.set(0.7 + 0.5 * Math.abs(cara.sonrisa), 0.4 + 0.8 * Math.abs(cara.sonrisa), 1);
  p.sonrisa.position.y = cara.sonrisa >= 0 ? 0.03 : -0.06;
  const ciclo = (t + sem) % 3.7, parpado = ciclo < 0.13 ? 0.12 : 1;
  for (let i = 0; i < p.ojos.length; i += 2) p.ojos[i].scale.y = parpado;
  // Pasos al andar
  const paso = extra.anda ? Math.sin(t * 9) * 0.45 : 0;
  p.piernas[0].rotation.x = paso; p.piernas[1].rotation.x = -paso;
  if (extra.anda) { p.bI.hombro.rotation.x += -paso * 0.5; p.bD.hombro.rotation.x += paso * 0.5; p.raiz.position.y += Math.abs(Math.sin(t * 9)) * 0.05; }
}

export function mezclarPose(a, b, k) { const o = {}; for (const key in a) o[key] = lerp(a[key], b[key], suave(k)); return o; }
export function mezclarCara(a, b, k) { const o = {}; for (const key in a) o[key] = lerp(a[key], b[key], suave(k)); return o; }

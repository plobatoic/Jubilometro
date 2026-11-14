// Reel 16 · Pensión bruta y neta: lo que te retienen de IRPF
// Fuente: contenido/cuanto-cobrare/pension-bruta-y-neta/articulo.md (rama claude/keen-mccarthy-i7kn75) (+ verificacion-fuentes.md). Formato de muñecos 3D (README, «Muñecos 3D»).
const GUARDAR = `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>`;
const CAM = {
  gancho: { desde: { pos: [-1.2, 2.9, 10.4], mira: [0, 2.85, 0] }, hasta: { pos: [-0.4, 2.8, 8.8], mira: [0, 2.8, 0] } },
  medio: { desde: { pos: [0, 2.9, 8.8], mira: [0, 3.05, 0] }, hasta: { pos: [0, 2.85, 7.9], mira: [0, 3.0, 0] } },
  medio2: { desde: { pos: [1.6, 2.9, 10.6], mira: [0, 2.95, 0] }, hasta: { pos: [1.0, 2.85, 9.6], mira: [0, 2.9, 0] } },
  oficina: { desde: { pos: [0.6, 3.9, 10.6], mira: [0.2, 2.35, -0.6] }, hasta: { pos: [0.5, 3.8, 9.7], mira: [0.2, 2.3, -0.6] } },
  general2: { desde: { pos: [0, 3.0, 12.6], mira: [0, 2.9, 0] }, hasta: { pos: [0, 2.9, 11.2], mira: [0, 2.85, 0] } },
  cal: { desde: { pos: [-0.8, 3.1, 11.4], mira: [0.3, 3.0, -1] }, hasta: { pos: [-0.5, 3.0, 10.4], mira: [0.4, 2.95, -1] } },
  cierre: { desde: { pos: [0.2, 2.9, 12.0], mira: [0, 3.35, 0] }, hasta: { pos: [0.1, 2.9, 11.2], mira: [0, 3.3, 0] } },
};

export default {
  tema: "Pensión bruta y neta",
  estilo: "dinamico",
  velo: "suave",
  musica: "https://cdn.orshot.com/library/music/26e7ebf8-2abd-406c-9eb4-bd33a4ae8d8e.m4a", // «Market update» (116 bpm), Orshot
  musicaBucle: { ini: 2.069, fin: 14.483 },
  volumenMusica: 0.11,
  guion: `¿Tu pensión de [[1.500|mil quinientos]] euros te llega entera al banco? No. La que te reconocen es bruta.

Los pensionistas no pagan Seguridad Social. Lo único que se descuenta es la retención de IRPF.

Si cobras menos de [[16.476|dieciséis mil cuatrocientos setenta y seis]] euros brutos al año, sin hijos a cargo, no te retienen nada.

Pongamos que Rosa, de [[68|sesenta y ocho]] años, cobra [[1.500|mil quinientos]] euros brutos. Le retienen [[138,90|ciento treinta y ocho con noventa]] euros y le llegan [[1.361,10|mil trescientos sesenta y uno con diez]].

Ojo: la retención es un adelanto. Se ajusta en la renta.

Guárdatelo, o pásaselo a un pensionista.`,

  escenas: [
    { clase: "arriba",
      animacion: {
        set: "salon", camara: CAM.gancho,
        actores: { rosa: { pos: [0, 0.4], giro: 8, pose: "movil", cara: "sorpresa", acciones: [{ en: "No", pose: "encoge", cara: "preocupada" }] } },
        atrezo: [{ tipo: "movil", quien: "rosa", pantallas: [{ t: 0.2, estado: "ingreso" }] }, { tipo: "bocadillo", quien: "rosa", texto: "?", t: 0.3, hasta: 2.2 }],
      },
      html: `
        <div class="kicker" data-a="fijo">Pensión bruta y neta</div>
        <div class="titular relieve" data-a="fijo">¿Te llega <span class="ambar">entera</span>?</div>
        <div class="sub" data-en="No" data-a="sube">De 1.500 € brutos, no 👇</div>`,
    },
    { en: "Los pensionistas", clase: "arriba", transicion: "latigo",
      animacion: {
        set: "salon", camara: CAM.medio,
        actores: { luis: { pos: [0, 0.4], giro: 0, pose: "piensa", cara: "neutra", acciones: [{ en: "Lo único", pose: "senala", cara: "contenta" }] } },
      },
      html: `
        <div class="kicker">Qué se descuenta</div>
        <div class="check" data-en="no pagan Seguridad Social" data-a="giro3d"><div class="ok">✓</div><div>Sin cotización a la Seguridad Social</div></div>
        <div class="fila" data-en="la retención de IRPF" data-a="sube"><div class="ico no">%</div><div>Solo la retención de IRPF</div></div>`,
    },
    { en: "Si cobras menos", clase: "arriba", transicion: "zoom",
      animacion: {
        set: "salon", camara: CAM.medio2,
        actores: { rosa: { pos: [0.2, 0.5], giro: -10, pose: "reposo", cara: "contenta", acciones: [{ en: "no te retienen nada", pose: "celebra", cara: "feliz" }] } },
      },
      html: `
        <div class="kicker">Sin hijos a cargo</div>
        <div class="cifra s ambar" data-en="16.476" data-a="pop">16.476 €</div>
        <div class="titular s" data-en="no te retienen nada" data-a="sube">brutos al año o menos: <span class="verde">sin retención</span></div>`,
    },
    { en: "Pongamos que Rosa", clase: "arriba", transicion: "giro",
      animacion: {
        set: "salon", camara: CAM.general2,
        actores: {
          rosa: { pos: [-0.85, 0.5], giro: 12, pose: "reposo", cara: "neutra", acciones: [{ en: "le llegan", pose: "pulgar", cara: "contenta" }] },
          luis: { pos: [0.85, 0.5], giro: -12, pose: "piensa", cara: "neutra", acciones: [{ en: "le llegan", pose: "pulgar", cara: "contenta" }] },
        },
      },
      html: `
        <div class="kicker">Un ejemplo</div>
        <div class="tarjeta" style="zoom:0.9">
          <div class="par" data-en="1.500 euros brutos" data-a="sube"><span>Pensión bruta</span><b>1.500 €</b></div>
          <div class="par" data-en="138,90" data-a="sube"><span>Retención de IRPF</span><b>−138,90 €</b></div>
          <div class="par" data-en="1.361,10" data-a="sube"><span>Neta, al banco</span><b>1.361,10 €</b></div>
        </div>`,
    },
    { en: "Ojo", clase: "arriba", transicion: "latigo",
      animacion: {
        set: "salon", camara: CAM.medio,
        actores: { luis: { pos: [0, 0.4], giro: -6, pose: "senalaArriba", cara: "sorpresa", acciones: [{ en: "Se ajusta en la renta", pose: "pulgar", cara: "contenta" }] } },
        atrezo: [{ tipo: "bocadillo", quien: "luis", texto: "!", color: "#c24b43", en: "Ojo" }],
      },
      html: `
        <div class="kicker">Ojo</div>
        <div class="titular relieve" data-en="es un adelanto" data-a="golpe3d">La retención es <span class="ambar">un adelanto</span></div>
        <div class="sub" data-en="Se ajusta en la renta" data-a="sube">Se ajusta en la declaración de la renta</div>`,
    },
    { en: "Guárdatelo", clase: "arriba", transicion: "sube",
      animacion: {
        set: "salon", camara: CAM.cierre,
        actores: {
          rosa: { pos: [-0.75, 0.6], giro: 8, pose: "saluda", cara: "feliz" },
          luis: { pos: [0.95, 0.3], giro: -10, pose: "pulgar", cara: "feliz" },
        },
      },
      html: `
        <div class="cta">
          <div class="icono" data-a="latido">${GUARDAR}</div>
          <div class="titular m relieve" data-a="sube">Guárdatelo, o pásaselo a <span class="ambar">un pensionista</span></div>
          <div class="url" data-a="sube" data-dur="0.6">Calcula tu neta: jubilometro.com</div>
          <div class="aviso" data-a="aparece">Información general. Ejemplo para 65-74 años, sin hijos ni otras rentas, en 14 pagas, con el Reglamento del IRPF de 2026. Tu retención exacta la calcula la Seguridad Social.</div>
        </div>`,
    },
  ],

  portada: `
    <div class="kicker" data-a="fijo">Pensión bruta y neta</div>
    <div class="titular relieve" data-a="fijo">¿Cuánto <span class="ambar">te llega</span> de verdad?</div>
    <div class="sub" data-a="fijo">El IRPF de tu pensión</div>`,
};

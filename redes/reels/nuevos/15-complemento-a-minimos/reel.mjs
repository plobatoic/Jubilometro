// Reel 15 · Complemento a mínimos: la Seguridad Social completa tu pensión hasta la mínima
// Fuente: contenido/cuanto-cobrare/complemento-a-minimos/articulo.md (rama claude/keen-mccarthy-i7kn75) (+ verificacion-fuentes.md). Formato de muñecos 3D (README, «Muñecos 3D»).
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
  tema: "Complemento a mínimos",
  estilo: "dinamico",
  velo: "suave",
  musica: "https://cdn.orshot.com/library/music/04ccbe32-a3e1-4c80-aa68-879342c36b94.m4a", // «Hopeful» (piano, 88 bpm), Orshot
  musicaBucle: { ini: 2.727, fin: 13.636 },
  volumenMusica: 0.14,
  guion: `¿Tu pensión es baja? La Seguridad Social puede completarla hasta la mínima. Se llama complemento a mínimos.

En [[2026|dos mil veintiséis]], la mínima con [[65|sesenta y cinco]] años y sin cónyuge es de [[936,20|novecientos treinta y seis con veinte]] euros al mes.

Lo cobras si vives en España y tus otros ingresos no pasan de [[9.442|nueve mil cuatrocientos cuarenta y dos]] euros al año.

Pongamos que Luis vive solo, sin otros ingresos, y cobra [[750|setecientos cincuenta]] euros. Le añaden [[186,20|ciento ochenta y seis con veinte]] euros al mes.

Y con el complemento, los medicamentos con receta salen gratis.

Se pide con la pensión. Guárdatelo, o pásaselo a quien cobre poco.`,

  escenas: [
    { clase: "arriba",
      animacion: {
        set: "salon", camara: CAM.gancho,
        actores: { luis: { pos: [0, 0.4], giro: 8, pose: "piensa", cara: "preocupada", acciones: [{ en: "completarla hasta la mínima", pose: "pulgar", cara: "contenta" }] } },
        atrezo: [{ tipo: "bocadillo", quien: "luis", texto: "?", t: 0.3, hasta: 2.2 }],
      },
      html: `
        <div class="kicker" data-a="fijo">Complemento a mínimos</div>
        <div class="titular relieve" data-a="fijo">¿Pensión baja? <span class="ambar">Te la completan</span></div>
        <div class="sub" data-en="completarla hasta la mínima" data-a="sube">Hasta la pensión mínima 👇</div>`,
    },
    { en: "En 2026", clase: "arriba", transicion: "latigo",
      animacion: {
        set: "salon", camara: CAM.medio2,
        actores: { rosa: { pos: [0.2, 0.5], giro: -10, pose: "senala", cara: "contenta", acciones: [{ en: "al mes", pose: "pulgar", cara: "feliz" }] } },
        atrezo: [{ tipo: "monedas", en: "936,20", n: 30 }],
      },
      html: `
        <div class="kicker">La mínima en 2026</div>
        <div class="cifra m ambar" data-en="936,20" data-a="pop">936,20 €</div>
        <div class="titular s" data-en="al mes" data-a="sube">al mes, con 65 años y sin cónyuge</div>`,
    },
    { en: "Lo cobras si", clase: "arriba", transicion: "giro",
      animacion: {
        set: "salon", camara: CAM.medio,
        actores: { rosa: { pos: [0, 0.4], giro: 0, pose: "piensa", cara: "neutra", acciones: [{ en: "tus otros ingresos", pose: "senala", cara: "contenta" }] } },
      },
      html: `
        <div class="kicker">Lo cobras si</div>
        <div class="check" data-en="vives en España" data-a="giro3d"><div class="ok">✓</div><div>Vives en España</div></div>
        <div class="check" data-en="tus otros ingresos" data-a="giro3d"><div class="ok">✓</div><div>Otros ingresos: máximo 9.442 € al año</div></div>`,
    },
    { en: "Pongamos que Luis", clase: "arriba", transicion: "zoom",
      animacion: {
        set: "salon", camara: CAM.general2,
        actores: {
          luis: { pos: [-0.85, 0.5], giro: 12, pose: "reposo", cara: "neutra", acciones: [{ en: "Le añaden", pose: "celebra", cara: "feliz" }] },
          rosa: { pos: [0.85, 0.5], giro: -12, pose: "piensa", cara: "neutra", acciones: [{ en: "Le añaden", pose: "pulgar", cara: "contenta" }] },
        },
        atrezo: [{ tipo: "monedas", en: "Le añaden", n: 32 }],
      },
      html: `
        <div class="kicker">Un ejemplo</div>
        <div class="tarjeta" style="zoom:0.9">
          <div class="par" data-en="y cobra 750" data-a="sube"><span>Pensión de Luis</span><b>750 €</b></div>
          <div class="par" data-en="Le añaden" data-a="sube"><span>Complemento al mes</span><b>+186,20 €</b></div>
        </div>`,
    },
    { en: "Y con el complemento", clase: "arriba", transicion: "latigo",
      animacion: {
        set: "salon", camara: CAM.medio,
        actores: { rosa: { pos: [0, 0.4], giro: -6, pose: "pulgar", cara: "sorpresa", acciones: [{ en: "salen gratis", pose: "celebra", cara: "feliz" }] } },
        atrezo: [{ tipo: "bocadillo", quien: "rosa", texto: "!", color: "#1f9d6b", en: "Y con el complemento" }],
      },
      html: `
        <div class="kicker">Además</div>
        <div class="titular relieve" data-en="salen gratis" data-a="golpe3d">Medicamentos con receta <span class="verde">gratis</span></div>`,
    },
    { en: "Se pide con la pensión", clase: "arriba", transicion: "zoom",
      animacion: {
        set: "oficina", camara: CAM.oficina,
        actores: { luis: { pos: [-0.55, 0.15], giro: 22, pose: "carpeta", cara: "neutra", acciones: [{ en: "con la pensión", pose: "pulgar", cara: "feliz" }] } },
        atrezo: [
          { tipo: "carpeta", pos: [0.8, 1.38, -0.95], giro: -8, texto: "Pensión", marca: "✓ COMPLEMENTO", en: "con la pensión" },
          { tipo: "sello", pos: [0.8, 1.38, -0.92], en: "con la pensión" },
        ],
      },
      html: `
        <div class="kicker">Cómo se pide</div>
        <div class="titular relieve" data-en="Se pide con la pensión" data-a="golpe3d">Se pide <span class="ambar">con la pensión</span></div>`,
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
          <div class="titular m relieve" data-a="sube">Guárdatelo, o pásaselo a <span class="ambar">quien cobre poco</span></div>
          <div class="url" data-a="sube" data-dur="0.6">Límites y tope: jubilometro.com</div>
          <div class="aviso" data-a="aparece">Información general. Real Decreto 241/2026. En pensiones desde 2013 el complemento tiene un tope de 628,80 € al mes. Con cónyuge a cargo, límite de 11.013 €.</div>
        </div>`,
    },
  ],

  portada: `
    <div class="kicker" data-a="fijo">Complemento a mínimos</div>
    <div class="titular relieve" data-a="fijo">¿Pensión baja? <span class="ambar">Te la completan</span></div>
    <div class="sub" data-a="fijo">Hasta la pensión mínima</div>`,
};

// E2 · Elecciones del 29/11: la pensión y la paga extra de noviembre llegan como siempre
// Reel modelo del formato con muñecos 3D (Rosa y Luis), hechos con código: ver README.md, «Muñecos 3D».
// Fuente: contenido/cuanto-cobrare/elecciones-y-pensiones/articulo.md (rama claude/keen-mccarthy-i7kn75),
// apartados «Las fechas que te afectan» y «La paga extra y las pensiones de noviembre y diciembre».
const COMPARTIR = `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7z"/></svg>`;

export default {
  tema: "Elecciones 29-N",
  estilo: "dinamico",
  velo: "suave",
  // Música: «News bed» (100 bpm) de la biblioteca de Orshot, uso comercial libre.
  musica: "https://cdn.orshot.com/library/music/59610ed8-671e-4654-8b95-bc066c1bf45a.m4a",
  musicaBucle: { ini: 2.4, fin: 14.4 },
  volumenMusica: 0.12,
  guion: `¿Las elecciones retrasan tu paga extra? No. Te llega con la pensión de noviembre, como siempre.

Si tu banco adelanta el pago, entre el [[22|veintidós]] y el [[26|veintiséis]] de noviembre. Si no, como tarde, el primer día hábil de diciembre.

La pensión de diciembre, en sus fechas. Y si tienes pedida la jubilación, la viudedad o la incapacidad, tu expediente sigue su curso.

Las elecciones no cambian lo que cobras. Pásaselo a quien te lo pregunte.`,

  escenas: [
    { // 0 · Gancho: Rosa mira el móvil, preocupada
      clase: "arriba",
      animacion: {
        set: "salon",
        camara: { desde: { pos: [1.4, 2.9, 10.5], mira: [0, 2.85, 0] }, hasta: { pos: [0.5, 2.8, 8.8], mira: [0, 2.8, 0] } },
        actores: { rosa: { pos: [0, 0.4], giro: -8, pose: "movil", cara: "preocupada" } },
        atrezo: [
          { tipo: "movil", quien: "rosa" },
          { tipo: "bocadillo", quien: "rosa", texto: "?", t: 0.3, hasta: 2.2 },
        ],
      },
      html: `
        <div class="kicker" data-a="fijo">Elecciones del 29 de noviembre</div>
        <div class="titular relieve" data-a="fijo">¿Retrasan tu <span class="ambar">paga extra</span>?</div>`,
    },
    { en: "No", clase: "arriba", transicion: "zoom",
      animacion: {
        set: "salon",
        camara: { desde: { pos: [0, 2.9, 8.8], mira: [0, 3.05, 0] }, hasta: { pos: [0, 2.85, 7.9], mira: [0, 3.0, 0] } },
        actores: { rosa: { pos: [0, 0.4], giro: 0, pose: "pulgar", cara: "feliz", acciones: [{ en: "como siempre", pose: "celebra" }, { en: "como siempre", bote: false }] } },
      },
      html: `
        <div class="gigante relieve rojo" data-a="golpe3d" style="font-size:240px">NO</div>
        <div class="titular s centro" data-en="Te llega" data-a="sube">Llega con la pensión de noviembre</div>`,
    },
    { en: "Si tu banco", clase: "arriba", transicion: "latigo",
      animacion: {
        set: "salon",
        camara: { desde: { pos: [1.3, 2.6, 4.1], mira: [0.3, 2.05, 0.4] }, hasta: { pos: [0.9, 2.5, 3.5], mira: [0.3, 2.0, 0.4] } },
        actores: { rosa: { pos: [0, 0.4], giro: -10, pose: "movil", cara: "contenta" } },
        atrezo: [{ tipo: "movil", quien: "rosa", pantallas: [{ en: "adelanta el pago", estado: "ingreso" }] }],
      },
      html: `<div class="kicker">Si tu banco adelanta el pago…</div>`,
    },
    { en: "entre el", clase: "arriba", transicion: "zoom",
      animacion: {
        set: "salon",
        camara: { desde: { pos: [-0.6, 2.9, 11.2], mira: [0, 3.0, 0] }, hasta: { pos: [-0.2, 2.9, 10.2], mira: [0, 2.95, 0] } },
        actores: { rosa: { pos: [0.6, 0.6], giro: -15, pose: "senalaArriba", cara: "feliz" } },
      },
      html: `
        <div style="zoom:0.8; align-self:center">
          <div class="calendario" data-a="rango" data-mes="Noviembre 2026" data-nota="Pensión + paga extra"
            data-offset="6" data-dias="30" data-rango="22-26" data-marca="29" data-tag="Elecciones"></div>
        </div>`,
    },
    { en: "Si no", clase: "arriba", transicion: "giro",
      animacion: {
        set: "salon",
        camara: { desde: { pos: [0.9, 3.0, 10.8], mira: [0.5, 2.95, -1] }, hasta: { pos: [0.7, 3.0, 9.9], mira: [0.55, 2.9, -1] } },
        actores: { rosa: { pos: [-0.35, 0.5], giro: 28, pose: "piensa", cara: "neutra", acciones: [{ en: "como tarde", pose: "senalaArriba", cara: "sorpresa" }, { en: "primer día", cara: "feliz" }] } },
        atrezo: [{ tipo: "calendarioPared", pos: [1.55, 3.05, -3.08], en: "como tarde" }],
      },
      html: `
        <div class="kicker">Si no lo adelanta…</div>
        <div class="titular s relieve" data-en="primer día" data-a="sube">Como tarde, <span class="verde">el 1 de diciembre</span></div>`,
    },
    { en: "La pensión de diciembre", clase: "arriba", transicion: "latigo",
      animacion: {
        set: "salon",
        camara: { desde: { pos: [2.2, 2.8, 8.8], mira: [0, 2.75, 0] }, hasta: { pos: [1.6, 2.75, 7.9], mira: [0, 2.75, 0] } },
        actores: { rosa: { pos: [0, 0.5], giro: 12, pose: "reposo", cara: "contenta", acciones: [{ en: "en sus fechas", pose: "pulgar", cara: "feliz" }] } },
      },
      html: `
        <div class="kicker">Y en diciembre</div>
        <div class="check" data-a="giro3d"><div class="ok">✓</div><div>Pensión de diciembre<small>En sus fechas de siempre</small></div></div>`,
    },
    { en: "Y si tienes", clase: "arriba", transicion: "zoom",
      animacion: {
        set: "oficina",
        camara: { desde: { pos: [0.6, 3.9, 10.6], mira: [0.2, 2.35, -0.6] }, hasta: { pos: [0.5, 3.8, 9.7], mira: [0.2, 2.3, -0.6] } },
        actores: { luis: { pos: [-0.55, 0.15], giro: 22, pose: "piensa", cara: "preocupada", acciones: [{ en: "sigue su curso", pose: "pulgar", cara: "feliz" }] } },
        atrezo: [
          { tipo: "carpeta", pos: [0.8, 1.38, -0.95], giro: -8, texto: "Expediente", en: "sigue su curso" },
          { tipo: "sello", pos: [0.8, 1.38, -0.92], en: "sigue su curso" },
        ],
      },
      html: `
        <div style="display:flex; flex-direction:column; gap:16px; zoom:0.82">
          <div class="check" data-en="la jubilación" data-a="giro3d"><div class="ok">✓</div><div>Jubilación</div></div>
          <div class="check" data-en="la viudedad" data-a="giro3d"><div class="ok">✓</div><div>Viudedad</div></div>
          <div class="check" data-en="la incapacidad" data-a="giro3d"><div class="ok">✓</div><div>Incapacidad</div></div>
        </div>
        <div class="sello verde" data-en="sigue su curso" data-a="sello" style="font-size:64px">Sigue su curso</div>`,
    },
    { en: "Las elecciones no", clase: "arriba", transicion: "zoom",
      animacion: {
        set: "salon",
        camara: { desde: { pos: [0, 3.0, 12.6], mira: [0, 2.9, 0] }, hasta: { pos: [0, 2.9, 11.2], mira: [0, 2.85, 0] } },
        actores: {
          rosa: { pos: [-0.85, 0.5], giro: 12, pose: "reposo", cara: "contenta", acciones: [{ en: "no cambian", pose: "celebra", cara: "feliz" }] },
          luis: { pos: [0.85, 0.5], giro: -12, pose: "reposo", cara: "contenta", acciones: [{ en: "lo que cobras", pose: "celebra", cara: "feliz" }] },
        },
        atrezo: [{ tipo: "monedas", en: "no cambian", n: 46 }],
      },
      html: `<div class="titular relieve centro" data-en="no cambian" data-a="golpe3d">Cobras <span class="verde">lo mismo</span></div>`,
    },
    { en: "Pásaselo", clase: "arriba", transicion: "sube",
      animacion: {
        set: "salon",
        camara: { desde: { pos: [0.2, 2.9, 12.0], mira: [0, 3.35, 0] }, hasta: { pos: [0.1, 2.9, 11.2], mira: [0, 3.3, 0] } },
        actores: {
          rosa: { pos: [-0.65, 0.6], giro: 8, pose: "movilEnsena", cara: "feliz" },
          luis: { pos: [0.95, 0.3], giro: -10, pose: "saluda", cara: "feliz" },
        },
        atrezo: [{ tipo: "movil", quien: "rosa", inclina: 0 }],
      },
      html: `
        <div class="cta">
          <div class="icono" data-a="latido">${COMPARTIR}</div>
          <div class="titular m relieve" data-a="sube">Pásaselo a quien <span class="ambar">te lo pregunte</span></div>
          <div class="url" data-a="sube" data-dur="0.6">Guía completa: jubilometro.com</div>
          <div class="aviso" data-a="aparece">Información general. La paga extra llega con la pensión de noviembre; el día exacto depende de tu banco.</div>
        </div>`,
    },
  ],

  portada: `
    <div class="kicker" data-a="fijo">Elecciones 29-N</div>
    <div class="titular relieve" data-a="fijo">¿Y mi <span class="ambar">paga extra</span>?</div>
    <div class="sub" data-a="fijo">Cuándo llega, con fechas</div>`,
};

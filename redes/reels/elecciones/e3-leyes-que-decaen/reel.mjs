// E3 · Qué leyes decaen con la disolución de las Cortes (sale el sábado 28/11, jornada de reflexión: sin partidos).
// Formato de muñecos 3D (ver README.md, «Muñecos 3D»). Fuente: contenido/cuanto-cobrare/elecciones-y-pensiones/articulo.md
// (rama claude/keen-mccarthy-i7kn75), apartado «Qué leyes decaen con la disolución de las Cortes» y preguntas frecuentes.
const COMPARTIR = `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7z"/></svg>`;

export default {
  tema: "Elecciones 29-N",
  estilo: "dinamico",
  velo: "suave",
  musica: "https://cdn.orshot.com/library/music/59610ed8-671e-4654-8b95-bc066c1bf45a.m4a", // «News bed» (100 bpm), Orshot
  musicaBucle: { ini: 2.4, fin: 14.4 },
  volumenMusica: 0.11,
  guion: `¿Esperabas jubilarte antes sin recorte con [[40|cuarenta]] años cotizados? Esa ley decae.

Estaba en el Congreso, en enmiendas. Con las Cortes disueltas, se queda por el camino. Para salir adelante, alguien tendrá que presentarla otra vez, desde cero, en la nueva legislatura, a partir del [[23|veintitrés]] de diciembre. Mientras tanto, se aplican los recortes de la ley actual.

También decae la Ley de Familias, con los nuevos permisos para cuidar de familiares.

Lo que ya está en el BOE sigue en vigor: la jubilación flexible nueva o la subida de este año.

Guárdatelo y pásaselo a quien estaba esperando esa ley.`,

  escenas: [
    { clase: "arriba",
      animacion: {
        set: "oficina",
        camara: { desde: { pos: [0.8, 3.9, 11.0], mira: [0.2, 2.4, -0.6] }, hasta: { pos: [0.5, 3.8, 9.7], mira: [0.2, 2.3, -0.6] } },
        actores: { luis: { pos: [-0.55, 0.15], giro: 22, pose: "carpeta", cara: "contenta", acciones: [{ en: "Esa ley decae", pose: "encoge", cara: "preocupada" }] } },
        atrezo: [
          { tipo: "carpeta", pos: [0.8, 1.38, -0.95], giro: -8, texto: "Anticipada 40 años", marca: "✕ DECAE", colorMarca: "#c24b43", en: "Esa ley decae" },
          { tipo: "sello", pos: [0.8, 1.38, -0.92], en: "Esa ley decae" },
        ],
      },
      html: `
        <div class="kicker" data-a="fijo">Con 40 años cotizados</div>
        <div class="titular relieve" data-a="fijo">¿Jubilarte antes <span class="ambar">sin recorte</span>?</div>`,
    },
    { en: "Estaba en el Congreso", clase: "arriba", transicion: "latigo",
      animacion: {
        set: "salon",
        camara: { desde: { pos: [-0.8, 3.1, 11.4], mira: [0.3, 3.0, -1] }, hasta: { pos: [-0.5, 3.0, 10.4], mira: [0.4, 2.95, -1] } },
        actores: { luis: { pos: [-0.4, 0.5], giro: 28, pose: "piensa", cara: "neutra", acciones: [{ en: "a partir del", pose: "senalaArriba", cara: "sorpresa" }] } },
        atrezo: [{ tipo: "calendarioPared", pos: [1.55, 2.6, -3.08], de: ["NOVIEMBRE", "29", "#c24b43"], a: ["DICIEMBRE", "23", "#3d86e0"], en: "a partir del" }],
      },
      html: `
        <div class="tarjeta" style="zoom:0.86">
          <div class="etq">Qué le pasa a esa ley</div>
          <div class="linea">
            <div class="hito mal" data-en="se queda por el camino" data-a="sube"><div class="f">Cortes disueltas</div><div class="t">Decae</div></div>
            <div class="hito" data-en="desde cero" data-a="sube"><div class="f">Nueva legislatura</div><div class="t">Empezar de cero</div></div>
            <div class="hito ok" data-en="a partir del" data-a="sube"><div class="f">Desde el 23 de diciembre</div><div class="t">Se puede volver a presentar</div></div>
          </div>
        </div>`,
    },
    { en: "Mientras tanto", clase: "arriba", transicion: "giro",
      animacion: {
        set: "salon",
        camara: { desde: { pos: [0.4, 2.9, 9.0], mira: [0, 3.0, 0] }, hasta: { pos: [0.2, 2.85, 8.2], mira: [0, 2.95, 0] } },
        actores: { luis: { pos: [0, 0.4], giro: -6, pose: "encoge", cara: "preocupada" } },
      },
      html: `
        <div class="kicker">Mientras tanto</div>
        <div class="titular relieve" data-en="los recortes" data-a="golpe3d">Recortes de la <span class="ambar">ley actual</span></div>`,
    },
    { en: "También decae", clase: "arriba", transicion: "latigo",
      animacion: {
        set: "salon",
        camara: { desde: { pos: [1.6, 2.9, 10.6], mira: [0, 2.95, 0] }, hasta: { pos: [1.0, 2.85, 9.6], mira: [0, 2.9, 0] } },
        actores: { rosa: { pos: [0.2, 0.5], giro: -10, pose: "piensa", cara: "preocupada" } },
      },
      html: `
        <div class="kicker">También decae</div>
        <div class="tarjeta mala" data-a="voltea">
          <div class="titular s">Ley de Familias</div>
          <div class="sub" data-en="los nuevos permisos" data-a="sube">Con los nuevos permisos para cuidar de familiares</div>
        </div>`,
    },
    { en: "Lo que ya está", clase: "arriba", transicion: "zoom",
      animacion: {
        set: "salon",
        camara: { desde: { pos: [0, 3.0, 12.6], mira: [0, 2.9, 0] }, hasta: { pos: [0, 2.9, 11.2], mira: [0, 2.85, 0] } },
        actores: {
          rosa: { pos: [-0.85, 0.5], giro: 12, pose: "reposo", cara: "contenta", acciones: [{ en: "sigue en vigor", pose: "pulgar", cara: "feliz" }] },
          luis: { pos: [0.85, 0.5], giro: -12, pose: "reposo", cara: "contenta", acciones: [{ en: "la subida", pose: "pulgar", cara: "feliz" }] },
        },
      },
      html: `
        <div class="kicker">Sigue en vigor</div>
        <div style="display:flex; flex-direction:column; gap:16px; zoom:0.86">
          <div class="check" data-en="la jubilación flexible" data-a="giro3d"><div class="ok">✓</div><div>Jubilación flexible nueva</div></div>
          <div class="check" data-en="la subida" data-a="giro3d"><div class="ok">✓</div><div>La subida de 2026</div></div>
        </div>`,
    },
    { en: "Guárdatelo", clase: "arriba", transicion: "sube",
      animacion: {
        set: "salon",
        camara: { desde: { pos: [0.2, 2.9, 12.0], mira: [0, 3.35, 0] }, hasta: { pos: [0.1, 2.9, 11.2], mira: [0, 3.3, 0] } },
        actores: {
          rosa: { pos: [-0.75, 0.6], giro: 8, pose: "saluda", cara: "feliz" },
          luis: { pos: [0.95, 0.3], giro: -10, pose: "reposo", cara: "contenta" },
        },
      },
      html: `
        <div class="cta">
          <div class="icono" data-a="latido">${COMPARTIR}</div>
          <div class="titular m relieve" data-a="sube">Pásaselo a quien <span class="ambar">esperaba esa ley</span></div>
          <div class="url" data-a="sube" data-dur="0.6">Guía completa: jubilometro.com</div>
          <div class="aviso" data-a="aparece">Información general. Art. 207 del Reglamento del Congreso. Las nuevas Cortes se constituyen el 23/12/2026.</div>
        </div>`,
    },
  ],

  portada: `
    <div class="kicker" data-a="fijo">Elecciones 29-N</div>
    <div class="titular relieve" data-a="fijo">Las leyes que <span class="rojo">decaen</span></div>
    <div class="sub" data-a="fijo">Y lo que sigue en vigor</div>`,
};

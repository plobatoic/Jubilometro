// Reel 1 de 7 · Qué propone EH Bildu sobre las pensiones (elecciones del 29/11/2026)
// Generado por ../genera.mjs: misma plantilla para los siete partidos. No editar a mano; cambiar genera.mjs.
// Fuente: contenido/elecciones/programa-eh-bildu-pensiones/articulo.md (rama claude/keen-mccarthy-i7kn75).
export default {
  tema: "Elecciones 29-N",
  estilo: "dinamico",
  velo: "suave",
  musica: "https://cdn.orshot.com/library/music/59610ed8-671e-4654-8b95-bc066c1bf45a.m4a",
  musicaBucle: { ini: 2.4, fin: 14.4 },
  volumenMusica: 0.1,
  guion: "¿Qué propone EH Bildu sobre las pensiones? Esto dice su programa.\n\nSubir las pensiones mínimas hasta al menos [[1.220|mil doscientos veinte]] euros. Subir un [[15 %|quince por ciento]] la viudedad y las no contributivas. Y jubilarse sin recorte con [[40|cuarenta]] años cotizados.\n\nNo habla de el IRPF de las pensiones.\n\nLos siete partidos, comparados en Jubilómetro.",

  escenas: [
    { clase: "arriba",
      animacion: {
        set: "oficina",
        camara: { desde: { pos: [0.6, 3.9, 10.6], mira: [0.2, 2.35, -0.6] }, hasta: { pos: [0.5, 3.8, 9.7], mira: [0.2, 2.3, -0.6] } },
        actores: { rosa: { pos: [-0.55, 0.15], giro: 22, pose: "carpeta", cara: "neutra" } },
        atrezo: [{ tipo: "carpeta", pos: [0.8, 1.38, -0.95], giro: -8, texto: "Programa EH Bildu" }],
      },
      html: `
        <div class="kicker" data-a="fijo">Elecciones 29N · Partido 1 de 7</div>
        <div class="titular relieve" data-a="fijo">¿Qué propone <span class="ambar">EH Bildu</span> sobre las pensiones?</div>`,
    },
    { en: "Subir las pensiones mínimas", clase: "arriba", transicion: "latigo",
      animacion: {
        set: "salon",
        camara: { desde: { pos: [-0.8, 3.0, 11.2], mira: [0.2, 3.0, 0] }, hasta: { pos: [-0.4, 2.95, 10.2], mira: [0.2, 2.95, 0] } },
        actores: { luis: { pos: [0.7, 0.5], giro: -18, pose: "piensa", cara: "neutra" } },
      },
      html: `
        <div class="kicker">Lo que dice su programa</div>
        <div class="paso" data-en="Subir las pensiones mínimas" data-a="sube"><div class="num">1</div><div class="tx">Mínimas: <b>al menos 1.220 €</b></div></div>
        <div class="paso" data-en="la viudedad y las no" data-a="sube"><div class="num">2</div><div class="tx">Viudedad y no contributivas: <b>+15 %</b></div></div>
        <div class="paso" data-en="Y jubilarse sin recorte" data-a="sube"><div class="num">3</div><div class="tx">Sin recorte con <b>40 años</b> cotizados</div></div>
        <div class="nota" data-a="aparece">Programa oficial de EH Bildu, págs. 7-8</div>`,
    },
    { en: "No habla de", clase: "arriba", transicion: "zoom",
      animacion: {
        set: "salon",
        camara: { desde: { pos: [0, 2.9, 9.4], mira: [0, 3.0, 0] }, hasta: { pos: [0, 2.85, 8.6], mira: [0, 2.95, 0] } },
        actores: { luis: { pos: [0, 0.4], giro: 0, pose: "encoge", cara: "neutra" } },
      },
      html: `
        <div class="kicker">Su programa no habla de…</div>
        <div class="paso" data-a="sube"><div class="num">✕</div><div class="tx">El IRPF de las pensiones</div></div>`,
    },
    { en: "Los siete partidos", clase: "arriba", transicion: "sube",
      animacion: {
        set: "salon",
        camara: { desde: { pos: [0.2, 2.9, 12.0], mira: [0, 3.35, 0] }, hasta: { pos: [0.1, 2.9, 11.2], mira: [0, 3.3, 0] } },
        actores: {
          rosa: { pos: [-0.75, 0.6], giro: 8, pose: "senalaArriba", cara: "contenta" },
          luis: { pos: [0.95, 0.3], giro: -10, pose: "piensa", cara: "contenta" },
        },
      },
      html: `
        <div class="cta">
          <div class="titular m relieve" data-a="sube">Los <span class="ambar">7 partidos</span>, comparados</div>
          <div class="url" data-a="sube" data-dur="0.6">jubilometro.com/elecciones</div>
          <div class="aviso" data-a="aparece">Solo lo que dice el programa oficial de cada partido, con su página. Sin valoraciones ni recomendación de voto. Orden alfabético. Información general.</div>
        </div>`,
    },
  ],

  portada: `
    <div class="kicker" data-a="fijo">Elecciones 29N · 1 de 7</div>
    <div class="titular relieve" data-a="fijo">¿Qué propone <span class="ambar">EH Bildu</span> sobre las pensiones?</div>
    <div class="sub" data-a="fijo">Lo que dice su programa</div>`,
};

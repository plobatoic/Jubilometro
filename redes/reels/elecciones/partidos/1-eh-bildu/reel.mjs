// Reel 1 de 7 · Qué propone EH Bildu sobre las pensiones (elecciones del 29/11/2026)
// Generado por ../genera.mjs: misma plantilla para los siete partidos. No editar a mano; cambiar genera.mjs.
// Fuente: contenido/elecciones/programa-eh-bildu-pensiones/articulo.md (rama claude/keen-mccarthy-i7kn75).
export default {
  tema: "Elecciones 29-N",
  velo: "suave",
  musica: "https://cdn.orshot.com/library/music/59610ed8-671e-4654-8b95-bc066c1bf45a.m4a",
  musicaBucle: { ini: 2.4, fin: 14.4 },
  volumenMusica: 0.1,
  guion: "¿Qué propone EH Bildu sobre las pensiones? Esto dice su programa.\n\nSubir las pensiones mínimas hasta al menos [[1.220|mil doscientos veinte]] euros. Subir un [[15 %|quince por ciento]] la viudedad y las no contributivas. Y jubilarse sin recorte con [[40|cuarenta]] años cotizados.\n\nNo habla de el IRPF de las pensiones.\n\nLos siete partidos, comparados en Jubilómetro.",

  escenas: [
    { clase: "arriba", fondo: { clip: "pixabay:125430", desde: 0.5, x: 0.5 },
      html: `
        <div class="kicker" data-a="fijo">Elecciones 29N · Partido 1 de 7</div>
        <div class="titular relieve" data-a="fijo">¿Qué propone <span class="ambar">EH Bildu</span> sobre las pensiones?</div>`,
    },
    { en: "Subir las pensiones mínimas", clase: "arriba",
      html: `
        <div class="kicker">Lo que dice su programa</div>
        <div class="paso" data-en="Subir las pensiones mínimas" data-a="sube"><div class="num">1</div><div class="tx" style="font-size:54px">Mínimas: <b>al menos 1.220 €</b></div></div>
        <div class="paso" data-en="la viudedad y las no" data-a="sube"><div class="num">2</div><div class="tx" style="font-size:54px">Viudedad y no contributivas: <b>+15 %</b></div></div>
        <div class="paso" data-en="Y jubilarse sin recorte" data-a="sube"><div class="num">3</div><div class="tx" style="font-size:54px">Sin recorte con <b>40 años</b> cotizados</div></div>
        <div class="nota" data-a="aparece">Programa oficial de EH Bildu, págs. 7-8</div>`,
    },
    { en: "No habla de", clase: "arriba", fondo: { clip: "pixabay:4878", desde: 0.5, x: 0.5 },
      html: `
        <div class="kicker">Su programa no habla de…</div>
        <div class="paso" data-a="sube"><div class="num">✕</div><div class="tx" style="font-size:54px">El IRPF de las pensiones</div></div>`,
    },
    { en: "Los siete partidos", clase: "arriba",
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

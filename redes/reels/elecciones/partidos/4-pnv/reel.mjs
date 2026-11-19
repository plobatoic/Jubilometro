// Reel 4 de 7 · Qué propone PNV sobre las pensiones (elecciones del 29/11/2026)
// Generado por ../genera.mjs: misma plantilla para los siete partidos. No editar a mano; cambiar genera.mjs.
// Fuente: contenido/elecciones/programa-pnv-pensiones/articulo.md (rama claude/keen-mccarthy-i7kn75).
export default {
  tema: "Elecciones 29-N",
  velo: "suave",
  musica: "https://cdn.orshot.com/library/music/59610ed8-671e-4654-8b95-bc066c1bf45a.m4a",
  musicaBucle: { ini: 2.4, fin: 14.4 },
  volumenMusica: 0.1,
  guion: "¿Qué propone el PNV sobre las pensiones? Esto dice su programa.\n\nSubirlas cada año con el IPC y mejorar poco a poco las mínimas. Quitar el recorte de la anticipada con más de [[40|cuarenta]] años cotizados. Y que los años de cuidados cuenten para la pensión.\n\nNo habla de el IRPF de las pensiones ni de la viudedad.\n\nLos siete partidos, comparados en Jubilómetro.",

  escenas: [
    { clase: "arriba", fondo: { clip: "pixabay:377024", desde: 0.5, x: 0.4 },
      html: `
        <div class="kicker" data-a="fijo">Elecciones 29N · Partido 4 de 7</div>
        <div class="titular relieve" data-a="fijo">¿Qué propone el <span class="ambar">PNV</span> sobre las pensiones?</div>`,
    },
    { en: "Subirlas cada año", clase: "arriba",
      html: `
        <div class="kicker">Lo que dice su programa</div>
        <div class="paso" data-en="Subirlas cada año" data-a="sube"><div class="num">1</div><div class="tx" style="font-size:54px">Con el <b>IPC</b> y mínimas más altas</div></div>
        <div class="paso" data-en="Quitar el recorte" data-a="sube"><div class="num">2</div><div class="tx" style="font-size:54px">Anticipada <b>sin recorte</b> con +40 años</div></div>
        <div class="paso" data-en="Y que los años" data-a="sube"><div class="num">3</div><div class="tx" style="font-size:54px">Los años de <b>cuidados cuentan</b></div></div>
        <div class="nota" data-a="aparece">Programa oficial del PNV, medidas 01-06, págs. 30-31</div>`,
    },
    { en: "No habla de", clase: "arriba", fondo: { clip: "pixabay:3013", desde: 0.5, x: 0.6 },
      html: `
        <div class="kicker">Su programa no habla de…</div>
        <div class="paso" data-a="sube"><div class="num">✕</div><div class="tx" style="font-size:54px">El IRPF de las pensiones</div></div>
        <div class="paso" data-a="sube"><div class="num">✕</div><div class="tx" style="font-size:54px">La viudedad</div></div>`,
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
    <div class="kicker" data-a="fijo">Elecciones 29N · 4 de 7</div>
    <div class="titular relieve" data-a="fijo">¿Qué propone el <span class="ambar">PNV</span> sobre las pensiones?</div>
    <div class="sub" data-a="fijo">Lo que dice su programa</div>`,
};

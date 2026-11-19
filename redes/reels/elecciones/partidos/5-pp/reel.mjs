// Reel 5 de 7 · Qué propone PP sobre las pensiones (elecciones del 29/11/2026)
// Generado por ../genera.mjs: misma plantilla para los siete partidos. No editar a mano; cambiar genera.mjs.
// Fuente: contenido/elecciones/programa-pp-pensiones/articulo.md (rama claude/keen-mccarthy-i7kn75).
export default {
  tema: "Elecciones 29-N",
  velo: "suave",
  musica: "https://cdn.orshot.com/library/music/59610ed8-671e-4654-8b95-bc066c1bf45a.m4a",
  musicaBucle: { ini: 2.4, fin: 14.4 },
  volumenMusica: 0.1,
  guion: "¿Qué propone el PP sobre las pensiones? Esto dice su programa.\n\nSubirlas cada año con el IPC y reconstruir el Pacto de Toledo. Rebajas en el IRPF para quien cobra la pensión y trabaja. Y un pacto de Estado por la dependencia.\n\nNo habla de la edad de jubilación ni de las pensiones mínimas.\n\nLos siete partidos, comparados en Jubilómetro.",

  escenas: [
    { clase: "arriba", fondo: { clip: "pixabay:125431", desde: 0.5, x: 0.72 },
      html: `
        <div class="kicker" data-a="fijo">Elecciones 29N · Partido 5 de 7</div>
        <div class="titular relieve" data-a="fijo">¿Qué propone el <span class="ambar">PP</span> sobre las pensiones?</div>`,
    },
    { en: "Subirlas cada año", clase: "arriba",
      html: `
        <div class="kicker">Lo que dice su programa</div>
        <div class="paso" data-en="Subirlas cada año" data-a="sube"><div class="num">1</div><div class="tx">Con el <b>IPC</b> y nuevo <b>Pacto de Toledo</b></div></div>
        <div class="paso" data-en="Rebajas en el IRPF" data-a="sube"><div class="num">2</div><div class="tx"><b>IRPF</b> más bajo en la jubilación activa</div></div>
        <div class="paso" data-en="Y un pacto" data-a="sube"><div class="num">3</div><div class="tx">Pacto de Estado por la <b>dependencia</b></div></div>
        <div class="nota" data-a="aparece">Programa oficial del PP, medidas 108 y 114, págs. 42-44</div>`,
    },
    { en: "No habla de", clase: "arriba", fondo: { clip: "pixabay:2339", desde: 0.5, x: 0.75 },
      html: `
        <div class="kicker">Su programa no habla de…</div>
        <div class="paso" data-a="sube"><div class="num">✕</div><div class="tx">La edad de jubilación</div></div>
        <div class="paso" data-a="sube"><div class="num">✕</div><div class="tx">Las pensiones mínimas</div></div>
        <div class="paso" data-a="sube"><div class="num">✕</div><div class="tx">La viudedad</div></div>`,
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
    <div class="kicker" data-a="fijo">Elecciones 29N · 5 de 7</div>
    <div class="titular relieve" data-a="fijo">¿Qué propone el <span class="ambar">PP</span> sobre las pensiones?</div>
    <div class="sub" data-a="fijo">Lo que dice su programa</div>`,
};

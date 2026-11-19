// Reel 2 de 7 · Qué propone ERC sobre las pensiones (elecciones del 29/11/2026)
// Generado por ../genera.mjs: misma plantilla para los siete partidos. No editar a mano; cambiar genera.mjs.
// Fuente: contenido/elecciones/programa-erc-pensiones/articulo.md (rama claude/keen-mccarthy-i7kn75).
export default {
  tema: "Elecciones 29-N",
  velo: "suave",
  musica: "https://cdn.orshot.com/library/music/59610ed8-671e-4654-8b95-bc066c1bf45a.m4a",
  musicaBucle: { ini: 2.4, fin: 14.4 },
  volumenMusica: 0.1,
  guion: "¿Qué propone ERC sobre las pensiones? Esto dice su programa.\n\nBlindar la subida de las pensiones con la inflación. Con el IPC de cada territorio, no con el de toda España. Y anticipada sin recorte en profesiones penosas o peligrosas.\n\nNo habla de las pensiones mínimas ni de el IRPF de las pensiones.\n\nLos siete partidos, comparados en Jubilómetro.",

  escenas: [
    { clase: "arriba", fondo: { clip: "pixabay:151194", desde: 0.5, x: 0.45 },
      html: `
        <div class="kicker" data-a="fijo">Elecciones 29N · Partido 2 de 7</div>
        <div class="titular relieve" data-a="fijo">¿Qué propone <span class="ambar">ERC</span> sobre las pensiones?</div>`,
    },
    { en: "Blindar la subida", clase: "arriba",
      html: `
        <div class="kicker">Lo que dice su programa</div>
        <div class="paso" data-en="Blindar la subida" data-a="sube"><div class="num">1</div><div class="tx" style="font-size:54px"><b>Blindar</b> la subida con la inflación</div></div>
        <div class="paso" data-en="Subirlas con el IPC" data-a="sube"><div class="num">2</div><div class="tx" style="font-size:54px">Con el <b>IPC de cada territorio</b></div></div>
        <div class="paso" data-en="Y anticipada sin recorte" data-a="sube"><div class="num">3</div><div class="tx" style="font-size:54px">Anticipada <b>sin recorte</b> en oficios penosos</div></div>
        <div class="nota" data-a="aparece">Programa oficial de ERC, medidas 106-110, págs. 25-27</div>`,
    },
    { en: "No habla de", clase: "arriba", fondo: { clip: "pixabay:84005", desde: 0.5, x: 0.5 },
      html: `
        <div class="kicker">Su programa no habla de…</div>
        <div class="paso" data-a="sube"><div class="num">✕</div><div class="tx" style="font-size:54px">Las pensiones mínimas</div></div>
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
    <div class="kicker" data-a="fijo">Elecciones 29N · 2 de 7</div>
    <div class="titular relieve" data-a="fijo">¿Qué propone <span class="ambar">ERC</span> sobre las pensiones?</div>
    <div class="sub" data-a="fijo">Lo que dice su programa</div>`,
};

// E2 · Elecciones del 29/11: la pensión y la paga extra de noviembre llegan como siempre
// Fuente: contenido/cuanto-cobrare/elecciones-y-pensiones/articulo.md (rama claude/keen-mccarthy-i7kn75),
// apartados «Las fechas que te afectan» y «La paga extra y las pensiones de noviembre y diciembre».
// Estilo dinámico: escenas de vídeo real de Pixabay y escenas propias en 3D (`solido`).
const COMPARTIR = `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7z"/></svg>`;

export default {
  tema: "Elecciones 29-N",
  estilo: "dinamico",
  // Música: «News bed» (100 bpm) de la biblioteca de Orshot, uso comercial libre.
  musica: "https://cdn.orshot.com/library/music/59610ed8-671e-4654-8b95-bc066c1bf45a.m4a",
  musicaBucle: { ini: 2.4, fin: 14.4 },
  volumenMusica: 0.13,
  guion: `¿Las elecciones retrasan tu paga extra? No. Te llega con la pensión de noviembre, como siempre.

Si tu banco adelanta el pago, entre el [[22|veintidós]] y el [[26|veintiséis]] de noviembre. Si no, como tarde, el primer día hábil de diciembre.

La pensión de diciembre, en sus fechas. Y si tienes pedida la jubilación, la viudedad o la incapacidad, tu expediente sigue su curso.

Las elecciones no cambian lo que cobras. Pásaselo a quien te lo pregunte.`,

  escenas: [
    { // 0 · Gancho, sobre Madrid
      fondo: { clip: "pixabay:246232", desde: 0, x: 0.5 },
      html: `
        <div class="kicker" data-a="fijo">Elecciones del 29 de noviembre</div>
        <div class="titular relieve" data-a="fijo">¿Retrasan tu <span class="ambar">paga extra</span>?</div>
        <div class="moneda3d" data-a="moneda"></div>`,
    },
    { en: "No", solido: true, transicion: "zoom",
      html: `
        <div class="gigante relieve rojo" data-a="golpe3d">NO</div>
        <div class="titular s centro" data-en="Te llega" data-a="sube">Llega con la pensión de noviembre</div>
        <div class="sello verde" data-en="como siempre" data-a="sello">Como siempre</div>`,
    },
    { en: "Si tu banco", solido: true, transicion: "latigo",
      html: `
        <div class="kicker centro">Si tu banco adelanta el pago</div>
        <div class="calendario" data-en="entre el" data-a="rango" data-mes="Noviembre 2026" data-nota="Pensión + paga extra"
          data-offset="6" data-dias="30" data-rango="22-26" data-marca="29" data-tag="Elecciones"></div>`,
    },
    { en: "Si no", solido: true, transicion: "giro",
      html: `
        <div class="kicker">Si tu banco no lo adelanta</div>
        <div class="tarjeta" data-en="como tarde" data-a="voltea">
          <div class="etq">Como tarde</div>
          <div class="cifra s verde">1 de diciembre</div>
          <div class="sub">El primer día hábil del mes (en 2026, martes)</div>
        </div>`,
    },
    { en: "La pensión de diciembre", fondo: { clip: "pixabay:268220", desde: 0, x: 0.5 }, transicion: "latigo",
      html: `
        <div class="kicker">Y en diciembre</div>
        <div class="check" data-a="giro3d"><div class="ok">✓</div><div>Pensión de diciembre<small>En sus fechas de siempre</small></div></div>`,
    },
    { en: "Y si tienes", fondo: { clip: "pixabay:39887", desde: 1, x: 0.5 }, clase: "abajo", transicion: "zoom",
      html: `
        <div class="kicker">¿Tienes un trámite pedido?</div>
        <div class="check" data-en="la jubilación" data-a="giro3d"><div class="ok">✓</div><div>Jubilación</div></div>
        <div class="check" data-en="la viudedad" data-a="giro3d"><div class="ok">✓</div><div>Viudedad</div></div>
        <div class="check" data-en="la incapacidad" data-a="giro3d"><div class="ok">✓</div><div>Incapacidad</div></div>
        <div class="sello verde" data-en="sigue su curso" data-a="sello">Sigue su curso</div>`,
    },
    { en: "Las elecciones no", solido: true, transicion: "zoom",
      html: `
        <div class="moneda3d" data-a="moneda"></div>
        <div class="titular relieve centro" data-en="no cambian" data-a="golpe3d">Cobras <span class="verde">lo mismo</span></div>
        <div class="estallido" data-en="lo que cobras" data-a="estallido" data-n="26"></div>`,
    },
    { en: "Pásaselo", fondo: { clip: "pixabay:38084", desde: 0, x: 0.5 }, clase: "abajo", transicion: "sube",
      html: `
        <div class="cta">
          <div class="icono" data-a="latido">${COMPARTIR}</div>
          <div class="titular m" data-a="sube">Pásaselo a quien <mark>te lo pregunte</mark></div>
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

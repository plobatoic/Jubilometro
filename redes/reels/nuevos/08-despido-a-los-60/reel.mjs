// Reel 8 · Despido a los 60: paro, subsidio y jubilación, en ese orden
// Fuente: contenido/jubilacion/despido-a-los-60/articulo.md y contenido/jubilacion/anticipada-involuntaria/articulo.md
const GUARDAR = `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>`;

export default {
  tema: "Despido a los 60",
  // Locución: voz «Martín» (ElevenLabs v4), o grabada a mano. Música: «Hopeful» (piano, 88 bpm) de la biblioteca de Orshot.
  musica: "https://cdn.orshot.com/library/music/04ccbe32-a3e1-4c80-aa68-879342c36b94.m4a",
  musicaBucle: { ini: 2.727, fin: 13.636 },
  volumenMusica: 0.14,
  marcaAgua: "60",
  guion: `Si te despiden a los 60, no estás perdido. Hay un camino, y tiene tres etapas.

Primero, el paro: hasta dos años, si has cotizado lo suficiente en los últimos seis. Y mientras lo cobras, te siguen cotizando para la jubilación.

Segundo, cuando se acaba, el subsidio para mayores de 52: 480 euros al mes hasta tu edad de jubilación.

Y tercero, la jubilación. Si fue un ERE o un despido objetivo y tienes 33 años cotizados, puedes adelantarla: en 2027, desde los 63, o desde los 61 con 38 años y medio cotizados. Eso sí, con recorte.

Un consejo: pide el paro en los 15 días hábiles después del despido. No lo dejes para luego.

[warmly] Guárdatelo, o pásaselo a quien le acaba de pasar.`,

  escenas: [
    { // 0 · Gancho
      fondo: { clip: "pixabay:203251", desde: 1, x: 0.47 },
      clase: "abajo",
      html: `
        <div class="kicker" data-a="fijo">¿Despedido a los 60?</div>
        <div class="titular" data-a="fijo">No estás perdido</div>
        <div class="sub" data-en="Hay un camino" data-a="sube">Hay un camino en 3 etapas 👇</div>`,
    },
    { en: "Primero, el paro",
      fondo: { clip: "pixabay:6395", desde: 0, x: 0.22 },
      html: `
        <div class="paso" data-a="sube"><div class="num">1</div><div class="tx">El paro<small>hasta 2 años, con 2.160 días cotizados en los últimos 6</small></div></div>
        <div class="fila" data-en="te siguen cotizando" data-a="sube"><div class="ico si">✓</div><div>Mientras lo cobras, sigues cotizando<small>para tu jubilación</small></div></div>`,
    },
    { en: "Segundo",
      fondo: { clip: "pixabay:87146", desde: 0, x: 0.42 },
      html: `
        <div class="paso" data-a="sube"><div class="num">2</div><div class="tx">Subsidio para mayores de 52</div></div>
        <div class="cifra m ambar" data-en="480 euros" data-a="cuenta" data-valor="480" data-suf=" €">0 €</div>
        <div class="titular s" data-en="hasta tu edad" data-a="sube">al mes, hasta tu edad de jubilación</div>`,
    },
    { en: "Y tercero",
      fondo: { clip: "pixabay:198890", desde: 0, x: 0.5 },
      html: `
        <div class="paso" data-a="sube"><div class="num">3</div><div class="tx">Jubilación anticipada<small data-en="Si fue un ERE" data-a="sube">si fue un ERE o un despido objetivo, con 33 años cotizados</small></div></div>
        <div class="tarjeta">
          <div class="par" data-en="desde los 63" data-a="sube"><span>En 2027, desde</span><b>63 años</b></div>
          <div class="par" data-en="desde los 61" data-a="sube"><span>Con 38 años y 6 meses cotizados</span><b>61 años</b></div>
        </div>
        <div class="nota" data-en="con recorte" data-a="aparece">Con recorte según los meses que adelantes.</div>`,
    },
    { en: "Un consejo",
      fondo: { clip: "pixabay:149986", desde: 0, x: 0.5 },
      clase: "abajo",
      html: `
        <div class="kicker">Un consejo</div>
        <div class="cifra m rojo" data-en="15 días" data-a="pop">15 días</div>
        <div class="titular s" data-en="hábiles" data-a="sube">hábiles para pedir el paro tras el despido</div>`,
    },
    { en: "Guárdatelo",
      fondo: { clip: "pixabay:282995", desde: 1, x: 0.55 },
      html: `
        <div class="cta">
          <div class="icono" data-a="pop">${GUARDAR}</div>
          <div class="titular m" data-a="sube">Guárdalo, o pásaselo a <mark>quien le acaba de pasar</mark></div>
          <div class="url" data-a="sube" data-dur="0.6">Paso a paso: jubilometro.com</div>
          <div class="aviso" data-a="aparece">Paro: 2.160 días cotizados en los últimos 6 años para 2 años de prestación. Edades de la jubilación anticipada involuntaria en 2027.</div>
        </div>`,
    },
  ],

  portada: `
    <div class="kicker" data-a="fijo">Despido a los 60</div>
    <div class="titular" data-a="fijo">Paro, subsidio y jubilación</div>
    <div class="sub" data-a="fijo">El orden que te protege</div>`,
};

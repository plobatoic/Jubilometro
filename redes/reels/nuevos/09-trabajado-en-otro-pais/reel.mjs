// Reel 9 · ¿Trabajaste en otro país? Esos años no se pierden
// Fuente: contenido/jubilacion/trabajado-en-otro-pais/articulo.md (Reglamento CE 883/2004 y convenios bilaterales)
const COMPARTIR = `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7z"/></svg>`;

export default {
  tema: "Trabajar en otro país",
  // Locución: voz «Martín» (ElevenLabs v4), o grabada a mano. Música: «Nostalgic» (80 bpm) de la biblioteca de Orshot.
  musica: "https://cdn.orshot.com/library/music/e4e478ec-993d-480c-914c-36baf7b12ac9.m4a",
  musicaBucle: { ini: 3, fin: 15 },
  volumenMusica: 0.14,
  marcaAgua: "22",
  guion: `¿Trabajaste unos años en Alemania, en Francia o en Suiza? Esos años no se pierden.

Para jubilarte, la Seguridad Social los suma a los de España. Con 10 años aquí y 12 en Alemania, cuentas 22... y ya tienes los 15 mínimos.

Luego, cada país te paga su parte. España, por sus años. Alemania, por los suyos. Y cada uno, a su edad de jubilación.

Vale para toda la Unión Europea, Suiza, el Reino Unido y buena parte de Latinoamérica. Los países sin convenio, no cuentan.

Se pide en el INSS, y ellos piden tus datos al otro país. Lleva todo lo que tengas de allí: contratos, números de afiliación... Acelera mucho.

[warmly] Pásaselo a quien emigró de joven.`,

  escenas: [
    { // 0 · Gancho
      fondo: { clip: "pixabay:3178", desde: 0, x: 0.45 },
      html: `
        <div class="kicker" data-a="fijo">¿Trabajaste fuera?</div>
        <div class="titular" data-a="fijo">Esos años <mark>no se pierden</mark></div>
        <div class="sub" data-en="Esos años" data-a="sube">Alemania, Francia, Suiza…</div>`,
    },
    { en: "Para jubilarte",
      fondo: { clip: "pixabay:32000", desde: 2, x: 0.5 },
      html: `
        <div class="kicker">Se suman</div>
        <div class="dos">
          <div class="caja" data-en="10 años aquí" data-a="sube"><div class="etq">España</div><div class="v">10</div><div class="d">años</div></div>
          <div class="caja" data-en="12 en Alemania" data-a="sube"><div class="etq">Alemania</div><div class="v">12</div><div class="d">años</div></div>
        </div>
        <div class="cifra m verde" data-en="cuentas 22" data-a="cuenta" data-valor="22" data-suf=" años">0 años</div>
        <div class="sello verde" data-en="15 mínimos" data-a="sello">Mínimo de 15: cumplido</div>`,
    },
    { en: "Luego",
      fondo: { clip: "pixabay:293084", desde: 0, x: 0.38 },
      html: `
        <div class="kicker">Cada país paga su parte</div>
        <div class="fila" data-en="España, por sus" data-a="sube"><div class="ico n">ES</div><div>España, por tus años en España</div></div>
        <div class="fila" data-en="Alemania, por los" data-a="sube"><div class="ico n">DE</div><div>Alemania, por los de Alemania</div></div>
        <div class="nota" data-en="Y cada uno" data-a="aparece">Cada una a su edad de jubilación.</div>`,
    },
    { en: "Vale para toda",
      fondo: { clip: "pixabay:216951", desde: 0, x: 0.5 },
      html: `
        <div class="kicker">¿Qué países cuentan?</div>
        <div class="fila" data-en="Unión Europea" data-a="sube"><div class="ico si">✓</div><div>Unión Europea, Suiza y Reino Unido</div></div>
        <div class="fila" data-en="buena parte de" data-a="sube"><div class="ico si">✓</div><div>Buena parte de Latinoamérica<small>países con convenio con España</small></div></div>
        <div class="fila" data-en="sin convenio" data-a="sube"><div class="ico no">✕</div><div>Países sin convenio</div></div>`,
    },
    { en: "Se pide",
      fondo: { clip: "pixabay:349087", desde: 0, x: 0.68 },
      html: `
        <div class="kicker">Cómo se pide</div>
        <div class="paso" data-a="sube"><div class="num">1</div><div class="tx">En el INSS<small>ellos piden tus datos al otro país</small></div></div>
        <div class="paso" data-en="Lleva todo" data-a="sube"><div class="num">2</div><div class="tx">Lleva todo lo de allí<small>contratos, números de afiliación…</small></div></div>`,
    },
    { en: "Pásaselo",
      fondo: { clip: "pixabay:29808", desde: 4, x: 0.72 },
      html: `
        <div class="cta">
          <div class="icono" data-a="pop">${COMPARTIR}</div>
          <div class="titular m" data-a="sube">Pásaselo a quien <mark>emigró de joven</mark></div>
          <div class="url" data-a="sube" data-dur="0.6">Todos los países: jubilometro.com</div>
          <div class="aviso" data-a="aparece">Reglamento (CE) 883/2004 y convenios bilaterales. Se tramita en el país donde vives.</div>
        </div>`,
    },
  ],

  portada: `
    <div class="kicker" data-a="fijo">¿Trabajaste en otro país?</div>
    <div class="titular" data-a="fijo">Esos años <mark>cuentan</mark></div>
    <div class="sub" data-a="fijo">Así se suman a tu pensión</div>`,
};

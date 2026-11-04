// Reel 6 · Jubilación demorada: 4 % más por año, un pago único o una mezcla
// Fuente: contenido/jubilacion/demorada/articulo.md (opciones del art. 210 LGSS, semestres desde 2025, tabla con 2.000 €)
const GUARDAR = `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>`;

export default {
  tema: "Jubilación demorada",
  // Locución: voz «Martín» (ElevenLabs v4, español peninsular). El guion es el texto exacto que lee la voz;
  // las indicaciones entre corchetes ([warmly]…) no salen en los subtítulos.
  musica: "../../musica-fondo.mp3",
  marcaAgua: "+4 %",
  guion: `[warmly] Si retrasas tu jubilación, la Seguridad Social te paga más... y para siempre.

Por cada año completo que sigas trabajando después de tu edad ordinaria, eliges: un 4 % más de pensión de por vida, un pago único, que según la Seguridad Social va de unos 4.800 a 13.500 euros por año, o una mezcla de los dos.

Y desde el segundo año, también cuentan los semestres: un 2 % por cada seis meses.

Un ejemplo. Con una pensión de 2.000 euros, si retrasas dos años y medio, cobras 2.200 al mes. 200 euros más en cada paga.

Eso sí: solo cuentan años y semestres completos, y tienes que seguir trabajando y cotizando.

Guárdatelo si te quedan pocos años para jubilarte.`,

  escenas: [
    { // 0 · Gancho
      html: `
        <div class="kicker" data-a="fijo">Retrasar la jubilación</div>
        <div class="cifra verde" data-a="fijo">+4 %</div>
        <div class="titular s" data-a="fijo">de pensión por cada año… de por vida</div>`,
    },
    { en: "Por cada año",
      html: `
        <div class="kicker">Por cada año completo de más, eliges</div>
        <div class="paso" data-en="un 4 %" data-a="sube"><div class="num">1</div><div class="tx">+4 % de pensión<small>para toda la vida</small></div></div>
        <div class="paso" data-en="un pago único" data-a="sube"><div class="num">2</div><div class="tx">Un pago único<small>de unos 4.800 a 13.500 € por año, según la Seguridad Social</small></div></div>
        <div class="paso" data-en="o una mezcla" data-a="sube"><div class="num">3</div><div class="tx">Una mezcla<small>desde el 28/08/2026 exige al menos 2 años de demora</small></div></div>`,
    },
    { en: "Y desde el segundo",
      html: `
        <div class="kicker">Desde el segundo año</div>
        <div class="cifra azul" data-en="un 2 %" data-a="pop">+2 %</div>
        <div class="titular m" data-a="sube">por cada semestre completo</div>
        <div class="nota" data-a="aparece">Novedad desde abril de 2025.</div>`,
    },
    { en: "Un ejemplo",
      html: `
        <div class="kicker">Ejemplo · pensión de 2.000 €</div>
        <div class="tarjeta">
          <div class="par" data-a="sube"><span>Sin retrasar</span><b>2.000 €</b></div>
          <div class="par" data-en="si retrasas dos" data-a="sube"><span>2 años y medio más tarde</span><b class="verde">2.200 €</b></div>
        </div>
        <div class="titular m" data-en="200 euros más" data-a="sube"><span class="verde" data-en="200 euros más" data-a="cuenta" data-valor="200" data-pre="+" data-suf=" €">+0 €</span> en cada paga</div>`,
    },
    { en: "Eso sí",
      html: `
        <div class="kicker">Eso sí</div>
        <div class="fila" data-a="sube"><div class="ico n">!</div><div>Solo cuentan años y semestres completos</div></div>
        <div class="fila" data-en="y tienes que" data-a="sube"><div class="ico n">!</div><div>Hay que seguir trabajando y cotizando</div></div>`,
    },
    { en: "Guárdatelo",
      html: `
        <div class="cta">
          <div class="icono" data-a="pop">${GUARDAR}</div>
          <div class="titular m" data-a="sube">Guárdatelo si te quedan <mark>pocos años</mark> para jubilarte</div>
          <div class="url" data-a="sube" data-dur="0.6">Las tres opciones: jubilometro.com</div>
          <div class="aviso" data-a="aparece">Importes brutos, sin revalorizaciones (art. 210 de la Ley General de la Seguridad Social). Pide una simulación antes de elegir.</div>
        </div>`,
    },
  ],

  portada: `
    <div class="kicker" data-a="fijo">Jubilación demorada</div>
    <div class="cifra xl verde" data-a="fijo">+4 %</div>
    <div class="titular" data-a="fijo">por cada año que retrasas</div>
    <div class="sub" data-a="fijo">O un cheque de hasta 13.500 €</div>`,
};

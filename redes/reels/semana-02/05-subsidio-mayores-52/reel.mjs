// Reel 5 · Subsidio para mayores de 52 años: 480 € al mes hasta jubilarte y cotiza por ti
// Fuente: contenido/jubilacion/subsidio-mayores-52/articulo.md (requisitos, cuantía 2026 y efecto en la pensión)
const ENVIAR = `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7z"/></svg>`;

export default {
  tema: "Subsidio +52",
  // Locución: voz «Martín» (ElevenLabs v4, español peninsular). El guion es el texto exacto que lee la voz;
  // las indicaciones entre corchetes ([warmly]…) no salen en los subtítulos.
  musica: "../../musica-fondo.mp3",
  marcaAgua: "+52",
  guion: `[warmly] Si tienes 52 años o más y estás en paro, hay un subsidio que te paga hasta que te jubilas... y encima cotiza por ti.

Son 480 euros al mes en 2026, y dura hasta tu edad ordinaria de jubilación.

Mientras lo cobras, el SEPE cotiza por ti sobre 1.780 euros con 50 al mes. Y eso cuenta para calcular tu pensión.

¿Qué te piden? Tener 52 años o más, estar en paro y tener ya cotizado lo necesario para jubilarte, salvo la edad. Además, 6 años cotizados por desempleo. Y que tus rentas propias no pasen de 915 euros con 75 al mes.

Ojo: si cotizabas por bases altas, estos años pueden bajar algo tu pensión.

Pásaselo a alguien que esté en paro y cerca de jubilarse.`,

  escenas: [
    { // 0 · Gancho
      html: `
        <div class="kicker" data-a="fijo">En paro con 52 años o más</div>
        <div class="cifra verde" data-a="fijo">480 €</div>
        <div class="titular s" data-a="fijo">al mes hasta jubilarte… y el SEPE cotiza por ti</div>`,
    },
    { en: "Son 480",
      html: `
        <div class="kicker">Subsidio para mayores de 52 años · 2026</div>
        <div class="tarjeta">
          <div class="par" data-a="sube"><span>Cuantía</span><b>480 €/mes</b></div>
          <div class="par" data-en="y dura hasta" data-a="sube"><span>Duración</span><b>hasta tu edad ordinaria</b></div>
        </div>
        <div class="nota" data-a="aparece">80 % del IPREM, en 12 pagas.</div>`,
    },
    { en: "Mientras lo cobras",
      html: `
        <div class="kicker">Y además cotiza por ti</div>
        <div class="cifra m azul" data-en="sobre 1.780" data-a="cuenta" data-valor="1780.5" data-dec="2" data-suf=" €">0,00 €</div>
        <div class="titular s" data-a="sube">al mes de base de cotización (125 % de la mínima)</div>
        <div class="fila" data-en="Y eso cuenta" data-a="sube"><div class="ico si">✓</div><div>Cuenta para calcular tu pensión<small>no para completar los 15 años mínimos</small></div></div>`,
    },
    { en: "¿Qué te piden?",
      html: `
        <div class="kicker">Qué te piden</div>
        <div class="fila" data-en="Tener 52" data-a="sube"><div class="ico n">1</div><div>52 años o más y en paro</div></div>
        <div class="fila" data-en="tener ya cotizado" data-a="sube"><div class="ico n">2</div><div>Lo cotizado para jubilarte, salvo la edad<small>15 años, 2 de ellos en los últimos 15</small></div></div>
        <div class="fila" data-en="Además, 6" data-a="sube"><div class="ico n">3</div><div>6 años cotizados por desempleo</div></div>
        <div class="fila" data-en="Y que tus rentas" data-a="sube"><div class="ico n">4</div><div>Rentas propias de hasta 915,75 €/mes<small>no cuentan las de tu familia</small></div></div>`,
    },
    { en: "Ojo: si",
      html: `
        <div class="tarjeta mala">
          <div class="etq">Ojo</div>
          <div class="titular s">Si cotizabas por bases altas, estos años pueden <mark>bajar algo</mark> tu pensión</div>
          <div class="nota">Ejemplo del artículo: siempre por 3.000 €/mes y 5 años en el subsidio, unos 8 % menos.</div>
        </div>`,
    },
    { en: "Pásaselo",
      html: `
        <div class="cta">
          <div class="icono" data-a="pop">${ENVIAR}</div>
          <div class="titular m" data-a="sube">Envíaselo a quien esté en paro y <mark>cerca de jubilarse</mark></div>
          <div class="url" data-a="sube" data-dur="0.6">Requisitos completos: jubilometro.com</div>
          <div class="aviso" data-a="aparece">Información general con datos del SEPE para 2026. Confirma tu caso con el SEPE.</div>
        </div>`,
    },
  ],

  portada: `
    <div class="kicker" data-a="fijo">En paro con 52 años o más</div>
    <div class="cifra xl verde" data-a="fijo">480 €</div>
    <div class="titular" data-a="fijo">al mes hasta jubilarte</div>
    <div class="sub" data-a="fijo">Y el SEPE sigue cotizando por ti</div>`,
};

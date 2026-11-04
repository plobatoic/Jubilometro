// Reel 4 · 2027: las tres cifras que no puedes confundir (67, 37 y 38 años y 6 meses)
// Fuente: contenido/jubilacion/edad-de-jubilacion/articulo.md (datos clave de 2027)
const GUARDAR = `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>`;

export default {
  tema: "Jubilación 2027",
  // Locución: voz «Martín» (ElevenLabs v4, español peninsular). El guion es el texto exacto que lee la voz;
  // las indicaciones entre corchetes ([warmly]…) no salen en los subtítulos.
  musica: "../../musica-fondo.mp3",
  marcaAgua: "2027",
  guion: `[curious] ¿Te jubilas en 2027 o más tarde? Pues hay tres cifras que no puedes confundir: 67, 37... y 38 y medio.

67 es la edad ordinaria de jubilación.

38 años y 6 meses cotizados es lo que te deja jubilarte a los 65, sin recorte.

Y 37 años es lo que necesitas para cobrar el 100 % de tu base reguladora. [warmly] Ojo, porque aquí se lía mucha gente: con 37 años cobras el 100 %... pero a los 67, no a los 65.

Y el mínimo para tener pensión siguen siendo 15 años.

Guárdatelo, que con la ley actual estas cifras ya no cambian.`,

  escenas: [
    { // 0 · Gancho
      html: `
        <div class="kicker" data-a="fijo">Jubilación desde 2027</div>
        <div class="cifra m" data-a="fijo"><span class="ambar">67</span> · <span class="azul">37</span> · <span class="verde">38½</span></div>
        <div class="titular s" data-a="fijo">¿Sabes qué significa cada una?</div>
        <div class="sub" data-en="no puedes confundir" data-a="sube">Y no significan lo mismo</div>`,
    },
    { en: "67 es la",
      html: `
        <div class="cifra ambar" data-a="pop">67</div>
        <div class="titular m" data-a="sube">años: la edad ordinaria de jubilación</div>
        <div class="nota" data-a="aparece">Para quien se jubila en 2027 o después. El calendario de subida que empezó en 2013 termina aquí.</div>`,
    },
    { en: "38 años y 6",
      html: `
        <div class="cifra m verde" data-a="pop">38 a. y 6 m.</div>
        <div class="titular m" data-en="jubilarte a los 65" data-a="sube">cotizados = te jubilas a los <mark>65</mark></div>
        <div class="fila" data-en="sin recorte" data-a="sube"><div class="ico si">✓</div><div>Sin recorte en la pensión</div></div>`,
    },
    { en: "Y 37 años",
      html: `
        <div class="cifra azul" data-a="pop">37</div>
        <div class="titular m" data-en="para cobrar el" data-a="sube">años: cobras el 100 % de tu base reguladora</div>
        <div class="tarjeta mala" data-en="Ojo, porque" data-a="sube">
          <div class="etq">Lo que se confunde</div>
          <div class="fila" data-en="pero a los" data-a="sube"><div class="ico no">✕</div><div>Con 37 años no te jubilas a los 65<small>cobras el 100 %, pero a los 67</small></div></div>
        </div>`,
    },
    { en: "Y el mínimo",
      html: `
        <div class="kicker">Y el mínimo para tener pensión</div>
        <div class="cifra" data-a="pop">15</div>
        <div class="titular m" data-a="sube">años cotizados</div>
        <div class="nota" data-a="aparece">2 de ellos dentro de los 15 años anteriores a jubilarte.</div>`,
    },
    { en: "Guárdatelo",
      html: `
        <div class="cta">
          <div class="icono" data-a="pop">${GUARDAR}</div>
          <div class="titular m" data-a="sube"><span class="ambar">67</span> · <span class="azul">37</span> · <span class="verde">38½</span><br>Guárdatelo</div>
          <div class="url" data-a="sube" data-dur="0.6">Tu fecha exacta: jubilometro.com</div>
          <div class="aviso" data-a="aparece">Información general (art. 205 y disposiciones transitorias 7.ª y 9.ª de la Ley General de la Seguridad Social). Confirma tu caso con la Seguridad Social.</div>
        </div>`,
    },
  ],

  portada: `
    <div class="kicker" data-a="fijo">Jubilación 2027</div>
    <div class="cifra xl" data-a="fijo"><span class="ambar">67</span>·<span class="azul">37</span></div>
    <div class="cifra m verde" data-a="fijo">38 y medio</div>
    <div class="titular" data-a="fijo">Las 3 cifras que no puedes confundir</div>`,
};

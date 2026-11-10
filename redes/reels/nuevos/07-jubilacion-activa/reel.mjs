// Reel 7 · Jubilación activa: cobrar la pensión y trabajar a la vez
// Fuente: contenido/jubilacion/activa/articulo.md (RDL 11/2024, en vigor desde el 1/04/2025)
const COMPARTIR = `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7z"/></svg>`;

export default {
  tema: "Jubilación activa",
  // Locución: voz «Martín» (ElevenLabs v4, español peninsular), o grabada a mano. El guion es el texto exacto que se lee;
  // lo que va entre corchetes es entonación y no sale en los subtítulos.
  // Música: «Morning routine» (96 bpm, tranquila) de la biblioteca de Orshot, uso comercial libre.
  musica: "https://cdn.orshot.com/library/music/a030c5e7-9ee5-4ece-af1a-7cd55e138500.m4a",
  musicaBucle: { ini: 2.5, fin: 12.5 },
  volumenMusica: 0.14,
  marcaAgua: "45 %",
  guion: `[curious] ¿Sabías que puedes cobrar la pensión y seguir trabajando a la vez? Se llama jubilación activa, y desde abril de 2025 es mucho más fácil de pedir.

La condición es una: retrasar tu jubilación al menos un año desde tu edad ordinaria.

Y cuanto más retrasas, más cobras. Con un año, el 45 % de tu pensión. Con dos, el 55. Con tres, el 65. Con cuatro, el 80... y con cinco, la pensión entera.

Un ejemplo. Rosa tiene una pensión de 1.800 euros. Retrasó un año, así que cobra 810 euros al mes... y además, su sueldo.

Y el día que deja de trabajar, vuelve a cobrar los 1.800 completos.

[warmly] Pásaselo a quien esté pensando en seguir un poco más.`,

  escenas: [
    { // 0 · Gancho
      fondo: { clip: "pixabay:166808", desde: 0, x: 0.42 },
      html: `
        <div class="kicker" data-a="fijo">Jubilación activa</div>
        <div class="titular" data-a="fijo">Cobrar la pensión <mark>y</mark> tu sueldo</div>
        <div class="sub" data-en="Se llama" data-a="sube">Legal, y desde abril de 2025 más fácil</div>`,
    },
    { en: "La condición",
      fondo: { clip: "pixabay:197974", desde: 0, x: 0.4 },
      html: `
        <div class="kicker">La única condición</div>
        <div class="cifra m ambar" data-en="al menos un año" data-a="pop">+1 año</div>
        <div class="titular s" data-en="al menos un año" data-a="sube">de retraso sobre tu edad ordinaria de jubilación</div>`,
    },
    { en: "Y cuanto más",
      fondo: { clip: "pixabay:115790", desde: 1, x: 0.55 },
      clase: "abajo",
      html: `
        <div class="kicker">Lo que cobras de tu pensión</div>
        <div class="tarjeta">
          <div class="par" data-en="Con un año" data-a="sube"><span>1 año de retraso</span><b>45 %</b></div>
          <div class="par" data-en="Con dos" data-a="sube"><span>2 años</span><b>55 %</b></div>
          <div class="par" data-en="Con tres" data-a="sube"><span>3 años</span><b>65 %</b></div>
          <div class="par" data-en="Con cuatro" data-a="sube"><span>4 años</span><b>80 %</b></div>
          <div class="par" data-en="y con cinco" data-a="sube"><span>5 años</span><b class="verde">100 %</b></div>
        </div>`,
    },
    { en: "Un ejemplo",
      fondo: { clip: "pixabay:1108", desde: 0, x: 0.78 },
      html: `
        <div class="kicker">Caso de ejemplo · Rosa</div>
        <div class="tarjeta">
          <div class="par" data-en="tiene una pensión" data-a="sube"><span>Su pensión</span><b>1.800 €</b></div>
          <div class="par" data-en="Retrasó un año" data-a="sube"><span>Retrasó</span><b>1 año → 45 %</b></div>
        </div>
        <div class="cifra m verde" data-en="cobra 810" data-a="cuenta" data-valor="810" data-suf=" €">0 €</div>
        <div class="titular s" data-en="y además" data-a="sube">al mes… <mark>+ su sueldo</mark></div>`,
    },
    { en: "Y el día",
      fondo: { clip: "pixabay:58142", desde: 1, x: 0.5 },
      html: `
        <div class="kicker">Cuando deja de trabajar</div>
        <div class="titular m" data-en="vuelve a cobrar" data-a="sube"><span class="tachable tenue" data-en="vuelve a cobrar" data-a="tacha">810 €</span> → <span class="verde">1.800 €</span></div>
        <div class="sello verde" data-en="completos" data-a="sello">Pensión entera</div>`,
    },
    { en: "Pásaselo",
      fondo: { clip: "pixabay:172681", desde: 2, x: 0.74 },
      clase: "abajo", // el mensaje por debajo de la cara de la mujer
      html: `
        <div class="cta">
          <div class="icono" data-a="pop">${COMPARTIR}</div>
          <div class="titular m" data-a="sube">Pásaselo a quien quiera <mark>seguir un poco más</mark></div>
          <div class="url" data-a="sube" data-dur="0.6">Todos los detalles: jubilometro.com</div>
          <div class="aviso" data-a="aparece">Porcentajes de la jubilación activa desde el 1/04/2025 (RDL 11/2024). Cifras brutas, de ejemplo.</div>
        </div>`,
    },
  ],

  portada: `
    <div class="kicker" data-a="fijo">Jubilación activa</div>
    <div class="titular" data-a="fijo">Pensión <mark>+</mark> sueldo</div>
    <div class="sub" data-a="fijo">Sí, a la vez. Te cuento cómo</div>`,
};

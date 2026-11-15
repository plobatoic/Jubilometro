// Reel 17 · Jubilarte 2 años antes te puede costar 60.000 € (versión corta con muñecos 3D)
// El reel con más alcance de la primera quincena (R2, 11-12/11) contado otra vez en ~30 s, con el gancho en euros desde el primer fotograma.
// Fuente: contenido/jubilacion/compensa-jubilarse-antes/articulo.md (mismas cifras que semana-01/02-jubilarse-antes-60000).
const GUARDAR = `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>`;

export default {
  tema: "Jubilación anticipada",
  estilo: "dinamico",
  velo: "suave",
  musica: "https://cdn.orshot.com/library/music/04ccbe32-a3e1-4c80-aa68-879342c36b94.m4a",
  musicaBucle: { ini: 2.727, fin: 13.636 },
  volumenMusica: 0.12,
  guion: `Jubilarte dos años antes te puede costar [[60.000|sesenta mil]] euros.

Pongamos que Luis se jubila a los [[63|sesenta y tres]]. Le recortan un [[19%|diecinueve por ciento]]: cobra [[1.620|mil seiscientos veinte]] euros en vez de [[2.000|dos mil]].

Sí, cobra dos años más... pero pierde [[380|trescientos ochenta]] euros en cada paga, para siempre.

A los [[73|setenta y tres]] y medio ya ha perdido lo que ganó. Y si vive hasta los [[85|ochenta y cinco]], [[60.000|sesenta mil]] euros menos.

Guárdatelo antes de pedir la jubilación.`,

  escenas: [
    { clase: "arriba",
      animacion: {
        set: "oficina",
        camara: { desde: { pos: [0.6, 3.9, 10.6], mira: [0.2, 2.35, -0.6] }, hasta: { pos: [0.5, 3.8, 9.7], mira: [0.2, 2.3, -0.6] } },
        actores: { luis: { pos: [-0.55, 0.15], giro: 22, pose: "carpeta", cara: "contenta", acciones: [{ en: "te puede costar", pose: "encoge", cara: "sorpresa" }] } },
        atrezo: [{ tipo: "carpeta", pos: [0.8, 1.38, -0.95], giro: -8, texto: "Jubilación anticipada" }],
      },
      html: `
        <div class="kicker" data-a="fijo">Jubilarte 2 años antes</div>
        <div class="gigante relieve rojo" data-a="fijo" style="font-size:190px">−60.000 €</div>`,
    },
    { en: "Pongamos que Luis", clase: "arriba", transicion: "latigo",
      animacion: {
        set: "salon",
        camara: { desde: { pos: [1.6, 2.9, 10.6], mira: [0, 2.95, 0] }, hasta: { pos: [1.0, 2.85, 9.6], mira: [0, 2.9, 0] } },
        actores: { luis: { pos: [0.2, 0.5], giro: -10, pose: "piensa", cara: "neutra", acciones: [{ en: "Le recortan", pose: "encoge", cara: "preocupada" }] } },
      },
      html: `
        <div class="kicker">Luis se jubila a los 63</div>
        <div class="tarjeta">
          <div class="par" data-en="Le recortan" data-a="sube"><span>Recorte</span><b class="rojo">−19%</b></div>
          <div class="par" data-en="cobra 1.620" data-a="sube"><span>Cobra al mes</span><b><span class="tachable tenue" data-en="en vez de" data-a="tacha">2.000 €</span> 1.620 €</b></div>
        </div>`,
    },
    { en: "Sí, cobra", clase: "arriba", transicion: "zoom",
      animacion: {
        set: "salon",
        camara: { desde: { pos: [0, 2.9, 8.8], mira: [0, 3.05, 0] }, hasta: { pos: [0, 2.85, 7.9], mira: [0, 3.0, 0] } },
        actores: { luis: { pos: [0, 0.4], giro: 0, pose: "celebra", cara: "feliz", acciones: [{ en: "pero pierde", pose: "encoge", cara: "preocupada" }] } },
        atrezo: [{ tipo: "monedas", en: "Sí, cobra", n: 30 }],
      },
      html: `
        <div class="titular relieve" data-en="dos años más" data-a="sube">2 años <span class="verde">más cobrando</span>…</div>
        <div class="cifra m rojo" data-en="pero pierde" data-a="golpe3d">−380 €</div>
        <div class="sub" data-en="para siempre" data-a="sube">en cada paga, para siempre</div>`,
    },
    { en: "A los 73", clase: "arriba", transicion: "giro",
      animacion: {
        set: "salon",
        camara: { desde: { pos: [-0.8, 3.1, 11.4], mira: [0.3, 3.0, -1] }, hasta: { pos: [-0.5, 3.0, 10.4], mira: [0.4, 2.95, -1] } },
        actores: { luis: { pos: [-0.4, 0.5], giro: 28, pose: "piensa", cara: "neutra", acciones: [{ en: "hasta los 85", pose: "senalaArriba", cara: "sorpresa" }] } },
        atrezo: [{ tipo: "calendarioPared", pos: [1.55, 2.25, -3.08], de: ["EMPATA A LOS", "73,5", "#3d86e0"], a: ["A LOS 85", "−60.000", "#c24b43"], en: "hasta los 85" }],
      },
      html: `
        <div class="tarjeta" style="zoom:0.86">
          <div class="linea">
            <div class="hito" data-en="A los 73" data-a="sube"><div class="f">73 años y medio</div><div class="t">Pierde lo que ganó</div></div>
            <div class="hito mal" data-en="hasta los 85" data-a="sube"><div class="f">Si vive hasta los 85</div><div class="t">60.000 € menos</div></div>
          </div>
        </div>`,
    },
    { en: "Guárdatelo", clase: "arriba", transicion: "sube",
      animacion: {
        set: "salon",
        camara: { desde: { pos: [0.2, 2.9, 12.0], mira: [0, 3.35, 0] }, hasta: { pos: [0.1, 2.9, 11.2], mira: [0, 3.3, 0] } },
        actores: {
          rosa: { pos: [-0.75, 0.6], giro: 8, pose: "pulgar", cara: "feliz" },
          luis: { pos: [0.95, 0.3], giro: -10, pose: "piensa", cara: "contenta" },
        },
      },
      html: `
        <div class="cta">
          <div class="icono" data-a="latido">${GUARDAR}</div>
          <div class="titular m relieve" data-a="sube">Guárdatelo <span class="ambar">antes de pedir la jubilación</span></div>
          <div class="url" data-a="sube" data-dur="0.6">Haz tu cuenta: jubilometro.com</div>
          <div class="aviso" data-a="aparece">Ejemplo: 63 años, 39 cotizados, base reguladora de 2.000 €, anticipada voluntaria. Importes brutos, sin revalorizaciones. Información general.</div>
        </div>`,
    },
  ],

  portada: `
    <div class="kicker" data-a="fijo">Jubilarte 2 años antes</div>
    <div class="titular relieve" data-a="fijo">Te puede costar <span class="rojo">60.000 €</span></div>
    <div class="sub" data-a="fijo">La cuenta, con un ejemplo</div>`,
};

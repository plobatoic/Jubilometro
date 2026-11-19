// Reel base del formato «presentador»: Rosa (muñeco 3D) explica a cámara con la boca sincronizada,
// vídeo real detrás (B-roll) y gráficos animados encima. Modelo para los reels nuevos (19/11/2026).
// Tema: jubilarte 2 años antes te puede costar 60.000 € (el reel con más alcance; cifras de
// contenido/jubilacion/compensa-jubilarse-antes/articulo.md, las mismas que semana-01/02 y nuevos/17).
const GUARDAR = `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>`;
// Rosa como presentadora: plano medio abajo a la derecha, sobre el vídeo
const cam = (dx = 0) => ({ desde: { pos: [-0.55 + dx, 2.55, 11.2], mira: [-0.6 + dx, 4.25, 0] }, hasta: { pos: [-0.5 + dx, 2.55, 10.4], mira: [-0.55 + dx, 4.2, 0] } });
const rosa = (pose, cara, acciones = []) => ({ rosa: { pos: [0.55, 0], giro: -14, pose, cara, habla: true, acciones } });
const LOWER = `<div style="position:absolute;left:40px;bottom:150px;background:rgba(19,33,59,.88);border-left:10px solid #f5b83d;padding:14px 26px;border-radius:14px;font-size:34px;font-weight:800;color:#fff" data-a="sube">Rosa · <span style="font-weight:600;opacity:.85">Jubilómetro</span></div>`;

export default {
  tema: "Jubilación anticipada",
  estilo: "dinamico",
  velo: "suave",
  musica: "https://cdn.orshot.com/library/music/04ccbe32-a3e1-4c80-aa68-879342c36b94.m4a",
  musicaBucle: { ini: 2.727, fin: 13.636 },
  volumenMusica: 0.1,
  guion: `Jubilarte dos años antes te puede costar [[60.000|sesenta mil]] euros.

Pongamos que Luis se jubila a los [[63|sesenta y tres]]. Le recortan un [[19%|diecinueve por ciento]]: cobra [[1.620|mil seiscientos veinte]] euros en vez de [[2.000|dos mil]].

Sí, cobra dos años más... pero pierde [[380|trescientos ochenta]] euros en cada paga, para siempre.

A los [[73|setenta y tres]] y medio ya ha perdido lo que ganó. Y si vive hasta los [[85|ochenta y cinco]], [[60.000|sesenta mil]] euros menos.

Guárdatelo antes de pedir la jubilación.`,

  escenas: [
    { clase: "arriba", fondo: { clip: "pixabay:5132", desde: 1, x: 0.5 },
      animacion: { set: "presentador", camara: cam(), actores: rosa("senala", "sorpresa", [{ en: "te puede costar", pose: "encoge", cara: "preocupada" }]) },
      html: `
        <div class="kicker" data-a="fijo">Jubilarte 2 años antes</div>
        <div class="gigante relieve rojo" data-a="golpe3d" style="font-size:190px">−60.000 €</div>${LOWER}`,
    },
    { en: "Pongamos que Luis", clase: "arriba", transicion: "latigo", fondo: { clip: "pixabay:59139", desde: 2, x: 0.5 },
      animacion: { set: "presentador", camara: cam(0.1), actores: rosa("piensa", "neutra", [{ en: "Le recortan", pose: "senala", cara: "preocupada" }]) },
      html: `
        <div class="kicker">Ejemplo · Luis se jubila a los 63</div>
        <div class="tarjeta">
          <div class="par" data-en="Le recortan" data-a="sube"><span>Recorte</span><b class="rojo">−19%</b></div>
          <div class="par" data-en="cobra 1.620" data-a="sube"><span>Cobra al mes</span><b><span class="tachable tenue" data-en="en vez de" data-a="tacha">2.000 €</span> 1.620 €</b></div>
        </div>`,
    },
    { en: "Sí, cobra", clase: "arriba", transicion: "zoom", fondo: { clip: "pixabay:153986", desde: 1, x: 0.5 },
      animacion: { set: "presentador", camara: cam(-0.05), actores: rosa("senalaArriba", "contenta", [{ en: "pero pierde", pose: "encoge", cara: "preocupada" }]) },
      html: `
        <div class="titular relieve" data-en="dos años más" data-a="sube">2 años <span class="verde">más cobrando</span>…</div>
        <div class="cifra m rojo" data-en="pero pierde" data-a="golpe3d">−380 €</div>
        <div class="sub" data-en="para siempre" data-a="sube">en cada paga, para siempre</div>`,
    },
    { en: "A los 73", clase: "arriba", transicion: "giro", fondo: { clip: "pixabay:87146", desde: 0, x: 0.45 },
      animacion: { set: "presentador", camara: cam(0.05), actores: rosa("piensa", "neutra", [{ en: "hasta los 85", pose: "senala", cara: "sorpresa" }]) },
      html: `
        <div class="tarjeta" style="zoom:0.86">
          <div class="linea">
            <div class="hito" data-en="A los 73" data-a="sube"><div class="f">73 años y medio</div><div class="t">Pierde lo que ganó</div></div>
            <div class="hito mal" data-en="hasta los 85" data-a="sube"><div class="f">Si vive hasta los 85</div><div class="t">60.000 € menos</div></div>
          </div>
        </div>`,
    },
    { en: "Guárdatelo", clase: "arriba", transicion: "sube", fondo: { clip: "pixabay:68559", desde: 1, x: 0.5 },
      animacion: { set: "presentador", camara: cam(), actores: rosa("pulgar", "feliz") },
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
    <div class="sub" data-a="fijo">Te lo explico con un ejemplo</div>`,
};

// Reel 8 · Despido a los 60: paro, subsidio y jubilación, en ese orden
// Fuente: contenido/jubilacion/despido-a-los-60/articulo.md y contenido/jubilacion/anticipada-involuntaria/articulo.md
const GUARDAR = `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>`;

export default {
  estilo: "dinamico",
  velo: "suave",
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
      clase: "arriba", transicion: "zoom",
      animacion: { set: "oficina", camara: { desde: { pos: [0.6, 3.9, 10.6], mira: [0.2, 2.35, -0.6] }, hasta: { pos: [0.5, 3.8, 9.7], mira: [0.2, 2.3, -0.6] } }, actores: { luis: { pos: [-0.55, 0.15], giro: 22, pose: "carpeta", cara: "preocupada", acciones: [{ en: "no estás perdido", pose: "pulgar", cara: "contenta" }] } }, atrezo: [{ tipo: "carpeta", pos: [0.8, 1.38, -0.95], giro: -8, texto: "Carta de despido" }, { tipo: "bocadillo", quien: "luis", texto: "?", t: 0.3, hasta: 2.2 }] },
      html: `
        <div class="kicker" data-a="fijo">¿Despedido a los 60?</div>
        <div class="titular relieve" data-a="fijo">No estás perdido</div>
        <div class="sub" data-en="Hay un camino" data-a="sube">Hay un camino en 3 etapas 👇</div>`,
    },
    { en: "Primero, el paro",
      clase: "arriba", transicion: "latigo",
      animacion: { set: "salon", camara: { desde: { pos: [0, 2.9, 8.8], mira: [0, 3.05, 0] }, hasta: { pos: [0, 2.85, 7.9], mira: [0, 3.0, 0] } }, actores: { luis: { pos: [0, 0.4], giro: 0, pose: "piensa", cara: "neutra", acciones: [{ en: "te siguen cotizando", pose: "pulgar", cara: "contenta" }] } } },
      html: `
        <div class="paso" data-a="sube"><div class="num">1</div><div class="tx">El paro<small>hasta 2 años, con 2.160 días cotizados en los últimos 6</small></div></div>
        <div class="fila" data-en="te siguen cotizando" data-a="sube"><div class="ico si">✓</div><div>Mientras lo cobras, sigues cotizando<small>para tu jubilación</small></div></div>`,
    },
    { en: "Segundo",
      clase: "arriba", transicion: "zoom",
      animacion: { set: "salon", camara: { desde: { pos: [1.6, 2.9, 10.6], mira: [0, 2.95, 0] }, hasta: { pos: [1.0, 2.85, 9.6], mira: [0, 2.9, 0] } }, actores: { luis: { pos: [0.2, 0.5], giro: -10, pose: "reposo", cara: "contenta", acciones: [{ en: "480 euros", pose: "celebra", cara: "feliz" }] } }, atrezo: [{ tipo: "monedas", en: "480 euros", n: 36 }] },
      html: `
        <div class="paso" data-a="sube"><div class="num">2</div><div class="tx">Subsidio para mayores de 52</div></div>
        <div class="cifra m ambar" data-en="480 euros" data-a="cuenta" data-valor="480" data-suf=" €">0 €</div>
        <div class="titular s" data-en="hasta tu edad" data-a="sube">al mes, hasta tu edad de jubilación</div>`,
    },
    { en: "Y tercero",
      clase: "arriba", transicion: "giro",
      animacion: { set: "salon", camara: { desde: { pos: [-0.8, 3.1, 11.4], mira: [0.3, 3.0, -1] }, hasta: { pos: [-0.5, 3.0, 10.4], mira: [0.4, 2.95, -1] } }, actores: { luis: { pos: [-0.4, 0.5], giro: 28, pose: "piensa", cara: "neutra", acciones: [{ en: "desde los 63", pose: "senalaArriba", cara: "contenta" }, { en: "con recorte", pose: "encoge", cara: "preocupada" }] } }, atrezo: [{ tipo: "calendarioPared", pos: [1.55, 2.25, -3.08], de: ["EN 2027", "63", "#3d86e0"], a: ["38,5 AÑOS", "61", "#1f9d6b"], en: "desde los 61" }] },
      html: `
        <div class="paso" data-a="sube"><div class="num">3</div><div class="tx">Jubilación anticipada<small data-en="Si fue un ERE" data-a="sube">si fue un ERE o un despido objetivo, con 33 años cotizados</small></div></div>
        <div class="tarjeta" data-en="desde los 63" data-a="voltea">
          <div class="par" data-en="desde los 63" data-a="sube"><span>En 2027, desde</span><b>63 años</b></div>
          <div class="par" data-en="desde los 61" data-a="sube"><span>Con 38 años y 6 meses cotizados</span><b>61 años</b></div>
        </div>
        <div class="nota" data-en="con recorte" data-a="aparece">Con recorte según los meses que adelantes.</div>`,
    },
    { en: "Un consejo",
      clase: "arriba", transicion: "latigo",
      animacion: { set: "salon", camara: { desde: { pos: [0, 2.9, 8.8], mira: [0, 3.05, 0] }, hasta: { pos: [0, 2.85, 7.9], mira: [0, 3.0, 0] } }, actores: { luis: { pos: [0, 0.4], giro: -6, pose: "senalaArriba", cara: "sorpresa" } }, atrezo: [{ tipo: "bocadillo", quien: "luis", texto: "!", color: "#c24b43", en: "Un consejo" }] },
      html: `
        <div class="kicker">Un consejo</div>
        <div class="cifra m rojo" data-en="15 días" data-a="pop">15 días</div>
        <div class="titular s" data-en="hábiles" data-a="sube">hábiles para pedir el paro tras el despido</div>`,
    },
    { en: "Guárdatelo",
      clase: "arriba", transicion: "sube",
      animacion: { set: "salon", camara: { desde: { pos: [0.2, 2.9, 12.0], mira: [0, 3.35, 0] }, hasta: { pos: [0.1, 2.9, 11.2], mira: [0, 3.3, 0] } }, actores: { rosa: { pos: [-0.75, 0.6], giro: 8, pose: "saluda", cara: "feliz" }, luis: { pos: [0.95, 0.3], giro: -10, pose: "pulgar", cara: "feliz" } } },
      html: `
        <div class="cta">
          <div class="icono" data-a="pop">${GUARDAR}</div>
          <div class="titular m relieve" data-a="sube">Guárdalo, o pásaselo a <mark>quien le acaba de pasar</mark></div>
          <div class="url" data-a="sube" data-dur="0.6">Paso a paso: jubilometro.com</div>
          <div class="aviso" data-a="aparece">Paro: 2.160 días cotizados en los últimos 6 años para 2 años de prestación. Edades de la jubilación anticipada involuntaria en 2027.</div>
        </div>`,
    },
  ],

  portada: `
    <div class="kicker" data-a="fijo">Despido a los 60</div>
    <div class="titular relieve" data-a="fijo">Paro, subsidio y jubilación</div>
    <div class="sub" data-a="fijo">El orden que te protege</div>`,
};

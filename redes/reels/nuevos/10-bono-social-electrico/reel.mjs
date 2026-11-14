// Reel 10 · Bono social eléctrico: 35 % de descuento en la luz si cobras la mínima
// Fuente: contenido/ayudas/bono-social-electrico/articulo.md (rama claude/keen-mccarthy-i7kn75). Formato de muñecos 3D (README, «Muñecos 3D»).
const GUARDAR = `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>`;
const CAM = {
  gancho: { desde: { pos: [-1.2, 2.9, 10.4], mira: [0, 2.85, 0] }, hasta: { pos: [-0.4, 2.8, 8.8], mira: [0, 2.8, 0] } },
  medio: { desde: { pos: [0, 2.9, 8.8], mira: [0, 3.05, 0] }, hasta: { pos: [0, 2.85, 7.9], mira: [0, 3.0, 0] } },
  medio2: { desde: { pos: [1.6, 2.9, 10.6], mira: [0, 2.95, 0] }, hasta: { pos: [1.0, 2.85, 9.6], mira: [0, 2.9, 0] } },
  oficina: { desde: { pos: [0.6, 3.9, 10.6], mira: [0.2, 2.35, -0.6] }, hasta: { pos: [0.5, 3.8, 9.7], mira: [0.2, 2.3, -0.6] } },
  general2: { desde: { pos: [0, 3.0, 12.6], mira: [0, 2.9, 0] }, hasta: { pos: [0, 2.9, 11.2], mira: [0, 2.85, 0] } },
  cierre: { desde: { pos: [0.2, 2.9, 12.0], mira: [0, 3.35, 0] }, hasta: { pos: [0.1, 2.9, 11.2], mira: [0, 3.3, 0] } },
};

export default {
  tema: "Bono social eléctrico",
  estilo: "dinamico",
  velo: "suave",
  musica: "https://cdn.orshot.com/library/music/26e7ebf8-2abd-406c-9eb4-bd33a4ae8d8e.m4a", // «Market update» (116 bpm), Orshot
  musicaBucle: { ini: 2.069, fin: 14.483 },
  volumenMusica: 0.11,
  guion: `¿Cobras la pensión mínima? Puedes tener un [[35%|treinta y cinco por ciento]] de descuento en la luz. Se llama bono social eléctrico.

Tienes derecho si todos los que tienen ingresos en casa cobran la mínima, y no tenéis otros ingresos de más de [[500|quinientos]] euros al año.

Pongamos que Luis cobra la mínima de jubilación y Rosa no tiene ingresos. Tienen derecho al [[35%|treinta y cinco por ciento]].

Eso sí: hay que estar en la tarifa regulada. En el mercado libre no hay bono social.

Se pide a tu comercializadora de referencia. Guárdatelo, o pásaselo a quien cobre la mínima.`,

  escenas: [
    { clase: "arriba",
      animacion: {
        set: "salon", camara: CAM.gancho,
        actores: { luis: { pos: [0, 0.4], giro: 8, pose: "piensa", cara: "preocupada", acciones: [{ en: "Puedes tener", pose: "senalaArriba", cara: "sorpresa" }] } },
        atrezo: [{ tipo: "bocadillo", quien: "luis", texto: "?", t: 0.3, hasta: 2.2 }],
      },
      html: `
        <div class="kicker" data-a="fijo">Bono social eléctrico</div>
        <div class="titular relieve" data-a="fijo"><span class="ambar">35%</span> menos en la luz</div>
        <div class="sub" data-en="Puedes tener" data-a="sube">Si cobras la pensión mínima 👇</div>`,
    },
    { en: "Tienes derecho si", clase: "arriba", transicion: "latigo",
      animacion: {
        set: "salon", camara: CAM.medio,
        actores: { rosa: { pos: [0, 0.4], giro: 0, pose: "reposo", cara: "neutra", acciones: [{ en: "no tenéis otros", pose: "senala", cara: "contenta" }] } },
      },
      html: `
        <div class="kicker">Tienes derecho si</div>
        <div class="check" data-en="todos los que tienen" data-a="giro3d"><div class="ok">✓</div><div>Todos los que tienen ingresos en casa cobran la mínima</div></div>
        <div class="check" data-en="no tenéis otros ingresos" data-a="giro3d"><div class="ok">✓</div><div>Otros ingresos: máximo 500 € al año</div></div>`,
    },
    { en: "Pongamos que Luis", clase: "arriba", transicion: "zoom",
      animacion: {
        set: "salon", camara: CAM.general2,
        actores: {
          luis: { pos: [-0.85, 0.5], giro: 12, pose: "pulgar", cara: "contenta", acciones: [{ en: "Tienen derecho", pose: "celebra", cara: "feliz" }] },
          rosa: { pos: [0.85, 0.5], giro: -12, pose: "reposo", cara: "neutra", acciones: [{ en: "Tienen derecho", pose: "celebra", cara: "feliz" }] },
        },
        atrezo: [{ tipo: "monedas", en: "Tienen derecho", n: 30 }],
      },
      html: `
        <div class="kicker">Un ejemplo</div>
        <div class="tarjeta" style="zoom:0.9">
          <div class="par" data-en="Pongamos que Luis" data-a="sube"><span>Luis</span><b>mínima de jubilación</b></div>
          <div class="par" data-en="Rosa no tiene" data-a="sube"><span>Rosa</span><b>sin ingresos</b></div>
        </div>
        <div class="titular relieve centro" data-en="Tienen derecho" data-a="golpe3d">Descuento del <span class="verde">35%</span></div>`,
    },
    { en: "Eso sí", clase: "arriba", transicion: "giro",
      animacion: {
        set: "salon", camara: CAM.medio2,
        actores: { rosa: { pos: [0.2, 0.5], giro: -10, pose: "encoge", cara: "preocupada", acciones: [{ en: "En el mercado libre", pose: "senalaArriba", cara: "sorpresa" }] } },
        atrezo: [{ tipo: "bocadillo", quien: "rosa", texto: "!", color: "#c24b43", en: "Eso sí" }],
      },
      html: `
        <div class="kicker">Eso sí</div>
        <div class="titular relieve" data-en="la tarifa regulada" data-a="golpe3d">Tarifa regulada <span class="ambar">(PVPC)</span></div>
        <div class="fila" data-en="En el mercado libre" data-a="sube"><div class="ico no">✕</div><div>Mercado libre<small>no hay bono social</small></div></div>`,
    },
    { en: "Se pide a tu", clase: "arriba", transicion: "zoom",
      animacion: {
        set: "oficina", camara: CAM.oficina,
        actores: { luis: { pos: [-0.55, 0.15], giro: 22, pose: "carpeta", cara: "neutra", acciones: [{ en: "comercializadora de referencia", pose: "pulgar", cara: "feliz" }] } },
        atrezo: [
          { tipo: "carpeta", pos: [0.8, 1.38, -0.95], giro: -8, texto: "Bono social", marca: "✓ PEDIDO", en: "comercializadora de referencia" },
          { tipo: "sello", pos: [0.8, 1.38, -0.92], en: "comercializadora de referencia" },
        ],
      },
      html: `
        <div class="kicker">Cómo se pide</div>
        <div class="titular relieve" data-en="comercializadora de referencia" data-a="golpe3d">A tu comercializadora <span class="ambar">de referencia</span></div>`,
    },
    { en: "Guárdatelo", clase: "arriba", transicion: "sube",
      animacion: {
        set: "salon", camara: CAM.cierre,
        actores: {
          rosa: { pos: [-0.75, 0.6], giro: 8, pose: "saluda", cara: "feliz" },
          luis: { pos: [0.95, 0.3], giro: -10, pose: "pulgar", cara: "feliz" },
        },
      },
      html: `
        <div class="cta">
          <div class="icono" data-a="latido">${GUARDAR}</div>
          <div class="titular m relieve" data-a="sube">Guárdatelo, o pásaselo a <span class="ambar">quien cobre la mínima</span></div>
          <div class="url" data-a="sube" data-dur="0.6">Requisitos y cómo pedirlo: jubilometro.com</div>
          <div class="aviso" data-a="aparece">Información general. Real Decreto 897/2017. Descuento del 35 % (vulnerable) o del 50 % (vulnerable severo) sobre un consumo anual máximo.</div>
        </div>`,
    },
  ],

  portada: `
    <div class="kicker" data-a="fijo">Bono social eléctrico</div>
    <div class="titular relieve" data-a="fijo"><span class="ambar">35%</span> menos en la luz</div>
    <div class="sub" data-a="fijo">Si cobras la pensión mínima</div>`,
};

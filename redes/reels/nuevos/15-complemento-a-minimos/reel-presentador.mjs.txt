// Reel 15 · Complemento a mínimos: la Seguridad Social completa tu pensión hasta la mínima.
// Formato «presentador» (Pau, 24/11): Rosa explica a cámara con la boca sincronizada, vídeo real detrás
// y gráficos encima. Molde: ../../base/01-sesenta-mil. Voz: herramientas/reels/voz.mjs (Piper «1c»).
// Fuente: contenido/cuanto-cobrare/complemento-a-minimos/articulo.md (+ verificacion-fuentes.md). Real Decreto 241/2026.
const GUARDAR = `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>`;
const cam = (dx = 0) => ({ desde: { pos: [-0.55 + dx, 2.55, 11.2], mira: [-0.6 + dx, 4.25, 0] }, hasta: { pos: [-0.5 + dx, 2.55, 10.4], mira: [-0.55 + dx, 4.2, 0] } });
const rosa = (pose, cara, acciones = []) => ({ rosa: { pos: [0.55, 0], giro: -14, pose, cara, habla: true, acciones } });
const LOWER = `<div style="position:absolute;left:40px;bottom:330px;background:rgba(19,33,59,.88);border-left:10px solid #f5b83d;padding:14px 26px;border-radius:14px;font-size:34px;font-weight:800;color:#fff" data-a="sube">Rosa · <span style="font-weight:600;opacity:.85">Jubilómetro</span></div>`;

export default {
  tema: "Complemento a mínimos",
  estilo: "dinamico",
  velo: "suave",
  musica: "https://cdn.orshot.com/library/music/04ccbe32-a3e1-4c80-aa68-879342c36b94.m4a", // «Hopeful» (piano, 88 bpm), Orshot
  musicaBucle: { ini: 2.727, fin: 13.636 },
  volumenMusica: 0.1,
  guion: `¿Tu pensión es baja? La Seguridad Social puede completarla hasta la mínima. Se llama complemento a mínimos.

En [[2026|dos mil veintiséis]], la mínima con [[65|sesenta y cinco]] años y sin cónyuge es de [[936,20|novecientos treinta y seis con veinte]] euros al mes.

Lo cobras si vives en España y tus otros ingresos no pasan de [[9.442|nueve mil cuatrocientos cuarenta y dos]] euros al año.

Pongamos que Luis vive solo, sin otros ingresos, y cobra [[750|setecientos cincuenta]] euros. Le añaden [[186,20|ciento ochenta y seis con veinte]] euros al mes.

Y con el complemento, los medicamentos con receta salen gratis.

Se pide con la pensión. Guárdatelo, o pásaselo a quien cobre poco.`,

  escenas: [
    { clase: "arriba", fondo: { clip: "pixabay:51722", desde: 0, x: 0.5 },
      animacion: { set: "presentador", camara: cam(), actores: rosa("piensa", "preocupada", [{ en: "completarla hasta la mínima", pose: "senala", cara: "contenta" }]) },
      html: `
        <div class="kicker" data-a="fijo">Complemento a mínimos</div>
        <div class="titular relieve" data-a="fijo">¿Pensión baja? <span class="ambar">Te la completan</span></div>
        <div class="sub" data-en="completarla hasta la mínima" data-a="sube">Hasta la pensión mínima 👇</div>${LOWER}`,
    },
    { en: "En 2026", clase: "arriba", transicion: "latigo", fondo: { clip: "pixabay:9091", desde: 1, x: 0.5 },
      animacion: { set: "presentador", camara: cam(0.1), actores: rosa("senalaArriba", "contenta", [{ en: "al mes", pose: "pulgar", cara: "feliz" }]) },
      html: `
        <div class="kicker">La mínima en 2026</div>
        <div class="gigante relieve ambar" data-en="936,20" data-a="golpe3d" style="font-size:170px">936,20 €</div>
        <div class="sub" data-en="al mes" data-a="sube">al mes · 65 años · sin cónyuge</div>`,
    },
    { en: "Lo cobras si", clase: "arriba", transicion: "giro", fondo: { clip: "pixabay:14476", desde: 0, x: 0.35 },
      animacion: { set: "presentador", camara: cam(-0.05), actores: rosa("piensa", "neutra", [{ en: "tus otros ingresos", pose: "senala", cara: "contenta" }]) },
      html: `
        <div class="kicker">Lo cobras si</div>
        <div class="check" data-en="vives en España" data-a="giro3d"><div class="ok">✓</div><div>Vives en España</div></div>
        <div class="check" data-en="tus otros ingresos" data-a="giro3d"><div class="ok">✓</div><div>Otros ingresos: hasta 9.442 € al año</div></div>`,
    },
    { en: "Pongamos que Luis", clase: "arriba", transicion: "zoom", fondo: { clip: "pixabay:9728", desde: 2, x: 0.5 },
      animacion: { set: "presentador", camara: cam(0.05), actores: rosa("reposo", "neutra", [{ en: "Le añaden", pose: "celebra", cara: "feliz" }]) },
      html: `
        <div class="kicker">Ejemplo · Luis vive solo</div>
        <div class="tarjeta">
          <div class="par" data-en="y cobra 750" data-a="sube"><span>Su pensión</span><b>750 €</b></div>
          <div class="par" data-en="Le añaden" data-a="sube"><span>Complemento</span><b class="verde">+186,20 €</b></div>
          <div class="par" data-en="al mes" data-a="sube"><span>Cobra al mes</span><b class="ambar">936,20 €</b></div>
        </div>`,
    },
    { en: "Y con el complemento", clase: "arriba", transicion: "latigo", fondo: { clip: "pixabay:5448", desde: 0, x: 0.5 },
      animacion: { set: "presentador", camara: cam(), actores: rosa("pulgar", "sorpresa", [{ en: "salen gratis", pose: "celebra", cara: "feliz" }]) },
      html: `
        <div class="kicker">Además</div>
        <div class="titular relieve" data-en="salen gratis" data-a="golpe3d">Medicinas con receta <span class="verde">gratis</span></div>`,
    },
    { en: "Se pide con la pensión", clase: "arriba", transicion: "zoom", fondo: { clip: "pixabay:349087", desde: 1, x: 0.5 },
      animacion: { set: "presentador", camara: cam(0.1), actores: rosa("senala", "contenta") },
      html: `
        <div class="kicker">Cómo se pide</div>
        <div class="titular relieve" data-a="golpe3d">Se pide <span class="ambar">con la pensión</span></div>`,
    },
    { en: "Guárdatelo", clase: "arriba", transicion: "sube", fondo: { clip: "pixabay:365401", desde: 0, x: 0.5 },
      animacion: { set: "presentador", camara: cam(), actores: rosa("pulgar", "feliz") },
      html: `
        <div class="cta">
          <div class="icono" data-a="latido">${GUARDAR}</div>
          <div class="titular m relieve" data-a="sube">Guárdatelo, o pásaselo a <span class="ambar">quien cobre poco</span></div>
          <div class="url" data-a="sube" data-dur="0.6">Límites y tope: jubilometro.com</div>
          <div class="aviso" data-a="aparece">Información general. Real Decreto 241/2026. En pensiones desde 2013 el complemento tiene un tope de 628,80 € al mes. Con cónyuge a cargo, límite de 11.013 €.</div>
        </div>`,
    },
  ],

  portada: `
    <div class="kicker" data-a="fijo">Complemento a mínimos</div>
    <div class="titular relieve" data-a="fijo">¿Pensión baja? <span class="ambar">Te la completan</span></div>
    <div class="sub" data-a="fijo">Hasta 936,20 € al mes</div>`,
};

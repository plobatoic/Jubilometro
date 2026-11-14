// Reel 13 · Convenio especial: seguir cotizando por unos 392 € al mes
// Fuente: contenido/jubilacion/convenio-especial/articulo.md (+ verificacion-fuentes.md). Formato de muñecos 3D (README, «Muñecos 3D»).
const GUARDAR = `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>`;
const CAM = {
  gancho: { desde: { pos: [-1.2, 2.9, 10.4], mira: [0, 2.85, 0] }, hasta: { pos: [-0.4, 2.8, 8.8], mira: [0, 2.8, 0] } },
  medio: { desde: { pos: [0, 2.9, 8.8], mira: [0, 3.05, 0] }, hasta: { pos: [0, 2.85, 7.9], mira: [0, 3.0, 0] } },
  medio2: { desde: { pos: [1.6, 2.9, 10.6], mira: [0, 2.95, 0] }, hasta: { pos: [1.0, 2.85, 9.6], mira: [0, 2.9, 0] } },
  oficina: { desde: { pos: [0.6, 3.9, 10.6], mira: [0.2, 2.35, -0.6] }, hasta: { pos: [0.5, 3.8, 9.7], mira: [0.2, 2.3, -0.6] } },
  general2: { desde: { pos: [0, 3.0, 12.6], mira: [0, 2.9, 0] }, hasta: { pos: [0, 2.9, 11.2], mira: [0, 2.85, 0] } },
  cal: { desde: { pos: [-0.8, 3.1, 11.4], mira: [0.3, 3.0, -1] }, hasta: { pos: [-0.5, 3.0, 10.4], mira: [0.4, 2.95, -1] } },
  cierre: { desde: { pos: [0.2, 2.9, 12.0], mira: [0, 3.35, 0] }, hasta: { pos: [0.1, 2.9, 11.2], mira: [0, 3.3, 0] } },
};

export default {
  tema: "Convenio especial",
  estilo: "dinamico",
  velo: "suave",
  musica: "https://cdn.orshot.com/library/music/04ccbe32-a3e1-4c80-aa68-879342c36b94.m4a", // «Hopeful» (piano, 88 bpm), Orshot
  musicaBucle: { ini: 2.727, fin: 13.636 },
  volumenMusica: 0.14,
  guion: `¿Dejas de trabajar y te faltan años para jubilarte? Por unos [[392|trescientos noventa y dos]] euros al mes puedes seguir cotizando. Se llama convenio especial.

Lo pagas tú, y esos meses cuentan como cotizados. Pídelo en el año siguiente a la baja.

Pongamos que Rosa deja de trabajar a los [[63|sesenta y tres]], con [[36|treinta y seis]] años y [[6|seis]] meses cotizados. Con dos años de convenio, unos [[9.400|nueve mil cuatrocientos]] euros, llega a [[38|treinta y ocho]] años y [[6|seis]] meses y se jubila a los [[65|sesenta y cinco]], sin recorte.

Si cobras el paro, no lo necesitas: ya cotizan por ti.

Guárdatelo, o pásaselo a quien lo necesite.`,

  escenas: [
    { clase: "arriba",
      animacion: {
        set: "salon", camara: CAM.gancho,
        actores: { rosa: { pos: [0, 0.4], giro: 8, pose: "piensa", cara: "preocupada", acciones: [{ en: "puedes seguir cotizando", pose: "pulgar", cara: "contenta" }] } },
        atrezo: [{ tipo: "bocadillo", quien: "rosa", texto: "?", t: 0.3, hasta: 2.2 }],
      },
      html: `
        <div class="kicker" data-a="fijo">Convenio especial</div>
        <div class="titular relieve" data-a="fijo">Seguir cotizando por <span class="ambar">392 €</span> al mes</div>
        <div class="sub" data-en="puedes seguir cotizando" data-a="sube">Si dejas de trabajar 👇</div>`,
    },
    { en: "Lo pagas tú", clase: "arriba", transicion: "latigo",
      animacion: {
        set: "salon", camara: CAM.medio2,
        actores: { luis: { pos: [0.2, 0.5], giro: -10, pose: "senala", cara: "contenta", acciones: [{ en: "en el año siguiente", pose: "senalaArriba", cara: "neutra" }] } },
        atrezo: [{ tipo: "monedas", en: "cuentan como cotizados", n: 22 }],
      },
      html: `
        <div class="kicker">Cómo funciona</div>
        <div class="check" data-en="Lo pagas tú" data-a="giro3d"><div class="ok">✓</div><div>Lo pagas tú<small>base mínima de 2026</small></div></div>
        <div class="check" data-en="cuentan como cotizados" data-a="giro3d"><div class="ok">✓</div><div>Esos meses cuentan como cotizados</div></div>
        <div class="check" data-en="en el año siguiente a la baja" data-a="giro3d"><div class="ok">✓</div><div>Se pide en el año siguiente a la baja</div></div>`,
    },
    { en: "Pongamos que Rosa", clase: "arriba", transicion: "giro",
      animacion: {
        set: "salon", camara: CAM.cal,
        actores: { rosa: { pos: [-0.4, 0.5], giro: 28, pose: "piensa", cara: "neutra", acciones: [{ en: "Con dos años", pose: "senalaArriba", cara: "contenta" }, { en: "sin recorte", pose: "celebra", cara: "feliz" }] } },
        atrezo: [{ tipo: "calendarioPared", pos: [1.55, 2.6, -3.08], de: ["SIN CONVENIO", "67", "#3d86e0"], a: ["CON CONVENIO", "65", "#1f9d6b"], en: "Con dos años" }],
      },
      html: `
        <div class="kicker">Un ejemplo</div>
        <div class="tarjeta" style="zoom:0.88">
          <div class="par" data-en="a los 63" data-a="sube"><span>Rosa deja de trabajar a los</span><b>63</b></div>
          <div class="par" data-en="36 años y 6 meses" data-a="sube"><span>Cotizado</span><b>36 años y 6 meses</b></div>
          <div class="par" data-en="9.400 euros" data-a="sube"><span>2 años de convenio</span><b>9.400 €</b></div>
        </div>`,
    },
    { en: "llega a 38", clase: "arriba", transicion: "zoom",
      animacion: {
        set: "salon", camara: CAM.general2,
        actores: {
          rosa: { pos: [-0.85, 0.5], giro: 12, pose: "pulgar", cara: "feliz", acciones: [{ en: "sin recorte", pose: "celebra", cara: "feliz" }] },
          luis: { pos: [0.85, 0.5], giro: -12, pose: "reposo", cara: "contenta", acciones: [{ en: "sin recorte", pose: "celebra", cara: "feliz" }] },
        },
        atrezo: [{ tipo: "monedas", en: "sin recorte", n: 36 }],
      },
      html: `
        <div class="cifra m ambar" data-en="se jubila a los 65" data-a="pop">65 años</div>
        <div class="titular s centro relieve" data-en="sin recorte" data-a="golpe3d">Jubilada <span class="verde">sin recorte</span></div>`,
    },
    { en: "Si cobras el paro", clase: "arriba", transicion: "latigo",
      animacion: {
        set: "salon", camara: CAM.medio,
        actores: { luis: { pos: [0, 0.4], giro: -6, pose: "encoge", cara: "neutra", acciones: [{ en: "ya cotizan por ti", pose: "pulgar", cara: "contenta" }] } },
        atrezo: [{ tipo: "bocadillo", quien: "luis", texto: "!", color: "#c24b43", en: "Si cobras el paro" }],
      },
      html: `
        <div class="kicker">Cuándo no compensa</div>
        <div class="titular relieve" data-en="Si cobras el paro" data-a="golpe3d">Si cobras el paro, <span class="ambar">no lo necesitas</span></div>
        <div class="sub" data-en="ya cotizan por ti" data-a="sube">Ya cotizan por ti</div>`,
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
          <div class="titular m relieve" data-a="sube">Guárdatelo, o pásaselo a <span class="ambar">quien lo necesite</span></div>
          <div class="url" data-a="sube" data-dur="0.6">Cuándo compensa: jubilometro.com</div>
          <div class="aviso" data-a="aparece">Información general. Cuota de 2026 con la base mínima (1.424,40 €), cálculo aproximado. Requiere 1.080 días cotizados en los 12 años anteriores a la baja.</div>
        </div>`,
    },
  ],

  portada: `
    <div class="kicker" data-a="fijo">Convenio especial</div>
    <div class="titular relieve" data-a="fijo">Cotiza por <span class="ambar">392 €</span> al mes</div>
    <div class="sub" data-a="fijo">Si te faltan años para jubilarte</div>`,
};

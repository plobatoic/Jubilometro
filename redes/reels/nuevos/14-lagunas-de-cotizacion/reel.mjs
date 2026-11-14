// Reel 14 · Lagunas de cotización: los meses sin cotizar no cuentan como cero
// Fuente: contenido/cuanto-cobrare/lagunas-de-cotizacion/articulo.md (rama claude/keen-mccarthy-i7kn75) (+ verificacion-fuentes.md). Formato de muñecos 3D (README, «Muñecos 3D»).
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
  tema: "Lagunas de cotización",
  estilo: "dinamico",
  velo: "suave",
  musica: "https://cdn.orshot.com/library/music/26e7ebf8-2abd-406c-9eb4-bd33a4ae8d8e.m4a", // «Market update» (116 bpm), Orshot
  musicaBucle: { ini: 2.069, fin: 14.483 },
  volumenMusica: 0.11,
  guion: `¿Los meses sin cotizar cuentan como cero en tu pensión? No. Se llaman lagunas, y se rellenan.

Los [[48|cuarenta y ocho]] primeros meses, con la base mínima de cada mes. El resto, con el [[50%|cincuenta por ciento]] de esa base.

Las trabajadoras por cuenta ajena rellenan además los meses [[49|cuarenta y nueve]] a [[60|sesenta]] al [[100%|cien por cien]].

Pongamos que Luis tiene [[72|setenta y dos]] meses sin cotizar. Rellenarlos le da [[244|doscientos cuarenta y cuatro]] euros más de base reguladora.

Eso sí: los meses rellenados no suman años cotizados.

Guárdatelo, o pásaselo a quien tuvo años sin trabajar.`,

  escenas: [
    { clase: "arriba",
      animacion: {
        set: "salon", camara: CAM.gancho,
        actores: { luis: { pos: [0, 0.4], giro: 8, pose: "piensa", cara: "preocupada", acciones: [{ en: "No", pose: "pulgar", cara: "contenta" }] } },
        atrezo: [{ tipo: "bocadillo", quien: "luis", texto: "?", t: 0.3, hasta: 2.2 }],
      },
      html: `
        <div class="kicker" data-a="fijo">Lagunas de cotización</div>
        <div class="titular relieve" data-a="fijo">Un mes sin cotizar <span class="ambar">no es cero</span></div>
        <div class="sub" data-en="No" data-a="sube">Se rellenan al calcular tu pensión 👇</div>`,
    },
    { en: "Se llaman lagunas", clase: "arriba", transicion: "latigo",
      animacion: {
        set: "salon", camara: CAM.cal,
        actores: { luis: { pos: [-0.4, 0.5], giro: 28, pose: "piensa", cara: "neutra", acciones: [{ en: "se rellenan", pose: "senalaArriba", cara: "contenta" }] } },
        atrezo: [{ tipo: "calendarioPared", pos: [1.55, 2.6, -3.08], de: ["SIN COTIZAR", "0 €", "#c24b43"], a: ["RELLENADO", "✓", "#1f9d6b"], en: "se rellenan" }],
      },
      html: `
        <div class="kicker">Qué es una laguna</div>
        <div class="titular relieve" data-en="Se llaman lagunas" data-a="golpe3d">Un mes <span class="ambar">sin obligación de cotizar</span></div>`,
    },
    { en: "Los 48 primeros", clase: "arriba", transicion: "zoom",
      animacion: {
        set: "salon", camara: CAM.medio2,
        actores: { rosa: { pos: [0.2, 0.5], giro: -10, pose: "senala", cara: "contenta", acciones: [{ en: "El resto", pose: "senalaArriba", cara: "neutra" }] } },
      },
      html: `
        <div class="kicker">Cómo se rellenan</div>
        <div class="tarjeta" style="zoom:0.95">
          <div class="par" data-en="Los 48 primeros meses" data-a="sube"><span>Primeros 48 meses</span><b>base mínima</b></div>
          <div class="par" data-en="El resto" data-a="sube"><span>El resto</span><b>50%</b></div>
        </div>`,
    },
    { en: "Las trabajadoras", clase: "arriba", transicion: "giro",
      animacion: {
        set: "salon", camara: CAM.medio,
        actores: { rosa: { pos: [0, 0.4], giro: 0, pose: "reposo", cara: "contenta", acciones: [{ en: "al 100%", pose: "celebra", cara: "feliz" }] } },
      },
      html: `
        <div class="kicker">Trabajadoras por cuenta ajena</div>
        <div class="check" data-en="meses 49 a 60" data-a="giro3d"><div class="ok">✓</div><div>Meses 49 a 60<small>al 100%</small></div></div>`,
    },
    { en: "Pongamos que Luis", clase: "arriba", transicion: "latigo",
      animacion: {
        set: "salon", camara: CAM.general2,
        actores: {
          luis: { pos: [-0.85, 0.5], giro: 12, pose: "piensa", cara: "neutra", acciones: [{ en: "le da 244", pose: "celebra", cara: "feliz" }] },
          rosa: { pos: [0.85, 0.5], giro: -12, pose: "reposo", cara: "neutra", acciones: [{ en: "le da 244", pose: "pulgar", cara: "contenta" }] },
        },
        atrezo: [{ tipo: "monedas", en: "le da 244", n: 30 }],
      },
      html: `
        <div class="kicker">Un ejemplo</div>
        <div class="par" data-en="72 meses sin cotizar" data-a="sube"><span>Luis, meses sin cotizar</span><b>72</b></div>
        <div class="cifra m verde" data-en="le da 244" data-a="pop">+244 €</div>
        <div class="titular s" data-en="de base reguladora" data-a="sube">de base reguladora</div>`,
    },
    { en: "Eso sí", clase: "arriba", transicion: "zoom",
      animacion: {
        set: "salon", camara: CAM.medio,
        actores: { luis: { pos: [0, 0.4], giro: -6, pose: "encoge", cara: "preocupada", acciones: [{ en: "no suman", pose: "senalaArriba", cara: "sorpresa" }] } },
        atrezo: [{ tipo: "bocadillo", quien: "luis", texto: "!", color: "#c24b43", en: "Eso sí" }],
      },
      html: `
        <div class="kicker">Eso sí</div>
        <div class="titular relieve" data-en="no suman años cotizados" data-a="golpe3d">No suman <span class="rojo">años cotizados</span></div>`,
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
          <div class="titular m relieve" data-a="sube">Guárdatelo, o pásaselo a <span class="ambar">quien tuvo años sin trabajar</span></div>
          <div class="url" data-a="sube" data-dur="0.6">Cómo se calcula: jubilometro.com</div>
          <div class="aviso" data-a="aparece">Información general. Art. 209 de la LGSS. Ejemplo simplificado con la base mínima de 2026 (1.424,40 €).</div>
        </div>`,
    },
  ],

  portada: `
    <div class="kicker" data-a="fijo">Lagunas de cotización</div>
    <div class="titular relieve" data-a="fijo">Un mes sin cotizar <span class="ambar">no es cero</span></div>
    <div class="sub" data-a="fijo">Así se rellena</div>`,
};

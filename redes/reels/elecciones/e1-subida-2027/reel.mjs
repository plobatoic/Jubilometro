// E1 · ¿Las elecciones paran la subida de las pensiones de 2027? No: la marca la ley (art. 58 LGSS).
// Formato de muñecos 3D (ver README.md, «Muñecos 3D»). Fuente: contenido/cuanto-cobrare/elecciones-y-pensiones/articulo.md
// (rama claude/keen-mccarthy-i7kn75), apartado «¿Subirán las pensiones en enero aunque haya elecciones?».
// Sin la horquilla 3,3-3,7 %: puede cambiar con el IPC de octubre y noviembre.
const COMPARTIR = `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7z"/></svg>`;

export default {
  tema: "Elecciones 29-N",
  estilo: "dinamico",
  velo: "suave",
  musica: "https://cdn.orshot.com/library/music/26e7ebf8-2abd-406c-9eb4-bd33a4ae8d8e.m4a", // «Market update» (116 bpm), Orshot
  musicaBucle: { ini: 2.069, fin: 14.483 },
  volumenMusica: 0.11,
  guion: `¿Las elecciones pueden parar la subida de las pensiones de [[2027|dos mil veintisiete]]? No. La subida la marca la ley, gane quien gane.

Suben lo que haya subido de media el IPC, de diciembre a noviembre.

Lo que sí puede pasar es que el decreto llegue tarde. En [[2020|dos mil veinte]] se aprobó el [[14|catorce]] de enero... y lo de enero se cobró como atrasos en febrero. Pero la subida contó desde el primero de enero.

No tienes que pedir nada. Guárdatelo hasta enero.`,

  escenas: [
    { clase: "arriba",
      animacion: {
        set: "salon",
        camara: { desde: { pos: [-1.2, 2.9, 10.4], mira: [0, 2.85, 0] }, hasta: { pos: [-0.4, 2.8, 8.8], mira: [0, 2.8, 0] } },
        actores: { luis: { pos: [0, 0.4], giro: 8, pose: "movil", cara: "preocupada" } },
        atrezo: [{ tipo: "movil", quien: "luis" }, { tipo: "bocadillo", quien: "luis", texto: "?", t: 0.3, hasta: 2.6 }],
      },
      html: `
        <div class="kicker" data-a="fijo">Elecciones del 29 de noviembre</div>
        <div class="titular relieve" data-a="fijo">¿Paran la <span class="ambar">subida de 2027</span>?</div>`,
    },
    { en: "No", clase: "arriba", transicion: "zoom",
      animacion: {
        set: "salon",
        camara: { desde: { pos: [0, 2.9, 8.8], mira: [0, 3.05, 0] }, hasta: { pos: [0, 2.85, 7.9], mira: [0, 3.0, 0] } },
        actores: { luis: { pos: [0, 0.4], giro: 0, pose: "pulgar", cara: "feliz" } },
      },
      html: `
        <div class="gigante relieve rojo" data-a="golpe3d" style="font-size:240px">NO</div>
        <div class="titular s centro relieve" data-en="La subida la marca" data-a="sube">La marca la ley, <span class="verde">gane quien gane</span></div>`,
    },
    { en: "Suben lo que", clase: "arriba", transicion: "latigo",
      animacion: {
        set: "salon",
        camara: { desde: { pos: [1.6, 2.9, 10.6], mira: [0, 2.95, 0] }, hasta: { pos: [1.0, 2.85, 9.6], mira: [0, 2.9, 0] } },
        actores: { rosa: { pos: [0.2, 0.5], giro: -10, pose: "piensa", cara: "neutra", acciones: [{ en: "de diciembre a noviembre", pose: "senalaArriba", cara: "contenta" }] } },
      },
      html: `
        <div class="kicker">La fórmula de la ley</div>
        <div class="tarjeta" data-a="voltea">
          <div class="etq">Las pensiones suben</div>
          <div class="titular s">Lo que sube <span class="ambar">de media el IPC</span></div>
          <div class="sub" data-en="de diciembre a noviembre" data-a="sube">De diciembre de 2025 a noviembre de 2026</div>
        </div>`,
    },
    { en: "Lo que sí puede", clase: "arriba", transicion: "giro",
      animacion: {
        set: "salon",
        camara: { desde: { pos: [0.4, 2.9, 9.0], mira: [0, 3.0, 0] }, hasta: { pos: [0.2, 2.85, 8.2], mira: [0, 2.95, 0] } },
        actores: { luis: { pos: [0, 0.4], giro: -6, pose: "encoge", cara: "preocupada" } },
        atrezo: [{ tipo: "bocadillo", quien: "luis", texto: "!", color: "#c24b43", en: "llegue tarde" }],
      },
      html: `
        <div class="kicker">Lo que sí puede pasar</div>
        <div class="titular relieve" data-en="el decreto" data-a="golpe3d">El decreto <span class="ambar">llega tarde</span></div>`,
    },
    { en: "En 2020", clase: "arriba", transicion: "latigo",
      animacion: {
        set: "salon",
        camara: { desde: { pos: [-0.8, 3.1, 11.4], mira: [0.3, 3.0, -1] }, hasta: { pos: [-0.5, 3.0, 10.4], mira: [0.4, 2.95, -1] } },
        actores: { luis: { pos: [-0.4, 0.5], giro: 28, pose: "piensa", cara: "neutra", acciones: [{ en: "como atrasos", pose: "senalaArriba", cara: "sorpresa" }, { en: "Pero la subida", cara: "feliz", pose: "pulgar" }] } },
        atrezo: [{ tipo: "calendarioPared", pos: [1.55, 2.6, -3.08], de: ["ENERO", "14", "#3d86e0"], a: ["FEBRERO", "€", "#1f9d6b"], en: "como atrasos" }],
      },
      html: `
        <div class="tarjeta" style="zoom:0.86">
          <div class="etq">Ya pasó en 2020</div>
          <div class="linea">
            <div class="hito" data-en="se aprobó" data-a="sube"><div class="f">14 de enero</div><div class="t">Se aprueba la subida</div></div>
            <div class="hito ok" data-en="como atrasos" data-a="sube"><div class="f">Febrero</div><div class="t">Lo de enero, en atrasos</div></div>
            <div class="hito ok" data-en="Pero la subida" data-a="sube"><div class="f">Cuenta desde</div><div class="t">El 1 de enero</div></div>
          </div>
        </div>`,
    },
    { en: "No tienes que pedir", clase: "arriba", transicion: "zoom",
      animacion: {
        set: "salon",
        camara: { desde: { pos: [0, 3.0, 12.6], mira: [0, 2.9, 0] }, hasta: { pos: [0, 2.9, 11.2], mira: [0, 2.85, 0] } },
        actores: {
          rosa: { pos: [-0.85, 0.5], giro: 12, pose: "pulgar", cara: "feliz" },
          luis: { pos: [0.85, 0.5], giro: -12, pose: "celebra", cara: "feliz" },
        },
        atrezo: [{ tipo: "monedas", en: "pedir nada", n: 40 }],
      },
      html: `<div class="titular relieve centro" data-en="pedir nada" data-a="golpe3d">No tienes que <span class="verde">pedir nada</span></div>`,
    },
    { en: "Guárdatelo", clase: "arriba", transicion: "sube",
      animacion: {
        set: "salon",
        camara: { desde: { pos: [0.2, 2.9, 12.0], mira: [0, 3.35, 0] }, hasta: { pos: [0.1, 2.9, 11.2], mira: [0, 3.3, 0] } },
        actores: {
          rosa: { pos: [-0.75, 0.6], giro: 8, pose: "saluda", cara: "feliz" },
          luis: { pos: [0.95, 0.3], giro: -10, pose: "pulgar", cara: "feliz" },
        },
      },
      html: `
        <div class="cta">
          <div class="icono" data-a="latido">${COMPARTIR}</div>
          <div class="titular m relieve" data-a="sube">Guárdatelo <span class="ambar">hasta enero</span></div>
          <div class="url" data-a="sube" data-dur="0.6">Calcula tu subida: jubilometro.com</div>
          <div class="aviso" data-a="aparece">Información general. Art. 58 de la LGSS. En 2020, Real Decreto-ley 1/2020, de 14 de enero.</div>
        </div>`,
    },
  ],

  portada: `
    <div class="kicker" data-a="fijo">Elecciones 29-N</div>
    <div class="titular relieve" data-a="fijo">¿Y la <span class="ambar">subida de 2027</span>?</div>
    <div class="sub" data-a="fijo">Lo que dice la ley</div>`,
};

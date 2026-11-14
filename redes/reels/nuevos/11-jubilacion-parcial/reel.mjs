// Reel 11 · Jubilación parcial: jubilarte poco a poco, hasta 3 años antes
// Fuente: contenido/jubilacion/parcial/articulo.md (+ verificacion-fuentes.md). Formato de muñecos 3D (README, «Muñecos 3D»).
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
  tema: "Jubilación parcial",
  estilo: "dinamico",
  velo: "suave",
  musica: "https://cdn.orshot.com/library/music/26e7ebf8-2abd-406c-9eb4-bd33a4ae8d8e.m4a", // «Market update» (116 bpm), Orshot
  musicaBucle: { ini: 2.069, fin: 14.483 },
  volumenMusica: 0.11,
  guion: `¿Sabías que puedes jubilarte poco a poco, hasta [[3|tres]] años antes? Se llama jubilación parcial.

Reduces tu jornada y cobras una parte de la pensión. Hacen falta [[33|treinta y tres]] años cotizados y [[6|seis]] años en tu empresa.

Tu empresa tiene que contratar a otra persona, con un contrato de relevo indefinido y a jornada completa.

Pongamos que Rosa reduce su jornada un [[50%|cincuenta por ciento]]. Con una pensión completa de [[1.600|mil seiscientos]] euros, cobra [[800|ochocientos]], más la mitad de su sueldo.

Ojo: no es automático. La empresa tiene que aceptar. Guárdatelo, o pásaselo a quien quiera reducir jornada.`,

  escenas: [
    { clase: "arriba",
      animacion: {
        set: "salon", camara: CAM.gancho,
        actores: { rosa: { pos: [0, 0.4], giro: 8, pose: "piensa", cara: "sorpresa", acciones: [{ en: "Se llama", pose: "senalaArriba", cara: "contenta" }] } },
        atrezo: [{ tipo: "bocadillo", quien: "rosa", texto: "?", t: 0.3, hasta: 2.2 }],
      },
      html: `
        <div class="kicker" data-a="fijo">Jubilación parcial</div>
        <div class="titular relieve" data-a="fijo">Jubílate <span class="ambar">poco a poco</span></div>
        <div class="sub" data-en="Se llama" data-a="sube">Hasta 3 años antes de tu edad ordinaria</div>`,
    },
    { en: "Reduces tu jornada", clase: "arriba", transicion: "latigo",
      animacion: {
        set: "salon", camara: CAM.cal,
        actores: { rosa: { pos: [-0.4, 0.5], giro: 28, pose: "piensa", cara: "neutra", acciones: [{ en: "una parte de la pensión", pose: "pulgar", cara: "contenta" }] } },
        atrezo: [{ tipo: "calendarioPared", pos: [1.55, 2.6, -3.08], de: ["JORNADA", "100%", "#3d86e0"], a: ["PARCIAL", "50%", "#1f9d6b"], en: "una parte de la pensión" }],
      },
      html: `
        <div class="kicker">Qué es</div>
        <div class="check" data-en="Reduces tu jornada" data-a="giro3d"><div class="ok">✓</div><div>Reduces tu jornada</div></div>
        <div class="check" data-en="una parte de la pensión" data-a="giro3d"><div class="ok">✓</div><div>Cobras una parte de la pensión</div></div>`,
    },
    { en: "Hacen falta", clase: "arriba", transicion: "zoom",
      animacion: {
        set: "salon", camara: CAM.medio2,
        actores: { rosa: { pos: [0.2, 0.5], giro: -10, pose: "senala", cara: "contenta", acciones: [{ en: "años en tu empresa", pose: "pulgar", cara: "feliz" }] } },
      },
      html: `
        <div class="kicker">Requisitos</div>
        <div class="tarjeta" style="zoom:0.95">
          <div class="par" data-en="33 años cotizados" data-a="sube"><span>Años cotizados</span><b>33</b></div>
          <div class="par" data-en="6 años en tu empresa" data-a="sube"><span>Años en tu empresa</span><b>6</b></div>
        </div>`,
    },
    { en: "Tu empresa tiene", clase: "arriba", transicion: "giro",
      animacion: {
        set: "oficina", camara: CAM.oficina,
        actores: { luis: { pos: [-0.55, 0.15], giro: 22, pose: "carpeta", cara: "neutra", acciones: [{ en: "indefinido", pose: "pulgar", cara: "feliz" }] } },
        atrezo: [
          { tipo: "carpeta", pos: [0.8, 1.38, -0.95], giro: -8, texto: "Contrato de relevo", marca: "✓ INDEFINIDO", en: "indefinido" },
          { tipo: "sello", pos: [0.8, 1.38, -0.92], en: "indefinido" },
        ],
      },
      html: `
        <div class="kicker">Tu empresa</div>
        <div class="titular relieve" data-en="contrato de relevo" data-a="golpe3d">Contrato <span class="ambar">de relevo</span></div>
        <div class="sub" data-en="y a jornada completa" data-a="sube">Indefinido y a jornada completa</div>`,
    },
    { en: "Pongamos que Rosa", clase: "arriba", transicion: "latigo",
      animacion: {
        set: "salon", camara: CAM.general2,
        actores: {
          rosa: { pos: [-0.85, 0.5], giro: 12, pose: "reposo", cara: "neutra", acciones: [{ en: "cobra 800", pose: "celebra", cara: "feliz" }] },
          luis: { pos: [0.85, 0.5], giro: -12, pose: "piensa", cara: "neutra", acciones: [{ en: "cobra 800", pose: "pulgar", cara: "contenta" }] },
        },
        atrezo: [{ tipo: "monedas", en: "cobra 800", n: 32 }],
      },
      html: `
        <div class="kicker">Un ejemplo</div>
        <div class="tarjeta" style="zoom:0.9">
          <div class="par" data-en="un 50%" data-a="sube"><span>Rosa reduce su jornada</span><b>50%</b></div>
          <div class="par" data-en="1.600 euros" data-a="sube"><span>Pensión completa</span><b>1.600 €</b></div>
          <div class="par" data-en="cobra 800" data-a="sube"><span>Pensión parcial</span><b>800 €</b></div>
        </div>
        <div class="sub centro" data-en="la mitad de su sueldo" data-a="sube">más la mitad de su sueldo</div>`,
    },
    { en: "Ojo", clase: "arriba", transicion: "zoom",
      animacion: {
        set: "salon", camara: CAM.medio,
        actores: { luis: { pos: [0, 0.4], giro: -6, pose: "encoge", cara: "preocupada", acciones: [{ en: "tiene que aceptar", pose: "senalaArriba", cara: "sorpresa" }] } },
        atrezo: [{ tipo: "bocadillo", quien: "luis", texto: "!", color: "#c24b43", en: "Ojo" }],
      },
      html: `
        <div class="kicker">Ojo</div>
        <div class="titular relieve" data-en="no es automático" data-a="golpe3d">No es un derecho <span class="rojo">automático</span></div>
        <div class="sub" data-en="tiene que aceptar" data-a="sube">La empresa tiene que aceptar</div>`,
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
          <div class="titular m relieve" data-a="sube">Guárdatelo, o pásaselo a <span class="ambar">quien quiera reducir jornada</span></div>
          <div class="url" data-a="sube" data-dur="0.6">Requisitos completos: jubilometro.com</div>
          <div class="aviso" data-a="aparece">Información general. Real Decreto-ley 11/2024, en vigor desde el 1 de abril de 2025. Ejemplo orientativo.</div>
        </div>`,
    },
  ],

  portada: `
    <div class="kicker" data-a="fijo">Jubilación parcial</div>
    <div class="titular relieve" data-a="fijo">Jubílate <span class="ambar">poco a poco</span></div>
    <div class="sub" data-a="fijo">Hasta 3 años antes</div>`,
};

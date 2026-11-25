// Reel 19 · Si te despiden, puedes jubilarte hasta 4 años antes (jubilación anticipada involuntaria)
// Fuente: contenido/jubilacion/anticipada-involuntaria/articulo.md (+ verificacion-fuentes.md): art. 207 LGSS, 33 años
// cotizados, 6 meses como demandante de empleo, edad mínima en 2027 de 63 (61 con 38 años y 6 meses), recorte de hasta el 30 %.
// Muñecos 3D en el salón y la oficina hechos con código (Pau, 25/11). Voz: herramientas/reels/voz.mjs.
const GUARDAR = `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>`;
const CAM = {
  gancho: { desde: { pos: [-1.2, 2.9, 10.4], mira: [0, 2.85, 0] }, hasta: { pos: [-0.4, 2.8, 8.8], mira: [0, 2.8, 0] } },
  medio: { desde: { pos: [0, 2.9, 8.8], mira: [0, 3.05, 0] }, hasta: { pos: [0, 2.85, 7.9], mira: [0, 3.0, 0] } },
  medio2: { desde: { pos: [1.6, 2.9, 10.6], mira: [0, 2.95, 0] }, hasta: { pos: [1.0, 2.85, 9.6], mira: [0, 2.9, 0] } },
  oficina: { desde: { pos: [0.6, 3.9, 10.6], mira: [0.2, 2.35, -0.6] }, hasta: { pos: [0.5, 3.8, 9.7], mira: [0.2, 2.3, -0.6] } },
  cal: { desde: { pos: [-0.8, 3.1, 11.4], mira: [0.3, 3.0, -1] }, hasta: { pos: [-0.5, 3.0, 10.4], mira: [0.4, 2.95, -1] } },
  cierre: { desde: { pos: [0.2, 2.9, 12.0], mira: [0, 3.35, 0] }, hasta: { pos: [0.1, 2.9, 11.2], mira: [0, 3.3, 0] } },
};

export default {
  tema: "Jubilación anticipada",
  estilo: "dinamico",
  velo: "suave",
  musica: "https://cdn.orshot.com/library/music/04ccbe32-a3e1-4c80-aa68-879342c36b94.m4a",
  musicaBucle: { ini: 2.727, fin: 13.636 },
  volumenMusica: 0.12,
  guion: `¿Te han despedido cerca de los [[60|sesenta]]? Puedes jubilarte hasta [[4 años|cuatro años]] antes.

Se llama jubilación anticipada involuntaria. Vale si el despido no depende de ti: un ERE, un despido objetivo o el cierre de la empresa.

Necesitas [[33|treinta y tres]] años cotizados y [[6|seis]] meses apuntado al paro. En [[2027|dos mil veintisiete]], desde los [[63|sesenta y tres]], o desde los [[61|sesenta y uno]] con [[38 años y medio|treinta y ocho años y medio]] cotizados.

Ojo: la pensión se recorta, hasta un [[30%|treinta por ciento]], y para siempre.

Guárdatelo, o pásaselo a quien acaben de despedir.`,

  escenas: [
    { clase: "arriba",
      animacion: {
        set: "oficina", camara: CAM.oficina,
        actores: { luis: { pos: [-0.55, 0.15], giro: 22, pose: "carpeta", cara: "preocupada", acciones: [{ en: "Puedes jubilarte", pose: "senalaArriba", cara: "sorpresa" }] } },
        atrezo: [{ tipo: "carpeta", pos: [0.8, 1.38, -0.95], giro: -8, texto: "Despido", marca: "ERE", colorMarca: "#c24b43" }],
      },
      html: `
        <div class="kicker" data-a="fijo">Despedido cerca de los 60</div>
        <div class="titular relieve" data-a="fijo">Jubílate hasta <span class="ambar">4 años antes</span></div>`,
    },
    { en: "Se llama", clase: "arriba", transicion: "latigo",
      animacion: {
        set: "salon", camara: CAM.medio2,
        actores: { rosa: { pos: [0.2, 0.5], giro: -10, pose: "senala", cara: "contenta" } },
      },
      html: `
        <div class="kicker">Anticipada involuntaria · vale si</div>
        <div class="check" data-en="un ERE" data-a="giro3d"><div class="ok">✓</div><div>ERE o despido objetivo</div></div>
        <div class="check" data-en="el cierre" data-a="giro3d"><div class="ok">✓</div><div>Cierre de la empresa</div></div>`,
    },
    { en: "Necesitas", clase: "arriba", transicion: "giro",
      animacion: {
        set: "salon", camara: CAM.medio,
        actores: { luis: { pos: [0, 0.4], giro: 0, pose: "piensa", cara: "neutra", acciones: [{ en: "En 2027", pose: "senala", cara: "contenta" }] } },
      },
      html: `
        <div class="kicker">Requisitos</div>
        <div class="tarjeta" style="zoom:0.9">
          <div class="par" data-en="Necesitas" data-a="sube"><span>Años cotizados</span><b>33</b></div>
          <div class="par" data-en="meses apuntado" data-a="sube"><span>En el paro</span><b>6 meses</b></div>
          <div class="par" data-en="desde los 63" data-a="sube"><span>Edad en 2027</span><b>63 (o 61)</b></div>
        </div>`,
    },
    { en: "Ojo", clase: "arriba", transicion: "zoom",
      animacion: {
        set: "salon", camara: CAM.gancho,
        actores: { rosa: { pos: [0, 0.4], giro: 6, pose: "encoge", cara: "preocupada" } },
      },
      html: `
        <div class="kicker">El precio</div>
        <div class="gigante relieve rojo" data-en="hasta un" data-a="golpe3d" style="font-size:170px">−30 %</div>
        <div class="sub" data-en="para siempre" data-a="sube">de recorte, para siempre</div>`,
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
          <div class="titular m relieve" data-a="sube">Guárdatelo, o pásaselo a <span class="ambar">quien acaben de despedir</span></div>
          <div class="url" data-a="sube" data-dur="0.6">Requisitos y recortes: jubilometro.com</div>
          <div class="aviso" data-a="aparece">Información general (art. 207 LGSS). Edades de 2027. El recorte depende de los meses que adelantes y de tus años cotizados: hasta el 30 % si adelantas 4 años. Compara antes con el paro y el subsidio de mayores de 52.</div>
        </div>`,
    },
  ],

  portada: `
    <div class="kicker" data-a="fijo">Si te despiden</div>
    <div class="titular relieve" data-a="fijo">Jubílate hasta <span class="ambar">4 años antes</span></div>
    <div class="sub" data-a="fijo">Requisitos y cuánto pierdes</div>`,
};

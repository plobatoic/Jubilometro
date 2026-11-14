// Reel 12 · Jubilación flexible: vuelve a trabajar jubilado y espera 6 meses
// Fuente: contenido/jubilacion/flexible/articulo.md (+ verificacion-fuentes.md). Formato de muñecos 3D (README, «Muñecos 3D»).
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
  tema: "Jubilación flexible",
  estilo: "dinamico",
  velo: "suave",
  musica: "https://cdn.orshot.com/library/music/04ccbe32-a3e1-4c80-aa68-879342c36b94.m4a", // «Hopeful» (piano, 88 bpm), Orshot
  musicaBucle: { ini: 2.727, fin: 13.636 },
  volumenMusica: 0.14,
  guion: `¿Jubilado y quieres volver a trabajar? Espera seis meses y puedes cobrar hasta un [[25%|veinticinco por ciento]] más de pensión. Se llama jubilación flexible.

Desde agosto de [[2026|dos mil veintiséis]] puedes trabajar entre el [[33%|treinta y tres por ciento]] y el [[80%|ochenta por ciento]] de la jornada. La pensión baja en proporción.

Pongamos que Rosa se jubiló con [[1.500|mil quinientos]] euros y vuelve a trabajar a los ocho meses, al [[60%|sesenta por ciento]] de jornada. Cobra [[600|seiscientos]] euros de pensión, más el incremento del [[25%|veinticinco por ciento]], además de su sueldo.

Si hubiera vuelto a los tres meses, se quedaría en los seiscientos, sin incremento.

Guárdatelo, o pásaselo a un jubilado.`,

  escenas: [
    { clase: "arriba",
      animacion: {
        set: "salon", camara: CAM.gancho,
        actores: { luis: { pos: [0, 0.4], giro: 8, pose: "movil", cara: "neutra", acciones: [{ en: "Espera seis meses", pose: "senalaArriba", cara: "sorpresa" }] } },
        atrezo: [{ tipo: "movil", quien: "luis" }, { tipo: "bocadillo", quien: "luis", texto: "?", t: 0.3, hasta: 2.2 }],
      },
      html: `
        <div class="kicker" data-a="fijo">Jubilación flexible</div>
        <div class="titular relieve" data-a="fijo">Jubilado y <span class="ambar">trabajando</span></div>
        <div class="sub" data-en="Espera seis meses" data-a="sube">Espera 6 meses: hasta un 25% más 👇</div>`,
    },
    { en: "Desde agosto", clase: "arriba", transicion: "latigo",
      animacion: {
        set: "salon", camara: CAM.cal,
        actores: { luis: { pos: [-0.4, 0.5], giro: 28, pose: "piensa", cara: "neutra", acciones: [{ en: "de la jornada", pose: "senala", cara: "contenta" }] } },
        atrezo: [{ tipo: "calendarioPared", pos: [1.55, 2.6, -3.08], de: ["AGOSTO", "28", "#3d86e0"], a: ["DESDE", "2026", "#1f9d6b"], en: "Desde agosto" }],
      },
      html: `
        <div class="kicker">Real Decreto 416/2026</div>
        <div class="tarjeta" style="zoom:0.95">
          <div class="par" data-en="Desde agosto" data-a="sube"><span>En vigor desde</span><b>agosto de 2026</b></div>
          <div class="par" data-en="entre el 33% y el 80%" data-a="sube"><span>Jornada permitida</span><b>33% a 80%</b></div>
        </div>`,
    },
    { en: "La pensión baja", clase: "arriba", transicion: "zoom",
      animacion: {
        set: "salon", camara: CAM.medio2,
        actores: { rosa: { pos: [0.2, 0.5], giro: -10, pose: "piensa", cara: "neutra", acciones: [{ en: "en proporción", pose: "senala", cara: "contenta" }] } },
      },
      html: `
        <div class="kicker">La pensión baja en proporción</div>
        <div class="tarjeta" style="zoom:0.95">
          <div class="par" data-en="La pensión baja" data-a="sube"><span>Trabajas el</span><b>60%</b></div>
          <div class="par" data-en="en proporción" data-a="sube"><span>Cobras de pensión el</span><b>40%</b></div>
        </div>`,
    },
    { en: "Pongamos que Rosa", clase: "arriba", transicion: "giro",
      animacion: {
        set: "salon", camara: CAM.general2,
        actores: {
          rosa: { pos: [-0.85, 0.5], giro: 12, pose: "reposo", cara: "neutra", acciones: [{ en: "más el incremento", pose: "celebra", cara: "feliz" }] },
          luis: { pos: [0.85, 0.5], giro: -12, pose: "piensa", cara: "neutra", acciones: [{ en: "más el incremento", pose: "pulgar", cara: "contenta" }] },
        },
        atrezo: [{ tipo: "monedas", en: "más el incremento", n: 34 }],
      },
      html: `
        <div class="kicker">Un ejemplo</div>
        <div class="tarjeta" style="zoom:0.9">
          <div class="par" data-en="se jubiló con 1.500" data-a="sube"><span>Pensión de Rosa</span><b>1.500 €</b></div>
          <div class="par" data-en="a los ocho meses" data-a="sube"><span>Vuelve a los</span><b>8 meses</b></div>
          <div class="par" data-en="Cobra 600" data-a="sube"><span>Pensión</span><b>600 €</b></div>
          <div class="par" data-en="más el incremento" data-a="sube"><span>Más el incremento</span><b>+ 25%</b></div>
        </div>
        <div class="sub centro" data-en="además de su sueldo" data-a="sube">además de su sueldo</div>`,
    },
    { en: "Si hubiera vuelto", clase: "arriba", transicion: "latigo",
      animacion: {
        set: "salon", camara: CAM.medio,
        actores: { luis: { pos: [0, 0.4], giro: -6, pose: "encoge", cara: "preocupada", acciones: [{ en: "sin incremento", pose: "senalaArriba", cara: "sorpresa" }] } },
        atrezo: [{ tipo: "bocadillo", quien: "luis", texto: "!", color: "#c24b43", en: "Si hubiera vuelto" }],
      },
      html: `
        <div class="kicker">Si vuelves a los 3 meses</div>
        <div class="cifra m rojo" data-en="sin incremento" data-a="pop">Sin el 25%</div>
        <div class="titular s" data-a="sube">sin el incremento</div>`,
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
          <div class="titular m relieve" data-a="sube">Guárdatelo, o pásaselo a <span class="ambar">un jubilado</span></div>
          <div class="url" data-a="sube" data-dur="0.6">Todos los casos: jubilometro.com</div>
          <div class="aviso" data-a="aparece">Información general. Real Decreto 416/2026. Incremento del 15 % (jornada del 33 % al 55 %) o del 25 % (del 55 % al 80 %) si trabajas por cuenta ajena. Confirma tu cuantía con el INSS.</div>
        </div>`,
    },
  ],

  portada: `
    <div class="kicker" data-a="fijo">Jubilación flexible</div>
    <div class="titular relieve" data-a="fijo">Espera <span class="ambar">6 meses</span></div>
    <div class="sub" data-a="fijo">Hasta un 25% más de pensión</div>`,
};

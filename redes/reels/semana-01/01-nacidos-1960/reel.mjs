// Reel 1 · Nacidos en 1960: por qué no te jubilas a los 66 años y 8 meses
// Fuente: contenido/jubilacion/edad-de-jubilacion/articulo.md (tabla por año de nacimiento y ejemplo del 20/04/1960)
const ENVIAR = `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7z"/></svg>`;

export default {
  tema: "Edad de jubilación",
  marcaAgua: "1960",
  tempo: 1.12,
  guion: `Si naciste en 1960, es muy probable que te hayan dicho mal tu edad de jubilación.

Muchas tablas dicen: 66 años y 8 meses. Pero la ley no mira el año en que naciste. Mira el año en que te jubilas.

Un ejemplo. Naciste el 20 de abril de 1960. Cumples 66 años y 8 meses en diciembre de 2026, pero ese año ya se exigen 66 y 10. Llegas a esa edad en febrero de 2027... y en 2027 se exigen 67.

Resultado: te jubilas en abril de 2027, con 67 años.

Si naciste entre marzo y diciembre de 1960 y no tienes una carrera de cotización larga, tu edad es 67.

Envíaselo a alguien nacido en 1960.`,

  escenas: [
    { // 0 · Gancho: visible desde el primer fotograma
      html: `
        <div class="kicker" data-a="fijo">¿Naciste en 1960?</div>
        <div class="titular" data-a="fijo">Tu edad de jubilación puede estar <mark>mal calculada</mark></div>
        <div class="sub" data-en="es muy probable" data-a="sube">Y no es culpa tuya.</div>`,
    },
    { en: "Muchas tablas dicen",
      html: `
        <div class="tarjeta mala">
          <div class="etq">Lo que dicen muchas tablas</div>
          <div class="cifra xs" data-en="66 años y 8" data-a="pop"><span class="tachable" data-en="Pero la ley" data-a="tacha">66 años y 8 meses</span></div>
        </div>
        <div class="fila" data-en="Pero la ley" data-a="sube"><div class="ico no">✕</div><div>No cuenta el año en que naciste</div></div>
        <div class="fila" data-en="Mira el año" data-a="sube"><div class="ico si">✓</div><div>Cuenta el año en que <mark>te jubilas</mark></div></div>`,
    },
    { en: "Un ejemplo",
      html: `
        <div class="kicker">Un ejemplo</div>
        <div class="linea">
          <div class="hito ok" data-en="Naciste el 20" data-a="sube">
            <div class="f">20 de abril de 1960</div>
            <div class="t">Naces</div>
          </div>
          <div class="hito mal" data-en="Cumples 66" data-a="sube">
            <div class="f">Diciembre 2026</div>
            <div class="t">Cumples 66 años y 8 meses</div>
            <div class="x" data-en="pero ese año" data-a="sube">✕ En 2026 se exigen 66 y 10</div>
          </div>
          <div class="hito mal" data-en="Llegas a esa" data-a="sube">
            <div class="f">Febrero 2027</div>
            <div class="t">Cumples 66 años y 10 meses</div>
            <div class="x" data-en="y en 2027 se" data-a="sube">✕ En 2027 se exigen 67</div>
          </div>
        </div>`,
    },
    { en: "Resultado",
      html: `
        <div class="kicker centro" style="align-self:center">Resultado</div>
        <div class="cifra fecha centro" style="align-self:center" data-en="te jubilas en abril" data-a="pop">20/04/2027</div>
        <div class="sello verde" data-en="con 67 años" data-a="sello">A los 67 años</div>`,
    },
    { en: "Si naciste entre marzo",
      html: `
        <div class="kicker">Si naciste en 1960</div>
        <div class="tarjeta">
          <div class="par" data-a="sube"><span>Enero o febrero</span><b>66 a. y 10 m.</b></div>
          <div class="par" data-a="sube"><span>Marzo a diciembre</span><b class="ambar">67 años</b></div>
        </div>
        <div class="nota" data-en="no tienes una carrera" data-a="sube">Salvo carrera larga: con 38 años y 3 meses cotizados si te jubilas en 2026 (38 años y 6 meses en 2027) tu edad ordinaria es 65 y no esperas a los 67.</div>`,
    },
    { en: "Envíaselo",
      html: `
        <div class="cta">
          <div class="icono" data-a="pop">${ENVIAR}</div>
          <div class="titular m" data-a="sube">Envíaselo a alguien nacido en <mark>1960</mark></div>
          <div class="url" data-a="sube" data-dur="0.6">Tu fecha exacta: jubilometro.com</div>
          <div class="aviso" data-a="aparece">Información general según la Ley General de la Seguridad Social (DT 7.ª). Confirma tu caso con la Seguridad Social.</div>
        </div>`,
    },
  ],

  portada: `
    <div class="kicker" data-a="fijo">Nacidos en 1960</div>
    <div class="titular" data-a="fijo">No te jubilas a los <span class="tachable" style="--p:1">66 y 8</span></div>
    <div class="cifra xl ambar" data-a="fijo">67 años</div>
    <div class="sub" data-a="fijo">Te explico por qué</div>`,
};

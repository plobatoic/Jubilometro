// Banco de publicaciones · Vídeos «La cifra en 30 segundos» (TikTok, Reels y Shorts).
// Los guiones están en herramientas/redes/videos/videos.mjs; aquí, el título y el texto que acompaña a cada vídeo.
// El guion de la tabla (tiempo, en pantalla, voz) se saca del vídeo para que no haya dos versiones.
import { VIDEOS } from '../videos/videos.mjs';
import { L } from './comun.mjs';

const limpio = (s) => s.replace(/\{n:[\d.]+:([\d.]+):(\d)\}/g, (_, v, d) => Number(v).toLocaleString('es-ES', { minimumFractionDigits: +d, maximumFractionDigits: +d })).replace(/\*/g, '');
const guion = (archivo) => {
  const v = VIDEOS.find((x) => x.archivo === archivo);
  if (!v) throw new Error(`No hay guion para ${archivo}`);
  const pantalla = (e) => [e.antetitulo, e.grande && limpio(e.grande), e.bloque?.items?.join(' · '), e.bloque?.de && `${limpio(e.bloque.de)} → ${limpio(e.bloque.a)}`, e.bloque?.barras?.map(([p, t]) => `${p} %: ${t}`).join(' · ')].filter(Boolean).join(' · ');
  return [...v.escenas.map((e) => [`${e.t[0]}-${e.t[1]} s`, pantalla(e), e.sub]), [`${v.cierre.t[0]}-${v.cierre.t[1]} s`, v.enlace, v.cierre.sub]];
};
const video = (archivo, extra) => ({ red: 'video', tipo: 'Vídeo (listo)', archivo: `${archivo}.mp4`, guion: guion(archivo), ...extra });

export const VIDEOS_BANCO = [
  video('video-13-sovi', {
    id: 'video-sovi', pilar: 'Errores que cuestan dinero', fuente: '/jubilacion/pension-sovi/',
    titulo: '¿Tu madre trabajó antes de 1967? Puede tener pensión',
    texto: `Con 1.800 días cotizados antes de 1967, la pensión del SOVI paga 599,60 € al mes en 2026. Cada hijo nacido antes de 1967 suma 112 días. Requisitos: ${L('sovi', 'yt')}

#pensiones #jubilacion #sovi`,
  }),
  video('video-14-auxilio-defuncion', {
    id: 'video-auxilio', pilar: 'Trámites sin líos', fuente: '/viudedad/auxilio-por-defuncion/',
    titulo: 'Auxilio por defunción: 46,50 € que se suelen olvidar',
    texto: `El auxilio por defunción son 46,50 € para quien pagó el entierro, y hay cinco años para pedirlo. Quién lo cobra y cómo: ${L('auxilio-defuncion', 'yt')}

#pensiones #viudedad #tramites`,
  }),
  video('video-15-baja', {
    id: 'video-baja', pilar: 'La cifra que te toca', fuente: '/incapacidad/cuanto-se-cobra-de-baja/',
    titulo: '¿Cuánto se cobra de baja? Día a día',
    texto: `De baja por enfermedad: nada los 3 primeros días, el 60 % del día 4 al 20 y el 75 % desde el 21. Con un ejemplo en euros: ${L('baja', 'yt')}

#baja #trabajo #seguridadsocial`,
  }),
  video('video-16-compensa', {
    id: 'video-compensa', pilar: 'Calcula tu caso', fuente: '/jubilacion/compensa-jubilarse-antes/',
    titulo: '¿Compensa jubilarse 2 años antes?',
    texto: `Si adelantas la jubilación 2 años, lo cobrado de más se agota entre los 73 y los 79 años. Haz tus cuentas: ${L('compensa', 'yt')}

#jubilacion #jubilacionanticipada #pensiones`,
  }),
  video('video-17-complemento-minimos', {
    id: 'video-complemento-minimos', pilar: 'Errores que cuestan dinero', fuente: '/cuanto-cobrare/complemento-a-minimos/',
    titulo: '¿Tu pensión no llega a la mínima? La Seguridad Social pone la diferencia',
    texto: `Si tu pensión no llega a la mínima (936,20 € al mes con 65 años y viviendo solo en 2026) y tus ingresos son bajos, la Seguridad Social te paga la diferencia: ${L('complemento-minimos', 'yt')}

#pensiones #pensionminima #jubilacion`,
  }),
  video('video-18-dependencia-espera', {
    id: 'video-dependencia-espera', pilar: 'Calcula tu caso', fuente: '/dependencia/tiempos-dependencia/',
    titulo: '¿Cuánto tarda de verdad la dependencia?',
    texto: `La ley da seis meses, pero la media real en España es de 302 días: de 111 en Aragón a 536 en la Región de Murcia. Tu comunidad: ${L('espera-dependencia', 'yt')}

#dependencia #mayores #cuidados`,
  }),
  video('video-19-volver-a-casarse', {
    id: 'video-volver-a-casarse', pilar: 'Errores que cuestan dinero', fuente: '/viudedad/nuevo-matrimonio/',
    titulo: '¿Pierdes la viudedad si te vuelves a casar?',
    texto: `La viudedad se pierde al volver a casarte, salvo con más de 61 años, si es tu principal ingreso y entre los dos no pasáis de 34.188 € al año. Requisitos: ${L('volver-a-casarse', 'yt')}

#viudedad #pensiones #seguridadsocial`,
  }),
  video('video-20-grados-incapacidad', {
    id: 'video-grados-incapacidad', pilar: 'Calcula tu caso', fuente: '/incapacidad/grados-incapacidad/',
    titulo: 'Incapacidad permanente: 4 grados, 4 formas de cobrar',
    texto: `Parcial, 24 mensualidades; total, el 55 % (75 % desde los 55); absoluta, el 100 % sin IRPF, y gran incapacidad, el 100 % más un complemento. Calcula la tuya: ${L('calcula-incapacidad', 'yt')}

#incapacidadpermanente #pensiones #inss`,
  }),
  video('video-21-pedir-viudedad', {
    id: 'video-pedir-viudedad', pilar: 'Trámites sin líos', fuente: '/viudedad/solicitar-viudedad/',
    titulo: 'Pensión de viudedad: pídela en los 3 primeros meses',
    texto: `La pensión de viudedad no caduca, pero solo se cobran con atrasos los tres meses anteriores a la solicitud. Pídela en los tres meses siguientes al fallecimiento: ${L('pedir-viudedad', 'yt')}

#viudedad #pensiones #tramites`,
  }),
  video('video-22-pareja-de-hecho', {
    id: 'video-pareja-de-hecho', pilar: 'Calcula tu caso', fuente: '/viudedad/pareja-de-hecho/',
    titulo: '¿Viudedad sin estar casados? Sí, con dos requisitos',
    texto: `Las parejas de hecho cobran la viudedad igual que un matrimonio si están inscritas al menos 2 años antes y convivían 5 años seguidos. Requisitos: ${L('pareja-de-hecho', 'yt')}

#viudedad #parejadehecho #pensiones`,
  }),
  video('video-23-incapacidad-denegada', {
    id: 'video-incapacidad-denegada', pilar: 'Errores que cuestan dinero', fuente: '/incapacidad/denegada/',
    titulo: '¿Te han denegado la incapacidad? Tienes 30 días',
    texto: `Si te deniegan la incapacidad permanente, tienes 30 días para la reclamación previa ante el INSS y otros 30 para la demanda. Paso a paso: ${L('incapacidad-denegada', 'yt')}

#incapacidadpermanente #inss #pensiones`,
  }),
  video('video-24-total-cualificada', {
    id: 'video-total-cualificada', pilar: 'La cifra que te toca', fuente: '/incapacidad/total-cualificada/',
    titulo: 'Incapacidad total: del 55 % al 75 % desde los 55 años',
    texto: `La incapacidad permanente total sube del 55 % al 75 % de la base reguladora desde los 55 años, mientras no trabajes. Requisitos: ${L('incapacidad-total', 'yt')}

#incapacidadpermanente #pensiones #inss`,
  }),
  video('video-25-jubilacion-activa', {
    id: 'video-jubilacion-activa', pilar: 'Calcula tu caso', fuente: '/jubilacion/activa/',
    titulo: 'Cobrar la pensión y trabajar: la jubilación activa',
    texto: `Si retrasas tu jubilación al menos un año, puedes trabajar y cobrar del 45 % al 100 % de la pensión, según los años de retraso. Cómo funciona: ${L('activa', 'yt')}

#jubilacion #jubilacionactiva #pensiones`,
  }),
  video('video-26-jubilacion-flexible', {
    id: 'video-jubilacion-flexible', pilar: 'Calcula tu caso', fuente: '/jubilacion/flexible/',
    titulo: 'Jubilado y con ganas de trabajar unas horas: la flexible',
    texto: `Con la jubilación flexible trabajas del 33 % al 80 % de una jornada y cobras la pensión reducida en proporción. Desde agosto de 2026, también los autónomos: ${L('flexible', 'yt')}

#jubilacion #jubilacionflexible #pensiones`,
  }),
  video('video-27-vida-laboral', {
    id: 'video-vida-laboral', pilar: 'Errores que cuestan dinero', fuente: '/cuanto-cobrare/informe-vida-laboral/',
    titulo: 'Revisa tu vida laboral antes de jubilarte',
    texto: `Un periodo trabajado que no aparece en tu vida laboral te quita años cotizados y pensión. Cómo pedirla gratis y corregirla: ${L('vida-laboral', 'yt')}

#jubilacion #vidalaboral #pensiones`,
  }),
  video('video-28-sms-017', {
    id: 'video-sms-017', pilar: 'Trámites sin líos', fuente: '/ayudas/tramites-online/',
    titulo: '¿Un SMS raro de la Seguridad Social? Llama al 017',
    texto: `Si te llega un SMS o un correo raro «de la Seguridad Social» o «de Hacienda», no pinches el enlace y llama gratis al 017. Más trucos para hacer trámites: ${L('tramites', 'yt')}

#mayores #estafas #tramites`,
  }),
  video('video-29-vender-casa', {
    id: 'video-vender-casa', pilar: 'Errores que cuestan dinero', fuente: '/dinero/vender-vivienda-65/',
    titulo: 'Mayores de 65: vender tu casa no paga IRPF',
    texto: `Con más de 65 años, la ganancia por vender tu vivienda habitual no paga IRPF, ganes lo que ganes. La plusvalía municipal, sí: ${L('vender-casa', 'yt')}

#vivienda #impuestos #jubilacion`,
  }),
  video('video-30-donar-o-heredar', {
    id: 'video-donar-o-heredar', pilar: 'Errores que cuestan dinero', fuente: '/dinero/herencias-donaciones/',
    titulo: '¿Donar el piso en vida o dejarlo en herencia?',
    texto: `Si donas en vida un piso que ha ganado valor, pagas IRPF por esa ganancia; si lo dejas en herencia, no. Haz números antes de decidir: ${L('herencias', 'yt')}

#herencia #impuestos #familia`,
  }),
  video('video-31-teleasistencia', {
    id: 'video-teleasistencia', pilar: 'Calcula tu caso', fuente: '/dependencia/teleasistencia/',
    titulo: 'Teleasistencia: un pulsador para mayores que viven solos',
    texto: `La teleasistencia es un pulsador conectado a una central las 24 horas. Se pide en los servicios sociales, sin necesidad de tener la dependencia: ${L('teleasistencia', 'yt')}

#mayores #dependencia #cuidados`,
  }),
  video('video-32-anticipada-involuntaria', {
    id: 'video-anticipada-involuntaria', pilar: 'Calcula tu caso', fuente: '/jubilacion/anticipada-involuntaria/',
    titulo: 'Despedido cerca de jubilarte: hasta 4 años antes',
    texto: `Tras un despido colectivo u objetivo puedes jubilarte hasta 4 años antes, con 33 años cotizados y 6 meses en el paro. El recorte puede llegar al 30 %: ${L('involuntaria', 'yt')}

#jubilacion #jubilacionanticipada #despido`,
  }),
  video('video-33-trabajaste-fuera', {
    id: 'video-trabajaste-fuera', pilar: 'Calcula tu caso', fuente: '/jubilacion/trabajado-en-otro-pais/',
    titulo: '¿Trabajaste en otro país? Esos años suman',
    texto: `Si trabajaste en un país de la Unión Europea o con convenio con España, esos años suman para llegar a los 15 mínimos, y cada país paga su parte: ${L('otro-pais', 'yt')}

#jubilacion #emigrantes #pensiones`,
  }),
  video('video-34-grado-discapacidad', {
    id: 'video-grado-discapacidad', pilar: 'Errores que cuestan dinero', fuente: '/dependencia/grado-discapacidad/',
    titulo: 'Grado de discapacidad: menos IRPF desde el 33 %',
    texto: `Con un grado de discapacidad del 33 %, tu mínimo en el IRPF sube 3.000 € al año; con un 65 %, 9.000 € más otros 3.000. Cómo pedirlo: ${L('grado-discapacidad', 'yt')}

#discapacidad #irpf #mayores`,
  }),
  video('video-35-ayuda-domicilio', {
    id: 'video-ayuda-domicilio', pilar: 'Calcula tu caso', fuente: '/dependencia/ayuda-a-domicilio/',
    titulo: 'Ayuda a domicilio: cuántas horas según el grado',
    texto: `Con la dependencia reconocida, la ayuda a domicilio va de 20 a 94 horas al mes según el grado, y pagas una parte según tus ingresos: ${L('ayuda-domicilio', 'yt')}

#dependencia #cuidados #mayores`,
  }),
  video('video-36-requisitos-viudedad', {
    id: 'video-requisitos-viudedad', pilar: 'Calcula tu caso', fuente: '/viudedad/requisitos/',
    titulo: '¿Te corresponde la pensión de viudedad?',
    texto: `Para la viudedad, la persona fallecida tenía que tener 500 días cotizados en los últimos 5 años, 15 años en total o ser pensionista. Si fue un accidente, no se pide cotización: ${L('requisitos-viudedad', 'yt')}

#viudedad #pensiones #seguridadsocial`,
  }),
];

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
];

// Reels de Instagram y de la página de Facebook: los mismos vídeos que los Shorts de YouTube, un día después,
// los martes, jueves y sábados a las 13:00 (los lunes, miércoles y viernes son de los carruseles).
// Cada vídeo es el de publicacion/redes/videos/<archivo>; su texto, título y guía salen de programa.mjs.
// Lo lee herramientas/redes/metricool.mjs (--redes=reel) y la página /enlaces/ (herramientas/redes/enlaces.mjs).
// Para añadir más: una línea por vídeo, con sus cifras repasadas antes contra la guía.
export const REELS = [
  { archivo: 'video-05-naciste-1960.mp4', fecha: '2026-11-07', hora: '13:00' },
  { archivo: 'video-13-sovi.mp4', fecha: '2026-11-10', hora: '13:00' },
  { archivo: 'video-14-auxilio-defuncion.mp4', fecha: '2026-11-12', hora: '13:00' },
  { archivo: 'video-15-baja.mp4', fecha: '2026-11-14', hora: '13:00' },
  { archivo: 'video-31-teleasistencia.mp4', fecha: '2026-11-17', hora: '13:00' },
  { archivo: 'video-11-tarjeta-dorada.mp4', fecha: '2026-11-19', hora: '13:00' },
];

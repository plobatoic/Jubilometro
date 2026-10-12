// Piezas comunes del banco de publicaciones (herramientas/redes/banco/).
// Los enlaces son cortos y llevan la red al final (jubilometro.com/sovi/x): así las estadísticas
// de la web saben de qué publicación llega cada visita. En Facebook no van enlaces.

export const L = (codigo, red) => `jubilometro.com/${codigo}${red ? `/${red}` : ''}`;
export const FB_WEB = 'Tienes la guía completa en la web de Jubilómetro: el enlace está en la información de esta página.';
export const IG_BIO = 'Enlace en la biografía.';

// Configuración general de El Tapete.
// Para activar AdSense cuando Google apruebe la web: rellena `adsense.cliente`
// (ca-pub-XXXXXXXXXXXXXXXX) y los identificadores de cada bloque en `adsense.bloques`,
// y vuelve a ejecutar `npm run build`. Mientras `cliente` esté vacío no se carga ningún anuncio.

export const sitio = {
  nombre: 'El Tapete',
  lema: 'Juegos y pasatiempos gratis en español',
  url: 'https://eltapete.com',
  idioma: 'es-ES',
  // Datos del titular para el aviso legal (obligatorios por la LSSI). Rellenar antes de publicar.
  titular: {
    nombre: '[NOMBRE Y APELLIDOS DEL TITULAR]',
    nif: '[NIF]',
    domicilio: '[DOMICILIO O CIUDAD]',
    email: '[CORREO DE CONTACTO]',
  },
  adsense: {
    cliente: '', // p. ej. 'ca-pub-1234567890123456'
    bloques: {
      // nombre del hueco -> data-ad-slot
      'tras-juego': '',
      'contenido': '',
    },
  },
};

export const juegos = [
  {
    ruta: '/sudoku/',
    nombre: 'Sudoku',
    resumen: 'Un sudoku nuevo cada día en cuatro niveles, con notas, pistas y deshacer.',
    icono: 'sudoku',
  },
  {
    ruta: '/sopa-de-letras/',
    nombre: 'Sopa de letras',
    resumen: 'Sopas de letras por temas para jugar en el móvil o imprimir con letra grande.',
    icono: 'sopa',
  },
  {
    ruta: '/refran-del-dia/',
    nombre: 'El refrán del día',
    resumen: 'Descubre el refrán escondido letra a letra antes de quedarte sin fichas.',
    icono: 'refran',
  },
  {
    ruta: '/brisca/',
    nombre: 'Brisca',
    resumen: 'El clásico de la baraja española contra el ordenador, sin registro.',
    icono: 'brisca',
  },
  {
    ruta: '/mapa-del-dia/',
    nombre: 'El mapa del día',
    resumen: 'Cinco pueblos y ciudades de España: ¿sabes situarlos en el mapa?',
    icono: 'mapa',
  },
  {
    ruta: '/provincias-de-espana/',
    nombre: 'Provincias de España',
    resumen: 'Encuentra en el mapa las 50 provincias, Ceuta y Melilla contra el reloj.',
    icono: 'provincias',
  },
  {
    ruta: '/comunidades-autonomas/',
    nombre: 'Comunidades autónomas',
    resumen: 'Las 17 comunidades y las 2 ciudades autónomas en el mapa.',
    icono: 'comunidades',
  },
];

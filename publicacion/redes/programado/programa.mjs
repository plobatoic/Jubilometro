// Generado con: node herramientas/redes/programar.mjs --inicio=2026-11-05 --semanas=12 --redes=x,instagram,facebook
// No lo edites a mano: cambia el banco (herramientas/redes/banco) y vuelve a generarlo.
export const MES = {
 "titulo": "Redes de Jubilómetro: calendario desde la aprobación",
 "desde": "2026-11-05",
 "hasta": "2027-01-27",
 "horas": {
  "x": "09:00",
  "facebook": "11:00",
  "grupo": "10:00",
  "instagram": "19:00",
  "linkedin": "08:30",
  "whatsapp": "10:00",
  "video": "13:00"
 },
 "notas": [
  [
   "Cifras",
   "las de las guías a 12 de octubre de 2026 (las del primer mes, a 9 de octubre). Las que salen desde enero de 2027 con importes de 2026 llevan un aviso amarillo: compruébalas en la guía antes de publicar. Lo que va entre <mark>[corchetes]</mark> se rellena el día del dato."
  ],
  [
   "Primer día",
   "presentación en todas las redes. Fija arriba la de X y las normas del grupo."
  ],
  [
   "Enlaces",
   "cada red lleva su final: <code>jubilometro.com/edad/x</code> en X, <code>/wa</code> en WhatsApp, <code>/in</code> en LinkedIn y <code>/yt</code> en los vídeos. En <i>Escritorio › Estadísticas</i> de WordPress verás qué publicación trae visitas."
  ],
  [
   "Facebook",
   "sin enlaces en las publicaciones, porque Meta limita a dos al mes las de las páginas sin verificar. El enlace a la web va en la información de la página."
  ],
  [
   "Imágenes y vídeos",
   "cada carrusel de Instagram dice en qué carpeta están sus diapositivas, y las publicaciones con imagen, dónde está. Los vídeos están en <code>publicacion/redes/videos</code>."
  ],
  [
   "Metricool",
   "las publicaciones de X, Facebook y LinkedIn están en <code>publicacion/redes/programado/metricool.csv</code> como borrador. Prueba antes con dos filas."
  ]
 ]
};

export const PUBLICACIONES = [
 {
  "id": "presentacion-x",
  "red": "x",
  "pilar": "Presentación",
  "fuente": "/calculadoras/edad-jubilacion/",
  "texto": "Esto es Jubilómetro: guías y calculadoras gratuitas sobre jubilación y pensiones en España. Cada cifra lleva la norma de la que sale y su fecha, y aquí publicamos cada día la que te afecta.\n\nEmpieza por tu edad de jubilación: jubilometro.com/edad/x",
  "fecha": "2026-11-05",
  "hora": "09:00",
  "nota": "Fíjala arriba del perfil."
 },
 {
  "red": "facebook",
  "pilar": "Presentación",
  "texto": "Esta es la página de Jubilómetro, una web de guías y calculadoras sobre jubilación y pensiones en España.\n\nCada semana publicaremos aquí las cifras que te afectan: la subida de las pensiones, la paga extra, los plazos del Imserso, la dependencia o la viudedad. Cada dato lleva la norma o el organismo del que sale, y la fecha.\n\nNo vendemos nada ni damos asesoramiento personal. Si tienes una duda general, déjala en los comentarios, sin datos personales, y te contestamos con la norma en la mano.",
  "imagen": "Logo de Jubilómetro sobre fondo azul con el texto «Las cifras de tu pensión, con su norma y su fecha».",
  "id": "mes1-02",
  "imagenLista": "publicacion/redes/kit/cifras/2026-10-12-presentacion.png",
  "fecha": "2026-11-05",
  "hora": "11:00"
 },
 {
  "hasta": "2026-11-21",
  "red": "x",
  "tipo": "Hilo",
  "pilar": "Calendario y avisos",
  "fuente": "/cuanto-cobrare/pagas-extra/",
  "partes": [
   "La paga extra de Navidad de los pensionistas: cuándo llega y cuánto es. Hilo.",
   "1. Las pensiones de la Seguridad Social se cobran en 14 pagas: las 12 mensuales y dos extra, con la pensión de junio y con la de noviembre.",
   "2. Si tu banco adelanta el pago, la de noviembre llega entre el 22 y el 26 de noviembre, junto con la pensión del mes.",
   "3. Si no lo adelanta, la Seguridad Social la paga como tarde el primer día hábil de diciembre, y nunca después del día 4.",
   "4. Cada paga extra es igual a una mensualidad si has cobrado la pensión todo el semestre anterior. Si empezaste a cobrar a mitad, es la parte proporcional.",
   "5. Las pensiones por accidente de trabajo o enfermedad profesional se cobran en 12 pagas, con las extra repartidas. Todo, en la guía: jubilometro.com/paga-extra/x"
  ],
  "id": "mes1-75",
  "fecha": "2026-11-05",
  "hora": "13:30"
 },
 {
  "id": "bienvenida-ig",
  "red": "instagram",
  "tipo": "Carrusel",
  "pilar": "Presentación",
  "fuente": "/",
  "diapositivas": [
   "Esto es Jubilómetro: las cifras de tu pensión, con su norma y su fecha.",
   "Guías: 146 sobre jubilación, viudedad, incapacidad, dependencia, ayudas e Imserso.",
   "Calculadoras: 11 gratuitas, sin registro, para tu edad, tu pensión, la viudedad o la incapacidad.",
   "Cada cifra lleva la norma de la que sale y la fecha en que la comprobamos.",
   "Aquí publicaremos carruseles como este con lo que cambia: la subida, la paga extra, el Imserso o la dependencia.",
   "¿Una duda general? Déjala en los comentarios, sin datos personales, y la contestamos con la norma.",
   "Para empezar, la calculadora de edad te dice el mes exacto en que te puedes jubilar.",
   "Síguenos y compártelo con quien esté cerca de jubilarse. Todo, en Jubilómetro (enlace en la biografía)."
  ],
  "texto": "Guías y calculadoras gratuitas sobre jubilación y pensiones en España, con la norma y la fecha de cada cifra. La web, en el enlace de la biografía.\n\n#jubilacion #pensiones #seguridadsocial #mayores",
  "carrusel": "publicacion/redes/banco/carruseles/bienvenida-ig/",
  "fecha": "2026-11-05",
  "hora": "19:00"
 },
 {
  "id": "calculadoras-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/calculadoras/",
  "texto": "11 calculadoras gratuitas y sin registro: edad de jubilación, pensión, simulador completo, anticipada, demorada y activa, pensión neta, viudedad, incapacidad, subida de 2027, cuánto ahorrar y un comparador de edades.\n\nTodas aquí: jubilometro.com/calcular/x",
  "fecha": "2026-11-06",
  "hora": "09:00"
 },
 {
  "id": "calculadoras-fb",
  "red": "facebook",
  "pilar": "Calcula tu caso",
  "fuente": "/calculadoras/",
  "texto": "En Jubilómetro tienes 11 calculadoras gratuitas, sin registro y sin guardar ningún dato. Para que sepas cuál usar:\n\n¿Cuándo me jubilo? La de edad de jubilación, que te da el mes exacto.\n¿Cuánto cobraré? La de la pensión de jubilación, o el simulador, que lo junta todo en una página.\n¿Me compensa adelantarla o retrasarla? La de jubilación anticipada, la de demorada y activa, y el comparador de edades.\n¿Cuánto me llega al banco? La de pensión neta, con el IRPF de tu comunidad.\n¿Cuánto subirá mi pensión? La de la subida de 2027.\n¿Y si falta mi pareja? La de viudedad.\n¿Y si no puedo trabajar? La de incapacidad permanente.\n¿Me llegará con la pensión? La de cuánto ahorrar.\n\nLas tienes todas en la web. El enlace, en el primer comentario.",
  "fecha": "2026-11-06",
  "hora": "11:00"
 },
 {
  "id": "sovi-x",
  "red": "x",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/jubilacion/pension-sovi/",
  "texto": "¿A tu madre le dijeron que no tenía pensión porque le faltaban años? Si trabajó antes de 1967, mira el SOVI: con 1.800 días cotizados entonces paga 599,60 € al mes en 2026. Cada parto anterior a 1967 suma 112 días.\n\njubilometro.com/sovi/x",
  "fecha": "2026-11-06",
  "hora": "13:30"
 },
 {
  "hasta": "2026-11-21",
  "red": "instagram",
  "tipo": "Carrusel",
  "pilar": "Calendario y avisos",
  "fuente": "/cuanto-cobrare/pagas-extra/",
  "diapositivas": [
   "Paga extra de Navidad: cuándo llega.",
   "Llega junto con la pensión de noviembre.",
   "Si tu banco adelanta: entre el 22 y el 26 de noviembre.",
   "Si no: como tarde, el primer día hábil de diciembre.",
   "Es una mensualidad entera si cobraste la pensión todo el semestre anterior.",
   "Las pensiones por accidente de trabajo se cobran en 12 pagas, con la extra repartida.",
   "Guárdalo para no preocuparte si a tu vecino le llega antes.",
   "Calendario de pagos en Jubilómetro (enlace en la biografía)."
  ],
  "texto": "La paga extra llega con la pensión de noviembre. Fechas y cuánto es. Enlace en la biografía.\n\n#pagaextra #pensiones #jubilados #seguridadsocial",
  "id": "mes1-77",
  "carrusel": "publicacion/redes/kit/carruseles/2026-11-03-pagas-extra/",
  "fecha": "2026-11-06",
  "hora": "19:00"
 },
 {
  "id": "metodo-x",
  "red": "x",
  "pilar": "Presentación",
  "fuente": "/metodologia/",
  "texto": "Cómo trabajamos: cada cifra sale del BOE, de la Seguridad Social, del INE o del Imserso, y la publicamos con su fecha. Cada guía tiene su historial de cambios. Si ves un error, escríbenos y lo corregimos.\n\njubilometro.com/como-trabajamos/x",
  "fecha": "2026-11-07",
  "hora": "10:00"
 },
 {
  "hasta": "2026-11-15",
  "red": "facebook",
  "pilar": "Familias y cuidados",
  "fuente": "/viudedad/fallecimiento-pensionista/",
  "texto": "Qué hacer cuando fallece un familiar pensionista. Estos días muchas familias se encuentran con los trámites, y conviene saber los plazos.\n\nLa pensión del mes del fallecimiento se cobra entera, con la parte proporcional de la paga extra. Lo que el banco ingrese de los meses siguientes hay que devolverlo a la Seguridad Social.\n\nAl INSS se le pide la pensión de viudedad, la de orfandad y el auxilio por defunción, mejor en los tres primeros meses. Para la herencia: el certificado de últimas voluntades a partir de 15 días hábiles, el Impuesto sobre Sucesiones en seis meses y la declaración de la renta del fallecido en la campaña del año siguiente.\n\nTienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "id": "mes1-74",
  "fecha": "2026-11-07",
  "hora": "11:00"
 },
 {
  "hasta": "2026-11-28",
  "red": "x",
  "pilar": "Calendario y avisos",
  "fuente": "/cuanto-cobrare/elecciones-y-pensiones/",
  "texto": "¿Afectan las elecciones del 29 de noviembre a la subida de las pensiones de 2027?\n\nA la cifra, no: la fija la ley con el IPC medio. Sí puede retrasar el decreto que la aplica. En 2020 llegó el 14 de enero, con efectos desde el 1 de enero.\n\njubilometro.com/elecciones/x",
  "id": "mes1-04",
  "fecha": "2026-11-08",
  "hora": "10:00"
 },
 {
  "hasta": "2026-11-21",
  "red": "facebook",
  "pilar": "Calendario y avisos",
  "fuente": "/cuanto-cobrare/pagas-extra/",
  "texto": "La paga extra de Navidad llega junto con la pensión de noviembre.\n\nSi tu banco adelanta el pago, la verás entre el 22 y el 26 de noviembre. Si no lo adelanta, la Seguridad Social la paga como tarde el primer día hábil de diciembre. Cada banco elige si adelanta y qué día.\n\n¿El tuyo os la adelantó el año pasado? Cuéntanos qué banco y qué día, y así lo sabemos todos.",
  "imagen": "«Paga extra: 22-26 de noviembre» en letra grande, con «si tu banco adelanta el pago» debajo.",
  "id": "mes1-88",
  "imagenLista": "publicacion/redes/kit/cifras/2026-11-06-paga-extra.png",
  "fecha": "2026-11-08",
  "hora": "11:00"
 },
 {
  "id": "auxilio-x",
  "red": "x",
  "pilar": "Trámites sin líos",
  "fuente": "/viudedad/auxilio-por-defuncion/",
  "texto": "El auxilio por defunción son 46,50 € de la Seguridad Social para quien pagó el entierro. Poco, pero se pide en un rato y hay cinco años de plazo. Si la persona fallecida solo cobraba una viudedad o una no contributiva, no se da.\n\njubilometro.com/auxilio-defuncion/x",
  "fecha": "2026-11-09",
  "hora": "09:00"
 },
 {
  "hasta": "2026-11-28",
  "red": "facebook",
  "pilar": "Calendario y avisos",
  "fuente": "/cuanto-cobrare/elecciones-y-pensiones/",
  "texto": "Muchos nos preguntáis si las elecciones del 29 de noviembre afectan a las pensiones. Esto es lo que dicen las normas.\n\nLa pensión de noviembre, la paga extra y la de diciembre llegan como siempre. La subida de enero la fija la ley con el IPC medio de diciembre a noviembre, así que no depende de quién gane.\n\nLo que puede retrasarse es el decreto que la aplica. En 2020, con un Gobierno en funciones, se aprobó el 14 de enero: la subida contó desde el 1 de enero y lo de enero se pagó como atrasos en febrero.\n\nSi no puedes ir a votar, el voto por correo se pide hasta el 19 de noviembre en Correos. Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "id": "mes1-05",
  "fecha": "2026-11-09",
  "hora": "11:00"
 },
 {
  "id": "gran-incapacidad-x",
  "red": "x",
  "pilar": "La cifra que te toca",
  "fuente": "/incapacidad/gran-incapacidad/",
  "texto": "Gran incapacidad: el 100 % de tu base reguladora más un complemento para pagar a quien te cuida, del 45 % de la base mínima (640,98 € en 2026) más el 30 % de tu última base. La mínima, si vives solo, es de 1.404,30 € al mes.\n\njubilometro.com/gran-incapacidad/x",
  "fecha": "2026-11-09",
  "hora": "13:30"
 },
 {
  "id": "sovi-ig",
  "red": "instagram",
  "tipo": "Carrusel",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/jubilacion/pension-sovi/",
  "diapositivas": [
   "¿Tu madre trabajó antes de 1967? Puede tener pensión.",
   "El SOVI es el seguro que existía antes de la Seguridad Social actual. Todavía paga pensiones.",
   "1.800 días: cotizados antes del 1 de enero de 1967. Unos cinco años, no hace falta que sean seguidos.",
   "599,60 €: al mes en 2026, en 14 pagas.",
   "Con viudedad: también se cobra, 582,10 € al mes.",
   "Cada hijo nacido antes de 1967 suma 112 días para llegar a los 1.800, según el Tribunal Supremo.",
   "Se pide al INSS desde los 65 años. Si la pides en los 30 días siguientes a cumplirlos, se cobra desde ese día.",
   "Envíaselo a quien le pueda servir. La guía completa, en Jubilómetro (enlace en la biografía)."
  ],
  "texto": "Si tu madre o tu abuela trabajó unos años antes de 1967, puede tener la pensión del SOVI: 599,60 € al mes en 2026. Requisitos en la guía, con el enlace de la biografía.\n\n#pensiones #jubilacion #seguridadsocial #sovi",
  "carrusel": "publicacion/redes/banco/carruseles/sovi-ig/",
  "fecha": "2026-11-09",
  "hora": "19:00"
 },
 {
  "id": "imv-x",
  "red": "x",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/ayudas/ingreso-minimo-vital-mayores/",
  "texto": "El ingreso mínimo vital no tiene edad máxima. Con más de 65 años lo puedes cobrar si tus ingresos no llegan a 733,60 € al mes viviendo solo (2026). Es compatible con una pensión baja: cubre la diferencia.\n\njubilometro.com/imv/x",
  "fecha": "2026-11-10",
  "hora": "09:00"
 },
 {
  "id": "autonomos-fb",
  "red": "facebook",
  "pilar": "La cifra que te toca",
  "fuente": "/jubilacion/autonomos/",
  "texto": "Los autónomos se jubilan a la misma edad que los asalariados: en 2027, a los 67 años, o a los 65 con 38 años y 6 meses cotizados. También necesitan 15 años cotizados y, además, estar al corriente en el pago de las cuotas.\n\nLa diferencia está en la cuantía. En octubre de 2026, la pensión media de jubilación de un autónomo era de 1.063,53 euros al mes, frente a 1.735,91 en el Régimen General, porque la mayoría ha cotizado por la base mínima.\n\nSi eres autónomo y te quedan años por delante, lo que más mejora tu pensión es subir la base en los últimos 25 años antes de jubilarte. Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "fecha": "2026-11-10",
  "hora": "11:00"
 },
 {
  "id": "renta-x",
  "red": "x",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/dinero/declaracion-renta-jubilados/",
  "texto": "Si solo cobras tu pensión de un único pagador (la Seguridad Social, aunque sean jubilación y viudedad), no estás obligado a hacer la declaración de la renta si no pasas de 22.000 € brutos al año. Con dos pagadores, el límite puede bajar a 15.876 €.\n\njubilometro.com/renta/x",
  "fecha": "2026-11-10",
  "hora": "13:30"
 },
 {
  "id": "dependencia-galicia-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/dependencia/galicia/",
  "texto": "Dependencia en Galicia: si te cuida un familiar en casa, puedes cobrar el Bono Cuidado en el Hogar, 5.000 € al año, sin importar tu renta ni tu grado. No hace falta informe médico: la Xunta consulta tu historia del Sergas. Media: 307 días.\n\njubilometro.com/dependencia-galicia/x",
  "fecha": "2026-11-11",
  "hora": "09:00"
 },
 {
  "id": "baja-fb",
  "red": "facebook",
  "pilar": "La cifra que te toca",
  "fuente": "/incapacidad/cuanto-se-cobra-de-baja/",
  "texto": "¿Cuánto se cobra de baja? Lo vemos con el caso de Lucía, que cotiza por una base de 1.800 euros al mes y pasa 30 días de baja por una gripe complicada.\n\nSu base reguladora diaria es de 60 euros (1.800 entre 30). Los 3 primeros días no cobra nada. Del día 4 al 20 cobra el 60 %, 36 euros al día: los paga la empresa hasta el día 15 y el INSS o la mutua desde el 16. Del día 21 al 30, el 75 %, 45 euros al día.\n\nEn total, 1.062 euros brutos en lugar de 1.800. Si hubiera sido un accidente de trabajo, habría cobrado 1.365.\n\nAntes de hacer cuentas, mira tu convenio colectivo: muchos obligan a la empresa a completar la baja hasta el 100 % del sueldo. Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "imagenLista": "publicacion/redes/banco/cifras/baja-fb.png",
  "fecha": "2026-11-11",
  "hora": "11:00"
 },
 {
  "id": "viajes-imserso-x",
  "red": "x",
  "pilar": "La cifra que te toca",
  "fuente": "/imserso/viajes-imserso/",
  "hasta": "2027-05-31",
  "texto": "Viajes del Imserso 2026-2027: 879.213 plazas hasta junio de 2027, de 132,91 € (4 días en una capital de provincia) a 564,72 € (10 días en Canarias en temporada alta). Y 7.447 plazas a 50 € para quien tiene ingresos bajos.\n\njubilometro.com/viajes-imserso/x",
  "fecha": "2026-11-11",
  "hora": "13:30"
 },
 {
  "id": "dudas-viudedad-ig",
  "red": "instagram",
  "tipo": "Carrusel",
  "pilar": "Calcula tu caso",
  "fuente": "/viudedad/requisitos/",
  "diapositivas": [
   "Viudedad: las seis dudas que más nos llegan, con respuesta corta.",
   "¿Hay límite de edad o de ingresos? No. Y se puede cobrar trabajando.",
   "¿Y si no estábamos casados? Las parejas de hecho la cobran si están inscritas 2 años antes y convivían 5. Con hijos en común, bastan 2 años de convivencia.",
   "¿Y si me vuelvo a casar? Se pierde, salvo con más de 61 años y ingresos bajos.",
   "¿Y si estaba divorciada? Solo si cobrabas una pensión compensatoria, con excepciones.",
   "¿Es compatible con mi jubilación? Sí, con un tope de 3.359,60 € al mes entre las dos en 2026.",
   "¿Cuándo hay que pedirla? En los 3 meses siguientes al fallecimiento, para no perder atrasos.",
   "Guárdalo y compártelo con quien lo necesite. Todo, en Jubilómetro (enlace en la biografía)."
  ],
  "texto": "Las seis dudas sobre la pensión de viudedad que más nos preguntáis, con respuesta corta. Todas las guías, con el enlace de la biografía.\n\n#viudedad #pensiones #seguridadsocial #jubilacion",
  "carrusel": "publicacion/redes/banco/carruseles/dudas-viudedad-ig/",
  "fecha": "2026-11-11",
  "hora": "19:00"
 },
 {
  "id": "provincia-x",
  "red": "x",
  "pilar": "La cifra que te toca",
  "fuente": "/datos/pension-media-provincia/",
  "texto": "Pensión media de jubilación en octubre de 2026: 1.943 € en Bizkaia y 1.144 € en Ourense, casi 800 € de diferencia. La de España, 1.578 €, y solo 17 de las 52 provincias la superan. ¿Cómo está la tuya?\n\njubilometro.com/provincia/x",
  "fecha": "2026-11-12",
  "hora": "09:00"
 },
 {
  "id": "pnc-invalidez-fb",
  "red": "facebook",
  "pilar": "La cifra que te toca",
  "fuente": "/ayudas/pnc-invalidez/",
  "texto": "Si tienes una discapacidad o una enfermedad crónica del 65 % o más, tienes entre 18 y 64 años y apenas ingresos, puede corresponderte una pensión aunque no hayas cotizado nunca: la pensión no contributiva de invalidez.\n\nEn 2026 es de hasta 628,80 euros al mes en 14 pagas, y como mínimo de 157,20. Si la discapacidad llega al 75 % y necesitas ayuda de otra persona para la vida diaria, se suma un complemento de 314,40 euros al mes.\n\nHay que vivir en España desde hace cinco años y no superar un límite de ingresos. Es compatible con un trabajo, con ciertos límites, y a los 65 años pasa a ser de jubilación. Se pide en los servicios sociales de tu comunidad. Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "fecha": "2026-11-12",
  "hora": "11:00"
 },
 {
  "red": "x",
  "tipo": "Hilo",
  "pilar": "Errores que cuestan dinero",
  "partes": [
   "Cinco errores que cuestan dinero en la pensión, y cómo evitarlos. Hilo.",
   "1. No revisar la vida laboral. Un periodo trabajado que no aparece te quita años cotizados y rebaja la base reguladora. Se pide gratis en Import@ss, también con un SMS, y los errores se pueden rectificar.",
   "2. Dar por hecho que la viudedad es el 52 %. Con 65 años o más, sin otra pensión ni trabajo y rentas de hasta 9.442 € al año, es el 60 %. Y ese 60 % hay que pedirlo.",
   "3. Jubilarse antes sin hacer la cuenta. El recorte de la anticipada voluntaria va del 2,81 % al 21 % según los meses y los años cotizados, y es para siempre.",
   "4. Pensar que los meses sin cotizar cuentan como cero. Los 48 primeros meses de laguna se rellenan con la base mínima y el resto con el 50 %, aunque no suman años cotizados.",
   "5. Cerrar la cuenta antigua al cambiar la pensión de banco. El cambio se aplica desde el primer día hábil del segundo mes. Hasta entonces la pensión sigue llegando a la cuenta vieja.",
   "Cada caso tiene su norma. Con el simulador ves tu edad, tu pensión y qué pasa si te jubilas antes o después: jubilometro.com/simulador/x"
  ],
  "id": "mes1-31",
  "fecha": "2026-11-12",
  "hora": "13:30"
 },
 {
  "id": "calcula-incapacidad-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/calculadoras/incapacidad-permanente/",
  "texto": "¿Cuánto cobrarías con una incapacidad permanente? Elige el grado (parcial, total, absoluta o gran incapacidad) y pon tu base reguladora: la calculadora te da lo que cobrarías, con el 75 % de la total cualificada desde los 55 años.\n\njubilometro.com/calcula-incapacidad/x",
  "fecha": "2026-11-13",
  "hora": "09:00"
 },
 {
  "id": "renta-fb",
  "red": "facebook",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/dinero/declaracion-renta-jubilados/",
  "texto": "¿Tienen que hacer la declaración de la renta los jubilados? Depende de cuánto cobras y de cuántos pagadores tienes.\n\nSi solo cobras tu pensión y te la paga un único pagador, no estás obligado si no pasas de 22.000 euros brutos al año. Ojo: la jubilación y la viudedad de la Seguridad Social cuentan como un solo pagador.\n\nSi tienes dos o más pagadores y el segundo te paga más de 1.500 euros al año (por ejemplo, el rescate de un plan de pensiones), el límite baja a 15.876 euros. También baja si cobras una pensión del extranjero.\n\nAunque no estés obligado, a veces conviene presentarla: si te han retenido de más, Hacienda te lo devuelve. Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "fecha": "2026-11-13",
  "hora": "11:00"
 },
 {
  "id": "guardia-civil-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/jubilacion/guardia-civil/",
  "texto": "Guardia Civil: la reserva no es la jubilación. Cabos, guardias y suboficiales pasan a la reserva a los 58 años y se retiran a los 65. Un guardia que ingresó antes de 2011 cobra con 35 años de servicio unos 2.275 € al mes en 2026.\n\njubilometro.com/guardia-civil/x",
  "fecha": "2026-11-13",
  "hora": "13:30"
 },
 {
  "id": "pnc-ig",
  "red": "instagram",
  "tipo": "Carrusel",
  "pilar": "La cifra que te toca",
  "fuente": "/ayudas/pension-no-contributiva/",
  "diapositivas": [
   "Pensión no contributiva: para quien no llegó a cotizar lo suficiente.",
   "Jubilación: desde los 65 años, sin pensión contributiva y con ingresos bajos.",
   "628,80 €: al mes en 2026 como máximo, en 14 pagas.",
   "Residencia: 10 años en España desde los 16, dos de ellos justo antes de pedirla.",
   "Ingresos propios por debajo de 8.803,20 € al año. Si vives con familia, cuentan también los suyos.",
   "Siete comunidades la complementan, y en cuatro llega sin pedirlo.",
   "Si vives de alquiler, puedes pedir además 525 € al año de complemento.",
   "Envíaselo a quien le pueda servir. Requisitos, en Jubilómetro (enlace en la biografía)."
  ],
  "texto": "Pensión no contributiva de jubilación en 2026: cuantía, requisitos y complementos. Guía en la biografía.\n\n#pensiones #pensionnocontributiva #mayores #ayudas",
  "carrusel": "publicacion/redes/banco/carruseles/pnc-ig/",
  "fecha": "2026-11-13",
  "hora": "19:00"
 },
 {
  "id": "ano-mas-x",
  "red": "x",
  "pilar": "La cifra que te toca",
  "fuente": "/cuanto-cobrare/porcentaje-anos-cotizados/",
  "texto": "José se jubila en 2027 con 36 años cotizados y una base reguladora de 2.200 €: cobra 2.152,48 € al mes. Con un año más cotizado llegaría al 100 % y cobraría 2.200 €. Son 47,52 € más al mes de por vida.\n\njubilometro.com/anos-cotizados/x",
  "fecha": "2026-11-14",
  "hora": "10:00"
 },
 {
  "id": "ley-dependencia-fb",
  "red": "facebook",
  "pilar": "Calcula tu caso",
  "fuente": "/dependencia/ley-dependencia/",
  "texto": "La ley de dependencia protege a quien necesita ayuda de otra persona para lo básico del día a día: comer, asearse, vestirse o moverse por casa.\n\nDespués de una valoración en el domicilio, la comunidad autónoma reconoce un grado (I, II o III) y, con él, un servicio: teleasistencia, ayuda a domicilio, centro de día o residencia. Si no hay plaza pública, da una ayuda económica para pagarlo.\n\nLas ayudas llegan a 747,25 euros al mes para pagar un servicio privado y a 455,40 euros si te cuida un familiar, en el grado III. La Administración tiene seis meses para resolver, y se pide en los servicios sociales de tu ayuntamiento o de tu comunidad.\n\n¿Lo habéis pedido ya en casa? Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "imagenLista": "publicacion/redes/banco/cifras/ley-dependencia-fb.png",
  "fecha": "2026-11-14",
  "hora": "11:00"
 },
 {
  "id": "volver-a-casarse-x",
  "red": "x",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/viudedad/nuevo-matrimonio/",
  "texto": "Si te vuelves a casar, pierdes la viudedad, salvo que cumplas tres cosas a la vez: más de 61 años, que la viudedad sea al menos el 75 % de tus ingresos y que la pareja no gane más de 34.188 € al año entre los dos en 2026.\n\njubilometro.com/volver-a-casarse/x",
  "fecha": "2026-11-15",
  "hora": "10:00"
 },
 {
  "id": "viajes-imserso-fb",
  "red": "facebook",
  "pilar": "La cifra que te toca",
  "fuente": "/imserso/viajes-imserso/",
  "hasta": "2027-05-31",
  "texto": "La temporada de viajes del Imserso está en marcha y dura hasta junio de 2027.\n\nHay 879.213 plazas. Los precios van de 132,91 euros por 4 días en una capital de provincia a 564,72 euros por 10 días en Canarias en temporada alta. Y hay 7.447 plazas a 50 euros para quien tiene ingresos iguales o inferiores a la pensión no contributiva.\n\nSi te acreditaste en verano, puedes reservar las plazas libres de cualquier provincia en turismosocial.es, en mundicolor.es o en una agencia autorizada, con tu DNI y la clave de 4 dígitos de la carta. Las plazas que otros cancelan vuelven a la venta toda la temporada.\n\n¿Ya tenéis viaje este año? Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "imagenLista": "publicacion/redes/banco/cifras/viajes-imserso-fb.png",
  "fecha": "2026-11-15",
  "hora": "11:00"
 },
 {
  "red": "x",
  "pilar": "La cifra que te toca",
  "fuente": "/incapacidad/total-cualificada/",
  "texto": "Incapacidad permanente total: 55 % de la base reguladora. Desde los 55 años, si no trabajas, sube al 75 %.\n\nCon una base de 1.500 €, de 825 a 1.125 € al mes. El aumento se suspende mientras trabajes y se recupera al dejarlo.\n\njubilometro.com/incapacidad-total/x",
  "id": "mes1-91",
  "fecha": "2026-11-16",
  "hora": "09:00"
 },
 {
  "id": "provincia-fb",
  "red": "facebook",
  "pilar": "La cifra que te toca",
  "fuente": "/datos/pension-media-provincia/",
  "texto": "La pensión media de jubilación en España era de 1.577,61 euros al mes en octubre de 2026. Pero cambia mucho según dónde vivas.\n\nLas más altas: Bizkaia (1.943 euros), Álava (1.927), Gipuzkoa (1.860), Asturias (1.840) y Madrid (1.800). Las más bajas: Ourense (1.144), Lugo (1.244), Almería (1.300), Jaén (1.320) y Cáceres (1.322).\n\nLas diferencias vienen sobre todo de carreras de cotización más largas y sueldos más altos en las zonas industriales, frente a provincias con más peso del campo y de los autónomos. Y es la media de todas las pensiones que se cobran hoy: quien se jubiló en septiembre empezó cobrando de media unos 1.758 euros.\n\n¿Cómo está tu provincia? La tabla completa, con las 52, está en la web. El enlace, en el primer comentario.",
  "imagenLista": "publicacion/redes/banco/cifras/provincia-fb.png",
  "fecha": "2026-11-16",
  "hora": "11:00"
 },
 {
  "id": "pnc-invalidez-x",
  "red": "x",
  "pilar": "La cifra que te toca",
  "fuente": "/ayudas/pnc-invalidez/",
  "texto": "Con una discapacidad del 65 %, entre 18 y 64 años y pocos ingresos, puedes cobrar la pensión no contributiva de invalidez sin haber cotizado: hasta 628,80 € al mes en 2026, y 314,40 € más si llegas al 75 % y necesitas ayuda de otra persona.\n\njubilometro.com/pnc-invalidez/x",
  "fecha": "2026-11-16",
  "hora": "13:30"
 },
 {
  "id": "baja-ig",
  "red": "instagram",
  "tipo": "Carrusel",
  "pilar": "La cifra que te toca",
  "fuente": "/incapacidad/cuanto-se-cobra-de-baja/",
  "diapositivas": [
   "¿Cuánto se cobra de baja? Día a día, según el motivo.",
   "Enfermedad común, días 1 a 3: nada, salvo que tu convenio lo mejore.",
   "60 %: de tu base reguladora del día 4 al 20. Hasta el día 15 lo paga la empresa.",
   "75 %: desde el día 21, a cargo del INSS o de la mutua, aunque lo sigues cobrando en la nómina.",
   "Accidente de trabajo: el día del accidente, el sueldo entero, y el 75 % desde el día siguiente.",
   "La base reguladora diaria es tu base de cotización del mes anterior entre 30.",
   "Desde 2023 no tienes que llevar el parte a la empresa: el INSS se lo comunica.",
   "Guárdalo por si te hace falta. La guía con el ejemplo en euros, en Jubilómetro (enlace en la biografía)."
  ],
  "texto": "Cuánto se cobra de baja por enfermedad o por accidente de trabajo, día a día y con un ejemplo en euros. Guía en la biografía.\n\n#baja #incapacidadtemporal #trabajo #seguridadsocial",
  "carrusel": "publicacion/redes/banco/carruseles/baja-ig/",
  "fecha": "2026-11-16",
  "hora": "19:00"
 },
 {
  "id": "renta-vitalicia-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/dinero/renta-vitalicia/",
  "texto": "Con más de 65 años, si vendes un piso que no es tu vivienda, acciones o fondos con ganancia, no pagas IRPF por ella si metes el dinero en una renta vitalicia asegurada en seis meses. Máximo, 240.000 € en toda tu vida.\n\njubilometro.com/renta-vitalicia/x",
  "fecha": "2026-11-17",
  "hora": "09:00"
 },
 {
  "id": "subida-fb",
  "red": "facebook",
  "pilar": "Calendario y avisos",
  "fuente": "/calculadoras/subida-pensiones/",
  "hasta": "2027-01-31",
  "texto": "¿Cuánto cobrarás en 2027 con la subida de las pensiones? Lo puedes calcular en un minuto.\n\nLas pensiones contributivas suben en enero lo que haya subido de media el IPC en los doce meses de diciembre de 2025 a noviembre de 2026. No hay que pedirlo: la Seguridad Social lo aplica sola desde la pensión de enero. Las mínimas y las no contributivas suben además lo necesario para acercarse al umbral de la pobreza, como marca la ley para 2027.\n\nEn la calculadora de la subida pones tu pensión de 2026 y te dice cuánto cobrarás al mes y al año, y cuánto más que ahora. Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "fecha": "2026-11-17",
  "hora": "11:00"
 },
 {
  "id": "cuidados-familia-x",
  "red": "x",
  "pilar": "La cifra que te toca",
  "fuente": "/dependencia/prestacion-cuidados-familiares/",
  "texto": "Si a una persona dependiente la cuida un familiar en casa, puede cobrar en 2026 hasta 455,40 € al mes con grado III, 315,90 con grado II y 180 con grado I, según su capacidad económica. No tributa en el IRPF.\n\njubilometro.com/cuidados-familia/x",
  "fecha": "2026-11-17",
  "hora": "13:30"
 },
 {
  "id": "reservar-imserso-x",
  "red": "x",
  "pilar": "Trámites sin líos",
  "fuente": "/imserso/solicitar-viajes/",
  "hasta": "2027-05-31",
  "texto": "Reservar un viaje del Imserso: la costa peninsular y las escapadas, en turismosocial.es; Baleares y Canarias, en mundicolor.es, o en una agencia autorizada por 15 € de gestión. Necesitas el DNI y la clave de 4 dígitos de tu carta.\n\njubilometro.com/reservar-imserso/x",
  "fecha": "2026-11-18",
  "hora": "09:00"
 },
 {
  "id": "auxilio-fb",
  "red": "facebook",
  "pilar": "Trámites sin líos",
  "fuente": "/viudedad/auxilio-por-defuncion/",
  "texto": "Cuando muere un familiar, entre tantos papeles se suele olvidar una ayuda pequeña de la Seguridad Social: el auxilio por defunción. Son 46,50 euros en un solo pago, para quien pagó el entierro.\n\nSe da si la persona fallecida trabajaba, cobraba el paro o una baja, o era pensionista de jubilación o de incapacidad permanente. No se da si solo cobraba una pensión de viudedad, una no contributiva o la del SOVI.\n\nSi vas a pedir también la viudedad o la orfandad, se pide todo junto en la misma solicitud. Si solo pides el auxilio, se puede hacer por internet, incluso sin certificado digital, por correo o con cita previa. Hay cinco años de plazo; después se pierde.\n\nTienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "imagenLista": "publicacion/redes/banco/cifras/auxilio-fb.png",
  "fecha": "2026-11-18",
  "hora": "11:00"
 },
 {
  "id": "simulador-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/calculadoras/simulador-jubilacion/",
  "texto": "El simulador de jubilación te da en una sola página tu fecha exacta de jubilación, tu pensión, lo que ganas o pierdes adelantándola o retrasándola mes a mes y lo que te llega neto. Pide tu fecha de nacimiento, lo cotizado y tu base.\n\njubilometro.com/simulador/x",
  "fecha": "2026-11-18",
  "hora": "13:30"
 },
 {
  "id": "renta-ig",
  "red": "instagram",
  "tipo": "Carrusel",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/dinero/declaracion-renta-jubilados/",
  "diapositivas": [
   "¿Tienen que hacer la renta los jubilados? Depende de esto.",
   "Un solo pagador: no estás obligado hasta 22.000 € brutos al año.",
   "La jubilación y la viudedad de la Seguridad Social cuentan como un solo pagador.",
   "Dos pagadores: si el segundo, como un plan de pensiones, pasa de 1.500 € al año, el límite baja a 15.876 €.",
   "También baja el límite si cobras una pensión del extranjero.",
   "La incapacidad permanente absoluta y las ayudas de la dependencia no tributan.",
   "Aunque no estés obligado, si te han retenido de más, presentarla te devuelve ese dinero.",
   "Guárdalo para la próxima campaña. La guía, en Jubilómetro (enlace en la biografía)."
  ],
  "texto": "Cuándo tiene que hacer la declaración de la renta un jubilado: los límites y los casos que cambian las cuentas. Guía en la biografía.\n\n#renta #jubilados #pensiones #hacienda",
  "carrusel": "publicacion/redes/banco/carruseles/renta-ig/",
  "fecha": "2026-11-18",
  "hora": "19:00"
 },
 {
  "id": "docentes-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/jubilacion/docentes/",
  "texto": "Maestros y profesores funcionarios que entraron antes de 2011: pensión de Clases Pasivas y posibilidad de jubilarse desde los 60 con 30 años de servicio. Una maestra con 35 años de servicio cobra en 2026 unos 2.962 € al mes.\n\njubilometro.com/docentes/x",
  "fecha": "2026-11-19",
  "hora": "09:00"
 },
 {
  "id": "como-se-calcula-fb",
  "red": "facebook",
  "pilar": "Calcula tu caso",
  "fuente": "/cuanto-cobrare/como-se-calcula-la-pension/",
  "texto": "Cómo se calcula la pensión de jubilación, en tres pasos y con un ejemplo.\n\n1. La base reguladora: la media de lo que has cotizado en los últimos 25 años, repartida en 14 pagas. Las bases antiguas se actualizan con el IPC para que no pierdan valor.\n2. El porcentaje por años cotizados: con 15 años, el 50 % de esa base; con 37 años (36 y medio si te jubilas en 2026), el 100 %.\n3. Los ajustes: un recorte si te jubilas antes, un 4 % más por cada año que la retrases, el complemento a mínimos si no llegas a la mínima y el tope de la pensión máxima, 3.359,60 euros al mes en 2026.\n\nEjemplo: Juan se jubila en 2027 a los 67 años, con 30 años cotizados y una base reguladora de 1.500 euros. Le corresponde el 84,20 %, es decir, 1.263 euros al mes.\n\nTienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "fecha": "2026-11-19",
  "hora": "11:00"
 },
 {
  "id": "complemento-minimos-x",
  "red": "x",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/cuanto-cobrare/complemento-a-minimos/",
  "texto": "Si tu pensión no llega a la mínima, la Seguridad Social te paga la diferencia: es el complemento a mínimos. En 2026, la mínima con 65 años o más es de 936,20 € al mes si vives solo, y tus otros ingresos no pueden pasar de 9.442 € al año.\n\njubilometro.com/complemento-minimos/x",
  "fecha": "2026-11-19",
  "hora": "13:30"
 },
 {
  "id": "orfandad-x",
  "red": "x",
  "pilar": "La cifra que te toca",
  "fuente": "/viudedad/pension-orfandad/",
  "texto": "Pensión de orfandad: cada hijo cobra el 20 % de la base reguladora del fallecido, con un mínimo de 286,50 € al mes en 2026. Hasta los 21 años, hasta los 25 si no trabaja o gana menos del salario mínimo, y sin límite si está incapacitado.\n\njubilometro.com/orfandad/x",
  "fecha": "2026-11-20",
  "hora": "09:00"
 },
 {
  "id": "sovi-fb",
  "red": "facebook",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/jubilacion/pension-sovi/",
  "texto": "Muchas mujeres que trabajaron de jóvenes en un taller, una fábrica o una casa, y lo dejaron al casarse, creen que no tienen pensión porque no llegan a los 15 años cotizados. Puede que les corresponda la del SOVI, el seguro que existía antes de 1967.\n\nPide cinco años cotizados (1.800 días, no hace falta que sean seguidos) antes del 1 de enero de 1967, tener 65 años y no tener derecho a otra pensión de la Seguridad Social. La viudedad sí es compatible. En 2026 son 599,60 euros al mes en 14 pagas, o 582,10 si se cobra junto a una viudedad.\n\nLo que mucha gente no sabe: el Tribunal Supremo suma 112 días por cada hijo nacido antes de 1967 para llegar a esos 1.800 días. Con tres hijos son 336 días, casi un año.\n\n¿Conoces a alguien a quien le dijeron que no tenía pensión? Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "imagenLista": "publicacion/redes/banco/cifras/sovi-fb.png",
  "fecha": "2026-11-20",
  "hora": "11:00"
 },
 {
  "id": "baja-x",
  "red": "x",
  "pilar": "La cifra que te toca",
  "fuente": "/incapacidad/cuanto-se-cobra-de-baja/",
  "texto": "De baja por enfermedad común: los 3 primeros días no se cobran, del día 4 al 20 cobras el 60 % de tu base reguladora y desde el 21, el 75 %. Por accidente de trabajo, el 75 % desde el día siguiente. Tu convenio puede mejorarlo.\n\njubilometro.com/baja/x",
  "fecha": "2026-11-20",
  "hora": "13:30"
 },
 {
  "id": "grados-dependencia-ig",
  "red": "instagram",
  "tipo": "Carrusel",
  "pilar": "Calcula tu caso",
  "fuente": "/dependencia/grados/",
  "diapositivas": [
   "Grados de dependencia: qué significa cada uno y qué ayudas da.",
   "El baremo puntúa de 0 a 100 cuánta ayuda necesitas para comer, asearte, vestirte o moverte.",
   "Grado I: dependencia moderada, de 25 a 49 puntos. De 20 a 37 horas de ayuda a domicilio al mes.",
   "Grado II: dependencia severa, de 50 a 74 puntos. De 38 a 64 horas al mes.",
   "Grado III: gran dependencia, de 75 a 100 puntos. De 65 a 94 horas al mes.",
   "Cuidados en casa: hasta 455,40 € al mes en el grado III si te cuida un familiar.",
   "Servicio privado: hasta 747,25 € al mes en el grado III si no hay plaza pública.",
   "Guárdalo y compártelo en la familia. Todo sobre la dependencia, en Jubilómetro (enlace en la biografía)."
  ],
  "texto": "Grado I, II o III: los puntos del baremo, las horas de ayuda a domicilio y las ayudas de cada grado. Guía en la biografía.\n\n#dependencia #cuidados #mayores #familia",
  "carrusel": "publicacion/redes/banco/carruseles/grados-dependencia-ig/",
  "fecha": "2026-11-20",
  "hora": "19:00"
 },
 {
  "id": "alquiler-x",
  "red": "x",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/ayudas/complemento-alquiler/",
  "texto": "Si cobras una pensión no contributiva y vives de alquiler, puedes pedir un complemento de 525 € al año (2026). Tienes que ser el titular del contrato, no tener casa en propiedad y que el casero no sea familiar tuyo.\n\njubilometro.com/alquiler/x",
  "fecha": "2026-11-21",
  "hora": "10:00"
 },
 {
  "red": "facebook",
  "pilar": "La cifra que te toca",
  "fuente": "/incapacidad/total-cualificada/",
  "texto": "Si cobras una incapacidad permanente total y tienes 55 años o más, mira si te corresponde la total cualificada.\n\nLa incapacidad total da el 55 % de la base reguladora. Desde los 55 años, si no trabajas, se suma un 20 %, hasta el 75 %. Con una base reguladora de 1.500 euros, pasas de 825 a 1.125 euros al mes.\n\nEl aumento se suspende mientras trabajes y se recupera cuando lo dejas. Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "id": "mes1-63",
  "fecha": "2026-11-21",
  "hora": "11:00"
 },
 {
  "id": "ahorro-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/dinero/ahorro-jubilacion/",
  "texto": "¿Cuánto ahorro necesito para jubilarme? Si tu pensión se queda 250 € al mes por debajo de lo que gastas, en 25 años de jubilación te hacen falta 75.000 €, o unos 59.000 si tus ahorros rinden un 2 % por encima de la inflación.\n\njubilometro.com/calcula-ahorro/x",
  "fecha": "2026-11-22",
  "hora": "10:00"
 },
 {
  "id": "imv-fb",
  "red": "facebook",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/ayudas/ingreso-minimo-vital-mayores/",
  "texto": "Mucha gente cree que el ingreso mínimo vital es solo para jóvenes o para familias con hijos. No tiene edad máxima, y lo cobran también personas mayores de 65 años.\n\nTe corresponde si tus ingresos no llegan a la renta garantizada: en 2026, 733,60 euros al mes si vives solo, en 12 pagas, y más si convives con familia o tienes una discapacidad del 65 %.\n\nEs compatible con una pensión, aunque solo cubre la diferencia hasta esa cifra. Lo cobran sobre todo mayores con una pensión muy baja o del extranjero, mayores que viven en un hogar con pocos ingresos y quienes no llegan a los 10 años de residencia que pide la pensión no contributiva: el ingreso mínimo vital pide solo uno.\n\n¿Conoces a alguien que podría estar en este caso? Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "fecha": "2026-11-22",
  "hora": "11:00"
 },
 {
  "id": "viajes-comunidad-x",
  "red": "x",
  "pilar": "Calendario y avisos",
  "fuente": "/imserso/turismo-autonomico/",
  "hasta": "2026-12-14",
  "texto": "Además del Imserso, algunas comunidades tienen viajes y balnearios para sus mayores. El termalismo de Castilla-La Mancha sigue abierto hasta el 15 de diciembre de 2026 o hasta agotar plazas, por orden de solicitud, desde 208,64 €.\n\njubilometro.com/viajes-comunidad/x",
  "fecha": "2026-11-23",
  "hora": "09:00"
 },
 {
  "id": "plan-pensiones-fb",
  "red": "facebook",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/dinero/rescate-plan-pensiones/",
  "texto": "Un error caro al jubilarse: sacar de golpe todo el plan de pensiones el mismo año.\n\nTodo lo que rescatas tributa en el IRPF como un sueldo, sumado a tu pensión. Si lo sacas entero en un año, puedes saltar a un tramo mucho más alto y pagar miles de euros de más.\n\nNo hay prisa: el plan se puede dejar invertido y cobrar cuando quieras, de una vez, en pagos periódicos, combinando ambos o con pagos sueltos. Repartirlo en varios años suele salir mejor.\n\nSi aportaste antes de 2007, esa parte tiene una reducción del 40 % si la cobras de una vez en el año de tu jubilación o en los dos siguientes. Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "fecha": "2026-11-23",
  "hora": "11:00"
 },
 {
  "id": "teleasistencia-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/dependencia/teleasistencia/",
  "texto": "La teleasistencia es un pulsador en colgante, pulsera o reloj conectado a una central las 24 horas. Se consigue con la dependencia o como servicio social del ayuntamiento, sin grado. En Madrid capital cuesta de 6 a 12 € al mes, o nada con poca renta.\n\njubilometro.com/teleasistencia/x",
  "fecha": "2026-11-23",
  "hora": "13:30"
 },
 {
  "id": "viajes-imserso-ig",
  "red": "instagram",
  "tipo": "Carrusel",
  "pilar": "La cifra que te toca",
  "fuente": "/imserso/viajes-imserso/",
  "hasta": "2027-05-31",
  "diapositivas": [
   "Viajes del Imserso 2026-2027: lo que tienes que saber para reservar.",
   "Plazas: 879.213, para viajar de octubre de 2026 a junio de 2027.",
   "Desde 132,91 €: 4 días en una capital de provincia.",
   "Hasta 564,72 €: 10 días en Canarias en temporada alta.",
   "7.447 plazas a 50 € para quien tiene ingresos bajos.",
   "Tu pareja puede ir contigo aunque no cumpla los requisitos.",
   "Las plazas que otros cancelan vuelven a la venta toda la temporada.",
   "Guárdalo y compártelo con quien viaja contigo. Todo, en Jubilómetro (enlace en la biografía)."
  ],
  "texto": "Precios, plazas y cómo reservar los viajes del Imserso de esta temporada. Guía completa en la biografía.\n\n#imserso #viajes #mayores #jubilados",
  "carrusel": "publicacion/redes/banco/carruseles/viajes-imserso-ig/",
  "fecha": "2026-11-23",
  "hora": "19:00"
 },
 {
  "id": "pension-calc-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/calculadoras/pension-jubilacion/",
  "texto": "¿Cuánto cobraré de pensión? La calculadora aplica los dos métodos de cálculo que conviven desde 2026 y te dice cuál te favorece. Pon el año en que te jubilas, tu base de cotización media y los años que tendrás cotizados.\n\njubilometro.com/pension/x",
  "fecha": "2026-11-24",
  "hora": "09:00"
 },
 {
  "id": "centro-de-dia-fb",
  "red": "facebook",
  "pilar": "Calcula tu caso",
  "fuente": "/dependencia/centro-de-dia/",
  "texto": "Cuando una persona mayor ya no puede quedarse sola en casa, pero la familia puede cuidarla por la noche, el centro de día suele ser la mejor opción, y da un respiro a los cuidadores.\n\nAllí pasa el día con comida, higiene, rehabilitación, actividades y compañía, y por la tarde vuelve a dormir a casa. Muchos tienen transporte adaptado.\n\nCon la dependencia reconocida se puede conseguir plaza pública o concertada, pagando una parte según los ingresos. En el grado I, la plaza es de al menos 15 horas a la semana. Si no hay plaza pública, hay una ayuda de hasta 445,30 euros al mes en los grados I y II, o 747,25 euros en el grado III, para pagar un centro privado acreditado. Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "fecha": "2026-11-24",
  "hora": "11:00"
 },
 {
  "id": "autonomos-x",
  "red": "x",
  "pilar": "La cifra que te toca",
  "fuente": "/jubilacion/autonomos/",
  "texto": "Pensión media de jubilación de un autónomo en octubre de 2026: 1.063,53 € al mes. En el Régimen General: 1.735,91 €. La razón principal es que la mayoría ha cotizado por la base mínima, y lo que más cuenta son los últimos años antes de jubilarse.\n\njubilometro.com/autonomos/x",
  "fecha": "2026-11-24",
  "hora": "13:30"
 },
 {
  "id": "minima-x",
  "red": "x",
  "pilar": "La cifra que te toca",
  "fuente": "/cuanto-cobrare/pension-minima/",
  "texto": "Pensión mínima de jubilación en 2026, desde los 65 años: 1.256,60 € al mes con cónyuge a cargo, 936,20 € si vives solo y 888,70 € con cónyuge no a cargo. Siempre en 14 pagas y con un límite de otros ingresos.\n\njubilometro.com/minima/x",
  "fecha": "2026-11-25",
  "hora": "09:00"
 },
 {
  "id": "reservar-imserso-fb",
  "red": "facebook",
  "pilar": "Trámites sin líos",
  "fuente": "/imserso/solicitar-viajes/",
  "hasta": "2027-05-31",
  "texto": "Cómo reservar un viaje del Imserso y qué pasa si luego no puedes ir.\n\nCon la carta de acreditación en la mano, reservas desde la fecha que indica la carta, con tu DNI y la clave de cuatro dígitos. Los viajes a la costa peninsular y las escapadas, en turismosocial.es o en el 971 22 08 22. Los de Baleares y Canarias, en mundicolor.es o en el 911 590 911. También en una agencia de viajes autorizada, que cobra 15 euros por persona de gestión.\n\nPagas una señal en los días siguientes y el resto 45 días antes de salir.\n\nSi cancelas, pierdes el 6,20 % del precio en gastos de gestión, más un porcentaje si lo haces en los 15 días anteriores a la salida. Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "fecha": "2026-11-25",
  "hora": "11:00"
 },
 {
  "id": "favor-familiares-x",
  "red": "x",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/viudedad/favor-de-familiares/",
  "texto": "Poca gente conoce la pensión en favor de familiares. La cobran, por ejemplo, los hijos solteros, divorciados o viudos de más de 45 años que cuidaban de su padre o su madre pensionista, vivían a su cargo y no tienen otros medios. Desde 286,50 € al mes.\n\njubilometro.com/favor-familiares/x",
  "fecha": "2026-11-25",
  "hora": "13:30"
 },
 {
  "id": "provincia-ig",
  "red": "instagram",
  "tipo": "Carrusel",
  "pilar": "La cifra que te toca",
  "fuente": "/datos/pension-media-provincia/",
  "diapositivas": [
   "Pensión media de jubilación por provincia: dónde se cobra más y dónde menos.",
   "España: 1.577,61 € al mes de media en octubre de 2026.",
   "Bizkaia: 1.943,10 € al mes, la más alta.",
   "Le siguen Álava, 1.927 €; Gipuzkoa, 1.860 €; Asturias, 1.840 €, y Madrid, 1.800 €.",
   "Ourense: 1.144,37 € al mes, la más baja.",
   "Por la cola, Lugo, 1.244 €; Almería, 1.300 €; Jaén, 1.320 €, y Cáceres, 1.322 €.",
   "Solo 17 de las 52 provincias superan la media de España.",
   "Busca la tuya en la tabla de Jubilómetro (enlace en la biografía)."
  ],
  "texto": "De 1.943 € en Bizkaia a 1.144 € en Ourense: la pensión media de jubilación en las 52 provincias. Tabla completa en la biografía.\n\n#pensiones #jubilacion #espana #datos",
  "carrusel": "publicacion/redes/banco/carruseles/provincia-ig/",
  "fecha": "2026-11-25",
  "hora": "19:00"
 },
 {
  "id": "baja-menopausia-x",
  "red": "x",
  "pilar": "Calendario y avisos",
  "fuente": "/incapacidad/baja-menopausia/",
  "desde": "2026-10-22",
  "texto": "Desde el 1 de diciembre hay una baja especial por menopausia: para una patología que te impida trabajar, codificada por el médico de la sanidad pública. Sin cotización previa y cobrando desde el día siguiente a la baja.\n\njubilometro.com/baja-menopausia/x",
  "fecha": "2026-11-26",
  "hora": "09:00"
 },
 {
  "id": "simulador-fb",
  "red": "facebook",
  "pilar": "Calcula tu caso",
  "fuente": "/calculadoras/simulador-jubilacion/",
  "texto": "Si solo vas a usar una calculadora de Jubilómetro, que sea el simulador de jubilación. Responde en una página a las preguntas que más nos hacéis.\n\nPones tu mes y año de nacimiento, los años y meses que llevas cotizados, tu base de cotización y tu comunidad autónoma. El simulador te dice en qué fecha exacta te puedes jubilar, cuánto cobrarías, cuánto ganas o pierdes si adelantas o retrasas la jubilación mes a mes y lo que te llegaría neto después del IRPF.\n\nNo pide datos personales ni se guarda nada. Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "fecha": "2026-11-26",
  "hora": "11:00"
 },
 {
  "id": "transporte-x",
  "red": "x",
  "pilar": "Calendario y avisos",
  "fuente": "/ayudas/descuentos-transporte/",
  "hasta": "2026-12-20",
  "texto": "Hasta el 31 de diciembre de 2026, Renfe tiene un abono mensual de Cercanías de 20 € para todas las zonas de tu núcleo. Si vas a menudo en tren, puede salirte mejor que la Tarjeta Dorada, que rebaja un 40 % cada billete.\n\njubilometro.com/transporte/x",
  "fecha": "2026-11-26",
  "hora": "13:30"
 },
 {
  "id": "seguro-salud-x",
  "red": "x",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/dinero/seguro-salud-mayores/",
  "texto": "Desde mayo de 2026 no pagas nada en la farmacia por los medicamentos con receta si cobras el complemento a mínimos, una pensión no contributiva o el ingreso mínimo vital. El resto de pensionistas paga el 10 %, con un tope al mes.\n\njubilometro.com/seguro-salud/x",
  "fecha": "2026-11-27",
  "hora": "09:00"
 },
 {
  "id": "volver-a-casarse-fb",
  "red": "facebook",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/viudedad/nuevo-matrimonio/",
  "texto": "Una pregunta que nos llega mucho: si cobro la viudedad y me vuelvo a casar, ¿la pierdo?\n\nComo regla general, sí: la pensión de viudedad se extingue con un nuevo matrimonio o al formalizar una pareja de hecho. Pero la conservas si cumples a la vez tres requisitos.\n\nPrimero, tener más de 61 años, o menos si tienes una incapacidad permanente absoluta, una gran incapacidad o una discapacidad del 65 %. Segundo, que la viudedad sea tu principal ingreso: al menos el 75 % de lo que ingresas al año. Tercero, que los ingresos del nuevo matrimonio no pasen de dos veces el salario mínimo, 34.188 euros al año en 2026.\n\nLa ley no prevé que se pierda por convivir con alguien sin casarte ni formalizar la pareja de hecho. Y si te casas, hay que comunicarlo al INSS. Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "fecha": "2026-11-27",
  "hora": "11:00"
 },
 {
  "id": "termalismo-x",
  "red": "x",
  "pilar": "La cifra que te toca",
  "fuente": "/imserso/termalismo/",
  "texto": "Los balnearios del Imserso: 10 días con pensión completa, reconocimiento médico y tratamiento termal, de 302,14 a 452,90 € por persona en 2026 según el balneario y el mes. Las plazas se reparten por puntos, y la convocatoria sale en el BOE cada año.\n\njubilometro.com/balnearios/x",
  "fecha": "2026-11-27",
  "hora": "13:30"
 },
 {
  "id": "como-se-calcula-ig",
  "red": "instagram",
  "tipo": "Carrusel",
  "pilar": "Calcula tu caso",
  "fuente": "/cuanto-cobrare/como-se-calcula-la-pension/",
  "diapositivas": [
   "Cómo se calcula tu pensión: tres pasos, sin fórmulas raras.",
   "Primer paso: la base reguladora, que es la media de lo que has cotizado en los últimos 25 años.",
   "Las bases antiguas se actualizan con el IPC, y los meses sin cotizar se rellenan con la base mínima.",
   "Segundo paso: el porcentaje por años cotizados. Con 15 años te corresponde el 50 % de la base.",
   "100 %: con 37 años cotizados si te jubilas desde 2027 (36 años y 6 meses en 2026).",
   "Tercer paso: los ajustes. Un recorte si te adelantas y un 4 % más por cada año que te retrasas.",
   "Pensión máxima: 3.359,60 € al mes en 2026, aunque hayas cotizado más.",
   "Guárdalo para cuando hagas tus cuentas. Calcula tu pensión en Jubilómetro (enlace en la biografía)."
  ],
  "texto": "Base reguladora, porcentaje por años cotizados y ajustes: así sale tu pensión de jubilación. La calculadora, con el enlace de la biografía.\n\n#pensiones #jubilacion #seguridadsocial #calculadora",
  "carrusel": "publicacion/redes/banco/carruseles/como-se-calcula-ig/",
  "fecha": "2026-11-27",
  "hora": "19:00"
 },
 {
  "id": "centro-de-dia-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/dependencia/centro-de-dia/",
  "texto": "El centro de día atiende de día a la persona mayor y por la noche vuelve a dormir a casa. Con la dependencia, plaza pública pagando según ingresos o, si no hay, una ayuda de hasta 445,30 € al mes (grados I y II) o 747,25 € (grado III).\n\njubilometro.com/centro-de-dia/x",
  "fecha": "2026-11-28",
  "hora": "10:00"
 },
 {
  "id": "base-reguladora-fb",
  "red": "facebook",
  "pilar": "Calcula tu caso",
  "fuente": "/cuanto-cobrare/base-reguladora/",
  "texto": "La base reguladora es la cifra de la que sale tu pensión. Es la media de lo que has cotizado en los últimos años, y conviene entender tres detalles.\n\nSe divide entre 350 y no entre 300, aunque se miren 300 meses, porque la pensión se cobra en 14 pagas.\n\nLas bases de los dos últimos años cuentan tal cual. Las anteriores se actualizan con el IPC, así que lo que cotizaste hace 20 años no pierde valor.\n\nSi te pagaban más de la base máxima (5.101,20 euros al mes en 2026), lo que pasa de ahí no cuenta. Y si tu sueldo sube mucho en los dos últimos años, por encima de lo que marca tu convenio, ese exceso tampoco se computa.\n\nEjemplo: Rosa suma 630.000 euros en sus últimos 300 meses. Entre 350, su base reguladora es de 1.800 euros, y con 38 años cotizados esa es su pensión. Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "imagenLista": "publicacion/redes/banco/cifras/base-reguladora-fb.png",
  "fecha": "2026-11-28",
  "hora": "11:00"
 },
 {
  "id": "anticipada-calc-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/calculadoras/jubilacion-anticipada/",
  "texto": "¿Cuánto pierdes si te jubilas antes? Elige si es voluntaria o involuntaria, los meses de adelanto y tus años cotizados. La calculadora aplica los coeficientes reductores mes a mes de la ley y te da la pensión que te quedaría.\n\njubilometro.com/anticipada/x",
  "fecha": "2026-11-29",
  "hora": "10:00"
 },
 {
  "id": "convenio-especial-fb",
  "red": "facebook",
  "pilar": "Calcula tu caso",
  "fuente": "/jubilacion/convenio-especial/",
  "texto": "Si dejas de trabajar sin paro ni subsidio, puedes seguir cotizando por tu cuenta para la jubilación. Se llama convenio especial con la Seguridad Social, y esos meses cuentan como cotizados.\n\nEn 2026 cuesta unos 392 euros al mes si cotizas por la base mínima (1.424,40 euros). Compensa sobre todo si te faltan pocos años para llegar a uno de estos tres umbrales: los 15 años que dan derecho a pensión, los 37 años que dan el 100 % o los 38 años y 6 meses que permiten jubilarte a los 65 en vez de a los 67.\n\nTienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "fecha": "2026-11-29",
  "hora": "11:00"
 },
 {
  "id": "despido-60-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/jubilacion/despido-a-los-60/",
  "texto": "Despedido a los 60: lo habitual es encadenar el paro (hasta 2 años), el subsidio para mayores de 52 (480 € al mes en 2026, que además cotiza para tu jubilación) y la jubilación, ordinaria o anticipada.\n\njubilometro.com/despido-60/x",
  "fecha": "2026-11-30",
  "hora": "09:00"
 },
 {
  "id": "baja-menopausia-fb",
  "red": "facebook",
  "pilar": "Calendario y avisos",
  "fuente": "/incapacidad/baja-menopausia/",
  "desde": "2026-10-22",
  "texto": "Una novedad del decreto-ley del 21 de octubre: desde el 1 de diciembre de 2026 existe una baja especial por menopausia.\n\nNo basta con tener síntomas. Es para una patología de la menopausia que te impida trabajar, diagnosticada y codificada por el médico de la sanidad pública. Tiene tres diferencias con una baja normal por enfermedad: no hace falta haber cotizado un mínimo, se cobra desde el día siguiente a la baja (no desde el cuarto) y lo paga directamente el INSS o la mutua. El día de la baja, la empresa paga el sueldo entero.\n\nSe cobra lo mismo que en una baja por enfermedad: el 60 % de la base reguladora hasta el día 20 y el 75 % desde el 21. Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "fecha": "2026-11-30",
  "hora": "11:00"
 },
 {
  "id": "mei-x",
  "red": "x",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/cuanto-cobrare/mei-cuota-solidaridad/",
  "texto": "En tu nómina hay una línea que pone MEI. Es una cotización extra para la hucha de las pensiones: en 2026 pagas el 0,15 % de tu base (3 € al mes con una base de 2.000 €) y la empresa, el 0,75 %. No suma nada a tu pensión.\n\njubilometro.com/mei/x",
  "fecha": "2026-11-30",
  "hora": "13:30"
 },
 {
  "id": "demorada-ig",
  "red": "instagram",
  "tipo": "Carrusel",
  "pilar": "Calcula tu caso",
  "fuente": "/jubilacion/demorada/",
  "diapositivas": [
   "Jubilarte más tarde: lo que ganas por cada año que esperas.",
   "4 %: más de pensión por cada año completo de retraso, para toda la vida.",
   "Desde el segundo año: también cuentan los semestres, un 2 % por cada 6 meses.",
   "Pago único: entre unos 4.800 y 13.500 € por año de retraso, según tu pensión.",
   "Mixta: una parte en porcentaje y otra en pago único, desde 2 años de retraso.",
   "Mientras esperas, puedes trabajar y cobrar parte de la pensión con la jubilación activa.",
   "Si eliges el pago único o la mixta, después no podrás acogerte a la jubilación flexible.",
   "Guárdalo y calcula tu caso en Jubilómetro (enlace en la biografía)."
  ],
  "texto": "Un 4 % más de pensión por año, un pago único o una mezcla: qué ganas si te jubilas más tarde. Calculadora en la biografía.\n\n#jubilacion #jubilaciondemorada #pensiones #seguridadsocial",
  "carrusel": "publicacion/redes/banco/carruseles/demorada-ig/",
  "fecha": "2026-11-30",
  "hora": "19:00"
 },
 {
  "hasta": "2026-12-22",
  "red": "x",
  "pilar": "Calendario y avisos",
  "fuente": "/jubilacion/anticipada-40-anos-cotizados/",
  "texto": "La proposición de ley para jubilarse antes sin recorte con 40 años cotizados decae: con la disolución de las Cortes caducan las leyes a medio tramitar.\n\nTendría que volver a presentarse desde cero. Hoy sigue el recorte. jubilometro.com/40-anos-cotizados/x",
  "id": "mes1-07",
  "fecha": "2026-12-01",
  "hora": "09:00"
 },
 {
  "id": "alquiler-fb",
  "red": "facebook",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/ayudas/complemento-alquiler/",
  "texto": "Una ayuda que se queda sin pedir muchos años: el complemento de alquiler de la pensión no contributiva. Son 525 euros al año en 2026, en un solo pago.\n\nLo puedes cobrar si tienes una pensión no contributiva de jubilación o de invalidez, no tienes vivienda en propiedad y vives de alquiler como titular del contrato. El casero no puede ser tu cónyuge, tu pareja ni un familiar hasta el tercer grado.\n\nSe pide en los servicios sociales de tu comunidad autónoma, los mismos que gestionan tu pensión, y no cuenta como ingreso para seguir cobrando la no contributiva.\n\nSi tienes una vecina o un familiar en esta situación, cuéntaselo. Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "fecha": "2026-12-01",
  "hora": "11:00"
 },
 {
  "id": "viudedad-jubilacion-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/viudedad/viudedad-y-jubilacion/",
  "texto": "Sí, puedes cobrar la viudedad y tu jubilación a la vez, cada una con su cálculo. El único tope es que la suma no pase de la pensión máxima: 3.359,60 € al mes en 2026. Si cobrabas el 60 % de viudedad, al jubilarte vuelves al 52 %.\n\njubilometro.com/viudedad-jubilacion/x",
  "fecha": "2026-12-01",
  "hora": "13:30"
 },
 {
  "id": "baja-larga-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/incapacidad/incapacidad-temporal/",
  "texto": "La baja dura como máximo 365 días, que se pueden alargar 180 más. A los 545 días se acaba, pero sigues cobrando lo mismo hasta que el INSS decide si tienes una incapacidad permanente, con un límite de 730 días en total.\n\njubilometro.com/baja-larga/x",
  "fecha": "2026-12-02",
  "hora": "09:00"
 },
 {
  "id": "ahorro-fb",
  "red": "facebook",
  "pilar": "Calcula tu caso",
  "fuente": "/dinero/ahorro-jubilacion/",
  "texto": "¿Cuánto dinero hace falta tener ahorrado para jubilarse tranquilo? La cuenta es más sencilla de lo que parece.\n\nNecesitas lo que tu pensión no cubre de tus gastos, multiplicado por los años que vas a estar jubilado. Si tu pensión se queda 250 euros al mes por debajo de lo que gastas, en 25 años te hacen falta 75.000 euros. Si consigues que tus ahorros rindan un 2 % por encima de la inflación, unos 59.000.\n\nComo referencia, según el INE, una persona de 65 años o más que vive sola gastó de media unos 1.919 euros al mes en 2025. Y a los 65 años quedan de media casi 22 años de vida: 19,87 los hombres y 23,64 las mujeres.\n\nEn la calculadora de ahorro pones tu edad, tu pensión y lo que quieres tener al mes, y te dice cuánto apartar. Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "fecha": "2026-12-02",
  "hora": "11:00"
 },
 {
  "id": "retornados-x",
  "red": "x",
  "pilar": "La cifra que te toca",
  "fuente": "/ayudas/emigrantes-retornados/",
  "texto": "Si vuelves a España tras trabajar 12 meses en los últimos 6 años fuera del Espacio Económico Europeo, tienes el subsidio para emigrantes retornados: hasta 18 meses, 570 € al mes los seis primeros. Pídelo en los 15 días hábiles siguientes a tu vuelta.\n\njubilometro.com/retornados/x",
  "fecha": "2026-12-02",
  "hora": "13:30"
 },
 {
  "id": "tramites-fallecimiento-ig",
  "red": "instagram",
  "tipo": "Carrusel",
  "pilar": "Trámites sin líos",
  "fuente": "/viudedad/fallecimiento-pensionista/",
  "diapositivas": [
   "Fallece un familiar pensionista: qué hacer y en qué plazos.",
   "La pensión de ese mes se cobra entera, con la parte de la paga extra. Lo de los meses siguientes se devuelve.",
   "En los 3 primeros meses: pide al INSS la viudedad, la orfandad y el auxilio por defunción, todo junto.",
   "Auxilio por defunción: 46,50 € para quien pagó el entierro. Hay 5 años para pedirlo.",
   "Desde 15 días hábiles: el certificado de últimas voluntades, para saber si había testamento.",
   "En 6 meses: el Impuesto sobre Sucesiones, en tu comunidad autónoma.",
   "Al año siguiente: la declaración de la renta del fallecido, en la campaña de primavera.",
   "Guárdalo para cuando haga falta. La guía completa, en Jubilómetro (enlace en la biografía)."
  ],
  "texto": "Lista de trámites cuando fallece un familiar pensionista, con los plazos de cada uno. Guía completa en la biografía.\n\n#pensiones #viudedad #herencia #tramites",
  "carrusel": "publicacion/redes/banco/carruseles/tramites-fallecimiento-ig/",
  "fecha": "2026-12-02",
  "hora": "19:00"
 },
 {
  "id": "decesos-x",
  "red": "x",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/dinero/seguro-decesos/",
  "texto": "A partir de los 60 te interesa saberlo: la aseguradora no puede negarse a renovar tu seguro de decesos, ni por la edad ni por ningún otro motivo. Lo que sí puede es subir la prima, avisándote con dos meses de antelación.\n\njubilometro.com/decesos/x",
  "fecha": "2026-12-03",
  "hora": "09:00"
 },
 {
  "id": "teleasistencia-fb",
  "red": "facebook",
  "pilar": "Calcula tu caso",
  "fuente": "/dependencia/teleasistencia/",
  "texto": "Para las personas mayores que viven solas, y para sus hijos, pocas cosas dan tanta tranquilidad como la teleasistencia.\n\nEs un pulsador que se lleva en un colgante, una pulsera o un reloj, conectado con una central que atiende las 24 horas, todos los días. Si te caes o te encuentras mal, lo pulsas, te hablan por un altavoz y, si hace falta, avisan a tu familia, a una ambulancia o a quien tenga una llave de tu casa.\n\nHay dos formas de conseguirla: como servicio de la dependencia, si tienes grado reconocido, o como servicio social de tu ayuntamiento o tu comunidad, sin necesidad de grado. Suele ser gratis o costar pocos euros al mes según los ingresos.\n\nPregunta en los servicios sociales de tu ayuntamiento. Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "fecha": "2026-12-03",
  "hora": "11:00"
 },
 {
  "red": "x",
  "pilar": "Calendario y avisos",
  "fuente": "/imserso/tarjeta-mayores/",
  "texto": "Tarjeta Dorada de Renfe: 6 € al año desde los 60 años.\n\n40 % de descuento en Cercanías y Media Distancia y 25 % en AVE y Larga Distancia. Se saca en la taquilla o en una agencia y se renueva por internet.\n\njubilometro.com/tarjeta-dorada/x",
  "id": "mes1-47",
  "fecha": "2026-12-03",
  "hora": "13:30"
 },
 {
  "id": "precio-residencia-x",
  "red": "x",
  "pilar": "La cifra que te toca",
  "fuente": "/dependencia/precio-residencias/",
  "texto": "Una plaza pública en una residencia cuesta de media 1.958,95 € al mes en España, y el residente paga de media 692,40 €: el 35 %. El resto lo pone la Administración. Nunca pagas más del 90 % del coste y te quedan al menos 114 € al mes.\n\njubilometro.com/precio-residencia/x",
  "fecha": "2026-12-04",
  "hora": "09:00"
 },
 {
  "id": "requisitos-imserso-fb",
  "red": "facebook",
  "pilar": "Calcula tu caso",
  "fuente": "/imserso/requisitos-viajes/",
  "texto": "¿Quién puede ir de viaje con el Imserso? Más gente de la que se cree.\n\nLos pensionistas de jubilación, a cualquier edad. Los de viudedad, desde los 55 años. Otros pensionistas y quienes cobran el paro, desde los 60. Y cualquier asegurado o beneficiario de la Seguridad Social, desde los 65. Además, hay que vivir en España y valerse por uno mismo.\n\nLa pareja puede ir contigo aunque no cumpla ninguno de esos requisitos, y también los hijos con una discapacidad del 45 % o más.\n\nLo que más se olvida: no basta con cumplirlos. Hay que acreditarse en el plazo que abre el Imserso cada verano. Para la temporada 2026-2027 fue del 22 de junio al 10 de julio de 2026. Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "fecha": "2026-12-04",
  "hora": "11:00"
 },
 {
  "id": "neta-calc-x",
  "red": "x",
  "pilar": "La cifra que te toca",
  "fuente": "/calculadoras/pension-neta-irpf/",
  "texto": "Lo que te llega al banco es la pensión neta. Pon tu pensión bruta, tu comunidad, tu edad y tu grado de discapacidad, si lo tienes, y la calculadora te da la retención del IRPF y lo que cobras de verdad cada mes.\n\njubilometro.com/neta/x",
  "fecha": "2026-12-04",
  "hora": "13:30"
 },
 {
  "id": "transporte-ig",
  "red": "instagram",
  "tipo": "Carrusel",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/ayudas/descuentos-transporte/",
  "diapositivas": [
   "Viajar más barato después de los 60: descuentos que conviene conocer.",
   "Tarjeta Dorada de Renfe: 6 € al año desde los 60.",
   "40 %: en Cercanías y Media Distancia con la Tarjeta Dorada. En el AVE, un 25 %.",
   "Comunidad de Madrid: el Abono +65 es gratis en todo el transporte público.",
   "Área de Barcelona: la Targeta Rosa, gratis o reducida desde los 60 con ingresos bajos.",
   "Galicia: autobús interurbano gratis desde los 65 con la Tarjeta de Movilidad.",
   "Andalucía: 50 % en el autobús interurbano con la Tarjeta Andalucía Junta 65.",
   "Compártelo con quien viaje contigo. Todos los descuentos, en Jubilómetro (enlace en la biografía)."
  ],
  "texto": "Tarjeta Dorada, abonos gratis y descuentos de autobús para mayores, comunidad a comunidad. Guía en la biografía.\n\n#mayores #transporte #descuentos #jubilados",
  "carrusel": "publicacion/redes/banco/carruseles/transporte-ig/",
  "fecha": "2026-12-04",
  "hora": "19:00"
 },
 {
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/cuanto-cobrare/pension-segun-sueldo/",
  "texto": "Una regla sencilla: con 37 años cotizados, siempre por la misma base, la pensión al mes es 6/7 de esa base.\n\nBase de 1.500 €: unos 1.286 € de pensión.\nBase de 2.000 €: unos 1.714 €.\nBase de 3.000 €: unos 2.571 €.\n\nCon tu sueldo: jubilometro.com/sueldo/x",
  "id": "mes1-25",
  "fecha": "2026-12-05",
  "hora": "10:00"
 },
 {
  "id": "comparador-fb",
  "red": "facebook",
  "pilar": "Calcula tu caso",
  "fuente": "/calculadoras/comparador-ingresos-jubilacion/",
  "texto": "Jubilarse antes significa cobrar menos cada mes, pero durante más años. Jubilarse más tarde, cobrar más, pero empezar después. ¿Qué sale mejor en total? Depende de tus números, y hay una forma de verlo.\n\nEl comparador de Jubilómetro suma lo que cobrarías en total si te jubilas antes, a tu edad ordinaria o más tarde, hasta la edad que tú elijas y con la subida anual de las pensiones. Y te dice a partir de qué edad compensa esperar.\n\nSolo necesitas la pensión que tendrías a tu edad ordinaria y tus años cotizados. Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "fecha": "2026-12-05",
  "hora": "11:00"
 },
 {
  "id": "convenio-especial-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/jubilacion/convenio-especial/",
  "texto": "¿Te faltan pocos años para los 15 mínimos o para jubilarte a los 65? El convenio especial te deja seguir cotizando por tu cuenta cuando dejas de trabajar: en 2026, unos 392 € al mes por la base mínima.\n\njubilometro.com/convenio-especial/x",
  "fecha": "2026-12-06",
  "hora": "10:00"
 },
 {
  "id": "orfandad-fb",
  "red": "facebook",
  "pilar": "La cifra que te toca",
  "fuente": "/viudedad/pension-orfandad/",
  "texto": "Cuando fallece un padre o una madre, cada hijo puede tener su propia pensión de orfandad. Es el 20 % de la base reguladora de quien fallece, con un mínimo de 286,50 euros al mes en 2026, en 14 pagas.\n\nLa cobran los hijos menores de 21 años, los de hasta 25 que no trabajen o ganen menos del salario mínimo, y los incapacitados para trabajar a cualquier edad.\n\nSi fallecen los dos progenitores, la pensión sube: se le suma el porcentaje de la viudedad, el 52 %, repartido entre los hermanos.\n\nEs compatible con trabajar y no paga IRPF hasta los 22 años. Se pide en la misma solicitud que la viudedad. Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "fecha": "2026-12-06",
  "hora": "11:00"
 },
 {
  "id": "requisitos-viudedad-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/viudedad/requisitos/",
  "texto": "Para cobrar la viudedad, la persona fallecida tenía que trabajar y tener 500 días cotizados en los últimos 5 años, o 15 años cotizados en total, o ser pensionista de jubilación o incapacidad. Si murió por un accidente, no se pide cotización.\n\njubilometro.com/requisitos-viudedad/x",
  "fecha": "2026-12-07",
  "hora": "09:00"
 },
 {
  "id": "complemento-minimos-fb",
  "red": "facebook",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/cuanto-cobrare/complemento-a-minimos/",
  "texto": "Julián tiene 70 años, es viudo y cobra una pensión de jubilación de 750 euros al mes. No tiene otros ingresos. La pensión mínima para su caso es de 936,20 euros, así que la Seguridad Social le paga 186,20 euros más cada mes: es el complemento a mínimos.\n\nLo cobras si tu pensión no llega a la mínima, vives en España y tus otros ingresos no pasan de 9.442 euros al año (11.013 entre los dos si tienes cónyuge a cargo).\n\nDos cosas que conviene saber. Si tus ingresos pasan un poco del límite, no lo pierdes todo: cobras una parte. Y desde mayo de 2026, quien cobra el complemento a mínimos no paga nada por los medicamentos con receta.\n\nY si un año tus ingresos superan el límite, hay que avisar en un mes y devolver el complemento cobrado ese año. Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "imagenLista": "publicacion/redes/banco/cifras/complemento-minimos-fb.png",
  "fecha": "2026-12-07",
  "hora": "11:00"
 },
 {
  "id": "grados-incapacidad-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/incapacidad/grados-incapacidad/",
  "texto": "Los cuatro grados de incapacidad permanente: parcial (24 mensualidades de una vez), total (el 55 % de tu base, o el 75 % desde los 55 si no trabajas), absoluta (el 100 %, sin IRPF) y gran incapacidad (el 100 % más un complemento).\n\njubilometro.com/grados-incapacidad/x",
  "fecha": "2026-12-07",
  "hora": "13:30"
 },
 {
  "id": "incapacidad-trabajo-ig",
  "red": "instagram",
  "tipo": "Carrusel",
  "pilar": "Calcula tu caso",
  "fuente": "/incapacidad/incapacidad-y-trabajo/",
  "diapositivas": [
   "¿Se puede trabajar con una incapacidad permanente? Grado a grado.",
   "Parcial: sigues en tu trabajo, y la indemnización es compatible con todo.",
   "Total: puedes trabajar en otras funciones y cobrar la pensión a la vez.",
   "Total cualificada: el 20 % extra se deja de cobrar mientras trabajas.",
   "Absoluta y gran incapacidad: si el trabajo exige alta, se suspende la pensión mientras dure.",
   "Solo son compatibles las actividades esporádicas que no exigen darse de alta.",
   "En todos los grados, avisa al INSS antes de empezar a trabajar.",
   "Guárdalo por si lo necesitas. La guía completa, en Jubilómetro (enlace en la biografía)."
  ],
  "texto": "Trabajar cobrando una incapacidad permanente: qué se puede en cada grado desde los cambios de 2024 y 2025. Guía en la biografía.\n\n#incapacidadpermanente #trabajo #pensiones #inss",
  "carrusel": "publicacion/redes/banco/carruseles/incapacidad-trabajo-ig/",
  "fecha": "2026-12-07",
  "hora": "19:00"
 },
 {
  "red": "x",
  "pilar": "La cifra que te toca",
  "fuente": "/ayudas/pension-no-contributiva/",
  "texto": "Pensión no contributiva de jubilación en 2026: 628,80 € al mes en 14 pagas.\n\nEs para quien tiene 65 años o más, no ha cotizado lo suficiente y tiene ingresos propios por debajo de 8.803,20 € al año. Se pide en los servicios sociales de tu comunidad.\n\njubilometro.com/no-contributiva/x",
  "id": "mes1-58",
  "fecha": "2026-12-08",
  "hora": "09:00"
 },
 {
  "id": "despido-60-fb",
  "red": "facebook",
  "pilar": "Calcula tu caso",
  "fuente": "/jubilacion/despido-a-los-60/",
  "texto": "Qué hacer si te despiden a los 60 años. Lo habitual es encadenar tres etapas.\n\nPrimero, el paro: hasta 2 años, según lo que hayas cotizado en los últimos 6.\n\nDespués, el subsidio para mayores de 52 años: 480 euros al mes en 2026, hasta tu edad de jubilación. Mientras lo cobras, el SEPE cotiza por ti para la jubilación.\n\nPor último, la jubilación: la ordinaria o, si te interesa, la anticipada involuntaria, que en 2027 se puede pedir desde los 61 o los 63 años, con recorte.\n\nLo que más conviene depende de tus años cotizados, de tu base de cotización y de si puedes volver a trabajar. Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "fecha": "2026-12-08",
  "hora": "11:00"
 },
 {
  "id": "retencion-x",
  "red": "x",
  "pilar": "Trámites sin líos",
  "fuente": "/dinero/irpf-pensiones/",
  "texto": "¿Te sale a pagar la renta cada año? Puedes pedir a la Seguridad Social una retención de IRPF más alta en tu pensión, desde la sede o en una oficina. Y si te casas, enviudas o te reconocen una discapacidad, comunícalo para que la ajusten.\n\njubilometro.com/retencion/x",
  "fecha": "2026-12-08",
  "hora": "13:30"
 },
 {
  "id": "plazas-libres-x",
  "red": "x",
  "pilar": "Calendario y avisos",
  "fuente": "/imserso/plazas-libres/",
  "hasta": "2027-05-31",
  "texto": "¿Sin viaje del Imserso? Las plazas que otros cancelan o no pagan vuelven a la venta toda la temporada, sobre todo unos 45 días antes de cada salida. Busca en turismosocial.es y en mundicolor.es, también desde otras provincias.\n\njubilometro.com/plazas-imserso/x",
  "fecha": "2026-12-09",
  "hora": "09:00"
 },
 {
  "id": "baja-larga-fb",
  "red": "facebook",
  "pilar": "Calcula tu caso",
  "fuente": "/incapacidad/incapacidad-temporal/",
  "texto": "Qué pasa cuando una baja se alarga, mes a mes.\n\nLa baja (la incapacidad temporal) dura como máximo 365 días. Al llegar ahí, solo el INSS decide: te puede dar el alta, prorrogar la baja otros 180 días si espera que te recuperes o empezar el expediente de incapacidad permanente.\n\nA los 545 días la baja termina, pero sigues cobrando lo mismo mientras el INSS resuelve si tienes una incapacidad permanente. Tiene 90 días para hacerlo, y entre baja y espera nunca se pueden pasar los 730 días.\n\nHasta el día 545 sigues de alta y se cotiza por ti, así que esos meses cuentan para tu jubilación. Desde ahí, mientras esperas la decisión, ya no se cotiza. Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "fecha": "2026-12-09",
  "hora": "11:00"
 },
 {
  "id": "cuidadora-x",
  "red": "x",
  "pilar": "La cifra que te toca",
  "fuente": "/dependencia/cuidadora-interna-externa/",
  "texto": "Una cuidadora interna a jornada completa con el salario mínimo cuesta a la familia unos 20.900 € al año en 2026, con la Seguridad Social incluida. Y no cubre las 24 horas: tiene límites de jornada y 36 horas libres a la semana.\n\njubilometro.com/cuidadora/x",
  "fecha": "2026-12-09",
  "hora": "13:30"
 },
 {
  "id": "casa-ig",
  "red": "instagram",
  "tipo": "Carrusel",
  "pilar": "Calcula tu caso",
  "fuente": "/dinero/hipoteca-inversa/",
  "diapositivas": [
   "Tu casa, convertida en dinero sin dejar de vivir en ella: tres formas.",
   "Hipoteca inversa: un préstamo con tu casa como garantía, que cobras de una vez o cada mes.",
   "Sigues siendo el dueño. La deuda la pagan tus herederos, o venden la casa, cuando faltas.",
   "Nuda propiedad: vendes la casa, pero te quedas el derecho a vivir en ella toda tu vida.",
   "Renta vitalicia: vendes y, con el dinero, contratas una renta de por vida con una aseguradora.",
   "Desde los 65, vender tu vivienda habitual no paga IRPF por la ganancia.",
   "Con 70 años o más, solo tributa el 8 % de cada pago de una renta vitalicia.",
   "Guárdalo y háblalo en casa antes de decidir. Las tres opciones, en Jubilómetro (enlace en la biografía)."
  ],
  "texto": "Hipoteca inversa, nuda propiedad o renta vitalicia: tres formas de convertir tu casa en ingresos sin mudarte. Guía en la biografía.\n\n#jubilacion #vivienda #hipotecainversa #ahorro",
  "carrusel": "publicacion/redes/banco/carruseles/casa-ig/",
  "fecha": "2026-12-09",
  "hora": "19:00"
 },
 {
  "id": "demorada-calc-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/calculadoras/jubilacion-demorada-flexible/",
  "texto": "Si retrasas tu jubilación, ganas un 4 % de pensión por cada año completo. La calculadora te dice cuánto sube la tuya con el retraso y cuánto cobrarías si sigues trabajando con la jubilación activa o la flexible.\n\njubilometro.com/calcula-demorada/x",
  "fecha": "2026-12-10",
  "hora": "09:00"
 },
 {
  "id": "ayudas-comunidad-fb",
  "red": "facebook",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/ayudas/ayudas-autonomicas/",
  "texto": "Las comunidades autónomas no pagan las pensiones, pero algunas las completan. Estos son los complementos de la pensión no contributiva en 2026.\n\nBaleares, 168,77 euros al mes. Cataluña, hasta 119,67 euros al mes. Aragón, 820,80 euros en un pago. Canarias, 400 euros en dos pagos. Galicia, 218 euros. Andalucía, 192,04 euros. La Comunitat Valenciana, según tus ingresos.\n\nEn Andalucía, Aragón, Canarias y Galicia se cobra sin pedirlo. En el resto, hay que solicitarlo.\n\nY para pensiones contributivas bajas: en Navarra, la jubilación y la viudedad se completan hasta 15.400 euros al año con una deducción del IRPF, y en el País Vasco la renta de garantía de ingresos asegura 1.107,84 euros al mes a un pensionista que vive solo. Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "fecha": "2026-12-10",
  "hora": "11:00"
 },
 {
  "red": "x",
  "pilar": "La cifra que te toca",
  "fuente": "/cuanto-cobrare/pension-bruta-y-neta/",
  "texto": "Si eres pensionista sin hijos a cargo y tu pensión no pasa de 16.476 € brutos al año (unos 1.176 € en 14 pagas), no te retienen IRPF.\n\nPor encima sube poco a poco: con 1.500 € al mes, en torno al 9 %; con 2.000 €, cerca del 17 %.\n\nTu neto: jubilometro.com/neta/x",
  "id": "mes1-28",
  "fecha": "2026-12-10",
  "hora": "13:30"
 },
 {
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/jubilacion/demorada/",
  "texto": "Si sigues trabajando después de tu edad de jubilación, cada año completo de retraso te da a elegir: un 4 % más de pensión para siempre, un pago único (entre unos 4.800 y 13.500 € por año, según la Seguridad Social) o una mezcla de los dos.\n\njubilometro.com/demorada/x",
  "id": "mes1-43",
  "fecha": "2026-12-11",
  "hora": "09:00"
 },
 {
  "id": "decesos-fb",
  "red": "facebook",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/dinero/seguro-decesos/",
  "texto": "Tres cosas del seguro de decesos que muchas familias descubren tarde.\n\nSi el entierro cuesta menos que la suma asegurada, la diferencia es para los herederos. Si la familia prefiere otra funeraria, la aseguradora tiene que pagarles la suma asegurada. Y si tienes dos seguros de decesos con la misma compañía, puedes anular uno y te devuelven las primas desde que coincidieron.\n\nAdemás, a partir de los 60 años, la aseguradora no puede negarse a renovarlo. Solo tú puedes darlo de baja. La prima sí puede subir, pero te tienen que avisar con dos meses de antelación. Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "fecha": "2026-12-11",
  "hora": "11:00"
 },
 {
  "id": "pedir-viudedad-x",
  "red": "x",
  "pilar": "Trámites sin líos",
  "fuente": "/viudedad/solicitar-viudedad/",
  "texto": "La pensión de viudedad no caduca, pero solo se cobran con atrasos los tres meses anteriores a la solicitud. Pídela en los tres meses siguientes al fallecimiento y no pierdes nada. Se puede pedir por internet o con cita previa.\n\njubilometro.com/pedir-viudedad/x",
  "fecha": "2026-12-11",
  "hora": "13:30"
 },
 {
  "id": "servicios-dependencia-ig",
  "red": "instagram",
  "tipo": "Carrusel",
  "pilar": "Calcula tu caso",
  "fuente": "/dependencia/ley-dependencia/",
  "diapositivas": [
   "Dependencia: los servicios que puede recibir tu familiar.",
   "Teleasistencia: un pulsador conectado a una central las 24 horas.",
   "Ayuda a domicilio: de 20 a 94 horas al mes, según el grado.",
   "Centro de día: atención durante el día y a dormir a casa. Con grado I, al menos 15 horas a la semana.",
   "Residencia: con grado II o III. Pagas según tus ingresos, como máximo el 90 % del coste.",
   "Si no hay plaza pública: hasta 747,25 € al mes para pagar un servicio privado acreditado.",
   "Si te cuida un familiar en casa: hasta 455,40 € al mes con grado III.",
   "Guárdalo y compártelo en la familia. Cómo pedirlo, en Jubilómetro (enlace en la biografía)."
  ],
  "texto": "Teleasistencia, ayuda a domicilio, centro de día, residencia o ayuda económica: lo que da la ley de dependencia. Guía en la biografía.\n\n#dependencia #cuidados #mayores #familia",
  "carrusel": "publicacion/redes/banco/carruseles/servicios-dependencia-ig/",
  "fecha": "2026-12-11",
  "hora": "19:00"
 },
 {
  "id": "total-x",
  "red": "x",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/incapacidad/incapacidad-total/",
  "texto": "Con una incapacidad total, desde mayo de 2025 la empresa ya no puede despedirte sin más. Tienes 10 días para decirle por escrito que quieres seguir, y ella tiene 3 meses para adaptar tu puesto o cambiarte a otro compatible.\n\njubilometro.com/total/x",
  "fecha": "2026-12-12",
  "hora": "10:00"
 },
 {
  "id": "residencias-fb",
  "red": "facebook",
  "pilar": "Calcula tu caso",
  "fuente": "/dependencia/residencias-publicas/",
  "texto": "Residencia pública o privada: lo que cambia para la familia.\n\nEn una plaza pública o concertada pagas según tu capacidad económica: tus ingresos y el 5 % de tu patrimonio, con un máximo del 90 % del coste y quedándote al menos 114 euros al mes para tus gastos. Se accede con la dependencia en grado II o III, y suele haber lista de espera. De media, el residente paga 692,40 euros al mes por una plaza que cuesta 1.958,95.\n\nEn una residencia privada pagas el precio entero, pero eliges el centro y entras antes. Si tienes la dependencia reconocida y no hay plaza pública, puedes cobrar hasta 747,25 euros al mes para pagarla, si la residencia está acreditada.\n\nTienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "imagenLista": "publicacion/redes/banco/cifras/residencias-fb.png",
  "fecha": "2026-12-12",
  "hora": "11:00"
 },
 {
  "id": "ayudas-comunidad-x",
  "red": "x",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/ayudas/ayudas-autonomicas/",
  "texto": "Si cobras una pensión no contributiva, siete comunidades te dan algo más en 2026: Baleares, Cataluña, Aragón, Canarias, Galicia, Andalucía y la Comunitat Valenciana. En Andalucía, Aragón, Canarias y Galicia llega sin pedirlo.\n\njubilometro.com/ayudas-comunidad/x",
  "fecha": "2026-12-13",
  "hora": "10:00"
 },
 {
  "red": "facebook",
  "pilar": "Calendario y avisos",
  "fuente": "/imserso/tarjeta-mayores/",
  "texto": "La Tarjeta Dorada de Renfe cuesta 6 euros al año y se puede sacar desde los 60 años.\n\nDa un 40 % de descuento en Cercanías y Media Distancia y un 25 % en AVE y Larga Distancia. Se saca en la taquilla de la estación o en una agencia de viajes, y se renueva por internet.\n\nAdemás, varias comunidades tienen su propia tarjeta gratuita para mayores, como la Andalucía Junta 65 o el Carné +65 de Galicia, que llega a casa sin pedirlo. Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "id": "mes1-17",
  "fecha": "2026-12-13",
  "hora": "11:00"
 },
 {
  "id": "vender-casa-x",
  "red": "x",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/dinero/vender-vivienda-65/",
  "texto": "Con más de 65 años, si vendes tu vivienda habitual, la ganancia no paga IRPF, ganes lo que ganes y hagas lo que hagas con el dinero. Lo que sí pagas es la plusvalía municipal, que no tiene exención por edad.\n\njubilometro.com/vender-casa/x",
  "fecha": "2026-12-14",
  "hora": "09:00"
 },
 {
  "id": "favor-familiares-fb",
  "red": "facebook",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/viudedad/favor-de-familiares/",
  "texto": "Pilar tiene 58 años, está soltera y cuidó durante años a su padre, jubilado y viudo, con el que vivía y que la mantenía. Cuando él falleció, ella se quedó sin ingresos. Le corresponde una pensión propia, la pensión en favor de familiares: 651,90 euros al mes en 2026.\n\nLa pueden cobrar los hijos y hermanos de un pensionista de jubilación o de incapacidad que tengan más de 45 años, estén solteros, divorciados o viudos, vivieran con él y a su cargo, lo cuidaran durante mucho tiempo y no tengan medios para vivir. También los nietos y hermanos menores de edad o incapacitados, y los padres y abuelos, con sus propios requisitos.\n\nCada beneficiario cobra el 20 % de la base reguladora del fallecido, con un mínimo de 286,50 euros al mes en 2026, que llega a 651,90 euros (691,70 con 65 años) si es el único beneficiario y no hay viudo ni huérfanos.\n\n¿Conoces a alguien en esta situación? Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "fecha": "2026-12-14",
  "hora": "11:00"
 },
 {
  "id": "requisitos-imserso-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/imserso/requisitos-viajes/",
  "texto": "Viajes del Imserso: pueden ir los pensionistas de jubilación a cualquier edad, los de viudedad desde los 55, otros pensionistas y parados desde los 60, y cualquier asegurado desde los 65. Tu pareja puede acompañarte aunque no cumpla nada.\n\njubilometro.com/requisitos-imserso/x",
  "fecha": "2026-12-14",
  "hora": "13:30"
 },
 {
  "hasta": "2027-05-31",
  "red": "instagram",
  "tipo": "Carrusel",
  "pilar": "Calendario y avisos",
  "fuente": "/imserso/plazas-libres/",
  "diapositivas": [
   "Viajes del Imserso: cómo encontrar plazas libres.",
   "Las plazas que otros cancelan o no pagan vuelven a la venta durante toda la temporada.",
   "Sobre todo, unos 45 días antes de cada salida.",
   "Mira a menudo turismosocial.es o mundicolor.es con tu DNI y tu clave.",
   "Busca también desde otras provincias: ya se puede.",
   "Sé flexible con el destino y las fechas, y apúntate a la lista de espera si te la ofrecen.",
   "Hay 879.213 plazas hasta junio de 2027, desde 132,91 € el viaje.",
   "Guía completa en Jubilómetro (enlace en la biografía)."
  ],
  "texto": "La temporada del Imserso va hasta junio de 2027 y las plazas canceladas vuelven a la venta. Así se encuentran. Guía en la biografía.\n\n#imserso #viajesimserso #jubilados #pensionistas",
  "id": "mes1-33",
  "carrusel": "publicacion/redes/kit/carruseles/2026-10-20-plazas-libres/",
  "fecha": "2026-12-14",
  "hora": "19:00"
 },
 {
  "id": "grado-discapacidad-x",
  "red": "x",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/dependencia/grado-discapacidad/",
  "texto": "Con un grado de discapacidad del 33 % pagas menos IRPF: tu mínimo sube 3.000 € al año. Con un 65 %, sube 9.000 € más otros 3.000 por gastos de asistencia. Lo reconoce tu comunidad y vale desde la fecha de tu solicitud.\n\njubilometro.com/grado-discapacidad/x",
  "fecha": "2026-12-15",
  "hora": "09:00"
 },
 {
  "id": "maxima-fb",
  "red": "facebook",
  "pilar": "La cifra que te toca",
  "fuente": "/cuanto-cobrare/pension-maxima/",
  "texto": "La pensión máxima de 2026 es de 3.359,60 euros brutos al mes en 14 pagas: 47.034,40 euros al año. Es el tope para cualquier pensión pública, y también para la suma de varias, por ejemplo, una jubilación y una viudedad.\n\nPara llegar a ella hace falta haber cotizado de media por unos 3.920 euros al mes en los años que cuentan, lo que equivale a un sueldo bruto de unos 47.000 euros al año, y tener el 100 % por años cotizados.\n\nSi has cotizado por encima de eso, no cobrarás más. Lo que sí se paga aparte es el premio por retrasar la jubilación: el 4 % por año de demora que no cabe en la máxima se cobra como una cantidad añadida, con un límite de 61.214,40 euros al año entre todo. Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "fecha": "2026-12-15",
  "hora": "11:00"
 },
 {
  "id": "viudedad-calc-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/calculadoras/pension-viudedad/",
  "texto": "¿Te corresponde el 52 %, el 60 % o el 70 % de viudedad? La calculadora lo decide con tu edad, tus otros ingresos, tus cargas familiares y si cobras otra pensión, y te dice si llegas a la pensión mínima.\n\njubilometro.com/calcula-viudedad/x",
  "fecha": "2026-12-15",
  "hora": "13:30"
 },
 {
  "red": "x",
  "pilar": "La cifra que te toca",
  "fuente": "/cuanto-cobrare/complemento-brecha-genero/",
  "texto": "Complemento de brecha de género en 2026: 36,90 € al mes por cada hijo, hasta cuatro (147,60 €), en 14 pagas.\n\nLo cobran las madres con pensión de jubilación, incapacidad permanente o viudedad. Los padres, solo en casos concretos. jubilometro.com/brecha/x",
  "id": "mes1-80",
  "fecha": "2026-12-16",
  "hora": "09:00"
 },
 {
  "red": "facebook",
  "pilar": "Familias y cuidados",
  "fuente": "/jubilacion/subsidio-mayores-52/",
  "texto": "Si te quedas en paro a partir de los 52 años, mira el subsidio para mayores de 52.\n\nEs una ayuda del SEPE para quien ya tiene cotizado lo necesario para jubilarse, salvo la edad. En 2026 son 480 euros al mes y dura hasta la edad ordinaria de jubilación. Y mientras lo cobras, el SEPE cotiza por ti para la jubilación sobre el 125 % de la base mínima.\n\nSolo cuentan tus rentas propias, que no pueden pasar de 915,75 euros al mes. Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "id": "mes1-82",
  "fecha": "2026-12-16",
  "hora": "11:00"
 },
 {
  "id": "activa-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/jubilacion/activa/",
  "texto": "Jubilación activa: si retrasas tu jubilación al menos un año, puedes trabajar y cobrar a la vez el 45 % de la pensión. Con dos años de retraso, el 55 %; con tres, el 65 %; con cuatro, el 80 %, y con cinco, el 100 %.\n\njubilometro.com/activa/x",
  "fecha": "2026-12-16",
  "hora": "13:30"
 },
 {
  "id": "complemento-minimos-ig",
  "red": "instagram",
  "tipo": "Carrusel",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/cuanto-cobrare/complemento-a-minimos/",
  "diapositivas": [
   "¿Tu pensión no llega a la mínima? La Seguridad Social te paga la diferencia.",
   "Se llama complemento a mínimos y se suma a tu pensión en las mismas 14 pagas.",
   "Pensión mínima: 936,20 € al mes en 2026 si tienes 65 años o más y vives solo.",
   "Con cónyuge a cargo: 1.256,60 € al mes.",
   "Requisito: que tus otros ingresos no pasen de 9.442 € al año (11.013 € con cónyuge a cargo).",
   "Tope: el complemento no puede pasar de 628,80 € al mes en las pensiones causadas desde 2013.",
   "Desde mayo de 2026, quien lo cobra no paga nada por los medicamentos con receta.",
   "Envíaselo a quien cobre una pensión baja. Requisitos en Jubilómetro (enlace en la biografía)."
  ],
  "texto": "El complemento a mínimos sube tu pensión hasta la mínima si tus ingresos son bajos. Cifras de 2026 y requisitos en la guía de la biografía.\n\n#pensiones #pensionminima #jubilacion #seguridadsocial",
  "carrusel": "publicacion/redes/banco/carruseles/complemento-minimos-ig/",
  "fecha": "2026-12-16",
  "hora": "19:00"
 },
 {
  "id": "divorcio-x",
  "red": "x",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/viudedad/divorcio-separacion/",
  "texto": "Divorciada o separada: cobras la viudedad de tu ex solo si te pagaba una pensión compensatoria, y no puede ser mayor que ella. Excepciones: las víctimas de violencia de género y quien se divorció antes de 2008, con 65 años y 15 de matrimonio.\n\njubilometro.com/divorcio/x",
  "fecha": "2026-12-17",
  "hora": "09:00"
 },
 {
  "id": "grados-incapacidad-fb",
  "red": "facebook",
  "pilar": "Calcula tu caso",
  "fuente": "/incapacidad/grados-incapacidad/",
  "texto": "La incapacidad permanente tiene cuatro grados, según cuánto te impide trabajar, y cada uno se cobra de una forma.\n\nParcial: rindes al menos un 33 % menos en tu trabajo, pero puedes seguir haciéndolo. Cobras una indemnización única de 24 mensualidades y sigues en tu puesto.\n\nTotal: no puedes hacer tu trabajo habitual, pero sí otro. Cobras el 55 % de tu base reguladora, que sube al 75 % desde los 55 años si no trabajas.\n\nAbsoluta: no puedes trabajar en nada. Cobras el 100 %, sin retención de IRPF.\n\nGran incapacidad: además, necesitas ayuda de otra persona para comer, vestirte o moverte. Cobras el 100 % más un complemento para pagar a quien te cuida.\n\nTienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "fecha": "2026-12-17",
  "hora": "11:00"
 },
 {
  "id": "absoluta-x",
  "red": "x",
  "pilar": "La cifra que te toca",
  "fuente": "/incapacidad/incapacidad-absoluta/",
  "texto": "Incapacidad permanente absoluta: el 100 % de tu base reguladora, de por vida y sin IRPF. Desde el 22 de diciembre de 2024, si trabajas con alta en la Seguridad Social, el INSS suspende la pensión mientras dure el trabajo.\n\njubilometro.com/absoluta/x",
  "fecha": "2026-12-17",
  "hora": "13:30"
 },
 {
  "id": "ayudas-vivienda-x",
  "red": "x",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/ayudas/ayudas-vivienda/",
  "texto": "Si en tu casa vive alguien mayor de 70 años, tu comunidad de vecinos está obligada a poner rampa o salvaescaleras si lo pides, siempre que a cada vecino no le cueste más de 12 cuotas mensuales al año, descontadas las ayudas.\n\njubilometro.com/ayudas-vivienda/x",
  "fecha": "2026-12-18",
  "hora": "09:00"
 },
 {
  "id": "transporte-fb",
  "red": "facebook",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/ayudas/descuentos-transporte/",
  "texto": "Descuentos de transporte para mayores que conviene tener a mano.\n\nEn toda España, la Tarjeta Dorada de Renfe cuesta 6 euros al año desde los 60 y rebaja un 40 % Cercanías y Media Distancia y un 25 % el AVE.\n\nY según dónde vivas: en la Comunidad de Madrid, el Abono +65 es gratis para todo el transporte público; en el área de Barcelona, la Targeta Rosa es gratuita o reducida desde los 60 con ingresos bajos; en Galicia, el autobús interurbano es gratis desde los 65 con la Tarjeta de Movilidad; en Andalucía, la Tarjeta Andalucía Junta 65 da un 50 % en el autobús interurbano.\n\nMuchos ayuntamientos tienen además el autobús urbano gratis o rebajado para mayores. ¿Cómo es en tu pueblo o tu ciudad? Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "fecha": "2026-12-18",
  "hora": "11:00"
 },
 {
  "id": "hipoteca-inversa-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/dinero/hipoteca-inversa/",
  "texto": "Tres formas de sacar dinero de tu casa sin dejar de vivir en ella, desde los 65: la hipoteca inversa, vender la nuda propiedad quedándote el usufructo de por vida, o vender y contratar una renta vitalicia.\n\njubilometro.com/hipoteca-inversa/x",
  "fecha": "2026-12-18",
  "hora": "13:30"
 },
 {
  "id": "faltan-anos-ig",
  "red": "instagram",
  "tipo": "Carrusel",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/jubilacion/faltan-anos-cotizados/",
  "diapositivas": [
   "¿Te faltan años cotizados? Cuatro vías legales para llegar.",
   "Las metas: 15 años para tener pensión, 37 para el 100 % y 38 años y 6 meses para jubilarte a los 65.",
   "Seguir trabajando, aunque sea a tiempo parcial: todo mes cotizado suma.",
   "Convenio especial: cotizas tú, unos 392 € al mes en 2026 por la base mínima.",
   "Prácticas y becas antiguas: se recuperan hasta 5 años, con plazo hasta el 31 de diciembre de 2028.",
   "Tu vida laboral: busca periodos que falten, días por parto o años cotizados en otros países.",
   "Si no llegas a 15 años, la alternativa es la pensión no contributiva.",
   "Guárdalo y compártelo. Las cuatro vías, en Jubilómetro (enlace en la biografía)."
  ],
  "texto": "Seguir trabajando, el convenio especial, las prácticas antiguas y tu vida laboral: cómo completar los años que te faltan. Guía en la biografía.\n\n#jubilacion #pensiones #cotizacion #seguridadsocial",
  "carrusel": "publicacion/redes/banco/carruseles/faltan-anos-ig/",
  "fecha": "2026-12-18",
  "hora": "19:00"
 },
 {
  "id": "universidad-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/imserso/universidad-mayores/",
  "texto": "Volver a estudiar después de jubilarte: casi todas las universidades tienen un programa para mayores desde los 50 o 55 años, sin exámenes ni estudios previos. Y si quieres un grado oficial, hay pruebas de acceso para mayores de 25 y de 45 años.\n\njubilometro.com/universidad/x",
  "fecha": "2026-12-19",
  "hora": "10:00"
 },
 {
  "id": "herencias-fb",
  "red": "facebook",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/dinero/herencias-donaciones/",
  "texto": "«Les doy ya el piso a mis hijos y así se ahorran la herencia.» Antes de hacerlo, haced números, porque puede salir más caro.\n\nHeredar y recibir una donación pagan el mismo impuesto, el de Sucesiones y Donaciones, y en muchas comunidades es muy bajo entre padres, hijos y cónyuges: Madrid, Andalucía, Castilla y León o la Comunitat Valenciana bonifican el 99 %.\n\nLa diferencia está en el IRPF de quien da. Si donas en vida un piso que ha ganado valor desde que lo compraste, tú pagas IRPF por esa ganancia. Si lo dejas en herencia, esa ganancia no tributa.\n\nY en los dos casos, si es un inmueble urbano, se paga la plusvalía municipal. Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "fecha": "2026-12-19",
  "hora": "11:00"
 },
 {
  "id": "dependencia-andalucia-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/dependencia/andalucia/",
  "texto": "Dependencia en Andalucía: se pide en el portal VED o en una oficina de registro con cita previa, con un informe de salud que suele hacer tu médico de cabecera. La Junta habla de un año; la media real fue de 402 días hasta la prestación.\n\njubilometro.com/dependencia-andalucia/x",
  "fecha": "2026-12-20",
  "hora": "10:00"
 },
 {
  "id": "cuidadora-fb",
  "red": "facebook",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/dependencia/cuidadora-interna-externa/",
  "texto": "Si vais a contratar a una cuidadora para vuestra madre o vuestro padre, conviene saber que es una empleada de hogar, con contrato y alta en la Seguridad Social, aunque trabaje pocas horas.\n\nEn 2026 debe cobrar al menos el salario mínimo: 1.221 euros al mes en 14 pagas a jornada completa, o 9,55 euros por hora si es externa por horas.\n\nUna interna a jornada completa con el salario mínimo cuesta a la familia unos 20.900 euros al año, con la Seguridad Social y sus reducciones (317 euros al mes). Y no cubre las 24 horas: tiene límites de jornada, descansos y 36 horas libres a la semana, así que a menudo hace falta otra persona para los fines de semana.\n\nTienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "fecha": "2026-12-20",
  "hora": "11:00"
 },
 {
  "id": "comparador-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/calculadoras/comparador-ingresos-jubilacion/",
  "texto": "¿Jubilarte antes, a tu edad o más tarde? El comparador suma lo que cobrarías en total en cada caso hasta la edad que elijas, con la subida anual de las pensiones, y te dice desde qué edad compensa esperar.\n\njubilometro.com/comparador/x",
  "fecha": "2026-12-21",
  "hora": "09:00"
 },
 {
  "id": "viajes-comunidad-fb",
  "red": "facebook",
  "pilar": "Calcula tu caso",
  "fuente": "/imserso/turismo-autonomico/",
  "texto": "Si no te tocó viaje con el Imserso, mira los de tu comunidad autónoma. Varias organizan viajes y estancias en balnearios para sus mayores, con plazos y precios propios.\n\nSuelen pedir solo estar empadronado en la comunidad y tener 60 o 65 años (55 en Madrid). Algunos ejemplos: el termalismo de Castilla-La Mancha, las Rutas Culturales de Madrid, el Club de los 60 de Castilla y León, el Termalismo Valenciano y Bienestar en Balnearios de Galicia.\n\nCada uno abre en una época del año distinta, así que conviene tenerlos apuntados. Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "fecha": "2026-12-21",
  "hora": "11:00"
 },
 {
  "red": "x",
  "pilar": "La cifra que te toca",
  "fuente": "/cuanto-cobrare/pension-maxima/",
  "texto": "Pensión máxima en 2026: 3.359,60 € brutos al mes en 14 pagas, 47.034,40 € al año.\n\nPara llegar hace falta el 100 % por años cotizados y haber cotizado de media por unos 3.920 € al mes en los años que cuentan. jubilometro.com/maxima/x",
  "id": "mes1-50",
  "fecha": "2026-12-21",
  "hora": "13:30"
 },
 {
  "red": "instagram",
  "tipo": "Carrusel",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/viudedad/cuantia/",
  "diapositivas": [
   "¿Cuánto se cobra de viudedad? No siempre es el 52 %.",
   "Se cobra un porcentaje de la base reguladora de la persona fallecida.",
   "52 %: el caso general.",
   "60 %: si tienes 65 años o más, no cobras otra pensión pública ni trabajas, y tus otras rentas no pasan de 9.442 € al año.",
   "Ese 60 % no llega solo: hay que pedirlo a la Seguridad Social.",
   "70 %: si tienes cargas familiares, la viudedad es tu principal ingreso y tus ingresos son bajos.",
   "Si queda por debajo de la mínima, se completa: entre 709,40 y 1.256,60 € al mes en 2026.",
   "Guárdalo y envíaselo a quien le pueda servir. Calcula la viudedad en Jubilómetro (enlace en la biografía)."
  ],
  "texto": "La viudedad puede ser el 52 %, el 60 % o el 70 % de la base reguladora. El 60 % para mayores de 65 hay que pedirlo. Calcula la tuya con el enlace de la biografía.\n\n#viudedad #pensiones #seguridadsocial #jubilacion",
  "id": "mes1-09",
  "carrusel": "publicacion/redes/kit/carruseles/2026-10-13-cuantia/",
  "fecha": "2026-12-21",
  "hora": "19:00"
 },
 {
  "id": "flexible-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/jubilacion/flexible/",
  "texto": "¿Jubilado y con ganas de volver a trabajar a tiempo parcial? Con la jubilación flexible trabajas entre el 33 % y el 80 % de una jornada y cobras la pensión reducida. Desde agosto de 2026 también pueden los autónomos.\n\njubilometro.com/flexible/x",
  "fecha": "2026-12-22",
  "hora": "09:00"
 },
 {
  "id": "viudedad-jubilacion-fb",
  "red": "facebook",
  "pilar": "Calcula tu caso",
  "fuente": "/viudedad/viudedad-y-jubilacion/",
  "texto": "¿Se puede cobrar la viudedad y la jubilación a la vez? Sí, y cada pensión se calcula por su lado. Al jubilarte, la viudedad no se reduce, salvo en dos casos.\n\nSi cobrabas la viudedad al 60 % por tener 65 años o más y no tener otra pensión, al empezar a cobrar la jubilación vuelve al 52 %.\n\nSi cobrabas complemento a mínimos en la viudedad, se recalcula con la suma de las dos pensiones, y puede bajar o desaparecer.\n\nEl único límite es la pensión máxima: la suma de todas tus pensiones públicas no puede pasar de 3.359,60 euros al mes en 2026. Si la pasa, se reduce la última que te reconocen. Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "fecha": "2026-12-22",
  "hora": "11:00"
 },
 {
  "id": "viudedad-temporal-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/viudedad/prestacion-temporal/",
  "texto": "Si tu cónyuge muere por una enfermedad que ya tenía antes de la boda y no llevabais un año casados ni tenéis hijos, no hay viudedad vitalicia. Te queda la prestación temporal: la misma cuantía, durante dos años.\n\njubilometro.com/viudedad-temporal/x",
  "fecha": "2026-12-22",
  "hora": "13:30"
 },
 {
  "id": "parcial-incapacidad-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/incapacidad/incapacidad-parcial/",
  "texto": "La incapacidad permanente parcial no es una pensión: cobras una sola vez 24 mensualidades de la base de tu baja y sigues trabajando. La empresa tiene que mantenerte en tu puesto o en uno adecuado, y solo puede bajarte el sueldo hasta un 25 %.\n\njubilometro.com/incapacidad-parcial/x",
  "fecha": "2026-12-23",
  "hora": "09:00"
 },
 {
  "id": "bruta-neta-fb",
  "red": "facebook",
  "pilar": "La cifra que te toca",
  "fuente": "/cuanto-cobrare/pension-bruta-y-neta/",
  "texto": "Si en la carta de la Seguridad Social pone una cifra y en el banco te llega otra, es por la retención del IRPF. La pensión que te reconocen es bruta, y lo que llega a la cuenta es la neta.\n\nLos pensionistas no pagan cotizaciones sociales, solo esa retención. Sin hijos a cargo y con una pensión de hasta 16.476 euros brutos al año (unos 1.177 euros al mes en 14 pagas), no te retienen nada.\n\nPor encima, el porcentaje sube poco a poco: con 1.500 euros al mes, en torno al 9 %; con 2.000, cerca del 17 %, y con 3.000, alrededor del 22 %.\n\nLa retención se puede cambiar: por ejemplo, pedir un tipo más alto para que no te salga a pagar en la declaración. Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "fecha": "2026-12-23",
  "hora": "11:00"
 },
 {
  "id": "tramites-x",
  "red": "x",
  "pilar": "Trámites sin líos",
  "fuente": "/ayudas/tramites-online/",
  "texto": "Sin Cl@ve también puedes sacar la vida laboral y los certificados de tu pensión: con un código por SMS, si la Seguridad Social tiene tu móvil. Y si un SMS te parece un engaño, llama gratis al 017, de 8 de la mañana a 11 de la noche.\n\njubilometro.com/tramites/x",
  "fecha": "2026-12-23",
  "hora": "13:30"
 },
 {
  "id": "retornados-ig",
  "red": "instagram",
  "tipo": "Carrusel",
  "pilar": "La cifra que te toca",
  "fuente": "/ayudas/emigrantes-retornados/",
  "diapositivas": [
   "Vuelves a España después de trabajar fuera: esto es lo que te corresponde.",
   "570 €: al mes los seis primeros meses del subsidio para emigrantes retornados. Después, 540 y 480.",
   "18 meses: es lo que dura como máximo, si sigues cumpliendo los requisitos.",
   "Quién lo cobra: quien trabajó 12 meses en los últimos 6 años fuera del Espacio Económico Europeo y no cobró paro allí.",
   "El certificado: lo da la Delegación o Subdelegación del Gobierno. Tienes que estar empadronado.",
   "El plazo: pídelo en los 15 días hábiles siguientes a tu vuelta. Pasados 6 meses, te lo deniegan.",
   "733,60 €: al mes de pensión asistencial para retornados de 65 años o más sin ingresos, según el país del que vuelvas.",
   "Sanidad: la tienes por ser español y vivir en España. Pide el reconocimiento a la Seguridad Social.",
   "Compártelo con quien esté pensando en volver. Todo en la guía de Jubilómetro (enlace en la biografía)."
  ],
  "texto": "Si vuelves a España después de trabajar fuera, puedes cobrar el subsidio para emigrantes retornados: hasta 18 meses, 570 € al mes al principio. Requisitos, certificado y plazos en la guía del enlace de la biografía.\n\n#emigrantes #retorno #pensiones #seguridadsocial",
  "carrusel": "publicacion/redes/banco/carruseles/retornados-ig/",
  "fecha": "2026-12-23",
  "hora": "19:00"
 },
 {
  "id": "herencias-x",
  "red": "x",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/dinero/herencias-donaciones/",
  "texto": "Donar en vida un piso que ha ganado valor puede salir mucho más caro que dejarlo en herencia. Si lo donas, tú pagas IRPF por la ganancia; si lo heredan, esa ganancia no tributa. Y en los dos casos se paga la plusvalía municipal.\n\njubilometro.com/herencias/x",
  "fecha": "2026-12-24",
  "hora": "09:00"
 },
 {
  "id": "trabajar-jubilado-fb",
  "red": "facebook",
  "pilar": "Calcula tu caso",
  "fuente": "/jubilacion/flexible-activa-o-parcial/",
  "texto": "Tres formas legales de cobrar la pensión y trabajar a la vez, según el momento en que estés.\n\nAntes de jubilarte del todo, la jubilación parcial: reduces jornada en tu empresa, hasta 3 años antes de tu edad ordinaria, y la empresa contrata a otra persona con un contrato de relevo.\n\nSi retrasas tu jubilación al menos un año, la activa: trabajas a jornada completa o parcial y cobras del 45 % al 100 % de la pensión, según los años de retraso.\n\nSi ya estás jubilado, la flexible: vuelves a trabajar a tiempo parcial, del 33 % al 80 % de la jornada, y cobras la pensión reducida en proporción. Si empiezas al menos 6 meses después de jubilarte, recibes un incremento del 15 % o del 25 %.\n\n¿Estás pensando en seguir trabajando después de jubilarte? Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "fecha": "2026-12-24",
  "hora": "11:00"
 },
 {
  "id": "dependencia-aragon-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/dependencia/aragon/",
  "texto": "Dependencia en Aragón: todo empieza con una llamada para pedir cita con la trabajadora social. Si autorizas que consulten tu historia clínica, no necesitas informe médico. Media real: 109 días hasta la prestación, la segunda más rápida de España.\n\njubilometro.com/dependencia-aragon/x",
  "fecha": "2026-12-24",
  "hora": "13:30"
 },
 {
  "id": "como-se-calcula-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/cuanto-cobrare/como-se-calcula-la-pension/",
  "texto": "Tu pensión de jubilación sale de tres pasos: la base reguladora (la media de lo que has cotizado en los últimos 25 años), el porcentaje por años cotizados (del 50 % con 15 años al 100 % con 37) y los ajustes por jubilarte antes o después.\n\njubilometro.com/como-se-calcula/x",
  "fecha": "2026-12-25",
  "hora": "09:00"
 },
 {
  "id": "total-fb",
  "red": "facebook",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/incapacidad/incapacidad-total/",
  "texto": "Si te reconocen una incapacidad permanente total, tu contrato ya no se termina solo. Es un cambio de mayo de 2025 que mucha gente aún no conoce.\n\nTienes 10 días naturales desde que te notifican la incapacidad para decir por escrito a tu empresa que quieres seguir. Desde ahí, la empresa tiene tres meses para adaptar tu puesto o cambiarte a uno vacante que puedas hacer. Solo puede terminar el contrato si la adaptación es una carga excesiva, si no hay ningún puesto compatible o si rechazas un cambio adecuado.\n\nLa pensión de la total, el 55 % de tu base reguladora, es compatible con el sueldo de ese otro puesto, en tu empresa o en otra. Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "fecha": "2026-12-25",
  "hora": "11:00"
 },
 {
  "id": "parcial-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/jubilacion/parcial/",
  "texto": "Jubilación parcial: reduces tu jornada hasta 3 años antes de tu edad ordinaria y cobras una parte de la pensión. Pide 33 años cotizados, 6 años en la empresa y que contraten a otra persona con un contrato de relevo.\n\njubilometro.com/parcial/x",
  "fecha": "2026-12-25",
  "hora": "13:30"
 },
 {
  "id": "grados-incapacidad-ig",
  "red": "instagram",
  "tipo": "Carrusel",
  "pilar": "Calcula tu caso",
  "fuente": "/incapacidad/grados-incapacidad/",
  "diapositivas": [
   "Incapacidad permanente: los 4 grados y cuánto se cobra en cada uno.",
   "Parcial: rindes al menos un 33 % menos, pero puedes seguir en tu trabajo.",
   "Parcial: 24 mensualidades de una vez, y la empresa te mantiene en tu puesto.",
   "Total: 55 % de tu base reguladora, si no puedes hacer tu trabajo habitual pero sí otro.",
   "Total cualificada: 75 % desde los 55 años, mientras no trabajes.",
   "Absoluta: 100 % de tu base, sin IRPF, si no puedes trabajar en nada.",
   "Gran incapacidad: 100 % más un complemento para pagar a quien te cuida.",
   "Guárdalo y calcula la tuya en Jubilómetro (enlace en la biografía)."
  ],
  "texto": "Parcial, total, absoluta y gran incapacidad: qué significa cada grado y cuánto se cobra. Calculadora en la biografía.\n\n#incapacidadpermanente #pensiones #seguridadsocial #inss",
  "carrusel": "publicacion/redes/banco/carruseles/grados-incapacidad-ig/",
  "fecha": "2026-12-25",
  "hora": "19:00"
 },
 {
  "id": "viudedad-trabajo-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/viudedad/compatibilidad-trabajo/",
  "texto": "La viudedad es compatible con cualquier sueldo, sin límite. Lo que puedes perder al trabajar son los extras ligados a tus ingresos: el complemento a mínimos, el 60 % para mayores de 65 y el 70 % por cargas familiares.\n\njubilometro.com/viudedad-trabajo/x",
  "fecha": "2026-12-26",
  "hora": "10:00"
 },
 {
  "id": "ayudas-vivienda-fb",
  "red": "facebook",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/ayudas/ayudas-vivienda/",
  "texto": "Subir y bajar escaleras se vuelve un problema con los años, y muchas personas mayores dejan de salir de casa por eso. La ley y las ayudas públicas están de tu parte.\n\nSi en tu casa vive alguien mayor de 70 años o con discapacidad, la comunidad de vecinos está obligada a hacer las obras de accesibilidad que pidas (rampa, ascensor, salvaescaleras), siempre que a cada vecino no le cueste más de 12 cuotas mensuales al año, descontadas las ayudas. Si cuesta más, puedes pagar tú la diferencia.\n\nAdemás, el Plan Estatal de Vivienda 2026-2030, que convoca cada comunidad, subvenciona hasta el 80 % de esas obras en el edificio si vive una persona mayor de 65 años o con discapacidad, con un máximo de 18.000 euros por vivienda. Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "fecha": "2026-12-26",
  "hora": "11:00"
 },
 {
  "id": "enfermedades-x",
  "red": "x",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/incapacidad/enfermedades/",
  "texto": "No hay una lista de enfermedades que den la incapacidad permanente. El tribunal médico valora las limitaciones que te deja, comparadas con lo que exige tu trabajo. Por eso la misma enfermedad da la incapacidad a una persona y a otra no.\n\njubilometro.com/enfermedades/x",
  "fecha": "2026-12-27",
  "hora": "10:00"
 },
 {
  "red": "facebook",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/dinero/domiciliar-pension/",
  "texto": "Antes de cambiar la pensión de banco por un regalo, tres cosas.\n\nPuedes cobrar la pensión en el banco que elijas y cambiarlo cuando quieras. Lo más fácil es pedirlo en el banco nuevo, que lo tramita. El cambio se aplica desde el primer día hábil del segundo mes, así que no cierres la cuenta antigua hasta cobrar en la nueva.\n\nEl ingreso de la pensión no te puede costar nada. Si te ofrecen un regalo o dinero por domiciliarla, lee la permanencia y recuerda que tributa en la declaración de la renta. Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "id": "mes1-76",
  "fecha": "2026-12-27",
  "hora": "11:00"
 },
 {
  "id": "rescate-10-anos-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/dinero/rescate-aportaciones-10-anos/",
  "texto": "Desde 2025 puedes sacar dinero de tu plan de pensiones sin estar jubilado: lo aportado hasta 2015, con su rentabilidad, y después cada aportación cuando cumple 10 años. Tributa en el IRPF como un sueldo, sumado a tus demás ingresos.\n\njubilometro.com/rescate-10-anos/x",
  "fecha": "2026-12-28",
  "hora": "09:00"
 },
 {
  "id": "grado-discapacidad-fb",
  "red": "facebook",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/dependencia/grado-discapacidad/",
  "texto": "Muchas personas mayores tienen problemas de movilidad, de vista o de corazón que darían un grado de discapacidad, y nunca lo han pedido. Es un trámite que puede ahorrar dinero cada año.\n\nEl grado de discapacidad lo reconoce tu comunidad autónoma después de una valoración. Tiene seis meses para resolver, y el grado vale desde la fecha de la solicitud y en toda España.\n\nCon un 33 % se te considera persona con discapacidad: tu mínimo en el IRPF sube 3.000 euros al año, y accedes a otras ventajas. Con un 65 %, sube 9.000 euros, más otros 3.000 por gastos de asistencia, y puedes tener derecho, por ejemplo, a la pensión no contributiva de invalidez.\n\nLa dependencia y la discapacidad son trámites distintos, aunque en algunas comunidades se piden juntos. Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "fecha": "2026-12-28",
  "hora": "11:00"
 },
 {
  "id": "dependencia-asturias-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/dependencia/asturias/",
  "texto": "Dependencia en Asturias: si el Principado no resuelve en seis meses, la solicitud se entiende concedida. Aun así, la media real fue de 413 días desde la solicitud hasta la prestación, la segunda más larga de España (293 de media).\n\njubilometro.com/dependencia-asturias/x",
  "fecha": "2026-12-28",
  "hora": "13:30"
 },
 {
  "id": "herencias-ig",
  "red": "instagram",
  "tipo": "Carrusel",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/dinero/herencias-donaciones/",
  "diapositivas": [
   "¿Donar en vida o dejar en herencia? Lo que cambia en impuestos.",
   "Las dos pagan el Impuesto sobre Sucesiones y Donaciones, y lo paga quien recibe.",
   "Entre padres, hijos y cónyuges, en muchas comunidades se paga muy poco.",
   "Madrid, Andalucía, Castilla y León o la Comunitat Valenciana bonifican el 99 %.",
   "La diferencia: si donas en vida un piso que ha ganado valor, tú pagas IRPF por esa ganancia.",
   "Si lo dejas en herencia, esa ganancia no tributa.",
   "En los dos casos, si es un inmueble urbano, se paga la plusvalía municipal.",
   "Guárdalo y háblalo en familia. La guía, en Jubilómetro (enlace en la biografía)."
  ],
  "texto": "Donar un piso a los hijos en vida puede salir más caro que dejarlo en herencia. Por qué, en la guía de la biografía.\n\n#herencia #impuestos #familia #jubilacion",
  "carrusel": "publicacion/redes/banco/carruseles/herencias-ig/",
  "fecha": "2026-12-28",
  "hora": "19:00"
 },
 {
  "id": "base-reguladora-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/cuanto-cobrare/base-reguladora/",
  "texto": "Desde 2026, la Seguridad Social calcula tu base reguladora de dos formas: con los últimos 25 años, o con un periodo algo más largo descartando tus peores meses. Te aplica la que más pensión te dé, sin que tengas que pedirlo.\n\njubilometro.com/base-reguladora/x",
  "fecha": "2026-12-29",
  "hora": "09:00"
 },
 {
  "id": "universidad-fb",
  "red": "facebook",
  "pilar": "Calcula tu caso",
  "fuente": "/imserso/universidad-mayores/",
  "texto": "Muchas personas aprovechan la jubilación para estudiar lo que no pudieron de jóvenes. Hay tres caminos.\n\nLos programas universitarios para mayores: casi todas las universidades tienen uno, desde los 50 o 55 años, sin exámenes ni estudios previos. No dan un título oficial, pero sí un diploma de la universidad.\n\nUn grado oficial sin bachillerato: con la prueba de acceso para mayores de 25 o de 45 años, o acreditando experiencia laboral desde los 40. Las universidades reservan plazas para estas vías.\n\nY la educación de personas adultas: cursos públicos en los centros de tu comunidad.\n\n¿Alguno de vosotros está estudiando ahora? Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "fecha": "2026-12-29",
  "hora": "11:00"
 },
 {
  "id": "involuntaria-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/jubilacion/anticipada-involuntaria/",
  "texto": "Si te despiden, puedes jubilarte hasta 4 años antes. En 2027, desde los 63, o desde los 61 con 38 años y 6 meses cotizados. Pide 33 años cotizados y 6 meses inscrito como demandante de empleo. El recorte es para siempre.\n\njubilometro.com/involuntaria/x",
  "fecha": "2026-12-29",
  "hora": "13:30"
 },
 {
  "red": "x",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/viudedad/pareja-de-hecho/",
  "texto": "Las parejas de hecho cobran la viudedad igual que un matrimonio si estaban inscritas al menos 2 años antes del fallecimiento y convivían 5 años. Con hijos en común bastan 2 años de convivencia, sin inscripción.\n\nDesde 2022 no hay límite de ingresos. jubilometro.com/pareja-de-hecho/x",
  "id": "mes1-36",
  "fecha": "2026-12-30",
  "hora": "09:00"
 },
 {
  "red": "facebook",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/viudedad/cuantia/",
  "texto": "La pensión de viudedad no siempre es el 52 %. Es un porcentaje de la base reguladora de la persona fallecida, y hay tres:\n\nEl 52 % es el caso general.\nEl 60 % es para quien tiene 65 años o más, no cobra otra pensión pública, no trabaja y no pasa de 9.442 euros al año de otras rentas. Ese 60 % hay que pedirlo: no llega solo.\nEl 70 % es para quien tiene cargas familiares, ingresos bajos y vive principalmente de la viudedad.\n\nSi el resultado queda por debajo de la pensión mínima y cumples el límite de ingresos, se completa: en 2026, entre 709,40 y 1.256,60 euros al mes según la edad y las cargas.\n\nTienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "id": "mes1-08",
  "fecha": "2026-12-30",
  "hora": "11:00"
 },
 {
  "id": "pedir-incapacidad-x",
  "red": "x",
  "pilar": "Trámites sin líos",
  "fuente": "/incapacidad/solicitar/",
  "texto": "La incapacidad permanente la puedes pedir tú, en la sede de la Seguridad Social o con cita previa. Te valora el tribunal médico, tienes 10 días para alegar antes de la decisión y el INSS tiene 135 días para resolver. Si no contesta, puedes reclamar.\n\njubilometro.com/pedir-incapacidad/x",
  "fecha": "2026-12-30",
  "hora": "13:30"
 },
 {
  "red": "instagram",
  "tipo": "Carrusel",
  "pilar": "Familias y cuidados",
  "fuente": "/dependencia/convenio-cuidador/",
  "diapositivas": [
   "¿Cuidas de un familiar dependiente? Puedes cotizar gratis para tu jubilación.",
   "Es el convenio especial del cuidador no profesional.",
   "Para quien figura como cuidador en la prestación por cuidados familiares.",
   "La cuota la paga el Imserso: tú no pagas nada.",
   "Grado III: cotizas por la base mínima (1.424,40 € al mes en 2026).",
   "Grado II, una parte; grado I, la mitad.",
   "Pídelo en la Tesorería en los 90 días siguientes a que se reconozca la ayuda.",
   "Pasos y documentos en Jubilómetro (enlace en la biografía)."
  ],
  "texto": "Si has dejado de trabajar para cuidar de tu madre o tu padre, no pierdas años de cotización. Guía en la biografía.\n\n#dependencia #cuidadores #pensiones #jubilacion",
  "id": "mes1-55",
  "carrusel": "publicacion/redes/kit/carruseles/2026-10-27-convenio-cuidador/",
  "fecha": "2026-12-30",
  "hora": "19:00"
 },
 {
  "id": "vivir-fuera-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/dinero/pension-extranjero/",
  "texto": "Puedes irte a vivir a otro país y seguir cobrando tu jubilación o tu viudedad. Lo que pierdes es lo que exige vivir en España, como el complemento a mínimos. Y cada año tienes que acreditar que sigues con vida, desde el móvil con la app VIVESS.\n\njubilometro.com/vivir-fuera/x",
  "fecha": "2026-12-31",
  "hora": "09:00"
 },
 {
  "id": "sueldo-fb",
  "red": "facebook",
  "pilar": "Calcula tu caso",
  "fuente": "/cuanto-cobrare/pension-segun-sueldo/",
  "texto": "¿Cuánto cobraré de pensión con mi sueldo? Hay una regla sencilla para hacerse una idea.\n\nSi has cotizado 37 años siempre por la misma base, tu pensión bruta al mes es 6/7 de esa base. Como la pensión se cobra en 14 pagas, al año cobras lo mismo que tu sueldo bruto anual.\n\nCon una base de 1.500 euros, unos 1.286 euros de pensión al mes. Con 2.000, unos 1.714. Con 3.000, unos 2.571. A partir de una base de 3.919,53 euros llegas a la pensión máxima, 3.359,60 euros al mes en 2026.\n\nLa base de cotización es tu sueldo bruto con las pagas extra repartidas en 12 meses: aparece en la nómina. Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "imagenLista": "publicacion/redes/banco/cifras/sueldo-fb.png",
  "fecha": "2026-12-31",
  "hora": "11:00"
 },
 {
  "id": "dependencia-baleares-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/dependencia/baleares/",
  "texto": "Dependencia en Baleares: se pide con la misma solicitud que la discapacidad, y si tus datos de salud están al día en el IB-Salut no hace falta informe médico. Media real: 188 días desde la solicitud hasta la prestación, frente a 293 en España.\n\njubilometro.com/dependencia-baleares/x",
  "fecha": "2026-12-31",
  "hora": "13:30"
 },
 {
  "id": "porcentaje-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/cuanto-cobrare/porcentaje-anos-cotizados/",
  "texto": "Con 30 años cotizados cobras el 84,20 % de tu base reguladora si te jubilas en 2027 o después. Con 15 años, el 50 %, y con 37, el 100 %. Cada año de más suma unos 2,3 puntos.\n\nTabla completa: jubilometro.com/anos-cotizados/x",
  "fecha": "2027-01-01",
  "hora": "09:00"
 },
 {
  "id": "involuntaria-fb",
  "red": "facebook",
  "pilar": "Calcula tu caso",
  "fuente": "/jubilacion/anticipada-involuntaria/",
  "texto": "Si pierdes el empleo por una causa que no depende de ti (un ERE, un despido objetivo, el cierre de la empresa), puedes jubilarte hasta 4 años antes de tu edad ordinaria. Es la jubilación anticipada involuntaria.\n\nNecesitas 33 años cotizados y haber estado inscrito como demandante de empleo al menos 6 meses. En 2027, la edad mínima es 63 años, o 61 si has cotizado 38 años y 6 meses.\n\nEl precio es un recorte en la pensión para toda la vida, que depende de los meses que adelantes y de tus años cotizados: puede llegar al 30 % si adelantas los 4 años. Antes de decidir, compara con el paro y el subsidio para mayores de 52, que cotiza por ti para la jubilación.\n\nTienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "fecha": "2027-01-01",
  "hora": "11:00"
 },
 {
  "id": "discapacidad-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/jubilacion/anticipada-discapacidad/",
  "texto": "Con una discapacidad del 45 % causada por una de las enfermedades de la lista oficial, puedes jubilarte a los 56 años sin recorte. Desde el 31 de julio de 2026 la lista incluye 11 patologías nuevas, como el párkinson.\n\njubilometro.com/discapacidad/x",
  "fecha": "2027-01-01",
  "hora": "13:30"
 },
 {
  "id": "requisitos-imserso-ig",
  "red": "instagram",
  "tipo": "Carrusel",
  "pilar": "Calcula tu caso",
  "fuente": "/imserso/requisitos-viajes/",
  "diapositivas": [
   "¿Puedes ir de viaje con el Imserso? Quién puede apuntarse.",
   "Pensionistas de jubilación: a cualquier edad.",
   "Pensionistas de viudedad: desde los 55 años.",
   "Otros pensionistas y quien cobra el paro: desde los 60.",
   "Cualquier asegurado de la Seguridad Social: desde los 65.",
   "Tu pareja puede ir contigo aunque no cumpla nada de esto.",
   "Hay que acreditarse cada año en el plazo del Imserso, normalmente en verano.",
   "Compártelo con quien viaja contigo. Requisitos y plazos, en Jubilómetro (enlace en la biografía)."
  ],
  "texto": "Quién puede viajar con el Imserso y cómo se apunta: requisitos por edad y tipo de pensión. Guía en la biografía.\n\n#imserso #viajes #mayores #jubilados",
  "carrusel": "publicacion/redes/banco/carruseles/requisitos-imserso-ig/",
  "fecha": "2027-01-01",
  "hora": "19:00"
 },
 {
  "red": "x",
  "pilar": "Familias y cuidados",
  "fuente": "/viudedad/fallecimiento-pensionista/",
  "texto": "Cuando fallece un pensionista, la pensión de ese mes se cobra entera, sea cual sea el día. Lo que el banco ingrese de los meses siguientes hay que devolverlo.\n\nViudedad, orfandad y auxilio por defunción: mejor pedirlos en los 3 primeros meses. jubilometro.com/fallecimiento/x",
  "id": "mes1-72",
  "fecha": "2027-01-02",
  "hora": "10:00"
 },
 {
  "id": "enfermedades-fb",
  "red": "facebook",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/incapacidad/enfermedades/",
  "texto": "«¿Qué enfermedades dan la incapacidad permanente?» es de las preguntas que más se buscan, y la respuesta sorprende: no existe una lista.\n\nLo que valora el tribunal médico del INSS (el Equipo de Valoración de Incapacidades) son las limitaciones que te deja la enfermedad. Tienen que ser graves, se tienen que poder comprobar con pruebas y tienen que ser previsiblemente definitivas. Y se comparan con lo que exige tu profesión: una lesión de rodilla no pesa igual en un albañil que en un administrativo.\n\nPor eso, más que el diagnóstico, importan los informes que describen qué no puedes hacer.\n\nLo que sí tiene lista oficial son las enfermedades profesionales: si la tuya lo es, no te piden cotización mínima. Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "fecha": "2027-01-02",
  "hora": "11:00"
 },
 {
  "id": "denegada-x",
  "red": "x",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/incapacidad/denegada/",
  "texto": "¿Te han denegado la incapacidad permanente? Tienes 30 días para la reclamación previa ante el INSS. Si la rechaza o no contesta en 45 días, otros 30 para ir al Juzgado de lo Social. Aporta todos tus informes en la reclamación previa.\n\njubilometro.com/incapacidad-denegada/x",
  "fecha": "2027-01-03",
  "hora": "10:00"
 },
 {
  "id": "retornados-fb",
  "red": "facebook",
  "pilar": "La cifra que te toca",
  "fuente": "/ayudas/emigrantes-retornados/",
  "texto": "Si tienes familia que emigró y está pensando en volver, esto le interesa: los españoles que regresan después de trabajar fuera tienen un subsidio propio, el subsidio para emigrantes retornados. Lo paga el SEPE.\n\nEs para quien ha trabajado al menos 12 meses en los últimos 6 años en países de fuera del Espacio Económico Europeo y no cobró paro allí. Son 570 euros al mes los seis primeros meses, 540 los seis siguientes y 480 los seis últimos. Antes hay que pedir el certificado de emigrante retornado en la Delegación o Subdelegación del Gobierno.\n\nOjo con el plazo: si se pide en los 15 días hábiles siguientes a la vuelta, se cobra desde el día siguiente; pasados 6 meses, lo deniegan. Y quien vuelve con 65 años o más y sin ingresos puede tener una pensión asistencial por ancianidad.\n\nTienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "imagenLista": "publicacion/redes/banco/cifras/retornados-fb.png",
  "fecha": "2027-01-03",
  "hora": "11:00",
  "nota": "Lleva importes de 2026: compruébalos en la guía antes de publicar, porque en enero cambian con la subida."
 },
 {
  "id": "dependencia-canarias-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/dependencia/canarias/",
  "texto": "Dependencia en Canarias: si el Gobierno no contesta en seis meses, la solicitud se entiende concedida, algo que no pasa en la mayoría de las comunidades. Media real: 214 días desde la solicitud hasta la prestación (293 en España).\n\njubilometro.com/dependencia-canarias/x",
  "fecha": "2027-01-04",
  "hora": "09:00"
 },
 {
  "id": "pedir-dependencia-fb",
  "red": "facebook",
  "pilar": "Trámites sin líos",
  "fuente": "/dependencia/solicitar-dependencia/",
  "texto": "Cómo se pide la dependencia para un familiar, paso a paso.\n\n1. La solicitud se presenta en los servicios sociales de tu comunidad autónoma, por internet o en persona. Los servicios sociales del ayuntamiento suelen ayudar a rellenarla.\n2. Hace falta, sobre todo, el DNI y un informe de salud en el modelo oficial, que hace el médico. Según la comunidad, también el empadronamiento, un informe social y datos económicos.\n3. Un profesional visita a la persona en su casa y aplica el baremo oficial.\n4. La comunidad reconoce el grado y, con el plan de atención, el servicio o la ayuda económica que le corresponde.\n\nTodo el proceso debe resolverse en seis meses, y pedirlo es gratis. Cuanto antes se presente, antes empieza a contar el plazo. Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "fecha": "2027-01-04",
  "hora": "11:00"
 },
 {
  "id": "lagunas-x",
  "red": "x",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/cuanto-cobrare/lagunas-de-cotizacion/",
  "texto": "Los meses sin cotizar dentro de tus últimos 25 años no cuentan como cero. Los 48 primeros se rellenan con la base mínima y el resto, con la mitad. Desde 2026, las asalariadas rellenan además los meses 49 a 60 al 100 % y del 61 al 84 al 80 %.\n\njubilometro.com/lagunas/x",
  "fecha": "2027-01-04",
  "hora": "13:30"
 },
 {
  "id": "bruta-neta-ig",
  "red": "instagram",
  "tipo": "Carrusel",
  "pilar": "La cifra que te toca",
  "fuente": "/cuanto-cobrare/pension-bruta-y-neta/",
  "diapositivas": [
   "¿Por qué llega menos pensión de la que pone la carta? Bruta y neta.",
   "La pensión que te reconocen es bruta. La Seguridad Social te retiene el IRPF y te ingresa la neta.",
   "Los pensionistas no pagan cotizaciones sociales: solo la retención.",
   "Sin retención: hasta 16.476 € brutos al año de pensión, si no tienes hijos a cargo.",
   "1.500 € al mes → en torno al 9 % de retención.",
   "2.000 € al mes → cerca del 17 % de retención.",
   "Puedes pedir una retención más alta para que no te salga a pagar en la renta.",
   "Guárdalo y calcula tu pensión neta en Jubilómetro (enlace en la biografía)."
  ],
  "texto": "Pensión bruta, retención del IRPF y pensión neta: lo que llega de verdad al banco. Calculadora en la biografía.\n\n#pensiones #irpf #jubilacion #seguridadsocial",
  "carrusel": "publicacion/redes/banco/carruseles/bruta-neta-ig/",
  "fecha": "2027-01-04",
  "hora": "19:00",
  "nota": "Lleva importes de 2026: compruébalos en la guía antes de publicar, porque en enero cambian con la subida."
 },
 {
  "id": "compensa-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/jubilacion/compensa-jubilarse-antes/",
  "texto": "¿Compensa jubilarse 2 años antes? Solo con las pensiones en la mano, lo cobrado de más se agota entre los 73 y los 79 años, según tu recorte. Desde ahí pierdes dinero cada año, y a los 65 quedan de media más de 19 años de vida.\n\njubilometro.com/compensa/x",
  "fecha": "2027-01-05",
  "hora": "09:00"
 },
 {
  "hasta": "2027-05-31",
  "red": "facebook",
  "pilar": "Calendario y avisos",
  "fuente": "/imserso/plazas-libres/",
  "texto": "¿Te quedaste sin viaje del Imserso el día que te tocaba reservar? Todavía hay opciones.\n\nDurante toda la temporada, de octubre de 2026 a junio de 2027, vuelven a la venta las plazas que otras personas cancelan o no pagan a tiempo, sobre todo unos 45 días antes de cada salida.\n\nPara encontrarlas: mira a menudo el buscador de turismosocial.es o mundicolor.es con tu DNI y tu clave, busca también desde otras provincias, sé flexible con el destino y las fechas, y apúntate a la lista de espera si la web te la ofrece. Solo necesitas estar acreditado.\n\nTienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "id": "mes1-32",
  "fecha": "2027-01-05",
  "hora": "11:00"
 },
 {
  "id": "abogado-x",
  "red": "x",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/incapacidad/abogado/",
  "texto": "Para pedir la incapacidad y para la reclamación previa no necesitas abogado. Para el juicio no es obligatorio, pero el INSS va con el suyo. Como beneficiario de la Seguridad Social tienes justicia gratuita, sin importar tus ingresos.\n\njubilometro.com/abogado-incapacidad/x",
  "fecha": "2027-01-05",
  "hora": "13:30"
 },
 {
  "id": "dependencia-cantabria-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/dependencia/cantabria/",
  "texto": "Dependencia en Cantabria: los impresos se recogen en tu centro de salud o en los servicios sociales de tu ayuntamiento, que te ayudan a rellenarlos. Lo resuelve el ICASS. Media real: 169 días desde la solicitud hasta la prestación, frente a 293 en España.\n\njubilometro.com/dependencia-cantabria/x",
  "fecha": "2027-01-06",
  "hora": "09:00"
 },
 {
  "id": "requisitos-viudedad-fb",
  "red": "facebook",
  "pilar": "Calcula tu caso",
  "fuente": "/viudedad/requisitos/",
  "texto": "Requisitos de la pensión de viudedad, explicados sin letra pequeña.\n\nLo que se mira es la situación de la persona fallecida. Tenía que estar trabajando (o cobrando el paro, por ejemplo) y tener 500 días cotizados en los últimos 5 años, o haber cotizado 15 años en total, o ser ya pensionista de jubilación o de incapacidad permanente. Si murió por un accidente o por una enfermedad profesional, no se exige ningún tiempo cotizado.\n\nPueden cobrarla el cónyuge, la pareja de hecho que cumpla los requisitos de convivencia (e inscripción, salvo que tengáis hijos en común) y el excónyuge que cobraba una pensión compensatoria.\n\nPara quien la cobra no hay límite de edad ni de ingresos, y es compatible con trabajar. Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "fecha": "2027-01-06",
  "hora": "11:00"
 },
 {
  "id": "cobro-x",
  "red": "x",
  "pilar": "Calendario y avisos",
  "fuente": "/cuanto-cobrare/calendario-pago-pensiones/",
  "texto": "La pensión se cobra a mes vencido: la Seguridad Social la paga como tarde el primer día hábil del mes siguiente, y nunca después del día 4. La mayoría de los bancos la adelantan, y suele llegar entre el 22 y el 26 del mismo mes.\n\njubilometro.com/cobro/x",
  "fecha": "2027-01-06",
  "hora": "13:30"
 },
 {
  "id": "trabajar-jubilado-ig",
  "red": "instagram",
  "tipo": "Carrusel",
  "pilar": "Calcula tu caso",
  "fuente": "/jubilacion/flexible-activa-o-parcial/",
  "diapositivas": [
   "Cobrar la pensión y trabajar a la vez: tres formas legales.",
   "Parcial: antes de jubilarte del todo, reduces jornada en tu empresa, hasta 3 años antes de tu edad ordinaria.",
   "La parcial anticipada pide 33 años cotizados, 6 años en la empresa y un contrato de relevo.",
   "Activa: si retrasas la jubilación al menos un año, trabajas y cobras del 45 % al 100 % de la pensión.",
   "El porcentaje de la activa sube 5 puntos por cada 12 meses seguidos trabajando.",
   "Flexible: ya jubilado, vuelves a trabajar del 33 % al 80 % de una jornada y cobras la pensión reducida.",
   "Si empiezas 6 meses después de jubilarte, la flexible suma un 15 % o un 25 % a lo que cobras.",
   "Guárdalo para cuando lo necesites. Cuál te conviene, en Jubilómetro (enlace en la biografía)."
  ],
  "texto": "Parcial, activa o flexible: cuál sirve para cada momento si quieres cobrar la pensión y seguir trabajando. Guía en la biografía.\n\n#jubilacion #pensiones #trabajar #seguridadsocial",
  "carrusel": "publicacion/redes/banco/carruseles/trabajar-jubilado-ig/",
  "fecha": "2027-01-06",
  "hora": "19:00"
 },
 {
  "id": "profesiones-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/jubilacion/anticipada-por-profesion/",
  "texto": "Bomberos, policías locales, mineros, trabajadores del mar o personal de vuelo tienen coeficientes reductores: se jubilan antes y sin recorte, porque el tiempo adelantado cuenta como cotizado. Con un coeficiente de 0,20, 5 años trabajados adelantan uno.\n\njubilometro.com/profesiones/x",
  "fecha": "2027-01-07",
  "hora": "09:00"
 },
 {
  "id": "porcentaje-fb",
  "red": "facebook",
  "pilar": "Calcula tu caso",
  "fuente": "/cuanto-cobrare/porcentaje-anos-cotizados/",
  "texto": "¿Qué porcentaje de pensión te corresponde por tus años cotizados? Esta es la escala para quien se jubila en 2027 o después.\n\nCon 15 años cotizados, el 50 % de la base reguladora. Con 20 años, el 61,40 %. Con 25, el 72,80 %. Con 30, el 84,20 %. Con 35, el 95,60 %. Y con 37 años, el 100 %.\n\nEn 2026 la escala era algo más suave: el 100 % llegaba con 36 años y 6 meses. Desde 2027 hace falta medio año más, y con los mismos años el porcentaje es alrededor de un punto menor.\n\nPor encima del 100 % no se gana nada, salvo que retrases la jubilación más allá de tu edad ordinaria: entonces cada año completo suma un 4 %. Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "imagenLista": "publicacion/redes/banco/cifras/porcentaje-fb.png",
  "fecha": "2027-01-07",
  "hora": "11:00"
 },
 {
  "id": "revision-grado-x",
  "red": "x",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/incapacidad/revision-grado/",
  "texto": "Pedir la revisión del grado de incapacidad tiene un riesgo: el INSS no está atado a lo que pides y puede bajarte de grado. La revisión se puede pedir desde la fecha que indica tu resolución, y solo hasta la edad de jubilación.\n\njubilometro.com/revision-grado/x",
  "fecha": "2027-01-07",
  "hora": "13:30"
 },
 {
  "id": "dependencia-castilla-la-mancha-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/dependencia/castilla-la-mancha/",
  "texto": "Dependencia en Castilla-La Mancha: la Junta tiene seis meses para resolver, que se quedan en tres si tienes más de 90 años. El informe de salud lo hace tu médico de atención primaria. Media real: 166 días hasta la prestación (293 en España).\n\njubilometro.com/dependencia-castilla-la-mancha/x",
  "fecha": "2027-01-08",
  "hora": "09:00"
 },
 {
  "id": "discapacidad-fb",
  "red": "facebook",
  "pilar": "Calcula tu caso",
  "fuente": "/jubilacion/anticipada-discapacidad/",
  "texto": "Hay dos formas de adelantar la jubilación por discapacidad, y en ninguna se recorta la pensión.\n\nCon una discapacidad del 65 % o más, tu edad de jubilación se reduce según los años que hayas trabajado con esa discapacidad, hasta un mínimo de 52 años.\n\nCon una discapacidad del 45 % o más causada por alguna de las enfermedades de una lista oficial, puedes jubilarte a los 56 años. Desde el 31 de julio de 2026 la lista incluye 11 patologías nuevas, entre ellas el párkinson, la enfermedad de Huntington y la enfermedad renal crónica en estadio G5.\n\nSi tú o alguien de tu familia tiene una de esas enfermedades, conviene revisarlo. Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "fecha": "2027-01-08",
  "hora": "11:00"
 },
 {
  "id": "subida-sola-x",
  "red": "x",
  "pilar": "Calendario y avisos",
  "fuente": "/cuanto-cobrare/revalorizacion-pensiones/",
  "hasta": "2027-01-31",
  "texto": "La subida de las pensiones de enero se aplica sola: no hay que pedirla. En 2027 será lo que haya subido de media el IPC de diciembre de 2025 a noviembre de 2026, y las mínimas y las no contributivas subirán algo más.\n\nCalcula la tuya: jubilometro.com/subida/x",
  "fecha": "2027-01-08",
  "hora": "13:30"
 },
 {
  "id": "tramites-ig",
  "red": "instagram",
  "tipo": "Carrusel",
  "pilar": "Trámites sin líos",
  "fuente": "/ayudas/tramites-online/",
  "diapositivas": [
   "Trámites por internet sin agobios: lo básico para mayores.",
   "Cl@ve: con la app en el móvil entras en la Seguridad Social y en Hacienda sin recordar contraseñas.",
   "Registrarte: por videollamada desde el móvil, con una carta que llega a casa o en una oficina con tu DNI.",
   "Sin Cl@ve: la vida laboral y los certificados de la pensión, con un código por SMS a tu móvil.",
   "La jubilación se puede pedir con tu correo, una foto del DNI y un selfi.",
   "Un familiar puede hacerlo por ti si le das permiso, hasta 5 años, y se lo puedes quitar cuando quieras.",
   "Si un SMS o un correo te parece un engaño, llama gratis al 017, de 8 de la mañana a 11 de la noche.",
   "Envíaselo a tus padres. La guía paso a paso, en Jubilómetro (enlace en la biografía)."
  ],
  "texto": "Cl@ve, SMS, apoderar a un familiar y el 017 contra los engaños: los trámites por internet, explicados para mayores. Guía en la biografía.\n\n#mayores #tramites #seguridadsocial #clave",
  "carrusel": "publicacion/redes/banco/carruseles/tramites-ig/",
  "fecha": "2027-01-08",
  "hora": "19:00"
 },
 {
  "id": "bomberos-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/jubilacion/bomberos/",
  "texto": "Un bombero con 25 años de servicio adelanta su jubilación 5 años, sin recorte en la pensión: el coeficiente es de 0,20 por año. Desde el 18 de septiembre de 2025 también lo tienen los bomberos forestales.\n\njubilometro.com/bomberos/x",
  "fecha": "2027-01-09",
  "hora": "10:00"
 },
 {
  "id": "denegada-fb",
  "red": "facebook",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/incapacidad/denegada/",
  "texto": "Si el INSS te deniega la incapacidad permanente, o te da un grado menor del que crees que te corresponde, no está todo perdido, pero hay que moverse rápido.\n\nTienes 30 días desde la notificación para presentar una reclamación previa ante el propio INSS. Si en 45 días no contesta o la rechaza, tienes otros 30 días para presentar una demanda en el Juzgado de lo Social.\n\nUn consejo importante: en el juicio solo se discuten los hechos que constan en el expediente, salvo los nuevos. Por eso conviene aportar todos tus informes médicos ya en la reclamación previa.\n\nPara el juicio no es obligatorio ir con abogado, aunque el INSS siempre va con el suyo. Tienes derecho a la justicia gratuita sin importar tus ingresos. Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "fecha": "2027-01-09",
  "hora": "11:00"
 },
 {
  "id": "incapacidad-jubilacion-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/incapacidad/incapacidad-y-jubilacion/",
  "texto": "A los 67 años, la pensión de incapacidad permanente pasa a llamarse de jubilación, sin ningún otro cambio: ni la cuantía ni las condiciones. Y si tienes derecho a las dos del mismo régimen, cobras una sola, la más alta.\n\njubilometro.com/incapacidad-jubilacion/x",
  "fecha": "2027-01-10",
  "hora": "10:00"
 },
 {
  "red": "facebook",
  "pilar": "La cifra que te toca",
  "fuente": "/ayudas/bono-social-electrico/",
  "texto": "Bono social eléctrico para pensionistas: un descuento del 35 % en la factura de la luz (50 % para los vulnerables severos), sobre un consumo máximo al año.\n\nLos pensionistas tienen una vía propia: tienen derecho si todas las personas de la casa con ingresos cobran la pensión mínima de jubilación o de incapacidad permanente y no tienen otros ingresos de más de 500 euros al año. También se puede tener por renta baja: 12.600 euros al año si vives solo en 2026.\n\nHace falta tener la tarifa regulada (PVPC) con una comercializadora de referencia. Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "id": "mes1-48",
  "fecha": "2027-01-10",
  "hora": "11:00",
  "nota": "Lleva importes de 2026: compruébalos en la guía antes de publicar, porque en enero cambian con la subida."
 },
 {
  "id": "dependencia-castilla-y-leon-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/dependencia/castilla-y-leon/",
  "texto": "Dependencia en Castilla y León: se pide en tu CEAS, y el grado y las ayudas se resuelven casi siempre a la vez. Por eso es de las más rápidas: 120 días de media desde la solicitud hasta la prestación, frente a 293 en España.\n\njubilometro.com/dependencia-castilla-y-leon/x",
  "fecha": "2027-01-11",
  "hora": "09:00"
 },
 {
  "id": "reclamar-dependencia-fb",
  "red": "facebook",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/dependencia/reclamar-dependencia/",
  "texto": "Pidieron la dependencia para su madre hace un año y siguen sin respuesta. Es una situación muy frecuente, y hay forma de moverla.\n\nLa Administración tiene seis meses desde la solicitud para reconocer el grado y la ayuda. Si se pasa, el derecho empieza a contar igualmente desde el final de esos seis meses, y se puede reclamar: primero con un escrito pidiendo que resuelvan, después con un recurso y, si hace falta, con una queja al Defensor del Pueblo o ante los tribunales.\n\nSi ya hay resolución pero no estáis de acuerdo con el grado o con la ayuda, se puede recurrir, normalmente en un mes. La propia resolución dice qué recurso cabe y ante quién.\n\nY si la persona empeora, no hace falta recurrir: se pide la revisión del grado. Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "fecha": "2027-01-11",
  "hora": "11:00"
 },
 {
  "red": "x",
  "pilar": "Calendario y avisos",
  "fuente": "/cuanto-cobrare/certificado-pension/",
  "texto": "El certificado de tu pensión se descarga gratis y al momento en la sede de la Seguridad Social, con Cl@ve, certificado digital o un SMS a tu móvil.\n\nCon un acceso tienes todos: resumido, desglosado, de retenciones de IRPF, de revalorización…\n\njubilometro.com/certificado/x",
  "id": "mes1-61",
  "fecha": "2027-01-11",
  "hora": "13:30"
 },
 {
  "id": "espera-ig",
  "red": "instagram",
  "tipo": "Carrusel",
  "pilar": "Calcula tu caso",
  "fuente": "/dependencia/tiempos-dependencia/",
  "diapositivas": [
   "¿Cuánto tarda la dependencia en tu comunidad? Los datos reales del Imserso.",
   "España: 293 días de media de la solicitud a la prestación, aunque la ley da seis meses.",
   "Las más rápidas: Aragón, 109 días; Castilla y León, 120; La Rioja y País Vasco, 130.",
   "Por debajo de la media: Castilla-La Mancha, 166; Cantabria, 169; Baleares, 188; Canarias, 214; Navarra, 228.",
   "Cerca de la media: Cataluña, 261; Extremadura, 277; Comunitat Valenciana, 297; Galicia, 307.",
   "Las más lentas: Madrid, 327; Andalucía, 402; Asturias, 413; Región de Murcia, 529.",
   "Si pasan seis meses sin resolución, tu derecho empieza a contar desde entonces.",
   "Guárdalo y mira la guía de tu comunidad en Jubilómetro (enlace en la biografía)."
  ],
  "texto": "De 109 días en Aragón a 529 en la Región de Murcia: lo que tarda de verdad la dependencia en cada comunidad. Guías por comunidad en la biografía.\n\n#dependencia #mayores #cuidados #imserso",
  "carrusel": "publicacion/redes/banco/carruseles/espera-ig/",
  "fecha": "2027-01-11",
  "hora": "19:00"
 },
 {
  "id": "policia-local-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/jubilacion/policia-local/",
  "texto": "Policía local: cada año de servicio rebaja la edad de jubilación 0,20 años, hasta 5 años antes (6 con 37 años de servicio). Hace falta haber trabajado 15 años como policía local, y la pensión no se recorta.\n\njubilometro.com/policia-local/x",
  "fecha": "2027-01-12",
  "hora": "09:00"
 },
 {
  "id": "pedir-viudedad-fb",
  "red": "facebook",
  "pilar": "Trámites sin líos",
  "fuente": "/viudedad/solicitar-viudedad/",
  "texto": "Si acabas de perder a tu pareja, este es el plazo que más importa: pide la pensión de viudedad en los tres meses siguientes al fallecimiento.\n\nEl derecho no caduca, pero solo se pagan con efectos retroactivos los tres meses anteriores a la solicitud. Si la pides al cuarto mes, pierdes uno; si la pides al año, pierdes nueve.\n\nSe pide al INSS por internet, en la sede electrónica de la Seguridad Social, o en una oficina con cita previa. En la misma solicitud se piden la orfandad de los hijos y el auxilio por defunción. El INSS tiene 90 días para contestar; si no lo hace, se entiende denegada y puedes reclamar.\n\nSi conoces a alguien en esta situación, puede que le ayude saberlo. Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "fecha": "2027-01-12",
  "hora": "11:00"
 },
 {
  "id": "dependencia-cataluna-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/dependencia/cataluna/",
  "texto": "Dependencia en Cataluña: la media real fue de 198 días hasta el grado y 261 hasta la prestación, y es la comunidad con más personas esperando seis meses o más: 40.624. Se puede pedir en línea con idCAT Mòbil.\n\njubilometro.com/dependencia-cataluna/x",
  "fecha": "2027-01-12",
  "hora": "13:30"
 },
 {
  "red": "x",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/cuanto-cobrare/informe-vida-laboral/",
  "texto": "Revisa tu vida laboral años antes de jubilarte. Un periodo trabajado que no aparece te quita años cotizados y rebaja tu pensión.\n\nSe pide gratis en Import@ss, también con un SMS, o te la mandan a casa. Si hay un error, se puede pedir que lo corrijan.\n\njubilometro.com/vida-laboral/x",
  "id": "mes1-83",
  "fecha": "2027-01-13",
  "hora": "09:00"
 },
 {
  "id": "cobro-fb",
  "red": "facebook",
  "pilar": "Calendario y avisos",
  "fuente": "/cuanto-cobrare/calendario-pago-pensiones/",
  "texto": "«¿Por qué a mi vecina le llega la pensión antes que a mí?» Porque cada banco decide si adelanta el pago y qué día.\n\nLa Seguridad Social paga la pensión a mes vencido: la de cada mes, como tarde, el primer día hábil del mes siguiente, y nunca después del día 4. La mayoría de los bancos la adelantan, y el dinero suele llegar entre el 22 y el 26 del mismo mes.\n\nSe cobran 14 pagas: las doce mensuales y dos extra, que llegan con la pensión de junio y con la de noviembre. Las pensiones por accidente de trabajo o enfermedad profesional se cobran en 12 pagas, con las extra repartidas. Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "fecha": "2027-01-13",
  "hora": "11:00"
 },
 {
  "id": "policias-autonomicas-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/jubilacion/policias-autonomicas/",
  "texto": "Mossos d'Esquadra, Ertzaintza y Policía Foral: cada año de servicio rebaja la edad de jubilación 0,20 años, sin recorte en la pensión. El límite es la edad: nunca antes de los 60, o de los 59 con 35 años en el cuerpo.\n\njubilometro.com/policias-autonomicas/x",
  "fecha": "2027-01-13",
  "hora": "13:30"
 },
 {
  "id": "sueldo-ig",
  "red": "instagram",
  "tipo": "Carrusel",
  "pilar": "Calcula tu caso",
  "fuente": "/cuanto-cobrare/pension-segun-sueldo/",
  "diapositivas": [
   "¿Cuánto cobraré de pensión con mi sueldo? Una regla para hacerte una idea.",
   "Lo que cuenta es tu base de cotización: el sueldo bruto con las pagas extra repartidas en 12 meses.",
   "Con 37 años cotizados por la misma base, la pensión al mes es 6/7 de esa base.",
   "1.500 € de base → 1.286 € de pensión al mes.",
   "2.000 € de base → 1.714 € de pensión al mes.",
   "3.000 € de base → 2.571 € de pensión al mes.",
   "Pensión máxima: 3.359,60 € al mes en 2026, con una base de 3.919,53 € o más.",
   "Guárdalo y haz tus cuentas en Jubilómetro (enlace en la biografía)."
  ],
  "texto": "Con 37 años cotizados por la misma base, tu pensión mensual es 6/7 de esa base. Ejemplos y calculadora, con el enlace de la biografía.\n\n#pensiones #jubilacion #sueldo #seguridadsocial",
  "carrusel": "publicacion/redes/banco/carruseles/sueldo-ig/",
  "fecha": "2027-01-13",
  "hora": "19:00",
  "nota": "Lleva importes de 2026: compruébalos en la guía antes de publicar, porque en enero cambian con la subida."
 },
 {
  "id": "dependencia-comunitat-valenciana-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/dependencia/comunitat-valenciana/",
  "texto": "Dependencia en la Comunitat Valenciana: si pasan seis meses sin resolución, la solicitud se entiende estimada y la prestación se paga con atrasos, según la Generalitat. Se pide en los servicios sociales de tu ayuntamiento. Media real: 297 días.\n\njubilometro.com/dependencia-comunitat-valenciana/x",
  "fecha": "2027-01-14",
  "hora": "09:00"
 },
 {
  "id": "compensa-fb",
  "red": "facebook",
  "pilar": "Calcula tu caso",
  "fuente": "/jubilacion/compensa-jubilarse-antes/",
  "texto": "¿Compensa jubilarse antes? Hicimos las cuentas con las pensiones en la mano.\n\nSi adelantas tu jubilación 2 años, cobras antes, pero con un recorte para toda la vida. Lo que cobras de más en esos dos años se agota entre los 73 y los 79 años, según tu recorte. A partir de ahí, cada año pierdes dinero. Y a los 65 años la esperanza de vida supera los 19 años en los hombres y los 23 en las mujeres.\n\nAun así, puede compensar si no vas a tener otros ingresos hasta tu edad ordinaria, si tu salud lo aconseja o si necesitas el dinero ahora. Y casi nunca compensa si te faltan pocos meses para llegar a 38 años y 6 meses cotizados, porque con ellos te jubilas a los 65 sin recorte.\n\nTienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "fecha": "2027-01-14",
  "hora": "11:00"
 },
 {
  "id": "policia-nacional-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/jubilacion/policia-nacional/",
  "texto": "Policía Nacional: la segunda actividad no es la jubilación. En la escala básica se puede pedir desde los 58 años y sigues cobrando las retribuciones básicas y el 80 % de las complementarias generales. La jubilación forzosa llega a los 65.\n\njubilometro.com/policia-nacional/x",
  "fecha": "2027-01-14",
  "hora": "13:30"
 },
 {
  "id": "dependencia-extremadura-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/dependencia/extremadura/",
  "texto": "Dependencia en Extremadura: la solicitud es el único papel obligatorio. Si autorizas la consulta, la Junta obtiene sola tu informe de salud, tu padrón y tus datos económicos. Media real: 277 días desde la solicitud hasta la prestación (293 en España).\n\njubilometro.com/dependencia-extremadura/x",
  "fecha": "2027-01-15",
  "hora": "09:00"
 },
 {
  "red": "facebook",
  "pilar": "Familias y cuidados",
  "fuente": "/dependencia/grados/",
  "texto": "¿Cómo se decide el grado de dependencia? Con un baremo oficial que puntúa de 0 a 100 cuánta ayuda necesita la persona para comer, asearse, vestirse, moverse, cuidar su salud o hacer las tareas de casa.\n\nMenos de 25 puntos: sin grado.\nDe 25 a 49: grado I, dependencia moderada.\nDe 50 a 74: grado II, dependencia severa.\nDe 75 a 100: grado III, gran dependencia.\n\nA más grado, más horas de ayuda a domicilio y ayudas más altas. Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "id": "mes1-54",
  "fecha": "2027-01-15",
  "hora": "11:00"
 },
 {
  "id": "militares-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/jubilacion/militares/",
  "texto": "Militares de carrera: oficiales y suboficiales pasan a la reserva a los 61 años, y la tropa y marinería permanente, a los 58. El retiro, que es la jubilación, llega a los 65, o desde los 60 con 30 años de servicio si lo pides.\n\njubilometro.com/militares/x",
  "fecha": "2027-01-15",
  "hora": "13:30"
 },
 {
  "id": "pedir-jubilacion-ig",
  "red": "instagram",
  "tipo": "Carrusel",
  "pilar": "Trámites sin líos",
  "fuente": "/jubilacion/solicitar-jubilacion-internet/",
  "diapositivas": [
   "Pedir la jubilación por internet: sin cita y sin certificado digital.",
   "Con Cl@ve, certificado o DNI electrónico: en el área Tu Seguridad Social.",
   "Sin certificado: en la sede electrónica, con tu correo, una foto del DNI y un selfi.",
   "Cuándo: en los 3 meses anteriores o posteriores a la fecha en que dejes de trabajar.",
   "Así cobras desde el día siguiente al cese, sin perder ningún mes.",
   "Papeles: casi siempre basta con el DNI, la cuenta del banco y la solicitud.",
   "La Seguridad Social tiene 90 días para resolver. En septiembre de 2026 tardó de media 9,63 días.",
   "Guárdalo para el día que te toque. Paso a paso en Jubilómetro (enlace en la biografía)."
  ],
  "texto": "Pedir la jubilación por internet es más sencillo de lo que parece, incluso sin certificado digital. Paso a paso en la guía de la biografía.\n\n#jubilacion #pensiones #seguridadsocial #tramites",
  "carrusel": "publicacion/redes/banco/carruseles/pedir-jubilacion-ig/",
  "fecha": "2027-01-15",
  "hora": "19:00"
 },
 {
  "id": "dependencia-la-rioja-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/dependencia/la-rioja/",
  "texto": "Dependencia en La Rioja: el informe de salud lo rellena tu médico de atención primaria, y la valoración la hace el Centro de Valoración de la Discapacidad y la Dependencia. Media real: 130 días hasta la prestación, de las más rápidas de España.\n\njubilometro.com/dependencia-la-rioja/x",
  "fecha": "2027-01-16",
  "hora": "10:00"
 },
 {
  "id": "divorcio-fb",
  "red": "facebook",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/viudedad/divorcio-separacion/",
  "texto": "¿Cobras viudedad si tu exmarido o tu exmujer fallece? Depende sobre todo de una cosa: la pensión compensatoria.\n\nSi estabas divorciado o separado judicialmente, tienes derecho a la viudedad solo si cobrabas una pensión compensatoria que se extingue con su muerte. La viudedad no puede ser mayor que esa compensatoria. Y no puedes haberte vuelto a casar ni tener una pareja de hecho.\n\nHay dos excepciones. Las víctimas de violencia de género no necesitan la pensión compensatoria. Y quien se divorció o se separó antes de 2008 puede cobrarla sin ella si tiene 65 años o más y estuvo casado al menos 15 años. Desde el 21 de octubre de 2026, aunque cobre otra pensión pública.\n\nSi tu ex se volvió a casar, la pensión se reparte según el tiempo vivido con cada uno, y el cónyuge actual se queda al menos el 40 %. Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "fecha": "2027-01-16",
  "hora": "11:00"
 },
 {
  "id": "funcionarios-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/jubilacion/funcionarios/",
  "texto": "Funcionarios del Estado: si entraste antes del 1 de enero de 2011, tu pensión es de Clases Pasivas (desde los 60 años con 30 de servicio, y el 100 % con 35). Si entraste después, es de la Seguridad Social, como la del resto.\n\njubilometro.com/funcionarios/x",
  "fecha": "2027-01-17",
  "hora": "10:00"
 },
 {
  "id": "vida-laboral-fb",
  "red": "facebook",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/cuanto-cobrare/informe-vida-laboral/",
  "texto": "Un consejo que ahorra disgustos: revisa tu vida laboral años antes de jubilarte, no el mes de antes.\n\nEl informe de vida laboral recoge todas tus altas y bajas en la Seguridad Social. Si falta un periodo trabajado (un verano en una fábrica, un contrato de los años 80, una empresa que cerró), pierdes años cotizados y puede bajar tu base reguladora.\n\nSe pide gratis en el portal Import@ss con Cl@ve, certificado, DNI electrónico o un SMS al móvil, y también se puede pedir que te lo manden a casa por correo. Si encuentras un error, se pide la rectificación en la sede de la Seguridad Social, con nóminas, contratos o cualquier papel que lo pruebe.\n\nCuanto antes lo revises, más fácil es encontrar esos papeles. Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "fecha": "2027-01-17",
  "hora": "11:00"
 },
 {
  "id": "dependencia-madrid-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/dependencia/madrid/",
  "texto": "Dependencia en la Comunidad de Madrid: se pide por internet o en los servicios sociales de tu ayuntamiento o junta de distrito, con un informe de salud de menos de tres meses. Media real: 327 días desde la solicitud hasta la prestación (293 en España).\n\njubilometro.com/dependencia-madrid/x",
  "fecha": "2027-01-18",
  "hora": "09:00"
 },
 {
  "id": "profesiones-fb",
  "red": "facebook",
  "pilar": "Calcula tu caso",
  "fuente": "/jubilacion/anticipada-por-profesion/",
  "texto": "Algunas profesiones especialmente penosas o peligrosas permiten jubilarse antes sin perder pensión. Funcionan con coeficientes reductores: por cada año trabajado en ellas, la edad de jubilación baja una fracción de año. Con un coeficiente de 0,20, cada 5 años trabajados adelantan un año la jubilación.\n\nA diferencia de la jubilación anticipada voluntaria, no hay recorte: el tiempo adelantado cuenta como cotizado para calcular la pensión.\n\nLos tienen, entre otros, los bomberos (también los forestales desde septiembre de 2025), los policías locales, los mineros, los trabajadores del mar y el personal de vuelo.\n\n¿Tu profesión tiene coeficiente reductor? Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "fecha": "2027-01-18",
  "hora": "11:00"
 },
 {
  "id": "mar-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/jubilacion/regimen-del-mar/",
  "texto": "Trabajadores del mar: coeficientes de 0,15 a 0,40 por año según el barco, con hasta 10 años de adelanto y sin recorte. 25 años en un arrastrero de más de 250 toneladas adelantan la jubilación 8 años y 9 meses.\n\njubilometro.com/mar/x",
  "fecha": "2027-01-18",
  "hora": "13:30"
 },
 {
  "id": "grado-discapacidad-ig",
  "red": "instagram",
  "tipo": "Carrusel",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/dependencia/grado-discapacidad/",
  "diapositivas": [
   "Grado de discapacidad: lo que cambia con un 33 % y con un 65 %.",
   "Lo reconoce tu comunidad tras una valoración, y vale desde el día en que lo pides.",
   "33 %: se te considera persona con discapacidad, en toda España.",
   "IRPF: con un 33 %, tu mínimo sube 3.000 € al año.",
   "65 %: el mínimo sube 9.000 €, más otros 3.000 por gastos de asistencia.",
   "Con un 65 % puedes tener derecho a la pensión no contributiva de invalidez.",
   "La comunidad tiene seis meses para resolver. Dependencia y discapacidad son trámites distintos.",
   "Guárdalo y pídelo si te corresponde. La guía, en Jubilómetro (enlace en la biografía)."
  ],
  "texto": "Con un 33 % de discapacidad pagas menos IRPF, y con un 65 %, bastante menos. Cómo se pide, en la guía de la biografía.\n\n#discapacidad #irpf #mayores #ayudas",
  "carrusel": "publicacion/redes/banco/carruseles/grado-discapacidad-ig/",
  "fecha": "2027-01-18",
  "hora": "19:00",
  "nota": "Lleva importes de 2026: compruébalos en la guía antes de publicar, porque en enero cambian con la subida."
 },
 {
  "id": "dependencia-murcia-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/dependencia/murcia/",
  "texto": "Dependencia en la Región de Murcia: la media real fue de 529 días desde la solicitud hasta la prestación, la más larga de España. Si pasan seis meses sin respuesta, tu derecho cuenta igualmente desde entonces y puedes reclamar.\n\njubilometro.com/dependencia-murcia/x",
  "fecha": "2027-01-19",
  "hora": "09:00"
 },
 {
  "red": "facebook",
  "pilar": "Familias y cuidados",
  "fuente": "/dependencia/ayuda-a-domicilio/",
  "texto": "Ayuda a domicilio para mayores: con la dependencia reconocida, la ley fija entre 20 y 94 horas al mes según el grado. De 20 a 37 en el grado I, de 38 a 64 en el grado II y de 65 a 94 en el grado III.\n\nLas auxiliares ayudan con el aseo, la comida, vestirse y moverse, y con las tareas de casa. Se paga una parte según los ingresos, y nadie se queda sin el servicio por no tener dinero. Sin grado de dependencia, muchos ayuntamientos lo ofrecen como servicio social.\n\nTienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "id": "mes1-85",
  "fecha": "2027-01-19",
  "hora": "11:00"
 },
 {
  "id": "agrarios-x",
  "red": "x",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/jubilacion/agrarios/",
  "texto": "Jornaleros del campo: se jubilan a la misma edad que el resto, pero con reglas propias. La que más sorprende: los meses sin cotizar no se rellenan al calcular la pensión, y hay que estar al día en las cuotas de los meses sin trabajo.\n\njubilometro.com/agrarios/x",
  "fecha": "2027-01-19",
  "hora": "13:30"
 },
 {
  "id": "dependencia-navarra-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/dependencia/navarra/",
  "texto": "Dependencia en Navarra: se empieza en tu servicio social de base (en Pamplona, la unidad de barrio), y la ley foral da tres meses para el grado. Media real: 146 días hasta el grado y 228 hasta la prestación, frente a 293 en España.\n\njubilometro.com/dependencia-navarra/x",
  "fecha": "2027-01-20",
  "hora": "09:00"
 },
 {
  "red": "facebook",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/viudedad/pareja-de-hecho/",
  "texto": "Pensión de viudedad si no estabais casados: las parejas de hecho la cobran en las mismas condiciones que un matrimonio si cumplen dos requisitos.\n\nEstar inscritas en un registro de parejas de hecho (o en documento público) al menos dos años antes del fallecimiento, y haber convivido cinco años seguidos justo antes, acreditado con el empadronamiento. Si tenéis hijos en común, desde el 21 de octubre de 2026 bastan dos años de convivencia, sin inscripción.\n\nDesde 2022 no hay límite de ingresos. Y si no llegáis a los dos años de inscripción, se puede cobrar una prestación temporal de viudedad durante dos años. Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "id": "mes1-92",
  "fecha": "2027-01-20",
  "hora": "11:00"
 },
 {
  "id": "empleadas-hogar-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/jubilacion/empleadas-de-hogar/",
  "texto": "Empleadas de hogar: se jubilan con las mismas reglas que cualquier asalariado, con al menos 15 años cotizados. Desde 2023, el alta y la cotización corren siempre a cargo de la familia empleadora, aunque trabajes pocas horas.\n\njubilometro.com/empleadas-hogar/x",
  "fecha": "2027-01-20",
  "hora": "13:30"
 },
 {
  "red": "instagram",
  "tipo": "Carrusel",
  "pilar": "La cifra que te toca",
  "fuente": "/cuanto-cobrare/pension-minima/",
  "diapositivas": [
   "Pensión mínima de jubilación 2026 (desde los 65 años).",
   "Con cónyuge a cargo: 1.256,60 € al mes.",
   "Si vives solo: 936,20 € al mes.",
   "Con cónyuge que no está a cargo: 888,70 € al mes.",
   "Todo en 14 pagas.",
   "No es una pensión aparte: si la tuya no llega, se completa con el complemento a mínimos.",
   "Requisitos: vivir en España y no pasar de 9.442 € al año de otros ingresos (11.013 € con cónyuge a cargo).",
   "Guía completa en Jubilómetro (enlace en la biografía)."
  ],
  "texto": "Las pensiones mínimas de 2026, en una imagen. En enero subirán más que el resto. Guía en la biografía.\n\n#pensionminima #pensiones #jubilacion #seguridadsocial",
  "id": "mes1-45",
  "carrusel": "publicacion/redes/kit/carruseles/2026-10-23-pension-minima/",
  "fecha": "2027-01-20",
  "hora": "19:00",
  "nota": "Lleva importes de 2026: compruébalos en la guía antes de publicar, porque en enero cambian con la subida."
 },
 {
  "id": "dependencia-pais-vasco-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/dependencia/pais-vasco/",
  "texto": "Dependencia en el País Vasco: la valora y la resuelve la diputación foral de tu territorio, y se empieza en los servicios sociales de base de tu ayuntamiento. Media real: 130 días hasta la prestación, de las más rápidas de España.\n\njubilometro.com/dependencia-pais-vasco/x",
  "fecha": "2027-01-21",
  "hora": "09:00"
 },
 {
  "id": "certificado-fb",
  "red": "facebook",
  "pilar": "Trámites sin líos",
  "fuente": "/cuanto-cobrare/certificado-pension/",
  "texto": "El banco, el ayuntamiento o una residencia te piden el certificado de tu pensión. Se saca gratis y al momento por internet, sin ir a ninguna oficina.\n\nEstá en la sede electrónica de la Seguridad Social, en el certificado integral de prestaciones. Puedes entrar con certificado digital, con Cl@ve o con un código por SMS, si la Seguridad Social tiene tu móvil.\n\nCon un solo acceso descargas todos los modelos: el resumido o el desglosado con lo que cobras, uno sin importes, el de retenciones del IRPF para la declaración de la renta, el de revalorización del año y, si no cobras nada, el de no pensionista.\n\nSi te cuesta, puede hacerlo un familiar con tu permiso. Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "fecha": "2027-01-21",
  "hora": "11:00"
 },
 {
  "id": "faltan-anos-x",
  "red": "x",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/jubilacion/faltan-anos-cotizados/",
  "texto": "¿Te faltan años cotizados? Antes de rendirte, mira cuatro cosas: seguir trabajando aunque sea a tiempo parcial, el convenio especial, recuperar prácticas y becas antiguas (hasta 5 años, con plazo hasta 2028) y los días por parto.\n\njubilometro.com/faltan-anos/x",
  "fecha": "2027-01-21",
  "hora": "13:30"
 },
 {
  "id": "pedir-dependencia-x",
  "red": "x",
  "pilar": "Trámites sin líos",
  "fuente": "/dependencia/solicitar-dependencia/",
  "texto": "La dependencia se pide gratis en los servicios sociales de tu comunidad, a menudo con ayuda de los de tu ayuntamiento. Lo básico: el DNI y un informe de salud en el modelo oficial. Después, un profesional valora a la persona en su casa.\n\njubilometro.com/pedir-dependencia/x",
  "fecha": "2027-01-22",
  "hora": "09:00"
 },
 {
  "id": "otro-pais-fb",
  "red": "facebook",
  "pilar": "Calcula tu caso",
  "fuente": "/jubilacion/trabajado-en-otro-pais/",
  "texto": "Muchos españoles trabajaron unos años fuera, en Alemania, Francia, Suiza o Venezuela, y no saben qué pasa con esos años al jubilarse.\n\nSi cotizaste en un país de la Unión Europea, del Espacio Económico Europeo, en Suiza, en el Reino Unido o en un país con convenio de Seguridad Social con España (la mayoría de Latinoamérica, entre otros), esos años se suman a los de España para cumplir los requisitos, como los 15 años mínimos.\n\nDespués, cada país paga su parte de la pensión en proporción a los años cotizados en él, y cada uno aplica su propia edad de jubilación. Los años trabajados en un país sin convenio no cuentan en España.\n\n¿Trabajaste fuera? Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "fecha": "2027-01-22",
  "hora": "11:00"
 },
 {
  "id": "pedir-jubilacion-x",
  "red": "x",
  "pilar": "Trámites sin líos",
  "fuente": "/jubilacion/solicitar-jubilacion-internet/",
  "texto": "Puedes pedir la jubilación por internet sin certificado digital: con tu correo, una foto del DNI y un selfi. Pídela en los 3 meses anteriores o posteriores a dejar de trabajar para cobrar desde el día siguiente al cese.\n\njubilometro.com/pedir-jubilacion/x",
  "fecha": "2027-01-22",
  "hora": "13:30"
 },
 {
  "id": "compensa-ig",
  "red": "instagram",
  "tipo": "Carrusel",
  "pilar": "Calcula tu caso",
  "fuente": "/jubilacion/compensa-jubilarse-antes/",
  "diapositivas": [
   "¿Compensa jubilarse antes? Las cuentas, con las pensiones en la mano.",
   "Si adelantas 2 años, cobras antes, pero con un recorte para toda la vida.",
   "Ese recorte va del 2,81 % al 21 %, según los meses que adelantes y tus años cotizados.",
   "Lo cobrado de más se agota entre los 73 y los 79 años.",
   "A partir de ahí, cada año pierdes dinero. A los 65, la esperanza de vida supera los 19 años en los hombres y los 23 en las mujeres.",
   "Puede compensar si no vas a tener otros ingresos, si tu salud lo aconseja o si necesitas el dinero ahora.",
   "Casi nunca compensa si te faltan pocos meses para llegar a 38 años y 6 meses cotizados.",
   "Guárdalo antes de decidir. Haz tus cuentas en Jubilómetro (enlace en la biografía)."
  ],
  "texto": "Jubilarse antes sale más caro de lo que parece en la mayoría de los casos. Las cuentas, en la guía de la biografía.\n\n#jubilacion #jubilacionanticipada #pensiones #seguridadsocial",
  "carrusel": "publicacion/redes/banco/carruseles/compensa-ig/",
  "fecha": "2027-01-22",
  "hora": "19:00"
 },
 {
  "id": "reclamar-dependencia-x",
  "red": "x",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/dependencia/reclamar-dependencia/",
  "texto": "Si la dependencia no se resuelve en seis meses, tu derecho empieza a contar igualmente desde ese día y puedes reclamar. Y si la persona empeora, no hace falta recurrir: se pide la revisión del grado en cualquier momento.\n\njubilometro.com/reclamar-dependencia/x",
  "fecha": "2027-01-23",
  "hora": "10:00"
 },
 {
  "red": "facebook",
  "pilar": "Familias y cuidados",
  "fuente": "/dependencia/convenio-cuidador/",
  "texto": "Para quien cuida de un familiar dependiente en casa: hay una forma de no perder años de cotización para tu propia jubilación.\n\nSi tu familiar cobra la prestación por cuidados en el entorno familiar y tú figuras como cuidador en su plan de atención, puedes firmar un convenio especial con la Seguridad Social. Cotizas sin pagar nada, porque la cuota la abona el Imserso: por la base mínima (1.424,40 euros al mes en 2026) si el grado es III, por una parte si es II y por la mitad si es I.\n\nPídelo en la Tesorería General de la Seguridad Social dentro de los 90 días siguientes a que se reconozca la prestación, para que cuente desde ese día. Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "id": "mes1-21",
  "fecha": "2027-01-23",
  "hora": "11:00",
  "nota": "Lleva importes de 2026: compruébalos en la guía antes de publicar, porque en enero cambian con la subida."
 },
 {
  "id": "documentos-x",
  "red": "x",
  "pilar": "Trámites sin líos",
  "fuente": "/jubilacion/documentos-jubilacion/",
  "texto": "Para una jubilación ordinaria suele bastar con el DNI, el número de cuenta y la solicitud: la Seguridad Social ya tiene tus cotizaciones. Te pedirán más papeles solo en casos concretos. Lista para imprimir:\n\njubilometro.com/documentos/x",
  "fecha": "2027-01-24",
  "hora": "10:00"
 },
 {
  "red": "facebook",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/viudedad/compatibilidad-trabajo/",
  "texto": "¿Se puede trabajar cobrando la viudedad? Sí: la pensión de viudedad es compatible con cualquier sueldo, por cuenta ajena o como autónomo, sin límite.\n\nLo que sí puedes perder al trabajar son los extras que dependen de los ingresos: el complemento a mínimos si tus otros ingresos pasan de 9.442 euros al año, el 60 % de los mayores de 65 (vuelves al 52 %) y el 70 % por cargas familiares si superas su límite.\n\nTienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "id": "mes1-26",
  "fecha": "2027-01-24",
  "hora": "11:00",
  "nota": "Lleva importes de 2026: compruébalos en la guía antes de publicar, porque en enero cambian con la subida."
 },
 {
  "id": "grados-dependencia-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/dependencia/grados/",
  "texto": "El grado de dependencia sale de un baremo de 0 a 100 puntos: con menos de 25 no hay grado; de 25 a 49, grado I; de 50 a 74, grado II, y de 75 a 100, grado III. A más grado, más horas de ayuda y ayudas más altas.\n\njubilometro.com/grados-dependencia/x",
  "fecha": "2027-01-25",
  "hora": "09:00"
 },
 {
  "red": "facebook",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/cuanto-cobrare/lagunas-de-cotizacion/",
  "texto": "¿Qué pasa con los meses que no cotizaste? Si caen dentro de los años que se usan para calcular tu pensión, no cuentan como cero: se rellenan.\n\nLos 48 primeros meses sin cotizar se rellenan con la base mínima de cada mes y el resto con el 50 %. Desde 2026, las trabajadoras por cuenta ajena rellenan además los meses 49 a 60 con el 100 % y los 61 a 84 con el 80 %, y lo mismo los hombres cuya carrera se vio afectada por el nacimiento de sus hijos.\n\nOjo: los meses rellenados mejoran la base reguladora, pero no suman años cotizados. Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "id": "mes1-60",
  "fecha": "2027-01-25",
  "hora": "11:00"
 },
 {
  "id": "otro-pais-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/jubilacion/trabajado-en-otro-pais/",
  "texto": "¿Trabajaste unos años en Alemania, Francia, Suiza o en Latinoamérica? Si el país es de la UE o tiene convenio con España, esos años se suman a los de aquí para llegar a los 15 mínimos. Después, cada país paga su parte.\n\njubilometro.com/otro-pais/x",
  "fecha": "2027-01-25",
  "hora": "13:30"
 },
 {
  "red": "instagram",
  "tipo": "Carrusel",
  "pilar": "La cifra que te toca",
  "fuente": "/cuanto-cobrare/complemento-brecha-genero/",
  "diapositivas": [
   "Madres pensionistas: el complemento que algunas no saben que tienen.",
   "Complemento de brecha de género: 36,90 € al mes por cada hijo (2026).",
   "Hasta cuatro hijos: 147,60 € al mes.",
   "En 14 pagas.",
   "Con pensión de jubilación, incapacidad permanente o viudedad.",
   "Los padres, solo si cumplen requisitos concretos y su pensión es menor que la de la madre.",
   "En enero sube lo mismo que las pensiones.",
   "Requisitos en Jubilómetro (enlace en la biografía)."
  ],
  "texto": "36,90 € al mes por cada hijo en la pensión. Compártelo con tu madre. Requisitos en la biografía.\n\n#pensiones #madres #jubilacion #seguridadsocial",
  "id": "mes1-89",
  "carrusel": "publicacion/redes/kit/carruseles/2026-11-06-complemento-brecha-genero/",
  "fecha": "2027-01-25",
  "hora": "19:00",
  "nota": "Lleva importes de 2026: compruébalos en la guía antes de publicar, porque en enero cambian con la subida."
 },
 {
  "id": "ayuda-domicilio-x",
  "red": "x",
  "pilar": "Calcula tu caso",
  "fuente": "/dependencia/ayuda-a-domicilio/",
  "texto": "Con la dependencia reconocida, la ayuda a domicilio va de 20 a 37 horas al mes en el grado I, de 38 a 64 en el grado II y de 65 a 94 en el grado III. Pagas una parte según tus ingresos, y nadie se queda sin ella por no tener dinero.\n\njubilometro.com/ayuda-domicilio/x",
  "fecha": "2027-01-26",
  "hora": "09:00"
 },
 {
  "id": "faltan-anos-fb",
  "red": "facebook",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/jubilacion/faltan-anos-cotizados/",
  "texto": "Si te faltan años para llegar a los 15 mínimos, a los 37 del 100 % o a los 38 años y 6 meses que permiten jubilarte a los 65, hay cuatro vías legales:\n\n1. Seguir trabajando, aunque sea a tiempo parcial.\n2. Firmar un convenio especial con la Seguridad Social y cotizar tú.\n3. Recuperar las prácticas y becas antiguas: hasta 5 años, con plazo hasta el 31 de diciembre de 2028.\n4. Revisar tu vida laboral: periodos que no aparecen, días por parto, cuidado de hijos o años cotizados en otros países.\n\nSi aun así no llegas a 15 años, la alternativa es la pensión no contributiva. Tienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "fecha": "2027-01-26",
  "hora": "11:00"
 },
 {
  "id": "cuanto-tarda-x",
  "red": "x",
  "pilar": "Trámites sin líos",
  "fuente": "/jubilacion/cuanto-tarda-jubilacion/",
  "texto": "¿Cuánto tarda la Seguridad Social en reconocer la jubilación? Tiene 90 días, pero en septiembre de 2026 la media fue de 9,63 días. Y si se retrasa, cobras los atrasos desde la fecha de efectos de tu pensión.\n\njubilometro.com/cuanto-tarda/x",
  "fecha": "2027-01-26",
  "hora": "13:30"
 },
 {
  "red": "x",
  "pilar": "Familias y cuidados",
  "fuente": "/dependencia/convenio-cuidador/",
  "texto": "Si cuidas en casa a tu madre o a tu padre y cobra la prestación por cuidados familiares de la dependencia, puedes seguir cotizando para tu jubilación sin pagar nada: la cuota la paga el Imserso.\n\nSe pide en la Tesorería en los 90 días siguientes. jubilometro.com/cuidador/x",
  "id": "mes1-20",
  "fecha": "2027-01-27",
  "hora": "09:00"
 },
 {
  "red": "facebook",
  "pilar": "La cifra que te toca",
  "fuente": "/cuanto-cobrare/pension-minima/",
  "texto": "Pensión mínima de jubilación en 2026, a partir de los 65 años, al mes y en 14 pagas:\n\nCon cónyuge a cargo: 1.256,60 euros.\nSi vives solo: 936,20 euros.\nCon cónyuge que no está a cargo: 888,70 euros.\n\nNo es una pensión aparte. Si tu pensión no llega a esa cifra, la Seguridad Social te paga la diferencia (el complemento a mínimos), siempre que vivas en España y tus otros ingresos no pasen de 9.442 euros al año, o de 11.013 euros si tienes cónyuge a cargo. En enero estas cuantías subirán más que el resto de pensiones.\n\nTienes la guía completa en la web de Jubilómetro: el enlace, en el primer comentario.",
  "id": "mes1-30",
  "fecha": "2027-01-27",
  "hora": "11:00",
  "nota": "Lleva importes de 2026: compruébalos en la guía antes de publicar, porque en enero cambian con la subida."
 },
 {
  "id": "prejubilacion-x",
  "red": "x",
  "pilar": "Errores que cuestan dinero",
  "fuente": "/jubilacion/prejubilacion/",
  "texto": "Si te despiden en un ERE con 55 años o más, la empresa debe pagarte un convenio especial con la Seguridad Social hasta los 63 (61 por causas económicas), para que sigas cotizando. Si no lo pide, tienes 6 meses para pedirlo tú.\n\njubilometro.com/prejubilacion/x",
  "fecha": "2027-01-27",
  "hora": "13:30"
 },
 {
  "id": "anticipada-ig",
  "red": "instagram",
  "tipo": "Carrusel",
  "pilar": "Calcula tu caso",
  "fuente": "/jubilacion/anticipada-voluntaria/",
  "diapositivas": [
   "Jubilarse antes: por decisión propia o tras un despido.",
   "Voluntaria: hasta 2 años antes de tu edad ordinaria, con 35 años cotizados.",
   "En 2027, desde los 65 años, o desde los 63 si llegas a 38 años y 6 meses cotizados.",
   "Recorte: del 2,81 % al 21 % de la pensión, para siempre, según los meses que adelantes.",
   "Involuntaria: hasta 4 años antes, tras un despido colectivo u objetivo.",
   "Pide 33 años cotizados y 6 meses inscrito como demandante de empleo.",
   "En 2027, desde los 63 años, o desde los 61 con 38 años y 6 meses cotizados. El recorte puede llegar al 30 %.",
   "Guárdalo antes de decidir. Calcula tu recorte en Jubilómetro (enlace en la biografía)."
  ],
  "texto": "Voluntaria o tras un despido: edades, años cotizados y recortes de la jubilación anticipada en 2027. Calculadora en la biografía.\n\n#jubilacion #jubilacionanticipada #pensiones #seguridadsocial",
  "carrusel": "publicacion/redes/banco/carruseles/anticipada-ig/",
  "fecha": "2027-01-27",
  "hora": "19:00"
 }
];

# Ficha SEO · Edad de jubilación en 2027

Artículo n.º 1 del plan de contenidos (categoría Jubilación, fase F1, intención informativa).
Estado: **borrador pendiente de revisión profesional**. Última revisión de datos: 27/09/2026.

## 1. Datos de publicación

| Campo | Valor |
|---|---|
| URL | `/jubilacion/edad-de-jubilacion/` (sin año: cada enero se actualiza el contenido y se conserva la URL) |
| Etiqueta `title` | Edad de jubilación en 2027: tabla por año de nacimiento (55 caracteres) |
| Meta description | En 2027 te jubilas a los 67 años, o a los 65 con 38 años y 6 meses cotizados. Tabla por año y mes de nacimiento, ejemplos y errores frecuentes. (143 caracteres) |
| H1 | Edad de jubilación en 2027: tabla por año de nacimiento y años cotizados |
| Palabra clave principal | edad de jubilación 2027 |
| Imagen destacada / `og:image` | `imagenes/edad-jubilacion-2013-2027.png` (1200 × 675). En el cuerpo se usa la versión `.webp` |
| Extensión | Unas 3.300 palabras (contando tablas), 4 tablas, 1 gráfico, 4 ejemplos, 8 preguntas frecuentes y calculadora |
| Próxima revisión | Enero de 2027, o antes si avanza la proposición de ley sobre anticipada con 40 años cotizados |

Variante de `title` para probar si el CTR es bajo tras 8-12 semanas: «Edad de jubilación 2027: ¿a qué edad te jubilas según tu año?».

## 2. Palabras clave

No hay acceso a una herramienta de volúmenes en esta sesión: el informe del nicho estima la familia «edad de jubilación (+ año)» en 30.000-70.000 búsquedas/mes con pico en enero. **Valida estas keywords en Google Keyword Planner o DinoRANK antes de publicar.**

| Tipo | Keywords | Dónde se cubren |
|---|---|---|
| Principal | edad de jubilación 2027 | `title`, H1, respuesta rápida, primer H2 |
| Secundarias | tabla edad de jubilación por año de nacimiento; edad de jubilación según año de nacimiento; años cotizados para jubilarse a los 65; jubilación a los 67 años | H2 de la tabla, tablas, FAQ |
| Long tail por año | a qué edad me jubilo si nací en 1960 / 1961 / 1962 / 1963 / 1964 / 1965 | Tabla por año, H3 de 1960, FAQ |
| Long tail situacional | jubilación 38 años y 6 meses cotizados; jubilarse en diciembre de 2026 o enero de 2027; ¿cuenta la mili para jubilarse?; jubilación anticipada 2027 edad mínima; 37 años cotizados 100 % | Secciones de cómputo, ejemplos, modalidades y porcentaje |

Preguntas reales que responde el artículo (formuladas como H3 en la FAQ o como H2): cuál es la edad en 2027, cuántos años hay que cotizar para los 65, qué pasa si nací en 1961/1962-1965, si puedo jubilarme a los 63, si cuenta la mili, qué pasa sin 15 años cotizados y si me pueden obligar a jubilarme a los 67.

## 3. Análisis de la competencia (SERP de septiembre de 2026)

Resultados que aparecen para «edad de jubilación 2027» y «tabla edad jubilación año de nacimiento»: BBVA Mi Jubilación, VidaCaixa, El Economista, Xataka, El Español, ¡Hola!, INEAF, Pluxee, Instituto Santalucía, Jubilistos y calculadora-jubilacion.com.

**El hueco que aprovechamos:** la mayoría de las tablas por año de nacimiento aplican a cada generación la edad del año en que cumple 65. Por eso publican que los nacidos en 1960 se jubilan a los 66 años y 8 meses y los de 1961 a los 66 años y 10 meses. Es incorrecto: la disposición transitoria 7.ª se aplica según el año del hecho causante. Con la regla correcta, los nacidos entre marzo y diciembre de 1960 y todos los de 1961 se jubilan a los 67 si no tienen la cotización larga. Solo Jubilistos y calculadora-jubilacion.com lo explican bien, y sin tabla por mes.

**Diferenciales frente a la competencia:**

1. Tabla por año **y mes** de nacimiento calculada con un script con tests (`herramientas/edad-jubilacion/`).
2. Explicación del error frecuente (H3 «Por qué los nacidos en 1960…»), que además genera enlaces y citas.
3. Cuatro ejemplos con fechas concretas, incluido el salto de diciembre de 2026 a enero de 2027, que ningún competidor trata con un caso.
4. Reglas de cómputo (años y meses completos, pagas extra, mili, subsidio de mayores de 52).
5. Datos oficiales frescos (edad media real de 65,4 años, septiembre de 2026) y novedades (RD 416/2026, proposición de ley de 22/09/2026).
6. Calculadora incrustada: interacción que un resumen de IA no sustituye.

## 4. Estructura on-page

```
H1 Edad de jubilación en 2027: tabla por año de nacimiento y años cotizados
   [Respuesta rápida: 2 párrafos, pensada para fragmentos destacados y AI Overviews]
H2 Datos clave de la jubilación en 2027                         (tabla)
H2 Tabla de edad de jubilación por año de nacimiento            (tabla + calculadora)
   H3 Por qué los nacidos en 1960 no se jubilan a los 66 años y 8 meses
H2 ¿Quién se jubila en 2027?                                    (+ dato oficial de edad media)
H2 Edad exigida según el año en que te jubilas: tabla oficial 2013-2027  (tabla + gráfico)
H2 Cómo se cuentan los 38 años y 6 meses cotizados
H2 Cuatro ejemplos con fechas para 2027
H2 ¿Puedes jubilarte antes o después de tu edad ordinaria?      (tabla)
H2 No confundas la edad con el porcentaje: 37 años para el 100 %
H2 Casos especiales
H2 ¿Va a cambiar la edad de jubilación después de 2027?
H2 Qué hacer si te jubilas en 2027                              (lista numerada)
H2 Preguntas frecuentes                                          (8 × H3)
H2 Fuentes oficiales · Siguiente paso · aviso legal · historial de cambios
```

Reglas aplicadas: un único H1; tablas en HTML real (con `caption` y `scope`), nunca como imagen; fecha de actualización visible con `<time>`; fuentes enlazadas en el punto donde se usa cada dato; aviso de que no sustituye al INSS.

## 5. Rastreo e indexación

- **Contenido rastreable sin JavaScript.** Todas las tablas y textos están en el HTML. La calculadora es una mejora progresiva: si el script no carga, el artículo no pierde nada.
- **Canónica** a la URL definitiva y `index, follow, max-image-preview:large` (necesario para imágenes grandes en Discover).
- **Migas de pan** visibles y marcadas con `BreadcrumbList`.
- **Imagen** de 1200 px de ancho, con `width`/`height` (evita CLS), `alt` descriptivo y `loading="lazy"` porque está por debajo del primer pantallazo.
- **Sitemap XML**: la URL debe entrar en el sitemap (los plugins SEO lo hacen solos).
- **Tras publicar**: Search Console → Inspección de URLs → Solicitar indexación. En las 48 horas siguientes, añade 3-5 enlaces internos hacia este artículo (portada, pilar de Jubilación y artículos con tráfico).
- **Sin páginas finas alrededor**: nada de etiquetas ni archivos de fecha indexables.
- **Seguimiento**: revisa en Search Console a las 2, 4 y 8 semanas las consultas «nacidos en 1960», «1961», «38 años y 6 meses» y el CTR del `title`.

## 6. Datos estructurados

`articulo.html` incluye un `@graph` con `Article`, `WebPage`, `BreadcrumbList`, `WebSite` y `Organization`.

- **Si usas Rank Math o Yoast, no pegues ese JSON-LD**: el plugin ya genera `Article` y `BreadcrumbList`, y duplicarlos crea conflictos. Configura en el plugin el autor real y la organización. El JSON-LD del HTML sirve de referencia o para una web estática (Astro).
- **Sin `FAQPage`**: desde agosto de 2023 Google solo muestra resultados enriquecidos de preguntas frecuentes a webs gubernamentales o sanitarias de autoridad reconocida. La FAQ sigue siendo útil para lectores y resúmenes de IA, pero el marcado no aporta.
- Cuando exista el revisor, añade en `WebPage` las propiedades `reviewedBy` (Person con nombre real) y `lastReviewed` (fecha ISO).
- Valida el resultado en la Prueba de resultados enriquecidos de Google y en validator.schema.org.

## 7. Enlazado interno

Enlaces que salen de este artículo. **Los que apuntan a páginas aún no publicadas deben quitarse (dejando el texto) o publicarse antes**: un enlace interno roto es peor que ninguno.

| Ancla | Destino | Estado |
|---|---|---|
| jubilación anticipada voluntaria (y sus coeficientes reductores) | `/jubilacion/anticipada-voluntaria/` | Pendiente (art. n.º 2, F1) |
| jubilación anticipada involuntaria | `/jubilacion/anticipada-involuntaria/` | Pendiente (art. n.º 3, F2) |
| jubilación demorada | `/jubilacion/demorada/` | Pendiente (art. n.º 5, F2) |
| jubilación flexible | `/jubilacion/flexible/` | Pendiente (art. n.º 6, F1) |
| cómo se calcula la pensión de jubilación (con el sistema dual / en 2026) | `/cuanto-cobrare/como-se-calcula-la-pension/` | Pendiente (art. n.º 22, F1) |
| porcentaje de pensión según los años cotizados | `/cuanto-cobrare/porcentaje-por-anos-cotizados/` | Pendiente (art. n.º 24, F1) |
| pensión no contributiva | `/ayudas/pension-no-contributiva/` | Pendiente (art. n.º 55, F1) |
| calculadora de edad de jubilación | `/calculadoras/edad-de-jubilacion/` | Pendiente (herramienta n.º 94, F1; puede reutilizar el widget ya construido) |
| Jubilación (miga de pan) | `/jubilacion/` | Pendiente (pilar) |
| Pau Lobato | `/sobre-nosotros/` | Pendiente |

Enlaces que deben apuntar hacia este artículo: portada (bloque de calculadora y «lo más consultado»), pilar `/jubilacion/`, calculadora de edad de jubilación, y los artículos de anticipada, demorada, porcentaje por años cotizados y subsidio de mayores de 52. Anclas recomendadas y variadas: «edad de jubilación en 2027», «tabla de jubilación por año de nacimiento», «a qué edad te jubilas según tu año de nacimiento».

## 8. Calculadora incrustada

- Código generado: `herramientas/edad-jubilacion/widget-calculadora.html` (no editar a mano; se regenera con `node herramientas/edad-jubilacion/construir.mjs`).
- En WordPress: bloque «HTML personalizado». En WordPress autoalojado, solo los administradores pueden guardar `<script>`. En WordPress.com, los planes sin plugins eliminan los scripts.
- Privacidad: el cálculo se hace en el navegador y no envía datos, así que no requiere consentimiento adicional.
- AdSense: ningún anuncio a menos de 150 px de los botones y campos de la calculadora (riesgo de clics accidentales con un público mayor).

## 9. Lista de comprobación antes de publicar

- [ ] Revisión del graduado social o abogado laboralista, con nombre y n.º de colegiado reales en la caja «Revisado por».
- [x] Autor (Pau Lobato) en el texto y en el JSON-LD; sin revisor. Correo de contacto: plobatoic@gmail.com.
- [ ] Confirmar el dominio definitivo (se ha usado `jubilometro.com` en canónica, OG y JSON-LD).
- [ ] Ajustar `datePublished`/`article:published_time` al día real de publicación.
- [ ] Quitar o activar los enlaces internos pendientes (sección 7).
- [ ] Comprobar que los anclajes del BOE (`#a205`, `#dtseptima`, `#dtnovena`) llevan al punto correcto.
- [ ] Repasar `verificacion-fuentes.md`: cada dato con su fuente.
- [ ] Subir la imagen en WebP (cuerpo) y PNG (OG), con el `alt` indicado.
- [ ] Probar la calculadora ya publicada con 2-3 casos de la tabla.

## 10. Plan de actualización

- **Enero de 2027**: cambiar «Actualizado el…», revisar que no haya cambios normativos y actualizar los datos de edad media con la última nota del Ministerio.
- **Si avanza la proposición de ley** de jubilación anticipada sin recortes con 40 años cotizados: actualizar la sección «¿Va a cambiar…?» y la tabla de modalidades.
- **Cada cambio** se anota en el «Historial de cambios» al pie del artículo.

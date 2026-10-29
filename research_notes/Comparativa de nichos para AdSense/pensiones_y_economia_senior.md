# Nicho pensiones / jubilación / economía sénior en España (referencia para comparar otros nichos)

*Nota de método (29-10-2026).* Además de búsquedas web, se lanzaron cuatro ejecuciones pequeñas en Apify. Primero, Google Search con `gl=es`, `hl=es` y escritorio, para 16 consultas con captura de AI Overview y anuncios. Segundo, volúmenes y CPC del Planificador de Palabras Clave de Google Ads para España en español, 45 palabras con serie mensual de octubre de 2025 a septiembre de 2026. Tercero, Google Trends España a 5 años, aunque solo se obtuvieron «jubilación» y «pensiones»: la ejecución se atascó y se abortó. Cuarto, estimaciones de Similarweb para 16 dominios. También se consultaron directamente las API de Eurostat (uso de internet por edad y población por edad). Los SERP son una sola foto, de escritorio, con un proxy que Google geolocalizó en Xàbia (Alicante); los AI Overviews pueden variar según el usuario, el dispositivo y el momento. Los CPC del Planificador vienen sin moneda explícita en la herramienta; **probablemente son USD**. Las cifras de Similarweb son modelos de estimación y suelen ser poco fiables para sitios pequeños.

## 1. ¿Qué tamaño tiene la audiencia? (pensiones y pensionistas, personas de 55 a 67 años, jubilaciones del baby boom, uso de internet de los mayores)

### Takeaway
La audiencia es enorme y estable. Hay unos 10,57 millones de pensiones contributivas y más de 9,5 millones de pensionistas (octubre de 2026), más de 10,1 millones de personas de 65 años o más y unos 8,8 millones de personas de 55 a 67 años en la antesala de la jubilación. Las cohortes del baby boom (nacidas entre 1958 y 1977) seguirán llegando a la jubilación hasta los años 2040. El 85,6 % de las personas de 65 a 74 años ya usa internet, y el 75 % lo hace a diario.

### Cited Findings
**Pensiones (Seguridad Social)**
- Octubre de 2026: la Seguridad Social abonó **10.565.782 pensiones contributivas** (un 1,6 % más que en octubre de 2025) a **más de 9,5 millones de personas**. La nómina ordinaria fue un récord de **14.539,9 millones de euros** (un 6,3 % más). La pensión media del sistema fue de **1.376,14 €/mes**, la de jubilación de **1.577,6 €** y la de viudedad de **976,7 €**. Las pensiones de jubilación suponen unos 10.692 millones de euros del gasto, casi tres cuartas partes. — [Artículo 14, 27-10-2026, que cita datos del Ministerio de Inclusión](https://www.articulo14.es/economia/record-gasto-pensiones-14540-millones-20261027.html). *Aviso: no se pudo abrir la nota oficial de octubre de 2026 (revista.seg-social.es devolvió 403 y la URL supuesta de La Moncloa daba 404). Es una sola fuente secundaria, pero sus cifras encajan con la serie oficial.*
- Octubre de 2025 (nota oficial, el último desglose por tipo obtenido): 10.397.372 pensiones y 9.405.352 pensionistas. Unos **6,6 millones de personas cobran jubilación** (pensión media de 1.510,1 €) y unos **1,5 millones de personas tienen la viudedad como pensión principal** (el 95,7 % son mujeres; media de 936,7 €). La nómina mensual de incapacidad permanente fue de 1.262,8 millones de euros, la de orfandad de 177,7 millones y la de favor de familiares de 36,6 millones. El complemento de brecha de género llega a 1.185.850 pensiones. — [La Moncloa, nota del 28-10-2025](https://www.lamoncloa.gob.es/serviciosdeprensa/notasprensa/inclusion/Paginas/2025/281025-pensiones-octubre.aspx)
- Flujo de nuevas jubilaciones: **274.843 altas de jubilación de enero a septiembre de 2025**, con una pensión media de alta de 1.675,6 €. El 26,9 % de las altas son anticipadas y el 11,2 % demoradas (4,8 % en 2019). La edad media de jubilación es de **65,3 años** (64,4 en 2019). — [La Moncloa, 28-10-2025](https://www.lamoncloa.gob.es/serviciosdeprensa/notasprensa/inclusion/Paginas/2025/281025-pensiones-octubre.aspx)
- Hay otra cifra que no coincide: la edad efectiva de acceso a la jubilación sería de 65,52 años en 2025 (64,13 en 2020). — [resumen de búsqueda sobre diariodeleon.es y theobjective.com](https://www.diariodeleon.es/economia/250926/2060955/medio-millon-baby-boomers-plantean-retrasar-jubilacion.html). *La diferencia con los 65,3 años oficiales probablemente se debe a la metodología o al periodo.*

**Demografía (INE y Eurostat)**
- Población a 1 de enero de 2025 (Eurostat, `demo_pjan`, España): total de 49.128.297 personas. **De 65 años o más: unos 10,18 millones** (10.161.587 entre 65 y 99 años, más 17.038 de 100 o más). **De 55 a 64: 7.002.766. De 55 a 67: 8.791.389. De 60 a 66: 4.539.263. De 65 a 74: 5.139.678. De 75 o más: unos 5,04 millones.** — [Eurostat demo_pjan (consulta por API, 29-10-2026)](https://ec.europa.eu/eurostat/databrowser/view/demo_pjan/default/table)
- Tamaño de las cohortes de edad simple a 1-1-2025: 50 años, 818.832; 52, 790.695; 55, 751.501; 58, 722.822; 60, 719.621; 62, 655.831; 64, 634.978; 65, 614.009; 67, 578.177. Las cohortes que hoy tienen entre 50 y 59 años son entre un 25 % y un 40 % mayores que la que hoy cumple 67. — [Eurostat demo_pjan](https://ec.europa.eu/eurostat/databrowser/view/demo_pjan/default/table)
- INE, Proyecciones de Población 2026-2076 (publicadas el 17-06-2026): las personas de 65 años o más son hoy el **21,1 %** de la población y llegarían a un máximo del **30,9 % en 2076**. La tasa de dependencia alcanzaría un máximo del 73,2 % en 2076, y la esperanza de vida a los 65 años en 2075 sería de 23,5 años en hombres y 26,3 en mujeres. — [INE, nota de prensa PROP 2026-2076](https://ine.es/dyngs/Prensa/PROP20262076.htm?print=1)
- La proyección anterior del INE (2024-2074, ya «no representativa» según el propio INE) situaba a los mayores de 65 años en el 24,6 % en 2035 y en un máximo del 30,5 % hacia 2055. — [INE PROP 2024-2074](https://ine.es/dyngs/Prensa/PROP20242074.htm); [serie CSV del INE](https://www.ine.es/jaxi/files/tpx/es/csv_bd/79987.csv)

**Jubilaciones del baby boom (2025-2035)**
- Según el SEPE, la jubilación de la generación del baby boom empezó en 2023 y se prolongará hasta 2042, aproximadamente. Hay «más de nueve millones» de personas nacidas entre 1958 y 1977. — [resumen de búsqueda (que.es, VidaCaixa, Bankinter)](https://www.que.es/2025/08/28/jubilaciones-masivas-pensiones-cesta/)
- Una estimación habla de unos **5,3 millones de jubilaciones en los próximos 10 años** frente a 1,8 millones de jóvenes que entrarán en el mercado laboral. *Ni la fuente original ni la metodología están claras; es una cifra débil.* — [valencianews.es](https://valencianews.es/tendencias/zoom-analiza-como-afectara-al-mercado-laboral-la-jubilacion-masiva-de-los-baby-boomers/)
- El Instituto Santalucía estima que el número de pensiones públicas crecerá en más de 5 millones (+50,4 %) entre 2022 y 2050. — [Instituto Santalucía](https://institutosantalucia.es/actualidad/pensiones/las-pensiones-baby-boomers/)
- CaixaBank Research sitúa el mayor impacto negativo sobre la fuerza laboral en la década 2030-2040. — [CaixaBank Research](https://www.caixabankresearch.com/es/node/11620/printable/print)

**Uso de internet de los mayores**
- Eurostat 2025, España: el **95,5 %** de las personas de 55 a 64 años usó internet en los últimos 3 meses y el **89,7 %** lo usa a diario. En el grupo de 65 a 74 años, **el 85,6 % lo usó en los últimos 3 meses** (82,6 % en 2024), **el 75,1 % lo usa a diario** (70,6 % en 2024) y el 12,4 % no lo ha usado nunca. — [Eurostat isoc_ci_ifp_iu](https://ec.europa.eu/eurostat/databrowser/view/isoc_ci_ifp_iu/default/table); [Eurostat isoc_ci_ifp_fu](https://ec.europa.eu/eurostat/databrowser/view/isoc_ci_ifp_fu/default/table)
- INE TIC-H 2025 (20-11-2025): el 96,3 % de las personas de 16 a 74 años usó internet; el 80,7 % contactó con las administraciones por internet. Usaron IA generativa el **19,2 % de las personas de 55 a 64 años** y el **7,4 % de las de 65 a 74**. La nota no desglosa por edad el uso de internet ni del móvil. — [INE, nota TIC-H 2025](https://www.ine.es/dyngs/Prensa/TICH2025.htm)
- Galicia, 2025: el 77,4 % de las personas de 65 a 74 años usa internet. — [Xunta de Galicia](https://www.xunta.gal/notas-de-prensa/-/nova/026602/galicia-sumo-mas-72-000-usuarios-internet-65-74-entre-2021-2025)
- Como referencia antigua (2018), solo el 49,1 % de las personas de 65 a 74 años había usado internet en los últimos 3 meses. — [CENIE](https://cenie.eu/es/node/3211). *Señala un salto muy fuerte en siete años.*
- GfK DAM, abril de 2026: 41.163.931 usuarios únicos digitales en España. — [Barlovento/GfK, informe 202604](https://barloventocomunicacion.es/wp-content/uploads/2026/05/202604-Informe-Consumo-Digital-GfK-y-Barlovento-Comunicacion.pdf)

**Economía sénior**
- Según estudios de Fundación Mapfre, Funcas, el Centro Ageingnomics y Fedea, los mayores de 55 años generan alrededor de **un tercio del PIB** y los hogares encabezados por mayores de 55 años concentran cerca del **60 % del gasto de los hogares**. El V Barómetro del Consumidor Sénior da una cifra menor, del 25 % del PIB. *Proceden de resúmenes de búsqueda; las cifras dependen del umbral de edad (50 o 55 años) y del año.* — [Público](https://www.publico.es/la-buena-vida/mayores-activo-economico-imparable.html); [Emprendedores](https://emprendedores.es/actualidad/seniors-motor-economico-de-espana/); [Corresponsables](https://www.corresponsables.com/actualidad/fundacion-mapfre-economia-senior-sostenibilidad-pensiones/)

### Inferences
- **La audiencia directa** (pensionistas más personas de 55 a 67 años) ronda los **17 o 18 millones de personas**: unos 9,5 millones de pensionistas y 8,8 millones de personas de 55 a 67, con un solapamiento parcial porque hay pensionistas de menos de 67 años. A eso se suman los hijos de mayores (de 35 a 55 años) que buscan sobre dependencia, residencias, herencias y viudedad. Pocos nichos de habla hispana en España tienen una base tan amplia y tan obligada a informarse.
- Las cohortes de 50 a 59 años (entre 713.000 y 819.000 personas por año de edad) son mayores que la que hoy cumple 67 (578.000). Por tanto, el flujo anual de personas que llegan a la edad de jubilación debería crecer aproximadamente entre un 25 % y un 40 % hasta finales de los años 2030 (cálculo propio con datos de Eurostat, sin contar mortalidad ni migración). Las altas de jubilación rondan las 365.000 al año (las 274.843 de enero a septiembre de 2025, extrapoladas).
- La barrera digital ya no limita a los menores de 75 años. Para los mayores de 75 (unos 5 millones), el usuario real será a menudo un hijo o un cuidador.

### Gaps
- No se obtuvo la nota oficial de octubre de 2026 con el desglose por tipo de pensión (la web de la Seguridad Social bloquea con 403); las cifras de octubre de 2026 proceden de una fuente secundaria.
- No se encontró el dato oficial de uso de internet o smartphone de las personas de 75 años o más (INE 2025), ni el de uso de smartphone de 55 a 80 años.
- No hay una cifra oficial y verificable de jubilaciones esperadas entre 2025 y 2035; los 5,3 millones carecen de fuente primaria clara.

## 2. Demanda de búsqueda y estacionalidad (volúmenes y Google Trends; ¿cuánto pesa el pico de noviembre a enero?)

### Takeaway
La demanda es grande pero muy dependiente de la actualidad y del calendario. La palabra «pensiones» concentra el **56 % de su volumen anual entre noviembre y enero** (3,8 veces la media del resto del año), y «subida pensiones» llega a concentrar el **95 %**. Otras consultas son estables todo el año: calculadora, jubilación anticipada o activa, y residencias. IMSERSO tiene su pico en septiembre y octubre. Octubre de 2026 ya marca el máximo de cinco años en Trends para «pensiones» y «jubilación», por el adelanto electoral, la subida de 2027 y la edad de 67 años en 2027.

### Cited Findings
**Volúmenes del Planificador de Palabras Clave de Google Ads (España, español, solo Búsqueda de Google; media mensual de octubre de 2025 a septiembre de 2026, con meses destacados)** — [Apify aitorsm/keyword-volume, ejecución OIID9OHR70WlmyjSy, 29-10-2026](https://apify.com/aitorsm/keyword-volume)

| Palabra clave | Media mensual | Meses destacados (búsquedas) | CPC* | Competencia |
|---|---|---|---|---|
| jubilación | 301.000 | nov-25: 673.000; mar-26: 450.000; jul-26: 165.000 | 2,18 | BAJA |
| pensiones | 60.500 | nov-25: 165.000; dic: 110.000; ene: 90.500; jul: 22.200; sep-26: 27.100 | 1,67 | BAJA |
| subida pensiones | 9.900 | nov-25: 74.000; dic: 14.800; ene: 27.100; mar-ago: 140-320 | n/d | BAJA |
| subida pensiones 2027 | 8.100 | ago-26: 3.600; **sep-26: 90.500** | 1,48 | BAJA |
| pensiones 2027 | 2.400 | ago-26: 590; **sep-26: 27.100** | 1,88 | BAJA |
| revalorización pensiones | 1.600 | ene-26: 4.400 | n/d | BAJA |
| calculadora pensión jubilación | 14.800 | ene-26: 22.200; jul-ago: 12.100 (estable) | 3,07 | BAJA |
| simulador pensión | 1.900 | 1.000-2.900 | 1,40 | BAJA |
| pensión de viudedad | 33.100 | dic-25: 60.500; **ene-26: 110.000**; may: 12.100; sep: 40.500 | 1,16 | BAJA |
| paga extra pensiones | 3.600 | **nov-25: 27.100**; jun-26: 8.100; jul-sep: 170-260 | n/d | BAJA |
| paga extra pensionistas | (sin fila devuelta) | — | — | — |
| pensión no contributiva | 27.100 | dic-25: 74.000; ene: 60.500; jul: 12.100 | 0,14 | BAJA |
| jubilación anticipada | 22.200 | ene-26: 49.500; mar: 40.500; ago: 9.900 | 1,00 | BAJA |
| jubilación parcial / activa | 6.600 / 5.400 | estables | 0,68 / 0,79 | BAJA |
| pensión máxima / mínima / media | 5.400 / 1.900 / 90 | máx. ene: 9.900; mín. dic-ene: 5.400 | 0,36 / n/d | BAJA |
| complemento brecha de género | 8.100 | nov-25: 22.200 | 0,62 | BAJA |
| imserso | 90.500 | **oct-25: 246.000; sep-26: 246.000**; jun: 110.000; may: 49.500 | 0,79 | BAJA |
| viajes imserso | 49.500 | **oct-25: 165.000; sep-26: 135.000**; jul: 18.100 | 0,45 | BAJA |
| vida laboral (navegacional) | 2.240.000 | 1,8-2,7 millones | 1,59 | BAJA |

\*CPC = «CPC medio» del Planificador; la moneda no se especifica (probablemente USD). Sin datos devueltos: «edad de jubilación», «incapacidad permanente», «ley de dependencia», «grado de dependencia», «ayudas dependencia» (devolvieron nulo; puede deberse a la agrupación de variantes en el Planificador).

**Cálculos de concentración estacional (con la serie anterior)** — mismos datos de [Apify aitorsm/keyword-volume](https://apify.com/aitorsm/keyword-volume)
- «pensiones»: noviembre-enero suma 365.500 de 657.400 búsquedas anuales (**56 %**). La media de noviembre a enero es de 121.800 al mes frente a 32.400 el resto del año (**3,8 veces**); entre el pico y el valle (noviembre frente a julio) hay 7,4 veces.
- «subida pensiones»: noviembre-enero = **95 %** del año (115.900 de 121.780).
- «pensión de viudedad»: 49 % en noviembre-enero (el pico es enero de 2026, con 110.000). «Pensión no contributiva»: 52 %. «Paga extra pensiones»: noviembre = 64 % del año; junio = 19 %.
- Estables: «calculadora pensión jubilación», 30 % en noviembre-enero (el 25 % equivaldría a un reparto uniforme); «jubilación anticipada», 32 %.
- A contracorriente: «imserso», solo el 15 % en noviembre-enero; su pico es septiembre-octubre, cuando se comercializa la temporada.

**Google Trends España, 5 años (semanal, octubre de 2021 a octubre de 2026)** — [Apify apify/google-trends-scraper, ejecución hHGEEpBge5anPgMHW](https://apify.com/apify/google-trends-scraper)
- «pensiones», media por mes natural en 5 años (índice 0-100): **ene 45,7; dic 43,5; oct 38,3; nov 38,2**; sep 29,5; feb 29,1; mar 27,7; may 26,7; abr 26,6; jun 27,3; **jul 23,4; ago 22,4**. Por tanto, diciembre-enero dobla aproximadamente el valle de verano. La mediana semanal es 29. Semana máxima del periodo: **19-25 de enero de 2025 (100)**; después 4-10 de octubre de 2026 (96), 11-17 de octubre de 2026 (76) y 21-27 de diciembre de 2025 (67).
- «pensiones», media mensual reciente: sep-25 27; oct 35; nov 41; dic 51; ene-26 47; feb 33; mar 24; abr 33; may 32; jun 29; jul 19; ago 20; sep 39; **oct-26 71 (máximo mensual de la serie)**. Media anual casi plana: 2022 31,3; 2023 31,2; 2024 29,3; 2025 32,2; 2026 (hasta octubre) 34.
- «jubilación», media anual: **2022 12; 2023 13,5; 2024 15,8; 2025 20,3; 2026 (hasta octubre) 39,6**. Semanas máximas: 11-17 de octubre de 2026 (100), 25-31 de octubre de 2026 (93), 4-10 de octubre de 2026 (92) y 5-11 de abril de 2026 (76). Medias por mes natural: oct 27,3; sep 22,4; abr 20,8; ago 20,3; nov 15,3; dic 15,8.
- Consultas en ascenso (breakout): «subida pensiones 2027», «subida pensiones 2027 última hora», «edad jubilación españa 2027», «jubilación funcionarios 72 años», «jubilación parcial con contrato relevo», «tabla de jubilación por años cotizados», «coeficientes reductores jubilación anticipada voluntaria», «simulador jubilación anticipada». — mismo origen
- *La ejecución de Trends para «imserso», «subida pensiones» y la comparación de cinco términos no terminó: se abortó tras más de 10 minutos atascada.*

**Señales de calendario 2026-2027 visibles en el SERP** — [Apify apify/google-search-scraper, ejecución ds8jghBLom6zccyjN](https://apify.com/apify/google-search-scraper)
- La revalorización prevista para 2027 está en torno al 3,5 % según Funcas y BBVA Research ([El Confidencial Digital](https://www.elconfidencialdigital.com/articulo/dinero/pensiones-subiran-35-2027-elevaran-gasto-publico/202610252047121496630.html)), al 3,6 % según Funcas ([65ymas](https://www.65ymas.com/economia/pensiones/pensiones-subiran-36-en-2027-segun-preve-funcas_86906_102.html)) y «en torno al 3,7 %» según [Expansión (27-10-2026)](https://www.expansion.com/economia/2026/10/27/mejor-jubilarse-finales-2026-principios-2027.html).
- En 2027 la edad legal de jubilación llega a los **67 años** ([Instituto Santalucía](https://institutosantalucia.es/actualidad/jubilacion/jubilacion-anticipada/)). Para jubilarse a los 65 con el 100 % harán falta 38 años y seis meses cotizados ([El Correo](https://www.elcorreo.com/economia/tu-economia/subida-anos-cotizacion-exigidos-2027-jubilarse-100-20261027190320-nt.html)).
- El programa de turismo del IMSERSO 2026/2027 se empezó a comercializar el 14-09-2026; el turismo de escapada son 210.787 plazas (el 23,9 % del total). — [IMSERSO](https://imserso.es/detalle-actualidad/-/asset_publisher/n1oS8lWfrx6m/content/los-viajes-del-programa-de-turismo-del-imserso-de-la-temporada-2026-2027-comenzaran-a-comercializarse-el-14-de-septiembre-de-2026/20123)

### Inferences
- **Hay temporada alta real.** Para el clúster de noticias (subida, paga extra, PNC, viudedad, mínimas y máximas), noviembre-enero supone entre la mitad y casi toda la demanda anual. Para un sitio nuevo, ese pico es la principal oportunidad de 2026-2027. Es además excepcional: elecciones el 29-11, subida de 2027 en torno al 3,5-3,7 %, edad de jubilación de 67 años desde el 1-1-2027 y un octubre de 2026 que ya está en máximos de cinco años.
- El salto de «subida pensiones 2027» a 90.500 búsquedas en septiembre de 2026 indica que la demanda de noviembre de 2026 a enero de 2027 probablemente superará la del ciclo 2025-2026 (estimación). Como referencia, «subida pensiones» tuvo 74.000 búsquedas en noviembre de 2025.
- El clúster de herramientas (calculadora y simulador, unas 17.000 búsquedas al mes, más jubilación anticipada, activa y parcial, unas 34.000) es estable y menos expuesto a los grandes medios. Es la base de ingresos fuera de temporada.
- Los datos del Planificador para términos genéricos como «jubilación» no coinciden con la forma de Trends: el Planificador da el pico en noviembre de 2025 (673.000), mientras Trends lo da en abril y octubre de 2026. Las cifras del Planificador conviene tratarlas como un orden de magnitud.

### Gaps
- No se obtuvieron volúmenes para «edad de jubilación», «incapacidad permanente» ni el clúster de dependencia (el Planificador devolvió nulo).
- La ejecución de Trends no completó «imserso», «subida pensiones» ni la comparación directa entre términos; esa estacionalidad se apoya solo en el Planificador.
- No se ha verificado la causa exacta de los picos de Trends de abril y octubre de 2026 para «jubilación».

## 3. Competencia, funciones del SERP y AI Overviews (quién posiciona y si hay sitios independientes con éxito)

### Takeaway
Los SERP de google.es están dominados por fuentes oficiales (seg-social.es, IMSERSO, administraciones autonómicas), por los portales de contenido de bancos y aseguradoras (VidaCaixa, CaixaBank, BBVA Mi Jubilación, Santander, Instituto Santalucía, Ibercaja) y, en las consultas de actualidad, por medios de comunicación. **Aun así, hay huecos.** Un blog independiente, labrujuladelaspensiones.com, es el número 1 para «subida pensiones 2027», y economiaresponsablefinanzas.com es el número 4. En residencias, los primeros puestos los ocupan directorios o sitios de nicho. Aparecieron **AI Overviews en 10 de las 16 consultas** (el 62 %), sobre todo en las de carácter informativo permanente; no aparecieron en las de actualidad.

### Cited Findings
**Composición de los primeros 10 resultados orgánicos (google.es, escritorio, 29-10-2026)** — [Apify apify/google-search-scraper, ejecución ds8jghBLom6zccyjN](https://apify.com/apify/google-search-scraper)

| Consulta | AI Overview | Dominios en orden de posición |
|---|---|---|
| subida pensiones 2027 | No | **labrujuladelaspensiones.com**, elcorreo.com, noticiastrabajo.es, **economiaresponsablefinanzas.com**, seg-social.es, facebook.com, expansion.com |
| pensiones 2027 | No | europapress.es, okdiario.com, elconfidencialdigital.com, bbvamijubilacion.es, elconfidencial.com, facebook.com (vídeo de un abogado de TikTok), 65ymas.com |
| edad de jubilación | No | vidacaixa.es, seg-social.es, mites.gob.es, caixabank.com, sede.seg-social.gob.es, sanidad.ccoo.es, vamoscontufuturo.ibercaja.es, seg-social.es, bancosantander.es |
| calculadora pensión jubilación | Sí (estático) | prestaciones.seg-social.es, bancosantander.es, ovbsimuladores.afi.es, institutosantalucia.es, caixabank.com, sede.seg-social.gob.es, bbvamijubilacion.es, aportamas.vidacaixa.es, infovideo.seg-social.es |
| pensión de viudedad | No | prestaciones.seg-social.es, vidacaixa.es, muface.es, seg-social.es, google.com, administracion.gob.es, google.com |
| paga extra pensiones | Sí (estático) | vidacaixa.es, seg-social.es, inclusion.gob.es, youtube.com, portalclasespasivas.gob.es, ineaf.es, facebook.com, coverflex.com, seg-social.es |
| jubilación anticipada | No | seg-social.es, vidacaixa.es, seg-social.es, institutosantalucia.es, campmanyabogados.com, senado.es, bbvamijubilacion.es, vidacaixa.es, caixabank.com (además, **1 anuncio de VidaCaixa**) |
| pensión no contributiva | Sí (estático) | seg-social.es, caixabank.com, imserso.es, politicasocial.xunta.gal, vidacaixa.es, serviciossociales.gva.es, bancosantander.es |
| imserso viajes | Sí (estático) | imserso.es (×3), turismosocial.es, sede.imserso.gob.es, vidacaixa.es, viajes.carrefour.es, caixabank.com |
| seguro de decesos | Sí (en vivo) | santalucia.es, caser.es, ocaso.es, dkv.es, sanitas.es, seguros.carrefour.es, europeaseguros.es, acierto.com, **segurodeceso.es** |
| teleasistencia | Sí (en vivo) | juntadeandalucia.es, cruzroja.es, vivelibre.es, sede.madrid.es, castillalamancha.es, taj65.es, facebook.com |
| precio residencia de mayores | Sí (en vivo) | **mundomayor.com**, cronoshare.com, miresi.es, lavostrallar.com, **inforesidencias.com**, residenciagravina.es, **elrincondelcuidador.es**, residenciaelencinar.es |
| impuesto de sucesiones | Sí (en vivo) | agenciatributaria.gob.es, atc.gencat.cat, atv.gva.es, comunidad.madrid, tributos.jcyl.es, vidacaixa.es, atriga.gal, gesvalt.es |
| hacer testamento | Sí (estático) | caixabank.com, notariado.org, deutsche-bank.es, palomazabalgo.com, jesusbenavides.es, ortolaabogados.com, dig.es, mapfre.es, cerrillogomez.com |
| ayudas para mayores | Sí (en vivo) | sede.carm.es, sepe.es, **clubdecuidadores.com**, carm.es, vidacaixa.es, sede.inclusion.gob.es, **cuidum.com**, madrid.es, imserso.es |
| ley de dependencia | No | boe.es, fundacioncaser.org, wikipedia, **tododisca.es**, oxfamintermon.org, nnespana.es, domusvi.es, comunidad.madrid |

- Fuentes citadas por los AI Overviews: decesos → dkv.es, santalucia.es, acierto.com; sucesiones → Agencia Tributaria, ATV y VidaCaixa (y el propio AIO se personalizó por la ubicación, Comunitat Valenciana); teleasistencia → sede.madrid.es, Cruz Roja, domusvi.es; precio de residencia → **mundomayor.com, elrincondelcuidador.es** y sede.madrid.es; paga extra → vidacaixa.es, legalitas.com, seg-social.es; testamento → caixabank.com, notariado.org, deutsche-bank.es; PNC → caixabank.com, imserso.es, juntadeandalucia.es; ayudas → sede.carm.es, sepe.es, madrid.es. — [mismo conjunto de datos](https://apify.com/apify/google-search-scraper)
- En las consultas de actualidad («pensiones 2027», «subida pensiones 2027») el SERP solo mostró 7 resultados orgánicos, señal de bloques de noticias, vídeo o redes sociales (incluidos dos de Facebook). El scraper no extrae el carrusel de Noticias destacadas. — [mismo conjunto de datos](https://apify.com/apify/google-search-scraper)
- Pese a los altos CPC en decesos o salvaescaleras, solo se capturó **1 anuncio** en las 16 consultas (VidaCaixa en «jubilación anticipada»). Puede ser una limitación del scraper o del proxy. — [mismo conjunto de datos](https://apify.com/apify/google-search-scraper)

**Tráfico estimado de competidores (Similarweb, septiembre de 2026; visitas al mes, entre paréntesis julio → agosto)** — [Apify tri_angle/fast-similarweb-scraper, ejecución XzHPpdWXZUxmtKUos](https://apify.com/tri_angle/fast-similarweb-scraper)
- Medios o editores grandes: **tododisca.es, 2.579.086** (julio 416.511 → agosto 2.700.641; noticias generales, discapacidad, ONCE y Betis); **65ymas.com, 796.144** (704.547 → 718.377; el 54 % del tráfico es directo; palabras clave principales: «imserso turismo social destinos», «calculadora irpf»); **noticiastrabajo.es, 133.904** (julio y agosto, unas 900: *serie anómala, poco fiable*).
- Marcas financieras: **vidacaixa.es, 201.183** (119.772 → 164.752; palabras clave principales: «ingreso mínimo vital», «turismo social imserso 2026»); **bbvamijubilacion.es, 41.674**; **institutosantalucia.es, 39.517** (en julio, 87.745).
- Sitios de nicho sénior: **inforesidencias.com, 54.546** (número 2 de su categoría «Geriatric & Aging Care» en España); **elrincondelcuidador.es, 44.196** (solo el 32 % desde España); **cuidum.com, 31.493** (el 35 % desde España); **mundomayor.com, 5.795**; **clubdecuidadores.com, 1.934**.
- Blogs independientes de pensiones o finanzas: **economiaresponsablefinanzas.com, 10.278**; **labrujuladelaspensiones.com, 1.275** (aunque es número 1 para «subida pensiones 2027»); **segurodeceso.es, 1.588**; jubilaciondefuturo.es, sin datos (650).

**AI Overviews y CTR (contexto)**
- Ahrefs (datos de diciembre de 2025): la presencia de un AI Overview se asocia a un **CTR un 58 % menor** para el primer resultado. — [Ahrefs](https://ahrefs.com/blog/es/ai-overviews-reducen-clics-actualizacion)
- Seer Interactive (septiembre de 2025): CTR orgánico del 0,70 % en consultas con AIO frente al 1,45 % sin AIO; ser citado en el AIO se asocia a un CTR un 35 % mayor. — [Seer Interactive](https://www.seerinteractive.com/insights/aio-impact-on-google-ctr-september-2025-update)
- SE Ranking, España (101.574 sitios, enero de 2025 a abril de 2026): las plataformas de IA aportan el 0,23 % del tráfico en 2025 y el 0,30 % en 2026. La búsqueda orgánica bajó del 52,02 % al 40,70 % del tráfico (−11,3 puntos, frente a −2,6 a nivel mundial). ChatGPT genera el 70,5 % de las visitas que llegan desde IA en 2026 y Gemini el 12,4 %. — [SE Ranking (17-06-2026)](https://seranking.com/es/blog/trafico-ia-espana-2025/)
- Google define los temas que pueden afectar a la estabilidad financiera de las personas como «Your Money or Your Life» (YMYL) y les aplica un mayor peso de E-E-A-T. — [Google Search Central: contenido útil](https://developers.google.com/search/docs/fundamentals/creating-helpful-content). La generación masiva de páginas sin valor añadido es una práctica de spam («scaled content abuse»). — [Google, políticas de spam](https://developers.google.com/search/docs/essentials/spam-policies)

### Inferences
- **La competencia es alta, pero está repartida por tipo de consulta.** (a) En los trámites y definiciones (edad de jubilación, viudedad, PNC, anticipada), la Seguridad Social y los bancos ocupan casi todo el top 10: es difícil para un sitio nuevo. (b) En la actualidad (subida 2027, pensiones 2027), dominan los medios, pero un blog independiente rápido llega al número 1: es la vía de entrada más realista en la temporada alta. (c) En herramientas (calculadora), compiten el simulador oficial y los bancos: hace falta un elemento diferencial. (d) Los subnichos sénior de residencias, ayudas y cuidadores muestran directorios y blogs pequeños en el top 10 y en las fuentes de los AIO: es el terreno más abierto.
- Los grandes medios que menciona el encargo (20minutos, El Economista, Infobae, AS, Antena 3) no aparecieron en el top 10 orgánico de escritorio de estas 16 consultas. Probablemente compiten en Discover y en Noticias destacadas, que esta foto no captura.
- La presencia de AIO (62 %) se concentra en lo informativo permanente. El contenido evergreen de jubilometro.com (guías) perderá CTR en esas consultas. Las consultas de actualidad y de cálculo personalizado (calculadoras) parecen menos expuestas, aunque la de calculadora sí mostró AIO.
- **Las cifras de Similarweb para sitios pequeños parecen subestimadas.** Es difícil que el número 1 de una consulta con 90.500 búsquedas en septiembre reciba solo 1.275 visitas al mes, salvo que llegara al número 1 después de septiembre. Conviene tratarlas como un mínimo orientativo.
- El tema es YMYL. Con 145 guías publicadas en un mes con ayuda de IA, el riesgo de que Google o AdSense lo vean como contenido escalado de poco valor es mayor que en nichos que no son YMYL. Esto podría estar relacionado con el rechazo de AdSense, pero es una inferencia, no un diagnóstico.

### Gaps
- No se capturaron el carrusel de Noticias destacadas, Discover ni AI Mode; la presencia de medios grandes queda infravalorada.
- La foto es de escritorio y de un solo día; no se midió la versión móvil, que probablemente usa la mayoría del público.
- No hay datos fiables de tráfico de los portales de medios por sección (por ejemplo, la de pensiones de 20minutos o El Economista).
- No se obtuvo el tráfico de campmanyabogados.com (el decimosexto dominio, que no se descargó).

## 4. Potencial de monetización (CPC/RPM, afiliación y lead-gen en el segmento sénior)

### Takeaway
Las palabras clave de pensiones tienen **CPC moderados o bajos y competencia publicitaria BAJA**: pensiones 1,67; jubilación 2,18; calculadora 3,07; viudedad 1,16; PNC 0,14 (en la moneda de la herramienta, probablemente USD). Los anunciantes no tienen un producto que vender por la pensión pública. El valor comercial está en **los productos adyacentes para el mismo público**: seguro de decesos (CPC 8,58, competencia ALTA), salvaescaleras (5,32, ALTA), seguro de salud para mayores (4,74), cuidadores (4,25), «hacer testamento» (3,33), plan de pensiones (2,70) y teleasistencia (2,30). No se encontraron programas de afiliación públicos y verificables específicos de decesos, residencias o testamentos.

### Cited Findings
- CPC medios del Planificador (España; moneda no especificada, probablemente USD; entre paréntesis, la puja baja y alta para la parte superior de la página): seguro de decesos **8,58** (3,06-7,62, ALTA); salvaescaleras **5,32** (1,38-5,94, ALTA); seguro de salud para mayores 4,74 (50 búsquedas al mes); ayudas para mayores 4,34 (70 al mes); cuidadores de ancianos 4,25 (170 al mes); hacer testamento 3,33 (880 al mes); calculadora pensión jubilación 3,07; plan de pensiones 2,70; teleasistencia 2,30 (MEDIA); jubilación 2,18; pensiones 2027 1,88; hipoteca inversa 1,87 (MEDIA); pensiones 1,67; herencia 1,67 (puja alta 4,09); centro de día 1,62; residencias de mayores 1,43; audífonos 1,43 (ALTA); impuesto de sucesiones 1,33; testamento 1,12; pensión de viudedad 1,16; jubilación anticipada 1,00; imserso 0,79; renta vitalicia 0,61; viajes imserso 0,45; pensión máxima 0,36; pensión no contributiva 0,14. La competencia es BAJA en casi todas las de pensiones. — [Apify aitorsm/keyword-volume](https://apify.com/aitorsm/keyword-volume)
- Similarweb muestra un CPC de 5,15 para «seguro de decesos». — [Apify tri_angle/fast-similarweb-scraper](https://apify.com/tri_angle/fast-similarweb-scraper)
- Mercado de decesos: según UNESPA, el **45,6 % de la población española tiene seguro de decesos**. — [roams.es](https://roams.es/actualidad/seguros/casi-la-mitad-de-espanoles-tiene-seguro-de-decesos-cadiz-lidera-con-casi-un-80-de-asegurados/). En el SERP de «seguro de decesos» posicionan aseguradoras directas (Santalucía, Caser, Ocaso, DKV, Sanitas, Carrefour), el comparador Acierto y un sitio afiliado o comparador (segurodeceso.es), que según Similarweb tiene unas 1.600 visitas al mes. — [Apify google-search-scraper](https://apify.com/apify/google-search-scraper)
- Afiliación y lead-gen documentados (escasos y genéricos): Aon España pagaba **3,5 € por lead válido** (seguro de salud, dato de 2020) ([affi.io](https://affi.io/m/aon-es-cpl)). El programa de afiliación de **Teleasistencia Cruz Roja** figura como **cerrado** ([affi.io](https://affi.io/m/teleasistencia-cruz-roja)). Allianz Assistance paga un 8 % de CPA (seguro de viaje) ([resumen de búsqueda, Awin](https://ui.awin.com/merchant-profile/15115)). Una guía de 2026 cifra en **entre 1 y 50 € por lead** el rango típico de los programas españoles ([Adsterra](https://adsterra.com/blog/es/programas-de-afiliados-espana/)). No se encontró un programa público de afiliación de Rastreator ni de Acierto ([resumen de búsqueda](https://www.rastreator.com/acierto)).
- Referencias de RPM de AdSense: no hay datos verificados para España. Las guías genéricas citan RPM de **20 a 40 USD en finanzas y seguros para tráfico de EE. UU.** y aplican un factor de unos 0,25 para Latinoamérica ([hacecuentas](https://hacecuentas.com/calculadora-blog-adsense-rpm-nicho)). Para Europa dan rangos de entre 50 y 200 USD por 100.000 páginas vistas en nichos de CPC bajo y de entre 200 y 600 USD en CPC medio ([Ranktracker](https://www.ranktracker.com/es/blog/how-much-does-adsense-pay-for-100-000-pageviews/)). *Son estimaciones de marketing, sin fuente primaria.*
- La demanda de las palabras con más CPC es pequeña: «seguro de salud para mayores» 50 búsquedas al mes, «ayudas para mayores» 70, «cuidadores de ancianos» 170, «hacer testamento» 880. — [Apify aitorsm/keyword-volume](https://apify.com/aitorsm/keyword-volume)

### Inferences
- **RPM esperable con AdSense (estimación propia, sin fuente directa):** con competencia BAJA y CPC de anunciante de entre 1 y 2 en las palabras principales (0,14 en PNC), y sabiendo que el editor cobra solo una parte del CPC, el contenido de pensiones probablemente rinda RPM de página bajos o moderados, del orden de 1 a 5 € por 1.000 páginas vistas. Las páginas que atraen anuncios de decesos, seguros, planes de pensiones o hipoteca inversa podrían rendir más. *Hay que validarlo con datos reales una vez aprobado AdSense.*
- El nicho monetiza más por volumen y por estacionalidad que por CPC. Una página de «subida pensiones 2027» con miles de visitas en diciembre rinde por tráfico, no por el valor del clic.
- Los subnichos sénior con intención comercial (decesos, salvaescaleras, audífonos, teleasistencia privada, cuidadores a domicilio, hipoteca inversa o renta vitalicia, testamento online) tienen CPC de 2 a 9 y probablemente acepten acuerdos de lead-gen directos. Pero sus SERP están ocupados por las propias marcas y por comparadores, y los programas no son públicos: habría que negociar directamente o mediante redes como Awin o Tradedoubler.

### Gaps
- No hay RPM reales de sitios españoles de pensiones; no se encontró ningún caso publicado.
- No se verificaron programas de afiliación o CPL concretos para decesos, residencias, teleasistencia, testamento online, cuidadores ni hipoteca inversa.
- La moneda del CPC del Planificador no está confirmada (probablemente USD).

## 5. Tendencia de crecimiento

### Takeaway
El crecimiento es estructural, por la demografía, y el interés de búsqueda va al alza en «jubilación». En «pensiones», el nivel medio es estable y el crecimiento llega por picos de actualidad cada vez mayores. El tráfico orgánico en España está perdiendo cuota frente a la IA y a los clics que se quedan en el propio buscador.

### Cited Findings
- Las pensiones crecen un 1,6 % al año en número y un 6,3 % en gasto (octubre de 2026 frente a octubre de 2025). — [Artículo 14](https://www.articulo14.es/economia/record-gasto-pensiones-14540-millones-20261027.html)
- El peso de los mayores de 65 años pasará del 21,1 % actual a un máximo del 30,9 % en 2076. — [INE PROP 2026-2076](https://ine.es/dyngs/Prensa/PROP20262076.htm?print=1)
- Google Trends, «jubilación», media anual: 2022 12 → 2023 13,5 → 2024 15,8 → 2025 20,3 → 2026 39,6 (hasta octubre), es decir, más del triple desde 2022. «Pensiones»: 31,3 → 31,2 → 29,3 → 32,2 → 34 (estable, con récord mensual en octubre de 2026, 71). — [Apify google-trends-scraper](https://apify.com/apify/google-trends-scraper)
- El uso diario de internet en el grupo de 65 a 74 años pasó del 70,6 % (2024) al 75,1 % (2025). — [Eurostat isoc_ci_ifp_fu](https://ec.europa.eu/eurostat/databrowser/view/isoc_ci_ifp_fu/default/table)
- En España, la búsqueda orgánica bajó del 52,0 % al 40,7 % del tráfico web entre 2025 y 2026, mientras la IA pasó del 0,23 % al 0,30 %. — [SE Ranking](https://seranking.com/es/blog/trafico-ia-espana-2025/)

### Inferences
- Sea cual sea la evolución de Google, el nicho tiene viento de cola demográfico durante al menos 15 años: más jubilados, cohortes mayores en camino y más uso de internet de los mayores. La parte frágil es el canal (la cuota de clic orgánico), no la demanda.
- La subida de «jubilación» en 2026 coincide con cambios normativos y de calendario (67 años en 2027, años de cotización exigidos, jubilación parcial y flexible). Estos temas generan actualidad recurrente cada año.

### Gaps
- No se obtuvo una serie larga de Trends para «imserso», «dependencia» ni «decesos».

## 6. Subnichos adyacentes para el mismo público (herencias y sucesiones, dependencia y residencias, teleasistencia, decesos, IMSERSO, testamento, ayudas)

### Takeaway
Los subnichos adyacentes amplían la demanda sin cambiar el sitio y aportan los CPC más altos del ecosistema sénior. Herencias y testamento suman unas 98.000 búsquedas al mes. Residencias y centros de día rondan las 25.000, con SERP abiertos a sitios de nicho. El IMSERSO tiene mucho volumen (unas 140.000 búsquedas al mes y picos de 400.000) en septiembre-octubre, lo que compensa la estacionalidad de pensiones, aunque su CPC es bajo. Decesos y teleasistencia tienen menos volumen pero CPC altos.

### Cited Findings
**Volúmenes y CPC** — [Apify aitorsm/keyword-volume](https://apify.com/aitorsm/keyword-volume)
- Herencias y sucesiones: «herencia» 74.000 al mes (pico de 165.000 en septiembre de 2026; CPC 1,67); «testamento» 18.100 (pico de 49.500 en julio de 2026; 1,12); «impuesto de sucesiones» 5.400 (pico de 14.800 en diciembre; 1,33); «hacer testamento» 880 (3,33); «testamento online» 480 (1,29).
- Dependencia y residencias: «centro de día» 9.900 (1,62); «residencia de ancianos» 8.100 (1,38); «residencias de mayores» 6.600 (1,43); «precio residencia de mayores» 140 (0,90); «cuidadores de ancianos» 170 (4,25). Para «ley de dependencia», «grado de dependencia» y «ayudas dependencia» no se devolvieron datos.
- Teleasistencia, 4.400 (2,30, MEDIA). Decesos, 8.100 (8,58, ALTA). Productos sénior: audífonos 14.800 (1,43, ALTA); salvaescaleras 5.400 (5,32, ALTA).
- Finanzas sénior: «plan de pensiones» 8.100 (2,70; pico de 22.200 en junio); «hipoteca inversa» 8.100 (1,87; pico de 18.100 en diciembre); «renta vitalicia» 3.600 (0,61).
- IMSERSO: «imserso» 90.500 y «viajes imserso» 49.500, con picos de 246.000 y 165.000 en septiembre-octubre; CPC de 0,45 a 0,79.

**Tamaño de los subnichos (datos oficiales o sectoriales)**
- Dependencia: **1.682.785 beneficiarios** de prestaciones o servicios en mayo de 2026 ([BOE, Real Decreto-ley 17/2026](https://www.boe.es/boe/dias/2026/06/24/pdfs/BOE-A-2026-13643.pdf)); lista de espera de **142.887 personas**, mínimo histórico (−21 % interanual) ([Ministerio de Derechos Sociales](https://www.dsca.gob.es/es/comunicacion/notas-prensa/lista-espera-dependencia-acelera-su-descenso-baja-21-ultimo-ano)).
- Herencias: **775.162 testamentos autorizados en 2025**, récord histórico y más de un 20 % por encima de 2019 ([elderecho.com](https://elderecho.com/mas-de-775-100-testamentos-se-autorizaron-en-espana-en-2025-el-dato-mas-alto-de-la-serie-historica)); 202.923 viviendas heredadas en el primer semestre de 2025 ([Forbes](https://forbes.es/?p=806820)); récord de 56.108 renuncias a herencias en 2023 ([RTVC](https://rtvc.es/espanoles-testamento-7-diciembre-2025/)); uno de cada cinco españoles muere sin hacer testamento ([RTVC](https://rtvc.es/espanoles-testamento-7-diciembre-2025/)).
- Decesos: el 45,6 % de la población está asegurada (UNESPA). — [roams.es](https://roams.es/actualidad/seguros/casi-la-mitad-de-espanoles-tiene-seguro-de-decesos-cadiz-lidera-con-casi-un-80-de-asegurados/)
- IMSERSO: temporada 2026/2027 a la venta desde el 14-09-2026; unas 882.000 plazas (210.787 son el 23,9 %). El AI Overview menciona «más de 870.000 plazas». — [IMSERSO](https://imserso.es/detalle-actualidad/-/asset_publisher/n1oS8lWfrx6m/content/los-viajes-del-programa-de-turismo-del-imserso-de-la-temporada-2026-2027-comenzaran-a-comercializarse-el-14-de-septiembre-de-2026/20123); [SERP de Apify](https://apify.com/apify/google-search-scraper)
- Teleasistencia pública: la Comunidad de Madrid aprobó 36,7 millones de euros para teleasistencia avanzada a mayores. — [resumen de búsqueda](https://www.comunidad.madrid/press-releases/download/26294)

**Competencia en subnichos (SERP del 29-10-2026)** — [Apify google-search-scraper](https://apify.com/apify/google-search-scraper)
- Residencias: directorios y blogs (mundomayor, cronoshare, miresi, inforesidencias, elrincondelcuidador), que también son fuentes del AIO. Es el subnicho más abierto.
- Ayudas para mayores: administraciones más blogs de cuidadores (clubdecuidadores, cuidum).
- Sucesiones: agencias tributarias autonómicas. Testamento: notarios, bancos y despachos de abogados. Teleasistencia: administraciones y Cruz Roja. Decesos: aseguradoras y comparadores.

### Inferences
- **El mayor valor sin cambiar de sitio** está en tres frentes. (1) Herencias, testamento y sucesiones: mucho volumen y relación directa con viudedad; además, el impuesto de sucesiones tiene un pico en diciembre-enero, que coincide con la temporada alta. (2) Residencias y dependencia: SERP abiertos, una base de 1,68 millones de beneficiarios y 142.887 personas en espera, y familias con poder de decisión. (3) Decesos, teleasistencia y cuidadores: el CPC más alto para AdSense y para lead-gen directo.
- **El IMSERSO equilibra el calendario**: su pico de septiembre-octubre llena el hueco anterior al pico de pensiones de noviembre-enero. Pero su CPC es muy bajo y su SERP lo dominan imserso.es y turismosocial.es.
- Todos estos subnichos comparten el mismo público e intención (mayores e hijos de mayores), por lo que suman autoridad temática en lugar de diluirla. Sí comparten la etiqueta YMYL (finanzas, salud y legal), así que exigen la misma rigurosidad y autoría visible.

### Gaps
- No hay volúmenes del clúster de dependencia (grados, prestaciones, solicitud): el Planificador devolvió nulo.
- No se encontraron cifras de usuarios de teleasistencia ni de plazas o precios medios de residencias en España en 2025-2026.
- No se verificó el número de defunciones de 2025 (INE), que es la base del subnicho de herencias.

## 7. Trayectoria de tráfico realista de un sitio nuevo e independiente bien hecho (meses 1-12)

### Takeaway
Los estudios públicos indican que muy pocas páginas nuevas llegan al top 10 en su primer año: entre el 1,74 % y el 6,11 % según Ahrefs. Los comparables independientes del nicho rondan, según Similarweb, entre 1.000 y 10.000 visitas al mes. Con unas 28 visitas al día (unas 850 al mes) en el mes 1 y la temporada alta por delante, jubilometro.com ya está en la parte baja de ese rango. Un escenario razonable (estimación) sería de unas 3.000 a 15.000 visitas al mes en el pico de noviembre a enero y de 5.000 a 30.000 al mes hacia el mes 12, si el sitio supera los filtros de calidad YMYL.

### Cited Findings
- Ahrefs (muestra de 2023, publicada en 2025): solo el **1,74 %** de las páginas recién publicadas entra en el top 10 en un año; con un filtro alternativo (contenido en inglés de octubre de 2023), el **6,11 %**. De las que lo consiguen, el 40,82 % lo hace en el primer mes. El **72,9 %** de las páginas del top 10 tiene más de 3 años y solo el **13,7 %** menos de uno (22 % en 2017). — [Ahrefs (ES)](https://ahrefs.com/blog/es/cuanto-tiempo-posicionarse-en-google-y-antiguedad-paginas-top)
- Caso anecdótico (blog en español, sin confirmar el país): de unas 50 a unas 500 visitas diarias en seis meses, con ingresos de AdSense de 15 a 180 USD al mes. — [eastondev](https://eastondev.com/blog/es/posts/media/20260108-adsense-traffic-boost-guide/). *Fuente débil.*
- Comparables del nicho (Similarweb, septiembre de 2026, visitas al mes): labrujuladelaspensiones.com 1.275; segurodeceso.es 1.588; clubdecuidadores.com 1.934; mundomayor.com 5.795; economiaresponsablefinanzas.com 10.278; inforesidencias.com 54.546; 65ymas.com 796.144. — [Apify tri_angle/fast-similarweb-scraper](https://apify.com/tri_angle/fast-similarweb-scraper)
- Demanda capturable en temporada: en noviembre de 2025, «pensiones» tuvo 165.000 búsquedas, «subida pensiones» 74.000 y «paga extra pensiones» 27.100; en enero de 2026, «pensión de viudedad» 110.000. En septiembre de 2026, «subida pensiones 2027» llegó a 90.500. — [Apify aitorsm/keyword-volume](https://apify.com/aitorsm/keyword-volume)
- La presencia de AIO se asocia a un CTR del número 1 un 58 % menor. — [Ahrefs](https://ahrefs.com/blog/es/ai-overviews-reducen-clics-actualizacion)

### Inferences
- **Escenarios (estimación propia; supuestos: indexación normal, sin penalización por contenido escalado, publicación rápida de actualidad y mejora del E-E-A-T):**
  - *Meses 1-3 (octubre a diciembre de 2026):* de 30 a 150 visitas al día. Habrá picos puntuales de varios cientos si alguna página de actualidad (subida de 2027, paga extra, elecciones) entra en el top 5 o en Discover. El caso de labrujuladelaspensiones.com (número 1 en una consulta de 90.000 búsquedas al mes) muestra que es posible, pero no lo normal.
  - *Meses 4-6 (enero a marzo de 2027):* enero es el último pico (revalorización, viudedad, PNC, 67 años). Después, caída del 50-70 % en las consultas de actualidad; lo que se sostenga dependerá de las calculadoras y las guías permanentes.
  - *Meses 6-12:* entre 150 y 1.000 visitas al día si el sitio gana autoridad (enlaces, autoría, citas en IA). Es comparable a mundomayor.com o economiaresponsablefinanzas.com, con la cautela de que Similarweb subestima a los sitios pequeños.
- **Ingresos orientativos (estimación):** con unas 10.000 visitas al mes, unas 15.000 páginas vistas y un RPM de 1 a 5 €, saldrían unos 15-75 € al mes con AdSense. Los ingresos solo serían relevantes con más de 100.000 páginas vistas al mes o sumando lead-gen de decesos, residencias o cuidadores.
- **Coste de cambiar de nicho:** al cambiar se pierden la temporada alta inminente (pico de noviembre a enero potenciado por las elecciones del 29-11, la subida de 2027 y la edad de 67 años), la incipiente tracción en ChatGPT y el mes de antigüedad del dominio. Los datos de Ahrefs sobre la antigüedad de las páginas del top 10 penalizan reiniciar.

### Gaps
- No se encontró ningún caso de estudio español, verificable y mes a mes, de un sitio nuevo de pensiones o del nicho sénior.
- No hay datos de Search Console de sitios comparables; Similarweb no es fiable por debajo de unas decenas de miles de visitas al mes.
- No se midió el efecto de Discover ni de Noticias destacadas, que en este nicho de actualidad puede ser la principal fuente de picos.

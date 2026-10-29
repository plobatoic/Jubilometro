# Demanda, estacionalidad y competencia en España (google.es) de 8 nichos de finanzas, legal y trámites, comparados con el nicho de pensiones (datos a 29-10-2026)

> Abreviaturas de fuentes usadas en todo el documento (todas consultadas el 29-10-2026):
> - **KP** = volúmenes de Google Ads Keyword Planner obtenidos con el actor de Apify [memo23/keyword-metrics](https://apify.com/memo23/keyword-metrics) (país ES, idioma es; media de 12 meses oct-2025 → sep-2026; serie mensual desde 2018; incluye KD = dificultad estimada 0-100 de DataForSEO y CPC estimado de Google Ads). Tres lotes de 50 palabras clave ejecutados en esta sesión **antes** de que se alcanzara el límite diario del plan gratuito.
> - **SERP** = 39 búsquedas reales en Google.es con [apify/google-search-scraper](https://apify.com/apify/google-search-scraper) (gl=es, hl=es, escritorio, 1.ª página, complemento «AI Overview» activado).
> - **Trends** = Google Trends, España, últimos 5 años (24-10-2021 → 25-10-2026), datos semanales, extraídos con [apify/google-trends-scraper](https://apify.com/apify/google-trends-scraper). 9 comparaciones de 5 términos con «jubilación» como término ancla común; enlaces verificables en cada nicho. «Tendencia 5 años» = media oct-2021/sep-2022 frente a oct-2025/sep-2026. «Índice estacional» = media del mes / media anual (últimos 3 años).

## 1. ¿Qué términos cabecera definen cada nicho y cuántas búsquedas mensuales tienen en España? (incluye tendencia a 5 años y estacionalidad)

### Takeaway
Por volumen bruto, los mayores son los nichos con intención **navegacional** (SEPE, cita previa, certificado digital, «renta web») y los de calendario fiscal/administrativo (renta, becas, IMV), que un sitio pequeño apenas puede captar. El clúster de pensiones («jubilación» 301.000/mes, «pensiones» 60.500, «subida pensiones 2026» 60.500 de media con pico de 450.000) está en la franja media-alta y es de los que **más crece** en Google Trends a 5 años; caen euríbor, ayudas al alquiler, cita previa DNI y, ligeramente, «paro».

### Cited Findings

#### Fuentes, método y advertencias
- Los volúmenes KP son medias de 12 meses redondeadas en «tramos» de Google (p. ej. 1.900, 2.400, 4.400, 5.400…), y Google agrupa variantes cercanas: «cuenta remunerada» y «cuentas remuneradas» dan el mismo 27.100 — [KP](https://apify.com/memo23/keyword-metrics).
- KP no devolvió volumen para «edad de jubilación» (ni sin tilde), «cheque bebé» (con tilde; sin tilde = 1.900) ni «cl@ve» (inválido) ni «revalorización pensiones 2027» — [KP](https://apify.com/memo23/keyword-metrics).
- La serie larga de KP tiene saltos por reagrupación de variantes (p. ej. «jubilación» pasa de ~7.025/mes de media en oct-2020/sep-2021 a 329.583 en oct-2025/sep-2026; «herencias» de 9.508 a 74.808 en un año), por eso la tendencia a 5 años se toma de Google Trends y KP se usa solo para el nivel actual y la estacionalidad intraanual — [KP](https://apify.com/memo23/keyword-metrics).
- Referencias de otros investigadores (aportadas por el coordinador, no verificadas aquí): «precio luz hoy» ≈ 947.000/mes y términos cabecera de pensiones ≈ 180.000/mes. Mi lectura KP para «jubilación» (301.000) es mayor que esa cifra, probablemente por agrupación de variantes; tratar ambas como órdenes de magnitud.

#### Pensiones (referencia)
| Término | KP media/mes | Pico últimos 12 m | KD | CPC |
|---|---|---|---|---|
| jubilación | 301.000 | 673.000 (nov-25) | 28 | 2,43 € |
| pensiones | 60.500 | 165.000 (nov-25) | 36 | 1,86 € |
| subida pensiones 2026 | 60.500 | 450.000 (oct-25) | 4 | 0,14 € |
| subida pensiones 2027 | 8.100 (arrancando) | 90.500 (sep-26) | 0 | 1,65 € |
| pensión de viudedad | 33.100 | 110.000 (ene-26) | 0 | 1,30 € |
| pensión no contributiva | 27.100 | 74.000 (dic-25) | 4 | 0,16 € |
| jubilación anticipada | 22.200 | 49.500 (ene-26) | 4 | 1,12 € |
| calculadora pensión jubilación | 14.800 | 22.200 (ene-26) | 26 | 3,42 € |
| simulador pensión jubilación | 12.100 | 18.100 (feb-26) | 20 | 2,28 € |
| jubilación activa / paga extra pensiones / pensión mínima | 5.400 / 3.600 / 1.900 | — | — | — |
- Fuente de la tabla: [KP](https://apify.com/memo23/keyword-metrics).
- Trends 5 años: «jubilación» +190 % (10,9→31,7), «pensiones» +10 % (25,0→27,6), «edad de jubilación» +256 % (0,9→3,2), «pensión de viudedad» +145 % (1,1→2,7), «jubilación anticipada» +107 % (1,5→3,1). Estacionalidad de «pensiones»: dic-ene (índice 1,5) y oct (1,3); valle en julio (0,66). En octubre de 2026 hay un pico anómalo: «jubilación» marca 100 la semana del 11-10-2026 y «pensiones» promedia 59,5 en octubre frente a 27,6 de media anual — [Trends pensiones](https://trends.google.com/trends/explore?date=today%205-y&geo=ES&hl=es&q=jubilaci%C3%B3n,pensiones,edad%20de%20jubilaci%C3%B3n,pensi%C3%B3n%20de%20viudedad,jubilaci%C3%B3n%20anticipada).
- Consultas «en ascenso» ligadas a «jubilación»: «edad jubilación españa 2027» (Breakout), «jubilación parcial con contrato relevo a partir de 2025» (Breakout), «jubilación funcionarios 72 años» (Breakout), «coeficientes reductores jubilación anticipada voluntaria» (+700 %) — [Trends pensiones](https://trends.google.com/trends/explore?date=today%205-y&geo=ES&hl=es&q=jubilaci%C3%B3n,pensiones,edad%20de%20jubilaci%C3%B3n,pensi%C3%B3n%20de%20viudedad,jubilaci%C3%B3n%20anticipada).
- Estacionalidad KP de «subida pensiones 202X»: concentrada sep-ene (índice sep 4,4-7,7) y casi nula en primavera — [KP](https://apify.com/memo23/keyword-metrics).

#### 1) Finanzas personales / ahorro
| Término | KP media/mes | KD | CPC / competencia Ads |
|---|---|---|---|
| calculadora interés compuesto | 90.500 | 15 | 0,57 € / baja |
| letras del tesoro | 60.500 (pico may-26 90.500) | 23 | 1,05 € |
| ipc / ipc 2026 / inflación | 40.500 / 27.100 / 18.100 | 40 / 30 / 30 | 2,23 € |
| cuenta remunerada (=cuentas remuneradas) | 27.100 | 29 | 3,74 € / **alta** |
| depósitos a plazo fijo / mejores depósitos | 18.100 / 6.600 | 16 / 33 | 1,72 € / media |
| fondos indexados | 18.100 | 20 | 1,74 € / media |
| interés compuesto | 12.100 | 31 | 1,19 € |
| subasta letras del tesoro | 9.900 | 20 | 0,15 € |
| plan de pensiones | 8.100 | 25 | 2,81 € |
| mejor cuenta remunerada / cómo ahorrar dinero / calculadora ahorro | 5.400 / 1.900 / 110 | — | 2,45 € (alta) |
- Fuente: [KP](https://apify.com/memo23/keyword-metrics). En KP, «letras del tesoro» promedió 122.833/mes en oct-2022/sep-2023 y ha bajado a 64.083; «calculadora interés compuesto» subió de ~18.233 (2020-21) a ~83.000 — [KP](https://apify.com/memo23/keyword-metrics).
- Trends 5 años: «IPC» plano (21,2→20,8; pico en enero, índice 1,9); «letras del tesoro» 0,1→4,5 (boom en 2022-23 con 9,5 y luego −53 %); «cuenta remunerada» 0,1→6,2 y sigue subiendo (8,5 en oct-2026); «depósitos» +81 % — [Trends finanzas](https://trends.google.com/trends/explore?date=today%205-y&geo=ES&hl=es&q=jubilaci%C3%B3n,IPC,letras%20del%20tesoro,cuenta%20remunerada,dep%C3%B3sitos).
- Estacionalidad suave (enero 1,2-1,7; valle verano) — [KP](https://apify.com/memo23/keyword-metrics).

#### 2) Impuestos (renta, IRPF)
| Término | KP media/mes | Pico | KD | CPC |
|---|---|---|---|---|
| renta 2025 | 673.000 | 3.350.000 (abr-26) | 8 | 1,60 € |
| declaración de la renta | 201.000 | 823.000 (abr-26) | 42 | 1,50 € |
| renta 2026 (próxima campaña) | 165.000 | 1.000.000 (abr-26) | 19 | 1,56 € |
| renta web | 90.500 | 450.000 (abr-26) | 31 | 1,26 € |
| irpf | 60.500 | 135.000 (abr-26) | 30 | 1,13 € |
| calculadora irpf | 49.500 | 74.000 (ene-26) | 15 | 0,04 € |
| borrador renta | 49.500 | 368.000 (abr-26) | 31 | 1,09 € |
| tramos irpf / irpf 2026 | 22.200 / 14.800 | — | 21 / 22 | 0,10 € |
| modelo 100 | 12.100 | 33.100 (jun-26) | 0 | 2,70 € |
| simulador renta / cita previa renta / devolución renta | 6.600 / 4.400 / 3.600 | 33.100 (mar) / 22.200 (may) | — | — |
| retención irpf / calculadora renta / deducciones autonómicas / deducciones renta | 2.400 / 880 / 720 / 390 | abril | — | — |
- Fuente: [KP](https://apify.com/memo23/keyword-metrics).
- Estacionalidad extrema: índice de abril 3,6-7,8 en los términos de renta y valle ago-dic (0,05-0,2); las calculadoras de IRPF pican en enero (1,7, nuevas retenciones) — [KP](https://apify.com/memo23/keyword-metrics); [Trends impuestos](https://trends.google.com/trends/explore?date=today%205-y&geo=ES&hl=es&q=jubilaci%C3%B3n,declaraci%C3%B3n%20de%20la%20renta,IRPF,renta%20web,deducciones%20renta).
- Trends 5 años: «declaración de la renta» +136 % (4,7→11,1), «IRPF» +30 % (14,6→19,0), «renta web» +33 % — [Trends impuestos](https://trends.google.com/trends/explore?date=today%205-y&geo=ES&hl=es&q=jubilaci%C3%B3n,declaraci%C3%B3n%20de%20la%20renta,IRPF,renta%20web,deducciones%20renta).

#### 3) Autónomos
| Término | KP media/mes | Pico | KD | CPC |
|---|---|---|---|---|
| modelo 303 | 49.500 | 135.000 (ene-26) | 4 | 4,48 € |
| modelo 036 | 40.500 | 49.500 (abr-26) | 17 | 2,38 € |
| modelo 130 | 22.200 | 60.500 (abr-26) | 4 | 3,04 € |
| modelo 390 | 12.100 | 90.500 (ene-26) | 0 | 2,13 € |
| autónomos / autónomo | 9.900 / 9.900 | 27.100 (oct-25) | 57 / 28 | 5,48 € / 5,89 € |
| cuota autónomos 2026 / cuota autónomos | 9.900 / 8.100 | 22.200 (oct-25) | 17 / 6 | 1,16-1,96 € |
| cuota autónomos 2027 | 50 (140 en sep-26) | — | — | — |
| alta autónomo / darse de alta como autónomo | 6.600 / 5.400 | — | 37 / 19 | **12,59 € / 8,77 €** |
| calculadora cuota autónomos / calculadora autónomo / tarifa plana / iva trimestral | 1.900 / 1.600 / 1.900 / 1.000 | — | 10 / 0 / 14 / 3 | 2,15-2,38 € |
- Fuente: [KP](https://apify.com/memo23/keyword-metrics).
- Estacionalidad trimestral (plazos de enero, abril, julio y octubre): «modelo 303» índice ene 2,8-2,9, abr 1,9-2,3, oct 1,7-2,0, agosto 0,2-0,3 — [KP](https://apify.com/memo23/keyword-metrics); [Trends autónomos](https://trends.google.com/trends/explore?date=today%205-y&geo=ES&hl=es&q=jubilaci%C3%B3n,aut%C3%B3nomos,cuota%20aut%C3%B3nomos,modelo%20303,modelo%20130).
- Trends 5 años: «autónomos» +54 % (4,1→6,3), «modelo 303» +14 %, «modelo 130» +12 %; en KP «tarifa plana autónomos» cae −72 % y «cuánto paga un autónomo» −65 % — [Trends autónomos](https://trends.google.com/trends/explore?date=today%205-y&geo=ES&hl=es&q=jubilaci%C3%B3n,aut%C3%B3nomos,cuota%20aut%C3%B3nomos,modelo%20303,modelo%20130); [KP](https://apify.com/memo23/keyword-metrics).

#### 4) Empleo / laboral
| Término | KP media/mes | Pico | KD | CPC |
|---|---|---|---|---|
| sepe (navegacional) | 1.220.000 | 1.830.000 (oct-25) | 44 | 1,45 € |
| cita previa sepe (navegacional) | 673.000 | 823.000 (sep-26) | 49 | 1,04 € |
| calculadora sueldo neto | 135.000 | 165.000 (ene-26) | 11 | 0,04 € |
| smi 2026 / salario mínimo / salario mínimo 2026 | 90.500 / 40.500 / 14.800 | 201.000 (feb-26) | 18 / 20 / 9 | 0,06-0,47 € |
| nómina | 60.500 | 90.500 (feb-26) | 20 | 7,05 € |
| prestación por desempleo | 40.500 | 49.500 (ene-26) | 12 | 4,81 € |
| sueldo neto | 22.200 | — | 6 | 0,05 € |
| paro / despido improcedente | 18.100 / 18.100 | 40.500 (feb-26, despido) | 38 / 9 | 2,95 € / 1,02 € |
| calculadora paro / subsidio por desempleo / indemnización por despido | 14.800 / 14.800 / 14.800 | — | 1 / 17 / 13 | 3,05 € / 4,20 € / 0,46 € |
| convenio colectivo | 9.900 | — | 20 | 15,42 € |
| calculadora despido / calculadora finiquito / finiquito | 8.100 / 8.100 / 4.400 | — | 11 / 9 / 0 | 0,18-3,84 € |
| calculadora sueldo neto 2026 / smi 2027 | 4.400 / 260 (1.000 en ago-26) | — | — | — |
- Fuente: [KP](https://apify.com/memo23/keyword-metrics).
- Trends 5 años: «paro» −11 % (57,2→50,7), «finiquito» 0 %, «sueldo neto» −1 %, «salario mínimo» +125 % (2,4→5,4; pico ene-feb, índice 1,6-1,7, ligado a la aprobación anual del SMI) — [Trends empleo](https://trends.google.com/trends/explore?date=today%205-y&geo=ES&hl=es&q=jubilaci%C3%B3n,paro,finiquito,sueldo%20neto,salario%20m%C3%ADnimo).
- En KP «calculadora finiquito» cae de 20.833/mes (oct-22/sep-23) a 7.625 y «calculadora sueldo neto» de 153.917 (oct-23/sep-24) a 124.083 — [KP](https://apify.com/memo23/keyword-metrics).

#### 5) Herencias
| Término | KP media/mes | KD | CPC |
|---|---|---|---|
| herencias / herencia | 74.000 / 60.500 (posible reagrupación reciente) | 17 | 1,86-2,21 € |
| testamento | 18.100 (pico jul-26 49.500) | 0 | 1,25 € |
| impuesto de sucesiones / sucesiones / impuesto sucesiones | 5.400 (pico dic-25 14.800) / 1.900 / 1.300 | 31 / 8 / 31 | 1,48-3,38 € |
| declaración de herederos | 2.900 | 0 | 0,79 € |
| legítima / cómo hacer testamento / renunciar a una herencia | 1.300 / 1.300 / 1.000 | 0 | 0,72-0,76 € |
| calculadora impuesto sucesiones / plusvalía herencia / testamento online / herencia sin testamento | 720 / 480 / 480 / 390 | 0 | — |
| impuesto sucesiones andalucía | 110 | 0 | — |
- Fuente: [KP](https://apify.com/memo23/keyword-metrics).
- Trends 5 años: «herencia» +25 % (18,9→23,6), «impuesto de sucesiones» +12 % (3,4→3,8), «testamento» +45 % (6,6→9,6), «legítima» ~1. Estacionalidad casi plana (índices 0,8-1,2) — [Trends herencias](https://trends.google.com/trends/explore?date=today%205-y&geo=ES&hl=es&q=jubilaci%C3%B3n,herencia,impuesto%20de%20sucesiones,testamento,leg%C3%ADtima).

#### 6) Hipotecas y vivienda
| Término | KP media/mes | KD | CPC / competencia |
|---|---|---|---|
| euribor hoy / euribor | 368.000 / 201.000 | 0 / 29 | 0,71 € / 1,58 € |
| simulador hipoteca / calculadora hipoteca | 74.000 / 49.500 | 27 / 27 | 1,26 € (**alta**) / 1,00 € (media) |
| hipoteca | 49.500 | 40 | 4,15 € |
| precio vivienda | 14.800 | 19 | 3,09 € |
| itp / impuesto transmisiones patrimoniales | 8.100 / 1.900 | 39 / 39 | 1,30 € / 0,04 € |
| plusvalía municipal / calculadora plusvalía | 5.400 / 2.900 | 21 / 0 | 0,21-0,61 € |
| subida alquiler 2026 / ley de vivienda / gastos compraventa vivienda | 3.600 (pico dic-25 14.800) / 2.900 / 1.900 | 0 / 4 / 1 | 0,02-0,70 € |
| actualizar alquiler ipc / índice actualización alquiler / euribor 2027 | 590 / 170 / 170 | 21 / 15 / 7 | 1,43 € |
- Fuente: [KP](https://apify.com/memo23/keyword-metrics). «calculadora gastos compraventa» sin datos en KP.
- Trends 5 años: «hipoteca» +1 % (34,1→34,6; máximo en 2023-24 con 43,7), «euribor» −30 % (22,3→15,6; máximo 2022-23 con 39,0), «plusvalía municipal» y «calculadora hipoteca» ~1 (términos exactos pequeños) — [Trends vivienda](https://trends.google.com/trends/explore?date=today%205-y&geo=ES&hl=es&q=jubilaci%C3%B3n,hipoteca,euribor,plusval%C3%ADa%20municipal,calculadora%20hipoteca).
- En KP, «simulador hipoteca» baja de 116.708/mes (oct-23/sep-24) a 71.583 y «calculadora hipoteca» de 91.250 a 53.333; picos ene-mar — [KP](https://apify.com/memo23/keyword-metrics).

#### 7) Ayudas públicas
| Término | KP media/mes | Pico | KD | CPC |
|---|---|---|---|---|
| beca mec / becas mec 2026 2027 | 450.000 / 22.200 | 823.000 (abr-26) | 66 / 64 | 4,41 € |
| ingreso mínimo vital / imv | 368.000 / 40.500 | 823.000 (feb-26) | 28 / 48 | 2,38-3,67 € |
| ayudas | 22.200 | — | 14 | 1,58 € |
| bono alquiler joven / ayudas alquiler | 14.800 / 9.900 | 33.100 (abr-26) | 24 / 3 | 1,35-1,74 € |
| bono social / bono social eléctrico / bono social 2026 | 8.100 / 4.400 / 320 | 14.800 (feb-26) | 38 / 31 | 1,84-1,96 € |
| prestación por hijo a cargo / ayuda 100 euros por hijo / cheque bebe / complemento ayuda infancia | 2.900 / 2.400 / 1.900 / 170 | — | 0-12 | 0,57-4,08 € |
- Fuente: [KP](https://apify.com/memo23/keyword-metrics).
- Trends 5 años: «ingreso mínimo vital» +60 % (9,6→15,4) y acelerando (28,2 en oct-2026; pico semanal 43 el 9-8-2026); «bono social» −9 %; «ayudas alquiler» −52 % (6,9→3,3); «cheque bebé» sin datos (0). Estacionalidad: becas mar-abr, ago-sep y nov; IMV ene-feb; bono social ene-mar; ayudas alquiler oct-nov — [Trends ayudas](https://trends.google.com/trends/explore?date=today%205-y&geo=ES&hl=es&q=jubilaci%C3%B3n,bono%20social,ingreso%20m%C3%ADnimo%20vital,ayudas%20alquiler,cheque%20beb%C3%A9); [KP](https://apify.com/memo23/keyword-metrics).

#### 8) Trámites administrativos
| Término | KP media/mes | KD | Intención (DataForSEO) |
|---|---|---|---|
| cita previa dni | 301.000 | 36 | navegacional |
| cita previa / cita previa seguridad social | 201.000 / 201.000 | 69 / 39 | navegacional |
| certificado digital / certificado digital fnmt | 201.000 / 27.100 | **92** / 92 | informacional |
| renovar dni | 135.000 | 14 | informacional |
| padrón / certificado de empadronamiento / empadronamiento / padrón municipal | 74.000 / 60.500 / 22.200 / 5.400 | 0 | informacional |
| clave / clave pin | 60.500 (ambiguo) / 40.500 | 42 / 83 | transaccional |
- Fuente: [KP](https://apify.com/memo23/keyword-metrics).
- Trends 5 años: «cita previa DNI» −39 % (21,3→12,9), «certificado digital» +7 % (38,8→41,5), «empadronamiento» +25 % (23,1→28,9), «cl@ve» ~3 plano; estacionalidad baja (0,7-1,2, valle en diciembre). Consultas en ascenso de «certificado digital»: «dehu» (Breakout), «mi carpeta ciudadana» (+500 %), «instalar certificado digital en iphone» (+250 %), «firmar pdf con certificado digital» (+150 %), «autofirma» (+90 %) — [Trends trámites](https://trends.google.com/trends/explore?date=today%205-y&geo=ES&hl=es&q=jubilaci%C3%B3n,cita%20previa%20DNI,certificado%20digital,cl%40ve,empadronamiento).

#### Interés relativo frente a «jubilación» (Trends, oct-2025/sep-2026, cociente con el ancla de cada comparación)
- paro 1,9×; certificado digital 1,3×; hipoteca 1,2×; IRPF 1,5×; declaración de la renta 0,9×; empadronamiento 0,9×; pensiones 0,9×; herencia 0,7×; IPC 0,7×; euribor 0,55×; IMV 0,5×; cita previa DNI 0,4×; testamento 0,3×; sueldo neto 0,24×; bono social 0,23×; autónomos 0,2×; salario mínimo 0,2×; cuenta remunerada 0,2×; finiquito 0,19×; letras del tesoro 0,14×; impuesto de sucesiones 0,12×; modelo 303 0,10×; ayudas alquiler 0,10× — enlaces Trends de cada nicho arriba (p. ej. [Trends empleo](https://trends.google.com/trends/explore?date=today%205-y&geo=ES&hl=es&q=jubilaci%C3%B3n,paro,finiquito,sueldo%20neto,salario%20m%C3%ADnimo)).

### Inferences
- Gran parte del volumen de trámites, empleo (SEPE) e impuestos (renta web, cita previa) es navegacional: el usuario quiere la web oficial; el volumen «capturable» por un sitio de contenidos es una fracción pequeña (estimación cualitativa, no medida).
- Los términos con año («renta 2026», «smi 2027», «cuota autónomos 2027», «subida pensiones 2027», «calculadora sueldo neto 2026») se reinician cada año; ya empiezan a registrar búsquedas en ago-sep 2026, lo que da a un sitio nuevo una ventana para posicionarse antes del pico (sep-ene en pensiones, ene-feb en SMI, abr-jun en renta).
- Las estacionalidades son complementarias (pensiones sep-ene; SMI/IRPF ene-feb; renta abr-jun; autónomos trimestral; becas mar-abr/ago-sep), por lo que un sitio que combine pensiones con laboral/fiscal suavizaría su tráfico anual.
- Pensiones, IMV, salario mínimo, testamento y «declaración de la renta» crecen; euríbor, ayudas al alquiler, cita previa DNI, calculadoras de hipoteca/finiquito y «paro» decrecen.

### Gaps
- No pude contrastar los volúmenes KP con Ahrefs/Semrush (no disponibles) ni repetir KP: el actor llegó después al límite diario del plan gratuito (según el coordinador).
- KP no da dato para «edad de jubilación» y «cheque bebé»: solo hay interés relativo (Trends).
- Causa no verificada del pico de «jubilación»/«pensiones» en octubre de 2026 y del alza de IMV en 2026 (la búsqueda web devolvió solo noticias de la Seguridad Social de EE. UU.).
- Demanda LatAm no medida (solo indicios en la SERP; ver sección 2).

## 2. ¿Cómo es hoy la SERP de Google.es para esos términos: quién posiciona, hay AI Overviews, fragmentos destacados, herramientas propias de Google?

### Takeaway
Las AI Overviews («Vistas creadas con IA») aparecieron en 33 de 39 búsquedas (85 %) de la muestra: en 32 de 35 consultas de los 8 nichos, pero solo en 1 de 4 de pensiones. La composición del top 10 cambia mucho: trámites 80 % webs oficiales y ayudas 56 %; impuestos y autónomos ~35 % oficial + 54-58 % marcas/SaaS; herencias (62 %), empleo (37 %) y vivienda (34 %) son los que más webs independientes o pequeñas tienen en el top 10; pensiones solo 2 %.

### Cited Findings
- Google activó las AI Overviews en España el 26-03-2025; un estudio de SE Ranking con 100.000 palabras clave (recogidas entre el 30-05 y el 3-06-2025) las encontró en el 33,23 % de las búsquedas en España, con **finanzas al 69,45 %** y salud al 48,01 %. La mayoría cita 4-6 enlaces del top 20 orgánico — [SE Ranking](https://seranking.com/es/blog/ai-overviews-en-espana/).
- En el lanzamiento se mostraban en búsquedas en español e inglés y solo a mayores de 18 años con sesión iniciada — [Trecebits](https://www.trecebits.com/resultados-busqueda-ia-google-espana/). Una guía de octubre de 2026 indica que no se pueden desactivar (el filtro «Web» muestra solo enlaces) y que también existe el «Modo IA» — [WWWhatsnew](https://wwwhatsnew.com/2026/10/25/resumenes-ia-google-ai-overviews-modo-ia-buscar-sin-ellos/).
- Resumen por nicho de la muestra (O = oficial, B = banco/aseguradora/medio/SaaS, I = independiente/pequeño, incl. despachos; % sobre resultados del top 10) — [SERP](https://apify.com/apify/google-search-scraper):

| Nicho (consultas) | AIO | PAA | Oficial | Marca/medio/SaaS | Independiente | Social/vídeo |
|---|---|---|---|---|---|---|
| Pensiones (subida pensiones 2027, edad de jubilación, pensión de viudedad, calculadora pensión jubilación) | 1/4 | 2/4 | 26 % | 55 % | 2 % | 10 % |
| Finanzas (cuenta remunerada, letras del tesoro, calculadora interés compuesto, IPC) | 2/4 | 3/4 | 30 % | 46 % | 17 % | 5 % |
| Impuestos (renta 2025, tramos IRPF, deducciones autonómicas renta, calculadora IRPF) | 4/4 | 2/4 | 35 % | 58 % | 2 % | 2 % |
| Autónomos (cuota autónomos, modelo 303, alta autónomo, calculadora cuota autónomos) | 4/4 | 3/4 | 36 % | 54 % | 6 % | 3 % |
| Empleo (calculadora paro, calculadora finiquito, sueldo neto, salario mínimo 2026, indemnización por despido) | 5/5 | 4/5 | 13 % | 40 % | 37 % | 2 % |
| Herencias (impuesto de sucesiones, legítima herencia, renunciar a una herencia, calculadora impuesto sucesiones) | 4/4 | 3/4 | 13 % | 21 % | 62 % | 2 % |
| Vivienda (calculadora hipoteca, euribor, plusvalía municipal, gastos compraventa vivienda, actualizar alquiler IPC) | 4/5 | 4/5 | 15 % | 43 % | 34 % | 4 % |
| Ayudas (bono social, ingreso mínimo vital, ayudas alquiler, cheque bebé, beca MEC) | 5/5 | 3/5 | 56 % | 27 % | 2 % | 4 % |
| Trámites (cita previa DNI, certificado digital, clave pin, certificado empadronamiento) | 4/4 | 4/4 | 80 % | 9 % | 6 % | 0 % |

- Top 10 por consulta (dominios en orden) — [SERP](https://apify.com/apify/google-search-scraper):
  - **Pensiones**: «subida pensiones 2027»: bbvamijubilacion.es, facebook.com, seg-social.es, ondacero.es, diariodecadiz.es, facebook.com, ayuda-social.es, youtube.com, rtve.es (sin AIO). «edad de jubilación»: vidacaixa.es ×2, seg-social.es, mites.gob.es, caixabank.com, sede.seg-social.gob.es, sanidad.ccoo.es, ibercaja, institutosantalucia.es (sin AIO). «pensión de viudedad»: amavir.es, youtube.com, seg-social.es, zurich.es, mapfre.es, sedemugeju.gob.es, vidacaixa.es (sin AIO). «calculadora pensión jubilación»: bankinter.com ×2, bbva.es, fundación Mapfre, institutosantalucia.es, mapfre, ibercaja, sede.seg-social.gob.es (con AIO).
  - **Finanzas**: «cuenta remunerada»: openbank, raisin, finect, bankinter, abanca, myinvestor, medinvestor.es, helpmycash, sabadell (sin AIO). «letras del tesoro»: tesoro.es/tesoropublico.gob.es ×6, Santander, N26, CaixaBank, R4 (AIO). «calculadora interés compuesto»: inversa.es, finary.com, investorhouse.com.mx, holainversion.com, play.google.com ×2, eurekers.com, fical.net, calculadoradeinterescompuesto.com (AIO). «IPC»: ine.es ×6, Wikipedia, bmv.com.mx, Bankinter, Santander (sin AIO).
  - **Impuestos**: «renta 2025»: AEAT ×4, CaixaBank ×2, RTVE, Wolters Kluwer (AIO que cita AEAT, Wolters Kluwer, CaixaBank, YouTube, RTVE, TaxDown). «tramos IRPF»: VidaCaixa, TaxDown, La Moncloa, ATC Generalitat, Cuentica, Bankinter, Raisin, Comunidad de Madrid. «deducciones autonómicas renta»: OCU, AEAT, La Vanguardia, YouTube, Taxfix, TaxDown, PayFit, Finect. «calculadora IRPF»: AEAT, Cinco Días, Santander, BBVA, AEAT, Bankinter, autonomoinfo.com, Comunidad de Madrid, Contasimple.
  - **Autónomos**: «cuota autónomos»: AEAT, Camerfirma, Ayuda T Pymes, seg-social ×2, Grupo2000, Holded, Sage. «modelo 303»: AEAT ×4, Wolters Kluwer, Cuentica, Hacienda, Contasimple. «alta autónomo»: Cuentica, Infoautónomos, YouTube, Seg. Social, Quipu, Legálitas, Taxfix, Gencat, autonomosyemprendedor.es (1 anuncio). «calculadora cuota autónomos»: simulador de la Seguridad Social (n.º 1), Cuentica, SEPE, Egarsat, e-fiscalidad.com, Taxfix, Holded, Declarando.
  - **Empleo**: «calculadora paro»: reclamador.es, csif.es, portales de empleo municipales (portalemp), sepe.es, alertatrabajo.com. «calculadora finiquito»: calculo-despido.com, ineaf.es, poderjudicial.es, calcular-finiquito.com, finiqueitor.com, asesoriaencordoba.com, anfix.com, eliasymunozabogados.com, fube.es. «sueldo neto»: Cinco Días, Santander, Bankinter, Sabadell, CaixaBank, Expansión, calculaminomina.com, netosueldo.es, BBVA. «salario mínimo 2026»: SEPE, La Moncloa, Wolters Kluwer, CaixaBank, BOE, Prodegest, CCOO, Bankinter. «indemnización por despido»: madridabogados.es, civicabogados.com, Factorial ×2, castellanosyasociados.es, poderjudicial.es, TaxDown, PayFit, conceptosjuridicos.com.
  - **Herencias**: «impuesto de sucesiones»: AEAT, Junta de Andalucía, VidaCaixa, BBVA, Tressis, Allianz, ATC, ATRIGA, Tributos JCyL. «legítima herencia»: Legálitas ×2 y 7 despachos/consultoras. «renunciar a una herencia»: 8 despachos/notaría + reclamador.es. «calculadora impuesto sucesiones»: santamariabaezaabogados.es, isdgalicia.com, acelerafiscal.es ×2, raichvia.com, herenciaenespana.info, clubdelapyme.com, Taxfix, albertovalino.com.
  - **Vivienda**: «calculadora hipoteca»: Banco de España (clientebancario.bde.es), ahe.es, Unicaja, BBVA, ING, Kutxabank, Santander, idealista, iAhorro. «euribor»: euribordiario.es (n.º 1), Expansión, euribor.com.es, Wikipedia, financlick.es, euribor-rates.eu, Santander, Bankinter, iAhorro (sin AIO). «plusvalía municipal»: Ajuntament de Barcelona, Agencia Tributaria Madrid, Bankinter, sede Valencia, gilmar.es, YouTube, iAhorro, BBVA, gesinco.es. «gastos compraventa vivienda»: calculatu.com (n.º 1), inmobiliarias, Instagram, Sabadell, UCI, idealista. «actualizar alquiler IPC»: INE ×2, MIVAU, Sindicat de Llogateres, actualizacion-rentas.com y despachos.
  - **Ayudas**: «bono social»: MITECO, Energía XXI, CNMC, CUR, Endesa, Cruz Roja, Consumo Responde, Iberdrola, Mintur, Ajuntament BCN. «ingreso mínimo vital»: 5 subdominios de seg-social, Cruz Roja, VidaCaixa, CEAIN (AIO que cita también tododisca.es, Las Provincias, elEconomista). «ayudas alquiler»: CaixaBank, COCEMFE, Consorci Habitatge BCN ×2, Bankinter, CARM ×2, Comunidad de Madrid, Junta de Andalucía. «cheque bebé»: valenciaextra.com, TaxDown, Ayto. Alicante, seg-social, silbetika.com, Facebook ×2, El Independiente, JCyL. «beca MEC»: Ministerio de Educación ×6, Gobierno de Canarias, BBVA, UNED, Sanitas.
  - **Trámites**: «cita previa DNI»: citapreviadnie.es, interior.gob.es, dnielectronico.es, sede.policia.gob.es, viafirma. «certificado digital»: FNMT ×6, administracion.gob.es, AEPD. «clave pin»: santanderx.com, clave.gob.es ×2, sede Cantabria, Cibervoluntarios, seg-social, Declarando. «certificado empadronamiento»: 8 ayuntamientos (Madrid, Valencia, Murcia, Alcalá, Barcelona, Las Palmas, Sevilla) + labienal.com.
- YouTube figura como fuente citada en la mayoría de AI Overviews con fuentes extraídas (renta 2025, tramos IRPF, deducciones, alta autónomo, impuesto de sucesiones, legítima, renunciar herencia, plusvalía, gastos compraventa, IMV, cheque bebé, clave pin) — [SERP](https://apify.com/apify/google-search-scraper).
- Hay resultados de México en Google.es para consultas financieras genéricas: investorhouse.com.mx en «calculadora interés compuesto» y bmv.com.mx en «IPC»; entre las relacionadas aparece «Calculadora de interés compuesto Chile» — [SERP](https://apify.com/apify/google-search-scraper).
- «Preguntas relacionadas» (PAA) aparecieron en 28 de 39 consultas — [SERP](https://apify.com/apify/google-search-scraper).

### Inferences
- Las AIO responden ya a preguntas de dato simple (cuánto es el SMI, tramos IRPF, requisitos IMV); el clic orgánico se desplaza hacia herramientas (calculadoras) y consultas largas o locales. Que las consultas de pensiones apenas tengan AIO en esta muestra es una pequeña ventaja relativa del nicho actual, pero con solo 4 consultas no es concluyente.
- La presencia de YouTube en las fuentes de AIO sugiere que el vídeo explicativo es una palanca de visibilidad.
- Las consultas financieras genéricas compiten con contenido en español de LatAm; los nichos ligados a la legislación española (pensiones, renta, autónomos, herencias por CCAA) no, pero tampoco ganan demanda latinoamericana.

### Gaps
- Una sola captura, de escritorio, desde una ubicación y con el complemento de AIO del scraper (usa un proxy específico para aumentar la probabilidad de obtenerlas), así que la frecuencia de AIO para usuarios reales puede ser distinta; no hay datos de móvil ni de CTR.
- El scraper no identifica fragmentos destacados ni widgets propios de Google (calculadoras, paneles de cotización): no pude verificar si Google.es muestra herramientas propias para hipoteca, euríbor o IPC.
- La extracción de anuncios no estaba activada: el único anuncio detectado («alta autónomo») no permite medir la presión publicitaria.

## 3. ¿Qué nichos tienen huecos claros que un sitio nuevo pueda llenar con calculadoras, comparadores o datos originales?

### Takeaway
Los huecos más claros para un perfil «calculadoras + datos oficiales» están en **empleo/laboral** (paro, finiquito, despido, sueldo neto por comunidad: SERP con muchas webs pequeñas y KD bajo), **herencias por comunidad autónoma** (SERP fragmentada y normas autonómicas cambiantes, pero poco volumen), **herramientas de vivienda distintas del simulador hipotecario** (gastos de compraventa/ITP por CCAA, plusvalía por municipio, actualización de alquiler IRAV/IPC) y algunas herramientas de **ahorro** (interés compuesto, rentabilidad neta de letras y depósitos). Impuestos y autónomos tienen demanda de herramientas, pero la cubren la AEAT, la Seguridad Social y SaaS muy fuertes. En trámites y ayudas casi no hay huecos de herramienta.

### Cited Findings
- **Empleo**: «calculadora finiquito» tiene 6 webs independientes en el top 10 (calculo-despido.com n.º 1, calcular-finiquito.com, finiqueitor.com…), «calculadora paro» 4 (reclamador, CSIF, portales municipales, alertatrabajo.com) y «sueldo neto» incluye calculaminomina.com y netosueldo.es entre bancos y medios — [SERP](https://apify.com/apify/google-search-scraper). KD: calculadora paro 1, calculadora finiquito 9, calculadora sueldo neto 11 (135.000/mes), calculadora despido 11 — [KP](https://apify.com/memo23/keyword-metrics). Búsquedas relacionadas: «Calculadora paro 2026», «Calculadora paro neto», «Simulador subsidio desempleo», «Como calcular el paro único», «Calculadora finiquito baja voluntaria 2026», «Calculadora sueldo neto por comunidad / Cataluña / Gipuzkoa», «Salario mínimo 2026 neto / en 12 pagas / por hora» — [SERP](https://apify.com/apify/google-search-scraper).
- El SMI cambia cada año: el Real Decreto 126/2026 (BOE 19-02-2026) lo fija en 1.221 €/mes en 14 pagas (+3,1 %), con efectos desde el 1-01-2026 — [BOE](https://www.boe.es/boe/dias/2026/02/19/pdfs/BOE-A-2026-3815.pdf); [Fieldfisher](https://www.fieldfisher.com/es-es/locations/espana/actualidad/salario-minimo-interprofesional-2026).
- **Herencias**: «calculadora impuesto sucesiones» tiene 8 de 9 resultados independientes y búsquedas relacionadas por comunidad («…Madrid», «…Galicia», «…Cataluña», «Calculadora impuesto donaciones») — [SERP](https://apify.com/apify/google-search-scraper); volumen 720/mes, KD 0 — [KP](https://apify.com/memo23/keyword-metrics). Ya hay competidores nuevos con calculadoras por CCAA: [guiafiscal.es](https://guiafiscal.es/calculadoras/sucesiones/valencia/) y [Copilot Gestoría](https://copilotgestoria.com/blog/impuesto-sucesiones-comunidades-2026-tabla-ccaa-calculadora).
- Las normas de sucesiones cambian por comunidad: modificaciones en la Comunidad Valenciana (Ley 5/2025, bonificaciones del grupo III) — [Fiscal-Impuestos](https://www.fiscal-impuestos.com/novedades-tributarias-comunidad-valenciana-irpf-patrimonio-sucesiones-donaciones-itp-ajd); novedades tributarias de Extremadura para 2026 (Ley 2/2026) — [Cuatrecasas](https://www.cuatrecasas.com/es/spain/fiscalidad/art/extremadura-novedades-tributarias-2026).
- **Vivienda**: «gastos compraventa vivienda» lo encabeza calculatu.com, con 6 de 10 resultados independientes y búsquedas relacionadas «Simulador gastos compra vivienda Andalucía / Navarra / segunda mano / vendedor / OCU»; «actualizar alquiler IPC» combina INE/MIVAU con webs pequeñas (actualizacion-rentas.com) y despachos; «euribor» lo encabeza un independiente especializado (euribordiario.es), con euribor.com.es en el n.º 3 — [SERP](https://apify.com/apify/google-search-scraper).
- El INE publica cada mes el IRAV, índice de actualización de los contratos de alquiler firmados desde el 26-05-2023 — [INE, metodología IRAV](https://ine.es/daco/daco42/irav/meto_IRAV.pdf); valores de 2026: 2,49 % en julio y 2,54 % en septiembre, este último recogido por una sola fuente — [Raisin jul-26](https://www.raisin.com/es-es/noticias/el-irav-de-julio-de-2026-es-del-2-49-la-mayor-subida/); [Raisin sep-26](https://www.raisin.com/es-es/noticias/el-irav-de-septiembre-sube-hasta-el-2-54/).
- Los coeficientes máximos de la plusvalía municipal (IIVTNU) se actualizaron para 2026 en el art. 18 del RDL 16/2025, un decreto que figura como «derogado por falta de convalidación» — [Notarios y Registradores](https://www.notariosyregistradores.com/web/?p=133679).
- **Finanzas**: en «calculadora interés compuesto» hay 6 independientes en el top 10 (algunos mexicanos) y relacionadas «inflación», «por meses», «euros», «diario»; en «letras del tesoro» la PAA incluye «¿Cuánto gano si invierto 10.000 euros en letras del tesoro?» y las relacionadas «Subasta Letras del Tesoro hoy», «calendario» — [SERP](https://apify.com/apify/google-search-scraper).
- **Impuestos**: hay demanda de herramientas («calculadora irpf» 49.500, «simulador renta» 6.600 con pico de 33.100 en marzo) — [KP](https://apify.com/memo23/keyword-metrics) —, pero la SERP de «calculadora IRPF» la encabezan la AEAT, Cinco Días y bancos; la cola larga es regional («Tramos IRPF Cataluña/Madrid/Valencia/Galicia/Andalucía/Aragón», «Calculadora IRPF jubilados / nómina / Madrid», «Deducciones Renta 2025 Andalucía / Castilla y León / Comunidad Valenciana») — [SERP](https://apify.com/apify/google-search-scraper).
- **Autónomos**: el simulador oficial de la Seguridad Social es n.º 1 en «calculadora cuota autónomos» y el resto son SaaS; la PAA pide casos por ingresos («¿Cuánto paga un autónomo que gana 2000/3000 euros al mes?») y aparece «Cuota autónomos 2027» entre las relacionadas — [SERP](https://apify.com/apify/google-search-scraper).
- Las cuotas de autónomos de 2026 se mantuvieron en las de 2025 tras retirar el Gobierno la subida — [Forbes](https://forbes.es/economia/849906/el-gobierno-renuncia-a-subir-las-cuotas-mensuales-de-los-autonomos-y-prorroga-las-de-2025-para-2026/); [El Derecho](https://elderecho.com/el-gobierno-prorroga-las-cuotas-de-autonomos-en-2026-sin-subidas). OIE atribuye la prórroga al RDL 3/2026 y a la Orden PJC/297/2026 y señala que el tipo sube al 31,50 % por el MEI (0,9 %) — [OIE](https://www.oie.es/cuotas-de-autonomos/). Hay discrepancia de fuentes sobre el instrumento legal.
- **Ayudas**: las búsquedas relacionadas piden simuladores de elegibilidad («Simulador Ingreso Mínimo Vital», «Tabla Ingreso Mínimo Vital», «Bono Social simulador») y versiones locales («Cheque bebé Alicante/València 2026», «Ayudas alquiler Madrid/Alicante 2026») — [SERP](https://apify.com/apify/google-search-scraper). Los descuentos extraordinarios del bono social se prorrogaron hasta el 31-12-2026 en el RDL 16/2025, que no fue convalidado — [Notarios y Registradores](https://www.notariosyregistradores.com/web/?p=133679).
- Frecuencia de cambios que dan motivos para actualizar:
  - **Mensual**: IPC, IRAV y euríbor.
  - **Trimestral**: modelos 303 y 130.
  - **Anual**: SMI, revalorización de pensiones, cuotas y bases de autónomos, campaña de la renta y deducciones autonómicas, coeficientes de plusvalía, becas.
  - **Irregular, por comunidad**: sucesiones, ITP, ayudas.
  - Fuentes: [BOE SMI](https://www.boe.es/boe/dias/2026/02/19/pdfs/BOE-A-2026-3815.pdf), [INE IRAV](https://ine.es/daco/daco42/irav/meto_IRAV.pdf), [Notarios y Registradores](https://www.notariosyregistradores.com/web/?p=133679), [OIE](https://www.oie.es/cuotas-de-autonomos/).

### Inferences
- Para este propietario, la mejor combinación de demanda, competencia y uso de sus puntos fuertes parece estar en calculadoras laborales y de vivienda con datos oficiales actualizados (SMI, IRPF, IRAV, ITP por CCAA). Herencias aporta poco volumen, aunque encaja con el público de pensiones (viudedad, herencias, IRPF de jubilados).
- Las variantes por CCAA (17 comunidades más regímenes forales) permiten muchas páginas útiles, pero cada una exige verificar la norma autonómica. Hacerlas en masa con IA sin verificación agravaría el problema de «contenido de poco valor».
- Las calculadoras de sueldo neto e IRPF tienen un CPC de 0,04 €, lo que apunta a un RPM bajo pese al gran volumen; paro (3,05 €), prestación (4,81 €), nómina (7,05 €) y alta de autónomo (12,59 €) tienen más valor publicitario (inferencia a partir de CPC de Google Ads, no de RPM de AdSense).

### Gaps
- No hay datos de tráfico ni de enlaces de las webs pequeñas que posicionan (calculo-despido.com, calculatu.com, euribordiario.es…), así que no sé cuánto tardaron ni qué autoridad tienen.
- No verifiqué si existen simuladores oficiales de elegibilidad para IMV o bono social, ni el texto vigente de la plusvalía 2026 tras la no convalidación del RDL 16/2025.
- No encontré confirmación oficial de los tramos de cuota de autónomos de 2027.

## 4. ¿Qué nichos están más dominados por sitios oficiales o grandes marcas, de modo que un sitio nuevo difícilmente posicionará?

### Takeaway
Los menos accesibles son **trámites** (80 % oficial, intención navegacional, KD de hasta 92) y **ayudas** (56 % oficial más bancos y medios de «ayudas»). Les siguen **impuestos** y **autónomos** (AEAT/Seguridad Social más SaaS y bancos: más del 90 % del top 10). En **finanzas comerciales** (cuentas remuneradas, depósitos, hipotecas) dominan bancos y comparadores con competencia publicitaria alta. **Pensiones** también está dominado por bancos y aseguradoras con hubs de jubilación, la Seguridad Social y los medios (2 % independientes).

### Cited Findings
- Composición del top 10 por nicho: tabla de la sección 2 — [SERP](https://apify.com/apify/google-search-scraper).
- KD alto en cabeceras: certificado digital 92, clave pin 83, cita previa 69, beca mec 66, autónomos 57, cita previa sepe 49, imv 48, sepe 44, declaración de la renta 42, ipc 40, hipoteca 40, bono social 38, pensiones 36, cita previa dni 36. KD bajo: calculadora paro 1, calculadora finiquito 9, despido improcedente 9, calculadora sueldo neto 11, modelo 303/130 4, subida pensiones 2026 4, pensión de viudedad 0, calculadora interés compuesto 15 — [KP](https://apify.com/memo23/keyword-metrics).
- Competencia de Google Ads «alta» en cuenta remunerada, cuentas remuneradas, mejor cuenta remunerada y simulador hipoteca; «media» en depósitos a plazo fijo, mejores depósitos, fondos indexados, calculadora hipoteca y darse de alta como autónomo — [KP](https://apify.com/memo23/keyword-metrics).
- DataForSEO clasifica como navegacionales cita previa dni, cita previa, cita previa seguridad social, cita previa sepe e irpf — [KP](https://apify.com/memo23/keyword-metrics).
- Google da más peso a la experiencia, autoridad y fiabilidad (E-E-A-T) en temas que pueden afectar a la salud, la estabilidad financiera o la seguridad de las personas, o al bienestar de la sociedad: los «Your Money or Your Life» (YMYL) — [Google Search Central](https://developers.google.com/search/docs/fundamentals/creating-helpful-content).
- Las SERP de ayudas y de subidas de pensiones atraen medios de «ayudas» y noticias (ayuda-social.es, valenciaextra.com, tododisca.es citado por la AIO) y redes sociales (Facebook ×2 en «subida pensiones 2027» y «cheque bebé») — [SERP](https://apify.com/apify/google-search-scraper).

### Inferences
- Exigencia YMYL estimada, de mayor a menor (juicio propio a partir de la definición de Google):
  1. Herencias (asesoría legal y fiscal), finanzas e hipotecas (decisiones de inversión y endeudamiento).
  2. Impuestos, autónomos, empleo y pensiones (cifras oficiales con consecuencias económicas).
  3. Ayudas: riesgo alto de desinformación sobre requisitos y cuantías, y competencia de sitios de baja calidad. Encaja mal con un sitio que acaba de recibir «contenido de poco valor».
  4. Trámites: menor daño potencial, pero monopolio oficial.
  Todos son YMYL; ninguno es una salida «fácil» frente a pensiones.
- La cabecera es casi inaccesible en trámites, ayudas, renta y autónomos. Un sitio nuevo solo podría aspirar a la cola larga, como las consultas de soporte técnico en ascenso: instalar el certificado en iPhone, Autofirma o DEHú.

### Gaps
- Sin datos de autoridad de dominio (DR/DA) ni de enlaces de los incumbentes; la clasificación oficial/marca/independiente es manual y discutible en algunos casos (p. ej., portales municipales de empleo, Legálitas o Reclamador como «marca»).

## 5. ¿Cómo se comparan estos nichos en demanda y dificultad con las consultas de pensiones?

### Takeaway
Pensiones no es claramente peor. Su demanda está en la franja media-alta («jubilación» 301.000; «subida pensiones 2026» 60.500 de media y 450.000 en el pico; calculadora/simulador de pensión ~27.000 juntos), crece más que casi todos los nichos en Trends, tiene KD bajo en la cola larga, CPC de 2-3,5 € en las consultas de cálculo y casi no muestra AI Overviews en la muestra. Su punto débil es la SERP: bancos y aseguradoras, Seguridad Social y medios, con casi ningún independiente en el top 10. El único nicho con una ventaja competitiva clara es **empleo/laboral** (37 % independientes, calculadoras con KD 1-11 y 135.000/mes para sueldo neto), aunque tiene AIO en todas sus consultas, CPC muy bajo en las calculadoras más grandes y una tendencia plana o a la baja salvo el SMI. Los demás son más grandes pero navegacionales u oficiales (trámites, ayudas, renta), más pequeños (herencias) o más comerciales y de marca (finanzas, hipotecas).

### Cited Findings
| Nicho | Mayor término informativo / de herramienta (KP/mes) | Tendencia 5 años (Trends) | Independientes top 10 | AIO muestra | CPC orientativo |
|---|---|---|---|---|---|
| Pensiones | jubilación 301.000; subida pensiones 2026 60.500 (pico 450.000); calculadora pensión 14.800 | jubilación +190 %, pensiones +10 % | 2 % | 1/4 | 1,3-3,4 € |
| Finanzas | calculadora interés compuesto 90.500; letras 60.500; cuenta remunerada 27.100 | IPC −2 %, letras ↓ desde 2023, cuentas ↑ | 17 % | 2/4 | 0,6-3,7 € |
| Impuestos | renta 2025 673.000 (pico 3,35 M); calculadora irpf 49.500 | IRPF +30 %, declaración +136 % | 2 % | 4/4 | 0,04-2,7 € |
| Autónomos | modelo 303 49.500; cuota autónomos ~8-10.000 | autónomos +54 % | 6 % | 4/4 | 2-12,6 € |
| Empleo | calculadora sueldo neto 135.000; smi 2026 90.500; calculadora paro 14.800 | paro −11 %, SMI +125 % | 37 % | 5/5 | 0,04-7 € |
| Herencias | herencia(s) 60-74.000; testamento 18.100; calculadora sucesiones 720 | herencia +25 % | 62 % | 4/4 | 0,7-3,4 € |
| Vivienda | euribor hoy 368.000; simulador hipoteca 74.000; plusvalía 5.400 | euribor −30 %, hipoteca +1 % | 34 % | 4/5 | 0,2-4,2 € |
| Ayudas | beca mec 450.000; IMV 368.000; bono social 8.100 | IMV +60 %, ayudas alquiler −52 % | 2 % | 5/5 | 1,4-4,4 € |
| Trámites | cita previa dni 301.000; certificado digital 201.000 | cita DNI −39 %, certificado +7 % | 6 % | 4/4 | 0,9-2,4 € |
- Fuentes de la tabla: [KP](https://apify.com/memo23/keyword-metrics); [SERP](https://apify.com/apify/google-search-scraper); Trends de cada nicho (sección 1, p. ej. [Trends pensiones](https://trends.google.com/trends/explore?date=today%205-y&geo=ES&hl=es&q=jubilaci%C3%B3n,pensiones,edad%20de%20jubilaci%C3%B3n,pensi%C3%B3n%20de%20viudedad,jubilaci%C3%B3n%20anticipada)).
- Referencias externas aportadas por el coordinador para comparar (no verificadas por mí): «precio luz hoy» ≈ 947.000/mes y cabeceras de pensiones ≈ 180.000/mes (notas de consumo/estilo de vida).
- Las reglas de pensiones también cambian cada año y con inestabilidad normativa:
  - La revalorización de 2026 (+2,7 %) iba en el RDL 16/2025, que no fue convalidado.
  - Se reaprobó en el RDL 3/2026, convalidado el 26-02-2026 por 317 votos a favor.
  - Los RDL 2/2026 y 4/2026 quedaron derogados.
  - Fuentes: [Notarios y Registradores](https://www.notariosyregistradores.com/web/?p=133679); [Iberley](https://www.iberley.es/noticias/el-congreso-convalida-revalorizacion-las-pensiones-mientras-no-convalida-rd-ley-escudo-social-36131); [Laboral-Social](https://www.laboral-social.com/node/30275).
  - El RDL 16/2025 fijaba además el MEI en 0,90 puntos y una pensión no contributiva de 8.803,20 €/año — [Notarios y Registradores](https://www.notariosyregistradores.com/web/?p=133679).
- En sep-2026 «subida pensiones 2027» ya registraba 90.500 búsquedas/mes, con la temporada sep-ene por delante — [KP](https://apify.com/memo23/keyword-metrics).

### Inferences
- En demanda, pensiones es comparable a herencias, autónomos o las calculadoras laborales y de vivienda, y menor que renta, SEPE, trámites, becas o IMV. Esos nichos grandes son sobre todo navegacionales u oficiales, así que su ventaja real para un sitio pequeño es menor de lo que sugieren los volúmenes.
- En dificultad, pensiones está a la par de impuestos y autónomos (dominio de marcas y organismos) y es peor que empleo, herencias o vivienda en cuanto a independientes en el top 10. Su cola larga (viudedad, edad de jubilación 2027, coeficientes reductores, jubilación parcial, IRPF de jubilados) tiene KD bajo y está en crecimiento.
- Ninguno de los 8 nichos es «claramente mejor» a la vez en demanda, competencia y crecimiento. La opción con más evidencia a favor sería ampliar el sitio actual con calculadoras laborales y fiscales cercanas a su público, como paro o finiquito para mayores de 52, el subsidio para mayores de 52, IRPF de pensionistas o herencias y viudedad, antes que empezar de cero en un dominio nuevo. Esto es una inferencia para el redactor, no un resultado medido.

### Gaps
- No hay datos de RPM de AdSense por nicho en España (el CPC de Google Ads es solo un indicador indirecto).
- No medí la dificultad real para un dominio de 1 mes (tiempo hasta posicionar) ni el tráfico de los competidores de jubilometro.com.
- La muestra de SERP de pensiones es de solo 4 consultas; convendría repetirla con más consultas y en móvil antes de concluir sobre la frecuencia de AIO.

# Verificación de datos · Revalorización de las pensiones en 2027

| # | Dato | Fuente | Comprobación | Estado |
|---|---|---|---|---|
| 1 | Subida = media de las tasas interanuales del IPC de los doce meses previos a diciembre del año anterior (para 2027: diciembre de 2025 a noviembre de 2026); incluye el complemento de brecha de género; máxima y mínimas se actualizan en el mismo porcentaje | Art. 58.2 LGSS | Texto consolidado del BOE (API de datos abiertos) | Verificado en BOE (28/09/2026) |
| 2 | Si la media es negativa, las pensiones no varían | Art. 58.3 LGSS | Texto del BOE | Verificado en BOE |
| 3 | El antiguo art. 58.4 (la revalorización no podía superar la pensión máxima) está derogado con efectos de 1 de enero de 2025 | Disposición derogatoria 3 del RDL 2/2023; nota del BOE en el art. 58 | Texto del BOE | Verificado en BOE |
| 4 | Pensiones no contributivas: al menos el mismo porcentaje que las contributivas | Art. 62 LGSS | Texto del BOE | Verificado en BOE |
| 5 | Desde 2027, mínima con cónyuge a cargo (65+) ≥ umbral de la pobreza de un hogar de dos adultos (1,5 × umbral unipersonal de la ECV); resto de mínimas +50 % del incremento adicional; PNC con referencia 0,75 × umbral unipersonal | DA 53.ª LGSS (bloque da-29 de la API) | Texto del BOE | Verificado en BOE |
| 6 | Pensión máxima: porcentaje del art. 58.2 + 0,115 puntos acumulativos hasta 2050 | DT 39.ª LGSS; preámbulo del RD 241/2026 | Texto del BOE | Verificado en BOE |
| 7 | IPC interanual: dic-2025 2,9; ene-2026 2,3; feb 2,3; mar 3,4; abr 3,2; may 3,2; jun 3,2; jul 3,6; ago 4,3; sep 4,9 (dato adelantado, tipo 3 en la API). Media de los 10 meses: 33,3 / 10 = 3,33 % | INE, serie IPC290750 (API Tempus3, consultada el 28/09/2026 y el 02/10/2026) | Datos oficiales | Verificado en INE |
| 8 | Escenarios: (33,3 + 2 × media oct-nov) / 12 → 3,0 → 3,28 %; 3,5 → 3,36 %; 4,0 → 3,44 %; 4,5 → 3,53 %; 4,9 → 3,59 %; 5,5 → 3,69 % | — | Cálculo propio | Cálculo propio (estimación, 02/10/2026) |
| 9 | Redondeo a un decimal: media dic-2024/nov-2025 = 2,67 % → subida 2026 del 2,7 %; media dic-2023/nov-2024 = 2,80 % → 2025 del 2,8 % | INE (IPC290750) y La Moncloa | Cálculo propio con datos oficiales | Verificado |
| 10 | Subidas 2022-2026: 2,5 %, 8,5 %, 3,8 %, 2,8 %, 2,7 % | La Moncloa, nota del 10/02/2026 | — | Verificado |
| 11 | 2026: RDL 16/2025 no convalidado el 27/01/2026; RDL 3/2026, de 3 de febrero (BOE-A-2026-2548), convalidado el 26/02/2026; subida efectiva desde el 1 de enero; se aplica al importe a 31 de diciembre | Preámbulo del RD 241/2026; La Moncloa | Texto del BOE y nota oficial | Verificado |
| 12 | 2026: mínimas con cónyuge a cargo y PNC +11,4 %; resto de mínimas más del 7 %; PNC 628,80 €/mes; brecha de género 36,90 €/mes | La Moncloa; RD 241/2026, art. 12 | — | Verificado |
| 13 | Revalorización de oficio; carta anual a los pensionistas | RD 241/2026, art. 20.1; La Moncloa | — | Verificado |
| 14 | Pensión máxima 2026: 3.359,60 €/mes | RD 241/2026, art. 3 | Texto del BOE | Verificado en BOE |
| 15 | Ley 21/2021, de garantía del poder adquisitivo de las pensiones (BOE-A-2021-21652), modificó el art. 58 | Nota del BOE en el art. 58 | — | Verificado en BOE |
| 16 | Ejemplos (tabla de subidas con 3,3/3,5/3,7 %; Carmen 1.450 × 1,035 = 1.500,75 €, +50,75 × 14 = 710,50 € al año; Rosa 700 × 1,035 = 724,50 €) | — | Cálculo propio | Cálculo propio |

## Pendiente de actualizar

- IPC definitivo de septiembre (mediados de octubre), octubre y noviembre: actualizar la tabla y la horquilla cada mes.
- Finales de noviembre: cifra definitiva de la subida. Finales de diciembre: norma que la aprueba y cuantías mínimas y máxima de 2027.

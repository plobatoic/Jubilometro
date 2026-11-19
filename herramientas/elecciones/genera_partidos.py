import os, sys
RAIZ = sys.argv[1]

COMUN_TEMAS = ['subida', 'edad', 'minimas', 'anticipada', 'financiacion', 'irpf', 'viudedad', 'dependencia']
TITULOS = {
    'subida': 'La subida de las pensiones',
    'edad': 'La edad de jubilación',
    'minimas': 'Las pensiones mínimas y no contributivas',
    'anticipada': 'La jubilación anticipada',
    'financiacion': 'Cómo pagar las pensiones',
    'irpf': 'El IRPF de los pensionistas',
    'viudedad': 'Viudedad y orfandad',
    'dependencia': 'Dependencia y cuidados',
}
NO = 'El programa no lo menciona.'

P = {}
P['pp'] = dict(
    nombre='PP', art='el PP', slug='programa-pp-pensiones',
    titulo_seo='Programa del PP para el 29N: qué dice de las pensiones',
    h1='Qué propone el PP sobre las pensiones en su programa para las elecciones del 29N',
    meta='Lo que dice el programa oficial del PP para el 29N sobre pensiones: subida con el IPC, Pacto de Toledo, jubilación activa y dependencia, con su página.',
    clave='programa PP pensiones', miga='Programa del PP',
    doc='«La reconstrucción nacional»', paginas=82, url_pdf='https://www.pp.es/wp-content/uploads/2026/11/LA-RECONSTRUCCION-NACIONAL.pdf',
    web='pp.es', fecha_doc='10 de noviembre de 2026', idioma='',
    resumen=[
        'Mantener el poder adquisitivo y **subir las pensiones cada año con el IPC**, y reconstruir el **Pacto de Toledo** (medida 108).',
        'Deducciones en el IRPF para la **jubilación activa**, es decir, para quien cobra la pensión y trabaja a la vez (medida 108).',
        'Un **Pacto de Estado por la Dependencia** y que el Estado cotice por quien deje de trabajar para cuidar a un familiar (medida 114).',
        'No habla de la edad de jubilación, de las pensiones mínimas ni de la viudedad.',
    ],
    intro='Las pensiones están en el bloque de la medida 108, «GARANTIZAREMOS LAS PENSIONES DE HOY Y SU FUTURO» (páginas 42 y 43 del PDF). La medida siguiente, la 109, está en blanco con el texto «Permanezca atento a la campaña para conocer esta nueva medida». Los mayores y la dependencia están en las medidas 110 a 114 (páginas 43 y 44).',
    temas=dict(
        subida='«Aseguraremos que mantengan su poder adquisitivo y suban cada año con el IPC. Aseguraremos a los más jóvenes que sus futuras pensiones también mantendrán su poder adquisitivo» (medida 108, páginas 42 y 43). Hoy esa subida ya la marca el artículo 58 de la Ley General de la Seguridad Social.',
        edad=NO,
        minimas=NO,
        anticipada='Solo para un caso: «Ampliaremos el acceso a la jubilación anticipada de las personas con síndrome de Down» (medida 112, página 44). Sobre el recorte de la anticipada con 40 años cotizados, el programa no dice nada.',
        financiacion='«Reconstruiremos el Pacto de Toledo sobre un principio claro: las pensiones son un compromiso de Estado, por encima de la confrontación partidista» (medida 108, página 42). Y una ley que asegure la caja única de la Seguridad Social: «las cotizaciones seguirán financiando las pensiones y prestaciones en toda España, sin dividir los recursos por territorios» (medida 18, página 17).',
        irpf='«Incentivaremos la jubilación activa mediante deducciones en el IRPF» (medida 108, página 43). Además, para todos, bajar el IRPF de las rentas medias y bajas y actualizar la tarifa con la inflación (medida 177, página 60).',
        viudedad=NO,
        dependencia='Un «Pacto de Estado por la Dependencia», que el Estado pague el 50 % del gasto público del sistema, que las familias se deduzcan el 40 % de lo que paguen por la atención profesional de un mayor dependiente y que «el Estado cotizará por quien deje de trabajar o reduzca su jornada para cuidar a un familiar dependiente» (medida 114, página 44). También modernizar el IMSERSO y asegurar la atención presencial a los mayores (medida 110, página 43), y planes contra la soledad no deseada (medida 113, página 44).',
    ),
)
P['psoe'] = dict(
    nombre='PSOE', art='el PSOE', slug='programa-psoe-pensiones',
    titulo_seo='Programa del PSOE para el 29N: qué dice de las pensiones',
    h1='Qué propone el PSOE sobre las pensiones en su programa para las elecciones del 29N',
    meta='Lo que dice el programa oficial del PSOE para el 29N sobre pensiones: subida con el IPC en la Constitución, mínimas, anticipada y orfandad, con su página.',
    clave='programa PSOE pensiones', miga='Programa del PSOE',
    doc='«La fuerza de seguir avanzando»', paginas=114, url_pdf='https://www.psoe.es/media-content/2026/11/PROGRAMAPSOE29N26.pdf',
    web='psoe.es', fecha_doc='15 de noviembre de 2026', idioma='',
    resumen=[
        '**Llevar a la Constitución** el sistema público de pensiones y su **subida con el IPC** (medida 100).',
        'Seguir acercando las **pensiones mínimas** a los ingresos del conjunto de la sociedad (medida 98).',
        '«Evaluar» que sea **menor el recorte de la jubilación anticipada involuntaria** con carreras largas (medida 103).',
        'Subir la **pensión de orfandad** del 20 % al 30 % (medida 106) y un año más cotizado por cada hijo (medida 101).',
    ],
    intro='Las pensiones tienen su propio apartado, «Pensiones», con las medidas 98 a 107 (páginas 39 a 41 del PDF). La propuesta de llevar las pensiones a la Constitución se repite en la medida 365 (página 89). La dependencia está en las medidas 202 a 209 (páginas 57 y 58).',
    temas=dict(
        subida='«Blindar constitucionalmente el sistema público de pensiones y su revalorización conforme al IPC, garantizando el derecho de las personas mayores a una pensión digna, suficiente y actualizada» (medida 100, página 40, y medida 365, página 89). Hoy la subida con el IPC está en el artículo 58 de la Ley General de la Seguridad Social; llevarla a la Constitución exige una reforma constitucional.',
        edad='No propone cambiar la edad ordinaria. Sí que la rebaja de edad por trabajos penosos se aplique a cada persona, con «una cuenta individual de penosidad, para reconocer el desgaste laboral real de cada trabajador» (medida 104, página 40).',
        minimas='Seguir «culminando el proceso de convergencia de las cuantías de las pensiones mínimas con estándares de ingresos del conjunto de la sociedad» (medida 98, página 39), y que el Estado pague con impuestos las prestaciones y complementos no contributivos (medida 99, página 40).',
        anticipada='«Evaluar la mejora de los coeficientes reductores de edad por penosidad y la reducción de las penalizaciones de las pensiones por jubilación anticipada involuntaria, especialmente para trabajadores con largas carreras de cotización» (medida 103, página 40). El coste se podría pagar con aportaciones de empresas con beneficios que hagan un ERE.',
        financiacion='Acordar en el Pacto de Toledo nuevas fuentes para que lo que se gane con la automatización financie también la Seguridad Social, y «Acelerar el despliegue de la cuota de solidaridad» de los sueldos más altos (medida 98, página 39). Y que el Estado asuma la financiación de lo no contributivo (medida 99, página 40).',
        irpf='No tiene medidas sobre el IRPF de las pensiones. Sí otras generales, como una deducción que se activaría cuando suban mucho los precios (medida 88, página 37).',
        viudedad='«Elevar del 20% al 30 % la pensión de orfandad, sin el límite del 100 % en supuestos de vulnerabilidad» e integrar la pensión en favor de familiares en el Ingreso Mínimo Vital (medida 106, página 41). Sobre la viudedad, no propone cambios.',
        dependencia='Aplicar del todo la reforma de la dependencia (Ley 4/2026) para reducir las listas de espera, hacer de la ayuda a domicilio un servicio público esencial, proteger mejor a las personas cuidadoras y ampliar la asistencia personal, los centros de día y el respiro familiar (medidas 205 a 208, páginas 57 y 58). En las pensiones, reconocer «un año adicional de cotización por cada hijo o hija» (medida 101, página 40).',
    ),
)
P['vox'] = dict(
    nombre='Vox', art='Vox', slug='programa-vox-pensiones',
    titulo_seo='Programa de Vox para el 29N: qué dice de las pensiones',
    h1='Qué propone Vox sobre las pensiones en su programa para las elecciones del 29N',
    meta='Lo que dice el programa oficial de Vox para el 29N sobre pensiones: sostenibilidad del sistema, cotización por criar a los hijos y dependencia, con su página.',
    clave='programa Vox pensiones', miga='Programa de Vox',
    doc='«Programa electoral. Es sentido común»', paginas=66, url_pdf='https://www.voxespana.es/wp-content/uploads/2026/11/Programa-completo-A5-1.pdf',
    web='voxespana.es', fecha_doc='12 de noviembre de 2026', idioma='',
    resumen=[
        '«Garantizar la **sostenibilidad del sistema de pensiones**» con más empleo, salarios y crecimiento (medida 7).',
        'Que el **Estado cotice por quien cuida de sus hijos**, para que criarlos no penalice la jubilación (medida 94).',
        'Más presupuesto para la **dependencia** y las residencias (medidas 95 y 96).',
        'No habla de la subida con el IPC, la edad de jubilación, las pensiones mínimas, la jubilación anticipada ni la viudedad.',
    ],
    intro='El programa tiene 115 medidas en 13 bloques. Las pensiones aparecen en la medida 7 (páginas 10 y 11 del PDF), dentro del bloque económico, y en el bloque «Familia y vida» (medidas 94 a 96, páginas 51 y 52).',
    temas=dict(
        subida=NO + ' La medida sobre pensiones se refiere a su sostenibilidad (lo vemos en «Cómo pagar las pensiones»).',
        edad=NO,
        minimas=NO,
        anticipada=NO,
        financiacion='«Garantizar la sostenibilidad del sistema de pensiones. Revitalizar la economía, impulsar el empleo, mejorar los salarios y aumentar la riqueza. Una economía más productiva es la garantía de sostenibilidad de las pensiones» (medida 7, página 10). Añade medidas de apoyo a las familias y a la natalidad «contribuyendo a revertir el envejecimiento demográfico» (página 11).',
        irpf='Bajar y simplificar el IRPF en general, con un tipo según el número de hijos (página 9). No tiene una medida propia para las pensiones.',
        viudedad=NO,
        dependencia='«Reforzar el presupuesto en dependencia, las ayudas para el cuidado en el hogar, el apoyo a familiares a cargo», más programas contra la soledad no deseada y más plazas en residencias (medida 95, página 52), y «Eliminar todas aquellas trabas que impiden que las ayudas a la dependencia lleguen de manera rápida e íntegra a los beneficiarios» (medida 96, página 52). En las pensiones: «Cotización a la Seguridad Social financiada por el Estado para los españoles dedicados al cuidado de sus hijos», porque criarlos «no puede ser motivo de penalización en la jubilación» (medida 94, página 51).',
    ),
)
P['frente-amplio'] = dict(
    nombre='Frente Amplio', art='Frente Amplio', slug='programa-frente-amplio-pensiones',
    titulo_seo='Programa de Frente Amplio para el 29N: las pensiones',
    h1='Qué propone Frente Amplio sobre las pensiones en su programa para las elecciones del 29N',
    meta='Lo que dice el programa oficial de Frente Amplio para el 29N sobre pensiones: jubilación a los 65, mínima igual al SMI y anticipada sin recorte, con su cita.',
    clave='programa Frente Amplio pensiones', miga='Programa de Frente Amplio',
    doc='programa electoral completo', paginas=151, url_pdf='https://frenteamplio.info/pdf/ProgramaFrenteAmplio.pdf',
    web='frenteamplio.info', fecha_doc='16 de noviembre de 2026', idioma='',
    resumen=[
        '**Volver a la jubilación a los 65 años**, y a los 60 en algunos oficios penosos.',
        'Que **ninguna pensión sea inferior al salario mínimo** y llevar a la Constitución la subida con el IPC.',
        '**Quitar el recorte de la jubilación anticipada involuntaria** a quien ha cotizado más de 40 años.',
        'Más dinero para la **dependencia**: del 0,8 % al 1,7 % del PIB en 2030.',
    ],
    intro='Las pensiones están en el apartado 4.3, «Pensiones públicas dignas» (páginas 57 y 58 del PDF), dentro del bloque «Salarios y pensiones dignos y precios asequibles». La dependencia está en el bloque de derechos sociales (página 23).',
    temas=dict(
        subida='Llevar a la Constitución, con una reforma por el procedimiento ordinario (artículo 167), «el derecho a la pensión pública y su revalorización automática con arreglo al IPC, que ninguna sea inferior al SMI y que no se privatice la gestión de las pensiones públicas» (páginas 57 y 58). Hoy la subida con el IPC está en el artículo 58 de la Ley General de la Seguridad Social.',
        edad='«Devolveremos la edad de jubilación a los 65 años, que nos fue arrebatada sin diálogo ni justificación en la reforma realizada en 2011» (página 58). Y que en construcción, limpieza, ayuda a domicilio, camareras de piso y pesca se pueda jubilar a los 60 años «por su especial esfuerzo físico y el elevado riesgo de siniestralidad» (página 58).',
        minimas='Que ninguna pensión sea inferior al salario mínimo interprofesional (páginas 57 y 58), que en 2026 es de 1.221 euros al mes en 14 pagas. Y «equiparando pensiones mínimas y no contributivas al umbral de la pobreza» (página 24). También subir las contributivas más bajas y las no contributivas «por encima de la media» y mantener el complemento de brecha de género (página 58).',
        anticipada='«Eliminaremos los coeficientes reductores en las jubilaciones anticipadas de quienes han cotizado más de 40 años y tienen que acogerse a la misma de manera involuntaria» (página 58).',
        financiacion='«Continuaremos elevando progresivamente el tope máximo de cotización y reforzaremos el mecanismo de equidad intergeneracional con una aportación adicional de las empresas más automatizadas» (página 58). Y publicar «de inmediato» la auditoría de las cuentas de la Seguridad Social de 1967 a 2019 (página 58).',
        irpf='Quitar «las deducciones por planes de pensiones privados individuales» (página 46). No tiene medidas sobre el IRPF de las pensiones públicas.',
        viudedad=NO,
        dependencia='Subir el gasto público en dependencia «del 0,8 % al 1,7 % del PIB en 2030», aplicar del todo la reforma de la dependencia (Ley 4/2026), duplicar las horas de ayuda a domicilio y reconocer por ley el «derecho al respiro», con al menos un mes al año en centros de día o estancias temporales (página 23). En las pensiones, reconocer los periodos dedicados a cuidados (página 58).',
    ),
)
P['erc'] = dict(
    nombre='ERC', art='ERC', slug='programa-erc-pensiones',
    titulo_seo='Programa de ERC para el 29N: qué dice de las pensiones',
    h1='Qué propone ERC sobre las pensiones en su programa para las elecciones del 29N',
    meta='Lo que dice el programa oficial de ERC para el 29N sobre pensiones: subida con la inflación, IPC de cada territorio y anticipada por profesión, con su página.',
    clave='programa ERC pensiones', miga='Programa de ERC',
    doc='«Eleccions al Congrés 2026. Programa electoral»', paginas=48, url_pdf='https://esquerrarepublicana.cat/documents/e2026-programa.pdf',
    web='esquerrarepublicana.cat', fecha_doc='5 de noviembre de 2026', idioma=' El programa está en catalán: damos la cita original y su traducción.',
    resumen=[
        '**Blindar la subida de las pensiones** con la inflación (medida 106).',
        'Subirlas con el **IPC de cada territorio**, no con el de toda España (medida 107).',
        '**Jubilación anticipada sin recorte** en profesiones penosas o peligrosas (medida 110).',
        'No habla de la edad de jubilación general, de las pensiones mínimas ni de la viudedad.',
    ],
    intro='Las pensiones están en el apartado «E. Treball digne i seguretat social garantida» (trabajo digno y seguridad social garantizada), medidas 103 a 117 (páginas 25 a 27 del PDF). La dependencia, en la medida 231 (página 41).',
    temas=dict(
        subida='«Blindar la revaloració de les pensions per evitar la pèrdua de capacitat adquisitiva» (blindar la subida de las pensiones para que no pierdan poder adquisitivo), con «l’actualització de pensions públiques d’acord amb la inflació» (la actualización de las pensiones públicas con la inflación) (medida 106, página 26). Y «Revalorar les pensions d’acord amb l’IPC de cada territori» (subirlas con el IPC de cada territorio) (medida 107, página 26). Hoy el artículo 58 de la Ley General de la Seguridad Social usa el IPC de toda España.',
        edad='No propone cambiar la edad general. Sí jubilarse antes en algunas profesiones (lo vemos en «La jubilación anticipada»).',
        minimas=NO,
        anticipada='«Garantir l’accés a la jubilació anticipada sense penalitzacions en la pensió» (garantizar la jubilación anticipada sin recorte en la pensión) a quienes trabajan en profesiones «especialment penosos, perillosos, tòxics o insalubres» (especialmente penosas, peligrosas, tóxicas o insalubres), con los conductores profesionales de mercancías y viajeros por carretera como ejemplo (medida 110, página 26). Sobre los 40 años cotizados, no dice nada.',
        financiacion='Reforzar la financiación «perquè els grans beneficis empresarials i les rendes del capital també contribueixin al sosteniment de la Seguretat Social» (para que los grandes beneficios de las empresas y las rentas del capital también contribuyan a sostener la Seguridad Social), y que Cataluña tenga «capacitat per decidir» (capacidad para decidir) sobre su sistema de pensiones (página 25). Para los autónomos, cuotas según los ingresos reales (medida 112, páginas 26 y 27).',
        irpf='No tiene medidas sobre el IRPF de las pensiones. Sí una reforma general del IRPF que suba los impuestos a las ganancias de capital (medida 69, página 21).',
        viudedad=NO,
        dependencia='Garantizar la financiación de la ley de dependencia y «vetllar pel compliment estricte del finançament del 50 % de l’Administració General de l’Estat» (velar por que el Estado pague el 50 %) (medida 231, página 41).',
    ),
)
P['pnv'] = dict(
    nombre='PNV', art='el PNV', slug='programa-pnv-pensiones',
    titulo_seo='Programa del PNV para el 29N: qué dice de las pensiones',
    h1='Qué propone el PNV sobre las pensiones en su programa para las elecciones del 29N',
    meta='Lo que dice el programa oficial del PNV para el 29N sobre pensiones: subida con el IPC, mínimas y anticipada sin recorte con 40 años cotizados, con su página.',
    clave='programa PNV pensiones', miga='Programa del PNV',
    doc='«Defendemos Euskadi / Euskadi Zaindu»', paginas=43, url_pdf='https://www.eaj-pnv.eus/es/adjuntos-documentos/21765/pdf/programa-electoral-29n',
    web='eaj-pnv.eus', fecha_doc='10 de noviembre de 2026', idioma='',
    resumen=[
        '**Subir las pensiones cada año con el IPC** y mejorar poco a poco las **mínimas y no contributivas** (medidas 01 y 02).',
        '**Quitar el recorte de la jubilación anticipada con más de 40 años cotizados**, también para quien ya está jubilado (medida 03).',
        'Que los **años de cuidados cuenten** para la pensión y rebajar la edad a las cuidadoras con convenio especial (medidas 05 y 06).',
        'Traspasar a Euskadi la **gestión económica de la Seguridad Social** (medida 09).',
    ],
    intro='Las pensiones tienen su propio apartado, «4.1 Pensiones dignas y justicia para las largas carreras de cotización», con las medidas 01 a 09 (páginas 30 y 31 del PDF). Las personas cuidadoras y la dependencia están en el apartado siguiente (páginas 32 y 33).',
    temas=dict(
        subida='«Evitar que las pensiones pierdan poder adquisitivo: revalorizarlas anualmente conforme al IPC, protegiendo su poder adquisitivo frente al incremento del coste de la vida» (medida 01, página 31). Es lo que ya marca hoy el artículo 58 de la Ley General de la Seguridad Social.',
        edad='No propone cambiar la edad general. Sí «Favorecer coeficientes reductores de la edad de jubilación para las personas cuidadoras no profesionales acogidas al convenio especial de la Seguridad Social» (medida 06, página 31).',
        minimas='«Mejorar progresivamente las pensiones mínimas y no contributivas, prestando especial atención a las personas con menores ingresos y en situación de vulnerabilidad» (medida 02, página 31).',
        anticipada='«Eliminar las penalizaciones de la jubilación anticipada para las personas trabajadoras con más de 40 años cotizados, reconociendo las largas carreras laborales y promoviendo medidas para corregir las penalizaciones que afectan también a quienes ya están jubilados» (medida 03, página 31).',
        financiacion='Un sistema público «suficiente, sostenible y basado en la solidaridad entre generaciones», reforzando sus fuentes de financiación en el Pacto de Toledo (medida 07); extender los planes de pensiones de empresa «como complemento y nunca como sustitución de las pensiones públicas» (medida 08); y culminar el traspaso a Euskadi de «la gestión del régimen económico de la Seguridad Social», respetando «el carácter unitario del sistema» (medida 09) (todas en la página 31).',
        irpf='No tiene medidas sobre el IRPF de las pensiones.',
        viudedad=NO,
        dependencia='Una prestación «digna» para quien deja de trabajar o reduce su jornada para cuidar a un familiar dependiente, «tomando como referencia el salario mínimo y la intensidad de los cuidados» (página 33). En las pensiones, reducir la brecha de género y «Asegurar el reconocimiento efectivo de los periodos dedicados a los cuidados familiares en la Seguridad Social» (medidas 04 y 05, página 31).',
    ),
)

P['eh-bildu'] = dict(
    nombre='EH Bildu', art='EH Bildu', slug='programa-eh-bildu-pensiones',
    titulo_seo='Programa de EH Bildu para el 29N: qué dice de las pensiones',
    h1='Qué propone EH Bildu sobre las pensiones en su programa para las elecciones del 29N',
    meta='Lo que dice el programa oficial de EH Bildu para el 29N sobre pensiones: mínimas de 1.220 €, viudedad un 15 % más y anticipada sin recorte, con su página.',
    clave='programa EH Bildu pensiones', miga='Programa de EH Bildu',
    doc='«Programa. Garantía y derechos»', paginas=30, url_pdf='https://posibleegin.ehbildu.eus/wp-content/uploads/2026/11/PROGRAMA-CAS.pdf',
    web='posibleegin.ehbildu.eus', fecha_doc='16 de noviembre de 2026', idioma=' También hay una versión en euskera; citamos la de castellano.',
    resumen=[
        '**Subir las pensiones mínimas al menos hasta 1.220 euros** y actualizarlas con el salario mínimo.',
        'Subir **al menos un 15 % las de viudedad y las no contributivas**.',
        'Mantener y **blindar la subida anual con el IPC**, y rechazar cualquier aumento de la edad de jubilación.',
        '**Jubilación sin recorte con 40 años cotizados** y traspasar a las instituciones vascas y navarras el régimen económico de la Seguridad Social.',
    ],
    intro='Las pensiones tienen su propio apartado, «1.3. Pensiones» (páginas 7 y 8 del PDF), dentro del bloque «Derechos y libertades». La dependencia y los cuidados están en el apartado «1.5.3 Cuidados» (página 12).',
    temas=dict(
        subida='«Garantizar el poder adquisitivo de las y los pensionistas, manteniendo y blindando la revalorización anual al IPC» (página 7). Hoy la subida con el IPC está en el artículo 58 de la Ley General de la Seguridad Social.',
        edad='No propone cambiar la edad. Rechaza «cualquier intento de recorte, privatización o aumento de la edad de jubilación y periodo de cómputo» (página 7).',
        minimas='«Aumentar las pensiones mínimas al menos hasta los 1.220 €, estableciendo la cuantía y su actualización acorde al SMI como exige el movimiento de pensionistas» (página 8). El programa no dice si son 1.220 euros en 12 o en 14 pagas. Y una subida de «al menos un 15 %» de las no contributivas (página 8).',
        anticipada='«Culminar la tramitación de la Ley que reconoce el derecho a pensión sin penalización de las personas con al menos 40 años de cotización» (página 8).',
        financiacion='No propone nuevas fuentes de dinero para las pensiones. Sí la «Transferencia del Régimen Económico de la Seguridad Social a las instituciones vascas y navarras» (página 8), y rechaza volver a «las políticas de austeridad que suponen privatizaciones y recortes en servicios públicos, derechos laborales o pensiones» (página 14).',
        irpf='No tiene medidas sobre el IRPF de las pensiones.',
        viudedad='«Nuevo alza de las pensiones de viudedad y no contributivas de al menos un 15 % hasta alcanzar valores de suficiencia» (página 8). De la orfandad no dice nada.',
        dependencia='Empezar a reconocer el derecho a los cuidados con «la retroactividad de las prestaciones económicas por la dependencia desde la fecha de solicitud», y cambiar el copago «con el objetivo de excluir el copago relativo a los cuidados personales» (página 12). También reconocer los cuidados familiares «con cambios coordinados con la Seguridad Social en lo que respecta a bonificaciones, pensiones y permisos retribuidos» (página 12).',
    ),
)

ORDEN = ['pp', 'psoe', 'vox', 'frente-amplio', 'erc', 'eh-bildu', 'pnv']
SOLO = sys.argv[2].split(',') if len(sys.argv) > 2 else None
ENLACES_TEMA = {
    'subida': ' Cuánto subirán en 2027 con la ley actual lo explicamos en [la subida de las pensiones en 2027](/cuanto-cobrare/revalorizacion-pensiones/).',
    'edad': ' La edad actual, en [la edad de jubilación](/jubilacion/edad-de-jubilacion/).',
    'minimas': ' Las cuantías de 2026, en [la pensión mínima](/cuanto-cobrare/pension-minima/).',
    'anticipada': ' Cómo funciona hoy, en [jubilación anticipada con 40 años cotizados](/jubilacion/anticipada-40-anos-cotizados/).',
}

for k in ORDEN:
    if SOLO and k not in SOLO: continue
    d = P[k]
    DEL = ('del ' + d['nombre']) if d['art'].startswith('el ') else ('de ' + d['nombre'])
    otros = [P[o] for o in ORDEN if o != k]
    sec = []
    for t in COMUN_TEMAS:
        txt = d['temas'][t]
        sec.append(f"## {TITULOS[t]}\n\n{txt}{ENLACES_TEMA.get(t, '')}\n")
    resumen = '\n'.join(f'> - {r}' for r in d['resumen'])
    FRASE = {'subida':'la subida con el IPC','edad':'la edad de jubilación','minimas':'las pensiones mínimas','anticipada':'la jubilación anticipada','financiacion':'cómo pagar las pensiones','irpf':'el IRPF de las pensiones','viudedad':'la viudedad y la orfandad','dependencia':'la dependencia'}
    menciona = [FRASE[t] for t in COMUN_TEMAS if d['temas'][t].startswith(NO) or d['temas'][t].startswith('No tiene medidas sobre el IRPF de las pensiones')]
    faq_no = ('No. ' if menciona else '')
    otros_links = ', '.join(f"[{o['nombre']}](/elecciones/{o['slug']}/)" for o in otros[:-1]) + f" y [{otros[-1]['nombre']}](/elecciones/{otros[-1]['slug']}/)"
    no_dice = ', '.join(menciona[:-1]) + (' ni ' + menciona[-1] if len(menciona) > 1 else (menciona[0] if menciona else ''))
    faq2 = (f"### ¿De qué no habla el programa {DEL}?\n\n{('Del ' + no_dice[3:]) if no_dice.startswith('el ') else ('De ' + no_dice)}. Hemos buscado cada tema en el documento entero, no solo en el apartado de pensiones.\n" if menciona else
            f"### ¿El programa {DEL} habla de todos los temas de la comparativa?\n\nSí: dice algo sobre los ocho temas que comparamos, aunque con distinto detalle.\n")
    texto = f"""---
titulo_seo: "{d['titulo_seo']}"
h1: "{d['h1']}"
meta_descripcion: "{d['meta']}"
url: /elecciones/{d['slug']}/
categoria: Elecciones 2026
miga: {d['miga']}
palabra_clave_principal: {d['clave']}
intencion: informativa
fase_plan: Actualidad (elecciones generales de 2026)
fecha_actualizacion: 2026-11-17
publicacion: 2026-11-17
autor: "Pau Lobato (editor de Jubilómetro)"
estado: publicado
fuentes_legales:
  - {d['url_pdf']}
---

# {d['h1']}

*Actualizado el 17 de noviembre de 2026 · Por Pau Lobato, editor de Jubilómetro · Solo con el programa oficial del partido*

> **Respuesta rápida**
>
> Esto es lo principal que dice sobre las pensiones el programa oficial de {d['art']} para las elecciones del **29 de noviembre de 2026**:
>
{resumen}

## El programa {DEL} y dónde habla de pensiones

{d['art'][0].upper() + d['art'][1:]} ha publicado en su web ({d['web']}) su programa para estas elecciones, {d['doc']}: un PDF de {d['paginas']} páginas. {d['intro']}{d['idioma']}

Contamos lo que dice el programa, con citas literales cortas y la página del PDF, sin valorarlo. Si no habla de un tema, lo decimos. Es la misma estructura que usamos con todos los partidos, para que puedas compararlos en [qué proponen los partidos sobre las pensiones](/elecciones/propuestas-pensiones-partidos/).

{chr(10).join(sec)}
## Preguntas frecuentes

### ¿Lo que propone {d['art']} cambia ya mi pensión?

No. Un programa electoral no cambia nada por sí solo: hace falta que el Gobierno o las Cortes que salgan de las elecciones aprueben una norma. Lo que pasa con tu pensión y con la subida de enero mientras tanto lo explicamos en [las elecciones del 29N y tu pensión](/cuanto-cobrare/elecciones-y-pensiones/).

{faq2}
## Fuentes oficiales

- {d['nombre']}: [{d['doc'][0].upper() + d['doc'][1:]}]({d['url_pdf']}), programa para las elecciones generales del 29 de noviembre de 2026 (PDF, {d['paginas']} páginas). Leído el 17 de noviembre de 2026.
- [Ley General de la Seguridad Social, artículo 58](https://www.boe.es/buscar/act.php?id=BOE-A-2015-11724#a58) (BOE), sobre la subida actual de las pensiones.

## Siguiente paso

- Compara con los demás partidos en [qué proponen los partidos sobre las pensiones](/elecciones/propuestas-pensiones-partidos/).
- Lee lo que proponen {otros_links}.
- ¿Cuánto subirá tu pensión en 2027 con la ley actual? Calcúlalo con la [calculadora de la subida de las pensiones](/calculadoras/subida-pensiones/).

---

*Este artículo es informativo. No recoge opiniones políticas ni recomienda el voto: solo lo que dice el programa oficial del partido, con su página. Si detectas un error, escríbenos a [plobatoic@gmail.com](mailto:plobatoic@gmail.com).*

*Historial de cambios: 17 de noviembre de 2026, primera versión, con el programa oficial publicado en {d['web']}.*
"""
    os.makedirs(os.path.join(RAIZ, 'contenido', 'elecciones', d['slug']), exist_ok=True)
    open(os.path.join(RAIZ, 'contenido', 'elecciones', d['slug'], 'articulo.md'), 'w', encoding='utf-8').write(texto)
    print(d['slug'], len(d['titulo_seo']), len(d['meta']))

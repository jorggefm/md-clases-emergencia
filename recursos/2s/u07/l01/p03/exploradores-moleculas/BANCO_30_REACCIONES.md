# Banco de 30 reacciones para 2S

Ampliacion solicitada el 28/10/2026. Recurso preparado, no actividad ya realizada.

## Progresion

1. Nivel 1, primeros pasos: agua, peroxido de hidrogeno, magnesio, amoniaco y ozono.
2. Nivel 2, moleculas de la vida: maltosa, union de glicinas, fermentacion lactica, urea y metano.
3. Nivel 3, mas elementos: hierro, aluminio, neutralizacion con sodio, neutralizacion con calcio y bicarbonato.
4. Nivel 4, varias transformaciones: carbonato y acido, magnesio y acido, fermentacion alcoholica, metanogenesis y oxidacion completa del acido acetico.
5. Nivel 5, aplicaciones: etanol, acetona, eteno, propano y esterificacion del glicerol.
6. Nivel 6, integracion: etano, glicerol, butano, respiracion y fotosintesis.

La dificultad progresa por bloques combinando guia, cantidad de elementos, productos, parentesis y coeficientes. No es una escala matematica estricta. Los retos de sales y esterificacion son ampliaciones con ayuda; no requieren haber estudiado mecanismos organicos. No se pretende completar todo el banco en una sola clase.

## Garantias y limites

- Se conservan las 40 moleculas, los cinco IDs del piloto y la clave de progreso local.
- Coeficientes 1-30; se rechazan ceros, negativos, fracciones y campos vacios. Se reconocen multiplos y se ofrecen coeficientes minimos.
- Las 30 soluciones se verifican conservando cada elemento; formulas y conteos de las 27 especies adicionales se contrastan mediante RDKit e hidrogenos explicitos.
- Las sales se muestran como proporciones de iones. No llamarlas moleculas. Los metales se cuentan como atomos de una red.
- Las rutas biologicas son balances globales. Condensacion de glicina es formal; no ocurre por solo mezclar en agua. Lactato/amonio y otros equilibrios se aclaran en las limitaciones.
- Todo es virtual. No usar el banco como instrucciones de laboratorio: no encender, mezclar reactivos, cerrar recipientes con gas ni recolectar gases.
- Las imagenes contextuales se comparten por tema; cada ecuacion tiene ademas sus diagramas propios y sus explicaciones. No son evidencia de experimentos realizados.

## Imagenes nuevas

Generadas con la herramienta incorporada imagegen, copiadas a assets:

- rx-laboratorio.png: laboratorio escolar ilustrado, recipientes, muestra de caliza y polvo blanco, sin procedimientos.
- rx-metales.png: magnesio, hierro parcialmente oxidado y aluminio con ampliacion superficial.
- rx-atmosfera.png: Tierra y atmosfera con una ampliacion ilustrativa de ozono, no a escala.
- rx-yogur.png: leche, yogur y bacterias lacticas ampliadas, no a escala.

Prompt comun: ilustracion educativa academica horizontal 16:9, semirrealista clara, objetos reconocibles, blanco y acentos teal, sin texto ni instrucciones experimentales. Los prompts completos se registran en el registro local de esta ampliacion.

## Verificacion

Ejecutar `node scripts/test-reaction-bank.cjs`. Comprueba las treinta ecuaciones en escritorio, tablet y telefono; carga de imagenes, coeficientes, pistas, navegacion, persistencia, migracion del piloto, recuperacion de error y actividad original. `TEST_BASE` permite repetir las mismas pruebas sobre la publicacion.

Fuentes por reto en reactions.json: OpenStax Chemistry/Biology, NASA para ozono, PubChem para triacetina y revision cientifica de hidrolisis de urea. Diagramas de estructura generados con RDKit, no con IA generativa.

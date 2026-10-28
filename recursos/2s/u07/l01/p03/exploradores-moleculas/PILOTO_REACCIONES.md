# Piloto de balanceo integrado

Solicitud del docente, 28/10/2026: cinco ejercicios, misma interfaz, cada reaccion con imagen/explicacion/importancia y moleculas ya conocidas. Es una extension del recurso, no una nueva aplicacion. Los 40 registros y estructuras de `molecules.json` no se modifican.

## Secuencia

1. Metano: CH4 + 2 O2 -> CO2 + 2 H2O. Guia: ajustar agua y despues oxigeno. Se pueden retirar ayudas.
2. Hidrolisis de maltosa: C12H22O11 + H2O -> 2 C6H12O6. Solo falta inicialmente el coeficiente de glucosa.
3. Fermentacion alcoholica: C6H12O6 -> 2 C2H6O + 2 CO2. Todos los coeficientes disponibles.
4. Respiracion celular aerobica: C6H12O6 + 6 O2 -> 6 CO2 + 6 H2O. Resumen global.
5. Fotosintesis: 6 CO2 + 6 H2O -> C6H12O6 + 6 O2, con luz. Resumen global simplificado, no una etapa unica; el oxigeno gaseoso liberado procede del agua.

Metano, maltosa, glucosa y etanol se resuelven desde los datos existentes. Se agregan unicamente las especies auxiliares H2O, O2 y CO2 con sus conteos explicitos. No se construye un parser ni un balanceador general: el nucleo valida conservacion sobre datos estructurados de cinco ecuaciones curadas y verifica las soluciones al cargar. Coeficientes enteros de 1 a 12. Una solucion multiplicada se reconoce balanceada y se propone reducir, sin tratarla como quimicamente incorrecta. El 1 se muestra por claridad escolar.

## Evidencia y limites

Practicamos C2, no declaramos evaluacion C1/C3 por jugar. No hay un experimento real, ejecucion de la clase ni notas institucionales. Ver solucion no resuelve automaticamente. Avance local separado del progreso antiguo; no se incorporan cuentas ni backend. La constancia antigua corresponde al conteo de moleculas.

Fuentes primarias consultadas, enlazadas tambien en cada reaccion:

- https://openstax.org/books/chemistry-2e/pages/4-1-writing-and-balancing-chemical-equations
- https://openstax.org/books/biology-2e/pages/3-1-synthesis-of-biological-macromolecules
- https://openstax.org/books/biology-2e/pages/7-5-metabolism-without-oxygen
- https://openstax.org/books/biology-2e/pages/6-1-energy-and-metabolism

Las imagenes son ilustraciones de contexto ya existentes, no fotografias de moleculas ni datos del salon. La de alimentos no representa maltosa pura; se explicita dentro de la app. No realizar combustion en clase.

## Verificacion

`scripts/test-reaction-pilot.cjs`: balances curados y reducidos, duplicados, entradas invalidas, guia paso a paso, progreso independiente, solucion sin completar, regresion del metano original, imagenes cargadas y ausencia de desbordamiento en 1440/820/390px. Evidencia de ejecucion en `.impeccable/review/tests.json`. Repositorio y espejo deben registrar el commit publicado y comprobar la URL antes de confirmar la entrega.

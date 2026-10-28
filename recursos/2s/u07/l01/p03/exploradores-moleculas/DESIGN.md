---
name: Exploradores de moléculas
description: Exploración táctil de estructuras químicas y construcción de fórmulas para 2S.
colors:
  teal: "#087e7b"
  background: "#eaf5f2"
  surface: "#ffffff"
  text: "#153c48"
  muted: "#4e7079"
  line: "#c4dbd7"
  quiet-background: "#deefeb"
  quiet-text: "#245963"
  carbon: "#83dcd1"
  hydrogen: "#ffb1a7"
  oxygen: "#ffda7a"
  nitrogen: "#b8cff4"
  sulfur: "#eee38c"
  phosphorus: "#e2bcf0"
  focus: "#c04733"
  reaction-element-neutral: "#e6eef1"
  reaction-sodium-magnesium-calcium: "#e9def8"
  reaction-chlorine: "#d4e9c1"
  reaction-iron-aluminium: "#f4d9c1"
typography:
  body:
    fontFamily: "Nunito, system-ui, -apple-system, Segoe UI, sans-serif"
    lineHeight: 1.55
  activity-title:
    fontSize: "32px"
    letterSpacing: "-0.7px"
  section-title:
    fontSize: "24px"
    letterSpacing: "-0.4px"
  formula:
    fontSize: "30px"
    fontWeight: 850
    letterSpacing: "0.5px"
  reaction-title:
    fontSize: "30px"
    letterSpacing: "0"
  reaction-coefficient:
    fontSize: "22px"
    fontWeight: 800
rounded:
  field: "10px"
  control: "12px"
  feedback: "14px"
  sources: "16px"
  panel: "22px"
  reaction-compact: "8px"
spacing:
  work-gap: "22px"
  context-gap: "24px"
components:
  button-primary:
    backgroundColor: "{colors.teal}"
    textColor: "{colors.surface}"
    rounded: "{rounded.control}"
    padding: "16px 22px"
  button-quiet:
    backgroundColor: "{colors.quiet-background}"
    textColor: "{colors.quiet-text}"
    rounded: "{rounded.control}"
    padding: "10px 16px"
  panel:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.panel}"
  reaction-level:
    backgroundColor: "{colors.quiet-background}"
    textColor: "{colors.quiet-text}"
    rounded: "{rounded.reaction-compact}"
    padding: "10px 14px"
  reaction-level-selected:
    backgroundColor: "{colors.teal}"
    textColor: "{colors.surface}"
    rounded: "{rounded.reaction-compact}"
    padding: "10px 14px"
  reaction-coefficient:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    typography: "{typography.reaction-coefficient}"
    rounded: "{rounded.reaction-compact}"
    width: "44px"
    height: "44px"
---

# Diseño aprobado · Exploradores de moléculas

## Banco de 30 reacciones (28/10/2026)

Se mantiene la interfaz aprobada. La ampliacion agrega seis selectores de nivel con avance x/5, barra de progreso y listado desplegable de treinta retos. El selector de ecuaciones agrupa por nivel. Los controles conservan objetivos tactiles de 40 x 44 px y coeficientes enteros 1-30; hay ayudas secuenciales al inicio. En tablet y telefono la navegacion se ajusta sin desplazar el siguiente boton fuera de la pantalla.

Los dibujos de cada sustancia distinguen moleculas, atomos y unidades formula. Se muestran hasta seis copias con una leyenda explicita si el coeficiente es mayor; el contador siempre incluye todas. Se reutilizan trece moleculas del catalogo original y se agregan 27 especies complementarias verificadas con RDKit. Cuatro ilustraciones contextuales nuevas generadas con imagegen cubren laboratorio, metales, atmosfera y yogur; las otras escenas se heredan por tema. No hay fotografias de experimentos reales ni imagenes que sustituyan los diagramas quimicos deterministas.

Alcance documental: ampliación local ya construida, no semilla conceptual. Se conserva el formato heredado de este documento y de `PRODUCT.md`; no se migran sus apartados ajenos a las 30 ecuaciones. El apartado siguiente registra el piloto histórico de cinco: la interfaz vigente muestra «Moléculas · 40» y «Reacciones · 30», y las reglas actuales se añaden en las secciones canónicas inferiores. La fuente de esta ampliación es `index.html`, `reactions.css`, `reactions.js` y `reaction-core.js`, contrastada con `PRODUCT.md` y los estilos heredados. Este registro no sustituye la revisión visual independiente ni declara una nueva aprobación.

## Extension de reacciones del 28/10/2026

Se hereda la composicion aprobada, no se abre rediseño. Un selector de modo conserva Moleculas (40) y suma Reacciones (5). En el modo nuevo, el panel izquierdo contiene coeficientes y copias de las estructuras ya verificadas; el derecho, tabla de atomos antes/despues, comprobacion y ayudas. Se conserva la region inferior de imagen contextual y explicacion. El contexto de fotosintesis reutiliza el esquema de la clase; las otras cuatro imagenes ya pertenecian al juego. Agua/O2/CO2 se representan mediante diagramas de enlaces deterministas, sin pretender ser fotografias.

Los controles nuevos usan fuente fija, espaciado entre letras cero y respuesta tactil. Los pasos guiados son propios del aprendizaje, no instrucciones de la interfaz. Se mantiene la familia cromatica e identidad existente. Los avisos del detector sobre colores, fuentes y radios corresponden a valores heredados o a densidad de coeficientes: entre ellos #b9d1d2, #486970, #547881, #8c3d24, #d9f1e4, #115d3c y #fff0e8; campos de 8px y tipo de 12-28px. No se rediseña la app historica para hacer desaparecer esos avisos.

## Overview

Modo Operate. La autoridad visual sigue siendo la maqueta `glucosa.html` aprobada por el docente en este chat. Este documento registra su implementación final y la revisión final aprobada; no abre un rediseño ni sustituye la maqueta.

La composición conserva el fondo verde claro, el panel blanco amplio para observar la estructura, los contadores a la derecha y la escena realista inferior con explicación. El dibujo y los controles dominan la actividad. El inicio presenta una invitación breve, reglas de lectura y acceso a las 40 moléculas por dificultad. La experiencia permite explorar a ritmo propio, sin cronómetro ni puntuación competitiva.

La extensión de 30 ecuaciones conserva la UI escolar teal y sus dos áreas de trabajo: ecuación con coeficientes y representaciones a la izquierda; recuento, comprobación y ayudas a la derecha. El contexto ilustrado sigue debajo. Los seis niveles orientan una práctica progresiva de cinco retos cada uno, no una calificación ni una obligación de terminar el banco en una clase. Las decisiones del mundo de 40 moléculas y su constancia permanecen intactas.

## Colors

El teal identifica acciones principales y enlaces sobre superficies claras. El texto azul verdoso oscuro mantiene la lectura y los tonos apagados acompañan instrucciones y metadatos.

Los contadores distinguen C en verde agua, H en coral, O en amarillo, N en azul, S en amarillo suave y P en lila. Cada elemento se identifica también con símbolo y nombre. El color acompaña la información escrita, sin asumir su reconocimiento como único medio para entenderla.

Las respuestas correctas usan fondo verde suave con mensaje explícito; las que requieren revisión usan fondo cálido y nombran los elementos que deben comprobarse. El foco de los controles es coral con contorno de 3px y separación de 3px.

En la tabla de reacciones, los nuevos colores son apoyos de identificación, no nuevos acentos de navegación: lila suave para Na/Mg/Ca (`reaction-sodium-magnesium-calcium`), verde claro para Cl (`reaction-chlorine`) y melocotón para Fe/Al (`reaction-iron-aluminium`). La base gris azulada (`reaction-element-neutral`) se aplica a los demás símbolos de esta tabla, incluidos C/H/O/N/S; no reemplaza los colores de los contadores del modo Moléculas. El símbolo permanece escrito y el nombre aparece como título del distintivo; «Iguales» o «Faltan…» explican el balance.

**The Color de apoyo Rule.** En reacciones, el color acompaña al símbolo y al balance escrito; no identifica por sí solo una sustancia ni su estado de resolución. El teal mantiene su función en acciones, enlaces, selección, progreso y dirección de lectura de la ecuación.

## Typography

La pila declarada es `Nunito, system-ui, -apple-system, 'Segoe UI', sans-serif`; la aplicación no carga una fuente web, por lo que la disponibilidad local determina la familia utilizada. La jerarquía usa títulos destacados, explicaciones de interlineado amplio y cifras tabulares en recuentos y progreso.

- Título inicial: `clamp(34px, 4vw, 57px)`, interlineado 1.08; en móvil, 39px.
- Título de molécula: 32px en escritorio y 27px en móvil.
- Encabezados de panel: 24px en escritorio y 22px en móvil.
- Instrucciones: 15–16px; la introducción emplea 20px en escritorio y 18px en móvil.
- Fórmula comprobada: 30px y peso 850; subíndices al 65% para conservar la notación química.
- Campos de conteo: 22px y peso 800.

En reacciones, el título usa `reaction-title` y baja a 27px hasta 780px; los encabezados conservan la escala heredada de 24px/22px, con espaciado entre letras cero. Los coeficientes usan `reaction-coefficient` y cifras tabulares. Las fórmulas tienen peso 800, interlineado 1.2 y tamaños fijos por tramo: 22px, 19px hasta 1100px y 21px hasta 420px; sus subíndices permanecen al 65%. Los nombres de sustancias (13px) y las instrucciones y respuestas (15–16px) quedan subordinados a la ecuación, sin añadir una tipografía de exhibición.

## Layout

El contenedor principal tiene un ancho máximo de 1600px y relleno de 24px 30px. En escritorio, la cuadrícula de trabajo utiliza `minmax(0, 1.6fr) minmax(350px, .9fr)` y separación de 22px. Hasta 1100px se ajusta a `minmax(0, 1.3fr) minmax(330px, 1fr)`.

Hasta 780px, el trabajo se apila: estructura, contadores y contexto. El relleno principal baja a 18px y a 13px hasta 420px. El selector de molécula ocupa la primera fila de navegación. La biblioteca pasa de cuatro columnas a tres hasta 1100px, dos hasta 780px y una hasta 420px; las reglas pasan de cuatro columnas a dos y luego a una.

La estructura SVG tiene una altura base de 400px en escritorio y 330px cuando el ancho de ventana es menor de 780px. Su contenedor de desplazamiento usa `overflow: auto`, altura mínima de 270px y máxima de 540px. La ampliación modifica ancho y alto del dibujo, por lo que las estructuras extensas se recorren dentro del panel sin ensanchar la página.

El contexto ocupa todo el ancho debajo de los paneles, separado por 24px. Presenta primero la explicación «¿Qué hace en la vida?», luego una ilustración realista de 260px de alto en escritorio y 220px en móvil, y finalmente el rótulo de ilustración y la fuente PubChem. Las escenas se comparten por tema y no representan fotografías de moléculas individuales.

### Adaptación de las 30 ecuaciones

La extensión hereda la cuadrícula de dos áreas y su apilado hasta 780px. Los seis controles de nivel forman seis columnas; hasta 800px pasan a tres, sin ocultar niveles. El mapa desplegable dispone sus seis grupos en tres columnas, dos hasta 800px y una hasta 480px. El selector de reacción, agrupado por nivel, ocupa una columna flexible entre «Anterior» y «Siguiente», con ancho máximo de 500px. Hasta 780px pasa a la primera fila completa y ambos botones quedan en la segunda, uno a cada extremo.

**The Ecuación y comprobación próximas Rule.** Hasta 780px, las copias de partículas y su clave de lectura quedan dentro de `details#rxVisuals`, cerrado al renderizar cada reacción. El resumen «Ver las partículas antes y después» permanece visible, con altura mínima de 44px, y permite abrirlas sin alejar inicialmente la tabla y la comprobación. Por encima de 780px, el bloque está abierto y su resumen oculto. Un cambio de tramo actualiza el estado abierto/cerrado; una nueva renderización vuelve a aplicar la regla, sin conservar una preferencia de apertura entre reacciones.

Reactivos y productos siguen enfrentados dentro de la ecuación, separados por la flecha. Cada término coloca su control encima de la fórmula en todos los tamaños; la cuadrícula táctil de 40px/44px/40px no se encoge en tablet o teléfono. Las copias conservan dos lados «Antes»/«Después», con imágenes de 90px de alto y hasta 150px de ancho; hasta 420px hay una columna de copias por lado. En este modo, las ilustraciones contextuales se muestran completas con altura automática, máximo de 440px, fondo blanco y `object-fit: contain`; esta regla no cambia el recorte del modo Moléculas.

## Elevation & Depth

Las superficies blancas se separan del fondo verde suave mediante tono y una única sombra discreta de panel: `0 8px 24px #225e6210`. La profundidad mantiene el protagonismo del dibujo; no hay capas decorativas sobre la estructura.

## Shapes

Los paneles e imagen inicial tienen esquinas de 22px. Los botones usan 12px; campos y selector, 10px; respuestas, 14px; fuentes, 16px. La etiqueta de dificultad es una píldora y los botones de suma/resta son circulares. Los contadores mantienen símbolo, nombre, resta, campo y suma en una sola fila.

La extensión conserva esos paneles y añade el radio compacto `reaction-compact` para niveles, campos de coeficiente y distintivos de elementos. Los botones de coeficiente mantienen extremos redondeados, ancho de 40px y altura mínima de 44px; el campo central mide 44px por 44px. Los niveles tienen altura mínima de 48px. La respuesta conserva el radio heredado de 14px; no se añade otra familia de superficies o sombras.

## Components

### Estructura molecular

El dibujo es el SVG exacto generado con RDKit desde los datos químicos de PubChem. Se conserva su geometría, con `viewBox` ajustado a las coordenadas de los átomos y margen de 70 unidades. Las cuñas y trazos describen orientación espacial en una representación 2D.

Los controles de ampliación recorren de 1× a 3× en pasos de 0.5×, se deshabilitan en los extremos y restablecen 1× al cambiar de molécula. El porcentaje es visible salvo en pantallas de hasta 420px. El desplazamiento permite explorar ambas dimensiones del dibujo ampliado.

Cada posición distinta de hidrógeno dispone de un área interactiva transparente. Clic, Enter o Espacio alternan una marca amarilla y muestran elemento, suma de enlaces e hidrógenos asociados. El foco o paso del puntero señala la posición en teal. «Borrar marcas» permite reiniciar el recuento visual y «Leer cuñas y trazos» despliega la explicación.

### Contadores y comprobación

Los controles se generan según la molécula: C y H aparecen siempre; N, O, S y P se añaden cuando corresponden a sus datos. Tras C y H, los otros símbolos se ordenan alfabéticamente. Las cantidades se ajustan mediante suma/resta o entrada numérica, con enteros entre 0 y 999.

Los botones generales tienen altura mínima de 46px. Los de ampliación y suma/resta miden 44px de ancho en escritorio; en pantallas de hasta 420px los de suma/resta pasan a 40px de ancho y altura mínima de 44px. Los campos miden 48px de alto y su ancho se adapta al espacio disponible. Estos valores describen la construcción actual.

«Comprobar fórmula» ocupa el ancho del panel. La respuesta muestra la fórmula construida y una orientación escrita; los campos incorrectos reciben borde cálido y `aria-invalid`. Al acertar se registra la molécula y aparece la acción de continuar. «Ver pista» revela ayudas progresivas; «Ver solución explicada» muestra el desglose sin registrar el reto como resuelto.

### Navegación y progreso

La biblioteca ofrece filtros «Todas», «Inicio», «Exploración», «Desafío» y «Experto», con estado seleccionado visible y `aria-pressed`. Cada entrada incluye orden, nombre, nivel, categoría y una marca si está resuelta. La actividad permite anterior/siguiente, selección directa y regreso al inicio; el distintivo muestra posición sobre 40 y nivel.

Las rutas usan el fragmento `#m-<id>` para acceder a cada molécula. El progreso local conserva identificadores resueltos y la última posición en `localStorage` bajo `2s-exploradores-moleculas-v1`. La portada muestra el total resuelto y ofrece continuar cuando corresponde; reiniciar el progreso solicita confirmación.

### Accesibilidad y estados

Se mantienen etiquetas escritas y accesibles en acciones, selector y campos, foco visible, exploración de átomos con teclado y mensajes `aria-live` para recuento y comprobación. La estructura tiene nombre accesible y su zona de desplazamiento recibe foco. Los errores de carga ofrecen una instrucción para recargar. La preferencia de movimiento reducido desactiva transiciones.

### Navegación del banco de reacciones

El cambio de modo mantiene «Moléculas · 40» y «Reacciones · 30». Los seis botones de nivel muestran avance x/5 y selección con `aria-pressed`; al activarlos se abre el primer reto pendiente del grupo o el primero si todos están resueltos. La barra y el distintivo muestran el total resuelto sobre 30. El mapa nativo desplegable «Ver los 30 retos» ofrece enlaces agrupados, el actual con `aria-current="step"` y los completados con «Resuelta». El selector repite esos grupos con `optgroup`; anterior/siguiente se deshabilitan en los extremos.

Los retos son curados, no generados al azar: Primeros pasos, Moléculas de la vida, Más elementos, Varias transformaciones, Combustibles y aplicaciones y Desafío de integración. Se puede volver o saltar a otro nivel. Las rutas `#r-<id>` conservan los cinco enlaces del piloto; el inicio nuevo es `#r-agua`. El avance y los coeficientes válidos se guardan en la clave existente `2s-exploradores-reacciones-piloto-v1`, separados del modo Moléculas y sin incorporarse a su constancia.

### Coeficientes, partículas y comprobación

Cada sustancia conserva fórmula y nombre escritos junto a un campo numérico etiquetado por sustancia y lado. Solo se editan coeficientes enteros de 1 a 30, nunca subíndices; suma/resta se deshabilitan en los límites o durante un paso guiado bloqueado. Una entrada inválida marca `aria-invalid` y detiene el recuento hasta corregirla. La tabla muestra cada elemento, sus totales a ambos lados y el balance escrito.

Las copias distinguen «moléculas», «átomos» y «unidades fórmula». En sales, los diagramas representan proporciones de iones, no moléculas ni cristales completos. Se dibujan como máximo seis copias por especie y se indica «Se muestran 6 de N. El contador incluye las N.» cuando corresponde; los totales siempre multiplican el coeficiente completo. El despliegue móvil de estas copias sigue la regla de proximidad de Layout y no cambia la ecuación ni los resultados.

La comprobación distingue entrada inválida, elementos desiguales, balance con múltiplos y balance con los menores enteros. Un múltiplo ofrece «Simplificar coeficientes» sin acreditar todavía el reto; el balance mínimo comprobado registra el avance y muestra continuación salvo en el último reto. Las respuestas conservan texto explícito, fondos heredados y anuncio `aria-live`, sin depender del color.

### Guía de aprendizaje y contexto

«Con guía» es una casilla retirable, no un modo visual nuevo. Las reacciones 1–4 y 10 habilitan por pasos el coeficiente que toca ajustar; la 6 permite completar un único coeficiente. En las demás, la casilla aparece deshabilitada. Las indicaciones explican conservación de átomos y se actualizan con el balance; quitar la guía permite editar todos los coeficientes. Cada reto ofrece dos pistas sucesivas y solución explicada: verla no marca el reto resuelto ni rellena la respuesta. «Reiniciar esta reacción» restablece los valores iniciales sin borrar el avance; borrar el avance de reacciones requiere confirmación y conserva las 40 moléculas.

El contexto mantiene explicación, importancia, condiciones, límites, ilustración rotulada y fuente científica. Las sustancias reutilizadas enlazan a su exploración molecular. Los avisos docentes distinguen representación química, simplificación biológica y seguridad: balancear no demuestra espontaneidad ni constituye una instrucción de laboratorio; los retos son exclusivamente virtuales. Estas ayudas sirven al aprendizaje y no abren un rediseño de la actividad original.

## Do's and Don'ts

- **Do:** conservar la composición aprobada y la prioridad del dibujo, los contadores y el contexto inferior.
- **Do:** mantener símbolo y nombre en cada elemento, pistas escritas y acceso por teclado.
- **Do:** conservar las alturas base de 400px/330px y la ampliación con desplazamiento para estructuras extensas.
- **Do:** usar estructuras deterministas y fuentes químicas identificables; rotular las escenas como ilustraciones de contexto.
- **Don't:** sustituir el SVG químico por una imagen generativa o alterar su geometría para decorar la interfaz.
- **Don't:** introducir un rediseño, competición, cronómetro o una nueva jerarquía visual durante el mantenimiento.
- **Don't:** tratar la visualización de la solución como evidencia de reto resuelto.
- **Do:** mantener en reacciones los controles de 40 × 44px, el campo de 44 × 44px y el rango entero 1–30, también en móvil.
- **Do:** conservar la proximidad entre ecuación y comprobación mediante las partículas desplegables hasta 780px, sin eliminar sus explicaciones.
- **Don't:** llamar moléculas a los átomos metálicos o a las unidades fórmula de las sales, ni confundir el límite de seis dibujos con el total contado.

Revisión final: aprobada conforme a la maqueta y al cierre visual comunicado en este chat. La actualización documental se contrastó con `PRODUCT.md`, `index.html`, `style.css` y `app.js`; no implica una nueva ejecución de pruebas funcionales o visuales.

## Constancia de práctica

Acceso persistente Mi constancia en cabecera. Sección desplegable al final, con nombre, resumen real del avance y descarga PNG. Controles y tipografía heredados; composición móvil sin desbordamiento. La vista no sustituye la actividad; conserva sus contadores y navegación al abrir y cerrar. PNG de 1600 × 1900 con lista de moléculas y fórmulas.

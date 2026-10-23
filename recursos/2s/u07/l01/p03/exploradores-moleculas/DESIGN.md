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
rounded:
  field: "10px"
  control: "12px"
  feedback: "14px"
  sources: "16px"
  panel: "22px"
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
---

# Diseño aprobado · Exploradores de moléculas

## Overview

Modo Operate. La autoridad visual sigue siendo la maqueta `glucosa.html` aprobada por el docente en este chat. Este documento registra su implementación final y la revisión final aprobada; no abre un rediseño ni sustituye la maqueta.

La composición conserva el fondo verde claro, el panel blanco amplio para observar la estructura, los contadores a la derecha y la escena realista inferior con explicación. El dibujo y los controles dominan la actividad. El inicio presenta una invitación breve, reglas de lectura y acceso a las 40 moléculas por dificultad. La experiencia permite explorar a ritmo propio, sin cronómetro ni puntuación competitiva.

## Colors

El teal identifica acciones principales y enlaces sobre superficies claras. El texto azul verdoso oscuro mantiene la lectura y los tonos apagados acompañan instrucciones y metadatos.

Los contadores distinguen C en verde agua, H en coral, O en amarillo, N en azul, S en amarillo suave y P en lila. Cada elemento se identifica también con símbolo y nombre. El color acompaña la información escrita, sin asumir su reconocimiento como único medio para entenderla.

Las respuestas correctas usan fondo verde suave con mensaje explícito; las que requieren revisión usan fondo cálido y nombran los elementos que deben comprobarse. El foco de los controles es coral con contorno de 3px y separación de 3px.

## Typography

La pila declarada es `Nunito, system-ui, -apple-system, 'Segoe UI', sans-serif`; la aplicación no carga una fuente web, por lo que la disponibilidad local determina la familia utilizada. La jerarquía usa títulos destacados, explicaciones de interlineado amplio y cifras tabulares en recuentos y progreso.

- Título inicial: `clamp(34px, 4vw, 57px)`, interlineado 1.08; en móvil, 39px.
- Título de molécula: 32px en escritorio y 27px en móvil.
- Encabezados de panel: 24px en escritorio y 22px en móvil.
- Instrucciones: 15–16px; la introducción emplea 20px en escritorio y 18px en móvil.
- Fórmula comprobada: 30px y peso 850; subíndices al 65% para conservar la notación química.
- Campos de conteo: 22px y peso 800.

## Layout

El contenedor principal tiene un ancho máximo de 1600px y relleno de 24px 30px. En escritorio, la cuadrícula de trabajo utiliza `minmax(0, 1.6fr) minmax(350px, .9fr)` y separación de 22px. Hasta 1100px se ajusta a `minmax(0, 1.3fr) minmax(330px, 1fr)`.

Hasta 780px, el trabajo se apila: estructura, contadores y contexto. El relleno principal baja a 18px y a 13px hasta 420px. El selector de molécula ocupa la primera fila de navegación. La biblioteca pasa de cuatro columnas a tres hasta 1100px, dos hasta 780px y una hasta 420px; las reglas pasan de cuatro columnas a dos y luego a una.

La estructura SVG tiene una altura base de 400px en escritorio y 330px cuando el ancho de ventana es menor de 780px. Su contenedor de desplazamiento usa `overflow: auto`, altura mínima de 270px y máxima de 540px. La ampliación modifica ancho y alto del dibujo, por lo que las estructuras extensas se recorren dentro del panel sin ensanchar la página.

El contexto ocupa todo el ancho debajo de los paneles, separado por 24px. Presenta primero la explicación «¿Qué hace en la vida?», luego una ilustración realista de 260px de alto en escritorio y 220px en móvil, y finalmente el rótulo de ilustración y la fuente PubChem. Las escenas se comparten por tema y no representan fotografías de moléculas individuales.

## Elevation & Depth

Las superficies blancas se separan del fondo verde suave mediante tono y una única sombra discreta de panel: `0 8px 24px #225e6210`. La profundidad mantiene el protagonismo del dibujo; no hay capas decorativas sobre la estructura.

## Shapes

Los paneles e imagen inicial tienen esquinas de 22px. Los botones usan 12px; campos y selector, 10px; respuestas, 14px; fuentes, 16px. La etiqueta de dificultad es una píldora y los botones de suma/resta son circulares. Los contadores mantienen símbolo, nombre, resta, campo y suma en una sola fila.

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

## Do's and Don'ts

- **Do:** conservar la composición aprobada y la prioridad del dibujo, los contadores y el contexto inferior.
- **Do:** mantener símbolo y nombre en cada elemento, pistas escritas y acceso por teclado.
- **Do:** conservar las alturas base de 400px/330px y la ampliación con desplazamiento para estructuras extensas.
- **Do:** usar estructuras deterministas y fuentes químicas identificables; rotular las escenas como ilustraciones de contexto.
- **Don't:** sustituir el SVG químico por una imagen generativa o alterar su geometría para decorar la interfaz.
- **Don't:** introducir un rediseño, competición, cronómetro o una nueva jerarquía visual durante el mantenimiento.
- **Don't:** tratar la visualización de la solución como evidencia de reto resuelto.

Revisión final: aprobada conforme a la maqueta y al cierre visual comunicado en este chat. La actualización documental se contrastó con `PRODUCT.md`, `index.html`, `style.css` y `app.js`; no implica una nueva ejecución de pruebas funcionales o visuales.

## Constancia de práctica

Acceso persistente Mi constancia en cabecera. Sección desplegable al final, con nombre, resumen real del avance y descarga PNG. Controles y tipografía heredados; composición móvil sin desbordamiento. La vista no sustituye la actividad; conserva sus contadores y navegación al abrir y cerrar. PNG de 1600 × 1900 con lista de moléculas y fórmulas.

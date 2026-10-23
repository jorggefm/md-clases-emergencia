# Diseño construido: Laboratorio de Lorentz

Registro del 23 de octubre de 2026. Describe la implementación de `index.html`, `style.css` y `app.js`; el contrato docente y el alcance físico están en `README.md`.

## Dirección

Recurso educativo para proyección y consulta móvil. Hereda del material anterior la superficie marfil, los textos azules y el acento coral. La fórmula permanece a la izquierda y el fenómeno a la derecha en escritorio, según el brief docente. Los diagramas usan un plano azul oscuro, cian y ámbar para separar las magnitudes comparadas. No introduce una composición alternativa ni dependencias de fuentes externas.

## Tokens y tipografía

| Uso | Valor construido |
| --- | --- |
| Fondo general | `#f6f5f0` |
| Texto principal, `--ink` | `#16334b` |
| Enlaces y controles, `--blue` | `#21667c` |
| Resultados y foco, `--coral` | `#b94631` |
| Separadores, `--line` | `#d4dedf` |
| Selección de pasos, `--pale` | `#e8f2f3` |
| Texto secundario | `#496273`, `#536a79` |
| Superficie de fenómeno | `#112c46` |
| Magnitud cian | `#88d8e9` |
| Magnitud ámbar | `#f8c589` |
| Texto secundario sobre escena | `#b5cbdc` |
| Selección de texto | Fondo `#f9ca98`, texto `#16334b` |

Arial/Helvetica/sans-serif para interfaz y diagramas; Georgia/Times New Roman/serif para ecuaciones. Título principal entre 29 y 45 px, con interletrado de −0,035 em y altura de línea 1,12. Encabezados del laboratorio de 19–23 px; resultados de 25 px y gamma de 35 px; párrafos de resultados de 14 px. Números dinámicos con cifras tabulares. Párrafos con altura de línea 1,55. Las leyendas auxiliares son de 10–12 px y requieren proximidad de lectura en pantallas pequeñas.

Paneles principales con radio de 14 px; controles con radios de 6–7 px. Separación mediante bordes y espacio, sin sombras decorativas. Enlaces subrayados con separación de 4 px.

## Composición

Contenedor centrado de hasta 1500 px con márgenes interiores del 3,5 %. Cabecera de identificación, título y botón de pantalla completa; después tres botones de fenómeno. El laboratorio usa dos columnas `minmax(330px,.9fr)` y `minmax(480px,1.6fr)`, separadas 26 px.

El panel blanco agrupa ecuación, rapidez, valores predefinidos y cinco operaciones seleccionables. El panel derecho contiene título, diagrama SVG, leyenda del marco, entrada propia, resultado y solución desplegable. Las escenas comparten un `viewBox` de 700 × 290: intervalos temporales, longitudes y proporción de energía en reposo/cinética. Los diagramas comunican medidas; no representan fotografías del fenómeno.

Debajo aparecen la conclusión dinámica, explicación de gamma y reloj de luz, video y propuesta de muones, y fuentes. Video y actividad ocupan dos columnas en escritorio. El video solo inserta su reproductor al pulsarlo; conserva un enlace externo directo.

## Rangos responsivos

| Condición | Adaptación |
| --- | --- |
| Ancho ≥1450 px | Panel de fórmula con 26 px de relleno; escena hasta 310 px de altura; mayor espacio en pasos. |
| Ancho 1001–1449 px, altura >850 px | Composición base de dos columnas; escena hasta 285 px. |
| Ancho ≥1001 px, altura ≤850 px | Modo compacto de proyección: cabecera y espaciado vertical menores, título de 32 px, descripción introductoria oculta, ecuación de 76 px de alto mínimo y escena hasta 210 px. Conserva tamaños de controles y párrafos. |
| Ancho 741–1000 px | Márgenes de 24 px, columnas de 330 px y resto disponible, separación de 18 px; títulos de pestañas sin subtítulos y resultado en una columna. |
| Ancho ≤740 px | Márgenes de 17 px; fórmula y fenómeno apilados; pestañas de igual ancho; se oculta pantalla completa y metadatos secundarios. Explicación y exploración pasan a una columna. SVG sin altura máxima. |

En pantalla completa, el elemento `main` utiliza el fondo del recurso, admite desplazamiento y elimina el ancho máximo. El contenido complementario sigue en el flujo normal del documento.

## Estados e interacción

- Fenómenos y velocidades predefinidas: selección mediante `aria-pressed`; pestaña activa con superficie clara y borde inferior azul; velocidad activa con fondo oscuro y texto blanco.
- Cada fenómeno carga los datos de su ejercicio original. El botón de restauración recupera esos valores. El selector de rapidez recorre 0–0,999c en pasos de 0,001c y actualiza simultáneamente fórmula, pasos, diagrama y solución.
- Pasos: selección con fondo claro, borde y explicación anunciada mediante `aria-live="polite"`.
- Entradas: tiempo propio entre 0,1 y 100 años; longitud propia entre 1 y 1000 m; masa del electrón fija. Una entrada inválida se señala con contorno coral y recupera el último valor válido al confirmar el cambio.
- Animación temporal y movimiento ilustrativo del electrón: inicio, pausa, continuación y final; al cambiar parámetros se vuelve al estado calculado final. La longitud responde directamente al cambio de rapidez.
- Solución y reloj de luz usan `details`/`summary`. La propuesta de muones informa expansión mediante `aria-expanded`.
- Foco de teclado: contorno coral de 3 px separado 4 px. Hover: leve oscurecimiento. Estado deshabilitado definido con opacidad 0,5, aunque no es parte del flujo principal actual.
- SVG con título y descripción accesibles; rapidez con descripción verbal del porcentaje de c. No hay carga de datos externa para los cálculos.
- Preferencia de movimiento reducido: desactiva desplazamiento suave y transición de botones. Las animaciones científicas siguen requiriendo activación explícita; la implementación no desactiva su bucle temporal por esa preferencia.

## Verificación visual final

La captura de escritorio actual, de 1265 × 712 px, muestra simultáneamente fórmula, control de rapidez, cinco pasos, diagrama, entrada y resultado con explicación. La compactación resuelve el problema de comparación durante la proyección. El final de la explicación del paso y el contenido complementario pueden requerir desplazamiento normal. La captura móvil revisada muestra apilado sin desbordamiento horizontal visible.

Esta revisión se realizó sobre fuente y capturas, sin navegador. No constituye certificación de contraste, lector de pantalla ni reproducción externa del video.

## Revisión v2: lectura cualitativa e ilustraciones

Se reemplazan los anillos abstractos por imágenes generadas independientes sobre el fondo azul existente. Los números y controles siguen siendo HTML/SVG dinámicos. Flechas y verbos indican el sentido de variación del último cambio de rapidez. El paso 5 tiene fondo ámbar y nombre explícito. La regla de interpretación de γ queda permanentemente junto al fenómeno; un porcentaje cuantifica la diferencia respecto al valor propio. La vista móvil mantiene el apilamiento y la vista compacta muestra los cinco pasos, regla y resultado numérico.

## Revisión v3

Dos pestañas principales: simulación y ejercicios. La energía usa tres cantidades en suma y una barra a escala fija: azul en reposo, naranja cinética, azul oscuro total. Se conservan imágenes por capas. Los ejercicios usan una tarjeta ilustrada de enunciado y una columna de pasos que se revelan progresivamente. Los campos admiten coma o punto decimal y dan retroalimentación local. En móvil se apilan tarjeta, pasos y comprobación.

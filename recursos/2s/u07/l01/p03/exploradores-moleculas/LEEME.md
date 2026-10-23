# Exploradores de moléculas · 2S · 23/10/2026

40 moléculas reales, ordenadas por cantidad de átomos distintos de H. Los niveles son una guía: las moléculas aromáticas y las cuñas añaden dificultad más allá del tamaño.

Cada SDF se descarga de PubChem por CID. El script compara fórmula esperada, fórmula de PubChem, fórmula calculada y recuento de todos los átomos tras añadir H explícitos. Comprueba también que cada C neutro tenga suma de órdenes de enlace + H = 4, y que el total de H coincida con el desglose por átomo. El SVG se dibuja desde ese mismo objeto químico; las coordenadas de los puntos táctiles proceden del mismo dibujo. Se conserva la estereoquímica de la fuente. La validación no debe sustituirse por imágenes generadas de estructuras.

Fuentes por tarjeta: enlace PubChem, JSON original y SDF en fuentes/. Informe: fuentes/validacion.json. Convenciones: https://openstax.org/books/organic-chemistry/pages/1-12-drawing-chemical-structures

Se muestran moléculas neutras. En los seres vivos, aminoácidos y ATP pueden tener otras cargas y números de H. Se informa en la aplicación. ATP se cuenta como C10H16N5O13P3, forma ácida mostrada, no ATP4−. No se representan proteínas completas: se usan aminoácidos, glicilglicina y glutatión. La glucosa usa la estructura cíclica de PubChem CID 5793, no la antigua maqueta de cadena abierta.

Imágenes de contexto: generación incorporada imagegen, cuatro imágenes fuente (tres paneles de cuatro escenas y un cafeto), con escenas compartidas cuando el proceso es común. Son ilustraciones de alimentos, organismos y ambientes; no son fotografías de las moléculas ni ecuaciones. Prompts: humedal/gas/fermentación/vinagre; crecimiento/proteínas/queratina/azúcares/aceites; músculo/mitocondrias/ADN/frutas/membrana; cafeto con frutos. Ningún diagrama químico procede de imagegen.

Comprobar muestra la fórmula ingresada. Si hay errores, señala los elementos que revisar sin sustituir los números. La solución explicada desglosa H de C y H de otros elementos. Puede escribirse directamente en los contadores para no pulsar 104 veces en la trioleína. El progreso se guarda solo en este navegador.

Regeneración: python scripts/exploradores-moleculas/build.py; python scripts/exploradores-moleculas/finalize.py. Requiere rdkit, requests y pillow. Verificación de interfaz: node scripts/exploradores-moleculas/test.cjs con servidor local 8767.

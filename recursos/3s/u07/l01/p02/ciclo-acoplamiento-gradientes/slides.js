const SLIDES = [
  {
    "file": "01-atp-activa-bomba.png",
    "title": "El ATP activa una bomba",
    "alt": "El ATP transfiere un grupo fosfato a la bomba de sodio y potasio, que cambia de forma.",
    "idea": "La reacción del ATP se acopla al cambio de forma de la bomba de sodio y potasio.",
    "keywords": [
      "ATP",
      "fosforilación",
      "bomba"
    ],
    "steps": [
      "La bomba es una proteína de la membrana plasmática. El ATP se une por el lado interior de la célula.",
      "La bomba recibe temporalmente un grupo fosfato del ATP; queda ADP y la proteína cambia de forma.",
      "Esa conexión material permite impulsar una tarea que no avanzaría sola: mover iones contra sus gradientes."
    ]
  },
  {
    "file": "02-bomba-na-k.png",
    "title": "Un ATP mueve iones en dos direcciones",
    "alt": "La bomba saca tres iones sodio y introduce dos iones potasio por cada ATP usado.",
    "idea": "La bomba usa un ATP por ciclo para sacar 3 Na⁺ e introducir 2 K⁺ contra sus gradientes.",
    "keywords": [
      "3 Na⁺ fuera",
      "2 K⁺ dentro",
      "1 ATP"
    ],
    "steps": [
      "Por cada ciclo, la bomba desplaza tres Na⁺ desde el interior hacia el exterior.",
      "En el mismo ciclo introduce dos K⁺ desde el exterior hacia el interior.",
      "El transporte cuesta energía porque mantiene diferencias de concentración y de carga entre los dos lados."
    ]
  },
  {
    "file": "03-gradiente-electroquimico.png",
    "title": "La membrana guarda una diferencia",
    "alt": "Hay más sodio fuera y más potasio dentro; el sodio puede volver por un canal y contribuir a una señal eléctrica.",
    "idea": "La separación de iones conserva energía potencial en forma de gradiente electroquímico.",
    "keywords": [
      "concentración",
      "carga",
      "potencial"
    ],
    "steps": [
      "Gradiente de concentración significa que la cantidad de un ion no es igual a ambos lados de la membrana.",
      "Como los iones tienen carga, también importa la diferencia eléctrica: juntas forman un gradiente electroquímico.",
      "Cuando Na⁺ entra por un canal a favor de su gradiente puede contribuir a una señal eléctrica. La bomba mantiene las condiciones que hacen posible ese proceso."
    ]
  },
  {
    "file": "04-bomba-calcio-serca.png",
    "title": "Otra bomba, otra reserva",
    "alt": "La bomba SERCA utiliza ATP para trasladar calcio desde el citoplasma hacia el retículo sarcoplásmico.",
    "idea": "SERCA acopla el uso de ATP al almacenamiento de Ca²⁺ en el retículo sarcoplásmico.",
    "keywords": [
      "Ca²⁺",
      "SERCA",
      "retículo"
    ],
    "steps": [
      "En una fibra muscular, el retículo sarcoplásmico es un compartimento que almacena Ca²⁺.",
      "La bomba SERCA usa ATP para llevar Ca²⁺ desde el citoplasma hacia el interior del retículo.",
      "Así mantiene baja la concentración de Ca²⁺ libre en el citoplasma durante la relajación y deja una diferencia lista para usarse."
    ]
  },
  {
    "file": "05-calcio-contraccion.png",
    "title": "Una diferencia que se aprovecha",
    "alt": "El calcio sale del retículo por un canal y permite la interacción de actina y miosina; la miosina también utiliza ATP.",
    "idea": "La salida de Ca²⁺ inicia la contracción, mientras la miosina usa ATP para sostener su ciclo de movimiento.",
    "keywords": [
      "canal de Ca²⁺",
      "actina",
      "miosina"
    ],
    "steps": [
      "Una señal abre canales del retículo; el Ca²⁺ almacenado sale hacia el citoplasma a favor de su gradiente.",
      "El Ca²⁺ se une a la troponina y permite que actina y miosina interactúen.",
      "La miosina usa ATP en su ciclo para mover los filamentos. Luego SERCA utiliza ATP para recoger otra vez el Ca²⁺."
    ]
  },
  {
    "file": "06-fosfocreatina-recarga-atp.png",
    "title": "La fosfocreatina repone ATP rápidamente",
    "alt": "La miosina usa ATP; la creatina quinasa transfiere un grupo fosfato de fosfocreatina al ADP para regenerar ATP.",
    "idea": "La fosfocreatina transfiere fosforilo al ADP y ayuda a mantener ATP disponible durante un esfuerzo breve.",
    "keywords": [
      "fosfocreatina",
      "creatina quinasa",
      "ADP"
    ],
    "steps": [
      "Cuando la miosina usa ATP, aparece ADP. La fosfocreatina es una reserva rápida de grupos fosforilo.",
      "La creatina quinasa cataliza la transferencia: PCr + ADP + H⁺ ⇌ creatina + ATP.",
      "La fosfocreatina no mueve directamente la miosina: repone ATP. La dirección de la reacción depende de las condiciones y de la demanda celular."
    ]
  },
  {
    "file": "07-cadena-respiratoria-protones.png",
    "title": "La respiración crea otro gradiente",
    "alt": "En la membrana interna mitocondrial los electrones avanzan por la cadena respiratoria y se bombean protones hacia el espacio intermembrana.",
    "idea": "La energía del flujo de electrones impulsa el bombeo de H⁺ a través de la membrana mitocondrial interna.",
    "keywords": [
      "NADH",
      "electrones",
      "H⁺"
    ],
    "steps": [
      "La oxidación de nutrientes permite obtener transportadores de electrones como NADH.",
      "En la mitocondria, esos electrones pasan por la cadena respiratoria hasta llegar finalmente al oxígeno.",
      "Parte de esa energía se acopla al bombeo de H⁺ desde la matriz hacia el espacio intermembrana. Es un gradiente distinto del de Na⁺/K⁺."
    ]
  },
  {
    "file": "08-atp-sintasa.png",
    "title": "El gradiente de H⁺ ayuda a formar ATP",
    "alt": "Los protones vuelven a la matriz a través de ATP sintasa, que forma ATP a partir de ADP y fosfato inorgánico.",
    "idea": "La ATP sintasa acopla el retorno favorable de H⁺ con la formación de ATP a partir de ADP y Pᵢ.",
    "keywords": [
      "gradiente H⁺",
      "ATP sintasa",
      "ADP + Pᵢ"
    ],
    "steps": [
      "La membrana mitocondrial interna dificulta que los H⁺ regresen libremente a la matriz.",
      "Al pasar por la ATP sintasa a favor de su gradiente, los H⁺ impulsan cambios en esa proteína.",
      "La proteína aprovecha el proceso para sintetizar ATP: ADP + Pᵢ → ATP. El H⁺ que pasa no es el fosfato incorporado."
    ]
  },
  {
    "file": "09-ciclo-integrado.png",
    "title": "Una red de procesos acoplados",
    "alt": "En una fibra muscular, mitocondria forma ATP con su gradiente de protones; ATP impulsa bombas de sodio y potasio y de calcio; fosfocreatina ayuda a reponerlo.",
    "idea": "La energía de los nutrientes se transforma en gradiente de H⁺, ATP, otros gradientes y trabajo celular.",
    "keywords": [
      "nutrientes",
      "ATP ↔ ADP",
      "acoplamiento"
    ],
    "steps": [
      "La respiración utiliza energía obtenida de nutrientes para crear el gradiente de H⁺ en la mitocondria.",
      "La ATP sintasa usa ese gradiente para formar ATP; ese ATP puede impulsar bombas y el trabajo de miosina.",
      "Al gastarse, se forma ADP; la fosfocreatina puede reponer ATP con rapidez y la mitocondria lo regenera sostenidamente.",
      "No es un ciclo que crea energía de la nada: necesita nutrientes y oxígeno, y parte de la energía se disipa como calor."
    ]
  }
];

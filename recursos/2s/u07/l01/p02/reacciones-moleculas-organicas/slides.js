const SLIDES = [
  {
    file: '01-carbono-organico.png',
    title: 'Carbono: ¿orgánico o inorgánico?',
    alt: 'Comparación de dióxido de carbono, metano y glucosa.',
    equation: 'CO₂ · inorgánico    |    CH₄ y C₆H₁₂O₆ · orgánicos',
    context: 'Tres moléculas con carbono; su clasificación no depende solo de tener C.',
    note: 'La fórmula cuenta átomos; la estructura muestra cómo están unidos.',
    keywords: ['carbono', 'clasificación', 'estructura'],
    idea: 'El carbono aparece en compuestos orgánicos y también en algunos inorgánicos.'
  },
  {
    file: '02-respiracion.png',
    title: '1 · Respiración celular',
    alt: 'Célula que recibe glucosa y oxígeno y libera dióxido de carbono y agua.',
    equation: 'C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O',
    context: 'Células de animales y plantas · parte de la energía se captura como ATP.',
    note: 'Ecuación global: en la célula ocurre mediante varias etapas.',
    keywords: ['glucosa', 'oxígeno', 'ATP'],
    idea: 'La célula transforma glucosa con oxígeno y captura parte de su energía en ATP.'
  },
  {
    file: '03-fermentacion.png',
    title: '2 · Fermentación alcohólica',
    alt: 'Levadura en masa de pan produce burbujas que la esponjan.',
    equation: 'C₆H₁₂O₆ → 2 C₂H₆O + 2 CO₂',
    context: 'Levaduras · fermentación de azúcares · CO₂ esponja el pan.',
    note: 'Ecuación global simplificada; la levadura obtiene energía utilizable.',
    keywords: ['levadura', 'etanol', 'dióxido de carbono'],
    idea: 'La levadura convierte glucosa en etanol y dióxido de carbono.'
  },
  {
    file: '04-vinagre.png',
    title: '3 · Oxidación del etanol',
    alt: 'Bacterias acéticas en un líquido expuesto al aire que se transforma en vinagre.',
    equation: 'C₂H₆O + O₂ → C₂H₄O₂ + H₂O',
    context: 'Bacterias acéticas + oxígeno · producción de ácido acético del vinagre.',
    note: 'Ecuación global; muestra por qué el aire es necesario en este paso.',
    keywords: ['etanol', 'oxígeno', 'ácido acético'],
    idea: 'Las bacterias acéticas transforman etanol y oxígeno en ácido acético y agua.'
  },
  {
    file: '05-glicina.png',
    title: '4 · Enlace peptídico: modelo con glicina',
    alt: 'Glicina y ribosoma incorporando aminoácidos a una cadena proteica.',
    equation: '2 C₂H₅NO₂ → C₄H₈N₂O₃ + H₂O',
    context: 'Modelo: dos glicinas forman un dipéptido. En células, el ribosoma añade aminoácidos a proteínas.',
    note: 'Modelo químico simplificado; no representa todos los pasos de la traducción.',
    keywords: ['glicina', 'enlace peptídico', 'ribosoma'],
    idea: 'La glicina puede unirse a otros aminoácidos mediante enlaces peptídicos en una proteína.'
  },
  {
    file: '06-metano.png',
    title: '5 · Formación de metano',
    alt: 'Arqueas producen metano en sedimentos sin oxígeno de un humedal.',
    equation: 'CO₂ + 4 H₂ → CH₄ + 2 H₂O',
    context: 'Una ruta de arqueas metanógenas · humedales y digestores sin oxígeno.',
    note: 'Es una ruta posible; el metano también puede formarse por otras rutas.',
    keywords: ['metano', 'arqueas', 'sin oxígeno'],
    idea: 'Algunas arqueas generan metano a partir de CO₂ e H₂ en ambientes sin oxígeno.'
  },
  {
    file: '07-urea.png',
    title: '6 · Transformación de la urea',
    alt: 'Urea producida en el organismo y devuelta al ambiente por la orina.',
    equation: 'CH₄N₂O + H₂O → CO₂ + 2 NH₃',
    context: 'Ureasa de microorganismos del suelo · reciclaje del nitrógeno.',
    note: 'En agua, parte del NH₃ pasa a NH₄⁺; la urea no tiene enlace C–H.',
    keywords: ['urea', 'ureasa', 'nitrógeno'],
    idea: 'La transformación microbiana de la urea devuelve compuestos de nitrógeno al ambiente.'
  }
];

export interface MealPlan {
  desayuno: string;
  mediaManana: string;
  almuerzo: string;
  merienda: string;
  cena: string;
  consejo: string;
}

export interface DietDetails {
  id: string;
  nombre: string;
  descripcion: string;
  consejoEspiritual: string;
  sabiduriaBiblica: string;
  cuidadoMedicina: string;
  menuSemanal: Record<string, MealPlan>;
}

export const WEEKLY_DIET_MENU_DB: Record<string, DietDetails> = {
  diabeticos: {
    id: "diabeticos",
    nombre: "Control de Azúcar (Diabéticos)",
    descripcion: "Menú equilibrado y de bajo índice glucémico diseñado especialmente para regular la glucosa en sangre, prevenir picos de insulina y mantener la energía de forma constante durante todo el día. Ideal para personas con diabetes o prediabetes.",
    consejoEspiritual: "Nuestra salud es un reflejo de nuestra templanza. Comer de forma consciente nos ayuda a glorificar al Señor con un cuerpo fuerte y equilibrado.",
    sabiduriaBiblica: "\"¿O ignoráis que vuestro cuerpo es templo del Espíritu Santo, el cual está en vosotros, el cual tenéis de Dios, y que no sois vuestros?\" — 1 Corintios 6:19",
    cuidadoMedicina: "Recuerde medir sus niveles de azúcar regularmente, hidratarse abundantemente con agua y consultar siempre a su médico para ajustar las porciones a su pauta de insulina o medicación.",
    menuSemanal: {
      Lunes: {
        desayuno: "Omelet de claras de huevo con espinacas frescas y un toque de queso blanco bajo en grasa. Té de manzanilla o café descafeinado sin azúcar.",
        mediaManana: "Un puñado pequeño (30g) de almendras o nueces crudas sin sal.",
        almuerzo: "Pechuga de pollo a la plancha sazonada con ajo y limón, puré de calabaza natural y ensalada de hojas verdes con pepino.",
        merienda: "Yogur griego natural (sin azúcar) espolvoreado con una cucharadita de semillas de chía o linaza.",
        cena: "Sopa de verduras clara (calabacín, apio, puerro) con pechuga de pollo desmenuzada. Una infusión de menta sin azúcar.",
        consejo: "Evite los zumos de frutas exprimidos, ya que eliminan la fibra y elevan rápidamente la glucosa; prefiera siempre la fruta entera."
      },
      Martes: {
        desayuno: "Yogur griego natural sin azúcar con nueces picadas, semillas de girasol y una pizca de canela molida.",
        mediaManana: "Rodajas de pepino fresco y apio con unas gotas de limón y una pizca de pimienta.",
        almuerzo: "Filete de salmón al horno con finas hierbas, una porción pequeña de quinua cocida (1/2 taza) y espárragos al vapor.",
        merienda: "Un trozo mediano de queso fresco o requesón bajo en grasa con una infusión de rooibos.",
        cena: "Ensalada de atún al natural con lechuga, tomate cherry, aguacate y aderezo de aceite de oliva y vinagre de manzana.",
        consejo: "La canela tiene propiedades naturales que ayudan a mejorar la sensibilidad a la insulina de forma suave."
      },
      Miércoles: {
        desayuno: "Avena cocida en agua con rodajas de fresas frescas (bajo índice glucémico) y semillas de linaza molidas.",
        mediaManana: "Medio aguacate mediano sazonado con pimienta y unas gotas de limón.",
        almuerzo: "Guiso de pavo tierno con verduras de temporada (brócoli, zanahoria, calabacín) cocinado en caldo casero bajo en grasa.",
        merienda: "Gelatina ligera sin azúcar (preferiblemente sabor fresa o limón).",
        cena: "Revuelto de huevo con champiñones frescos y pimientos verdes salteados en una cucharadita de aceite de oliva.",
        consejo: "Los carbohidratos complejos como la avena liberan energía lentamente, evitando los picos de azúcar en sangre."
      },
      Jueves: {
        desayuno: "Tortilla de dos huevos con champiñones y una taza de café descafeinado con leche de almendras sin azúcar.",
        mediaManana: "Una manzana verde pequeña con piel (bien lavada) para aprovechar toda su fibra.",
        almuerzo: "Merluza al horno sobre una cama de cebolla y tomate en rodajas, acompañado de una ensalada mixta de canónigos y rábano.",
        merienda: "Yogur natural bífidus sin azúcar con tres nueces troceadas.",
        cena: "Crema suave de calabacín y puerros hecha sin patata ni nata, salpicada con semillas de calabaza tostadas.",
        consejo: "La manzana verde contiene pectina, una fibra soluble excelente que ayuda a estabilizar la glucosa."
      },
      Viernes: {
        desayuno: "Batido verde ligero hecho con espinacas, apio, pepino, medio plátano y agua. Rico en minerales y muy refrescante.",
        mediaManana: "Dos rodajas de queso de cabra fresco con rodajas de tomate y orégano.",
        almuerzo: "Pollo al ajillo con judías verdes salteadas y una porción muy pequeña de arroz integral de grano largo.",
        merienda: "Bastoncitos de zanahoria con una cucharadita de humus casero sin azúcares añadidos.",
        cena: "Filete de lenguado a la plancha con puré cremoso de coliflor (una alternativa deliciosa y baja en carbohidratos al puré de patatas).",
        consejo: "El puré de coliflor es excelente para los diabéticos por su bajísimo impacto glucémico comparado con el de patata o maíz."
      },
      Sábado: {
        desayuno: "Una tostada de pan integral de centeno con aguacate triturado y un huevo poché encima.",
        mediaManana: "Un tazón pequeño de frambuesas o arándanos frescos (frutas ricas en antioxidantes y bajas en azúcar).",
        almuerzo: "Brochetas de pavo y pimientos de colores al horno, acompañadas de ensalada de rúcula y lascas de queso curado.",
        merienda: "Té verde sin azúcar acompañado de un puñado pequeño de avellanas crudas.",
        cena: "Caldo depurativo casero de apio y cebolla con pechuga de pollo desmenuzada y unas gotas de limón fresco.",
        consejo: "Los frutos rojos son las mejores opciones frutales para los diabéticos gracias a sus altos niveles de antioxidantes y fibra."
      },
      Domingo: {
        desayuno: "Panqueques hechos con harina de almendras y claras de huevo, acompañados de arándanos azules frescos y té digestivo.",
        mediaManana: "Un puñado de semillas de calabaza tostadas sin sal.",
        almuerzo: "Estofado de ternera magra con alcachofas frescas y una porción de brócoli al vapor con aceite de oliva.",
        merienda: "Yogur griego natural sin azúcar con semillas de chía hidratadas.",
        cena: "Tortilla francesa de dos huevos con hojas de espinacas cocidas y ensalada de tomate cherry con albahaca.",
        consejo: "El descanso dominical es ideal para planificar las compras saludables de la semana y meditar en la fidelidad de Dios."
      }
    }
  },
  celiacos: {
    id: "celiacos",
    nombre: "Libre de Gluten (Celíacos)",
    descripcion: "Menú sabroso y 100% libre de gluten enfocado en alimentos naturalmente limpios de esta proteína. Diseñado para regenerar la vellosidad intestinal, optimizar la absorción de nutrientes y evitar molestias estomacales e inflamaciones.",
    consejoEspiritual: "Purificar lo que introducimos en nuestro cuerpo nos enseña el valor de la pureza espiritual. Busquemos siempre alimentos limpios que edifiquen nuestra vitalidad.",
    sabiduriaBiblica: "\"Purifícame con hisopo, y seré limpio; lávame, y seré más blanco que la nieve.\" — Salmo 51:7",
    cuidadoMedicina: "Asegúrese de comprar productos etiquetados bajo la certificación oficial 'Sin Gluten' y evite al máximo la contaminación cruzada en la cocina utilizando utensilios limpios.",
    menuSemanal: {
      Lunes: {
        desayuno: "Gachas de avena certificada libre de gluten, cocidas con leche desnatada o agua, plátano machacado y nueces pecanas.",
        mediaManana: "Una porción de papaya fresca picada en cubos.",
        almuerzo: "Pechuga de pollo marinada al limón y finas hierbas con arroz integral y calabacitas salteadas en aceite de oliva.",
        merienda: "Dos tortitas de arroz integral inflado con queso crema bajo en grasa o puré de almendras natural.",
        cena: "Ensalada fresca de tomate, aguacate, queso fresco y hojas de albahaca picadas con un chorrito de aceite de oliva.",
        consejo: "Compruebe siempre que la avena esté etiquetada explícitamente como 'Libre de Gluten', ya que suele procesarse en plantas mixtas."
      },
      Martes: {
        desayuno: "Arepa de maíz amarillo casera rellena de queso blanco fresco y rodajas de aguacate maduro. Una infusión de menta.",
        mediaManana: "Un puñado de pistachos pelados sin sal.",
        almuerzo: "Suprema de salmón a la sartén con puré de patatas natural (sin mantequilla añadida, usar aceite de oliva) y zanahorias asadas.",
        merienda: "Yogur de oveja o cabra natural sin azúcar con una pizca de canela.",
        cena: "Crema tibia de calabaza, jengibre y coco, decorada con almendras laminadas y semillas de chía.",
        consejo: "El maíz es un cereal naturalmente libre de gluten, muy versátil y de fácil digestión para personas mayores."
      },
      Miércoles: {
        desayuno: "Tostadas de pan especial sin gluten con aguacate triturado y una rodaja de tomate fresco con orégano.",
        mediaManana: "Una compota de manzana casera preparada sin azúcares refinados.",
        almuerzo: "Muslos de pollo al horno sazonados con romero y patatas rústicas, acompañados de una ensalada de berros y cebolla morada.",
        merienda: "Un puñado de nueces de nogal y una infusión de rooibos.",
        cena: "Revuelto campesino de dos huevos con tomate picado, cebolla tierna y espárragos trigueros.",
        consejo: "El romero y el ajo añaden un sabor espectacular a las carnes sin necesidad de usar salsas comerciales procesadas que puedan contener gluten."
      },
      Jueves: {
        desayuno: "Yogur de coco natural sin azúcar con papaya fresca y un puñado de semillas de calabaza crujientes.",
        mediaManana: "Rodajas de kiwi o una naranja dulce.",
        almuerzo: "Lentejas tradicionales guisadas con calabaza, zanahoria, espinacas frescas y una pizca de pimentón de la Vera.",
        merienda: "Un plátano maduro machacado con un toque de canela y semillas de sésamo.",
        cena: "Sopa reconfortante de fideos de arroz en caldo de verduras casero con dados de tofu marinado o pollo.",
        consejo: "Las lentejas son ricas en hierro y fibra; al guisarlas con verduras se asimilan mucho mejor los nutrientes."
      },
      Viernes: {
        desayuno: "Huevo pasado por agua con bastoncitos de pan tostado sin gluten y medio aguacate.",
        mediaManana: "Un puñado de avellanas tostadas sin sal.",
        almuerzo: "Medallones de solomillo de cerdo con puré de manzana natural y brócoli cocido al vapor gratinado con queso sin lactosa.",
        merienda: "Gelatina de frutas naturales hecha en casa con agar-agar.",
        cena: "Brochetas de rape (u otro pescado blanco) con langostinos y cebolla a la plancha, acompañadas de ensalada verde.",
        consejo: "El agar-agar es una excelente opción de gelatina vegetal libre de gluten y rica en fibra prebiótica."
      },
      Sábado: {
        desayuno: "Crepes caseros preparados con harina de trigo sarraceno (alforfón) rellenos de compota casera de frutos rojos.",
        mediaManana: "Un vaso de kéfir de leche natural.",
        almuerzo: "Lomo de atún fresco a la plancha con un pisto tradicional (calabacín, berenjena, pimiento, tomate y cebolla).",
        merienda: "Un puñado de nueces de macadamia.",
        cena: "Hamburguesa de ternera magra casera servida al plato (sin pan) con rodajas de tomate, cebolla morada y lechuga.",
        consejo: "A pesar de su nombre, el trigo sarraceno no tiene ninguna relación con el trigo y es 100% sin gluten de forma natural."
      },
      Domingo: {
        desayuno: "Omelet esponjoso de champiñones portobello y cebollino fresco, acompañado de una infusión de jengibre.",
        mediaManana: "Dados de piña natural con un toque de menta fresca picada.",
        almuerzo: "Paella de verduras tradicional con arroz, alcachofas tiernas, judías verdes y un toque de azafrán puro.",
        merienda: "Yogur natural bífidus sin azúcar con semillas de linaza molidas.",
        cena: "Sopa de pollo casera muy reconfortante con arroz blanco blando, perejil fresco y unas gotas de limón.",
        consejo: "El arroz es el cereal sin gluten más consumido del mundo, fácil de digerir y excelente para recuperar el estómago."
      }
    }
  },
  hipertensos: {
    id: "hipertensos",
    nombre: "Bajo en Sodio (Hipertensos)",
    descripcion: "Plan nutricional enfocado en la reducción estricta del sodio, potenciando alimentos ricos en potasio, magnesio y calcio que ayudan a relajar los vasos sanguíneos y mantener la presión arterial bajo control de manera natural y segura.",
    consejoEspiritual: "La paz y el sosiego son el mejor alimento para el corazón. Una alimentación con poca sal nos invita a valorar los sabores puros y sencillos de la creación de Dios.",
    sabiduriaBiblica: "\"Tú guardarás en completa paz a aquel cuyo pensamiento en ti persevera; porque en ti ha confiado.\" — Isaías 26:3",
    cuidadoMedicina: "Evite por completo los alimentos ultraprocesados, enlatados y embutidos. Reemplace la sal de mesa por hierbas frescas, ajo, cebolla, limón y especias aromáticas.",
    menuSemanal: {
      Lunes: {
        desayuno: "Tazón de avena cocida en leche desnatada con rodajas de plátano (alto en potasio) y semillas de lino. Sin sal.",
        mediaManana: "Una naranja dulce pelada o una mandarina.",
        almuerzo: "Pollo asado al horno sazonado con limón, ajo y romero fresco. Acompañado de puré de patata casero y pimienta.",
        merienda: "Un puñado de nueces crudas sin sal añadida.",
        cena: "Crema de calabacín, zanahoria y cebolla sazonada con levadura nutricional y un chorrito de aceite de oliva.",
        consejo: "La levadura nutricional aporta un delicioso sabor ligeramente salado y a queso, siendo 100% libre de sodio."
      },
      Martes: {
        desayuno: "Yogur griego bajo en grasa sin azúcar, mezclado con fresas frescas picadas y una cucharada de salvado de avena.",
        mediaManana: "Un puñado de almendras crudas sin sal.",
        almuerzo: "Filete de lenguado a la plancha con limón y perejil fresco, acompañado de brócoli y zanahorias baby al vapor.",
        merienda: "Una taza de té verde y una ciruela fresca.",
        cena: "Revuelto de claras de huevo con ajos tiernos, champiñones frescos y pimiento morrón rojo.",
        consejo: "El brócoli al vapor retiene todos sus minerales protectores como el potasio, ideales para regular la presión."
      },
      Miércoles: {
        desayuno: "Tostada de pan integral sin sal con requesón bajo en sodio y una rodaja de tomate con orégano seco.",
        mediaManana: "Una pera de agua madura.",
        almuerzo: "Pavo guisado a la jardinera con alcachofas, guisantes, zanahoria y patatas tiernas cocinadas con tomillo fresco.",
        merienda: "Gelatina ligera de piña natural hecha en casa.",
        cena: "Ensalada crujiente de espinacas tiernas, manzana verde picada, nueces y aderezo ligero de yogur natural desnatado.",
        consejo: "El requesón y el queso cottage son quesos con un contenido de sodio significativamente menor que los quesos curados."
      },
      Jueves: {
        desayuno: "Batido rico en potasio de plátano, espinacas tiernas frescas, yogur natural desnatado y agua de coco sin azúcar.",
        mediaManana: "Bastoncitos de apio y pepino fresco con unas gotas de limón.",
        almuerzo: "Bacalao fresco al horno (no salado) sobre una cama de rodajas de calabacín y patata sazonada con pimentón dulce.",
        merienda: "Un puñado de avellanas crudas sin sal.",
        cena: "Sopa de pasta integral en caldo vegetal casero libre de sal, acompañado de dados de pechuga de pollo tierna.",
        consejo: "El apio contiene un compuesto que ayuda a relajar los músculos alrededor de las arterias, facilitando la circulación."
      },
      Viernes: {
        desayuno: "Tazón de quinoa hinchada con bebida de avena sin azúcar, arándanos azules y semillas de calabaza crudas.",
        mediaManana: "Una rodaja de piña natural.",
        almuerzo: "Salmón al papillote al horno cocinado con puerros, pimiento rojo e hinojo fresco, acompañado de arroz integral hervido.",
        merienda: "Un trozo pequeño de queso fresco sin sal.",
        cena: "Tortilla francesa de dos huevos con cebolla muy picadita y espinacas tiernas cocinadas al vapor.",
        consejo: "Cocinar al papillote conserva los jugos y sabores naturales de los alimentos sin necesidad de añadir nada de sal."
      },
      Sábado: {
        desayuno: "Gachas de avena con una pizca de cacao puro desgrasado sin azúcar, nueces picadas y rodajas de pera fresca.",
        mediaManana: "Dos mandarinas dulces.",
        almuerzo: "Pechuga de pollo troceada y salteada al wok con ramilletes de coliflor, calabacín, cebolla y semillas de sésamo.",
        merienda: "Chips de manzana deshidratada hechos en casa sin azúcar añadida.",
        cena: "Ensalada templada de judías verdes con patatas hervidas, un huevo duro picado y aliño de vinagre de manzana.",
        consejo: "El vinagre de manzana es un excelente potenciador del sabor que nos ayuda a olvidar la ausencia de sal de mesa."
      },
      Domingo: {
        desayuno: "Pan integral tostado sin sal con puré de aguacate, rodajas de tomate y espolvoreado con pimienta negra recién molida.",
        mediaManana: "Tres ciruelas pasas (ricas en fibra y potasio para el tránsito y el corazón).",
        almuerzo: "Estofado ligero de ternera magra con guisantes, champiñones frescos, zanahoria y hierbas provenzales aromáticas.",
        merienda: "Infusión de tila o manzanilla con un puñado de pipas de girasol sin sal.",
        cena: "Sopa de verduras minestrone casera con albahaca fresca picada y hortalizas de temporada bien tiernas.",
        consejo: "Las hierbas provenzales (orégano, tomillo, romero, albahaca) son las mejores aliadas de un corazón sano."
      }
    }
  },
  muscular_oseo: {
    id: "muscular_oseo",
    nombre: "Salud Ósea y Muscular",
    descripcion: "Especialmente diseñado para seniors con el fin de combatir la sarcopenia (pérdida de masa muscular) y la osteoporosis. Es una dieta muy alta en proteínas de alta calidad, calcio biodisponible y vitamina D para fortalecer huesos, articulaciones y musculatura.",
    consejoEspiritual: "Mantener nuestros templos fuertes nos permite seguir sirviendo activamente a los demás y extendiendo la obra de fe con vitalidad y alegría.",
    sabiduriaBiblica: "\"El da esfuerzo al cansado, y multiplica las fuerzas al que no tiene ningunas.\" — Isaías 40:29",
    cuidadoMedicina: "Acompañe esta alimentación rica en proteínas y calcio con sus entrenamientos de fuerza cotidianos de FuerteEnCristo y tome unos minutos de sol diario para activar la vitamina D.",
    menuSemanal: {
      Lunes: {
        desayuno: "Batido proteico natural: Leche desnatada o bebida vegetal enriquecida en calcio, requesón o yogur, medio plátano y semillas de chía.",
        mediaManana: "Un huevo cocido duro sazonado con una pizca de pimienta.",
        almuerzo: "Pechuga de pollo a la plancha de buen tamaño con arroz salvaje y brócoli salteado con sésamo abundante (excelente fuente de calcio).",
        merienda: "Yogur griego natural sin azúcar con almendras picadas.",
        cena: "Filete de trucha o pescado azul al horno con puré de patatas enriquecido con queso cottage alto en proteínas.",
        consejo: "El sésamo o ajonjolí es una de las fuentes vegetales de calcio más concentradas que existen."
      },
      Martes: {
        desayuno: "Revuelto de dos huevos con queso de cabra fresco desmenuzado e higos secos picados (los higos secos aportan un gran nivel de calcio).",
        mediaManana: "Un vaso de kéfir de leche enriquecido en calcio.",
        almuerzo: "Lentejas estofadas con ternera magra, zanahoria y acelgas frescas cocidas (ricas en hierro y minerales óseos).",
        merienda: "Un puñado de nueces de nogal crudas.",
        cena: "Ensalada templada de garbanzos, atún en conserva (alto en vitamina D), huevo duro en rodajas y espinacas tiernas con aderezo de tahini.",
        consejo: "La vitamina D presente en pescados como el salmón o el atún es vital para fijar el calcio en la estructura del hueso."
      },
      Miércoles: {
        desayuno: "Tostada de pan integral de semillas con requesón abundante, lonchas de pavo natural de alta calidad y un hilo de miel pura.",
        mediaManana: "Un puñado de avellanas tostadas sin sal.",
        almuerzo: "Salmón fresco a la parrilla (excelente proteína y vitamina D) con puré rústico de garbanzos y judías verdes tiernas.",
        merienda: "Yogur proteico natural sin azúcar con semillas de chía.",
        cena: "Crema de brócoli y espinacas verdes con dados de pollo salteados y pipas de girasol espolvoreadas.",
        consejo: "Los garbanzos molidos en forma de puré o hummus son una forma deliciosa y blanda de consumir proteínas de gran calidad."
      },
      Jueves: {
        desayuno: "Gachas de avena cocida en leche enriquecida con almendras crudas picadas y rodajas de ciruela fresca.",
        mediaManana: "Dos lonchas de pavo natural enrolladas con queso fresco.",
        almuerzo: "Estofado de pavo con champiñones frescos (buena fuente de vitamina D activa) y una generosa porción de espinacas.",
        merienda: "Queso cottage bajo en grasa con un puñado de frambuesas frescas.",
        cena: "Tortilla de claras de huevo (3 claras) rellena de atún y espinacas al vapor, acompañada de rodajas de tomate aliñado.",
        consejo: "La clara de huevo es la proteína con mayor valor biológico, ideal para reparar las fibras musculares tras el ejercicio."
      },
      Viernes: {
        desayuno: "Batido de yogur natural, proteínas de guisante o cáñamo, arándanos azules y bebida de almendras rica en calcio.",
        mediaManana: "Dos higos secos medianos acompañados de tres almendras.",
        almuerzo: "Filete de dorada al horno con espárragos trigueros a la plancha y una porción mediana de quinoa roja rica en aminoácidos.",
        merienda: "Un vaso de leche desnatada tibia enriquecida o de soja de alta calidad.",
        cena: "Pechuga de pollo desmenuzada y salteada con calabacín, cebolla y espinacas, salpicada con semillas de calabaza.",
        consejo: "Los higos secos son una excelente merienda dulce que proporciona potasio, magnesio y calcio para las articulaciones."
      },
      Sábado: {
        desayuno: "Omelet de espinacas tiernas y queso ricota cremoso, con una rebanada de pan de espelta integral tostado.",
        mediaManana: "Un puñado pequeño de pistachos pelados.",
        almuerzo: "Albóndigas de ternera magra caseras preparadas con avena en lugar de pan rallado, en salsa de verduras con guisantes.",
        merienda: "Un vaso de kéfir de leche con semillas de sésamo añadidas.",
        cena: "Crema fina de calabaza de invierno con semillas de sésamo y un filete de lenguado a la plancha muy tierno.",
        consejo: "La ternera magra provee creatina natural y hierro, elementos esenciales para retrasar la fatiga muscular en seniors."
      },
      Domingo: {
        desayuno: "Panqueques proteicos de clara de huevo y avena molida, servidos con hilos de miel y rodajas de fruta fresca.",
        mediaManana: "Un puñado de almendras enteras crudas con piel.",
        almuerzo: "Muslo de pollo asado al romero con patatas panaderas y ensalada fresca de canónigos y nueces troceadas.",
        merienda: "Yogur griego natural con una cucharadita de semillas de linaza.",
        cena: "Sopa de pescado y marisco tradicional (rica en minerales) con huevo duro rallado por encima y caldo concentrado natural.",
        consejo: "El caldo de pescado natural contiene colágeno y minerales esenciales que cuidan la elasticidad de los tendones."
      }
    }
  },
  digestivo: {
    id: "digestivo",
    nombre: "Salud Digestiva y Fácil Masticación",
    descripcion: "Menú suave, blando y de muy fácil masticación diseñado para seniors que sufren de digestiones pesadas, acidez, reflujo, estreñimiento o dificultades dentales. Es una dieta rica en fibra soluble, prebióticos y alimentos cocinados con texturas amables.",
    consejoEspiritual: "Comer con paz y dar gracias por cada bocado ayuda a relajar el sistema nervioso, mejorando la digestión de forma notable. La gratitud alegra el corazón y sana el vientre.",
    sabiduriaBiblica: "\"El corazón alegre constituye excelente medicina; mas el espíritu triste seca los huesos.\" — Proverbios 17:22",
    cuidadoMedicina: "Mastique cada bocado muy lentamente (unas 20-30 veces), evite tumbarse inmediatamente después de comer para prevenir el reflujo y procure cenar al menos dos horas antes de dormir.",
    menuSemanal: {
      Lunes: {
        desayuno: "Papilla de copos de avena cocidos en agua o leche de almendras con manzana pelada rallada y un hilo de miel pura.",
        mediaManana: "Yogur natural bífidus sin azúcar. Muy tierno y rico en bacterias beneficiosas.",
        almuerzo: "Pechuga de pollo muy tierna cocida y desmenuzada sobre una cama de puré de calabacín y patata al vapor.",
        merienda: "Compota casera de pera templada sazonada con una pizca de canela.",
        cena: "Sopa de sémola de trigo fina en caldo de verduras colado con huevo hilado muy suave de tragar.",
        consejo: "La avena cocida forma un mucílago protector que recubre las paredes del estómago y alivia la acidez."
      },
      Martes: {
        desayuno: "Yogur natural bífidus con papaya madura muy dulce triturada (la papaya contiene enzimas digestivas excelentes).",
        mediaManana: "Manzana asada al horno sin piel y bien blandita.",
        almuerzo: "Filete de merluza al vapor (textura extremadamente suave) con un puré cremoso de zanahoria y patata con aceite de oliva.",
        merienda: "Una taza de infusión digestiva de manzanilla con anís verde.",
        cena: "Crema tibia de calabaza muy fina pasada por la batidora (colar para evitar fibras duras) con un chorrito de aceite de oliva.",
        consejo: "La papaya contiene papaína, una enzima que ayuda a descomponer las proteínas facilitando el trabajo del estómago."
      },
      Miércoles: {
        desayuno: "Crema de arroz (sémola de arroz) cocida con bebida de almendras y medio plátano maduro machacado.",
        mediaManana: "Yogur de soja natural sin azúcar.",
        almuerzo: "Muslo de pollo cocinado a fuego lento hasta quedar muy tierno con arroz blanco blando cocido con zanahoria picada pequeña.",
        merienda: "Rodajas muy finas de melón maduro bien dulce y blando.",
        cena: "Tortilla de un huevo muy jugosa y blanda acompañada de un puré de guisantes finos bien tamizado.",
        consejo: "El arroz blanco cocinado de forma blanda es el alimento digestivo por excelencia para asentar el estómago."
      },
      Jueves: {
        desayuno: "Sémola de avena fina cocida en bebida de arroz con canela molida, textura cremosa y blanda.",
        mediaManana: "Compota de manzana casera triturada fina.",
        almuerzo: "Hamburguesa casera de pavo (carne muy picada dos veces) a la plancha, servida con un puré de calabaza muy suave.",
        merienda: "Una taza de infusión de menta poleo o manzanilla con un chorrito de miel.",
        cena: "Crema suave de calabacín pelado y requesón batido bajo en grasa para un aporte proteico blando.",
        consejo: "Pelar los calabacines reduce la cantidad de fibra insoluble difícil de digerir para estómagos delicados."
      },
      Viernes: {
        desayuno: "Batido cremoso de yogur bífidus, papaya madura y una cucharadita de semillas de lino remojadas previamente.",
        mediaManana: "Plátano maduro chafado con un tenedor y mezclado con requesón blando.",
        almuerzo: "Pastel o pudin de pescado blanco al horno (textura blanda tipo flan) con puré de zanahoria al vapor.",
        merienda: "Yogur bífidus natural sin azúcar con un hilo de miel.",
        cena: "Sopa de fideos finos (cabello de ángel) en caldo de pollo suave con hilos de pollo cocido extremadamente tierno.",
        consejo: "Las semillas de lino puestas en remojo liberan fibra soluble que ayuda a lubricar el tracto digestivo de manera natural."
      },
      Sábado: {
        desayuno: "Tostada de pan blanco de molde sin corteza con queso fresco untable e infusión digestiva de hinojo.",
        mediaManana: "Pera madura pelada y rallada fina.",
        almuerzo: "Pechuga de pollo picada en albóndigas pequeñitas y tiernas, cocinadas en caldo suave de verduras y patatas cocidas.",
        merienda: "Gelatina de frutas suaves hecha en casa.",
        cena: "Crema de verduras depurativas muy fina (puerro, calabacín, zanahoria, patata) bien pasada por la batidora.",
        consejo: "El hinojo es excelente para reducir la formación de gases y aliviar la pesadez estomacal después de comer."
      },
      Domingo: {
        desayuno: "Tortilla francesa de un huevo muy jugosa con un trozo de queso fresco blando, té descafeinado con leche de almendras.",
        mediaManana: "Compota de melocotón en almíbar natural triturada.",
        almuerzo: "Albóndigas de ternera magra picadas muy finas en caldo, acompañadas de puré rústico de patatas y calabacín hervido.",
        merienda: "Infusión reconfortante de manzanilla con anís.",
        cena: "Caldo casero de gallina con huevo batido cuajado muy tierno y picatostes de pan blando remojado.",
        consejo: "El huevo batido cuajado en el caldo caliente proporciona proteínas sin requerir apenas esfuerzo de masticación."
      }
    }
  }
};

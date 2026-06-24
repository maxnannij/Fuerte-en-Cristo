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
  normal: {
    id: "normal",
    nombre: "Alimentación Balanceada y Rendimiento",
    descripcion: "Plan nutricional integral y equilibrado optimizado para personas activas sin restricciones médicas. Está diseñado específicamente para potenciar el rendimiento físico, maximizar la fuerza, acelerar la recuperación muscular y mantener niveles de energía constantes. Contiene un balance óptimo de carbohidratos complejos para combustible, proteínas limpias de alto valor biológico para el músculo, y grasas saludables para la salud hormonal y de las articulaciones.",
    consejoEspiritual: "Nuestra fuerza física debe ser el motor para servir activamente a la obra de Dios. Cuidar de nuestro cuerpo con una nutrición óptima nos prepara para correr la gran carrera de la fe.",
    sabiduriaBiblica: "\"¿No sabéis que los que corren en el estadio, todos a la verdad corren, pero uno solo se lleva el premio? Corred de tal manera que lo obtengáis.\" — 1 Corintios 9:24",
    cuidadoMedicina: "Ideal para acompañar las rutinas semanales de FuerteEnCristo. Recuerda mantener una hidratación de 2 a 3 litros de agua al día para optimizar la contracción muscular y la eliminación de toxinas.",
    menuSemanal: {
      Lunes: {
        desayuno: "Tazón de avena integral cocida con leche entera o bebida vegetal, espolvoreada con nueces, semillas de chía y plátano en rodajas. Café o infusión con miel.",
        mediaManana: "Una manzana roja con una porción de mantequilla de cacahuete o un puñado de almendras.",
        almuerzo: "Pechuga de pollo a la plancha de buen tamaño (combustible proteico post-entrenamiento), arroz integral al vapor y ensalada de espinacas tiernas, tomates cherry y aguacate con aceite de oliva.",
        merienda: "Yogur griego natural con un puñado de arándanos frescos y una cucharada de avena.",
        cena: "Filete de salmón al horno con patatas asadas al tomillo y ramilletes de brócoli al vapor.",
        consejo: "Los carbohidratos complejos de la avena en el desayuno cargan el glucógeno muscular para tus entrenamientos diarios."
      },
      Martes: {
        desayuno: "Tostadas de pan integral de masa madre con huevo revuelto (2 huevos), aguacate y un vaso de zumo de naranja natural.",
        mediaManana: "Un puñado de pistachos y una rodaja de piña natural.",
        almuerzo: "Estofado de ternera magra con guisantes, zanahorias y patatas cocidas en caldo natural de carne.",
        merienda: "Batido proteico hecho con plátano, leche, yogur natural y una cucharadita de cacao puro sin azúcar.",
        cena: "Filete de merluza o lenguado a la plancha con puré cremoso de calabaza y judías verdes salteadas.",
        consejo: "El huevo es la proteína estándar de referencia; consumirlo en el desayuno estimula la síntesis de proteína muscular desde temprano."
      },
      Miércoles: {
        desayuno: "Yogur griego entero mezclado con copos de centeno, semillas de calabaza, pasas y un toque de canela molida.",
        mediaManana: "Dos mandarinas dulces y un trozo de queso fresco o semicurado.",
        almuerzo: "Pechuga de pavo al horno con puré de patata rústico y ensalada mixta de lechuga, pepino y rábano con aderezo de limón.",
        merienda: "Sándwich de pan integral con atún al natural, rodajas de tomate y hojas de rúcula.",
        cena: "Crema caliente de verduras de temporada de fácil absorción y tortilla francesa de dos huevos con champiñones.",
        consejo: "Combina proteínas de digestión rápida (atún) con carbohidratos antes o después de entrenar para acelerar la reparación muscular."
      },
      Jueves: {
        desayuno: "Gachas de avena cocidas con leche, almendras crudas picadas, semillas de linaza y frutos rojos frescos (fresas o frambuesas).",
        mediaManana: "Un huevo duro cocido entero sazonado con sal marina fina y una pizca de orégano.",
        almuerzo: "Lentejas guisadas con arroz integral (proteína vegetal completa de excelente asimilación) y verduras variadas (pimiento, cebolla, calabacín).",
        merienda: "Un plátano maduro mediano (alto en potasio para evitar calambres) con dos cucharadas de yogur griego natural.",
        cena: "Pechuga de pollo a la plancha sazonada con ajo y romero, acompañada de espárragos trigueros a la plancha y batatas asadas.",
        consejo: "La combinación de lentejas y arroz crea un perfil de aminoácidos perfecto, ideal para la fuerza y vitalidad."
      },
      Viernes: {
        desayuno: "Tostada de pan integral con aguacate triturado, queso ricota o feta, rodajas de tomate y té verde.",
        mediaManana: "Un puñado de nueces de nogal y un kiwi maduro.",
        almuerzo: "Pasta integral con carne de ternera magra picada y salsa casera de tomate, espolvoreada con queso parmesano rallado.",
        merienda: "Yogur natural bífidus con una manzana picada y semillas de chía.",
        cena: "Trucha o salmón a la plancha con puré de coliflor cremoso y una ensalada de canónigos.",
        consejo: "La pasta integral es una excelente fuente de energía sostenida si planeas entrenamientos de mayor resistencia."
      },
      Sábado: {
        desayuno: "Panqueques caseros de avena y claras de huevo, servidos con fresas y un hilo de miel de abeja pura.",
        mediaManana: "Un vaso de kéfir de leche con semillas de sésamo.",
        almuerzo: "Pollo asado al limón (muslo o pechuga) con patatas panaderas y calabacines asados al horno con hierbas provenzales.",
        merienda: "Una tostada de pan de centeno con requesón abundante y un hilo de miel.",
        cena: "Sopa minestrone casera enriquecida con dados de pollo cocido y hortalizas de hoja verde.",
        consejo: "El fin de semana es ideal para disfrutar de proteínas ricas en colágeno (como el pollo asado con hueso) que sanan tus articulaciones."
      },
      Domingo: {
        desayuno: "Revuelto de dos huevos con espinacas y queso fresco de cabra, servido con una tostada de pan integral con tomate.",
        mediaManana: "Dados de melón o sandía fresca (excelente hidratante muscular).",
        almuerzo: "Paella de marisco o arroz a la marinera con calamares y langostinos, acompañado de ensalada verde.",
        merienda: "Un puñado de avellanas tostadas y una infusión reconfortante.",
        cena: "Crema de calabacín pelado con patata y pescado blanco tierno a la plancha.",
        consejo: "Los mariscos y pescados del domingo aportan zinc y selenio, minerales cruciales para el sistema inmunitario y la recuperación."
      }
    }
  },
  diabeticos: {
    id: "diabeticos",
    nombre: "Control de Azúcar y Rendimiento (Diabéticos)",
    descripcion: "Menú equilibrado de bajo índice glucémico potenciado con carbohidratos complejos de absorción lenta y proteínas de alta calidad. Está especialmente formulado para seniors diabéticos que realizan ejercicio físico, proporcionando la energía sostenida que requiere el entrenamiento de fuerza, previniendo bajadas de azúcar (hipoglucemias) y fomentando la regeneración celular.",
    consejoEspiritual: "Nuestra salud es un reflejo de nuestra templanza. Comer de forma consciente nos ayuda a glorificar al Señor con un cuerpo fuerte y equilibrado.",
    sabiduriaBiblica: "\"¿O ignoráis que vuestro cuerpo es templo del Espíritu Santo, el cual está en vosotros, el cual tenéis de Dios, y que no sois vuestros?\" — 1 Corintios 6:19",
    cuidadoMedicina: "Mida sus niveles de azúcar en sangre antes y después de entrenar. Si su nivel es bajo antes del ejercicio, consuma una pequeña ración de carbohidratos lentos sugeridos.",
    menuSemanal: {
      Lunes: {
        desayuno: "Omelet de claras de huevo con espinacas frescas y un toque de queso blanco bajo en grasa. Acompañado de 1/2 taza de avena integral cocida con canela para asegurar energía muscular inicial. Té de manzanilla o café descafeinado sin azúcar.",
        mediaManana: "Un puñado pequeño (30g) de almendras o nueces crudas sin sal (excelente grasa saludable para los tejidos).",
        almuerzo: "Pechuga de pollo a la plancha (proteína para recuperación muscular) sazonada con ajo y limón, puré de calabaza natural y ensalada de hojas verdes con pepino.",
        merienda: "Yogur griego natural (sin azúcar) espolvoreado con una cucharadita de semillas de chía o linaza y una pizca de nueces.",
        cena: "Sopa de verduras clara (calabacín, apio, puerro) con pechuga de pollo desmenuzada. Una infusión de menta sin azúcar.",
        consejo: "La combinación de avena y espinacas en el desayuno provee magnesio para la función muscular y carbohidratos estables para el ejercicio."
      },
      Martes: {
        desayuno: "Yogur griego natural sin azúcar con nueces picadas, semillas de girasol, una pizca de canela molida y 1/2 manzana verde en dados.",
        mediaManana: "Rodajas de pepino fresco y apio con unas gotas de limón y un huevo duro entero (recarga de proteínas).",
        almuerzo: "Filete de salmón al horno con finas hierbas (alto en Omega-3 para reducir inflamación de articulaciones), una porción pequeña de quinua cocida (1/2 taza) y espárragos al vapor.",
        merienda: "Un trozo mediano de queso fresco o requesón bajo en grasa con una infusión de rooibos y 3 almendras.",
        cena: "Ensalada de atún al natural con lechuga, tomate cherry, aguacate y aderezo de aceite de oliva y vinagre de manzana.",
        consejo: "La canela tiene propiedades naturales que ayudan a mejorar la sensibilidad a la insulina de forma suave."
      },
      Miércoles: {
        desayuno: "Avena cocida en agua o leche de almendras sin azúcar con rodajas de fresas frescas (bajo índice glucémico), semillas de linaza molidas y una clara de huevo batida adentro para extra proteína de fuerza.",
        mediaManana: "Medio aguacate mediano sazonado con pimienta y unas gotas de limón.",
        almuerzo: "Guiso de pavo tierno con verduras de temporada (brócoli, zanahoria, calabacín) cocinado en caldo casero bajo en grasa, acompañado de una porción de lentejas cocidas.",
        merienda: "Yogur griego natural sin azúcar con una cucharadita de semillas de sésamo tostadas (calcio muscular).",
        cena: "Revuelto de huevo con champiñones frescos y pimientos verdes salteados en una cucharadita de aceite de oliva.",
        consejo: "Los carbohidratos complejos como la avena liberan energía lentamente, evitando los picos de azúcar en sangre durante el ejercicio físico."
      },
      Jueves: {
        desayuno: "Tortilla de dos huevos con champiñones y espinacas, una rebanada fina de pan integral de centeno tostado y una taza de café descafeinado con leche de almendras sin azúcar.",
        mediaManana: "Una manzana verde pequeña con piel (bien lavada) para aprovechar toda su fibra, y 3 nueces enteras.",
        almuerzo: "Merluza al horno sobre una cama de cebolla y tomate en rodajas, acompañado de una ensalada mixta de canónigos y rábano y media taza de garbanzos cocidos.",
        merienda: "Yogur natural bífidus sin azúcar con tres nueces troceadas y semillas de chía.",
        cena: "Crema suave de calabacín y puerros hecha sin patata ni nata, salpicada con semillas de calabaza tostadas y dados de pavo a la plancha.",
        consejo: "La manzana verde contiene pectina, una fibra soluble excelente que ayuda a estabilizar la glucosa antes del ejercicio."
      },
      Viernes: {
        desayuno: "Batido verde proteico hecho con espinacas, apio, pepino, medio plátano (para potasio y energía de entrenamiento), una cucharada de yogur griego y agua.",
        mediaManana: "Dos rodajas de queso de cabra fresco con rodajas de tomate, orégano y un puñado de avellanas.",
        almuerzo: "Pollo al ajillo con judías verdes salteadas y una porción pequeña de arroz integral de grano largo (carbohidrato complejo para el músculo).",
        merienda: "Bastoncitos de zanahoria con una cucharadita de humus casero sin azúcares añadidos.",
        cena: "Filete de lenguado a la plancha con puré cremoso de coliflor (una alternativa deliciosa y de bajísimo impacto glucémico, alta en fibra) y unas gotas de limón.",
        consejo: "El puré de coliflor es excelente para los diabéticos por su bajísimo impacto glucémico comparado con el de patata o maíz."
      },
      Sábado: {
        desayuno: "Una tostada de pan integral de centeno con aguacate triturado, una pizca de chía y un huevo poché encima.",
        mediaManana: "Un tazón pequeño de frambuesas o arándanos frescos (frutas ricas en antioxidantes) y 5 almendras.",
        almuerzo: "Brochetas de pavo y pimientos de colores al horno, acompañadas de ensalada de rúcula, lascas de queso curado y 1/3 taza de quinua.",
        merienda: "Té verde sin azúcar acompañado de un puñado pequeño de avellanas crudas.",
        cena: "Caldo depurativo casero de apio y cebolla con abundante pechuga de pollo desmenuzada para potenciar la recuperación tisular.",
        consejo: "Los frutos rojos son las mejores opciones frutales para los diabéticos gracias a sus altos niveles de antioxidantes y fibra."
      },
      Domingo: {
        desayuno: "Panqueques hechos con harina de almendras, claras de huevo y semillas de lino, acompañados de arándanos azules frescos y té digestivo.",
        mediaManana: "Un puñado de semillas de calabaza tostadas sin sal y rodajas de pepino.",
        almuerzo: "Estofado de ternera magra (alta en hierro y creatina para el músculo) con alcachofas frescas y una porción de brócoli al vapor con aceite de oliva.",
        merienda: "Yogur griego natural sin azúcar con semillas de chía hidratadas.",
        cena: "Tortilla francesa de dos huevos con hojas de espinacas cocidas y ensalada de tomate cherry con albahaca.",
        consejo: "La ternera magra aporta zinc y vitaminas del complejo B, fundamentales para la producción de energía y salud muscular."
      }
    }
  },
  celiacos: {
    id: "celiacos",
    nombre: "Libre de Gluten y Energía (Celíacos)",
    descripcion: "Menú sabroso y 100% libre de gluten, rico en granos antiguos naturalmente puros como la quinoa, el mijo, el trigo sarraceno y la patata dulce. Este plan ayuda a sanar las vellosidades intestinales (combatiendo déficits nutricionales históricos de malabsorción) mientras provee abundante glucógeno y proteínas limpias para el rendimiento físico en seniors.",
    consejoEspiritual: "Purificar lo que introducimos en nuestro cuerpo nos enseña el valor de la pureza espiritual. Busquemos siempre alimentos limpios que edifiquen nuestra vitalidad.",
    sabiduriaBiblica: "\"Purifícame con hisopo, y seré limpio; lávame, y seré más blanco que la nieve.\" — Salmo 51:7",
    cuidadoMedicina: "Compre solo productos con certificación oficial libre de gluten y evite la contaminación cruzada en la cocina para asegurar la correcta absorción de los nutrientes.",
    menuSemanal: {
      Lunes: {
        desayuno: "Gachas de avena certificada libre de gluten, cocidas con leche desnatada o bebida vegetal enriquecida, plátano machacado (energía rápida) y nueces pecanas picadas.",
        mediaManana: "Una porción de papaya fresca picada en cubos con semillas de chía espolvoreadas.",
        almuerzo: "Pechuga de pollo marinada al limón y finas hierbas con arroz integral (recarga post-entrenamiento de fácil asimilación) y calabacitas salteadas en aceite de oliva.",
        merienda: "Dos tortitas de arroz integral inflado con queso crema bajo en grasa y una loncha de pavo natural de alta calidad.",
        cena: "Ensalada fresca de tomate, aguacate, queso fresco, huevo duro picado (proteína reparadora de noche) y hojas de albahaca picadas.",
        consejo: "La papaya es rica en vitamina C, que ayuda a fortalecer el colágeno de los tendones fatigados por el entrenamiento."
      },
      Martes: {
        desayuno: "Arepa de maíz amarillo casera rellena de queso blanco fresco, huevo revuelto y rodajas de aguacate maduro. Una infusión de menta.",
        mediaManana: "Un puñado de pistachos pelados sin sal y una mandarina.",
        almuerzo: "Suprema de salmón a la sartén (alto en proteínas y Omega-3) con puré de patatas natural enriquecido con aceite de oliva, y zanahorias asadas.",
        merienda: "Yogur de oveja o cabra natural sin azúcar con una pizca de canela y semillas de lino molidas.",
        cena: "Crema tibia de calabaza, jengibre y coco, decorada con dados de pollo al vapor, almendras laminadas y semillas de chía.",
        consejo: "El maíz de la arepa es una maravillosa fuente de carbohidratos libres de gluten que repone la energía rápidamente después de entrenar."
      },
      Miércoles: {
        desayuno: "Tostadas de pan especial sin gluten con aguacate triturado, un huevo poché rico en nutrientes esenciales y una rodaja de tomate fresco con orégano seco.",
        mediaManana: "Una compota de manzana casera preparada sin azúcares refinados, espolvoreada con almendras molidas.",
        almuerzo: "Muslos de pollo al horno sazonados con romero y patatas o batatas rústicas asadas (excelente combustible), acompañados de una ensalada de berros.",
        merienda: "Un puñado de nueces de nogal y una infusión de rooibos.",
        cena: "Revuelto campesino de dos huevos con tomate picado, cebolla tierna, champiñones y espárragos trigueros.",
        consejo: "La batata asada es rica en betacarotenos y carbohidratos lentos ideales para rendir al máximo en tus rutinas de fuerza."
      },
      Jueves: {
        desayuno: "Yogur de coco o kéfir natural sin azúcar con papaya fresca, un puñado de semillas de calabaza crujientes y copos de quinoa inflada sin gluten.",
        mediaManana: "Rodajas de kiwi o una naranja dulce, acompañadas de un huevo cocido.",
        almuerzo: "Lentejas tradicionales guisadas con calabaza, zanahoria, espinacas frescas y una pizca de pimentón de la Vera, servidas con una porción de arroz blanco.",
        merienda: "Un plátano maduro machacado con un toque de canela, semillas de sésamo y tres almendras crudas.",
        cena: "Sopa reconfortante de fideos de arroz en caldo de verduras casero con dados de pollo tierno y perejil fresco picado.",
        consejo: "Las lentejas combinadas con arroz proporcionan proteínas completas y hierro para prevenir el cansancio durante el ejercicio."
      },
      Viernes: {
        desayuno: "Huevo pasado por agua con bastoncitos de pan tostado sin gluten, medio aguacate y una taza de té verde.",
        mediaManana: "Un puñado de avellanas tostadas sin sal y dos ciruelas pasas.",
        almuerzo: "Medallones de solomillo de cerdo con puré de manzana natural y brócoli cocido al vapor gratinado con queso bajo en lactosa, acompañado de patatas asadas.",
        merienda: "Gelatina de frutas naturales hecha en casa con agar-agar y una porción de yogur griego.",
        cena: "Brochetas de rape (u otro pescado blanco) con langostinos, cebolla y pimientos a la plancha, acompañadas de ensalada verde.",
        consejo: "El solomillo de cerdo es una carne magra excelente que aporta tiamina (vitamina B1), clave para el metabolismo de la energía."
      },
      Sábado: {
        desayuno: "Crepes caseros preparados con harina de trigo sarraceno (alforfón) rellenos de compota casera de frutos rojos y queso fresco desnatado.",
        mediaManana: "Un vaso de kéfir de leche natural con semillas de chía.",
        almuerzo: "Lomo de atún fresco a la plancha con un pisto tradicional (calabacín, berenjena, pimiento, tomate y cebolla) y una taza de arroz integral.",
        merienda: "Un puñado de nueces de macadamia.",
        cena: "Hamburguesa de ternera magra casera servida al plato (sin pan) con rodajas de tomate, cebolla morada, aguacate y ensalada fresca.",
        consejo: "El trigo sarraceno, rico en proteínas vegetales y libre de gluten, proporciona los aminoácidos ideales para recuperar los músculos."
      },
      Domingo: {
        desayuno: "Omelet esponjoso de dos huevos con champiñones portobello y cebollino fresco, acompañado de una infusión de jengibre y una tortita de arroz.",
        mediaManana: "Dados de piña natural con un toque de menta fresca picada y tres almendras.",
        almuerzo: "Paella de verduras y pollo tradicional con arroz, alcachofas tiernas, judías verdes y un toque de azafrán puro.",
        merienda: "Yogur natural bífidus sin azúcar con semillas de linaza molidas.",
        cena: "Sopa de pollo casera muy reconfortante con arroz blanco blando, perejil fresco y unas gotas de limón.",
        consejo: "El azafrán tiene propiedades antioxidantes y antiinflamatorias que ayudan a aliviar la sobrecarga muscular dominical."
      }
    }
  },
  hipertensos: {
    id: "hipertensos",
    nombre: "Bajo en Sodio y Potasio Activo (Hipertensos)",
    descripcion: "Plan nutricional bajo en sodio y enriquecido con potasio, magnesio y calcio, esenciales para regular la presión arterial y optimizar la contracción muscular durante el ejercicio físico. Formulado con proteínas de alta calidad e ingredientes naturales que combaten la fatiga y el cansancio sin comprometer la salud cardiovascular.",
    consejoEspiritual: "La paz y el sosiego son el mejor alimento para el corazón. Una alimentación con poca sal nos invita a valorar los sabores puros y sencillos de la creación de Dios.",
    sabiduriaBiblica: "\"Tú guardarás en completa paz a aquel cuyo pensamiento en ti persevera; porque en ti ha confiado.\" — Isaías 26:3",
    cuidadoMedicina: "Evite alimentos procesados y use ajo, cebolla, limón y hierbas para sazonar. El potasio de las frutas ayuda a relajar los vasos y prevenir calambres musculares al entrenar.",
    menuSemanal: {
      Lunes: {
        desayuno: "Tazón de avena cocida en leche desnatada o de almendras con abundante plátano (alto en potasio y carbohidrato energético de entrenamiento) y semillas de lino. Sin sal.",
        mediaManana: "Una naranja dulce pelada o una mandarina, acompañada de un huevo cocido (proteína limpia sin sodio).",
        almuerzo: "Pollo asado al horno sazonado con limón, ajo y romero fresco. Acompañado de puré de patata casero hecho con aceite de oliva e higos secos picados.",
        merienda: "Un puñado de nueces crudas sin sal añadida.",
        cena: "Crema de calabacín, zanahoria y cebolla sazonada con levadura nutricional, dados de pollo a la plancha y un chorrito de aceite de oliva.",
        consejo: "El romero y el ajo son vasodilatadores naturales excelentes que ayudan a regular la presión durante la rutina física."
      },
      Martes: {
        desayuno: "Yogur griego bajo en grasa sin azúcar, mezclado con fresas frescas picadas, una cucharada de salvado de avena y nueces trituradas.",
        mediaManana: "Un puñado de almendras crudas sin sal.",
        almuerzo: "Filete de lenguado a la plancha con limón y perejil fresco, acompañado de brócoli, calabacín y una patata mediana al vapor.",
        merienda: "Una taza de té verde y una ciruela fresca con una porción de queso fresco sin sal.",
        cena: "Revuelto de dos huevos con ajos tiernos, champiñones frescos y pimiento morrón rojo (rico en vitamina C para reparar tendones).",
        consejo: "El potasio del brócoli y las patatas es un diurético natural fantástico que combate la retención de líquidos y la presión."
      },
      Miércoles: {
        desayuno: "Tostada de pan integral sin sal con requesón bajo en sodio, un huevo escalfado y rodajas de tomate fresco con orégano seco.",
        mediaManana: "Una pera de agua madura y tres nueces.",
        almuerzo: "Pavo guisado a la jardinera con alcachofas, guisantes, zanahoria y patatas tiernas cocinadas con tomillo fresco (gran aporte de carbohidratos de asimilación progresiva).",
        merienda: "Yogur bífidus natural sin azúcar con semillas de chía.",
        cena: "Ensalada crujiente de espinacas tiernas (ricas en magnesio), dados de pechuga de pollo asada, manzana verde picada, nueces y aderezo ligero de yogur desnatado.",
        consejo: "El magnesio presente en las espinacas es crucial para evitar calambres y asegurar una buena relajación muscular post-entreno."
      },
      Jueves: {
        desayuno: "Batido rico en potasio de plátano, espinacas tiernas frescas, yogur natural desnatado, almendras molidas y agua de coco sin azúcar (el hidratante definitivo para seniors deportistas).",
        mediaManana: "Bastoncitos de apio y pepino fresco con unas gotas de limón y un trocito de queso fresco sin sal.",
        almuerzo: "Bacalao fresco al horno (desalado) sobre una cama de rodajas de calabacín y patata sazonada con pimentón dulce, acompañado de ensalada verde.",
        merienda: "Un puñado de avellanas crudas sin sal.",
        cena: "Sopa de pasta integral en caldo vegetal casero libre de sal, acompañado de abundantes dados de pechuga de pollo tierna.",
        consejo: "El agua de coco y el plátano actúan como una bebida isotónica natural idónea para recuperar electrolitos tras el ejercicio."
      },
      Viernes: {
        desayuno: "Tazón de quinoa hinchada o copos de avena con bebida de avena sin azúcar, arándanos azules y semillas de calabaza crudas (ricas en zinc y magnesio para la fuerza muscular).",
        mediaManana: "Una rodaja de piña natural con un huevo duro.",
        almuerzo: "Salmón al papillote al horno (rico en grasas saludables Omega-3 que cuidan el sistema cardiovascular) cocinado con puerros, pimiento rojo e hinojo fresco, acompañado de arroz integral.",
        merienda: "Un trozo pequeño de queso fresco sin sal.",
        cena: "Tortilla francesa de dos huevos con cebolla muy picadita y espinacas tiernas cocinadas al vapor.",
        consejo: "El pescado azul como el salmón mejora la elasticidad de los vasos sanguíneos y apoya la recuperación muscular."
      },
      Sábado: {
        desayuno: "Gachas de avena con una pizca de cacao puro desgrasado sin azúcar, nueces picadas y rodajas de pera fresca.",
        mediaManana: "Dos mandarinas dulces y un puñado de pistachos crudos sin sal.",
        almuerzo: "Pechuga de pollo troceada y salteada al wok con ramilletes de coliflor, calabacín, cebolla, patata cocida y semillas de sésamo.",
        merienda: "Yogur griego natural con una ciruela fresca.",
        cena: "Ensalada templada de judías verdes con patatas hervidas, un huevo duro picado, una lata de atún al natural sin sal y aliño de vinagre de manzana.",
        consejo: "El atún al natural provee aminoácidos rápidos ideales para frenar la pérdida de masa muscular."
      },
      Domingo: {
        desayuno: "Pan integral tostado sin sal con puré de aguacate, rodajas de tomate, huevo duro picado y espolvoreado con pimienta negra y orégano.",
        mediaManana: "Tres ciruelas pasas y una taza de té de hibisco (excelente hipotensor natural).",
        almuerzo: "Estofado ligero de ternera magra con guisantes (aporte de proteínas de fuerza), champiñones frescos, zanahoria y hierbas provenzales aromáticas.",
        merienda: "Infusión de tila o manzanilla con un puñado de pipas de calabaza sin sal.",
        cena: "Sopa de verduras minestrone casera con fideos de arroz, albahaca fresca picada y dados de pavo tiernos.",
        consejo: "El té de hibisco es conocido por ayudar de forma natural a relajar los vasos arteriales después de entrenar."
      }
    }
  },
  muscular_oseo: {
    id: "muscular_oseo",
    nombre: "Fuerza Ósea, Muscular y Articular",
    descripcion: "Dieta hiperproteica y altamente biodisponible formulada especialmente para combatir de raíz la sarcopenia (pérdida de masa muscular) y la osteoporosis. Es excepcionalmente rica en calcio de fácil absorción, vitamina D, colágeno y magnesio. Perfecta para reconstruir fibras musculares dañadas tras las sesiones de entrenamiento y mejorar la salud articular.",
    consejoEspiritual: "Mantener nuestros templos fuertes nos permite seguir sirviendo activamente a los demás y extendiendo la obra de fe con vitalidad y alegría.",
    sabiduriaBiblica: "\"El da esfuerzo al cansado, y multiplica las fuerzas al que no tiene ningunas.\" — Isaías 40:29",
    cuidadoMedicina: "Combine esta alimentación rica en proteínas y calcio con su rutina habitual de fuerza de FuerteEnCristo, asegurando una buena asimilación mediante paseos cortos al sol.",
    menuSemanal: {
      Lunes: {
        desayuno: "Batido proteico de alta asimilación: Leche desnatada o bebida de soja enriquecida en calcio, requesón o yogur griego, un huevo cocido, medio plátano y semillas de chía molidas.",
        mediaManana: "Un huevo cocido duro sazonado con una pizca de pimienta y dos nueces.",
        almuerzo: "Pechuga de pollo a la plancha de gran tamaño (30g de proteína neta), arroz salvaje o integral y brócoli salteado con sésamo abundante (un mineralizador natural para tus huesos).",
        merienda: "Yogur griego natural sin azúcar con almendras picadas e higos secos.",
        cena: "Filete de trucha o pescado azul al horno con puré de patatas enriquecido con requesón o queso cottage alto en proteínas.",
        consejo: "Las semillas de sésamo del almuerzo contienen 9 veces más calcio que la leche entera por cada 100g."
      },
      Martes: {
        desayuno: "Revuelto de dos huevos enteros y una clara con queso de cabra fresco desmenuzado e higos secos picados (excelente aporte de calcio y potasio pre-entreno).",
        mediaManana: "Un vaso de kéfir de leche enriquecido en calcio con chía.",
        almuerzo: "Lentejas estofadas con ternera magra de calidad (hierro, zinc y creatina natural para la contracción), zanahoria y acelgas frescas.",
        merienda: "Yogur proteico de cabra con nueces picadas.",
        cena: "Ensalada templada de garbanzos, atún en conserva (alto en vitamina D para absorber el calcio), huevo duro en rodajas y espinacas tiernas con aderezo de tahini.",
        consejo: "La vitamina D del pescado azul y del huevo es el 'pegamento' que fija el calcio a la estructura ósea."
      },
      Miércoles: {
        desayuno: "Tostada de pan integral de semillas con requesón abundante, lonchas de pavo natural y un huevo frito en agua con un chorrito de aceite de oliva.",
        mediaManana: "Un puñado de avellanas tostadas sin sal.",
        almuerzo: "Salmón fresco a la parrilla (excelente aporte de proteínas y grasas saludables antiinflamatorias) con puré rústico de garbanzos y judías verdes tiernas al vapor.",
        merienda: "Batido proteico casero con leche desnatada enriquecida, plátano y levadura nutricional.",
        cena: "Crema de brócoli y espinacas con generosos dados de pechuga de pollo salteada y semillas de sésamo.",
        consejo: "La combinación de garbanzos y salmón aporta proteínas de alta densidad y fósforo, idóneos para la densidad ósea."
      },
      Jueves: {
        desayuno: "Gachas de avena cocida en leche enriquecida con almendras crudas picadas, semillas de linaza y un cacito de proteína de suero de leche (opcional) o claras de huevo batidas adentro.",
        mediaManana: "Dos lonchas de pavo natural enrolladas con queso fresco y un kiwi.",
        almuerzo: "Estofado de pavo con champiñones frescos (ricos en vitamina D) y una generosa porción de espinacas cocidas con patatas.",
        merienda: "Queso cottage bajo en grasa con un puñado de arándanos o fresas y nueces.",
        cena: "Tortilla de claras de huevo (3 claras) rellena de atún y espinacas al vapor, acompañada de rodajas de tomate con orégano y un toque de queso feta.",
        consejo: "La clara de huevo es la proteína con mayor valor biológico, ideal para reparar las fibras musculares tras el ejercicio."
      },
      Viernes: {
        desayuno: "Batido de yogur natural, proteínas de guisante o cáñamo, arándanos azules y bebida de almendras rica en calcio con una tostada integral de requesón.",
        mediaManana: "Dos higos secos medianos acompañados de cinco almendras.",
        almuerzo: "Filete de dorada o lubina al horno con espárragos trigueros a la plancha y una porción mediana de quinoa roja rica en aminoácidos para el músculo.",
        merienda: "Un vaso de leche desnatada tibia enriquecida o de soja de alta calidad con un huevo cocido.",
        cena: "Pechuga de pollo desmenuzada y salteada con calabacín, cebolla, espinacas y un puñado de cacahuetes machacados.",
        consejo: "La quinoa es un pseudocereal completo que contiene lisina, un aminoácido clave en el desarrollo de tejidos musculares."
      },
      Sábado: {
        desayuno: "Omelet de espinacas tiernas, una clara de huevo extra y queso ricota cremoso, con una rebanada de pan integral de espelta tostado.",
        mediaManana: "Un puñado pequeño de pistachos pelados y una mandarina.",
        almuerzo: "Albóndigas de ternera magra caseras preparadas con avena integral en lugar de pan rallado, en salsa de verduras con guisantes y patata cocida.",
        merienda: "Un vaso de kéfir de leche con semillas de sésamo añadidas.",
        cena: "Crema fina de calabaza de invierno con semillas de sésamo, jengibre y un filete de lenguado o galleta a la plancha muy tierno.",
        consejo: "La ternera aporta creatina natural, un compuesto que mejora la fuerza explosiva y retrasa la fatiga muscular en seniors."
      },
      Domingo: {
        desayuno: "Panqueques proteicos de clara de huevo y avena molida, servidos con hilos de miel, nueces y rodajas de fruta fresca.",
        mediaManana: "Un puñado de almendras enteras crudas con piel y un higo seco.",
        almuerzo: "Muslo de pollo asado al romero con patatas panaderas (apoyo glucídico) y ensalada fresca de canónigos, nueces troceadas y lascas de parmesano.",
        merienda: "Yogur griego natural con una cucharadita de semillas de linaza y frutos rojos.",
        cena: "Sopa de pescado y marisco tradicional (altísima en minerales y colágeno) con huevo duro rallado por encima y caldo concentrado natural.",
        consejo: "El caldo de pescado natural y mariscos aporta colágeno y minerales que cuidan la elasticidad de los tendones y cartílagos."
      }
    }
  },
  digestivo: {
    id: "digestivo",
    nombre: "Salud Digestiva y Absorción (Fácil Masticación)",
    descripcion: "Menú suave, blando y de muy fácil digestión concebido para seniors con digestiones lentas o dificultades dentales, pero optimizado para proporcionar energía rápida y aminoácidos de asimilación sin pesadez estomacal. Utiliza alimentos ricos en fibra soluble, prebióticos, carbohidratos bien cocidos y proteínas de textura sumamente tierna para alimentar tus entrenamientos.",
    consejoEspiritual: "Comer con paz y dar gracias por cada bocado ayuda a relajar el sistema nervioso, mejorando la digestión de forma notable. La gratitud alegra el corazón y sana el vientre.",
    sabiduriaBiblica: "\"El corazón alegre constituye excelente medicina; mas el espíritu triste seca los huesos.\" — Proverbios 17:22",
    cuidadoMedicina: "Mastique lentamente cada porción. Los purés de calabaza y batata son excelentes fuentes de combustible deportivo muy suave para el estómago antes de hacer ejercicio.",
    menuSemanal: {
      Lunes: {
        desayuno: "Papilla cremosa de copos de avena finos cocidos en agua o leche de almendras, mezclada con manzana pelada rallada y un hilo de miel pura. Aporta energía suave y duradera.",
        mediaManana: "Yogur natural bífidus sin azúcar con papaya bien madura chafada.",
        almuerzo: "Pechuga de pollo sumamente tierna cocida a fuego lento y desmenuzada (fácil masticación y proteína muscular rápida) sobre puré de calabacín y patata al vapor.",
        merienda: "Compota casera de pera templada con una pizca de canela y una cucharadita de requesón blando batido.",
        cena: "Sopa de sémola de trigo fina en caldo de verduras con huevo batido hilado muy suave y reconfortante.",
        consejo: "La avena cocida protege la mucosa gástrica, ideal para prevenir molestias antes de empezar a moverse."
      },
      Martes: {
        desayuno: "Yogur natural bífidus o kéfir con papaya madura muy dulce triturada y una cucharada de sémola de arroz hervida.",
        mediaManana: "Manzana asada al horno sin piel bien blandita con una pizca de queso fresco batido.",
        almuerzo: "Filete de merluza al vapor (textura suave y digestiva de pescado blanco) con puré cremoso de zanahoria, patata y un hilo de aceite de oliva.",
        merienda: "Una taza de infusión digestiva de manzanilla con anís verde y medio plátano muy maduro chafado.",
        cena: "Crema tibia de calabaza muy fina pasada por la batidora con dados de tofu o pollo muy blandito.",
        consejo: "La papaya contiene papaína, una enzima digestiva natural que descompone las proteínas facilitando la digestión muscular."
      },
      Miércoles: {
        desayuno: "Crema de arroz (sémola de arroz) cocida con bebida de almendras, canela y medio plátano maduro machacado (excelente para reponer glucógeno sin esfuerzo gástrico).",
        mediaManana: "Yogur de soja natural sin azúcar o requesón batido tierno.",
        almuerzo: "Muslo de pollo desosado cocinado a fuego muy lento hasta deshebrarse, con arroz blanco bien blando y zanahorias cocidas en rodajas finas.",
        merienda: "Yogur griego desnatado con un hilo de miel de abeja y pera rallada fina.",
        cena: "Tortilla de un huevo muy jugosa y blanda acompañada de un puré de guisantes finos bien tamizado.",
        consejo: "El arroz blanco cocinado muy blando es el carbohidrato digestivo rey, proporcionando energía limpia y rápida para los músculos."
      },
      Jueves: {
        desayuno: "Sémola de avena fina cocida en bebida de arroz con canela molida y una cucharada de requesón tierno, textura cremosa y blanda.",
        mediaManana: "Compota de manzana casera triturada fina con semillas de lino previamente trituradas.",
        almuerzo: "Hamburguesa casera de pavo (picada dos veces para que sea blanda) a la plancha, servida con un puré de calabaza y batata muy suave.",
        merienda: "Una taza de infusión de menta poleo o manzanilla con un chorrito de miel y medio plátano chafado.",
        cena: "Crema suave de calabacín pelado y requesón batido bajo en grasa para un aporte proteico blando y reparador antes del descanso nocturno.",
        consejo: "La batata en puré es rica en potasio y carbohidratos de asimilación progresiva, dando energía constante para tu cuerpo."
      },
      Viernes: {
        desayuno: "Batido cremoso de yogur bífidus, papaya madura, una cucharada de copos de quinoa muy cocidos y una cucharadita de semillas de lino remojadas previamente.",
        mediaManana: "Plátano maduro chafado con un tenedor y mezclado con requesón blando o queso cottage.",
        almuerzo: "Pastel o pudin de pescado blanco al horno (textura blanda tipo flan) con puré de zanahoria y una patata cocida muy suave.",
        merienda: "Yogur bífidus natural sin azúcar con un hilo de miel.",
        cena: "Sopa de fideos finos (cabello de ángel) en caldo de pollo suave con abundante pollo deshebrado extremadamente tierno.",
        consejo: "La combinación de pescado blanco cocinado en flan o pastel facilita una digestión veloz y provee proteínas de reconstrucción muscular."
      },
      Sábado: {
        desayuno: "Tostada de pan de molde blanco tostado muy suave y sin corteza, con queso fresco untable e infusión digestiva de hinojo.",
        mediaManana: "Pera madura pelada y rallada fina con una cucharada de kéfir.",
        almuerzo: "Pechuga de pollo picada en albóndigas pequeñitas y muy tiernas, cocinadas en caldo suave de verduras, acompañadas de puré de patatas.",
        merienda: "Gelatina de frutas suaves hecha en casa con requesón batido.",
        cena: "Crema de verduras depurativas muy fina (puerro, calabacín, zanahoria, patata) bien pasada por la batidora con huevo duro rallado.",
        consejo: "El hinojo disminuye los espasmos gastrointestinales y estimula una digestión placentera tras entrenamientos intensos."
      },
      Domingo: {
        desayuno: "Tortilla francesa de un huevo muy jugosa y tierna, acompañada de queso fresco blando e infusión de manzanilla con anís.",
        mediaManana: "Compota de melocotón en almíbar natural triturada fina.",
        almuerzo: "Albóndigas de ternera magra picadas muy finas en caldo, acompañadas de puré rústico de patatas y calabacín hervido pelado.",
        merienda: "Infusión reconfortante de manzanilla con un toque de miel.",
        cena: "Caldo casero de gallina con huevo batido cuajado muy tierno, proporcionando proteínas sin esfuerzo de masticación.",
        consejo: "El huevo cuajado en el caldo caliente proporciona proteínas con un valor biológico del 100%, ideal para un domingo de descanso."
      }
    }
  }
};

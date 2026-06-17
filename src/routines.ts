import { TodayWorkout, ExerciseItem } from "./types";

export const ROUTINES_BY_ROUTE_AND_DAY: Record<string, Record<string, TodayWorkout>> = {
  suave: {
    Lunes: {
      nombreDia: "Lunes — Ruta de la Gracia y Movilidad",
      enfoqueMentalEspiritual: "Paso a paso, con paciencia y alegría, renovando las fuerzas que Dios nos da.",
      ejercicios: [
        {
          nombre: "Sentarse y pararse con soporte de silla",
          instrucciones: "Párate erguido frente a una silla firme. Baja despacio y siéntate. Luego, impúlsate con las piernas para levantarte de nuevo. Puedes ayudarte con las manos para más seguridad.",
          series: 3,
          repeticiones_o_tiempo: "8 repeticiones",
          descanso_s_entre_series: 45
        },
        {
          nombre: "Flexiones de pecho sobre la pared",
          instrucciones: "Coloca las manos en la pared a la altura de tus hombros. Da un paso atrás con tus pies. Flexiona los brazos llevando el pecho hacia el muro y regresa con de manera suave.",
          series: 3,
          repeticiones_o_tiempo: "8 repeticiones",
          descanso_s_entre_series: 45
        },
        {
          nombre: "Elevación de talones afirmándote de la silla",
          instrucciones: "Apóyate de pie en el respaldo de una silla firme. Sube lentamente sobre las puntas de tus pies, sostén un segundo sintiendo la fuerza en tus pantorrillas y baja despacio sin prisas.",
          series: 3,
          repeticiones_o_tiempo: "10 repeticiones",
          descanso_s_entre_series: 40
        },
        {
          nombre: "Círculos gigantes de hombros para aliviar tensión",
          instrucciones: "Párate derecho o quédate sentado. Dibuja círculos grandes y pausados con tus hombros hacia atrás, respirando hondo y sacando toda la tensión acumulada.",
          series: 3,
          repeticiones_o_tiempo: "12 repeticiones",
          descanso_s_entre_series: 30
        },
        {
          nombre: "Marcha sentados en silla levantando rodillas",
          instrucciones: "Siéntate derecho en la silla. Levanta una rodilla hacia arriba de forma alterna, como si marcharas sentadito, manteniendo tu abdomen activo con alegría.",
          series: 3,
          repeticiones_o_tiempo: "30 segundos",
          descanso_s_entre_series: 45
        }
      ]
    },
    Martes: {
      nombreDia: "Martes — Paso Alegre y Respiración de Fe",
      enfoqueMentalEspiritual: "Disfrutando de la creación con cada paso. El aire que respiramos es regalo de Dios.",
      ejercicios: [
        {
          nombre: "Paseo rítmico respirando amor",
          instrucciones: "En tu lugar de entrenamiento o un pasillo cómodo, camina con paso firme y erguido. Inhala amor, exhala con gratitud a un ritmo constante.",
          series: 1,
          repeticiones_o_tiempo: "15 minutos",
          descanso_s_entre_series: 0
        },
        {
          nombre: "Rotación suave de tobillos",
          instrucciones: "Sujétate de una pared o mesa firme. Levanta un pie ligeramente y haz giros lentos hacia afuera y hacia adentro. Desarrolla estabilidad y previene caídas.",
          series: 3,
          repeticiones_o_tiempo: "10 por lado",
          descanso_s_entre_series: 30
        },
        {
          nombre: "Apertura de pecho en cruz",
          instrucciones: "Párate derecho e inhala abriendo los brazos a los lados para expandir la caja torácica. Exhala abrazándote suavemente a ti mismo.",
          series: 3,
          repeticiones_o_tiempo: "10 repeticiones",
          descanso_s_entre_series: 30
        },
        {
          nombre: "Estiramiento suave de pantorrillas en pared",
          instrucciones: "Apoya tus antebrazos en la pared, adelanta una pierna y lleva la otra bien atrás con el talón totalmente asentado en el suelo para estirar con calma.",
          series: 3,
          repeticiones_o_tiempo: "20 segundos por pierna",
          descanso_s_entre_series: 30
        }
      ]
    },
    Miércoles: {
      nombreDia: "Miércoles — Cimiento de Roca con la Pared",
      enfoqueMentalEspiritual: "'Jehová es mi roca y mi fortaleza'. Construyendo estabilidad desde los pies a la columna.",
      ejercicios: [
        {
          nombre: "Sentadilla isométrica con apoyo de pared",
          instrucciones: "Apoya la espalda plana contra la pared y deslízate levemente hacia abajo doblando un poco las rodillas. Sostén la posición sintiendo tus muslos firmes.",
          series: 3,
          repeticiones_o_tiempo: "15 segundos",
          descanso_s_entre_series: 45
        },
        {
          nombre: "Elevación de brazos al cielo con libros ligeros",
          instrucciones: "Sostén un libro ligero en cada mano. Levántalos rectos por encima del nivel de tus hombros para ganar elasticidad y salud articular en tu espalda superior.",
          series: 3,
          repeticiones_o_tiempo: "10 repeticiones",
          descanso_s_entre_series: 40
        },
        {
          nombre: "Puntillas sostenidas",
          instrucciones: "Agárrate del respaldo de tu silla de confianza. Sube sobre las puntas de los pies y sostén la postura 2 segundos arriba antes de bajar delicadamente.",
          series: 3,
          repeticiones_o_tiempo: "12 repeticiones",
          descanso_s_entre_series: 30
        },
        {
          nombre: "Giros suaves de tronco sentados",
          instrucciones: "Siéntate recto e interactúa con tus manos en un giro de tronco ligero a la derecha y luego a la izquierda sin forzar las lumbares.",
          series: 2,
          repeticiones_o_tiempo: "10 por cada lado",
          descanso_s_entre_series: 30
        }
      ]
    },
    Jueves: {
      nombreDia: "Jueves — Articulaciones del Templo Feliz",
      enfoqueMentalEspiritual: "Nuestras articulaciones son la maravillosa ingeniería de Dios. Las movemos hoy con amor fraternal.",
      ejercicios: [
        {
          nombre: "Marcha sentados en silla rítmica",
          instrucciones: "Siéntate erguido en una silla firme. Alterna el despegue de tus pies elevando rodillas como si marcharas alegre al compás de un salmo.",
          series: 3,
          repeticiones_o_tiempo: "35 segundos",
          descanso_s_entre_series: 45
        },
        {
          nombre: "Postura perfecta de pie contra la pared",
          instrucciones: "Párate con talones, glúteos, hombros y cabeza haciendo contacto suave con la pared. Retrae tu mentón levemente y mantén esa postura erguida.",
          series: 3,
          repeticiones_o_tiempo: "30 segundos",
          descanso_s_entre_series: 40
        },
        {
          nombre: "Extensión de cadera hacia atrás afirmando mesa",
          instrucciones: "De pie, sujétate de tu mesa y lleva una pierna recta hacia atrás lentamente apretando el glúteo para cuidar la salud de tu columna.",
          series: 3,
          repeticiones_o_tiempo: "10 por cada lado",
          descanso_s_entre_series: 35
        },
        {
          nombre: "Estiramiento de gato-vaca sentados",
          instrucciones: "Apoya las manos en tus muslos. Inhala curvando la columna y mirando con amor arriba; exhala encorvando tu espalda metiendo suavemente la barbilla.",
          series: 3,
          repeticiones_o_tiempo: "8 repeticiones",
          descanso_s_entre_series: 30
        }
      ]
    },
    Viernes: {
      nombreDia: "Viernes — Flujo Celestial de Energía",
      enfoqueMentalEspiritual: "Impulsando el torrente sanguíneo, removiendo la pesadez y llenando la mente de pensamientos de fe.",
      ejercicios: [
        {
          nombre: "Paseo acelerado en el hogar",
          instrucciones: "Camina por tus áreas comunes alzando tus talones ligeramente detrás de ti para movilizar las rodillas y agilizar la circulación.",
          series: 1,
          repeticiones_o_tiempo: "10 minutos",
          descanso_s_entre_series: 0
        },
        {
          nombre: "Abrazos tiernos al templo corporal",
          instrucciones: "Extiende tus brazos a los extremos tomando aire y luego ríndete un fuerte auto-abrazo cruzando las manos hasta tus hombros opuestos.",
          series: 3,
          repeticiones_o_tiempo: "10 repeticiones",
          descanso_s_entre_series: 30
        },
        {
          nombre: "Elevación lateral de brazos de gracia",
          instrucciones: "De pie, levanta tus brazos relajados lateralmente hasta la altura de las orejas imitando a un pajarillo volando en serenidad y baja sin pausa.",
          series: 3,
          repeticiones_o_tiempo: "8 repeticiones",
          descanso_s_entre_series: 35
        },
        {
          nombre: "Estiramiento lateral de arco celestial",
          instrucciones: "Eleva un brazo por encima de tu cabeza e inclina un poquito el tronco hacia un costado. Siente el alivio en las costillas y respira hondo.",
          series: 3,
          repeticiones_o_tiempo: "20 segundos por lado",
          descanso_s_entre_series: 30
        }
      ]
    },
    Sábado: {
      nombreDia: "Sábado — Parque, Sol y Equilibrio",
      enfoqueMentalEspiritual: "Caminando bajo el sol cálido, renovando el sistema óseo y fortaleciendo el balance del hermano.",
      ejercicios: [
        {
          nombre: "Caminata bajo la luz del sol",
          instrucciones: "Planifica un paseo en tu patio o un parque cercano. Siente el viento en tu rostro y el suelo bajo tus pies agradeciendo este día de salud.",
          series: 1,
          repeticiones_o_tiempo: "20 minutos",
          descanso_s_entre_series: 0
        },
        {
          nombre: "Equilibrio firme de flamenco con apoyo",
          instrucciones: "Pon tu mano en una silla sólida. Levanta una pierna y aguanta en un pie con aplomo cuidando tu respiración pausadamente.",
          series: 3,
          repeticiones_o_tiempo: "15 segundos por pie",
          descanso_s_entre_series: 30
        },
        {
          nombre: "Toques cruzados rodilla-mano sentado",
          instrucciones: "A paso pausado sentado, levanta tu rodilla derecha y tócala delicadamente con tu mano izquierda, luego cambia. Mejora la conexión mente-cuerpo.",
          series: 3,
          repeticiones_o_tiempo: "12 repeticiones",
          descanso_s_entre_series: 40
        },
        {
          nombre: "Respiración diafragmática en calma",
          instrucciones: "Siéntate en el pasto o banco con ojos cerrados. Pon la mano sobre tu ombligo sentando cómo sube y baja al compás del aire puro del cielo.",
          series: 1,
          repeticiones_o_tiempo: "2 minutos",
          descanso_s_entre_series: 0
        }
      ]
    },
    Domingo: {
      nombreDia: "Domingo — Descanso Sagrado y Alabanza",
      enfoqueMentalEspiritual: "Bendecido descanso del Creador. Día para rejuvenecer las células corporales en oración y gozo celestial.",
      ejercicios: [
        {
          nombre: "Respiración de alabanza consciente",
          instrucciones: "Inhala elevando suavemente ambos brazos hacia el cielo pidiendo paz; exhala bajándolos, entregándole al Señor todas tus cargas de la semana.",
          series: 3,
          repeticiones_o_tiempo: "5 respiraciones",
          descanso_s_entre_series: 30
        },
        {
          nombre: "Estiramiento fraternal de agradecimiento",
          instrucciones: "Lentamente entrelaza tus dedos, estira las palmas hacia adelante relajando tu cuello por completo. Pon tu mente en un versículo que ames.",
          series: 2,
          repeticiones_o_tiempo: "30 segundos",
          descanso_s_entre_series: 30
        }
      ]
    }
  },
  rodillas: {
    Lunes: {
      nombreDia: "Lunes — Ruta de la Fuerza sin Impacto",
      enfoqueMentalEspiritual: "Fortaleciendo los muslos para descargar la presión de tus rodillas con paciencia y constancia.",
      ejercicios: [
        {
          nombre: "Elevación de pierna recta sentado",
          instrucciones: "Siéntate derecho en la silla. Estira tu pierna derecha hacia el frente, manteniéndola recta. Sostenla en el aire 2 segundos, bájala despacio y repite con la izquierda.",
          series: 3,
          repeticiones_o_tiempo: "10 por pierna",
          descanso_s_entre_series: 40
        },
        {
          nombre: "Flexión militar apoyado en mesa firme",
          instrucciones: "Apoya tus manos en el borde de una mesa de comedor resistente o mesón de cocina. Flexiona los codos lentamente inclinando el cuerpo largo y recto, y empuja.",
          series: 3,
          repeticiones_o_tiempo: "10 repeticiones",
          descanso_s_entre_series: 45
        },
        {
          nombre: "Puentes de glúteo boca arriba",
          instrucciones: "Acuéstate sobre una alfombra o cama firme con las rodillas dobladas. Presiona tus talones y levanta la cadera apretando los glúteos sin causar molestias.",
          series: 3,
          repeticiones_o_tiempo: "12 repeticiones",
          descanso_s_entre_series: 50
        },
        {
          nombre: "Estiramiento de isquiotibiales en silla",
          instrucciones: "Siéntate al borde del asiento. Estira una pierna con el talón apoyado y dedos mirando al cielo. Inclínate suavemente desde la cadera al frente.",
          series: 2,
          repeticiones_o_tiempo: "30 segundos por pierna",
          descanso_s_entre_series: 30
        }
      ]
    },
    Martes: {
      nombreDia: "Martes — Paso Saludable en Superficie Plana",
      enfoqueMentalEspiritual: "Pasear de forma fluida ayuda a lubricar el cartílago. 'Harás ensanchar mis pasos debajo de mí'.",
      ejercicios: [
        {
          nombre: "Marcha guiada en terreno liso",
          instrucciones: "Sal a caminar a paso firme en una vereda lisa o en un centro comercial despejado, manteniendo una postura alta mirando al horizonte.",
          series: 1,
          repeticiones_o_tiempo: "15 minutos",
          descanso_s_entre_series: 0
        },
        {
          nombre: "Presión isométrica de almohada entre rodillas",
          instrucciones: "Siéntate derecho y coloca una almohada rolliza doblada entre tus rodillas. Apriétala con firmeza durante 5 segundos y relaja. Fortalece estabilizadores.",
          series: 3,
          repeticiones_o_tiempo: "10 repeticiones",
          descanso_s_entre_series: 40
        },
        {
          nombre: "Círculos rítmicos de tobillos",
          instrucciones: "Haz círculos amplios con cada pie mientras estás sentado. Un tobillo móvil absorbe el peso que de otra forma iría a tus rodillas endebles.",
          series: 3,
          repeticiones_o_tiempo: "12 por pie",
          descanso_s_entre_series: 30
        },
        {
          nombre: "Estiramiento suave de cuádriceps de pie con apoyo",
          instrucciones: "Sujétate de una pared, dobla tu rodilla levantando el talón atrás y toma tu tobillo con la mano opulenta. Respira profundamente sintiendo el estiramiento.",
          series: 3,
          repeticiones_o_tiempo: "25 segundos por lado",
          descanso_s_entre_series: 30
        }
      ]
    },
    Miércoles: {
      nombreDia: "Miércoles — Movilidad y Libertad de Cadera",
      enfoqueMentalEspiritual: "Liberando tensiones en la cadera para lograr una caminata armónica y balanceada.",
      ejercicios: [
        {
          nombre: "Abducción lateral de cadera (Patada lateral)",
          instrucciones: "Párate robusto de lado a una silla. Sube la pierna contraria hacia el costado sin inclinar el cuerpo. Mantiene tus caderas fuertes.",
          series: 3,
          repeticiones_o_tiempo: "10 por cada lado",
          descanso_s_entre_series: 40
        },
        {
          nombre: "Fuerza posterior de pierna (Glúteo kickback)",
          instrucciones: "Agarrando una barra o mueble firme, lleva tu pierna en línea recta hacia atrás de forma controlada sintiendo el músculo de atrás de tu glúteo.",
          series: 3,
          repeticiones_o_tiempo: "10 por pierna",
          descanso_s_entre_series: 40
        },
        {
          nombre: "Pasos laterales rítmicos de cangrejo",
          instrucciones: "Da un paso suave a la derecha, junta tus pies y luego da un paso a la izquierda. Mantén las rodillas apenas flexionadas de forma segura y rítmica.",
          series: 3,
          repeticiones_o_tiempo: "40 segundos",
          descanso_s_entre_series: 45
        },
        {
          nombre: "Plancha con inclinación segura",
          instrucciones: "Apoya los brazos en la pared. Junta tus pies hacia atrás y mantén firme el torso, alineando tus lumbares de forma estable.",
          series: 3,
          repeticiones_o_tiempo: "30 segundos",
          descanso_s_entre_series: 45
        }
      ]
    },
    Jueves: {
      nombreDia: "Jueves — Postura del Siervo Erguido",
      enfoqueMentalEspiritual: "Fortaleciendo la mitad superior. Una espalda fuerte evita que nos encorvemos en nuestros senderos.",
      ejercicios: [
        {
          nombre: "Abrazos de ángel de espaldas a la pared",
          instrucciones: "Apoya tu espalda plana contra la pared. Abre y desliza tus brazos lateralmente hacia arriba como si hicieras la silueta de un ángel, abriendo tu pecho.",
          series: 3,
          repeticiones_o_tiempo: "12 repeticiones",
          descanso_s_entre_series: 35
        },
        {
          nombre: "Flexiones de pecho sobre el lavabo o mesón",
          instrucciones: "Apoya tus palmas firmes en el borde del mesón. Dobla tus codos bajando con elegancia y control de manera constante.",
          series: 3,
          repeticiones_o_tiempo: "12 repeticiones",
          descanso_s_entre_series: 45
        },
        {
          nombre: "Tracción e inclinación de remo con toalla",
          instrucciones: "Estira una toalla mediana entre tus manos. Manteniendo la tensión de tus brazos al exterior, llévala a tu pecho retrayendo las escápulas de la espalda.",
          series: 3,
          repeticiones_o_tiempo: "12 repeticiones",
          descanso_s_entre_series: 40
        },
        {
          nombre: "Alivio y giros de cuello",
          instrucciones: "Deja caer tu cabeza adelante y dibuja una medialuna con tu barbilla sobre tu pecho lentamente, sin apuro, agradeciendo las bendiciones.",
          series: 2,
          repeticiones_o_tiempo: "10 repeticiones",
          descanso_s_entre_series: 30
        }
      ]
    },
    Viernes: {
      nombreDia: "Viernes — Cardio Divertido en el Asiento de Oro",
      enfoqueMentalEspiritual: "Vigorizando el corazón sin lastimar las rodillas. ¡Que el pulso corporal se alegre!",
      ejercicios: [
        {
          nombre: "Golpes rítmicos de boxeo sentados",
          instrucciones: "Lanza golpes suaves y dinámicos al aire manteniéndote sentado. Tu tronco rota un poco, activando tu respiración y endorfinas.",
          series: 3,
          repeticiones_o_tiempo: "45 segundos",
          descanso_s_entre_series: 40
        },
        {
          nombre: "Movilidad de marcha fluida en silla",
          instrucciones: "Sincroniza tus brazos simulando correr mientras alternas los pies de forma alegre sobre la baldosa cuidando el ritmo.",
          series: 3,
          repeticiones_o_tiempo: "40 segundos",
          descanso_s_entre_series: 45
        },
        {
          nombre: "Estrella olímpica sentado (Jumping Jacks en silla)",
          instrucciones: "Abre brazos y piernas a los costados al mismo tiempo de manera coordinada y júntele en el medio, celebrando tu movilidad.",
          series: 3,
          repeticiones_o_tiempo: "12 repeticiones",
          descanso_s_entre_series: 40
        },
        {
          nombre: "Abrazos alternados de rodilla sentados",
          instrucciones: "Siéntate bien atrás. Trae una rodilla cerca de tu pecho abrazándola con cariño unos segundos, descárgala y sigue con la otra.",
          series: 3,
          repeticiones_o_tiempo: "8 por cada lado",
          descanso_s_entre_series: 35
        }
      ]
    },
    Sábado: {
      nombreDia: "Sábado — Paseo, Balance y Regeneración",
      enfoqueMentalEspiritual: "Poniendo a prueba nuestra estabilidad para fortalecer los tendones de soporte.",
      ejercicios: [
        {
          nombre: "Paseo de intervalo lento-moderado",
          instrucciones: "Corta tu caminata en tramos: 1 minuto a paso un poco más alegre, y luego un minuto de paso con plena paz fraternal.",
          series: 1,
          repeticiones_o_tiempo: "20 minutos",
          descanso_s_entre_series: 0
        },
        {
          nombre: "Equilibrio estático de Flamingo",
          instrucciones: "Intenta sostenerte sobre un pie cerca de la mesa por si necesitas apoyarte de repuesto. Gran ejercicio de propiocepción.",
          series: 3,
          repeticiones_o_tiempo: "20 segundos por lado",
          descanso_s_entre_series: 35
        },
        {
          nombre: "Balance dinámico punta-talón",
          instrucciones: "Párate derecho. Sube levemente a la punta de los pies y luego rueda suavemente sobre tus talones de manera fluida.",
          series: 3,
          repeticiones_o_tiempo: "12 repeticiones",
          descanso_s_entre_series: 30
        },
        {
          nombre: "Estiramiento lumbar con respiraciones",
          instrucciones: "Acuéstate boca arriba, dobla tus rodillas y déjalas caer suavemente a los lados de forma alternada, aliviando tensiones en la zona de tu espalda baja.",
          series: 3,
          repeticiones_o_tiempo: "30 segundos",
          descanso_s_entre_series: 30
        }
      ]
    },
    Domingo: {
      nombreDia: "Domingo — Descanso y Rejuvenecimiento Articular",
      enfoqueMentalEspiritual: "Día sagrado para celebrar que Dios sana nuestras dolencias. Dedicación exclusiva al reposo.",
      ejercicios: [
        {
          nombre: "Apertura pacífica de brazos respirando",
          instrucciones: "Sentado cómodo, expande los brazos elevando tu pecho hacia lo alto captando las bendiciones de este día sagrado. Exhala bajando.",
          series: 3,
          repeticiones_o_tiempo: "5 respiraciones",
          descanso_s_entre_series: 30
        },
        {
          nombre: "Masaje circulatorio de muslo y rodilla",
          instrucciones: "Frota suavemente tus cuádriceps de forma ascendente con tus manos templadas para traer flujo sanguíneo y bienaventuranza a tus tendones.",
          series: 2,
          repeticiones_o_tiempo: "1 minuto",
          descanso_s_entre_series: 30
        }
      ]
    }
  },
  fuerza: {
    Lunes: {
      nombreDia: "Lunes — Ruta del Vigor y Cuerpo Fuerte",
      enfoqueMentalEspiritual: "Entrenando la musculatura completa para ganar excelente independencia en tus quehaceres habituales.",
      ejercicios: [
        {
          nombre: "Sentadillas libres sobre soporte de sofá",
          instrucciones: "Párate con pies al ancho de cadera. Desciende controlando tus piernas como si fueras a sentarte en un sofá pero vuelve a subir con fuerza justo antes de tocarlo completamente.",
          series: 3,
          repeticiones_o_tiempo: "12 repeticiones",
          descanso_s_entre_series: 45
        },
        {
          nombre: "Flexiones con inclinación en mesa o sofá firme",
          instrucciones: "Apoya manos en una superficie elevada muy firme. Desciende con control manteniendo tu cuerpo tenso en una sola línea y empuja con fuerza para volver.",
          series: 3,
          repeticiones_o_tiempo: "10 repeticiones",
          descanso_s_entre_series: 50
        },
        {
          nombre: "Plancha estática con brazos elevados (Sofá)",
          instrucciones: "Apoya los antebrazos en un sillón o silla estable. Extiende las piernas atrás, mantén tu espalda derechita y el abdomen muy firme como un escudo.",
          series: 3,
          repeticiones_o_tiempo: "25 segundos",
          descanso_s_entre_series: 60
        },
        {
          nombre: "Estimulación de espalda de rodillas (Bird-Dog)",
          instrucciones: "Colócate en cuatro apoyos (manos y rodillas). Estira el brazo derecho al frente y la pierna izquierda atrás hasta quedar bien alineado. Sostén y cambia al otro lado.",
          series: 3,
          repeticiones_o_tiempo: "8 por lado",
          descanso_s_entre_series: 40
        }
      ]
    },
    Martes: {
      nombreDia: "Martes — Ritmo y Resistencia Dinámica",
      enfoqueMentalEspiritual: "Acelerando un poco las pulsaciones de forma controlada. 'Él es quien ciñe de fuerza mis caminos'.",
      ejercicios: [
        {
          nombre: "Caminata al aire libre con zancadas largas",
          instrucciones: "Sal a caminar apresurado. Haz énfasis en impulsarte con la punta del pie y abrir tus zancadas para energizar los glúteos.",
          series: 1,
          repeticiones_o_tiempo: "20 minutos",
          descanso_s_entre_series: 0
        },
        {
          nombre: "Sentallida estática rampa (Wall Sit bajo)",
          instrucciones: "Pega la espalda en la pared, dobla las rodillas a unos 45 grados y quédate inmóvil como una columna fuerte. Respira hondo por la nariz.",
          series: 3,
          repeticiones_o_tiempo: "20 segundos",
          descanso_s_entre_series: 45
        },
        {
          nombre: "Torsión corporal de victoria",
          instrucciones: "Párate con pies firmes y gira tu tronco estirando tus brazos a cada lado de manera dinámica. Gran liberación de columna.",
          series: 3,
          repeticiones_o_tiempo: "12 repeticiones",
          descanso_s_entre_series: 30
        },
        {
          nombre: "Aperturas de pecho rítmicas de pie",
          instrucciones: "Expande los brazos horizontalmente estirando los pectorales y luego cruza tus hombros al centro con velocidad controlada.",
          series: 2,
          repeticiones_o_tiempo: "15 repeticiones",
          descanso_s_entre_series: 35
        }
      ]
    },
    Miércoles: {
      nombreDia: "Miércoles — Escudo de Columna y Estabilidad",
      enfoqueMentalEspiritual: "Ejercitando los abdominales y la pelvis para cuidar el tronco y cargar mercadería sin esfuerzos.",
      ejercicios: [
        {
          nombre: "Plancha lateral asistida con rodilla en suelo",
          instrucciones: "Ponte de lado apoyando el codo y la rodilla doblada inferior. Levanta las caderas creando una línea recta y sostén el abdomen sólido.",
          series: 3,
          repeticiones_o_tiempo: "20 segundos por lado",
          descanso_s_entre_series: 45
        },
        {
          nombre: "Puentes de glúteo a una sola pierna",
          instrucciones: "Acostado boca arriba con rodillas elevadas. Estira un pie arriba y sube tu pelvis usando la fuerza de un solo talón. Un gran desafío posterior.",
          series: 3,
          repeticiones_o_tiempo: "8 por lado",
          descanso_s_entre_series: 45
        },
        {
          nombre: "Crunches controlados reversos en silla",
          instrucciones: "Siéntate cerca del borde frontal de tu silla. Recuéstate un poquito y levanta ambas rodillas a la vez hacia tu pecho usando tus abdominales inferiores.",
          series: 3,
          repeticiones_o_tiempo: "10 repeticiones",
          descanso_s_entre_series: 45
        },
        {
          nombre: "Estiramiento del Altar (Posición de Cobra)",
          instrucciones: "Tumbado boca abajo sobre tu esterilla. Apoya los brazos y eleva el pecho mirando ligeramente arriba para sanar la curvatura lumbar.",
          series: 3,
          repeticiones_o_tiempo: "30 segundos",
          descanso_s_entre_series: 40
        }
      ]
    },
    Jueves: {
      nombreDia: "Jueves — Potencia del Siervo Fuerte",
      enfoqueMentalEspiritual: "Ejercicios dedicados a los hombros y homóplatos para mantenernos sanos y útiles.",
      ejercicios: [
        {
          nombre: "Flexiones de rodillas en alfombra blanda",
          instrucciones: "Boca abajo en el suelo apoyado en manos y rodillas. Baja el pecho doblando los codos firmemente y levántate empujando con brío.",
          series: 3,
          repeticiones_o_tiempo: "10 repeticiones",
          descanso_s_entre_series: 50
        },
        {
          nombre: "Prensa de hombros divina con botellitas",
          instrucciones: "Sujeta dos botellitas de agua medianas cargadas. Súbelas con fuerza de forma recta por sobre tu cabeza y desciende lentamente.",
          series: 3,
          repeticiones_o_tiempo: "12 repeticiones",
          descanso_s_entre_series: 45
        },
        {
          nombre: "Fondos de tríceps en borde de mesa firme",
          instrucciones: "Apoya tus manos en el reverso de una silla muy sólida o mueble bajo. Estira las piernas y dobla tus codos hacia atrás para fortalecer tus brazos.",
          series: 3,
          repeticiones_o_tiempo: "8 repeticiones",
          descanso_s_entre_series: 50
        },
        {
          nombre: "Cruce de brazos cruzado posterior",
          instrucciones: "Cruza un brazo horizontal al frente de tu garganta y atráelo con tu otra mano de palanca aliviando toda la espalda alta.",
          series: 2,
          repeticiones_o_tiempo: "25 segundos por lado",
          descanso_s_entre_series: 30
        }
      ]
    },
    Viernes: {
      nombreDia: "Viernes — Cardio Celestial de Alta Energía",
      enfoqueMentalEspiritual: "Entrenamos con gozo y gratitud. Dinamismo corporal para mantener nuestro templo ligero.",
      ejercicios: [
        {
          nombre: "Marcha alta acelerada de fe",
          instrucciones: "Levanta las rodillas rápido en tus marcas estirando los brazos de manera paralela con absoluto vigor y orgullo.",
          series: 3,
          repeticiones_o_tiempo: "45 segundos",
          descanso_s_entre_series: 45
        },
        {
          nombre: "Paso cruzado del patinador sin salto",
          instrucciones: "Simula el vaivén lateral de un patinador, cruzando un pie bien por detrás del otro y movilizando los codos rítmicamente.",
          series: 3,
          repeticiones_o_tiempo: "12 por lado",
          descanso_s_entre_series: 40
        },
        {
          nombre: "Punteras elevadas de pantorrillas continuas",
          instrucciones: "De pie sin apoyo, sube rápido a puntas de pies y baja sin tocar el talón por completo para encender tus pantorrillas vigorosas.",
          series: 3,
          repeticiones_o_tiempo: "15 repeticiones",
          descanso_s_entre_series: 30
        },
        {
          nombre: "Estiramiento del Templo hacia el infinito",
          instrucciones: "Párate lo más estirado que puedas con las manos elevadas, entrelaza los dedos y empuja arriba, agradeciendo la fuerza de la creación.",
          series: 2,
          repeticiones_o_tiempo: "30 segundos",
          descanso_s_entre_series: 30
        }
      ]
    },
    Sábado: {
      nombreDia: "Sábado — Fuerza del Explorador de Fé",
      enfoqueMentalEspiritual: "Prueba de campo al aire libre combinando fuerza con senderos. Dios bendice tu constancia.",
      ejercicios: [
        {
          nombre: "Senderismo activo con desniveles",
          instrucciones: "Busca un sendero o vecindario con suaves subidas y bajadas. Sube a un ritmo sólido sintiendo los latidos hermosos de tu corazón.",
          series: 1,
          repeticiones_o_tiempo: "25 minutos",
          descanso_s_entre_series: 0
        },
        {
          nombre: "Estocadas / Zancadas estáticas de fe",
          instrucciones: "Da un gran paso al frente. Mantén esa separación y baja doblando rodillas de forma controlada, lueg cambia de perfil. Excelente para las piernas.",
          series: 3,
          repeticiones_o_tiempo: "8 por pierna",
          descanso_s_entre_series: 45
        },
        {
          nombre: "Paseo de equilibrista de talón a puntera",
          instrucciones: "Camina diez pasos en linea recta de tal manera que el talón del pie de adelante roce la punta del de atrás, desafiando tu balance.",
          series: 3,
          repeticiones_o_tiempo: "15 pasos",
          descanso_s_entre_series: 30
        },
        {
          nombre: "Respiraciones de recuperación profunda",
          instrucciones: "Inhala ampliamente llenando tus pulmones del aire más sano del bosque o parque y exhala botando toda la fatiga.",
          series: 1,
          repeticiones_o_tiempo: "3 minutos",
          descanso_s_entre_series: 0
        }
      ]
    },
    Domingo: {
      nombreDia: "Domingo — Reposo del Guerrero del Templo",
      enfoqueMentalEspiritual: "Paz profunda. Recuperando los músculos para listarlos hacia otra gran semana de bendiciones.",
      ejercicios: [
        {
          nombre: "Respiración profunda de comunión",
          instrucciones: "Acostado boca arriba, inhala expandiendo el estómago lento y sella cada expiración sintiendo paz absoluta y liberación muscular.",
          series: 3,
          repeticiones_o_tiempo: "6 respiraciones",
          descanso_s_entre_series: 30
        },
        {
          nombre: "Estiramiento integral de rodamiento posterior",
          instrucciones: "En la alfombra, abraza tus rodillas junto a tu pecho y balancéate sutilmente a la derecha e izquierda dando un bendecido masaje a tu región lumbar.",
          series: 2,
          repeticiones_o_tiempo: "45 segundos",
          descanso_s_entre_series: 30
        }
      ]
    }
  },
  legendario: {
    Lunes: {
      nombreDia: "Lunes — Fuerza de Ascenso para Montaña",
      enfoqueMentalEspiritual: "Entrenamiento de potencia del escalador de de fe. 'Caminaré sobre mis alturas'.",
      ejercicios: [
        {
          nombre: "Sentadillas profundas con mochila de monte",
          instrucciones: "Ponte una mochila con libros dentro para hacer peso moderado. Realiza sentadillas controladas manteniendo la espalda erguida, fortaleciendo tus piernas.",
          series: 4,
          repeticiones_o_tiempo: "12 repeticiones",
          descanso_s_entre_series: 50
        },
        {
          nombre: "Elevación de talones a una sola pierna",
          instrucciones: "Apóyate contra una pared sobre una sola pierna. Sube sobre la punta de tu pie, sostén arriba y baja despacio. Desarrolla estabilidad y fuerza en pantorrillas y tobillos.",
          series: 3,
          repeticiones_o_tiempo: "12 por cada lado",
          descanso_s_entre_series: 40
        },
        {
          nombre: "Estocadas de fe alternadas con control",
          instrucciones: "Da un paso amplio hacia adelante flexionando las rodillas a 90 grados. Empuja con fuerza para volver y cambia de pierna. Clave para la estabilidad en descensos.",
          series: 3,
          repeticiones_o_tiempo: "10 por pierna",
          descanso_s_entre_series: 45
        },
        {
          nombre: "Paso Alto de Cumbre (Step-Ups elevados)",
          instrucciones: "Sube de forma alterna a un escalón firme o banco de madera, elevando la rodilla contraria con firmeza antes de descender nuevamente con control.",
          series: 3,
          repeticiones_o_tiempo: "12 por cada lado",
          descanso_s_entre_series: 45
        }
      ]
    },
    Martes: {
      nombreDia: "Martes — Resistencia Cardíaca y Corazón de Aquiles",
      enfoqueMentalEspiritual: "Resistencia física prolongada para caminos empinados de montaña.",
      ejercicios: [
        {
          nombre: "Trote ligero o caminata rítmica cargando morral",
          instrucciones: "Toma tu mochila pesada y camina de forma acelerada por zonas con cuestas en tu vecindario, emulando la fatiga real del ascenso.",
          series: 1,
          repeticiones_o_tiempo: "25 minutos",
          descanso_s_entre_series: 0
        },
        {
          nombre: "Sentadillas veloces del esquiador",
          instrucciones: "Realiza sentadillas con poco descanso, acelerando un poco el levantamiento de manera potente y descendiendo con temple.",
          series: 3,
          repeticiones_o_tiempo: "15 repeticiones",
          descanso_s_entre_series: 40
        },
        {
          nombre: "Saltitos de tobillo elásticos (Pogo Hops)",
          instrucciones: "Salta repetidamente sobre las puntas de tus pies flexionando mínimamente las rodillas. Forja pies ágiles para caminos de ripio movedizo.",
          series: 3,
          repeticiones_o_tiempo: "30 segundos",
          descanso_s_entre_series: 45
        },
        {
          nombre: "Estiramiento de atleta de gemelos contra pared",
          instrucciones: "Coloca la punta del pie contra el muro con el talón abajo, empuja tu cadera adelante para estirar el Aquiles de forma excelente.",
          series: 3,
          repeticiones_o_tiempo: "30 segundos por pierna",
          descanso_s_entre_series: 30
        }
      ]
    },
    Miércoles: {
      nombreDia: "Miércoles — Estabilidad del Tobillo de Roca",
      enfoqueMentalEspiritual: "Previendo lesiones y torceduras en senderos rocosos. Estabilidad y equilibrio en roca firme.",
      ejercicios: [
        {
          nombre: "Equilibrio inestable en un solo pie sobre almohada",
          instrucciones: "Paren sobre una almohada rústica apoyado en una sola pierna. Sostén las manos abiertas y aguanta el equilibrio balanceando tus articulaciones diminutas.",
          series: 3,
          repeticiones_o_tiempo: "30 segundos por pierna",
          descanso_s_entre_series: 45
        },
        {
          nombre: "Plancha del Monte de Sión clásica",
          instrucciones: "Apoya tus antebrazos y pies manteniéndote derecho como una rampa. Sostén la posición apretando el centro del cuerpo, respirando hondo.",
          series: 3,
          repeticiones_o_tiempo: "35 segundos",
          descanso_s_entre_series: 60
        },
        {
          nombre: "Marcha alternativa talón-puntera",
          instrucciones: "Camina descalzo un tramo solo apoyando los talones levantando las punteras, y luego de vuelta camina solo sobre tus puntillas para blindar tobillos.",
          series: 3,
          repeticiones_o_tiempo: "30 s cada una",
          descanso_s_entre_series: 40
        },
        {
          nombre: "Giros de abdomen rusos con mochila de peso",
          instrucciones: "Siéntate en el suelo inclinando tu espalda recta atrás. Gira tu torso a izquierda y derecha pasando tu mochila con fuerza para fortalecer oblicuos.",
          series: 3,
          repeticiones_o_tiempo: "15 repeticiones",
          descanso_s_entre_series: 45
        }
      ]
    },
    Jueves: {
      nombreDia: "Jueves — Espalda del Mochilero Indomable",
      enfoqueMentalEspiritual: "Fortaleciendo la armadura de la espalda para portar la carga del monte sin fatigas.",
      ejercicios: [
        {
          nombre: "Peso muerto rumano abrazando mochila",
          instrucciones: "Toma tu mochila pesada frente a ti. Baja el torso llevando tu cadera pesada atrás con espalda impecablemente erguida. Siente tus isquiotibiales.",
          series: 4,
          repeticiones_o_tiempo: "12 repeticiones",
          descanso_s_entre_series: 50
        },
        {
          nombre: "Remo inclinado dinámico con mochila pesada",
          instrucciones: "Inclina tu tronco 45 grados. Sujeta la mochila con ambas manos y remolca los codos rozando la costilla, retrayendo las escápulas fuertes.",
          series: 3,
          repeticiones_o_tiempo: "12 repeticiones",
          descanso_s_entre_series: 45
        },
        {
          nombre: "Flexiones militares profundas en suelo",
          instrucciones: "Realiza flexiones tradicionales de brazos con gran rango de movimiento, estimulando hombros, tríceps y pecho largo en tu esterilla.",
          series: 3,
          repeticiones_o_tiempo: "12 repeticiones",
          descanso_s_entre_series: 50
        },
        {
          nombre: "Relajación por abertura del Albatros (Pechos y hombros)",
          instrucciones: "Ponte lateral a la pared sosteniendo una palma, rota tus hombros al revés para abrir de forma rotunda el bíceps y los músculos del pecho.",
          series: 3,
          repeticiones_o_tiempo: "30 segundos por lado",
          descanso_s_entre_series: 30
        }
      ]
    },
    Viernes: {
      nombreDia: "Viernes — Impulso Final y Simulación de Cumbre",
      enfoqueMentalEspiritual: "Entrenamiento simulador que genera piernas de acero para pendientes empinadas.",
      ejercicios: [
        {
          nombre: "Paso veloz alternado en escaleras",
          instrucciones: "En un tramo de escaleras firme, sube un escalón alternando de forma continua y veloz para agudizar el aire de montaña.",
          series: 1,
          repeticiones_o_tiempo: "5 minutos",
          descanso_s_entre_series: 60
        },
        {
          nombre: "Zancadas / Sentadillas Búlgaras con soporte de silla",
          instrucciones: "Apoya la punta de un pie atrás en la silla. Da un paso adelante y haz sentadillas a una sola pierna con control para ganar un empuje inquebrantable.",
          series: 3,
          repeticiones_o_tiempo: "8 por cada pierna",
          descanso_s_entre_series: 50
        },
        {
          nombre: "Isometría en pared profunda (Wall Sit)",
          instrucciones: "Apóyate en el muro bajando tu glúteo a 90 grados paralelos al suelo. Aguanta con tenacidad, sintiendo la dureza y resiliencia del escalador.",
          series: 3,
          repeticiones_o_tiempo: "35 segundos",
          descanso_s_entre_series: 45
        },
        {
          nombre: "Apertura de paloma de fe para alivio lumbar",
          instrucciones: "De rodillas, dobla una pierna al frente cruzada y estira la otra bien extendida detrás de ti, descansa sobre tus codos sintiendo el glúteo.",
          series: 2,
          repeticiones_o_tiempo: "30 segundos por pierna",
          descanso_s_entre_series: 30
        }
      ]
    },
    Sábado: {
      nombreDia: "Sábado — Gran Salida de Conquista al Cerro",
      enfoqueMentalEspiritual: "Día de campo en la creación de Dios. '¡Él hace mis pies como de ciervas y me hace andar sobre mis alturas!'.",
      ejercicios: [
        {
          nombre: "Ascenso activo a paso constante con bastones",
          instrucciones: "Salgan a domar una colina o sendero local. Utiliza calzado firme y un morral de viaje, ascendiendo con la mirada en las maravillas naturales.",
          series: 1,
          repeticiones_o_tiempo: "60-120 minutos",
          descanso_s_entre_series: 0
        },
        {
          nombre: "Estocadas en pendientes reales",
          instrucciones: "En medio de tu ascenso por hierba o tierra firme, realiza estocadas largas y estables para sentir la máxima potencia de subida.",
          series: 2,
          repeticiones_o_tiempo: "10 por cada pierna",
          descanso_s_entre_series: 40
        },
        {
          nombre: "Estiramiento integral del Árbol de la Vida",
          instrucciones: "De pie al sol sobre la montaña, levanta una pierna y pósala en el interior de tu muslo. Junta las manos en el pecho y respira con gratitud.",
          series: 2,
          repeticiones_o_tiempo: "30 segundos por lado",
          descanso_s_entre_series: 30
        },
        {
          nombre: "Oración, contemplación y alabanza sobre la roca de la cumbre",
          instrucciones: "Siéntate en lo alto. Pon tu mente en alabanza y agradece al Señor del universo el milagro indiscutible de presenciar Su gloria desde las nubes.",
          series: 1,
          repeticiones_o_tiempo: "5 minutos",
          descanso_s_entre_series: 0
        }
      ]
    },
    Domingo: {
      nombreDia: "Domingo — Descanso Sagrado y Alabanza en las Nubes",
      enfoqueMentalEspiritual: "Paz completa. Descansar los tendones curtidos por la montaña agradeciendo la protección de Jehová.",
      ejercicios: [
        {
          nombre: "Respiración profunda del Alpinista",
          instrucciones: "Inhala elevando los hombros y extendiendo tus brazos amplios, reten el aire dos segundos con gozo, exhala liberando toda fatiga muscular.",
          series: 3,
          repeticiones_o_tiempo: "6 respiraciones",
          descanso_s_entre_series: 30
        },
        {
          nombre: "Estiramiento lumbar celestial del rezo",
          instrucciones: "De rodillas en tu alfombra, lleva los glúteos a tus talones y estira tus brazos al frente apoyando la frente en el suelo en completa rendición.",
          series: 2,
          repeticiones_o_tiempo: "45 segundos",
          descanso_s_entre_series: 30
        }
      ]
    }
  }
};

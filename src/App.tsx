import React, { useState, useEffect } from "react";
import { 
  Dumbbell, 
  Calendar, 
  Flame, 
  Apple, 
  Heart, 
  Sparkles, 
  Timer, 
  ChevronRight, 
  ChevronLeft,
  Play, 
  CheckCircle2, 
  AlertCircle, 
  BookOpen, 
  User, 
  Sparkle, 
  Activity,
  Check,
  RefreshCw,
  Clock,
  ThumbsUp,
  RotateCcw,
  Volume2,
  HeartPlus,
  Lock,
  LogOut,
  Eye,
  EyeOff
} from "lucide-react";
import { WeeklyDayPlan, ExerciseItem, TodayWorkout, PalabraDeFe, PersonalFitnessPlan } from "./types";
import { ROUTINES_BY_ROUTE_AND_DAY } from "./routines";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User as FirebaseUser } from "firebase/auth";
import { auth, normalizeLastNameToEmail } from "./firebase";

// PRE-DEFINED OFFLINE PROGRAMS (No AI API call needed, completely immediate & secure)
const PROGRAM_SUPER_SUAVE: PersonalFitnessPlan = {
  planSemanal: [
    { dia: "Lunes", tipoActividad: "Movilidad en Silla", duracion_minutos: 15, descripcion: "Activación articular sentados para despertar con amor las articulaciones." },
    { dia: "Martes", tipoActividad: "Caminata de fe ligera", duracion_minutos: 20, descripcion: "Un paseo suave por tu vecindario, respirando el aire puro del Creador." },
    { dia: "Miércoles", tipoActividad: "Fuerza ligera con pared", duracion_minutos: 15, descripcion: "Fortalecemos brazos y pecho usando la pared como punto seguro de apoyo." },
    { dia: "Jueves", tipoActividad: "Articulaciones Felices", duracion_minutos: 15, descripcion: "Estiramientos suaves de tronco y piernas en comunión y calma." },
    { dia: "Viernes", tipoActividad: "Paseo y Oración", duracion_minutos: 20, descripcion: "Activando el corazón a ritmo muy cómodo, agradeciendo el milagro de la vida." },
    { dia: "Sábado", tipoActividad: "Caminata libre en parque", duracion_minutos: 25, descripcion: "Paseo al ritmo del espíritu, admirando la naturaleza y renovándote." },
    { dia: "Domingo", tipoActividad: "Descanso y Alabanza", duracion_minutos: 0, descripcion: "Día sagrado. Reposo, templo y alimento directo de las escrituras." }
  ],
  rutinaHoy: {
    nombreDia: "Ruta de la Gracia y Movilidad",
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
        instrucciones: "Coloca las manos en la pared a la altura de tus hombros. Da un paso atrás con tus pies. Flexiona los brazos llevando el pecho hacia el muro y regresa con suavidad.",
        series: 3,
        repeticiones_o_tiempo: "8 repeticiones",
        descanso_s_entre_series: 45
      },
      {
        nombre: "Elevación de talones afirmándote de la silla",
        instrucciones: "Apóyate de pie en el respaldo de una silla firme. Sube lentamente sobre las puntas de tus pies, sostén un segundo sintiendo la fuerza en tus pantorrillas y baja despacio.",
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
  recomendacionesAlimentacion: [
    "Toma un vaso de agua pura al despertar para limpiar el templo. Agrega otro vaso grande antes de cada comida dulce o salada.",
    "Come alimentos más cercanos a su forma original: frutas dulces de temporada, verduras bien cocidas y caldos caseros calentitos.",
    "Añade un puñado pequeño de avena o frutos secos suaves a tu desayuno para proveer fibra saludable a tu digestión diaria.",
    "Agradece cada bocado en silencio con una pequeña oración antes de comer, soltando el tenedor para saborear bien la provisión del Señor."
  ],
  palabraDeFe: {
    versiculoReferencia: "Salmo 103:2-5",
    versiculoTexto: "Bendice, alma mía, a Jehová, y no olvides ninguno de sus beneficios. Él es quien perdona todas tus iniquidades, el que sana todas tus dolencias; el que rescata el hoyo de tu vida... de modo que te rejuvenezcas como el águila.",
    reflexion: "Hermano mayor, el Creador quiere verte vital y saludable en todas las etapas de tu vida útil. Cuidar tu cuerpo permite ser de bendición y ayuda constante a tus seres amados y a tu congregación. Tu constancia honra tu templo espiritual."
  },
  fraseAlientoCorta: "¡Jehová es mi fortaleza y mi escudo; en él confió mi corazón! (Salmo 28:7)",
  notaSugiereMedico: "Nota con amor fraternal: Si sientes fatiga extrema, detén el movimiento de inmediato, descansa e infórmale a tus seres queridos y a un profesional."
};

const PROGRAM_CUIDADO_RODILLAS: PersonalFitnessPlan = {
  planSemanal: [
    { dia: "Lunes", tipoActividad: "Fuerza sin impacto", duracion_minutos: 20, descripcion: "Protegemos rodillas fortaleciendo los muslos con movimientos seguros y estables." },
    { dia: "Martes", tipoActividad: "Caminata de Oración plana", duracion_minutos: 20, descripcion: "Un paso firme en terreno plano y cómodo, meditando y dando gracias." },
    { dia: "Miércoles", tipoActividad: "Movilidad de Cadera", duracion_minutos: 15, descripcion: "Relajando articulaciones inferiores para ganar independencia y estabilidad." },
    { dia: "Jueves", tipoActividad: "Fortalecimiento Superior", duracion_minutos: 20, descripcion: "Brazos, espalda y postura erguida usando apoyo fuerte para tu seguridad." },
    { dia: "Viernes", tipoActividad: "Cardio sentado y divertido", duracion_minutos: 15, descripcion: "Música inspiradora o alabanzas, marchando sentados para activar la circulación." },
    { dia: "Sábado", tipoActividad: "Paseo de Gratitud", duracion_minutos: 30, descripcion: "Caminar libremente en un parque, fortaleciendo la mirada en las cosas del cielo." },
    { dia: "Domingo", tipoActividad: "Descanso Sagrado", duracion_minutos: 0, descripcion: "Vigor en reposo. Tiempo dedicado por completo a la familia y la comunión." }
  ],
  rutinaHoy: {
    nombreDia: "Ruta Rodillas de Roca",
    enfoqueMentalEspiritual: "Construyendo un cimiento fuerte. 'El justo está firme como monte de Sion, que no se mueve'.",
    ejercicios: [
      {
        nombre: "Elevación de pierna recta sentado",
        instrucciones: "Siéntate derecho en la silla. Estira tu pierna derecha hacia el frente, manteniéndola recta. Sostenla en el aire 2 segundos, bájala despacio y repite con la izquierda.",
        series: 3,
        repeticiones_o_tiempo: "10 repeticiones por pierna",
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
        nombre: "Pasos laterales rítmicos muy suaves",
        instrucciones: "Da un paso suave a la derecha, junta tus pies y luego da un paso a la izquierda. Mantén las rodillas apenas flexionadas de forma segura y rítmica.",
        series: 3,
        repeticiones_o_tiempo: "40 segundos",
        descanso_s_entre_series: 45
      },
      {
        nombre: "Abrazos de ángel de espaldas a la pared",
        instrucciones: "Apoya tu espalda plana contra la pared. Abre y desliza tus brazos lateralmente hacia arriba como si hicieras la silueta de un ángel, abriendo tu pecho.",
        series: 3,
        repeticiones_o_tiempo: "12 repeticiones",
        descanso_s_entre_series: 35
      }
    ]
  },
  recomendacionesAlimentacion: [
    "Añade un vaso extra de agua pura al día: recuerda que el agua lubrica de forma directa el cartílago de tus rodillas.",
    "Consume alimentos ricos en antioxidantes como bayas, manzanas, ajo y cebolla para ayudar a disminuir la inflamación en tus articulaciones.",
    "Procura consumir grasas saludables como un trozo pequeño de aguacate (palta) o un chorrito de aceite de oliva crudo en tus almuerzos.",
    "Evita los azúcares refinados y las gaseosas, que acidifican el cuerpo y aumentan el dolor crónico. ¡Tu templo es de bendición!"
  ],
  palabraDeFe: {
    versiculoReferencia: "Isaías 35:3-4",
    versiculoTexto: "Fortaleced las manos cansadas, afirmad las rodillas endebles. Decid a los de corazón apocado: Esforzaos, no temáis; he aquí que vuestro Dios viene.",
    reflexion: "El Señor no solo se preocupa de tu espíritu, sino también de tus rodillas con las cuales te arrodillas a orar. Fortalecer tus músculos es una hermosa manera de honrar las articulaciones que Él diseñó."
  },
  fraseAlientoCorta: "¡Él da esfuerzo al cansado, y multiplica las fuerzas al que no tiene ningunas! (Isaías 40:29)",
  notaSugiereMedico: "Aviso de salud: Se recomienda comenzar a ritmo pausado y con apoyo de silla. Consulta con un profesional de la salud antes de iniciar si tienes dolencias severas."
};

const PROGRAM_FUERZA_BASICA: PersonalFitnessPlan = {
  planSemanal: [
    { dia: "Lunes", tipoActividad: "Fuerza funcional total", duracion_minutos: 25, descripcion: "Desafiando suavemente la musculatura completa para ganar vigor e independencia en el hogar." },
    { dia: "Martes", tipoActividad: "Caminata de fe a paso vivo", duracion_minutos: 25, descripcion: "Caminar de forma continua, inhalando y exhalando con salmos en mente." },
    { dia: "Miércoles", tipoActividad: "Estabilidad y Columna", duracion_minutos: 20, descripcion: "Postura perfecta y firmeza en la zona central de tu cuerpo, sobre roca firme." },
    { dia: "Jueves", tipoActividad: "Fuerza de Empuje", duracion_minutos: 25, descripcion: "Trabajo cómodo para hombros, brazos y piernas con movimientos sanos." },
    { dia: "Viernes", tipoActividad: "Caminata rítmica y saltitos", duracion_minutos: 20, descripcion: "Pequeña activación cardiovascular para mantener el corazón lleno de gozo celestial." },
    { dia: "Sábado", tipoActividad: "Actividad en el bosque o plaza", duracion_minutos: 30, descripcion: "Explora un entorno natural, camina al sol y oxigena todo tu sistema." },
    { dia: "Domingo", tipoActividad: "Santo Descanso", duracion_minutos: 0, descripcion: "Un reposo completo que reconforta el cuerpo y une los lazos de la comunidad en la fe." }
  ],
  rutinaHoy: {
    nombreDia: "Ruta del Siervo Firme",
    enfoqueMentalEspiritual: "Entrenar con gozo y gratitud. El esfuerzo terrenal tiene un propósito eterno de servicio.",
    ejercicios: [
      {
        nombre: "Sentadillas libres sobre soporte seguro",
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
        nombre: "Marcha alta con braceo alegre",
        instrucciones: "En el sitio, levanta las rodillas a la altura del ombligo con firmeza y mueve tus brazos rítmicamente sintiendo la fuerza que Dios puso en ti.",
        series: 3,
        repeticiones_o_tiempo: "45 segundos",
        descanso_s_entre_series: 45
      },
      {
        nombre: "Estimulación de espalda de rodillas (Súper héroe)",
        instrucciones: "Colócate en cuatro apoyos (manos y rodillas). Estira el brazo derecho al frente y la pierna izquierda atrás hasta quedar bien alineado. Sostén y cambia al otro lado.",
        series: 3,
        repeticiones_o_tiempo: "8 repeticiones por lado",
        descanso_s_entre_series: 40
      }
    ]
  },
  recomendacionesAlimentacion: [
    "Asegura beber un vaso grande de agua fría de buena calidad antes del desayuno y antes de acostarte.",
    "Reduce al mínimo los productos procesados en empaques de plástico; prefiere lo que crece de forma honesta de la tierra.",
    "Combina una ración de proteína limpia (como huevos frescos, legumbres o garbanzos) con una porción de hortalizas frescas.",
    "Mastique bien cada bocado al menos 15 veces para facilitar el trabajo a su bendecido sistema digestivo."
  ],
  palabraDeFe: {
    versiculoReferencia: "Filipenses 4:13",
    versiculoTexto: "Todo lo puedes en Cristo que te fortalece.",
    reflexion: "Hermano, tu fortaleza no es puramente física; nace de la Gracia y de la fe que tienes en tu corazón. Al entrenar tus músculos en casa, capacitas tu cuerpo para perseverar, trabajar, servir y cumplir la Gran Comisión con ímpetu renovado."
  },
  fraseAlientoCorta: "¡Mira que te mando que te esfuerces y seas valiente; no temas ni desmayes! (Josué 1:9)",
  notaSugiereMedico: "Advertencia amistosa: Mantenga buena postura de la espalda y escuche las señales de su propio cuerpo al entrenar."
};

const PROGRAM_LEGENDARIO: PersonalFitnessPlan = {
  planSemanal: [
    { dia: "Lunes", tipoActividad: "Fuerza y Ascenso", duracion_minutos: 30, descripcion: "Ejercicios intensivos de piernas para ganar potencia subiendo caminos empinados." },
    { dia: "Martes", tipoActividad: "Resistencia de Altura", duracion_minutos: 35, descripcion: "Caminata rápida o trote ligero meditando en las alturas de la Creación." },
    { dia: "Miércoles", tipoActividad: "Tobillo y Core de Roca", duracion_minutos: 25, descripcion: "Equilibrio a una pierna y planchas para evitar torceduras en senderos de piedra." },
    { dia: "Jueves", tipoActividad: "Fuerza del Mochilero", duracion_minutos: 30, descripcion: "Fortalecemos la espalda para poder cargar la mochila de montaña sin dolores." },
    { dia: "Viernes", tipoActividad: "Simulación de Cumbre", duracion_minutos: 30, descripcion: "Subir escalones con ritmo constante emulando un ascenso real de montaña." },
    { dia: "Sábado", tipoActividad: "Salida al Cerro", duracion_minutos: 120, descripcion: "Caminata activa y ascenso por senderos empinados hacia la cumbre de fe." },
    { dia: "Domingo", tipoActividad: "Descanso y Oración", duracion_minutos: 0, descripcion: "Descansar los músculos agradeciendo la gloria de Dios desde las alturas." }
  ],
  rutinaHoy: {
    nombreDia: "Ruta de la Cumbre Celestial",
    enfoqueMentalEspiritual: "Preparándonos para conquistar la montaña. 'Levantaré mis ojos a los montes; ¿de dónde vendrá mi socorro? Mi socorro viene de Jehová' (Salmo 121:1-2).",
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
        nombre: "Estocadas de fe alternadas",
        instrucciones: "Da un paso amplio hacia adelante flexionando las rodillas a 90 grados. Empuja con fuerza para volver y cambia de pierna. Clave para la estabilidad en descensos.",
        series: 3,
        repeticiones_o_tiempo: "10 repeticiones por pierna",
        descanso_s_entre_series: 45
      },
      {
        nombre: "Plancha del Monte de Sión",
        instrucciones: "Apoya tus antebrazos y pies manteniéndote derecho como una rampa. Sostén la posición apretando el centro del cuerpo, respirando hondo.",
        series: 3,
        repeticiones_o_tiempo: "30 segundos",
        descanso_s_entre_series: 60
      },
      {
        nombre: "Paso Alto de Cumbre (Step Ups)",
        instrucciones: "Sube de forma alterna a un escalón firme o banco de madera, elevando la rodilla contraria con firmeza antes de descender nuevamente con control.",
        series: 3,
        repeticiones_o_tiempo: "12 por cada lado",
        descanso_s_entre_series: 45
      }
    ]
  },
  recomendacionesAlimentacion: [
    "Asegura una hidratación abundante de al menos 2.5 litros de agua de calidad en tus días de entrenamiento.",
    "Lfectúa tus paseos con nueces, almendras o dátiles secos en tu morral como energía sana y portátil.",
    "Añade porciones adecuadas de avena, carbohidratos complejos y plátano para reponer el glucógeno de tus piernas fuertes.",
    "Evita ingerir comidas pesadas o lácteos la mañana de tu caminata para mantener el vientre liviano durante las pendientes."
  ],
  palabraDeFe: {
    versiculoReferencia: "Isaías 40:31",
    versiculoTexto: "Pero los que esperan a Jehová tendrán nuevas fuerzas; levantarán alas como las águilas; correrán, y no se cansarán; caminarán, y no se fatigarán.",
    reflexion: "La montaña exige disciplina, templanza y fortaleza. Al entrenar para el montañismo, emulamos a los profetas que subían al monte a encontrarse con el Señor. Cada cumbre es un recordatorio de que tu socorro viene del Creador."
  },
  fraseAlientoCorta: "¡Él hace mis pies como de ciervas, y me hace estar firme sobre mis alturas! (Habacuc 3:19)",
  notaSugiereMedico: "Nota para montañistas: Preste suma atención a su respiración a altitudes elevadas, use calzado de buen agarre y nunca camine solo."
};

export default function App() {
  // Firebase Auth states
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [loginLastName, setLoginLastName] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  // Screen and Flow States:
  // 1. "landing" -> Shows beautiful full-screen scripture focus and single huge "Comenzar" button
  // 2. "onboarding" -> Quick, giant font profile details capture specifically optimized for older users
  // 3. "dashboard" -> Main bento overview with Plan Semanal, Alimentación, Palabra de Fe, and the massive PLAY button
  // 4. "player" -> FULL SCREEN EXERCISE DETAIL MODE: Giant typography, massive "Siguiente" button, descanso timer.
  const [currentScreen, setCurrentScreen] = useState<"landing" | "onboarding" | "dashboard" | "player">("landing");
  
  // Profile settings (safe local storage / default fallback)
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Automatically compute userName from email or display name
        const emailPrefix = currentUser.email ? currentUser.email.split("@")[0] : "";
        const capitalName = emailPrefix 
          ? "Hno. " + emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1) 
          : "Hermano";
        setUserName(capitalName);
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginLastName.trim() || !loginPassword.trim()) {
      setLoginError("Por favor, ingrese su apellido y contraseña.");
      return;
    }
    setLoginError("");
    setIsLoggingIn(true);
    try {
      const email = normalizeLastNameToEmail(loginLastName);
      console.log("Attempting login as email:", email);
      await signInWithEmailAndPassword(auth, email, loginPassword);
    } catch (error: any) {
      console.error("Login verification failed:", error);
      let errMsg = "Su Apellido o la contraseña son incorrectas. Por favor verifique o consulte con su instructor de la iglesia.";
      if (error.code === "auth/invalid-credential" || error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
        errMsg = "Apellido o clave incorrectos. Verifique sus datos o consulte al maestro.";
      } else if (error.code === "auth/invalid-email") {
        errMsg = "Formato no válido. Escriba solo su Apellido paterno en letras.";
      } else if (error.code === "auth/network-request-failed") {
        errMsg = "Error de red. Verifique su conexión de Internet.";
      }
      setLoginError(errMsg);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setLoginLastName("");
      setLoginPassword("");
      setLoginError("");
      setCurrentScreen("landing");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const [selectedRouteType, setSelectedRouteType] = useState<"suave" | "rodillas" | "fuerza" | "legendario">("suave");

  // Plan mapping state based on selection
  const [activePlan, setActivePlan] = useState<PersonalFitnessPlan>(PROGRAM_SUPER_SUAVE);

  // Active state in Dashboard
  const [selectedDay, setSelectedDay] = useState<string>("Lunes");
  const [checkedExercises, setCheckedExercises] = useState<Record<string, boolean>>({});

  // Active state in full-screen guided "Player" mode
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);
  const [playerChecked, setPlayerChecked] = useState<boolean>(false);
  const [hasFinishedWorkout, setHasFinishedWorkout] = useState<boolean>(false);

  // Quick Rest Timer
  const [restSeconds, setRestSeconds] = useState<number | null>(null);
  const [restTimerId, setRestTimerId] = useState<any>(null);

  // Set the plan based on selected path
  useEffect(() => {
    if (selectedRouteType === "suave") {
      setActivePlan(PROGRAM_SUPER_SUAVE);
    } else if (selectedRouteType === "rodillas") {
      setActivePlan(PROGRAM_CUIDADO_RODILLAS);
    } else if (selectedRouteType === "fuerza") {
      setActivePlan(PROGRAM_FUERZA_BASICA);
    } else {
      setActivePlan(PROGRAM_LEGENDARIO);
    }
  }, [selectedRouteType]);

  // Clean timer interval on unmount
  useEffect(() => {
    return () => {
      if (restTimerId) clearInterval(restTimerId);
    };
  }, [restTimerId]);

  // Handle rest timer tick
  useEffect(() => {
    if (restSeconds !== null && restSeconds > 0) {
      const id = setInterval(() => {
        setRestSeconds(prev => (prev !== null && prev > 0 ? prev - 1 : 0));
      }, 1000);
      setRestTimerId(id);
      return () => clearInterval(id);
    } else if (restSeconds === 0) {
      setRestSeconds(null);
      if (restTimerId) clearInterval(restTimerId);
    }
  }, [restSeconds]);

  const handleStartRest = (seconds: number) => {
    if (restTimerId) clearInterval(restTimerId);
    setRestSeconds(seconds);
  };

  // Reset function to go back or restart
  const handleRestartAll = () => {
    setCheckedExercises({});
    setCurrentPlayerIndex(0);
    setPlayerChecked(false);
    setHasFinishedWorkout(false);
    setRestSeconds(null);
    setCurrentScreen("landing");
  };

  const handleStartWorkout = () => {
    setCurrentPlayerIndex(0);
    setPlayerChecked(false);
    setHasFinishedWorkout(false);
    setRestSeconds(null);
    setCurrentScreen("player");
  };

  const getTodayWorkout = (route: "suave" | "rodillas" | "fuerza" | "legendario", day: string): TodayWorkout => {
    return ROUTINES_BY_ROUTE_AND_DAY[route]?.[day] || activePlan.rutinaHoy;
  };

  const currentWorkout = getTodayWorkout(selectedRouteType, selectedDay);
  const activeExercisesArray = currentWorkout.ejercicios;
  const currentExercise = activeExercisesArray[currentPlayerIndex] || activeExercisesArray[0];

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex flex-col items-center justify-center p-6 text-center text-[#2D2A26] font-sans">
        <div className="w-16 h-16 border-4 border-[#5A6344] border-t-transparent rounded-full animate-spin mb-6"></div>
        <h3 className="text-xl font-bold text-[#5A6344]">Preparando tu Templo Corporal...</h3>
        <p className="text-sm text-slate-500 mt-2 italic font-serif">"Encomienda a Jehová tu camino, y confía en él; y él hará." — Salmo 37:5</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-4 relative overflow-hidden text-[#2D2A26]">
        {/* Decorative ambient blur */}
        <div className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] bg-[#5A6344]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[300px] h-[300px] bg-[#D9B99B]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-[#EBE6DE] z-10">
          <div className="text-center mb-6">
            <div className="inline-flex w-12 h-12 bg-[#5A6344]/10 rounded-2xl items-center justify-center text-[#5A6344] mb-3">
              <Lock className="w-6 h-6 stroke-[2]" />
            </div>
            <h2 className="text-2xl font-extrabold text-[#5A6344] tracking-tight">Fuerte En Cristo</h2>
            <p className="text-xs text-slate-500 mt-1 italic">Día a día, con gozo y disciplina pastoral</p>
          </div>

          <div className="bg-[#FAF7F2]/80 border border-[#EBE6DE] p-4 rounded-2xl text-center mb-6">
            <p className="text-xs text-[#8B6E4E] leading-relaxed font-serif italic text-pretty">
              "¿O no sabéis que vuestro cuerpo es templo del Espíritu Santo, el cual está en vosotros?"
              <strong className="block mt-1 font-sans not-italic text-[10px] uppercase font-bold tracking-wider">— 1 Corintios 6:19</strong>
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="login-apellido" className="block text-xs font-bold text-slate-700 tracking-wider uppercase mb-1.5">
                Su Apellido:
              </label>
              <input
                id="login-apellido"
                type="text"
                required
                value={loginLastName}
                onChange={(e) => setLoginLastName(e.target.value)}
                placeholder="Ej. Pérez (sin correo)"
                className="w-full bg-[#FAF7F2] border-2 border-[#EBE6DE] rounded-xl px-4 py-3 placeholder-slate-400 text-sm font-medium focus:outline-none focus:border-[#5A6344] focus:ring-1 focus:ring-[#5A6344] transition-colors"
              />
              <p className="text-[10px] text-slate-400 mt-1.5 leading-relaxed">
                Ingrese solo su apellido. Se normaliza automáticamente y se convierte a su usuario de fe.
              </p>
            </div>

            <div>
              <label htmlFor="login-password" className="block text-xs font-bold text-slate-700 tracking-wider uppercase mb-1.5">
                Clave Secreta:
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#FAF7F2] border-2 border-[#EBE6DE] rounded-xl pl-4 pr-11 py-3 placeholder-slate-400 text-sm font-medium focus:outline-none focus:border-[#5A6344] focus:ring-1 focus:ring-[#5A6344] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#5A6344] focus:outline-none p-1 rounded-sm"
                  title={showPassword ? "Ocultar Contraseña" : "Mostrar Contraseña"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-start gap-2 animate-shake">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <p className="leading-normal">{loginError}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className={`w-full py-3.5 px-4 bg-[#5A6344] hover:bg-[#484f36] disabled:bg-slate-300 text-white font-extrabold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isLoggingIn ? "cursor-not-allowed opacity-80" : ""
              }`}
            >
              {isLoggingIn ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Verificando...</span>
                </>
              ) : (
                <>
                  <span>Ingresar a mi Templo</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-[#FAF7F2] text-center">
            <p className="text-[10px] text-slate-400 leading-relaxed uppercase tracking-wider font-semibold">
              ¿No tiene acceso?
            </p>
            <p className="text-[11px] text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
              El registro lo realiza manualmente el maestro de la iglesia una vez completado el abono. Consulte a su instructor para obtener sus credenciales.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D2A26] font-sans antialiased selection:bg-amber-100 selection:text-amber-900">

      
      {/* ----------------- LANDING / BIENVENIDA SCREEN ----------------- */}
      {currentScreen === "landing" && (
        <div id="landing-screen" className="min-h-screen flex flex-col justify-between p-6 md:p-12 relative overflow-hidden">
          {/* Subtle decoration */}
          <div className="absolute top-[-10%] left-[-10%] w-[350px] h-[350px] bg-[#5A6344]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[350px] h-[350px] bg-[#D9B99B]/15 rounded-full blur-3xl pointer-events-none" />

          {/* Top layout */}
          <div className="w-full max-w-4xl mx-auto flex items-center justify-between z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#5A6344] rounded-xl flex items-center justify-center text-white font-bold text-lg">FC</div>
              <span className="font-extrabold tracking-tight text-[#5A6344] text-lg uppercase">FuerteEnCristo</span>
            </div>
            <span className="text-xs font-semibold text-[#8B6E4E] bg-[#D9B99B]/30 py-1.5 px-4 rounded-full uppercase tracking-wider">
              En casa • Sin equipamiento • Para el espíritu
            </span>
          </div>

          {/* Center piece - Scripture focus (Huge & high-contrast) */}
          <div className="w-full max-w-3xl mx-auto text-center my-auto z-10 py-12">
            <span className="text-sm font-extrabold text-[#8B6E4E] uppercase tracking-widest bg-white py-1.5 px-4 rounded-full shadow-xs inline-block mb-6">
              Mensaje de Bienvenida
            </span>

            <h2 className="font-serif text-3xl md:text-5xl italic text-[#5A4B3A] leading-relaxed md:leading-loose mb-6 font-semibold">
              "¿O no sabéis que vuestro cuerpo es templo del Espíritu Santo, el cual está en vosotros, el cual tenéis de Dios, y que no sois vuestros?"
            </h2>
            
            <p className="text-sm md:text-base font-bold text-[#8B6E4E] tracking-wider uppercase mb-8">
              — 1 Corintios 6:19
            </p>

            <div className="inline-block bg-white/60 backdrop-blur-xs p-5 rounded-3xl border border-[#EBE6DE] max-w-xl mx-auto mb-10 shadow-xs">
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                Hermano, cuidar de tu salud física no es por vanidad. Es proveer fuerzas a tu cuerpo para servir a tu familia, honrar Tu templo y glorificar a Dios en tus quehaceres cotidianos de forma independiente.
              </p>
            </div>

            <div className="flex justify-center">
              <button
                type="button"
                id="btn-landing-start"
                onClick={() => setCurrentScreen("onboarding")}
                className="bg-[#5A6344] hover:bg-[#484f36] text-[#FAF7F2] font-extrabold text-lg md:text-2xl px-10 py-5 rounded-3xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 cursor-pointer ring-4 ring-[#5A6344]/10"
              >
                <span>¡COMENZAR MI CAMINO!</span>
                <ChevronRight className="w-6 h-6 stroke-[3]" />
              </button>
            </div>
          </div>

          {/* Footer of Landing */}
          <div className="w-full max-w-4xl mx-auto text-center z-10">
            <p className="text-xs text-slate-400 italic">
              "Todo lo puedes en Cristo que te fortalece." Un espacio seguro y fraternal de fitness diseñado para el hogar.
            </p>
          </div>
        </div>
      )}

      {/* ----------------- STEP 1: ONBOARDING PROFILE CAPTURE ----------------- */}
      {currentScreen === "onboarding" && (
        <div id="onboarding-screen" className="min-h-screen flex flex-col justify-between p-6 md:p-12 relative overflow-hidden">
          <div className="absolute top-[-10%] right-[-10%] w-[350px] h-[350px] bg-[#5A6344]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[350px] h-[350px] bg-[#D9B99B]/15 rounded-full blur-3xl pointer-events-none" />

          {/* Top navigation row */}
          <div className="w-full max-w-3xl mx-auto flex items-center justify-between z-10">
            <button 
              type="button" 
              onClick={() => setCurrentScreen("landing")}
              className="text-[#5A6344] hover:text-[#484f36] font-bold text-sm flex items-center gap-1.5 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> volver
            </button>
            <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">Ficha del siervo • Paso 1 de 2</span>
          </div>

          {/* Card Form */}
          <div className="w-full max-w-2xl mx-auto my-auto z-10 bg-white rounded-3xl p-6 md:p-10 shadow-md border border-[#EBE6DE] my-6">
            <div className="text-center mb-8">
              <span className="text-4xl">💪</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#5A6344] mt-3">Tu Ficha de Bienvenida</h2>
              <p className="text-sm text-slate-500 mt-1">Ingresa tus datos con confianza. No los compartiremos con nadie externa.</p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setCurrentScreen("dashboard"); }} className="space-y-6">
              
              {/* Name */}
              <div>
                <label className="block text-sm font-bold text-slate-700 tracking-wide mb-1.5 uppercase">1. ¿Cómo te gustaría que te llamemos, hermano?</label>
                <input 
                  type="text"
                  placeholder="Ej. Hermano Mateo, Abuela María, etc."
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full bg-[#FAF7F2] border-2 border-[#EBE6DE] rounded-2xl px-4 py-3.5 text-base font-medium focus:outline-none focus:border-[#5A6344] focus:ring-1 focus:ring-[#5A6344]"
                  required
                />
              </div>

              {/* Dynamic Path Way selection cards (No jargon, extremely obvious to tap for older adults) */}
              <div>
                <label className="block text-sm font-bold text-slate-700 tracking-wide mb-2.5 uppercase">2. Elige tu sendero de entrenamiento de hoy:</label>
                <div className="grid grid-cols-1 gap-3">
                  
                  {/* Option 1: Súper Suave */}
                  <button
                    type="button"
                    onClick={() => setSelectedRouteType("suave")}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-start gap-4 ${
                      selectedRouteType === "suave" 
                        ? "border-[#5A6344] bg-[#5A6344]/5 ring-1 ring-[#5A6344]" 
                        : "border-[#EBE6DE] hover:border-slate-300"
                    }`}
                  >
                    <span className="text-3xl mt-1">🛋️</span>
                    <div className="flex-1">
                      <h4 className="font-bold text-base text-[#5A6344] flex items-center gap-1.5">
                        Sendero Súper Suave <span className="text-[10px] bg-[#5A6344]/10 text-[#5A6344] px-2 py-0.5 rounded-full font-sans">Silla y Apoyo</span>
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        Ejercicios muy fáciles que puedes hacer sentado o usando una silla estable. Ideal para re-activar tu cuerpo sin ningún tipo de fatiga dolorosa.
                      </p>
                    </div>
                  </button>

                  {/* Option 2: Cuidado de Rodillas */}
                  <button
                    type="button"
                    onClick={() => setSelectedRouteType("rodillas")}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-start gap-4 ${
                      selectedRouteType === "rodillas" 
                        ? "border-[#5A6344] bg-[#5A6344]/5 ring-1 ring-[#5A6344]" 
                        : "border-[#EBE6DE] hover:border-slate-300"
                    }`}
                  >
                    <span className="text-3xl mt-1">🦵</span>
                    <div className="flex-1">
                      <h4 className="font-bold text-base text-[#5A6344] flex items-center gap-1.5">
                        Cuidado de Rodillas y Espalda <span className="text-[10px] bg-[#D9B99B] text-white px-2 py-0.5 rounded-full font-sans">Sin impacto</span>
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        Foco en fortalecer los muslos para quitarle peso a las articulaciones de la rodilla. Sin saltos, sin movimientos bruscos, 100% libre de dolores.
                      </p>
                    </div>
                  </button>

                  {/* Option 3: Fuerza Básica */}
                  <button
                    type="button"
                    onClick={() => setSelectedRouteType("fuerza")}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-start gap-4 ${
                      selectedRouteType === "fuerza" 
                        ? "border-[#5A6344] bg-[#5A6344]/5 ring-1 ring-[#5A6344]" 
                        : "border-[#EBE6DE] hover:border-slate-300"
                    }`}
                  >
                    <span className="text-3xl mt-1">🛡️</span>
                    <div className="flex-1">
                      <h4 className="font-bold text-base text-[#5A6344] flex items-center gap-1.5">
                        Siervo Activo y Fuerte <span className="text-[10px] bg-amber-600 text-white px-2 py-0.5 rounded-full font-sans">Fuerza general</span>
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        Ejercicios funcionales sencillos para sostener una buena musculatura en brazos, hombros y piernas. Mejora tu independencia diaria.
                      </p>
                    </div>
                  </button>

                  {/* Option 4: Legendario */}
                  <button
                    type="button"
                    onClick={() => setSelectedRouteType("legendario")}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-start gap-4 ${
                      selectedRouteType === "legendario" 
                        ? "border-[#5A6344] bg-[#5A6344]/5 ring-1 ring-[#5A6344]" 
                        : "border-[#EBE6DE] hover:border-slate-300"
                    }`}
                  >
                    <span className="text-3xl mt-1">🏔️</span>
                    <div className="flex-1">
                      <h4 className="font-bold text-base text-[#5A6344] flex items-center gap-1.5">
                        Sendero Legendario <span className="text-[10px] bg-[#5A6344] text-[#FAF7F2] px-2 py-0.5 rounded-full font-sans">Montañismo y Altura</span>
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        Ejercicios vigorosos diseñados para el entrenamiento de senderismo y montañismo. Fortalece piernas, tobillos y espalda para ascensos empinados.
                      </p>
                    </div>
                  </button>

                </div>
              </div>

              {/* Primary Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#5A6344] hover:bg-[#484f36] text-[#FAF7F2] font-extrabold text-lg py-4 rounded-2xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <span>Generar Ficha Plan y Rutina</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

            </form>
          </div>

          {/* Onboarding bottom notification */}
          <div className="text-center text-xs text-slate-400">
            FuerteEnCristo • Ejercicio guiado con amor fraternal.
          </div>
        </div>
      )}

      {/* ----------------- MAIN INTERACTIVE DASHBOARD SECTION (BENTO GRID STYLE) ----------------- */}
      {currentScreen === "dashboard" && (
        <div id="main-dashboard-screen">
          
          {/* Dashboard Header Bar */}
          <div className="bg-white border-b border-[#D9D3C7] py-4 px-4 sm:px-6 shadow-xs sticky top-0 z-20">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#5A6344] rounded-xl flex items-center justify-center text-white font-extrabold">FC</div>
                <div>
                  <h1 className="text-xl font-extrabold text-[#5A6344] tracking-tight">FuerteEnCristo</h1>
                  <p className="text-xs text-slate-500 italic">"Gente activa, templos vivos de fe"</p>
                </div>
              </div>

              {/* Mini User Summary Badge */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 bg-[#FAF7F2] p-2 rounded-xl border border-[#EBE6DE] text-xs font-semibold">
                  <span>Hermano: <strong className="text-[#8B6E4E]">{userName || "Fiel"}</strong></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 block animate-pulse"></span>
                  <button 
                    onClick={handleRestartAll} 
                    className="text-[10px] text-slate-400 hover:text-[#8B6E4E] underline uppercase pl-1 focus:outline-none cursor-pointer"
                  >
                    Editar
                  </button>
                </div>
                
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 py-1.5 px-3 text-xs bg-red-50 hover:bg-red-100 text-red-700 font-bold rounded-xl border border-red-200 cursor-pointer transition-colors focus:outline-none"
                  title="Cerrar sesión"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Salir</span>
                </button>
              </div>

            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-12">

            {/* BIG PUNCHY CALL TO ACTION BAR TO TRIGGER THE GUIDED PLAYER SCREEN */}
            <div className="mb-8 bg-gradient-to-r from-[#5A6344] to-[#484f36] rounded-3xl p-6 md:p-8 text-white shadow-lg flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden">
              <span className="absolute top-2 right-4 text-9xl opacity-10 select-none font-serif font-bold italic">FC</span>
              
              <div className="z-10 text-center md:text-left">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#D9B99B] bg-white/10 px-3 py-1 rounded-full inline-block mb-3">
                  TU RUTINA DE HOY ESTÁ LISTA
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#FAF7F2]">
                  {currentWorkout.nombreDia}
                </h2>
                <p className="text-sm text-white/90 italic mt-2 max-w-2xl">
                  "{currentWorkout.enfoqueMentalEspiritual}"
                </p>
                <div className="flex flex-wrap gap-4 mt-4 justify-center md:justify-start">
                  <span className="text-xs bg-white/10 py-1.5 px-3 rounded-xl flex items-center gap-1">
                    <Dumbbell className="w-3.5 h-3.5 text-[#D9B99B]" /> {activeExercisesArray.length} ejercicios de peso corporal
                  </span>
                  <span className="text-xs bg-white/10 py-1.5 px-3 rounded-xl flex items-center gap-1">
                    <Timer className="w-3.5 h-3.5 text-[#D9B99B]" /> ~20 minutos acumulados
                  </span>
                </div>
              </div>

              <div className="z-10 shrink-0 w-full md:w-auto">
                <button
                  type="button"
                  id="btn-trigger-player"
                  onClick={handleStartWorkout}
                  className="w-full md:w-auto bg-[#D9B99B] hover:bg-[#c9aa8b] text-white font-extrabold text-lg px-8 py-5 rounded-2xl shadow-md uppercase tracking-wide cursor-pointer flex items-center justify-center gap-2.5 transition-all ring-4 ring-white/10 hover:scale-[1.02]"
                >
                  <Play className="w-6 h-6 fill-current text-white stroke-[2.5]" />
                  <span>EMPEZAR EJERCICIOS AHORA</span>
                </button>
              </div>
            </div>

            {/* BENTO GRID INTERACTIVE BODY */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* SUB-SECTION 1: PLAN SEMANAL DE 7 DÍAS (Col Span: 4) */}
              <section className="lg:col-span-4 bg-white rounded-3xl p-6 shadow-xs border border-[#EBE6DE] flex flex-col justify-between">
                <div>
                  <h3 className="text-[#5A6344] font-bold text-lg mb-1 flex items-center gap-2">
                    <span className="text-xl">📅</span> SECCIÓN 1 — PLAN SEMANAL
                  </h3>
                  <p className="text-xs text-slate-500 mb-4 inline-block bg-[#FAF7F2] p-1.5 rounded-xl border border-[#EBE6DE]">
                    Haz clic en los días para ver el enfoque o de lo contrario, sigue tu plan de Lunes a Domingo.
                  </p>

                  <div className="space-y-2">
                    {activePlan.planSemanal.map((item, index) => {
                      const isSelected = selectedDay === item.dia;
                      const isSunday = item.dia.toLowerCase() === "domingo";
                      const isSaturday = item.dia.toLowerCase() === "sábado" || item.dia.toLowerCase() === "sabado";
                      
                      let dayStyle = "bg-[#F3F1ED] text-slate-800 border-transparent hover:bg-slate-200/60";
                      if (isSelected) {
                        dayStyle = "bg-[#5A6344] text-[#FAF7F2] font-semibold scale-[1.01] ring-1 ring-[#D9B99B]";
                      } else if (isSunday) {
                        dayStyle = "bg-[#D9B99B]/25 text-[#8B6E4E] border border-[#D9B99B]/35 hover:bg-[#D9B99B]/35";
                      } else if (isSaturday) {
                        dayStyle = "bg-[#5A6344]/10 text-[#5A6344] border border-[#5A6344]/20 hover:bg-[#5A6344]/15";
                      }

                      return (
                        <div
                          key={index}
                          onClick={() => setSelectedDay(item.dia)}
                          className={`p-3 rounded-2xl cursor-pointer transition-all flex justify-between items-center ${dayStyle}`}
                        >
                          <div>
                            <span className="text-xs font-bold block">{item.dia}</span>
                            <span className="text-[11px] block opacity-95 text-xs line-clamp-1 mt-0.5">{item.tipoActividad}</span>
                          </div>
                          <span className="text-[10px] opacity-75 font-mono">
                            {item.duracion_minutos > 0 ? `${item.duracion_minutos} min` : "Descanso"}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-5 p-3.5 bg-[#FAF7F2] rounded-2xl border border-[#EBE6DE]">
                  <h4 className="text-xs font-bold text-[#8B6E4E] uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Enfoque: {selectedDay}
                  </h4>
                  <p className="text-xs text-slate-700 leading-normal italic">
                    {activePlan.planSemanal.find(d => d.dia === selectedDay)?.descripcion || "Día de entrenamiento."}
                  </p>
                </div>
              </section>

              {/* SUB-SECTION 2: HOY - EJERCICIOS PREVISIÓN (Col Span: 5) */}
              <section className="lg:col-span-5 bg-white rounded-3xl p-6 shadow-xs border border-[#EBE6DE] flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-[#5A6344] font-bold text-lg flex items-center gap-2">
                      <span className="text-xl">🔥</span> SECCIÓN 2 — RUTINA DE HOY
                    </h3>
                    <span className="text-[10px] bg-[#D9B99B] text-white px-2 py-0.5 rounded-full uppercase font-bold tracking-wider">
                      Guía Rápida
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 mb-4 bg-slate-50 p-2.5 rounded-xl">
                    Clica en el gran botón de arriba para abrir la pantalla completa con letras grandes, o repásalos a continuación:
                  </p>

                  <div className="space-y-3">
                    {activeExercisesArray.map((item, index) => {
                      const isItemChecked = checkedExercises[`${selectedDay}-${item.nombre}`] || false;
                      return (
                        <div key={index} className="p-3.5 rounded-2xl border border-slate-100 hover:bg-slate-50/50 flex items-start gap-3">
                          <button
                            type="button"
                            onClick={() => {
                              setCheckedExercises(prev => ({
                                ...prev,
                                [`${selectedDay}-${item.nombre}`]: !isItemChecked
                              }));
                            }}
                            className={`w-6 h-6 rounded-full border shrink-0 flex items-center justify-center transition-all cursor-pointer ${
                              isItemChecked ? "bg-emerald-500 border-emerald-500 text-white" : "border-slate-300 text-transparent"
                            }`}
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          
                          <div>
                            <h4 className={`text-sm font-bold ${isItemChecked ? "line-through text-slate-400" : "text-[#2D2A26]"}`}>
                              {item.nombre}
                            </h4>
                            <p className="text-xs font-semibold text-[#8B6E4E] mt-0.5">
                              {item.series} series × {item.repeticiones_o_tiempo}
                            </p>
                            <p className="text-xs text-slate-500 mt-1 italic max-w-sm">
                              "{item.instrucciones}"
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Presiona los círculos para marcar tus completados manuales</span>
                  <button 
                    onClick={() => setCheckedExercises({})}
                    className="text-[#8B6E4E] hover:underline font-bold uppercase text-[10px]"
                  >
                    Reset Checkboxes
                  </button>
                </div>
              </section>

              {/* SUB-SECTION 3: ALIMENTACIÓN INTEGRADA (Col Span: 3) */}
              <section className="lg:col-span-3 bg-[#5A6344] rounded-3xl p-6 shadow-md text-white flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-lg mb-1 flex items-center gap-2 text-[#FAF7F2]">
                    <span className="text-xl">🍎</span> SECCIÓN 3 — ALIMENTACIÓN
                  </h3>
                  <p className="text-xs text-white/70 mb-5 leading-snug">
                    4 recomendaciones de alimentación fáciles e hidratación cotidiana para mayores:
                  </p>

                  <div className="space-y-4">
                    {activePlan.recomendacionesAlimentacion.map((item, index) => {
                      let iconChar = "💧";
                      if (index === 1) iconChar = "🌾";
                      else if (index === 2) iconChar = "🥗";
                      else if (index === 3) iconChar = "⏳";
                      
                      return (
                        <div key={index} className="flex gap-2.5 items-start">
                          <span className="text-base leading-none p-1.5 rounded-lg bg-white/10 shrink-0">{iconChar}</span>
                          <p className="text-xs text-white/90 leading-relaxed italic">
                            {item}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 text-center">
                  <p className="text-[10px] text-[#D9B99B] font-bold tracking-widest uppercase">
                    Sabiduría Cristiana
                  </p>
                  <p className="text-[11px] text-white/80 italic mt-0.5">
                    "Glorificad a Dios en vuestro cuerpo y en vuestro espíritu"
                  </p>
                </div>
              </section>


              {/* SUB-SECTION 4: PALABRA DE FE COMPLETA (Col Span: 12) */}
              <section className="lg:col-span-12 bg-[#D9B99B]/20 rounded-3xl p-6 md:p-8 border-2 border-dashed border-[#D9B99B] flex flex-col md:flex-row justify-between items-center gap-6 relative">
                <span className="absolute bottom-2 right-4 text-8xl opacity-10 select-none">🕊️</span>
                
                <div className="flex-1">
                  <span className="text-xs uppercase tracking-widest font-extrabold text-[#8B6E4E] bg-white px-3 py-1 rounded-full shadow-xs inline-block mb-3">
                    SECCIÓN 4 — PALABRA DE FE
                  </span>
                  
                  <blockquote className="font-serif text-lg md:text-xl italic text-[#5A4B3A] mb-3 leading-relaxed border-l-4 border-[#8B6E4E] pl-4">
                    "{activePlan.palabraDeFe.versiculoTexto}"
                  </blockquote>
                  
                  <p className="text-xs font-bold text-[#8B6E4E] tracking-wider mb-4 ml-4">
                    — {activePlan.palabraDeFe.versiculoReferencia}
                  </p>

                  <hr className="border-[#D9B99B]/30 my-4" />

                  <h4 className="font-bold text-sm text-[#5A4B3A] mb-1">Reflexión de FuerteEnCristo:</h4>
                  <p className="text-xs md:text-sm text-slate-700 leading-relaxed italic">
                    {activePlan.palabraDeFe.reflexion}
                  </p>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-[#EBE6DE] shrink-0 text-center w-full md:w-64 shadow-xs">
                  <span className="text-3xl">🙏</span>
                  <p className="font-bold text-xs text-[#5A6344] mt-2">Día dedicado a la salud</p>
                  <p className="text-[10px] text-slate-500 mt-1 mb-3">Cuidar el cuerpo es un gran acto de generosidad con tus seres queridos.</p>
                  <button 
                    onClick={handleStartWorkout}
                    className="w-full bg-[#8B6E4E] hover:bg-[#725a40] text-white text-xs font-bold py-2 px-3 rounded-lg cursor-pointer flex items-center justify-center gap-1 transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#D9B99B]" /> Iniciar Rutina Hoy
                  </button>
                </div>
              </section>

            </div>

          </div>

          {/* Footer content */}
          <footer className="bg-white border-t border-[#D9D3C7] py-12 mt-12 text-center text-slate-500">
            <p className="text-sm font-serif italic text-[#5A6344] font-extrabold text-base">
              "¡{activePlan.fraseAlientoCorta}!"
            </p>
            <p className="text-xs text-slate-400 mt-2 uppercase tracking-widest font-bold">
              FuerteEnCristo — Fieles a la palabra, fuertes en casa
            </p>
          </footer>

        </div>
      )}

      {/* ----------------- FULL-SCREEN GUIDED EXERCISE PLAYER mode ----------------- */}
      {/* Specifically engineered for older adults: giant typography, 0 clutter, huge Tap Targets */}
      {currentScreen === "player" && (
        <div id="exercise-player-screen" className="min-h-screen bg-[#FAF7F2] text-[#2D2A26] flex flex-col justify-between p-4 md:p-8 relative">
          
          {/* Top Control Header bar */}
          <header className="w-full max-w-4xl mx-auto flex justify-between items-center z-10 py-2 border-b border-slate-200/50">
            <button
              type="button"
              onClick={() => setCurrentScreen("dashboard")}
              className="text-[#8B6E4E] hover:text-slate-900 font-extrabold text-base md:text-lg flex items-center gap-1 uppercase cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" /> Salir al Menú
            </button>
            
            <div className="text-center">
              <span className="block text-[10px] uppercase font-bold tracking-widest text-slate-500">RUTINA ACTIVA</span>
              <span className="text-xs font-extrabold text-[#5A6344] bg-[#5A6344]/10 py-0.5 px-3 rounded-full">
                {currentPlayerIndex + 1} de {activeExercisesArray.length} completados
              </span>
            </div>

            <button
              type="button"
              onClick={handleRestartAll}
              className="text-slate-400 hover:text-[#8B6E4E] font-medium text-xs flex items-center gap-1.5 focus:outline-none cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> reiniciar todo
            </button>
          </header>

          {/* Main Giant Exercise Player Panel */}
          <div className="w-full max-w-3xl mx-auto my-auto z-10 py-6">
            
            {/* Celebration overlay block when workout finishes */}
            {hasFinishedWorkout ? (
              <div className="bg-white rounded-3xl p-6 md:p-12 shadow-lg border-2 border-dashed border-[#D9B99B] text-center max-w-2xl mx-auto animate-fade-in">
                <span className="text-6xl md:text-7xl block">🏆 AMÉN 🏆</span>
                
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#5A6344] mt-5 mb-3">
                  ¡Rutina Completada!
                </h2>
                
                <p className="text-md font-serif italic text-slate-600 leading-relaxed max-w-md mx-auto mb-6">
                  "He peleado la buena batalla, he acabado la carrera, he guardado la fe." — 2 Timoteo 4:7
                </p>

                <div className="bg-[#5A6344] text-white p-6 rounded-2xl text-left max-w-md mx-auto mb-8 shadow-xs">
                  <h4 className="font-bold text-sm text-[#D9B99B] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <HeartPlus className="w-4 h-4" /> Bendiciones para Hoy
                  </h4>
                  <p className="text-xs text-white/90 leading-relaxed italic">
                    {activePlan.palabraDeFe.reflexion}
                  </p>
                  <p className="text-[11px] text-white/50 border-t border-white/10 pt-2.5 mt-3">
                    Recomendación de hidratación: ¡Ve a beber un gran vaso de agua ahora mismo para mimar tus articulaciones!
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      // Mark all checked for the selected day in dashboard
                      const nextChecks = { ...checkedExercises };
                      activeExercisesArray.forEach(ex => {
                        nextChecks[`${selectedDay}-${ex.nombre}`] = true;
                      });
                      setCheckedExercises(nextChecks);
                      setCurrentScreen("dashboard");
                    }}
                    className="bg-[#5A6344] hover:bg-[#484f36] text-[#FAF7F2] font-bold text-base px-8 py-4 rounded-xl cursor-pointer transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-5 h-5" /> Regresar al Plan Semanal
                  </button>
                  <button
                    type="button"
                    onClick={handleRestartAll}
                    className="bg-[#F3F1ED] hover:bg-slate-200 text-slate-800 font-bold text-xs px-5 py-3 rounded-xl cursor-pointer transition-all"
                  >
                    Salir al Inicio
                  </button>
                </div>
              </div>
            ) : (
              /* ACTIVE EXERCISE VIEW */
              <div className="bg-white rounded-3xl p-6 md:p-10 shadow-lg border border-[#EBE6DE] space-y-6 md:space-y-8">
                
                {/* Exercise Stage tag */}
                <div className="flex justify-between items-center">
                  <span className="text-xs uppercase font-extrabold tracking-widest text-[#8B6E4E] bg-[#D9B99B]/35 px-4 py-1.5 rounded-full inline-block">
                    EJERCICIO {currentPlayerIndex + 1} DE {activeExercisesArray.length}
                  </span>
                  
                  {/* Dynamic Level label */}
                  <span className="text-xs text-slate-500 font-bold tracking-wide uppercase">
                    Elegido: {selectedRouteType === "suave" ? "Súper Suave" : selectedRouteType === "rodillas" ? "Articulaciones" : selectedRouteType === "fuerza" ? "Fuerza Básica" : "Legendario (Montañismo)"}
                  </span>
                </div>

                {/* Giant Exercise Name */}
                <div className="text-center md:text-left">
                  <h1 className="text-3xl md:text-5xl font-extrabold text-[#5A6344] tracking-tight leading-none">
                    {currentExercise.nombre}
                  </h1>
                  
                  {/* Giant Series & Reps Badge specifically readable for poor vision */}
                  <div className="mt-4 inline-flex items-center gap-2 bg-[#D9B99B]/15 text-[#8B6E4E] px-5 py-2.5 rounded-2xl border border-[#D9B99B]/30 select-none">
                    <span className="text-xl md:text-2xl font-black">{currentExercise.series}</span> 
                    <span className="text-xs font-bold uppercase tracking-wider">Series</span>
                    <span className="text-[#8B6E4E] font-black text-xl px-1">×</span>
                    <span className="text-xl md:text-2xl font-black">{currentExercise.repeticiones_o_tiempo}</span>
                  </div>
                </div>

                {/* Giant legible instructions */}
                <div className="bg-[#FAF7F2] p-5 md:p-8 rounded-2xl border border-[#EBE6DE] text-left">
                  <h4 className="text-xs uppercase tracking-widest font-extrabold text-slate-400 mb-2 flex items-center gap-1">
                    <Volume2 className="w-3.5 h-3.5" /> Instrucciones muy sencillas:
                  </h4>
                  <p className="text-base md:text-2xl text-slate-800 leading-relaxed font-serif font-medium">
                    "{currentExercise.instrucciones}"
                  </p>
                </div>

                {/* Visual support assistance reminder */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-orange-50/50 rounded-2xl border border-orange-100">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl shrink-0">🤝</span>
                    <div>
                      <span className="block text-xs font-bold text-[#8B6E4E] uppercase">CONSEJO DE SEGURIDAD</span>
                      <p className="text-[11px] text-slate-600">No apures ni contengas la respiración. Disfruta con una sonrisa.</p>
                    </div>
                  </div>

                  {/* REST TIMER INTEGRATION IN THE PLAYER */}
                  <div className="flex items-center gap-2">
                    {restSeconds !== null ? (
                      <div className="bg-[#5A6344] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 justify-center animate-pulse">
                        <Clock className="w-4 h-4 animate-spin text-[#D9B99B]" /> Descanso: {restSeconds} s
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleStartRest(currentExercise.descanso_s_entre_series)}
                        className="bg-[#D9B99B] hover:bg-[#cba889] text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                      >
                        <Timer className="w-4 h-4" /> Tomar Descanso ({currentExercise.descanso_s_entre_series}s)
                      </button>
                    )}
                  </div>
                </div>

                {/* BIG NEXT EXERCISE ACTION BUTTON */}
                <div className="pt-4 flex flex-col md:flex-row items-center gap-4">
                  
                  {/* Previous Exerciser */}
                  <button
                    type="button"
                    disabled={currentPlayerIndex === 0}
                    onClick={() => {
                      if (currentPlayerIndex > 0) {
                        setCurrentPlayerIndex(currentPlayerIndex - 1);
                        setPlayerChecked(false);
                      }
                    }}
                    className="w-full md:w-auto border-2 border-slate-200 hover:border-slate-400 text-slate-500 font-bold px-6 py-4 rounded-2xl text-sm transition-all disabled:opacity-40 disabled:pointer-events-none cursor-pointer flex items-center justify-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" /> Anterior
                  </button>

                  {/* Primary Success confirmation Next Button */}
                  <button
                    type="button"
                    onClick={() => {
                      // Save checked exercise for progress bar
                      setCheckedExercises(prev => ({
                        ...prev,
                        [`${selectedDay}-${currentExercise.nombre}`]: true
                      }));

                      // Next Exercise or Finish screen
                      if (currentPlayerIndex < activeExercisesArray.length - 1) {
                        setCurrentPlayerIndex(currentPlayerIndex + 1);
                        setPlayerChecked(false);
                        setRestSeconds(null);
                      } else {
                        // Confirms Completed Workout!
                        setHasFinishedWorkout(true);
                      }
                    }}
                    className="flex-1 w-full bg-[#5A6344] hover:bg-[#484f36] text-[#FAF7F2] font-black text-lg md:text-2xl py-5 px-8 rounded-2xl shadow-md hover:shadow-lg transition-transform hover:scale-[1.01] flex items-center justify-center gap-3 cursor-pointer ring-4 ring-[#5A6344]/10"
                  >
                    <span>
                      {currentPlayerIndex < activeExercisesArray.length - 1 ? "SIGUIENTE EJERCICIO ➡️" : "¡COMPLETAR MI RUTINA! 🎉"}
                    </span>
                  </button>

                </div>

              </div>
            )}

          </div>

          {/* Player guided quotes bottom row */}
          <footer className="w-full max-w-4xl mx-auto text-center py-4 text-xs text-slate-400 italic">
            "No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te esfuerzo..." — Isaías 41:10
          </footer>

        </div>
      )}

    </div>
  );
}

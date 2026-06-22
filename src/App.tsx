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
  EyeOff,
  Download,
  Copy,
  Trash2
} from "lucide-react";
import { WeeklyDayPlan, ExerciseItem, TodayWorkout, PalabraDeFe, PersonalFitnessPlan } from "./types";
import { ROUTINES_BY_ROUTE_AND_DAY } from "./routines";
import { doc, getDoc, setDoc, updateDoc, serverTimestamp, collection, query, where, getDocs, addDoc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";

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

const getSpanishDayName = (): string => {
  const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const dayIndex = new Date().getDay();
  return days[dayIndex];
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
  
  // PWA elements for installation from the web
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBtn, setShowInstallBtn] = useState<boolean>(false);
  const [showInstallHelp, setShowInstallHelp] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Helper to identify if user is Max or Nanni (Master/Instructor)
  const isMasterUser = (u: any): boolean => {
    if (!u) return false;
    const ape = String(u.apellido || "").trim().toLowerCase();
    const name = String(u.userName || "").trim().toLowerCase();
    return ape === "maxjn";
  };

  // Helper to calculate the Saturday 23:59:59 deadline of the week a challenge was created
  const getSaturdayDeadlineOf = (createdAt: number): number => {
    const date = new Date(createdAt);
    date.setHours(23, 59, 59, 999);
    const day = date.getDay(); // 0 is Sunday, 1-6 is Monday-Saturday
    let daysToSaturday = 6 - day;
    if (day === 0) {
      // Sunday starts a new active circle, Saturday is 6 days later
      daysToSaturday = 6;
    }
    const saturdayDate = new Date(createdAt + daysToSaturday * 24 * 60 * 60 * 1000);
    saturdayDate.setHours(23, 59, 59, 999);
    return saturdayDate.getTime();
  };

  // Helper to check if a challenge has expired
  const isChallengeExpired = (ch: any): boolean => {
    if (!ch.createdAt) return false;
    const now = Date.now();
    if (ch.tipo === "diario") {
      // Daily challenge expires exactly 24 hours after creation
      return now - ch.createdAt > 24 * 60 * 60 * 1000;
    }
    if (ch.tipo === "semanal") {
      // Weekly challenge expires when the week ends on Saturday at 23:59:59
      const deadline = getSaturdayDeadlineOf(ch.createdAt);
      return now > deadline;
    }
    if (ch.tipo === "mensual") {
      // Monthly challenge expires after 30 days of active period
      return now - ch.createdAt > 30 * 24 * 60 * 60 * 1000;
    }
    return false;
  };

  const handleCopyLink = () => {
    // Try to copy the correct address, fallback to a neat string or direct URL
    const cleanUrl = window.location.href;
    navigator.clipboard.writeText(cleanUrl)
      .then(() => {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 3000);
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
      });
  };

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBtn(true);
      console.log("PWA beforeinstallprompt event captured!");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    const handleAppInstalled = () => {
      console.log("PWA App installed successfully!");
      setShowInstallBtn(false);
      setDeferredPrompt(null);
    };

    window.addEventListener("appinstalled", handleAppInstalled);

    // Initial check: if already running as standalone PWA
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setShowInstallBtn(false);
    } else {
      // Show default helper link for users to learn how to install manually
      setShowInstallBtn(true);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallApp = async () => {
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User responded to PWA install prompt: ${outcome}`);
        if (outcome === "accepted") {
          setShowInstallBtn(false);
          setDeferredPrompt(null);
        }
      } catch (err) {
        console.error("Error showing PWA install prompt:", err);
        setShowInstallHelp(true);
      }
    } else {
      // No standard auto prompt triggerable; display friendly step-by-step instructions (iOS/Safari/Firefox compatibility)
      setShowInstallHelp(true);
    }
  };

  // Profile settings (safe local storage / default fallback)
  const [userName, setUserName] = useState<string>("");

  // Master Administrator panel states (Only for Max / master!!!)
  const [showAddUserModal, setShowAddUserModal] = useState<boolean>(false);
  const [newUserApellido, setNewUserApellido] = useState<string>("");
  const [newUserName, setNewUserName] = useState<string>("");
  const [newUserPassword, setNewUserPassword] = useState<string>("");
  const [newUserAccountType, setNewUserAccountType] = useState<"prueba" | "pago" | "premium">("pago");
  const [newUserRoute, setNewUserRoute] = useState<"suave" | "rodillas" | "fuerza" | "legendario">("suave");
  const [isAddingUser, setIsAddingUser] = useState<boolean>(false);
  const [addUserSuccess, setAddUserSuccess] = useState<string>("");
  const [addUserError, setAddUserError] = useState<string>("");

  // States to keep track of the registered users list in Firestore for Max (Master) panel
  const [registeredUsersList, setRegisteredUsersList] = useState<any[]>([]);
  const [isLoadingUsersList, setIsLoadingUsersList] = useState<boolean>(false);

  const fetchRegisteredUsers = async () => {
    setIsLoadingUsersList(true);
    try {
      const usersRef = collection(db, "users");
      const snapshot = await getDocs(usersRef);
      const list: any[] = [];
      snapshot.forEach((d) => {
        list.push({ uid: d.id, ...d.data() });
      });
      // Sort users alphabetically by name (userName)
      list.sort((a, b) => {
        const nameA = (a.userName || "").toLowerCase();
        const nameB = (b.userName || "").toLowerCase();
        return nameA.localeCompare(nameB);
      });
      setRegisteredUsersList(list);
    } catch (err: any) {
      console.error("Error fetching registered users:", err);
    } finally {
      setIsLoadingUsersList(false);
    }
  };

  const handleUpdateUserPlan = async (userUid: string, newPlan: "prueba" | "pago" | "premium") => {
    try {
      const userRef = doc(db, "users", userUid);
      const expirationMillis = newPlan === "prueba"
        ? Date.now() + 3 * 24 * 60 * 60 * 1000
        : null;
      
      await updateDoc(userRef, {
        tipoCuenta: newPlan,
        fechaVencimiento: expirationMillis,
        updatedAt: serverTimestamp()
      });
      
      setRegisteredUsersList(prev => prev.map(u => {
        if (u.uid === userUid) {
          return {
            ...u,
            tipoCuenta: newPlan,
            fechaVencimiento: expirationMillis
          };
        }
        return u;
      }));
    } catch (err: any) {
      console.error("Error updating user plan:", err);
      alert("Hubo un error al actualizar el plan del afiliado de fe.");
    }
  };

  const handleDeleteUser = async (userUid: string, uName: string) => {
    if (userUid === user?.uid) {
      alert("No puedes borrar tu propio usuario de administrador. ¡Es tu llave de acceso!");
      return;
    }

    const confirmed = window.confirm(`¿Está seguro de que desea eliminar permanentemente al hermano/a "${uName}"?\nSe borrarán todos sus récords fraternales e historial de ejercicios de la base de datos.`);
    if (!confirmed) return;

    try {
      await deleteDoc(doc(db, "users", userUid));
      setRegisteredUsersList(prev => prev.filter(u => u.uid !== userUid));
      alert(`Se ha eliminado correctamente al hermano/a "${uName}".`);
    } catch (err: any) {
      console.error("Error deleting user:", err);
      alert("No se pudo eliminar el usuario: " + err.message);
    }
  };

  // Master Administrator active sub-tab (For Max: directory of members vs. challenges manager vs. pupil custom previewer)
  const [activeAdminTab, setActiveAdminTab] = useState<"socios" | "desafios" | "vistas">("socios");

  // Premium client tab
  const [activeDashboardTab, setActiveDashboardTab] = useState<"plan" | "desafios" | "ranking">("plan");

  // Challenges States
  const [challengesList, setChallengesList] = useState<any[]>([]);
  const [isLoadingChallenges, setIsLoadingChallenges] = useState<boolean>(false);

  // States for creating challenges
  const [newChallengeTitle, setNewChallengeTitle] = useState<string>("");
  const [newChallengeDesc, setNewChallengeDesc] = useState<string>("");
  const [newChallengeType, setNewChallengeType] = useState<"diario" | "semanal" | "mensual">("diario");
  const [newChallengePoints, setNewChallengePoints] = useState<number>(10);
  const [isSubmittingChallenge, setIsSubmittingChallenge] = useState<boolean>(false);
  const [challengeSuccessMsg, setChallengeSuccessMsg] = useState<string>("");
  const [challengeErrorMsg, setChallengeErrorMsg] = useState<string>("");

  const fetchChallengesList = async () => {
    setIsLoadingChallenges(true);
    try {
      const q = collection(db, "challenges");
      const snap = await getDocs(q);
      const list: any[] = [];
      snap.forEach((d) => {
        list.push({ id: d.id, ...d.data() });
      });
      // Sort by creation or type
      list.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      setChallengesList(list);
    } catch (err) {
      console.error("Error fetching challenges:", err);
    } finally {
      setIsLoadingChallenges(false);
    }
  };

  const handleCreateChallenge = async (e: React.FormEvent) => {
    e.preventDefault();
    setChallengeSuccessMsg("");
    setChallengeErrorMsg("");

    if (!newChallengeTitle.trim() || !newChallengeDesc.trim()) {
      setChallengeErrorMsg("Por favor complete el nombre y descripción del desafío.");
      return;
    }

    setIsSubmittingChallenge(true);
    try {
      await addDoc(collection(db, "challenges"), {
        titulo: newChallengeTitle.trim(),
        descripcion: newChallengeDesc.trim(),
        tipo: newChallengeType,
        puntos: Number(newChallengePoints) || 10,
        createdAt: new Date().getTime(),
      });
      setNewChallengeTitle("");
      setNewChallengeDesc("");
      setNewChallengePoints(10);
      setChallengeSuccessMsg("¡Desafío creado con éxito!");
      fetchChallengesList();
    } catch (err: any) {
      console.error("Error creating challenge:", err);
      setChallengeErrorMsg("Error al crear desafío: " + err.message);
    } finally {
      setIsSubmittingChallenge(false);
    }
  };

  const handleDeleteChallenge = async (challengeId: string) => {
    if (!window.confirm("¿Seguro que deseas eliminar este desafío?")) {
      return;
    }
    try {
      await deleteDoc(doc(db, "challenges", challengeId));
      fetchChallengesList();
    } catch (err: any) {
      alert("Error al eliminar el desafío: " + err.message);
    }
  };

  const handleCompleteChallenge = async (challengeId: string) => {
    if (!user) {
      alert("Debes iniciar sesión para completar desafíos.");
      return;
    }

    const currentCompleted = user.desafiosCompletadosIds || [];
    if (currentCompleted.includes(challengeId)) {
      alert("¡Ya has superado este desafío espiritual!");
      return;
    }

    try {
      const userDocRef = doc(db, "users", user.uid);
      const nextCompleted = [...currentCompleted, challengeId];
      const nextCount = (user.desafiosSuperadosCount || 0) + 1;

      // Update in Firestore
      await updateDoc(userDocRef, {
        desafiosCompletadosIds: nextCompleted,
        desafiosSuperadosCount: nextCount,
        updatedAt: serverTimestamp()
      });

      // Update in local state & localStorage
      const updatedUser = { 
        ...user, 
        desafiosCompletadosIds: nextCompleted, 
        desafiosSuperadosCount: nextCount 
      };
      setUser(updatedUser);
      localStorage.setItem("fiel_custom_user", JSON.stringify(updatedUser));

      alert("¡AMÉN! Has completado el desafío con éxito. Se sumará a tu récord fraternal. 🙏✨");
      
      // Refresh ranking list
      fetchRegisteredUsers();
    } catch (err: any) {
      console.error("Error completing challenge:", err);
      alert("No se pudo registrar el desafío completado: " + err.message);
    }
  };

  const handleRegisterDailyStreak = async () => {
    if (!user) return;

    const dateObj = new Date();
    const localYear = dateObj.getFullYear();
    const localMonth = String(dateObj.getMonth() + 1).padStart(2, "0");
    const localDay = String(dateObj.getDate()).padStart(2, "0");
    const todayStr = `${localYear}-${localMonth}-${localDay}`;

    const lastStreakReg = user.lastStreakRegistrationDate || "";
    if (lastStreakReg === todayStr) {
      alert("¡Ya reportaste tu sudor y fe el día de hoy, hermano/a! Mantente firme hasta mañana. 🔥📖");
      return;
    }

    try {
      const userDocRef = doc(db, "users", user.uid);
      let newRacha = (user.rachaDias || 0) + 1;
      
      await updateDoc(userDocRef, {
        rachaDias: newRacha,
        lastStreakRegistrationDate: todayStr,
        updatedAt: serverTimestamp()
      });

      const updatedUser = {
        ...user,
        rachaDias: newRacha,
        lastStreakRegistrationDate: todayStr
      };
      setUser(updatedUser);
      localStorage.setItem("fiel_custom_user", JSON.stringify(updatedUser));
      
      alert(`¡Gloria a Dios! Racha actualizada: ¡Llevas ${newRacha} ${newRacha === 1 ? "día" : "días"} de perseverancia seguidos! 🔥🛡️`);
      fetchRegisteredUsers();
    } catch (err: any) {
      console.error("Error registering daily streak:", err);
      alert("No se pudo registrar la racha: " + err.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchRegisteredUsers();
      fetchChallengesList();
    }
  }, [user]);

  useEffect(() => {
    const initUser = async () => {
      setAuthLoading(true);

      // Check if user session is cached in local storage for instant start
      const savedUserStr = localStorage.getItem("fiel_custom_user");
      if (savedUserStr) {
        try {
          const localUser = JSON.parse(savedUserStr);

          // Check expiration for trial/prueba accounts
          if (localUser.tipoCuenta === "prueba" && localUser.fechaVencimiento && Date.now() > localUser.fechaVencimiento) {
            console.warn("Trial user has expired.");
            localStorage.removeItem("fiel_custom_user");
            setUser(null);
            setCurrentScreen("landing");
            setLoginError("Su cuenta de prueba de 3 días ha vencido. Comuníquese con el instructor Max para renovar su acceso completo.");
            setAuthLoading(false);
            return;
          }

          setUser(localUser);
          if (localUser.userName) {
            setUserName(localUser.userName);
          }
          if (localUser.selectedRouteType && ["suave", "rodillas", "fuerza", "legendario"].includes(localUser.selectedRouteType)) {
            setSelectedRouteType(localUser.selectedRouteType);
            setCurrentScreen("dashboard");
          } else {
            setCurrentScreen("onboarding");
          }
          if (localUser.checkedExercises) {
            setCheckedExercises(localUser.checkedExercises);
          }
          setAuthLoading(false);

          // Background sync from Firestore to retrieve any updates
          try {
            const userDocRef = doc(db, "users", localUser.uid);
            const userDocSnap = await getDoc(userDocRef);
            if (userDocSnap.exists()) {
              const data = userDocSnap.data();
              console.log("Background synced fresh user data from Firestore:", data);
              
              // Double check trial expiration on fresh synched data too
              if (data.tipoCuenta === "prueba" && data.fechaVencimiento && Date.now() > data.fechaVencimiento) {
                localStorage.removeItem("fiel_custom_user");
                setUser(null);
                setCurrentScreen("landing");
                setLoginError("Su cuenta de prueba de 3 días ha vencido. Comuníquese con el instructor Max para renovar su acceso completo.");
                return;
              }

              const updatedUser = { ...localUser, ...data, uid: localUser.uid };
              setUser(updatedUser);
              localStorage.setItem("fiel_custom_user", JSON.stringify(updatedUser));

              if (data.userName) {
                setUserName(data.userName);
              }
              if (data.selectedRouteType && ["suave", "rodillas", "fuerza", "legendario"].includes(data.selectedRouteType)) {
                setSelectedRouteType(data.selectedRouteType as any);
                setCurrentScreen("dashboard");
              }
              if (data.checkedExercises) {
                setCheckedExercises(data.checkedExercises);
              }
            }
          } catch (syncErr) {
            console.error("Error doing background sync from Firestore:", syncErr);
          }
        } catch (e) {
          console.error("Error loading user credentials:", e);
          setAuthLoading(false);
        }
      } else {
        // No cached session, show the intro landing screen
        setCurrentScreen("landing");
        setAuthLoading(false);
      }
    };

    initUser();
  }, []);

  const handleAddUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddUserSuccess("");
    setAddUserError("");
    
    if (!newUserApellido.trim() || !newUserName.trim() || !newUserPassword.trim()) {
      setAddUserError("Por favor complete todos los datos obligatorios.");
      return;
    }

    setIsAddingUser(true);
    try {
      const normalizedNewApellido = newUserApellido
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

      // We use a safe generated ID for uniqueness to avoid same last name document collisions!
      const uniqueDocId = `${normalizedNewApellido}_${Math.random().toString(36).substring(2, 6)}`;
      const userDocRef = doc(db, "users", uniqueDocId);
      
      const expirationMillis = newUserAccountType === "prueba" 
        ? Date.now() + 3 * 24 * 60 * 60 * 1000 
        : null;

      await setDoc(userDocRef, {
        apellido: normalizedNewApellido,
        password: newUserPassword.trim(),
        userName: newUserName.trim(),
        selectedRouteType: newUserRoute,
        checkedExercises: {},
        lastLoginDate: "",
        tipoCuenta: newUserAccountType,
        fechaVencimiento: expirationMillis,
        updatedAt: serverTimestamp()
      });

      setAddUserSuccess(`Hermano/a "${newUserName.trim()}" registrado/a correctamente. Puede ingresar con el Apellido: "${newUserApellido.trim()}" y la clave: "${newUserPassword.trim()}"`);
      
      // Clear input fields
      setNewUserApellido("");
      setNewUserName("");
      setNewUserPassword("");
      setNewUserAccountType("pago");
      setNewUserRoute("suave");

      // Reload list automatically
      fetchRegisteredUsers();
    } catch (err: any) {
      console.error("Error adding user to Firestore:", err);
      setAddUserError("Error al registrar en la base de datos de fe: " + err.message);
    } finally {
      setIsAddingUser(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginLastName.trim() || !loginPassword.trim()) {
      setLoginError("Por favor, ingrese su apellido y contraseña.");
      return;
    }
    setLoginError("");
    setIsLoggingIn(true);
    try {
      const normalizedQueryLastName = loginLastName
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
      
      console.log("Querying users collection in Firestore for matches on apellido:", normalizedQueryLastName);
      
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("apellido", "==", normalizedQueryLastName));
      const querySnapshot = await getDocs(q);
      
      let matchedDoc: any = null;
      let matchedId = "";
      
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.password && String(data.password).trim() === loginPassword.trim()) {
            matchedDoc = data;
            matchedId = doc.id;
          }
        });
      } else {
        // Broad search fallback (scan-casing offline backup)
        const allQuery = await getDocs(usersRef);
        allQuery.forEach((doc) => {
          const data = doc.data();
          const dbApellido = data.apellido 
            ? String(data.apellido).trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
            : "";
          if (dbApellido === normalizedQueryLastName && data.password && String(data.password).trim() === loginPassword.trim()) {
            matchedDoc = data;
            matchedId = doc.id;
          }
        });
      }

      if (!matchedDoc) {
        setLoginError("Apellido o clave incorrectos. Verifique sus datos o consulte al instructor del templo.");
        setIsLoggingIn(false);
        return;
      }

      // Check expiration for trial/prueba accounts first
      if (matchedDoc.tipoCuenta === "prueba" && matchedDoc.fechaVencimiento && Date.now() > matchedDoc.fechaVencimiento) {
        setLoginError("Su cuenta de prueba de 3 días ha vencido. Comuníquese con el instructor Max para renovar su acceso completo.");
        setIsLoggingIn(false);
        return;
      }

      const customUser = { uid: matchedId, ...matchedDoc };
      setUser(customUser);
      localStorage.setItem("fiel_custom_user", JSON.stringify(customUser));

      if (customUser.userName) {
        setUserName(customUser.userName);
      }
      
      if (customUser.selectedRouteType && ["suave", "rodillas", "fuerza", "legendario"].includes(customUser.selectedRouteType)) {
        setSelectedRouteType(customUser.selectedRouteType);
        setCurrentScreen("dashboard");
      } else {
        setCurrentScreen("onboarding");
      }

      if (customUser.checkedExercises) {
        setCheckedExercises(customUser.checkedExercises);
      }

    } catch (error: any) {
      console.error("Login verification failed:", error);
      setLoginError("Error de comunicación con el templo. Verifique su conexión de Internet o intente más tarde.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem("fiel_custom_user");
      setUser(null);
      setLoginLastName("");
      setLoginPassword("");
      setLoginError("");
      setCurrentScreen("landing");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const [selectedRouteType, setSelectedRouteType] = useState<"suave" | "rodillas" | "fuerza" | "legendario">("suave");

  const handleSelectRoute = async (route: "suave" | "rodillas" | "fuerza" | "legendario") => {
    setSelectedRouteType(route);
    if (user) {
      localStorage.setItem(`fiel_selected_route_${user.uid}`, route);
      try {
        const userDocRef = doc(db, "users", user.uid);
        await setDoc(userDocRef, {
          selectedRouteType: route,
          userName: userName,
          updatedAt: serverTimestamp()
        }, { merge: true });
        console.log("Successfully updated route & userName in Firestore:", route, userName);
        
        // Cache the updated user object so subsequent PWA restarts remember it perfectly!
        const updatedUser = { ...user, selectedRouteType: route, userName: userName };
        localStorage.setItem("fiel_custom_user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      } catch (err) {
        console.error("Error saving user route to Firestore:", err);
      }
    }
  };

  // State for scolding due to missed days ("regaño")
  const [missedDaysCount, setMissedDaysCount] = useState<number>(0);
  const [showRegaño, setShowRegaño] = useState<boolean>(false);

  // Set the plan based on selected path
  const [activePlan, setActivePlan] = useState<PersonalFitnessPlan>(PROGRAM_SUPER_SUAVE);

  // Active state in Dashboard initialized to today's day
  const [selectedDay, setSelectedDay] = useState<string>(() => getSpanishDayName());
  const [checkedExercises, setCheckedExercises] = useState<Record<string, boolean>>({});

  // Active state in full-screen guided "Player" mode
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);
  const [playerChecked, setPlayerChecked] = useState<boolean>(false);
  const [hasFinishedWorkout, setHasFinishedWorkout] = useState<boolean>(false);

  // Quick Rest Timer
  const [restSeconds, setRestSeconds] = useState<number | null>(null);
  const [restTimerId, setRestTimerId] = useState<any>(null);

  // Calculate missed days when user changes
  useEffect(() => {
    if (user) {
      // Get local YYYY-MM-DD date string
      const dateObj = new Date();
      const localYear = dateObj.getFullYear();
      const localMonth = String(dateObj.getMonth() + 1).padStart(2, "0");
      const localDay = String(dateObj.getDate()).padStart(2, "0");
      const todayStr = `${localYear}-${localMonth}-${localDay}`;
      
      const lastLoginStr = localStorage.getItem(`fiel_last_login_date_${user.uid}`);
      
      console.log("Checking login date streak logic. Last login:", lastLoginStr, "Today:", todayStr);
      
      // Sync lastLoginDate to Firestore
      const updateLastLoginFirestore = async (dateStr: string) => {
        try {
          const userDocRef = doc(db, "users", user.uid);
          await setDoc(userDocRef, {
            lastLoginDate: dateStr,
            updatedAt: serverTimestamp()
          }, { merge: true });
        } catch (err) {
          console.error("Error syncing login date to Firestore:", err);
        }
      };
      
      if (lastLoginStr) {
        if (lastLoginStr !== todayStr) {
          const lastDate = new Date(lastLoginStr + "T00:00:00");
          const todayDate = new Date(todayStr + "T00:00:00");
          
          let count = 0;
          const tempDate = new Date(lastDate.getTime());
          
          while (true) {
            tempDate.setDate(tempDate.getDate() + 1);
            if (tempDate.getTime() >= todayDate.getTime()) {
              break;
            }
            // 0 represents Sunday
            if (tempDate.getDay() !== 0) {
              count++;
            }
          }
          
          if (count > 0) {
            setMissedDaysCount(count);
            setShowRegaño(true);
          }
          
          // Update last login to today
          localStorage.setItem(`fiel_last_login_date_${user.uid}`, todayStr);
          updateLastLoginFirestore(todayStr);
        }
      } else {
        // First login: register today so tracking starts tomorrow
        localStorage.setItem(`fiel_last_login_date_${user.uid}`, todayStr);
        updateLastLoginFirestore(todayStr);
      }
    }
  }, [user]);

  // Sync checked exercises to Firestore and LocalStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(`fiel_checked_${user.uid}`, JSON.stringify(checkedExercises));
      
      const syncChecked = async () => {
        try {
          const userDocRef = doc(db, "users", user.uid);
          await setDoc(userDocRef, {
            checkedExercises: checkedExercises,
            updatedAt: serverTimestamp()
          }, { merge: true });
          console.log("Successfully synced checkedExercises to Cloud Firestore");
        } catch (err) {
          console.error("Error syncing checkedExercises to Firestore:", err);
        }
      };
      
      const debounceTimeout = setTimeout(() => {
        syncChecked();
      }, 600);
      
      return () => clearTimeout(debounceTimeout);
    }
  }, [checkedExercises, user]);

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
              El registro lo realiza manualmente el instructor una vez completado el abono. Consulte a su instructor para obtener sus credenciales.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Segment challenges into active/vigentes and expired/historicos based on creation time rules
  const activeChallenges = challengesList.filter((ch) => !isChallengeExpired(ch));
  const expiredChallenges = challengesList.filter((ch) => isChallengeExpired(ch));

  const getChallengeCompletionsCount = (challengeId: string): number => {
    return registeredUsersList.filter(u => (u.desafiosCompletadosIds || []).includes(challengeId)).length;
  };

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
                onClick={() => {
                  if (user && user.selectedRouteType && ["suave", "rodillas", "fuerza", "legendario"].includes(user.selectedRouteType)) {
                    setCurrentScreen("dashboard");
                  } else {
                    setCurrentScreen("onboarding");
                  }
                }}
                className="bg-[#5A6344] hover:bg-[#484f36] text-[#FAF7F2] font-extrabold text-lg md:text-2xl px-10 py-5 rounded-3xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 cursor-pointer ring-4 ring-[#5A6344]/10"
              >
                <span>¡COMENZAR MI CAMINO!</span>
                <ChevronRight className="w-6 h-6 stroke-[3]" />
              </button>
            </div>

            {showInstallBtn && (
              <div className="flex justify-center mt-6 z-10 animate-fade-in">
                <button
                  type="button"
                  onClick={handleInstallApp}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#8B6E4E] bg-[#D9B99B]/20 hover:bg-[#D9B99B]/35 border border-[#D9B99B]/40 px-4 py-2 rounded-2xl cursor-pointer transition-all hover:scale-102"
                >
                  <Download className="w-3.5 h-3.5 text-amber-600" />
                  <span>¿Prefieres instalar la app en tu celular o computadora? Haz clic aquí</span>
                </button>
              </div>
            )}
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

            <form onSubmit={(e) => { 
              e.preventDefault(); 
              handleSelectRoute(selectedRouteType);
              setCurrentScreen("dashboard"); 
            }} className="space-y-6">
              
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
                {isMasterUser(user) && (
                  <button 
                    type="button"
                    onClick={() => {
                      setAddUserSuccess("");
                      setAddUserError("");
                      setShowAddUserModal(true);
                    }}
                    className="flex items-center gap-1.5 py-1.5 px-3 text-xs bg-amber-500 hover:bg-amber-600 text-white font-extrabold rounded-xl shadow-sm cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] focus:outline-none border border-amber-600 animate-pulse"
                    title="Cargar y registrar nuevas personas en FuerteEnCristo"
                  >
                    <span>🛡️ Cargar Nueva Persona</span>
                  </button>
                )}

                <div className="flex items-center gap-2 bg-[#FAF7F2] p-2 rounded-xl border border-[#EBE6DE] text-xs font-semibold">
                  <span>Hermano: <strong className="text-[#8B6E4E]">{userName || "Fiel"}</strong></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 block animate-pulse"></span>
                  <button 
                    onClick={async () => {
                      const newName = prompt("Escriba su nombre de pila o fe para el templo:", userName);
                      if (newName && newName.trim()) {
                        const trimmedName = newName.trim();
                        setUserName(trimmedName);
                        if (user) {
                          try {
                            const userDocRef = doc(db, "users", user.uid);
                            await updateDoc(userDocRef, {
                              userName: trimmedName,
                              updatedAt: serverTimestamp()
                            });
                            const updatedUser = { ...user, userName: trimmedName };
                            localStorage.setItem("fiel_custom_user", JSON.stringify(updatedUser));
                            setUser(updatedUser);
                          } catch (err) {
                            console.error("Error setting name in Firestore:", err);
                          }
                        }
                      }
                    }} 
                    className="text-[10px] text-slate-400 hover:text-[#8B6E4E] underline uppercase pl-1 focus:outline-none cursor-pointer"
                  >
                    Editar
                  </button>
                </div>

                {!isMasterUser(user) && (
                  <div className="flex items-center gap-2 bg-[#FAF7F2] p-2 rounded-xl border border-[#EBE6DE] text-xs font-semibold">
                    <span>Sendero: <strong className="text-[#5A6344] uppercase">{selectedRouteType}</strong></span>
                    <button 
                      onClick={() => setCurrentScreen("onboarding")} 
                      className="text-[10px] bg-[#5A6344]/10 hover:bg-[#5A6344]/20 text-[#5A6344] py-1 px-1.5 rounded-md font-bold uppercase cursor-pointer transition-colors"
                      title="Cambiar el sendero de entrenamiento"
                    >
                      Cambiar
                    </button>
                  </div>
                )}
                
                {showInstallBtn && (
                  <button 
                    type="button"
                    onClick={handleInstallApp}
                    className="flex items-center gap-1.5 py-1.5 px-3 text-xs bg-amber-500 hover:bg-amber-600 text-white font-extrabold rounded-xl shadow-xs cursor-pointer transition-all focus:outline-none hover:scale-[1.02] active:scale-[0.98]"
                    title="Instalar esta aplicación en tu celular, tablet o computadora"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Instalar App</span>
                  </button>
                )}
                
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
            {isMasterUser(user) && activeAdminTab !== "vistas" ? (
              <div className="space-y-8 animate-in fade-in duration-300">
                
                {/* Admin Tab Switcher */}
                <div className="flex border-b border-[#EBE6DE] gap-4 mb-2 overflow-x-auto pb-1">
                  <button
                    type="button"
                    onClick={() => setActiveAdminTab("socios")}
                    className={`pb-3 text-xs sm:text-sm font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer focus:outline-none whitespace-nowrap ${
                      activeAdminTab === "socios"
                        ? "border-[#5A6344] text-[#5A6344]"
                        : "border-transparent text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    👥 Directorio de Socios
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveAdminTab("desafios")}
                    className={`pb-3 text-xs sm:text-sm font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer focus:outline-none whitespace-nowrap ${
                      activeAdminTab === "desafios"
                        ? "border-[#5A6344] text-[#5A6344]"
                        : "border-transparent text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    ⚔️ Crear y Administrar Desafíos
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveAdminTab("vistas")}
                    className={`pb-3 text-xs sm:text-sm font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer focus:outline-none whitespace-nowrap ${
                      activeAdminTab === "vistas"
                        ? "border-[#5A6344] text-[#5A6344]"
                        : "border-transparent text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    💪 Vista de Hermano
                  </button>
                </div>

                {activeAdminTab === "socios" ? (
                  <>
                    {/* Header card for panel */}
                    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xs border border-[#EBE6DE]">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-3xl">🛡️</span>
                            <h2 className="text-xl md:text-2xl font-extrabold text-[#5A6344] tracking-tight">
                              Directorio FuerteEnCristo
                            </h2>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
                            Como administrador principal (Max), aquí puedes registrar nuevas personas, consultar sus claves secretas y verificar la vigencia de sus suscripciones de entrenamiento.
                          </p>
                        </div>
                        
                        <button
                          type="button"
                          onClick={() => {
                            setAddUserSuccess("");
                            setAddUserError("");
                            setShowAddUserModal(true);
                          }}
                          className="w-full sm:w-auto bg-[#5A6344] hover:bg-[#484f36] text-[#FAF7F2] font-black text-sm px-6 py-4 rounded-2xl shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span>🛡️ Registrar Nueva Persona</span>
                        </button>
                      </div>
                    </div>

                    {/* Statistics bento grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="bg-white p-5 rounded-3xl border border-[#EBE6DE] shadow-3xs flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-xl border border-slate-100 font-bold text-slate-500">👥</div>
                        <div>
                          <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">Registrados</span>
                          <strong className="text-xl md:text-2xl font-black text-[#5A6344] block">
                            {isLoadingUsersList ? "..." : registeredUsersList.length}
                          </strong>
                        </div>
                      </div>

                      <div className="bg-white p-5 rounded-3xl border border-[#EBE6DE] shadow-3xs flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-amber-50/50 flex items-center justify-center text-xl border border-amber-100 font-bold text-amber-500">⏳</div>
                        <div>
                          <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">Pruebas Temporales</span>
                          <strong className="text-xl md:text-2xl font-black text-amber-700 block">
                            {isLoadingUsersList ? "..." : registeredUsersList.filter(u => u.tipoCuenta === "prueba").length}
                          </strong>
                        </div>
                      </div>

                      <div className="bg-white p-5 rounded-3xl border border-[#EBE6DE] shadow-3xs flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-xl border border-emerald-100 font-bold text-emerald-500">🟢</div>
                        <div>
                          <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">Pago Básico</span>
                          <strong className="text-xl md:text-2xl font-black text-emerald-700 block">
                            {isLoadingUsersList ? "..." : registeredUsersList.filter(u => u.tipoCuenta === "pago").length}
                          </strong>
                        </div>
                      </div>

                      <div className="bg-white p-5 rounded-3xl border border-[#EBE6DE] shadow-3xs flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-xl border border-amber-200 font-bold text-amber-600">⭐</div>
                        <div>
                          <span className="text-[10px] text-teal-500 font-extrabold uppercase tracking-wider block">Plan Premium</span>
                          <strong className="text-xl md:text-2xl font-black text-[#5A6344] block">
                            {isLoadingUsersList ? "..." : registeredUsersList.filter(u => u.tipoCuenta === "premium").length}
                          </strong>
                        </div>
                      </div>
                    </div>

                    {/* Table containing the active members */}
                    <div className="bg-white rounded-3xl p-6 shadow-xs border border-[#EBE6DE]">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="font-extrabold text-[#5A6344] text-xs sm:text-sm uppercase tracking-wider">
                          Lista de Personas Registradas ({registeredUsersList.length})
                        </h3>
                        
                        <button
                          type="button"
                          onClick={fetchRegisteredUsers}
                          disabled={isLoadingUsersList}
                          className="flex items-center gap-1.5 py-2 px-3 text-xs text-slate-500 hover:text-[#5A6344] bg-[#FAF7F2] border border-[#EBE6DE] rounded-xl font-bold cursor-pointer transition-all hover:bg-slate-50 disabled:opacity-50"
                        >
                          <RefreshCw className={`w-3 h-3 ${isLoadingUsersList ? "animate-spin" : ""}`} />
                          <span>{isLoadingUsersList ? "Sincronizando..." : "Sincronizar Lista"}</span>
                        </button>
                      </div>

                      {isLoadingUsersList && registeredUsersList.length === 0 ? (
                        <div className="py-20 text-center text-slate-400 space-y-3">
                          <div className="w-8 h-8 border-2 border-[#5A6344] border-t-transparent rounded-full animate-spin mx-auto"></div>
                          <p className="text-xs font-semibold">Cargando base de datos de fe...</p>
                        </div>
                      ) : registeredUsersList.length === 0 ? (
                        <div className="py-16 text-center text-slate-400">
                          <span className="text-4xl block mb-2">⛪</span>
                          <p className="text-xs font-semibold text-slate-500">Aún no hay hermanos cargados. ¡Registra al primero con el botón de arriba!</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {registeredUsersList.map((row, index) => {
                            const isTrial = row.tipoCuenta === "prueba";
                            const isPremium = row.tipoCuenta === "premium";
                            
                            // Vigencia helper
                            let vigText = "Pago Básico";
                            let vigColor = "bg-emerald-50 text-emerald-800 border-emerald-200";
                            
                            if (isPremium) {
                              vigText = "Premium ⭐";
                              vigColor = "bg-[#5A6344]/15 text-[#5A6344] border-[#5A6344]/40 font-black";
                            } else if (isTrial) {
                              if (row.fechaVencimiento) {
                                const remains = row.fechaVencimiento - Date.now();
                                if (remains <= 0) {
                                  vigText = "Prueba Vencida";
                                  vigColor = "bg-red-50 text-red-800 border-red-200 font-bold";
                                } else {
                                  const daysLeft = Math.ceil(remains / (24 * 60 * 60 * 1000));
                                  vigText = `Prueba (${daysLeft}d)`;
                                  vigColor = "bg-amber-50 text-amber-800 border-amber-200 font-bold animate-pulse";
                                }
                              } else {
                                vigText = "Prueba (3 días)";
                                vigColor = "bg-amber-50 text-amber-800 border-amber-200";
                              }
                            }

                            // Baseline path emoji helper
                            let baselineRouteEmoji = "🛋️";
                            let baselineRouteTitle = "Súper Suave";
                            if (row.selectedRouteType === "rodillas") {
                              baselineRouteEmoji = "🦵";
                              baselineRouteTitle = "Rodillas e Impacto Cero";
                            } else if (row.selectedRouteType === "fuerza") {
                              baselineRouteEmoji = "🛡️";
                              baselineRouteTitle = "Siervo Fuerte / General";
                            } else if (row.selectedRouteType === "legendario") {
                              baselineRouteEmoji = "🏔️";
                              baselineRouteTitle = "Legendario (Montañismo)";
                            }

                            return (
                              <div 
                                key={row.uid || index}
                                className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#EBE6DE] flex flex-col justify-between hover:border-slate-300 transition-colors"
                              >
                                <div>
                                  <div className="flex justify-between items-start gap-2 mb-3">
                                    <div>
                                      <h4 className="font-extrabold text-base text-[#5A6344]">
                                        {row.userName || "Hermano registrado"}
                                      </h4>
                                      <span className="text-[11px] text-slate-400 font-mono tracking-wider block mt-0.5">
                                        Apellido: <strong className="text-slate-600 font-semibold uppercase">{row.apellido || "N/A"}</strong>
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-1.5 shrink-0">
                                      <span className={`text-[10px] px-2.5 py-1 font-extrabold rounded-full border uppercase tracking-wider ${vigColor}`}>
                                        {vigText}
                                      </span>
                                      {row.uid !== user?.uid && (
                                        <button
                                          type="button"
                                          onClick={() => handleDeleteUser(row.uid, row.userName || "Hermano")}
                                          className="p-1.5 text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 hover:border-red-300 rounded-lg transition-all cursor-pointer flex items-center justify-center shadow-3xs"
                                          title="Eliminar hermano permanentemente"
                                        >
                                          <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                      )}
                                    </div>
                                  </div>

                                  <div className="space-y-2 mt-4 text-xs font-sans">
                                    <div className="flex items-center gap-1.5 p-2 bg-white rounded-xl border border-[#EBE6DE]">
                                      <span className="text-slate-400 font-bold block shrink-0 text-[10px] uppercase">Clave:</span>
                                      <code className="bg-slate-100 px-2 py-0.5 rounded font-mono font-bold text-[#8B6E4E]">{row.password || "Sin clave"}</code>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          navigator.clipboard.writeText(row.password || "");
                                          alert(`Clave "${row.password}" copiada para darle al hermano.`);
                                        }}
                                        className="ml-auto text-[10px] text-slate-400 hover:text-[#5A6344] focus:outline-none uppercase inline-flex items-center gap-0.5 font-bold cursor-pointer"
                                        title="Copiar contraseña"
                                      >
                                        <span>Copiar</span>
                                      </button>
                                    </div>

                                    <div className="flex items-center justify-between text-xs text-slate-600">
                                      <span className="font-semibold text-[10px] uppercase text-slate-400">Sendero Inicial:</span>
                                      <span className="font-bold flex items-center gap-1 text-[#5A6344]">
                                        <span>{baselineRouteEmoji}</span>
                                        <span>{baselineRouteTitle}</span>
                                      </span>
                                    </div>

                                    <div className="flex items-center justify-between text-xs text-slate-600">
                                      <span className="font-semibold text-[10px] uppercase text-slate-400">Récord Fraternal:</span>
                                      <span className="text-xs text-slate-700 font-bold">
                                        🔥 {row.rachaDias || 0} racha | ⚔️ {row.desafiosSuperadosCount || 0} superados
                                      </span>
                                    </div>

                                    {row.fechaVencimiento && (
                                      <div className="flex items-center justify-between text-xs text-slate-600 border-t border-slate-200/50 pt-2">
                                        <span className="font-semibold text-[10px] uppercase text-slate-400">Expiración Prueba:</span>
                                        <span className="font-bold text-red-700 font-mono">
                                          {new Date(row.fechaVencimiento).toLocaleDateString()} {new Date(row.fechaVencimiento).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                        </span>
                                      </div>
                                    )}

                                    {/* Action to change account type */}
                                    <div className="border-t border-slate-200/50 pt-3 mt-3">
                                      <span className="block text-[10px] uppercase font-extrabold text-slate-400 tracking-wider mb-2">Asignación de Plan:</span>
                                      <div className="grid grid-cols-3 gap-1.5">
                                        <button
                                          type="button"
                                          onClick={() => handleUpdateUserPlan(row.uid, "prueba")}
                                          className={`py-2 px-1 text-[9px] font-black uppercase rounded-xl border transition-all cursor-pointer text-center whitespace-nowrap ${
                                            row.tipoCuenta === "prueba"
                                              ? "bg-amber-500 text-white border-amber-600 shadow-xs scale-98"
                                              : "bg-white text-slate-500 border-slate-200 hover:border-amber-300 hover:text-amber-700"
                                          }`}
                                          title="Prueba Temporal de 3 días"
                                        >
                                          ⏳ Prueba
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => handleUpdateUserPlan(row.uid, "pago")}
                                          className={`py-2 px-1 text-[9px] font-black uppercase rounded-xl border transition-all cursor-pointer text-center whitespace-nowrap ${
                                            row.tipoCuenta === "pago"
                                              ? "bg-emerald-600 text-white border-emerald-700 shadow-xs scale-98"
                                              : "bg-white text-slate-500 border-slate-200 hover:border-emerald-300 hover:text-emerald-700"
                                          }`}
                                          title="Pago Básico (Solo Ejercicios)"
                                        >
                                          🟢 Básico
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => handleUpdateUserPlan(row.uid, "premium")}
                                          className={`py-2 px-1 text-[9px] font-black uppercase rounded-xl border transition-all cursor-pointer text-center whitespace-nowrap ${
                                            row.tipoCuenta === "premium"
                                              ? "bg-[#5A6344] text-white border-[#484f36] shadow-xs scale-98"
                                              : "bg-white text-slate-500 border-slate-200 hover:border-[#5A6344] hover:text-[#5A6344]"
                                          }`}
                                          title="Premium (Acceso Ilimitado Completo)"
                                        >
                                          ⭐ Premium
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex justify-between items-center text-[10px] text-slate-400 mt-4 border-t border-slate-200/50 pt-3 font-mono">
                                  <span>Socio ID: {row.uid ? row.uid.substring(0, 12) : "directo"}</span>
                                  <span>
                                    {row.updatedAt 
                                      ? `Registro: ${new Date(row.updatedAt.seconds ? row.updatedAt.seconds * 1000 : (row.updatedAt._seconds ? row.updatedAt._seconds * 1000 : row.updatedAt)).toLocaleDateString()}`
                                      : "Seeding"}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="space-y-6">
                    {/* Challenge Creator Form */}
                    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xs border border-[#EBE6DE] animate-in fade-in duration-300">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-2xl">✨</span>
                        <h3 className="text-lg font-extrabold text-[#5A6344] tracking-tight">
                          Cargar Nuevo Desafío en FuerteEnCristo
                        </h3>
                      </div>
                      <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                        Redacta y carga desafíos para que los miembros de pago de la iglesia participen, acumulen puntos espirituales y compitan fraternalmente en el Ranking de la Hermandad.
                      </p>

                      <form onSubmit={handleCreateChallenge} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] uppercase font-extrabold text-slate-400 mb-1">Nombre del Desafío</label>
                            <input
                              type="text"
                              value={newChallengeTitle}
                              onChange={(e) => setNewChallengeTitle(e.target.value)}
                              placeholder="Ej: 40 Sentadillas de Valentía"
                              className="w-full bg-[#FAF7F2] p-3.5 rounded-xl border border-[#EBE6DE] text-xs font-bold text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#5A6344]"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] uppercase font-extrabold text-slate-400 mb-1">Periodicidad</label>
                            <select
                              value={newChallengeType}
                              onChange={(e) => setNewChallengeType(e.target.value as any)}
                              className="w-full bg-[#FAF7F2] p-3.5 rounded-xl border border-[#EBE6DE] text-xs font-bold text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#5A6344]"
                            >
                              <option value="diario">☀️ Desafío Diario (Rápido)</option>
                              <option value="semanal">⚔️ Desafío Semanal (Gran Esfuerzo)</option>
                              <option value="mensual">👑 Desafío Mensual (Compromiso Mayor)</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase font-extrabold text-slate-400 mb-1">Descripción / Palabra de Gozo</label>
                          <textarea
                            rows={3}
                            value={newChallengeDesc}
                            onChange={(e) => setNewChallengeDesc(e.target.value)}
                            placeholder="Ej: Dedica 40 sentadillas invocando la fortaleza del Señor. 'Pues te ceñiste de fuerzas para la batalla...' — Salmos 18:39."
                            className="w-full bg-[#FAF7F2] p-3.5 rounded-xl border border-[#EBE6DE] text-xs font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#5A6344]"
                          />
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-2 border-t border-slate-100 mt-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-500 font-bold">Puntos Espirituales:</span>
                            <input
                              type="number"
                              min={5}
                              max={100}
                              value={newChallengePoints}
                              onChange={(e) => setNewChallengePoints(Number(e.target.value) || 10)}
                              className="w-20 bg-[#FAF7F2] p-2 rounded-lg border border-[#EBE6DE] text-xs font-bold text-center text-[#5A6344]"
                            />
                          </div>

                          <button
                            type="submit"
                            disabled={isSubmittingChallenge}
                            className="w-full sm:w-auto bg-[#5A6344] hover:bg-[#484f36] text-[#FAF7F2] text-xs font-black uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-50"
                          >
                            {isSubmittingChallenge ? "Publicando..." : "Publicar Desafío Activo 🚀"}
                          </button>
                        </div>

                        {challengeSuccessMsg && (
                          <div className="bg-emerald-50 text-emerald-800 text-xs p-3 rounded-lg border border-emerald-200 mt-2 font-bold flex items-center gap-2">
                            <span>✅</span> <span>{challengeSuccessMsg}</span>
                          </div>
                        )}
                        {challengeErrorMsg && (
                          <div className="bg-red-50 text-red-800 text-xs p-3 rounded-lg border border-red-200 mt-2 font-bold flex items-center gap-2">
                            <span>⚠️</span> <span>{challengeErrorMsg}</span>
                          </div>
                        )}
                      </form>
                    </div>

                    {/* Published list */}
                    <div className="space-y-6">
                      <div className="bg-white rounded-3xl p-6 shadow-xs border border-[#EBE6DE] animate-in fade-in duration-300">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-extrabold text-[#5A6344] text-xs uppercase tracking-wider">
                            🛡️ Desafíos Activos / Vigentes en FuerteEnCristo ({activeChallenges.length})
                          </h3>
                          <button
                            type="button"
                            onClick={fetchChallengesList}
                            className="text-[10px] text-slate-500 hover:text-[#5A6344] flex items-center gap-1 font-bold underline focus:outline-none"
                          >
                            <RefreshCw className="w-3 h-3" /> Sincronizar
                          </button>
                        </div>

                        {isLoadingChallenges ? (
                          <p className="text-xs text-center py-6 text-slate-500 font-semibold italic">Sincronizando con Firestore...</p>
                        ) : activeChallenges.length === 0 ? (
                          <div className="text-center py-12 text-slate-400">
                            <span className="text-4xl block mb-2 font-serif">⚡</span>
                            <p className="text-xs font-semibold">No hay desafíos vigentes creados o todos han vencido cronológicamente.</p>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {activeChallenges.map((ch) => (
                              <div key={ch.id} className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#EBE6DE] flex flex-col justify-between hover:border-slate-300 transition-colors">
                                <div>
                                  <div className="flex justify-between items-center mb-2">
                                    <span className={`text-[9px] uppercase font-black px-2.5 py-1 rounded-full border ${
                                      ch.tipo === "diario" 
                                        ? "bg-amber-50 text-amber-800 border-amber-200" 
                                        : ch.tipo === "semanal"
                                        ? "bg-indigo-50 text-indigo-800 border-indigo-200"
                                        : "bg-purple-50 text-purple-800 border-purple-200"
                                    }`}>
                                      {ch.tipo === "diario" ? "☀️ Diario" : ch.tipo === "semanal" ? "⚔️ Semanal" : "👑 Mensual"}
                                    </span>
                                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-100">
                                      🪙 {ch.puntos || 10} pts
                                    </span>
                                  </div>
                                  <h4 className="font-extrabold text-sm text-[#5A6344]">{ch.titulo}</h4>
                                  <p className="text-xs text-slate-600 mt-2 leading-relaxed italic">
                                    "{ch.descripcion}"
                                  </p>
                                </div>

                                <div className="flex justify-between items-center border-t border-slate-200/50 pt-3 mt-4 text-[10px]">
                                  <div className="flex flex-col text-left">
                                    <span className="text-slate-400 text-[9px] font-mono">
                                      Publicado: {ch.createdAt ? new Date(ch.createdAt).toLocaleDateString() : "Justo ahora"}
                                    </span>
                                    {ch.tipo === "semanal" && ch.createdAt && (
                                      <span className="text-red-500 font-extrabold text-[8px] uppercase tracking-wider">
                                        Vence Sábado: {new Date(getSaturdayDeadlineOf(ch.createdAt)).toLocaleDateString()}
                                      </span>
                                    )}
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteChallenge(ch.id)}
                                    className="text-red-500 hover:text-red-700 font-bold uppercase cursor-pointer"
                                    title="Eliminar este desafío"
                                  >
                                    ❌ Eliminar
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Historial de Desafíos Vencidos */}
                      <div className="bg-white rounded-3xl p-6 shadow-xs border border-[#EBE6DE] animate-in fade-in duration-300">
                        <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-3">
                          <div>
                            <h3 className="font-extrabold text-[#5A6344] text-xs uppercase tracking-wider">
                              ⏳ Historial de Desafíos Vencidos / Archivados ({expiredChallenges.length})
                            </h3>
                            <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Archivo de desafíos y hazañas concluidas por tiempo.</p>
                          </div>
                        </div>

                        {isLoadingChallenges ? (
                          <p className="text-xs text-center py-6 text-slate-500 font-semibold italic">Sincronizando archivo...</p>
                        ) : expiredChallenges.length === 0 ? (
                          <div className="text-center py-10 text-slate-400">
                            <span className="text-3xl block mb-1">⏳</span>
                            <p className="text-xs font-semibold">No hay desafíos archivados por expiración en este momento.</p>
                          </div>
                        ) : (
                          <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs border-collapse">
                              <thead>
                                <tr className="border-b border-[#EBE6DE] text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                                  <th className="py-3 px-2">Publicado</th>
                                  <th className="py-3 px-2">Frecuencia</th>
                                  <th className="py-3 px-2">Nombre / Desafío</th>
                                  <th className="py-3 px-2 text-center">Completados</th>
                                  <th className="py-3 px-2 text-right">Acciones</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                {expiredChallenges.map((ch) => {
                                  const completions = getChallengeCompletionsCount(ch.id);
                                  return (
                                    <tr key={ch.id} className="hover:bg-slate-50/50 transition-colors">
                                      <td className="py-3.5 px-2 font-mono text-[10px] text-slate-500">
                                        {ch.createdAt ? new Date(ch.createdAt).toLocaleDateString() : "Justo ahora"}
                                      </td>
                                      <td className="py-3.5 px-2">
                                        <span className={`text-[8px] uppercase font-black px-2 py-0.5 rounded-full border ${
                                          ch.tipo === "diario" 
                                            ? "bg-amber-50 text-amber-800 border-amber-200" 
                                            : ch.tipo === "semanal"
                                            ? "bg-indigo-50 text-indigo-800 border-indigo-200"
                                            : "bg-purple-50 text-purple-800 border-purple-200"
                                        }`}>
                                          {ch.tipo === "diario" ? "☀️ Diario" : ch.tipo === "semanal" ? "⚔️ Semanal" : "👑 Mensual"}
                                        </span>
                                      </td>
                                      <td className="py-3.5 px-2">
                                        <span className="font-extrabold text-[#5A6344] block">{ch.titulo}</span>
                                        <span className="text-[10px] text-slate-500 italic block line-clamp-1 max-w-sm">"{ch.descripcion}"</span>
                                      </td>
                                      <td className="py-3.5 px-2 text-center">
                                        <span className="font-black text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded-lg text-[10px]">
                                          👥 {completions} {completions === 1 ? "Hermano" : "Hermanos"}
                                        </span>
                                      </td>
                                      <td className="py-3.5 px-2 text-right">
                                        <button
                                          type="button"
                                          onClick={() => handleDeleteChallenge(ch.id)}
                                          className="text-red-500 hover:text-red-700 font-extrabold uppercase text-[9px] cursor-pointer"
                                        >
                                          Borrar
                                        </button>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                {/* Master quick toggle banner */}
                {isMasterUser(user) && (
                  <div className="bg-amber-500/10 border-2 border-dashed border-amber-500/35 p-4 rounded-3xl mb-8 flex flex-col sm:flex-row justify-between items-center gap-4 animate-in fade-in duration-300">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">👀</span>
                      <div>
                        <h4 className="font-extrabold text-amber-800 text-sm">Vista de Alumno/Hermano Activa</h4>
                        <p className="text-xs text-amber-700/90 leading-relaxed font-semibold">
                          Como instructor principal, aquí puedes ver y testear los ejercicios tal cual los visualizan tus alumnos.
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveAdminTab("socios")}
                      className="w-full sm:w-auto bg-[#5A6344] hover:bg-[#484f36] active:scale-95 text-white font-extrabold text-xs uppercase px-5 py-3 rounded-xl transition-all shadow-md cursor-pointer border border-[#484f36] focus:outline-none"
                    >
                      🛡️ Volver al Panel Master
                    </button>
                  </div>
                )}

                {/* Visual Tab Bar Selector for All Customers (Premium features active for pago/max, teased for trial) */}
                <div className="flex bg-white p-1 rounded-2xl border border-[#D9D3C7] shadow-xs max-w-xl mx-auto gap-1 mb-8 animate-in fade-in duration-300">
                  <button
                    type="button"
                    onClick={() => setActiveDashboardTab("plan")}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-3 px-3 text-xs md:text-sm font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer focus:outline-none ${
                      activeDashboardTab === "plan"
                        ? "bg-[#5A6344] text-[#FAF7F2] shadow-sm"
                        : "text-slate-500 hover:text-[#5A6344] hover:bg-slate-50"
                    }`}
                  >
                    📖 Mi Plan
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveDashboardTab("desafios")}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-3 px-3 text-xs md:text-sm font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer focus:outline-none ${
                      activeDashboardTab === "desafios"
                        ? "bg-[#5A6344] text-[#FAF7F2] shadow-sm"
                        : "text-slate-500 hover:text-[#5A6344] hover:bg-slate-50"
                    }`}
                  >
                    ⚔️ Desafíos
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveDashboardTab("ranking")}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-3 px-3 text-xs md:text-sm font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer focus:outline-none ${
                      activeDashboardTab === "ranking"
                        ? "bg-[#5A6344] text-[#FAF7F2] shadow-sm"
                        : "text-slate-500 hover:text-[#5A6344] hover:bg-slate-50"
                    }`}
                  >
                    🏆 Ranking
                  </button>
                </div>

                {/* If typical trial user or standard paid user tries to access premium sections, show preeminent padlocked upsell card */}
                {activeDashboardTab !== "plan" && user?.tipoCuenta !== "premium" && !isMasterUser(user) ? (
                  <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-[#D9D3C7] text-center max-w-2xl mx-auto space-y-6 animate-in fade-in duration-300 my-8">
                    <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center text-3xl border border-amber-200 mx-auto animate-bounce">
                      ⭐
                    </div>
                    
                    <h3 className="text-2xl font-black text-[#5A6344] tracking-tight">
                      Módulo Exclusivo para Clientes Premium
                    </h3>
                    
                    <p className="text-sm font-serif italic text-slate-600 leading-relaxed max-w-md mx-auto">
                      "Mas el fin de todas las cosas se acerca; sed, pues, sobrios, y velad en oración." — 1 Pedro 4:7
                    </p>
                    
                    <div className="p-5 bg-[#FAF7F2] rounded-2xl text-left border border-[#D9D3C7] space-y-3">
                      <h4 className="font-extrabold text-[#8B6E4E] text-xs uppercase tracking-wide">
                        🌟 Beneficios Premium de FuerteEnCristo:
                      </h4>
                      <ul className="text-xs text-slate-600 space-y-2">
                        <li className="flex items-center gap-1.5">
                          <span className="text-[#5A6344]">⚔️</span> <span><strong>Desafíos Diarios y Semanales</strong> para retar tu mente, cuerpo y espíritu con reflexiones y metas concretas.</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <span className="text-[#5A6344]">🏆</span> <span><strong>Ranking de la Hermandad (Leaderboard)</strong> para competir fraternalmente, manteniendo la constancia con rachas y desafíos superados.</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <span className="text-[#5A6344]">🔥</span> <span><strong>Motivación Constante</strong> para vencer la procrastinación en comunidad con otros siervos perseverantes.</span>
                        </li>
                      </ul>
                    </div>

                    <p className="text-xs text-slate-400">
                      {user?.tipoCuenta === "pago" ? (
                        <span>Tu cuenta actual es el <strong>Plan Básico (Solo Ejercicios)</strong>. Para habilitar los Desafíos y el Ranking de la Hermandad, por favor comunícate con el instructor principal (Max) para actualizar a un plan <strong>Premium</strong>.</span>
                      ) : (
                        <span>Tu cuenta actual es una <strong>Prueba Temporal de 3 Días</strong>. Para habilitar los Desafíos y el Ranking de la Hermandad, por favor comunícate con el instructor principal (Max) para activar tu plan <strong>Premium</strong> ilimitado.</span>
                      )}
                    </p>
                  </div>
                ) : null}

                {/* Challenges active layout for premium/max */}
                {activeDashboardTab === "desafios" && (user?.tipoCuenta === "premium" || isMasterUser(user)) && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    
                    {/* Check-In Racha block */}
                    <div className="bg-gradient-to-r from-amber-500/10 to-amber-600/5 p-6 rounded-3xl border border-amber-200/60 flex flex-col sm:flex-row justify-between items-center gap-4">
                      <div className="flex items-center gap-4">
                        <span className="text-4xl animate-pulse">🔥</span>
                        <div>
                          <h3 className="font-black text-base text-[#8B6E4E]">Racha del Espíritu Santo</h3>
                          <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                            Llevas <span className="text-[#8B6E4E] text-sm font-extrabold">{user?.rachaDias || 0}</span> {user?.rachaDias === 1 ? "día seguido" : "días seguidos"} reportando tu sudor y devocional.
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleRegisterDailyStreak}
                        className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-[#FAF7F2] text-xs font-black uppercase tracking-wider py-3.5 px-6 rounded-xl shadow-xs cursor-pointer transition-colors"
                      >
                        🔥 Reportar Sudor y Fe de Hoy
                      </button>
                    </div>

                    {/* Challenges active layout */}
                    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xs border border-[#EBE6DE] space-y-6">
                      <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                        <div>
                          <h3 className="text-lg font-extrabold text-[#5A6344] tracking-tight">Desafíos Disponibles</h3>
                          <p className="text-xs text-slate-500">Supera desafíos espirituales y físicos para acumular constancia en el Ranking.</p>
                        </div>
                        <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                          ⚔️ {user?.desafiosSuperadosCount || 0} completados
                        </span>
                      </div>

                      {activeChallenges.length === 0 ? (
                        <div className="text-center py-12 text-slate-400">
                          <span className="text-4xl block mb-2 font-serif">⚔️</span>
                          <p className="text-xs font-semibold">No hay desafíos activos en este momento. El pastor Max cargará más pronto.</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {activeChallenges.map((ch) => {
                            const isCompleted = (user?.desafiosCompletadosIds || []).includes(ch.id);
                            return (
                              <div 
                                key={ch.id} 
                                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                                  isCompleted 
                                    ? "bg-slate-50/70 border-slate-200/50 opacity-80" 
                                    : "bg-[#FAF7F2] border-[#EBE6DE] hover:border-slate-300"
                                }`}
                              >
                                <div>
                                  <div className="flex justify-between items-center mb-2">
                                    <span className={`text-[9px] uppercase font-black px-2.5 py-1 rounded-full border ${
                                      ch.tipo === "diario" 
                                        ? "bg-amber-50 text-amber-800 border-amber-200" 
                                        : ch.tipo === "semanal"
                                        ? "bg-indigo-50 text-indigo-800 border-indigo-200"
                                        : "bg-purple-50 text-purple-800 border-purple-200"
                                    }`}>
                                      {ch.tipo === "diario" ? "☀️ Diario" : ch.tipo === "semanal" ? "⚔️ Semanal" : "👑 Mensual"}
                                    </span>
                                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-100">
                                      🪙 {ch.puntos || 10} pts
                                    </span>
                                  </div>
                                  <h4 className="font-extrabold text-[#5A6344] text-sm">{ch.titulo}</h4>
                                  <p className="text-xs text-slate-600 mt-2 leading-relaxed italic">
                                    "{ch.descripcion}"
                                  </p>
                                </div>

                                <div className="border-t border-slate-200/40 pt-3 mt-4 flex items-center justify-between">
                                  <div className="flex flex-col text-left">
                                    <span className="text-[9px] text-slate-400">
                                      Publicado: {ch.createdAt ? new Date(ch.createdAt).toLocaleDateString() : "Reciente"}
                                    </span>
                                    {ch.tipo === "semanal" && ch.createdAt && (
                                      <span className="text-red-500 font-extrabold text-[8px] uppercase tracking-wider">
                                        Vence Sábado: {new Date(getSaturdayDeadlineOf(ch.createdAt)).toLocaleDateString()}
                                      </span>
                                    )}
                                  </div>

                                  {isCompleted ? (
                                    <span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-lg font-bold flex items-center gap-1 uppercase">
                                      ✨ ¡SUPERADO!
                                    </span>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={() => handleCompleteChallenge(ch.id)}
                                      className="bg-[#5A6344] hover:bg-[#484f36] text-[#FAF7F2] text-[10px] uppercase font-black tracking-wider px-3.5 py-1.5 rounded-lg shadow-3xs cursor-pointer transition-colors"
                                    >
                                      ✅ Marcar Superado
                                    </button>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Historial de Desafíos Concluidos / Vencidos for the user */}
                      <div className="border-t border-slate-100 pt-6 mt-8">
                        <div className="mb-4">
                          <h4 className="text-sm font-extrabold text-[#5A6344] uppercase tracking-wider flex items-center gap-1.5">
                            ⏳ Historial de Desafíos Vencidos ({expiredChallenges.length})
                          </h4>
                          <p className="text-xs text-slate-400">Mira las glorias y hazañas concluidas por nuestra hermandad.</p>
                        </div>

                        {expiredChallenges.length === 0 ? (
                          <div className="text-center py-6 text-slate-400 text-xs italic">
                            No hay desafíos concluidos en el archivo histórico todavía.
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {expiredChallenges.map((ch) => {
                              const isCompleted = (user?.desafiosCompletadosIds || []).includes(ch.id);
                              const completionsCount = getChallengeCompletionsCount(ch.id);
                              return (
                                <div 
                                  key={ch.id} 
                                  className="p-4 rounded-xl border border-dashed border-slate-200 bg-[#FAF7F2]/50 flex flex-col justify-between opacity-85"
                                >
                                  <div>
                                    <div className="flex justify-between items-center mb-1.5">
                                      <span className={`text-[8px] uppercase font-black px-2 py-0.5 rounded-full border ${
                                        ch.tipo === "diario" 
                                          ? "bg-amber-50 text-amber-800 border-amber-200" 
                                          : ch.tipo === "semanal"
                                          ? "bg-indigo-50 text-indigo-800 border-indigo-200"
                                          : "bg-purple-50 text-purple-800 border-purple-200"
                                      }`}>
                                        {ch.tipo === "diario" ? "☀️ Diario" : ch.tipo === "semanal" ? "⚔️ Semanal" : "👑 Mensual"}
                                      </span>
                                      <span className="text-[10px] font-bold text-[#5A6344]">
                                        🪙 +{ch.puntos || 10} pts
                                      </span>
                                    </div>
                                    <h5 className="font-bold text-[#5A6344] text-xs">{ch.titulo}</h5>
                                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 italic leading-relaxed">
                                      "{ch.descripcion}"
                                    </p>
                                  </div>

                                  <div className="border-t border-slate-200/50 pt-2.5 mt-3 flex items-center justify-between text-[10px]">
                                    <span className="text-[9px] text-slate-400">
                                      Publicado el: {ch.createdAt ? new Date(ch.createdAt).toLocaleDateString() : "Pasado"}
                                    </span>
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-[9px] bg-slate-200/65 text-slate-600 px-2 py-0.5 rounded-md font-extrabold uppercase">
                                        👥 {completionsCount} {completionsCount === 1 ? "Hermano" : "Hermanos"}
                                      </span>
                                      {isCompleted ? (
                                        <span className="text-[9px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-md font-bold uppercase">
                                          Amén 🙏
                                        </span>
                                      ) : (
                                        <span className="text-[9px] bg-slate-100 text-slate-400 px-2 py-0.5 rounded-md font-bold uppercase">
                                          No participado
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Ranking active layout for premium/max */}
                {activeDashboardTab === "ranking" && (user?.tipoCuenta === "premium" || isMasterUser(user)) && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xs border border-[#EBE6DE]">
                      
                      <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-4">
                        <div>
                          <h3 className="text-lg font-extrabold text-[#5A6344] tracking-tight">🏆 Ranking de la Hermandad</h3>
                          <p className="text-xs text-slate-500">Mantenemos una competencia sana y fraternal para perseverar en el templo del Señor.</p>
                        </div>
                        <button
                          type="button"
                          onClick={fetchRegisteredUsers}
                          className="flex items-center gap-1 py-1.5 px-3 bg-[#FAF7F2] border border-[#EBE6DE] rounded-xl text-xs text-slate-500 hover:text-[#5A6344] font-bold cursor-pointer"
                        >
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Actualizar
                        </button>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b border-[#EBE6DE] text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                              <th className="py-3 px-3">Lugar</th>
                              <th className="py-3 px-3">Hermano/a</th>
                              <th className="py-3 px-3 text-center">Racha Actual 🔥</th>
                              <th className="py-3 px-3 text-right">Desafíos Superados ⚔️</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(() => {
                              const rankingUsers = [...registeredUsersList];
                              rankingUsers.sort((a, b) => {
                                const countA = a.desafiosSuperadosCount || 0;
                                const countB = b.desafiosSuperadosCount || 0;
                                if (countB !== countA) return countB - countA;
                                return (b.rachaDias || 0) - (a.rachaDias || 0);
                              });

                              return rankingUsers.map((u, i) => {
                                let badge = "";
                                if (i === 0) badge = "🥇";
                                else if (i === 1) badge = "🥈";
                                else if (i === 2) badge = "🥉";
                                else badge = `${i + 1}º`;

                                const isSelf = u.uid === user?.uid;

                                return (
                                  <tr 
                                    key={u.uid || i} 
                                    className={`border-b border-slate-100 text-xs font-semibold ${
                                      isSelf ? "bg-[#5A6344]/5 font-bold text-[#5A6344]" : "text-slate-700"
                                    }`}
                                  >
                                    <td className="py-3.5 px-3 font-black text-center text-sm w-12">{badge}</td>
                                    <td className="py-3.5 px-3">
                                      <div className="flex items-center gap-2">
                                        <span className="font-extrabold text-sm">{u.userName || "Siervo Fiel"}</span>
                                        {isSelf && (
                                          <span className="text-[9px] bg-[#5A6344]/20 text-[#5A6344] px-1.5 py-0.5 rounded uppercase font-black tracking-wider">
                                            Tú
                                          </span>
                                        )}
                                      </div>
                                      <span className="text-[9px] text-slate-400 capitalize block font-mono mt-0.5">
                                        Sendero: {u.selectedRouteType || "suave"}
                                      </span>
                                    </td>
                                    <td className="py-3.5 px-3 text-center text-amber-600 font-extrabold text-sm">
                                      🔥 {u.rachaDias || 0} {u.rachaDias === 1 ? "día" : "días"}
                                    </td>
                                    <td className="py-3.5 px-3 text-right text-emerald-700 font-extrabold text-sm">
                                      ⚔️ {u.desafiosSuperadosCount || 0} completados
                                    </td>
                                  </tr>
                                );
                              });
                            })()}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* Main Client Workout Route & Routine Plans ONLY shown when "plan" tab is selected */}
                {activeDashboardTab === "plan" && (
                  <>
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

            {/* PASTORAL SCOLDING BOX ("REGAÑO") */}
            {showRegaño && missedDaysCount > 0 && (
              <div className="mb-6 p-5 bg-amber-50/70 border-2 border-dashed border-[#D9B99B] rounded-3xl text-[#5A4B3A] shadow-xs relative overflow-hidden animate-shake">
                <div className="absolute top-[-20%] right-[-10%] w-[120px] h-[120px] bg-[#D9B99B]/10 rounded-full blur-xl pointer-events-none" />
                <div className="flex gap-4 items-start z-10 relative">
                  <span className="text-3xl shrink-0">🐑</span>
                  <div className="flex-1">
                    <h4 className="font-extrabold text-xs sm:text-sm text-[#8B6E4E] uppercase tracking-wider flex items-center gap-2">
                      ¡Llamado Pastoral a la Disciplina! 
                      <span className="text-[10px] bg-[#8B6E4E]/10 text-[#8B6E4E] px-2 py-0.5 rounded-full font-bold">
                        {missedDaysCount === 1 ? "1 Día ausente" : `${missedDaysCount} Días ausentes`}
                      </span>
                    </h4>
                    <p className="text-xs mt-1.5 leading-relaxed font-serif italic text-slate-700">
                      "Hno/a. {userName || "Fiel"}, hemos notado que faltaste a tu templo corporal por {missedDaysCount === 1 ? "un día" : `${missedDaysCount} días`} de ejercicio previstos. 
                      Recuerda que de Lunes a Sábado entrenamos el cuerpo que el Señor nos prestó para servirle con gozo y perseverancia. 
                      El Domingo tienes tu descanso libre bien merecido para regocijar el alma, ¡pero los demás días hay que sudar la gota gorda con fe!"
                    </p>
                    <p className="text-[11px] font-bold text-[#5A6344] mt-2 font-sans uppercase tracking-wide">
                      — Tu instructor de salud de la iglesia
                    </p>
                  </div>
                  <button 
                    onClick={() => setShowRegaño(false)} 
                    className="text-xs text-slate-400 hover:text-slate-600 font-bold p-1 px-2 bg-white rounded-lg border border-slate-200 shadow-2xs hover:shadow-xs transition-all shrink-0 cursor-pointer"
                    title="Aceptar regaño y entrenar"
                  >
                    Entendido, ¡voy a entrenar!
                  </button>
                </div>
              </div>
            )}

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
                      const isToday = getSpanishDayName() === item.dia;
                      
                      let dayStyle = "bg-[#F3F1ED] text-slate-800 border-transparent hover:bg-slate-200/60";
                      if (isSelected) {
                        dayStyle = "bg-[#5A6344] text-[#FAF7F2] font-semibold scale-[1.01] ring-1 ring-[#D9B99B]";
                      } else if (isSunday) {
                        dayStyle = "bg-[#D9B99B]/25 text-[#8B6E4E] border border-[#D9B99B]/35 hover:bg-[#D9B99B]/35";
                      } else if (isSaturday) {
                        dayStyle = "bg-[#5A6344]/10 text-[#5A6344] border border-[#5A6344]/20 hover:bg-[#5A6344]/15";
                      }

                      let heartbeatClass = "";
                      if (isToday) {
                        heartbeatClass = "animate-heartbeat ring-2 ring-[#5A6344]/40";
                        if (isSelected) {
                          heartbeatClass = "animate-heartbeat ring-2 ring-[#D9B99B]";
                        }
                      }

                      return (
                        <div
                          key={index}
                          onClick={() => setSelectedDay(item.dia)}
                          className={`p-3 rounded-2xl cursor-pointer transition-all flex justify-between items-center ${dayStyle} ${heartbeatClass}`}
                        >
                          <div>
                            <span className="text-xs font-bold block flex items-center gap-1.5">
                              {item.dia} 
                              {isToday && (
                                <span className="text-[9px] bg-red-500 text-white px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider flex items-center gap-0.5 shadow-2xs">
                                  <span>HOY</span>
                                  <span>❤️</span>
                                </span>
                              )}
                            </span>
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

                <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-2 items-center justify-between text-xs text-slate-500">
                  <span>Presiona los círculos para marcar tus completados manuales</span>
                  <div className="flex gap-2 items-center">
                    <button 
                      onClick={() => {
                        setMissedDaysCount(2);
                        setShowRegaño(true);
                      }}
                      className="text-[#8B6E4E] hover:text-[#725a40] font-bold text-[10px] bg-[#FAF7F2] border border-[#EBE6DE] px-2 py-1 rounded-lg cursor-pointer transition-colors"
                      title="Simular que te ausentaste por 2 días de entrenamiento"
                    >
                      🧪 Probar Regaño
                    </button>
                    <button 
                      onClick={() => setCheckedExercises({})}
                      className="text-[#8B6E4E] hover:underline font-bold uppercase text-[10px] cursor-pointer"
                    >
                      Reset Checkboxes
                    </button>
                  </div>
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
          </>
        )}

      </>
    )}
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
                 {/* <button
                    type="button"
                    onClick={handleRestartAll}
                    className="bg-[#F3F1ED] hover:bg-slate-200 text-slate-800 font-bold text-xs px-5 py-3 rounded-xl cursor-pointer transition-all"
                  >
                    Salir al Inicio
                  </button>*/}
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

      {/* ----------------- PWA MANUAL INSTALL INSTRUCTIONS MODAL ----------------- */}
      {showInstallHelp && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 md:p-8 shadow-2xl border border-[#EBE6DE] animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-5">
              <span className="text-4xl">📲</span>
              <h3 className="text-xl md:text-2xl font-extrabold text-[#5A6344] mt-3">Instalar Fuerte en Cristo</h3>
              <p className="text-xs text-slate-500 mt-1">Cómo tener la app con icono en tu pantalla de inicio o escritorio</p>
            </div>

            {/* Crucial Context/Iframe Alert */}
            <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl mb-4 text-xs text-slate-700 leading-relaxed">
              <div className="flex gap-2 items-start">
                <span className="text-lg">⚠️</span>
                <div>
                  <strong className="text-amber-800 font-bold block mb-0.5">¿Estás en WhatsApp, Instagram o en la vista previa?</strong>
                  Los botones de instalación rápida **no funcionan** dentro de marcos o navegadores internos (como las vistas previas de chats o de AI Studio). 
                  ¡Es súper fácil de resolver! Copia el enlace abajo y pégalo directamente en **Google Chrome** (Android) o **Safari** (iPhone).
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyLink}
                className="mt-3 w-full flex items-center justify-center gap-2 py-2 px-3 bg-amber-500 hover:bg-amber-600 text-white text-xs font-black rounded-xl shadow-xs transition-all cursor-pointer active:scale-95"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedLink ? "¡ENLACE COPIADO! 📋 Pégalo en tu navegador" : "COPIAR ENLACE DE LA APP"}</span>
              </button>
            </div>

            <div className="space-y-3.5 text-xs text-slate-700 leading-relaxed font-sans">
              
              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EBE6DE]">
                <strong className="block text-[#5A6344] text-[11px] font-bold uppercase mb-1">Celulares Android (Google Chrome)</strong>
                <p className="text-[11px] text-slate-600">
                  Una vez que estés en el navegador Chrome real:
                  <br />
                  1. Toca los tres puntos <strong className="font-bold">⋮</strong> arriba a la derecha.
                  <br />
                  2. Elige <strong className="font-semibold">"Instalar aplicación"</strong> o <strong className="font-semibold">"Agregar a la pantalla principal"</strong>.
                </p>
              </div>

              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EBE6DE]">
                <strong className="block text-[#8B6E4E] text-[11px] font-bold uppercase mb-1">iPhone e iPad (Safari)</strong>
                <p className="text-[11px] text-slate-600">
                  Apple no permite la instalación automática desde la página web, debes hacerlo manualmente:
                  <br />
                  1. Abre el enlace en el navegador **Safari**.
                  <br />
                  2. Toca el botón **Compartir** 📤 (el cuadro con flecha arriba en la barra inferior).
                  <br />
                  3. Selecciona la opción <strong className="font-semibold text-amber-800">"Agregar al inicio"</strong> o <strong className="font-semibold text-amber-800">"Add to Home Screen"</strong>.
                </p>
              </div>

              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EBE6DE]">
                <strong className="block text-[#8B6E4E] text-[11px] font-bold uppercase mb-1">Ventajas de tener la App instalada</strong>
                <ul className="list-disc pl-4 text-[10px] space-y-0.5 mt-1 font-medium text-slate-600">
                  <li>Un hermoso icono en tu pantalla sin ocupar espacio de almacenamiento.</li>
                  <li>Inicios súper rápidos sin las barras ni pestañas del navegador.</li>
                  <li>Mayor fluidez para realizar tus rutinas diarias de fe y fitness.</li>
                </ul>
              </div>

            </div>

            <button
              type="button"
              onClick={() => setShowInstallHelp(false)}
              className="mt-5 w-full bg-[#5A6344] hover:bg-[#484f36] text-[#FAF7F2] font-extrabold text-sm py-2.5 rounded-2xl shadow-md transition-all cursor-pointer text-center"
            >
              ¡Entendido, muchas gracias!
            </button>
          </div>
        </div>
      )}
      {/* ----------------- MASTER: CARGAR NUEVA PERSONA MODAL ----------------- */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-[#EBE6DE] animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🛡️</span>
                <h3 className="text-lg md:text-xl font-extrabold text-[#5A6344]">Registrar Nueva Persona</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddUserModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
                title="Cerrar"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500 mb-5 leading-relaxed">
              Como administrador (Max), carga los datos de fe de un nuevo hermano para que pueda iniciar sesión con su apellido y contraseña secreta.
            </p>

            {addUserSuccess && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-2xl mb-4 leading-relaxed font-semibold">
                {addUserSuccess}
              </div>
            )}

            {addUserError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-2xl mb-4 leading-relaxed font-semibold">
                {addUserError}
              </div>
            )}

            <form onSubmit={handleAddUserSubmit} className="space-y-4">
              {/* Apellido */}
              <div>
                <label className="block text-xs font-bold text-slate-700 tracking-wider uppercase mb-1">
                  1. Apellido Paterno (Usuario de ingreso):
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Gomez (sin tildes para facilitarle el ingreso)"
                  value={newUserApellido}
                  onChange={(e) => setNewUserApellido(e.target.value)}
                  className="w-full bg-[#FAF7F2] border-2 border-[#EBE6DE] rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-[#5A6344] focus:ring-1 focus:ring-[#5A6344]"
                />
                <span className="text-[10px] text-slate-400 block mt-1">Este campo se normaliza automáticamente al guardar. Sencillo e intuitivo.</span>
              </div>

              {/* Display Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 tracking-wider uppercase mb-1">
                  2. Nombre de pila o fe (Cómo se mostrará):
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Hermano Mario, Abuela Marta"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="w-full bg-[#FAF7F2] border-2 border-[#EBE6DE] rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-[#5A6344] focus:ring-1 focus:ring-[#5A6344]"
                />
              </div>

              {/* Secret password */}
              <div>
                <label className="block text-xs font-bold text-slate-700 tracking-wider uppercase mb-1">
                  3. Clave Secreta de Ingreso:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. fiel321"
                  value={newUserPassword}
                  onChange={(e) => setNewUserPassword(e.target.value)}
                  className="w-full bg-[#FAF7F2] border-2 border-[#EBE6DE] rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-[#5A6344] focus:ring-1 focus:ring-[#5A6344]"
                />
              </div>

              {/* Initial Route Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 tracking-wider uppercase mb-1 font-semibold">
                  4. Sendero de Entrenamiento Base:
                </label>
                <select
                  value={newUserRoute}
                  onChange={(e: any) => setNewUserRoute(e.target.value)}
                  className="w-full bg-[#FAF7F2] border-2 border-[#EBE6DE] rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-[#5A6344] focus:ring-1 focus:ring-[#5A6344] text-slate-700"
                >
                  <option value="suave">Sendero Súper Suave (Silla y apoyo)</option>
                  <option value="rodillas">Cuidado de Rodillas y Espalda (Cero impacto)</option>
                  <option value="fuerza">Siervo Activo y Fuerte (Fuerza general)</option>
                  <option value="legendario">Sendero Legendario (Montañismo y resistencia)</option>
                </select>
              </div>

              {/* Account Type Option */}
              <div>
                <label className="block text-xs font-bold text-slate-700 tracking-wider uppercase mb-1.5">
                  5. Tipo de Vigencia / Suscripción:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <label className={`border-2 p-3 rounded-xl flex items-center gap-2 cursor-pointer transition-colors ${
                    newUserAccountType === "prueba" 
                      ? "border-amber-500 bg-amber-50/40 text-amber-900" 
                      : "border-slate-200 hover:border-slate-300 text-slate-600"
                  }`}>
                    <input
                      type="radio"
                      name="newUserAccountType"
                      value="prueba"
                      checked={newUserAccountType === "prueba"}
                      onChange={() => setNewUserAccountType("prueba")}
                      className="accent-[#5A6344]"
                    />
                    <div className="text-left">
                      <span className="block text-[10px] font-extrabold uppercase">Prueba (3d)</span>
                      <span className="text-[9px] text-slate-500 block leading-tight">Vence en 3 Días</span>
                    </div>
                  </label>

                  <label className={`border-2 p-3 rounded-xl flex items-center gap-2 cursor-pointer transition-colors ${
                    newUserAccountType === "pago" 
                      ? "border-emerald-600 bg-emerald-50/20 text-emerald-900" 
                      : "border-slate-200 hover:border-slate-300 text-slate-600"
                  }`}>
                    <input
                      type="radio"
                      name="newUserAccountType"
                      value="pago"
                      checked={newUserAccountType === "pago"}
                      onChange={() => setNewUserAccountType("pago")}
                      className="accent-[#5A6344]"
                    />
                    <div className="text-left">
                      <span className="block text-[10px] font-extrabold uppercase">Pago Básico</span>
                      <span className="text-[9px] text-slate-500 block leading-tight">Solo Ejercicios</span>
                    </div>
                  </label>

                  <label className={`border-2 p-3 rounded-xl flex items-center gap-2 cursor-pointer transition-colors ${
                    newUserAccountType === "premium" 
                      ? "border-[#5A6344] bg-[#5A6344]/5 text-[#5A6344]" 
                      : "border-slate-200 hover:border-slate-300 text-slate-600"
                  }`}>
                    <input
                      type="radio"
                      name="newUserAccountType"
                      value="premium"
                      checked={newUserAccountType === "premium"}
                      onChange={() => setNewUserAccountType("premium")}
                      className="accent-[#5A6344]"
                    />
                    <div className="text-left">
                      <span className="block text-[10px] font-extrabold uppercase">Premium ⭐</span>
                      <span className="text-[9px] text-slate-500 block leading-tight">Acceso Completo</span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isAddingUser}
                  className="w-full bg-[#5A6344] hover:bg-[#484f36] disabled:bg-slate-300 text-[#FAF7F2] font-extrabold text-sm py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isAddingUser ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Registrando Hermano...</span>
                    </>
                  ) : (
                    <span>Registrar e Integrar a la Iglesia</span>
                  )}
                </button>
              </div>

              <div className="text-center mt-2">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="text-xs text-slate-400 hover:text-slate-600 underline"
                >
                  Cerrar ventana
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}

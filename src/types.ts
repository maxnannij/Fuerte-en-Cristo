export interface WeeklyDayPlan {
  dia: string;
  tipoActividad: string;
  duracion_minutos: number;
  descripcion: string;
}

export interface ExerciseItem {
  nombre: string;
  instrucciones: string;
  series: number;
  repeticiones_o_tiempo: string;
  descanso_s_entre_series: number;
}

export interface TodayWorkout {
  nombreDia: string;
  enfoqueMentalEspiritual: string;
  ejercicios: ExerciseItem[];
}

export interface PalabraDeFe {
  versiculoReferencia: string;
  versiculoTexto: string;
  reflexion: string;
}

export interface PersonalFitnessPlan {
  planSemanal: WeeklyDayPlan[];
  rutinaHoy: TodayWorkout;
  recomendacionesAlimentacion: string[];
  palabraDeFe: PalabraDeFe;
  fraseAlientoCorta: string;
  notaSugiereMedico: string;
}

export interface UserMetrics {
  age: number | "";
  weight: number | "";
  physicalCondition: string;
  additionalGoals: string;
}

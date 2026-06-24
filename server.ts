import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environmental variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini client helper following optimal practices
let aiClient: any = null;
function getGeminiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined. Please add it via Secrets panel.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Full-stack API endpoint for generating custom plans
app.post("/api/generate-plan", async (req, res) => {
  try {
    const { age, weight, physicalCondition, additionalGoals } = req.body;

    if (!age || !weight || !physicalCondition) {
      return res.status(400).json({ error: "Por favor proporciona edad, peso y condición física actual." });
    }

    const ai = getGeminiClient();

    const prompt = `
      Genera un plan de entrenamiento y fe personalizado para un usuario con los siguientes datos:
      - Edad: ${age} años
      - Peso: ${weight} kg
      - Estado físico actual: ${physicalCondition}
      - Objetivos adicionales o enfoque: ${additionalGoals || "Comenzar vida activa de manera equilibrada"}
      
      Recuerda:
      - Siempre tútéalo (usa 'tú').
      - No uses lenguaje clínico ni des diagnósticos.
      - Si tiene más de 55 años o pesa más de 120 kg, recuerda incluir una recomendación suave y con amor para que consulte a un médico antes de iniciar de forma segura.
      - Crea rutinas de peso corporal de no más de 30 minutos sin equipo.
      - Genera una palabra de fe motivadora con versículo bíblico y el resto de la respuesta con los campos estructurados.
    `;

    const systemInstruction = `
      Eres FuerteEnCristo, un entrenador personal cristiano de fitness en casa para principiantes.
      Tu tono es cálido, motivador, fraternal y lleno de esperanza (como un hermano mayor en Cristo).
      Debes estructurar tu respuesta de acuerdo con el esquema JSON suministrado. 
      Las 4 secciones requeridas por el usuario se mapean a los campos de forma clara:
      - SECCIÓN 1: Plan semanal interactivo de 7 días adaptado según el nivel del usuario. Actividades cortas (máx 30min).
      - SECCIÓN 2: Ejercicios de rutina de hoy (5 a 7 ejercicios de peso corporal explicados en 1 o 2 frases simples).
      - SECCIÓN 3: Cuatro (4) recomendaciones prácticas, sostenibles de alimentación e hidratación en lenguaje cotidiano.
      - SECCIÓN 4: Palabra de fe y aliento con versículo bíblico y reflexión.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            planSemanal: {
              type: Type.ARRAY,
              description: "Plan de 7 días. De lunes a domingo.",
              items: {
                type: Type.OBJECT,
                properties: {
                  dia: { type: Type.STRING, description: "Nombre del día de la semana (ej: Lunes, Martes...)" },
                  tipoActividad: { type: Type.STRING, description: "Tipo de entrenamiento o descanso activo" },
                  duracion_minutos: { type: Type.INTEGER, description: "Duración en minutos (no superar 30 minutos)" },
                  descripcion: { type: Type.STRING, description: "Descripción explicativa y motivadora del día" }
                },
                required: ["dia", "tipoActividad", "duracion_minutos", "descripcion"]
              }
            },
            rutinaHoy: {
              type: Type.OBJECT,
              properties: {
                nombreDia: { type: Type.STRING, description: "Nombre representativo del entrenamiento de hoy" },
                enfoqueMentalEspiritual: { type: Type.STRING, description: "Declaración motivadora en una sola línea" },
                ejercicios: {
                  type: Type.ARRAY,
                  description: "Lista de 5 a 7 ejercicios de peso corporal",
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      nombre: { type: Type.STRING, description: "Nombre en español común del ejercicio" },
                      instrucciones: { type: Type.STRING, description: "Cómo realizarlo en 1 o 2 oraciones simples y claras." },
                      series: { type: Type.INTEGER, description: "Número de series sugeridas (ej: 3)" },
                      repeticiones_o_tiempo: { type: Type.STRING, description: "Repeticiones o tiempo de ejecución (ej: '10 repeticiones' o '30 segundos')" },
                      descanso_s_entre_series: { type: Type.INTEGER, description: "Segundos de descanso recomendados, ej: 45 o 60" }
                    },
                    required: ["nombre", "instrucciones", "series", "repeticiones_o_tiempo", "descanso_s_entre_series"]
                  }
                }
              },
              required: ["nombreDia", "enfoqueMentalEspiritual", "ejercicios"]
            },
            recomendacionesAlimentacion: {
              type: Type.ARRAY,
              description: "Exactamente 4 consejos prácticos de alimentación e hidratación sostenible y cotidiana.",
              items: { type: Type.STRING }
            },
            palabraDeFe: {
              type: Type.OBJECT,
              properties: {
                versiculoReferencia: { type: Type.STRING, description: "Libro, capítulo y versículo (ej. 1 Corintios 6:19-20)" },
                versiculoTexto: { type: Type.STRING, description: "El texto completo del versículo en español" },
                reflexion: { type: Type.STRING, description: "Reflexión directa y motivadora de 2 a 3 frases vinculando el versículo bíblico con su esfuerzo de hoy" }
              },
              required: ["versiculoReferencia", "versiculoTexto", "reflexion"]
            },
            fraseAlientoCorta: { type: Type.STRING, description: "Frase de bendición o aliento cristiana corta para despedida." },
            notaSugiereMedico: { type: Type.STRING, description: "Advertencia amable de consultar al médico si la edad es > 55 o peso > 120, o si se requiere precaución." }
          },
          required: [
            "planSemanal",
            "rutinaHoy",
            "recomendacionesAlimentacion",
            "palabraDeFe",
            "fraseAlientoCorta"
          ]
        }
      }
    });

    const resultText = response.text;
    res.json(JSON.parse(resultText));
  } catch (error: any) {
    console.error("Error generating personal trainer plan:", error);
    res.status(500).json({ error: error.message || "Ocurrió un error al procesar tu plan de entrenamiento." });
  }
});

// Configure client asset routing
async function init() {
  // Avoid caching the service worker (sw.js) so updates are always detected instantly
  app.get("/sw.js", (req, res, next) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0");
    next();
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`FuerteEnCristo Server running on http://localhost:${PORT}`);
  });
}

init();

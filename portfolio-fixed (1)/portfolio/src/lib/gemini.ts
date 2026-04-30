import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
console.log("API Key configurada:", apiKey ? "✅ Sí (length: " + apiKey.length + ")" : "❌ No");

const ai = new GoogleGenAI({ apiKey });

export async function chatWithAI(message: string, context: string) {
  try {
    if (!apiKey) {
      return "⚠️ API Key no configurada. Añade tu GEMINI_API_KEY al archivo .env.local";
    }

    console.log("Enviando mensaje a Gemini:", message);
    console.log("Contexto:", context);

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: message,
      config: {
        systemInstruction: `Eres un asistente inteligente para el portfolio de Ariadna Ramos.
        Ariadna es Especialista en IA & Chatbots.
        Contexto del proyecto actual: ${context}.
        Responde de forma profesional, amable y concisa.
        Si te preguntan algo fuera de este contexto, intenta reconducir la conversación hacia el trabajo de Ariadna.`,
      },
    });
    
    console.log("Respuesta recibida:", response.text);
    return response.text || "Lo siento, no he podido procesar tu mensaje.";
  } catch (error: any) {
    console.error("Gemini Error:", error);
    const errorMessage = error?.message || "Error desconocido";
    return `❌ Error al conectar con Gemini: ${errorMessage}`;
  }
}

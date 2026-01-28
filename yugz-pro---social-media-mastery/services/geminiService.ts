
import { GoogleGenAI, Type } from "@google/genai";

// Use the API key directly in the service calls as per guidelines
export const workspaceAssistant = async (prompt: string, context: string = ""): Promise<{ content: string; suggestions: string[] }> => {
  // Always initialize with process.env.API_KEY directly
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `You are a productivity assistant in a Notion-like workspace. 
    Context: ${context}
    User Request: ${prompt}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          content: {
            type: Type.STRING,
            description: "The main body of generated text, formatted in clean markdown."
          },
          suggestions: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "3 short follow-up suggestions for the user."
          }
        },
        required: ["content", "suggestions"]
      }
    }
  });

  const text = response.text;
  if (!text) {
    throw new Error("AI returned no content");
  }

  return JSON.parse(text);
};

// Added generateInstagramContent function required by InstagramTool component
export const generateInstagramContent = async (topic: string): Promise<{ caption: string; hashtags: string[] }> => {
  // Always initialize with process.env.API_KEY directly
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate an engaging Instagram caption and relevant hashtags for the following topic: ${topic}. 
    Focus on making the caption catchy and include a mix of popular and niche hashtags.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          caption: {
            type: Type.STRING,
            description: "The generated Instagram caption."
          },
          hashtags: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of relevant hashtags."
          }
        },
        required: ["caption", "hashtags"]
      }
    }
  });

  const text = response.text;
  if (!text) {
    throw new Error("AI returned no content");
  }

  return JSON.parse(text);
};

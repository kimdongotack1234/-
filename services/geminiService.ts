import { GoogleGenAI, Type } from "@google/genai";
import { SiteContent } from "../types";

// Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY}); as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateSiteStructure = async (prompt: string): Promise<SiteContent> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Create a professional website structure based on this description: "${prompt}". Return as JSON.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          brandName: { type: Type.STRING },
          hero: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              subtitle: { type: Type.STRING },
              cta: { type: Type.STRING },
            },
            required: ["title", "subtitle", "cta"],
          },
          features: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                icon: { type: Type.STRING, description: "A lucide-react icon name like 'Rocket', 'Shield', 'Zap', etc." },
              },
              required: ["title", "description", "icon"],
            }
          },
          about: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              text: { type: Type.STRING },
            },
            required: ["title", "text"],
          },
          pricing: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                plan: { type: Type.STRING },
                price: { type: Type.STRING },
                features: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
              required: ["plan", "price", "features"],
            }
          },
          contact: {
            type: Type.OBJECT,
            properties: {
              email: { type: Type.STRING },
              address: { type: Type.STRING },
            },
            required: ["email", "address"],
          }
        },
        required: ["brandName", "hero", "features", "about", "pricing", "contact"],
      }
    }
  });

  // Access the .text property directly to extract the string output.
  const jsonStr = response.text?.trim() || '{}';
  return JSON.parse(jsonStr);
};

export const generateHeroImage = async (brandName: string, heroTitle: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { text: `High quality web hero background image for a brand called ${brandName}. Subject: ${heroTitle}. Modern, professional, clean aesthetic, high resolution.` }
      ]
    },
    config: {
      imageConfig: {
        aspectRatio: "16:9"
      }
    }
  });

  // Iterate through parts to find the image data, as the response may contain text and images.
  if (response.candidates && response.candidates[0]?.content?.parts) {
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64EncodeString: string = part.inlineData.data;
        return `data:image/png;base64,${base64EncodeString}`;
      }
    }
  }
  
  // Fallback if no image is generated
  return 'https://picsum.photos/1200/600';
};
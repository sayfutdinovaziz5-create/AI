import { GoogleGenAI } from "@google/genai";

// Helper to strip the data:image/xyz;base64, prefix
const cleanBase64 = (dataUrl: string): string => {
  return dataUrl.split(',')[1];
};

const getMimeType = (dataUrl: string): string => {
  const match = dataUrl.match(/data:([^;]+);base64/);
  return match ? match[1] : 'image/jpeg';
};

export const generateEditedImage = async (
  imageBase64: string,
  prompt: string,
  isHighQuality: boolean
): Promise<string> => {
  try {
    // Always use the standard API key from env, no need for paid key selection anymore
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // User requested to use Gemini 2.5 Flash (Nano Banana) for everything
    // limiting 4K to prompt-based enhancement instead of native model config
    const modelName = 'gemini-2.5-flash-image';

    const cleanData = cleanBase64(imageBase64);
    const mimeType = getMimeType(imageBase64);

    // Enhance prompt for "4K" requests since Flash doesn't support imageSize config
    const finalPrompt = isHighQuality 
      ? `${prompt} . High quality, 4k resolution, highly detailed, sharp focus, masterpiece.` 
      : prompt;

    const parts: any[] = [
      {
        inlineData: {
          data: cleanData,
          mimeType: mimeType,
        },
      },
      {
        text: finalPrompt,
      },
    ];

    // Flash model does not support imageConfig for size, so we leave it empty
    const config: any = {};

    const response = await ai.models.generateContent({
      model: modelName,
      contents: {
        parts: parts,
      },
      config: config,
    });

    // Parse response for the image
    const candidates = response.candidates;
    if (!candidates || candidates.length === 0) {
      throw new Error("No candidates returned from Gemini.");
    }

    const content = candidates[0].content;
    
    // Iterate parts to find the image
    let resultImageBase64 = '';
    
    if (content.parts) {
      for (const part of content.parts) {
        if (part.inlineData && part.inlineData.data) {
          resultImageBase64 = `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
          break;
        }
      }
    }

    if (!resultImageBase64) {
      // Fallback: Check if there's text explanation instead of image
      const textPart = content.parts?.find(p => p.text);
      if (textPart) {
        throw new Error(`Model returned text instead of image: ${textPart.text}`);
      }
      throw new Error("Model did not return a valid image.");
    }

    return resultImageBase64;

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
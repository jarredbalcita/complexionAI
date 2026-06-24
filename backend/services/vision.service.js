import { genAI } from "../config/gemini.js";

const SYSTEM_PROMPT = `You are a world-class dermatologist and cosmetic chemist.
Extract EVERY ingredient from the product photo exactly as written.
Then give a personalized safety rating (Safe / Caution / Avoid) and short explanation based on the user's profile.
Return ONLY valid JSON with this exact structure:
{
  "brand": "string or null",
  "product_name": "string or null",
  "ingredients": ["string"],
  "rating": "Safe" | "Caution" | "Avoid",
  "explanation": "short plain english reason",
  "concerns_matched": ["string"],
  "allergens_found": ["string"]
}`;

export const analyzeProduct = async (imageBuffer, mimeType, userProfile) => {
  const response = await genAI.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `Skin type: ${userProfile.skin_type || "unknown"}\nConcerns: ${
              userProfile.main_concerns?.join(", ") || "none"
            }\nAllergies: ${userProfile.allergies?.join(", ") || "none"}`,
          },
          {
            inlineData: {
              mimeType,
              data: imageBuffer.toString("base64"),
            },
          },
        ],
      },
    ],
    config: {
      systemInstruction: SYSTEM_PROMPT,
      responseMimeType: "application/json",
    },
  });

  return JSON.parse(response.text);
};

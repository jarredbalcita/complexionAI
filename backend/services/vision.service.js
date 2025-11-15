import { openai } from "../config/openai.js";

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
  "concerns_matched": ["acne", "rosacea", ...],
  "allergens_found": ["fragrance", "alcohol", ...]
}`;

export const analyzeProduct = async (imageBase64, userProfile) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Skin type: ${
              userProfile.skin_type || "unknown"
            }\nConcerns: ${
              userProfile.main_concerns?.join(", ") || "none"
            }\nAllergies: ${userProfile.allergies?.join(", ") || "none"}`,
          },
          { type: "image_url", image_url: { url: imageBase64 } },
        ],
      },
    ],
    max_tokens: 600,
  });

  const raw = response.choices[0].message.content;
  try {
    return JSON.parse(raw);
  } catch {
    return { error: "Failed to parse AI response", raw };
  }
};

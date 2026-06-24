import { genAI } from "../config/gemini.js";

const SYSTEM_PROMPT = `You are an expert dermatologist and skincare specialist.
The user will ask you about skincare routines. Use their skin profile to give personalised advice.
Always return ONLY valid JSON with this exact structure:
{
  "reply": "your conversational response here",
  "routine": null
}
If the user asks you to generate or suggest a specific routine, also populate the routine field:
{
  "reply": "your conversational response here",
  "routine": {
    "title": "Routine name",
    "steps": [
      { "number": 1, "name": "Step name", "product_suggestion": "Example product or type" }
    ]
  }
}
Keep replies concise, helpful, and friendly. Do not include markdown in the reply field.`;

export const generateRoutineReply = async (userMessage, userProfile) => {
  const profileContext = `User skin profile:
- Skin type: ${userProfile?.skin_type || "unknown"}
- Skin tone: ${userProfile?.skin_tone || "unknown"}
- Main concerns: ${userProfile?.main_concerns?.join(", ") || "none specified"}
- Allergies / ingredients to avoid: ${userProfile?.allergies?.join(", ") || "none specified"}
- Age range: ${userProfile?.age_range || "unknown"}`;

  const response = await genAI.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        role: "user",
        parts: [{ text: `${profileContext}\n\nUser message: ${userMessage}` }],
      },
    ],
    config: {
      systemInstruction: SYSTEM_PROMPT,
      responseMimeType: "application/json",
    },
  });

  return JSON.parse(response.text);
};

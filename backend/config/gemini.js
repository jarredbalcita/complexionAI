import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

export const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

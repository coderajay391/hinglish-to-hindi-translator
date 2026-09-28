import { GoogleGenAI } from "@google/genai";

export type TranslationStyle = "pure" | "conversational";

export interface TranslateOptions {
  text: string;
  style?: TranslationStyle;
}

export interface TranslationResult {
  result: string;
  detectedType?: "hinglish" | "english" | "mixed";
}

let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not configured.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

/**
 * Translates English or Hinglish (Roman Hindi) text into natural Hindi written in Devanagari script.
 */
export async function convertToHindi(options: TranslateOptions): Promise<TranslationResult> {
  const { text, style = "pure" } = options;
  const trimmed = text.trim();

  if (!trimmed) {
    throw new Error("Please enter some text first.");
  }

  if (trimmed.length > 5000) {
    throw new Error("Input text exceeds the maximum limit of 5,000 characters.");
  }

  const ai = getAiClient();

  const vocabularyGuideline =
    style === "conversational"
      ? `Use conversational, everyday colloquial Hindi written in Devanagari script. Common loanwords in Devanagari (like ऑफिस, मीटिंग, डॉक्टर, ट्रेन) are acceptable if they are standard in everyday conversation.`
      : `Strictly prefer pure and standard Hindi vocabulary (मानक / शुद्ध हिन्दी) where appropriate (e.g. prefer 'कार्यालय' instead of 'ऑफिस', 'बैठक' instead of 'मीटिंग', 'बाज़ार' instead of 'मार्केट', 'समाचार' instead of 'न्यूज़', 'पुस्तकालय' instead of 'लाइब्रेरी', 'चिकित्सक' / 'डॉक्टर', 'विद्यालय' instead of 'स्कूल'). Preserve proper nouns, brand names (like Google, Apple, Delhi), and technical terms.`;

  const systemInstruction = `You are an expert Hindi language translator and linguist.
Convert the user's English, Hinglish (Roman Hindi / transliterated Hindi), or mixed English-Hinglish input into natural, grammatically correct Hindi written in Devanagari script.

Requirements:
1. Understand Hinglish written using the Roman alphabet (e.g., 'mujhe kal office jana hai', 'aap kaise ho', 'mera naam Ajay hai', 'aaj mausam bahut acha hai').
2. Understand standard English (e.g., 'Where are you going?', 'I want to learn Hindi', 'Meeting is scheduled for tomorrow').
3. Understand mixed Hinglish + English sentences (e.g., 'today weather bahut acha hai', 'kal office me critical meeting hai').
4. Produce natural, fluent Hindi sentences rather than literal word-by-word transliteration.
5. ${vocabularyGuideline}
6. Preserve original meaning, nuance, and intent.
7. Preserve proper nouns, person names, brand names, and untranslatable technical terms (e.g. Ajay -> अजय, Google -> Google or गूगल).
8. Maintain punctuation, paragraph breaks, and proper Hindi sentence terminators (पूर्ण विराम '।') where appropriate.
9. Correct obvious typos and phonetic variations in Hinglish before conversion.
10. Return ONLY the translated Hindi text in Devanagari script. DO NOT output preamble, conversational greetings, explanations, notes, or markdown fences unless the user's input contained formatting that should be kept.`;

  try {
    let response;
    try {
      response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: trimmed,
        config: {
          systemInstruction,
          temperature: 0.2, // Low temperature for high accuracy & consistency
        },
      });
    } catch (primaryErr: unknown) {
      console.warn("Primary model gemini-3.8-flash encountered an issue, trying gemini-flash-latest:", primaryErr);
      // Fallback to gemini-flash-latest in case of transient model-specific availability
      response = await ai.models.generateContent({
        model: "gemini-flash-latest",
        contents: trimmed,
        config: {
          systemInstruction,
          temperature: 0.2,
        },
      });
    }

    const translatedText = response?.text?.trim() || "";

    if (!translatedText) {
      throw new Error("Unable to generate translation. Please verify your input and try again.");
    }

    return {
      result: translatedText,
    };
  } catch (error: unknown) {
    const rawMessage = error instanceof Error ? error.message : "Translation service error.";
    console.error("Gemini translation error:", rawMessage);
    
    // Provide clean, friendly error messages for common issues
    let friendlyMessage = "Translation service is currently unavailable. Please try again.";
    
    // Check if error is JSON or contains rate limit keywords
    if (rawMessage.includes("RESOURCE_EXHAUSTED") || rawMessage.includes("429") || rawMessage.includes("Quota exceeded")) {
      // Try to parse retry delay if available
      friendlyMessage = "API rate limit reached. Please wait a few seconds before trying again.";
    } else if (rawMessage.includes("GEMINI_API_KEY") || rawMessage.includes("API key")) {
      friendlyMessage = "Translation service configuration issue. Please ensure API credentials are configured.";
    } else if (rawMessage.includes("SAFETY") || rawMessage.includes("BLOCKED")) {
      friendlyMessage = "The input could not be translated due to safety policy constraints.";
    } else if (rawMessage.startsWith("{") && rawMessage.includes('"message"')) {
      try {
        const parsed = JSON.parse(rawMessage);
        if (parsed?.error?.message) {
          friendlyMessage = parsed.error.message.split("\n")[0] || friendlyMessage;
        }
      } catch {
        friendlyMessage = "Something went wrong during translation. Please try again.";
      }
    } else if (error instanceof Error && error.message) {
      friendlyMessage = error.message;
    }
    
    throw new Error(friendlyMessage);
  }
}

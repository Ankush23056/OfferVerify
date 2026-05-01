import { GoogleGenAI, Type, Part } from '@google/genai';
import pdfParse from 'pdf-parse/lib/pdf-parse.js';

let ai: GoogleGenAI | null = null;

const getAIConfig = () => {
  if (!ai) {
    let apiKey = process.env.GEMINI_API_KEY;
    console.log("DEBUG: Raw GEMINI_API_KEY from process.env:", apiKey ? `(Length: ${apiKey.length}, starts with: ${apiKey.substring(0, 4)}...)` : 'undefined');
    if (!apiKey) {
      throw new Error(`GEMINI_API_KEY is missing. You are likely using an outdated key or disabled your AI Studio secret. Please open the "Settings" panel (gear icon) -> "Secrets" and select your Gemini API key.`);
    }
    // Clean up potential quotes or whitespace accidentally added in the secrets manager
    apiKey = apiKey.replace(/['"]/g, '').trim();
    console.log("DEBUG: Cleaned GEMINI_API_KEY:", `(Length: ${apiKey.length}, starts with: ${apiKey.substring(0, 4)}...)`);
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
};

export const analyzeOfferWithAI = async (fileBuffer: Buffer, mimeType: string) => {
  let text = '';
  let parts: Part[] = [];

  // Initialize AI client
  const aiClient = getAIConfig();

  // 1. Extract text or prepare inline data
  if (mimeType === 'application/pdf') {
    try {
      const data = await pdfParse(fileBuffer);
      text = data.text;
      parts = [{ text: text }];
    } catch (e) {
      console.error('Failed to parse PDF', e);
      throw new Error('Failed to parse PDF file');
    }
  } else if (mimeType.startsWith('image/')) {
    // For images, we can pass them directly to Gemini
    parts = [{
      inlineData: {
        mimeType: mimeType,
        data: fileBuffer.toString("base64")
      }
    }];
  } else {
    // Treat as plain text
    text = fileBuffer.toString('utf-8');
    parts = [{ text: text }];
  }

  if (parts.length === 0 || (text && text.trim().length === 0)) {
    if (mimeType === 'application/pdf' || !mimeType.startsWith('image/')) {
      throw new Error('No readable text found in document.');
    }
  }

  // 2. Call Gemini API
  const promptInstruction = `You are a job offer verification expert. Analyze this text (or image) of an employment offer for scam patterns like registration fees, missing CIN, and generic emails. Return JSON with redFlags[], warnings[], positives[], recommendation (a quick verdict), and a riskScore.`;
  
  parts.unshift({ text: promptInstruction });

  let response;
  try {
    response = await aiClient.models.generateContent({
      model: "gemini-2.5-flash",
      contents: { parts },
      config: {
        temperature: 0.2, // low temp for analytical task
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            companyName: {
              type: Type.STRING,
              description: "The name of the company on the offer letter. If not found, use 'Unknown Company'."
            },
            score: {
              type: Type.INTEGER,
              description: "A calculated risk score (trust score) representing safety from 0 to 100, where 100 is perfectly safe and 0 is extremely dangerous/risky."
            },
            riskLevel: {
              type: Type.STRING,
              description: "Must be exactly 'low', 'medium', or 'high' based on the safety constraints.",
            },
            recommendation: {
              type: Type.STRING,
              description: "A strong, brief recommendation string."
            },
            redFlags: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Array of critical scam indicators."
            },
            warnings: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Array of anomalies that aren't critical red flags but justify caution."
            },
            positives: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Array of positive legitimate markers found in the document."
            }
          },
          required: ["companyName", "score", "riskLevel", "recommendation", "redFlags", "warnings", "positives"]
        }
      }
    });
  } catch (apiErr: any) {
    console.error("Gemini API Error Detail:", JSON.stringify(apiErr, null, 2));
    console.error("Gemini API Error Message:", apiErr.message);
    if (apiErr.message?.includes('API key not valid')) {
      throw new Error("Your specified Gemini API Key is invalid. If you added a custom key in Settings -> Secrets, please ensure it is correct (no extra spaces or placeholder text), or delete it to use the system default.");
    }
    if (apiErr.status === 403) {
      throw new Error(`Gemini Authentication Error (403): ${apiErr.message}`);
    }
    if (apiErr.status === 400) {
       throw new Error(`Gemini Bad Request (400): ${apiErr.message}`);
    }
    throw apiErr;
  }

  const rawText = response.text;
  if (!rawText) {
    throw new Error('AI returned empty response');
  }

  try {
    const jsonResult = JSON.parse(rawText);
    return jsonResult;
  } catch (e) {
    console.error('Failed to parse AI output as JSON', rawText);
    throw new Error('AI generated invalid JSON');
  }
};

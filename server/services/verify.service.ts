import Groq from 'groq-sdk';
import pdfParse from 'pdf-parse/lib/pdf-parse.js';

let groq: Groq | null = null;

const getGroqClient = () => {
  if (!groq) {
    let apiKey = process.env.GROQ_API_KEY;
    console.log("DEBUG: Raw GROQ_API_KEY from process.env:", apiKey ? `(Length: ${apiKey.length}, starts with: ${apiKey.substring(0, 4)}...)` : 'undefined');
    if (!apiKey) {
      throw new Error(`GROQ_API_KEY is missing. Please check your environment variables.`);
    }
    // Clean up potential quotes or whitespace
    apiKey = apiKey.replace(/['"]/g, '').trim();
    groq = new Groq({ apiKey });
  }
  return groq;
};

export const analyzeOfferWithAI = async (fileBuffer: Buffer, mimeType: string) => {
  let text = '';
  let messages: any[] = [];
  let model = "llama3-8b-8192";

  // Initialize AI client
  const client = getGroqClient();

  // 1. Extract text or prepare inline data
  if (mimeType === 'application/pdf') {
    try {
      const data = await pdfParse(fileBuffer);
      text = data.text;
      messages = [{ role: 'user', content: text }];
    } catch (e) {
      console.error('Failed to parse PDF', e);
      throw new Error('Failed to parse PDF file');
    }
  } else if (mimeType.startsWith('image/')) {
    model = "llama-3.2-11b-vision-preview";
    messages = [
      {
        role: "user",
        content: [
          { type: "image_url", image_url: { url: `data:${mimeType};base64,${fileBuffer.toString("base64")}` } }
        ]
      }
    ];
  } else {
    // Treat as plain text
    text = fileBuffer.toString('utf-8');
    messages = [{ role: 'user', content: text }];
  }

  if (messages.length === 0 || (text && text.trim().length === 0)) {
    if (!mimeType.startsWith('image/')) {
      throw new Error('No readable text found in document.');
    }
  }

  // 2. Call Groq API
  const promptInstruction = `You are a job offer verification expert. Analyze this text (or image) of an employment offer for scam patterns like registration fees, missing CIN, and generic emails. Return a JSON object with EXACTLY the following keys (do not wrap in markdown):
- "companyName" (string: name of company, or "Unknown Company")
- "score" (integer 0-100: trust score where 100 is perfectly safe)
- "riskLevel" (string: strictly "low", "medium", or "high")
- "recommendation" (string: brief verdict)
- "redFlags" (array of strings: critical scam indicators)
- "warnings" (array of strings: non-critical anomalies)
- "positives" (array of strings: legitimate markers)`;
  
  if (messages[0].content && Array.isArray(messages[0].content)) {
    messages[0].content.unshift({ type: "text", text: promptInstruction });
  } else {
    messages.unshift({ role: 'system', content: promptInstruction });
  }

  let response;
  try {
    response = await client.chat.completions.create({
      messages,
      model,
      temperature: 0.2,
      response_format: model === "llama-3.2-11b-vision-preview" ? undefined : { type: "json_object" }
    });
  } catch (apiErr: any) {
    console.error("Groq API Error Detail:", apiErr);
    throw new Error(`Groq API Error: ${apiErr.message}`);
  }

  const rawText = response.choices[0]?.message?.content;
  if (!rawText) {
    throw new Error('AI returned empty response');
  }

  try {
    let jsonStr = rawText;
    if (jsonStr.includes('\`\`\`json')) {
      jsonStr = jsonStr.split('\`\`\`json')[1].split('\`\`\`')[0].trim();
    } else if (jsonStr.includes('\`\`\`')) {
      jsonStr = jsonStr.split('\`\`\`')[1].split('\`\`\`')[0].trim();
    }
    const jsonResult = JSON.parse(jsonStr);
    
    // Ensure all required fields exist
    return {
      companyName: jsonResult.companyName || "Unknown Company",
      score: typeof jsonResult.score === 'number' ? jsonResult.score : 50,
      riskLevel: ["low", "medium", "high"].includes(jsonResult.riskLevel) ? jsonResult.riskLevel : "medium",
      recommendation: jsonResult.recommendation || "Needs manual review.",
      redFlags: Array.isArray(jsonResult.redFlags) ? jsonResult.redFlags : [],
      warnings: Array.isArray(jsonResult.warnings) ? jsonResult.warnings : [],
      positives: Array.isArray(jsonResult.positives) ? jsonResult.positives : []
    };
  } catch (e) {
    console.error('Failed to parse AI output as JSON', rawText);
    throw new Error('AI generated invalid JSON');
  }
};

import Groq from 'groq-sdk';
import pdfParse from 'pdf-parse/lib/pdf-parse.js';

let groq = null;

const getGroqClient = () => {
  if (!groq) {
    let apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      throw new Error(`GROQ_API_KEY is missing. Please check your environment variables.`);
    }
    apiKey = apiKey.replace(/['"]/g, '').trim();
    groq = new Groq({ apiKey });
  }
  return groq;
};

export const analyzeOfferWithAI = async (fileBuffer, mimeType, rawText = null) => {
  let text = rawText || '';
  let messages = [];
  let model = "llama-3.3-70b-versatile";

  const client = getGroqClient();

  // 1. Extract text or prepare inline data
  if (rawText) {
    messages = [{ role: 'user', content: rawText }];
  } else if (mimeType === 'application/pdf') {
    try {
      const data = await pdfParse(fileBuffer);
      text = data.text;
      messages = [{ role: 'user', content: text }];
    } catch (e) {
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
    text = fileBuffer.toString('utf-8');
    messages = [{ role: 'user', content: text }];
  }

  if (messages.length === 0 || (text && text.trim().length === 0)) {
    if (!mimeType.startsWith('image/')) {
      throw new Error('No readable text found in document.');
    }
  }

  // 2. Call Groq API
  const promptInstruction = `You are an expert in Indian employment law and job scams. Analyze this offer letter for: registration fees, training deposits, suspicious email domains, missing CIN/Registration numbers, and unrealistic salary-to-company-size ratios. Return a JSON object with: companyName (string), riskScore (0-100), redFlags (array), warnings (array), and positives (array). Do not wrap the JSON in markdown code blocks, return raw JSON only.`;
  
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
  } catch (apiErr) {
    throw new Error(`Groq API Error: ${apiErr.message}`);
  }

  const aiRawResponse = response.choices[0]?.message?.content;
  if (!aiRawResponse) {
    throw new Error('AI returned empty response');
  }

  try {
    let jsonStr = aiRawResponse;
    if (jsonStr.includes('```json')) {
      jsonStr = jsonStr.split('```json')[1].split('```')[0].trim();
    } else if (jsonStr.includes('```')) {
      jsonStr = jsonStr.split('```')[1].split('```')[0].trim();
    }
    const jsonResult = JSON.parse(jsonStr);
    
    return {
      companyName: jsonResult.companyName || 'Unknown Company',
      riskScore: typeof jsonResult.riskScore === 'number' ? jsonResult.riskScore : 50,
      redFlags: Array.isArray(jsonResult.redFlags) ? jsonResult.redFlags : [],
      warnings: Array.isArray(jsonResult.warnings) ? jsonResult.warnings : [],
      positives: Array.isArray(jsonResult.positives) ? jsonResult.positives : []
    };
  } catch (e) {
    throw new Error('AI generated invalid JSON');
  }
};

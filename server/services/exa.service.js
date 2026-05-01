import Exa from 'exa-js';
import Groq from 'groq-sdk';

let exaClient = null;
let groqClient = null;

const getExa = () => {
  if (!exaClient) {
    const key = process.env.EXA_API_KEY?.replace(/['"]/g, '').trim();
    if (!key) throw new Error('EXA_API_KEY is missing from environment variables.');
    exaClient = new Exa(key);
  }
  return exaClient;
};

const getGroq = () => {
  if (!groqClient) {
    const key = process.env.GROQ_API_KEY?.replace(/['"]/g, '').trim();
    if (!key) throw new Error('GROQ_API_KEY is missing from environment variables.');
    groqClient = new Groq({ apiKey: key });
  }
  return groqClient;
};

/**
 * RAG Pipeline:
 * 1. Search Exa for official site, LinkedIn, Reddit threads about the company
 * 2. Concatenate result text into a single context document
 * 3. Send to Groq for structured extraction + scam analysis
 * 4. Return structured company profile
 */
export const ragSearchCompany = async (companyName) => {
  const exa = getExa();
  const groq = getGroq();

  // --- STEP 1: Exa Multi-query Search ---
  const queries = [
    `${companyName} official website about us`,
    `${companyName} company LinkedIn established year headquarters`,
    `${companyName} job scam Reddit review complaints`,
  ];

  let combinedText = '';
  let sourceUrls = [];

  for (const query of queries) {
    try {
      const result = await exa.searchAndContents(query, {
        useAutoprompt: true,
        numResults: 3,
        text: { maxCharacters: 800 },
        // Focus on high-quality pages
        includeDomains: query.includes('Reddit') 
          ? ['reddit.com', 'quora.com', 'glassdoor.com']
          : undefined,
      });

      for (const r of result.results || []) {
        if (r.text) {
          combinedText += `\n\n--- Source: ${r.url} ---\n${r.text.slice(0, 800)}`;
          sourceUrls.push(r.url);
        }
      }
    } catch (err) {
      // Non-fatal: skip this query if it fails
      console.error(`Exa query failed for "${query}":`, err.message);
    }
  }

  if (!combinedText.trim()) {
    return null; // Exa found nothing useful
  }

  // --- STEP 2: Groq Structured Extraction ---
  const systemPrompt = `You are a company research analyst specializing in employment fraud detection for the Indian job market.
You will receive web search snippets about a company. Extract structured data and assess legitimacy.
Return ONLY a valid JSON object with these exact fields:
{
  "companyName": "canonical company name as found",
  "officialWebsite": "URL or null",
  "yearEstablished": "year as string or null",
  "headquarters": "city/state or null",
  "trustScore": number between 1 and 100,
  "redFlagSummary": "1-2 sentence summary of any scam/fraud signals found, or null if none"
}
Base the trustScore on: domain age, MCA/Govt registration mentions, employee reviews, news coverage, and any fraud reports.
A legitimate, well-known company = 85-100. Suspicious = 20-50. Unknown = 50-65.`;

  const userMessage = `Research target: "${companyName}"\n\nWeb search results:\n${combinedText.slice(0, 6000)}`;

  let groqResult;
  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      temperature: 0.1,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
    });
    groqResult = JSON.parse(completion.choices[0]?.message?.content);
  } catch (err) {
    throw new Error(`Groq extraction failed: ${err.message}`);
  }

  return {
    companyName: groqResult.companyName || companyName,
    officialWebsite: groqResult.officialWebsite || null,
    yearEstablished: groqResult.yearEstablished || null,
    headquarters: groqResult.headquarters || null,
    trustScore: typeof groqResult.trustScore === 'number' ? groqResult.trustScore : 60,
    redFlagSummary: groqResult.redFlagSummary || null,
    sourceUrls,
  };
};

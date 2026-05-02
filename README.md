# 🛡️ OfferVerify – AI-Powered Job Offer Legitimacy Engine

🔗 **Live Demo:** [https://offer-verify.vercel.app/](https://offer-verify.vercel.app/)

💻 **Github Repository:** [https://github.com/Ankush23056/OfferVerify.git](https://github.com/Ankush23056/OfferVerify.git)

OfferVerify is a specialized security tool designed to protect job seekers from the rising tide of sophisticated employment scams. By combining **Exa AI’s** real-time web search with **Groq’s** high-speed analytical models, the platform provides a "Trust Score" for any job offer letter or company, identifying red flags that the human eye might miss.

This project demonstrates expertise in AI integration (Exa & Groq), Full-Stack development (MERN), and Security-First UX/UI design.

## ✨ Features

### 🔍 Deep-Web Company Verification

- **Real-time OSINT:** Leverages Exa AI to perform instant background checks on company domains, social proof, and physical office locations.
- **Corporate ID Validation:** Automatically verifies CIN (Corporate Identification Number) and registration status to confirm legal business entities.

### 🧠 AI Scam Detection (Groq Engine)

- **Heuristic Analysis:** Analyzes offer letter text for common scam triggers: generic greetings, urgent payment requests, or suspicious interview processes.
- **Objective Trust Scoring:** Generates a 0–100 "Trust Score" using a weighted logic system that balances positive business indicators against risk factors.
- **Red Flag Tagging:** Clearly identifies specific reasons for suspicion, such as "Domain Mismatch" or "Unreasonable Compensation."

### 📄 Side-by-Side Assessment

- **Interactive Sample Report:** A dedicated "Before and After" comparison showing a sample offer letter PDF side-by-side with its AI-generated risk analysis.
- **Transparent Logic:** Explains exactly why an offer is flagged, educating the user on how to spot scams in the future.

### 🎨 Security-Grade UI

- **Aesthetic:** Modern, high-contrast dark theme with a "Security Dashboard" vibe.
- **Responsive Design:** Fully optimized for mobile and desktop, allowing users to verify offers on the go.

## 🕹️ How It Works

1.  **Search or Upload:** Search for a company name to see its existing verification history or upload an offer letter for a fresh scan.
2.  **AI Analysis:** The backend triggers a dual-process: Exa fetches live data, and Groq analyzes the document text against that data.
3.  **Get the Verdict:** Receive a Trust Score and a breakdown of "Positive Signs" vs. "Red Flags."
4.  **Stay Safe:** Follow the AI’s recommendation on whether to engage with the sender or report the offer.

## 🛠️ Tech Stack

- **Frontend:** React.js, Tailwind CSS, Vite
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (using Mongoose for schema management)
- **AI & Search:** Exa AI (Real-time Search) & Groq (Llama-3 models)
- **PDF Rendering:** Integrated PDF viewer for document inspection
- **Deployment:** Vercel (Frontend) & Render (Backend)

## 🧠 Key Learnings

- **AI Logic Calibration:** Overcoming "AI Paranoia" by fine-tuning system prompts to reduce false positives in legitimate corporate offers.
- **API Orchestration:** Coordinating multiple AI services (Search + Analysis) into a single, seamless user response.
- **Cross-Origin Security:** Managing complex CORS configurations to allow secure communication between distributed frontend and backend services.
- **Data Seeding:** Implementing custom administrative routes to populate production environments with realistic benchmarking data.

## 👤 Author

**Ankush Kumar** | Full-Stack Developer  
📍 Mumbai, India  
🌐 [Portfolio](https://ankush-dev.netlify.app/)

---

_Disclaimer: OfferVerify is an AI-assisted tool. Always perform your own due diligence before accepting any job offer._

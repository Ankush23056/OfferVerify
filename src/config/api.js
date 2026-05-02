/**
 * API Base URL configuration.
 *
 * Development : set VITE_API_URL=http://localhost:3001 in .env
 * Production  : set VITE_API_URL=https://your-render-app.onrender.com in Vercel
 *
 * If VITE_API_URL is missing in production, every /api/* call hits the Vercel
 * frontend server, which returns HTML → "Unexpected token '<'" JSON parse errors.
 */
const API_BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || '';

if (!API_BASE_URL && import.meta.env.PROD) {
  console.warn(
    '[OfferVerify] VITE_API_URL is not set! ' +
    'API calls will fail. Add it to your Vercel environment variables: ' +
    'https://vercel.com/docs/environment-variables'
  );
}

export default API_BASE_URL;

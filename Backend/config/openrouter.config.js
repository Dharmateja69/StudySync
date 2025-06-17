// AI API keys, third-party setup
// Basic example of API client setup for OpenRouter or Gemini

import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1';

const openRouterClient = axios.create({
    baseURL: OPENROUTER_BASE_URL,
    headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
    },
});
console.log("🔐 API Key used for OpenRouter:", process.env.OPENROUTER_API_KEY);
export default openRouterClient;

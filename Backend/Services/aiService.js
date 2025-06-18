// /Services/aiService.js


import dotenv from 'dotenv';
import extractTextFromImage from '../utility/imageExtractor.js';
import extractTextFromPDF from '../utility/pdfExtractor.js';
import extractTextFromURL from '../utility/urlExtractor.js';


import openRouterClient from '../config/openrouter.config.js';
import buildPrompt from '../helper/buildPrompt.js';
import calculateReasoningTokens from '../helper/tokenCalculator.js';
import AISummary from '../Model/AISummarySchema.js';
import buildCodePrompt from '../Prompt/CodingPrompt.js';
dotenv.config();
const generateSummary = async ({
    fileBuffer,
    sourceType,
    sourceUrl = '',
    userId,
    fileId,
    taskType,
    options // { style, length, format, contentType }
}) => {
    try {
        // Step 1: Extract raw text
        let extractedText = '';

        if (sourceType === 'pdf') {
            extractedText = await extractTextFromPDF(fileBuffer);
        } else if (sourceType === 'image') {
            extractedText = await extractTextFromImage(fileBuffer);
        } else if (sourceType === 'link') {
            extractedText = await extractTextFromURL(sourceUrl);
        } else {
            throw new Error('Unsupported source type');
        }

        // 🧠 Truncate long text to avoid token overflow
        const safeText = extractedText.length > 8000 ? extractedText.slice(0, 8000) : extractedText;

        // Step 2: Build prompt for AI
        let prompt;
        if (taskType === 'summary') {
            prompt = buildPrompt(safeText, options);
        } else if (taskType === 'coding') {
            prompt = buildCodePrompt(safeText, options);
        } else {
            throw new Error('Unsupported task type');
        }
        // Step 3: Estimate max tokens
        const maxTokens = calculateReasoningTokens(safeText, options.contentType);

        // Step 4: Call the AI model via OpenRouter API
        const aiResponse = await openRouterClient.post('/chat/completions', {
            model: "mistralai/mistral-small-3.1-24b-instruct",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.3,
            max_tokens: maxTokens,
        });



        // 🪵 Debug AI response
        console.log("🧠 OpenRouter AI Response:", JSON.stringify(aiResponse.data, null, 2));

        const aiSummary = aiResponse.data.choices?.[0]?.message?.content?.trim();

        if (!aiSummary) {
            console.error("❌ No AI summary returned from OpenRouter");
            throw new Error('No AI summary returned');
        }

        // Step 5: Save to MongoDB based on taskType
        let saved;

        if (taskType === 'summary') {
            saved = await AISummary.create({
                fileId,
                userId,
                sourceType,
                sourceUrl,
                extractedText: safeText,
                promptUsed: prompt,
                aiSummary,
                taskType,
                summaryStyle: options.style,
                summaryLength: options.length,
                summaryFormat: options.format,
            });
        } else if (taskType === 'coding') {
            saved = await AISummary.create({
                fileId,
                userId,
                sourceType,
                sourceUrl,
                extractedText: safeText,
                promptUsed: prompt,
                aiSummary,
                taskType,
                language: options.language,
                complexity: options.complexity,
                codingStyle: options.style,
                codingTaskType: options.taskType,
            });
        } else {
            throw new Error('Invalid taskType for saving');
        }



        return saved;
    } catch (error) {
        console.error('[❌ AI Summary Error]', error.message);
        console.error(error.stack);

        throw new Error('AI summarization failed');
    }
};

export default generateSummary;

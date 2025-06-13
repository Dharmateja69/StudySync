

const calculateReasoningTokens = (text, contentType = 'general') => {
    if (!text || typeof text !== 'string') return 1000; // Fallback

    const wordCount = text.split(/\s+/).filter(Boolean).length;

    // Token usage estimate: ~1.3 tokens per word on average
    const estimatedTokens = Math.ceil(wordCount * 1.3);

    // Base floor depending on content type
    const baseTokensByType = {
        technical: 1500,
        medical: 1600,
        mathematical: 1700,
        general: 1000,
    };

    const base = baseTokensByType[contentType.toLowerCase()] || baseTokensByType.general;

    // Choose max between base and estimate
    const finalTokenCount = Math.max(base, estimatedTokens);

    // Cap at model's limit (Gemini 2.5 Flash limit is 4096)
    return Math.min(finalTokenCount, 4096);
};

export default calculateReasoningTokens;

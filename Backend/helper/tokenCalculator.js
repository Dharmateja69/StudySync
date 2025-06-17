

const calculateReasoningTokens = (text, contentType = 'general') => {
    if (!text || typeof text !== 'string') return 2000; // Fallback for empty text

    const wordCount = text.split(/\s+/).filter(Boolean).length;

    // Claude models estimate ~1.3 tokens per word
    const estimatedTokens = Math.ceil(wordCount * 1.3);

    // Base token suggestions depending on content type
    const baseTokensByType = {
        technical: 4000,
        medical: 5000,
        mathematical: 5500,
        general: 3000,
    };

    const base = baseTokensByType[contentType.toLowerCase()] || baseTokensByType.general;

    // Max of estimated or base
    const finalTokenCount = Math.max(base, estimatedTokens);

    // Claude 3 Haiku has a huge limit, let's allow up to 16k generation tokens
    return Math.min(finalTokenCount, 16000);
};

export default calculateReasoningTokens;

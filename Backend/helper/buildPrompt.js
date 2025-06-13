const buildPrompt = (text, options) => {
    const {
        style = 'educator',
        length = 'long',
        format = 'essay',
        contentType = 'general'
    } = options;

    return `
You are an expert summarizer and critical thinker.

Your task is to generate a high-quality summary based on the following:
- Style: ${style.charAt(0).toUpperCase() + style.slice(1)}
- Length: ${length.charAt(0).toUpperCase() + length.slice(1)}
- Format: ${format.charAt(0).toUpperCase() + format.slice(1)}
- Content Type: ${contentType.charAt(0).toUpperCase() + contentType.slice(1)}

Instructions:
1. Extract the **key insights, facts, and critical arguments**.
2. Maintain logical flow and clarity—avoid superficial or vague summaries.
3. Structure the response based on the specified format (e.g., essay or bullet points).
4. If applicable, highlight real-world relevance or applications.
5. Do NOT include any markdown, HTML, or formatting—just **plain text**.

Respond only with the summary text.

Content to Summarize:
""" 
${text}
"""
`.trim();
};

export default buildPrompt;

const buildCodePrompt = (taskDescription, options = {}) => {
    const {
        language = 'c',
        taskType = 'function implementation',
        complexity = 'medium',
        codingStyle = 'concise'
    } = options;

    const lang = language.toLowerCase();

    // Dynamic instructional content based on language
    let languageInstructions = '';

    switch (lang) {
        case 'java':
            languageInstructions = `
- Use class-based structure with a 'Main' class and 'main' method.
- Include method-level comments only if the style is not 'concise'.
- Explain time and space complexity at the end of the file.
- Use relevant OOP principles if applicable.`;
            break;

        case 'c':
            languageInstructions = `
- Begin from basic includes and function definitions.
- Explain logic flow clearly with structured functions.
- Conclude with time and space complexity analysis in comments.
- Avoid advanced libraries; stick to core C.`;
            break;

        case 'javascript':
            languageInstructions = `
- Use modern JavaScript syntax (ES6+).
- Include function-based implementation (arrow functions allowed).
- Avoid browser-specific code unless required.
- Include inline explanation if style is 'beginner-friendly'.`;
            break;

        case 'sql':
            languageInstructions = `
- Provide clear SQL queries.
- Explain schema, data types, and relationships if needed.
- Clarify optimization techniques like indexing and joins.
- Follow up each query with explanation if style isn't 'concise'.`;
            break;

        default:
            languageInstructions = `
- Provide optimized, readable code with appropriate logic.
- Keep it self-contained and executable.
- Include complexity analysis at the end.`;
            break;
    }

    return `
You are an expert competitive programmer and software engineer.

Your task is to solve coding problems effectively with the following context:
- Language: ${language.charAt(0).toUpperCase() + language.slice(1)}
- Task Type: ${taskType.charAt(0).toUpperCase() + taskType.slice(1)}
- Complexity: ${complexity.charAt(0).toUpperCase() + complexity.slice(1)}
- Coding Style: ${codingStyle}

Instructions:
1. Define the problem in 1–2 lines clearly.
2. Implement the most optimized solution possible for the selected language.
3. Adjust explanations, structure, and terminology based on the language.
4. Number problems as: "// 1:", "// 2:", etc.
5. Use short, descriptive function and variable names.
6. Include time and space complexity analysis at the end.
7. Respond only with executable code. Avoid markdown or external text.
8. Minimize unnecessary comments unless the style is 'clean' or 'beginner-friendly'.

Language-Specific Notes:
${languageInstructions}

Task Description:
"""
${taskDescription}
"""
`.trim();
};

export default buildCodePrompt;

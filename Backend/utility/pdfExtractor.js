// Handles raw text extraction from:
// PDF → via pdf-parse

import pdfParse from 'pdf-parse';

/**
 * Extracts text content from a PDF buffer.
 * @param {Buffer} pdfBuffer - The PDF file buffer.
 * @returns {Promise<string>} - Extracted raw text from the PDF.
 */
const extractTextFromPDF = async (pdfBuffer) => {
    try {
        const data = await pdfParse(pdfBuffer);
        return data.text.trim();
    } catch (error) {
        console.error('PDF extraction error:', error.message);
        throw new Error('Failed to extract text from PDF.');
    }
};

export default extractTextFromPDF;

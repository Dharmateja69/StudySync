// Handles raw text extraction from:
// Image → via Tesseract.js

import Tesseract from 'tesseract.js';

/**
 * Extracts text from an image buffer using OCR (Tesseract).
 * @param {Buffer} imageBuffer - The image file buffer.
 * @returns {Promise<string>} - Extracted text from the image.
 */
const extractTextFromImage = async (imageBuffer) => {
    try {
        const { data: { text } } = await Tesseract.recognize(
            imageBuffer,
            'eng', // Language
            {
                logger: m => console.log(m) // Optional: progress logging
            }
        );

        return text.trim();
    } catch (error) {
        console.error('Image OCR error:', error.message);
        throw new Error('Failed to extract text from image.');
    }
};

export default extractTextFromImage;

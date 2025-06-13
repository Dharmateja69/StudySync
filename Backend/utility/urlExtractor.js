// Handles raw text extraction from:
// URL → via axios + pdf-parse or cheerio
import axios from 'axios';
import * as cheerio from 'cheerio';
import pdfParse from 'pdf-parse';

const extractTextFromURL = async (url) => {
    try {
        const response = await axios.get(url, {
            responseType: 'arraybuffer',
            headers: {
                'User-Agent': 'Mozilla/5.0',
            },
        });

        const contentType = response.headers['content-type'] || '';

        if (contentType.includes('application/pdf')) {
            const pdfBuffer = response.data;
            const pdfData = await pdfParse(pdfBuffer);
            return pdfData.text.trim();
        }

        if (!contentType.includes('text/html')) {
            throw new Error(`Unsupported content-type: ${contentType}`);
        }

        const html = response.data.toString('utf-8');
        const $ = cheerio.load(html);

        $('script, style, noscript').remove();

        const text = $('body')
            .find('*')
            .contents()
            .filter(function () {
                return this.type === 'text' && this.data.trim() !== '';
            })
            .map(function () {
                return $(this).text().trim();
            })
            .get()
            .join(' ');

        return text.trim();
    } catch (error) {
        console.error('URL extraction error:', error.message);
        throw new Error('Failed to extract text from URL.');
    }
};

export default extractTextFromURL;

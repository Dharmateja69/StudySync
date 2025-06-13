import { fileTypeFromBuffer } from 'file-type';

const detectInputMiddleware = async (req, res, next) => {
    try {
        const { sourceUrl } = req.body;
        const file = req.file;

        // CASE 1: PublicsourceUrl input
        if (sourceUrl && typeof sourceUrl === 'string') {
            if (!sourceUrl.startsWith('http://') && !sourceUrl.startsWith('https://')) {
                return res.status(400).json({ error: 'InvalidsourceUrl format.' });
            }

            req.sourceType = 'link';
            req.sourceUrl = sourceUrl.trim();
            return next();
        }

        // CASE 2: File input (PDF or Image)
        if (file) {
            const fileType = await fileTypeFromBuffer(file.buffer);

            if (!fileType) {
                return res.status(400).json({ error: 'Unsupported file type.' });
            }

            const mime = fileType.mime;

            if (mime === 'application/pdf') {
                req.sourceType = 'pdf';
                req.fileBuffer = file.buffer;
                return next();
            }

            if (mime.startsWith('image/')) {
                req.sourceType = 'image';
                req.fileBuffer = file.buffer;
                return next();
            }

            return res.status(400).json({ error: 'Only PDF and image files are supported.' });
        }

        // No input found
        return res.status(400).json({ error: 'No valid input provided. Please upload a file or provide a public URL.' });

    } catch (error) {
        console.error('Input detection error:', error);
        return res.status(500).json({ error: 'Error detecting input type.' });
    }
};

export default detectInputMiddleware;

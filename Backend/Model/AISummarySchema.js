import { Schema, model } from 'mongoose';

const AISummarySchema = new Schema(
    {
        fileId: {
            type: Schema.Types.ObjectId,
            ref: 'File',
            required: true,
            // unique: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        sourceType: {
            type: String,
            enum: ['pdf', 'image', 'link'],
            required: true,
        },
        sourceUrl: {
            type: String,
            default: '',
            trim: true,
        },
        extractedText: {
            type: String,
            required: true,
            trim: true,
        },
        promptUsed: {
            type: String,
            required: true,
            trim: true,
        },
        aiSummary: {
            type: String,
            required: true,
            trim: true,
        },

        // New: Unified task type field
        taskType: {
            type: String,
            enum: ['summary', 'coding'],
            required: true,
        },

        // Fields for summary
        summaryStyle: {
            type: String,
            enum: ['educator', 'analytical', 'concise'],
        },
        summaryLength: {
            type: String,
            enum: ['short', 'medium', 'long'],
        },
        summaryFormat: {
            type: String,
            enum: ['essay', 'bullet', 'report'],
        },
        contentType: {
            type: String,
            enum: ['general', 'technical', 'business', 'visual'],
        },

        // Fields for coding
        language: {
            type: String,
            trim: true
        },
        codingStyle: {
            type: String,
            trim: true,
            enum: [
                'clean and well-commented',
                'concise',
                'beginner-friendly',
                'efficient'
            ],
        },

        complexity: {
            type: String,
            enum: ['easy', 'medium', 'hard'],
        },
        codingTaskType: {
            type: String,
            enum: ['detailed view', 'function implementation', 'query analysis'] // or as needed
        }

    },
    {
        timestamps: true,
    }
);

export default model('AISummary', AISummarySchema);

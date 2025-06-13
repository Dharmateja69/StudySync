import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
    originalname: {
        type: String,
        required: true,
    },
    mimetype: {
        type: String,
        required: false,
    },
    size: {
        type: Number,
        required: false,
    },
    buffer: {
        type: Buffer,
        required: false,
    },
    url: {
        type: String,
        required: false,
    },
    sourceType: {
        type: String,
        enum: ['file', 'link'],
        default: 'file',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    uploadDate: {
        type: Date,
        default: Date.now,
    },
});

const AiFile = mongoose.model('AiFile', fileSchema);

export default AiFile;

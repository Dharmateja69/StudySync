import { Schema, model } from "mongoose";
import { updateSearchIndex } from "../utility/searchIndexUtils.js";

const fileSchema = new Schema(
    {
        uploadedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            required: [true, "File title is required"],
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        subject: {
            type: String,
            required: [true, "Subject is required"],
            trim: true,
        },
        semester: {
            type: String,
            required: [true, "Semester is required"],
            trim: true,
        },
        university: {
            type: String,
            trim: true,
        },
        cloudinaryUrl: {
            type: String,
            required: true,
        },
        cloudinaryPublicId: {
            type: String,
            required: true,
        },
        resourceType: {
            type: String,
            enum: ["image", "raw"],
            required: true
        }
        ,
        summary: {
            type: String,
            default: "",
        },
        tags: {
            type: [String],
            default: [],
        },
        isDuplicate: {
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },
        rejectionReason: {
            type: String,
            default: "",
            trim: true,
        },
        adminActionBy: {
            type: Schema.Types.ObjectId,
            ref: "User", // Refers to an admin
            default: null,
        },
        views: {
            type: Number,
            default: 0,
        },
        downloads: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true, // adds createdAt and updatedAt
    }
);

fileSchema.post('save', async function (doc) {
    if (doc.status === 'approved') {
        updateSearchIndex();
    }
});

fileSchema.post('findOneAndUpdate', async function (doc) {
    if (doc && doc.status === 'approved') {
        updateSearchIndex();
    }
});

fileSchema.post('remove', async function (doc) {
    updateSearchIndex();
});

export default model("File", fileSchema);

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        // 🔐 Core Auth Fields
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/,
                "Please enter a valid email(eg.xyz123@gmail.com)",
            ],
        },
        password: {
            type: String,
            required: function () {
                return !this.googleId; // Only required if not using Google OAuth
            },
            minlength: [8, "Password must be at least 8 characters"],
            select: false, // Exclude from queries by default
        },

        // 🌐 Google OAuth
        googleId: {
            type: String,
            default: null,
        },

        // 🧑 Profile Info
        fullName: {
            type: String,
            required: [true, "Full name is required"],
            trim: true,
        },
        avatar: {
            type: String,
            default: "", // Optional profile pic
        },

        // 👥 Role Management
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },

        // 🤝 Referral System
        referralCode: {
            type: String,
            unique: true,
            sparse: true,
        },
        referredBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },

        // 🚦 User Status Flags (for future admin moderation logic)
        isVerified: {
            type: Boolean,
            default: false,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        totalCredits: {
            type: Number,
            default: 0,
        },
        verifiedUploadCount: {
            type: Number,
            default: 0,
        },
        referralCount: {
            type: Number,
            default: 0,
        }

    },
    {
        timestamps: true,
        strict: true,
    }
);

//
// 🔁 Hash password before saving (only if modified or created)
//
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (error) {
        return next(error);
    }
});

//
// 🔐 Match password method for login validation
//
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

//
// 🎟️ JWT Generation Method (Stateless Auth)
//
userSchema.methods.generateJWT = function () {
    return jwt.sign(
        {
            id: this._id,
            role: this.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || "7d",
        }
    );
};

const User = mongoose.model("User", userSchema);
export { User };

// controllers/authController.js


import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
import passport from "passport";
import { User } from "../Model/User.js";
import asyncHandler from "../middlewares/Asynchandler.js";
import generateToken from "../utility/generateToken.js";
import { initializeUser } from "../utility/leaderboardUtils.js";
dotenv.config();



const sendTokenResponse = asyncHandler((user, statusCode, res) => {
    const token = generateToken(res, user._id);

    res.status(statusCode).json({
        success: true,
        token,
        user: {
            id: user._id,
            email: user.email,
            fullName: user.fullName,
            avatar: user.avatar,
        },
    });
});

export const signup = asyncHandler(async (req, res) => {
    const { email, password, fullName } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ success: false, message: "Email already in use" });

    const user = await User.create({ email, password, fullName });
    await initializeUser(user._id);
    sendTokenResponse(user, 201, res);
})

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email, isDeleted: false }).select("+password");
    if (!user) return res.status(401).json({ success: false, message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ success: false, message: "Invalid credentials" });

    sendTokenResponse(user, 200, res);
})

export const googleAuth = passport.authenticate('google', {
    scope: ['profile', 'email'],
    accessType: 'offline',
    prompt: 'consent'

});

export const googleCallback = asyncHandler(async (req, res, next) => {
    passport.authenticate('google', { session: false }, (err, user) => {
        if (err || !user) {
            return res.redirect(`${process.env.CLIENT_URL}/login?error=auth_failed`);
        }



        generateToken(res, user._id);
        initializeUser(user._id);
        res.redirect(`${process.env.CLIENT_URL}/dash/u`);
    })(req, res, next);
});


export const logout = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", { // Correct cookie name
        httpOnly: true,
        expires: new Date(0),

    });
    res.status(200).json({ message: "Logged out successfully" });
});

export const getProfile = asyncHandler(async (req, res) => {
    let token;

    if (req.headers.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token && req.cookies?.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        return res.status(401).json({ success: false, message: "Not authorized, token missing" });
    }
    console.log("Cookies:", req.cookies);
    console.log("Authorization Header:", req.headers.authorization);


    try {


        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded user ID:", decoded.userId);

        const user = await User.findById(decoded.userId);
        if (!user) {
            console.log("User not found for ID:", decoded.userId);
            return res.status(404).json({ success: false, message: "User not found" });
        }


        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                email: user.email,
                fullName: user.fullName,
                avatar: user.avatar,
                role: user.role,
                referralCode: user.referralCode,
                referredBy: user.referredBy,
                isVerified: user.isVerified,
                isDeleted: user.isDeleted,
                totalCredits: user.totalCredits,
                verifiedUploadCount: user.verifiedUploadCount,
                referralCount: user.referralCount,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
        });
    } catch (err) {
        console.error("JWT verification error:", err);
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
});
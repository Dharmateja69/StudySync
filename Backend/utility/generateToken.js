// utils/generateToken.js
import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { // Payload with userId
        expiresIn: "30d",
    });
    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "None" : "lax", // 'none' for production, 'lax' for development
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return token;
};

export default generateToken;
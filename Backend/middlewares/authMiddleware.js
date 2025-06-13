// middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import { User } from "../Model/User.js";

export const protect = async (req, res, next) => {
    let token;

    // Read JWT from the 'jwt' cookie
    token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select("-password"); // Access with userId
            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, token failed.");
        }
    } else {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
};